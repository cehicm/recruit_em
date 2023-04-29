import { getSession } from "next-auth/react";

export default function Candidate(props) {
	return (
		<>
			Welcome {props.firstName} {props.lastName}
			<div>
				<h1>Position</h1>
				{props.positions.length > 0 &&
					props.positions.map(position => (
						<div key={position._id}>
							<p>Name: {position.name}</p>
							<p>Status: {position.status}</p>
							<p>Created at: {position.createdAt}</p>
							<p>Description: {position.description}</p>
							{position.quiz.length > 0 &&
								position.quiz.map(quiz => <p key={quiz}>Quiz: {quiz}</p>)}
						</div>
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
		let requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		const user = await fetch(
			process.env.SITE_URI + "/api/users?id=" + session._doc._id,
			{
				method: "GET",
				redirect: "follow",
			}
		)
			.then(response => response.json())
			.then(result => {
				return result.data;
			})
			.catch(error => console.log("error", error));

		const positions = await fetch(
			process.env.SITE_URI + "/api/position?id=" + user[0].position,
			requestOptions
		)
			.then(response => response.json())
			.then(result => {
				return result.data;
			})
			.catch(error => console.log("error", error));

		return {
			props: {
				email: session._doc.email,
				firstName: session._doc.firstName,
				lastName: session._doc.lastName,
				id: session._doc._id,
				user,
				positions,
			},
		};
	}
}
