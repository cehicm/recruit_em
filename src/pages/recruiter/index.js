import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import RecruiterNavigation from "@/components/RecruiterNavigation";
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

			<div className="max-w-7xl mx-auto ">
				<h1 className="text-5xl my-8 md:my-16 px-4 md:px-6">Dashboard</h1>

				<div className="px-2 md:px-6">
					<div className="flex flex-col items-center md:flex-row gap-2 md:flex text-lg font-bold">
						<div className="h-24 pl-5 flex items-center gap-10 w-full bg-indigo-200">
							<Link
								href="/recruiter/quiz"
								className="w-full flex items-center gap-4"
							>
								Your Quizzes
								<VscOutput className="h-6 w-6 animate-bounce" />
							</Link>
						</div>
						<div className="h-24 pl-5 flex items-center gap-10 w-full bg-indigo-300">
							<Link
								href="/recruiter/positions"
								className="w-full flex items-center gap-4"
							>
								Open Positions
								<VscReferences className="h-6 w-6 animate-bounce" />
							</Link>
						</div>
						<div className="h-24 pl-5 flex items-center gap-10 w-full bg-indigo-400">
							<Link
								href="/recruiter/reviews"
								className="w-full flex items-center gap-4"
							>
								Reviews
								<VscStarFull className="h-6 w-6 animate-spin" />
							</Link>
						</div>
						<div className="h-24 pl-5 flex items-center gap-10 w-full bg-indigo-500">
							<Link
								href="/recruiter/users"
								className="w-full flex items-center gap-4"
							>
								Users
								<VscPerson className="h-6 w-6 animate-bounce" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
