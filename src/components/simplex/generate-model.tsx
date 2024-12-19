"use client";

import { useState, useContext } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SimplexContext from "./simplex-context";

export default function GenerateModel() {
	const context = useContext(SimplexContext);

	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (
			isNaN(context.numCon) ||
			isNaN(context.numVar) ||
			context.numCon <= 0 ||
			context.numVar <= 0
		) {
			setError("Please enter positive integers for both fields.");
			return;
		}

		context.setStep("prepare");
	};

	return (
		context.step === "init" && (
			<Card className="mx-auto w-full max-w-md transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-4">
				<CardHeader>
					<CardTitle>Simplex Solver Configuration</CardTitle>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="constraints">Number of Constraints</Label>
							<Input
								id="constraints"
								type="number"
								placeholder="Enter number of constraints"
								value={context.numCon}
								onChange={(e) => context.setNumCon(parseInt(e.target.value, 10))}
								min="1"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="variables">Number of Variables</Label>
							<Input
								id="variables"
								type="number"
								placeholder="Enter number of variables"
								value={context.numVar}
								onChange={(e) => context.setNumVar(parseInt(e.target.value, 10))}
								min="1"
								required
							/>
						</div>
						{error && (
							<Alert variant="destructive">
								<AlertCircle className="h-4 w-4" />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full">
							Set Configuration
						</Button>
					</CardFooter>
				</form>
			</Card>
		)
	);
}
