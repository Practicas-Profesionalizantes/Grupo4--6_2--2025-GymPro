import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/HomePage";
import SubscriptionPage from "./pages/subscription/SubscriptionPage";
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage";
import PaymentFailedPage from "./pages/payment/PaymentFailedPage";
import AdminDashboard from "./pages/admin/AdminDashboard"
import Footer from "./components/Footer";
import './assets/css/main.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}  />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/failed" element={<PaymentFailedPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {/* <Footer/> */}
    </>
  );
}

export default App;
