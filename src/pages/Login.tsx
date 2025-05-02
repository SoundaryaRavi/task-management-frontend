import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';

import { login } from '../services/api.service';

const Login = () => {
  const [email, setEmail]: any = useState("");
  const [password, setPassword]: any = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutate: loginMutate } = useMutation(login);

  const handleLogin = () => {
    let data: any = { email, password };
    loginMutate(data, {
      onSuccess: (res: any) => {
        if (res.status == 200) {
          localStorage.setItem("token", res.token);
          navigate('/');
        }
        else {
          setError("Invalid email or password. Please try again.");
        }
      }
    });

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

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
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
