import type { ReactNode } from "react"

import { KnockFeedProvider, KnockProvider } from "@knocklabs/react"

import { useStore } from "../store"
import { env } from "../t3-env"

export function KnockClientProvider({ children }: { children: ReactNode }) {
	const { usuario } = useStore()
	return (
		<KnockProvider
			apiKey={env.VITE_KNOCK_PUBLIC_API_KEY}
			userId={usuario?.id ?? ""}
			i18n={{
				translations: {
					notifications: "Notificaciones",
					markAllAsRead: "Marcar todos como leídos!",
					all: "todos",
					unread: "no leídos",
					read: "leídos",
					emptyFeedTitle: "Sin notificaciones",
					emptyFeedBody: "Te avisaremos cuando tengamos noticias para tí",
				},
				locale: "es",
			}}>
			<KnockFeedProvider feedId={env.VITE_KNOCK_FEED_CHANNEL_ID}>{children}</KnockFeedProvider>
		</KnockProvider>
	)
}
