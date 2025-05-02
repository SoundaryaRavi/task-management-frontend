import { useEffect, useState } from 'react';

import {  taskDelete, taskList } from '../services/api.service';
import { Task } from '../types/task';
import TaskFormModal from '../components/TaskForm';

const TaskTable = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filtered, setFiltered] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    let data = Array.isArray(tasks) ? [...tasks] : []
    if (search) {
      data = data.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (statusFilter) {
      data = data.filter(t => t.status === statusFilter);
    }
    setFiltered(data);
  }, [search, statusFilter, tasks]);

  const loadTasks = async () => {
    const res = await taskList();
    setTasks(res.data.tasks);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await taskDelete(id);
    loadTasks();
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <input
          className="border p-2 rounded w-1/3"
          placeholder="Search title"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => { setSelectedTask(null); setModalOpen(true); }}
        >
          + Add Task
        </button>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Due Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(task => (
            <tr key={task._id}>
              <td className="border px-4 py-2">{task.title}</td>
              <td className="border px-4 py-2">{task.status}</td>
              <td className="border px-4 py-2">{task.description}</td>
              <td className="border px-4 py-2 space-x-2">
                <button className="text-blue-600" onClick={() => handleEdit(task)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <TaskFormModal
          onClose={() => setModalOpen(false)}
          onSuccess={loadTasks}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default TaskTable;
