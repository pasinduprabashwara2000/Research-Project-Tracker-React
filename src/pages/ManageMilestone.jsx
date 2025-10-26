import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Table } from "react-bootstrap";
import axios from "axios";

function ManageMilestone() {
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [milestones, setMilestones] = useState([]);
    const [form, setForm] = useState({
        id: "",
        projectId: "",
        title: "",
        desc: "",
        dueDate: "",
        isCompleted: "",
        createdBy: ""
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchMilestones();
    }, []);

    const fetchMilestones = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/milestone");
            setMilestones(res.data);
        } catch (error) {
            setErrorMsg("Error fetching Milestone: " + (error.response?.data?.message || error.message));
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleReset = () => {
        setForm({
            id: "",
            projectId: "",
            title: "",
            desc: "",
            dueDate: "",
            isCompleted: "",
            createdBy: ""
        });
        setEditId(null);
        setErrorMsg("");
        setSuccessMsg("");
    };

    const handleSave = async () => {
        try {
            await axios.post("http://localhost:8080/api/milestone", form);
            setSuccessMsg("Milestone saved successfully!");
            fetchMilestones();
            handleReset();
        } catch (error) {
            setErrorMsg("Error Saving Milestone : " + (error.response?.data?.message || error.message));
        }
    };

    const handleUpdate = async () => {
        if (!editId) {
            setErrorMsg("Please select a milestone to update.");
            return;
        }

        try {
            await axios.put(`http://localhost:8080/api/milestone/${editId}`, form);
            setSuccessMsg("Milestone updated successfully!");
            fetchMilestones();
            handleReset();
        } catch (error) {
            setErrorMsg("Error updating milestone.");
        }
    };

    const handleDelete = async () => {
        if (!form.id) {
            setErrorMsg("Please select a milestone to delete.");
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/api/milestone/${form.id}`);
            setSuccessMsg("Milestone deleted successfully!");
            fetchMilestones();
            handleReset();
        } catch (error) {
            setErrorMsg("Error deleting milestone.");
        }
    };

    const handleRowClick = (m) => {
        setForm({
            id: m.id,
            projectId: m.projectId,
            title: m.title,
            desc: m.desc,
            dueDate: m.dueDate,
            isCompleted: m.isCompleted ? "true" : "false",
            createdBy: m.createdBy
        });
        setEditId(m.id);
        setSuccessMsg("");
        setErrorMsg("");
    };

    return (
        <>
            <h4 className="title">Manage Milestone</h4>

            {successMsg && <Alert variant="success">{successMsg}</Alert>}
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

            <Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Milestone ID:</Form.Label>
                        <Form.Control
                            type="text"
                            id="id"
                            value={form.id}
                            onChange={handleChange}
                            placeholder="Milestone ID"
                        />
                    </Col>

                    <Col>
                        <Form.Label>Project ID:</Form.Label>
                        <Form.Control
                            type="text"
                            id="projectId"
                            value={form.projectId}
                            onChange={handleChange}
                            placeholder="Enter Project ID"
                        />
                    </Col>

                    <Col>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            id="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter Milestone Title"
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="text"
                            id="desc"
                            value={form.desc}
                            onChange={handleChange}
                            placeholder="Enter Description"
                        />
                    </Col>
                    <Col>
                        <Form.Label>Due Date:</Form.Label>
                        <Form.Control
                            type="date"
                            id="dueDate"
                            value={form.dueDate}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Is Completed:</Form.Label>
                        <Form.Select
                            id="isCompleted"
                            value={form.isCompleted}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Created By:</Form.Label>
                        <Form.Control
                            type="text"
                            id="createdBy"
                            value={form.createdBy}
                            onChange={handleChange}
                            placeholder="Enter Creator"
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

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Project</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Completed</th>
                        <th>Created By</th>
                    </tr>
                    </thead>
                    <tbody>
                    {milestones.map((m) => (
                        <tr key={m.id} onClick={() => handleRowClick(m)}>
                            <td>{m.id}</td>
                            <td>{m.projectId}</td>
                            <td>{m.title}</td>
                            <td>{m.desc}</td>
                            <td>{m.dueDate}</td>
                            <td>{m.isCompleted ? "Yes" : "No"}</td>
                            <td>{m.createdBy}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Form>
        </>
    );
}

export default ManageMilestone;
