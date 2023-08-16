import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { useLoginUserIAPMutation } from "../../redux_app/services/auth/authentication";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, cleanCredentials } from "../../redux_app/role_base_access_control/authSlice";
import { OficialLogo } from "../../assets/images/SVG";

const Login = () => {
	const dispatch = useDispatch()

	const [number_id_employee, set_number_id_employee] = useState("");
	const [employee_password, set_employee_password] = useState("");
	const [redirectToHome, setRedirectToHome] = useState(false);
	const [loginUserIAP, { data, isError, isSuccess, error, isLoading }] =
		useLoginUserIAPMutation();
	const handleSubmit = async (e) => {
		e.preventDefault();
		loginUserIAP({
			"number_id_employee": number_id_employee,
			"employee_password": employee_password
		});
	};
	useEffect(() => {
		dispatch(cleanCredentials());
	}, [])

	useEffect(() => {
		if (isSuccess) {
			toast.success("Credenciales correctas!", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});

			dispatch(
				setCredentials({
					current_user: {
						ccn_employee: data.current_user.ccn_employee,
						token: data.current_user.token,
						full_name_employee: data.current_user.full_name_employee,
						informed_consent_law_1581: data.current_user.informed_consent_law_1581
					},
					access_level: {
						Type_Relationship: data.current_user.Type_Relationship || "",
						area: data.current_user.area || "",
						process: data.current_user.process || "",
						role: data.current_user.role,
						ccn_role: data.current_user.ccn_role,
						is_active_employee: data.current_user.is_active_employee,
					},
				})
			);
			window.location = `${import.meta.env.VITE_REDIRECT}/home`;

		} else if (isError) {
			toast.error(`${error.data.msg}`, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
		//
	}, [isSuccess, isError]);



	return (
		<>
			<section className="container mx-auto">

				<div className="container mx-auto border-[1px] border-gray-300 rounded-lg">
					<div className="bg-gradient-to-t from-[#064B80] to-[#064B80] w-[414px] h-[257px] mx-auto flex flex-col items-center rounded-t-lg">
						<OficialLogo />

						<div className="h-[36px]">
							<h1 className="text-white text-sm"> <span className="text-2xl font-extrabold">IAP </span> | Plataforma de Administracion Interna</h1>
						</div>

						<div className="flex h-[56px] justify-center p-4">
							<div
								value="MTTO"
								className="text-white hover:text-white hover:font-extrabold">Recursos Humanos</div>

						</div>
					</div >

					<div className="w-[416px] h-[316px] rounded-b-lg flex flex-col items-center justify-items-center">
						<form onSubmit={handleSubmit} className="grid grid-cols-1">
							<div className="relative w-[352px] h-[41px] mt-[48px] mb-[42px]">
								<input
									className="peer h-full w-full rounded-[7px] border-2 border-blue-gray-400 bg-gray-100 px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#064B80] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
									type="number"
									value={number_id_employee}
									onChange={(e) => set_number_id_employee(e.target.value)}
									placeholder=" "
								/>
								<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-xs leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:leading-[4] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-xs peer-focus:leading-tight peer-focus:text-[#064B80] peer-focus:font-semibold peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#064B80] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#064B80] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
									NUMERO DE IDENTIFICACION
								</label>
							</div>
							<div className="relative w-[352px] h-[41px] rounded">
								<input
									className="peer h-full w-full rounded-[7px] border-2 border-blue-gray-400 bg-gray-100 px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#064B80] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
									type="password"
									value={employee_password}
									onChange={(e) => set_employee_password(e.target.value)}
									placeholder=" "
								/>
								<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-xs leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:leading-[4] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-xs peer-focus:leading-tight peer-focus:text-[#064B80] peer-focus:font-semibold peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#064B80] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#064B80] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
									CONTRASEÑA
								</label>
							</div>

							<div className="w-[352px] mb-[16px]">
								<div className="mt-[16px] text-end ">
									<a
										href="#"
										className="text-[14px] text-[#00695A] font-bold hover:underline"
									>
										¿Olvidaste tu Contraseña?
									</a>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="bg-[#064B80] text-white w-[352px] h-[41px] rounded-lg mx-auto flex flex-col items-center justify-center hover:bg-[#064B80] hover:font-bold"
								>
									Iniciar Sesion
								</button>

							</div>
						</form>


					</div>

				</div >

				<div className="container  mx-auto mt-[12px] w-[270px] h-[36px] flex flex-row gap-3 justify-center">
					<div>
						<a className="text-xs" href="https://support.plena-global.com/">Ayuda</a>
					</div>
				</div>

			</section >
		</>
	);
};
export default Login;