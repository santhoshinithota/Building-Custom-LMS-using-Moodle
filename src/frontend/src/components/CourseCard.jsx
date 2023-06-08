import { Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import MemberChip from "./MemberChip"

function CourseCard({ card }) {
	const navigate = useNavigate()
	const course = card
	return course && <Card
		sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
	>
		<CardActionArea
			onClick={() => {
				navigate(`/courses/${course.id}`)
			}}>
			<CardMedia
				component="img"
				// image="https://source.unsplash.com/random/400x400"
				image={course.image_url} />
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography gutterBottom variant="h5" component="h2">
					{course.code}
				</Typography>
				<Typography>
					{course.name}
				</Typography>
				<MemberChip course={course} />
				{course.member_count &&
					<Chip label={`${course.member_count} joined`} size="small" />}
			</CardContent>
		</CardActionArea>
	</Card>
}

export default CourseCard