import { Link, useLocation } from "@tanstack/react-router"
import { BarChart, Gauge, Grid3x3, Home, Settings } from "lucide-react"

import { cn } from "../lib/utils"
import { Logout } from "./logout"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar"

const items = [
	{
		title: "FODA",
		url: "/foda",
		icon: BarChart,
	},
	{
		title: "VRIO",
		url: "/vrio",
		icon: Grid3x3,
	},
	{
		title: "Organizacional",
		url: "/org",
		icon: Gauge,
	},
]

export function AppSidebar() {
	const { pathname } = useLocation()
	return (
		<Sidebar className="bg-secondary h-full p-4">
			<SidebarContent className="">
				<SidebarGroup />
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem className="grid w-full gap-2">
							<SidebarMenuButton
								className={cn(
									"w-full justify-start",
									pathname === "/panel" && "bg-muted font-medium",
								)}
								variant={pathname === "/panel" ? "outline" : "default"}
								asChild>
								<Link
									to="/panel"
									viewTransition
									className={cn(
										"flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
										pathname === "/panel"
											? "bg-primary text-secondary"
											: "text-white/70 hover:bg-white/10 hover:text-white",
									)}>
									<Home />
									<span>Panel Principal</span>
								</Link>
							</SidebarMenuButton>
							<SidebarMenuButton
								className={cn(
									"w-full justify-start",
									pathname === "/ajustes" && "bg-muted font-medium",
								)}
								variant={pathname === "/ajuste" ? "outline" : "default"}
								asChild>
								<Link
									to="/ajustes"
									viewTransition
									className={cn(
										"flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
										pathname === "/ajustes"
											? "bg-primary text-secondary"
											: "text-white/70 hover:bg-white/10 hover:text-white",
									)}>
									<Settings />
									<span>Ajustes</span>
								</Link>
							</SidebarMenuButton>

							<SidebarGroupLabel className="text-accent">Análisis</SidebarGroupLabel>
							{items.map((item) => {
								const isActive = pathname === item.url
								return (
									<SidebarMenuButton
										key={item.title}
										className={cn(
											"w-full justify-start",
											pathname === item.url && "bg-muted font-medium",
										)}
										variant={pathname === item.url ? "outline" : "default"}
										asChild>
										<Link
											to={item.url}
											viewTransition
											className={cn(
												"flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
												isActive
													? "bg-primary text-secondary"
													: "text-white/70 hover:bg-white/10 hover:text-white",
											)}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								)
							})}
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem className="flex w-full">
						<Logout />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
