import { type Simplex } from "@/lib/simplex";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

interface SimplexDisplayProps {
	simplex: Simplex;
}

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

	return (
		<div className="flex flex-col items-center gap-2">
			<div className="flex flex-col">
				<InlineMath math={`\\text{Linear Program: }`} />
				<InlineMath
					math={`\\text{Maximize} Z = ${simplex.objectiveFunction.map((coef, i) => `${coef}x_${i + 1}`).join(" + ")}`}
				/>
				<InlineMath math={`\\text{Subject to }`} />
				{simplex.constraints.map((constraint, i) => (
					<InlineMath
						key={i}
						math={`\\quad ${constraint
							.slice(0, -1)
							.map((coef, j) => `${coef}x_${j + 1}`)
							.join(" + ")} \\leq ${constraint[constraint.length - 1]}`}
					/>
				))}
				<InlineMath
					math={`\\quad ${simplex.objectiveFunction.map((_, i) => `x_${i + 1}`)} \\geq 0`}
				/>
			</div>

			<InlineMath math={`\\Downarrow`} />

			{renderMaxForm()}
		</div>
	);
}
