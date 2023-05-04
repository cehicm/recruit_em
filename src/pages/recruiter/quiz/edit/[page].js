import { getSession } from "next-auth/react";
import Head from "next/head";
import RecruiterNavigation from "@/components/RecruiterNavigation";

const updateQuiz = async (e) => {
	e.preventDefault();

	const id = e.target.id.value;
	const name = e.target.name.value;
	const duration = e.target.duration.value;
	const description = e.target.description.value;

	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	let raw = JSON.stringify({
		id,
		update: {
			name,
			duration,
			description,
		},
	});

	let requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	fetch(process.env.SITE_URI + "/api/quiz", requestOptions)
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));

	console.log(id, name, duration, description);
};

const updateQuestion = async (e) => {
	e.preventDefault();

	const id = e.target.id.value;
	const question = e.target.question.value;

	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	let raw = JSON.stringify({
		id,
		update: {
			question,
		},
	});

	let requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	fetch(process.env.SITE_URI + "/api/question", requestOptions)
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));
};

const getQuestion = async (id) => {
	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	let requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	return await fetch(
		process.env.SITE_URI + "/api/question?id=" + id,
		requestOptions
	)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.log("error", error));
};

export default function EditQuiz(props) {
	return (
		<>
			<RecruiterNavigation />

			<Head>
				<title>Update Quiz</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<form method="POST" onSubmit={updateQuiz}>
				<h1 className="text-5xl py-8 md:py-16 bg-indigo-900 text-white text-center">
					Update Quiz
				</h1>
				<input type="hidden" name="id" defaultValue={props.quizId}></input>

				<div className="flex flex-col gap-3 ml-5 md:ml-12 mt-6">
					<h3 className="text-xl mb-4 underline">Info</h3>

					<input
						className="text-lg border w-[350px] md:w-[400px] h-10 pl-3"
						type="text"
						name="name"
						defaultValue={props.name}
					></input>
					<div>
						<input
							className="border w-[60px] h-10 pl-3"
							type="number"
							name="duration"
							defaultValue={props.duration}
						></input>
					</div>
					<div>
						<textarea
							className="text-lg border w-[350px] h-32 md:w-[400px] h-10 pl-3 pt-3"
							type="text"
							name="description"
							defaultValue={props.description}
						></textarea>
					</div>
				</div>

				<button
					className="text-white bg-blue-700 rounded text-center inline-block pt-2 pb-2 w-24 ml-5 md:ml-12 mb-8 mt-12 md:mb-12 w-56"
					type="submit"
				>
					Update Quiz
				</button>
			</form>

			<div className="max-w-7xl flex flex-col gap-3 ml-5 md:ml-12 mt-6">
				<h3 className="text-xl mb-4 underline">Questions</h3>
				{props.questions.length > 0 &&
					props.questions.map((question, index) => (
						<form
							className="mb-10 md:mb-5"
							type="POST"
							onSubmit={updateQuestion}
							key={question[index]._id}
						>
							<input
								type="hidden"
								name="id"
								defaultValue={question[index]._id}
							></input>
							<input
								className="border h-10 pl-3 w-[300px] mb-2 md:mb-0"
								type="text"
								name="question"
								defaultValue={question[index].question}
							></input>
							<button
								className="text-white bg-blue-700 rounded text-center w-24 inline-block pt-2 pb-2 w-64"
								type="submit"
							>
								Update Question
							</button>
						</form>
					))}
			</div>
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
		const quizId = context.query.page;

		if (typeof quizId == "undefined") {
			return {
				redirect: { destination: "/" },
			};
		}

		let requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		let questionList = [];

		const response = await fetch(
			process.env.SITE_URI + "/api/quiz?id=" + quizId,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				return result.data;
			})
			.catch((error) => console.log("error", error));

		let questionListFinal = await Promise.all(
			response[0].questions.map(async (question) => {
				return getQuestion(question).then((result) => {
					questionList.push(result.data[0]);
					return questionList;
				});
			})
		);

		return {
			props: {
				quizId: quizId,
				name: response[0].name,
				duration: response[0].duration,
				questions: questionListFinal,
				description: response[0].description,
			},
		};
	}
}
