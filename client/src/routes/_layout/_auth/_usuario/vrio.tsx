import { createFileRoute } from "@tanstack/react-router"

import VRIOForm from "./-components/vrio-form"

export const Route = createFileRoute("/_layout/_auth/_usuario/vrio")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			<VRIOForm />
		</div>
	)
}
