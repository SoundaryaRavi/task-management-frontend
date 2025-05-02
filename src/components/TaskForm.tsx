import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import { taskSave, taskUpdate } from '../services/api.service';
import { Task, TaskFormData } from '../types/task';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  task: Task | null;
}

type UpdatePayload = {
    id: string;
    data: TaskFormData;
};  

const TaskFormModal: React.FC<Props> = ({ onClose, onSuccess, task }) => {
  const [form, setForm] = useState<TaskFormData>({
    title: '',
    status: 'Pending',
    description: '',
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        status: task.status,
        description: task.description
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createMutation = useMutation({
    mutationFn: taskSave,
    onSuccess: () => {
      onClose();
      onSuccess();
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: (data: UpdatePayload) => taskUpdate(data.id, data.data),
    onSuccess: () => {
      onClose();
      onSuccess();
    },
  });
  
  const handleSubmit = () => {
    if (task) {
      updateMutation.mutate({ id: task._id, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded w-96 space-y-4">
        <h2 className="text-xl font-semibold">{task ? 'Edit Task' : 'Add Task'}</h2>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            {task ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFormModal;
