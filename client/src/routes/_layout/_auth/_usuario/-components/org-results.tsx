import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { Progress } from "@/client/components/ui/progress"

import type { CapacityFactor } from "./org-form"

interface IORGResults {
	factors: CapacityFactor[]
	qualificationLabel: (value: number) => "Pobre" | "Justa" | "Buena" | "Excelente"
}

export default function ORGResults({ factors, qualificationLabel }: IORGResults) {
	const calculateFactorScores = () => {
		return factors.map((factor) => {
			const weightedScores = factor.questions.map((q) => q.importance * q.qualification)
			const totalWeightedScore = weightedScores.reduce((sum, score) => sum + score, 0)

			// Determine capacity level based on total weighted score
			let capacityLevel = ""
			let capacityColor = ""

			if (totalWeightedScore <= 1.75) {
				capacityLevel = "Débil"
				capacityColor = "text-red-400 bg-red-50"
			} else if (totalWeightedScore <= 2.5) {
				capacityLevel = "Limitada"
				capacityColor = "text-amber-400 bg-amber-50"
			} else if (totalWeightedScore <= 3.25) {
				capacityLevel = "Moderada"
				capacityColor = "text-blue-400 bg-blue-50"
			} else {
				capacityLevel = "Alta"
				capacityColor = "text-green-400 bg-green-50"
			}

			return {
				factor,
				weightedScores,
				totalWeightedScore,
				capacityLevel,
				capacityColor,
			}
		})
	}

	const getCapacityColor = (weightedScore: number) => {
		if (weightedScore <= 1.75) {
			return "bg-red-400"
		} else if (weightedScore <= 2.5) {
			return "bg-amber-400"
		} else if (weightedScore <= 3.25) {
			return "bg-blue-400"
		} else {
			return "bg-green-400"
		}
	}

	const factorScores = calculateFactorScores()

	// Get description for capacity level
	const getCapacityDescription = (level: string) => {
		switch (level) {
			case "Débil":
				return "La organización presenta grandes brechas. Requiere mejoras estructurales urgentes."
			case "Limitada":
				return "Capacidad básica. Se requieren acciones correctivas y fortalecimiento."
			case "Moderada":
				return "Buenas capacidades en desarrollo, pero aún con aspectos por mejorar."
			case "Alta":
				return "Capacidad consolidada. Listos para ejecutar o escalar proyectos con éxito."
			default:
				return ""
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Resumen Capacidad Organizacional</CardTitle>
				<CardDescription>
					Descripción general de la capacidad de su organización a través de las dimensiones clave
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6 md:grid-cols-2">
					{factorScores.map(({ factor, totalWeightedScore, capacityLevel, capacityColor }) => (
						<Card key={factor.id} className="relative overflow-hidden">
							<div
								className={`${getCapacityColor(totalWeightedScore)} abosolute top-0 h-2 w-full`}
							/>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">{factor.name}</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground text-sm">Capacidad:</span>
									<span className={`rounded-md px-2 py-1 text-sm font-medium ${capacityColor}`}>
										{capacityLevel}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground text-sm">Puntaje:</span>
									<span className="text-sm font-bold">{totalWeightedScore.toFixed(2)}/4.00</span>
								</div>
								<Progress
									value={(totalWeightedScore / 4) * 100}
									className="mt-2 h-2"
									indicatorClassName={capacityColor.split(" ")[0].replace("text", "bg")}
								/>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="mt-8 space-y-6">
					<h3 className="text-xl font-bold">Análisis Detallado</h3>

					{factorScores.map(
						({ factor, weightedScores, totalWeightedScore, capacityLevel, capacityColor }) => (
							<Card key={`detail-${factor.id}`} className="overflow-hidden">
								<div
									className={`h-2 w-full ${capacityColor.split(" ")[0].replace("text", "bg")}`}
								/>
								<CardHeader>
									<div className="flex items-center justify-between">
										<CardTitle>{factor.name}</CardTitle>
										<span className={`rounded-md px-2 py-1 text-sm font-medium ${capacityColor}`}>
											{capacityLevel} ({totalWeightedScore.toFixed(2)})
										</span>
									</div>
									<CardDescription>{factor.description}</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="bg-accent/70 rounded-md p-4">
										<h4 className="mb-2 font-medium">Interpretación</h4>
										<p className="text-muted-foreground text-sm">
											{getCapacityDescription(capacityLevel)}
										</p>
									</div>

									<div className="space-y-4">
										<h4 className="font-medium">Desglose de Factores</h4>
										{factor.questions.map((question, index) => (
											<div key={question.id} className="rounded-md border p-3">
												<p className="mb-2 text-sm">{question.text}</p>
												<div className="grid grid-cols-3 gap-2 text-sm">
													<div className="bg-accent/30 rounded-md p-2">
														<span className="text-muted-foreground block text-xs">Importancia</span>
														<span className="font-medium">{question.importance.toFixed(2)}</span>
													</div>
													<div className="bg-accent/30 rounded-md p-2">
														<span className="text-muted-foreground block text-xs">
															Calificación
														</span>
														<span className="font-medium">
															{question.qualification} ({qualificationLabel(question.qualification)}
															)
														</span>
													</div>
													<div className="bg-primary/10 rounded-md p-2">
														<span className="text-muted-foreground block text-xs">
															Puntaje ponderado
														</span>
														<span className="font-medium">{weightedScores[index].toFixed(2)}</span>
													</div>
												</div>
											</div>
										))}
									</div>

									<div className="rounded-md border border-dashed p-4">
										<h4 className="mb-2 font-medium">Recomendaciones</h4>
										<p className="text-muted-foreground text-sm">
											{capacityLevel === "Débil" &&
												"Concéntrese en la construcción de capacidades fundamentales en esta área. Considere desarrollar un plan de mejora integral con hitos claros."}
											{capacityLevel === "Limitada" &&
												"Trabaje para fortalecer las capacidades existentes y abordar las brechas clave. Priorizar mejoras que tendrán el impacto más significativo."}
											{capacityLevel === "Moderada" &&
												"Construya sobre sus bases sólidas refinando procesos y abordando áreas específicas de mejora. Busque oportunidades para innovar."}
											{capacityLevel === "Alta" &&
												"Mantenga su posición fuerte y comparta las mejores prácticas en toda la organización. Considere cómo puede aprovechar esta fuerza para mejorar otras áreas."}
										</p>
									</div>
								</CardContent>
							</Card>
						),
					)}
				</div>

				<div className="bg-accent mt-8 rounded-md p-4">
					<h3 className="mb-2 text-lg font-bold">Capacidad Organizacional General</h3>
					{(() => {
						const overallScore =
							factorScores.reduce((sum, { totalWeightedScore }) => sum + totalWeightedScore, 0) / 4
						let overallLevel = ""
						let overallColor = ""

						if (overallScore <= 1.75) {
							overallLevel = "Débil"
							overallColor = "text-red-400"
						} else if (overallScore <= 2.5) {
							overallLevel = "Limitada"
							overallColor = "text-amber-400"
						} else if (overallScore <= 3.25) {
							overallLevel = "Moderada"
							overallColor = "text-blue-400"
						} else {
							overallLevel = "Alta"
							overallColor = "text-green-400"
						}

						return (
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Cacidad:</span>
									<span className={`font-bold ${overallColor}`}>
										{overallLevel} ({overallScore.toFixed(2)}/4.00)
									</span>
								</div>
								<Progress
									value={(overallScore / 4) * 100}
									className="h-3"
									indicatorClassName={overallColor.replace("text", "bg")}
								/>
								<p className="text-muted-foreground mt-4 text-sm">
									{overallLevel === "Débil" &&
										"Su organización tiene importantes desafíos de capacidad que deben abordarse para lograr su misión de manera efectiva. Concéntrese en la creación de capacidades fundamentales en todas las dimensiones."}
									{overallLevel === "Limitada" &&
										"Su organización tiene una capacidad básica pero requiere un desarrollo sustancial para alcanzar su máximo potencial. Priorice las mejoras en las áreas más débiles al tiempo que fortalece las capacidades existentes."}
									{overallLevel === "Moderada" &&
										"Su organización tiene una capacidad adecuada con espacio para la mejora. Construya sobre sus bases sólidas refinando procesos y abordando áreas específicas de mejora."}
									{overallLevel === "Alta" &&
										"Su organización tiene una gran capacidad en las dimensiones clave. Mantenga su posición fuerte y continúe innovando y mejorando para mantenerse a la vanguardia de cambiar las demandas."}
								</p>
							</div>
						)
					})()}
				</div>
			</CardContent>
		</Card>
	)
}
