"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
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
import { Progress } from "@/client/components/ui/progress"
import { Slider } from "@/client/components/ui/slider"
import { cn } from "@/client/lib/utils"

import { FODAResults } from "./foda-results"

const fodaQuestions = {
	fortalezas: [
		"Modelo educativo-terapéutico único, Propiedad Intelectual",
		"Misión clara, equipo comprometido, capacitado y con roles",
		"Impacto en la comunidad",
		"Experiencia real, conocimiento adquirido",
	],
	debilidades: [
		"Financiamiento insuficiente para crecer",
		"Falta de comunicación de todos los servicios que podemos entregar",
		"Procesos internos no digitalizados",
		"Rotación del equipo",
	],
	oportunidades: [
		"Ley TEA",
		"Colaboraciones y franquicias a familias",
		"Desarrollo de App y digitalización",
		"Capacitaciones y talleres abiertos a público",
	],
	amenazas: [
		"Cambios normativos",
		"Eliminación de Isapres y cambios en sistema salud en Chile",
		"Aumento de competencia en terapias",
		"Percepción de continuidad de la organización",
	],
}

type FODACategory = "fortalezas" | "debilidades" | "oportunidades" | "amenazas"
interface FODAAnswer {
	importance: number // 0 to 1
	qualification: number // 1 to 4
}
type FODAAnswers = Record<FODACategory, FODAAnswer[]>

const fodaDefaultAnswer: FODAAnswer[] = Array.from({ length: 4 }, () => ({
	importance: 0.5,
	qualification: 2,
}))

