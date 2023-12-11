'use client';

export default function Buttons({handleDelete, handleEdit, id, nameOfClass, teacher}) {
  return (
    <div className="btn-container" id={id} nameOfClass={nameOfClass} teacher={teacher}>
      <button className="delete-btn" onClick={handleDelete}>Del.</button>
      <button className="edit-btn" onClick={handleEdit}>Ed.</button>
    </div>
  );
}
