
type role = 'teacher' | 'admin' | 'user';

type user = {
    firstName: string;
    lastName: string;
    email: string; 
    id: string; // this should be google's id, not clerk's
    roles: Array<role>;
    pendingRoles: Array<role>;
};

type testClass = {
    name: string;
    id: string;
    block: number;
    occurrence: 'A' | 'B' | 'AB';
    teacher: user['id'];
};

type student = {
    id: string;
    firstName: string;
    lastName: string;
    testClass: testClass['id'];
};

type testEvent = {
    testName: string;
    id: string;
    testClass: testClass['id'];
    testDate: Date;
};

type status = 'success' | 'error';

type tableName = 'testClasses' | 'students' | 'testEvents';

export type { user, testClass, student, testEvent, tableName, status, role, };