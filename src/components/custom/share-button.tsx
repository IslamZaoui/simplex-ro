"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { Share, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShareButton() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const fullUrl = `${window.location.origin}${pathname}${searchParams ? `?${searchParams}` : ""}`;

	const [copied, setCopied] = useState(false);

	function copyToClipboard() {
		navigator.clipboard.writeText(fullUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 1000);
	}

	return (
		<Button onClick={copyToClipboard} className="relative">
			<Share
				className={cn(
					"absolute transition-all duration-200",
					copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
				)}
			/>
			<ThumbsUp
				className={cn(
					"transition-all duration-200",
					copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
				)}
			/>
		</Button>
	);
}
