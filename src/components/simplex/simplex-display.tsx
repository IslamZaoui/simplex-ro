import { type Simplex } from "@/lib/simplex";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

interface SimplexDisplayProps {
	simplex: Simplex;
}

const transpose = <T,>(matrix: T[][]): T[][] => {
	return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

export function SimplexDisplay({ simplex }: SimplexDisplayProps) {
	const renderMaxForm = () => (
		<div className="flex flex-col">
			<InlineMath math={`\\text{Canonical Form: }`} />
			<InlineMath
				math={`\\text{Maximize } Z = ${simplex.objectiveFunction.map((coef, i) => `${coef}x_${i + 1}`).join(" + ")} + ${simplex.constraints.map((_, i) => `s_${i + 1}`).join(" + ")}`}
			/>
			<InlineMath math={`\\text{Subject to }`} />
			{simplex.constraints.map((constraint, i) => (
				<InlineMath
					key={i}
					math={`\\quad ${constraint
						.slice(0, -1)
						.map((coef, j) => `${coef}x_${j + 1}`)
						.join(" + ")} + s_${i + 1} = ${constraint[constraint.length - 1]}`}
				/>
			))}
			<InlineMath
				math={`\\quad ${simplex.objectiveFunction.map((_, i) => `x_${i + 1}`)},${simplex.constraints.map((_, i) => `s_${i + 1}`)} \\geq 0`}
			/>
		</div>
	);

	const renderMinForm = () => {
		const augmentedObjective = [...simplex.objectiveFunction, 1];
		const fullMatrix = [...simplex.constraints, augmentedObjective];
		const transposed = transpose(fullMatrix);
		const newConstraints = transposed.slice(0, -1);
		const newObjectiveFunction = [...transposed[transposed.length - 1].slice(0, -1)];

		return (
			<>
				<div className="flex flex-col">
					<InlineMath math={`\\text{Dual: }`} />
					<InlineMath
						math={`\\text{Maximize } Z = ${newObjectiveFunction.map((coef, i) => `${coef}x_${i + 1}`).join(" + ")}`}
					/>
					<InlineMath math={`\\text{Subject to }`} />
					{newConstraints.map((constraint, i) => (
						<InlineMath
							key={i}
							math={`\\quad ${constraint
								.slice(0, -1)
								.map((coef, j) => `${coef}x_${j + 1}`)
								.join(" + ")} \\leq ${constraint[constraint.length - 1]}`}
						/>
					))}
					<InlineMath
						math={`\\quad ${newObjectiveFunction.map((_, i) => `x_${i + 1}`)} \\geq 0`}
					/>
				</div>

				<InlineMath math={`\\Downarrow`} />

				<div className="flex flex-col">
					<InlineMath math={`\\text{Canonical Form: }`} />
					<InlineMath
						math={`\\text{Maximize } Z = ${newObjectiveFunction.map((coef, i) => `${coef}x_${i + 1}`).join(" + ")} + ${newConstraints.map((_, i) => `s_${i + 1}`).join(" + ")} + a`}
					/>
					<InlineMath math={`\\text{Subject to }`} />
					{newConstraints.map((constraint, i) => (
						<InlineMath
							key={i}
							math={`\\quad ${constraint
								.slice(0, -1)
								.map((coef, j) => `${coef}x_${j + 1}`)
								.join(" + ")} + s_${i + 1} = ${constraint[constraint.length - 1]}`}
						/>
					))}
					<InlineMath
						math={`\\quad ${newObjectiveFunction.map((_, i) => `x_${i + 1}`)},${newConstraints.map((_, i) => `s_${i + 1}`)},a \\geq 0`}
					/>
				</div>
			</>
		);
	};

	return (
		<div className="flex flex-col items-center gap-2">
			<div className="flex flex-col">
				<InlineMath math={`\\text{Linear Program: }`} />
				<InlineMath
					math={`\\text{${simplex.objective === "Max" ? "Maximize" : "Minimize"} } Z = ${simplex.objectiveFunction.map((coef, i) => `${coef}x_${i + 1}`).join(" + ")}`}
				/>
				<InlineMath math={`\\text{Subject to }`} />
				{simplex.constraints.map((constraint, i) => (
					<InlineMath
						key={i}
						math={`\\quad ${constraint
							.slice(0, -1)
							.map((coef, j) => `${coef}x_${j + 1}`)
							.join(
								" + "
							)} \\${simplex.objective === "Max" ? "leq" : "geq"} ${constraint[constraint.length - 1]}`}
					/>
				))}
				<InlineMath
					math={`\\quad ${simplex.objectiveFunction.map((_, i) => `x_${i + 1}`)} \\geq 0`}
				/>
			</div>

			<InlineMath math={`\\Downarrow`} />

			{simplex.objective === "Max" ? renderMaxForm() : renderMinForm()}
		</div>
	);
}
