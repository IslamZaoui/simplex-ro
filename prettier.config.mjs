/**
 * @type {import("prettier").Config}
 */
const config = {
	trailingComma: "none",
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: false,
	printWidth: 100,
	plugins: ["prettier-plugin-tailwindcss"]
};

export default config;
