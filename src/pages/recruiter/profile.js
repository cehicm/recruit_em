import { getSession } from "next-auth/react";
import RecruiterNavigation from "@/components/RecruiterNavigation";

export default function edit(props) {
	return (
		<>
			<RecruiterNavigation />

			<div className="mx-8 md:mx-12 my-12 max-w-7xl">
				<h1 className="text-3xl">
					{props.firstName} {props.lastName}
				</h1>
				<p>{props.email}</p>
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: { destination: "/" },
		};
	} else {
		return {
			props: {
				email: session._doc.email,
				firstName: session._doc.firstName,
				lastName: session._doc.lastName,
				id: session._doc._id,
			},
		};
	}
}
