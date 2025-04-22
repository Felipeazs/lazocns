"use client"

import { ChevronLeft, ChevronRight, HelpCircle, Info } from "lucide-react"
import { useState } from "react"

import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/client/components/ui/dialog"
import { Input } from "@/client/components/ui/input"
import { Progress } from "@/client/components/ui/progress"
import { Slider } from "@/client/components/ui/slider"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/client/components/ui/tooltip"
import { cn } from "@/client/lib/utils"

import { FODAResults } from "./foda-results"

const factorPlaceholders = {
	fortalezas: [
		"Recursos o capacidades únicas",
		"Ventajas competitivas",
		"Habilidades o experiencias únicas",
		"Ventajas de productos o servicios",
	],
	debilidades: [
		"Áreas que necesitan mejora",
		"Limitaciones de recursos",
		"Áreas de retroalimentación negativa",
		"Experiencia o brechas de experiencia",
	],
	oportunidades: [
		"Tendencias emergentes beneficiosas",
		"Cambios del mercado creando posibilidades",
		"Espacios de mercado para llenar",
		"Nuevas tecnologías para aprovechar",
	],
	amenazas: [
		"Obstáculos actuales",
		"Impactos de la competencia",
		"Riesgos de cronograma o éxito",
		"Restricciones de recursos",
	],
}

type FODACategory = "fortalezas" | "debilidades" | "oportunidades" | "amenazas"

interface FODAAnswer {
	factor: string // The custom factor text
	importancia: number // 0 to 1
	calificacion: number // 1 to 4
}

type FODAAnswers = Record<FODACategory, FODAAnswer[]>

const fodaDefaultAnswers = {
	fortalezas: Array.from({ length: 4 })
		.fill(0)
		.map((_) => ({
			factor: "",
			importancia: 0.5,
			calificacion: 2,
		})),
	debilidades: Array.from({ length: 4 })
		.fill(0)
		.map((_) => ({
			factor: "",
			importancia: 0.5,
			calificacion: 2,
		})),
	oportunidades: Array.from({ length: 4 })
		.fill(0)
		.map((_) => ({
			factor: "",
			importancia: 0.5,
			calificacion: 2,
		})),
	amenazas: Array.from({ length: 4 })
		.fill(0)
		.map((_) => ({
			factor: "",
			importancia: 0.5,
			calificacion: 2,
		})),
}

