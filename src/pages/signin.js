import { getCsrfToken, getSession } from "next-auth/react";

export default function SignIn({ csrfToken }) {
	return (
		<form
			method="post"
			action="/api/auth/callback/credentials"
			className="bg-dark-blue text-white flex flex-col h-screen"
		>
			<div className="max-w-[450px] w-[70vw] mx-auto mt-64 grid gap-8 border p-8">
				<h1 className="text-3xl text-center mb-7">Sign in to RecruitEM</h1>

				<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
				<label className="flex justify-between items-center">
					Email
					<input
						placeholder="Enter your email"
						autoComplete="email"
						name="email"
						title="Must be a registered email address."
						type="email"
						required
						minLength="4"
						className="pl-4 py-2"
					/>
				</label>
				<label className="flex justify-between items-center">
					Password
					<input
						placeholder="Enter your password"
						autoComplete="current-password"
						name="password"
						type="password"
						required
						minLength="4"
						className="pl-4 py-2"
					/>
				</label>

				<div>
					<button
						type="submit"
						href="/"
						className="bg-white text-black py-2 px-7 mt-5 mx-auto flex rounded-lg"
					>
						Sign in
					</button>
				</div>
			</div>
		</form>
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
