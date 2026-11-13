// What's in your sidebar, live: the links in the account's root folder, and
// in the folders in it, all the way down.

export type Entry = {name: string; type: string; url: string}

type Handle<T> = {
	url: string
	doc(): T | undefined
	on(event: "change", fn: () => void): void
	off(event: "change", fn: () => void): void
	change(fn: (doc: T) => void): void
}
type Repo = {find<T>(url: string): Promise<Handle<T>>}
type FolderDoc = {docs?: Array<Partial<Entry> | null>}
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
				const entry = {name: String(link.name ?? ""), type: String(link.type ?? ""), url: String(link.url)}
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
