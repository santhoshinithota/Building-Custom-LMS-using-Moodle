const fakeDB = {}

fakeDB.courses = [
	{
		id: "1",
		code: "CS 101",
		name: "Introduction to Computer Science",
		description: "Introduction to Computer Science",
		organization: "Google",
		image_url: "https://i.imgur.com/oVW8L6rb.jpg",
		member_count: 100,
		units: [
			{
				id: "cs_unit_1",
				name: "Basics",
				description: "",
				image_url: "https://notesformsc.org/wp-content/uploads/2022/04/Limits-from-graph1-1-1024x543.png",
				lessons: [
					{
						id: "cs_lesson_1",
						name: "CS50",
						description: "CS50 is the quintessential Harvard course on computer science.",
						lectures: [
							{ id: "1", url: "https://youtu.be/YoXxevp1WRQ", name: "Scratch", type: "video" },
							{ id: "2", url: "https://youtu.be/zYierUhIFNQ", name: "C", type: "video" },
							{ id: "3", url: "https://youtu.be/tI_tIZFyKBw", name: "Arrays", type: "video" },
						]
					},
				],
			},
		],
	},
	{
		id: "2",
		code: "Math 101",
		name: "Introduction to Mathematics",
		description: "Introduction to Mathematics",
		organization: "Microsoft",
		image_url: "https://i.imgur.com/MZ04TkZb.jpg",
		member_count: 60,
		videos: [
			{ id: "cqTzZig-txs", url: "https://youtu.be/cqTzZig-txs", name: "Number Place Value" },
			{ id: "hZl042QtCZU", url: "https://youtu.be/hZl042QtCZU", name: "Rounding and Estimating" },
			{ id: "2fcArTY0aqk", url: "https://youtu.be/2fcArTY0aqk", name: "Multiplying Decimal Numbers" },
		],
		units: [
			{
				id: "math_unit_1",
				name: "Limits and Continuity",
				description: "basic concepts of limits and continuity",
				image_url: "https://notesformsc.org/wp-content/uploads/2022/04/Limits-from-graph1-1-1024x543.png",
				lessons: [
					{
						id: "math_lesson_1",
						name: "Limits intro",
						description: "A limit tells us the value that a function approaches as that function’s inputs get closer and closer to some number. The idea of a limit is the basis of all calculus. Created by Sal Khan.",
						lectures: [
							{
								id: "1",
								url: "https://youtu.be/riXcZT2ICjA",
								type: "video",
								name: "Limits intro",
							},
							{
								id: "2",
								url: "https://www.khanacademy.org/math/calculus-1/cs1-limits-and-continuity/cs1-limits-intro/a/limits-intro",
								type: "link",
								name: "Limits intro",
							},
						]
					},
					{
						id: "math_lesson_2",
						name: "Estimating limit values from graphs",
						description: "Worked examples of estimating limits of a function from its graph.",
						lectures: [
							{
								id: "1",
								url: "https://youtu.be/mols6pMKrto",
								type: "video",
								name: "Estimating limit values from graphs",
							},
							{
								id: "2",
								url: "https://youtu.be/56qtGRCd8bE",
								type: "video",
								name: "Unbounded limits",
							},
							{
								id: "3",
								url: "https://www.khanacademy.org/math/calculus-1/cs1-limits-and-continuity/cs1-estimating-limits-from-graphs/a/approximating-limit-values-from-a-graph",
								type: "link",
								name: "Estimating limit values from graphs",
							},
							{
								id: "4",
								url: "https://youtu.be/nOnd3SiYZqM",
								type: "video",
								name: "One-sided limits from graphs",
							},
							{
								id: "5",
								url: "https://youtu.be/5f1-Rg3MmKs",
								type: "video",
								name: "One-sided limits from graphs: asymptote",
							},
							{
								id: "6",
								url: "https://youtu.be/l6FX_r_Tkls",
								type: "video",
								name: "Connecting limits and graphical behavior",
							},
							{
								id: "7",
								url: "https://youtu.be/_WOr9-_HbAM",
								type: "video",
								name: "Connecting limits and graphical behavior (more examples)",
							},
						]
					},
					{
						id: "math_lesson_3",
						name: "Estimating limit values from tables",
						description: "",
						lectures: []
					},
					{
						id: "math_lesson_4",
						name: "Formal definition of limits (epsilon-delta)",
						description: "",
						lectures: []
					},
					{
						id: "math_lesson_5",
						name: "Properties of limits",
						description: "",
						lectures: []
					},
					{
						id: "math_lesson_6",
						name: "Limits by direct substitution",
						description: "",
						lectures: []
					},
					{
						id: "math_lesson_7",
						name: "Limits using algebraic manipulation",
						description: "",
						lectures: []
					},
					{
						id: "math_lesson_8",
						name: "Strategy in finding limits",
						description: "",
						lectures: []
					},
					{
						id: "math_lesson_9",
						name: "Squeeze theorem",
						description: "",
						lectures: []
					},
					{
						id: "math_lesson_10",
						name: "Types of discontinuities: Limits and continuity",
						description: "",
						lectures: []
					},
				]
			},
		],
	},
	{
		id: "3",
		code: "Physics 101",
		name: "Introduction to Physics",
		description: "Introduction to Physics",
		organization: "Facebook",
		image_url: "https://i.imgur.com/liuDONab.jpg",
		member_count: 23,
		units: [
			{
				id: "physics_unit_1",
				name: "Limits and Continuity",
				description: "basic concepts of limits and continuity",
				image_url: "https://notesformsc.org/wp-content/uploads/2022/04/Limits-from-graph1-1-1024x543.png",
				lessons: [
					{
						id: "physics_lesson_1",
						name: "Introduction to Physics",
						description: "",
						lectures: [
							{ id: "2I8XMxMvWl0", url: "https://youtu.be/2I8XMxMvWl0", name: "Physics and Measurements", type: "video" },
							{ id: "v78CJZWD4xg", url: "https://youtu.be/v78CJZWD4xg", name: "Motion in One Dimension", type: "video" },
							{ id: "SMZbHPXiNGI", url: "https://youtu.be/SMZbHPXiNGI", name: "Kinematics", type: "video" },
						],
					},
				],
			},
		],
	},
]

