import { createFileRoute, Link, Outlet } from "@tanstack/react-router"
import { CircleUserRound, Settings } from "lucide-react"

import { Logout } from "@/client/components/logout"
import { Avatar, AvatarFallback, AvatarImage } from "@/client/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu"

import { buttonVariants, cn } from "../lib/utils"
import { useStore } from "../store"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
})

function RouteComponent() {
	const { isLoggedIn, usuario: data } = useStore()

	return (
		<div className="font-raleway flex h-full flex-col">
			<header
				className={cn(
					"w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white/80",
					isLoggedIn ? "inline" : "sticky top-0 z-50",
				)}>
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
					{!isLoggedIn && (
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
					)}
					{!isLoggedIn ? (
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
					) : (
						<div className="flex items-center gap-2">
							<div className="flex flex-col items-end">
								<span className="text-sm font-medium">
									{data?.nombre} {data?.apellido}
								</span>
								<span className="text-xs">{data?.email}</span>
							</div>
							<Avatar>
								<DropdownMenu>
									<DropdownMenuTrigger className="w-full hover:cursor-pointer">
										<AvatarImage
											src={data?.image ?? ""}
											width={32}
											height={32}
											alt="profile-image"
										/>
										<AvatarFallback>
											{data?.nombre?.substring(0, 1)?.toUpperCase() ?? <CircleUserRound />}
											{data?.apellido?.substring(0, 1)?.toUpperCase()}
										</AvatarFallback>
										<DropdownMenuContent className="font-raleway">
											<DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<Link to="/ajustes" className="flex w-full items-center gap-2">
													<Settings />
													<span>Ajustes</span>
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Logout />
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenuTrigger>
								</DropdownMenu>
							</Avatar>
						</div>
					)}
				</div>
			</header>
			<div className="min-h-screen">
				<Outlet />
			</div>
			<footer className="bg-secondary relative bottom-0 z-10 w-full border-t text-white">
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
