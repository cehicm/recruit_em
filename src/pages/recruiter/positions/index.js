import Link from "next/link";
import Head from "next/head";
import { getSession } from "next-auth/react";
import RecruiterNavigation from "@/components/RecruiterNavigation";

export default function Positions(props) {
	return (
		<>
			<Head>
				<title>Positions</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<RecruiterNavigation />

			<div className="max-w-7xl mx-auto px-4 md:px-6">
				<div className="pt-10 flex flex-col md:flex-row max-w-lg justify-between md:items-center mb-8 lg:mb-12">
					<h1 className="text-5xl my-8 md:my-16">Positions Dashboard</h1>

					<Link
						className="text-white bg-blue-700 rounded px-8 py-4 text-center mb-5 md:mb-0"
						href="/recruiter/positions/create"
					>
						Create new Position
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 pb-16">
					{props.positions.length > 0 &&
						props.positions.map(position => (
							<div className="px-6 py-4" key={position._id}>
								<p>{position.name}</p>
								<p>{position.description}</p>
								<Link
									className="text-white bg-blue-700 rounded text-center w-full inline-block pt-2 pb-2"
									href={`/recruiter/position/edit/${position._id}`}
								>
									Edit Position
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

	const positions = await fetch(process.env.SITE_URI + "/api/position", {
		method: "GET",
		redirect: "follow",
	})
		.then(response => response.json())
		.then(result => {
			return result.data;
		})
		.catch(error => console.log("error", error));

	return {
		props: {
			positions,
		},
	};
}
