import Link from "next/link";

export default function Home() {
	return (
		<div className="bg-recruit-blue text-white">
			<div className="px-2 md:px-6 py-2 md:py-0 flex items-center justify-between">
				<nav>
					<ul className="flex gap-8">
						<Link
							href="/recruiter/"
							className="flex items-center gap-2 hover:border-b-[1px]"
						>
							Dashboard
						</Link>
						<Link
							href="/recruiter/quiz"
							className="flex items-center gap-2 hover:border-b-[1px]"
						>
							Quizzes
						</Link>
						<Link
							href="/recruiter/positions"
							className="flex items-center gap-2 hover:border-b-[1px]"
						>
							Positions
						</Link>
						<Link
							href="/recruiter/reviews"
							className="flex items-center gap-2 hover:border-b-[1px]"
						>
							Reviews
						</Link>
						<Link
							href="/recruiter/users"
							className="flex items-center gap-2 hover:border-b-[1px]"
						>
							Users
						</Link>
					</ul>
				</nav>
			</div>
		</div>
	);
}
