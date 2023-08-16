import axios from "axios";
import { toast } from "react-toastify";
import "react-resizable/css/styles.css";
import { Fragment, useRef } from 'react';
import { useSelector } from "react-redux";
import "react-grid-layout/css/styles.css";
import React, { useEffect, useState } from "react";
import { User, CA, CO } from "../../assets/images/SVG";
import { Dialog, Transition } from '@headlessui/react';
import { EventNotifierManager } from "../../components/EventNotifierPE";
import { EventNotifierEmployees } from "../../components/EventNotifierPE";
import { EventNotifierInmediateBoss } from "../../components/EventNotifierPE";
import { useUpdateLaw1581Mutation } from "../../redux_app/services/auth/authentication";
import { SpanishText, EnglishText } from "../../components/InformedConsentLaw1581";
import { Graphics } from "../dashboard/dashboard-hhrr/vizualization-components/DashboardsGraphics";
import CVLayout from "../../layouts/formatsLayout/CVLayout";

const Home = () => {
	const [personalSection, setPersonalSection] = useState(2);
	const nombre_usuario_actual = useSelector((state) => state);
	const current_user = nombre_usuario_actual.authAPISlice.current_user.ccn_employee || 0
	const informed_consent_law_1581 = nombre_usuario_actual.authAPISlice.current_user.informed_consent_law_1581 || 0
	const ccn_role = nombre_usuario_actual.authAPISlice.access_level.ccn_role

	const [updateLaw1581, { data: data_employee, error, isError, isSuccess }] = useUpdateLaw1581Mutation(current_user);

	const [role, setRole] = useState(0);
	const [language, setLanguage] = useState("Español");
	const [informedConsentLaw1581, setInformedConsentLaw1581] = useState(false);
	const [open, setOpen] = useState(informed_consent_law_1581 === "1" ? false : true);
	const [managerPerformanceEvaluation, setManagerPerformanceEvaluation] = useState([]);
	const [employeePerformanceEvaluation, setEmployeePerformanceEvaluation] = useState([]);
	const [immediateBossPerformanceEvaluation, setImmediateBossPerformanceEvaluation,] = useState([]);

	const getEvents = async () => {
		try {
			const respEmployeePerformanceEvaluation = await axios(
				`${import.meta.env.VITE_API_ADDRESS
				}performance_evaluation/employee/${current_user}`
			);
			setEmployeePerformanceEvaluation(
				respEmployeePerformanceEvaluation.data.PerformanceEvaluation
			);
			const ImmediateBossPerformanceEvaluation = await axios(
				`${import.meta.env.VITE_API_ADDRESS
				}performance_evaluation/immediate_boss/${current_user}`
			);
			setImmediateBossPerformanceEvaluation(
				ImmediateBossPerformanceEvaluation.data.PerformanceEvaluation
			);
			const ManagerPerformanceEvaluation = await axios(
				`${import.meta.env.VITE_API_ADDRESS
				}performance_evaluation/manager/${current_user}`
			);
			setManagerPerformanceEvaluation(
				ManagerPerformanceEvaluation.data.PerformanceEvaluation
			);
		} catch (error) {
			console.log(error);
		}
	};
	if (!employeePerformanceEvaluation) return <></>;
	useEffect(() => {
		getEvents();
	}, []);

	const handleSubmit = () => {
		const body = {
			ccn_employee: current_user,
			informed_consent_law_1581: informedConsentLaw1581 === "on" ? 1 : 0
		}
		updateLaw1581(body)

		if (isSuccess) {
			toast.success(informedConsentLaw1581 === "on" ? "Aceptaste con Exito" : "Rechaste la aceptcion", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			if (informedConsentLaw1581 === "on") {
				window.location = `${import.meta.env.VITE_REDIRECT}/`;
			} else {
				window.location = `${import.meta.env.VITE_REDIRECT}/home`;
			}
		} else if (isError) {
			toast.error(`Error al Aceptar: ${error.data.msg}`, {
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
	}

	function InformedConsentLaw1581({ English, Spanish }) {
		const cancelButtonRef = useRef(null)

		return (
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 z-20 overflow-y-scroll">
						<div className="flex mt-[100px] items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-96 lg:w-[898px] ">
									<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
										<div className="sm:flex sm:items-start">
											<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
												<Dialog.Title as="h3" className="text-[24px] text-center font-semibold leading-6 text-gray-900">
													Autorización de Tratamiento de Datos Personales
												</Dialog.Title>
												<div className="grid grid-cols-1 h-[389px] text-start p-3 overflow-y-scroll border-black border-b-2 mt-[16px]">
													<div className="mt-2">
														<p className="">
															A continuación se presenta la política de tratamiento de datos personales de Econnabis S.A.S. Antes de aceptar, por favor lea detenidamente cada uno de los apartados.
														</p>
													</div>
													<div className="mt-2 grid grid-cols-1">
														{language === "Español" ? <SpanishText /> : <EnglishText />}
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="bg-gray-50 px-4">
										<form>
											<div className="relative flex gap-x-3">
												<div className="flex ml-3 my-3 items-center">
													<input
														onChange={(e) => setInformedConsentLaw1581(e.target.value)}
														name="informed_consent_law_1581"
														type="checkbox"
														className="h-5 w-5 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
													/>
												</div>
												<div className="text-sm my-3 leading-6">
													<label
														htmlFor="manager_approval"
														className="font-medium text-gray-900"
													>
														<strong>
															He leído y acepto la política de privacidad de  Econnabis S.A.S.
														</strong>
													</label>
												</div>
											</div>
											<div className="grid grid-cols-2 mb-5">
												<div className="text-start">
													<button
														type="button"
														className="mt-3 text-[#007367] h-[52px] mx-2 w-[71px] bg-white border border-[#007367] rounded-lg"
														onClick={() => setOpen(false)}
														ref={cancelButtonRef}
													>
														Cancel
													</button>
													<input
														onClick={handleSubmit}
														type="button"
														value="Aceptar"
														className="mt-3 bg-[#007367] h-[52px] mx-2 w-[71px] text-white rounded-lg"
														ref={cancelButtonRef}
													/>


												</div>
												<div className="text-end my-auto">
													{language === "Español"
														?
														<>
															<button className="opacity-50 mx-1" onClick={() => setLanguage("Español")}>
																<CO />
															</button>
															<button
																onClick={() => setLanguage("English")}
															>
																<CA />
															</button>
														</>
														:
														<>
															<button onClick={() => setLanguage("Español")}>
																<CO />
															</button>
															<button
																className="opacity-50 mx-1"
																onClick={() => setLanguage("English")}
															>
																<CA />
															</button>
														</>
													}
												</div>
											</div>
										</form>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		)
	}
	const size = screen.width
	return (
		<>
			{ccn_role === 28 && role === 0 ? <Graphics /> : null}
			<div className="flex justify-center font-bold gap-x-20">
				<button className={personalSection === 1 ? "disabled text-[#E19974] underline underline-offset-8" : "disabled  underline underline-offset-8"} onClick={() => setPersonalSection(1)}>Tareas</button>
				<button className={personalSection === 2 ? "disabled text-[#E19974] underline underline-offset-8" : "disabled  underline underline-offset-8"} onClick={() => setPersonalSection(2)}>Datos</button>
			</div>
			{
				personalSection === 1
					?
					<>
						{role === 0 ? (
							<div className="block w-auto mx-auto bg-white p-2">
								<h1 className="text-center mb-5 text-[35px]">
									<strong>Selecciona un rol para comenzar</strong>
								</h1>
								<div className="lg:grid lg:grid-cols-3 sm:grid sm:grid-cols-1 justify-self-center">
									<div className="mx-auto grid justify-items-center"
									>
										<button
											className={size <= 709 ?
												"rounded-lg w-[340px] h-[100px] bg-[#E19974]"
												: "rounded-lg w-[165px] h-[185px] bg-[#E19974]"}
											onClick={() => setRole(1)}
										>
											<User color="white" />
											<p className="text-[20px] text-white">
												<strong>Evaluado</strong>
											</p>
										</button>
										<div className="flex text-center p-1">
											<p className="text-[16px]">
												<strong>
													Tareas Pendientes
												</strong>
											</p>
											{employeePerformanceEvaluation &&
												employeePerformanceEvaluation.length ===
												0 ? (
												<p className="bg-[#007367] text-white w-[24px] h-[24px] mx-1 rounded-full">
													{
														employeePerformanceEvaluation.length
													}
												</p>
											) : (
												<p className="bg-[#f05252] text-white w-[24px] h-[24px] mx-1 rounded-full">
													{
														employeePerformanceEvaluation.length
													}
												</p>
											)}
										</div>
									</div>
									<div className="m-auto grid justify-items-center">
										<button
											className={size <= 709 ?
												"rounded-lg w-[340px] h-[100px] bg-[#B37FB9]"
												: "rounded-lg w-[165px] h-[185px] bg-[#B37FB9]"}
											onClick={() => setRole(2)}
										>
											<User color="white" />
											<p className="text-[20px] text-white">
												<strong>Jefe Inmediato</strong>
											</p>
										</button>
										<div className="flex text-center p-1">
											<p className="text-[16px]">
												<strong>
													Tareas Pendientes
												</strong>
											</p>
											{immediateBossPerformanceEvaluation &&
												immediateBossPerformanceEvaluation.length ===
												0 ? (
												<p className="bg-[#007367] text-white w-[24px] mx-1 h-[24px] rounded-full">
													{
														immediateBossPerformanceEvaluation.length
													}
												</p>
											) : (
												<p className="bg-[#f05252] text-white w-[24px] mx-1 h-[24px] rounded-full">
													{
														immediateBossPerformanceEvaluation.length
													}
												</p>
											)}
										</div>
									</div>
									<div className="m-auto grid justify-items-center">
										<button
											className={size <= 709 ?
												"rounded-lg w-[340px] h-[100px] bg-[#B2B2B2]"
												: "rounded-lg w-[165px] h-[185px] bg-[#B2B2B2]"}
											onClick={() => setRole(3)}
										>
											<User color="white" />
											<p className="text-[20px] text-white">
												<strong>Jefe Superior Inmediato</strong>
											</p>
										</button>
										<div className="flex text-center p-1">
											<p className="text-[16px]">
												<strong>
													Tareas Pendientes{" "}
												</strong>
											</p>
											{managerPerformanceEvaluation &&
												managerPerformanceEvaluation.length === 0 ? (
												<p className="bg-[#007367] text-white w-[24px] mx-1 h-[24px] rounded-full">
													{
														managerPerformanceEvaluation.length
													}
												</p>
											) : (
												<p className="bg-[#f05252] text-white w-[24px] mx-1 h-[24px] rounded-full">
													{
														managerPerformanceEvaluation.length
													}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
						) : role === 1 ? (
							<div className="bg-white my-3 rounded-lg lg:w-[50%] sm:w-[100%] shadow-lg">
								<EventNotifierEmployees />
							</div>
						) : role === 2 ? (
							<div className="rounded-lg grid justify-items-start">
								<EventNotifierInmediateBoss />
							</div>
						) : role === 3 ? (
							<div className="my-5 rounded-lg lg:w-[40%] sm:w-[100%]">
								<EventNotifierManager />
							</div>
						) : null}
					</>
					: personalSection === 2
						?
						<CVLayout ccn_employee={current_user} />
						:
						null
			}

			<InformedConsentLaw1581 English={EnglishText} Spanish={SpanishText} />
		</>
	);
};

export default Home;
