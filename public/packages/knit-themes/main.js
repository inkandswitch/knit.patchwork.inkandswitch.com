const themes = [
	{id: "knit-light", name: "Knit Light", colorScheme: "light"},
	{id: "knit-dark", name: "Knit Dark", colorScheme: "dark"},
]

export const plugins = [
	...themes.map(theme => ({
		type: "patchwork:theme",
		id: theme.id,
		name: theme.name,
		colorScheme: theme.colorScheme,
		style: new URL("./knit.css", import.meta.url).href,
		async load() {
			return {}
		},
	})),
]
