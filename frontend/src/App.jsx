import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import ClassesPage from './pages/ClassesPage';
import MyBookingsPage from './pages/MyBookingsPage';
import ProtectedRoute from './components/ProtectedRoute';

const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route 
          path="/classes" 
          element={
            <ProtectedRoute>
              <ClassesPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/my-bookings" 
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin" 
          element={
            <Suspense fallback={<div style={{ padding: '2rem' }}>Loading Admin Panel...</div>}>
              <AdminPanel />
            </Suspense>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
