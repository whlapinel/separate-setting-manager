'use client';

export default function Buttons({handleDelete, handleEdit, id, teacher}) {
  console.log('rerendering Buttons (client component)');
  return (
    <div className="btn-container" id={id}>
      <button className="delete-btn" onClick={handleDelete}>Del.</button>
      <button className="edit-btn" onClick={handleEdit}>Ed.</button>
    </div>
  );
}
