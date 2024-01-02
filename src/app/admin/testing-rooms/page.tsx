import { Fragment } from "react";
import AddTestingRoomForm from "./(components)/add-test-room-form";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Client } from "pg";
import { roomAssignment, testRoom } from "@/lib/definitions";
import TestRoomsTable from "./(components)/test-rooms-table";

export default async function TestRoomsPage() {



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

    const testRooms = await getTestRooms();

    return (
        <Fragment>
            <div className="flex flex-col w-5/6">
                <AddTestingRoomForm testRooms={testRooms} />
                <TestRoomsTable testRooms={testRooms} />
            </div>
        </Fragment >
    )
}