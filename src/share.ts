// A share link (the sideboard's Copy link, vendor/sideboard.patch):
// /#share=<url>&name=<its name in the sidebar>[&project=<type>]. Whoever
// opens it gets the doc in their sidebar, and it opens. The link's taken
// out of the address.
//
// A lattice or knitout project's own doc is its layout, which is yours. So
// what's shared is its files (`project` says which kind of project they
// were), and you get a project of your own on them, as lattice's share links
// do.

import {PROJECT_TYPES, type Entry, type Sidebar} from "./sidebar.ts"
// a doc that's slow to come is shared without its type or title
const SLOW = 10_000

type Doc = {"@patchwork"?: {type?: string}; title?: unknown; files?: unknown}
type Handle<T> = {url: string; doc(): T | undefined; change(fn: (doc: T) => void): void}
type Repo = {
	find<T>(url: string): Promise<Handle<T>>
	create2<T>(initial?: T): Promise<Handle<T>>
}
type FolderDoc = {docs: Entry[]}

const isUrl = (value: unknown): value is string =>
	typeof value === "string" && /^automerge:[1-9A-HJ-NP-Za-km-z]+$/.test(value)

function findSoon(repo: Repo, url: string): Promise<Doc | null> {
	return Promise.race([
		repo.find<Doc>(url).then(
			handle => handle.doc() ?? null,
			() => null,
		),
		new Promise<null>(resolve => setTimeout(() => resolve(null), SLOW)),
	])
}

async function addEntry(repo: Repo, sidebar: Sidebar, entry: Entry) {
	const root = sidebar.rootFolderUrl()
	if (!root) throw new Error("there's no sidebar to put it in")
	const folder = await repo.find<FolderDoc>(root)
	folder.change(doc => {
		doc.docs ??= []
		doc.docs.unshift(entry)
	})
}

// the url of yours that the link is for, added to your sidebar if it wasn't
async function receive(
	repo: Repo,
	sidebar: Sidebar,
	{url, name, project}: {url: string; name: string; project: string | null},
) {
	const entries = await sidebar.whenReady()
	if (project && PROJECT_TYPES.includes(project)) {
		// one you've got on those files already
		const yours = entries.find(entry => PROJECT_TYPES.includes(entry.type) && entry.files === url)
		if (yours) return yours.url
		const files = await findSoon(repo, url)
		const title = name || String(files?.title ?? "") || "untitled"
		const mine = await repo.create2<Doc & {nodes: object}>({
			"@patchwork": {type: project},
			title,
			files: url,
			nodes: {},
		})
		await addEntry(repo, sidebar, {name: title, type: project, url: mine.url})
		return mine.url
	}
	if (entries.some(entry => entry.url === url)) return url
	const doc = await findSoon(repo, url)
	const type = doc?.["@patchwork"]?.type
	if (!type) {
		console.warn(`knit: couldn't find the shared doc ${url}, so it's only opened`)
		return url
	}
	await addEntry(repo, sidebar, {name: name || String(doc?.title ?? "") || "untitled", type, url})
	return url
}

async function openShared(repo: Repo, sidebar: Sidebar) {
	const params = new URLSearchParams(location.hash.slice(1))
	const url = params.get("share")
	if (!isUrl(url)) return
	const name = (params.get("name") ?? "").trim()
	const project = params.get("project")
	for (const key of ["share", "name", "project"]) params.delete(key)
	const rest = params.toString()
	history.replaceState(history.state, "", `${location.pathname}${location.search}${rest ? `#${rest}` : ""}`)
	try {
		const mine = await receive(repo, sidebar, {url, name, project})
		location.replace(`#doc=${mine}`)
	} catch (error) {
		console.error("knit: couldn't open the shared link", error)
	}
}

export function openSharedLinks(repo: Repo, sidebar: Sidebar) {
	void openShared(repo, sidebar)
	addEventListener("hashchange", () => void openShared(repo, sidebar))
}
