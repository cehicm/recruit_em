import Link from "next/link";
import Head from "next/head";
import { getSession } from "next-auth/react";
import RecruiterNavigation from "@/components/RecruiterNavigation";

export default function Recruiter(props) {
	return (
		<>
			<Head>
				<title>Recruiter Dashboard</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<RecruiterNavigation />

			<div className="max-w-7xl mx-auto px-4 md:px-6">
				<div className="pt-10 flex flex-col md:flex-row max-w-lg justify-between md:items-center mb-8 lg:mb-12">
					<h1 className="text-5xl my-8 md:my-16">Dashboard</h1>
				</div>
			</div>
		</>
	);
}
