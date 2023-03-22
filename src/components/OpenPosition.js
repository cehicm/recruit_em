function OpenPosition({ positionTitle, positionShortDescription }) {
	return (
		<div className="bg-indigo-400 text-white py-16 px-6 rounded-3xl">
			<h3 className="text-2xl mb-4">{positionTitle}</h3>
			<p>{positionShortDescription}</p>
		</div>
	);
}

export default OpenPosition;
