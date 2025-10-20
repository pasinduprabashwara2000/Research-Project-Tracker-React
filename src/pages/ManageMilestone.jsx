import React from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";

function ManageMilestone (){
    return (
        <>
            <h4 className="title">Manage Milestone</h4>
            <Form>
                <Row className ="mb-3">
                    <Col>
                        <Form.Label>Milestone ID : </Form.Label>
                        <Form.Control type="text" id="id" placeholder="Enter Your Milestone ID" />
                    </Col>

                    <Col>
                        <Form.Label>Project ID : </Form.Label>
                        <Form.Control type="text" id="project_id" placeholder="Enter Your Project ID" />
                    </Col>

                    <Col>
                        <Form.Label>Title : </Form.Label>
                        <Form.Control type="text" id="title" placeholder="Enter Your Milestone Title" />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Description : </Form.Label>
                        <Form.Control type="text" id="desc" placeholder= "Enter Your Milestone Description" />
                    </Col>
                    <Col>
                        <Form.Label>Due Date : </Form.Label>
                        <Form.Control type="date" id="dueDate" />
                    </Col>
                    <Col>
                        <Form.Label>Is Completed : </Form.Label>
                        <Form.Select>
                            <option value="">Please Select : </option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Created By : </Form.Label>
                        <Form.Control type="text" id="created_by" placeholder="Enter User Who Created the Milestone"></Form.Control>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
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