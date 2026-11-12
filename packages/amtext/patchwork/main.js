/**
 * amtext as a patchwork package:
 *
 * - .amtext files get the amtext language (highlighting, folding, lint,
 *   completions) in patchwork's file editor
 * - a "patchwork:archive" plugin packs a doc and every doc it links to into a
 *   .patchworkfolder, and unpacks one into fresh docs. The sideboard uses it
 *   to download folders and to take .patchworkfolder files dropped on it.
 * - another unpacks a .latticeproject (lattice's download of a project, the
 *   same zip) into a lattice project, as lattice does. It's only for taking
 *   them: a folder isn't a lattice project, so there's no downloading one as
 *   one. Opening what it makes needs lattice installed.
 * - and another makes a doc of an .amtext from a link to one pasted in the
 *   sideboard. Only from a link: an .amtext from the computer is added as the
 *   text file it is, to be edited.
 */

import { Compartment } from "@codemirror/state";
import { ViewPlugin } from "@codemirror/view";

// patchwork's file tool asks for extra CodeMirror extensions with this event,
// just before it makes its editor (see base/file's codemirror-extensions.ts).
// it bubbles out of the tool, so listening on the window hears every editor.
const EXTENSIONS_EVENT = "file:codemirror-extensions";
const LISTENING = Symbol.for("amtext:codemirror-extensions");

const isAmtext = doc =>
  typeof doc?.extension === "string" && doc.extension.replace(/^\./, "").toLowerCase() === "amtext";

// the event wants extensions now, but the language is loaded on demand: start
// with an empty compartment and fill it in once the language has arrived
function lazyAmtext() {
  const language = new Compartment();
  return [
    language.of([]),
    ViewPlugin.define(view => {
      let live = true;
      import("./codemirror.js")
        .then(({ amtext }) => {
          if (live) view.dispatch({ effects: language.reconfigure(amtext()) });
        })
        .catch(error => console.error("amtext: couldn't load the codemirror language", error));
      return { destroy() { live = false; } };
    }),
  ];
}

if (!globalThis[LISTENING]) {
  globalThis[LISTENING] = true;
  window.addEventListener(EXTENSIONS_EVENT, event => {
    if (isAmtext(event.detail?.doc)) event.detail.extensions.push(lazyAmtext());
  });
}

export const plugins = [
  {
    type: "patchwork:archive",
    id: "patchworkfolder",
    name: "Patchwork folder",
    extension: ".patchworkfolder",
    async load() {
      const { archive } = await import("./archive.js");
      return archive;
    },
  },
  {
    type: "patchwork:archive",
    id: "latticeproject",
    name: "Lattice project",
    extension: ".latticeproject",
    importOnly: true,
    async load() {
      const { latticeProject } = await import("./archive.js");
      return latticeProject;
    },
  },
  {
    type: "patchwork:archive",
    id: "amtext",
    name: "Automerge text",
    extension: ".amtext",
    importOnly: true,
    linkOnly: true,
    async load() {
      const { amtextDoc } = await import("./archive.js");
      return amtextDoc;
    },
  },
];
