import Link from "next/link";

export default function SideNav({ user, params }) {

  console.log("params", params);

  const { classID } = params;

  let options = [
    { name: 'My Classes', url: `/${user.id}/my-classes/` }
  ];

  if (classID) {
    options = [
      ...options,
      { name: 'Add Student', url: `/${user.id}/my-classes/${classID}/add-student`, },
      { name: 'Add Test Event', url: `/${user.id}/my-classes/${classID}/add-class`, },
    ]
  }

  const optionElements = options.map((option) => {
    return (
      <Link href={option.url}>{option.name}</Link>
    )
  })

  return (
    <>
      <div className="side-nav">
        <p>{user.firstName} {user.lastName}</p>
        {optionElements}
      </div>
    </>
  );
}
