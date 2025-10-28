import React, { useState } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { Person, Lock } from "react-bootstrap-icons";
import {Link, useNavigate} from "react-router-dom";
import { loginUser } from "../../api/auth";

function ManageLogin() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData.username, formData.password);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", formData.role);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-sm rounded-4 bg-light" style={{ width: "380px" }}>
                <h3 className="text-center mb-4 text-primary fw-bold">Log In</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUserName">
                        <Form.Label>Username</Form.Label>
                        <div className="input-group">
                            <span className="input-group-text bg-white">
                                <Person/>
                            </span>
                            <Form.Control
                                type="email"
                                placeholder="Enter your username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <div className="input-group">
                            <span className="input-group-text bg-white">
                                <Lock />
                            </span>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="pi">PI</option>
                            <option value="member">Member</option>
                            <option value="viewer">Viewer</option>
                        </Form.Select>
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">
                            Log In
                        </Button>
                        <Button
                            variant="outline-secondary"
                            type="reset"
                            onClick={() =>
                                setFormData({ username: "", password: "", role: "" })
                            }
                        >
                            Reset
                        </Button>
                        <div className="text-center mt-3">
                            <h6 className="d-inline me-2">Don't have an account?</h6>
                            <Link to="/signup" className="text-primary fw-semibold text-decoration-none">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export default ManageLogin;
