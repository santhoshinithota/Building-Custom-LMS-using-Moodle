import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import api from '../api/api'
import { useState, useEffect } from 'react'
import { Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CardList from './CardList'
import CourseCard from './CourseCard'

function Courses({ user }) {
	const navigate = useNavigate()
	const [courses, setCourses] = useState([])

	useEffect(() => {
		api.get_all_courses().then((res) => {
			setCourses(res.data)
		}).catch((err) => {
			alert(err)
		})
	}, [])


	return <>
		<Box>
			<Container maxWidth="sm">
				<Typography
					component="h1"
					variant="h2"
					align="center"
					color="text.primary"
				>
					Courses
				</Typography>
				<Typography variant="h5" align="center" color="text.secondary" paragraph>
					Explore courses from your organization
				</Typography>
			</Container>
		</Box>
		<Stack direction="row" spacing={2} justifyContent="center">
			{user.role === "org" &&
				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						navigate('/courses/new')
					}}
				>
					Create a new course
				</Button>}
		</Stack>
		<Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
			<CardList cards={courses} Renderer={CourseCard} />
		</Container>
	</>
}

export default Courses