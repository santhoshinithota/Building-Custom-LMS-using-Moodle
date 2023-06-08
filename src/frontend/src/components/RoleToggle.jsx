import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useState } from "react"

// use this to toggle between teacher and organization
function RoleToggle({ role, setRole }) {

	return <ToggleButtonGroup
		value={role}
		exclusive
		onChange={(event, newRole) => {
			setRole(newRole)
		}}
	>
		<ToggleButton value="teacher">Teacher</ToggleButton>
		<ToggleButton value="organization">Organization</ToggleButton>
	</ToggleButtonGroup>
}

export default RoleToggle