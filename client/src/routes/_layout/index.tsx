import { createFileRoute } from "@tanstack/react-router"
import { Check, ChevronRight } from "lucide-react"

import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"

export const Route = createFileRoute("/_layout/")({
	component: Index,
})

function Index() {
	return (
		<main className="flex-1">
			{/* Hero Section */}
			<section className="bg-accent w-full py-12 md:py-24 lg:py-32 xl:py-48">
				<div className="container px-4 md:px-6">
					<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<h1 className="text-secondary text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
									<span className="bg-primary text-secondary px-2">Streamline</span> Your Workflow
									Like Never Before
								</h1>
								<p className="text-muted-foreground max-w-[600px] md:text-xl">
									Boost productivity and simplify collaboration with our all-in-one platform
									designed for modern teams.
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Button size="lg" className="bg-primary text-secondary hover:bg-primary/90">
									Start Free Trial
									<ChevronRight className="ml-2 h-4 w-4" />
								</Button>
								<Button
									variant="outline"
									size="lg"
									className="border-secondary text-secondary hover:bg-secondary/10">
									View Demo
								</Button>
							</div>
						</div>
						<div className="relative">
							<div className="bg-primary/20 absolute inset-0 -rotate-3 transform rounded-xl"></div>
							<img
								src="/placeholder.svg?height=550&width=550"
								width={550}
								height={550}
								alt="Hero Image"
								className="relative z-10 mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="w-full bg-white py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="bg-primary text-secondary inline-block rounded-lg px-3 py-1 text-sm font-medium">
								Features
							</div>
							<h2 className="text-secondary text-3xl font-bold tracking-tighter md:text-4xl/tight">
								Everything You Need in One Place
							</h2>
							<p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Our platform offers a comprehensive suite of tools to help your team work more
								efficiently.
							</p>
						</div>
					</div>
					<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
						<div className="grid gap-6">
							<div className="bg-accent border-accent/50 grid gap-1 rounded-lg border p-6">
								<h3 className="text-secondary text-xl font-bold">Seamless Integration</h3>
								<p className="text-muted-foreground">
									Connect with all your favorite tools and apps. Streamline works where you do.
								</p>
							</div>
							<div className="bg-accent border-accent/50 grid gap-1 rounded-lg border p-6">
								<h3 className="text-secondary text-xl font-bold">Real-time Collaboration</h3>
								<p className="text-muted-foreground">
									Work together with your team in real-time, no matter where they are located.
								</p>
							</div>
						</div>
						<div className="grid gap-6">
							<div className="bg-accent border-accent/50 grid gap-1 rounded-lg border p-6">
								<h3 className="text-secondary text-xl font-bold">Advanced Analytics</h3>
								<p className="text-muted-foreground">
									Gain insights into your team's performance with detailed analytics and reporting.
								</p>
							</div>
							<div className="bg-accent border-accent/50 grid gap-1 rounded-lg border p-6">
								<h3 className="text-secondary text-xl font-bold">Enterprise-grade Security</h3>
								<p className="text-muted-foreground">
									Your data is protected with the highest level of security and compliance
									standards.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section id="testimonials" className="bg-secondary w-full py-12 text-white md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="bg-primary text-secondary inline-block rounded-lg px-3 py-1 text-sm font-medium">
								Testimonials
							</div>
							<h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">
								Trusted by Thousands of Teams
							</h2>
							<p className="max-w-[900px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Don't just take our word for it. Here's what our customers have to say.
							</p>
						</div>
					</div>
					<div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
						<Card className="border-none bg-white shadow-lg">
							<CardHeader>
								<div className="flex items-center gap-4">
									<div className="bg-primary rounded-full p-1">
										<img
											src="/placeholder.svg?height=38&width=38"
											alt="Avatar"
											width={38}
											height={38}
											className="rounded-full"
										/>
									</div>
									<div>
										<CardTitle className="text-secondary text-lg">Sarah Johnson</CardTitle>
										<CardDescription>Marketing Director, TechCorp</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									"StreamLine has completely transformed how our marketing team collaborates. We've
									seen a 40% increase in productivity since implementing it."
								</p>
							</CardContent>
						</Card>
						<Card className="border-none bg-white shadow-lg">
							<CardHeader>
								<div className="flex items-center gap-4">
									<div className="bg-primary rounded-full p-1">
										<img
											src="/placeholder.svg?height=38&width=38"
											alt="Avatar"
											width={38}
											height={38}
											className="rounded-full"
										/>
									</div>
									<div>
										<CardTitle className="text-secondary text-lg">Michael Chen</CardTitle>
										<CardDescription>CTO, Innovate Inc</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									"The security features in StreamLine give us peace of mind. It's rare to find a
									platform that balances usability with enterprise-grade security so well."
								</p>
							</CardContent>
						</Card>
						<Card className="border-none bg-white shadow-lg">
							<CardHeader>
								<div className="flex items-center gap-4">
									<div className="bg-primary rounded-full p-1">
										<img
											src="/placeholder.svg?height=38&width=38"
											alt="Avatar"
											width={38}
											height={38}
											className="rounded-full"
										/>
									</div>
									<div>
										<CardTitle className="text-secondary text-lg">Emily Rodriguez</CardTitle>
										<CardDescription>Product Manager, StartUp Co</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									"As a startup, we needed something flexible that could grow with us. StreamLine
									has been the perfect solution, scaling seamlessly as our team expands."
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section id="pricing" className="bg-accent w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="bg-primary text-secondary inline-block rounded-lg px-3 py-1 text-sm font-medium">
								Pricing
							</div>
							<h2 className="text-secondary text-3xl font-bold tracking-tighter md:text-4xl/tight">
								Simple, Transparent Pricing
							</h2>
							<p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Choose the plan that's right for your team. All plans include a 14-day free trial.
							</p>
						</div>
					</div>
					<div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
						<Card className="border-none bg-white shadow-lg">
							<CardHeader>
								<CardTitle className="text-secondary text-xl">Starter</CardTitle>
								<div className="flex items-baseline gap-1">
									<span className="text-secondary text-3xl font-bold">$12</span>
									<span className="text-muted-foreground">/month per user</span>
								</div>
								<CardDescription>Perfect for small teams just getting started.</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="grid gap-2">
									<li className="flex items-center gap-2">
										<Check className="text-primary h-4 w-4" />
										<span className="text-secondary">Up to 5 team members</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="text-primary h-4 w-4" />
										<span className="text-secondary">Basic integrations</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="text-primary h-4 w-4" />
										<span className="text-secondary">5GB storage</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="text-primary h-4 w-4" />
										<span className="text-secondary">Email support</span>
									</li>
								</ul>
							</CardContent>
							<CardFooter>
								<Button className="bg-primary text-secondary hover:bg-primary/90 w-full">
									Get Started
								</Button>
							</CardFooter>
						</Card>
						<Card className="border-primary relative border-2 bg-white shadow-lg">
							<div className="bg-primary text-secondary absolute top-0 right-0 rounded-tr-lg rounded-bl-lg px-3 py-1 text-sm font-medium">
								Popular
							</div>
							<CardHeader>
								<CardTitle className="text-secondary text-xl">Professional</CardTitle>
								<div className="flex items-baseline gap-1">
									<span className="text-secondary text-3xl font-bold">$29</span>
									<span className="text-muted-foreground">/month per user</span>
								</div>
								<CardDescription>Ideal for growing teams that need more.</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="grid gap-2">
									<li className="flex items-center gap-2">
										<Check className="text-primary h-4 w-4" />
										<span className="text-secondary">Unlimited team members</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="text-primary h-4 w-4" />
										<span className="text-secondary">Advanced integrations</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="text-primary h-4 w-4" />
										<span className="text-secondary">50GB storage</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="text-primary h-4 w-4" />
										<span className="text-secondary">Priority support</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="text-primary h-4 w-4" />
										<span className="text-secondary">Advanced analytics</span>
									</li>
								</ul>
							</CardContent>
							<CardFooter>
								<Button className="bg-primary text-secondary hover:bg-primary/90 w-full">
									Get Started
								</Button>
							</CardFooter>
						</Card>
						<Card className="border-none bg-white shadow-lg">
							<CardHeader>
								<CardTitle className="text-secondary text-xl">Enterprise</CardTitle>
								<div className="flex items-baseline gap-1">
									<span className="text-secondary text-3xl font-bold">$49</span>
									<span className="text-muted-foreground">/month per user</span>
								</div>
								<CardDescription>For large organizations with specific needs.</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="grid gap-2">
									<li className="flex items-center gap-2">
										<Check className="text-primary h-4 w-4" />
										<span className="text-secondary">Everything in Professional</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="text-primary h-4 w-4" />
										<span className="text-secondary">Custom integrations</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="text-primary h-4 w-4" />
										<span className="text-secondary">Unlimited storage</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="text-primary h-4 w-4" />
										<span className="text-secondary">24/7 dedicated support</span>
									</li>
									<li className="flex items-center gap-2">
										<Check className="text-primary h-4 w-4" />
										<span className="text-secondary">Custom security features</span>
									</li>
								</ul>
							</CardContent>
							<CardFooter>
								<Button className="bg-secondary hover:bg-secondary/90 w-full text-white">
									Contact Sales
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</section>

			{/* Final CTA Section */}
			<section
				id="contact"
				className="from-primary/20 to-secondary/10 w-full bg-gradient-to-br via-white py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-secondary text-3xl font-bold tracking-tighter md:text-4xl/tight">
								Ready to Transform Your Workflow?
							</h2>
							<p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Join thousands of teams already using StreamLine to boost productivity and simplify
								collaboration.
							</p>
						</div>
						<div className="flex flex-col gap-2 min-[400px]:flex-row">
							<Button size="lg" className="bg-primary text-secondary hover:bg-primary/90">
								Start Your Free Trial
								<ChevronRight className="ml-2 h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="border-secondary text-secondary hover:bg-secondary/10">
								Schedule a Demo
							</Button>
						</div>
						<p className="text-muted-foreground text-sm">
							No credit card required. 14-day free trial.
						</p>
					</div>
				</div>
			</section>
		</main>
	)
}
