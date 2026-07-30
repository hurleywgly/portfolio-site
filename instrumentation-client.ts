import posthog from "posthog-js"

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2026-05-30",
    person_profiles: "identified_only",
    disable_session_recording: true,
  })
}
