/**
 * return format: (for all functions)
 * {success, message, data}
 * data is optional
 * example:
 * {success: true, message: "Account created successfully"}
 * {success: false, message: "Username already exists"}
 */

const api = {}
const url = ''
const user = '/api/user'
const org = '/api/org'
const auth = '/api/register'
const course = '/api/course'

/*
* Need to add Organization for register_teacher
* Need to change info for register_org
* Login for organization>
* Response for login User is true/false
* get one course. extra course in urL?
*/

/**
 * data format:
 * {firstName, lastName, email, password, confirmPassword}
 */
api.register_teacher = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  if (data.password === data.confirm_password) {
    const teacherData = {
      first_name: data.first_name,
      last_name: data.last_name,
      organization: data.organization,
      email: data.email,
      password: data.password,
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacherData),
    }

    const res = await fetch(`${url}${auth}/register_user`, options)

    const result = await res.json()

    if (res.status === 400) {
      response.success = true
      response.message = "User Email Already exists"
      return response
    }
    if (res.status !== 200) {
      response.success = false
      response.message = 'Internal Server Error'
      return response
    }

    response.data = result
    response.success = true
    response.message = 'Teacher Successfully Registered'
  } else {
    response.success = false
    response.message = 'Password and Confirm Password donot Match !'
  }
  return response
}

/**
 * data format:
 * {orgName, orgAddress, email, password, confirmPassword}
 */
api.register_org = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  if (data.password === data.confirm_password) {
    const orgData = {
      org_name: data.org_name,
      org_address: data.org_address,
      email: data.email,
      password: data.password,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orgData),
    }

    const res = await fetch(`${url}${auth}/register_org`, options)

    const result = await res.json()

    if (res.status !== 200) {
      response.success = false
      response.message = 'Internal Server Error'
      return response
    }

    response.data = result
    response.success = true
    response.message = 'Organisation Successfully Registered!'
  } else {
    response.success = false
    response.message = 'Password and Confirm Password donot Match !'
  }
  return response
}

/**
 * data format:
 * {email, password}
 */
api.login = async function (data) {

  // Used to switch between Org and User Login. DO NOT DELETE
  let apiurl = ''

  if(data.role=='teacher')
    apiurl = `${url}${user}/login/user`
  else
    apiurl = `${url}${org}/login/org`

  const response = {
    success: true,
    message: '',
    data: {},
  }


  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const res = await fetch(apiurl , options)
  const result = await res.json()

  if (res.status === 500) {
    response.data = result
    response.success = false
    response.message = result.message
    return response
  }

  response.data = result
  response.success = true
  response.message = 'User Login Successfully'

  return response
}

/**
 * data format:
 * [
 * 	{id, name, description, organization, image_url},
 * ]
 */
api.get_all_courses = async function () {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const res = await fetch(`${url}${course}/`)

  const result = await res.json()

  if (res.status === 400) {
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Retrieved All Courses Successfully'

  return response
}

api.get_course_details = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const res = await fetch(`${url}${course}/course/details/${data.name}`)
  const result = await res.json()

  if (res.status === 500) {
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Retrieved the Course Successfully'

  return response
}

api.update_course = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const res = await fetch(`${url}${org}/update/course/${data.name}`, options)
  const result = await res.json()

  if (res.status === 400 || res.status === 500) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Updated the Course Successfully'

  return response
}

api.delete_course = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const res = await fetch(`${url}${org}/delete/course/${data.name}`, options)
  const result = await res.json()

  if (res.status === 500) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Deleted the Course Successfully'

  return response
}

api.get_all_orgs = async function () {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const res = await fetch(`${url}${org}/`)
  const result = await res.json()

  if (res.status === 400) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Retrieved All Organizations Successfully'

  return response
}

api.get_org = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const res = await fetch(`${url}${org}/org/${data.email}`)
  const result = await res.json()

  if (res.status === 404) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Retrieved the Organization Successfully'

  return response
}

api.create_course = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const res = await fetch(`${url}${org}/create/course`, options)
  const result = await res.json()

  if (res.status === 400) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Created the Course Successfully'

  return response
}

api.update_org = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const res = await fetch(`${url}${org}/update/org/${data.email}`, options)
  const result = await res.json()

  if (res.status === 404) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Updated the Organization Successfully'

  return response
}

api.get_user = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const res = await fetch(`${url}${user}/user/${data.email}`)
  const result = await res.json()

  if (res.status === 404) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Retrieved the User Successfully'

  return response
}

api.get_current_user_courses = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const res = await fetch(`${url}${course}/user/courses/${data.email}`)
  const result = await res.json()

  if (res.status === 404) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Retrieved All Courses of the User Successfully'

  return response
}

api.leave_course = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const res = await fetch(`${url}${course}/course/leave/${data.email}`, options)
  const result = await res.json()

  if (res.status === 400 || res.status === 500) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Left the Course Successfully'

  return response
}

api.delete_user = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const res = await fetch(`${url}${user}/user/delete/${data.email}`, options)
  const result = await res.json()

  if (res.status === 404) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Deleted the User Successfully'

  return response
}

api.update_user = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const res = await fetch(`${url}${user}/user/update/${data.email}`, options)
  const result = await res.json()

  if (res.status === 404) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Updated the User Successfully'

  return response
}

/**
 * data format:
 * {name,email,id}
 */
api.join_course = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const res = await fetch(`${url}${user}/course/join/${data.email}`, options)
  const result = await res.json()

  if (res.status === 400 || res.status === 500) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Joined course successfully'

  return response
}

// We have get_user, why this?
// api.get_current_user_profile = async function (id) {
//   const response = {
//     success: true,
//     message: '',
//     data: {},
//   }

//   const res = await fetch(`${url}${user}/user/${id}`)
//   const result = await res.json()

