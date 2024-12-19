"use client";

import { buttonVariants } from "@/components/ui/button";
import { AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Error({ error }: { error: Error }) {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
			<AlertCircle className="mb-8 h-20 w-20 text-destructive" />
			<h1 className="mb-4 text-4xl font-bold">{error.message}</h1>
			<Link href="/" className={buttonVariants()}>
				<ChevronLeft className="mr-2 h-4 w-4" />
				Back to Solver
			</Link>
		</div>
	);
}
