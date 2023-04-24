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

			<form
				className="max-w-7xl mx-auto px-4 md:px-12"
				method="POST"
				onSubmit={submitForm}
			>
				<h1 className="text-5xl my-8 md:my-16">New User</h1>
				<div>
					<label htmlFor="firstName">First Name</label>
					<input required type="text" name="firstName" id="firstName"></input>
				</div>

				<div>
					<label htmlFor="lastName">Last Name</label>
					<input required type="text" name="lastName" id="lastName"></input>
				</div>

				<div>
					<label htmlFor="email">Email</label>
					<input required type="email" name="email" id="email"></input>
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input required type="password" name="password" id="password"></input>
				</div>

				<div className="flex items-center gap-12 pl-2 w-1/2 mt-6">
					<label htmlFor="role">Role</label>
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

				<div className="flex items-center gap-12 pl-2 w-1/2 mt-6">
					<label htmlFor="position">Position</label>
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
					className="text-white bg-blue-700 rounded text-center w-full inline-block pt-2 pb-2"
					type="submit"
				>
					Save
				</button>
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
