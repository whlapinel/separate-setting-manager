import { Fragment } from "react";
import AddTestingRoomForm from "../testing-rooms/(components)/add-test-room-form";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Client } from "pg";
import { roomAssignment, testRoom } from "@/lib/definitions";
import RoomAssignmentsTable from "./(components)/room-assignment-table";

export default async function RoomAssignmentsPage() {

    async function getRoomAssignments() {
        const client = new Client();
        let status = "success";
        let intervals: Array<roomAssignment>;
        try {
            await client.connect();
            const res = await client.query(
                `SELECT * FROM "roomAssignments"
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

    async function getTestRooms() {
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

    const roomAssignments = await getRoomAssignments();
    const testRooms = await getTestRooms();

    const primaryAssignments = roomAssignments.filter((roomAssignment) => roomAssignment.desig === 'primary');
    const secondaryAssignments = roomAssignments.filter((roomAssignment) => roomAssignment.desig === 'secondary');
    const tertiaryAssignments = roomAssignments.filter((roomAssignment) => roomAssignment.desig === 'tertiary');
    const oneToOneAssignments = roomAssignments.filter((roomAssignment) => roomAssignment.desig === '1:1');

    return (
        <div className="flex flex-col w-5/6">
            <RoomAssignmentsTable desig={'primary'}
                desigDescription={'Primary testing room for students with "12 or less" accommodation'}
                intervals={primaryAssignments}
                testRooms={testRooms} />
            <RoomAssignmentsTable desig={'secondary'}
                desigDescription={'Secondary testing room for students with "12 or less" accommodation'}
                intervals={secondaryAssignments}
                testRooms={testRooms} />
            <RoomAssignmentsTable desig={'tertiary'}
                desigDescription={'Tertiary testing room for students with "12 or less" accommodation'}
                intervals={tertiaryAssignments}
                testRooms={testRooms} />
            <RoomAssignmentsTable desig={'1:1'}
                desigDescription={'Testing room for students with 1:1 accommodation'}
                intervals={oneToOneAssignments}
                testRooms={testRooms} />
        </div>
    )
}