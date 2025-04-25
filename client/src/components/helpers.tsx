import type { ReactNode } from "react"

import { AlertTriangle, Info } from "lucide-react"

import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

function TooltipWrapper({ children }: { children: ReactNode }) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Info className="text-muted-foreground h-4 w-4 cursor-help" />
				</TooltipTrigger>
				<TooltipContent className="max-w-xs">
					<p>{children}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export function ImportanceInfo() {
	return (
		<TooltipWrapper>
			La importancia (0-1) mide cuán significativo es este factor para su éxito.
		</TooltipWrapper>
	)
}

export function QualificationInfo() {
	return (
		<TooltipWrapper>
			La calificación (1-4) mide qué tan bien se desempeña en esta área.
		</TooltipWrapper>
	)
}

export function ImportanceWarning() {
	return (
		<TooltipWrapper>
			Los valores de importancia para cada categoría deben sumar exactamente 1.0 antes de que pueda
			completar el análisis. Ajuste los valores o use el botón "Normalizar valores" para arreglarlos
			automáticamente.
		</TooltipWrapper>
	)
}

interface ImportanceProps {
	valid: boolean
	id?: string
	action: (id?: string) => void
	total: number
}

export function ImportanceActions({ valid, action, total, id }: ImportanceProps) {
	return (
		<div
			className={`mt-4 flex items-center justify-between rounded-md p-3 ${valid ? "border border-green-200 bg-green-50" : "border border-amber-200 bg-amber-50"}`}>
			<div className="flex h-[32px] items-center justify-center gap-2">
				{!valid && <AlertTriangle className="h-5 w-5 text-amber-500" />}
				<span className={`font-medium ${valid ? "text-green-700" : "text-amber-700"}`}>
					Importancia Total: {total.toFixed(2)}/1.00
				</span>
				<ImportanceWarning />
			</div>
			{!valid && (
				<Button
					variant="outline"
					size="sm"
					onClick={() => action(id)}
					className="border-amber-300 text-amber-700 hover:bg-amber-100">
					Normalizar valores
				</Button>
			)}
		</div>
	)
}

export function VRIOGuide() {
	return (
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
						El análisis VRIO ayuda a identificar qué recursos y capacidades pueden conducir a una
						ventaja competitiva sostenible. Evalúa recursos basados en cuatro criterios: valor,
						rareza, imitabilidad y organización.
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
							<span className="font-medium">Ventaja competitiva temporal:</span> Los puntajes de
							recursos altos en valor, rareza y organización, pero más bajos en imitabilidad
						</li>
						<li>
							<span className="font-medium">Paridad competitiva:</span> Puntajes de recursos altos
							en valor y organización, pero más bajos en rareza
						</li>
						<li>
							<span className="font-medium">Desventaja competitiva:</span> Puntajes de recursos
							bajos en la mayoría de las dimensiones Resource scores low across most dimensions
						</li>
					</ul>
				</div>
			</div>
		</DialogContent>
	)
}

export function FODAGuide() {
	return (
		<DialogContent className="sm:max-w-md">
			<DialogHeader>
				<DialogTitle>Guía Análisis FODA</DialogTitle>
				<DialogDescription>
					Comprender cómo calificar los factores en su análisis FODA{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="text-secondary space-y-6">
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
							<span className="font-medium">0.26-0.50 (Moderada)</span>: Notable pero no crítico
						</li>
						<li>
							<span className="font-medium">0.51-0.75 (Alta)</span>: Impacto significativo en el
							éxito
						</li>
						<li>
							<span className="font-medium">0.76-1.00 (Crítica)</span>: Esencial para el éxito o el
							fracaso
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
							<span className="font-medium">1 (Pobre)</span>: Desventaja o debilidad significativa
						</li>
						<li>
							<span className="font-medium">2 (Justa)</span>: Rendimiento por debajo del promedio
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
						El puntaje ponderado (importancia × calificación) ayuda a priorizar los factores. Los
						puntajes más altos para Fortaleza y Oportunidadas son mejores, mientras que los puntajes
						más altos para debilidas y amenaza indican áreas que necesitan atención.
					</p>
				</div>
			</div>
		</DialogContent>
	)
}
