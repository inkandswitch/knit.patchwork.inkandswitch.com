// Builds the packages knit vendors from patchwork-pkg-base into
// public/packages/<name>/dist. Each one is fetched at the commit below into
// .vendor/<name> (a git repo, with that commit as its first commit), installed
// from its own lockfile, patched with vendor/<name>.patch, and built. A
// package whose commit and patch are the same as at its last build is left
// alone.
//
//   node scripts/vendor.mjs              build what has changed
//   node scripts/vendor.mjs save <name>  write .vendor/<name>'s changes to
//                                        vendor/<name>.patch, and build it
import {spawnSync} from "node:child_process"
import {createHash} from "node:crypto"
import {cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync} from "node:fs"
import {dirname, join, resolve} from "node:path"
import {fileURLToPath} from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const repo = "inkandswitch/patchwork-pkg-base"

const packages = {
	// main: "fix lingering popper"
	sideboard: "ec41f128572221dec37bb37f991b4fd726afb35c",
	// main: "threepane: a site can ask for only its own examples"
	threepane: "8548485fb23e4b2b029b6795e81bc94bfa6e896a",
}

// a commit needs someone to have made it, and a build machine has no one
const git = ["-c", "user.name=knit", "-c", "user.email=knit@localhost", "-c", "core.autocrlf=false"]

function run(command, args, cwd, options = {}) {
	const result = spawnSync(command, args, {cwd, stdio: "inherit", ...options})
	if (result.status !== 0) {
		throw new Error(`${command} ${args.join(" ")} failed in ${cwd}`)
	}
	return result.stdout
}

const sourceDir = name => join(root, ".vendor", name)
const patchFile = name => join(root, "vendor", `${name}.patch`)
// what .vendor/<name> was last built from
const stampFile = name => join(root, ".vendor", `${name}.json`)
const readPatch = name => (existsSync(patchFile(name)) ? readFileSync(patchFile(name), "utf8") : "")
const hash = text => createHash("sha256").update(text).digest("hex")

// everything in .vendor/<name> that differs from the commit it was fetched at
function changes(dir) {
	run("git", ["add", "--intent-to-add", "--all"], dir)
	return run("git", ["diff", "--binary", "HEAD"], dir, {stdio: ["ignore", "pipe", "inherit"], encoding: "utf8"})
}

async function fetchSource(name, commit, dir) {
	console.log(`vendor: fetching ${name} at ${commit.slice(0, 7)}`)
	const response = await fetch(`https://codeload.github.com/${repo}/tar.gz/${commit}`)
	if (!response.ok) throw new Error(`couldn't fetch ${repo}@${commit}: ${response.status}`)
	rmSync(dir, {recursive: true, force: true})
	mkdirSync(dir, {recursive: true})
	const tarball = `${dir}.tar.gz`
	writeFileSync(tarball, Buffer.from(await response.arrayBuffer()))
	try {
		run("tar", ["-xzf", tarball, "-C", dir, "--strip-components=2", `patchwork-pkg-base-${commit}/${name}`], root)
	} finally {
		rmSync(tarball)
	}
	run("git", ["init", "--quiet"], dir)
	run("git", ["add", "--all"], dir)
	run("git", [...git, "commit", "--quiet", "--no-verify", "-m", `${repo}@${commit}`], dir)
	run("pnpm", ["install", "--frozen-lockfile"], dir)
}

async function build(name, force = false) {
	const commit = packages[name]
	const dir = sourceDir(name)
	const patch = readPatch(name)
	const stamp = {commit, patch: hash(patch)}
	const last = existsSync(stampFile(name)) ? JSON.parse(readFileSync(stampFile(name), "utf8")) : null
	const out = join(root, "public", "packages", name, "dist")

	if (!force && last?.commit === commit && last?.patch === stamp.patch && existsSync(out)) return

	if (last?.commit === commit) {
		// don't throw away changes that haven't been saved to the patch
		const changed = hash(changes(dir))
		if (changed !== last.patch && changed !== stamp.patch) {
			throw new Error(
				`.vendor/${name} has changes that aren't in vendor/${name}.patch: ` +
					`save them with \`node scripts/vendor.mjs save ${name}\`, or delete .vendor/${name}`,
			)
		}
		run("git", ["reset", "--quiet", "--hard", "HEAD"], dir)
		run("git", ["clean", "--quiet", "--force", "-d"], dir)
	} else {
		await fetchSource(name, commit, dir)
	}

	if (patch) {
		console.log(`vendor: applying vendor/${name}.patch`)
		run("git", ["apply", "--whitespace=nowarn", patchFile(name)], dir)
	}
	console.log(`vendor: building ${name}`)
	rmSync(join(dir, "dist"), {recursive: true, force: true})
	run("pnpm", ["run", "build"], dir)
	rmSync(out, {recursive: true, force: true})
	cpSync(join(dir, "dist"), out, {recursive: true})
	writeFileSync(stampFile(name), JSON.stringify(stamp))
}

const [command, name] = process.argv.slice(2)
if (command === "save") {
	if (!(name in packages)) throw new Error(`no vendored package "${name}"`)
	writeFileSync(patchFile(name), changes(sourceDir(name)))
	await build(name, true)
} else if (command) {
	throw new Error(`unknown command "${command}"`)
} else {
	for (const name of Object.keys(packages)) await build(name)
}
