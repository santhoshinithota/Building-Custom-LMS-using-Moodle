import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/api"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Alert, Button, Chip, Grid, ListItemIcon, ListItemText, SpeedDial, SpeedDialAction, Stack, Tooltip } from "@mui/material"
import MemberChip from "./MemberChip"
import UnitCard from "./UnitCard"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import BookIcon from '@mui/icons-material/Book'
import AddIcon from '@mui/icons-material/Add'
import VideoCard from "./VideoCard"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'


function Course({ user }) {
	const { course_id } = useParams()
	const [course, setCourse] = useState({})
	const [videoDeleteMode, setVideoDeleteMode] = useState(false)
	const navigate = useNavigate()

	async function getCourse() {
		api.get_course_details(course_id).then((res) => {
			window.document.title = res?.data?.name || "Course"
			setCourse(res.data)
		}).catch((err) => {
			alert(err)
		})
	}

	useEffect(() => {
		getCourse()
	}, [])

	async function handleDeleteCourse(id) {
		if (!window.confirm("Are you sure you want to delete this course?")) return
		let resp = await api.delete_course(course_id)
		console.log(resp)
		alert(resp.message)
		if (resp.success) {
			navigate("/courses")
		}
	}

	async function handleDeleteVideo(id) {
		if (!window.confirm("Are you sure you want to delete this video resource?")) return
		let resp = await api.delete_video(id)
		console.log(resp)
		alert(resp.message)
		if (resp.success) {
			getCourse()
		}
	}

	return <Container maxWidth="md">
		<Grid container spacing={2} sx={{ p: 1 }}>
			<Grid item xs={12} md={9}>
				<Typography variant="h3" color="text.primary">
					{course.name}
				</Typography>
				<Typography variant="h5" color="text.secondary" paragraph>
					{course.code}
				</Typography>
				<Typography variant="h6" color="text.secondary" paragraph>
					{course.description}
				</Typography>
			</Grid>
			<Grid item xs={12} md={3}>
				<Box sx={{ pb: 2 }} display="flex" justifyContent="center">
					<MemberChip course={course} />
				</Box>
				<Box>
					<Stack direction="column" spacing={1} >
						<ContextualButtons course={course} />
					</Stack>
				</Box>
			</Grid>
		</Grid>
		<Container>
			{user.role === "org" &&
				<SpeedDial sx={{ pb: 2 }}
					ariaLabel="Add"
					direction="left"
					icon={<AddIcon />}
				>
					<SpeedDialAction
						icon={<VideoLibraryIcon />}
						tooltipTitle="New Video Resource"
						onClick={() => navigate(`/courses/${course.id}/new_video`)}
					/>
					<SpeedDialAction
						icon={<BookIcon />}
						tooltipTitle="New Unit"
						onClick={() => navigate(`/courses/${course.id}/new_unit`)}
					/>
				</SpeedDial>
			}
			{course.videos && <Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<ListItemIcon><VideoLibraryIcon /></ListItemIcon>
					<ListItemText primary="Video Resources" />
					<Chip label={course.videos.length} />
				</AccordionSummary>
				<AccordionDetails>
					{videoDeleteMode &&
						<Alert severity="info" sx={{ mb: 2 }}
						>Click on the trash icon to delete a lecture</Alert>}
					<Grid container spacing={2}>
						{course.videos && course.videos.map((lecture) => (
							<Grid item key={lecture.id} xs={12} sm={6} md={4}>
								<VideoCard card={lecture}
									handleDeleteVideo={handleDeleteVideo}
									videoDeleteMode={videoDeleteMode}
									course_id={course.id} />
							</Grid>
						))}
					</Grid>
				</AccordionDetails>
				<AccordionActions sx={{ justifyContent: "flex-start", pt: 0 }}>
					{user.role === "org" &&
						<Tooltip title="Edit Video Resources">
							<SpeedDial
								sx={{
									'& .MuiFab-primary': {
										width: 40,
										height: 40,
										backgroundColor: videoDeleteMode ? "error.main" : "secondary.main",
									},
								}}
								ariaLabel="Edit Video Resources"
								icon={<EditIcon />}
								onClick={() => setVideoDeleteMode(!videoDeleteMode)}
							/>
						</Tooltip>}
				</AccordionActions>
			</Accordion>}
			{course.units && <Accordion defaultExpanded >
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<ListItemIcon><BookIcon /></ListItemIcon>
					<ListItemText primary="Units" />
					<Chip label={course.units.length} />
				</AccordionSummary>
				<Grid container spacing={2}>
					{course.units && course.units.map((unit) => (
						<Grid item key={unit.id} xs={12} sm={12} md={12}>
							<UnitCard card={unit} course_id={course.id} user={user} />
						</Grid>
					))}
				</Grid>
			</Accordion>}
		</Container>
	</Container >

	function ContextualButtons({ course }) {
		async function handleLeaveCourse() {
			let resp = await api.leave_course(course.id)
			console.log(resp)
			alert(resp.message)
			if (resp.success) {
				getCourse()
			}
		}

		async function handleJoinCourse() {
			let resp = await api.join_course(course.id)
			console.log(resp)
			alert(resp.message)
			if (resp.success) {
				getCourse()
			}
		}

		if (user.role === 'org') {
			return <>
				<Button
					variant="contained"
					onClick={() => { navigate(`/courses/${course.id}/edit`) }}
					color="secondary"
					startIcon={<EditIcon />}
				>Edit Course</Button>
				<Button
					variant="contained"
					onClick={() => { handleDeleteCourse(course.id) }}
					color="error"
					startIcon={<DeleteIcon />}
				>Delete Course</Button>
			</>
		}

		if (course.is_member)
			return <Button
				variant="contained"
				onClick={handleLeaveCourse}
				color="error"
			>Leave Course</Button>
		else
			return <Button
				variant="contained"
				onClick={handleJoinCourse}
				color="success"
			>Join Course</Button>
	}
}

export default Course