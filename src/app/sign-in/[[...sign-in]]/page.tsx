import {SignIn} from "@clerk/nextjs";
 
export default function SignInPage() {

  return (
    <>
    <p>This app uses Clerk for authentication. You can sign in with an existing account or sign up for a new account.</p>
    <SignIn signUpUrl="/sign-up"/>;
    </>
    )
}