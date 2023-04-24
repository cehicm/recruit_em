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
			<div className="md:max-w-[89vw] lg:max-w-7xl mx-auto md:border border-blue-900 md:rounded-3xl md:h-screen relative md:mt-10">
				<div className="md:pt-10 lg:mb-12 border border-blue-900 md:rounded-3xl bg-indigo-600 text-white text-center">
					<h1 className="text-xl md:text-3xl text-5xl my-8 md:my-16">
						User Dashboard
					</h1>
				</div>
				<div className="max-w-7xl w-full left-1/2 flex justify-center">
					<Link
						className="md:absolute top-[190px] bg-white rounded-md border border-indigo-900 text-indigo-700 font-semibold py-5 md:py-2 px-8 mr-8 md:py-4 text-center my-8 md:my-0 md:mr-0 md:mb-0 hover:bg-indigo-900 hover:text-white text-sm"
						href="/recruiter/users/create"
					>
						Create new User
					</Link>
				</div>
				<div className="grid grid-cols-1 gap-5 mt-16 lg:mt-6 pb-16 mx-2 md:mx-auto md:w-[80%] lg:w-[70%]">
					{props.users.length > 0 &&
						props.users.map((user) => (
							<div
								className="px-6 py-4 border rounded border-indigo-900 grid grid-flow-col justify-between"
								key={user._id}
							>
								<div>
									<h3 className="text-xl">
										{user.firstName} {user.lastName}
									</h3>
									<p>Role: {user.role}</p>
								</div>

								<Link
									className="text-white bg-blue-700 rounded text-center w-full inline-block py-2 px-4 w-36 flex items-center hover:bg-blue-900"
									href={`/recruiter/users/edit/${user._id}`}
								>
									Edit User
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

	const users = await fetch(process.env.SITE_URI + "/api/users", {
		method: "GET",
		redirect: "follow",
	})
		.then((response) => response.json())
		.then((result) => {
			return result.data;
		})
		.catch((error) => console.log("error", error));

	return {
		props: {
			users,
		},
	};
}
