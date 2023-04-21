import RecruiterNavigation from "@/components/RecruiterNavigation";
import Head from "next/head";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function Users(props) {
	return (
		<>
			<Head>
				<title>Users</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<RecruiterNavigation />
			<div className="md:pb-4 md:mt-20 lg:mt-12 border border-t-0 border-l-0 border-r-0 border-t-indigo-900 md:border-t-white border-b-indigo-900 md:w-[80vw] mx-auto">
				{props.users.length > 0 &&
					props.users.map(user => (
						<div
							className="px-6 py-6 md:pb-8 grid grid-flow-col gap-1 lg:w-3/4 mx-auto md:justify-between"
							key={user._id}
						>
							<div>
								<h3 className="text-xl">
									{user.firstName} {user.lastName}
								</h3>
								<p>Role: {user.role}</p>
							</div>

							<Link
								className="hover:animate-pulse self-start text-white bg-blue-700 rounded text-center md:w-56 inline-block py-2 px-10 lg:mt-6 md:mt-0 max-w-lg"
								href={`/recruiter/users/edit/${user._id}`}
							>
								Edit User
							</Link>
						</div>
					))}
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	const users = await fetch(process.env.SITE_URI + "/api/users", {
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
			users,
		},
	};
}
