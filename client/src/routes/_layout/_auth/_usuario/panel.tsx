import { createFileRoute } from "@tanstack/react-router"

import ResumenAnalisis from "./-components/resumen-analisis"

export const Route = createFileRoute("/_layout/_auth/_usuario/panel")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="max-w-[1000px] space-y-8 lg:w-[700px] xl:w-[1000px]">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Panel Principal</h1>
				<p className="text-muted-foreground mt-2">Bienvenido! Este es tu panel principal</p>
			</div>
			<div className="space-y-6">
				<ResumenAnalisis />
			</div>
		</div>
	)
}
