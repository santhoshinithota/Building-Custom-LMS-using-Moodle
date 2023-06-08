import { Alert, Card, CardContent, Divider, Grid, IconButton, List, ListItemButton, ListItemText, SpeedDial, Tooltip, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from "react"
import api from "../api/api"

function UnitCard({ card, editMode, course_id, user }) {
	const [deleteMode, setDeleteMode] = useState(false)
	const navigate = useNavigate()
	const unit = card


	async function handleDeleteLesson(id) {
		if (!window.confirm("Are you sure you want to delete this lesson?")) return
		let resp = await api.delete_lesson(id)
		console.log(resp)
		alert(resp.message)
	}

	async function handleAddLesson() {
		const name = window.prompt("Enter name of the new lesson")
		if (!name) return
		const data = { name }
		let resp = await api.new_lesson(unit.id, data)
		console.log(resp)
		alert(resp.message)
	}

	if (!unit.lessons) return null

	// divide into 2 columns if there are more than 5 lessons
	let columns = [unit.lessons]
	if (unit.lessons.length > 5) {
		columns = [
			unit.lessons.slice(0, unit.lessons.length / 2),
			unit.lessons.slice(unit.lessons.length / 2, unit.lessons.length),
		]
	}

	return unit && <Card>
		<CardContent sx={{ flexGrow: 1 }}>
			<Typography variant="h5" component="div">
				{unit.name}
			</Typography>
			<Typography variant="body2" color="text.secondary">
				{unit.description}
			</Typography>
			<Divider />
			{deleteMode &&
				<Alert severity="info">Click on the trash icon to delete a lesson</Alert>}
			<Grid container spacing={2}>
				{columns.map((column, i) => {
					return <Grid item key={i} xs={12} md={6}>
						<List>
							{column.map((lesson) => {
								return <ListItemButton key={lesson.id}
									onClick={() => !deleteMode && navigate(`/courses/${course_id}/lessons/${lesson.id}`)}
								>
									<ListItemText>
										{lesson.name}
									</ListItemText>
									{deleteMode &&
										<IconButton
											size="small"
											color="error"
											onClick={() => handleDeleteLesson(lesson.id)}
											title="Delete Lesson"
										><DeleteIcon /></IconButton>}
								</ListItemButton>
							})}
						</List>
					</Grid>
				})}
			</Grid>
			{user.role === 'org' &&
				<List sx={{ py: 2 }}>
					<Tooltip title="Edit Unit">
						<SpeedDial
							sx={{
								'& .MuiFab-primary': {
									width: 40,
									height: 40,
									backgroundColor: deleteMode ? "error.main" : "secondary.main",
								},
								position: "absolute",
								bottom: 0,
								left: 0,
							}}
							ariaLabel="Edit Unit"
							icon={<EditIcon />}
							onClick={() => {
								editMode ? setDeleteMode(!deleteMode) : navigate(`/courses/${course_id}/edit_unit/${unit.id}`)
							}}
						/>
					</Tooltip>
					{editMode &&
						<Tooltip title="Add Lesson">
							<SpeedDial
								sx={{
									'& .MuiFab-primary': {
										width: 40,
										height: 40,
										backgroundColor: "secondary.main",
									},
									position: "absolute",
									bottom: 0,
									right: 0,
								}}
								ariaLabel="Add Lesson"
								icon={<NoteAddIcon />}
								onClick={() => handleAddLesson()}
							/>
						</Tooltip>}
				</List>}
		</CardContent>
	</Card >
}

export default UnitCard