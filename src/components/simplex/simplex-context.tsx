"use client";

import React, { createContext, useEffect, useState } from "react";

type SimplexContextType = {
	step: "init" | "prepare";
	setStep: (step: "init" | "prepare") => void;
	numVar: number;
	setNumVar: (numVar: number) => void;
	numCon: number;
	setNumCon: (numCon: number) => void;
	constraints: Matrix<string>;
	setConstraints: (constraints: Matrix<string>) => void;
	objectiveFunction: Array<string>;
	setObjectiveFunction: (objectiveFunction: Array<string>) => void;
};

const SimplexContext = createContext<SimplexContextType>({
	step: "init",
	setStep: () => {},
	numVar: 3,
	setNumVar: () => {},
	numCon: 2,
	setNumCon: () => {},
	constraints: [],
	setConstraints: () => {},
	objectiveFunction: [],
	setObjectiveFunction: () => {}
});

export function SimplexProvider({ children }: { children: React.ReactNode }) {
	const [step, setStep] = useState<"init" | "prepare">("init");
	const [numVar, setNumVar] = useState(3);
	const [numCon, setNumCon] = useState(2);
	const [constraints, setConstraints] = useState<Matrix<string>>([]);
	const [objectiveFunction, setObjectiveFunction] = useState<Array<string>>([]);

	useEffect(() => {
		if (!isNaN(numVar)) setObjectiveFunction(new Array(numVar).fill(0));
	}, [numVar]);

	useEffect(() => {
		if (!isNaN(numCon) && !isNaN(numVar)) {
			const newConstraints = Array(numCon)
				.fill(0)
				.map(() => Array(numVar + 1).fill(0));
			setConstraints(newConstraints);
		}
	}, [numVar, numCon]);

	useEffect(() => {
		console.log(constraints);
		console.log(objectiveFunction);
	}, [constraints, objectiveFunction]);

	return (
		<SimplexContext.Provider
			value={{
				step,
				setStep,
				numCon,
				setNumCon,
				numVar,
				setNumVar,
				constraints,
				setConstraints,
				objectiveFunction,
				setObjectiveFunction
			}}
		>
			{children}
		</SimplexContext.Provider>
	);
}

export default SimplexContext;
