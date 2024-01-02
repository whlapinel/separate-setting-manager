
import ProtectPage from "@/lib/authorization";


export default async function AdminLayout({ children }) {

    const isAuth: boolean = await ProtectPage("admin");

    if (!isAuth) {
        return (<p>You do not have the admin role</p>)
    }
  
    // otherwise render children
  
  
    return (
        <>
            {children}
        </>
    )
  }
