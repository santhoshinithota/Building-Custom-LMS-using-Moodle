import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { CssBaseline } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Register from "./components/Register"
import Courses from "./components/Courses"
import Course from "./components/Course"
import NotFound from "./components/NotFound"
import CreateCourse from "./components/CreateCourse"
import Navbar from "./components/Navbar"
import EditProfile from "./components/EditProfile"
import ForgotPassword from "./components/ForgotPassword"
import LessonPage from "./components/LessonPage"
import SettingsPage from "./components/SettingsPage"
import MyProfile from "./components/MyProfile"
import PrivateRoute from "./components/PrivateRoute"
import { useState } from "react"
import Copyright from "./components/Copyright"
import TeacherTheme from "./themes/TeacherTheme"
import OrgTheme from "./themes/OrgTheme"
import MyOrg from "./components/MyOrg"
import EditOrg from "./components/EditOrg"
import CreateVideo from "./components/CreateVideo"
import CreateUnit from "./components/CreateUnit"

function App() {
  const [user, setUser] = useState({})
  const path = window.location.pathname

  const [darkmode, setDarkmode] = useState(false)
  let role_theme = () => { }
  if (user && user.role === 'teacher')
    role_theme = TeacherTheme
  else if (user && user.role === 'org')
    role_theme = OrgTheme

  const theme = createTheme(role_theme(darkmode ? 'dark' : 'light'))

  return <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} user={user} />
      <Routes>
        <Route element={<PrivateRoute user={user} setUser={setUser} path={path} />} >
          <Route exact path="/profile" element={<MyProfile />} />
          <Route exact path="/profile/edit" element={<EditProfile />} />
          <Route exact path="/organization" element={<MyOrg />} />
          <Route exact path="/organization/edit" element={<EditOrg user={user} />} />

          <Route exact path="/dashboard" element={<Dashboard user={user} />} />
          <Route exact path="/settings" element={<SettingsPage />} />

          <Route exact path="/courses" element={<Courses user={user} />} />
          <Route exact path="/courses/new" element={<CreateCourse />} />
          <Route exact path="/courses/:course_id/edit" element={<CreateCourse />} />
          <Route exact path="/courses/:course_id" element={<Course user={user} />} />
          <Route exact path="/courses/:course_id/new_video" element={<CreateVideo />} />
          <Route exact path="/courses/:course_id/edit_video/:video_id" element={<CreateVideo />} />
          <Route exact path="/courses/:course_id/new_unit" element={<CreateUnit user={user} />} />
          <Route exact path="/courses/:course_id/edit_unit/:unit_id" element={<CreateUnit user={user} />} />

          <Route exact path="/courses/:course_id/lessons" element={<Course user={user} />} />
          <Route exact path="/courses/:course_id/lessons/:lesson_id" element={<LessonPage user={user} />} />

          <Route exact path="/" element={<Navigate to="/dashboard" />} />
        </Route>
        <Route exact path="/login" element={<Login path="/dashboard" />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgot_password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Copyright />
    </ThemeProvider>
  </BrowserRouter>
}

export default App
