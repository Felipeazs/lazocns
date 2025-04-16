import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"

import { Button } from "../components/ui/button"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white/80">
				<div className="container flex h-16 items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="bg-primary rounded-full p-1.5">
							<img
								src="/placeholder.svg?height=24&width=24"
								alt="StreamLine Logo"
								width={24}
								height={24}
								className="invert"
							/>
						</div>
						<span className="text-secondary text-xl font-bold">StreamLine</span>
					</div>
					<nav className="hidden gap-6 md:flex">
						<a
							href="#features"
							className="text-secondary hover:text-primary text-sm font-medium transition-colors">
							Features
						</a>
						<a
							href="#testimonials"
							className="text-secondary hover:text-primary text-sm font-medium transition-colors">
							Testimonials
						</a>
						<a
							href="#pricing"
							className="text-secondary hover:text-primary text-sm font-medium transition-colors">
							Pricing
						</a>
						<a
							href="#contact"
							className="text-secondary hover:text-primary text-sm font-medium transition-colors">
							Contact
						</a>
					</nav>
					<div className="flex items-center gap-4">
						<a
							href="/login"
							className="text-secondary hover:text-primary hidden text-sm font-medium transition-colors sm:block">
							Log in
						</a>
						<Button className="bg-primary text-secondary hover:bg-primary/90">Get Started</Button>
					</div>
				</div>
			</header>
			<Outlet />
			<footer className="bg-secondary w-full border-t text-white">
				<div className="container flex flex-col gap-8 px-4 py-12 md:px-6">
					<div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
						<div className="flex flex-col gap-2">
							<h3 className="text-lg font-medium text-white">Product</h3>
							<nav className="flex flex-col gap-2">
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									Features
								</a>
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									Pricing
								</a>
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									Integrations
								</a>
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									Changelog
								</a>
							</nav>
						</div>
						<div className="flex flex-col gap-2">
							<h3 className="text-lg font-medium text-white">Company</h3>
							<nav className="flex flex-col gap-2">
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									About
								</a>
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									Blog
								</a>
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									Careers
								</a>
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									Contact
								</a>
							</nav>
						</div>
						<div className="flex flex-col gap-2">
							<h3 className="text-lg font-medium text-white">Resources</h3>
							<nav className="flex flex-col gap-2">
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									Documentation
								</a>
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									Help Center
								</a>
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									Community
								</a>
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									Webinars
								</a>
							</nav>
						</div>
						<div className="flex flex-col gap-2">
							<h3 className="text-lg font-medium text-white">Legal</h3>
							<nav className="flex flex-col gap-2">
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									Privacy Policy
								</a>
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									Terms of Service
								</a>
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									Cookie Policy
								</a>
								<a href="#" className="hover:text-primary text-sm text-white/70 transition-colors">
									GDPR
								</a>
							</nav>
						</div>
					</div>
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex items-center gap-2">
							<div className="bg-primary rounded-full p-1.5">
								<img
									src="/placeholder.svg?height=24&width=24"
									alt="StreamLine Logo"
									width={24}
									height={24}
									className="invert"
								/>
							</div>
							<span className="text-xl font-bold text-white">StreamLine</span>
						</div>
						<div className="flex gap-4">
							<a href="#" className="hover:text-primary text-white/70 transition-colors">
								<Twitter className="h-5 w-5" />
								<span className="sr-only">Twitter</span>
							</a>
							<a href="#" className="hover:text-primary text-white/70 transition-colors">
								<Facebook className="h-5 w-5" />
								<span className="sr-only">Facebook</span>
							</a>
							<a href="#" className="hover:text-primary text-white/70 transition-colors">
								<Instagram className="h-5 w-5" />
								<span className="sr-only">Instagram</span>
							</a>
							<a href="#" className="hover:text-primary text-white/70 transition-colors">
								<Linkedin className="h-5 w-5" />
								<span className="sr-only">aedIn</span>
							</a>
							<a href="#" className="hover:text-primary text-white/70 transition-colors">
								<Github className="h-5 w-5" />
								<span className="sr-only">GitHub</span>
							</a>
						</div>
					</div>
					<div className="text-sm text-white/70">
						© {new Date().getFullYear()} StreamLine, Inc. All rights reserved.
					</div>
				</div>
			</footer>
		</div>
	)
}
