import Typography from '@mui/material/Typography'
import { Button, ButtonGroup, Card, CardActionArea, CardContent, CardMedia, IconButton, Tooltip } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

function VideoCard({ card, course_id, handleDeleteVideo, videoDeleteMode }) {
	const navigate = useNavigate()
	const lecture = card
	// get the video id from the url https://youtu.be/riXcZT2ICjA
	const video_id = lecture.url.split("/").pop()

	return <Card sx={{ display: 'flex', flexDirection: 'column' }}>
		<CardActionArea
			onClick={() => {
				if (!videoDeleteMode)
					window.location.href = lecture.url
			}}>
			<CardMedia
				component="img"
				image={`http://img.youtube.com/vi/${video_id}/hqdefault.jpg`} />
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography variant="h5">
					{lecture.name}
				</Typography>
				<Typography>
					{lecture.description}
				</Typography>
			</CardContent>
		</CardActionArea>
		<ButtonGroup fullWidth variant="text">
			{videoDeleteMode &&
				<Tooltip title="Delete Video Resource">
					<Button color="error"
						onClick={() => handleDeleteVideo(lecture.id)} >
						<DeleteIcon />
					</Button></Tooltip>}
			{videoDeleteMode &&
				<Tooltip title="Edit Video Resource">
					<Button color="secondary"
						onClick={() => navigate(`/courses/${course_id}/edit_video/${lecture.id}`)} >
						< EditIcon />
					</Button></Tooltip>}
		</ButtonGroup>
	</Card >
}

export default VideoCard