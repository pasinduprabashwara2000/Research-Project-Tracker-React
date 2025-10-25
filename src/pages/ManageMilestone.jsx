import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import axios from "axios";

function ManageMilestone (){
    const [successMsg, setSuccessMsg] = useState([]);
    const [errorMsg, setErrorMsg] = useState([]);
    const [milestone, setMilestone] = useState([]);
    const [form, setForm] = useState({
       id : "",
       projectId : "",
       title : "",
       desc : "",
       dueDate : "",
       isCompleted : "",
       createdBy : ""
    });
    const [editId,setEditId] = useState(null);

    useEffect(() => {
        fetchMilestone();
    }, []);

    const fetchMilestone = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/milestone");
            setMilestone(res.data);
        } catch (error) {
            setErrorMsg("Error Fetching Milestone : ",error);
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    }

    const handleReset = ()=>{
        setForm({
            projectId : "",
            title : "",
            desc : "",
            dueDate : "",
            isCompleted : "",
            createdBy : ""
        });
        setEditId(null);
        setErrorMsg("");
        setSuccessMsg("");
    }

    const handleSave = async () => {
        try {
            axios.post('http://localhost:8080/api/milestone',form);
            setSuccessMsg("Milestone Save Successfully");
            fetchMilestone();
            handleReset();
        } catch (error) {
            setErrorMsg("Error Saving Milestone : ",error);
        }
    }

    const handleUpdate = async () => {
        try {
            axios.put(`http://localhost:8080/api/milestone,${editId}`,form);
            setSuccessMsg("Milestone Update Successfully");
            fetchMilestone();
            handleReset();
        } catch (error) {
            setErrorMsg("Error Saving Milestone : ",error);
        }
    }

    const handleDelete = async () => {
        try {
            axios.delete(`http://localhost:8080/api/milestone,${form.id}`,form);
            setSuccessMsg("Milestone Deleted Successfully");
            fetchMilestone();
            handleReset();
        } catch (error) {
            setErrorMsg("Error Deleting Milestone : ",error);
        }
    }

    return (
        <>
            <h4 className="title">Manage Milestone</h4>
            <Form>
                <Row className ="mb-3">
                    <Col>
                        <Form.Label>Milestone ID : </Form.Label>
                        <Form.Control type="text" id="id" value={form.id} onChange={handleChange} placeholder="Enter Your Milestone ID" />
                    </Col>

                    <Col>
                        <Form.Label>Project ID : </Form.Label>
                        <Form.Control type="text" id="projectId" value={form.projectId} onChange={handleChange} placeholder="Enter Your Project ID" />
                    </Col>

                    <Col>
                        <Form.Label>Title : </Form.Label>
                        <Form.Control type="text" id="title" value={form.title} onChange={handleChange} placeholder="Enter Your Milestone Title" />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Description : </Form.Label>
                        <Form.Control type="text" id="desc" value={form.desc} onChange={handleChange} placeholder= "Enter Your Milestone Description" />
                    </Col>
                    <Col>
                        <Form.Label>Due Date : </Form.Label>
                        <Form.Control type="date" id="dueDate" value={form.dueDate} onChange={handleChange}/>
                    </Col>
                    <Col>
                        <Form.Label>Is Completed : </Form.Label>
                        <Form.Select id="isCompleted" value={form.isCompleted} onChange={handleChange}>
                            <option value="">Please Select : </option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Created By : </Form.Label>
                        <Form.Control type="text" id="createdBy" value={form.createdBy} onChange={handleChange} placeholder="Enter User Who Created the Milestone"></Form.Control>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row className ="mb-3">
                    <Col>
                        <Button variant="primary" className="me-2" onClick={handleSave}>Save</Button>
                        <Button variant="success" className="me-2" onClick={handleUpdate}>Update</Button>
                        <Button variant="danger" className="me-2" onClick={handleDelete}>Delete</Button>
                        <Button variant="secondary" onClick={handleReset}>Reset</Button>
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
                        <th>Is Completed</th>
                        <th>Created By</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </Table>
            </Form>
        </>
    );
}

export default ManageMilestone;