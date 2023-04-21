import React, { useState } from "react";
import FormGroup from "@/components/FormGroup";
import Head from "next/head";
import RecruiterNavigation from "@/components/RecruiterNavigation";

export default function CreateUser() {
	const submitForm = async (e) => {
		e.preventDefault();
	};

	return (
		<>
			<Head>
				<title>New User</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<RecruiterNavigation />

			<form
				className="max-w-7xl mx-auto px-4 md:px-6"
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
					<label htmlFor="password">Password</label>
					<input required type="password" name="password" id="password"></input>
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
