import { Backdrop, Button, CircularProgress, Container, FormControl, TextField, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/api"
import { getFormData } from "../helpers/form"
import { useEffect, useState } from "react"
import Loading from "./Loading"

function CreateVideo() {
	const { course_id, video_id } = useParams()
	const [data, setData] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		if (video_id) {
			api.get_video(video_id).then((res) => {
				setData(res.data)
			}).catch((err) => {
				alert(err)
			})
		}
	}, [])


	async function handleDeleteVideo(id) {
		if (!window.confirm("Are you sure you want to delete this video resource?")) return
		let resp = await api.delete_video(id)
		console.log(resp)
		alert(resp.message)
		if (resp.success) {
			navigate(`/courses/${course_id}`)
		}
	}

	async function handleUpdate(e) {
		const data = getFormData(e)
		console.log(data)
		let resp
		if (video_id)
			resp = await api.update_video(video_id, data)
		else
			resp = await api.new_video(course_id, data)
		alert(resp.message)
	}

	if (!data && video_id) return <Loading />

	return <Container maxWidth="sm">
		<Typography
			variant="h3"
			align="center"
			color="text.primary"
			gutterBottom
		>
			{data ? "Edit Video Resource" : "New Video Resource"}
		</Typography>
		<Typography variant="h5" align="center" color="text.secondary" paragraph>
			{data ? "" : "Create a new video resource for this course"}
		</Typography>
		<Container component="form" onSubmit={handleUpdate}>
			<FormControl fullWidth
				sx={{
					'& .MuiTextField-root': { my: 1 },
					'& .MuiButton-root': { my: 1 },
				}}>
				<TextField label="Video Name" name="name" defaultValue={data?.name} />
				<TextField label="Video Description" name="description" defaultValue={data?.description} />
				<TextField label="YouTube URL" name="url" defaultValue={data?.url} />
				<Button type="submit" variant="contained">
					{data ? "Update Video Resource" : "Create Video Resource"}
				</Button>
				{data &&
					<Button type="button" variant="contained" color="error"
						onClick={() => { handleDeleteVideo(video_id) }}>
						Delete Video Resource
					</Button>
				}
			</FormControl>
		</Container>
	</Container>
}

export default CreateVideo