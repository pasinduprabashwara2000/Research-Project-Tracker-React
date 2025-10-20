import React from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import './css/style.css';

function ManageProject (){
    return (
        <>
            <h4 className="title">Manage Projects</h4>
            <Form>
                <Row className ="mb-3">
                    <Col>
                        <Form.Label>Project ID : </Form.Label>
                        <Form.Control type="text" id="id" placeholder="Enter Your Project ID" />
                    </Col>

                    <Col>
                        <Form.Label>Project Title : </Form.Label>
                        <Form.Control type="text" id="project_title" placeholder="Enter Your Project Title" />
                    </Col>
                    <Col>
                        <Form.Label>Project Status : </Form.Label>
                        <Form.Select>
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
                        <Form.Label>Principal Investigator : </Form.Label>
                        <Form.Control type="text" id="pi" placeholder="Enter Your Principal Investigator" />
                    </Col>
                    <Col>
                        <Form.Label>Tags : </Form.Label>
                        <Form.Control type="text" id="tags" placeholder="Enter Your Tags" />
                    </Col>
                    <Col>
                        <Form.Label>Project Start Date :</Form.Label>
                        <Form.Control type="date" id="start_date" />
                    </Col>
                </Row>
                <Row className= "mb-3">
                    <Col>
                        <Form.Label>Expected completion date : </Form.Label>
                        <Form.Control type="date" id="end_date" />
                    </Col>
                    <Col>
                        <Form.Label>Created At : </Form.Label>
                        <Form.Control type="datetime-local" id="created_at" />
                    </Col>
                    <Col>
                        <Form.Label>Updated At : </Form.Label>
                        <Form.Control type="datetime-local" id="updated_at" />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Project Summary : </Form.Label>
                        <Form.Control type="text" id="summary" placeholder="Enter Your project Summary" />
                    </Col>
                </Row>
                <Row className ="mb-3">
                    <Col>
                        <Button variant="primary" className="me-2">Save</Button>
                        <Button variant="success" className="me-2">Update</Button>
                        <Button variant="danger" className="me-2">Delete</Button>
                        <Button variant="secondary">Reset</Button>
                    </Col>
                </Row>
                <Table striped bordered hover>
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

export default ManageProject;