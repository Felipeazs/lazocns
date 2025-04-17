import { createFileRoute } from "@tanstack/react-router"

import { FodaForm } from "./-components/foda-form"

export const Route = createFileRoute("/_layout/_auth/_usuario/foda")({
	component: RouteComponent,
})

function RouteComponent() {
	return <FodaForm />
}
