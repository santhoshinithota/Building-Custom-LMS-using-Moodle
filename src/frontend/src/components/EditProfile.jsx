import React from "react"
import { useState, useEffect } from "react"
import api from "../api/api"
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Button, FormControl, MenuItem, TextField } from "@mui/material"
import { getFormData } from "../helpers/form"
import { useNavigate } from "react-router-dom"

function EditProfile() {
	const navigate = useNavigate()
	const [user, setUser] = useState({})

	async function get_user() {
		api.get_current_user_profile().then((res) => {
			setUser(res.data)
		}).catch((err) => {
			alert(err)
		})
	}

	useEffect(() => {
		get_user()
	}, [])

	async function handleUpdate(e) {
		const data = getFormData(e)
		console.log(data)
		let resp = await api.update_user_profile(data)
		alert(resp.message)
		get_user()
	}

	async function handleDelete() {
		let resp = await api.delete_account(user)
		alert(resp.message)
		if (resp.success) {
			navigate("/login")
		}
	}

	return user.first_name && <>
		<Container maxWidth="sm">
			<Typography
				variant="h2"
				align="center"
				color="text.primary"
				gutterBottom
			>
				Edit Profile
			</Typography>
			<Typography variant="h5" align="center" color="text.secondary" paragraph>
				Edit your profile information
			</Typography>
		</Container>
		<Container sx={{ py: 4 }} maxWidth="sm" component="form" onSubmit={handleUpdate}>
			<FormControl fullWidth
				sx={{
					'& .MuiTextField-root': { my: 1 },
					'& .MuiButtonBase-root': { my: 1 },
				}}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField fullWidth label="First Name" name="first_name"
							defaultValue={user.first_name} />
					</Grid>
					<Grid item xs={6}>
						<TextField fullWidth label="Last Name" name="last_name"
							defaultValue={user.last_name} />
					</Grid>
				</Grid>
				<TextField label="Email" name="email"
					defaultValue={user.email} />
				<TextField select label="Email display" name="email_display"
					defaultValue={user.email_display}>
					<MenuItem value="public">Public</MenuItem>
					<MenuItem value="private">Private</MenuItem>
				</TextField>
				<TextField label="Address" multiline rows={3} name="address"
					defaultValue={user.address} />
				<TextField label="Description" multiline rows={3} name="description"
					defaultValue={user.description} />
				<Button type="submit" variant="contained" >
					Update
				</Button>
				<Button type="button" variant="contained" color="error"
					onClick={handleDelete}
				>
					Delete Account
				</Button>
			</FormControl>
		</Container>
	</>
}


export default EditProfile
