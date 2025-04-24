import { Download, RefreshCw, Save } from "lucide-react"

import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"

import type { VRIODimension } from "./vrio-form"

interface IVRIOResults {
	dimensions: VRIODimension[]
	reset: () => void
	resource: {
		name: string
		description: string
	}
}

export default function VRIOResults({ dimensions, reset, resource }: IVRIOResults) {
	// Calculate competitive status based on VRIO ratings
	const getCompetitiveStatus = () => {
		const value = dimensions[0].rating
		const rarity = dimensions[1].rating
		const imitability = dimensions[2].rating
		const organization = dimensions[3].rating

		// Calculate total score (max 12)
		const totalScore = value + rarity + imitability + organization

		switch (true) {
			case totalScore > 11:
				return {
					status: "Muy alto",
					description: "Ventaja competitiva sostenida. Fortalecer y expandir",
					color: "bg-green-500",
					score: totalScore,
				}
			case totalScore > 8:
				return {
					status: "Alto",
					description: "Posee Ventaja competitiva temporal. Escalar y proteger",
					color: "bg-blue-500",
					score: totalScore,
				}
			case totalScore > 4:
				return {
					status: "Medio",
					description: "Puede tener pontencial, pero necesita mejoras clave",
					color: "bg-amber-500",
					score: totalScore,
				}
			default:
				return {
					status: "Bajo",
					description: "No posee ventaja competitiva. Debe replantearse",
					color: "bg-red-500",
					score: totalScore,
				}
		}
	}

	const getRatingLabel = (dimension: string, value: number) => {
		const ratingLabel: Record<string, string[]> = {
			valor: ["No genera valor", "Valor bajo", "Valor moderado", "Alto valor estratégico"],
			rareza: ["Común", "Poco común", "Raro", "Muy raro / único"],
			imitabilidad: [
				"Fácilmente imitable",
				"Imitable con algo de esfuerzo",
				"Difícil de imitar",
				"Muy difícil de imitar",
			],
			organizacion: [
				"No hay estructura",
				"Estructura básical",
				"Organización funcional",
				"Organización totalmente alineada",
			],
		}

		return ratingLabel[dimension.toLowerCase()][value]
	}

	const exportAnalysis = () => {
		const status = getCompetitiveStatus()
		let vrioText = `ANÁLISIS VRIO

DIMENSIONES:
`

		dimensions.forEach((dimension) => {
			vrioText += `${dimension.name}: ${dimension.rating} (${getRatingLabel(dimension.name, dimension.rating)})
Descripción: ${dimension.description}
Notas: ${dimension.notes || "N/A"}

`
		})

		vrioText += `ESTATUS COMPETITIVO: ${status.status}
Total Score: ${status.score}/12
${status.description}
`

		const blob = new Blob([vrioText], { type: "text/plain" })
		const url = URL.createObjectURL(blob)
		const a = document.createElement("a")
		a.href = url
		a.download = "VRIO_Analysis.txt"
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}

	const status = getCompetitiveStatus()

	return (
		<div className="max-w-[700px] space-y-6 lg:w-[700px]">
			<div>
				<h1 className="text-secondary text-3xl font-bold">Resultados Análisis VRIO</h1>
				<p className="text-muted-foreground">
					Revise el análisis del proyecto <span className="font-bold">{resource.name}</span> basado
					en el valor, la rareza, la imitabilidad y la organización.
				</p>
			</div>

			<div className="mb-6 flex flex-wrap gap-4">
				<Button className="bg-primary text-secondary hover:bg-primary/90">
					<Save className="mr-2 h-4 w-4" />
					Guardar
				</Button>
				<Button onClick={exportAnalysis} variant="outline">
					<Download className="mr-2 h-4 w-4" />
					Exportar Texto
				</Button>
				<Button onClick={reset} variant="outline">
					<RefreshCw className="mr-2 h-4 w-4" />
					Realizar Nuevo Análisis
				</Button>
			</div>

			<Card className="border-t-4" style={{ borderTopColor: status.color.replace("bg-", "") }}>
				<CardHeader>
					<div className="flex items-start justify-between">
						<div>
							<CardTitle>{resource.name}</CardTitle>
							<CardDescription>{resource.description}</CardDescription>
						</div>
						<div className={`${status.color} rounded px-2.5 py-1 text-xs font-medium text-white`}>
							{status.status}
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid grid-cols-2 gap-4">
						{dimensions.map((dimension, index) => (
							<div key={index} className="bg-accent/50 rounded-md p-3">
								<div className="text-muted-foreground mb-1 text-xs">{dimension.name}</div>
								<div className="flex items-center justify-between">
									<span className="font-medium">
										{getRatingLabel(dimension.name, dimension.rating)}
									</span>
									<span className="bg-secondary rounded-md px-2 py-0.5 text-sm text-white">
										{dimension.rating}/3
									</span>
								</div>
							</div>
						))}
					</div>

					<div className="bg-primary/10 rounded-md p-3">
						<div className="text-muted-foreground mb-1 text-xs">Estatus Competitivo</div>
						<div className="flex items-center justify-between">
							<span className="font-medium">{status.description}</span>
							<span className="bg-primary text-secondary rounded-md px-2 py-0.5 text-sm">
								{status.score}/12
							</span>
						</div>
					</div>

					<div className="space-y-4">
						{dimensions.map((dimension, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle className="text-lg">{dimension.name}</CardTitle>
									<CardDescription>{dimension.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="mb-4 flex items-center gap-2">
										<div
											className={`h-3 w-3 rounded-full ${
												dimension.rating === 0
													? "bg-red-500"
													: dimension.rating === 1
														? "bg-amber-500"
														: dimension.rating === 2
															? "bg-blue-500"
															: "bg-green-500"
											}`}
										/>
										<span className="font-medium">
											Rating: {getRatingLabel(dimension.name, dimension.rating)} ({dimension.rating}
											/3)
										</span>
									</div>
									{dimension.notes && (
										<div>
											<h4 className="mb-1 text-sm font-medium">Notes:</h4>
											<p className="text-muted-foreground text-sm">{dimension.notes}</p>
										</div>
									)}
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
