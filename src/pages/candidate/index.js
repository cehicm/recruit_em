import { getSession } from "next-auth/react";
import Link from "next/link";

export default function Candidate(props) {
	return (
		<>
			<div className="">
				<div className="bg-dark-blue text-white">
					<h2 className="text-xl py-6 pl-8">
						Welcome {props.firstName} {props.lastName}
					</h2>
				</div>

				<div className="flex flex-col p-8 border-b border-b-dark-blue">
					{props.positions.length > 0 &&
						props.positions.map(position => (
							<div key={position._id} className="flex flex-col gap-4">
								<h3>Position</h3>
								<p>Name: {position.name}</p>
								<p>Status: {position.status}</p>
								<p>Created at: {position.createdAt}</p>
								<p>Description: {position.description}</p>
								{position.quiz.length > 0 &&
									position.quiz.map(quiz => (
										<Link
											key={quiz}
											href={{
												pathname: `/candidate/quiz/${quiz}`,
												query: `_id=${position._id}`,
											}}
											className="bg-dark-blue text-white w-32 py-2 px-6"
										>
											Start Quiz
										</Link>
									))}
							</div>
						))}
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: { destination: "/signin" },
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
