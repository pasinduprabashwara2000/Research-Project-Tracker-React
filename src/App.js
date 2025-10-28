import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import ManageLogin from "./components/auth/ManageLogin";
import Unauthorized from "./pages/Unauthorized";
import ManageUser from "./pages/ManageUser";
import ManageProject from "./pages/ManageProject";
import ManageMilestone from "./pages/ManageMilestone";
import ManageDocument from "./pages/ManageDocument";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<ManageLogin />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />

                    <Route
                        path="/users"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <ManageUser />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/projects"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN", "PI"]}>
                                <ManageProject />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/milestone"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN", "PI", "MEMBER"]}>
                                <ManageMilestone />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/document"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN", "PI", "MEMBER", "VIEWER"]}>
                                <ManageDocument />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
