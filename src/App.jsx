import React, { useState, useEffect } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState('');
  const [reminder, setReminder] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = e => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      reminder: reminder ? new Date(reminder).toISOString() : null,
    };
    setTodos([...todos, newTodo]);
    setInput('');
    setReminder('');
  };

  const toggleComplete = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, newText, newReminder) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, text: newText, reminder: newReminder }
          : todo
      )
    );
  };

  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
      return;
    }
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      const now = new Date();
      todos.forEach(todo => {
        if (!todo.completed) {
          if (todo.reminder) {
            const reminderTime = new Date(todo.reminder);
            if (
              reminderTime <= now &&
              reminderTime > new Date(now.getTime() - 60000) // within last minute
            ) {
              new Notification('Todo Reminder', {
                body: todo.text,
              });
            }
          } else {
            // No reminder set, notify for incomplete todo
            new Notification('Incomplete Todo', {
              body: todo.text,
            });
          }
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [todos]);

  return (
    <div className="app">
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a new todo"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <input
          type="datetime-local"
          value={reminder}
          onChange={e => setReminder(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.length === 0 ? (
          <li style={{ textAlign: 'center', color: '#888' }}>No todos yet</li>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
