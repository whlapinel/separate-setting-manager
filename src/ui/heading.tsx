
export default function Heading({children}: {children: string}) {

return (
    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight m-2">{children}</h1>
    )
}
