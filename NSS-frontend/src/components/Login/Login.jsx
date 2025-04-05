import React, { useState } from 'react';
import './Login.css';
import { toast } from "react-toastify";

const Login = ({ onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError('');
        if (!email || !password) {
            setError("⚠️ Please fill all the fields.");
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "❌ Invalid credentials. Try again.");
                return;
            }

            // Store token and email in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("loginTime", Date.now()); // Store login time

            toast.success("Login successful!");
            onLoginSuccess(email);
            onClose();
        } catch (error) {
            setError("⚠️ Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='overlay'>
            <div className="modal">
                <h2>Sign In</h2>
                {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
                <input
                    type="email"
                    placeholder="📧 Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="🔑 Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="modalbuttons">
                    <button onClick={onClose} disabled={loading}>Close</button>
                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? "🔄 Signing In..." : "Sign In"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
