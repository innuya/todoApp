import React, { useState } from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [editedReminder, setEditedReminder] = useState(
    todo.reminder ? todo.reminder.slice(0, 16) : ''
  );

  const reminderDate = todo.reminder
    ? new Date(todo.reminder).toLocaleString()
    : null;

  const handleSave = () => {
    updateTodo(
      todo.id,
      editedText,
      editedReminder ? new Date(editedReminder).toISOString() : null
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(todo.text);
    setEditedReminder(todo.reminder ? todo.reminder.slice(0, 16) : '');
    setIsEditing(false);
  };

  return (
    <li
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px',
        borderBottom: '1px solid #ccc',
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        style={{ marginRight: '10px' }}
      />
      {isEditing ? (
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            value={editedText}
            onChange={e => setEditedText(e.target.value)}
            style={{
              width: '100%',
              marginBottom: '6px',
              padding: '6px 8px',
              fontSize: '1rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="datetime-local"
            value={editedReminder}
            onChange={e => setEditedReminder(e.target.value)}
            style={{
              width: '100%',
              marginBottom: '6px',
              padding: '6px 8px',
              fontSize: '1rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
          <div
            style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}
          >
            <button
              onClick={handleSave}
              style={{
                padding: '6px 12px',
                fontSize: '1rem',
                borderRadius: '4px',
              }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: '6px 12px',
                fontSize: '1rem',
                borderRadius: '4px',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <span
            style={{
              flexGrow: 1,
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none',
              display: 'inline-block',
            }}
            onClick={() => toggleComplete(todo.id)}
          >
            {todo.text}
          </span>
          {reminderDate && (
            <small
              style={{
                display: 'block',
                color: '#666',
                fontSize: '0.8em',
                marginLeft: '10px',
                textDecoration: 'none',
              }}
            >
              Reminder: {reminderDate}
            </small>
          )}
          <button
            onClick={() => setIsEditing(true)}
            style={{ marginLeft: '10px' }}
          >
            Edit
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            style={{ marginLeft: '10px' }}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
