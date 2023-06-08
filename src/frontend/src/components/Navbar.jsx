import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import ListItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import AccountCircle from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api from '../api/api'
import { useEffect } from 'react'
import { useState } from 'react'
import { Avatar, Divider, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Popover, Switch } from '@mui/material'
import BreadcrumbsBar from './BreadcrumbsBar'
import Brightness4Icon from '@mui/icons-material/Brightness4'

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '12ch',
			'&:focus': {
				width: '50ch',
			},
		},
	},
}))

function Navbar({ darkmode, setDarkmode, user }) {
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = useState(null)
	const [notifAnchorEl, setNotifAnchorEl] = useState(null)
	const [searchAnchorEl, setSearchAnchorEl] = useState(null)
	const [unseenNotifCount, setUnseenNotifCount] = useState(0)
	const [unseenNotifs, setUnseenNotifs] = useState([])
	const [searchResults, setSearchResults] = useState([])

	useEffect(() => {
		api.get_unseen_notif_count().then((res) => {
			setUnseenNotifCount(res.data)
		}).catch((err) => {
			alert(err)
		})
	}, [])

	async function getUnseenNotifs() {
		api.get_unseen_notifs().then((res) => {
			setUnseenNotifs(res.data)
		}).catch((err) => {
			alert(err)
		})
	}

	async function getSearchResults(query) {
		api.get_search_results({ query }).then((res) => {
			setSearchResults(res.data)
		}).catch((err) => {
			alert(err)
		})
	}

	async function markNotifAsSeen(notif_id) {
		api.mark_notif_as_seen(notif_id).then((res) => {
			setUnseenNotifCount(v => v - 1)
		}).catch((err) => {
			alert(err)
		})
	}

	async function clearNotifs() {
		api.clear_notifs().then((res) => {
			setUnseenNotifCount(0)
		}).catch((err) => {
			alert(err)
		})
	}

	let authorized = true
	const path = useLocation().pathname
	if (path === "/login")
		return null
	if (path === "/register" || path === "/forgot_password")
		authorized = false

	const profile_url = user.role === 'teacher' ? "/profile" : "/organization"

	const isMenuOpen = Boolean(anchorEl)
	const isNotifOpen = Boolean(notifAnchorEl)
	const isSearchOpen = Boolean(searchAnchorEl)

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleNotifOpen = (event) => {
		getUnseenNotifs()
		setNotifAnchorEl(event.currentTarget)
	}

	const handleSearchOpen = (event) => {
		getSearchResults(event.target.value)
		setSearchAnchorEl(event.currentTarget)
	}

	async function handleLogout() {
		let resp = await api.logout()
		alert(resp.message)
		if (resp.success) {
			window.location.replace("/login")
		}
	}

	const authorizedControls = <>
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search..."
				inputProps={{ 'aria-label': 'search' }}
				onChange={handleSearchOpen}
			/>
		</Search>
		<Box sx={{ flexGrow: 1 }} />
		<Box sx={{ display: 'flex' }}>
			<IconButton
				size="large"
				color="inherit"
				aria-label="show new notifications"
				aria-controls="notif-menu"
				aria-haspopup="true"
				onClick={handleNotifOpen}
			>
				<Badge badgeContent={unseenNotifCount} color="error">
					<NotificationsIcon />
				</Badge>
			</IconButton>
			<IconButton
				size="large"
				edge="end"
				aria-label="account of current user"
				aria-controls="account-menu"
				aria-haspopup="true"
				onClick={handleProfileMenuOpen}
				color="inherit"
			>
				<AccountCircle />
			</IconButton>
		</Box>
	</>


	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" enableColorOnDark>
				<Toolbar>
					<Link to="/">
						<Box component="img"
							src="https://w7.pngwing.com/pngs/826/933/png-transparent-learning-management-system-education-lms.png"
							sx={{ width: 50, height: 50, mr: 2 }} />
					</Link>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ display: { xs: 'none', sm: 'block' } }}
					>
						LMS
					</Typography>
					{authorized && authorizedControls}
				</Toolbar>
			</AppBar>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={isMenuOpen}
				onClose={handleMenuClose}
				elevation={4}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{user &&
					<ListItem>
						<ListItemAvatar onClick={() => navigate(profile_url)}
						><Avatar /></ListItemAvatar>
						<ListItemText
							onClick={() => navigate(profile_url)}
							primary={user.email}
							secondary={user.role === 'teacher' ? 'Teacher' : 'Organization'}
						/>
						<IconButton
							onClick={() => navigate(profile_url + '/edit')}
						><EditIcon /></IconButton>
					</ListItem>
				}
				<Divider />
				<ListItem onClick={() => window.location.replace("/dashboard")}>
					<ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItem>
				<ListItem onClick={() => window.location.replace("/settings")}>
					<ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
					<ListItemText primary="Settings" />
				</ListItem>
				<ListItem onClick={handleLogout}>
					<ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
					<ListItemText primary="Logout" />
				</ListItem>
				<ListItem
					onClick={() => {
						setDarkmode(!darkmode)
					}}
				>
					<ListItemIcon><Brightness4Icon fontSize="small" /></ListItemIcon>
					<ListItemText primary="Dark Mode" />
					<Switch checked={darkmode} edge="end" size="small" />
				</ListItem>
			</Menu>
			<Menu
				id="notif-menu"
				anchorEl={notifAnchorEl}
				keepMounted
				open={isNotifOpen}
				onClose={() => setNotifAnchorEl(null)}
				elevation={4}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<ListSubheader>
					<ListItemButton>
						<ListItemText
							primary="Clear all"
							onClick={() => {
								clearNotifs()
								setNotifAnchorEl(null)
							}}
						/>
					</ListItemButton>
				</ListSubheader>
				<Divider />
				{unseenNotifs.map((notif) => (
					<ListItem key={notif.id} onClick={() => {
						markNotifAsSeen(notif.id)
						window.location.replace(notif.link)
					}}>
						<ListItemText
							primary={notif.title}
							secondary={notif.description}
						/>
					</ListItem>
				))}
			</Menu>
			{searchResults.length > 0 &&
				<Popover
					id="search-menu"
					anchorEl={searchAnchorEl}
					keepMounted
					open={isSearchOpen}
					disableAutoFocus
					onClose={() => setSearchAnchorEl(null)}
					elevation={4}
					transformOrigin={{ horizontal: 'left', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
				>
					{searchResults.map((result) => (
						<ListItem key={result.id} onClick={() => window.location.replace(result.link)}>
							<ListItemText
								primary={result.title}
								secondary={result.description}
							/>
						</ListItem>
					))}
				</Popover>}
			<BreadcrumbsBar />
		</Box>
	)
}

export default Navbar