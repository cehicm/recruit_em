import Image from "next/image";
import Link from "next/link";
import { VscAccount, VscActivateBreakpoints } from "react-icons/vsc";

import logo from "public/images/recruitem-logo.png";

export default function Home() {
	return (
		<div className="bg-recruit-blue text-white">
			<div className="px-2 md:px-12 py-2 md:py-0 flex items-center justify-between">
				<Link href="/">
					{" "}
					<Image
						className="w-3/4 md:w-full"
						src={logo}
						alt="Recruitem logo"
						height={55}
					/>{" "}
				</Link>

				<nav>
					<ul className="flex gap-8">
						<Link
							href="/recruiter"
							className="flex items-center gap-2 hover:border-b-[1px]"
						>
							<VscActivateBreakpoints />
							Recruiter
						</Link>
						<Link
							href="/candidate"
							className="flex items-center gap-2 hover:border-b-[1px]"
						>
							<VscAccount />
							Candidate
						</Link>
					</ul>
				</nav>
			</div>
		</div>
	);
}
