import Link from "next/link";
import Head from "next/head";
import { getSession } from "next-auth/react";
import RecruiterNavigation from "@/components/RecruiterNavigation";

export default function Quiz(props) {
	return (
		<>
			<Head>
				<title>Quiz</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<RecruiterNavigation />

			<div className="max-w-7xl mx-auto px-4 md:px-6 border border-blue-900 rounded-3xl md:h-screen relative mt-10">
				<div className="md:pt-10 mb-8 lg:mb-12 border border-blue-900 rounded-3xl bg-indigo-600 text-white text-center">
					<h1 className="text-3xl text-5xl my-8 my-16">Quiz Dashboard</h1>
				</div>
				<div className="max-w-7xl w-full left-1/2 flex justify-center">
					<Link
						className="md:absolute top-[190px] bg-white rounded-md border border-indigo-900 text-indigo-900 font-semibold px-8 py-4 text-center mb-5 md:mb-0 "
						href="/recruiter/quiz/create"
					>
						Create new Quiz
					</Link>
				</div>
				<div className="grid lg:grid-cols-2 items-center md:pb-16 md:mt-10">
					{props.quizzes.length > 0 &&
						props.quizzes.map((quiz) => (
							<div
								className="px-6 py-4 border border-white border-b-indigo-900 mt-7"
								key={quiz._id}
							>
								<h3 className="text-xl">{quiz.name}</h3>
								<p>{quiz.description}</p>
								<p className="text-indigo-600">{quiz.duration} minutes</p>
								<Link
									className="text-white bg-blue-700 rounded text-center w-full inline-block pt-2 pb-2 max-w-lg"
									href={`/recruiter/quiz/edit/${quiz._id}`}
								>
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
		.then((response) => response.json())
		.then((result) => {
			return result.data;
		})
		.catch((error) => console.log("error", error));

	return {
		props: {
			quizzes,
		},
	};
}
