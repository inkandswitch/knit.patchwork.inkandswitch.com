import * as Automerge from "@automerge/automerge";
import { getRegistry, isKeyhiveDoc } from "@inkandswitch/patchwork-plugins";
import { patchworkFolder } from "../patchworkfolder.js";

// like patchwork-plugins' createDocOfDatatype2, but the new doc records only
// its type, the way the sideboard makes docs: no suggestedImportUrl saying
// where the datatype was loaded from
async function createDocOfDatatype(datatype, repo) {
  const handle = await repo.create2();
  handle.change(doc => {
    datatype.module.init(doc, repo);
    doc["@patchwork"] = { type: datatype.id };
  });
  return handle;
}

const folder = repo =>
  patchworkFolder({ repo, Automerge, plugins: { getRegistry, createDocOfDatatype2: createDocOfDatatype } });

/** the "patchwork:archive" interface: pack a doc into a download, unpack a file into a doc */
export const archive = {
  /** downloads `url` and every doc it reaches as a .patchworkfolder */
  download(repo, url) {
    return folder(repo).downloadFolder(url);
  },
  /** unpacks a .patchworkfolder into fresh docs, resolving with the root doc's url */
  async import(repo, file) {
    const { root } = await folder(repo).importFolder(file);
    return root;
  },
};

/** one doc's .amtext, from a link to it: made into a fresh doc */
export const amtextDoc = {
  async import(repo, file) {
    return folder(repo).importDocText(await file.text());
  },
};

// lattice's own docs for what's unpacked from a .latticeproject: a doc of its
// type and nothing else, as lattice makes them. not the datatype's init, which
// would make what a new one starts with (a lattice project's pattern, its
// folder) only to have it all replaced
async function typedDoc(datatype, repo, _change, hive) {
  const handle = await repo.create2();
  if (hive && isKeyhiveDoc(handle.url)) await hive.addSyncServerRelayToDoc(handle.url);
  handle.change(doc => {
    doc["@patchwork"] = { type: datatype.id };
  });
  return handle;
}

const project = repo =>
  patchworkFolder({
    repo,
    Automerge,
    extension: ".latticeproject",
    plugins: { getRegistry, isKeyhiveDoc, createDocOfDatatype2: typedDoc },
  });

/** a lattice project, downloaded from lattice's sidebar: the same zip as a .patchworkfolder */
export const latticeProject = {
  download(repo, url) {
    return project(repo).downloadFolder(url);
  },
  /** unpacks a .latticeproject into fresh docs, resolving with the project's url */
  async import(repo, file) {
    const { root } = await project(repo).importFolder(file);
    return root;
  },
};
