// What shows for a /docs/ path that names no doc in your sidebar, where the
// doc would be (threepane asks window.patchworkRoute.placeholder(), see
// route.ts and vendor/threepane.patch). A /docs/ link only works for whoever's
// sidebar the doc is in; to give someone a doc, you give them a share link
// (the sideboard's Copy link, share.ts). Drawn as patchwork's own cards are
// (patchwork-elements' cards.js), in main.css.

const SVG = "http://www.w3.org/2000/svg"

function h(tag: string, className: string, ...children: Array<Node | string>) {
	const element = document.createElement(tag)
	element.className = className
	element.append(...children)
	return element
}

// the heading's wobble, as patchwork's cards have it
function roughFilter() {
	const svg = document.createElementNS(SVG, "svg")
	svg.setAttribute("class", "knit-card__defs")
	svg.setAttribute("aria-hidden", "true")
	const filter = document.createElementNS(SVG, "filter")
	filter.setAttribute("id", "knit-card-rough")
	const noise = document.createElementNS(SVG, "feTurbulence")
	noise.setAttribute("type", "fractalNoise")
	noise.setAttribute("baseFrequency", "0.04")
	noise.setAttribute("numOctaves", "2")
	noise.setAttribute("seed", "1")
	const displace = document.createElementNS(SVG, "feDisplacementMap")
	displace.setAttribute("in", "SourceGraphic")
	displace.setAttribute("scale", "1.4")
	filter.append(noise, displace)
	svg.append(filter)
	return svg
}

/** The path's doc isn't in your sidebar. */
export function missingCard() {
	const card = h(
		"div",
		"knit-card",
		roughFilter(),
		h(
			"div",
			"knit-card__sheet",
			h("h2", "knit-card__rough", "not in your sidebar"),
			h("p", "", "this link is to a doc that isn't in your sidebar, so there's nothing here to open."),
			h(
				"p",
				"",
				"if someone sent it to you, ask them for a share link instead: they right-click the doc in their sidebar and choose ",
				h("strong", "knit-card__menu-item", "Copy link"),
				". opening that puts the doc in your sidebar.",
			),
		),
	)
	card.dataset.card = "not-in-sidebar"
	return card
}

/** Still looking through your sidebar for the path's doc. */
export function lookingCard() {
	const card = h("div", "knit-card knit-card--finding", h("span", "knit-card__dot"), "looking in your sidebar…")
	card.dataset.card = "looking"
	card.setAttribute("role", "status")
	return card
}
