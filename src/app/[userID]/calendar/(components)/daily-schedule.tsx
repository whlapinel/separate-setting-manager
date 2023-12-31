import '@/app/globals.css';

import { getStudents, getTestEvents } from '@/lib/data';
import { roomAssignment, student, studentRoomAssignment } from '@/lib/definitions';
import { testEvent } from '@/lib/definitions';
import { testClass } from '@/lib/definitions';
import RoomAssignmentTable from './room-assignment';

export default async function DailySchedule({ date, assignments }: { date: Date, assignments: Array<studentRoomAssignment> }) {


  return (
    assignments.map((assignment) => {

      return (
        <div className=' flex flex-col'>
          <RoomAssignmentTable room={assignment.room} students={assignment.students} key={assignment.room}/>
        </div>
      )
    })
  )
}