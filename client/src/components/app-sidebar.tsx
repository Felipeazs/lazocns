import { Link, useLocation } from "@tanstack/react-router"
import { BarChart, Gauge, Grid3x3, Home, Settings } from "lucide-react"

import { cn } from "../lib/utils"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar"

const items = [
	{
		title: "Panel Principal",
		url: "/panel",
		icon: Home,
	},
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
	{
		title: "Ajustes",
		url: "/ajustes",
		icon: Settings,
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
		</Sidebar>
	)
}
