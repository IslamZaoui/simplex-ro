import { Simplex } from "./simplex";

export function simplexToUrl(objectiveFunction: Array<string>, constrains: Matrix<string>): string {
	const objectiveFunctionStr = objectiveFunction.join(",");
	const constrainsStr = constrains.map((row) => row.join(",")).join(";");

	return `/solve?objectiveFunction=${encodeURIComponent(objectiveFunctionStr)}&constrains=${encodeURIComponent(constrainsStr)}`;
}

export function paramsToSimplex(
	objectiveFunctionStr: string | undefined,
	constrainsStr: string | undefined
): [Simplex, number, number] {
	if (!objectiveFunctionStr || !constrainsStr) throw new Error("Invalid params");

	const objectiveFunction = objectiveFunctionStr.split(",").map((value) => parseFloat(value));
	const constrains = constrainsStr
		.split(";")
		.map((row) => row.split(",").map((value) => parseFloat(value)));

	objectiveFunction.forEach((value) => {
		if (isNaN(value)) throw new Error("Invalid objective function");
	});

	constrains.forEach((row) => {
		if (row.length !== objectiveFunction.length + 1) throw new Error("Invalid constrains");
		row.forEach((value) => {
			if (isNaN(value)) throw new Error("Invalid constrains");
		});
	});

	const simplex = new Simplex(objectiveFunction, constrains);
	const numVar = simplex.constraints[0].length - 1;
	const numCon = simplex.constraints.length;
	return [simplex, numVar, numCon];
}
