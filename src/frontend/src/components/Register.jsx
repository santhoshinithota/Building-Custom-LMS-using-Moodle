import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import RoleToggle from './RoleToggle'
import { useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'
import { getFormData } from '../helpers/form'


function Register() {
	const [role, setRole] = useState('teacher')
	const navigate = useNavigate()

	async function handleSubmit(e) {
		const data = getFormData(e)
		console.log(data)
		let resp = false
		if (role === 'teacher') {
			resp = await api.register_teacher(data)
		} else if (role === 'organization') {
			resp = await api.register_org(data)
		}
		alert(resp.message)
		if (resp.success) {
			navigate('/dashboard')
		}
	}

	function RegisterFields({ role }) {
		if (role === 'teacher') {
			return <>
				<Grid item xs={12} sm={6}>
					<TextField
						autoComplete="given-name"
						name="first_name"
						required
						fullWidth
						id="first_name"
						label="First Name"
						autoFocus
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="last_name"
						label="Last Name"
						name="last_name"
						autoComplete="family-name"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						id="organization"
						label="Organization"
						name="organization"
					/>
				</Grid>
			</>
		} else if (role === 'organization') {
			return <>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						id="org_name"
						label="Organization Name"
						name="org_name"
						autoFocus
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						id="org_address"
						label="Organization Address"
						name="org_address"
					/>
				</Grid>
			</>
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Register new account
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} container justifyContent="center">
							<RoleToggle role={role} setRole={setRole} />
						</Grid>

						<RegisterFields role={role} />
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="confirm_password"
								label="Confirm Password"
								type="password"
								id="confirm_password"
								autoComplete="new-password"
							/>
						</Grid>
						{/* <Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid> */}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Log in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}

export default Register