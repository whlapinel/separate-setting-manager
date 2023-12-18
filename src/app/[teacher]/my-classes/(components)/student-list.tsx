
import { student } from "@/lib/definitions";

export default function StudentList({students}: {students: Array<student>}) {
  console.log("rendering StudentList (server component)");

  console.log("students");
  console.log(students);

  const studentElements = students?.map((student) => {
      return (
        <>
          <div
            className={"row-container"}
            key={student.id}
          >
            <p>
              <span>{student.firstName}</span>
              <span> </span> 
              <span>{student.lastName}</span>            
            </p>
          </div>
        </>
      );
    });

  return (
    <>
      <div className="student-container">
        {studentElements ? studentElements : <p>no students</p>}
      </div>
    </>
  );
}
