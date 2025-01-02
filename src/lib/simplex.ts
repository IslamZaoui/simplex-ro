declare global {
	type Matrix<T> = Array<T>[];
	type SimplexIteration = {
		iteration: number;
		tableau: Matrix<number>;
		enteringVar: number;
		leavingVar: number;
		pivot: [number, number];
		basis: Array<number>;
		currentValue: number;
		isOptimal: boolean;
	};
}

export class Simplex {
	objectiveFunction: Array<number> = [];
	constraints: Matrix<number> = [];

	tableau: Matrix<number>;
	basis: Array<number>;
	iteration: number = 0;

	constructor(objectiveFunction: Array<number>, constraints: Matrix<number>) {
		this.objectiveFunction = objectiveFunction;
		this.constraints = constraints;
		this.tableau = [];
		this.basis = [];
	}

	prepare(): void {
		const m = this.constraints.length;
		const n = this.objectiveFunction.length;

		this.tableau = Array.from({ length: m + 1 }, () => Array(n + m + 1).fill(0));

		for (let i = 0; i < m; i++) {
			for (let j = 0; j < n; j++) {
				this.tableau[i][j] = this.constraints[i][j];
			}
			this.tableau[i][n + i] = 1;
			this.tableau[i][n + m] = this.constraints[i][n];
		}

		for (let j = 0; j < n; j++) {
			this.tableau[m][j] = -this.objectiveFunction[j];
		}

		this.basis = Array.from({ length: m }, (_, i) => n + i);
	}

	*solve(): Generator<SimplexIteration, number, unknown> {
		if (this.objectiveFunction.length === 0 || this.constraints.length === 0) {
			throw new Error("Invalid problem: Empty objective function or constraints");
		}

		this.prepare();

		while (true) {
			// Find entering variable
			const endIndex = this.tableau[0].length - 1;
			const enteringCol = this.tableau[this.tableau.length - 1]
				.slice(0, endIndex)
				.reduce((iMin, x, i, arr) => (x < arr[iMin] ? i : iMin), 0);

			// Check optimality
			const isOptimal = this.tableau[this.tableau.length - 1][enteringCol] >= -Number.EPSILON;

			// Find leaving variable
			let leavingRow = -1;
			let minRatio = Infinity;
			for (let i = 0; i < this.tableau.length - 1; i++) {
				if (this.tableau[i][enteringCol] <= 0) continue;
				const currentValue = this.tableau[i][this.tableau[0].length - 1];
				const ratio = currentValue / this.tableau[i][enteringCol];
				if (ratio < minRatio) {
					minRatio = ratio;
					leavingRow = i;
				}
			}

			// Yield the state before pivot calculations
			yield {
				iteration: this.iteration,
				tableau: this.tableau.map((row) => [...row]),
				enteringVar: enteringCol,
				leavingVar: leavingRow,
				pivot: leavingRow !== -1 ? [leavingRow, enteringCol] : [-1, -1],
				basis: [...this.basis],
				currentValue: -this.tableau[this.tableau.length - 1][this.tableau[0].length - 1],
				isOptimal
			};

			if (isOptimal) break;
			if (leavingRow === -1) throw new Error("This problem has an unbounded solution");

			// Calculate intermediate tableau with pivot row and column adjustments
			const intermediateTableau = this.tableau.map((row) => [...row]);
			const pivotValue = intermediateTableau[leavingRow][enteringCol];

			// Normalize pivot row
			for (let j = 0; j < intermediateTableau[0].length; j++) {
				intermediateTableau[leavingRow][j] /= pivotValue;
			}

			// Calculate pivot column values
			for (let i = 0; i < intermediateTableau.length; i++) {
				if (i !== leavingRow) {
					intermediateTableau[i][enteringCol] = 0;
				}
			}

			// Yield intermediate state (after calculating pivot row and column)
			yield {
				iteration: this.iteration + 0.5,
				tableau: intermediateTableau,
				enteringVar: enteringCol,
				leavingVar: leavingRow,
				pivot: [leavingRow, enteringCol],
				basis: [...this.basis],
				currentValue:
					-intermediateTableau[intermediateTableau.length - 1][
						intermediateTableau[0].length - 1
					],
				isOptimal: false
			};

			// Perform complete pivot operation
			this.basis[leavingRow] = enteringCol;

			// Normalize pivot row
			for (let j = 0; j < this.tableau[0].length; j++) {
				this.tableau[leavingRow][j] /= pivotValue;
			}

			// Update rest of tableau
			for (let i = 0; i < this.tableau.length; i++) {
				if (i === leavingRow) continue;
				const factor = this.tableau[i][enteringCol];
				for (let j = 0; j < this.tableau[0].length; j++) {
					this.tableau[i][j] -= factor * this.tableau[leavingRow][j];
				}
			}

			this.iteration++;
		}

		return -this.tableau[this.tableau.length - 1][this.tableau[0].length - 1];
	}

	getSolution(): Array<number> {
		const solution = Array(this.objectiveFunction.length).fill(0);
		for (let i = 0; i < this.basis.length; i++) {
			if (this.basis[i] < this.objectiveFunction.length) {
				const value = this.tableau[i][this.tableau[0].length - 1];
				solution[this.basis[i]] = Math.abs(value) < Number.EPSILON ? 0 : value;
			}
		}
		return solution;
	}
}
