import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";

interface Props {
	varNum: number;
	constNum: number;
	iteration: SimplexIteration;
}

const IterationTable: React.FC<Props> = ({ iteration, varNum, constNum }) => {
	return (
		<div className="p-4">
			<h3 className="mb-2 font-semibold">
				Iteration {iteration.iteration}
				{iteration.isOptimal && " (Optimal Solution)"}
			</h3>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="rounded text-center">Basic</TableHead>
						{Array.from({ length: iteration.tableau[0].length - 1 }).map((_, j) => (
							<TableHead key={j} className="rounded text-center">
								{j < varNum ? (
									<>x{j + 1}</>
								) : j < varNum + constNum ? (
									<>s{j - varNum + 1}</>
								) : (
									<>a</>
								)}
							</TableHead>
						))}
						<TableHead className="rounded text-center">RHS</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{iteration.tableau.slice(0, -1).map((row, i) => (
						<TableRow key={i}>
							<TableCell className="rounded text-center">
								{iteration.basis[i] < varNum ? (
									<>x{iteration.basis[i] + 1}</>
								) : (
									<>s{iteration.basis[i] - varNum + 1}</>
								)}
							</TableCell>
							{row.map((cell, j) => {
								const isPivot =
									i === iteration.pivot[0] && j === iteration.pivot[1];
								return (
									<TableCell
										key={j}
										className={`rounded text-center ${
											isPivot && !iteration.isOptimal
												? "bg-muted text-muted-foreground"
												: ""
										}`}
									>
										{cell.toFixed(2)}
									</TableCell>
								);
							})}
						</TableRow>
					))}
					<TableRow>
						<TableCell className="rounded text-center">Z</TableCell>
						{iteration.tableau[iteration.tableau.length - 1].map((cell, j) => {
							const isLast = j === iteration.tableau[0].length - 1;
							return (
								<TableCell
									key={j}
									className={`rounded text-center ${
										isLast && iteration.isOptimal
											? "bg-primary text-primary-foreground"
											: ""
									}`}
								>
									{cell.toFixed(2)}
								</TableCell>
							);
						})}
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};

export default IterationTable;
