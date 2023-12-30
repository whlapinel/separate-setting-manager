import { Link } from "@/ui/link";

export default function CalNavBtn({name, link}) {
    return (
        <Link className="border p-1 rounded w-48 items-center text-center" href={link}>
        {name}
      </Link>

    )
}