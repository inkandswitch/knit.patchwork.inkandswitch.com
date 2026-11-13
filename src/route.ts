// Where you are, for patchwork's router and the selected-doc provider
// (window.patchworkRoute, patches/@inkandswitch__patchwork.patch and
// vendor/providers.patch): the params patchwork keeps in the hash
// (doc, tool, draft, …), with a doc that's in your sidebar named by the path
// instead, as /docs/<name>-<short> (paths.ts). Any other doc, or another
// frame, keeps patchwork's /#doc=automerge:….
//
// Moving changes the address with pushState, then tells everything that
// follows the hash (the router, the selected-doc provider, drafts) with a
// hashchange, as a change of hash would.

import {docPath, parsePath, shortIdOf} from "./paths.ts"
import type {Entry, Sidebar} from "./sidebar.ts"

declare global {
	interface Window {
		patchworkRoute?: PatchworkRoute
	}
}

export type PatchworkRoute = {
	/** What's open: patchwork's hash params, the path's doc among them. */
	params(): URLSearchParams
	/** Go to `params`, a step Back can return from. */
	go(params: URLSearchParams): void
}

// short id → url, for every doc the path has named: so a reload opens the doc
// straight away, before the sidebar's been looked through
const CACHE_KEY = "knit:doc-paths"
const CACHE_SIZE = 500
// the router's own order, and the keys it doesn't encode
const HASH_KEY_ORDER = ["doc", "tool", "type", "title", "frame", "draft"]
const RAW_HASH_KEYS = new Set(["doc", "draft"])
// what the router adds only as hints, left out beside a path
const HINTS = ["title", "type"]

function serializeHash(params: URLSearchParams) {
	const parts: string[] = []
	const emitted = new Set<string>()
	for (const key of [...HASH_KEY_ORDER, ...params.keys()]) {
		if (emitted.has(key)) continue
		const value = params.get(key)
		if (!value) continue
		emitted.add(key)
		parts.push(`${key}=${RAW_HASH_KEYS.has(key) ? value : encodeURIComponent(value)}`)
	}
	return parts.join("&")
}

function readCache(): Record<string, string> {
	try {
		const cache = JSON.parse(localStorage.getItem(CACHE_KEY) ?? "{}")
		return cache && typeof cache === "object" ? cache : {}
	} catch {
		return {}
	}
}

function remember(short: string, url: string) {
	try {
		const cache = readCache()
		if (cache[short] === url) return
		delete cache[short]
		cache[short] = url
		const keys = Object.keys(cache)
		for (const key of keys.slice(0, Math.max(0, keys.length - CACHE_SIZE))) delete cache[key]
		localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
	} catch {}
}

// the hash says what to do with whatever path it's on
const hashParams = () => new URLSearchParams(location.hash.slice(1))

/**
 * Install window.patchworkRoute. Call before patchwork's setup (the router
 * and the selected-doc provider read it as they start); then `start` once
 * it's set up, with the sidebar.
 */
export function installRoute() {
	let byShort = new Map<string, Entry>()
	let byUrl = new Map<string, Entry>()
	let sidebar: Sidebar | null = null

	// the url the path names: the sidebar's, or the one it named last time
	const pathUrl = (short: string) => byShort.get(short)?.url ?? readCache()[short]

	function params() {
		const params = hashParams()
		if (params.get("doc")) return params
		const short = parsePath(location.pathname)
		const url = short && pathUrl(short)
		if (url) params.set("doc", url)
		return params
	}

	// the address that says `params`: a path for a doc in the sidebar
	function addressOf(params: URLSearchParams) {
		params = new URLSearchParams(params)
		const doc = params.get("doc")
		const entry = doc ? byUrl.get(doc) : undefined
		let path = "/"
		if (entry && !params.has("frame")) {
			for (const key of ["doc", ...HINTS]) params.delete(key)
			remember(shortIdOf(entry.url), entry.url)
			path = docPath(entry)
		}
		const hash = serializeHash(params)
		return new URL(`${path}${location.search}${hash ? `#${hash}` : ""}`, location.origin)
	}

	const here = () => location.pathname + location.search + location.hash
	const pathOf = (url: URL) => url.pathname + url.search + url.hash

	// what follows the hash hears it's changed
	function announce() {
		const href = location.href
		window.dispatchEvent(new HashChangeEvent("hashchange", {oldURL: href, newURL: href}))
	}

	function go(next: URLSearchParams) {
		const address = pathOf(addressOf(next))
		if (address === here()) return
		history.pushState(history.state, "", address)
		announce()
	}

	// the address put right for what's open, without a step: a doc that's
	// come into the sidebar (or been renamed in it) gets its path, and one
	// that's left it gets its hash back. a path no one knows, once the
	// sidebar's all in, goes
	function tidy() {
		const short = parsePath(location.pathname)
		const unknown = short && !hashParams().get("doc") && !pathUrl(short)
		if (unknown && !sidebar?.ready()) return
		const address = pathOf(addressOf(params()))
		if (address === here()) return
		try {
			history.replaceState(history.state, "", address)
		} catch {}
	}

	// Back and Forward. a step between two paths changes no hash, so the
	// browser says nothing (one that does change it says so twice, which
	// changes nothing)
	addEventListener("popstate", announce)
	// a hash typed in, or patchwork's own rewrites of older links: once it's
	// been heard, the address is put right
	addEventListener("hashchange", () => setTimeout(tidy, 0))

	window.patchworkRoute = {params, go}

	return {
		start(found: Sidebar) {
			sidebar = found
			let waiting = !!parsePath(location.pathname) && !params().get("doc")
			const read = () => {
				byShort = new Map()
				byUrl = new Map()
				for (const entry of found.entries()) {
					const short = shortIdOf(entry.url)
					if (!byShort.has(short)) byShort.set(short, entry)
					byUrl.set(entry.url, entry)
				}
				// a path that wasn't known at boot, found: it opens
				if (waiting && params().get("doc")) {
					waiting = false
					announce()
				}
				if (found.ready()) waiting = false
				tidy()
			}
			found.subscribe(read)
			read()
		},
	}
}
