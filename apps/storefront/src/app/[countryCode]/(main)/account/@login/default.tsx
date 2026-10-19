// Rendered for account sub-pages (orders, profile, addresses) that this slot
// has no page for. Without it, a full-page load of one of them while logged out
// renders a 404 instead of the sign-in form.
export { default } from "./page"
