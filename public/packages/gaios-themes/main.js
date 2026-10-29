const themes = [
	{id: "warm", name: "Warm", colorScheme: "light"},
	{id: "purple", name: "Purple", colorScheme: "light"},
	{id: "teal", name: "Teal", colorScheme: "light"},
	{id: "neutral", name: "Neutral", colorScheme: "light"},
	{id: "dark", name: "Dark", colorScheme: "dark"},
]

export const plugins = [
	...themes.map(theme => ({
		type: "patchwork:theme",
		id: theme.id,
		name: theme.name,
		colorScheme: theme.colorScheme,
		style: new URL("./gaios.css", import.meta.url).href,
		async load() {
			return {}
		},
	})),
]
