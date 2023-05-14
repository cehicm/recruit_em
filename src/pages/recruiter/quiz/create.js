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

			<form method="POST" onSubmit={submitForm}>
				<div className="md:pt-10 lg:mb-12 border border-blue-900 md:rounded-3xl bg-indigo-600 text-white text-center">
					<h1 className="text-xl md:text-3xl text-5xl my-8 md:my-16">
						New Quiz
					</h1>
				</div>

				<div className="max-w-7xl mx-auto px-4 md:px-12 mt-12">
					<div className="flex flex-col gap-5 lg:grid grid-cols-2 gap-5 justify-center w-4/5 mx-auto">
						<div className="flex flex-col">
							<label className="mb-2" htmlFor="name">
								Name
							</label>
							<input
								className="border border-indigo-800 border-1 w-full py-4 pl-4"
								required
								type="text"
								name="name"
								id="name"
							></input>
						</div>
						<div className="flex flex-col">
							<label className="mb-2" htmlFor="duration">
								Duration
							</label>
							<input
								className="border border-indigo-800 border-1 w-full py-2 pl-4"
								required
								type="number"
								name="duration"
								id="duration"
							></input>
						</div>
						<div className="flex flex-col col-span-2">
							<label className="mb-2" htmlFor="description">
								Description
							</label>
							<textarea
								className="border border-indigo-800 border-1 w-[60vw] py-4 pl-4 w-full"
								required
								type="text"
								name="description"
								id="description"
							></textarea>
						</div>

						<div
							className="flex flex-col mt-12 mb-5 row-start-3 col-span-2"
							id="questionList"
						>
							<div className="flex mb-8 md:mb-12 md:justify-between">
								<h3 className="text-xl">Questions</h3>
								<button
									className="row-start-3 col-span-2 text-white bg-blue-700 rounded text-center w-64 inline-block ml-5 pt-2 pb-2 flex justify-center"
									type="button"
									onClick={() => setQuestionNum((prev) => prev + 1)}
								>
									Add Question
								</button>
							</div>

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
							className="row-start-4 text-white bg-blue-700 rounded text-center w-64 inline-block pt-2 pb-2"
							type="submit"
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</>
	);
}
