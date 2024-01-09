import { tableName } from "@/lib/definitions"
import { Button } from "./button"
import { MouseEventHandler } from "react"
import { useState } from "react"

export default function AddItemButton({ name, handleClickAdd }: {name: tableName, handleClickAdd: MouseEventHandler}) {

    return (
        <Button color='blue' className={'h-8 w-8'} name={name} onClick={handleClickAdd}>+</Button>
    )
}