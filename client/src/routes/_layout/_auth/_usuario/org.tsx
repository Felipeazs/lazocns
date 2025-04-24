import { createFileRoute } from "@tanstack/react-router"

import ORGForm from "./-components/org-form"

export const Route = createFileRoute("/_layout/_auth/_usuario/org")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			<ORGForm />
		</div>
	)
}
