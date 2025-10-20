import React from "react";
import './sidebar.css';
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { People, FileText, Folder2, Flag } from "react-bootstrap-icons";

const Sidebar = () => {
    return (
        <div className="bg-light vh-100 p-3" style={{ width: '250px' }}>
            <div className="sidebar-title">
                <h4 className="text-center mb-4">Main Menu</h4>
                <Nav className="flex-column d-grid gap-3">
                    <Nav.Link as={NavLink} to="/users" className="d-flex align-items-center gap-2">
                        <People size={20} /> Manage Users
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/projects" className="d-flex align-items-center gap-2">
                        <Folder2 size={20} /> Manage Projects
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/milestone" className="d-flex align-items-center gap-2">
                        <Flag size={20} /> Manage Milestones
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/document" className="d-flex align-items-center gap-2">
                        <FileText size={20} /> Manage Documents
                    </Nav.Link>
                </Nav>
            </div>
        </div>
    );
};

export default Sidebar;