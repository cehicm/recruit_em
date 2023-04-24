import Link from "next/link";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import RecruiterNavigation from "@/components/RecruiterNavigation";

import {
	VscPerson,
	VscOutput,
	VscReferences,
	VscStarFull,
	VscRocket,
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
				<div className="flex justify-around max-w-7xl px-2 md:px-12 lg:mb-16 mx-8">
					<h1 className="text-2xl md:text-4xl py-8 md:py-16">
						Welcome,
						<span className="pl-2 text-indigo-500">
							{props.firstName} {props.lastName}
						</span>
					</h1>

					<Link
						className="flex items-center gap-2 justify-center"
						href="/recruiter/profile"
					>
						Your profile <VscRocket />
					</Link>
				</div>

				<div className="grid md:grid-cols-2 items-center gap-2 text-lg font-bold px-2 md:px-12 lg:mb-16 mx-8">
					<Link
						href="/recruiter/quiz"
						className="w-full flex items-center gap-4 justify-center h-24 md:h-32 lg:h-96 w-64 pl-5 lg:pl-0 lg:text-center flex items-center gap-10 w-full bg-indigo-200"
					>
						Your Quizzes
						<VscOutput className="h-6 w-6 animate-bounce lg:animate-none lg:hover-animate-bounce" />
					</Link>
					<Link
						href="/recruiter/positions"
						className="flex items-center justify-center h-24 md:h-32 lg:h-96 w-64 pl-5 lg:pl-0 lg:text-center gap-10 w-full bg-indigo-300 lg:bg-indigo-400"
					>
						Open Positions
						<VscReferences className="h-6 w-6 animate-bounce lg:animate-none lg:hover-animate-bounce" />
					</Link>
					<Link
						href="/recruiter/reviews"
						className="justify-center h-24 md:h-32 lg:h-96 w-64 pl-5 lg:pl-0 lg:text-center flex items-center gap-10 w-full bg-indigo-400"
					>
						Reviews
						<VscStarFull className="h-6 w-6 animate-spin lg:animate-none lg:hover-animate-spin" />
					</Link>
					<Link
						href="/recruiter/users"
						className="justify-center h-24 md:h-32 lg:h-96 w-64 pl-5 lg:pl-0 lg:text-center flex items-center gap-10 w-full bg-indigo-500 lg:bg-indigo-200"
					>
						Users
						<VscPerson className="h-6 w-6 animate-bounce lg:animate-none lg:hover-animate-bounce" />
					</Link>
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
