import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import OTP from "../pages/OTP";
import Signup from "../pages/Signup";
import AuthLayout from '../layouts/AuthLayout';
export default function AppRoutes() {
    return (
            <Routes>
                {/* Home Route */}
                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    }
                />

                {/* Login Route - Phone Input */}
                <Route
                    path="/login"
                    element={
                        <MainLayout>
                            <Login />
                        </MainLayout>
                    }
                />

                {/* OTP Verification Route */}
                <Route
                    path="/login/otp"
                    element={
                        <MainLayout>
                            <OTP />
                        </MainLayout>
                    }
                />

                {/* Signup Route - For New Users */}
                <Route
                    path="/signup"
                    element={
                        <MainLayout>
                            <Signup />
                        </MainLayout>
                    }
                />
            </Routes>
    );
}