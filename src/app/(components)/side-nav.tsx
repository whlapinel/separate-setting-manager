
import Link from "next/link";
import type { option } from "@/lib/definitions";



export default function SideNav({options}: {options: Array<option>}) {

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
