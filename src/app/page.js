import Image from "next/image";
import styles from '@/app/globals.css';
import Link from 'next/link';


export default function Home() {
  return(
  <main>
    <h1>Separate Setting Manager</h1>
    <Link href="my-students">
    My Students
    </Link>
  </main>
  );
}
