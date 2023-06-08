export function snakeCase_toCamelCase(str) {
	// capitalize first letter
	str = str.trim().charAt(0).toUpperCase() + str.slice(1)
	// replace all - and _ with spaces
	return str.replace(/[-_]/g, " ")
		// capitalize first letter after every space
		.replace(/(?: |\b)(\w)/g, function (key, p1) {
			return ' ' + p1.toUpperCase()
		})
}