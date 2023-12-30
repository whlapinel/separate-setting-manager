'use server';

export async function addRoomAssignmentAction(prevState, formData) {
    console.log(prevState, formData);

    const {roomNumber, startDate, endDate, desig} = formData;
    console.log(roomNumber);
    console.log(startDate);
    console.log(endDate);
    console.log(desig);
    
}