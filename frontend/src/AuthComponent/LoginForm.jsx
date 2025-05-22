import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = await login(form);
    console.log(role)
    if (role === "Admin") {
      navigate("/admin/users");
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h1>Welcome Please Login</h1>
      <br/>
      <label>Email  </label>
      <br/>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-2 w-full"
      />
      <br/>
      <p>password </p>
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border p-2 w-full"
      />
      <br/>
      <br/>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
      <br/>
    </form>
      <div className="text-center mt-4">
        <p>
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600">
            Register here
          </a>
        </p>
        <p>
          Forgot your password?{" "}
          <a href="/forget-password" className="text-blue-600">
            Reset it here
          </a>
        </p>
      </div>
    </div>
  );
}
