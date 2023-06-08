import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Grid } from '@mui/material'
import { useState } from 'react'

function TabPage({ tabs }) {
	const [tab, setTab] = useState(0)
	return <Grid container spacing={2}>
		<Grid item xs={12} sm={4} md={3}>
			<List>
				{tabs.map((tab_item, index) => {
					if (tab_item.hidden) return null
					return <ListItemButton key={index} onClick={() => setTab(index)} selected={tab === index}>
						<ListItemIcon>{tab_item.icon}</ListItemIcon>
						<ListItemText primary={tab_item.name} />
					</ListItemButton>
				})}
			</List>
		</Grid>
		<Grid item xs={12} sm={8} md={9}>
			{tabs[tab].tab}
		</Grid>
	</Grid>
}


export default TabPage