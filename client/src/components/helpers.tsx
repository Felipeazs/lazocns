import type { ReactNode } from "react"

import { Info } from "lucide-react"

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
