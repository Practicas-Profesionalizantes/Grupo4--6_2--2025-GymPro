import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/HomePage";
import SubscriptionPage from "./pages/subscription/SubscriptionPage";
import PaymentProcessPage from "./pages/payment/PaymentProcessPage";
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage";
import Footer from "./components/Footer";
import './assets/css/main.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/payment" element={<PaymentProcessPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
