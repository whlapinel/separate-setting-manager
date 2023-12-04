import SideNav from "@/ui/side-nav";

export default function TeacherLayout({ children, params }) {
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");

  return (
    <>
      <div className="teacher-dashboard">
        <SideNav 
        teacher={teacher}
        />
        <div className="teacher-dashboard-main">
          <h3>{[teacher]}'s Dashboard</h3>
          {children}
        </div>
      </div>
    </>
  );
}
