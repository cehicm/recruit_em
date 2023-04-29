import { getSession } from "next-auth/react";

const CandidateQuiz = props => {
	return (
		<>
			{props.quiz.length > 0 &&
				props.quiz.map(quiz => (
					<div key={quiz._id}>
						<p>Name: {quiz.name}</p>
						<p>Duration: {quiz.duration}</p>
						<p>Created at: {quiz.createdAt}</p>
						<p>Description: {quiz.description}</p>
						<hr/>
						{props.questions.length > 0 &&
							props.questions.map(question => (
								<div key={question._id}>
									<p>ID: {question._id}</p>
									<p>Question: {question.question}</p>
									<p>Type: {question.type}</p>
								</div>
							))}
					</div>
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
