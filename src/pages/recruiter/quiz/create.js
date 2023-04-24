import React, { useState } from "react";
import FormGroup from "@/components/FormGroup";
import Head from "next/head";
import RecruiterNavigation from "@/components/RecruiterNavigation";

export default function CreateQuiz() {
	const initialInputValues = {
		question1: "",
	};

	const submitForm = async (e) => {
		e.preventDefault();
		const SITE_URI = process.env.SITE_URI;
		const name = e.target.name.value;
		const duration = e.target.duration.value;
		const description = e.target.description.value;

		let questionArray = [];

		if (name && duration && description) {
			const requests = Object.keys(values).map(async (key) => {
				const questionId = await saveQuestion(values[key]);
				questionArray.push(questionId);
			});

			Promise.all(requests).then(() => {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
					name,
					duration,
					description,
					questions: questionArray,
				});

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow",
				};

				fetch(SITE_URI + "/api/quiz", requestOptions)
					.then((response) => response.json())
					.then((result) => {
						if (result.data._id) {
							console.log("New Quiz Created");
						}
					})
					.catch((error) => console.log("error", error));
			});
		}
	};

	const saveQuestion = async (question) => {
		const SITE_URI = process.env.SITE_URI;
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			question: question,
			type: "text",
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		const questionId = await fetch(SITE_URI + "/api/question", requestOptions)
			.then((response) => response.json())
			.then((responseJson) => {
				return responseJson.data._id;
			})
			.catch((error) => console.log("error", error));

		return questionId;
	};

	const [values, setValues] = useState(initialInputValues);
	const [questionNum, setQuestionNum] = useState(1);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setValues({ ...values, [name]: value });
	};

	return (
		<>
			<Head>
				<title>New Quiz</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<RecruiterNavigation />

			<form
				className="max-w-7xl mx-auto px-4 md:px-12"
				method="POST"
				onSubmit={submitForm}
			>
				<h1 className="text-5xl my-8 md:my-16">New Quiz</h1>
				<div>
					<label htmlFor="name">Name</label>
					<input required type="text" name="name" id="name"></input>
				</div>
				<div>
					<label htmlFor="duration">Duration</label>
					<input required type="number" name="duration" id="duration"></input>
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
				<button
					className="text-white bg-blue-700 rounded text-center w-full inline-block pt-2 pb-2"
					type="button"
					onClick={() => setQuestionNum((prev) => prev + 1)}
				>
					Add Question
				</button>
				<div id="questionList">
					{Array.from({ length: questionNum }, (_, i, ind = i + 1) => (
						<FormGroup
							key={i}
							label={`Question ${ind}`}
							name={`question${ind}`}
							value={values[`question${ind}`] || ""}
							onChange={handleInputChange}
						/>
					))}
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
