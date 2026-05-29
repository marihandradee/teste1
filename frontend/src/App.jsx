import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import Agendamento from './pages/Agendamento';
import AdminDashboard from './pages/AdminDashboard';
import AdminServices from './pages/AdminServices';
import './styles/global.css';

function PrivateRoute({ children, role }) {
    const { user } = useContext(AppContext);
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;
    return children;
}

export default function App() {
    const { user } = useContext(AppContext);
    return (
        <>
            {user && <Header />}
            <Routes>
                <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? "/admin" : "/"} />} />
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/agendamento" element={<PrivateRoute role="cliente"><Agendamento /></PrivateRoute>} />
                <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
                <Route path="/admin/servicos" element={<PrivateRoute role="admin"><AdminServices /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
}