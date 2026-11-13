import setup, {
	hideLoadingAnimation,
	showErrorScreen,
	showLoadingAnimation,
} from "@inkandswitch/patchwork"
import "./main.css"
import {installRoute} from "./route.ts"
import {openSharedLinks} from "./share.ts"
import {watchSidebar} from "./sidebar.ts"

const DEFAULT_PACKAGE_LIST = "/modules.json"

const packageListURL = (
	new URLSearchParams(location.search).get("system-package-list") ||
	localStorage.getItem("systemPackageListURL") ||
	import.meta.env.PATCHWORK_SYSTEM_PACKAGE_LIST_URL ||
	import.meta.env.VITE_DEFAULT_MODULES ||
	DEFAULT_PACKAGE_LIST
)
	.split(",")
	.map(source => source.trim())
	.filter(Boolean)

// before setup: patchwork's router asks it where it is as it starts
const route = installRoute()

showLoadingAnimation()

window.patchwork = await setup({
	packageListURL,
	accountKey: "tinyPatchworkAccountUrl",
	frameToolId: "threepane",
}).catch(error => {
	showErrorScreen(error, {contact: "chee@inkandswitch.com"})
	throw error
})

declare global {
  interface Window {
	 accountDocHandle: typeof window.patchwork.account
  }
}

window.accountDocHandle = window.patchwork.account

const sidebar = watchSidebar(window.patchwork.repo as any, window.patchwork.account as any)
route.start(sidebar)
openSharedLinks(window.patchwork.repo as any, sidebar)
hideLoadingAnimation()
