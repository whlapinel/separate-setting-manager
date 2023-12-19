import AddClassForm from "../(components)/(client components)/add-class-form";

export default function AddClass({params}) {

    const {userID} = params;

    console.log('userID', userID);
    
  return (
    <div>
        <AddClassForm userID={userID}/>
    </div>
  )
}
