import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import RecruiterNavigation from "@/components/RecruiterNavigation";
import { getSession } from "next-auth/react";

import {
	VscPerson,
	VscOutput,
	VscReferences,
	VscStarFull,
} from "react-icons/vsc";

export default function Recruiter(props) {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Recruiter Dashboard</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<RecruiterNavigation />

			<div className="max-w-7xl mx-auto">
				<h1 className="text-5xl py-8 md:py-16 px-4 md:px-12">
					Welcome {props.firstName} {props.lastName}
				</h1>

				<div className="grid md:grid-cols-2 items-center gap-2 text-lg font-bold px-2 md:px-12">
					<div className="h-24 md:h-32 lg:h-96 w-64 pl-5 lg:pl-0 lg:text-center flex items-center gap-10 w-full bg-indigo-200">
						<Link
							href="/recruiter/quiz"
							className="w-full flex items-center gap-4 justify-center"
						>
							Your Quizzes
							<VscOutput className="h-6 w-6 animate-bounce lg:animate-none lg:hover-animate-bounce" />
						</Link>
					</div>
					<div className="h-24 md:h-32 lg:h-96 w-64 pl-5 lg:pl-0 lg:text-center flex items-center gap-10 w-full bg-indigo-300 lg:bg-indigo-400">
						<Link
							href="/recruiter/positions"
							className="w-full flex items-center gap-4 justify-center"
						>
							Open Positions
							<VscReferences className="h-6 w-6 animate-bounce lg:animate-none lg:hover-animate-bounce" />
						</Link>
					</div>
					<div className="h-24 md:h-32 lg:h-96 w-64 pl-5 lg:pl-0 lg:text-center flex items-center gap-10 w-full bg-indigo-400">
						<Link
							href="/recruiter/reviews"
							className="w-full flex items-center gap-4 justify-center"
						>
							Reviews
							<VscStarFull className="h-6 w-6 animate-spin lg:animate-none lg:hover-animate-spin" />
						</Link>
					</div>
					<div className="h-24 md:h-32 lg:h-96 w-64 pl-5 lg:pl-0 lg:text-center flex items-center gap-10 w-full bg-indigo-500 lg:bg-indigo-200">
						<Link
							href="/recruiter/users"
							className="w-full flex items-center gap-4 justify-center"
						>
							Users
							<VscPerson className="h-6 w-6 animate-bounce lg:animate-none lg:hover-animate-bounce" />
						</Link>
					</div>
				</div>
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
		return {
			props: {
				email: session._doc.email,
				firstName: session._doc.firstName,
				lastName: session._doc.lastName,
				id: session._doc._id,
			},
		};
	}
}
