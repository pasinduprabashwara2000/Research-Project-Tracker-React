import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import axios from "axios";
import "./css/style.css";

function ManageUser() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        userId: "",
        userName: "",
        password: "",
        fullName: "",
        userRoleEnum: "",
        createdAt: ""
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/user");
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await axios.post("http://localhost:8080/api/user", form);
            fetchUsers();
            handleReset();
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    const handleUpdate = async () => {
        if (!editId) return;
        try {
            await axios.put(`http://localhost:8080/api/user/${editId}`, form);
            fetchUsers();
            handleReset();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDelete = async () => {
        if (!form.userId) return;
        try {
            await axios.delete(`http://localhost:8080/api/user/${form.userId}`);
            fetchUsers();
            handleReset();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleReset = () => {
        setForm({
            userId: "",
            userName: "",
            password: "",
            fullName: "",
            userRoleEnum: "",
            createdAt: ""
        });
        setEditId(null);
    };

    const handleRowClick = (user) => {
        setForm({
            userId: user.userId,
            userName: user.userName,
            password: user.password,
            fullName: user.fullName,
            userRoleEnum: user.userRoleEnum,
            createdAt: user.createdAt
        });
        setEditId(user.userId);
    };

    return (
        <>
            <h4 className="title">Manage Users</h4>
            <Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>User ID:</Form.Label>
                        <Form.Control
                            type="text"
                            id="userId"
                            value={form.userId}
                            onChange={handleChange}
                            placeholder="Enter Your User ID"
                        />
                    </Col>

                    <Col>
                        <Form.Label>User Name:</Form.Label>
                        <Form.Control
                            type="text"
                            id="userName"
                            value={form.userName}
                            onChange={handleChange}
                            placeholder="Enter Your User Name"
                        />
                    </Col>

                    <Col>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter Your Password"
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control
                            type="text"
                            id="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="Enter Your Full Name"
                        />
                    </Col>

                    <Col>
                        <Form.Label>User Role:</Form.Label>
                        <Form.Select
                            id="userRoleEnum"
                            value={form.userRoleEnum}
                            onChange={handleChange}
                        >
                            <option value="">Select Role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="PI">PI</option>
                            <option value="MEMBER">Member</option>
                            <option value="VIEWER">Viewer</option>
                        </Form.Select>
                    </Col>

                    <Col>
                        <Form.Label>Created At:</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            id="createdAt"
                            value={form.createdAt}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Button variant="primary" className="me-2" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="success" className="me-2" onClick={handleUpdate}>
                            Update
                        </Button>
                        <Button variant="danger" className="me-2" onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={handleReset}>
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>Password</th>
                    <th>Full Name</th>
                    <th>User Role</th>
                    <th>Created At</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u) => (
                    <tr
                        key={u.userId}
                        onClick={() => handleRowClick(u)}
                        style={{ cursor: "pointer" }}
                    >
                        <td>{u.userId}</td>
                        <td>{u.userName}</td>
                        <td>{u.password}</td>
                        <td>{u.fullName}</td>
                        <td>{u.userRoleEnum}</td>
                        <td>{u.createdAt}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default ManageUser;
