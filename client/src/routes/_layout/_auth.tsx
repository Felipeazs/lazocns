import { createFileRoute, Outlet } from "@tanstack/react-router"

import { Login } from "@/client/components/login"

import { AppSidebar } from "../../components/app-sidebar"
import { SidebarProvider } from "../../components/ui/sidebar"
import { authMeQueryOptions } from "../../lib/queries"

export const Route = createFileRoute("/_layout/_auth")({
	beforeLoad: async ({ context: { queryClient, store } }) => {
		try {
			const data = await queryClient.fetchQuery(authMeQueryOptions())

			if (data && !store.isLoggedIn) {
				store.reenter()
			}

			return data
		} catch {
			store.quit()

			return { usuario: null }
		}
	},
	component: AuthRoute,
})

function AuthRoute() {
	const { usuario } = Route.useRouteContext()

	if (!usuario) {
		return <Login />
	}

	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<div className="bg-accent w-full">
					<main className="bg-accent text-secondary flex w-[98%] flex-col items-center p-5 text-xs md:items-start lg:w-[60%] lg:justify-start lg:text-sm xl:w-[60%] 2xl:w-[40%]">
						<Outlet />
					</main>
				</div>
			</SidebarProvider>
		</>
	)
}
