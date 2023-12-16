import React, { useState } from "react";
import Buttons from "./buttons";
import DetailsModal from "./details";

export default function RowItem({
  item,
  handleDelete,
  handleEdit,
  children
}) {
  const [hidden, setHidden] = useState(true);
  const [details, setDetails] = useState(null);
  const [deleteSelfPending, setDeleteSelfPending] = useState(false);

  function handleDeleteSelf(e) {
    handleDelete(e);
    setDeleteSelfPending(true);
  }

  return (
    <>
      <div
        className={
          deleteSelfPending ? "delete-pending row-container" : "row-container"
        }
        key={item.id}
      >
        <Buttons
          handleDelete={handleDeleteSelf}
          handleEdit={handleEdit}
          id={item.id}
        />
        <div>{children}</div>
      </div>
    </>
  );
}
