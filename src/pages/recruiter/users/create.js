import React from "react";
import Head from "next/head";
import RecruiterNavigation from "@/components/RecruiterNavigation";
import { getSession } from "next-auth/react";

export default function CreateUser(props) {
	const submitForm = async (e) => {
		e.preventDefault();
		const SITE_URI = process.env.SITE_URI;
		const firstName = e.target.firstName.value;
		const lastName = e.target.lastName.value;
		const password = e.target.password.value;
		const email = e.target.email.value;
		const role = e.target.role.value;
		const position = e.target.position.value;

		if (firstName && lastName && password && role && position && email) {
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				firstName,
				lastName,
				password,
				role,
				position,
				email,
			});

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

			fetch(SITE_URI + "/api/users", requestOptions)
				.then((response) => response.json())
				.then((result) => {
					if (result.data._id) {
						console.log("New User Created");
					}
				})
				.catch((error) => console.log("error", error));
		}
	};

	return (
		<>
			<Head>
				<title>New User</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<RecruiterNavigation />

			<form method="POST" onSubmit={submitForm}>
				<div className="md:pt-10 lg:mb-12 border border-blue-900 md:rounded-3xl bg-indigo-600 text-white text-center">
					<h1 className="text-xl md:text-3xl text-5xl my-8 md:my-16">
						New User
					</h1>
				</div>

				<div className="max-w-[50rem] md:w-3/4 mx-auto pt-5">
					<div className="flex gap-8 items-center justify-between mx-6 my-4">
						<label htmlFor="firstName">First Name</label>
						<input
							required
							type="text"
							name="firstName"
							id="firstName"
							className="border border-indigo-800 border-1 md:w-3/4 py-4 pl-4"
						></input>
					</div>

					<div className="flex gap-8 items-center justify-between mx-6 my-4">
						<label htmlFor="lastName">Last Name</label>
						<input
							required
							type="text"
							name="lastName"
							id="lastName"
							className="border border-indigo-800 border-1 md:w-3/4 py-4 pl-4"
						></input>
					</div>

					<div className="flex gap-8 items-center justify-between mx-6 my-4">
						<label htmlFor="email">Email</label>
						<input
							required
							type="email"
							name="email"
							id="email"
							className="border border-indigo-800 border-1 md:w-3/4 py-4 pl-4"
						></input>
					</div>

					<div className="flex gap-8 items-center justify-between mx-6 my-4">
						<label htmlFor="password">Password</label>
						<input
							required
							type="password"
							name="password"
							id="password"
							className="border border-indigo-800 border-1 md:w-3/4 py-4 pl-4"
						></input>
					</div>
					<div className="flex items-center mx-6 my-4 mt-6 lg:mt-8">
						<label htmlFor="role" className="mr-24 lg:mr-[9rem]">
							Role
						</label>
						<select
							className="bg-gray-600 text-white px-5 py-2 rounded-md"
							name="role"
							id="role"
							required
							multiple={false}
						>
							<option value="candidate">Candidate</option>
							<option value="recruiter">Recruiter</option>
						</select>
					</div>

					<div className="flex items-center mx-6 my-4">
						<label htmlFor="position" className="mr-[4.5rem] lg:mr-[7.5rem]">
							Position
						</label>
						<select
							className="bg-gray-600 text-white px-5 py-2 rounded-md"
							name="position"
							id="position"
							required
							multiple={false}
						>
							{props.positions.length > 0 &&
								props.positions.map((position) => (
									<option key={position._id} value={position._id}>
										{position.name}
									</option>
								))}
						</select>
					</div>

					<button
						className="text-white bg-blue-700 rounded text-center inline-block pt-2 pb-2 w-32 ml-6 mt-6"
						type="submit"
					>
						Save
					</button>
				</div>
			</form>
		</>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	const positions = await fetch(process.env.SITE_URI + "/api/position", {
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
			positions,
		},
	};
}
