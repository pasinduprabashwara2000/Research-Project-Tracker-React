import React from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { Envelope, Lock } from "react-bootstrap-icons";

function ManageLogin() {
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-sm rounded-4 bg-light" style={{ width: "380px" }}>
                <h3 className="text-center mb-4 text-primary fw-bold">Log In</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <div className="input-group">
              <span className="input-group-text bg-white">
                <Envelope />
              </span>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
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
                                required
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select required>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="teacher">Lecture</option>
                        </Form.Select>
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">
                            Log In
                        </Button>
                        <Button variant="outline-secondary" type="reset">
                            Reset
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export default ManageLogin;
