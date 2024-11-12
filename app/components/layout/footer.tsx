import { Github, Linkedin } from 'lucide-react';
export default function Footer() {
	return (
		<div className="absolute flex max-h-[10%] w-full items-center justify-center gap-4 py-5 text-center">
			<p className="text-gray-500">
				A project by{' '}
				<a
					className="font-semibold text-yellow-400 underline-offset-4 transition-colors hover:underline"
					href="https://sethway.vercel.app/"
					target="_blank"
					rel="noopener noreferrer">
					Seth Way
				</a>
			</p>
			<a
				href="https://www.buymeacoffee.com/steventey"
				target="_blank"
				rel="noopener noreferrer"
				className="flex max-w-fit items-center justify-center border-none bg-transparent px-2 py-2 transition-all duration-75 hover:scale-105">
				<Linkedin color='#0072b1' />
			</a>
			<a
				href="https://www.buymeacoffee.com/steventey"
				target="_blank"
				rel="noopener noreferrer"
				className="flex max-w-fit items-center justify-center border-none bg-transparent px-2 py-2 transition-all duration-75 hover:scale-105">
				<Github color='#6cc644'  />
			</a>
		</div>
	);
}
<Linkedin />
