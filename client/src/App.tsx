import { Routes, Route } from "react-router";
import ContactForm from "./pages/Contact";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ContactForm />} />
    </Routes>
  );
};

export default App;
