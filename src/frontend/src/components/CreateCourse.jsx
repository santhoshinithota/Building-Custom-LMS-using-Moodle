import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { getFormData } from '../helpers/form'
import api from '../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import { FormControl } from '@mui/material'

function CreateCourse() {
	const { course_id } = useParams()
	const [data, setData] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		if (course_id) {
			api.get_course_details(course_id).then((res) => {
				setData(res.data)
			}).catch((err) => {
				alert(err)
			})
		}
	}, [])

	async function handleDeleteCourse(id) {
		if (!window.confirm("Are you sure you want to delete this course?")) return
		let resp = await api.delete_course(id)
		console.log(resp)
		alert(resp.message)
		if (resp.success) {
			navigate(`/courses`)
		}
	}

	async function handleSubmit(e) {
		const data = getFormData(e)
		console.log(data)
		let resp
		if (course_id)
			resp = await api.update_course(course_id, data)
		else
			resp = await api.create_course(data)
		alert(resp.message)
		if (resp.success && !course_id) {
			navigate('/courses')
		}
	}

	if (!data && course_id) return <Loading />

	return (
		<Container maxWidth="sm">
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1 }}>
					<MenuBookIcon />
				</Avatar>
				<Typography variant="h5">
					{data ? "Edit Course" : "New Course"}
				</Typography>
				<Container component="form" onSubmit={handleSubmit}>
					<FormControl fullWidth
						sx={{
							'& .MuiTextField-root': { my: 1 },
							'& .MuiButton-root': { my: 1, },
						}}>
						<TextField
							margin="normal"
							required
							label="Course Name"
							name="name"
							autoFocus
							defaultValue={data?.name}
						/>
						<TextField
							required
							name="code"
							label="Course Code"
							defaultValue={data?.code}
						/>
						<TextField
							multiline
							rows={3}
							required
							name="description"
							label="Description"
							defaultValue={data?.description}
						/>
						<Button
							type="submit"
							variant="contained"
						> {data ? "Update Course" : "Create Course"}
						</Button>
						{course_id && <Button
							type="button"
							variant="contained"
							color="error"
							onClick={() => handleDeleteCourse(course_id)}
						>Delete Course</Button>}
					</FormControl>
				</Container>
			</Box>
		</Container >
	)
}

export default CreateCourse