/**
 * return format: (for all functions)
 * {success, message, data}
 * data is optional
 * example:
 * {success: true, message: "Account created successfully"}
 * {success: false, message: "Username already exists"}
 */

// refer to `fakeDB.js` for the expected data format to be returned

import fakeDB from "./fakeDB"
import api from "./realAPI"

console.log("fakeAPI", process.env.REACT_APP_USE_FAKE_API)
if (process.env.REACT_APP_USE_FAKE_API === "true") {
	fake()
}

function fake() {
	/**
	 * data format:
	 * {first_name, last_name, email, password, confirm_password,
	 *  organization}
	 */
	api.register_teacher = async function (data) {
		return {
			success: true,
			message: "Account created successfully"
		}
	}

	/**
	 * data format:
	 * {org_name, org_address, email, password, confirm_password}
	 */
	api.register_org = async function (data) {
		return {
			success: true,
			message: "Account created successfully"
		}
	}

	/**
	 * data format:
	 * {email, password, remember_me}
	 * rememberMe is optional or can have the value 'rememberMe'
	 */
	api.login = async function (data) {
		if (data.email === "admin@lms.com" && data.password === "admin") {
			return { success: true, message: "Login successful" }
		}
		return { success: false, message: "Invalid credentials" }
	}

	api.logout = async function () {
		return { success: true, message: "Logout successful" }
	}

	/**
	 * data format:
	 * [
	 * 	{id, name, description, organization, image_url,
	 *   member_count},
	 * ]
	 * gets courses of the current org or current user's org
	 */
	api.get_all_courses = async function () {
		return {
			success: true,
			message: "Courses fetched successfully",
			data: fakeDB.courses
		}
	}

	/**
	 * data format:
	 * {id, name, description, organization, image_url,
	 * 	is_member, is_owner
	 * }
	 */
	api.get_course_details = async function (id) {
		for (let course of fakeDB.courses) {
			if (course.id === id) {
				return {
					success: true,
					message: "Course details fetched successfully",
					data: { ...course, is_member: true }
				}
			}
		}
		return {
			success: false,
			message: "Course not found"
		}
	}

	api.leave_course = async function (id) {
		return {
			success: true,
			message: "Left course successfully"
		}
	}

	api.join_course = async function (id) {
		return {
			success: true,
			message: "Joined course successfully"
		}
	}

	api.create_course = async function (data) {
		return {
			success: true,
			message: "Course created successfully"
		}
	}

	/**
	 * data format:
	 * [
	 * 	{id, name, description, organization, image_url,
	 * 	 is_member, is_owner, member_count}
	 * ]
	 **/
	api.get_current_user_courses = async function () {
		return {
			success: true,
			message: "Courses fetched successfully",
			data: fakeDB.courses
		}
	}

	/**
	 * data format:
	 * see fakeDB.js
	 **/
	api.get_current_user_profile = async function () {
		return {
			success: true,
			message: "Profile fetched successfully",
			data: fakeDB.profile
		}
	}

	/**
	 * data format:
	 * see fakeDB.js
	 * only the fields that need to be updated are supplied
	 **/
	api.update_user_profile = async function (data) {
		return {
			success: true,
			message: "Profile updated successfully"
		}
	}

	api.forgot_password = async function (data) {
		return {
			success: true,
			message: "Password reset link sent successfully"
		}
	}

	api.get_unseen_notif_count = async function () {
		return {
			success: true,
			message: "Notification count fetched successfully",
			data: fakeDB.notifs.unseen.length
		}
	}

	api.get_unseen_notifs = async function () {
		return {
			success: true,
			message: "Notifications fetched successfully",
			data: fakeDB.notifs.unseen
		}
	}

	api.mark_notif_as_seen = async function (id) {
		return {
			success: true,
			message: "Notification marked as seen successfully"
		}
	}

	api.get_search_results = async function (data) {
		let results = []
		if (data.query)
			for (let result of fakeDB.searchResults) {
				if (result.title.toLowerCase().includes(data.query.toLowerCase())) {
					results.push(result)
				}
			}
		return {
			success: true,
			message: "Search results fetched successfully",
			data: results
		}
	}

	api.clear_notifs = async function () {
		return {
			success: true,
			message: "Notifications cleared successfully"
		}
	}

	api.get_lesson = async function (lesson_id) {
		for (let course of fakeDB.courses)
			if (course.units)
				for (let unit of course.units)
					if (unit.lessons)
						for (let lesson of unit.lessons)
							if (lesson.id === lesson_id)
								return {
									success: true,
									message: "Lesson fetched successfully",
									data: lesson
								}
		return {
			success: false,
			message: "Lesson not found"
		}
	}

	api.verify_token = async function () {
		return {
			success: true,
			message: "Token verified successfully",
			data: {
				email: "admin@lms.com",
				role: "org"
			}
		}
	}

	api.get_current_user_org = async function () {
		return {
			success: true,
			message: "Organization fetched successfully",
			data: fakeDB.orgs[0]
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
		for (let course of fakeDB.courses)
			if (course.videos)
				for (let video of course.videos)
					if (video.id === video_id)
						return {
							success: true,
							message: "Video fetched successfully",
							data: video
						}
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
		for (let course of fakeDB.courses)
			if (course.units)
				for (let unit of course.units)
					if (unit.id === unit_id)
						return {
							success: true,
							message: "Unit fetched successfully",
							data: unit
						}
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
}

export default api