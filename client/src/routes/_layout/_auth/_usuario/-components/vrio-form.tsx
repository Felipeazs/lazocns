"use client"

import { HelpCircle, Info, Minus, Plus } from "lucide-react"
import { useState } from "react"

import { VRIOGuide } from "@/client/components/helpers"
import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { Dialog, DialogTrigger } from "@/client/components/ui/dialog"
import { Label } from "@/client/components/ui/label"
import { Slider } from "@/client/components/ui/slider"
import { Textarea } from "@/client/components/ui/textarea"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/client/components/ui/tooltip"

import VRIOResults from "./vrio-results"

// Define the VRIO dimensions
export interface VRIODimension {
	name: string
	description: string
	rating: number // 0-3
	notes: string
}

export default function VRIOForm() {
	// Hardcoded VRIO dimensions
	const [dimensions, setDimensions] = useState<VRIODimension[]>([
		{
			name: "Valor",
			description:
				"¿El recurso/capacidad permite aprovechar oportunidades o neutralizar amenazas externas?",
			rating: 0,
			notes: "",
		},
		{
			name: "Rareza",
			description: "¿Cuán único o poco común es el recurso/capacidad en el mercado o sector?",
			rating: 0,
			notes: "",
		},
		{
			name: "Imitabilidad",
			description: "¿Qué tan difícil es imitar o replicar esta ventaja por otros?",
			rating: 0,
			notes: "",
		},
		{
			name: "Organizacion",
			description: "¿La empresa/entidad está organizada para explotar este recurso o capacidad?",
			rating: 0,
			notes: "",
		},
	])
	const [resourceName, setResourceName] = useState<string>("")
	const [resourceDescription, setResourceDescription] = useState<string>("")
	const [showResults, setShowResults] = useState(false)
	const [validationError, setValidationError] = useState<string | null>(null)

	const updateDimension = (index: number, field: keyof VRIODimension, value: any) => {
		const newDimensions = [...dimensions]
		newDimensions[index] = { ...newDimensions[index], [field]: value }
		setDimensions(newDimensions)
	}

	const handleSubmit = () => {
		if (!resourceName) {
			setValidationError("Ingrese el nombre del proyecto")
			return
		}
		setShowResults(true)
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

	const resetAnalysis = () => {
		setDimensions([
			{
				name: "Valor",
				description:
					"The extent to which a resource enables a firm to exploit opportunities or neutralize threats",
				rating: 2,
				notes:
					"Our resource provides significant value to customers and helps us differentiate from competitors.",
			},
			{
				name: "Rareza",
				description: "How uncommon a resource is among current and potential competitors",
				rating: 1,
				notes: "Several competitors have similar resources, though ours has some unique aspects.",
			},
			{
				name: "Imitabilidad",
				description: "How difficult it is for competitors to imitate or substitute the resource",
				rating: 3,
				notes: "Our resource is protected by patents and built on years of proprietary knowledge.",
			},
			{
				name: "Organización",
				description: "Whether the firm is organized to fully exploit the resource's potential",
				rating: 2,
				notes:
					"We have good systems in place to leverage this resource, but there's room for improvement.",
			},
		])
		setResourceName("Proprietary Technology")
		setResourceDescription("Our patented software algorithm that optimizes workflow processes")
		setShowResults(false)
	}

	if (showResults) {
		return (
			<VRIOResults
				dimensions={dimensions}
				reset={resetAnalysis}
				resource={{ name: resourceName, description: resourceDescription }}
			/>
		)
	}

	const getNotas = (dimension: string, rating: number): string => {
		const notas: Record<string, string[]> = {
			valor: [
				"No resuelve problemas relevantes del mercado.",
				"Tiene beneficios menores o limitados.",
				"Apunta a un problema claro con solución funcional.",
				"Soluciona un problema importante de forma efectiva y diferenciada.",
			],
			rareza: [
				"No resuelve problemas relevantes del mercado.",
				"Tiene beneficios menores o limitados.",
				"Apunta a un problema claro con solución funcional.",
				"Soluciona un problema importante de forma efectiva y diferenciada.",
			],
			imitabilidad: [
				"No resuelve problemas relevantes del mercado.",
				"Tiene beneficios menores o limitados.",
				"Apunta a un problema claro con solución funcional.",
				"Soluciona un problema importante de forma efectiva y diferenciada.",
			],
			organizacion: [
				"No resuelve problemas relevantes del mercado.",
				"Tiene beneficios menores o limitados.",
				"Apunta a un problema claro con solución funcional.",
				"Soluciona un problema importante de forma efectiva y diferenciada.",
			],
		}

		return notas[dimension][rating]
	}

	return (
		<div className="max-w-[700px] space-y-6 lg:w-[700px]">
			<div className="flex items-center justify-between">
				<h1 className="text-secondary text-3xl font-bold">Análisis VRIO</h1>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="sm" className="flex items-center gap-2">
							<HelpCircle className="h-4 w-4" />
							<span>Ayuda</span>
						</Button>
					</DialogTrigger>
					<VRIOGuide />
				</Dialog>
			</div>

			<p className="text-muted-foreground">
				Evalúe un proyecto utilizando el marco VRIO para determinar su potencial competitivo.
			</p>

			<Card>
				<CardHeader>
					<CardTitle>Información del proyecto</CardTitle>
					<CardDescription>Ingrese detalles sobre el proyecto que está analizando </CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<Label htmlFor="resource-name" className="flex items-center gap-2">
							Nombre del proyecto
						</Label>
						<Textarea
							id="resource-name"
							value={resourceName}
							onChange={(e) => setResourceName(e.target.value)}
							className="mt-1"
						/>
					</div>

					<div>
						<Label htmlFor="resource-description" className="flex items-center gap-2">
							Descripción
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Info className="text-muted-foreground h-4 w-4 cursor-help" />
									</TooltipTrigger>
									<TooltipContent className="max-full">
										<p>Breve descripción del proyecto y por qué es importante para su negocio. </p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</Label>
						<Textarea
							id="resource-description"
							value={resourceDescription}
							onChange={(e) => setResourceDescription(e.target.value)}
							className="mt-1"
						/>
					</div>
				</CardContent>
			</Card>

			<div className="space-y-6">
				{dimensions.map((dimension, index) => (
					<Card key={index}>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-lg">{dimension.name}</CardTitle>
									<CardDescription>{dimension.description}</CardDescription>
								</div>
								<div
									className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white ${
										dimension.rating === 0
											? "bg-red-500"
											: dimension.rating === 1
												? "bg-amber-500"
												: dimension.rating === 2
													? "bg-blue-500"
													: "bg-green-500"
									}`}>
									{dimension.rating}
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="bg-accent/50 space-y-4 p-4">
								<div className="flex items-center justify-between">
									<p className="text-muted-foreground text-sm">
										Rating: {getRatingLabel(dimension.name, dimension.rating)} ({dimension.rating}
										/3)
									</p>
								</div>
								<div className="flex items-center gap-2">
									<Button
										variant="outline"
										size="icon"
										onClick={() =>
											updateDimension(index, "rating", Math.max(0, dimension.rating - 1))
										}
										disabled={dimension.rating === 0}>
										<Minus className="h-4 w-4" />
									</Button>
									<Slider
										value={[dimension.rating]}
										min={0}
										max={3}
										step={1}
										onValueChange={(value) => updateDimension(index, "rating", value[0])}
										className="flex-1"
									/>
									<Button
										variant="outline"
										size="icon"
										onClick={() =>
											updateDimension(index, "rating", Math.min(3, dimension.rating + 1))
										}
										disabled={dimension.rating === 3}>
										<Plus className="h-4 w-4" />
									</Button>
								</div>
								<div className="text-muted-foreground flex justify-between text-xs">
									<span>Ninguno (0)</span>
									<span>Bajo (0)</span>
									<span>Medio (0)</span>
									<span>Alto (0)</span>
								</div>

								<div>
									<Label htmlFor={`dimension-notes-${index}`}>Nota:</Label>
									<div>{getNotas(dimension.name.toLowerCase(), dimension.rating)}</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<Card>
				<CardFooter className="flex flex-col gap-4 p-4">
					<div
						className={`w-full rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 ${validationError ? "inline" : "hidden"}`}>
						{validationError}
					</div>
					<Button
						onClick={handleSubmit}
						className="bg-primary text-secondary hover:bg-primary/90 w-full">
						Completar Análisis VRIO
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
