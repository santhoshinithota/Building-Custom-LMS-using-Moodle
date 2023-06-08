import React from 'react'
import { Breadcrumbs, Card, Link, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { snakeCase_toCamelCase } from '../helpers/string'

function BreadcrumbsBar() {
	const path = window.location.pathname
	const pathArr = path.split("/")
	const breadcrumbs = pathArr.map((path, index) => {
		if (path === "") return null
		path = snakeCase_toCamelCase(path)

		if (index === pathArr.length - 1)
			return <Typography key={index} color="text.primary">{path}</Typography>

		// if the path is not the last one
		return <Link key={index} color="inherit"
			href={`${pathArr.slice(0, index + 1).join("/")}`}
			underline='hover'
		>{path}</Link>
	})

	// last breadcrumb is the current page
	window.document.title = breadcrumbs[breadcrumbs.length - 1]?.props?.children || ''

	// add `LMS` to the beginning of the breadcrumbs
	breadcrumbs.splice(0, 0, <Link key={-1} color="inherit" href="/" underline='hover'>LMS</Link>)

	return <Card variant="outlined" sx={{ px: 2, py: 1, mb: 2 }}>
		<Breadcrumbs
			separator={<NavigateNextIcon fontSize="small" />}
			aria-label="breadcrumb"
		>
			{breadcrumbs}
		</Breadcrumbs></Card>
}

export default BreadcrumbsBar