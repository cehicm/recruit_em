import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();

	return (
		<div className="bg-recruit-blue text-white">
			<div className="px-2 md:px-6 py-6 md:py-0 flex items-center justify-between">
				<nav>
					<ul className="flex gap-8">
						<Link
							href="/recruiter/"
							className={`${
								router.pathname == "/recruiter" ? "font-semibold" : ""
							} hover:font-semibold`}
						>
							Dashboard
						</Link>
						<Link
							href="/recruiter/quiz"
							className={`${
								router.pathname == "/recruiter/quiz" ? "font-semibold" : ""
							} hover:font-semibold`}
						>
							Quizzes
						</Link>
						<Link
							href="/recruiter/positions"
							className={`${
								router.pathname == "/recruiter/positions" ? "font-semibold" : ""
							} hover:font-semibold`}
						>
							Positions
						</Link>
						<Link
							href="/recruiter/reviews"
							className={`${
								router.pathname == "/recruiter/reviews" ? "font-semibold" : ""
							} hover:font-semibold`}
						>
							Reviews
						</Link>
						<Link
							href="/recruiter/users"
							className={`${
								router.pathname == "/recruiter/users" ? "font-semibold" : ""
							} hover:font-semibold`}
						>
							Users
						</Link>
					</ul>
				</nav>
			</div>
		</div>
	);
}
