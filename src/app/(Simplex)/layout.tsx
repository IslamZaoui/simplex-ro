import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="flex items-center">
				<div className="mx-auto min-h-screen w-full max-w-3xl space-y-6 p-4">
					<section className="space-y-2">
						<h1 className="text-center text-5xl font-bold">Simplex Solver</h1>
						<p className="text-center text-sm text-muted-foreground">
							Created by{" "}
							<Link
								className="font-bold underline transition duration-300 hover:text-primary hover:no-underline"
								href="https://islamzaoui.top/en"
								target="_blank"
								rel="noopener noreferrer"
							>
								Islam Zaoui
							</Link>
						</p>
					</section>

					{children}
				</div>
			</div>
			<footer className="mt-auto border-t py-6">
				<div className="container mx-auto px-4">
					<div className="flex flex-col items-center justify-between sm:flex-row">
						<p className="mb-2 text-sm sm:mb-0">
							© {new Date().getFullYear()} Simplex Solver. All rights reserved.
						</p>
						<div className="flex items-center space-x-4">
							<p className="text-sm">
								Powered by{" "}
								<a
									href="https://nextjs.org"
									target="_blank"
									rel="noopener noreferrer"
									className="font-bold"
								>
									Next.js
								</a>{" "}
								by{" "}
								<a
									href="https://islamzaoui.top/en"
									target="_blank"
									rel="noopener noreferrer"
									className="font-bold underline underline-offset-2 hover:no-underline"
								>
									Islam Zaoui
								</a>
							</p>
							<Button variant="outline" size="sm" className="flex items-center">
								<Github className="mr-2 h-4 w-4" />
								<a
									href="https://github.com/islamzaoui/simplex-ro"
									target="_blank"
									rel="noopener noreferrer"
								>
									Source Code
								</a>
							</Button>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
