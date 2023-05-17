import Link from "next/link";

export default function OpenSource() {
	return (
		<>
			<div className="py-16 text-center max-w-7xl mx-auto flex flex-col bg-dark-blue text-white">
				<div className="w-3/4 mx-auto">
					<h3 className="text-3xl mb-6">Open Source</h3>
					<p>
						RecruitEM is developed and maintained by{" "}
						<Link
							className="text-blue-100 hover:text-white hover:underline"
							href="https://github.com/Evil-Bees"
						>
							Evil Bees{" "}
						</Link>{" "}
						, an open source community - by developers and for developers. We
						are a group of like-minded individuals who are unified by a single
						idea — create something great, learn & improve ourselves along the
						way.
					</p>
				</div>
			</div>
		</>
	);
}
