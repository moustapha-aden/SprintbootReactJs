import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Remplis tous les champs !");
      return;
    }

    try {
      if (isLogin) {
        // --- Connexion ---
        const res = await axios.post("http://localhost:8080/api/auth/login", { email, password });
        if (res.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/todos");
        } else {
          alert("Email ou mot de passe incorrect");
        }
      } else {
        // --- Inscription ---
        await axios.post("http://localhost:8080/api/auth/register", { email, password });
        alert("Compte créé avec succès !");
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion avec le serveur");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-8 w-80 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          {isLogin ? "Connexion" : "Inscription"}
        </h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4 rounded"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700 transition"
        >
          {isLogin ? "Se connecter" : "Créer un compte"}
        </button>

        <p className="mt-4 text-sm text-gray-600">
          {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={toggleMode}
          >
            {isLogin ? "S'inscrire" : "Se connecter"}
          </span>
        </p>
      </div>
    </div>
  );
}
