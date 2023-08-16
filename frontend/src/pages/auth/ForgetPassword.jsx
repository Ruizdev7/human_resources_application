import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcBusinessman } from "react-icons/fc";
import { toast } from "react-toastify";
// import logo from "./../../assets/images/logo_oficial_plena.jpg";

const ForgetPassword = () => {
	const [identification, setIdentification] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if ([identification].includes("")) {
			toast.error("😐 El email es un campo obligatorio", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			return;

			// VERIFICAR QUE EL EMAIL EXSTA EN LA BASE DE DATOS
			// ENVIAR AL EMAIL INSTRUCCIONES DE RECUPERACION DE CONSTRASEÑA
		}

		toast.success(
			"😀 Se han enviado las instrucciones de recuperacion al correo electronico de manera satisfacoria",
			{
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			}
		);
		return;
	};

	return (
		<div className="bg-white p-8 rounded-lg md:w-85">
			<div>
				<img alt="" />
			</div>
			<div className="mb-10">
				<h1 className="text-2xl text-center uppercase font-bold">
					Recuperar Contraseña
				</h1>
			</div>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
				<div className="relative">
					<FcBusinessman className="absolute left-2 top-1/2 -translate-y-1/2" />
					<input
						type="number"
						className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
						placeholder="Numero de Identificación"
						value={identification}
						onChange={(e) => setIdentification(e.target.value)}
					/>
				</div>

				<div>
					<button className="mt-4 bg-sky-900 text-white w-full py-2 px-6 rounded-lg hover:scale-105 transition-all">
						Enviar Token
					</button>
				</div>
			</form>
			<div className="text-center">
				¿Ya te encuentras registrado?{" "}
				<Link
					to="../"
					className="text-sky-900 font-bold hover:underline transition-all"
				>
					Ingresa a la plataforma
				</Link>
			</div>
		</div>
	);
};

export default ForgetPassword;
