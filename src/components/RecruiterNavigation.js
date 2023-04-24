import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TfiAlignLeft, TfiClose } from "react-icons/tfi";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
	const router = useRouter();
	const [isNavOpen, setIsNavOpen] = useState(false);

	return (
		<div
			className={`bg-recruit-blue text-white ${
				isNavOpen ? "h-screen absolute z-[22] w-full" : ""
			}`}
		>
			<div className="px-8 md:px-12 py-6 flex lg:justify-between max-w-7xl mx-auto">
				<nav
					className={`flex flex-row justify-between w-full ${
						isNavOpen ? "flex-col" : "flex-row"
					}`}
				>
					<TfiAlignLeft
						className={`h-7 w-7 md:hidden ${isNavOpen ? "hidden" : "block"}`}
						onClick={() => setIsNavOpen((prev) => !prev)}
					/>
					<TfiClose
						className={`h-6 w-6 md:hidden ${isNavOpen ? "block" : "hidden"}`}
						onClick={() => setIsNavOpen((prev) => !prev)}
					/>

					<ul
						className={`flex flex-col items-center mx-auto md:mx-0 md:flex-row gap-8 md:flex ${
							isNavOpen ? "block" : "hidden"
						}`}
					>
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
					<Link
						href="#"
						onClick={() => signOut()}
						className={`flex items-center gap-2 self-center ${
							isNavOpen ? "hidden" : "block"
						}`}
					>
						<VscActivateBreakpoints />
						Log out
					</Link>
				</nav>
			</div>
		</div>
	);
}
