import { NotificationFeedPopover, NotificationIconButton } from "@knocklabs/react"
import { Link, useLocation } from "@tanstack/react-router"
import { CircleUserRound, Settings } from "lucide-react"
import { useRef, useState } from "react"

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

import "@knocklabs/react/dist/index.css"

export function Header() {
	const { pathname } = useLocation()

	const [isVisible, setIsVisible] = useState(false)
	const notifyButtonRef = useRef(null)

	const { isLoggedIn, usuario: data } = useStore()

	return (
		<header
			className={cn(
				"w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white/80",
				isLoggedIn ? "inline" : "sticky top-0 z-50",
			)}>
			<div className="container flex h-16 items-center justify-between">
				{!isLoggedIn && (
					<Link
						to="/"
						className="flex items-center gap-2"
						activeProps={{ className: "text-black" }}>
						<div className="bg-primary hidden rounded-full p-1.5 md:inline">
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
				)}
				{!isLoggedIn && pathname === "/" && (
					<nav className="hidden gap-2 md:flex lg:gap-6">
						<a
							href="#hero"
							className="text-secondary hover:text-primary text-sm font-medium transition-colors">
							Inicio
						</a>
						<a
							href="#about"
							className="text-secondary hover:text-primary text-sm font-medium transition-colors">
							Quiénes Somos
						</a>
						<a
							href="#servicios"
							className="text-secondary hover:text-primary text-sm font-medium transition-colors">
							Servicios
						</a>
						<a
							href="#precios"
							className="text-secondary hover:text-primary text-sm font-medium transition-colors">
							Precios
						</a>
						<a
							href="#contact"
							className="text-secondary hover:text-primary text-sm font-medium transition-colors">
							Contacto
						</a>
					</nav>
				)}
				{!isLoggedIn ? (
					<div className="flex items-center gap-1 md:gap-4">
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
					<div className="ml-auto flex items-center gap-4">
						<div className="mr-5">
							<NotificationIconButton
								ref={notifyButtonRef}
								onClick={() => setIsVisible(!isVisible)}
							/>
							<NotificationFeedPopover
								// @ts-ignore
								buttonRef={notifyButtonRef}
								isVisible={isVisible}
								onClose={() => setIsVisible(false)}
							/>
						</div>
						<div className="flex flex-col items-end">
							<span className="text-sm font-medium">
								{data?.nombre} {data?.apellido}
							</span>
							<span className="text-xs">{data?.email}</span>
						</div>
						<Avatar>
							<DropdownMenu>
								<DropdownMenuTrigger className="w-full hover:cursor-pointer">
									<AvatarImage src={data?.image ?? ""} width={32} height={32} alt="profile-image" />
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
									</DropdownMenuContent>
								</DropdownMenuTrigger>
							</DropdownMenu>
						</Avatar>
					</div>
				)}
			</div>
		</header>
	)
}
