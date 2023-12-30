
export type roomAssignment = {
    roomNumber: string;
    startDate: Date;
    endDate: Date;
    assignmentID: number;
    desig: 'primary' | 'secondary' | 'tertiary' | '1:1';
}

export type testRoom = {
    roomNumber: string;
    roomDescription: string;
}

export type role = 'teacher' | 'admin' | 'user';

export type user = {
    firstName: string;
    lastName: string;
    email: string; 
    id: string; // this should be google's id, not clerk's
    roles: Array<role>;
    pendingRoles: Array<role>;
};

export type testClass = {
    name: string;
    id: string;
    block: number;
    occurrence: 'A' | 'B' | 'AB';
    teacher: user['id'];
};

export type student = {
    id: string;
    firstName: string;
    lastName: string;
    testClass: testClass['id'];
    accommodation?: '1:1' | '12 or fewer';
};

export type testEvent = {
    testName: string;
    id: string;
    testClass: testClass['id'];
    testDate: Date;
};

export type studentRoomAssignment = {
    room: string,
    students: Array<student>,
}

export type assignmentMap = Map<Date, Array<studentRoomAssignment>>

export type status = 'success' | 'error';

export type tableName = 'testClasses' | 'students' | 'testEvents';