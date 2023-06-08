import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import api from '../api/api'

function OrgCard() {
	const navigate = useNavigate()
	const [org, setOrg] = useState({})

	useEffect(() => {
		api.get_current_user_org().then((res) => {
			setOrg(res.data)
		}).catch((err) => {
			alert(err)
		})
	}, [])

	return (
		<Card sx={{ display: 'flex', mb: 2 }}>
			<CardMedia
				component="img"
				sx={{ width: 151, height: 151 }}
				image={org.profile_image}
			/>
			<CardContent >
				<Stack sx={{ pb: 2 }}>
					<Typography component="div" variant="h5">
						{org.name}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary" component="div">
						{org.description}
					</Typography>
				</Stack>
				<Button size="small" variant="contained"
					onClick={() => {
						navigate("/organization/edit")
					}}
				>Edit Organization</Button>
			</CardContent>
		</Card>
	)
}


export default OrgCard