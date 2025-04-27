import { HTTPException } from "hono/http-exception"
import { PostHog } from "posthog-node"

import { env } from "../t3-env"
import { ERROR_CODE } from "./constants"

let client: PostHog | null = null

export function initPosthog() {
	if (!client) {
		client = new PostHog(env.POSTHOG_APIKEY, {
			host: env.POSTHOG_HOST,
			enableExceptionAutocapture: true,
		})

		client.on("error", (_err) => {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, {
				message: "An error occurred connecting to PostHog",
			})
		})
	}

	return client
}

type PostHogEvent = {
	distinct_id: string
	event: string
	properties?: object
}

export function captureEvent({ distinct_id, event, properties }: PostHogEvent) {
	try {
		if (env.NODE_ENV === "production" && client) {
			client.capture({
				distinctId: distinct_id,
				event,
				properties: properties ? sanitizeProperties(properties) : undefined, // Sanitize properties
			})
		}
	} catch (_err) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, {
			message: "An error occurred while capturing the event.",
		})
	}
}

function sanitizeProperties(properties: object): object {
	// Implement sanitization logic to remove sensitive information
	return properties
}
