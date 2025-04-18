'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import TodoItem from '../todoitems';
import ConfirmModal from '../ConfirmModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const TABS = ['Add', 'Active', 'Completed', 'Deleted'];

export default function TodoList() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState('Add');
  const [error, setError] = useState('');
  const [modalInfo, setModalInfo] = useState({ show: false, action: '', taskId: null });
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('todos') || '[]'));
    setDark(JSON.parse(localStorage.getItem('theme-dark') || 'false'));
  }, []);

  useEffect(() => { localStorage.setItem('todos', JSON.stringify(todos)); }, [todos]);
  useEffect(() => { localStorage.setItem('theme-dark', JSON.stringify(dark)); }, [dark]);

  const addTodo = useCallback(() => {
    const n = name.trim(), t = text.trim();
    if (!n || !t) return setError('Both fields are required');
    if (todos.some(x => x.name.toLowerCase() === n.toLowerCase()))
      return setError('This name already exists');
    setTodos(prev => [...prev, { id: crypto.randomUUID(), name: n, text: t, done: false, deleted: false }]);
    setName(''); setText(''); setError(''); setActiveTab('Active');
  }, [name, text, todos]);

  const updateTodo = (id, data) =>
    setTodos(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));

  const triggerModal = (id, action) =>
    setModalInfo({ show: true, action, taskId: id });

  const handleModalConfirm = () => {
    const { taskId, action } = modalInfo;
    setTodos(prev =>
      prev
        .map(t => {
          if (t.id !== taskId) return t;
          if (action === 'delete') return { ...t, deleted: true };
          if (action === 'restore') return { ...t, deleted: false, done: false };
          if (action === 'complete') return { ...t, done: true };
          return t;
        })
        .filter(t => action === 'permanent' ? t.id !== taskId : true)
    );
    setModalInfo({ show: false, action: '', taskId: null });
  };

  const openTask = id => {
    const task = todos.find(t => t.id === id);
    if (!task) return;
    setTodos([{ ...task, deleted: false }, ...todos.filter(t => t.id !== id)]);
    setActiveTab(task.done ? 'Completed' : 'Active');
  };

  const theme = dark
    ? { bg: '#0f172a', text: '#f8fafc', btn: '#6366f1' }
    : { bg: '#ffffff', text: '#111827', btn: '#3f51b5' };

  const getFilteredTodos = () => {
    let filtered = todos;
    if (activeTab === 'Active') {
      filtered = todos.filter(t => !t.done && !t.deleted);
    } else if (activeTab === 'Completed') {
      filtered = todos.filter(t => t.done && !t.deleted);
    } else if (activeTab === 'Deleted') {
      filtered = todos.filter(t => t.deleted);
    }
    return filtered.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
  };

  const showSearch = activeTab !== 'Add';
  const filteredTodos = getFilteredTodos();

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center bg-dark text-white">
        <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status" />
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ background: theme.bg, color: theme.text, minHeight: '100vh' }}>
      {/* Tabs */}
      <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-4">
        <div className="d-flex flex-wrap gap-2">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`btn ${tab === activeTab ? 'btn-primary' : 'btn-outline-secondary'} rounded-pill px-3`}
              onClick={() => {
                setActiveTab(tab);
                setSearch('');
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="btn btn-outline-dark rounded-circle" onClick={() => setDark(!dark)} style={{ width: 40, height: 40 }}>
          {dark ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Add Tab */}
      {activeTab === 'Add' && (
        <div className="card p-4 shadow-sm border-0 rounded-4">
          <h4 className="mb-3 fw-semibold">Add New Task</h4>
          <input
            className="form-control mb-3"
            placeholder="Task Title"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <textarea
            className="form-control mb-3"
            placeholder="Task Description"
            value={text}
            ref={inputRef}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            rows={3}
          />
          {error && <div className="text-danger mb-2 fw-semibold">{error}</div>}
          <button className="btn btn-primary w-100" onClick={addTodo}>Add Task</button>
        </div>
      )}

      {/* Active / Completed / Deleted */}
      {showSearch && (
        <div className="card p-3 shadow-sm border-0 rounded-4 overflow-auto mt-3" style={{ maxHeight: '500px' }}>
          <input
            className="form-control mb-3"
            placeholder={`Search ${activeTab.toLowerCase()} tasks...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {filteredTodos.length > 0 ? (
            filteredTodos.map(t => (
              <TodoItem
                key={t.id}
                todo={t}
                dark={dark}
                onToggle={() => triggerModal(t.id, 'complete')}
                onDelete={() => triggerModal(t.id, 'delete')}
                onEdit={data => updateTodo(t.id, data)}
                showCompleteBtn={activeTab === 'Active'}
                showDeleteBtn={activeTab === 'Active' || activeTab === 'Completed'}
                onPermanentDelete={() => triggerModal(t.id, 'permanent')}
                onRestore={() => triggerModal(t.id, 'restore')}
                showDeleteRestore={activeTab === 'Deleted'}
              />
            ))
          ) : (
            <p className="text-center text-muted">No {activeTab.toLowerCase()} tasks found.</p>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {modalInfo.show && (
        <ConfirmModal
          message={`Are you sure you want to ${modalInfo.action} this task?`}
          onConfirm={handleModalConfirm}
          onCancel={() => setModalInfo({ show: false, action: '', taskId: null })}
        />
      )}
    </div>
  );
}
