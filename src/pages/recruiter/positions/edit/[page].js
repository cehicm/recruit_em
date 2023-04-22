import { getSession } from "next-auth/react";
import Head from "next/head";
import RecruiterNavigation from "@/components/RecruiterNavigation";

const updatePosition = async e => {
	e.preventDefault();

	const id = e.target.id.value;
	const name = e.target.name.value;
	const description = e.target.description.value;
	const status = e.target.status.value;
	const quiz = e.target.quiz.value;

	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	let raw = JSON.stringify({
		id,
		update: {
			name,
			status,
			description,
			quiz,
		},
	});

	let requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	fetch(process.env.SITE_URI + "/api/position", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log("error", error));

	console.log(id, name, status, description, quiz);
};

export default function EditPosition(props) {
	return (
		<>
			<Head>
				<title>Update Position</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<RecruiterNavigation />

			<h1 className="text-5xl py-8 md:py-16 bg-indigo-600 text-white text-center">
				Edit Position
			</h1>
			<form
				className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col"
				method="POST"
				onSubmit={updatePosition}
			>
				<input
					type="hidden"
					name="id"
					defaultValue={props.position[0]._id}
				></input>
				<div className="h-12 flex gap-4 border border-black justify-around pl-2 mt-10">
					<label className="w-1/2 flex items-center" htmlFor="name">
						Name
					</label>
					<input
						className="pl-2 border-black border-l text-gray-600 italic w-1/2"
						required
						type="text"
						name="name"
						id="name"
						defaultValue={props.position[0].name}
					></input>
				</div>
				<div className="flex items-center gap-4 border border-black border-t-0 justify-around pl-2">
					<label className="w-1/2" htmlFor="description">
						Description
					</label>
					<textarea
						className="py-2 pl-2 border-black border-l text-gray-600 italic w-1/2"
						required
						type="text"
						name="description"
						id="description"
						defaultValue={props.position[0].description}
					></textarea>
				</div>
				<div className="flex items-center gap-12 pl-2 w-1/2 mt-6">
					<label htmlFor="status">Status</label>
					<select
						className="bg-gray-600 text-white px-5 py-2 rounded-md"
						name="status"
						id="status"
						required
						defaultValue={props.position[0].status}
						multiple={false}
					>
						<option value="enabled">Enabled</option>
						<option value="disabled">Disabled</option>
					</select>
				</div>

				<div className="flex items-center gap-16 pl-2 w-1/2 mt-6">
					<label htmlFor="quiz">Quiz</label>
					<select
						className="bg-gray-600 text-white px-5 py-2 rounded-md"
						name="quiz"
						id="quiz"
						required
						defaultValue={props.position[0].quiz}
						multiple={false}
					>
						{props.quizzes.length > 0 &&
							props.quizzes.map(quiz => (
								<option key={quiz._id} value={quiz._id}>
									{quiz.name}
								</option>
							))}
					</select>
				</div>
				<button
					className="mt-6 w-1/2 text-white bg-blue-700 rounded text-center inline-block pt-2 pb-2 lg:mt-12"
					type="submit"
				>
					Update Position
				</button>
			</form>
		</>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: { destination: "/" },
		};
	} else {
		const positionId = context.query.page;

		if (typeof positionId == "undefined") {
			return {
				redirect: { destination: "/" },
			};
		}

		let requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		const position = await fetch(
			process.env.SITE_URI + "/api/position?id=" + positionId,
			requestOptions
		)
			.then(response => response.json())
			.then(result => {
				return result.data;
			})
			.catch(error => console.log("error", error));

		const quizzes = await fetch(process.env.SITE_URI + "/api/quiz", {
			method: "GET",
			redirect: "follow",
		})
			.then(response => response.json())
			.then(result => {
				return result.data;
			})
			.catch(error => console.log("error", error));

		return {
			props: {
				position,
				quizzes,
			},
		};
	}
}
