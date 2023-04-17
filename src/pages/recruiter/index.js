import Link from "next/link";
import Head from "next/head";
import { getSession } from "next-auth/react";

export default function Recruiter(props) {
	return (
		<>
			<Head>
				<title>Recruiter Dashboard</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="max-w-7xl mx-auto px-4 md:px-6">
				<div className="pt-10 flex flex-col md:flex-row max-w-lg justify-between md:items-center mb-8 lg:mb-12 lg:mb-0">
					<h1 className="text-5xl my-8 md:my-16">Dashboard</h1>

					<Link
						className="text-white bg-blue-700 rounded px-8 py-4 text-center mb-5 md:mb-0"
						href="/recruiter/quiz/create"
					>
						Create new Quiz
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 pb-16">
					{props.quizzes.length > 0 &&
						props.quizzes.map(quiz => (
							<div className="px-6 py-4" key={quiz._id}>
								<p>{quiz.name}</p>
								<p>{quiz.description}</p>
								<p>{quiz.duration}</p>
								<Link className="text-white bg-blue-700 rounded text-center w-full inline-block pt-2 pb-2" href={`/recruiter/quiz/edit/${quiz._id}`}>
									Edit Quiz
								</Link>
							</div>
						))}
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

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
			quizzes,
		},
	};
}
