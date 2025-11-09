import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TodoApp() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const fetchTodos = async () => {
    const res = await axios.get(`http://localhost:8080/api/todos/${user.id}`);
    setTodos(res.data);
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Titre et description sont requis.");
      return;
    }
    await axios.post("http://localhost:8080/api/todos", {
      title,
      description,
      userId: user.id
    });
    setTitle("");
    setDescription("");
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    await axios.put(`http://localhost:8080/api/todos/${id}`);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8080/api/todos/${id}`);
    fetchTodos();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-8">
        <header className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <h2 className="text-3xl font-semibold text-slate-900">
            Bienvenue {user.email}
          </h2>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-900 hover:text-white"
          >
            Se déconnecter
          </button>
        </header>

        <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200 md:p-8">
          <div className="grid gap-4 md:grid-cols-[2fr,3fr]">
            <input
              className="md:col-span-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Titre..."
              value={title}
              onChange={e=>setTitle(e.target.value)}
            />
            <textarea
              className="md:col-span-1 min-h-[120px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 md:min-h-0"
              placeholder="Description..."
              value={description}
              onChange={e=>setDescription(e.target.value)}
            />
            <button
              onClick={addTodo}
              className="md:col-span-2 inline-flex items-center justify-center rounded-2xl border border-slate-900 bg-white px-6 py-3 font-semibold text-slate-900 shadow-lg shadow-slate-200 transition hover:bg-slate-900 hover:text-white"
            >
              Ajouter la tâche
            </button>
          </div>

          <ul className="mt-8 space-y-4">
            {todos.map(t => (
              <li
                key={t.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 shadow-sm transition hover:border-blue-200 hover:bg-white md:flex-row md:items-center md:gap-6"
              >
                <button
                  type="button"
                  onClick={() => toggleTodo(t.id)}
                  className={`flex-1 text-left transition ${
                    t.completed
                      ? "text-slate-400 line-through"
                      : "text-slate-800 hover:text-blue-600"
                  }`}
                >
                  <span className="text-lg font-semibold">{t.title}</span>
                  <p className="mt-2 text-sm text-slate-500 whitespace-pre-line leading-relaxed">
                    {t.description || "Aucune description fournie."}
                  </p>
                </button>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      t.completed
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {t.completed ? "Terminée" : "En cours"}
                  </span>
                  <button
                    onClick={() => deleteTodo(t.id)}
                    className="rounded-full bg-rose-50 p-2 text-rose-500 transition hover:bg-rose-100"
                    title="Supprimer la tâche"
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
