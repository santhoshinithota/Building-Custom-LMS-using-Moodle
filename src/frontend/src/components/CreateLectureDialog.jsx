import { Alert, Button, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react"

function CreateLectureDialog({ dialogMode, handleClose, handleSubmit, handleDeleteLecture, lecture }) {
	if (!lecture || dialogMode === 'new') lecture = {
		name: '',
		type: 'video',
		url: ''
	}
	const [lectureType, setLectureType] = useState(lecture.type)
	const [urlError, setUrlError] = useState(true)
	const [url, setUrl] = useState(lecture.url)

	// get the video id from the url https://youtu.be/yAoLSRbwxL8
	const video_id = url.split("/").pop()
	useEffect(() => {
		if (lectureType !== 'video') {
			setUrlError(false)
		} else if (/https:\/\/youtu\.be\//.test(url)) {
			setUrlError(false)
		} else {
			setUrlError(true)
		}
	}, [url])

	return <Dialog open={Boolean(dialogMode)} onClose={handleClose}
		component="form" onSubmit={handleSubmit}>
		<DialogTitle>
			{dialogMode === 'new' && 'New Lecture'}
			{dialogMode === 'edit' && 'Edit Lecture'}
		</DialogTitle>
		<DialogContent>
			{lectureType === 'video' &&
				<DialogContentText>
					Please make sure that the video is public
				</DialogContentText>
			}
			<Grid container spacing={2}>
				{lectureType === 'video' &&
					<Grid item xs={6}>
						<CardMedia
							component="img"
							image={urlError ? 'https://i0.wp.com/www.silocreativo.com/en/wp-content/uploads/2017/11/error-404-animacion-CSS.gif?resize=675%2C368&quality=100&strip=all&ssl=1' : `http://img.youtube.com/vi/${video_id}/hqdefault.jpg`} />
					</Grid>}
				<Grid item xs={lectureType === 'video' ? 6 : 12}>
					<FormControl fullWidth
						sx={{
							'& .MuiTextField-root': { my: 1 },
						}}>
						{urlError && <Alert
							severity="error"
							sx={{ mb: 2 }}
						>
							URL should be in the format of https://youtu.be/riXcZT2ICjA
						</Alert>}
						<TextField
							autoFocus
							label="Lecture Name"
							fullWidth
							variant="standard"
							defaultValue={lecture.name}
						/>
						<TextField select fullWidth
							variant="standard"
							label="Lecture Type"
							name="type"
							onChange={(e) => { setLectureType(e.target.value) }}
							defaultValue={lectureType}>
							<MenuItem value="video">Video</MenuItem>
							<MenuItem value="link">Link</MenuItem>
							<MenuItem value="article">Article</MenuItem>
						</TextField>
						<TextField
							label="Lecture URL"
							fullWidth
							variant="standard"
							onChange={(e) => { setUrl(e.target.value) }}
							defaultValue={url}
						/>
					</FormControl>
				</Grid>
			</Grid>
		</DialogContent>
		<DialogActions>
			<Button onClick={handleClose}>Cancel</Button>
			<Button type="submit">Create</Button>
		</DialogActions>
	</Dialog>
}

export default CreateLectureDialog