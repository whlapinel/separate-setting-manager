import { student } from "@/lib/definitions";


export default function RoomAssignmentTable({ room, students }: { room: string, students: Array<student> }) {

    const studentElements: React.ReactNode = students?.map((student) => {
        return (
            <li
                key={student.id}>
                <span>
                    {student.firstName}
                </span>
                <span> </span>
                <span>
                    {student.lastName}
                </span>
            </li>
        );
    });

    return (
        <div className="flex flex-col">
            <h4>Room: {room}</h4>
            {studentElements}
        </div>
    );

}
