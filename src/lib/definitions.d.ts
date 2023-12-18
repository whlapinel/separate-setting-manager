
type user = {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    role: 'teacher' | 'admin';
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

type tableName = 'testClasses' | 'students' | 'testEvents';

export type { user, testClass, student, testEvent, tableName };