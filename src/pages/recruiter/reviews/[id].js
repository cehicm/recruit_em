import { getSession } from "next-auth/react";

export default function Review(props) {
	return (
		<>
			Review
			<div>User ID: {props.review.user}</div>
			<div>Created at: {props.review.createdAt}</div>
			<div>Pipeline: {props.review.pipeline}</div>
			<div>Status: {props.review.status}</div>
			<div>Position: {props.review.position}</div>
			<div>Started: {props.review.started}</div>
			<h1>Answers</h1>
			{props.review.answers.length > 0 &&
				props.review.answers.map(answer => (
					<div key={answer.id} question-id={answer.id}>
						<label htmlFor={answer.id}>{answer.id}</label>
						<input
							type="text"
							readOnly={true}
							id={answer.id}
							defaultValue={answer.answer}
						></input>
					</div>
				))}
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
		const id = context.query.id;

		if (typeof id == "undefined") {
			return {
				redirect: { destination: "/" },
			};
		}

		let requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		const response = await fetch(
			process.env.SITE_URI + "/api/review?id=" + id,
			requestOptions
		)
			.then(response => response.json())
			.then(result => {
				return result.data;
			})
			.catch(error => console.log("error", error));

		return {
			props: {
				review: response[0],
			},
		};
	}
}
