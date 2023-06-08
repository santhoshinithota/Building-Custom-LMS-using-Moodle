export function getFormData(e) {
	e.preventDefault() // prevent page reload
	const formData = new FormData(e.target)
	const data = Object.fromEntries(formData.entries())
	return data
}