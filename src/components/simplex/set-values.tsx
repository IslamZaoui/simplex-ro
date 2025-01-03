"use client";

import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useContext, useRef } from "react";
import SimplexContext from "./simplex-context";
import React from "react";
import Link from "next/link";
import { simplexToUrl } from "@/lib";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

function SetValues() {
	const context = useContext(SimplexContext);

	const scrollAreaParent = useRef<HTMLDivElement>(null);

	function handleObjectiveFunctionChange(value: string, index: number) {
		const newValue = [...context.objectiveFunction];
		newValue[index] = value;
		context.setObjectiveFunction(newValue);
	}

	function handleConstraintChange(value: string, conIndex: number, varIndex: number) {
		const newConstraints = [...context.constraints];
		newConstraints[conIndex][varIndex] = value;
		context.setConstraints(newConstraints);
	}

	return (
		context.step === "prepare" && (
			<Card className="transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-4">
				<CardHeader>
					<CardTitle>Simplex Values</CardTitle>
					<CardDescription>Enter simplex values</CardDescription>
				</CardHeader>
				<CardContent ref={scrollAreaParent}>
					<ScrollArea
						className={`flex flex-col w-[${scrollAreaParent.current?.offsetWidth}px]`}
					>
						<div className="flex items-center gap-2">
							<InlineMath math={`\\text{Max Z} =`} />
							{context.objectiveFunction?.map((value, index) => (
								<React.Fragment key={index}>
									<Input
										className="w-[60px]"
										type="number"
										value={value ?? ""}
										onChange={(e) =>
											handleObjectiveFunctionChange(e.target.value, index)
										}
										placeholder={`Coefficient for x${index + 1}`}
									/>
									<InlineMath math={`x${index + 1}`} />
									{index !== context.objectiveFunction?.length - 1 && (
										<InlineMath math={`+`} />
									)}
								</React.Fragment>
							))}
						</div>
						<div className="ml-[80px] mt-2 flex flex-col gap-2">
							{context.constraints?.map((constraint, constraintIndex) => (
								<div className="flex items-center gap-2" key={constraintIndex}>
									{constraint?.slice(0, -1).map((value, varIndex) => (
										<React.Fragment key={varIndex}>
											<Input
												className="w-[60px]"
												type="number"
												value={value ?? ""}
												onChange={(e) =>
													handleConstraintChange(
														e.target.value,
														constraintIndex,
														varIndex
													)
												}
												placeholder={`Coefficient for x${varIndex + 1}`}
											/>
											<InlineMath math={`x${varIndex + 1}`} />
											{varIndex !== constraint?.length - 2 && (
												<InlineMath math={`+`} />
											)}
										</React.Fragment>
									))}
									<InlineMath math={"\\leq"} />
									<Input
										className="w-[60px]"
										type="number"
										value={constraint?.[constraint.length - 1] ?? ""}
										onChange={(e) =>
											handleConstraintChange(
												e.target.value,
												constraintIndex,
												constraint.length - 1
											)
										}
									/>
								</div>
							))}
						</div>
						<div className="h-4">
							<ScrollBar orientation="horizontal" />
						</div>
					</ScrollArea>
				</CardContent>
				<CardFooter className="flex justify-end gap-4">
					<Button variant="outline" onClick={() => context.setStep("init")}>
						Go Back
					</Button>
					<Link
						href={simplexToUrl(context.objectiveFunction, context.constraints)}
						className={`w-32 ${buttonVariants()}`}
					>
						Solve
					</Link>
				</CardFooter>
			</Card>
		)
	);
}

export default SetValues;
