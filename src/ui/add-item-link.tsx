import { tableName } from "@/lib/definitions"
import { Button } from "./button"
import { MouseEventHandler } from "react"
import { useState } from "react"
import { Link } from "./link"

export default function AddItemLink({ name, handleClickAdd }: {name?: tableName, handleClickAdd?: MouseEventHandler}) {

    return (
        <Link href={"/teacher/add-class"}>+</Link>
    )
}