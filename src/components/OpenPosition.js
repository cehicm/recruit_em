import Link from "next/link";
function OpenPosition({
	positionTitle,
	positionShortDescription,
	positionLink,
}) {
	return (
		<div className="bg-indigo-400 text-white py-16 px-6 rounded-3xl flex flex-col gap-4">
			<h3 className="text-2xl">{positionTitle}</h3>
			<p>{positionShortDescription}</p>
			<Link
				className="bg-white text-black p-4 self-center mt-7 rounded-lg hover:bg-indigo-800 hover:text-white"
				href={positionLink}
			>
				Apply now{" "}
			</Link>
		</div>
	);
}

export default OpenPosition;
