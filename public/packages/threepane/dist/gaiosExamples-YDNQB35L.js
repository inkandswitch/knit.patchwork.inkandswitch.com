import"./chunk-FW4363Y4.js";var t={"@patchwork":{title:"Petri Net: Inventory purchasing",type:"petrinaut-petrinet"},petriNetDefinition:{componentInstances:[],differentialEquations:[{code:`// The DETERMINISTIC half of the Ornstein-Uhlenbeck SDE
//   d lambda = theta * (mu - lambda) dt + sigma dW.
// The dW half is injected by the diffusion-step transition
// (Euler-Maruyama split: drift integrates every solver step, noise
// lands every diffusion_step). sigma = 0 turns this into a pure ODE.
export default Dynamics((tokens, parameters) => {
  return tokens.map((m) => ({
    rate: parameters.demand_theta * (parameters.demand_mu - m.rate),
    diffusion_clock: -1,
  }));
});`,colorId:"type__market",id:"de__demand",name:"Demand rate: OU drift (+ diffusion clock)"},{code:`export default Dynamics((tokens) => {
  return tokens.map(() => ({ waited: 1, patience: 0, qty: 0 }));
});`,colorId:"type__customer_order",id:"de__waiting",name:"Clock: customer order ageing"},{code:`// Life ticks from order placement, wherever the stock physically
// is (AtVendor, InTransit, DelayedShipments). Storage cost is NOT
// charged here: the warehouse equation (de__stored) does that on
// our own shelves; committed transit spend is already booked by
// the spend metric.
export default Dynamics((tokens) => {
  return tokens.map(() => ({ qty: 0, remaining_life: -1, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }));
});`,colorId:"type__crate",id:"de__shelf",name:"Clock: shelf-life countdown (transit/hold \u2014 no storage charge)"},{code:`export default Dynamics((tokens) => {
  return tokens.map(() => ({ remaining: -1, qty: 0 }));
});`,colorId:"type__job",id:"de__production",name:"Clock: production countdown"},{code:`// Warehouse holding: capital + GMP storage, accrued per unit-week
// on the stock token itself and banked to the HoldingCosts ledger when
// the stock is discarded or written off.
export default Dynamics((tokens, parameters) => {
  return tokens.map((c) => ({
    qty: 0,
    remaining_life: -1,
    holding_eur: c.qty * parameters.holding_cost_rate,
    unit_price: 0,
    dispatch_clock: 0,
    transit_clock: 0,
  }));
});`,colorId:"type__crate",id:"de__stored",name:"Shelf-life countdown + storage-cost accrual (our shelves)"},{code:`// The deterministic half of dP = theta * (1 - P) dt + sigma dW.
// The dW half is injected by the price diffusion transition
// (same Euler-Maruyama split as demand). price_sigma = 0 freezes
// prices at the recorded eina values.
export default Dynamics((tokens, parameters) => {
  return tokens.map((p) => ({
    level: parameters.price_theta * (1 - p.level),
    diffusion_clock: -1,
  }));
});`,colorId:"type__price",id:"de__price",name:"Price index: OU drift (+ diffusion clock)"},{code:`// At the vendor: shelf life burns from order placement
// (optimistic fresh-stock reading, as v1) and the fixed
// processing clock counts down to dispatch.
export default Dynamics((tokens, parameters) => {
  return tokens.map((c) => ({
    qty: 0,
    remaining_life: -1,
    holding_eur: 0,
    unit_price: 0,
    dispatch_clock: -1,
    transit_clock: 0,
  }));
});`,colorId:"type__crate",id:"de__at_vendor",name:"Order book: shelf life + dispatch clock"},{code:`// On the truck: the FITTED Gaussian transit clock counts
// down to goods receipt.
export default Dynamics((tokens, parameters) => {
  return tokens.map((c) => ({
    qty: 0,
    remaining_life: -1,
    holding_eur: 0,
    unit_price: 0,
    dispatch_clock: 0,
    transit_clock: -1,
  }));
});`,colorId:"type__crate",id:"de__in_transit",name:"Transit: shelf life + transit clock"},{code:`// A scheduled production order ages while it waits for
// materials \u2014 the shortage cost integrates over this. Every
// real attribute needs a derivative; the quantities hold.
export default Dynamics((tokens, parameters) => {
  return tokens.map((s) => ({ produce_qty: 0, consume_sonaflozin: 0, consume_flowbind: 0, waited: 1 }));
});`,colorId:"type__prod_order",id:"de__plan_wait",name:"Scheduled batch: waiting clock"}],metrics:[{code:'return state.places["DemandOutlook"].tokens.reduce((n, t) => n + t.rate, 0);',description:"The OU-evolving arrival rate lambda(t). Its mean is demand_mu; excursions are the SDE at work.",id:"metric__demand_rate",name:"Demand rate now (orders per week)"},{code:'return state.places["Backlog"].tokens.length;',description:"Customer orders received and not yet fulfilled or cancelled.",id:"metric__backlog",name:"Backlog (orders waiting)"},{code:'return state.places["FulfilledOrders"].tokens.length;',description:"KPI: sales completed within the horizon. Scope note (review Option A): demand is all-site sales served from site 1000; this measures whether the plant supplies the network, not final customer delivery.",id:"metric__fulfilled",name:"Orders fulfilled"},{code:'return state.places["FulfilledOrders"].tokens.reduce((n, t) => n + t.lead_time, 0);',description:"Sum of `waited` at fulfilment. Average lead time = this / orders fulfilled (division done outside: 1 reduce per metric, DSL limit).",id:"metric__lead_time_sum",name:"Sum of fulfilment lead times (weeks)"},{code:'return state.places["LostSales"].tokens.length;',description:"KPI: spot orders cancelled (count). Lost UNITS are the companion metric.",id:"metric__lost_sales",name:"Lost sales (spot orders cancelled)"},{code:'return state.places["SonaflozinStock"].tokens.reduce((n, t) => n + t.qty, 0);',description:"Sum of stock qty on the shelf.",id:"metric__raw_units_r0006",name:"Raw stock on shelf, Sonaflozin (units)"},{code:'return state.places["FlowbindMaterialStock"].tokens.reduce((n, t) => n + t.qty, 0);',description:"Sum of stock qty on the shelf.",id:"metric__raw_units_r0025",name:"Raw stock on shelf, Flowbind Material (units)"},{code:'return state.places["InTransit"].tokens.reduce((n, t) => n + t.qty, 0);',description:"Sum of stock qty in transit, all vendors.",id:"metric__on_order_units",name:"Stock in transit (units)"},{code:'return state.places["FinishedGoods"].tokens.reduce((n, t) => n + t.qty, 0);',description:"Sum of stock qty in the finished store.",id:"metric__fg_units",name:"Finished goods, Sonic Flow (units)"},{code:'return state.places["ExpiredStock"].tokens.reduce((n, t) => n + t.value, 0);',description:"KPI: qty lost to shelf-life expiry, raw and finished. Per-material split via kind in the verifier.",id:"metric__expired_units",name:"Expired stock written off (units)"},{code:'return state.places["ScrappedBatches"].tokens.length;',description:"KPI: rare-event branch; 1,000 units of product each.",id:"metric__scrapped",name:"Batches scrapped (QC)"},{code:'return state.places["OrdersPlaced"].tokens.length;',description:"All vendors.",id:"metric__orders_placed",name:"Purchase orders placed"},{code:'return state.places["OrdersPlaced"].tokens.reduce((n, t) => n + t.qty * t.unit_price, 0);',description:"Committed on placed orders at the price CAPTURED at order time (recorded eina/eine unit prices scaled by the OU price index). Switching fees are a separate metric.",id:"metric__spend",name:"Purchase spend (EUR)"},{code:'return state.places["SwitchFees"].tokens.length;',description:"KPI: 2,500-unit Flowbind Material orders redirected to German supplier while Indian supplier was out of stock.",id:"metric__switches",name:"Supplier switches (substitute orders)"},{code:'return state.places["LostShipments"].tokens.length;',description:"KPI: consignments lost in transit. The vendor reships a replacement batch (fresh dispatch leg + mean transit leg, full shelf life \u2014 the lost goods are physically gone), so a loss costs lead time, not money; the replacement keeps the order-time price.",id:"metric__lost_shipments",name:"Shipments lost in transit"},{code:'return state.places["LostShipments"].tokens.reduce((n, t) => n + t.value, 0);',description:"Value of consignments lost and reshipped, at the order-time price. Not a write-off: the vendor honours the order, so the cost of a loss is the extra lead time, not the money.",id:"metric__lost_shipment_value",name:"Reshipped consignment value (EUR)"},{code:'return state.places["SwitchFees"].tokens.reduce((n, t) => n + t.value, 0);',description:"Cost of redirecting orders (switch_cost per substitute order). Total purchasing cost = spend + this (added in the harness: 1 reduce per metric, DSL limit).",id:"metric__switch_fees",name:"Switching fees (EUR)"},{code:'return state.places["InTransit"].tokens.reduce((n, t) => n + (t.material === "Sonaflozin" ? t.qty : 0), 0);',description:"Harness input: material conservation needs several sums (shelf + in transit + consumed + expired = initial + ordered); the DSL allows 1 reduce per metric, so the verifier assembles the identity from component metrics.",id:"metric__conservation_r0006",name:"Conservation component: Sonaflozin in-transit units"},{code:'return state.places["FulfilledOrders"].tokens.reduce((n, t) => n + (t.kind === "contract" ? 1 : 0), 0);',description:"Split of fulfilled orders by segment colour.",id:"metric__fulfilled_contract",name:"Orders fulfilled (contract)"},{code:'return state.places["FulfilledOrders"].tokens.reduce((n, t) => n + t.tardiness, 0);',description:"Sum over fulfilled contract orders of max(0, waited - delivery window). Demand is conserved for contracts; lateness costs money instead of orders.",id:"metric__tardiness",name:"Contract tardiness (order-weeks)"},{code:'return state.places["FulfilledOrders"].tokens.reduce((n, t) => n + t.tardiness * parameters.late_penalty_per_week, 0);',description:"Contract tardiness priced at late_penalty_per_week. Composes with purchase spend and switching fees into one cost objective.",id:"metric__late_penalties",name:"Late-delivery penalties (EUR)"},{code:'return state.places["DelayLog"].tokens.length;',description:"KPI: shipments that hit a customs / goods-receipt hold. The stock keeps ageing while held and is released to its shelf on the slow timescale; it cannot be lost while held (losses fire on OnOrder only \u2014 simplification).",id:"metric__delays",name:"Shipments delayed (cumulative)"},{code:'return state.places["DelayedShipments"].tokens.reduce((n, t) => n + t.qty, 0);',description:"Current qty sitting in the hold, still ageing.",id:"metric__delayed_units",name:"Units held up in delayed shipments"},{code:'return state.places["RawPriceIndex"].tokens.reduce((n, t) => n + t.level, 0);',description:"The OU-evolving multiplier on the recorded eina unit prices. Mean 1.0; excursions are the price SDE at work.",id:"metric__price_level",name:"Raw material price index (now)"},{code:'return state.places["AtVendor"].tokens.reduce((n, t) => n + t.qty, 0);',description:"Order book: accepted orders awaiting dispatch. A vendor outage stalls this place (Ship holds the InStock token); it no longer stalls the transit pipe.",id:"metric__at_vendor_units",name:"Stock at vendor, not yet shipped (units)"},{code:'return state.places["AtVendor"].tokens.reduce((n, t) => n + (t.material === "Sonaflozin" ? t.qty : 0), 0);',description:"Harness input, as the in-transit component.",id:"metric__conservation_r0006_vendor",name:"Conservation component: Sonaflozin at-vendor units"},{code:'return state.places["HoldingCosts"].tokens.reduce((n, t) => n + t.value, 0);',description:"Storage cost accrued by stock that has since been discarded or written off. Total holding cost = this + the 3 live-accrual metrics (summed in the harness: 1 reduce per metric, DSL limit).",id:"metric__holding_banked",name:"Holding costs banked (EUR)"},{code:'return state.places["SonaflozinStock"].tokens.reduce((n, t) => n + t.holding_eur, 0);',description:"Live accrual on stock currently stored.",id:"metric__holding_raw1",name:"Holding cost accrued, Sonaflozin shelf (EUR)"},{code:'return state.places["FlowbindMaterialStock"].tokens.reduce((n, t) => n + t.holding_eur, 0);',description:"Live accrual on stock currently stored.",id:"metric__holding_raw2",name:"Holding cost accrued, Flowbind Material shelf (EUR)"},{code:'return state.places["FinishedGoods"].tokens.reduce((n, t) => n + t.holding_eur, 0);',description:"Live accrual on stock currently stored.",id:"metric__holding_fg",name:"Holding cost accrued, Sonic Flow store (EUR)"},{code:'return state.places["FulfilledOrders"].tokens.reduce((n, t) => n + t.qty, 0);',description:"Sum of fulfilled order quantities (fitted vbap sizes).",id:"metric__units_sold",name:"Units sold"},{code:'return state.places["LostSales"].tokens.reduce((n, t) => n + t.value, 0);',description:"Demand that walked, in units \u2014 the volume the lost-margin costing of review change 4 will price.",id:"metric__units_lost",name:"Units lost (spot cancellations)"},{code:'return state.places["Backlog"].tokens.reduce((n, t) => n + t.qty, 0);',description:"Open demand in units. Order qty is clamped >= 5 once, at arrival, so this reads it raw.",id:"metric__backlog_units",name:"Backlog (units waiting)"},{code:'return state.places["ProductionOrdersWaiting"].tokens.length;',description:"afko-cadence production orders not yet started \u2014 rises when materials starve the plan.",id:"metric__schedule_waiting",name:"Scheduled batches waiting"},{code:'return state.places["InventoryPosition_Sonaflozin"].tokens.reduce((n, t) => n + t.position, 0);',description:"on-hand + at-vendor + in-transit \u2212 committed; quarantined/rejected/recalled/expired excluded. The reorder-point policy's decision variable.",id:"metric__position_1",name:"Inventory position, Sonaflozin (units)"},{code:'return state.places["InventoryPosition_FlowbindMaterial"].tokens.reduce((n, t) => n + t.position, 0);',description:"As the Sonaflozin position.",id:"metric__position_2",name:"Inventory position, Flowbind Material (units)"},{code:'return state.places["Quarantine"].tokens.reduce((n, t) => n + t.qty, 0);',description:"Delivered but not yet quality-released \u2014 unavailable to production and excluded from the inventory position.",id:"metric__quarantine_units",name:"Stock in quarantine (units)"},{code:'return state.places["RejectedStock"].tokens.reduce((n, t) => n + t.value, 0);',description:"Receipts that failed inspection (assumed ~5%).",id:"metric__rejected_units",name:"QC-rejected stock (units)"},{code:'return state.places["RecalledStock"].tokens.reduce((n, t) => n + t.value, 0);',description:"Stock pulled by recall events (Recall wave scenario).",id:"metric__recalled_units",name:"Recalled stock (units)"},{code:'return state.places["DisposalCosts"].tokens.reduce((n, t) => n + t.value, 0);',description:"Controlled destruction + admin on expiry, QC rejection and recalls, at the assumed EUR 1.5/unit. Excludes the sunk purchase spend and holding already counted elsewhere.",id:"metric__disposal_costs",name:"Disposal costs (EUR)"},{code:'return state.places["LostSales"].tokens.reduce((n, t) => n + t.value * parameters.unit_margin, 0);',description:"Lost units x contribution margin (vbap NETPR - mbew STPRS = EUR 55.47/unit).",id:"metric__lost_margin",name:"Lost margin, cancelled spot (EUR)"},{code:'return state.places["ShortageCosts"].tokens.reduce((n, t) => n + t.value, 0);',description:"waited x qty x rate charged when a late scheduled batch finally starts.",id:"metric__shortage_banked",name:"Production delay cost, banked (EUR)"},{code:'return state.places["ProductionOrdersWaiting"].tokens.reduce((n, t) => n + t.waited * t.produce_qty * parameters.shortage_cost_rate, 0);',description:"The same charge accruing on batches still waiting for materials. Total shortage cost = banked + this.",id:"metric__shortage_live",name:"Production delay cost, accruing (EUR)"},{code:'return state.places["OrdersPlaced"].tokens.reduce((n, t) => n + t.qty * t.unit_price, state.places["HoldingCosts"].tokens.concat(state.places["SwitchFees"].tokens).concat(state.places["DisposalCosts"].tokens).concat(state.places["ShortageCosts"].tokens).reduce((m, t) => m + t.value, state.places["LostSales"].tokens.reduce((l, t) => l + t.value * parameters.unit_margin, state.places["FulfilledOrders"].tokens.reduce((f, t) => f + t.tardiness * parameters.late_penalty_per_week, state.places["ProductionOrdersWaiting"].tokens.reduce((s, t) => s + t.waited * t.produce_qty * parameters.shortage_cost_rate, state.places["SonaflozinStock"].tokens.concat(state.places["FlowbindMaterialStock"].tokens).concat(state.places["FinishedGoods"].tokens).concat(state.places["Quarantine"].tokens).reduce((h, c) => h + c.holding_eur, 0))))));',description:"The single objective for the optimiser: purchase spend + holding (banked + still accruing on live stock, quarantine included) + lost margin on cancelled spot + production delay (banked + accruing) + late-delivery penalties + switching fees + disposal. Equals the sum of the component metrics by construction.",id:"metric__policy_cost",name:"Policy cost (EUR)"},{code:'return state.places["DemandOutlook"].tokens.reduce((ratio, d) => state.places["FulfilledOrders"].tokens.reduce((s, t) => s + t.qty, 0) / ratio, state.places["FulfilledOrders"].tokens.reduce((a, t) => a + t.qty, state.places["LostSales"].tokens.reduce((b, t) => b + t.value, state.places["Backlog"].tokens.reduce((c, t) => c + t.qty, 0.001))));',description:"Units sold over all demanded units \u2014 sold + cancelled + still in the backlog \u2014 so a policy cannot look cheap by under-buying and failing customers. Division happens in a callback over the singleton DemandOutlook token (operand-position arithmetic around a reduce miscompiles); the 0.001 seed only guards the t=0 division. Scope note (review Option A): measures site 1000 supplying the network, not final customer delivery.",id:"metric__fill_rate",name:"Fill rate (sold / demanded units)"}],parameters:[{defaultValue:"4.44",id:"param__demand_mu",name:"Demand mean (sales order arrivals per week; FITTED vbak/vbap, all plants: 247 items / 55.6 wk)",type:"real",variableName:"demand_mu"},{defaultValue:"0.5",id:"param__demand_theta",name:"Demand mean-reversion rate (per week; ASSUMED)",type:"real",variableName:"demand_theta"},{defaultValue:"1.3",id:"param__demand_sigma",name:"Demand volatility (per sqrt-week; ASSUMED, same relative scale as v1-v4; 0 = ODE/L3)",type:"real",variableName:"demand_sigma"},{defaultValue:"0.25",id:"param__diffusion_step",name:"Diffusion step (weeks between noise injections)",type:"real",variableName:"diffusion_step"},{defaultValue:"4",id:"param__patience",name:"Spot patience mean (weeks; ASSUMED, sampled per order)",type:"real",variableName:"patience_weeks"},{defaultValue:"1.0",id:"param__cancel_rate",name:"Spot cancellation hazard at the personal deadline (per week; ASSUMED, grows as (waited/patience)^2)",type:"real",variableName:"cancel_rate"},{defaultValue:"7.0",id:"param__fulfil_rate",name:"Fulfilment rate when stock exists (per week)",type:"real",variableName:"fulfil_rate"},{defaultValue:"3.0",id:"param__production_start",name:"Start responsiveness once a scheduled order and materials are ready (per week; ASSUMED)",type:"real",variableName:"production_start_rate"},{defaultValue:"0.995",id:"param__production_time",name:"Batch duration (weeks; 0.995 per the dt-multiple defect)",type:"real",variableName:"production_time"},{defaultValue:"0.02",id:"param__scrap_rate",name:"QC scrap rate while in production (per week; ASSUMED)",type:"real",variableName:"scrap_rate"},{defaultValue:"7.0",id:"param__handling_rate",name:"Stock consolidation rate (per week; ASSUMED)",type:"real",variableName:"handling_rate"},{defaultValue:"0.04",id:"param__outage_rate",name:"Vendor stock-out rate (per week; ASSUMED ~2/year)",type:"real",variableName:"outage_rate"},{defaultValue:"0.5",id:"param__restock_rate",name:"Vendor restock rate (per week; ASSUMED ~2-week outage)",type:"real",variableName:"restock_rate"},{defaultValue:"5000",id:"param__switch_cost",name:"Cost of a substitute order (EUR; ASSUMED: expedite/qualification/admin)",type:"real",variableName:"switch_cost"},{defaultValue:"0.001",id:"param__shipment_loss",name:"Shipment loss rate (per week per shipment in transit; ASSUMED ~0.3% of a 3-week transit leg \u2014 real freight loss is <1%)",type:"real",variableName:"shipment_loss_rate"},{defaultValue:"156",id:"param__shelf_r0006",name:"Shelf life, Sonaflozin (weeks; modal recorded 1,095 days)",type:"real",variableName:"shelf_life_sonaflozin"},{defaultValue:"156",id:"param__shelf_r0025",name:"Shelf life, Flowbind Material (weeks; ASSUMED, no batch data)",type:"real",variableName:"shelf_life_flowbind"},{defaultValue:"52",id:"param__shelf_a0005",name:"Shelf life, Sonic Flow (weeks; recorded 365 days)",type:"real",variableName:"shelf_life_sonic_flow"},{defaultValue:"0.7",id:"param__contract_share",name:"Contract share of arrivals (ASSUMED 70/30)",type:"real",variableName:"contract_share"},{defaultValue:"1.5",id:"param__spot_patience_sd",name:"Spot patience spread (weeks; ASSUMED)",type:"real",variableName:"spot_patience_sd"},{defaultValue:"1.0",id:"param__delivery_window",name:"Contract delivery window (weeks; ASSUMED)",type:"real",variableName:"delivery_window"},{defaultValue:"2000",id:"param__late_penalty",name:"Contract lateness penalty (EUR per order-week; ASSUMED)",type:"real",variableName:"late_penalty_per_week"},{defaultValue:"0.02",id:"param__shipment_delay",name:"Shipment delay rate (per week per open order; ASSUMED \u2014 customs hold / GR QC failure)",type:"real",variableName:"shipment_delay_rate"},{defaultValue:"0.16666666666666666",id:"param__delayed_release",name:"Delayed-shipment release rate (per week; ASSUMED ~6-week mean hold \u2014 exponential stand-in for L1c's heavy tail)",type:"real",variableName:"delayed_release_rate"},{defaultValue:"0.2",id:"param__price_theta",name:"Price index mean-reversion rate (per week; ASSUMED \u2014 eina prices are static, nothing grounds this)",type:"real",variableName:"price_theta"},{defaultValue:"0.04",id:"param__price_sigma",name:"Price index volatility (per sqrt-week; ASSUMED; 0 = prices frozen at the recorded eina values)",type:"real",variableName:"price_sigma"},{defaultValue:"0.25",id:"param__holding_rate",name:"Warehouse holding cost (EUR per unit per week; ASSUMED ~13%/year of unit value: capital + GMP storage)",type:"real",variableName:"holding_cost_rate"},{defaultValue:"0.96",id:"param__small_share",name:"Small-order share of arrivals (FITTED vbap: orders < 300 units)",type:"real",variableName:"small_share"},{defaultValue:"52.9",id:"param__small_qty_mean",name:"Small order qty mean (units; FITTED vbap)",type:"real",variableName:"small_qty_mean"},{defaultValue:"27.0",id:"param__small_qty_sd",name:"Small order qty sd (units; FITTED vbap)",type:"real",variableName:"small_qty_sd"},{defaultValue:"676.1",id:"param__bulk_qty_mean",name:"Bulk order qty mean (units; FITTED vbap)",type:"real",variableName:"bulk_qty_mean"},{defaultValue:"142.2",id:"param__bulk_qty_sd",name:"Bulk order qty sd (units; FITTED vbap)",type:"real",variableName:"bulk_qty_sd"},{defaultValue:"699.0",id:"param__batch_qty_mean",name:"Scheduled batch qty mean (units; FITTED afko, 3,000-unit outlier excluded; recorded median 700)",type:"real",variableName:"batch_qty_mean"},{defaultValue:"200.0",id:"param__batch_qty_sd",name:"Scheduled batch qty sd (units; FITTED afko)",type:"real",variableName:"batch_qty_sd"},{defaultValue:"2200",id:"param__rop_r0006",name:"Reorder point, Sonaflozin (units; POLICY \u2014 default ~ lead-time consumption 1,470 + ~1 batch safety, ASSUMED)",type:"real",variableName:"rop_sonaflozin"},{defaultValue:"6000",id:"param__target_r0006",name:"Order-up-to target, Sonaflozin (units; POLICY)",type:"real",variableName:"target_sonaflozin"},{defaultValue:"1400",id:"param__rop_r0025",name:"Reorder point, Flowbind Material (units; POLICY \u2014 default ~ lead-time consumption 720 + ~1 batch safety, ASSUMED)",type:"real",variableName:"rop_flowbind"},{defaultValue:"5000",id:"param__target_r0025",name:"Order-up-to target, Flowbind Material (units; POLICY)",type:"real",variableName:"target_flowbind"},{defaultValue:"700",id:"param__topup_threshold",name:"German supplier top-up threshold, Flowbind Material (units; POLICY \u2014 urgent-shortage trigger below the reorder point)",type:"real",variableName:"topup_threshold"},{defaultValue:"250",id:"param__topup_qty",name:"German supplier top-up quantity (units; POLICY; eine MOQ 250 \u2014 the recorded 200-unit POs sit below it, known data inconsistency)",type:"real",variableName:"topup_qty"},{defaultValue:"2.0",id:"param__review_rate",name:"Purchasing review responsiveness once below a threshold (per week; ASSUMED ~continuous review)",type:"real",variableName:"review_rate"},{defaultValue:"2500",id:"param__moq_vend0002",name:"MOQ, Chinese supplier (units; eine MINBM org 1000)",type:"real",variableName:"moq_chinese"},{defaultValue:"2500",id:"param__round_vend0002",name:"Order rounding value, Chinese supplier (units; marc BSTRF)",type:"real",variableName:"round_chinese"},{defaultValue:"2500",id:"param__moq_vend0016",name:"MOQ, Indian supplier (units; eine MINBM org 1000)",type:"real",variableName:"moq_indian"},{defaultValue:"2500",id:"param__round_vend0016",name:"Order rounding value, Indian supplier (units; marc BSTRF)",type:"real",variableName:"round_indian"},{defaultValue:"250",id:"param__round_vend0018",name:"Order rounding value, German supplier (units; eine MINBM)",type:"real",variableName:"round_german"},{defaultValue:"1.0",id:"param__dispatch_time",name:"Vendor processing before dispatch (weeks; ASSUMED split of the fitted door-to-door lead)",type:"real",variableName:"dispatch_time"},{defaultValue:"1.75",id:"param__qc_release_rate",name:"Quality release rate (per week; ASSUMED ~4-day hold)",type:"real",variableName:"qc_release_rate"},{defaultValue:"0.09",id:"param__qc_reject_rate",name:"QC rejection rate (per week; ASSUMED ~5% of receipts)",type:"real",variableName:"qc_reject_rate"},{defaultValue:"0",id:"param__recall_rate",name:"Recall hazard per stored stock token (per week; 0 = off, the Recall wave scenario arms it \u2014 no data calibrates a normal rate)",type:"real",variableName:"recall_rate"},{defaultValue:"3.0",id:"param__fefo_strength",name:"FEFO bias exponent (dimensionless; ASSUMED \u2014 biases binding choice ~e^3 toward the oldest stock; a hard guarantee needs a binding ordering the engine lacks)",type:"real",variableName:"fefo_strength"},{defaultValue:"1.9157",id:"param__plan_period",name:"Production plan period (weeks; FITTED 1/0.522 afko cadence, as a repeating calendar plan)",type:"real",variableName:"plan_period"},{defaultValue:"55.47",id:"param__unit_margin",name:"Contribution margin per finished unit (EUR; DERIVED vbap NETPR 213.96 - mbew STPRS 158.49)",type:"real",variableName:"unit_margin"},{defaultValue:"2.0",id:"param__shortage_cost_rate",name:"Production delay cost (EUR per unit-week a scheduled batch waits; ASSUMED)",type:"real",variableName:"shortage_cost_rate"},{defaultValue:"1.5",id:"param__disposal_cost",name:"Disposal cost per written-off unit (EUR; ASSUMED \u2014 controlled destruction + admin; excludes the sunk purchase and holding cost already counted)",type:"real",variableName:"disposal_cost"},{defaultValue:"1.0",id:"param__bom_sonaflozin",name:"BOM: Sonaflozin per unit of Sonic Flow (units/unit; DERIVED stpo MENGE 1 / stko BMENG 1, BOM10005)",type:"real",variableName:"bom_sonaflozin_per_unit"},{defaultValue:"1.0",id:"param__bom_flowbind",name:"BOM: Flowbind Material per unit of Sonic Flow (units/unit; DERIVED stpo MENGE 1 / stko BMENG 1, BOM10005)",type:"real",variableName:"bom_flowbind_per_unit"},{defaultValue:"1.0",id:"param__forecast_weight",name:"Production forecast weight: 0 = static recorded plan (fixed Gaussian batches, v8 behaviour), 1 = dynamic make-to-forecast (batch covers expected demand over the plan period at the live arrival rate); POLICY",type:"real",variableName:"forecast_weight"}],places:[{colorId:"type__market",differentialEquationId:"de__demand",dynamicsEnabled:!0,id:"place__demand",name:"DemandOutlook",showAsInitialState:!0,x:1080,y:-510},{colorId:"type__customer_order",differentialEquationId:"de__waiting",dynamicsEnabled:!0,id:"place__backlog",name:"Backlog",showAsInitialState:!1,x:1575,y:-510},{colorId:"type__record",differentialEquationId:null,dynamicsEnabled:!1,id:"place__lost",name:"LostSales",showAsInitialState:!1,x:2100,y:-600},{colorId:null,differentialEquationId:null,dynamicsEnabled:!1,id:"place__supplier_1",name:"ChineseSupplier",showAsInitialState:!0,x:-2025,y:-360},{colorId:null,differentialEquationId:null,dynamicsEnabled:!1,id:"place__supplier_2",name:"IndianSupplier",showAsInitialState:!0,x:-2025,y:-135},{colorId:null,differentialEquationId:null,dynamicsEnabled:!1,id:"place__supplier_3",name:"GermanSupplier",showAsInitialState:!0,x:-2025,y:210},{colorId:null,differentialEquationId:null,dynamicsEnabled:!1,id:"place__up_1",name:"InStock_ChineseSupplier",showAsInitialState:!0,x:-1455,y:-1125},{colorId:null,differentialEquationId:null,dynamicsEnabled:!1,id:"place__down_1",name:"OutOfStock_ChineseSupplier",showAsInitialState:!1,x:-990,y:-1275},{colorId:null,differentialEquationId:null,dynamicsEnabled:!1,id:"place__up_2",name:"InStock_IndianSupplier",showAsInitialState:!0,x:-1455,y:-645},{colorId:null,differentialEquationId:null,dynamicsEnabled:!1,id:"place__down_2",name:"OutOfStock_IndianSupplier",showAsInitialState:!1,x:-990,y:-750},{colorId:null,differentialEquationId:null,dynamicsEnabled:!1,id:"place__up_3",name:"InStock_GermanSupplier",showAsInitialState:!0,x:-1455,y:-900},{colorId:null,differentialEquationId:null,dynamicsEnabled:!1,id:"place__down_3",name:"OutOfStock_GermanSupplier",showAsInitialState:!1,x:-990,y:-1020},{colorId:"type__record",differentialEquationId:null,dynamicsEnabled:!1,id:"place__switch_fees",name:"SwitchFees",showAsInitialState:!1,x:-1425,y:360},{colorId:"type__record",differentialEquationId:null,dynamicsEnabled:!1,id:"place__lost_shipments",name:"LostShipments",showAsInitialState:!1,x:-420,y:-390},{colorId:"type__crate",differentialEquationId:null,dynamicsEnabled:!1,id:"place__orders_placed",name:"OrdersPlaced",showAsInitialState:!1,x:-1425,y:150},{colorId:"type__crate",differentialEquationId:"de__stored",dynamicsEnabled:!0,id:"place__raw_1",name:"SonaflozinStock",showAsInitialState:!0,x:540,y:-285},{colorId:"type__crate",differentialEquationId:"de__stored",dynamicsEnabled:!0,id:"place__raw_2",name:"FlowbindMaterialStock",showAsInitialState:!0,x:540,y:315},{colorId:null,differentialEquationId:null,dynamicsEnabled:!1,id:"place__line",name:"ProductionLineFree",showAsInitialState:!0,x:1470,y:75},{colorId:"type__job",differentialEquationId:"de__production",dynamicsEnabled:!0,id:"place__wip",name:"InProduction",showAsInitialState:!1,x:825,y:0},{colorId:"type__crate",differentialEquationId:"de__stored",dynamicsEnabled:!0,id:"place__fg",name:"FinishedGoods",showAsInitialState:!0,x:1455,y:-90},{colorId:"type__sale",differentialEquationId:null,dynamicsEnabled:!1,id:"place__sales",name:"FulfilledOrders",showAsInitialState:!1,x:2100,y:-420},{colorId:"type__record",differentialEquationId:null,dynamicsEnabled:!1,id:"place__expired",name:"ExpiredStock",showAsInitialState:!1,x:2115,y:30},{colorId:"type__record",differentialEquationId:null,dynamicsEnabled:!1,id:"place__scrap",name:"ScrappedBatches",showAsInitialState:!1,x:1470,y:255},{colorId:"type__crate",differentialEquationId:"de__shelf",dynamicsEnabled:!0,id:"place__delayed",name:"DelayedShipments",showAsInitialState:!1,x:-450,y:375},{colorId:"type__record",differentialEquationId:null,dynamicsEnabled:!1,id:"place__delay_log",name:"DelayLog",showAsInitialState:!1,x:-450,y:195},{colorId:"type__record",differentialEquationId:null,dynamicsEnabled:!1,id:"place__holding",name:"HoldingCosts",showAsInitialState:!1,x:2115,y:240},{colorId:"type__crate",differentialEquationId:"de__at_vendor",dynamicsEnabled:!0,id:"place__at_vendor",name:"AtVendor",showAsInitialState:!1,x:-1425,y:-240},{colorId:"type__crate",differentialEquationId:"de__in_transit",dynamicsEnabled:!0,id:"place__in_transit",name:"InTransit",showAsInitialState:!1,x:-945,y:-240},{colorId:"type__price",differentialEquationId:"de__price",dynamicsEnabled:!0,id:"place__price",name:"RawPriceIndex",showAsInitialState:!0,x:-1725,y:630},{colorId:"type__prod_order",differentialEquationId:"de__plan_wait",dynamicsEnabled:!0,id:"place__schedule",name:"ProductionOrdersWaiting",showAsInitialState:!1,x:330,y:0},{colorId:"type__position",differentialEquationId:null,dynamicsEnabled:!1,id:"place__pos_1",name:"InventoryPosition_Sonaflozin",showAsInitialState:!0,x:30,y:-1080},{colorId:"type__position",differentialEquationId:null,dynamicsEnabled:!1,id:"place__pos_2",name:"InventoryPosition_FlowbindMaterial",showAsInitialState:!0,x:-465,y:660},{colorId:"type__crate",differentialEquationId:"de__stored",dynamicsEnabled:!0,id:"place__quarantine",name:"Quarantine",showAsInitialState:!1,x:-390,y:-60},{colorId:"type__record",differentialEquationId:null,dynamicsEnabled:!1,id:"place__rejected",name:"RejectedStock",showAsInitialState:!1,x:180,y:-510},{colorId:"type__record",differentialEquationId:null,dynamicsEnabled:!1,id:"place__recalled",name:"RecalledStock",showAsInitialState:!1,x:2115,y:630},{colorId:"type__record",differentialEquationId:null,dynamicsEnabled:!1,id:"place__disposal",name:"DisposalCosts",showAsInitialState:!1,x:2115,y:435},{colorId:"type__record",differentialEquationId:null,dynamicsEnabled:!1,id:"place__shortage_costs",name:"ShortageCosts",showAsInitialState:!1,x:825,y:165},{colorId:"type__job",differentialEquationId:"de__production",dynamicsEnabled:!0,id:"place__plan_clock",name:"PlanClock",showAsInitialState:!0,x:120,y:180}],scenarios:[{description:"Stock as recorded: Sonaflozin as its 3 mcha batches with their real remaining lives (88/140/156 weeks); Flowbind Material as 1 stock token (mbew total; no batch rows exist, so its shelf life is the ASSUMED 156 weeks); finished Sonic Flow 4,273 units expiring in 28.5 weeks (mcha). Demand starts at its mean, 4.44/week.",id:"scenario__recorded",initialState:{content:`return {
  "DemandOutlook": [{ rate: 4.44, diffusion_clock: 0 }],
  "Backlog": [],
  "LostSales": [],
  "ChineseSupplier": 200,
  "IndianSupplier": 200,
  "GermanSupplier": 200,
  "InStock_ChineseSupplier": 1,
  "OutOfStock_ChineseSupplier": 0,
  "InStock_IndianSupplier": 1,
  "OutOfStock_IndianSupplier": 0,
  "InStock_GermanSupplier": 1,
  "OutOfStock_GermanSupplier": 0,
  "SwitchFees": [],
  "LostShipments": [],
  "AtVendor": [],
  "InTransit": [],
  "HoldingCosts": [],
  "RawPriceIndex": [{ level: 1.0, diffusion_clock: 0 }],
  "DelayedShipments": [],
  "DelayLog": [],
  "OrdersPlaced": [],
  "SonaflozinStock": [{ material: "Sonaflozin", vendor: "Chinese supplier", qty: 689.6, remaining_life: 88.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1305.75, remaining_life: 140.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1840.46, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FlowbindMaterialStock": [{ material: "Flowbind Material", vendor: "Indian supplier", qty: 4688.17, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "ProductionLineFree": 1,
  "PlanClock": [{ remaining: 0.5, qty: 699.0 }],
  "InventoryPosition_Sonaflozin": [{ position: 3835.81 }],
  "InventoryPosition_FlowbindMaterial": [{ position: 4688.17 }],
  "Quarantine": [],
  "RejectedStock": [],
  "RecalledStock": [],
  "DisposalCosts": [],
  "ShortageCosts": [],
  "ProductionOrdersWaiting": [],
  "InProduction": [],
  "FinishedGoods": [{ material: "Sonic Flow", vendor: "SITE-1000", qty: 4273.39, remaining_life: 28.5, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FulfilledOrders": [],
  "ExpiredStock": [],
  "ScrappedBatches": [],
};`,type:"code"},name:"Baseline policy (recorded market)",parameterOverrides:{},scenarioParameters:[]},{description:"The L4 -> L3 subtraction as a scenario: no diffusion noise, demand relaxes deterministically to its mean. Everything else identical to the snapshot scenario.",id:"scenario__calm",initialState:{content:`return {
  "DemandOutlook": [{ rate: 4.44, diffusion_clock: 0 }],
  "Backlog": [],
  "LostSales": [],
  "ChineseSupplier": 200,
  "IndianSupplier": 200,
  "GermanSupplier": 200,
  "InStock_ChineseSupplier": 1,
  "OutOfStock_ChineseSupplier": 0,
  "InStock_IndianSupplier": 1,
  "OutOfStock_IndianSupplier": 0,
  "InStock_GermanSupplier": 1,
  "OutOfStock_GermanSupplier": 0,
  "SwitchFees": [],
  "LostShipments": [],
  "AtVendor": [],
  "InTransit": [],
  "HoldingCosts": [],
  "RawPriceIndex": [{ level: 1.0, diffusion_clock: 0 }],
  "DelayedShipments": [],
  "DelayLog": [],
  "OrdersPlaced": [],
  "SonaflozinStock": [{ material: "Sonaflozin", vendor: "Chinese supplier", qty: 689.6, remaining_life: 88.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1305.75, remaining_life: 140.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1840.46, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FlowbindMaterialStock": [{ material: "Flowbind Material", vendor: "Indian supplier", qty: 4688.17, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "ProductionLineFree": 1,
  "PlanClock": [{ remaining: 0.5, qty: 699.0 }],
  "InventoryPosition_Sonaflozin": [{ position: 3835.81 }],
  "InventoryPosition_FlowbindMaterial": [{ position: 4688.17 }],
  "Quarantine": [],
  "RejectedStock": [],
  "RecalledStock": [],
  "DisposalCosts": [],
  "ShortageCosts": [],
  "ProductionOrdersWaiting": [],
  "InProduction": [],
  "FinishedGoods": [{ material: "Sonic Flow", vendor: "SITE-1000", qty: 4273.39, remaining_life: 28.5, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FulfilledOrders": [],
  "ExpiredStock": [],
  "ScrappedBatches": [],
};`,type:"code"},name:"Calm market (both sigmas = 0: the SDEs become ODEs)",parameterOverrides:{param__demand_sigma:"scenario.demand_sigma",param__price_sigma:"scenario.price_sigma"},scenarioParameters:[{default:0,identifier:"demand_sigma",type:"real"},{default:0,identifier:"price_sigma",type:"real"}]},{description:"Demand volatility 3.9 (3x the re-fitted sigma): spikes and droughts. The scenario that motivates holding stock at all.",id:"scenario__volatile",initialState:{content:`return {
  "DemandOutlook": [{ rate: 4.44, diffusion_clock: 0 }],
  "Backlog": [],
  "LostSales": [],
  "ChineseSupplier": 200,
  "IndianSupplier": 200,
  "GermanSupplier": 200,
  "InStock_ChineseSupplier": 1,
  "OutOfStock_ChineseSupplier": 0,
  "InStock_IndianSupplier": 1,
  "OutOfStock_IndianSupplier": 0,
  "InStock_GermanSupplier": 1,
  "OutOfStock_GermanSupplier": 0,
  "SwitchFees": [],
  "LostShipments": [],
  "AtVendor": [],
  "InTransit": [],
  "HoldingCosts": [],
  "RawPriceIndex": [{ level: 1.0, diffusion_clock: 0 }],
  "DelayedShipments": [],
  "DelayLog": [],
  "OrdersPlaced": [],
  "SonaflozinStock": [{ material: "Sonaflozin", vendor: "Chinese supplier", qty: 689.6, remaining_life: 88.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1305.75, remaining_life: 140.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1840.46, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FlowbindMaterialStock": [{ material: "Flowbind Material", vendor: "Indian supplier", qty: 4688.17, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "ProductionLineFree": 1,
  "PlanClock": [{ remaining: 0.5, qty: 699.0 }],
  "InventoryPosition_Sonaflozin": [{ position: 3835.81 }],
  "InventoryPosition_FlowbindMaterial": [{ position: 4688.17 }],
  "Quarantine": [],
  "RejectedStock": [],
  "RecalledStock": [],
  "DisposalCosts": [],
  "ShortageCosts": [],
  "ProductionOrdersWaiting": [],
  "InProduction": [],
  "FinishedGoods": [{ material: "Sonic Flow", vendor: "SITE-1000", qty: 4273.39, remaining_life: 28.5, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FulfilledOrders": [],
  "ExpiredStock": [],
  "ScrappedBatches": [],
};`,type:"code"},name:"Volatile market (sigma x 3)",parameterOverrides:{param__demand_sigma:"scenario.demand_sigma"},scenarioParameters:[{default:3.9,identifier:"demand_sigma",type:"real"}]},{description:"Demand starts at 3x its mean (13.32/week) and mean-reverts. Tests whether recorded purchasing cadences survive a spike.",id:"scenario__surge",initialState:{content:`return {
  "DemandOutlook": [{ rate: 13.32, diffusion_clock: 0 }],
  "Backlog": [],
  "LostSales": [],
  "ChineseSupplier": 200,
  "IndianSupplier": 200,
  "GermanSupplier": 200,
  "InStock_ChineseSupplier": 1,
  "OutOfStock_ChineseSupplier": 0,
  "InStock_IndianSupplier": 1,
  "OutOfStock_IndianSupplier": 0,
  "InStock_GermanSupplier": 1,
  "OutOfStock_GermanSupplier": 0,
  "SwitchFees": [],
  "LostShipments": [],
  "AtVendor": [],
  "InTransit": [],
  "HoldingCosts": [],
  "RawPriceIndex": [{ level: 1.0, diffusion_clock: 0 }],
  "DelayedShipments": [],
  "DelayLog": [],
  "OrdersPlaced": [],
  "SonaflozinStock": [{ material: "Sonaflozin", vendor: "Chinese supplier", qty: 689.6, remaining_life: 88.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1305.75, remaining_life: 140.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1840.46, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FlowbindMaterialStock": [{ material: "Flowbind Material", vendor: "Indian supplier", qty: 4688.17, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "ProductionLineFree": 1,
  "PlanClock": [{ remaining: 0.5, qty: 699.0 }],
  "InventoryPosition_Sonaflozin": [{ position: 3835.81 }],
  "InventoryPosition_FlowbindMaterial": [{ position: 4688.17 }],
  "Quarantine": [],
  "RejectedStock": [],
  "RecalledStock": [],
  "DisposalCosts": [],
  "ShortageCosts": [],
  "ProductionOrdersWaiting": [],
  "InProduction": [],
  "FinishedGoods": [{ material: "Sonic Flow", vendor: "SITE-1000", qty: 4273.39, remaining_life: 28.5, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FulfilledOrders": [],
  "ExpiredStock": [],
  "ScrappedBatches": [],
};`,type:"code"},name:"Demand surge (transient)",parameterOverrides:{},scenarioParameters:[]},{description:"Vendors run out of stock at 0.2/week (~10 outages/year each, ~2-week mean outage: out of stock ~29% of the time). The scenario that gives dual sourcing and the switch mechanism their job \u2014 and exposes Sonaflozin's single sourcing, which has no substitute.",id:"scenario__fragile",initialState:{content:`return {
  "DemandOutlook": [{ rate: 4.44, diffusion_clock: 0 }],
  "Backlog": [],
  "LostSales": [],
  "ChineseSupplier": 200,
  "IndianSupplier": 200,
  "GermanSupplier": 200,
  "InStock_ChineseSupplier": 1,
  "OutOfStock_ChineseSupplier": 0,
  "InStock_IndianSupplier": 1,
  "OutOfStock_IndianSupplier": 0,
  "InStock_GermanSupplier": 1,
  "OutOfStock_GermanSupplier": 0,
  "SwitchFees": [],
  "LostShipments": [],
  "AtVendor": [],
  "InTransit": [],
  "HoldingCosts": [],
  "RawPriceIndex": [{ level: 1.0, diffusion_clock: 0 }],
  "DelayedShipments": [],
  "DelayLog": [],
  "OrdersPlaced": [],
  "SonaflozinStock": [{ material: "Sonaflozin", vendor: "Chinese supplier", qty: 689.6, remaining_life: 88.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1305.75, remaining_life: 140.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1840.46, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FlowbindMaterialStock": [{ material: "Flowbind Material", vendor: "Indian supplier", qty: 4688.17, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "ProductionLineFree": 1,
  "PlanClock": [{ remaining: 0.5, qty: 699.0 }],
  "InventoryPosition_Sonaflozin": [{ position: 3835.81 }],
  "InventoryPosition_FlowbindMaterial": [{ position: 4688.17 }],
  "Quarantine": [],
  "RejectedStock": [],
  "RecalledStock": [],
  "DisposalCosts": [],
  "ShortageCosts": [],
  "ProductionOrdersWaiting": [],
  "InProduction": [],
  "FinishedGoods": [{ material: "Sonic Flow", vendor: "SITE-1000", qty: 4273.39, remaining_life: 28.5, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FulfilledOrders": [],
  "ExpiredStock": [],
  "ScrappedBatches": [],
};`,type:"code"},name:"Fragile supply (outage rate x 5)",parameterOverrides:{param__outage_rate:"scenario.outage_rate"},scenarioParameters:[{default:.2,identifier:"outage_rate",type:"real"}]},{description:"FAMILY KNOB, not data: no stock anywhere, demand at its mean. Everything must be bought, made, and sold within the horizon.",id:"scenario__depleted",initialState:{content:`return {
  "DemandOutlook": [{ rate: 4.44, diffusion_clock: 0 }],
  "Backlog": [],
  "LostSales": [],
  "ChineseSupplier": 200,
  "IndianSupplier": 200,
  "GermanSupplier": 200,
  "InStock_ChineseSupplier": 1,
  "OutOfStock_ChineseSupplier": 0,
  "InStock_IndianSupplier": 1,
  "OutOfStock_IndianSupplier": 0,
  "InStock_GermanSupplier": 1,
  "OutOfStock_GermanSupplier": 0,
  "SwitchFees": [],
  "LostShipments": [],
  "AtVendor": [],
  "InTransit": [],
  "HoldingCosts": [],
  "RawPriceIndex": [{ level: 1.0, diffusion_clock: 0 }],
  "DelayedShipments": [],
  "DelayLog": [],
  "OrdersPlaced": [],
  "SonaflozinStock": [],
  "FlowbindMaterialStock": [],
  "ProductionLineFree": 1,
  "PlanClock": [{ remaining: 0.5, qty: 699.0 }],
  "InventoryPosition_Sonaflozin": [{ position: 0.00 }],
  "InventoryPosition_FlowbindMaterial": [{ position: 0.00 }],
  "Quarantine": [],
  "RejectedStock": [],
  "RecalledStock": [],
  "DisposalCosts": [],
  "ShortageCosts": [],
  "ProductionOrdersWaiting": [],
  "InProduction": [],
  "FinishedGoods": [],
  "FulfilledOrders": [],
  "ExpiredStock": [],
  "ScrappedBatches": [],
};`,type:"code"},name:"Depleted start (initial stock is 0)",parameterOverrides:{},scenarioParameters:[]},{description:"Shipments hit holds at 0.2/week per open order (~1 in 3 orders on the slow Chinese supplier leg). The stress case for the delayed-shipment mechanism, as Fragile supply is for outages: material ages in the hold and arrives late or expired.",id:"scenario__customs",initialState:{content:`return {
  "DemandOutlook": [{ rate: 4.44, diffusion_clock: 0 }],
  "Backlog": [],
  "LostSales": [],
  "ChineseSupplier": 200,
  "IndianSupplier": 200,
  "GermanSupplier": 200,
  "InStock_ChineseSupplier": 1,
  "OutOfStock_ChineseSupplier": 0,
  "InStock_IndianSupplier": 1,
  "OutOfStock_IndianSupplier": 0,
  "InStock_GermanSupplier": 1,
  "OutOfStock_GermanSupplier": 0,
  "SwitchFees": [],
  "LostShipments": [],
  "AtVendor": [],
  "InTransit": [],
  "HoldingCosts": [],
  "RawPriceIndex": [{ level: 1.0, diffusion_clock: 0 }],
  "DelayedShipments": [],
  "DelayLog": [],
  "OrdersPlaced": [],
  "SonaflozinStock": [{ material: "Sonaflozin", vendor: "Chinese supplier", qty: 689.6, remaining_life: 88.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1305.75, remaining_life: 140.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1840.46, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FlowbindMaterialStock": [{ material: "Flowbind Material", vendor: "Indian supplier", qty: 4688.17, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "ProductionLineFree": 1,
  "PlanClock": [{ remaining: 0.5, qty: 699.0 }],
  "InventoryPosition_Sonaflozin": [{ position: 3835.81 }],
  "InventoryPosition_FlowbindMaterial": [{ position: 4688.17 }],
  "Quarantine": [],
  "RejectedStock": [],
  "RecalledStock": [],
  "DisposalCosts": [],
  "ShortageCosts": [],
  "ProductionOrdersWaiting": [],
  "InProduction": [],
  "FinishedGoods": [{ material: "Sonic Flow", vendor: "SITE-1000", qty: 4273.39, remaining_life: 28.5, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FulfilledOrders": [],
  "ExpiredStock": [],
  "ScrappedBatches": [],
};`,type:"code"},name:"Shipment delays (delay rate x 10)",parameterOverrides:{param__shipment_delay:"scenario.shipment_delay"},scenarioParameters:[{default:.2,identifier:"shipment_delay",type:"real"}]},{description:"The raw-material price index swings hard (typical excursions ~25%) while demand stays at its recorded volatility. The same blind purchasing cadence now produces a different bill every run \u2014 the gap a price-aware Phase B policy gets scored on closing.",id:"scenario__price_swing",initialState:{content:`return {
  "DemandOutlook": [{ rate: 4.44, diffusion_clock: 0 }],
  "Backlog": [],
  "LostSales": [],
  "ChineseSupplier": 200,
  "IndianSupplier": 200,
  "GermanSupplier": 200,
  "InStock_ChineseSupplier": 1,
  "OutOfStock_ChineseSupplier": 0,
  "InStock_IndianSupplier": 1,
  "OutOfStock_IndianSupplier": 0,
  "InStock_GermanSupplier": 1,
  "OutOfStock_GermanSupplier": 0,
  "SwitchFees": [],
  "LostShipments": [],
  "AtVendor": [],
  "InTransit": [],
  "HoldingCosts": [],
  "RawPriceIndex": [{ level: 1.0, diffusion_clock: 0 }],
  "DelayedShipments": [],
  "DelayLog": [],
  "OrdersPlaced": [],
  "SonaflozinStock": [{ material: "Sonaflozin", vendor: "Chinese supplier", qty: 689.6, remaining_life: 88.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1305.75, remaining_life: 140.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1840.46, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FlowbindMaterialStock": [{ material: "Flowbind Material", vendor: "Indian supplier", qty: 4688.17, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "ProductionLineFree": 1,
  "PlanClock": [{ remaining: 0.5, qty: 699.0 }],
  "InventoryPosition_Sonaflozin": [{ position: 3835.81 }],
  "InventoryPosition_FlowbindMaterial": [{ position: 4688.17 }],
  "Quarantine": [],
  "RejectedStock": [],
  "RecalledStock": [],
  "DisposalCosts": [],
  "ShortageCosts": [],
  "ProductionOrdersWaiting": [],
  "InProduction": [],
  "FinishedGoods": [{ material: "Sonic Flow", vendor: "SITE-1000", qty: 4273.39, remaining_life: 28.5, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FulfilledOrders": [],
  "ExpiredStock": [],
  "ScrappedBatches": [],
};`,type:"code"},name:"Volatile prices (price sigma x 4)",parameterOverrides:{param__price_sigma:"scenario.price_sigma"},scenarioParameters:[{default:.16,identifier:"price_sigma",type:"real"}]},{description:"Every stored stock token carries a 0.02/week recall hazard \u2014 whole lots leave the shelves for RecalledStock with disposal costs, and the reorder-point policy has to re-buy through the quarantine pipeline. No data calibrates a normal recall rate, so this is a stress scenario by design (the review's recommendation).",id:"scenario__recall",initialState:{content:`return {
  "DemandOutlook": [{ rate: 4.44, diffusion_clock: 0 }],
  "Backlog": [],
  "LostSales": [],
  "ChineseSupplier": 200,
  "IndianSupplier": 200,
  "GermanSupplier": 200,
  "InStock_ChineseSupplier": 1,
  "OutOfStock_ChineseSupplier": 0,
  "InStock_IndianSupplier": 1,
  "OutOfStock_IndianSupplier": 0,
  "InStock_GermanSupplier": 1,
  "OutOfStock_GermanSupplier": 0,
  "SwitchFees": [],
  "LostShipments": [],
  "AtVendor": [],
  "InTransit": [],
  "HoldingCosts": [],
  "RawPriceIndex": [{ level: 1.0, diffusion_clock: 0 }],
  "DelayedShipments": [],
  "DelayLog": [],
  "OrdersPlaced": [],
  "SonaflozinStock": [{ material: "Sonaflozin", vendor: "Chinese supplier", qty: 689.6, remaining_life: 88.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1305.75, remaining_life: 140.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1840.46, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FlowbindMaterialStock": [{ material: "Flowbind Material", vendor: "Indian supplier", qty: 4688.17, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "ProductionLineFree": 1,
  "PlanClock": [{ remaining: 0.5, qty: 699.0 }],
  "InventoryPosition_Sonaflozin": [{ position: 3835.81 }],
  "InventoryPosition_FlowbindMaterial": [{ position: 4688.17 }],
  "Quarantine": [],
  "RejectedStock": [],
  "RecalledStock": [],
  "DisposalCosts": [],
  "ShortageCosts": [],
  "ProductionOrdersWaiting": [],
  "InProduction": [],
  "FinishedGoods": [{ material: "Sonic Flow", vendor: "SITE-1000", qty: 4273.39, remaining_life: 28.5, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FulfilledOrders": [],
  "ExpiredStock": [],
  "ScrappedBatches": [],
};`,type:"code"},name:"Recall wave (recall hazard armed)",parameterOverrides:{param__recall_rate:"scenario.recall_rate"},scenarioParameters:[{default:.02,identifier:"recall_rate",type:"real"}]},{description:"The Baseline policy (recorded market) scenario with the 6 purchasing-policy parameters plus the production forecast weight (0 = static recorded plan, 1 = dynamic make-to-forecast) exposed for optimisation: reorder point and order-up-to target per material, plus the German supplier top-up threshold and quantity. Defaults reproduce the baseline policy exactly. Search must respect target >= reorder point per material; minimise Policy cost (EUR) and monitor Fill rate, ending backlog, production queue, and expiry.",id:"scenario__optimise",initialState:{content:`return {
  "DemandOutlook": [{ rate: 4.44, diffusion_clock: 0 }],
  "Backlog": [],
  "LostSales": [],
  "ChineseSupplier": 200,
  "IndianSupplier": 200,
  "GermanSupplier": 200,
  "InStock_ChineseSupplier": 1,
  "OutOfStock_ChineseSupplier": 0,
  "InStock_IndianSupplier": 1,
  "OutOfStock_IndianSupplier": 0,
  "InStock_GermanSupplier": 1,
  "OutOfStock_GermanSupplier": 0,
  "SwitchFees": [],
  "LostShipments": [],
  "AtVendor": [],
  "InTransit": [],
  "HoldingCosts": [],
  "RawPriceIndex": [{ level: 1.0, diffusion_clock: 0 }],
  "DelayedShipments": [],
  "DelayLog": [],
  "OrdersPlaced": [],
  "SonaflozinStock": [{ material: "Sonaflozin", vendor: "Chinese supplier", qty: 689.6, remaining_life: 88.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1305.75, remaining_life: 140.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }, { material: "Sonaflozin", vendor: "Chinese supplier", qty: 1840.46, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FlowbindMaterialStock": [{ material: "Flowbind Material", vendor: "Indian supplier", qty: 4688.17, remaining_life: 156.0, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "ProductionLineFree": 1,
  "PlanClock": [{ remaining: 0.5, qty: 699.0 }],
  "InventoryPosition_Sonaflozin": [{ position: 3835.81 }],
  "InventoryPosition_FlowbindMaterial": [{ position: 4688.17 }],
  "Quarantine": [],
  "RejectedStock": [],
  "RecalledStock": [],
  "DisposalCosts": [],
  "ShortageCosts": [],
  "ProductionOrdersWaiting": [],
  "InProduction": [],
  "FinishedGoods": [{ material: "Sonic Flow", vendor: "SITE-1000", qty: 4273.39, remaining_life: 28.5, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  "FulfilledOrders": [],
  "ExpiredStock": [],
  "ScrappedBatches": [],
};`,type:"code"},name:"Optimise policy (recorded market)",parameterOverrides:{param__forecast_weight:"scenario.forecast_weight",param__rop_r0006:"scenario.rop_sonaflozin",param__rop_r0025:"scenario.rop_flowbind",param__target_r0006:"scenario.target_sonaflozin",param__target_r0025:"scenario.target_flowbind",param__topup_qty:"scenario.topup_qty",param__topup_threshold:"scenario.topup_threshold"},scenarioParameters:[{default:2200,identifier:"rop_sonaflozin",type:"real"},{default:6e3,identifier:"target_sonaflozin",type:"real"},{default:1400,identifier:"rop_flowbind",type:"real"},{default:5e3,identifier:"target_flowbind",type:"real"},{default:700,identifier:"topup_threshold",type:"real"},{default:250,identifier:"topup_qty",type:"real"},{default:1,identifier:"forecast_weight",type:"real"}]}],subnets:[],transitions:[{id:"transition__diffusion",inputArcs:[{placeId:"place__demand",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["DemandOutlook"][0].diffusion_clock <= 0;
});`,lambdaType:"predicate",name:"Shift the demand rate (diffusion step)",outputArcs:[{placeId:"place__demand",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const m = input["DemandOutlook"][0];
  return {
    "DemandOutlook": [{
      // Kernel values may be Distributions but not arithmetic on them,
      // so the sample is not clampable here; the mean is clamped, and
      // the arrival lambda clamps at the point of use.
      rate: Distribution.Gaussian(Math.max(m.rate, 0),
        parameters.demand_sigma * Math.sqrt(parameters.diffusion_step)),
      diffusion_clock: parameters.diffusion_step,
    }],
  };
});`,x:1095,y:-705},{id:"transition__order_contract_small",inputArcs:[{placeId:"place__demand",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return parameters.contract_share * parameters.small_share * Math.max(0, input["DemandOutlook"][0].rate);
});`,lambdaType:"stochastic",name:"Receive a contract order (small)",outputArcs:[{placeId:"place__demand",weight:1},{placeId:"place__backlog",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const m = input["DemandOutlook"][0];
  return {
    "DemandOutlook": [{ rate: m.rate, diffusion_clock: m.diffusion_clock }],
    "Backlog": [{ kind: "contract", waited: 0, patience: 0, qty: Distribution.Gaussian(parameters.small_qty_mean, parameters.small_qty_sd).map((v) => Math.max(v, 5)) }],
  };
});`,x:1335,y:-420},{id:"transition__order_contract_bulk",inputArcs:[{placeId:"place__demand",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return parameters.contract_share * (1 - parameters.small_share) * Math.max(0, input["DemandOutlook"][0].rate);
});`,lambdaType:"stochastic",name:"Receive a contract order (bulk)",outputArcs:[{placeId:"place__demand",weight:1},{placeId:"place__backlog",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const m = input["DemandOutlook"][0];
  return {
    "DemandOutlook": [{ rate: m.rate, diffusion_clock: m.diffusion_clock }],
    "Backlog": [{ kind: "contract", waited: 0, patience: 0, qty: Distribution.Gaussian(parameters.bulk_qty_mean, parameters.bulk_qty_sd).map((v) => Math.max(v, 5)) }],
  };
});`,x:1335,y:-330},{id:"transition__order_spot_small",inputArcs:[{placeId:"place__demand",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return (1 - parameters.contract_share) * parameters.small_share * Math.max(0, input["DemandOutlook"][0].rate);
});`,lambdaType:"stochastic",name:"Receive a spot order (small)",outputArcs:[{placeId:"place__demand",weight:1},{placeId:"place__backlog",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const m = input["DemandOutlook"][0];
  return {
    "DemandOutlook": [{ rate: m.rate, diffusion_clock: m.diffusion_clock }],
    "Backlog": [{ kind: "spot", waited: 0, patience: Distribution.Gaussian(parameters.patience_weeks, parameters.spot_patience_sd).map((v) => Math.max(v, 0.5)), qty: Distribution.Gaussian(parameters.small_qty_mean, parameters.small_qty_sd).map((v) => Math.max(v, 5)) }],
  };
});`,x:1335,y:-600},{id:"transition__order_spot_bulk",inputArcs:[{placeId:"place__demand",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return (1 - parameters.contract_share) * (1 - parameters.small_share) * Math.max(0, input["DemandOutlook"][0].rate);
});`,lambdaType:"stochastic",name:"Receive a spot order (bulk)",outputArcs:[{placeId:"place__demand",weight:1},{placeId:"place__backlog",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const m = input["DemandOutlook"][0];
  return {
    "DemandOutlook": [{ rate: m.rate, diffusion_clock: m.diffusion_clock }],
    "Backlog": [{ kind: "spot", waited: 0, patience: Distribution.Gaussian(parameters.patience_weeks, parameters.spot_patience_sd).map((v) => Math.max(v, 0.5)), qty: Distribution.Gaussian(parameters.bulk_qty_mean, parameters.bulk_qty_sd).map((v) => Math.max(v, 5)) }],
  };
});`,x:1335,y:-690},{id:"transition__cancel",inputArcs:[{placeId:"place__backlog",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["Backlog"][0].kind === "spot" ? parameters.cancel_rate * input["Backlog"][0].waited * input["Backlog"][0].waited / (input["Backlog"][0].patience * input["Backlog"][0].patience) : 0.0;
});`,lambdaType:"stochastic",name:"Cancel a spot order (patience hazard)",outputArcs:[{placeId:"place__lost",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  return {
    "LostSales": [{ kind: "spot", value: input["Backlog"][0].qty }],
  };
});`,x:1815,y:-600},{id:"transition__order_v1",inputArcs:[{placeId:"place__supplier_1",type:"standard",weight:1},{placeId:"place__up_1",type:"standard",weight:1},{placeId:"place__price",type:"standard",weight:1},{placeId:"place__pos_1",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["InventoryPosition_Sonaflozin"][0].position < parameters.rop_sonaflozin ? parameters.review_rate : 0.0;
});`,lambdaType:"stochastic",name:"Order Sonaflozin (reorder-point policy, Chinese supplier)",outputArcs:[{placeId:"place__at_vendor",weight:1},{placeId:"place__orders_placed",weight:1},{placeId:"place__up_1",weight:1},{placeId:"place__price",weight:1},{placeId:"place__pos_1",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const px = input["RawPriceIndex"][0];
  const p = input["InventoryPosition_Sonaflozin"][0];
  const q = Math.max(parameters.moq_chinese, Math.ceil((parameters.target_sonaflozin - p.position) / parameters.round_chinese) * parameters.round_chinese);
  const price = 89.43 * Math.max(px.level, 0.1);
  return {
    "RawPriceIndex": [{ level: px.level, diffusion_clock: px.diffusion_clock }],
    "AtVendor": [{ material: "Sonaflozin", vendor: "Chinese supplier", qty: q, remaining_life: parameters.shelf_life_sonaflozin, holding_eur: 0, unit_price: price, dispatch_clock: parameters.dispatch_time, transit_clock: Distribution.Gaussian(3.0286, 0.4714) }],
    "OrdersPlaced": [{ material: "Sonaflozin", vendor: "Chinese supplier", qty: q, remaining_life: parameters.shelf_life_sonaflozin, holding_eur: 0, unit_price: price, dispatch_clock: 0, transit_clock: 0 }],
    "InventoryPosition_Sonaflozin": [{ position: p.position + q }],
  };
});`,x:-1725,y:-360},{id:"transition__order_v2",inputArcs:[{placeId:"place__supplier_2",type:"standard",weight:1},{placeId:"place__up_2",type:"standard",weight:1},{placeId:"place__price",type:"standard",weight:1},{placeId:"place__pos_2",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["InventoryPosition_FlowbindMaterial"][0].position < parameters.rop_flowbind ? parameters.review_rate : 0.0;
});`,lambdaType:"stochastic",name:"Order Flowbind Material (reorder-point policy, Indian supplier)",outputArcs:[{placeId:"place__at_vendor",weight:1},{placeId:"place__orders_placed",weight:1},{placeId:"place__up_2",weight:1},{placeId:"place__price",weight:1},{placeId:"place__pos_2",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const px = input["RawPriceIndex"][0];
  const p = input["InventoryPosition_FlowbindMaterial"][0];
  const q = Math.max(parameters.moq_indian, Math.ceil((parameters.target_flowbind - p.position) / parameters.round_indian) * parameters.round_indian);
  const price = 109.91 * Math.max(px.level, 0.1);
  return {
    "RawPriceIndex": [{ level: px.level, diffusion_clock: px.diffusion_clock }],
    "AtVendor": [{ material: "Flowbind Material", vendor: "Indian supplier", qty: q, remaining_life: parameters.shelf_life_flowbind, holding_eur: 0, unit_price: price, dispatch_clock: parameters.dispatch_time, transit_clock: Distribution.Gaussian(0.9714, 0.5286) }],
    "OrdersPlaced": [{ material: "Flowbind Material", vendor: "Indian supplier", qty: q, remaining_life: parameters.shelf_life_flowbind, holding_eur: 0, unit_price: price, dispatch_clock: 0, transit_clock: 0 }],
    "InventoryPosition_FlowbindMaterial": [{ position: p.position + q }],
  };
});`,x:-1725,y:-135},{id:"transition__order_v3",inputArcs:[{placeId:"place__supplier_3",type:"standard",weight:1},{placeId:"place__up_3",type:"standard",weight:1},{placeId:"place__price",type:"standard",weight:1},{placeId:"place__pos_2",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["InventoryPosition_FlowbindMaterial"][0].position < parameters.topup_threshold ? parameters.review_rate : 0.0;
});`,lambdaType:"stochastic",name:"Top up Flowbind Material (urgency threshold, German supplier)",outputArcs:[{placeId:"place__at_vendor",weight:1},{placeId:"place__orders_placed",weight:1},{placeId:"place__up_3",weight:1},{placeId:"place__price",weight:1},{placeId:"place__pos_2",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const px = input["RawPriceIndex"][0];
  const p = input["InventoryPosition_FlowbindMaterial"][0];
  const q = parameters.topup_qty;
  const price = 81.73 * Math.max(px.level, 0.1);
  return {
    "RawPriceIndex": [{ level: px.level, diffusion_clock: px.diffusion_clock }],
    "AtVendor": [{ material: "Flowbind Material", vendor: "German supplier", qty: q, remaining_life: parameters.shelf_life_flowbind, holding_eur: 0, unit_price: price, dispatch_clock: parameters.dispatch_time, transit_clock: Distribution.Gaussian(1.1571, 0.1286) }],
    "OrdersPlaced": [{ material: "Flowbind Material", vendor: "German supplier", qty: q, remaining_life: parameters.shelf_life_flowbind, holding_eur: 0, unit_price: price, dispatch_clock: 0, transit_clock: 0 }],
    "InventoryPosition_FlowbindMaterial": [{ position: p.position + q }],
  };
});`,x:-1725,y:90},{id:"transition__order_substitute",inputArcs:[{placeId:"place__supplier_3",type:"standard",weight:1},{placeId:"place__down_2",type:"standard",weight:1},{placeId:"place__up_3",type:"standard",weight:1},{placeId:"place__price",type:"standard",weight:1},{placeId:"place__pos_2",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["InventoryPosition_FlowbindMaterial"][0].position < parameters.rop_flowbind ? parameters.review_rate : 0.0;
});`,lambdaType:"stochastic",name:"Substitute order Flowbind Material (Indian supplier out; policy qty via German supplier)",outputArcs:[{placeId:"place__at_vendor",weight:1},{placeId:"place__orders_placed",weight:1},{placeId:"place__switch_fees",weight:1},{placeId:"place__down_2",weight:1},{placeId:"place__up_3",weight:1},{placeId:"place__price",weight:1},{placeId:"place__pos_2",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const px = input["RawPriceIndex"][0];
  const p = input["InventoryPosition_FlowbindMaterial"][0];
  const q = Math.max(parameters.round_german, Math.ceil((parameters.target_flowbind - p.position) / parameters.round_german) * parameters.round_german);
  const price = 81.73 * Math.max(px.level, 0.1);
  return {
    "RawPriceIndex": [{ level: px.level, diffusion_clock: px.diffusion_clock }],
    "AtVendor": [{ material: "Flowbind Material", vendor: "German supplier", qty: q, remaining_life: parameters.shelf_life_flowbind, holding_eur: 0, unit_price: price, dispatch_clock: parameters.dispatch_time, transit_clock: Distribution.Gaussian(1.1571, 0.1286) }],
    "OrdersPlaced": [{ material: "Flowbind Material", vendor: "German supplier", qty: q, remaining_life: parameters.shelf_life_flowbind, holding_eur: 0, unit_price: price, dispatch_clock: 0, transit_clock: 0 }],
    "SwitchFees": [{ kind: "switch", value: parameters.switch_cost }],
    "InventoryPosition_FlowbindMaterial": [{ position: p.position + q }],
  };
});`,x:-1725,y:360},{id:"transition__deliver_v1",inputArcs:[{placeId:"place__in_transit",type:"standard",weight:1},{placeId:"place__pos_1",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["InTransit"][0].vendor === "Chinese supplier" && input["InTransit"][0].transit_clock <= 0;
});`,lambdaType:"predicate",name:"Goods receipt into quarantine (Chinese supplier)",outputArcs:[{placeId:"place__quarantine",weight:1},{placeId:"place__pos_1",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["InTransit"][0];
  const p = input["InventoryPosition_Sonaflozin"][0];
  return {
    "Quarantine": [{ material: c.material, vendor: c.vendor, qty: c.qty, remaining_life: c.remaining_life, holding_eur: c.holding_eur, unit_price: c.unit_price, dispatch_clock: c.dispatch_clock, transit_clock: c.transit_clock }],
    "InventoryPosition_Sonaflozin": [{ position: p.position - c.qty }],
  };
});`,x:-675,y:-240},{id:"transition__deliver_v2",inputArcs:[{placeId:"place__in_transit",type:"standard",weight:1},{placeId:"place__pos_2",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["InTransit"][0].vendor === "Indian supplier" && input["InTransit"][0].transit_clock <= 0;
});`,lambdaType:"predicate",name:"Goods receipt into quarantine (Indian supplier)",outputArcs:[{placeId:"place__quarantine",weight:1},{placeId:"place__pos_2",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["InTransit"][0];
  const p = input["InventoryPosition_FlowbindMaterial"][0];
  return {
    "Quarantine": [{ material: c.material, vendor: c.vendor, qty: c.qty, remaining_life: c.remaining_life, holding_eur: c.holding_eur, unit_price: c.unit_price, dispatch_clock: c.dispatch_clock, transit_clock: c.transit_clock }],
    "InventoryPosition_FlowbindMaterial": [{ position: p.position - c.qty }],
  };
});`,x:-675,y:-105},{id:"transition__deliver_v3",inputArcs:[{placeId:"place__in_transit",type:"standard",weight:1},{placeId:"place__pos_2",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["InTransit"][0].vendor === "German supplier" && input["InTransit"][0].transit_clock <= 0;
});`,lambdaType:"predicate",name:"Goods receipt into quarantine (German supplier)",outputArcs:[{placeId:"place__quarantine",weight:1},{placeId:"place__pos_2",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["InTransit"][0];
  const p = input["InventoryPosition_FlowbindMaterial"][0];
  return {
    "Quarantine": [{ material: c.material, vendor: c.vendor, qty: c.qty, remaining_life: c.remaining_life, holding_eur: c.holding_eur, unit_price: c.unit_price, dispatch_clock: c.dispatch_clock, transit_clock: c.transit_clock }],
    "InventoryPosition_FlowbindMaterial": [{ position: p.position - c.qty }],
  };
});`,x:-675,y:30},{id:"transition__start_batch",inputArcs:[{placeId:"place__line",type:"standard",weight:1},{placeId:"place__raw_1",type:"standard",weight:1},{placeId:"place__raw_2",type:"standard",weight:1},{placeId:"place__schedule",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["SonaflozinStock"][0].qty >= input["ProductionOrdersWaiting"][0].consume_sonaflozin && input["SonaflozinStock"][0].remaining_life > 0 && input["FlowbindMaterialStock"][0].qty >= input["ProductionOrdersWaiting"][0].consume_flowbind && input["FlowbindMaterialStock"][0].remaining_life > 0 ? parameters.production_start_rate * Math.exp(parameters.fefo_strength * (1 - (input["SonaflozinStock"][0].remaining_life + input["FlowbindMaterialStock"][0].remaining_life) / 320)) : 0.0;
});`,lambdaType:"stochastic",name:"Start a scheduled batch (Sonic Flow)",outputArcs:[{placeId:"place__wip",weight:1},{placeId:"place__raw_1",weight:1},{placeId:"place__raw_2",weight:1},{placeId:"place__shortage_costs",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const a = input["SonaflozinStock"][0];
  const b = input["FlowbindMaterialStock"][0];
  const s = input["ProductionOrdersWaiting"][0];
  return {
    "SonaflozinStock": [{ material: a.material, vendor: a.vendor, qty: a.qty - s.consume_sonaflozin, remaining_life: a.remaining_life, holding_eur: a.holding_eur, unit_price: a.unit_price, dispatch_clock: 0, transit_clock: 0 }],
    "FlowbindMaterialStock": [{ material: b.material, vendor: b.vendor, qty: b.qty - s.consume_flowbind, remaining_life: b.remaining_life, holding_eur: b.holding_eur, unit_price: b.unit_price, dispatch_clock: 0, transit_clock: 0 }],
    "InProduction": [{ remaining: parameters.production_time, qty: s.produce_qty }],
    "ShortageCosts": [{ kind: "shortage", value: s.waited * s.produce_qty * parameters.shortage_cost_rate }],
  };
});`,x:540,y:0},{id:"transition__complete_batch",inputArcs:[{placeId:"place__wip",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["InProduction"][0].remaining <= 0;
});`,lambdaType:"predicate",name:"Complete a batch",outputArcs:[{placeId:"place__line",weight:1},{placeId:"place__fg",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const job = input["InProduction"][0];
  return {
    "FinishedGoods": [{ material: "Sonic Flow", vendor: "SITE-1000", qty: job.qty, remaining_life: parameters.shelf_life_sonic_flow, holding_eur: 0, unit_price: 0, dispatch_clock: 0, transit_clock: 0 }],
  };
});`,x:1170,y:-90},{id:"transition__scrap_batch",inputArcs:[{placeId:"place__wip",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return parameters.scrap_rate;
});`,lambdaType:"stochastic",name:"Scrap a batch (QC failure)",outputArcs:[{placeId:"place__line",weight:1},{placeId:"place__scrap",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  return {
    "ScrappedBatches": [{ kind: "scrap", value: input["InProduction"][0].qty }],
  };
});`,x:1170,y:150},{id:"transition__fulfil",inputArcs:[{placeId:"place__backlog",type:"standard",weight:1},{placeId:"place__fg",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["FinishedGoods"][0].qty >= input["Backlog"][0].qty && input["FinishedGoods"][0].remaining_life > 0 ? parameters.fulfil_rate * Math.exp(parameters.fefo_strength * (1 - input["FinishedGoods"][0].remaining_life / 52)) : 0.0;
});`,lambdaType:"stochastic",name:"Fulfil an order (its recorded-size qty)",outputArcs:[{placeId:"place__fg",weight:1},{placeId:"place__sales",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const fg = input["FinishedGoods"][0];
  const o = input["Backlog"][0];
  // qty is clamped at creation (arrival kernels): use it raw
  const oq = o.qty;
  return {
    "FinishedGoods": [{ material: fg.material, vendor: fg.vendor, qty: fg.qty - oq, remaining_life: fg.remaining_life, holding_eur: fg.holding_eur, unit_price: fg.unit_price, dispatch_clock: 0, transit_clock: 0 }],
    "FulfilledOrders": [{ kind: o.kind, qty: oq, lead_time: o.waited,
      tardiness: o.kind === "contract"
        ? Math.max(0, o.waited - parameters.delivery_window) : 0 }],
  };
});`,x:1815,y:-420},{id:"transition__lose_shipment",inputArcs:[{placeId:"place__in_transit",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return parameters.shipment_loss_rate;
});`,lambdaType:"stochastic",name:"Lose a shipment (vendor reships)",outputArcs:[{placeId:"place__lost_shipments",weight:1},{placeId:"place__at_vendor",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["InTransit"][0];
  return {
    "LostShipments": [{ kind: c.vendor, value: c.qty * c.unit_price }],
    "AtVendor": [{ material: c.material, vendor: c.vendor, qty: c.qty, remaining_life: c.material === "Sonaflozin" ? parameters.shelf_life_sonaflozin : parameters.shelf_life_flowbind, holding_eur: c.holding_eur, unit_price: c.unit_price, dispatch_clock: parameters.dispatch_time, transit_clock: c.vendor === "Chinese supplier" ? 3.0286 : c.vendor === "Indian supplier" ? 0.9714 : 1.1571 }],
  };
});`,x:-675,y:-390},{id:"transition__stockout_0002",inputArcs:[{placeId:"place__up_1",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return parameters.outage_rate;
});`,lambdaType:"stochastic",name:"Run out of stock (Chinese supplier)",outputArcs:[{placeId:"place__down_1",weight:1}],transitionKernelCode:"",x:-1215,y:-1275},{id:"transition__restock_0002",inputArcs:[{placeId:"place__down_1",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return parameters.restock_rate;
});`,lambdaType:"stochastic",name:"Restock (Chinese supplier)",outputArcs:[{placeId:"place__up_1",weight:1}],transitionKernelCode:"",x:-765,y:-1275},{id:"transition__stockout_0016",inputArcs:[{placeId:"place__up_2",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return parameters.outage_rate;
});`,lambdaType:"stochastic",name:"Run out of stock (Indian supplier)",outputArcs:[{placeId:"place__down_2",weight:1}],transitionKernelCode:"",x:-1200,y:-750},{id:"transition__restock_0016",inputArcs:[{placeId:"place__down_2",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return parameters.restock_rate;
});`,lambdaType:"stochastic",name:"Restock (Indian supplier)",outputArcs:[{placeId:"place__up_2",weight:1}],transitionKernelCode:"",x:-780,y:-750},{id:"transition__stockout_0018",inputArcs:[{placeId:"place__up_3",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return parameters.outage_rate;
});`,lambdaType:"stochastic",name:"Run out of stock (German supplier)",outputArcs:[{placeId:"place__down_3",weight:1}],transitionKernelCode:"",x:-1200,y:-1020},{id:"transition__restock_0018",inputArcs:[{placeId:"place__down_3",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return parameters.restock_rate;
});`,lambdaType:"stochastic",name:"Restock (German supplier)",outputArcs:[{placeId:"place__up_3",weight:1}],transitionKernelCode:"",x:-765,y:-1020},{id:"transition__merge_1",inputArcs:[{placeId:"place__raw_1",type:"standard",weight:2}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["SonaflozinStock"][0].qty > 0.5 && input["SonaflozinStock"][0].qty < 1000 && input["SonaflozinStock"][1].qty > 0.5 && input["SonaflozinStock"][1].qty < 1000 ? parameters.handling_rate : 0.0;
});`,lambdaType:"stochastic",name:"Consolidate part-used stock (Sonaflozin)",outputArcs:[{placeId:"place__raw_1",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const a = input["SonaflozinStock"][0];
  const b = input["SonaflozinStock"][1];
  return {
    "SonaflozinStock": [{ material: a.material, vendor: a.vendor, qty: a.qty + b.qty, remaining_life: Math.min(a.remaining_life, b.remaining_life), holding_eur: a.holding_eur + b.holding_eur, unit_price: (a.qty * a.unit_price + b.qty * b.unit_price) / (a.qty + b.qty), dispatch_clock: 0, transit_clock: 0 }],
  };
});`,x:540,y:-540},{id:"transition__merge_2",inputArcs:[{placeId:"place__raw_2",type:"standard",weight:2}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["FlowbindMaterialStock"][0].qty > 0.5 && input["FlowbindMaterialStock"][0].qty < 1000 && input["FlowbindMaterialStock"][1].qty > 0.5 && input["FlowbindMaterialStock"][1].qty < 1000 ? parameters.handling_rate : 0.0;
});`,lambdaType:"stochastic",name:"Consolidate part-used stock (Flowbind Material)",outputArcs:[{placeId:"place__raw_2",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const a = input["FlowbindMaterialStock"][0];
  const b = input["FlowbindMaterialStock"][1];
  return {
    "FlowbindMaterialStock": [{ material: a.material, vendor: a.vendor, qty: a.qty + b.qty, remaining_life: Math.min(a.remaining_life, b.remaining_life), holding_eur: a.holding_eur + b.holding_eur, unit_price: (a.qty * a.unit_price + b.qty * b.unit_price) / (a.qty + b.qty), dispatch_clock: 0, transit_clock: 0 }],
  };
});`,x:525,y:555},{id:"transition__discard_1",inputArcs:[{placeId:"place__raw_1",type:"standard",weight:1},{placeId:"place__pos_1",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["SonaflozinStock"][0].qty <= 0.5;
});`,lambdaType:"predicate",name:"Discard emptied stock (Sonaflozin)",outputArcs:[{placeId:"place__holding",weight:1},{placeId:"place__pos_1",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["SonaflozinStock"][0];
  const p = input["InventoryPosition_Sonaflozin"][0];
  return {
    "HoldingCosts": [{ kind: "holding", value: c.holding_eur }],
    "InventoryPosition_Sonaflozin": [{ position: p.position - c.qty }],
  };
});`,x:825,y:-465},{id:"transition__discard_2",inputArcs:[{placeId:"place__raw_2",type:"standard",weight:1},{placeId:"place__pos_2",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["FlowbindMaterialStock"][0].qty <= 0.5;
});`,lambdaType:"predicate",name:"Discard emptied stock (Flowbind Material)",outputArcs:[{placeId:"place__holding",weight:1},{placeId:"place__pos_2",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["FlowbindMaterialStock"][0];
  const p = input["InventoryPosition_FlowbindMaterial"][0];
  return {
    "HoldingCosts": [{ kind: "holding", value: c.holding_eur }],
    "InventoryPosition_FlowbindMaterial": [{ position: p.position - c.qty }],
  };
});`,x:825,y:315},{id:"transition__discard_fg",inputArcs:[{placeId:"place__fg",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["FinishedGoods"][0].qty <= 0.5;
});`,lambdaType:"predicate",name:"Discard emptied stock (Sonic Flow)",outputArcs:[{placeId:"place__holding",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["FinishedGoods"][0];
  return {
    "HoldingCosts": [{ kind: "holding", value: c.holding_eur }],
  };
});`,x:1815,y:105},{id:"transition__expire_1",inputArcs:[{placeId:"place__raw_1",type:"standard",weight:1},{placeId:"place__pos_1",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["SonaflozinStock"][0].remaining_life <= 0 && input["SonaflozinStock"][0].qty > 0.5;
});`,lambdaType:"predicate",name:"Write off expired stock (Sonaflozin)",outputArcs:[{placeId:"place__expired",weight:1},{placeId:"place__holding",weight:1},{placeId:"place__pos_1",weight:1},{placeId:"place__disposal",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["SonaflozinStock"][0];
  const p = input["InventoryPosition_Sonaflozin"][0];
  return {
    "ExpiredStock": [{ kind: c.material, value: c.qty }],
    "HoldingCosts": [{ kind: "holding", value: c.holding_eur }],
    "DisposalCosts": [{ kind: "expiry", value: c.qty * parameters.disposal_cost }],
    "InventoryPosition_Sonaflozin": [{ position: p.position - c.qty }],
  };
});`,x:825,y:-315},{id:"transition__expire_2",inputArcs:[{placeId:"place__raw_2",type:"standard",weight:1},{placeId:"place__pos_2",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["FlowbindMaterialStock"][0].remaining_life <= 0 && input["FlowbindMaterialStock"][0].qty > 0.5;
});`,lambdaType:"predicate",name:"Write off expired stock (Flowbind Material)",outputArcs:[{placeId:"place__expired",weight:1},{placeId:"place__holding",weight:1},{placeId:"place__pos_2",weight:1},{placeId:"place__disposal",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["FlowbindMaterialStock"][0];
  const p = input["InventoryPosition_FlowbindMaterial"][0];
  return {
    "ExpiredStock": [{ kind: c.material, value: c.qty }],
    "HoldingCosts": [{ kind: "holding", value: c.holding_eur }],
    "DisposalCosts": [{ kind: "expiry", value: c.qty * parameters.disposal_cost }],
    "InventoryPosition_FlowbindMaterial": [{ position: p.position - c.qty }],
  };
});`,x:825,y:465},{id:"transition__expire_fg",inputArcs:[{placeId:"place__fg",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["FinishedGoods"][0].remaining_life <= 0 && input["FinishedGoods"][0].qty > 0.5;
});`,lambdaType:"predicate",name:"Write off expired stock (Sonic Flow)",outputArcs:[{placeId:"place__expired",weight:1},{placeId:"place__holding",weight:1},{placeId:"place__disposal",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["FinishedGoods"][0];
  return {
    "ExpiredStock": [{ kind: c.material, value: c.qty }],
    "HoldingCosts": [{ kind: "holding", value: c.holding_eur }],
  "DisposalCosts": [{ kind: "expiry", value: c.qty * parameters.disposal_cost }],
  };
});`,x:1815,y:-75},{id:"transition__delay_shipment",inputArcs:[{placeId:"place__in_transit",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return parameters.shipment_delay_rate;
});`,lambdaType:"stochastic",name:"Delay a shipment (customs / GR hold)",outputArcs:[{placeId:"place__delayed",weight:1},{placeId:"place__delay_log",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["InTransit"][0];
  return {
    "DelayedShipments": [{ material: c.material, vendor: c.vendor, qty: c.qty, remaining_life: c.remaining_life, holding_eur: c.holding_eur, unit_price: c.unit_price, dispatch_clock: c.dispatch_clock, transit_clock: c.transit_clock }],
    "DelayLog": [{ kind: c.vendor, value: c.qty }],
  };
});`,x:-675,y:195},{id:"transition__release_delayed_1",inputArcs:[{placeId:"place__delayed",type:"standard",weight:1},{placeId:"place__pos_1",type:"standard",weight:1},{placeId:"place__pos_2",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return parameters.delayed_release_rate;
});`,lambdaType:"stochastic",name:"Release a held shipment (into quarantine)",outputArcs:[{placeId:"place__quarantine",weight:1},{placeId:"place__pos_1",weight:1},{placeId:"place__pos_2",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["DelayedShipments"][0];
  const p1 = input["InventoryPosition_Sonaflozin"][0];
  const p2 = input["InventoryPosition_FlowbindMaterial"][0];
  return {
    "Quarantine": [{ material: c.material, vendor: c.vendor, qty: c.qty, remaining_life: c.remaining_life, holding_eur: c.holding_eur, unit_price: c.unit_price, dispatch_clock: c.dispatch_clock, transit_clock: c.transit_clock }],
    "InventoryPosition_Sonaflozin": [{ position: c.material === "Sonaflozin" ? p1.position - c.qty : p1.position }],
    "InventoryPosition_FlowbindMaterial": [{ position: c.material === "Flowbind Material" ? p2.position - c.qty : p2.position }],
  };
});`,x:-195,y:375},{id:"transition__ship_0002",inputArcs:[{placeId:"place__at_vendor",type:"standard",weight:1},{placeId:"place__up_1",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["AtVendor"][0].vendor === "Chinese supplier" && input["AtVendor"][0].dispatch_clock <= 0;
});`,lambdaType:"predicate",name:"Ship an order (Chinese supplier dispatches)",outputArcs:[{placeId:"place__in_transit",weight:1},{placeId:"place__up_1",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["AtVendor"][0];
  return {
    "InTransit": [{ material: c.material, vendor: c.vendor, qty: c.qty, remaining_life: c.remaining_life, holding_eur: c.holding_eur, unit_price: c.unit_price, dispatch_clock: c.dispatch_clock, transit_clock: c.transit_clock }],
  };
});`,x:-1200,y:-390},{id:"transition__ship_0016",inputArcs:[{placeId:"place__at_vendor",type:"standard",weight:1},{placeId:"place__up_2",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["AtVendor"][0].vendor === "Indian supplier" && input["AtVendor"][0].dispatch_clock <= 0;
});`,lambdaType:"predicate",name:"Ship an order (Indian supplier dispatches)",outputArcs:[{placeId:"place__in_transit",weight:1},{placeId:"place__up_2",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["AtVendor"][0];
  return {
    "InTransit": [{ material: c.material, vendor: c.vendor, qty: c.qty, remaining_life: c.remaining_life, holding_eur: c.holding_eur, unit_price: c.unit_price, dispatch_clock: c.dispatch_clock, transit_clock: c.transit_clock }],
  };
});`,x:-1200,y:-240},{id:"transition__ship_0018",inputArcs:[{placeId:"place__at_vendor",type:"standard",weight:1},{placeId:"place__up_3",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["AtVendor"][0].vendor === "German supplier" && input["AtVendor"][0].dispatch_clock <= 0;
});`,lambdaType:"predicate",name:"Ship an order (German supplier dispatches)",outputArcs:[{placeId:"place__in_transit",weight:1},{placeId:"place__up_3",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["AtVendor"][0];
  return {
    "InTransit": [{ material: c.material, vendor: c.vendor, qty: c.qty, remaining_life: c.remaining_life, holding_eur: c.holding_eur, unit_price: c.unit_price, dispatch_clock: c.dispatch_clock, transit_clock: c.transit_clock }],
  };
});`,x:-1200,y:-90},{id:"transition__price_diffusion",inputArcs:[{placeId:"place__price",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["RawPriceIndex"][0].diffusion_clock <= 0;
});`,lambdaType:"predicate",name:"Shift the price index (diffusion step)",outputArcs:[{placeId:"place__price",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const p = input["RawPriceIndex"][0];
  return {
    "RawPriceIndex": [{
      // Mean clamped; the level is clamped again at the point of
      // use (a Distribution cannot sit inside arithmetic).
      level: Distribution.Gaussian(Math.max(p.level, 0.1),
        parameters.price_sigma * Math.sqrt(parameters.diffusion_step)),
      diffusion_clock: parameters.diffusion_step,
    }],
  };
});`,x:-1710,y:825},{id:"transition__schedule_batch",inputArcs:[{placeId:"place__plan_clock",type:"standard",weight:1},{placeId:"place__pos_1",type:"standard",weight:1},{placeId:"place__pos_2",type:"standard",weight:1},{placeId:"place__demand",type:"read",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["PlanClock"][0].remaining <= 0;
});`,lambdaType:"predicate",name:"Scheduled production order (forecast-weighted plan)",outputArcs:[{placeId:"place__plan_clock",weight:1},{placeId:"place__schedule",weight:1},{placeId:"place__pos_1",weight:1},{placeId:"place__pos_2",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const pc = input["PlanClock"][0];
  const m = input["DemandOutlook"][0];
  const p1 = input["InventoryPosition_Sonaflozin"][0];
  const p2 = input["InventoryPosition_FlowbindMaterial"][0];
  // Make-to-forecast: expected demand over the coming plan
  // period at the live OU arrival rate, in units (mixture
  // mean order size). Blended with the clock-carried static
  // draw by forecast_weight: 0 replays the recorded plan,
  // 1 is fully demand-tracking. Stored attributes and
  // parameters only \u2014 a fresh Distribution sample cannot
  // sit inside arithmetic.
  const qtyPerOrder = parameters.small_share * parameters.small_qty_mean + (1 - parameters.small_share) * parameters.bulk_qty_mean;
  const forecastQty = Math.max(m.rate, 0) * parameters.plan_period * qtyPerOrder;
  const produce = Math.max((1 - parameters.forecast_weight) * pc.qty + parameters.forecast_weight * forecastQty, 100);
  const need1 = produce * parameters.bom_sonaflozin_per_unit;
  const need2 = produce * parameters.bom_flowbind_per_unit;
  return {
    "PlanClock": [{ remaining: parameters.plan_period, qty: Distribution.Gaussian(parameters.batch_qty_mean, parameters.batch_qty_sd) }],
    "ProductionOrdersWaiting": [{ produce_qty: produce, consume_sonaflozin: need1, consume_flowbind: need2, waited: 0 }],
    "InventoryPosition_Sonaflozin": [{ position: p1.position - need1 }],
    "InventoryPosition_FlowbindMaterial": [{ position: p2.position - need2 }],
  };
});`,x:105,y:0},{id:"transition__qc_release_1",inputArcs:[{placeId:"place__quarantine",type:"standard",weight:1},{placeId:"place__pos_1",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["Quarantine"][0].material === "Sonaflozin" ? parameters.qc_release_rate : 0.0;
});`,lambdaType:"stochastic",name:"Quality release (Sonaflozin)",outputArcs:[{placeId:"place__raw_1",weight:1},{placeId:"place__pos_1",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["Quarantine"][0];
  const p = input["InventoryPosition_Sonaflozin"][0];
  return {
    "SonaflozinStock": [{ material: c.material, vendor: c.vendor, qty: c.qty, remaining_life: c.remaining_life, holding_eur: c.holding_eur, unit_price: c.unit_price, dispatch_clock: c.dispatch_clock, transit_clock: c.transit_clock }],
    "InventoryPosition_Sonaflozin": [{ position: p.position + c.qty }],
  };
});`,x:-150,y:-120},{id:"transition__qc_release_2",inputArcs:[{placeId:"place__quarantine",type:"standard",weight:1},{placeId:"place__pos_2",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["Quarantine"][0].material === "Flowbind Material" ? parameters.qc_release_rate : 0.0;
});`,lambdaType:"stochastic",name:"Quality release (Flowbind Material)",outputArcs:[{placeId:"place__raw_2",weight:1},{placeId:"place__pos_2",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["Quarantine"][0];
  const p = input["InventoryPosition_FlowbindMaterial"][0];
  return {
    "FlowbindMaterialStock": [{ material: c.material, vendor: c.vendor, qty: c.qty, remaining_life: c.remaining_life, holding_eur: c.holding_eur, unit_price: c.unit_price, dispatch_clock: c.dispatch_clock, transit_clock: c.transit_clock }],
    "InventoryPosition_FlowbindMaterial": [{ position: p.position + c.qty }],
  };
});`,x:-150,y:120},{id:"transition__qc_reject",inputArcs:[{placeId:"place__quarantine",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return parameters.qc_reject_rate;
});`,lambdaType:"stochastic",name:"QC rejection (failed inspection)",outputArcs:[{placeId:"place__rejected",weight:1},{placeId:"place__disposal",weight:1},{placeId:"place__holding",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["Quarantine"][0];
  return {
    "RejectedStock": [{ kind: c.material, value: c.qty }],
    "DisposalCosts": [{ kind: "reject", value: c.qty * parameters.disposal_cost }],
    "HoldingCosts": [{ kind: "holding", value: c.holding_eur }],
  };
});`,x:-150,y:-315},{id:"transition__recall_1",inputArcs:[{placeId:"place__raw_1",type:"standard",weight:1},{placeId:"place__pos_1",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["SonaflozinStock"][0].qty > 0.5 ? parameters.recall_rate : 0.0;
});`,lambdaType:"stochastic",name:"Recall a lot (Sonaflozin)",outputArcs:[{placeId:"place__recalled",weight:1},{placeId:"place__disposal",weight:1},{placeId:"place__holding",weight:1},{placeId:"place__pos_1",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["SonaflozinStock"][0];
  const p = input["InventoryPosition_Sonaflozin"][0];
  return {
    "RecalledStock": [{ kind: c.material, value: c.qty }],
    "DisposalCosts": [{ kind: "recall", value: c.qty * parameters.disposal_cost }],
    "HoldingCosts": [{ kind: "holding", value: c.holding_eur }],
    "InventoryPosition_Sonaflozin": [{ position: p.position - c.qty }],
  };
});`,x:825,y:-165},{id:"transition__recall_2",inputArcs:[{placeId:"place__raw_2",type:"standard",weight:1},{placeId:"place__pos_2",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["FlowbindMaterialStock"][0].qty > 0.5 ? parameters.recall_rate : 0.0;
});`,lambdaType:"stochastic",name:"Recall a lot (Flowbind Material)",outputArcs:[{placeId:"place__recalled",weight:1},{placeId:"place__disposal",weight:1},{placeId:"place__holding",weight:1},{placeId:"place__pos_2",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["FlowbindMaterialStock"][0];
  const p = input["InventoryPosition_FlowbindMaterial"][0];
  return {
    "RecalledStock": [{ kind: c.material, value: c.qty }],
    "DisposalCosts": [{ kind: "recall", value: c.qty * parameters.disposal_cost }],
    "HoldingCosts": [{ kind: "holding", value: c.holding_eur }],
    "InventoryPosition_FlowbindMaterial": [{ position: p.position - c.qty }],
  };
});`,x:825,y:630},{id:"transition__recall_fg",inputArcs:[{placeId:"place__fg",type:"standard",weight:1}],lambdaCode:`export default Lambda((input, parameters) => {
  return input["FinishedGoods"][0].qty > 0.5 ? parameters.recall_rate : 0.0;
});`,lambdaType:"stochastic",name:"Recall a batch (Sonic Flow)",outputArcs:[{placeId:"place__recalled",weight:1},{placeId:"place__disposal",weight:1},{placeId:"place__holding",weight:1}],transitionKernelCode:`export default TransitionKernel((input, parameters) => {
  const c = input["FinishedGoods"][0];
  return {
    "RecalledStock": [{ kind: c.material, value: c.qty }],
    "DisposalCosts": [{ kind: "recall", value: c.qty * parameters.disposal_cost }],
    "HoldingCosts": [{ kind: "holding", value: c.holding_eur }],
  };
});`,x:1815,y:-240}],types:[{displayColor:"#8b5cf6",elements:[{elementId:"type__market__rate",name:"rate",type:"real"},{elementId:"type__market__diffusion_clock",name:"diffusion_clock",type:"real"}],iconSlug:"circle",id:"type__market",name:"Market"},{displayColor:"#f59e0b",elements:[{elementId:"type__customer_order__kind",name:"kind",type:"string"},{elementId:"type__customer_order__waited",name:"waited",type:"real"},{elementId:"type__customer_order__patience",name:"patience",type:"real"},{elementId:"type__customer_order__qty",name:"qty",type:"real"}],iconSlug:"circle",id:"type__customer_order",name:"CustomerOrder"},{displayColor:"#0ea5e9",elements:[{elementId:"type__crate__material",name:"material",type:"string"},{elementId:"type__crate__vendor",name:"vendor",type:"string"},{elementId:"type__crate__qty",name:"qty",type:"real"},{elementId:"type__crate__remaining_life",name:"remaining_life",type:"real"},{elementId:"type__crate__holding_eur",name:"holding_eur",type:"real"},{elementId:"type__crate__unit_price",name:"unit_price",type:"real"},{elementId:"type__crate__dispatch_clock",name:"dispatch_clock",type:"real"},{elementId:"type__crate__transit_clock",name:"transit_clock",type:"real"}],iconSlug:"circle",id:"type__crate",name:"Stock"},{displayColor:"#22c55e",elements:[{elementId:"type__job__remaining",name:"remaining",type:"real"},{elementId:"type__job__qty",name:"qty",type:"real"}],iconSlug:"circle",id:"type__job",name:"Job"},{displayColor:"#a3a3a3",elements:[{elementId:"type__record__kind",name:"kind",type:"string"},{elementId:"type__record__value",name:"value",type:"real"}],iconSlug:"circle",id:"type__record",name:"Record"},{displayColor:"#16a34a",elements:[{elementId:"type__sale__kind",name:"kind",type:"string"},{elementId:"type__sale__lead_time",name:"lead_time",type:"real"},{elementId:"type__sale__tardiness",name:"tardiness",type:"real"},{elementId:"type__sale__qty",name:"qty",type:"real"}],iconSlug:"circle",id:"type__sale",name:"Sale"},{displayColor:"#dc2626",elements:[{elementId:"type__price__level",name:"level",type:"real"},{elementId:"type__price__diffusion_clock",name:"diffusion_clock",type:"real"}],iconSlug:"circle",id:"type__price",name:"PriceIndex"},{displayColor:"#dc2626",elements:[{elementId:"type__prod_order__produce_qty",name:"produce_qty",type:"real"},{elementId:"type__prod_order__consume_sonaflozin",name:"consume_sonaflozin",type:"real"},{elementId:"type__prod_order__consume_flowbind",name:"consume_flowbind",type:"real"},{elementId:"type__prod_order__waited",name:"waited",type:"real"}],iconSlug:"circle",id:"type__prod_order",name:"ProductionOrder"},{displayColor:"#0ea5e9",elements:[{elementId:"type__position__position",name:"position",type:"real"}],iconSlug:"circle",id:"type__position",name:"InventoryPosition"}]},title:"Petri Net: Inventory purchasing"};async function p(a,n){for(let e of d){let i=await a.create2(e.doc);n.change(r=>{r.docs.push({name:e.name,type:e.doc["@patchwork"].type,url:i.url})})}}var l={"@patchwork":{title:"CatColab: Stock & Flow",type:"catcolab-model"},analysisDocUrl:"automerge:qJJEiMQo21VwaLToRtYENuYSuTC",name:"SEIRV",notebook:{cellContents:{"0194d7a9-bc26-73ac-b2b8-73470cb412ae":{content:{id:"0194d7a9-bc26-73ac-b2b8-6eb9a514827b",name:"Susceptible",obType:{content:"Object",tag:"Basic"},tag:"object"},id:"0194d7a9-bc26-73ac-b2b8-73470cb412ae",tag:"formal"},"0194d7a9-bf28-709f-b34d-545928dd7c16":{content:{id:"0194d7a9-bf28-709f-b34d-513c3da75e9c",name:"Infectious",obType:{content:"Object",tag:"Basic"},tag:"object"},id:"0194d7a9-bf28-709f-b34d-545928dd7c16",tag:"formal"},"0194d7a9-c036-745b-99e2-b3ef2d3b87d0":{content:{id:"0194d7a9-c036-745b-99e2-aedb526915c7",name:"Recovered",obType:{content:"Object",tag:"Basic"},tag:"object"},id:"0194d7a9-c036-745b-99e2-b3ef2d3b87d0",tag:"formal"},"0194d7a9-d72e-700a-9c8b-7686fad4193b":{content:{cod:{content:"0194fc13-3da9-77cb-b36a-9b8a6a83f0e6",tag:"Basic"},dom:{content:"0194d7a9-bc26-73ac-b2b8-6eb9a514827b",tag:"Basic"},id:"0194d7a9-d72e-700a-9c8b-703b753da038",morType:{content:{content:"Object",tag:"Basic"},tag:"Hom"},name:"exposure",tag:"morphism"},id:"0194d7a9-d72e-700a-9c8b-7686fad4193b",tag:"formal"},"0194d7a9-d8b5-741f-916f-d559d3ff2f8d":{content:{cod:{content:"0194d7a9-c036-745b-99e2-aedb526915c7",tag:"Basic"},dom:{content:"0194d7a9-bf28-709f-b34d-513c3da75e9c",tag:"Basic"},id:"0194d7a9-d8b5-741f-916f-d3dd802450ec",morType:{content:{content:"Object",tag:"Basic"},tag:"Hom"},name:"recovery",tag:"morphism"},id:"0194d7a9-d8b5-741f-916f-d559d3ff2f8d",tag:"formal"},"0194d7a9-f4ff-77df-80a5-75410f4b9680":{content:{cod:{content:{content:"0194d7a9-d72e-700a-9c8b-703b753da038",tag:"Basic"},tag:"Tabulated"},dom:{content:"0194d7a9-bf28-709f-b34d-513c3da75e9c",tag:"Basic"},id:"0194d7a9-f4ff-77df-80a5-70d50473ed6d",morType:{content:"Link",tag:"Basic"},name:"",tag:"morphism"},id:"0194d7a9-f4ff-77df-80a5-75410f4b9680",tag:"formal"},"0194d7c1-3b04-77cf-b2c1-e4e8a10712e2":{content:"This stock-flow diagram exhibits the standard SIR model from epidemiology augmented with Exposed and Vaccinated populations: there are populations of susceptible, exposed, infectious, vaccinated, and recovered subjects, and processes flow among these stocks. A link from the infectious population to the infection process reflects that the infection rate increases as the density of infectious subjects does.",id:"0194d7c1-3b04-77cf-b2c1-e4e8a10712e2",tag:"rich-text"},"0194fc13-2920-724c-a6c3-fc1d17699223":{content:{id:"0194fc13-2920-724c-a6c3-f85ca780f6cf",name:"Vaccinated",obType:{content:"Object",tag:"Basic"},tag:"object"},id:"0194fc13-2920-724c-a6c3-fc1d17699223",tag:"formal"},"0194fc13-3da9-77cb-b36a-9c5b8a74d941":{content:{id:"0194fc13-3da9-77cb-b36a-9b8a6a83f0e6",name:"Exposed",obType:{content:"Object",tag:"Basic"},tag:"object"},id:"0194fc13-3da9-77cb-b36a-9c5b8a74d941",tag:"formal"},"0194fc13-d6aa-741c-a30c-54cd59aaee10":{content:{cod:{content:"0194d7a9-bf28-709f-b34d-513c3da75e9c",tag:"Basic"},dom:{content:"0194fc13-3da9-77cb-b36a-9b8a6a83f0e6",tag:"Basic"},id:"0194fc13-d6aa-741c-a30c-536d48c10c1e",morType:{content:{content:"Object",tag:"Basic"},tag:"Hom"},name:"infection",tag:"morphism"},id:"0194fc13-d6aa-741c-a30c-54cd59aaee10",tag:"formal"},"0194fc14-204c-72a4-92fa-df5491673bab":{content:{cod:{content:"0194fc13-2920-724c-a6c3-f85ca780f6cf",tag:"Basic"},dom:{content:"0194d7a9-bc26-73ac-b2b8-6eb9a514827b",tag:"Basic"},id:"0194fc14-204c-72a4-92fa-da1399afa430",morType:{content:{content:"Object",tag:"Basic"},tag:"Hom"},name:"vaccination",tag:"morphism"},id:"0194fc14-204c-72a4-92fa-df5491673bab",tag:"formal"},"01981982-b589-702c-99a8-57983e3bd08e":{content:{cod:{content:"0194d7a9-bc26-73ac-b2b8-6eb9a514827b",tag:"Basic"},dom:{content:"0194fc13-2920-724c-a6c3-f85ca780f6cf",tag:"Basic"},id:"01981982-b589-702c-99a8-539c45521dc9",morType:{content:{content:"Object",tag:"Basic"},tag:"Hom"},name:"waning",tag:"morphism"},id:"01981982-b589-702c-99a8-57983e3bd08e",tag:"formal"},"019ffc10-1a2b-73c1-9f01-4d5e6a7b8c01":{content:{cod:{content:"0194fc13-3da9-77cb-b36a-9b8a6a83f0e6",tag:"Basic"},dom:{content:"0194d7a9-c036-745b-99e2-aedb526915c7",tag:"Basic"},id:"019ffc10-1a2b-73c1-9f01-4d5e6a7b8c02",morType:{content:{content:"Object",tag:"Basic"},tag:"Hom"},name:"reinfection",tag:"morphism"},id:"019ffc10-1a2b-73c1-9f01-4d5e6a7b8c01",tag:"formal"},"019ffc10-3c4d-74e2-8a12-5e6f7a8b9c11":{content:{cod:{content:{content:"019ffc10-1a2b-73c1-9f01-4d5e6a7b8c02",tag:"Basic"},tag:"Tabulated"},dom:{content:"0194d7a9-bf28-709f-b34d-513c3da75e9c",tag:"Basic"},id:"019ffc10-3c4d-74e2-8a12-5e6f7a8b9c12",morType:{content:"Link",tag:"Basic"},name:"",tag:"morphism"},id:"019ffc10-3c4d-74e2-8a12-5e6f7a8b9c11",tag:"formal"}},cellOrder:["0194d7c1-3b04-77cf-b2c1-e4e8a10712e2","0194d7a9-bc26-73ac-b2b8-73470cb412ae","0194fc13-3da9-77cb-b36a-9c5b8a74d941","0194d7a9-bf28-709f-b34d-545928dd7c16","0194d7a9-c036-745b-99e2-b3ef2d3b87d0","0194fc13-2920-724c-a6c3-fc1d17699223","0194d7a9-d72e-700a-9c8b-7686fad4193b","0194fc14-204c-72a4-92fa-df5491673bab","0194fc13-d6aa-741c-a30c-54cd59aaee10","0194d7a9-d8b5-741f-916f-d559d3ff2f8d","0194d7a9-f4ff-77df-80a5-75410f4b9680","01981982-b589-702c-99a8-57983e3bd08e","019ffc10-1a2b-73c1-9f01-4d5e6a7b8c01"]},theory:"primitive-stock-flow",type:"model",version:"2"},d=[{name:"CatColab: Stock & Flow",doc:l},{name:"Petri Net: Inventory purchasing",doc:t}];export{p as seedGaiosExamples};
//# sourceMappingURL=gaiosExamples-YDNQB35L.js.map
