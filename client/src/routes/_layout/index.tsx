import { createFileRoute, Link } from "@tanstack/react-router"
import { CalendarFold, Check, ChevronRight, Mail, MessagesSquare } from "lucide-react"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/client/components/ui/carousel"
import { buttonVariants } from "@/client/lib/utils"

export const Route = createFileRoute("/_layout/")({
	component: Index,
})

function Index() {
	return (
		<main className="min-h-screen flex-1">
			{/* Hero Section */}
			<section id="hero" className="bg-accent w-full py-12 md:py-24 lg:py-32 xl:py-48">
				<div className="container px-4 md:px-6">
					<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<h1 className="text-secondary text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
									Transformamos tu visión en{" "}
									<span className="bg-primary text-secondary px-2">acción sostenible</span>
								</h1>
								<p className="text-muted-foreground max-w-[600px] md:text-xl">
									Nuestra consultoría estratégica ofrece soluciones a tu medida, promoviendo la
									sostenibilidad y el cuidado de los recursos.
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Link
									to="/panel"
									className={buttonVariants({
										className: "bg-primary text-secondary hover:bg-primary/90",
										size: "lg",
									})}>
									Comienza tu evaluación aquí! <ChevronRight className="ml-2 h-4 w-4" />
								</Link>
								<Link
									to="/panel"
									className={buttonVariants({
										className: "border-secondary text-secondary hover:bg-secondary/10",
										size: "lg",
										variant: "outline",
									})}>
									Entrar
								</Link>
							</div>
						</div>
						<div className="relative">
							<div className="bg-primary/20 absolute inset-0 -rotate-3 transform rounded-xl"></div>
							<img
								src="hero_woman.svg"
								width={550}
								height={550}
								alt="Hero Image"
								className="relative z-10 mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section className="w-full bg-white py-12 md:py-24 lg:py-32" id="about">
				<div className="container px-4 md:px-6">
					<div className="grid items-center gap-10 lg:grid-cols-2">
						<div className="relative">
							<div className="bg-secondary/10 absolute inset-0 rotate-3 transform rounded-xl"></div>
							<div className="bg-primary/20 absolute inset-0 -rotate-3 transform rounded-xl"></div>
							<img
								src="team.svg"
								width={500}
								height={500}
								alt="About StreamLine"
								className="relative z-10 mx-auto rounded-xl shadow-lg"
							/>
						</div>
						<div className="flex flex-col space-y-4">
							<div className="bg-primary text-secondary inline-block self-start rounded-lg px-3 py-1 text-sm font-medium">
								Quiénes somos
							</div>
							<h2 className="text-secondary text-3xl font-bold tracking-tighter md:text-4xl/tight">
								Lazo Consultora de Negocios Sustentables es la consultora líder en economía
								circular.
							</h2>
							<p className="text-muted-foreground md:text-lg">
								Dedicada a transformar la forma en que las empresas operan en el triple de impacto.
								Fundada en 2020, nuestra misión es facilitar la transición de las empresas hacia
								prácticas más sostenibles y responsables, alineadas con los Objetivos de Desarrollo
								Sostenible de las Naciones Unidas. <br /> Nos especializamos en ofrecer soluciones
								integrales que combinan innovación, tecnología y estrategia para promover modelos de
								negocio que no solo sean eficientes y rentables, sino también respetuosos con el
								medio ambiente y beneficiosos para la sociedad.
							</p>
							<div className="mt-4 grid gap-4">
								<div className="flex items-start gap-3">
									<div className="bg-primary mt-1 rounded-full p-2">
										<Check className="text-secondary h-4 w-4" />
									</div>
									<div>
										<h3 className="text-secondary font-semibold">Misión</h3>
										<p className="text-muted-foreground">
											Facilitar la transformación hacia prácticas empresariales sostenibles y
											económicamente viables, mediante la innovación y la implementación de
											soluciones de economía circular, apoyando a las empresas en su transición
											hacia la sostenibilidad, al tiempo que se contribuye a la realización de los
											Objetivos de Desarrollo Sostenible.
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="bg-primary mt-1 rounded-full p-2">
										<Check className="text-secondary h-4 w-4" />
									</div>
									<div>
										<h3 className="text-secondary font-semibold">Visión</h3>
										<p className="text-muted-foreground">
											Ser líder en consultoría de sostenibilidad en América Latina, reconocida por
											impulsar negocios desde la innovación sostenible y la economía circular,
											creando un impacto positivo duradero en el medio ambiente y la sociedad.
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="bg-primary mt-1 rounded-full p-2">
										<Check className="text-secondary h-4 w-4" />
									</div>
									<div>
										<h3 className="text-secondary font-semibold">Propósito</h3>
										<p className="text-muted-foreground">
											Promover un cambio significativo en la industria, alentando y apoyando la
											adopción de prácticas que no solo cumplan con las normativas ambientales
											actuales, sino que también preparen a las empresas para futuros desafíos
											ambientales, asegurando su viabilidad y éxito en un mundo que valora la
											responsabilidad ecológica y social.{" "}
										</p>
									</div>
								</div>
							</div>
							<div className="mt-4">
								<a
									href="#contact"
									className={buttonVariants({
										className: "bg-secondary hover:bg-secondary/90 text-white",
									})}>
									¿Quiéres saber más?
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Features Section */}
			<section id="servicios" className="w-full bg-white py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="bg-primary text-secondary inline-block rounded-lg px-3 py-1 text-sm font-medium">
								Nuestros servicios
							</div>
							<h2 className="text-secondary text-3xl font-bold tracking-tighter md:text-4xl/tight">
								Todo lo que necesitas en nuestra asesoría
							</h2>
							<p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Our platform offers a comprehensive suite of tools to help your team work more
								efficiently.
							</p>
						</div>
					</div>
					<Carousel>
						<CarouselContent>
							<CarouselItem className="bg-accent border-accent/50 grid items-baseline gap-10 border px-8 py-3 lg:grid-cols-2">
								<div>
									<h3 className="text-secondary pb-5 text-xl font-bold">
										Servicio de Prototipado Web para Startups
									</h3>
									<p className="text-muted-foreground">
										Entendemos la importancia de validar rápidamente las ideas en el ámbito digital.
										Nuestro servicio de prototipado web está diseñado para startups que necesitan
										desarrollar y testear interfaces de usuario, funcionalidades y conceptos de
										productos de manera eficiente. Este servicio incluye la realización de pruebas
										de usabilidad para asegurar que los productos no solo sean funcionales sino
										también intuitivos y atractivos para los usuarios finales. Además, ayudamos a
										integrar feedback temprano del mercado para iterar y mejorar los prototipos
										antes de la fase de desarrollo completo, asegurando así que los productos
										finales estén alineados con las expectativas del mercado y las necesidades del
										usuario.
									</p>
								</div>
								<div>
									<h3 className="text-secondary pb-5 text-xl font-bold">
										Asesoría en proyectos I+D+i
									</h3>
									<p className="text-muted-foreground align-top">
										Lazo ofrece asesoría especializada en la formulación y validación de proyectos
										de investigación. Este servicio es crucial para empresas que necesitan validar
										sus ideas en el mercado, asegurando que sus ideas sean viables y escalables.
										Incluye asesoramiento para acceder a financiamiento inicial a través de
										instrumentos como CORFO y ANID, estudios de mercado para entender la demanda
										potencial, y comunicación sostenible que resalta el valor de las innovaciones
										emergentes
									</p>
								</div>
							</CarouselItem>
							<CarouselItem className="bg-accent border-accent/50 grid items-baseline gap-10 border px-8 py-3 lg:grid-cols-2">
								<div>
									<h3 className="text-secondary pb-5 text-xl font-bold">
										Prototipado y desarrollo de hojas de ruta
									</h3>
									<p className="text-muted-foreground">
										Facilitamos el desarrollo de hojas de ruta y prototipos iniciales, utilizando
										herramientas de análisis de ciclo de vida y simulaciones de procesos. Este
										servicio es esencial para startups que necesitan experimentar y probar sus ideas
										rápidamente en entornos controlados antes de lanzarlas al mercado. Ayudamos a
										definir pasos claros y estrategias para escalar sus proyectos desde conceptos
										hasta productos listos para el mercado, utilizando metodologías ágiles y
										eficientes.
									</p>
								</div>
								<div>
									<h3 className="text-secondary pb-5 text-xl font-bold">
										Gestión de proyectos para emprendimientos innovadores
									</h3>
									<p className="text-muted-foreground">
										Nuestra gestión de proyectos está diseñada para apoyar a las startups en la
										coordinación y ejecución de sus planes de innovación. Con especial énfasis en
										bioprocesos y biotecnología, ofrecemos diagnósticos de madurez y asistencia en
										la formación de alianzas estratégicas. Este servicio ayuda a los emprendedores a
										mantener sus proyectos en curso, optimizados y alineados con objetivos
										comerciales y sostenibles claros.
									</p>
								</div>
							</CarouselItem>
							<CarouselItem className="bg-accent border-accent/50 grid items-baseline gap-10 border px-8 py-3">
								<div className="bg-accent border-accent/50 grid gap-1 border p-6">
									<h3 className="text-secondary pb-5 text-xl font-bold">
										Capacitación y talleres de innovación y sostenibilidad{" "}
									</h3>
									<p className="text-muted-foreground">
										Brindamos talleres y capacitaciones que enseñan cómo integrar la sostenibilidad
										en el modelo de negocio desde el inicio. Utilizando herramientas como el Canvas
										B y Canvas circular, instruimos a las startups en el diseño de negocios que no
										sólo son económicamente viables, sino también responsables con el medio ambiente
										y la sociedad. Estos talleres son ideales para emprendedores que buscan
										incorporar principios de economía circular y sostenibilidad desde el principio
										de sus proyectos.
									</p>
								</div>
							</CarouselItem>
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</section>

			{/* Testimonials Section
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
 */}
			{/* Pricing Section */}
			<section id="precios" className="bg-accent w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="bg-primary text-secondary inline-block rounded-lg px-3 py-1 text-sm font-medium">
								Precios
							</div>
							<h2 className="text-secondary text-3xl font-bold tracking-tighter md:text-4xl/tight">
								¿Quiéres ser nuestro aliado estratégico?
							</h2>
							<p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Revisa nuestros servicios
							</p>
						</div>
					</div>
					<div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
						<Card className="border-none bg-white shadow-lg">
							<CardHeader>
								<CardTitle className="text-secondary text-xl">Prototipaje Web</CardTitle>
								<div className="flex items-baseline gap-1">
									<span className="text-secondary text-3xl font-bold">$200.000</span>
									<span className="text-muted-foreground">/desde</span>
								</div>
								<CardDescription>Valida tus ideas</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="grid gap-2">
									<li className="grid grid-cols-8 items-center gap-1">
										<Check className="text-primary col-span-1 h-4 w-4" />
										<span className="text-secondary col-span-7">
											Prototipado digital para pruebas de conceptos.
										</span>
									</li>
									<li className="grid grid-cols-8 items-center gap-1">
										<Check className="text-primary col-span-1 h-4 w-4" />
										<span className="text-secondary col-span-7">
											Pruebas con usuarios en entorno real para iteración rápida.
										</span>
									</li>
									<li className="grid grid-cols-8 items-center gap-1">
										<Check className="text-primary col-span-1 h-4 w-4" />
										<span className="text-secondary col-span-7">
											Reporte de viabilidad técnica del proyecto.
										</span>
									</li>
									<li className="grid grid-cols-8 items-center gap-1">
										<Check className="text-primary col-span-1 h-4 w-4" />
										<span className="text-secondary col-span-7">
											Consultas personalizadas de decisiones estratégicas.
										</span>
									</li>
									<li className="grid grid-cols-8 items-center gap-1">
										<Check className="text-primary col-span-1 h-4 w-4" />
										<span className="text-secondary col-span-7">
											Informe de cierre con justificación y respaldo de las actividades realizadas.
										</span>
									</li>
								</ul>
							</CardContent>
							<CardFooter>
								<a
									href="#contact"
									className={buttonVariants({
										className: "bg-primary text-secondary hover:bg-primary/90 w-full",
									})}>
									Quiero saber más
								</a>
							</CardFooter>
						</Card>
						<Card className="border-primary relative border-2 bg-white shadow-lg">
							<div className="bg-primary text-secondary absolute top-0 right-0 rounded-tr-lg rounded-bl-lg px-3 py-1 text-sm font-medium">
								Destacado
							</div>
							<CardHeader>
								<CardTitle className="text-secondary text-xl">Diagnóstico</CardTitle>
								<div className="flex items-baseline gap-1">
									<span className="text-secondary text-3xl font-bold">$30.000</span>
									<span className="text-muted-foreground">/reunión</span>
								</div>
								<CardDescription>Medicina para tu negocio</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="grid gap-2">
									<li className="grid grid-cols-8 items-center gap-1">
										<Check className="text-primary col-span-1 h-4 w-4" />
										<span className="text-secondary col-span-7">Sesión de diagnóstico.</span>
									</li>
									<li className="grid grid-cols-8 items-center gap-1">
										<Check className="text-primary col-span-1 h-4 w-4" />
										<span className="text-secondary col-span-7">
											Recomendaciones y plan de trabajo ajustado.
										</span>
									</li>
									<li className="grid grid-cols-8 items-center gap-1">
										<Check className="text-primary col-span-1 h-4 w-4" />
										<span className="text-secondary col-span-7">
											Seguimiento y retroalimentación.
										</span>
									</li>
								</ul>
							</CardContent>
							<CardFooter>
								<a
									href="#contact"
									className={buttonVariants({
										className: "bg-primary text-secondary hover:bg-primary/90 w-full",
									})}>
									Quiero saber más
								</a>
							</CardFooter>
						</Card>
						<Card className="border-none bg-white shadow-lg">
							<CardHeader>
								<CardTitle className="text-secondary text-xl">Nexus</CardTitle>
								<div className="flex items-baseline gap-1">
									<span className="text-secondary text-3xl font-bold">$250.000</span>
									<span className="text-muted-foreground">/servicio</span>
								</div>
								<CardDescription>Conéctate, prepárate y triunfa</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="grid gap-2">
									<li className="grid grid-cols-8 items-center gap-1">
										<Check className="text-primary col-span-1 h-4 w-4" />
										<span className="text-secondary col-span-7">
											Evaluación incial de la salud financiera del negocio.
										</span>
									</li>
									<li className="grid grid-cols-8 items-center gap-1">
										<Check className="text-primary col-span-1 h-4 w-4" />
										<span className="text-secondary col-span-7">
											Taller de cómo preparar propuestas de financiamiento.
										</span>
									</li>
									<li className="grid grid-cols-8 items-center gap-1">
										<Check className="text-primary col-span-1 h-4 w-4" />
										<span className="text-secondary col-span-7">
											Asesoría en la formulación y ajuste de estrategias de negocio.
										</span>
									</li>
								</ul>
							</CardContent>
							<CardFooter>
								<a
									href="#contact"
									className={buttonVariants({
										className: "bg-secondary hover:bg-secondary/90 w-full text-white",
									})}>
									Contáctanos
								</a>
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
								Comunícate con nosotros!
							</h2>
							<p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Si estás listo para transformar tu negocio y avanzar hacia la sostenibilidad o
								tienes una startup o emprendimiento que inicia su camino, no dudes en agendar una
								reunión inicial de 30 minutos con nosotros. En Lazo SpA, te ayudaremos a explorar
								cómo nuestras soluciones personalizadas en economía circular y sostenibilidad pueden
								beneficiar a tu empresa.
							</p>
							<p className="text-muted-foreground py-5 font-bold md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								¡Comienza tu viaje hacia la innovación sostenible hoy mismo!
							</p>
						</div>
						<div className="flex flex-col items-center gap-2 min-[400px]:flex-row">
							<a
								href="mailto:contacto@lazocns.cl"
								target="_blank"
								rel="noreferrer noopener"
								className={buttonVariants({
									variant: "outline",
									size: "lg",
									className: "border-secondary text-secondary hover:bg-secondary/10",
								})}>
								Email
								<Mail className="ml-2 h-4 w-4" />
							</a>
							<a
								href="https://calendly.com/maria-martinez-lazocns/conocemos"
								target="_blank"
								rel="noreferrer noopener"
								className={buttonVariants({
									variant: "outline",
									size: "lg",
									className: "border-secondary text-secondary hover:bg-secondary/10",
								})}>
								Agenda una reunión
								<CalendarFold className="ml-2 h-4 w-4" />
							</a>
							<a
								href="https://wa.me/+56952570413"
								className={buttonVariants({
									variant: "outline",
									size: "lg",
									className: "border-secondary text-secondary hover:bg-secondary/10",
								})}>
								Whatsapp
								<MessagesSquare className="ml-2 h-4 w-4" />
							</a>
						</div>
						<p className="text-muted-foreground text-sm">Elige cualquiera de estos medios</p>
					</div>
				</div>
			</section>
		</main>
	)
}
