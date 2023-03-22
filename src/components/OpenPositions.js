import Link from "next/link";
import OpenPosition from "./OpenPosition";

function OpenPositions() {
	return (
		<section className="py-16 border-b-4 border-indigo-900 max-w-7xl mx-auto flex flex-col">
			<h2 className="text-5xl text-indigo-900 text-center uppercase mb-12">
				Open positions
			</h2>

			<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-12 mb-16">
				<OpenPosition
					positionLink="#"
					positionTitle="Front end developer"
					positionShortDescription="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cumque itaque sint quo ipsam in consequuntur recusandae!"
				/>
				<OpenPosition
					positionLink="#"
					positionTitle="Lorem ipsum dolor sit"
					positionShortDescription="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cumque itaque sint quo ipsam in consequuntur recusandae!"
				/>
				<OpenPosition
					positionLink="#"
					positionTitle="Lorem ipsum dolor sit"
					positionShortDescription="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cumque itaque sint quo ipsam in consequuntur recusandae!"
				/>
			</div>

			<Link
				className="bg-indigo-500 hover:bg-indigo-900 text-white px-10 py-6 mx-auto"
				href="#"
			>
				See all open positions
			</Link>
		</section>
	);
}

export default OpenPositions;
