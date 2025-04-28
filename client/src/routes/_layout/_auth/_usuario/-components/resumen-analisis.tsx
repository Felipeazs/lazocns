"use client"

import { useNavigate } from "@tanstack/react-router"
import { ArrowRight, BarChart, CheckSquare, Gauge, Grid3X3 } from "lucide-react"

import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { Progress } from "@/client/components/ui/progress"

// Mock data for FODA Analysis
const fodaData = {
	strengths: { score: 3.2, count: 4 },
	weaknesses: { score: 2.1, count: 4 },
	opportunities: { score: 2.8, count: 4 },
	threats: { score: 1.9, count: 3 },
	overallScore: 2.0,
}

// Mock data for VRIO Analysis
const vrioData = {
	value: { score: 2, label: "Medio" },
	rarity: { score: 1, label: "Bajo" },
	imitability: { score: 3, label: "Alto" },
	organization: { score: 2, label: "Medio" },
	status: "Ventaja Competitiva Temporal",
	totalScore: 8,
}

// Mock data for Capacity Evaluation
const capacityData = {
	people: { score: 2.3, level: "Limitda" },
	processes: { score: 1.7, level: "Débil" },
	technology: { score: 3.1, level: "Moderada" },
	culture: { score: 2.6, level: "Moderada" },
	overallScore: 2.4,
	overallLevel: "Limitda",
}
export default function ResumenAnalisis() {
	const navigate = useNavigate()
	const internalFactors = fodaData.strengths.score - fodaData.weaknesses.score
	const externalFactors = fodaData.opportunities.score - fodaData.threats.score

	// Get capacity level color
	const getCapacityLevelColor = (level: string) => {
		switch (level) {
			case "Débil":
				return "text-red-600"
			case "Limitada":
				return "text-amber-600"
			case "Moderada":
				return "text-blue-600"
			case "Alta":
				return "text-green-600"
			default:
				return "text-muted-foreground"
		}
	}

	// Get VRIO status color
	const getVrioStatusColor = (status: string) => {
		if (status.includes("Sustentable")) {
			return "text-green-600"
		}
		if (status.includes("Temporal")) {
			return "text-blue-600"
		}
		if (status.includes("Paridad")) {
			return "text-amber-600"
		}
		return "text-red-600"
	}
	return (
		<>
			<div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
				<Card className="overflow-hidden">
					<div className="bg-primary h-2 w-full" />
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between">
							<CardTitle className="flex items-center gap-2 text-lg">
								<BarChart className="text-primary h-5 w-5" />
								Análisis FODA
							</CardTitle>
							<span
								className={`rounded-full px-2 py-1 text-xs font-medium ${
									fodaData.overallScore > 0
										? "bg-green-100 text-green-800"
										: "bg-amber-100 text-amber-800"
								}`}>
								Puntaje: {fodaData.overallScore.toFixed(1)}
							</span>
						</div>
						<CardDescription>Fortalezas, Debilidades, Oportunidades, Amenazas</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-2">
							<div className="rounded-md bg-green-50 p-2">
								<div className="text-muted-foreground text-xs">Fortalezas</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-green-700">
										{fodaData.strengths.count} factores
									</span>
									<span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-800">
										{fodaData.strengths.score.toFixed(1)}
									</span>
								</div>
							</div>
							<div className="rounded-md bg-amber-50 p-2">
								<div className="text-muted-foreground text-xs">Debilidades</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-amber-700">
										{fodaData.weaknesses.count} factores
									</span>
									<span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-800">
										{fodaData.weaknesses.score.toFixed(1)}
									</span>
								</div>
							</div>
							<div className="rounded-md bg-blue-50 p-2">
								<div className="text-muted-foreground text-xs">Oportunidades</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-blue-700">
										{fodaData.opportunities.count} factores
									</span>
									<span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-800">
										{fodaData.opportunities.score.toFixed(1)}
									</span>
								</div>
							</div>
							<div className="rounded-md bg-red-50 p-2">
								<div className="text-muted-foreground text-xs">Amenazas</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-red-700">
										{fodaData.threats.count} factores
									</span>
									<span className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-800">
										{fodaData.threats.score.toFixed(1)}
									</span>
								</div>
							</div>
						</div>

						<div className="bg-accent/50 rounded-md p-3">
							<div className="text-muted-foreground mb-1 text-xs">Posición Estratégica</div>
							<div className="grid grid-cols-2 gap-2">
								<div className="flex items-center justify-between">
									<span className="text-xs">Interna (F-D)</span>
									<span
										className={`rounded px-1.5 py-0.5 text-xs ${
											internalFactors > 0
												? "bg-green-100 text-green-800"
												: "bg-amber-100 text-amber-800"
										}`}>
										{internalFactors.toFixed(1)}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-xs">Externa (O-A)</span>
									<span
										className={`rounded px-1.5 py-0.5 text-xs ${
											externalFactors > 0
												? "bg-green-100 text-green-800"
												: "bg-amber-100 text-amber-800"
										}`}>
										{externalFactors.toFixed(1)}
									</span>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							variant="ghost"
							className="w-full justify-between"
							onClick={() => navigate({ to: "/foda" })}>
							<span>Ver Análisis Completo</span>
							<ArrowRight className="h-4 w-4" />
						</Button>
					</CardFooter>
				</Card>

				{/* VRIO Analysis Summary */}
				<Card className="overflow-hidden">
					<div className="bg-secondary h-2 w-full" />
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between">
							<CardTitle className="flex items-center gap-2 text-lg">
								<Grid3X3 className="text-secondary h-5 w-5" />
								Análisis VRIO
							</CardTitle>
							<span className="bg-secondary/10 text-secondary rounded-full px-2 py-1 text-xs font-medium">
								Score: {vrioData.totalScore}/12
							</span>
						</div>
						<CardDescription>Valor, Rareza, Imitabilidad, Organización</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-2">
							<div className="bg-accent/30 rounded-md p-2">
								<div className="text-muted-foreground text-xs">Valor</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">{vrioData.value.label}</span>
									<span className="bg-secondary/20 text-secondary rounded px-1.5 py-0.5 text-xs">
										{vrioData.value.score}/3
									</span>
								</div>
							</div>
							<div className="bg-accent/30 rounded-md p-2">
								<div className="text-muted-foreground text-xs">Rareza</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">{vrioData.rarity.label}</span>
									<span className="bg-secondary/20 text-secondary rounded px-1.5 py-0.5 text-xs">
										{vrioData.rarity.score}/3
									</span>
								</div>
							</div>
							<div className="bg-accent/30 rounded-md p-2">
								<div className="text-muted-foreground text-xs">Imitabilidad</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">{vrioData.imitability.label}</span>
									<span className="bg-secondary/20 text-secondary rounded px-1.5 py-0.5 text-xs">
										{vrioData.imitability.score}/3
									</span>
								</div>
							</div>
							<div className="bg-accent/30 rounded-md p-2">
								<div className="text-muted-foreground text-xs">Organización</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">{vrioData.organization.label}</span>
									<span className="bg-secondary/20 text-secondary rounded px-1.5 py-0.5 text-xs">
										{vrioData.organization.score}/3
									</span>
								</div>
							</div>
						</div>

						<div className="bg-accent/50 rounded-md p-3">
							<div className="text-muted-foreground mb-1 text-xs">Estatus Competitivo</div>
							<div className="flex items-center justify-between">
								<span className={`text-sm font-medium ${getVrioStatusColor(vrioData.status)}`}>
									{vrioData.status}
								</span>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							variant="ghost"
							className="w-full justify-between"
							onClick={() => navigate({ to: "/vrio" })}>
							<span>Ver Análisis Completo</span>
							<ArrowRight className="h-4 w-4" />
						</Button>
					</CardFooter>
				</Card>

				{/* Capacity Evaluation Summary */}
				<Card className="overflow-hidden">
					<div className="h-2 w-full bg-blue-500" />
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between">
							<CardTitle className="flex items-center gap-2 text-lg">
								<Gauge className="h-5 w-5 text-blue-500" />
								Organizacional
							</CardTitle>
							<span
								className={`rounded-full px-2 py-1 text-xs font-medium ${
									capacityData.overallLevel === "Weak"
										? "bg-red-100 text-red-800"
										: capacityData.overallLevel === "Limited"
											? "bg-amber-100 text-amber-800"
											: capacityData.overallLevel === "Moderate"
												? "bg-blue-100 text-blue-800"
												: "bg-green-100 text-green-800"
								}`}>
								{capacityData.overallLevel}
							</span>
						</div>
						<CardDescription>Personas, Procesos, Tecnologías, Cultura</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<div className="space-y-1">
								<div className="flex items-center justify-between text-xs">
									<span>Personas</span>
									<span className={getCapacityLevelColor(capacityData.people.level)}>
										{capacityData.people.score.toFixed(1)} - {capacityData.people.level}
									</span>
								</div>
								<Progress value={(capacityData.people.score / 4) * 100} className="h-1.5" />
							</div>

							<div className="space-y-1">
								<div className="flex items-center justify-between text-xs">
									<span>Procesos</span>
									<span className={getCapacityLevelColor(capacityData.processes.level)}>
										{capacityData.processes.score.toFixed(1)} - {capacityData.processes.level}
									</span>
								</div>
								<Progress value={(capacityData.processes.score / 4) * 100} className="h-1.5" />
							</div>

							<div className="space-y-1">
								<div className="flex items-center justify-between text-xs">
									<span>Tecnología</span>
									<span className={getCapacityLevelColor(capacityData.technology.level)}>
										{capacityData.technology.score.toFixed(1)} - {capacityData.technology.level}
									</span>
								</div>
								<Progress value={(capacityData.technology.score / 4) * 100} className="h-1.5" />
							</div>

							<div className="space-y-1">
								<div className="flex items-center justify-between text-xs">
									<span>Cultura</span>
									<span className={getCapacityLevelColor(capacityData.culture.level)}>
										{capacityData.culture.score.toFixed(1)} - {capacityData.culture.level}
									</span>
								</div>
								<Progress value={(capacityData.culture.score / 4) * 100} className="h-1.5" />
							</div>
						</div>

						<div className="bg-accent/50 rounded-md p-3">
							<div className="text-muted-foreground mb-1 text-xs">Capacidad General</div>
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium">
									Puntaje: {capacityData.overallScore.toFixed(1)}/4.00
								</span>
								<span
									className={`text-sm font-medium ${getCapacityLevelColor(capacityData.overallLevel)}`}>
									{capacityData.overallLevel}
								</span>
							</div>
							<Progress
								value={(capacityData.overallScore / 4) * 100}
								className="mt-2 h-2"
								indicatorClassName={
									capacityData.overallLevel === "Weak"
										? "bg-red-500"
										: capacityData.overallLevel === "Limited"
											? "bg-amber-500"
											: capacityData.overallLevel === "Moderate"
												? "bg-blue-500"
												: "bg-green-500"
								}
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							variant="ghost"
							className="w-full justify-between"
							onClick={() => navigate({ to: "/org" })}>
							<span>Ver Análisis Completo</span>
							<ArrowRight className="h-4 w-4" />
						</Button>
					</CardFooter>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Análisis</CardTitle>
					<CardDescription>Conclusiones clave de tus evaluaciones organizacionales</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid gap-4 md:grid-cols-3">
						<div className="rounded-md border p-4">
							<div className="mb-2 flex items-center gap-2">
								<BarChart className="text-primary h-5 w-5" />
								<h3 className="font-medium">FODA</h3>
							</div>
							<p className="text-muted-foreground text-sm">
								{fodaData.overallScore > 0
									? "Su organización tiene una posición moderadamente favorable. Concéntrese en aprovechar las fortalezas mientras aborda las debilidades clave."
									: "Su posición enfrenta desafíos. Abordar las debilidades críticas y mitigar las amenazas para mejorar su posición estratégica."}
							</p>
						</div>

						<div className="rounded-md border p-4">
							<div className="mb-2 flex items-center gap-2">
								<Grid3X3 className="text-secondary h-5 w-5" />
								<h3 className="font-medium">VRIO</h3>
							</div>
							<p className="text-muted-foreground text-sm">
								{vrioData.status === "Ventaja competitiva sostenible"
									? "Sus recursos proporcionan una ventaja competitiva sostenible. Continúe protegiendo y aprovechando estos valiosos activos."
									: vrioData.status === "Ventaja competitiva temporal"
										? "Sus recursos proporcionan una ventaja temporal. Trabaje para mejorar la imitabilidad para mantener su ventaja."
										: "Sus recursos necesitan desarrollo para crear una posición competitiva más fuerte. Concéntrese en el valor del edificio y la rareza."}
							</p>
						</div>

						<div className="rounded-md border p-4">
							<div className="mb-2 flex items-center gap-2">
								<Gauge className="h-5 w-5 text-blue-500" />
								<h3 className="font-medium">Organizacional</h3>
							</div>
							<p className="text-muted-foreground text-sm">
								{capacityData.overallLevel === "Débil"
									? "Su organización tiene importantes desafíos de capacidad. Concéntrese en la creación de capacidades fundamentales."
									: capacityData.overallLevel === "Limitada"
										? "Su organización tiene capacidad básica pero requiere desarrollo. Priorizar mejoras en las áreas más débiles."
										: capacityData.overallLevel === "Moderada"
											? "Su organización tiene una capacidad adecuada con espacio para la mejora. Construye sobre tu base sólida."
											: "Su organización tiene una gran capacidad. Mantenga su posición y continúe innovando."}
							</p>
						</div>
					</div>

					<div className="bg-accent/30 rounded-md p-4">
						<h3 className="mb-2 font-medium">Acciones recomendadas</h3>
						<ul className="space-y-2 text-sm">
							<li className="flex items-start gap-2">
								<div className="bg-primary mt-0.5 rounded-full p-1">
									<CheckSquare className="h-3 w-3 text-white" />
								</div>
								<span>
									{fodaData.weaknesses.score > 2.5
										? "Abordar las debilidades de alta prioridad identificadas en el análisis FODA."
										: "Aproveche las fortalezas clave para capitalizar las oportunidades identificadas."}
								</span>
							</li>
							<li className="flex items-start gap-2">
								<div className="bg-primary mt-0.5 rounded-full p-1">
									<CheckSquare className="h-3 w-3 text-white" />
								</div>
								<span>
									{vrioData.organization.score < 2
										? "Mejorar las estructuras organizacionales para aprovechar mejor sus valiosos recursos."
										: "Desarrolle estrategias para mejorar la rareza e inimitabilidad de sus recursos clave."}
								</span>
							</li>
							<li className="flex items-start gap-2">
								<div className="bg-primary mt-0.5 rounded-full p-1">
									<CheckSquare className="h-3 w-3 text-white" />
								</div>
								<span>
									{capacityData.processes.score < capacityData.people.score
										? "Concéntrese en mejorar los procesos comerciales para mejorar la capacidad organizacional general."
										: "Invierta en tecnología y desarrollo de personas para fortalecer las capacidades organizacionales."}
								</span>
							</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		</>
	)
}
