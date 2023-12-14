'use client'
 
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
 
export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
 
  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)
    // You can now use the current URL
    // ...
    if (pathname === "/[teacher]/my-students") {
      console.log("pathname is /[teacher]/my-students");
    }
    // refresh if refresh query param is true
    // console.log('searchParams.get("refresh")', searchParams.get("refresh"));
    // if (searchParams.get("refresh")) {
    //   console.log("refreshing page...");
    //   router.refresh();
    //   console.log("page refreshed");
    //   router.replace(pathname);
    // }
  }, [pathname, searchParams])
 
  return null
}