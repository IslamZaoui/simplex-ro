import { Simplex } from "./simplex";

export function simplexToUrl(
	objective: "Max" | "Min",
	objectiveFunction: Array<string>,
	constrains: Matrix<string>
): string {
	const objectiveFunctionStr = objectiveFunction.join(",");
	const constrainsStr = constrains.map((row) => row.join(",")).join(";");

	return `/solve?objective=${objective}&objectiveFunction=${encodeURIComponent(objectiveFunctionStr)}&constrains=${encodeURIComponent(constrainsStr)}`;
}

export function paramsToSimplex(
	objective: string | undefined,
	objectiveFunctionStr: string | undefined,
	constrainsStr: string | undefined
): [Simplex, number, number] {
	if (!objective || !objectiveFunctionStr || !constrainsStr) throw new Error("Invalid params");

	const objectiveFunction = objectiveFunctionStr.split(",").map((value) => parseFloat(value));
	const constrains = constrainsStr
		.split(";")
		.map((row) => row.split(",").map((value) => parseFloat(value)));

	if (objective !== "Max" && objective !== "Min") throw new Error("Invalid objective");

	objectiveFunction.forEach((value) => {
		if (isNaN(value)) throw new Error("Invalid objective function");
	});

	constrains.forEach((row) => {
		if (row.length !== objectiveFunction.length + 1) throw new Error("Invalid constrains");
		row.forEach((value) => {
			if (isNaN(value)) throw new Error("Invalid constrains");
		});
	});

	const simplex = new Simplex(objective as "Max" | "Min", objectiveFunction, constrains);
	const numVar = simplex.constraints[0].length - 1;
	const numCon = simplex.constraints.length;
	return [simplex, numVar, numCon];
}
