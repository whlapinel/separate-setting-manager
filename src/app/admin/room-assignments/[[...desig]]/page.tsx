import { Client } from "pg";
import { roomAssignment, testRoom } from "@/lib/definitions";
import RoomAssignmentsTable from "../(components)/room-assignment-table";
import { Tab } from "@headlessui/react";

export default async function RoomAssignmentsPage({params}) {

    const { desig } = params;
    if (!desig) {
        return <div>please select a designation</div>
    }

    async function getRoomAssignments(): Promise<Array<roomAssignment>> {
        const client = new Client();
        let status = "success";
        let intervals: Array<roomAssignment>;
        try {
            await client.connect();
            const res = await client.query(
                `SELECT * FROM "roomAssignments" WHERE "desig" = '${desig}' 
                  ORDER BY "startDate" ASC`,
            );
            console.log(res.rows);
            status = "success";
            intervals = res.rows;
        } catch (err) {
            console.log(err);
            status = "error";
        }
        finally {
            await client.end();
            console.log(status);
            return intervals;
        }
    }

    async function getTestRooms(): Promise<Array<testRoom>> {
        const client = new Client();
        let status = "success";
        let testRooms: Array<testRoom>;
        try {
            await client.connect();
            const res = await client.query(
                `SELECT * FROM "testRooms"`,
            );
            console.log(res.rows);
            status = "success";
            testRooms = res.rows;
        } catch (err) {
            console.log(err);
            status = "error";
        }
        finally {
            await client.end();
            console.log(status);
            return testRooms;
        }
    }

    const [roomAssignments, testRooms] = await Promise.all([getRoomAssignments(), getTestRooms()]);


    return (
        <div className="flex flex-col w-5/6">
            <RoomAssignmentsTable desig={desig} roomAssignments={roomAssignments} testRooms={testRooms}/>
        </div>
    )
}