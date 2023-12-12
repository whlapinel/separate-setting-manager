import SideNav from "@/app/(components)/side-nav";
import { Suspense } from "react";
import { NavigationEvents } from "../(components)/navigation-events";

export default function TeacherLayout({ children, params }) {
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");

  return (
    <>
      <div className="teacher-dashboard">
        <SideNav teacher={teacher} />
        <div className="teacher-dashboard-main">
          <h3 className="main-header">{teacher}</h3>
          {children}
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </div>
      </div>
    </>
  );
}
