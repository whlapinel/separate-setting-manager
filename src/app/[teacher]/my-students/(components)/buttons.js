'use client';

export default function Buttons({handleDelete, handleEdit, id, unitID}) {
  return (
    <div className="btn-container" id={id} unitID={unitID}>
      <button className="delete-btn" onClick={handleDelete}>Del.</button>
      <button className="edit-btn" onClick={handleEdit}>Ed.</button>
    </div>
  );
}
