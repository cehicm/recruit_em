import Link from "next/link";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Resume from "@/components/Resume";
import OpenPositions from "@/components/OpenPositions";

export default function Home() {
	return (
		<>
			<Header />
			<Hero />
			<Resume />
			<OpenPositions />
		</>
	);
}
