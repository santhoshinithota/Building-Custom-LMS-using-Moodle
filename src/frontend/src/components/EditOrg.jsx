import React from "react"
import { useState, useEffect } from "react"
import api from "../api/api"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Button, FormControl, TextField } from "@mui/material"
import { getFormData } from "../helpers/form"
import { useNavigate } from "react-router-dom"

function EditOrg({ user }) {
	const navigate = useNavigate()
	const [org, setOrg] = useState({})

	async function getOrg() {
		api.get_current_user_org().then((res) => {
			setOrg(res.data)
		}).catch((err) => {
			alert(err)
		})
	}

	useEffect(() => {
		getOrg()
	}, [])

	async function handleUpdate(e) {
		const data = getFormData(e)
		console.log(data)
		let resp = await api.update_org(data)
		alert(resp.message)
		getOrg()
	}

	async function handleDelete() {
		let resp = await api.delete_account(user)
		alert(resp.message)
		if (resp.success) {
			navigate("/login")
		}
	}

	return org.name && <>
		<Container maxWidth="sm">
			<Typography
				variant="h2"
				align="center"
				color="text.primary"
				gutterBottom
			>
				Edit Organization
			</Typography>
			<Typography variant="h5" align="center" color="text.secondary" paragraph>
				Edit your organization information
			</Typography>
		</Container>
		<Container sx={{ py: 4 }} maxWidth="sm" component="form" onSubmit={handleUpdate}>
			<FormControl fullWidth
				sx={{
					'& .MuiTextField-root': { my: 1 },
					'& .MuiButtonBase-root': { my: 1 },
				}}>
				<TextField label="Name" name="name"
					defaultValue={org.name} />
				<TextField label="Email" name="email"
					defaultValue={org.email} />
				<TextField label="Address" multiline rows={3} name="address"
					defaultValue={org.address} />
				<TextField label="Description" multiline rows={3} name="description"
					defaultValue={org.description} />
				<Button type="submit" variant="contained" >
					Update
				</Button>
				<Button type="button" variant="contained" color="error"
					onClick={handleDelete}
				>
					Delete Account
				</Button>
			</FormControl>
		</Container >
	</>
}


export default EditOrg
