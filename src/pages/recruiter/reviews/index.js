import Link from "next/link";
import Head from "next/head";
import { getSession } from "next-auth/react";
import RecruiterNavigation from "@/components/RecruiterNavigation";

export default function Reviews(props) {
	return (
		<>
			<Head>
				<title>Reviews</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<RecruiterNavigation />

			<div className="max-w-7xl mx-auto px-4 md:px-12">
				<div className="pt-10 flex flex-col md:flex-row max-w-lg justify-between md:items-center lg:mb-12">
					<h1 className="text-5xl my-8">Reviews Dashboard</h1>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 pb-16">
					{props.reviews.length > 0 &&
						props.reviews.map((review) => (
							<div className="pb-6" key={review._id}>
								<p>{review.user}</p>
								<p>{review.position}</p>
								<Link
									className="text-white bg-blue-700 rounded text-center w-full inline-block py-2 mt-7"
									href={`/recruiter/reviews/edit/${review._id}`}
								>
									Edit Review
								</Link>
							</div>
						))}
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	const reviews = await fetch(process.env.SITE_URI + "/api/review", {
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
			reviews,
		},
	};
}
