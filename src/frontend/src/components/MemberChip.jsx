import BeenhereIcon from '@mui/icons-material/Beenhere'
import { Chip } from '@mui/material'

function MemberChip({ course }) {
	if (course.is_member) return <Chip label="Member"
		color="primary" size="small" icon={<BeenhereIcon />} />
}

export default MemberChip