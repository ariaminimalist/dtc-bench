import { Metadata } from "next"

import { retrieveCustomer } from "@lib/data/customer"
import LoginTemplate from "@modules/account/templates/login-template"

// Next.js merges the metadata of both account slots and reads this one after
// @dashboard's, so a static title here would also title the logged-in
// dashboard. Title the page only when the layout shows this slot.
export async function generateMetadata(): Promise<Metadata> {
  const customer = await retrieveCustomer().catch(() => null)

  if (customer) {
    return {}
  }

  return {
    title: "Sign in",
    description: "Sign in to your Medusa Store account.",
  }
}

export default function Login() {
  return <LoginTemplate />
}
