import React from "react"

import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ProfileIcon from "@mui/icons-material/AccountCircle"
import { Card, CardHeader, Container, Divider, Typography } from "@mui/material"

function SettingsPage({ embed }) {
	const main = <List>
		<ListItemButton href="/profile/edit">
			<ListItemIcon><ProfileIcon /></ListItemIcon>
			<ListItemText primary="Edit Profile" />
		</ListItemButton>
	</List>

	if (embed) return <Card>
		<CardHeader title="Settings" />
		{main}
	</Card>

	return <Container maxWidth="sm">
		<Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
			Settings
		</Typography>
		<Divider />
		{main}
	</Container>
}

export default SettingsPage