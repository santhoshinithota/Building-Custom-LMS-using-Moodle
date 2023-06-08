import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import api from '../api/api'
import Login from './Login'
import { Backdrop, CircularProgress } from '@mui/material'

function PrivateRoute({ user, setUser, path }) {
	const [loading, setLoading] = useState(true)

	async function verify_token() {
		let resp = await api.verify_token()
		if (resp.success) {
			setUser(resp.data)
		}
		setLoading(false)
	}

	useEffect(() => {
		verify_token()
	}, [])

	if (loading) return <Backdrop open={true}>
		<CircularProgress color='inherit' />
	</Backdrop>

	return <>{
		user ? <Outlet /> : <Login setUser={setUser} path={path} />
	}</>
}

export default PrivateRoute