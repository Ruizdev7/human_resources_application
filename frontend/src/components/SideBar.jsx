import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo_oficial_plena_blanco from "../assets/images/econnabis-logo-white.png";

import { useSelector, useDispatch } from "react-redux";

// Icons
import {
	RiBarChartBoxLine,
	RiFileUserLine,
	RiSecurePaymentFill,
	RiMessage2Line,
	RiListSettingsLine,
	RiLogoutCircleRLine,
	RiArrowRightSLine,
	RiMenuFoldLine,
	RiCloseLine,
	RiHome3Line,
} from "react-icons/ri";

const SideBar = () => {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const [showMenuHYS, setshowMenuHYS] = useState(false);
	const [showMenuSecurity, setshowMenuSecurity] = useState(false);
	const [showMenuHHRR, setshowMenuHHRR] = useState(false);
	const [showMenuSettings, setshowMenuSettings] = useState(false);
	const [showMenuDashBoard, setShowMenuDashBoard] = useState(false);
	const [showMenuDefiniteCodes, setShowMenuDefiniteCodes] = useState(false);
	const [showMenuDemographicData, setShowMenuDemographicData] =
		useState(false);
	const [ShowMenuSocioDemographicData, setShowMenuSocioDemographicData] =
		useState(false);
	const [showMenuRelationship, setShowMenuRelationship] = useState(false);
	const [showPersonalInformation, setShowPersonalInformation] =
		useState(false);
	const [ShowAfiliationData, setShowAfiliationData] = useState(false);

	const nombre_usuario_actual = useSelector((state) => state);

	const current_user = nombre_usuario_actual.authAPISlice.current_user.ccn_employee || 0

	return (
		<>
			<div
				className={`lg:h-screen overflow-y-scroll fixed sm:w-full lg:w-[30%] 
				h-full top-0 bg-[#1e1e2d] flex flex-col justify-between z-50 ${showMenu ? "left-0" : "-left-full"
					} transition-all `}
			>
				<div>
					<div className="my-2 p-1">
						<img
							className="mt-2 mx-auto w-40 rounded-sm"
							src={logo_oficial_plena_blanco}
							alt=""
						/>
					</div>
					<ul>
						<li>
							<button className="w-full flex items-center gap-4 py-2 px-4 rounded-lg text-white text-sm hover:bg-secondary-900 transition-colors">
								<span className="flex items-center gap-4">
									<RiHome3Line className="text-white" />
								</span>
								<Link to="/home">Home</Link>
							</button>
							<button
								onClick={() =>
									setShowMenuDashBoard(!showMenuDashBoard)
								}
								className={`w-full flex ${[31, 3, 2, 1].includes(current_user) ? null : "hidden"
									} items-center gap-4 py-2 px-4 rounded-lg text-white text-sm hover:bg-secondary-900 transition-colors`}
							>
								<span className="flex items-center gap-4">
									<RiBarChartBoxLine className="text-sky-900" />
								</span>
								Dashboards
								<RiArrowRightSLine
									className={`mt-1 ${showMenuDashBoard && "rotate-90"
										} transition-all`}
								/>
							</button>
							<ul
								className={`my-2 ${!showMenuDashBoard && "hidden"
									}`}
							>
								<li>
									<Link
										to="/metrics/hhrr"
										className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Recursos Humanos
									</Link>
								</li>
								<li>
									<Link
										to="/dashboard-PBI"
										className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Dashboard PBI
									</Link>
								</li>

								{/*
								<li>
									<Link
										to="/"
										className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										H&S
									</Link>
								</li>
								*/}
							</ul>
						</li>
						<li>
							<button
								onClick={() => setshowMenuHHRR(!showMenuHHRR)}
								className={`w-full flex ${[31, 3, 2, 1].includes(current_user) ? null : "hidden"
									} items-center gap-4 py-2 px-4 rounded-lg text-white text-sm hover:bg-secondary-900 transition-colors`}
							>
								<span className="flex items-center gap-4 text-sm">
									<RiFileUserLine className="text-sky-900" />
								</span>
								HHRR
								<RiArrowRightSLine
									className={`mt-1 ${showMenuHHRR && "rotate-90"
										} transition-all`}
								/>
							</button>
							<ul className={`my-2 ${!showMenuHHRR && "hidden"}`}>
								<li>
									<Link
										to="/basic-data-employee"
										className="text-sm text-white hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Datos Básicos Empleado
									</Link>
								</li>

								<li>
									<Link
										to="/emergency-contact-details"
										className="text-sm text-white hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Contacto de Emergencia
									</Link>
								</li>
								<li>
									<Link
										to="/social-security"
										className="text-sm text-white hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Seguridad Social
									</Link>
								</li>
								<li>
									<Link
										to="/employment-relationship"
										className="text-sm text-white hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Vinculación Laboral
									</Link>
								</li>
								<li>
									<Link
										to="/demographic-data"
										className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Datos Demográficos
									</Link>
								</li>
								<li>
									<Link
										to="/sociodemographic-data"
										className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Datos Sociodemográficos
									</Link>
								</li>
								<li>
									<Link
										to="/family-nucleus"
										className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Núcleo Familiar
									</Link>
								</li>
								<li>
									<Link
										to="/health-condition"
										className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Estado de Salud
									</Link>
								</li>
								<li>
									<Link
										to="/perfomance-evaluation-2022"
										className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Evaluación de Desempeño 2022
									</Link>
								</li>
							</ul>
						</li>

						{/*
						<li>
							<button
								onClick={() => setshowMenuHYS(!showMenuHYS)}
								className={`w-full flex ${[31, 3, 2, 1].includes(current_user) ? null : "hidden"
									} items-center gap-4 py-2 px-4 rounded-lg text-white text-sm hover:bg-secondary-900 transition-colors`}
							>
								<span className="flex items-center gap-4">
									<RiSecurePaymentFill className="text-sky-900" />
								</span>
								H&S
								<RiArrowRightSLine
									className={`mt-1 ${showMenuHYS && "rotate-90"
										} transition-all`}
								/>
							</button>
							<ul className={`my-2 ${!showMenuHYS && "hidden"}`}>
								<li>
									<Link
										to="/"
										className="text-sm text-white hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Permisos de Altura
									</Link>
								</li>
							</ul>
						</li>
						*/}
						<li>
							<button
								onClick={() =>
									setshowMenuSettings(!showMenuSettings)
								}
								className={`w-full flex ${[31, 3, 2, 1].includes(current_user) ? null : "hidden"
									} items-center gap-4 py-2 px-4 rounded-lg text-white text-sm hover:bg-secondary-900 transition-colors`}
							>
								<span className="flex items-center gap-4">
									<RiMessage2Line className="text-sky-900" />
								</span>
								Configuración
								<RiArrowRightSLine
									className={`mt-1 ${showMenuSettings && "rotate-90"
										} transition-all`}
								/>
							</button>
							<ul
								className={`my-2 ml-[15px] ${!showMenuSettings && "hidden"
									}`}
							>
								<button
									onClick={() =>
										setShowMenuDefiniteCodes(
											!showMenuDefiniteCodes
										)
									}
									className="text-white text-sm flex items-center hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
								>
									Códigos definidos
									<RiArrowRightSLine
										className={`mt-1 mx-3 ${showMenuDefiniteCodes && "rotate-90"
											} transition-all`}
									/>
								</button>
								<ul
									className={`my-2 ml-[15px] ${!showMenuDefiniteCodes && "hidden"
										}`}
								>
									<button
										onClick={() =>
											setShowPersonalInformation(
												!showPersonalInformation
											)
										}
										className="text-white text-sm flex items-center hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Datos Personales
										<RiArrowRightSLine
											className={`mt-1 mx-5 ${showPersonalInformation &&
												"rotate-90"
												} transition-all`}
										/>
									</button>
									<ul
										className={`my-2 ${!showPersonalInformation && "hidden"
											}`}
									>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/rh"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												RH
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/gender"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Genero
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/cities"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Ciudades
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/departments"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Departamentos
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/countries"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Paises
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/age-ranges"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Rangos de Edad
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/types-id"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Tipo de Documentos
											</Link>
										</li>
									</ul>
								</ul>
								<ul
									className={`my-2 ml-[15px] ${!showMenuDefiniteCodes && "hidden"
										}`}
								>
									<button
										onClick={() =>
											setShowAfiliationData(
												!ShowAfiliationData
											)
										}
										className="text-white  text-sm flex items-center hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Datos de Afiliación
										<RiArrowRightSLine
											className={`mt-1 mx-5 ${ShowAfiliationData &&
												"rotate-90"
												} transition-all`}
										/>
									</button>
									<ul
										className={`my-2 ${!ShowAfiliationData && "hidden"
											}`}
									>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/type-affiliation"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Tipo de Afiliación
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/type-contributor"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Tipo de Cotizante
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/eps"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												EPS
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/afp"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												AFP
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/arl"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												ARL
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/ccf"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												CCF
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/aap"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												AAP
											</Link>
										</li>
									</ul>
								</ul>
								<ul
									className={`my-2 ml-[15px] ${!showMenuDefiniteCodes && "hidden"
										}`}
								>
									<button
										onClick={() =>
											setShowMenuRelationship(
												!showMenuRelationship
											)
										}
										className="text-white  text-sm flex items-center hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Datos de Vinculación Laboral
										<RiArrowRightSLine
											className={`mt-1 mx-5 ${showMenuRelationship &&
												"rotate-90"
												} transition-all`}
										/>
									</button>
									<ul
										className={`my-2 ${!showMenuRelationship && "hidden"
											}`}
									>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/roles"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Roles - Cargos
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/work-shift"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Turnos de Trabajo
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/type-relationship"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Tipo de Vinculación
											</Link>
										</li>
									</ul>
								</ul>
								<ul
									className={`my-2 ml-[15px] ${!showMenuDefiniteCodes && "hidden"
										}`}
								>
									<button
										onClick={() =>
											setShowMenuDemographicData(
												!showMenuDemographicData
											)
										}
										className="text-white  text-sm flex items-center hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Datos Demográficos
										<RiArrowRightSLine
											className={`mt-1 mx-5 ${showMenuDemographicData &&
												"rotate-90"
												} transition-all`}
										/>
									</button>
									<ul
										className={`my-2 ${!showMenuDemographicData && "hidden"
											}`}
									>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/schooling-level"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Nivel de Escolaridad
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/race"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Raza
											</Link>
										</li>
									</ul>
								</ul>
								<ul
									className={`my-2 ml-[15px] ${!showMenuDefiniteCodes && "hidden"
										}`}
								>
									<button
										onClick={() =>
											setShowMenuSocioDemographicData(
												!ShowMenuSocioDemographicData
											)
										}
										className="text-white  text-sm flex items-center hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
									>
										Datos Sociodemograficos
										<RiArrowRightSLine
											className={`mt-1 mx-5 ${ShowMenuSocioDemographicData &&
												"rotate-90"
												} transition-all`}
										/>
									</button>
									<ul
										className={`my-2 ${!ShowMenuSocioDemographicData &&
											"hidden"
											}`}
									>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/marital-status"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Estado Civil
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/house-type"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Tipo de Vivienda
											</Link>
										</li>
										<li className="ml-[15px]">
											<Link
												to="/definite-codes/subhouse-type"
												className="text-white text-sm hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Características de Vivienda
											</Link>
										</li>
									</ul>
								</ul>
							</ul>
						</li>
					</ul>
				</div>
				<button
					onClick={() => setShowMenu(!showMenu)}
					className="fixed bottom-4 right-4 bg-[#007367] text-white p-3 rounded-full z-50"
				>
					{showMenu ? <RiCloseLine /> : <RiMenuFoldLine />}
				</button>
			</div>
		</>
	);
};

export default SideBar;