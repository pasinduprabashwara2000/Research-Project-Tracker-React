import React from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";

function ManageDocument (){
    return (
        <>
            <h4 className="title">Manage Document</h4>
            <Form>
                <Row className ="mb-3">
                    <Col>
                        <Form.Label>Document ID : </Form.Label>
                        <Form.Control type="text" id="id" placeholder="Enter Your Document ID" />
                    </Col>

                    <Col>
                        <Form.Label>Project ID: </Form.Label>
                        <Form.Control type="text" id="project_id" placeholder="Enter Your Project ID" />
                    </Col>

                    <Col>
                        <Form.Label>Title : </Form.Label>
                        <Form.Control type="text" id="title" placeholder="Enter Your Document Title" />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Description : </Form.Label>
                        <Form.Control type="text" id="description" placeholder="Enter Your Document Description" />
                    </Col>
                    <Col className="mb-3">
                        <Form.Label>URL / Path : </Form.Label>
                        <Form.Control type="text" id="path" placeholder="Enter Your URL or Path" />
                    </Col>
                    <Col className="mb-3">
                        <Form.Label>Uploaded By : </Form.Label>
                        <Form.Control type="text" id="upload_by" placeholder="Enter User Who Uploaded the file" />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Uploaded At : </Form.Label>
                        <Form.Control type="datetime-local" id="date"></Form.Control>
                    </Col>
                    <Col></Col>
                    <Col></Col>
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
                        <th>Project ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>URL / Path</th>
                        <th>Uploaded By</th>
                        <th>Uploaded At</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <tr></tr>
                        <tr></tr>
                        <tr></tr>
                        <tr></tr>
                        <tr></tr>
                        <tr></tr>
                        <tr></tr>
                    </tr>
                    </tbody>
                </Table>
            </Form>
        </>
    );
}

export default ManageDocument;