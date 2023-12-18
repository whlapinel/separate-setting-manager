
import UnitContainer from "./unit-container";
import { testClass } from "@/lib/definitions";


export default function UnitList({ testClasses, userID }: { testClasses: Array<testClass>, userID: string}) {

  console.log('rendering UnitList (client component');

  const testClassElements: React.ReactNode = testClasses?.map((testClass: testClass) => {
    return (
      <UnitContainer testClass={testClass} key={testClass.id}/>
    );
  });

  return (
    <>
      <h4 className="form-header">My Classes</h4>
      <div className="unit-list">{testClassElements}</div>
    </>
  );
}
