// Example documents for fresh knit accounts. threepane runs the init.js next to
// each static modules.json, so this one stands in for pkg-base's. The docs are
// built inline in the shape the knitoutjs-panes module (index.js, files.js,
// layout.js) makes them, since that module is loaded from an automerge url.

// automerge spots an ImmutableString by this symbol rather than instanceof,
// so a generated .k can be written without importing automerge here
const immutable = val => ({[Symbol.for("_am_immutableString")]: true, val})

const id = () => crypto.randomUUID().slice(0, 8)
const panel = (url, tool) => ({id: id(), url, tool})
const group = panels => ({id: id(), type: "group", active: panels[0].id, panels})
const row = children => ({
	id: id(),
	type: "split",
	direction: "row",
	sizes: children.map(() => 100 / children.length),
	children,
})

function file(name, content, extra) {
	const extension = name.split(".").pop()
	return {
		"@patchwork": {type: "file"},
		name,
		extension,
		mimeType: extension === "js" ? "text/javascript" : "text/plain",
		content,
		...extra,
	}
}

async function text(path) {
	const response = await fetch(new URL(path, import.meta.url))
	if (!response.ok) throw new Error(`${path}: ${response.status}`)
	return response.text()
}

async function project(repo, name, files, layout) {
	const handle = await repo.create2({
		"@patchwork": {type: "knitoutjs-panes"},
		title: name,
		files,
		layout,
	})
	return {name, type: "knitoutjs-panes", url: handle.url}
}

// a .k you edit by hand, and the stitches it makes
async function knitoutExample(repo) {
	const k = await repo.create2(file("stripes.k", await text("./examples/stripes.k")))
	return project(
		repo,
		"knitout example",
		[k.url],
		row([group([panel(k.url, "editor")]), group([panel(k.url, "visualizer")])])
	)
}

// a .js that writes a .k, the .k it wrote, and the stitches
async function knitoutjsExample(repo) {
	const [source, knitout] = await Promise.all([
		text("./examples/pattern.knitout.js"),
		text("./examples/pattern.k"),
	])
	const k = await repo.create2(file("pattern.k", immutable(knitout)))
	const js = await repo.create2(
		file("pattern.knitout.js", source, {knitoutTarget: k.url})
	)
	k.change(doc => {
		doc.knitoutSource = js.url
	})
	return project(
		repo,
		"knitoutjs example",
		[js.url, k.url],
		row([
			group([panel(js.url, "editor")]),
			group([panel(k.url, "editor")]),
			group([panel(k.url, "visualizer")]),
		])
	)
}

export default async function init(repo, folder) {
	for (const example of [knitoutExample, knitoutjsExample]) {
		try {
			const link = await example(repo)
			folder.change(doc => {
				doc.docs.push(link)
			})
		} catch (err) {
			console.warn(`init: ${example.name} failed`, err)
		}
	}
}
