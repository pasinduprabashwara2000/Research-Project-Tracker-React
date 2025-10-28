import React, {useState} from "react";
import { Button, Card, Container, Form, Alert } from "react-bootstrap";
import { Person, Lock } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../api/auth";

function ManageSignup() {
    const [form, setForm] = useState({ fullName: "", userName: "", password: "", role: "" });
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg("");
        setErrorMsg("");

        try {
            const res = await signupUser(form);
            setSuccessMsg("Account created successfully!");
            setTimeout(() => navigate("/login"), 1500); // redirect after showing success
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Signup failed. Please try again.");
        }
    };

    const handleReset = () => {
        setForm({ fullName: "", userName: "", password: "", role: "" });
        setSuccessMsg("");
        setErrorMsg("");
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-sm rounded-4 bg-light" style={{ width: "380px" }}>
                <h3 className="text-center mb-4 text-primary fw-bold">Sign Up</h3>

                <Form onSubmit={handleSubmit}>

                    {successMsg && <Alert variant="success">{successMsg}</Alert>}
                    {errorMsg && <Alert variant="danger">{errorMsg}</Alert> }

                    <Form.Group className="mb-3" controlId="formFullName">
                        <Form.Label>Full Name</Form.Label>
                        <div className="input-group">
                            <span className="input-group-text bg-white">
                                <Person />
                            </span>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formUserName">
                        <Form.Label>Username</Form.Label>
                        <div className="input-group">
                            <span className="input-group-text bg-white">
                                <Person />
                            </span>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                name="userName"
                                value={form.userName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <div className="input-group">
                            <span className="input-group-text bg-white">
                                <Lock />
                            </span>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="member">Member</option>
                        </Form.Select>
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">Sign Up</Button>
                        <Button variant="outline-secondary" type="button" onClick={handleReset}>Reset</Button>
                    </div>

                    <div className="text-center mt-3">
                        <h6 className="d-inline me-2">Already have an account?</h6>
                        <Link to="/login" className="text-primary fw-semibold text-decoration-none">Log In</Link>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export default ManageSignup;
