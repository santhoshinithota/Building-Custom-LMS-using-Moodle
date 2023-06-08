import { Button, Card, CardContent, CardHeader, Container, Grid, List, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material"
import { useParams } from "react-router-dom"
import ArticleIcon from '@mui/icons-material/Article'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import api from "../api/api"
import { useEffect, useState } from "react"
import { getFormData } from "../helpers/form"
import CreateLectureDialog from "./CreateLectureDialog"
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

function LessonPage({ user }) {
	const { lesson_id } = useParams()
	const [lesson, setLesson] = useState(null)
	const [dialogMode, setDialogMode] = useState('')
	const [tab, setTab] = useState(0)

	async function get_lesson() {
		api.get_lesson(lesson_id).then((res) => {
			window.document.title = res?.data?.name || "Lesson"
			setLesson(res.data)
		}).catch((err) => {
			alert(err)
		})
	}

	useEffect(() => {
		get_lesson()
	}, [])

	function handleClose() {
		setDialogMode('')
	}

	async function handleSubmit(e) {
		const data = getFormData(e)
		console.log(data)
		let resp
		if (dialogMode === 'edit') {
			resp = await api.update_lecture(lesson.lectures[tab].id, data)
		} else if (dialogMode === 'new') {
			resp = await api.new_lecture(lesson_id, data)
		} else {
			return
		}
		alert(resp.message)
		get_lesson()
		handleClose()
	}

	async function handleDeleteLecture() {
		const id = lesson.lectures[tab].id
		if (!window.confirm("Are you sure you want to delete this lecture?")) return
		let resp = await api.delete_lecture(id)
		console.log(resp)
		alert(resp.message)
		if (resp.success) {
			get_lesson()
		}
	}

	return <Container>
		<Grid container spacing={2}>
			<Grid item container xs={4} >
				<Grid item xs={12}>
					<List style={{ maxHeight: '100%', overflow: 'auto' }}>
						{lesson?.lectures.length > 0 &&
							lesson.lectures.map((lecture, i) => {
								return <ListItemButton key={i}
									selected={tab === i}
									onClick={() => setTab(i)}
								>
									<ListItemIcon>
										{lecture.type === "video" ? <PlayCircleIcon /> : <ArticleIcon />}
									</ListItemIcon>
									<ListItemText>
										{lecture.name}
									</ListItemText>
								</ListItemButton>
							})
						}
					</List>
				</Grid>
				{user && user.role === 'org' &&
					<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Stack spacing={1}>
							<Button color="success" startIcon={<AddIcon />} variant="contained"
								onClick={() => { setDialogMode('new') }}
							>New lecture</Button>
							<Button color="warning" startIcon={<EditIcon />} variant="contained"
								disabled={lesson?.lectures.length === 0}
								onClick={() => { setDialogMode('edit') }}
							>Edit lecture</Button>
							<Button color="error" startIcon={<DeleteIcon />} variant="contained"
								disabled={lesson?.lectures.length === 0}
								onClick={() => { handleDeleteLecture() }}
							>Delete lecture</Button>
						</Stack>
					</Grid>
				}
			</Grid>
			<Grid item xs={8} >
				{lesson?.lectures.length > 0 &&
					<Lecture lecture={lesson.lectures[tab]} />
				}
			</Grid>
		</Grid>
		<CreateLectureDialog dialogMode={dialogMode}
			handleClose={handleClose}
			handleSubmit={handleSubmit}
			lecture={lesson?.lectures.length > 0 && lesson.lectures[tab]} />
	</Container >

}

function Lecture({ lecture }) {
	const { name, type, url } = lecture

	// calculate height
	const height = window.screen.availWidth * 8 / 12 * 9 / 16

	if (type === "video") {
		// get the video id from the url https://youtu.be/riXcZT2ICjA
		const video_id = url.split("/").pop()
		return <iframe width="100%" height={height}
			src={`https://www.youtube.com/embed/${video_id}`}
		/>
	} else if (type === "link") {
		// window.open(url, "_blank")
	} else if (type === "article") {
		return <iframe width="100%" height={height} src={url} />
	}
	return <Card>
		<CardHeader title={name} />
		<CardContent>
			<Button variant="contained" color="secondary"
				onClick={() => { window.open(url, "_blank") }}
			> Visit the site </Button>
		</CardContent>
	</Card>
}

export default LessonPage