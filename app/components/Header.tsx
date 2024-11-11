import { signIn } from "next-auth/react"

export default function Header() {
    return (
        <form action={async () => {
            "use server"
             await signIn('google')
        }}>
          <input type="submit" value={'Login'} />
        </form>
    )
}