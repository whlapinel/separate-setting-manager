
import UnitContainer from "./unit-container";
import { testClass } from "@/lib/definitions";


export default function UnitList({ testClasses, params }: { testClasses: Array<testClass>, params: any}) {

  console.log('rendering UnitList (client component');

  const testClassElements: React.ReactNode = testClasses?.map((testClass: testClass) => {
    return (
      <UnitContainer testClass={testClass} key={testClass.id} params={params}/>
    );
  });

  return (
    <>
      <h4 className="form-header">My Classes</h4>
      <div className="unit-list">{testClassElements}</div>
    </>
  );
}
