import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FcBusinessman, FcLock } from "react-icons/fc";
import { toast } from 'react-toastify';

const ChangePassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const { token } = useParams();

    if (token !== "123456") {
        navigate("/");
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password.length < 6) {
            toast.error("😐 La contraseña debe contener almenos 6 caracteres", {
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
        }
    };

    return (
        <div className='bg-white p-8 rounded-lg md:w-85'>
            <div>
                <img src="{logo}" alt="" />
            </div>
            <div className='mb-10'>
                <h1 className="text-3xl text-center uppercase font-bold">Actualizar Contraseña</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
                <div className="relative">
                    <FcLock className="absolute left-2 top-1/2 -translate-y-1/2" />
                    <input type="password"
                        className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                        placeholder="Contraseña Acceso"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <FcLock className="absolute left-2 top-1/2 -translate-y-1/2" />
                    <input type="password"
                        className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                        placeholder="Confirma Contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button className="mt-4 bg-sky-900 text-white w-full py-2 px-6 rounded-lg hover:scale-105 transition-all">Actualizar Contraseña</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;