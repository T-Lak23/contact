import { Routes, Route, Navigate } from "react-router";
import ContactForm from "./pages/Contact";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ContactForm />} />
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
};

export default App;
