"use server";

import { paramsToSimplex } from "@/lib";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import IterationTable from "@/components/simplex/iteration-table";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import ShareButton from "@/components/custom/share-button";
import { SimplexDisplay } from "@/components/simplex/simplex-display";

interface PageProps {
	searchParams: Promise<{
		objective?: string;
		objectiveFunction?: string;
		constrains?: string;
	}>;
}

export default async function Solve({ searchParams }: PageProps) {
	const { objective, objectiveFunction, constrains } = await searchParams;

	const [simplex, numVar, numCon] = paramsToSimplex(objective, objectiveFunction, constrains);
	const iterations = [...simplex.solve()];
	const solution = simplex.getSolution();

	return (
		<Card className="transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-4">
			<CardHeader>
				<CardTitle>Simplex Solution</CardTitle>
				<CardDescription>Step-by-step solution tables</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<SimplexDisplay simplex={simplex} />

				{iterations.map((iteration, index) => (
					<IterationTable
						key={index}
						iteration={iteration}
						varNum={numVar}
						constNum={numCon}
					/>
				))}

				<div>
					<h3 className="mb-2 font-semibold">Final Solution</h3>
					<p>
						Variables:{" "}
						{solution.map((val, i) => `x${i + 1} = ${val.toFixed(2)}`).join(", ")}
					</p>
					<p className="mt-1">
						Optimal Z value:{" "}
						{simplex.tableau[simplex.tableau.length - 1][
							simplex.tableau[0].length - 1
						].toFixed(2)}
					</p>
				</div>
			</CardContent>
			<CardFooter className="flex justify-end gap-4">
				<Link href="/" className={buttonVariants({ variant: "outline" })}>
					New Problem
				</Link>
				<ShareButton />
			</CardFooter>
		</Card>
	);
}
