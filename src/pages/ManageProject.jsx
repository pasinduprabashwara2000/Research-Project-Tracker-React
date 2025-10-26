import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table, Alert } from "react-bootstrap";
import axios from "axios";
import "./css/style.css";

function ManageProject() {
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({
        id: "",
        title: "",
        status: "",
        principalInvestigator: "",
        tags: "",
        startDate: "",
        endDate: "",
        createdAt: "",
        updatedAt: "",
        summary: "",
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/project");
            setProjects(res.data);
        } catch (error) {
            setErrorMsg("Error fetching projects: " + (error.response?.data?.message || error.message));
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleReset = () => {
        setForm({
            id: "",
            title: "",
            status: "",
            principalInvestigator: "",
            tags: "",
            startDate: "",
            endDate: "",
            createdAt: "",
            updatedAt: "",
            summary: "",
        });
        setEditId(null);
        setErrorMsg("");
        setSuccessMsg("");
    };

    const handleSave = async () => {
        try {
            await axios.post("http://localhost:8080/api/project", form);
            setSuccessMsg("Project saved successfully!");
            setErrorMsg("");
            fetchProjects();
            handleReset();
        } catch (error) {
            setErrorMsg("Error Saving Project : " + (error.response?.data?.message || error.message));
            setSuccessMsg("");
        }
    };

    const handleUpdate = async () => {
        if (!editId) {
            setErrorMsg("Please select a project to update.");
            setSuccessMsg("");
            return;
        }
        try {
            await axios.put(`http://localhost:8080/api/project/${editId}`, form);
            setSuccessMsg("Project updated successfully!");
            setErrorMsg("");
            fetchProjects();
            handleReset();
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Error updating project");
            setSuccessMsg("");
        }
    };

    const handleDelete = async () => {
        if (!form.id) {
            setErrorMsg("Please select a project to delete.");
            setSuccessMsg("");
            return;
        }
        try {
            await axios.delete(`http://localhost:8080/api/project/${form.id}`);
            setSuccessMsg("Project deleted successfully!");
            setErrorMsg("");
            fetchProjects();
            handleReset();
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Error deleting project");
            setSuccessMsg("");
        }
    };

    const handleRowClick = (project) => {
        setForm({
            id: project.id || "",
            title: project.title || "",
            status: project.status || "",
            principalInvestigator: project.principalInvestigator || "",
            tags: project.tags || "",
            startDate: project.startDate || "",
            endDate: project.endDate || "",
            createdAt: project.createdAt
                ? project.createdAt.split("T")[0] + "T" + project.createdAt.split("T")[1].slice(0, 5)
                : "",
            updatedAt: project.updatedAt
                ? project.updatedAt.split("T")[0] + "T" + project.updatedAt.split("T")[1].slice(0, 5)
                : "",
            summary: project.summary || "",
        });
        setEditId(project.id);
        setErrorMsg("");
        setSuccessMsg("");
    };

    return (
        <>
            <h4 className="title">Manage Projects</h4>

            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            {successMsg && <Alert variant="success">{successMsg}</Alert>}

            <Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Project ID:</Form.Label>
                        <Form.Control
                            type="text"
                            id="id"
                            value={form.id}
                            onChange={handleChange}
                            placeholder="Enter Project ID"
                            disabled={!!editId}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Project Title:</Form.Label>
                        <Form.Control
                            type="text"
                            id="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter Project Title"
                        />
                    </Col>
                    <Col>
                        <Form.Label>Project Status:</Form.Label>
                        <Form.Select id="status" value={form.status} onChange={handleChange}>
                            <option value="">Please Select Status</option>
                            <option value="planning">Planning</option>
                            <option value="active">Active</option>
                            <option value="on_hold">On Hold</option>
                            <option value="completed">Completed</option>
                            <option value="archived">Archived</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Principal Investigator:</Form.Label>
                        <Form.Control
                            type="text"
                            id="principalInvestigator"
                            value={form.principalInvestigator}
                            onChange={handleChange}
                            placeholder="Enter Principal Investigator"
                        />
                    </Col>
                    <Col>
                        <Form.Label>Tags:</Form.Label>
                        <Form.Control
                            type="text"
                            id="tags"
                            value={form.tags}
                            onChange={handleChange}
                            placeholder="Enter Tags"
                        />
                    </Col>
                    <Col>
                        <Form.Label>Project Start Date:</Form.Label>
                        <Form.Control type="date" id="startDate" value={form.startDate} onChange={handleChange} />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Expected Completion Date:</Form.Label>
                        <Form.Control type="date" id="endDate" value={form.endDate} onChange={handleChange} />
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
                    <Col>
                        <Form.Label>Updated At:</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            id="updatedAt"
                            value={form.updatedAt}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Project Summary:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            id="summary"
                            value={form.summary}
                            onChange={handleChange}
                            placeholder="Enter Project Summary"
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

            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Summary</th>
                    <th>Status</th>
                    <th>PI</th>
                    <th>Tags</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((p) => (
                    <tr key={p.id} onClick={() => handleRowClick(p)} style={{ cursor: "pointer" }}>
                        <td>{p.id}</td>
                        <td>{p.title}</td>
                        <td>{p.summary}</td>
                        <td>{p.status}</td>
                        <td>{p.principalInvestigator}</td>
                        <td>{p.tags}</td>
                        <td>{p.startDate}</td>
                        <td>{p.endDate}</td>
                        <td>{p.createdAt ? new Date(p.createdAt).toLocaleString() : ""}</td>
                        <td>{p.updatedAt ? new Date(p.updatedAt).toLocaleString() : ""}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default ManageProject;
