module.exports = {
	"env": {
		"node": true,
		"commonjs": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"indent": ["error", "tab"]
	}
}
