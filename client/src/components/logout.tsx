import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { LogOut } from "lucide-react"

import { logout } from "../lib/queries"
import { useStore } from "../store"
import { Button } from "./ui/button"

export function Logout() {
	const { quit } = useStore()
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			quit()

			queryClient.invalidateQueries({ queryKey: ["auth"] })

			navigate({ to: "/" })
		},
	})

	const handleLogout = () => {
		mutate()
	}

	return (
		<Button
			variant="ghost"
			size="sm"
			className="m-0 flex w-full justify-start p-0 text-red-500 hover:cursor-pointer"
			onClick={handleLogout}>
			<LogOut className="h-4 w-4 text-red-500" />
			Salir
		</Button>
	)
}
