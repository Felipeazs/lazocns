"use client"

import { Download, RefreshCw, Save, Share2 } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/client/components/ui/badge"
import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs"

interface FODAAnswer {
	factor: string
	importancia: number // 0 to 1
	calificacion: number // 1 to 4
}

interface FODAResultsProps {
	answers: {
		fortalezas: FODAAnswer[]
		debilidades: FODAAnswer[]
		oportunidades: FODAAnswer[]
		amenazas: FODAAnswer[]
	}
	onRestart: () => void
}

export function FODAResults({ answers, onRestart }: FODAResultsProps) {
	const [savedStatus, setSavedStatus] = useState<string | null>(null)

	const handleSave = () => {
		// In a real app, this would save to a database
		setSavedStatus("Análisis guardado existosamente!")
		setTimeout(() => setSavedStatus(null), 3000)
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

	const handleExport = () => {
		// Create a text representation of the FODA analysis
		let fodaText = "FODA ANALYSIS\n\n"

		fodaText += "FORTALEZAS:\n"
		answers.fortalezas.forEach((answer, index) => {
			fodaText += `${index + 1}. ${answer}\n`
			fodaText += `   Importancia: ${answer.importancia.toFixed(2)} (${getImportanceLabel(answer.importancia)})\n`
			fodaText += `   Calificación: ${answer.calificacion} (${getQualificationLabel(answer.calificacion)})\n`
			fodaText += `   Puntaje Ponderado: ${(answer.importancia * answer.calificacion).toFixed(2)}\n\n`
		})

		fodaText += "\nDEBILIDADES:\n"
		answers.debilidades.forEach((answer, index) => {
			fodaText += `${index + 1}. ${answer}\n`
			fodaText += `   Importancia: ${answer.importancia.toFixed(2)} (${getImportanceLabel(answer.importancia)})\n`
			fodaText += `   Calificación: ${answer.calificacion} (${getQualificationLabel(answer.calificacion)})\n`
			fodaText += `   Puntaje Ponderado: ${(answer.importancia * answer.calificacion).toFixed(2)}\n\n`
		})

		fodaText += "\nOPORTUNIDADES:\n"
		answers.oportunidades.forEach((answer, index) => {
			fodaText += `${index + 1}. ${answer}\n`
			fodaText += `   Importancia: ${answer.importancia.toFixed(2)} (${getImportanceLabel(answer.importancia)})\n`
			fodaText += `   Calificación: ${answer.calificacion} (${getQualificationLabel(answer.calificacion)})\n`
			fodaText += `   Puntaje Ponderado: ${(answer.importancia * answer.calificacion).toFixed(2)}\n\n`
		})

		fodaText += "\nAMENAZAS:\n"
		answers.amenazas.forEach((answer, index) => {
			fodaText += `${index + 1}. ${answer}\n`
			fodaText += `   Importancia: ${answer.importancia.toFixed(2)} (${getImportanceLabel(answer.importancia)})\n`
			fodaText += `   Calificación: ${answer.calificacion} (${getQualificationLabel(answer.calificacion)})\n`
			fodaText += `   Puntaje Ponderado: ${(answer.importancia * answer.calificacion).toFixed(2)}\n\n`
		})

		// Create a blob and download it
		const blob = new Blob([fodaText], { type: "text/plain" })
		const url = URL.createObjectURL(blob)
		const a = document.createElement("a")
		a.href = url
		a.download = "FODA_Analysis.txt"
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}

	const renderAnswers = (category: keyof typeof answers) => {
		return answers[category]
			.map((answer, index) => {
				if (!answer.factor.trim()) {
					return null
				}

				const weightedScore = answer.importancia * answer.calificacion

				return (
					<div key={`${category}-${index}`} className="mb-6 rounded-md border p-4">
						<h4 className="mb-2 font-medium">{answer.factor}</h4>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							<div className="bg-accent/50 rounded-md p-3">
								<div className="text-muted-foreground mb-1 text-xs">Importancia</div>
								<div className="flex items-center justify-between">
									<span className="font-medium">{getImportanceLabel(answer.importancia)}</span>
									<span className="bg-secondary rounded-md px-2 py-0.5 text-sm text-white">
										{answer.importancia.toFixed(2)}
									</span>
								</div>
							</div>

							<div className="bg-accent/50 rounded-md p-3">
								<div className="text-muted-foreground mb-1 text-xs">Calificación</div>
								<div className="flex items-center justify-between">
									<span className="font-medium">{getQualificationLabel(answer.calificacion)}</span>
									<span className="bg-secondary rounded-md px-2 py-0.5 text-sm text-white">
										{answer.calificacion}
									</span>
								</div>
							</div>

							<div className="bg-primary/10 rounded-md p-3">
								<div className="text-muted-foreground mb-1 text-xs">Puntaje Ponderado</div>
								<div className="flex items-center justify-between">
									<span className="font-medium">
										{weightedScore < 1
											? "Bajo"
											: weightedScore < 2
												? "Medio"
												: weightedScore < 3
													? "Alto"
													: "Muy Alto"}
									</span>
									<span className="bg-primary text-secondary rounded-md px-2 py-0.5 text-sm">
										{weightedScore.toFixed(2)}
									</span>
								</div>
							</div>
						</div>
					</div>
				)
			})
			.filter(Boolean) // filter out null values
	}

	const calculateCategoryScore = (category: keyof typeof answers) => {
		const totalWeightedScore = answers[category].reduce(
			(acc, answer) => acc + answer.importancia * answer.calificacion,
			0,
		)
		return totalWeightedScore / answers[category].length
	}

	const strengthsScore = calculateCategoryScore("fortalezas")
	const weaknessesScore = calculateCategoryScore("debilidades")
	const opportunitiesScore = calculateCategoryScore("oportunidades")
	const threatsScore = calculateCategoryScore("amenazas")

	const internalFactorsScore = (strengthsScore - weaknessesScore).toFixed(2)
	const externalFactorsScore = (opportunitiesScore - threatsScore).toFixed(2)
	const overallScore = (
		strengthsScore +
		opportunitiesScore -
		(weaknessesScore + threatsScore)
	).toFixed(2)

	const getInterpretaciones = (factor: string, puntaje: number): string => {
		const interpretacion: Record<string, string[]> = {
			fortalezas: [
				"No se identifican capacidades internas significativas. El proyecto necesita construir competencias clave.",
				"Hay algunas capacidades internas, pero no suficientes para competir con éxito.",
				"Existen fortalezas claras que pueden ser aprovechadas si se alinean con oportunidades.",
				"El proyecto cuenta con fortalezas robustas que le permiten destacarse o liderar en su área.",
			],
			debilidades: [
				"Las debilidades comprometen seriamente la viabilidad del proyecto si no se resuelven.",
				"Varias debilidades afectan la capacidad operativa o estratégica del proyecto.",
				"Hay elementos internos que deben corregirse, pero no impiden avanzar si se gestionan oportunamente.",
				"El proyecto presenta muy pocas debilidades internas, lo que favorece su ejecución.",
			],
			oportunidades: [
				"Escaso o nulo potencial en el entorno. El mercado no favorece la innovación propuesta.",
				"Algunas oportunidades aisladas, pero sin un entorno propicio general.",
				"Hay oportunidades concretas que pueden impulsar el proyecto si se actúa con rapidez.",
				"El entorno ofrece múltiples oportunidades (fondos, tendencias, vacíos de mercado).",
			],
			amenazas: [
				"Riesgos externos poco relevantes. Buena estabilidad del entorno.",
				"Existen riesgos que deben considerarse, aunque son manejables.",
				"Riesgos relevantes que podrían afectar el desarrollo del proyecto.",
				"Amenazas externas de alto impacto. Podrían paralizar o invalidar el proyecto.",
			],
		}

		return interpretacion[factor][Math.floor(puntaje)]
	}

	const getCameEvaluacion = (factor: string, puntaje: number): string => {
		const evaluacion: Record<string, string[]> = {
			fortalezas: [
				"Desarrollar o sustituir capacidades.",
				"Corregir y fortalecer áreas clave.",
				"Mantener y profesionalizar.",
				"Mantener y consolidar ventajas.",
			],
			debilidades: [
				"Mantener procesos y buenas prácticas.",
				"Corregir debilidades específicas.",
				"Corregir con urgencia.",
				"Replantear estrategia o rediseñar.",
			],
			oportunidades: [
				"Revisar propuesta de valor.",
				"Enfocar recursos estratégicamente.",
				"Explotar activamente.",
				"Explotar con agresividad y enfoque.",
			],
			amenazas: [
				"Mantener monitoreo mínimo.",
				"Afrontar con planes de contingencia.",
				"Afrontar con acciones preventivas.",
				"Redefinir estrategia o replantear.",
			],
		}

		return evaluacion[factor][Math.floor(puntaje)]
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-secondary text-3xl font-bold">Resultados Análisis FODA</h1>
				<p className="text-muted-foreground">
					Revisa el análisis de Fortaleza, Debilidades, Oportunidades y Amenazas.
				</p>
			</div>

			{savedStatus && (
				<div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-green-700">
					{savedStatus}
				</div>
			)}

			<div className="mb-6 flex flex-wrap gap-4">
				<Button onClick={handleSave} className="bg-primary text-secondary hover:bg-primary/90">
					<Save className="mr-2 h-4 w-4" />
					Guardar Análisis
				</Button>
				<Button onClick={handleExport} variant="outline">
					<Download className="mr-2 h-4 w-4" />
					Exportar texto
				</Button>
				<Button onClick={onRestart} variant="outline">
					<RefreshCw className="mr-2 h-4 w-4" />
					Comenzar nuevo análisis
				</Button>
			</div>

			<Card className="max-w-[800px] lg:w-[800px]">
				<CardHeader>
					<CardTitle>Resumen Puntaje FODA</CardTitle>
					<CardDescription>Análisis general de tus factores FODA</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Puntaje por categoría</h3>
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span className="font-medium text-green-600">fortalezas:</span>
									<span className="rounded-md bg-green-100 px-2 py-0.5 text-sm text-green-800">
										{strengthsScore.toFixed(2)}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="font-medium text-amber-600">debilidades:</span>
									<span className="rounded-md bg-amber-100 px-2 py-0.5 text-sm text-amber-800">
										{weaknessesScore.toFixed(2)}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="font-medium text-blue-600">oportunidades:</span>
									<span className="rounded-md bg-blue-100 px-2 py-0.5 text-sm text-blue-800">
										{opportunitiesScore.toFixed(2)}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="font-medium text-red-600">amenazas:</span>
									<span className="rounded-md bg-red-100 px-2 py-0.5 text-sm text-red-800">
										{threatsScore.toFixed(2)}
									</span>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Posición Estratégica</h3>
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span className="font-medium">Factores Internos (F-D):</span>
									<span
										className={`rounded-md px-2 py-0.5 text-sm ${
											Number(internalFactorsScore) > 0
												? "bg-green-100 text-green-800"
												: "bg-amber-100 text-amber-800"
										}`}>
										{internalFactorsScore}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="font-medium">Factors Externos (O-A):</span>
									<span
										className={`rounded-md px-2 py-0.5 text-sm ${
											Number(externalFactorsScore) > 0
												? "bg-green-100 text-green-800"
												: "bg-amber-100 text-amber-800"
										}`}>
										{externalFactorsScore}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="font-medium">Posición General:</span>
									<span
										className={`rounded-md px-2 py-0.5 text-sm ${
											Number(overallScore) > 0
												? "bg-green-100 text-green-800"
												: "bg-amber-100 text-amber-800"
										}`}>
										{overallScore}
									</span>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="max-w-[800px] lg:w-[800px]">
				<CardHeader>
					<CardTitle>Interpretación Estratégica y recomendaciones</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<Card>
						<CardHeader className="flex w-full flex-row justify-between text-green-600">
							<CardTitle>fortalezas</CardTitle>
							<CardDescription>
								<Badge className="bg-green-100">{strengthsScore}</Badge>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
								<div className="space-y-2">
									<p className="font-bold">Interpretación estratégica</p>
									<p>{getInterpretaciones("fortalezas", strengthsScore)}</p>
								</div>
								<div className="w space-y-2">
									<p className="font-bold">Estrategia CAME sugerida</p>
									<p>{getCameEvaluacion("fortalezas", strengthsScore)}</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex w-full flex-row justify-between text-amber-600">
							<CardTitle>debilidades</CardTitle>
							<CardDescription>
								<Badge className="bg-amber-100">{weaknessesScore}</Badge>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
								<div className="space-y-2">
									<p className="font-bold">Interpretación estratégica</p>
									<p>{getInterpretaciones("debilidades", weaknessesScore)}</p>
								</div>
								<div className="space-y-2">
									<p className="font-bold">Estrategia CAME sugerida</p>
									<p>{getCameEvaluacion("debilidades", weaknessesScore)}</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex w-full flex-row justify-between text-blue-600">
							<CardTitle>oportunidades</CardTitle>
							<CardDescription>
								<Badge className="bg-blue-100">{opportunitiesScore}</Badge>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
								<div className="space-y-2">
									<p className="font-bold">Interpretación estratégica</p>
									<p>{getInterpretaciones("oportunidades", opportunitiesScore)}</p>
								</div>
								<div className="space-y-2">
									<p className="font-bold">Estrategia CAME sugerida</p>
									{getCameEvaluacion("oportunidades", opportunitiesScore)}
									<p></p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex w-full flex-row justify-between text-red-600">
							<CardTitle>amenazas</CardTitle>
							<CardDescription>
								<Badge className="bg-red-100">{threatsScore}</Badge>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
								<div className="space-y-2">
									<p className="font-bold">Interpretación estratégica</p>
									<p>{getInterpretaciones("amenazas", threatsScore)}</p>
								</div>
								<div className="space-y-2">
									<p className="font-bold">Estrategia CAME sugerida</p>
									<p>{getCameEvaluacion("amenazas", threatsScore)}</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</CardContent>
			</Card>

			<Tabs defaultValue="fortalezas">
				<TabsList className="bg-accent grid w-full grid-cols-4">
					<TabsTrigger
						value="fortalezas"
						className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
						fortalezas
					</TabsTrigger>
					<TabsTrigger
						value="debilidades"
						className="inline truncate data-[state=active]:bg-amber-500 data-[state=active]:text-white">
						debilidades
					</TabsTrigger>
					<TabsTrigger
						value="oportunidades"
						className="inline truncate data-[state=active]:bg-blue-500 data-[state=active]:text-white">
						oportunidades
					</TabsTrigger>
					<TabsTrigger
						value="amenazas"
						className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
						amenazas
					</TabsTrigger>
				</TabsList>

				<TabsContent value="fortalezas">
					<Card>
						<CardHeader>
							<CardTitle className="text-green-600">fortalezas</CardTitle>
							<CardDescription>
								Sus atributos y recursos positivos internos que le dan una ventaja.
							</CardDescription>
						</CardHeader>
						<CardContent>{renderAnswers("fortalezas")}</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="debilidades">
					<Card>
						<CardHeader>
							<CardTitle className="text-amber-600">debilidades</CardTitle>
							<CardDescription>
								Sus aspectos negativos internos que pueden restar valor a su propuesta de valor.
							</CardDescription>
						</CardHeader>
						<CardContent>{renderAnswers("debilidades")}</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="oportunidades">
					<Card>
						<CardHeader>
							<CardTitle className="text-blue-600">oportunidades</CardTitle>
							<CardDescription>
								Factores externos que podrían afectar positivamente su proyecto o equipo.{" "}
							</CardDescription>
						</CardHeader>
						<CardContent>{renderAnswers("oportunidades")}</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="amenazas">
					<Card>
						<CardHeader>
							<CardTitle className="text-red-600">amenazas</CardTitle>
							<CardDescription>
								Factores externos que podría afectar positivamente su proyecto o upoqueo.{" "}
							</CardDescription>
						</CardHeader>
						<CardContent>{renderAnswers("amenazas")}</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			<Card className="max-w-[800px] lg:w-[800px]">
				<CardHeader>
					<CardTitle>Matriz FODA</CardTitle>
					<CardDescription>
						Representación visual de sus factores mejor calificados.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						<div className="rounded-md border bg-green-50 p-4">
							<h3 className="mb-2 font-bold text-green-600">fortalezas</h3>
							<ul className="list-disc space-y-2 pl-5">
								{answers.fortalezas
									.filter((answer) => answer.factor.trim())
									.map((answer, index) => (
										<li key={`strength-${index}`} className="text-sm">
											<span className="w-full font-medium">{answer.factor}</span>
											<div className="mt-1 flex items-center gap-2">
												<span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-800">
													Puntaje: {(answer.importancia * answer.calificacion).toFixed(2)}
												</span>
												<span className="text-muted-foreground text-xs">
													(I: {answer.importancia.toFixed(2)} × C: {answer.calificacion})
												</span>
											</div>
										</li>
									))}
							</ul>
						</div>

						<div className="rounded-md border bg-amber-50 p-4">
							<h3 className="mb-2 font-bold text-amber-600">debilidades</h3>
							<ul className="list-disc space-y-2 pl-5">
								{answers.debilidades
									.filter((answer) => answer.factor.trim())
									.map((answer, index) => (
										<li key={`weakness-${index}`} className="text-sm">
											<span className="w-full font-medium">{answer.factor}</span>
											<div className="mt-1 flex items-center gap-2">
												<span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-800">
													Puntaje: {(answer.importancia * answer.calificacion).toFixed(2)}
												</span>
												<span className="text-muted-foreground text-xs">
													(I: {answer.importancia.toFixed(2)} × C: {answer.calificacion})
												</span>
											</div>
										</li>
									))}
							</ul>
						</div>

						<div className="rounded-md border bg-blue-50 p-4">
							<h3 className="mb-2 font-bold text-blue-600">oportunidades</h3>
							<ul className="list-disc space-y-2 pl-5">
								{answers.oportunidades
									.filter((answer) => answer.factor.trim())
									.map((answer, index) => (
										<li key={`opportunity-${index}`} className="text-sm">
											<span className="w-full font-medium">{answer.factor}</span>
											<div className="mt-1 flex items-center gap-2">
												<span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-800">
													Puntaje: {(answer.importancia * answer.calificacion).toFixed(2)}
												</span>
												<span className="text-muted-foreground text-xs">
													(I: {answer.importancia.toFixed(2)} × C: {answer.calificacion})
												</span>
											</div>
										</li>
									))}
							</ul>
						</div>

						<div className="rounded-md border bg-red-50 p-4">
							<h3 className="mb-2 font-bold text-red-600">amenazas</h3>
							<ul className="list-disc space-y-2 pl-5">
								{answers.amenazas
									.filter((answer) => answer.factor.trim())
									.map((answer, index) => (
										<li key={`threat-${index}`} className="text-sm">
											<span className="w-full font-medium">{answer.factor}</span>
											<div className="mt-1 flex items-center gap-2">
												<span className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-800">
													Puntaje: {(answer.importancia * answer.calificacion).toFixed(2)}
												</span>
												<span className="text-muted-foreground text-xs">
													(I: {answer.importancia.toFixed(2)} × C: {answer.calificacion})
												</span>
											</div>
										</li>
									))}
							</ul>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button variant="outline" className="w-full" onClick={() => window.print()}>
						<Share2 className="mr-2 h-4 w-4" />
						Imprimir o compartir análisis
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
