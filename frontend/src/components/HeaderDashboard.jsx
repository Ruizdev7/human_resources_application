import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FcMenu } from "react-icons/fc";
import hhrr_1 from "./../assets/images/HHRR_1.jpg";
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { cleanCredentials } from "../redux_app/services/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { IsotipoPlena, Logout } from "../assets/images/SVG";
import { Link } from "react-router-dom";
import { useUpdatePasswordMutation } from "../redux_app/services/auth/authentication";
import { useUpdatePasswordEmployeeMutation } from "../redux_app/services/employeeAPI";
const navigation = {
	categories: [
		{
			id: "hhrr",
			name: "RECURSOS HUMANOS",
			featured: [
				/*
				{
					name: "Chief Executive Officer (CEO)",
					href: "#",
					imageSrc:
						"https://media.licdn.com/dms/image/C5622AQE5JHeMXF7VsA/feedshare-shrink_800/0/1654629870662?e=1681948800&v=beta&t=owbP3eIMzqComWRX1J7BFTllSAW9U5OmHZpeOluh8a4",
					imageAlt:
						"Chief Executive Officer (CEO) Econnabis SAS Colombia.",
				},
				{
					name: "Personal Altamente Calificado",
					href: "#",
					imageSrc:
						"https://media.licdn.com/dms/image/C4E22AQEmL4kxQB52Tg/feedshare-shrink_1280/0/1637188461567?e=1681948800&v=beta&t=C6CpV4qpR7JKa5qURuqX4BGxwamgLRPJySb9Glk5f_k",
					imageAlt: "Labs Testing.",
				},
				*/
			],
			sections: [
				{
					id: "db",
					name: "Administración del Personal",
					items: [
						{
							name: "Datos básicos",
							href: "/basic-data-employee",
						},
						{
							name: "Seguridad Social",
							href: "/social-security",
						},
						{
							name: "Vinculación Laboral",
							href: "/employment-relationship",
						},
						{
							name: "Contactos de Emergencia",
							href: "/emergency-contact-details",
						},
						{
							name: "Datos demográficos",
							href: "/demographic-data",
						},
						{
							name: "Datos Socio-demográficos",
							href: "/sociodemographic-data",
						},
						{
							name: "Núcleo Familiar",
							href: "/family-nucleus",
						},
						{
							name: "Condición de Salud",
							href: "/health-condition",
						},
					],
				},

				{
					id: "activities",
					name: "Desarrollo",
					items: [
						{
							name: "Evaluación de Desempeño 2022",
							href: "/perfomance-evaluation-2022",
						},
						{
							name: "Dashboard evaluación de desempeño",
							href: "/performance-evaluation-detail/dashboard-performance-evaluation",
						},
					],
				},
			],
		},
		/*{
			id: "hys",
			name: "H&S",
			featured: [
				{
					name: "Medidas de Seguridad contra el COVID-19 ",
					href: "#",
					imageSrc:
						"https://www.paho.org/sites/default/files/styles/max_650x650/public/2022-10/coronavirus.jpg?itok=5fLNsvsH",
					imageAlt: ".",
				},
				{
					name: "Elementos de Proteccion Personal",
					href: "#",
					imageSrc: hhrr_1,
					imageAlt:
						"Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
				},
			],
			sections: [
				{
					id: "shortcuts",
					name: "Accesos Directos",
					items: [
						{ name: "Permisos de Altura", href: "#" },
						{ name: "Entrega de EPP", href: "#" },
					],
				},
			],
		},*/
	],
	pages: [
		{ name: "HOME", href: "/home" },
	],
};


