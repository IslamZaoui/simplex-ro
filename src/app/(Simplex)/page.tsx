"use server"

import GenerateModel from "@/components/simplex/generate-model";
import SetValues from "@/components/simplex/set-values";
import { SimplexProvider } from "@/components/simplex/simplex-context";

export default async function Home() {
	return (
		<SimplexProvider>
			<GenerateModel />
			<SetValues />
		</SimplexProvider>
	);
}
