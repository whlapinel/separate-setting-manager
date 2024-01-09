import '@/app/globals.css';

import { getStudents, getTestEvents } from '@/lib/data';
import { roomAssignment, student, studentRoomAssignment } from '@/lib/definitions';
import { testEvent } from '@/lib/definitions';
import { testClass } from '@/lib/definitions';
import RoomAssignmentTable from './room-assignment';

export default async function DailySchedule({ date, assignments }: { date: Date, assignments: Array<studentRoomAssignment> }) {

  const dateHeader = <h3>{date.toDateString()}</h3>

  const roomAssignments = assignments.map((assignment) => {
    return (
      <div className=' flex flex-col' key={assignment.room}>
        <RoomAssignmentTable room={assignment.room} students={assignment.students}/>
      </div>
    )
  })

  return (
    <>
      {dateHeader}
      {roomAssignments}
    </>
  )
}