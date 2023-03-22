import Image from "next/image";
import cvImage from "public/images/sample-cv.png";
import cvImage2 from "public/images/sample-cv2.png";
import { useState } from "react";

function Resume() {
	const [isHovered, setHover] = useState(false);

	return (
		<div className="relative bg-indigo-900 py-12">
			<div className="text-center text-white pt-10 pb-16 lg:pb-8">
				<h1 className="text-5xl lg:text-6xl pb-6">
					Transparent hiring. Always.
				</h1>
				<p className="lg:w-1/2 mx-auto px-6 lg:px-0">
					RecruitEm allows you to be in control of all parts of the hiring
					process - and bring the candidates skills and traits to the light.
				</p>
			</div>
			<Image
				className="lg:w-1/2 w-full lg:mx-auto lg:my-12 transition-opacity object-contain h-[600px] lg:h-[800px]"
				height={600}
				src={cvImage}
				alt="John Doe resume"
			/>
			<Image
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				onTouchMove={() => setHover(true)}
				className={`object-contain h-[600px] lg:h-[800px] w-full absolute top-0 lg:w-1/2 top-[17rem] lg:top-[15rem] xl:top-[18.8rem] lg:left-[25%] transition-opacity ${
					isHovered ? "opacity-0" : "opacity-1"
				}`}
				src={cvImage2}
				alt="John Doe resume"
			/>
		</div>
	);
}

export default Resume;