function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const HeaderDashboard = () => {
	const [open, setOpen] = useState(false);
	const [openChangePassword, setOpenChangePassword] = useState(false);
	const [image, setImage] = useState(null); 1
	const [userOptions, setUserOptions] = useState(false);

	const [lastPassword, setLastPassword] = useState();
	const [newPassword, setNewPassword] = useState();
	const [confirmNewPassword, setConfirmNewPassword] = useState();


	const dispatch = useDispatch()
	const nombre_usuario_actual = useSelector((state) => state);

	const current_user = nombre_usuario_actual.authAPISlice.current_user.ccn_employee || 0
	const current_employee = nombre_usuario_actual.authAPISlice.current_user.full_name_employee || ""
	const current_role = nombre_usuario_actual.authAPISlice.access_level.role || ""

	const [updatePassword, { data: data_iap, error: error_iap, isError: is_error_iap, isSuccess: is_success_iap, isLoading: is_loading_iap }] = useUpdatePasswordMutation();
	const [updatePasswordEmployee, { data: data_employee, error: error_employee, isError: is_error_employee, isSuccess: is_success_employee, isLoading: is_loading_employee }] = useUpdatePasswordEmployeeMutation();

	const handleSubmit = () => {

		if (confirmNewPassword === newPassword && lastPassword != "" && newPassword != "" && confirmNewPassword != "") {
			updatePassword(
				{
					"ccn_employee": current_user,
					"last_password": lastPassword,
					"new_password": newPassword,
					"confirm_new_password": confirmNewPassword,
				}
			);
			updatePasswordEmployee(
				{
					"ccn_employee": current_user,
					"last_password": lastPassword,
					"new_password": newPassword,
					"confirm_new_password": confirmNewPassword,
				}
			);
		} else if (confirmNewPassword != newPassword) {
			toast.error(`Es necesario que confirmar la contraseña`, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} else {
			toast.error(`Todos los campos son obligatorios`, {
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


	useEffect(() => {
		async function fetchImage() {
			const respImage = await axios(
				`${import.meta.env.VITE_API_ADDRESS}employee/images/${current_user}`
			);
			if (!image) {
				setImage(`data:image/jpeg;base64,${respImage.data.image_b64}`);
			} else { }
		}
		fetchImage();
	}, []);




	useEffect(() => {
		if (is_success_employee) {
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
			setOpenChangePassword(false)
			setLastPassword("")
			setNewPassword("")
			setConfirmNewPassword("")

		} else if (error_employee || is_error_employee) {
			toast.error(`Las crendenciales suministradas para ${error_employee.data.EmployeeUpdatedError.full_name_employee} son incorrectas`, {
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
	}, [is_success_employee, error_employee, is_error_employee]);


	return (
		<>
			<div className="bg-white ">
				{/* Mobile menu */}
				<Transition.Root show={open} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-50 lg:hidden"
						onClose={setOpen}
					>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black bg-opacity-25" />
						</Transition.Child>

						<div className="fixed inset-0 z-40 flex">
							<Transition.Child
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="-translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full"
							>
								<Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
									<div className="flex px-4 pt-5 pb-2">
										<button
											type="button"
											className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
											onClick={() => setOpen(false)}
										>
											<span className="sr-only">
												Close menu
											</span>
											<svg class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>

										</button>
									</div>

									{/* Links */}

									<div className="space-y-6 border-t border-gray-200 py-6 px-4">
										{navigation.pages.map((page) => (
											<div
												key={page.name}
												className="flow-root"
											>
												<a
													href={page.href}
													className="-m-2 block p-2 font-bold text-sky-900"
												>
													{page.name}
												</a>
											</div>
										))}
									</div>

									<Tab.Group as="div" className="mt-2">
										<div className="border-sky-900 border-b-1">
											<Tab.List className="-mb-px flex space-x-8 px-3">
												{navigation.categories.map(
													(category) => (
														<Tab
															key={category.name}
															className={({
																selected,
															}) =>
																classNames(
																	selected
																		? "border-sky-900 text-sky-900"
																		: "border-transparent text-gray-900",
																	"flex-1 whitespace-nowrap border-b-2 py-4 px-1 font-bold"
																)
															}
														>
															{category.name}
														</Tab>
													)
												)}
											</Tab.List>
										</div>
										<Tab.Panels as={Fragment}>
											{navigation.categories.map(
												(category) => (
													<Tab.Panel
														key={category.name}
														className="space-y-10 px-4 pt-10 pb-8"
													>
														<div className="grid grid-cols-2 gap-x-4">
															{category.featured.map(
																(item) => (
																	<div
																		key={
																			item.name
																		}
																		className="group relative text-sm uppercase"
																	>
																		<div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
																			<img
																				src={
																					item.imageSrc
																				}
																				alt={
																					item.imageAlt
																				}
																				className="object-cover object-center"
																			/>
																		</div>
																		<a
																			href={
																				item.href
																			}
																			className="mt-6 block font-medium text-gray-900"
																		>
																			<span
																				className="absolute inset-0 z-10"
																				aria-hidden="true"
																			/>
																			{
																				item.name
																			}
																		</a>
																	</div>
																)
															)}
														</div>
														{category.sections.map(
															(section) => (
																<div
																	key={
																		section.name
																	}
																>
																	<p
																		id={`${category.id}-${section.id}-heading-mobile`}
																		className="font-arial text-black uppercase"
																	>
																		<strong>
																			{
																				section.name
																			}
																		</strong>
																	</p>
																	<ul
																		role="list"
																		aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
																		className="mt-6 flex flex-col space-y-6"
																	>
																		{section.items.map(
																			(
																				item
																			) => (
																				<li
																					key={
																						item.name
																					}
																					className="flow-root"
																				>
																					<a
																						href={
																							item.href
																						}
																						className="-m-2 block p-2 hover:font-bold text-sky-900"
																					>
																						{
																							item.name
																						}
																					</a>
																				</li>
																			)
																		)}
																	</ul>
																</div>
															)
														)}
													</Tab.Panel>
												)
											)}
										</Tab.Panels>
									</Tab.Group>

									<div className="py-4 px-3">
										<div className="flow-root text-center uppercase">
											<Link
												to="/administration-panel"
												className="text-sm text-white hover:text-sky-600 hover:font-bold py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-sky-900 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 transition-colors"
											>
												Panel de Administración
											</Link>
											<a
												href="/"
												className="mt-6 block font-medium text-gray-900"
											>
												Cerrar Sesión
											</a>
										</div>
									</div>

								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>

				<header className="relative lg:grid lg:grid-cols-2 grid grid-cols-3 justify-items-start space-x-4 bg-white">
					<nav
						aria-label="Top"
						className="max-w-7xl px-4 sm:px-6 lg:px-8"
					>
						<div className="p-5">
							<div className="flex items-center">
								<button
									type="button"
									className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
									onClick={() => setOpen(true)}
								>
									<div className="grid grid-cols-2">
										<FcMenu
											className="h-10 w-10"
											aria-hidden="true"
										/>
									</div>

								</button>

								{/* Flyout menus */}
								<Popover.Group className="hidden z-10 lg:ml-4 lg:block lg:self-stretch">
									<div className="flex h-full  space-x-10">
										{navigation.pages.map((page) => (
											<a
												key={page.name}
												href={page.href}
												className="flex items-center hover:underline-offset-4 text-xl hover:font-bold hover:text-sky-900"
											>
												{page.name}
											</a>
										))}

										{navigation.categories.map(
											(category) => (
												<Popover
													key={category.name}
													className="flex"
												>
													{({ open }) => (
														<>
															<div className="relative flex">
																<Popover.Button
																	className={classNames(
																		open
																			? "border-indigo-600 text-indigo-600"
																			: "border-transparent text-gray-700 hover:text-gray-800",
																		"relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
																	)}
																>
																	{
																		category.name
																	}
																</Popover.Button>
															</div>

															<Transition
																as={Fragment}
																enter="transition ease-out duration-200"
																enterFrom="opacity-0"
																enterTo="opacity-100"
																leave="transition ease-in duration-150"
																leaveFrom="opacity-100"
																leaveTo="opacity-0"
															>
																<Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
																	{/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
																	<div
																		className="absolute inset-0 top-1/2 bg-white shadow"
																		aria-hidden="true"
																	/>

																	<div className="relative bg-white">
																		<div className="mx-auto max-w-7xl px-8">
																			<div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
																				<div className="col-start-2 grid grid-cols-2 gap-x-8">
																					{category.featured.map(
																						(
																							item
																						) => (
																							<div
																								key={
																									item.name
																								}
																								className="group relative text-base sm:text-sm"
																							>
																								<div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
																									<img
																										src={
																											item.imageSrc
																										}
																										alt={
																											item.imageAlt
																										}
																										className="object-cover object-center"
																									/>
																								</div>
																								<a
																									href={
																										item.href
																									}
																									className="mt-6 block font-medium text-gray-900"
																								>
																									<span
																										className="absolute inset-0 z-10"
																										aria-hidden="true"
																									/>
																									{
																										item.name
																									}
																								</a>
																							</div>
																						)
																					)}
																				</div>
																				<div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
																					{category.sections.map(
																						(
																							section
																						) => (
																							<div
																								key={
																									section.name
																								}
																							>
																								<p
																									id={`${section.name}-heading`}
																									className="font-arial uppercase text-black"
																								>
																									<strong>
																										{
																											section.name
																										}
																									</strong>
																								</p>
																								<ul
																									role="list"
																									aria-labelledby={`${section.name}-heading`}
																									className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
																								>
																									{section.items.map(
																										(
																											item
																										) => (
																											<li
																												key={
																													item.name
																												}
																												className="flex"
																											>
																												<a
																													href={
																														item.href
																													}
																													className="hover:text-gray-800"
																												>
																													{
																														item.name
																													}
																												</a>
																											</li>
																										)
																									)}
																								</ul>
																							</div>
																						)
																					)}
																				</div>
																			</div>
																		</div>
																	</div>
																</Popover.Panel>
															</Transition>
														</>
													)}
												</Popover>
											)
										)}
									</div>
								</Popover.Group>
							</div>
						</div>
					</nav>
					<span className="flex  lg:hidden items-center justify-self-center text-sm">
						<button>
							<a href={`${import.meta.env.VITE_REDIRECT}/home`}><IsotipoPlena /></a>
						</button>
					</span>
					<div className="flex items-end justify-self-end my-auto">
						<div className="my-auto ml-5"><svg className="h-7 w-7 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />  <path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg></div>
						<button
							onClick={() => setUserOptions(!userOptions)}>
							<div className="flex">
								<div className="h-12 w-12 mx-2 rounded-full overflow-hidden">
									<img src={image} alt="Imagen de usuario" className="h-full w-full object-cover" />
								</div>
								<div className="hidden text-end lg:block mr-2">
									<p><strong>{current_employee}</strong></p>
									<p>{current_role}</p>

								</div>
							</div>
							{userOptions
								?
								<div className="absolute z-50 rounded-b-lg w-[350px] h-[150px] right-[0px] grid grid-cols-1 my-3 border border-black bg-white">
									<div className=" text-start hover:bg-gray-100 uppercase">
										<a
											href="https://support.plena-global.com"
											className="mx-3"
											target="_blank"
										>
											Soporte Técnico
										</a>
									</div>
									<div className="text-start hover:bg-gray-100 ">
										<button
											onClick={() => setOpenChangePassword(true)}
											className="mx-3 uppercase"
										>
											Cambiar Contraseña
										</button>
									</div>
									<div className="text-start hover:bg-gray-100 uppercase">
										<Link
											to="/administration-panel"
											className="mx-3"
										>
											Panel de Administración
										</Link>
									</div>
									<div className="text-start flex hover:bg-gray-100 border border-t-black  uppercase">
										<a
											onClick={() => {
												dispatch(cleanCredentials());
											}}
											href="/"
											className="flex ml-3 gap-x-3"
										><Logout />Cerrar Sesión
										</a>
									</div>
								</div>
								: null}

						</button>
					</div>
				</header>
			</div>


			<Transition appear show={openChangePassword} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={() => setOpenChangePassword(false)}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

									<Dialog.Title
										as="h3"
										className="text-lg text-center font-bold leading-6 text-gray-900"
									>
										Cambiar Contraseña

									</Dialog.Title>

									{is_loading_iap || is_loading_employee ? <IsotipoPlena className="animate-spin mx-auto" /> :
										<>
											<div className="mt-2 uppercase flex flex-col justify-center items-center">
												<div className="relative mt-5 w-[352px] h-[41px] rounded">
													<input
														className="peer h-full w-full rounded-[7px] border-2 border-blue-gray-400 bg-gray-100 px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#064B80] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
														type="password"
														value={lastPassword}
														onChange={(e) => setLastPassword(e.target.value)}
														placeholder=" "
													/>
													<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-xs leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:leading-[4] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-xs peer-focus:leading-tight peer-focus:text-[#064B80] peer-focus:font-semibold peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#064B80] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#064B80] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
														Contraseña Actual
													</label>
												</div>
												<div className="relative mt-5 w-[352px] h-[41px] rounded">
													<input
														className="peer h-full w-full rounded-[7px] border-2 border-blue-gray-400 bg-gray-100 px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#064B80] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
														type="password"
														value={newPassword}
														onChange={(e) => setNewPassword(e.target.value)}
														placeholder=" "
													/>
													<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-xs leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:leading-[4] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-xs peer-focus:leading-tight peer-focus:text-[#064B80] peer-focus:font-semibold peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#064B80] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#064B80] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
														Contraseña Nueva
													</label>
												</div>
												<div className="relative mt-5 w-[352px] h-[41px] rounded">
													<input
														className={confirmNewPassword != "" && confirmNewPassword === newPassword
															? "peer h-full w-full rounded-[7px] border-2 border-blue-gray-400 bg-gray-100 px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#064B80] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
															: "peer h-full w-full rounded-[7px] border-2 border-red-400 bg-red-100 px-3 py-2 font-sans text-sm font-normal text-red-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-red-200 placeholder-shown:border-t-red-200 focus:border-2 focus:border-red-400 focus:border-t-red focus:outline-0 disabled:border-0 disabled:bg-red-50"
														}
														type="password"
														value={confirmNewPassword}
														onChange={(e) => setConfirmNewPassword(e.target.value)}
														placeholder=" "
													/>
													<label
														className={confirmNewPassword == "" && confirmNewPassword === newPassword
															? "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-xs leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:leading-[4] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-xs peer-focus:leading-tight peer-focus:text-[#064B80] peer-focus:font-semibold peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#064B80] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#064B80] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
															: "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-xs leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:leading-[4] peer-placeholder-shown:text-red-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-xs peer-focus:leading-tight peer-focus:text-red-black peer-focus:font-semibold peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-red-200 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-red-200 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-red-500"
														}
													>
														Repita la nueva contraseña
													</label>
												</div>
											</div>

											<div className="mt-4 flex justify-end">
												<button
													type="button"
													className="mr-4 bg-white tracking-wide text-[#064B80] font-bold rounded border-2 border-[#064B80]  shadow-md py-2 px-5 inline-flex items-center"
													onClick={() => setOpenChangePassword(false)}
												>
													Cancelar
												</button>
												<button
													type="button"
													onClick={() => handleSubmit()}
													className="tracking-wide text-white text-sm font-bold rounded border-b-2 border-[#064B80] bg-[#064B80]  shadow-md py-2 px-5 inline-flex items-center"
												>
													Cambiar
												</button>
											</div>
										</>
									}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition >
		</>
	);
};
export default HeaderDashboard;
