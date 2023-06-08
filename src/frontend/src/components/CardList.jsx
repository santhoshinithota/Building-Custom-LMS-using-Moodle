import { Grid } from "@mui/material";

function CardList({ cards, Renderer, xs = 12, sm = 6, md = 3 }) {
	return <Grid container spacing={2}>
		{cards && cards.map((card) => (
			<Grid item key={card.id} xs={xs} sm={sm} md={md}>
				<Renderer card={card} />
			</Grid>
		))}
	</Grid>
}

export default CardList