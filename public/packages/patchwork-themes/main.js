const themes = [
	{id: "catppuccin-mocha", name: "Catppuccin Mocha", colorScheme: "dark"},
	{id: "catppuccin-latte", name: "Catppuccin Latte", colorScheme: "light"},
	{id: "dracula", name: "Dracula", colorScheme: "dark"},
	{id: "nord", name: "Nord", colorScheme: "dark"},
	{id: "gruvbox-dark", name: "Gruvbox Dark", colorScheme: "dark"},
	{id: "rose-pine", name: "Rose Pine", colorScheme: "dark"},
	{id: "rose-pine-dawn", name: "Rose Pine Dawn", colorScheme: "light"},
	{id: "tokyo-night-storm", name: "Tokyo Night Storm", colorScheme: "dark"},
	{id: "everforest-dark", name: "Everforest Dark", colorScheme: "dark"},
	{id: "flexoki-dark", name: "Flexoki Dark", colorScheme: "dark"},
	{id: "flexoki-light", name: "Flexoki Light", colorScheme: "light"},
	{id: "solarized-dark", name: "Solarized Dark", colorScheme: "dark"},
	{id: "solarized-light", name: "Solarized Light", colorScheme: "light"},
	{id: "vesper", name: "Vesper", colorScheme: "dark"},
	{id: "alabaster", name: "Alabaster", colorScheme: "light"},
	{id: "bear", name: "Bear", colorScheme: "light"},
	{id: "paper", name: "Paper", colorScheme: "light"},
	{id: "synthwave84", name: "Synthwave '84", colorScheme: "dark"},
	{id: "plan9", name: "Plan 9", colorScheme: "light"},
	{id: "twentyfour", name: "Twentyfour", colorScheme: "light"},
	{id: "sundae", name: "Sundae", colorScheme: "light"},
	{id: "amber", name: "Amber", colorScheme: "dark"},
]

export const plugins = themes.map(theme => ({
	type: "patchwork:theme",
	id: theme.id,
	name: theme.name,
	colorScheme: theme.colorScheme,
	style: new URL(`./${theme.id}.css`, import.meta.url).href,
	async load() {
		return {}
	},
}))
