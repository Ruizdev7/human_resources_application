import React, { Children, useMemo } from "react";
import { toast } from "react-toastify";
import { useState, useEffect, Fragment, useRef } from "react";
import { IsotipoPlena, ExcelIcon } from "../../assets/images/SVG";
import axios from "axios";
import { get, useForm } from "react-hook-form";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import { useGetAllFamilyNucleusQuery } from "../../redux_app/services/familyNucleusAPI";
import { Dialog, Transition } from "@headlessui/react";
//import { ExclamationTriangleIcon } from "@heroicons/react/outline";

import { Checkbox } from "../../components/Checkbox";
import { format } from "date-fns";
import { FcPlus, FcUp, FcDown } from "react-icons/fc";
import { RxEyeNone, RxPencil2 } from "react-icons/rx";
import { TiArrowBackOutline } from "react-icons/ti";
import { GlobalFilter } from "../../components/GlobalFilter";

const FamilyNucleus = () => {
	const { data: data_family_nucleus } = useGetAllFamilyNucleusQuery()

	const [open, setOpen] = useState(true);
	const [openModalCheckboxes, setOpenModalCheckboxes] = useState(false);
	const [openModalForms, setOpenModalForms] = useState(false);
	const [countOfChildren, setCountOfChildren] = useState(0);

	const cancelButtonRef = useRef(null);
	const [loadingData, setLoadingData] = useState(true);
	const [dataFamilyNucleus, setDataFamilyNucleus] = useState([]);
	const [dataEmployees, setDataEmployees] = useState([]);
	const [dataTypeID, setDataTypeID] = useState([]);
	const [DataGender, setDataGender] = useState([]);
	const [DataMaritalStatus, setDataMaritalStatus] = useState([]);
	const [DataAgeRange, setDataAgeRange] = useState([]);
	const [DataSchoolingLevel, setDataSchoolingLevel] = useState([]);
	const [UpdateFamilyNucleus, setUpdateFamilyNucleus] = useState(null);
	const [Method, setMethod] = useState("");

	const getFamilyNucleus = async () => {
		try {
			const respTypeID = await axios(
				`${import.meta.env.VITE_API_ADDRESS}type_id`
			);
			for (const TypeID of respTypeID.data.TypeID) {
				dataTypeID.push({
					ccn_type_id: TypeID.ccn_type_id,
					description_type_id: TypeID.description_type_id,
					type_id: TypeID.type_id,
				});
			}

			const respGender = await axios(
				`${import.meta.env.VITE_API_ADDRESS}auto_perceived_gender`
			);
			for (const gender of respGender.data.AutoPerceivedGender) {
				DataGender.push({
					auto_perceived_gender: gender.auto_perceived_gender,
					ccn_auto_perceived_gender: gender.ccn_auto_perceived_gender,
				});
			}
			const respMaritalStatus = await axios(
				`${import.meta.env.VITE_API_ADDRESS}marital_status`
			);
			for (const maritalStatus of respMaritalStatus.data.MaritalStatus) {
				DataMaritalStatus.push({
					ccn_marital_status: maritalStatus.ccn_marital_status,
					marital_status: maritalStatus.marital_status,
				});
			}
			const respAgeRange = await axios(
				`${import.meta.env.VITE_API_ADDRESS}age_range`
			);
			for (const ageRange of respAgeRange.data.AgeRange) {
				DataAgeRange.push({
					ccn_age_range: ageRange.ccn_age_range,
					age_range: ageRange.age_range,
				});
			}
			const respSchoolingLevel = await axios(
				`${import.meta.env.VITE_API_ADDRESS}schooling_level`
			);
			for (const SchoolingLevel of respSchoolingLevel.data
				.SchoolingLevel) {
				DataSchoolingLevel.push({
					ccn_schooling_level: SchoolingLevel.ccn_schooling_level,
					description_schooling_level:
						SchoolingLevel.description_schooling_level,
				});
			}
			const resEmployees = await axios(
				`${import.meta.env.VITE_API_ADDRESS}employee`
			);
			for (const employee of resEmployees.data.Employees) {
				dataEmployees.push({
					ccn_employee: employee.ccn_employee,
					full_name_employee: employee.full_name_employee,
				});
			}
			const resFamilyNucleus = await axios(
				`${import.meta.env.VITE_API_ADDRESS}family_nucleus`
			);
			setDataFamilyNucleus(resFamilyNucleus.data.FamilyNucleus)
		} catch (error) {
			console.log(error);
		}
	};
	if (!dataFamilyNucleus) return <></>;
	useEffect(() => {
		getFamilyNucleus();
	}, []);


	function OpenColumnVisibility() {
		setOpenModalCheckboxes(!openModalCheckboxes);
	}

	const data = dataFamilyNucleus ? dataFamilyNucleus : [];

	const COLUMNS = [
		{
			Header: "CCN",
			Footer: "CCN",
			accessor: "ccn_family_nucleus",
			Cell: (row) => (
				<div style={{ textAlign: "center" }}>{row.value}</div>
			),
		},
		{
			Header: "Empleado",
			Footer: "Empleado",
			accessor: "full_name_employee",

			Cell: (row) => (
				<div style={{ textAlign: "letf" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "Número de hijos",
			Footer: "Número de hijos",
			accessor: "number_of_children",
			Cell: (row) => (
				<div style={{ textAlign: "center" }}>{row.value}</div>
			),
		},
		{
			Header: "Tipo de documento",
			Footer: "Tipo de documento",
			accessor: "type_id",

			Cell: (row) => (
				<div style={{ textAlign: "center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "No. documento",
			Footer: "No. documento",
			accessor: "number_id",
			Cell: (row) => <div style={{ textAlign: "center" }}>{row.value != 0 ? row.value : ""}</div>,
		},
		{
			Header: "Genero",
			Footer: "Genero",
			accessor: "auto_perceived_gender",
			Cell: (row) => (
				<div style={{ textAlign: "center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "Primer nombre",
			Footer: "Primer nombre",
			accessor: "first_name",
			Cell: (row) => (
				<div style={{ textAlign: "center" }}>{row.value}</div>
			),
		},
		{
			Header: "Segundo nombre",
			Footer: "Segundo nombre",
			accessor: "middle_name",
			Cell: (row) => (
				<div style={{ textAlign: "center" }}>{row.value}</div>
			),
		},
		{
			Header: "Primer apellido",
			Footer: "Primer apellido",
			accessor: "first_last_name",
			Cell: (row) => (
				<div style={{ textAlign: "center" }}>{row.value}</div>
			),
		},
		{
			Header: "Segundo apellido",
			Footer: "Segundo apellido",
			accessor: "second_last_name",
			Cell: (row) => (
				<div style={{ textAlign: "center" }}>{row.value}</div>
			),
		},
		{
			Header: "Fecha de cumpleaños",
			Footer: "Fecha de cumpleaños",
			accessor: "date_of_birth",
			Cell: ({ value }) => {
				return (
					<div style={{ textAlign: "center" }}>
						{value != "1111-11-11" ? format(new Date(value), "ddMMMyy") : ""}
					</div>
				);
			},
		},
		{
			Header: "Edad",
			Footer: "Edad",
			accessor: "age",
			Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
		},
		{
			Header: "Rango de edad",
			Footer: "Rango de edad",
			accessor: "age_range",
			Cell: (row) => (
				<div style={{ textAlign: "center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},

		{
			Header: "Nivel de escolaridad",
			Footer: "Nivel de escolaridad",
			accessor: "schooling_level",
			Cell: (row) => (
				<div style={{ textAlign: " center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "Acciones",
			Footer: "Acciones",
			accessor: "",
			row: 0,
			Cell: ({ row }) => {
				return (
					<>
						<div className="flex justify-center">
							<button
								className="text-center"
								onClick={() => {
									setMethod("PUT");
									setOpenModalForms(!openModalForms);
									specificFamilyNucleus(row);
									EditFamilyNucleus();
								}}
							>
								<RxPencil2 className="h-5 w-5" />
							</button>
						</div >
					</>
				);
			},
		},
	];

	const specificFamilyNucleus = async (ccn_family_nucleus) => {
		try {
			const respFamilyNucleus = await axios(
				`${import.meta.env.VITE_API_ADDRESS}family_nucleus/${ccn_family_nucleus.cells[0].value}`
			);
			setUpdateFamilyNucleus(respFamilyNucleus.data.FamilyNucleus);
		} catch (error) { }
	};

	const EditFamilyNucleus = () => {
		try {
			if (!UpdateFamilyNucleus) {
				specificFamilyNucleus();
			}
		} catch (error) {
			console.log(error);
		}
		const [children, setChildren] = useState(1);
		const {
			register,
			handleSubmit,
			reset,
			formState: { errors },
		} = useForm({
			defaultValues: {
				ccn_employee: UpdateFamilyNucleus
					? UpdateFamilyNucleus.ccn_employee
					: 0,
				number_of_children: UpdateFamilyNucleus
					? UpdateFamilyNucleus.number_of_children
					: "",
				ccn_type_id: UpdateFamilyNucleus
					? UpdateFamilyNucleus.ccn_type_id
					: "",
				number_id: UpdateFamilyNucleus
					? UpdateFamilyNucleus.number_id
					: "",
				ccn_auto_perceived_gender: UpdateFamilyNucleus
					? UpdateFamilyNucleus.ccn_auto_perceived_gender
					: "",
				first_name: UpdateFamilyNucleus
					? UpdateFamilyNucleus.first_name
					: "",
				middle_name: UpdateFamilyNucleus
					? UpdateFamilyNucleus.middle_name
					: "",
				first_last_name: UpdateFamilyNucleus
					? UpdateFamilyNucleus.first_last_name
					: "",
				second_last_name: UpdateFamilyNucleus
					? UpdateFamilyNucleus.second_last_name
					: "",
				date_of_birth: UpdateFamilyNucleus
					? UpdateFamilyNucleus.date_of_birth
					: 0,
				age: UpdateFamilyNucleus ? UpdateFamilyNucleus.age : "",
				age_range: UpdateFamilyNucleus
					? UpdateFamilyNucleus.age_range
					: "",
				ccn_schooling_level: UpdateFamilyNucleus
					? UpdateFamilyNucleus.ccn_schooling_level
					: "",
			},
		});

		const onSubmit = async (data) => {
			const body = {
				ccn_employee: data.ccn_employee,
				number_of_children: data.number_of_children,
				ccn_type_id: data.number_of_children != 0 ? data.ccn_type_id : 9,
				number_id: data.number_of_children != 0 ? data.number_id : 0,
				ccn_auto_perceived_gender: data.number_of_children != 0 ? data.ccn_auto_perceived_gender : 4,
				first_name: data.number_of_children != 0 ? data.first_name : "",
				middle_name: data.number_of_children != 0 ? data.middle_name ? data.middle_name : "" : "",
				first_last_name: data.number_of_children != 0 ? data.first_last_name : "",
				second_last_name: data.number_of_children != 0 ? data.second_last_name ? data.second_last_name : "" : "",
				date_of_birth: data.number_of_children != 0 ? data.date_of_birth : "No aplica",
				age: 21,
				age_range: 2,
				ccn_schooling_level: data.number_of_children != 0 ? data.ccn_schooling_level : 12,
			};

			if (Method === "POST") {
				const response = await axios
					.post(`${import.meta.env.VITE_API_ADDRESS}family_nucleus`, body, {
						header: { "Access-Control-Allow-Origin": "*" },
					})
					.then((response) => {
						console.log(response);
						reset({
							ccn_type_id: "",
							number_id: "",
							ccn_auto_perceived_gender: "",
							first_name: "",
							middle_name: "",
							first_last_name: "",
							second_last_name: "",
							date_of_birth: "",
							age: "",
							age_range: "",
							ccn_schooling_level: "",
						});
						setChildren(children + 1)

						toast.success(`Los datos del hijo numero ${children} se agregaron correctamente`, {
							position: "bottom-right",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: false,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "light",
						});
						if (parseInt(data.number_of_children) === 0 || children === parseInt(data.number_of_children)) {
							window.location.href = window.location.href
						}
					})
					.catch((error) => {
						console.log(error);
					});
			} else if (Method === "PUT") {
				const response = await axios
					.put(
						`${import.meta.env.VITE_API_ADDRESS}family_nucleus/${UpdateFamilyNucleus.ccn_family_nucleus}`,
						body,
						{ header: { "Access-Control-Allow-Origin": "*" } }
					)
					.then((response) => {
						console.log(response);
						window.location.href = window.location.href;
					})
					.catch((error) => {
						console.log(error);
					});
			}
		};
		return (
			<>
				<Transition.Root show={openModalForms} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-10"
						onClose={setOpenModalForms}
					>
						<Transition.Child
							as={Fragment}
							enter="ease-in-out duration-500"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in-out duration-500"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
						</Transition.Child>

						<div className="fixed inset-0 uppercase overflow-hidden">
							<div className="absolute inset-0 overflow-hidden">
								<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
									<Transition.Child
										as={Fragment}
										enter="transform transition ease-in-out duration-500 sm:duration-700"
										enterFrom="translate-x-full"
										enterTo="translate-x-0"
										leave="transform transition ease-in-out duration-500 sm:duration-700"
										leaveFrom="translate-x-0"
										leaveTo="translate-x-full"
									>
										<Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
											<Transition.Child
												as={Fragment}
												enter="ease-in-out duration-500"
												enterFrom="opacity-0"
												enterTo="opacity-100"
												leave="ease-in-out duration-500"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
													<button
														type="button"
														className="rounded-md text-gray-300"
														onClick={() =>
															setOpenModalForms(
																false
															)
														}
													>
														<span className="sr-only">
															Close panel
														</span>
														<p>X</p>
													</button>
												</div>
											</Transition.Child>
											<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
												<div className="px-4 sm:px-6">
													<Dialog.Title className="text-lg text-sky-900 font-bold uppercase">
														Datos de Núcleo Familiar
													</Dialog.Title>
												</div>
												<div className="relative mt-6 flex-1 px-4 sm:px-6">
													{/* Replace with your content */}
													<div className="absolute inset-0 px-4 sm:px-6">
														<div className="mt-2">
															<p className="font-bold text-orange-700 text-center animate-bounce">Hijo numero {children}</p>
															<form
																form
																onSubmit={handleSubmit(
																	onSubmit
																)}
															>
																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		EMPLEADO
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_employee
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"ccn_employee",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataEmployees.map(
																			(
																				employee
																			) => {
																				return (
																					<option
																						key={
																							employee.ccn_employee
																						}
																						value={
																							employee.ccn_employee
																						}
																					>
																						{
																							employee.full_name_employee
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>



																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		NUMERO
																		DE HIJOS
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.number_of_children
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<input
																		type="number"
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"number_of_children",
																			{
																				required: true,
																			}
																		)}
																	/>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		TIPO DE
																		DOCUMENTO
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_type_id
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"ccn_type_id",
																			{
																				required: false,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataTypeID.map(
																			(
																				employee
																			) => {
																				return (
																					<option
																						key={
																							employee.ccn_type_id
																						}
																						value={
																							employee.ccn_type_id
																						}
																					>
																						{
																							employee.description_type_id
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		NUMERO
																		DE
																		DOCUMENTO
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.number_id
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<input
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		type="number"
																		{...register(
																			"number_id",
																			{
																				required: false,
																			}
																		)}
																	/>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		GENERO
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_auto_perceived_gender
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"ccn_auto_perceived_gender",
																			{
																				required: false,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{DataGender.map(
																			(
																				autoPerceivedGender
																			) => {
																				return (
																					<option
																						key={
																							autoPerceivedGender.ccn_auto_perceived_gender
																						}
																						value={
																							autoPerceivedGender.ccn_auto_perceived_gender
																						}
																					>
																						{
																							autoPerceivedGender.auto_perceived_gender
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		PRIMER
																		NOMBRE
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.first_name
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<input
																		type="text"
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"first_name",
																			{
																				required: false,
																			}
																		)}
																	/>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		SEGUNDO
																		NOMBRE
																	</label>
																	<input
																		type="text"
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"middle_name",
																			{
																				required: false,
																			}
																		)}
																	/>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		PRIMER
																		APELLIDO
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.first_last_name
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<input
																		type="text"
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"first_last_name",
																			{
																				required: false,
																			}
																		)}
																	/>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		SEGUNDO
																		APELLIDO
																	</label>
																	<input
																		type="text"
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"second_last_name",
																			{
																				required: false,
																			}
																		)}
																	/>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		FECHA DE
																		NACIMIENTO
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.date_of_birth
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<input
																		type="date"
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"date_of_birth",
																			{
																				required: false,
																			}
																		)}
																	/>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		NIVEL DE
																		ESCOLARIDAD
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_schooling_level
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"ccn_schooling_level",
																			{
																				required: false,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{DataSchoolingLevel.map(
																			(
																				schoolingLevel
																			) => {
																				return (
																					<option
																						key={
																							schoolingLevel.ccn_schooling_level
																						}
																						value={
																							schoolingLevel.ccn_schooling_level
																						}
																					>
																						{
																							schoolingLevel.description_schooling_level
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>

																<div className="bg-gray-50 px-4 py-3 sm:flex  sm:px-6">
																	<button
																		type="button"
																		className="mr-4 bg-white tracking-wide text-gray-900 text-sm font-bold rounded border-b-2 border-sky-900 hover:border-sky-900 hover:bg-sky-900 hover:text-white shadow-md py-2 px-5 inline-flex items-center"
																		onClick={() =>
																			setOpenModalForms(
																				!openModalForms
																			)
																		}
																	>
																		CERRAR
																	</button>
																	<input
																		value={UpdateFamilyNucleus ? "ACTUALIZAR" : "CREAR"}
																		type="submit"
																		className="bg-white tracking-wide text-gray-900 text-sm font-bold rounded border-b-2 border-[#007367] hover:border-[#007367] hover:bg-[#007367] hover:text-white shadow-md py-2 px-5 inline-flex items-center"
																	/>
																</div>
															</form>
														</div>
													</div>
													{/* /End replace */}
												</div>
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</div>
						</div>
					</Dialog>
				</Transition.Root>
			</>
		);
	};

	const columns = useMemo(() => COLUMNS, []);
	// const data = useMemo(() => Employees, []);

	const tableInstance = useTable({
		columns,
		data,
	});

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		gotoPage,
		pageCount,
		setPageSize,
		rows,
		prepareRow,
		allColumns,
		getToggleHideAllColumnsProps,
		state,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	)
	const { globalFilter, pageIndex, pageSize } = state;

	return (
		<>
			{dataFamilyNucleus != 0 ?
				<div className="container mx-auto uppercase px-2 py-2 bg-white shadow-md shadow-emerald-900">
					<div className="container mx-auto">
						<div className="flex">
							<h3 className="py-2 text-2xl text-slate-900 uppercase font-extrabold">
								Datos del Núcleo Familiar
							</h3>
							<button
								className=""
								onClick={() => {
									setMethod("POST");
									setUpdateFamilyNucleus();
									setOpenModalForms(!openModalForms);
								}}
							>
								<FcPlus className="w-10 h-10" />
							</button>
						</div>
						<div className="w-full flex justify-end">
							<a href={`${import.meta.env.VITE_API_ADDRESS}generate-family-nucleus-excel-data`} className=""><ExcelIcon /></a>
						</div>

						<div className="container mx-auto">
							<div className="mb-5 overflow-auto shadow">
								<table className="table-auto w-full" {...getTableProps()}>
									<thead className="bg-gray-200 border-b-2 border-gray-200 uppercase">
										{headerGroups.map((headerGroup) => (
											<tr
												className=""
												{...headerGroup.getHeaderGroupProps()}
											>
												{headerGroup.headers.map(
													(column) => (
														<th
															scope="col"
															className="p-3 text-sm font-bold tracking-wide text-center"
															{...column.getHeaderProps(
																column.getSortByToggleProps()
															)}
														>
															{column.render(
																"Header"
															)}
															<span className="">
																{column.isSorted ? (
																	column.isSortedDesc ? (
																		<FcDown className="w-[80px]" />
																	) : (
																		<FcUp className="w-[80px]" />
																	)
																) : (
																	""
																)}
															</span>
														</th>
													)
												)}
											</tr>
										))}
									</thead>
									<tbody
										className="divide-y divide-gray-100"
										{...getTableBodyProps()}
									>
										{page.map((row) => {
											prepareRow(row);
											return (
												<tr
													className="hover:bg-slate-100 hover:font-extrabold"
													{...row.getRowProps()}
												>
													{row.cells.map((cell) => {
														return (
															<td
																className="p-0.5 whitespace-nowrap text-sm text-gray-700"
																{...cell.getCellProps()}
															>
																{cell.render(
																	"Cell"
																)}
															</td>
														);
													})}
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>

							<div className="container mx-auto">
								<div className="flex flex-wrap justify-between gap-2">
									<div className="">
										<div className="">
											<GlobalFilter
												filter={globalFilter}
												setFilter={setGlobalFilter}
											/>
										</div>
									</div>
									<div className="">
										<nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
											<button
												onClick={() => gotoPage(0)}
												disabled={!canPreviousPage}
												className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium hover:bg-sky-900 hover:text-white focus:z-20"
											>
												<svg
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
													aria-hidden="true"
												>
													<path d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" />
												</svg>
											</button>
											<button
												onClick={() => previousPage()}
												disabled={!canPreviousPage}
												className="relative inline-flex items-center border border-gray-300 bg-white px-2 text-sm font-medium hover:bg-sky-900 hover:text-white focus:z-20"
											>
												<span className="">Anterior</span>
											</button>
											<button
												onClick={() => nextPage()}
												disabled={!canNextPage}
												className="relative inline-flex items-center border border-gray-300 bg-white px-2 text-sm font-medium hover:bg-sky-900 hover:text-white focus:z-20"
											>
												<span className="">
													{" "}
													Siguiente{" "}
												</span>
											</button>
											<button
												onClick={() =>
													gotoPage(pageCount - 1)
												}
												disabled={!canNextPage}
												className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium hover:bg-sky-900 hover:text-white focus:z-20"
											>
												<svg
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
													aria-hidden="true"
												>
													<path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
												</svg>
											</button>
										</nav>
									</div>
									<div className="">
										<div className="isolate inline-flex -space-x-px rounded-md shadow-sm">
											<button
												type="button"
												className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-900 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
												onClick={() =>
													setOpenModalCheckboxes(true)
												}
											>
												<RxEyeNone className="w-[20px] h-[20px]" />
											</button>
										</div>
									</div>
									<div className="">
										<div className="isolate inline-flex -space-x-px rounded-md shadow-sm">
											<div
												className="sm:w-[80px] md:w-[100px]"
												onChange={(e) =>
													setPageSize(
														Number(e.target.value)
													)
												}
												value={pageSize}
											>
												{" "}
												<select className="block w-15 px-2 py-2 rounded-md border border-gray-300 bg-gray-100 focus:border-2 focus:border-sky-900 focus:outline-0 disabled:border-0 sm:text-base">
													{[5, 10, 25, 50, 100, 200].map(
														(pageSize) => (
															<option
																className="text-sm"
																key={pageSize}
																value={pageSize}
															>
																{pageSize}
															</option>
														)
													)}
												</select>
											</div>
										</div>
									</div>
									<div className="">
										<div className="text-start">
											<p className="text-sm text-gray-900">
												<span className="">
													Pagina{" "}
													<span className="font-bold text-xs text-sky-900">
														{pageIndex + 1} de{" "}
														{pageOptions.length}
													</span>{" "}
												</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<Transition.Root show={openModalCheckboxes} as={Fragment}>
						<Dialog
							as="div"
							className="relative z-50"
							initialFocus={cancelButtonRef}
							onClose={setOpenModalForms}
						>
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" />
							</Transition.Child>

							<div className="fixed inset-0 z-10 overflow-y-auto">
								<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
									<Transition.Child
										as={Fragment}
										enter="ease-out duration-300"
										enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
										enterTo="opacity-100 translate-y-0 sm:scale-100"
										leave="ease-in duration-200"
										leaveFrom="opacity-100 translate-y-0 sm:scale-100"
										leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
									>
										<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-[full] sm:max-w-lg">
											<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
												<div className="sm:flex sm:items-start">
													<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
														<Dialog.Title
															as="h3"
															className="uppercase text-center font-extrabold"
														>
															<span className="text-xs">
																OCULTAR | MOSTRAR
															</span>
															<div>COLUMNAS</div>
														</Dialog.Title>
														<div className="mt-1">
															<div className="overflow-hidden">
																<div className="">
																	<Checkbox
																		{...getToggleHideAllColumnsProps}
																	/>
																</div>
																{allColumns.map(
																	(column) => (
																		<div
																			className="text-sm"
																			key={
																				column.id
																			}
																		>
																			<label>
																				<input
																					className=""
																					type="checkbox"
																					{...column.getToggleHiddenProps()}
																				/>
																				{
																					column.Header
																				}
																			</label>
																		</div>
																	)
																)}
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
												<button
													type="button"
													className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-900 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
													onClick={() =>
														setOpenModalCheckboxes(
															false
														)
													}
												>
													<TiArrowBackOutline className="w-[20px] h-[20px]" />
												</button>
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</div>
						</Dialog>
					</Transition.Root>
					<EditFamilyNucleus />
				</div> :
				<div className="h-[100%] container mx-auto flex items-center">
					<IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
				</div>}
		</>
	);
};

export default FamilyNucleus;
