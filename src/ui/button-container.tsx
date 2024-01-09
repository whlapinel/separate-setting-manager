import { tableName } from "@/lib/definitions";
import EditButton from "@/ui/edit-button";
import DeleteItemForm from "@/app/teacher/view-classes/classes/[classID]/(components)/(client components)/delete-item-form";
import { table } from "console";

export default function ButtonContainer({ id, tableName, handleEdit, canDelete }: { id: string, tableName: tableName, handleEdit: Function, canDelete?: boolean }) {
    return (
        <div className={`ml-4 flex flex-shrink-0 gap-1 h-8`}>
            <EditButton id={id} tableName={"students"} handleEdit={handleEdit} />
            <span>{' '}</span>
            <DeleteItemForm id={id} tableName={tableName} canDelete={canDelete}/>
        </div>
    )
}


