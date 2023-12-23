
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

export default function NotAuthorizedPage() {
    return (
        <>
            <h1>Not Authorized</h1>
            <p>You have reached this page because you are currently logged in with a non-CMS email address. Please select a different Google account.</p>
            <Link href="./sign-up">Sign Up</Link>
        </>
    )
}
