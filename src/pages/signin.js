import { getCsrfToken, getSession } from "next-auth/react";
import Image from "next/image";
import logo from "../../public/images/recruitem-logo.png";

export default function SignIn({ csrfToken }) {
	return (
		<section className="bg-blue-200 relative">
			<div className="bg-white md:w-[33vw] h-32 md:absolute h-[16vh] md:h-[45vh] lg:h-[80vh] top-[20%] md:top-[10%] rounded-r-xl lg:opacity-20">
				<Image src={logo} className="mx-auto mt-8 md:mt-12" />
				<p className="text-center px-10 pt-6 md:hidden">
					The only recruiting tool you'll ever need.
				</p>
			</div>
			<form
				method="post"
				action="/api/auth/callback/credentials"
				className="bg-dark-blue text-white flex flex-col h-screen items-end"
			>
				<div className="z-10 flex rounded-xl w-[90vw] md:w-[60vw] m-auto mt-16 md:m-auto border-xl p-6 md:p-8 bg-white text-black h-[50vh]">
					<div className="m-auto flex flex-col h-full max-h-64 gap-8 items-center">
						<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
						<label className="flex flex-col gap-3 md:flex-row justify-between items-center h-min lg:w-full">
							Email
							<input
								placeholder="Enter your email"
								autoComplete="email"
								name="email"
								title="Must be a registered email address."
								type="email"
								required
								minLength="4"
								className="pl-4 py-2 text-dark-blue"
							/>
						</label>
						<label className="flex flex-col gap-3 md:flex-row justify-between items-center h-min lg:w-full">
							Password
							<input
								placeholder="Enter your password"
								autoComplete="current-password"
								name="password"
								type="password"
								required
								minLength="4"
								className="pl-4 py-2 text-dark-blue"
							/>
						</label>

						<div>
							<button
								type="submit"
								href="/"
								className="bg-dark-blue text-white py-2 px-7 md:mt-5 mx-auto flex rounded-lg border"
							>
								Sign in
							</button>
						</div>
					</div>
				</div>
			</form>
		</section>
	);
}

export async function getServerSideProps(context) {
	const { req } = context;
	const session = await getSession({ req });

	if (session) {
		return {
			redirect: { destination: "/" + session._doc.role },
		};
	}

	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
}
