import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CandidateQuiz = props => {
	const router = useRouter();
	const positionData = router.query;

	useEffect(() => {
		if (!localStorage.getItem(props.id)) {
			localStorage.setItem(props.id, Date.now());
		}
	}, [props]);

	const onSubmit = event => {
		event.preventDefault();
		const SITE_URI = process.env.SITE_URI;
		var data = new FormData(event.target);
		let formObject = Object.fromEntries(data.entries());

		let answers = [];
		for (var key of Object.keys(formObject)) {
			answers.push({
				id: key,
				answer: formObject[key],
			});
		}

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			user: props.id,
			position: positionData._id,
			answers: answers,
			pipeline: "Started",
			status: "Open",
			started: localStorage.getItem(props.id),
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(SITE_URI + "/api/review", requestOptions)
			.then(response => response.json())
			.then(result => {
				if (result.data._id) {
					console.log("New Review Created");
				}
			})
			.catch(error => console.log("error", error));
	};
	return (
		<>
			{props.quiz.length > 0 &&
				props.quiz.map(quiz => (
					<form key={quiz._id} onSubmit={onSubmit}>
						<p>Name: {quiz.name}</p>
						<p>Duration: {quiz.duration}</p>
						<p>Created at: {quiz.createdAt}</p>
						<p>Description: {quiz.description}</p>
						<hr />
						{props.questions.length > 0 &&
							props.questions.map(question => (
								<div key={question._id} question-id={question._id}>
									<label htmlFor={question._id}>{question.question}</label>
									{question.type == "text" && (
										<input
											type="text"
											id={question._id}
											name={question._id}
											question={question.question}
										></input>
									)}
								</div>
							))}
						<button type="submit">Submit</button>
					</form>
				))}
		</>
	);
};

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

		const quiz = await fetch(process.env.SITE_URI + "/api/quiz?id=" + quizId, {
			method: "GET",
			redirect: "follow",
		})
			.then(response => response.json())
			.then(result => {
				return result.data;
			})
			.catch(error => console.log("error", error));

		let questions = [];
		await Promise.all(
			quiz[0].questions.map(question =>
				fetch(process.env.SITE_URI + "/api/question?id=" + question)
					.then(response => response.json())
					.then(result => questions.push(result.data[0]))
					.catch(error => console.log("error", error))
			)
		);

		return {
			props: {
				email: session._doc.email,
				firstName: session._doc.firstName,
				lastName: session._doc.lastName,
				id: session._doc._id,
				quiz,
				questions,
			},
		};
	}
}

export default CandidateQuiz;
