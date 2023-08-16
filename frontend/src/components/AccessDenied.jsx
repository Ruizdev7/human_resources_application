import React from "react";
import { Link } from "react-router-dom";

const AccessDenied = () => {
    return (
        <>
            {/*
              This example requires updating your template:
      
              ```
              <html class="h-full">
              <body class="h-full">
              ```
            */}
            <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">
                        <svg className="h-32 w-32 m-auto text-red-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Acceso Denegado
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        Lo sentimos pero tu perfil de usuario no esta
                        habilitado para esta seccion, por favor dirigete con
                        administrador para solicitar los permisos.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button>
                            <Link
                                to={`${import.meta.env.VITE_REDIRECT}/home`}
                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            >
                                Home
                            </Link>
                        </button>
                        <button>
                            <Link
                                to={`${import.meta.env.VITE_REDIRECT}/`}
                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            >
                                Cerrar Sesion
                            </Link>
                        </button>

                    </div>
                </div>
            </main>
        </>
    );
};

export default AccessDenied;
