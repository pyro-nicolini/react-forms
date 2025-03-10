import React from "react";
import Button from "./Button";

function Login({ onChange, values, auth, setAuth }) {
  const { email, pass, error, exito } = values;

  const validarLogin = (e) => {
    e.preventDefault();
    const { email, pass } = auth.input;

    if (!email?.trim() || !pass?.trim()) {
      return setAuth((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          error: "Todos los campos son obligatorios",
          exito: "",
        },
      }));
    }

    if (pass.length < 6) {
      return setAuth((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          error: "La contraseña debe tener al menos 6 caracteres",
          exito: "",
        },
      }));
    }

    const usuarioEncontrado = auth.users.find(
      (user) => user.email === email && user.pass === pass
    );

    if (!usuarioEncontrado) {
      return setAuth((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          error: "Usuario y/o contraseña no válidos",
          exito: "",
        },
      }));
    }

    setAuth((prev) => ({
      ...prev,
      autorizado: true,
      autenticado: usuarioEncontrado,
      input: {
        email: "",
        pass: "",
        error: "",
        exito: `Inicio de sesión exitoso`,
      },
    }));

    alert(`¡Bienvenido, ${email}!`);
  };

  return (
    <form onSubmit={validarLogin} className="form">
      <h3>🔓 Iniciar Sesión</h3>
      {error && <p className="alert">{error}</p>}
      {exito && <p className="exito">{exito}</p>}
      <div className="titleForm">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          className="flex"
          placeholder="Email"
        />
      </div>
      <div className="titleForm">
        <label>Contraseña:</label>
        <input
          type="password"
          name="pass"
          value={pass}
          onChange={onChange}
          className="flex"
          placeholder="contraseña"
        />
      </div>
      <div className="column gap">
        <Button
          type="submit"
          className={`padding`}
          buttonText={"Iniciar Sesión"}
        />
        <a href="#" className="white">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </form>
  );
}

export default Login;
