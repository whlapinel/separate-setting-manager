'use client';

import Link from "next/link";
import { user } from "@/lib/definitions";
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from "react";
import { useParams } from "next/dist/client/components/navigation";


export default function SideNav() {
  const [options, setOptions] = useState([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const { classID } = params;

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)

    if (pathname.includes("teacher")) {
      setOptions([...teacherOptions, ...userOptions]);
    } else if (pathname.includes("admin")) {
      setOptions([...adminOptions, ...userOptions]);
    } else {
      setOptions(userOptions);
    }
  }, [pathname, searchParams])

  type option = {
    name: string,
    url: string,
  }

  const teacherOptions: Array<option> = [
    { name: 'Teacher Home', url: `/teacher/` },
    { name: 'View Classes', url: `/teacher/view-classes` },
    { name: 'Add Class', url: `/teacher/add-class` },
    { name: 'Calendar', url: `/teacher/calendar` },
  ];

const adminOptions = [
  { name: 'Admin Home', url: `/admin` },
  { name: 'Users', url: `/admin/users` },
  { name: 'Pending Applications', url: `/admin/pending-applications` },
  { name: 'Testing Rooms', url: `/admin/testing-rooms` },
  { name: 'Room Assignments', url: `/admin/room-assignments` },
];

const userOptions = [
  { name: 'User Home', url: `/` },
  { name: 'Apply for Role', url: `/apply-for-role` },
]

console.log("params", params);

const optionElements = options.map((option) => {
  return (
    <Link href={option.url} key={option.name}>{option.name}</Link>
  )
})

return (
  <>
    <div className="flex flex-col p-4 w-fit">
      {optionElements}
    </div>
  </>
);
}
