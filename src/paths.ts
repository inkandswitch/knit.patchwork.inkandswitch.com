// What's in the address for a doc in your sidebar: /docs/<name>-<short>,
// where <short> is the start of its document id. The name is only for
// reading: the doc's found by its short id among the sidebar's, so renaming
// it doesn't break a link. (Lattice's projects are the same:
// lattice.patchwork.inkandswitch.com/packages/lattice/paths.js.) Nothing
// imported, so vite.config.ts can use it too.

export const DOCS_PATH = "/docs/"
// enough of a base58 document id to tell one person's docs apart
export const SHORT_LENGTH = 6

const documentIdOf = (url: string) =>
	String(url).replace(/^automerge:/, "").split(/[#/]/)[0]

export const shortIdOf = (url: string) => documentIdOf(url).slice(0, SHORT_LENGTH)

// a name as it goes in a path: lowercase, its words joined with dashes
export function slugOf(name: unknown) {
	const slug = String(name ?? "")
		.normalize("NFKD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.replace(/[^\p{L}\p{N}]+/gu, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 40)
		.replace(/-+$/, "")
	return slug || "doc"
}

export const docPath = ({url, name}: {url: string; name?: string}) =>
	`${DOCS_PATH}${slugOf(name)}-${shortIdOf(url)}`

/** The short id a path asks for, or null for any other path. */
export function parsePath(pathname: string | null | undefined): string | null {
	const path = String(pathname ?? "").replace(/\/+$/, "")
	const match = path.match(/^\/docs\/(?:[^/]*-)?([1-9A-HJ-NP-Za-km-z]+)$/)
	return match && match[1].length >= SHORT_LENGTH ? match[1].slice(0, SHORT_LENGTH) : null
}
