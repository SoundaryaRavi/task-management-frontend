import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';

import { register } from '../services/api.service';
import { RegisterData } from '../types/user';

const Register = () => {
  const [email, setEmail]: any = useState("");
  const [password, setPassword]: any = useState("");
  const [name, setName]: any = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: (res: any) => {
        if (res.status == 201) {
          navigate('/login');
        }
        else {
          setError("Error");
        }
      }
  });

  const handleRegister = () => {
    console.log('handle register', email, password, name);
    let data: any = { email, password, name }
    registerMutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 mb-3 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-3 border rounded"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
