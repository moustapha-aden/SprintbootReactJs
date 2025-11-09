import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import TodoApp from "./pages/TodoApp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/todos" element={<TodoApp />} />
      </Routes>
    </BrowserRouter>
  );
}
