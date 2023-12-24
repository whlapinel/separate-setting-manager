'use server';

export default async function roleApplicationAction(prevState, formData): Promise<object> {

    const { userID } = formData.get("userID");
    const { role } = formData.get("role");
    const { firstName } = formData.get("firstName");
    const { lastName } = formData.get("lastName");

    const client = new Client();
    

    const message = {
        status
    };

    return message;

}
