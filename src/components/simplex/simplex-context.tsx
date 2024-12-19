"use client";

import React, { createContext, useEffect, useState } from "react";

type SimplexContextType = {
	step: "init" | "prepare";
	setStep: (step: "init" | "prepare") => void;
	numVar: number;
	setNumVar: (numVar: number) => void;
	numCon: number;
	setNumCon: (numCon: number) => void;
	objective: "Max" | "Min";
	setObjective: (objective: "Max" | "Min") => void;
	constraints: Matrix<number>;
	setConstraints: (constraints: Matrix<number>) => void;
	objectiveFunction: Array<number>;
	setObjectiveFunction: (objectiveFunction: Array<number>) => void;
};

const SimplexContext = createContext<SimplexContextType>({
	step: "init",
	setStep: () => {},
	numVar: 3,
	setNumVar: () => {},
	numCon: 2,
	setNumCon: () => {},
	objective: "Max",
	setObjective: () => {},
	constraints: [],
	setConstraints: () => {},
	objectiveFunction: [],
	setObjectiveFunction: () => {}
});

export function SimplexProvider({ children }: { children: React.ReactNode }) {
	const [step, setStep] = useState<"init" | "prepare">("init");
	const [numVar, setNumVar] = useState(3);
	const [numCon, setNumCon] = useState(2);
	const [objective, setObjective] = useState<"Max" | "Min">("Max");
	const [constraints, setConstraints] = useState<Matrix<number>>([]);
	const [objectiveFunction, setObjectiveFunction] = useState<Array<number>>([]);

	useEffect(() => {
		setObjectiveFunction(new Array(numVar).fill(0));
	}, [numVar]);

	useEffect(() => {
		const newConstraints = Array(numCon)
			.fill(0)
			.map(() => Array(numVar + 1).fill(0));
		setConstraints(newConstraints);
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
				objective,
				setObjective,
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
