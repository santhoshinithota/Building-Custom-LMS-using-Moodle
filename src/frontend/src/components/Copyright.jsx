import * as React from 'react'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Box } from '@mui/material'

function Copyright({ replace }) {
	const path = window.location.pathname
	if (!replace && path === "/login") return null

	return <Box sx={{ p: 6, mt: 2 }}>
		<Typography variant="body2" color="text.secondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="#">
				LMS
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	</Box>
}

export default Copyright