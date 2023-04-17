import { getSession } from "next-auth/react";
import Head from "next/head";

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
			<form
				className="max-w-7xl mx-auto px-4 md:px-6"
				method="POST"
				onSubmit={updatePosition}
			>

				<h1 className="text-5xl my-8 md:my-16">Update Position</h1>
				<input
					type="hidden"
					name="id"
					defaultValue={props.position[0]._id}
				></input>
				<div>
					<label htmlFor="name">Name</label>
					<input
						required
						type="text"
						name="name"
						id="name"
						defaultValue={props.position[0].name}
					></input>
				</div>
				<div>
					<label htmlFor="description">Description</label>
					<textarea
						required
						type="text"
						name="description"
						id="description"
						defaultValue={props.position[0].description}
					></textarea>
				</div>
				<div>
					<label htmlFor="status">Status</label>
					<select name="status" id="status" required defaultValue={props.position[0].status} multiple={false}>
						<option value="enabled">Enabled</option>
						<option value="disabled">Disabled</option>
					</select>
				</div>

				<div>
					<label htmlFor="quiz">Quiz</label>
					<select name="quiz" id="quiz" required defaultValue={props.position[0].quiz} multiple={false}>
						{props.quizzes.length > 0 &&
							props.quizzes.map(quiz => (
								<option key={quiz._id} value={quiz._id}>
									{quiz.name}
								</option>
							))}
					</select>
				</div>
				<button
					className="text-white bg-blue-700 rounded text-center w-full inline-block pt-2 pb-2"
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
