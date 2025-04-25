"use client"

import { AlertTriangle, HelpCircle, Info, Lock } from "lucide-react"
import { useEffect, useState } from "react"

import { ImportanceInfo, QualificationInfo } from "@/client/components/helpers"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/client/components/ui/accordion"
import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
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
import { Label } from "@/client/components/ui/label"
import { Slider } from "@/client/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/client/components/ui/tooltip"

import ORGResults from "./org-results"

// Define the structure for capacity factors and questions
interface CapacityQuestion {
	id: string
	text: string
	importance: number // 0 to 1
	qualification: number // 1 to 4
}

export interface CapacityFactor {
	id: string
	name: string
	description: string
	questions: CapacityQuestion[]
}

export default function ORGForm() {
	const [factors, setFactors] = useState<CapacityFactor[]>([
		{
			id: "people",
			name: "Personas",
			description: "Evaluación de recursos humanos, habilidades y capacidades",
			questions: [
				{
					id: "people-1",
					text: "¿Su organización tiene el número correcto de personas con habilidades apropiadas para lograr sus objetivos?",
					importance: 0.1,
					qualification: 1,
				},
				{
					id: "people-2",
					text: "¿Su organización desarrolla, comprende y retiene a empleados talentosos?",
					importance: 0.1,
					qualification: 1,
				},
			],
		},
		{
			id: "processes",
			name: "Procesos",
			description: "Evaluación de procedimientos operativos y flujos de trabajo",
			questions: [
				{
					id: "processes-1",
					text: "¿Los procesos de su organización están bien documentados, eficientes y se siguen constantemente?",
					importance: 0.1,
					qualification: 1,
				},
				{
					id: "processes-2",
					text: "¿Su organización revisa y mejora regularmente sus procesos para mejorar el rendimiento?",
					importance: 0.1,
					qualification: 1,
				},
			],
		},
		{
			id: "technology",
			name: "Tecnología",
			description: "Evaluación de infraestructura y herramientas tecnológicas",
			questions: [
				{
					id: "technology-1",
					text: "¿Su organización tiene la infraestructura tecnológica adecuada para apoyar sus operaciones?",
					importance: 0.1,
					qualification: 1,
				},
				{
					id: "technology-2",
					text: "¿Su Organización Tiene la Infraestructura Tecnológica adecuada para apoyar sus operaciones?",
					importance: 0.1,
					qualification: 1,
				},
			],
		},
		{
			id: "culture",
			name: "Cultura",
			description: "Evaluación de valores, comportamientos y normas organizacionales",
			questions: [
				{
					id: "culture-1",
					text: "¿Su organización tiene una cultura claramente definida que respalda su misión y estrategia?",
					importance: 0.1,
					qualification: 1,
				},
				{
					id: "culture-2",
					text: "¿La cultura de su organización promueve la colaboración, la innovación y la mejora continua?",
					importance: 0.1,
					qualification: 1,
				},
			],
		},
	])

	// Track importance totals for each factor
	const [importanceTotals, setImportanceTotals] = useState<Record<string, number>>({
		people: 0,
		processes: 0,
		technology: 0,
		culture: 0,
	})

	const [activeTab, setActiveTab] = useState<string>("evaluation")

	// Calculate importance totals whenever factors change
	useEffect(() => {
		const newTotals: Record<string, number> = {}

		factors.forEach((factor) => {
			newTotals[factor.id] = factor.questions.reduce(
				(sum, question) => sum + question.importance,
				0,
			)
		})

		setImportanceTotals(newTotals)
	}, [factors])

	// Check if all importance totals are valid (equal to 1)
	const areAllImportanceTotalsValid = () => {
		return Object.values(importanceTotals).every((total) => Math.abs(total - 1) <= 0.01)
	}

	// Handle importance change for a question
	const handleImportanceChange = (factorId: string, questionId: string, value: number[]) => {
		setFactors((prevFactors) => {
			return prevFactors.map((factor) => {
				if (factor.id === factorId) {
					return {
						...factor,
						questions: factor.questions.map((question) => {
							if (question.id === questionId) {
								return {
									...question,
									importance: value[0],
								}
							}
							return question
						}),
					}
				}
				return factor
			})
		})
	}

	// Handle qualification change for a question
	const handleQualificationChange = (factorId: string, questionId: string, value: number[]) => {
		setFactors((prevFactors) => {
			return prevFactors.map((factor) => {
				if (factor.id === factorId) {
					return {
						...factor,
						questions: factor.questions.map((question) => {
							if (question.id === questionId) {
								return {
									...question,
									qualification: value[0],
								}
							}
							return question
						}),
					}
				}
				return factor
			})
		})
	}

	// Function to normalize importance values for a factor to sum to 1
	const normalizeImportance = (factorId: string) => {
		setFactors((prevFactors) => {
			return prevFactors.map((factor) => {
				if (factor.id === factorId) {
					const totalImportance = factor.questions.reduce((sum, q) => sum + q.importance, 0)

					// If total is already 1 (or very close) or is 0, no need to normalize
					if (Math.abs(totalImportance - 1) < 0.01 || totalImportance === 0) {
						return factor
					}

					return {
						...factor,
						questions: factor.questions.map((question) => ({
							...question,
							importance:
								totalImportance > 0
									? question.importance / totalImportance
									: 1 / factor.questions.length, // Equal distribution if total is 0
						})),
					}
				}
				return factor
			})
		})
	}

	// Get label for qualification value
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

	// Get label for importance value
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

	// Handle tab change
	const handleTabChange = (value: string) => {
		// Only allow changing to results tab if all importance totals are valid
		if (value === "results" && !areAllImportanceTotalsValid()) {
			return
		}
		setActiveTab(value)
	}

	const getNotas = (rating: number): string => {
		const notas: Record<number, string> = {
			1: "El factor está ausente, es débil o funciona de forma deficiente. No hay evidencia de avance o implementación.",
			2: "Hay esfuerzos iniciales o presencia parcial del factor, pero aún es insuficiente o inconsistente.",
			3: "El factor está implementado de forma funcional. Puede tener áreas de mejora, pero es operativo.",
			4: "El factor está completamente desarrollado y sistematizado. Es una fortaleza de la organización.",
		}
		return notas[rating]
	}

	return (
		<div className="max-w-[700px] space-y-6 lg:w-[700px]">
			<div className="flex items-center justify-between">
				<h1 className="text-secondary text-3xl font-bold">
					Evaluación de Capacidad Organizacional
				</h1>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="sm" className="flex items-center gap-2">
							<HelpCircle className="h-4 w-4" />
							<span>Ayuda</span>
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Guía de Evaluación de Capacidad Organizacional</DialogTitle>
							<DialogDescription>
								Comprender cómo evaluar la capacidad organizacional
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-6">
							<div>
								<h3 className="mb-2 text-lg font-medium">¿Qué es la capacidad organizacional?</h3>
								<p className="text-muted-foreground">
									La capacidad de la organización se refiere a la capacidad de una organización para
									cumplir su misión a través de una combinación de gestión sólida, una fuerte
									gobernanza y una dedicación persistente para lograr resultados.
								</p>
							</div>

							<div>
								<h3 className="mb-2 text-lg font-medium">Sistema de evaluación</h3>
								<p className="text-muted-foreground mb-2">
									Cada factor es evaluado en dos dimensiones:
								</p>
								<ul className="text-muted-foreground list-disc space-y-3 pl-5">
									<li>
										<span className="font-medium">Importancia (0-1):</span> Qué crítico es este
										aspecto para el éxito de su organización. La suma de valores de importancia para
										las preguntas de cada factor debe ser igual a 1.
									</li>
									<li>
										<span className="font-medium">Calificación (1-4):</span> Qué tan bien se
										desempeña su organización en esta área.
										<ul className="mt-1 list-disc pl-5">
											<li>
												<span className="font-medium">1 - Pobre:</span> Existen deficiencias
												significativas
											</li>
											<li>
												<span className="font-medium">2 - Justa:</span> Funcionalidad básica con
												brechas notables
											</li>
											<li>
												<span className="font-medium">3 - Buena:</span> Rendimiento sólido con áreas
												menores para mejorar
											</li>
											<li>
												<span className="font-medium">4 - Excelente:</span> Rendimiento excepcional,
												nivel de mejores prácticas
											</li>
										</ul>
									</li>
								</ul>
							</div>

							<div>
								<h3 className="mb-2 text-lg font-medium">Niveles de capacidad</h3>
								<ul className="text-muted-foreground list-disc space-y-1 pl-5">
									<li>
										<span className="font-medium text-red-600">Débil (1.00-1.75):</span> Mejoras
										significativas son necesarias
									</li>
									<li>
										<span className="font-medium text-amber-600">Limitada (1.76-2.50):</span>{" "}
										Capacidad básicas existen pero requieren desarrollo
									</li>
									<li>
										<span className="font-medium text-blue-600">Moderada (2.51-3.25):</span>{" "}
										Capacidad adecuada con espacio para mejorar
									</li>
									<li>
										<span className="font-medium text-green-600">Alta (3.26-4.00):</span> Fuerte
										capacidad y ventaja competitiva
									</li>
								</ul>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<p className="text-muted-foreground">
				Evalúe la capacidad de su organización en cuatro dimensiones clave: personas, procesos,
				tecnología y cultura.
			</p>

			<Tabs
				defaultValue="evaluation"
				className="w-full"
				value={activeTab}
				onValueChange={handleTabChange}>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="evaluation">Evaluación</TabsTrigger>
					<TabsTrigger
						value="results"
						className="relative"
						disabled={!areAllImportanceTotalsValid()}>
						{!areAllImportanceTotalsValid() && (
							<Lock className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform" />
						)}
						Resultados
					</TabsTrigger>
				</TabsList>

				<TabsContent value="evaluation" className="mt-6 space-y-6">
					<Accordion type="single" collapsible className="w-full">
						{factors.map((factor) => {
							const isImportanceValid = Math.abs(importanceTotals[factor.id] - 1) <= 0.01

							return (
								<AccordionItem key={factor.id} value={factor.id}>
									<AccordionTrigger className="hover:no-underline">
										<div className="flex flex-col items-start">
											<div className="flex gap-2">
												<h3 className="text-lg font-semibold">{factor.name}</h3>
												<span
													className={`items-center rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800 transition-all transition-discrete ${!isImportanceValid ? "inline-flex" : "opacity-0"}`}>
													<AlertTriangle className="h-4.5 w-4.5" />
												</span>
											</div>
											<p className="text-muted-foreground text-sm">{factor.description}</p>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<Card className="border-t-primary border-t-4">
											<CardHeader>
												<CardTitle className="text-lg">Capacidad de {factor.name}</CardTitle>
												<CardDescription>{factor.description}</CardDescription>

												<div
													className={`mt-4 flex items-center justify-between rounded-md p-3 ${isImportanceValid ? "border border-green-200 bg-green-50" : "border border-amber-200 bg-amber-50"}`}>
													<div className="flex h-[32px] items-center justify-center gap-2">
														{!isImportanceValid && (
															<AlertTriangle className="h-5 w-5 text-amber-500" />
														)}
														<span
															className={`font-medium ${isImportanceValid ? "text-green-700" : "text-amber-700"}`}>
															Importancia Total: {importanceTotals[factor.id].toFixed(2)}/1.00
														</span>
														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger asChild>
																	<Info className="text-muted-foreground h-4 w-4 cursor-help" />
																</TooltipTrigger>
																<TooltipContent className="max-w-xs">
																	<p>
																		Los valores de importancia para cada categoría deben sumar
																		exactamente 1.0 antes de que pueda completar el análisis. Ajuste
																		los valores o use el botón "Normalizar valores" para arreglarlos
																		automáticamente.
																	</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
													{!isImportanceValid && (
														<Button
															variant="outline"
															size="sm"
															onClick={() => normalizeImportance(factor.id)}
															className="border-amber-300 text-amber-700 hover:bg-amber-100">
															Normalizar valores
														</Button>
													)}
												</div>
											</CardHeader>
											<CardContent className="space-y-6">
												{factor.questions.map((question, qIndex) => (
													<div key={question.id} className="rounded-md border p-4">
														<div className="mb-4">
															<h4 className="mb-2 text-sm font-medium">Factor {qIndex + 1}</h4>
															<p className="text-sm">{question.text}</p>
														</div>

														<div className="space-y-6">
															<div className="bg-accent/50 space-y-4 rounded-md p-4">
																<div className="flex items-center justify-between">
																	<div className="flex items-center gap-2">
																		<label className="text-sm font-medium">
																			Importancia: {getImportanceLabel(question.importance)} (
																			{question.importance.toFixed(2)})
																		</label>
																		<ImportanceInfo />
																	</div>
																	<span className="text-muted-foreground text-xs">0 to 1</span>
																</div>
																<Slider
																	max={1}
																	step={0.01}
																	value={[question.importance]}
																	onValueChange={(value) =>
																		handleImportanceChange(factor.id, question.id, value)
																	}
																	className="py-4"
																/>
																<div className="text-muted-foreground flex justify-between text-xs">
																	<span>Baja</span>
																	<span>Moderada</span>
																	<span>Alta</span>
																	<span>Crítica</span>
																</div>
															</div>

															<div className="bg-accent/50 space-y-4 rounded-md p-4">
																<div className="flex items-center justify-between">
																	<div className="flex items-center gap-2">
																		<label className="text-sm font-medium">
																			Calificación: {getQualificationLabel(question.qualification)}{" "}
																			({question.qualification})
																		</label>
																		<QualificationInfo />
																	</div>
																	<span className="text-muted-foreground text-xs">1 to 4</span>
																</div>
																<Slider
																	min={1}
																	max={4}
																	step={1}
																	value={[question.qualification]}
																	onValueChange={(value) =>
																		handleQualificationChange(factor.id, question.id, value)
																	}
																	className="py-4"
																/>
																<div className="text-muted-foreground flex justify-between text-xs">
																	<span>Pobre</span>
																	<span>Justa</span>
																	<span>Buena</span>
																	<span>Excelente</span>
																</div>

																<div className="h-[60px]">
																	<Label htmlFor={`dimension-notes-${qIndex}`}>Nota:</Label>
																	<div>{getNotas(question.qualification)}</div>
																</div>
															</div>

															<div className="bg-accent/50 rounded-md p-3">
																<div className="flex items-center justify-between">
																	<span className="text-sm font-medium">Puntaje ponderado:</span>
																	<span className="text-sm font-bold">
																		{(question.importance * question.qualification).toFixed(2)}
																	</span>
																</div>
															</div>
														</div>
													</div>
												))}
											</CardContent>
										</Card>
									</AccordionContent>
								</AccordionItem>
							)
						})}
					</Accordion>

					<div
						className={`mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 transition-all transition-discrete ${!areAllImportanceTotalsValid() ? "block" : "opacity-0"}`}>
						<div className="flex items-start gap-3">
							<AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
							<div>
								<h3 className="mb-1 font-medium text-amber-800">Los resultados están bloqueados</h3>
								<p className="text-sm text-amber-700">
									Debe asegurarse de que los valores de importancia para cada suma de factor a
									exactamente 1.0 antes de poder ver los resultados. Ajuste los valores o use el
									botón "Normalizar valores" para cada factor.
								</p>
							</div>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="results" className="mt-6 space-y-6">
					<ORGResults factors={factors} qualificationLabel={getQualificationLabel} />
				</TabsContent>
			</Tabs>
		</div>
	)
}
