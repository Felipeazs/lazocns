"use client"

import { HelpCircle, Info, Minus, Plus } from "lucide-react"
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
			rating: 2,
			notes: "",
		},
		{
			name: "Rareza",
			description: "¿Cuán único o poco común es el recurso/capacidad en el mercado o sector?",
			rating: 1,
			notes: "",
		},
		{
			name: "Imitabilidad",
			description: "¿Qué tan difícil es imitar o replicar esta ventaja por otros?",
			rating: 3,
			notes: "",
		},
		{
			name: "Organizacion",
			description: "¿La empresa/entidad está organizada para explotar este recurso o capacidad?",
			rating: 2,
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
					<DialogContent className="text-secondary h-full overflow-auto sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Guía Análisis VRIO</DialogTitle>
							<DialogDescription>
								Comprender cómo analizar los recursos utilizando el marco VRIO
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-6">
							<div>
								<h3 className="mb-2 text-lg font-medium">¿Qué es el análisis VRIO?</h3>
								<p className="text-muted-foreground">
									El análisis VRIO ayuda a identificar qué recursos y capacidades pueden conducir a
									una ventaja competitiva sostenible. Evalúa recursos basados en cuatro criterios:
									valor, rareza, imitabilidad y organización.
								</p>
							</div>

							<div>
								<h3 className="mb-2 text-lg font-medium">Las 4 dimensiones VRIO</h3>
								<ul className="text-muted-foreground list-disc space-y-3 pl-5 text-sm">
									<li>
										<span className="font-medium">Valor (0-3): </span>
										¿El recurso permite a su empresa explotar las oportunidades o neutralizar las
										amenazas?
										<ul className="mt-1 list-disc pl-5">
											<li>
												<span className="font-medium">0 - Ninguno: </span>
												No genera valor
											</li>
											<li>
												<span className="font-medium">1 - Bajo: </span>
												Proporciona un valor mínimo
											</li>
											<li>
												<span className="font-medium">2 - Medio: </span>
												Proporciona un valor moderado
											</li>
											<li>
												<span className="font-medium">3 - Alto: </span>
												Proporciona un alto valor estratégico
											</li>
										</ul>
									</li>
									<li>
										<span className="font-medium">Rareza (0-3): </span>
										¿Cuán único o poco común es el recurso/capacidad en el mercado o sector?
										<ul className="mt-1 list-disc pl-5">
											<li>
												<span className="font-medium">0 - Ninguno: </span>
												Común entre los competidores
											</li>
											<li>
												<span className="font-medium">1 - Bajo: </span>
												Poco común
											</li>
											<li>
												<span className="font-medium">2 - Medio: </span>
												Raro
											</li>
											<li>
												<span className="font-medium">3 - Alto: </span>
												Muy raro / único
											</li>
										</ul>
									</li>
									<li>
										<span className="font-medium">Imitabilidad (0-3): </span>
										¿Qué tan difícil es imitar o replicar esta ventaja por otros?
										<ul className="mt-1 list-disc pl-5">
											<li>
												<span className="font-medium">0 - Ninguno: </span>
												Muy fácil de imitar
											</li>
											<li>
												<span className="font-medium">1 - Bajo: </span>
												Puede ser imitado con algo de esfuerzo
											</li>
											<li>
												<span className="font-medium">2 - Medio: </span>
												Difícil de imitar
											</li>
											<li>
												<span className="font-medium">3 - Alto: </span>
												Muy difícil de imitar
											</li>
										</ul>
									</li>
									<li>
										<span className="font-medium">Organización (0-3):</span>
										¿La empresa/entidad está organizada para explotar este recurso o capacidad?
										<ul className="mt-1 list-disc pl-5">
											<li>
												<span className="font-medium">0 - Ninguno: </span>
												No hay organización
											</li>
											<li>
												<span className="font-medium">1 - Bajo: </span>
												Estructura básica
											</li>
											<li>
												<span className="font-medium">2 - Medio: </span>
												Organización funcional
											</li>
											<li>
												<span className="font-medium">3 - Alto: </span>
												Organización totalmente alineada
											</li>
										</ul>
									</li>
								</ul>
							</div>

							<div>
								<h3 className="mb-2 text-lg font-medium">Implicaciones competitivas</h3>
								<ul className="text-muted-foreground list-disc space-y-2 pl-5">
									<li>
										<span className="font-medium">Ventaja competitiva sostenible:</span> Puntajes de
										recursos altos en todas las dimensiones
									</li>
									<li>
										<span className="font-medium">Ventaja competitiva temporal:</span> Los puntajes
										de recursos altos en valor, rareza y organización, pero más bajos en
										imitabilidad
									</li>
									<li>
										<span className="font-medium">Paridad competitiva:</span> Puntajes de recursos
										altos en valor y organización, pero más bajos en rareza
									</li>
									<li>
										<span className="font-medium">Desventaja competitiva:</span> Puntajes de
										recursos bajos en la mayoría de las dimensiones Resource scores low across most
										dimensions
									</li>
								</ul>
							</div>
						</div>
					</DialogContent>
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
							<div className="space-y-4">
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
							</div>

							<div>
								<Label htmlFor={`dimension-notes-${index}`}>Nota:</Label>
								<div>{getNotas(dimension.name.toLowerCase(), dimension.rating)}</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<Card>
				<CardFooter className="flex flex-col gap-4">
					{validationError && (
						<div className="w-full rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
							{validationError}
						</div>
					)}
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