fakeDB.profile = {
	date_joined: "2020-01-01",
	courses_completed: ["1", "2", "3"],
	first_name: "John",
	last_name: "Doe",
	email: "johndoe@lms.com",
	email_display: "public", // can be public, private
	org_id: "1",
	organization: "Google",
	profile_image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	address: "1234 Main Street, New York, NY 10001",
	description: "I work at Google",
}

fakeDB.orgs = [
	{
		date_joined: "2020-01-01",
		name: "Google",
		email: "google@lms.com",
		profile_image: "https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1",
		address: "1600 Amphitheatre Parkway, Mountain View, CA 94043",
		description: "We are Google",
	}
]

fakeDB.notifs = {
	unseen: [
		{
			id: "1",
			title: "New Course: Math 101",
			description: "Introduction to Mathematics",
			timestamp: "2020-01-01 12:00:00",
			link: "/courses/2",
		},
		{
			id: "2",
			title: "New Course: Physics 101",
			description: "Introduction to Physics",
			timestamp: "2020-01-01 12:00:00",
			link: "/courses/3",
		},
		{
			id: "3",
			title: "A Prince in Nigeria Needs Your Help",
			description: "Please send me your bank account details",
			timestamp: "2020-01-01 12:00:00",
			link: "https://www.aarp.org/money/scams-fraud/info-2019/nigerian.html",
		},
	],
}

fakeDB.searchResults = [
	{
		id: "1",
		title: "Courses",
		description: "View all courses",
		link: "/courses",
	},
	{
		id: "2",
		title: "Profile",
		description: "View your profile",
		link: "/profile",
	},
	{
		id: "3",
		title: "Introduction to Computer Science",
		description: "CS 101",
		link: "/courses/1",
	},
	{
		id: "4",
		title: "Introduction to Mathematics",
		description: "Math 101",
		link: "/courses/2",
	},
	{
		id: "5",
		title: "Introduction to Physics",
		description: "Physics 101",
		link: "/courses/3",
	},
]

export default fakeDB