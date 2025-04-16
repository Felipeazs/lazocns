import { createFileRoute, Link, Outlet } from "@tanstack/react-router"

import { buttonVariants } from "../lib/utils"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="font-raleway flex min-h-screen flex-col">
			<header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white/80">
				<div className="container flex h-16 items-center justify-between">
					<Link
						to="/"
						className="flex items-center gap-2"
						activeProps={{ className: "text-black" }}>
						<div className="bg-primary rounded-full p-1.5">
							<img
								src="/placeholder.svg?height=24&width=24"
								alt="logo"
								width={24}
								height={24}
								className="invert"
							/>
						</div>
						<span className="text-secondary text-xl font-bold">LazoCNS</span>
					</Link>
					<nav className="hidden gap-6 md:flex">
						<Link
							to="/"
							activeProps={{ className: "font-bold" }}
							className="text-secondary hover:text-primary text-sm font-medium transition-colors">
							Inicio
						</Link>
						<a
							href="/#about"
							className="text-secondary hover:text-primary text-sm font-medium transition-colors">
							Quiénes Somos
						</a>
						<a
							href="/#servicios"
							className="text-secondary hover:text-primary text-sm font-medium transition-colors">
							Servicios
						</a>
						<a
							href="/#precios"
							className="text-secondary hover:text-primary text-sm font-medium transition-colors">
							Precios
						</a>
						<a
							href="/#contact"
							className="text-secondary hover:text-primary text-sm font-medium transition-colors">
							Contacto
						</a>
					</nav>
					<div className="flex items-center gap-4">
						<Link
							to="/login"
							activeProps={{ className: "text-3xl" }}
							className={buttonVariants({
								variant: "outline",
								className:
									"text-secondary hover:text-primary hidden text-sm font-medium transition-colors sm:block",
							})}>
							Entrar
						</Link>
						<Link
							to="/registro"
							activeProps={{ className: "font-bold" }}
							className={buttonVariants({
								className: "bg-primary text-secondary hover:bg-primary/90",
							})}>
							Regístrate
						</Link>
					</div>
				</div>
			</header>
			<div className="min-h-screen">
				<Outlet />
			</div>
			<footer className="bg-secondary w-full border-t text-white">
				<div className="container flex flex-col gap-8 px-4 py-12 md:px-6">
					<div className="text-sm text-white/70">
						© {new Date().getFullYear()} Lazo Consultora de Negocios Sustentable. Todos los
						derechos reservados.
					</div>
				</div>
			</footer>
		</div>
	)
}
