import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Resume from "@/components/Resume";
import OpenPositions from "@/components/OpenPositions";
import OpenSource from "@/components/OpenSource";

export default function Home() {
	return (
		<>
			<Header />
			<Hero />
			<Resume />
			<OpenPositions />
			<OpenSource />
		</>
	);
}
