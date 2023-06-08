import { Button, Container, FormControl, TextField, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/api"
import { getFormData } from "../helpers/form"
import { useEffect, useState } from "react"
import Loading from "./Loading"
import UnitCard from "./UnitCard"

function CreateUnit({ user }) {
	const { course_id, unit_id } = useParams()
	const [data, setData] = useState(null)
	const navigate = useNavigate()


	async function get_unit() {
		if (unit_id) {
			api.get_unit(unit_id).then((res) => {
				setData(res.data)
			}).catch((err) => {
				alert(err)
			})
		}
	}

	useEffect(() => {
		get_unit()
	}, [])

	async function handleDeleteUnit(id) {
		if (!window.confirm("Are you sure you want to delete this unit?")) return
		let resp = await api.delete_unit(id)
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
		if (unit_id)
			resp = await api.update_unit(unit_id, data)
		else
			resp = await api.new_unit(course_id, data)
		alert(resp.message)
		if (resp.success) {
			get_unit()
		}
	}

	if (!data && unit_id) return <Loading />

	return <Container maxWidth="md">
		<Typography
			variant="h2"
			align="center"
			color="text.primary"
			gutterBottom
		>
			{data ? "Edit Unit" : "New Unit"}
		</Typography>
		<Typography variant="h5" align="center" color="text.secondary" paragraph>
			{data ? "" : "Create a new unit for this course"}
		</Typography>
		<Container maxWidth="sm">
			<Container component="form" onSubmit={handleUpdate}>
				<FormControl fullWidth
					sx={{
						'& .MuiTextField-root': { my: 1 },
						'& .MuiButton-root': { my: 1 },
					}}>
					<TextField label="Unit Name" name="name" defaultValue={data?.name} />
					<TextField label="Unit Description" name="description" defaultValue={data?.description} />
					<Button type="submit" variant="contained">
						{data ? "Update Unit" : "Create Unit"}
					</Button>
					{data && <Button type="button" variant="contained" color="error"
						onClick={() => handleDeleteUnit(data.id)}>
						Delete Unit
					</Button>}
				</FormControl>
			</Container>
		</Container>
		{data && <UnitCard card={data} editMode course_id={course_id} user={user} />}
	</Container>
}

export default CreateUnit