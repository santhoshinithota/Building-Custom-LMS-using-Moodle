import Container from '@mui/material/Container'
import ProfileCard from './ProfileCard'
import TabPage from './TabPage'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SettingsIcon from '@mui/icons-material/Settings'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import MyCourses from './MyCourses'
import MyProfile from './MyProfile'
import SettingsPage from './SettingsPage'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MyOrg from './MyOrg'
import OrgMyCourses from './OrgMyCourses'
import OrgCard from './OrgCard'

function Dashboard({ user }) {
	const tabs = [
		{
			name: "My Courses",
			tab: user.role === 'teacher' ? <MyCourses /> : <OrgMyCourses />,
			icon: <MenuBookIcon />
		},
		{
			name: "My Profile",
			tab: <MyProfile embed={true} />,
			icon: <AccountCircleIcon />,
			hidden: user.role === 'org'
		},
		{
			name: "My Organization",
			tab: <MyOrg embed={true} />,
			icon: <CorporateFareIcon />
		},
		{
			name: "Settings",
			tab: <SettingsPage embed={true} />,
			icon: <SettingsIcon />
		}
	]

	return <Container maxWidth="lg">
		{user.role === 'teacher' ?
			<ProfileCard /> : <OrgCard />
		}
		<TabPage tabs={tabs} />
	</Container>
}

export default Dashboard