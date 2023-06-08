import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { getFormData } from "../helpers/form"
import api from "../api/api"
import { useNavigate } from "react-router-dom"

function ForgotPassword() {
	const navigate = useNavigate()

	async function handleSubmit(e) {
		const data = getFormData(e)
		console.log(data)
		let resp = await api.forgot_password(data)
		alert(resp.message)
		if (resp.success) {
			navigate('/')
		}
	}

	return <Container>
		<Typography variant="h3" sx={{ my: 4 }}
		>Forgot Password</Typography>
		<Typography variant="h5">Enter your email address. You will receive a link to create a new password via email.</Typography>
		<Box component="form" noValidate onSubmit={handleSubmit} sx={{ my: 2 }}>
			<TextField fullWidth label="Email" sx={{ mb: 2 }} />
			<Button type="submit" variant="contained">Reset Password</Button>
		</Box>
	</Container>
}

export default ForgotPassword