export default function FODAForm() {
	const [currentCategory, setCurrentCategory] = useState<FODACategory>("fortalezas")
	const [answers, setAnswers] = useState<FODAAnswers>(fodaDefaultAnswers)
	const [showResults, setShowResults] = useState(false)

	const categories: FODACategory[] = ["fortalezas", "debilidades", "oportunidades", "amenazas"]
	const categoryLabels = {
		fortalezas: "fortalezas",
		debilidades: "debilidades",
		oportunidades: "oportunidades",
		amenazas: "amenazas",
	}

	const categoryColors = {
		fortalezas: "bg-green-500",
		debilidades: "bg-amber-500",
		oportunidades: "bg-blue-500",
		amenazas: "bg-red-500",
	}

	const totalCategories = categories.length
	const currentCategoryIndex = categories.indexOf(currentCategory)
	const progress = ((currentCategoryIndex + 1) / totalCategories) * 100

	const handleFactorChange = (value: string, index: number) => {
		const newAnswers = { ...answers }
		newAnswers[currentCategory] = [...newAnswers[currentCategory]]
		newAnswers[currentCategory][index] = {
			...newAnswers[currentCategory][index],
			factor: value,
		}
		setAnswers(newAnswers)
	}

	const handleImportanceChange = (value: number[], index: number) => {
		const newAnswers = { ...answers }
		newAnswers[currentCategory] = [...newAnswers[currentCategory]]
		newAnswers[currentCategory][index] = {
			...newAnswers[currentCategory][index],
			importancia: value[0],
		}
		setAnswers(newAnswers)
	}

	const handleQualificationChange = (value: number[], index: number) => {
		const newAnswers = { ...answers }
		newAnswers[currentCategory] = [...newAnswers[currentCategory]]
		newAnswers[currentCategory][index] = {
			...newAnswers[currentCategory][index],
			calificacion: value[0],
		}
		setAnswers(newAnswers)
	}

	// Add a function to validate if enough factors have been entered
	const validateCategory = (category: FODACategory) => {
		const validFactors = answers[category].filter((answer) => answer.factor.trim() !== "").length
		return validFactors >= 3
	}

	// Add state for validation error
	const [validationError, setValidationError] = useState<string | null>(null)

	// Update the goToNextCategory function to include validation
	const goToNextCategory = () => {
		if (!validateCategory(currentCategory)) {
			setValidationError(
				`Please enter at least 3 factors for ${categoryLabels[currentCategory].toLowerCase()} before proceeding.`,
			)
			return
		}

		setValidationError(null)
		if (currentCategoryIndex < categories.length - 1) {
			setCurrentCategory(categories[currentCategoryIndex + 1])
		} else {
			setShowResults(true)
		}
		window.scrollTo({ top: 0 })
	}
	const goToPreviousCategory = () => {
		if (currentCategoryIndex > 0) {
			setCurrentCategory(categories[currentCategoryIndex - 1])
		}

		window.scrollTo({ top: 0 })
	}

	const restartAssessment = () => {
		setAnswers(fodaDefaultAnswers)
		setCurrentCategory("fortalezas")
		setShowResults(false)
	}

	const getQualificationLabel = (value: number) => {
		switch (value) {
			case 1:
				return "Pobre"
			case 2:
				return "Justa"
			case 3:
				return "Buena"
			case 4:
				return "Excelente"
			default:
				return "Justa"
		}
	}

	const getImportanceLabel = (value: number) => {
		if (value <= 0.25) {
			return "Baja"
		}
		if (value <= 0.5) {
			return "Moderada"
		}
		if (value <= 0.75) {
			return "Alta"
		}
		return "Crítica"
	}

	if (showResults) {
		return <FODAResults answers={answers} onRestart={restartAssessment} />
	}

	return (
		<div className="text-secondary max-w-[800px] space-y-6 lg:w-[800px]">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Análisis FODA</h1>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="sm" className="flex items-center gap-2">
							<HelpCircle className="h-4 w-4" />
							<span>Ayuda</span>
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Guía Análisis FODA</DialogTitle>
							<DialogDescription>
								Comprender cómo calificar los factores en su análisis FODA{" "}
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-6">
							<div>
								<h3 className="mb-2 text-lg font-medium">¿Qué es un análisis FODA?</h3>
								<p className="text-muted-foreground">
									El análisis de FODA (Fortaleza, debilidas, Oportunidades, Amenaza) lo ayuda a
									identificar factores internos y externos que afectan su proyecto u organización.
								</p>
							</div>

							<div>
								<h3 className="mb-2 text-lg font-medium">Importancia (0-1)</h3>
								<p className="text-muted-foreground mb-2">
									La importancia mide cuán significativo es un factor para su éxito:
								</p>
								<ul className="text-muted-foreground list-disc space-y-1 pl-5">
									<li>
										<span className="font-medium">0.00-0.25 (Baja)</span>: Impacto mínimo en los
										resultados
									</li>
									<li>
										<span className="font-medium">0.26-0.50 (Moderada)</span>: Notable pero no
										crítico
									</li>
									<li>
										<span className="font-medium">0.51-0.75 (Alta)</span>: Impacto significativo en
										el éxito
									</li>
									<li>
										<span className="font-medium">0.76-1.00 (Crítica)</span>: Esencial para el éxito
										o el fracaso
									</li>
								</ul>
							</div>

							<div>
								<h3 className="mb-2 text-lg font-medium">Calificación (1-4)</h3>
								<p className="text-muted-foreground mb-2">
									La calificación mide qué tan bien se desempeña en esta área:
								</p>
								<ul className="text-muted-foreground list-disc space-y-1 pl-5">
									<li>
										<span className="font-medium">1 (Pobre)</span>: Desventaja o debilidad
										significativa
									</li>
									<li>
										<span className="font-medium">2 (Justa)</span>: Rendimiento por debajo del
										promedio
									</li>
									<li>
										<span className="font-medium">3 (Buena)</span>: Rendimiento superior al promedio
									</li>
									<li>
										<span className="font-medium">4 (Excelente)</span>: Rendimiento o ventaja
										sobresaliente
									</li>
								</ul>
							</div>

							<div>
								<h3 className="mb-2 text-lg font-medium">Puntaje Ponderado</h3>
								<p className="text-muted-foreground">
									El puntaje ponderado (importancia × calificación) ayuda a priorizar los factores.
									Los puntajes más altos para Fortaleza y Oportunidadas son mejores, mientras que
									los puntajes más altos para debilidas y amenaza indican áreas que necesitan
									atención.
								</p>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<p className="text-muted-foreground">
				Ingrese sus propios factores y califíquelos en función de la importancia (0-1) y
				calificación (1-4).
			</p>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium">
						Categoría {currentCategoryIndex + 1} de {totalCategories}
					</span>
					<span className="text-sm font-medium">{categoryLabels[currentCategory]}</span>
				</div>
				<Progress value={progress} className="h-2" />
			</div>

			<Card className="border-t-4">
				<CardHeader>
					<div
						className={cn(
							"mb-2 inline-block rounded-lg px-3 py-1 text-sm font-medium text-white",
							categoryColors[currentCategory],
						)}>
						{categoryLabels[currentCategory]}
					</div>
					<CardTitle className="text-xl">
						Ingrese y califique su {categoryLabels[currentCategory].toLowerCase()}
					</CardTitle>
					<CardDescription>
						Ingrese sus propios factores y califíquelos en función de la importancia y la
						calificación.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-8">
					{Array.from({ length: 4 })
						.fill(0)
						.map((_, index) => {
							const currentAnswer = answers[currentCategory][index] || {
								factor: "",
								importance: 0.5,
								qualification: 2,
							}

							return (
								<div key={index} className="rounded-md border p-4">
									<div className="mb-4">
										<div className="mb-2 flex items-center justify-between">
											<label className="text-sm font-medium">Factor {index + 1}</label>
										</div>
										<Input
											value={currentAnswer.factor}
											onChange={(e) => handleFactorChange(e.target.value, index)}
											placeholder={`Ingresa ${categoryLabels[currentCategory].toLowerCase()} (ej., ${factorPlaceholders[currentCategory][index]})`}
											className="w-full"
										/>
									</div>

									<div className="space-y-6">
										<div className="space-y-4">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2">
													<label className="text-sm font-medium">
														Importancia: {getImportanceLabel(currentAnswer.importancia)} (
														{currentAnswer.importancia.toFixed(2)})
													</label>
													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger asChild>
																<Info className="text-muted-foreground h-4 w-4 cursor-help" />
															</TooltipTrigger>
															<TooltipContent className="max-w-xs">
																<p>
																	La importancia (0-1) mide cuán significativo es este factor para
																	su éxito.
																</p>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												</div>
												<span className="text-muted-foreground text-xs">0 to 1</span>
											</div>
											<Slider
												defaultValue={[currentAnswer.importancia]}
												max={1}
												step={0.01}
												value={[currentAnswer.importancia]}
												onValueChange={(value) => handleImportanceChange(value, index)}
												className="py-4"
											/>
											<div className="text-muted-foreground flex justify-between text-xs">
												<span>Baja</span>
												<span>Moderada</span>
												<span>Alta</span>
												<span>Crítica</span>
											</div>
										</div>

										<div className="space-y-4">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2">
													<label className="text-sm font-medium">
														Calificación: {getQualificationLabel(currentAnswer.calificacion)} (
														{currentAnswer.calificacion})
													</label>
													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger asChild>
																<Info className="text-muted-foreground h-4 w-4 cursor-help" />
															</TooltipTrigger>
															<TooltipContent className="max-w-xs">
																<p>
																	La calificación (1-4) mide qué tan bien se desempeña en esta área.
																</p>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												</div>
												<span className="text-muted-foreground text-xs">1 to 4</span>
											</div>
											<Slider
												defaultValue={[currentAnswer.calificacion]}
												min={1}
												max={4}
												step={1}
												value={[currentAnswer.calificacion]}
												onValueChange={(value) => handleQualificationChange(value, index)}
												className="py-4"
											/>
											<div className="text-muted-foreground flex justify-between text-xs">
												<span>Pobre</span>
												<span>Justa</span>
												<span>Buena</span>
												<span>Excelente</span>
											</div>
										</div>
									</div>
								</div>
							)
						})}
				</CardContent>
				<CardFooter className="flex flex-col gap-4">
					{validationError && (
						<div className="w-full rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
							{validationError}
						</div>
					)}
					<div className="flex w-full justify-between">
						<Button
							variant="outline"
							onClick={goToPreviousCategory}
							disabled={currentCategoryIndex === 0}>
							<ChevronLeft className="mr-2 h-4 w-4" />
							Categoría Anterior
						</Button>
						<Button onClick={goToNextCategory} disabled={!validateCategory(currentCategory)}>
							{currentCategoryIndex === categories.length - 1 ? "Terminar" : "Siguiente Categoría"}
							<ChevronRight className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