export function FodaForm() {
	const [currentCategory, setCurrentCategory] = useState<FODACategory>("fortalezas")
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [answers, setAnswers] = useState<FODAAnswers>({
		fortalezas: fodaDefaultAnswer,
		debilidades: fodaDefaultAnswer,
		oportunidades: fodaDefaultAnswer,
		amenazas: fodaDefaultAnswer,
	})
	const [showResults, setShowResults] = useState(false)

	const categories: FODACategory[] = ["fortalezas", "debilidades", "oportunidades", "amenazas"]
	const categoryLabels = {
		fortalezas: "Fortalezas",
		debilidades: "Debilidades",
		oportunidades: "Oportunidades",
		amenazas: "Amenazas",
	}

	const categoryColors = {
		fortalezas: "bg-green-500",
		debilidades: "bg-amber-500",
		oportunidades: "bg-blue-500",
		amenazas: "bg-red-500",
	}

	const totalQuestions = Object.values(fodaQuestions).reduce((acc, curr) => acc + curr.length, 0)
	const currentCategoryIndex = categories.indexOf(currentCategory)
	const currentQuestionNumber =
		categories
			.slice(0, currentCategoryIndex)
			.reduce((acc, cat) => acc + fodaQuestions[cat].length, 0) +
		currentQuestionIndex +
		1

	const progress = (currentQuestionNumber / totalQuestions) * 100

	const handleImportanceChange = (value: number[]) => {
		const newAnswers = { ...answers }
		newAnswers[currentCategory] = [...newAnswers[currentCategory]]
		newAnswers[currentCategory][currentQuestionIndex] = {
			...newAnswers[currentCategory][currentQuestionIndex],
			importance: value[0],
		}
		setAnswers(newAnswers)
	}

	const handleQualificationChange = (value: number[]) => {
		const newAnswers = { ...answers }
		newAnswers[currentCategory] = [...newAnswers[currentCategory]]
		newAnswers[currentCategory][currentQuestionIndex] = {
			...newAnswers[currentCategory][currentQuestionIndex],
			qualification: value[0],
		}
		setAnswers(newAnswers)
	}

	const goToNextQuestion = () => {
		if (currentQuestionIndex < fodaQuestions[currentCategory].length - 1) {
			// Next question in current category
			setCurrentQuestionIndex(currentQuestionIndex + 1)
		} else if (currentCategoryIndex < categories.length - 1) {
			// First question in next category
			setCurrentCategory(categories[currentCategoryIndex + 1])
			setCurrentQuestionIndex(0)
		} else {
			// End of assessment
			setShowResults(true)
		}
	}

	const goToPreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			// Previous question in current category
			setCurrentQuestionIndex(currentQuestionIndex - 1)
		} else if (currentCategoryIndex > 0) {
			// Last question in previous category
			setCurrentCategory(categories[currentCategoryIndex - 1])
			setCurrentQuestionIndex(fodaQuestions[categories[currentCategoryIndex - 1]].length - 1)
		}
	}

	const restartAssessment = () => {
		setAnswers({
			fortalezas: fodaDefaultAnswer,
			debilidades: fodaDefaultAnswer,
			oportunidades: fodaDefaultAnswer,
			amenazas: fodaDefaultAnswer,
		})
		setCurrentCategory("fortalezas")
		setCurrentQuestionIndex(0)
		setShowResults(false)
	}

	const getQualificationLabel = (value: number) => {
		switch (value) {
			case 1:
				return "Pobre"
			case 2:
				return "Justo"
			case 3:
				return "Buena"
			case 4:
				return "Excelente"
			default:
				return "Justo"
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

	const currentAnswer = answers[currentCategory][currentQuestionIndex]

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-secondary text-3xl font-bold">FODA Analisis</h1>
				<p className="text-muted-foreground">
					Evalúa cada factor según su importancia y calificación.
				</p>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium">
						Factor {currentQuestionNumber} de {totalQuestions}
					</span>
					<span className="text-sm font-medium">
						{categoryLabels[currentCategory]} ({currentQuestionIndex + 1}/
						{fodaQuestions[currentCategory].length})
					</span>
				</div>
				<Progress value={progress} className="h-2" />
			</div>

			<Card
				className="flex h-[500px] w-[600px] flex-col justify-between border-t-4"
				style={{ borderTopColor: categoryColors[currentCategory].replace("bg-", "") }}>
				<CardHeader>
					<div
						className={cn(
							"mb-2 inline-block rounded-lg px-3 py-1 text-sm font-medium text-white",
							categoryColors[currentCategory],
						)}>
						{categoryLabels[currentCategory]}
					</div>
					<CardTitle className="text-xl">
						{fodaQuestions[currentCategory][currentQuestionIndex]}
					</CardTitle>
					<CardDescription>
						Evalúa cada factor según su importancia (0-1) y calificación (1-4).
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-8">
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<label className="text-sm font-medium">
								Importance: {getImportanceLabel(currentAnswer.importance)} (
								{currentAnswer.importance.toFixed(2)})
							</label>
							<span className="text-muted-foreground text-xs">0 to 1</span>
						</div>
						<Slider
							defaultValue={[currentAnswer.importance]}
							max={1}
							step={0.01}
							value={[currentAnswer.importance]}
							onValueChange={handleImportanceChange}
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
							<label className="text-sm font-medium">
								Qualification: {getQualificationLabel(currentAnswer.qualification)} (
								{currentAnswer.qualification})
							</label>
							<span className="text-muted-foreground text-xs">1 to 4</span>
						</div>
						<Slider
							defaultValue={[currentAnswer.qualification]}
							min={1}
							max={4}
							step={1}
							value={[currentAnswer.qualification]}
							onValueChange={handleQualificationChange}
							className="py-4"
						/>
						<div className="text-muted-foreground flex justify-between text-xs">
							<span>Pobre</span>
							<span>Justo</span>
							<span>Buena</span>
							<span>Excelente</span>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button
						variant="outline"
						onClick={goToPreviousQuestion}
						disabled={currentCategoryIndex === 0 && currentQuestionIndex === 0}>
						<ChevronLeft className="mr-2 h-4 w-4" />
						Anterior
					</Button>
					<Button onClick={goToNextQuestion}>
						{currentCategoryIndex === categories.length - 1 &&
						currentQuestionIndex === fodaQuestions[currentCategory].length - 1
							? "Terminar"
							: "Siguiente"}
						<ChevronRight className="ml-2 h-4 w-4" />
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
