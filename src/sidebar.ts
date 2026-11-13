// What's in your sidebar, live: the links in the account's root folder, and
// in the folders in it, all the way down.

export type Entry = {
	name: string
	type: string
	url: string
	/** A project's files: the folder that's shared, and named in its path. */
	files?: string
}

// a lattice or knitout project's own doc is its layout, which is yours. what's
// shared, and named in the address, is its files
export const PROJECT_TYPES = ["lattice:project", "knitoutjs-project"]
// knitoutjs's projects from before. the knitoutjs tool updates one to a
// knitoutjs-project as it opens it, but its link here keeps the old type: so
// a link's type isn't what a project is now, its doc's is
const OLD_PROJECT_TYPES = ["prototype-knitoutjs-panes", "knitoutjs-panes"]

/** The url an entry's address and share link are for: a project's files. */
export const sharedUrl = (entry: Entry) => entry.files ?? entry.url

type Handle<T> = {
	url: string
	doc(): T | undefined
	on(event: "change", fn: () => void): void
	off(event: "change", fn: () => void): void
	change(fn: (doc: T) => void): void
}
type Repo = {find<T>(url: string): Promise<Handle<T>>}
type FolderDoc = {docs?: Array<Partial<Entry> | null>}
type ProjectDoc = {"@patchwork"?: {type?: string}; files?: unknown}
type AccountDoc = {rootFolderUrl?: string}

export type Sidebar = {
	/** Every link, the root folder's first, each url once. */
	entries(): Entry[]
	/** Every folder has been looked in (or was too slow to come). */
	ready(): boolean
	rootFolderUrl(): string | undefined
	subscribe(fn: () => void): () => void
	/** The entries, once they're all in. */
	whenReady(): Promise<Entry[]>
}

// a folder that's slow to come is taken as not there, till it comes
const SLOW = 15_000

export function watchSidebar(repo: Repo, account: Handle<AccountDoc>): Sidebar {
	// a folder's url → its doc, null if it couldn't be found, undefined while
	// it's being looked for
	const folders = new Map<string, FolderDoc | null | undefined>()
	// a project's url → its files' url, null if it has none (or couldn't be
	// found), undefined while it's being looked for
	const projects = new Map<string, string | null | undefined>()
	const listeners = new Set<() => void>()
	let entries: Entry[] = []
	let ready = false

	function watch(url: string) {
		if (folders.has(url)) return
		folders.set(url, undefined)
		const timer = setTimeout(() => put(url, null), SLOW)
		repo.find<FolderDoc>(url).then(
			handle => {
				clearTimeout(timer)
				const update = () => put(url, handle.doc() ?? null)
				handle.on("change", update)
				update()
			},
			error => {
				clearTimeout(timer)
				console.warn(`knit: couldn't find the sidebar folder ${url}`, error)
				put(url, null)
			},
		)
	}

	function watchProject(url: string) {
		if (projects.has(url)) return
		projects.set(url, undefined)
		const timer = setTimeout(() => putFiles(url, null), SLOW)
		repo.find<ProjectDoc>(url).then(
			handle => {
				clearTimeout(timer)
				const update = () => {
					const doc = handle.doc()
					const files = doc?.files
					const project = PROJECT_TYPES.includes(String(doc?.["@patchwork"]?.type ?? ""))
					putFiles(url, project && typeof files === "string" && files.startsWith("automerge:") ? files : null)
				}
				handle.on("change", update)
				update()
			},
			error => {
				clearTimeout(timer)
				console.warn(`knit: couldn't find the project ${url}`, error)
				putFiles(url, null)
			},
		)
	}

	function putFiles(url: string, files: string | null) {
		if (projects.get(url) === files) return
		projects.set(url, files)
		read()
	}

	function put(url: string, doc: FolderDoc | null) {
		folders.set(url, doc)
		read()
	}

	function read() {
		const root = account.doc()?.rootFolderUrl
		const found: Entry[] = []
		const seen = new Set<string>()
		let all = !!account.doc()
		const walk = (url: string) => {
			if (seen.has(url)) return
			seen.add(url)
			watch(url)
			const doc = folders.get(url)
			if (doc === undefined) {
				all = false
				return
			}
			for (const link of doc?.docs ?? []) {
				if (!link?.url) continue
				const entry: Entry = {name: String(link.name ?? ""), type: String(link.type ?? ""), url: String(link.url)}
				if (PROJECT_TYPES.includes(entry.type) || OLD_PROJECT_TYPES.includes(entry.type)) {
					watchProject(entry.url)
					const files = projects.get(entry.url)
					if (files === undefined) all = false
					else if (files) entry.files = files
				}
				if (!found.some(other => other.url === entry.url)) found.push(entry)
				if (entry.type === "folder") walk(entry.url)
			}
		}
		if (root) walk(root)
		entries = found
		ready = all
		for (const fn of listeners) fn()
	}

	account.on("change", read)
	read()

	const sidebar: Sidebar = {
		entries: () => entries,
		ready: () => ready,
		rootFolderUrl: () => account.doc()?.rootFolderUrl,
		subscribe(fn) {
			listeners.add(fn)
			return () => listeners.delete(fn)
		},
		whenReady() {
			if (ready) return Promise.resolve(entries)
			return new Promise(resolve => {
				const off = sidebar.subscribe(() => {
					if (!ready) return
					off()
					resolve(entries)
				})
			})
		},
	}
	return sidebar
}