//   if (res.status === 404) {
//     response.data = result
//     response.success = false
//     response.message = 'Internal Server Error'
//     return response
//   }

//   response.data = result
//   response.success = true
//   response.message = 'Profile fetched successfully'

//   return response
// }

api.update_user_profile = async function (data) {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const res = await fetch(`${url}${user}/user/update/${data.email}`, options)
  const result = await res.json()

  if (res.status === 404) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Profile updated successfully'

  return response
}

api.forgot_password = async function (data) {

  // Used to switch between Org and User
  let apiurl = ''

  if (data.role === 'teacher') {
    apiurl = `${url}${user}/forgot_password/user`
  } else {
    apiurl = `${url}${org}/forgot_password/org`
  }


  const response = {
    success: true,
    message: '',
    data: {},
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const res = await fetch(apiurl, options)
  const result = await res.json()

  if (res.status === 404 || res.status === 500) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Password reset link sent successfully'

  return response
}

api.get_unseen_notif_count = async function () {
  return {
    // success: true,
    // message: "Notification count fetched successfully",
    // data: fakeDB.notifs.unseen.length
  }
}

api.get_user_unseen_notifs = async function () {
  return {
    // success: true,
    // message: "Notifications fetched successfully",
    // data: fakeDB.notifs.unseen
  }
}

api.mark_notif_as_seen = async function (id) {
  return {
    // success: true,
    // message: "Notification marked as seen successfully"
  }
}

api.get_search_results = async function (data) {
  // let results = []
  // if (data.query)
  //   for (let result of fakeDB.searchResults) {
  //     if (result.title.toLowerCase().includes(data.query.toLowerCase())) {
  //       results.push(result)
  //     }
  //   }
  return {
    // success: true,
    // message: "Search results fetched successfully",
    // data: results
  }
}

api.clear_notifs = async function () {
  return {
    // success: true,
    // message: "Notifications cleared successfully"
  }
}

api.get_lesson = async function (id) {
  // for (let course of fakeDB.courses)
  //   if (course.units)
  //     for (let unit of course.units)
  //       if (unit.lessons)
  //         for (let lesson of unit.lessons)
  //           if (lesson.id == id)
  //             return {
  //               success: true,
  //               message: "Lesson fetched successfully",
  //               data: lesson
  //             }
  return {
    // success: false,
    // message: "Lesson not found"
  }
}

api.verify_token = async function () {
  return {
    // success: true,
    // message: "Token verified successfully",
    // data: {
    //   email: "admin@lms.com",
    //   role: "org"
    // }
  }
}

api.get_current_user_org = async function () {
  const response = {
    success: true,
    message: '',
    data: {},
  }

  const res = await fetch(`${url}${user}/user/org`)
  const result = await res.json()

  if (res.status === 404) {
    response.data = result
    response.success = false
    response.message = 'Internal Server Error'
    return response
  }

  response.data = result
  response.success = true
  response.message = 'Retrieved the User Successfully'

  return response
  return {
    success: true,
    message: "Organization fetched successfully",
    // data: fakeDB.orgs[0]
  }
}


/**
 * data format:
 * see fakeDB.js
 * only the fields that need to be updated are supplied
 **/
api.update_org = async function (data) {
  return {
    success: true,
    message: "Organization updated successfully"
  }
}

api.new_video = async function (course_id, data) {
  return {
    success: true,
    message: "Video created successfully"
  }
}

api.new_unit = async function (course_id, data) {
  return {
    success: true,
    message: "Unit created successfully"
  }
}

api.delete_video = async function (lecture_id) {
  return {
    success: true,
    message: "Video deleted successfully"
  }
}

api.delete_lesson = async function (lesson_id) {
  return {
    success: true,
    message: "Lesson deleted successfully"
  }
}

api.delete_course = async function (course_id) {
  return {
    success: true,
    message: "Course deleted successfully"
  }
}

api.delete_unit = async function (unit_id) {
  return {
    success: true,
    message: "Unit deleted successfully"
  }
}

api.get_video = async function (video_id) {
  // for (let course of fakeDB.courses)
  //   if (course.videos)
  //     for (let video of course.videos)
  //       if (video.id === video_id)
  //         return {
  //           success: true,
  //           message: "Video fetched successfully",
  //           data: video
  //         }
  return {
    success: false,
    message: "Video not found"
  }
}

api.update_video = async function (video_id, data) {
  return {
    success: true,
    message: "Video updated successfully"
  }
}

api.update_course = async function (course_id, data) {
  return {
    success: true,
    message: "Course updated successfully"
  }
}

api.get_unit = async function (unit_id) {
  // for (let course of fakeDB.courses)
  //   if (course.units)
  //     for (let unit of course.units)
  //       if (unit.id === unit_id)
  //         return {
  //           success: true,
  //           message: "Unit fetched successfully",
  //           data: unit
  //         }
  return {
    success: false,
    message: "Unit not found"
  }
}

api.update_unit = async function (unit_id, data) {
  return {
    success: true,
    message: "Unit updated successfully"
  }
}

api.new_lesson = async function (unit_id, data) {
  return {
    success: true,
    message: "Lesson created successfully"
  }
}

api.new_lecture = async function (lesson_id, data) {
  return {
    success: true,
    message: "Lecture created successfully"
  }
}

api.delete_lecture = async function (lecture_id) {
  return {
    success: true,
    message: "Lecture deleted successfully"
  }
}

api.update_lecture = async function (lecture_id, data) {
  return {
    success: true,
    message: "Lecture updated successfully"
  }
}

/**
 * params:
 * user = { role, email }
 */
api.delete_account = async function (user) {
  return {
    success: true,
    message: "User deleted successfully"
  }
}

export default api
