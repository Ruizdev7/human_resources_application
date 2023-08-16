import { useForm } from "react-hook-form";

import axios from "axios";
import { useState } from "react";
export const AccessControl = () => {

    const [progress, setProgress] = useState(0);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {},
    });

    const getEmployee = async (e) => {
        console.log(e.target.value)
        const resEmployee = await axios(
            `${import.meta.env.VITE_API_ADDRESS}access_control/${e.target.value}`
        );
        console.log(resEmployee);
    }


    const onSubmit = (data) => {
        const sendData = async () => {
            const formData = new FormData();
            formData.append("excelfile", data.excelfile[0]);
            const respSendFile = await axios
                .post(`${import.meta.env.VITE_API_ADDRESS}access_control`, formData, {
                    header: { "Access-Control-Allow-Origin": "*" },
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            const apiProgress = data.progress;
            setProgress(apiProgress);
            window.location.href = window.location.href;
        }
        sendData();
    }

    return (
        <div className="bg-white">
            <div className="w-[100%] p-5 gird grid-rows-4 gap-4 rounded-md h-[70vh] bg-white">
                <form onSubmit={handleSubmit(
                    onSubmit
                )}>
                    <div>
                        <input
                            type="text"
                            className="border border-black"
                            onChange={getEmployee}
                        />
                        <label className="block text-sm font-medium text-gray-700">
                            Cargar Archivo
                        </label>
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-12 h-12"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                                />
                                            </svg>
                                        </span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            {...register(
                                                "excelfile",
                                                {
                                                    required: true,
                                                }
                                            )}
                                        />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PNG,
                                    JPG,
                                    GIF
                                    up
                                    to
                                    10MB
                                </p>
                            </div>
                            {errors
                                .image
                                ?.type ===
                                "required" && (
                                    <p>
                                        Este
                                        campo
                                        es
                                        necesario
                                    </p>
                                )}
                        </div>
                        <div style={{ width: `${progress}%` }}> {progress}% </div>
                        <input
                            value="Crear"
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 m-5 focus:ring-offset-2"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}