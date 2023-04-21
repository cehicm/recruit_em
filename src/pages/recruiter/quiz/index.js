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

			<div className="md:max-w-[89vw] lg:max-w-7xl mx-auto md:border border-blue-900 md:rounded-3xl md:h-screen relative md:mt-10">
				<div className="md:pt-10 lg:mb-12 border border-blue-900 md:rounded-3xl bg-indigo-600 text-white text-center">
					<h1 className="text-xl md:text-3xl text-5xl my-8 md:my-16">
						Quiz Dashboard
					</h1>
				</div>
				<div className="max-w-7xl w-full left-1/2 flex justify-center md:justify-end md:justify-center">
					<Link
						className="md:absolute top-[190px] bg-white rounded-md border border-indigo-900 text-indigo-700 font-semibold py-4 px-5 md:py-2 md:px-8 md:mr-8 md:py-4 text-center my-8 md:my-0 md:mr-0 md:mb-0 hover:bg-indigo-900 hover:text-white text-sm"
						href="/recruiter/quiz/create"
					>
						Create new Quiz
					</Link>
				</div>
				<div className="md:pb-4 md:mt-20 lg:mt-12 border border-t-0 border-l-0 border-r-0 border-t-indigo-900 md:border-t-white border-b-indigo-900 md:w-[80vw] mx-auto">
					{props.quizzes.length > 0 &&
						props.quizzes.map((quiz) => (
							<div
								className="px-6 py-6 md:pb-8 grid grid-flow-col gap-1 lg:w-3/4 mx-auto md:justify-between"
								key={quiz._id}
							>
								<div>
									<h3 className="text-xl">{quiz.name}</h3>
									<p>{quiz.description}</p>
									<p className="text-indigo-600">{quiz.duration} minutes</p>
								</div>

								<Link
									className="hover:animate-pulse self-start text-white bg-blue-700 rounded text-center md:w-56 inline-block py-2 px-10 lg:mt-6 md:mt-0 max-w-lg"
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
