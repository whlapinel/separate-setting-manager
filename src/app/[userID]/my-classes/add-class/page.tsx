import { useSearchParams } from "next/navigation";
import AddClassForm from "../(components)/(client components)/add-class-form";

export default function AddClass({searchParams}) {

    const userID = searchParams.teacher;
  return (
    <div>
        <AddClassForm userID={userID}/>
    </div>
  )
}
