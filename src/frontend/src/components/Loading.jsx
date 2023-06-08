import { Backdrop, CircularProgress } from "@mui/material"

function Loading() {
	return <Backdrop open={true}>
		<CircularProgress color='inherit' />
	</Backdrop>
}

export default Loading