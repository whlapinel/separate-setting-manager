import Image from "next/image";
import styles from "@/app/globals.css";
import Link from "next/link";
import GetTestData from "@/lib/data";
import { Navigation } from "next/navigation";


export default async function Home({ params }) {

  const testUnits = await GetTestData();
  const teacherList = testUnits.map((unit) => {
    return (
      <Link
        href={`/${unit.teacher}`}
        teacher={unit.teacher}
        key={unit.teacher}
      >
        {unit.teacher}
      </Link>
    );
  });

  return (
    <main>
      <h3>
        "Log in" (Select Teacher from list)
      </h3>
        <div className="teacher-list-container">{teacherList}</div>
    </main>
  );
}
