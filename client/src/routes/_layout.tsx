import { createFileRoute, Outlet } from "@tanstack/react-router"

import { Header } from "../components/header"
import { useStore } from "../store"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
})

function RouteComponent() {
	const { isLoggedIn } = useStore()

	return (
		<div className="font-raleway flex h-full flex-col">
			<Header />
			<div className="min-h-screen">
				<Outlet />
			</div>
			<footer className="bg-secondary w-full border-t text-white">
				<div
					className={`container flex flex-col gap-8 px-4 py-12 md:px-6 ${isLoggedIn ? "items-end" : "items-start"}`}>
					<div className="text-sm text-white/70">
						© {new Date().getFullYear()} Lazo Consultora de Negocios Sustentable. Todos los
						derechos reservados.
					</div>
				</div>
			</footer>
		</div>
	)
}
