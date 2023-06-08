import { Box, Card, CardContent, CardHeader, Container, Divider, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import api from "../api/api"
import { snakeCase_toCamelCase } from "../helpers/string"

function MyOrg({ embed }) {
	const [org, setOrg] = useState({})

	useEffect(() => {
		api.get_current_user_org().then((res) => {
			setOrg(res.data)
		}).catch((err) => {
			alert(err)
		})
	}, [])

	const main = <>{Object.entries(org)
		.filter(([key, value]) => key !== "profile_image")
		.map(([key, value]) => {
			return <div key={key}>
				<Typography variant="body2" color="text.secondary">
					{snakeCase_toCamelCase(key)}
				</Typography>
				{value}
			</div>
		})}
	</>

	if (embed) return <Card>
		<CardHeader title="My Organization" />
		<CardContent>{main}</CardContent>
	</Card>

	return <Container maxWidth="sm">
		<Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
			My Organization
		</Typography>
		<Divider />
		<Box sx={{ mt: 2 }}>
			{main}
		</Box>
	</Container>
}

export default MyOrg