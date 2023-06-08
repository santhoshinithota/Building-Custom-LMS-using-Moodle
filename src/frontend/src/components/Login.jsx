import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Copyright from './Copyright'
import { getFormData } from '../helpers/form'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

function Login({ path }) {
	const [role, setRole] = React.useState('teacher')

	const navigate = useNavigate()
	async function handleSubmit(e) {
		const data = getFormData(e)
		data.role = role
		console.log(data)
		let resp = await api.login(data)
		if (resp.success) {
			navigate(path)
		} else {
			alert(resp.message)
		}
	}

	return <Grid container component="main" sx={{ height: '100vh' }}>
		<Grid
			item
			xs={false}
			sm={4}
			md={7}
			sx={{
				backgroundImage: 'url(https://s.hdnux.com/photos/33/74/03/7323881/4/rawImage.jpg)',
				backgroundRepeat: 'no-repeat',
				backgroundColor: (t) =>
					t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		/>
		<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
			<Box
				sx={{
					my: 8,
					mx: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Log in as
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<ToggleButtonGroup
							color="primary"
							value={role}
							exclusive
							onChange={(e, v) => setRole(v)}
						>
							<ToggleButton value="teacher">Teacher</ToggleButton>
							<ToggleButton value="org">Organization</ToggleButton>
						</ToggleButtonGroup>
					</Box>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox
							value="rememberMe"
							name="rememberMe"
							color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="/forgot_password" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/register" variant="body2">
								Don't have an account? Register
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright replace={true} />
		</Grid>
	</Grid>
}

export default Login