'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TodoItem({
  todo,
  dark,
  onToggle,
  onDelete,
  onEdit,
  onPermanentDelete,
  onRestore,
  showCompleteBtn,
  showDeleteBtn,
  showDeleteRestore,
  showOpenBtn
}) {
  const [isEditing, setEditing] = useState(false);
  const [editName, setEditName] = useState(todo.name);
  const [editText, setEditText] = useState(todo.text);
  const [editError, setEditError] = useState('');

  const handleSave = () => {
    const n = editName.trim(), t = editText.trim();
    if (!n || !t) {
      setEditError('Both fields are required');
      return;
    }
    onEdit({ name: n, text: t });
    setEditing(false);
    setEditError('');
  };

  const handleCancel = () => {
    setEditing(false);
    setEditName(todo.name);
    setEditText(todo.text);
    setEditError('');
  };

  return (
    <div className={`card mb-3 p-3 shadow-sm border-0 rounded-3 ${dark ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      {isEditing ? (
        <>
          <input
            className="form-control mb-2"
            placeholder="Task Title"
            value={editName}
            onChange={e => setEditName(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Task Description"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            rows={2}
          />
          {editError && <div className="text-danger mb-2 fw-semibold">{editError}</div>}

          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-success btn-sm px-3" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary btn-sm px-3" onClick={handleCancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h5 className="fw-bold">{todo.name}</h5>
          <p className="mb-2">{todo.text}</p>
          <div className="d-flex flex-wrap gap-2 mt-2 align-items-center">
            {showOpenBtn && (
              <button className="btn btn-info btn-sm" onClick={onToggle}>Open</button>
            )}
            {showCompleteBtn && (
              <button className="btn btn-success btn-sm" onClick={onToggle}>Complete</button>
            )}
            {showDeleteBtn && (
              <button className="btn btn-warning btn-sm" onClick={onDelete}>Delete</button>
            )}
            {showDeleteRestore && (
              <>
                <button className="btn btn-danger btn-sm" onClick={onPermanentDelete}>Delete Permanently</button>
                <button className="btn btn-success btn-sm" onClick={onRestore}>Restore</button>
              </>
            )}
            <div className="ms-auto">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
