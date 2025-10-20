import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import NavbarTop from "./components/NavbarTop";
import { Container } from "react-bootstrap";
import ManageUser from "./pages/ManageUser";
import ManageProject from "./pages/ManageProject";
import ManageMilestone from "./pages/ManageMilestone";
import ManageDocument from "./pages/ManageDocument";

function DashboardLayout() {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <NavbarTop />
                <Container fluid className="mt-3">
                    <Routes>
                        <Route path="/users" element={<ManageUser />} />
                        <Route path="/projects" element={<ManageProject />} />
                        <Route path="/milestone" element={<ManageMilestone />} />
                        <Route path="/document" element={<ManageDocument />} />
                    </Routes>
                </Container>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<DashboardLayout />} />
            </Routes>
        </Router>
    );
}

export default App;
