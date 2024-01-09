import { Link } from "./link"

export default function HomePageOptions({ options }) {

    return (
        <ul role="list" className="grid grid-cols-2 gap-2">

            {options.slice(1).map((option) => {

                return (
                    <Link href={option.url} key={option.url}>
                        <li key={option.url} className="overflow-hidden bg-indigo-600 text-cyan-50 px-4 py-4 shadow sm:rounded-md sm:px-6">
                            {option.name}
                        </li>
                    </Link>
                )
            })}
        </ul>


    )
}