import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Table } from "react-bootstrap";
import axios from "axios";

function ManageDocument() {
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [documents, setDocuments] = useState([]);
    const [form, setForm] = useState({
        id: "",
        projectId: "",
        title: "",
        description: "",
        path: "",
        uploadBy: "",
        uploadAt: ""
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/document");
            setDocuments(res.data);
        } catch (error) {
            setErrorMsg("Error fetching Document: " + (error.response?.data?.message || error.message));
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
            description: "",
            path: "",
            uploadBy: "",
            uploadAt: ""
        });
        setEditId(null);
        setErrorMsg("");
        setSuccessMsg("");
    };

    const saveDocument = async () => {
        try {
            await axios.post("http://localhost:8080/api/document", form);
            setSuccessMsg("Document saved successfully!");
            fetchDocuments();
            handleReset();
        } catch (error) {
            setErrorMsg("Error Saving Document: " + (error.response?.data?.message || error.message));
        }
    };

    const updateDocument = async () => {
        if (!editId) {
            setErrorMsg("Please select a document to update.");
            return;
        }

        try {
            await axios.put(`http://localhost:8080/api/document/${editId}`, form);
            setSuccessMsg("Document updated successfully!");
            fetchDocuments();
            handleReset();
        } catch (error) {
            setErrorMsg("Error updating document.");
        }
    };

    const deleteDocument = async () => {
        if (!form.id) {
            setErrorMsg("Please select a document to delete.");
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/api/document/${form.id}`);
            setSuccessMsg("Document deleted successfully!");
            fetchDocuments();
            handleReset();
        } catch (error) {
            setErrorMsg("Error deleting document.");
        }
    };

    const handleRowClick = (doc) => {
        setForm({
            id: doc.id,
            projectId: doc.projectId,
            title: doc.title,
            description: doc.description,
            path: doc.path,
            uploadBy: doc.uploadBy,
            uploadAt: doc.uploadAt
        });
        setEditId(doc.id);
        setSuccessMsg("");
        setErrorMsg("");
    };

    return (
        <>
            <h4 className="title">Manage Document</h4>

            {successMsg && <Alert variant="success">{successMsg}</Alert>}
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

            <Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Document ID:</Form.Label>
                        <Form.Control
                            type="text"
                            id="id"
                            value={form.id}
                            onChange={handleChange}
                            placeholder="Document ID"
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
                            placeholder="Enter Document Title"
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="text"
                            id="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Enter Description"
                        />
                    </Col>

                    <Col>
                        <Form.Label>URL / Path:</Form.Label>
                        <Form.Control
                            type="text"
                            id="path"
                            value={form.path}
                            onChange={handleChange}
                            placeholder="Enter File Path or URL"
                        />
                    </Col>

                    <Col>
                        <Form.Label>Uploaded By:</Form.Label>
                        <Form.Control
                            type="text"
                            id="uploadBy"
                            value={form.uploadBy}
                            onChange={handleChange}
                            placeholder="Enter Uploader Name"
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Uploaded At:</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            id="uploadAt"
                            value={form.uploadAt}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Button variant="primary" className="me-2" onClick={saveDocument}>
                            Save
                        </Button>
                        <Button variant="success" className="me-2" onClick={updateDocument}>
                            Update
                        </Button>
                        <Button variant="danger" className="me-2" onClick={deleteDocument}>
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
                        <th>Project ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Path</th>
                        <th>Uploaded By</th>
                        <th>Uploaded At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {documents.map((doc) => (
                        <tr key={doc.id} onClick={() => handleRowClick(doc)}>
                            <td>{doc.id}</td>
                            <td>{doc.projectId}</td>
                            <td>{doc.title}</td>
                            <td>{doc.description}</td>
                            <td>{doc.path}</td>
                            <td>{doc.uploadBy}</td>
                            <td>{doc.uploadAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Form>
        </>
    );
}

export default ManageDocument;
