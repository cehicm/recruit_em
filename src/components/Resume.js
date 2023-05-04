import Image from "next/image";
import cvImage from "public/images/sample-cv.png";
import cvImage2 from "public/images/sample-cv2.png";

function Resume() {
	return (
		<div className="relative bg-indigo-900 py-12 mb-8">
			<div className="text-center text-white pt-10 pb-16 lg:pb-8">
				<h1 className="text-5xl lg:text-6xl pb-6">
					Transparent hiring. Always.
				</h1>
				<p className="lg:w-1/2 mx-auto px-6 lg:px-0">
					RecruitEm allows you to be in control of all parts of the hiring
					process - and bring the candidates skills and traits to the light.
				</p>
			</div>

			<div className="relative mx-6">
				<Image
					className="lg:w-1/2 w-full lg:mx-auto lg:my-12 transition-opacity object-contain h-[500px] lg:h-[800px]"
					height={600}
					src={cvImage}
					alt="John Doe resume"
				/>
				<Image
					className="h-[500px] lg:h-[800px] object-contain absolute top-0 animate-rightTransform opacity-[90%]"
					src={cvImage2}
					alt="John Doe resume"
				/>
			</div>
		</div>
	);
}

export default Resume;
