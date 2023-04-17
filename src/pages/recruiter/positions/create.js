import React, { useState } from "react";
import Head from "next/head";

export default function CreatePosition(props) {
	const initialInputValues = {
		question1: "",
	};

	const submitForm = async e => {
		e.preventDefault();
		const SITE_URI = process.env.SITE_URI;
		const name = e.target.name.value;
		const description = e.target.description.value;
		const status = e.target.status.value;
		const quiz = e.target.quiz.value;

		let questionArray = [];

		if (name && description && status && quiz) {
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				name,
				status,
				description,
				quiz,
			});

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

			fetch(SITE_URI + "/api/position", requestOptions)
				.then(response => response.json())
				.then(result => {
					if (result.data._id) {
						console.log("New Position Created");
					}
				})
				.catch(error => console.log("error", error));
		}
	};

	return (
		<>
			<Head>
				<title>New Position</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<form
				className="max-w-7xl mx-auto px-4 md:px-6"
				method="POST"
				onSubmit={submitForm}
			>
				<h1 className="text-5xl my-8 md:my-16">New Position</h1>
				<div>
					<label htmlFor="name">Name</label>
					<input required type="text" name="name" id="name"></input>
				</div>
				<div>
					<label htmlFor="description">Description</label>
					<textarea
						required
						type="text"
						name="description"
						id="description"
					></textarea>
				</div>
				<div>
					<label htmlFor="status">Status</label>
					<select name="status" id="status" required>
						<option value="enabled">Enabled</option>
						<option value="disabled">Disabled</option>
					</select>
				</div>

				<div>
					<label htmlFor="quiz">Quiz</label>
					<select name="quiz" id="quiz" required>
						{props.quizzes.length > 0 &&
							props.quizzes.map(quiz => (
								<option key={quiz._id} value={quiz._id}>
									{quiz.name}
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
	const quizzes = await fetch(process.env.SITE_URI + "/api/quiz", {
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
			quizzes,
		},
	};
}
