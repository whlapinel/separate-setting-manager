
export default function RoleApplicationPage() {

    return (
        <>
            <h3>ApplicationPage</h3>
            <p>If you have reached this page, it is because you have a CMS email address but have not been assigned a role within the web application. Please select a role to apply for and then click 'submit.'</p>
            <p>Once your role has been approved, you will be able to log in to the web application.</p>
            <form>
                <label htmlFor="role">Role:</label>
                <select id="role" name="role">
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="admin">Admin</option>
                </select>
            </form>
            <button type="submit">Submit</button>
        </>
    );
}
