import React from "react";
import "./index.css";

export default function Home() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [users, setUsers] = React.useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://flask-tutorial-mc8m.onrender.com/users"
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://flask-tutorial-mc8m.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "John Doe",
            email: "john.doe@example.com",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      setName("");
      setEmail("");

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="title">Gestão de usuários</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="custom-button" type="submit">
          Adicionar usuário
        </button>
      </form>

      <h2>Usuários cadastrados</h2>
      {users.length === 0 ? (
        <p>Nenhum usuário cadastrado.</p>
      ) : (
        <ul>
          {users.map((user: any) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
