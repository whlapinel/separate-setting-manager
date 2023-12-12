import UnitContainer from "./unit-container";

export default function UnitList({ testUnits, teacher }) {
  const userUnits = testUnits.filter((unit) => {
    return unit.teacher === teacher;
  });
  const unitList = userUnits.map((unit) => {
    return (
      <UnitContainer unit={unit} key={unit.id}/>
      );
  });

  return (
    <>
      <h4 className="form-header">My Students</h4>
      <div className="unit-list">{unitList}</div>
    </>
  );
}
