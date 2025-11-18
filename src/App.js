import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import HomePage from "./pages/home/HomePage";
import SubscriptionPage from "./pages/subscription/SubscriptionPage";
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage";
import PaymentFailedPage from "./pages/payment/PaymentFailedPage";
import AdminDashboard from "./pages/admin/AdminDashboard"
import LoginPage from "./pages/login/LoginPage"
import Footer from "./components/Footer";
import './assets/css/main.css'

const ProtectedRoute = ({ children, requiredRole = 'admin' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const baseURL = `${window.location.protocol}//${window.location.hostname}:80`;
        const response = await axios.get(`${baseURL}/api/auth/verify`, {
          withCredentials: true
        });

        if (response.data.authenticated && response.data.isAdmin) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#0a0a0a',
        color: 'white'
      }}>
        <div>Verificando acceso...</div>
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/failed" element={<PaymentFailedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
      {/* <Footer/> */}
    </>
  );
}

export default App;
