import React, { useMemo } from "react";
import { useState, useEffect, Fragment, useRef } from "react";
import { useAddNewUserMutation, useUpdateEmployeeCredentialsMutation } from "../../redux_app/services/auth/authentication";

import axios from "axios";
import { get, useForm } from "react-hook-form";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
//import { ExclamationTriangleIcon } from "@heroicons/react/outline";
import { FcPlus, FcUp, FcDown } from "react-icons/fc";
import { RxEyeNone, RxPencil2 } from "react-icons/rx";
import { TiArrowBackOutline } from "react-icons/ti";

import { Checkbox } from "../../components/Checkbox";
import { format, startOfDay } from "date-fns";
import { ExcelIcon } from "../../assets/images/SVG";
import { GlobalFilter } from "../../components/GlobalFilter";
import { Link } from "react-router-dom";

const BasicDataEmployee = () => {
	const [open, setOpen] = useState(true);
	const [openModalCheckboxes, setOpenModalCheckboxes] = useState(false);
	const [openModalForms, setOpenModalForms] = useState(false);
	const cancelButtonRef = useRef(null);
	const [loadingData, setLoadingData] = useState(true);
	const [dataEmployees, setDataEmployees] = useState([]);
	const [dataTypeID, setDataTypeID] = useState([]);
	const [DataGender, setDataGender] = useState([]);
	const [DataRH, setDataRH] = useState([]);
	const [DataAgeRange, setDataAgeRange] = useState([]);
	const [DataMaritalStatus, setDataMaritalStatus] = useState([]);
	const [Method, setMethod] = useState("");
	const [Image, setImage] = useState("");
	const [CreateUserIAP, { data: data_create_user, isSuccess, isLoading, error: error_create_new_user }] =
		useAddNewUserMutation();

	const [UpdateUserIAP, { data: data_update_user, isSuccess: is_success_update_user, isLoading: is_loading_update_user, error: error_update_user }] =
		useUpdateEmployeeCredentialsMutation();

	const [selectedFile, setSelectedFile] = useState(null);
	const [imageToUpdate, setImageToUpdate] = useState(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setSelectedFile(file);
	};
	const getEmployees = async () => {
		try {
			const respTypeID = await axios(
				`${import.meta.env.VITE_API_ADDRESS}type_id`
			);
			for (const type_id of respTypeID.data.TypeID) {
				dataTypeID.push({
					ccn_type_id: type_id.ccn_type_id,
					description_type_id: type_id.description_type_id,
					type_id: type_id.type_id,
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
			const respRH = await axios(`${import.meta.env.VITE_API_ADDRESS}rh`);
			for (const RH of respRH.data.RH) {
				DataRH.push({
					ccn_rh: RH.ccn_rh,
					rh: RH.rh,
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
			const resEmployees = await axios(
				`${import.meta.env.VITE_API_ADDRESS}employee`
			);
			setDataEmployees(resEmployees.data.Employees);
		} catch (error) {
			console.log(error);
		}
	};

	if (!dataEmployees) return <></>;
	useEffect(() => {
		getEmployees();
	}, []);

	function OpenColumnVisibility() {
		setOpenModalCheckboxes(!openModalCheckboxes);
	}

	const data = dataEmployees;

	const COLUMNS = [
		{
			Header: "CCN",
			Footer: "CCN",
			accessor: "ccn_employee",
			Cell: (row) => <div className="text-center">{row.value}</div>,
		},
		{
			Header: "ID",
			Footer: "ID",
			accessor: "ccn_type_id",
			Cell: (row) => (
				<div className="text-center">
					<p>
						{dataTypeID.length != 0
							? dataTypeID.find(
								(employee) =>
									employee.ccn_type_id === row.value
							).type_id
							: row.value}
					</p>
				</div>
			),
		},
		{
			Header: "DOCUMENTO",
			Footer: "DOCUMENTO",
			accessor: "number_id_employee",
			Cell: (row) => (
				<div className="pr-2 text-end font-extrabold text-blue-600 hover:underline">
					{row.value}
				</div>
			),
		},
		{
			Header: "NOMBRE COMPLETO",
			Footer: "NOMBRE COMPLETO",
			accessor: "full_name_employee",
			Cell: (row) => <div className="w-72">{row.value}</div>,
		},
		{
			Header: "FECHA DE NACIMIENTO",
			Footer: "FECHA DE NACIMIENTO",
			accessor: "date_birth_employee",
			Cell: ({ value }) => {
				return (
					<div style={{ textAlign: "center" }}>
						{format(new Date(value), "ddMMMyy")}
					</div>
				);
			},
		},
		{
			Header: "EDAD",
			Footer: "EDAD",
			accessor: "age",
			Cell: (row) => (
				<div style={{ textAlign: "center" }}>{row.value}</div>
			),
		},
		{
			Header: "RANGO DE EDAD",
			Footer: "RANGO DE EDAD",
			accessor: "age_range",
			Cell: (row) => (
				<div style={{ textAlign: "center" }}>
					<span>
						{DataAgeRange.length != 0
							? DataAgeRange.find(
								(employee) =>
									employee.ccn_age_range === row.value
							).age_range
							: row.value}
					</span>
				</div>
			),
		},
		{
			Header: "GÉNERO",
			Footer: "GÉNERO",
			accessor: "auto_perceived_gender",
			Cell: (row) => (
				<div className="p-1.5 text-xs font-bold uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
					<p>
						{DataGender.length != 0
							? DataGender.find(
								(employee) =>
									employee.ccn_auto_perceived_gender ===
									row.value
							).auto_perceived_gender
							: row.value}
					</p>
				</div>
			),
		},
		{
			Header: "RH",
			Footer: "RH",
			accessor: "rh",
			Cell: (row) => (
				<div style={{ textAlign: "center" }}>
					<p>
						{DataRH.length != 0
							? DataRH.find(
								(employee) => employee.ccn_rh === row.value
							).rh
							: row.value}
					</p>
				</div>
			),
		},
		{
			Header: "CORREO ELECTRÓNICO PERSONAL",
			Footer: "CORREO ELECTRÓNICO PERSONAL",
			accessor: "employee_personal_email",
			Cell: (row) => <div style={{ textAlign: "left" }}>{row.value}</div>,
		},
		{
			Header: "TELÉFONO PERSONAL",
			Footer: "TELÉFONO PERSONAL",
			accessor: "employee_personal_cellphone",
			Cell: (row) => (
				<div style={{ textAlign: "right" }}>{row.value}</div>
			),
		},
		{
			Header: "ESTADO CIVIL",
			Footer: "ESTADO CIVIL",
			accessor: "ccn_marital_status",
			Cell: (row) => (
				<div className="p-1.5 text-xs font-bold uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
					<p>
						{DataMaritalStatus.length != 0
							? DataMaritalStatus.find(
								(employee) =>
									employee.ccn_marital_status ===
									row.value
							).marital_status
							: row.value}
					</p>
				</div>
			),
		},

		{
			Header: "EDITAR",
			accessor: "",
			row: 0,
			Cell: ({ row }) => {
				return (
					<>
						<div className="flexjustify-center">
							<button
								className="text-center"
								onClick={() => {
									setMethod("PUT");
									setImageToUpdate("");
									setOpenModalForms(true);
									specificEmployee(row);
									EditEmployee();
								}}
							>
								<RxPencil2 className="h-5 w-5" />
							</button>
						</div>
					</>
				);
			},
		},
		{
			Header: "HV",
			Footer: "HV",
			accessor: "",
			row: 0,
			Cell: ({ row }) => {
				return (
					<Link
						className="text-orange-500"
						to={`/cv-employees/${row.allCells[0].value}`}
					>
						Hoja de Vida
					</Link>
				);
			},
		},
	];
	const [UpdateEmployee, setUpdateEmployee] = useState({});

	const EditEmployee = () => {
		try {
			if (!UpdateEmployee) {
				specificEmployee();
			}
		} catch (error) {
			console.log(error);
		}

		const {
			register,
			handleSubmit,
			formState: { errors },
		} = useForm({
			defaultValues: {
				auto_perceived_gender: UpdateEmployee
					? UpdateEmployee.auto_perceived_gender
					: 0,
				ccn_type_id: UpdateEmployee ? UpdateEmployee.ccn_type_id : 0,
				date_birth_employee: UpdateEmployee
					? UpdateEmployee.date_birth_employee
					: "",
				ccn_marital_status: UpdateEmployee
					? UpdateEmployee.ccn_marital_status
					: 0,
				employee_personal_cellphone: UpdateEmployee
					? UpdateEmployee.employee_personal_cellphone
					: "",
				employee_personal_email: UpdateEmployee
					? UpdateEmployee.employee_personal_email
					: "",
				first_last_name_employee: UpdateEmployee
					? UpdateEmployee.first_last_name_employee
					: "",
				first_name_employee: UpdateEmployee
					? UpdateEmployee.first_name_employee
					: "",
				middle_name_employee: UpdateEmployee
					? UpdateEmployee.middle_name_employee
					: "",
				number_id_employee: UpdateEmployee
					? UpdateEmployee.number_id_employee
					: "",
				rh: UpdateEmployee ? UpdateEmployee.rh : 0,
				second_last_name_employee: UpdateEmployee
					? UpdateEmployee.second_last_name_employee
					: "",
				employee_password: UpdateEmployee
					? UpdateEmployee.employee_password
					: "",
			},
		});

		const onSubmit = async (data) => {
			const formData = new FormData();

			formData.append("image", selectedFile);
			formData.append("age", data.age);
			formData.append("age_range", data.age_range);
			formData.append("ccn_marital_status", data.ccn_marital_status);
			formData.append(
				"auto_perceived_gender",
				data.auto_perceived_gender
			);
			const ccn_employee = data.ccn_employee
			formData.append("ccn_employee", data.ccn_employee);
			formData.append("ccn_type_id", data.ccn_type_id);
			formData.append("date_birth_employee", data.date_birth_employee);
			formData.append(
				"employee_personal_cellphone",
				data.employee_personal_cellphone
			);
			formData.append(
				"employee_personal_email",
				data.employee_personal_email
			);
			formData.append(
				"first_last_name_employee",
				data.first_last_name_employee
			);
			formData.append("first_name_employee", data.first_name_employee);
			formData.append(
				"full_name_employee",
				`${data.first_name_employee} ${data.middle_name_employee} ${data.first_last_name_employee} ${data.second_last_name_employee}`
			);
			formData.append(
				"informed_consent_law_1581",
				data.informed_consent_law_1581
			);
			formData.append(
				"last_message_read_time",
				data.last_message_read_time
			);
			formData.append("middle_name_employee", data.middle_name_employee);
			formData.append("number_id_employee", data.number_id_employee);
			formData.append("rh", data.rh);
			formData.append(
				"second_last_name_employee",
				data.second_last_name_employee
			);
			formData.append(
				"informed_consent_law_1581",
				data.informed_consent_law_1581
			);
			formData.append("employee_password", data.employee_password);

			const response = await axios
				.put(
					`${import.meta.env.VITE_API_ADDRESS}employee/${UpdateEmployee.ccn_employee
					}`,
					formData,
					{ header: { "Access-Control-Allow-Origin": "*" } }
				)
				.then((response) => {
					console.log(response.data["Employee Updated"].ccn_employee);

					UpdateUserIAP({
						"ccn_employee": response.data["Employee Updated"].ccn_employee,
						"full_name_employee": `${data.first_name_employee} ${data.middle_name_employee} ${data.first_last_name_employee} ${data.second_last_name_employee}`,
						"number_id_employee": data.number_id_employee,
						"employee_password": data.employee_password ? data.employee_password : "not_change",
					})
					//window.location.href = window.location.href;
				})
				.catch((error) => {
					console.log(error);
				});
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
													<Dialog.Title className="text-lg font-bold text-sky-900">
														Datos Básicos
													</Dialog.Title>
												</div>
												<div className="relative mt-6 flex-1 px-4 sm:px-6">
													{/* Replace with your content */}
													<div className="absolute inset-0 px-4 sm:px-6">
														<div className="mt-2">
															<form
																form
																onSubmit={handleSubmit(
																	onSubmit
																)}
																className="overflow-y-scroll h-[80vh]"
															>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<input
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		{...register(
																			"number_id_employee",
																			{
																				required: true,
																			}
																		)}

																	/>
																	<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
																		# DE
																		DOCUMENTO
																	</label>
																</div>
																{errors
																	.number_id_employee
																	?.type ===
																	"required" && (
																		<p>
																			Este
																			campo
																			es
																			necesario
																		</p>
																	)}

																<div className="col-span-6 mt-[25px] sm:col-span-3">
																	<label
																		htmlFor="country"
																		className="block text-sm font-medium text-gray-700"
																	>
																		TIPO DE
																		DOCUMENTO
																	</label>
																	<select

																		{...register(
																			"ccn_type_id",
																			{
																				required: true,
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

																	{errors
																		.ccn_type_id
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

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">

																	<input
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"first_name_employee",
																			{
																				required: true,
																			}
																		)}
																	/>
																	<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
																		PRIMER
																		NOMBRE
																	</label>
																	{errors
																		.first_name_employee
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

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<input
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"middle_name_employee",
																			{
																				required: true,
																			}
																		)}
																	/>
																	<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
																		SEGUNDO
																		NOMBRE
																	</label>
																	{errors
																		.middle_name_employee
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

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<input
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"first_last_name_employee",
																			{
																				required: true,
																			}
																		)}
																	/>
																	<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
																		PRIMER
																		APELLIDO
																	</label>
																	{errors
																		.first_last_name_employee
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

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<input
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"second_last_name_employee",
																			{
																				required: true,
																			}
																		)}
																	/>
																	<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
																		SEGUNDO
																		APELLIDO
																	</label>
																	{errors
																		.second_last_name_employee
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

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<input
																		type="date"
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"date_birth_employee",
																			{
																				required: true,
																			}
																		)}
																	/>
																	<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
																		FECHA DE
																		NACIMIENTO
																	</label>
																	{errors
																		.date_birth_employee
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

																<div className="col-span-6 mt-[25px] sm:col-span-3">
																	<label className="block text-sm font-medium text-gray-700">
																		RH
																	</label>
																	<select
																		{...register(
																			"rh",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{DataRH.map(
																			(
																				rh
																			) => {
																				return (
																					<option
																						key={
																							rh.ccn_rh
																						}
																						value={
																							rh.ccn_rh
																						}
																					>
																						{
																							rh.rh
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																	{errors.rh
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
																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
																		ESTADO
																		CIVIL
																	</label>
																	<select
																		{...register(
																			"ccn_marital_status",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{DataMaritalStatus.map(
																			(
																				martialStatus
																			) => {
																				return (
																					<option
																						key={
																							martialStatus.ccn_marital_status
																						}
																						value={
																							martialStatus.ccn_marital_status
																						}
																					>
																						{
																							martialStatus.marital_status
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																	{errors
																		.ccn_marital_status
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
																<div className="col-span-6 mt-[25px] sm:col-span-3">
																	<label className="block text-sm font-medium text-gray-700">
																		GENERO
																	</label>
																	<select
																		{...register(
																			"auto_perceived_gender",
																			{
																				required: true,
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
																	{errors
																		.auto_perceived_gender
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

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<input
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"employee_personal_email",
																			{
																				required: true,
																			}
																		)}
																	/>
																	<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
																		CORREO
																		PERSONAL
																	</label>
																	{errors
																		.employee_personal_email
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

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<input
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"employee_personal_cellphone",
																			{
																				required: true,
																			}
																		)}
																	/>
																	<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
																		TELEFONO
																		PERSONAL
																	</label>
																	{errors
																		.employee_personal_cellphone
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



																<div className="flex items-center justify-center mt-4">
																	{imageToUpdate
																		?
																		<div className="h-[100px] w-[100px] mx-2 rounded-lg overflow-hidden">
																			<img src={imageToUpdate} alt="Imagen de usuario" className="h-full w-full object-cover" />
																		</div>
																		:
																		null
																	}
																	<label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
																		<svg
																			className="w-8 h-8"
																			fill="currentColor"
																			xmlns="http://www.w3.org/2000/svg"
																			viewBox="0 0 20 20"
																		>
																			<path
																				fillRule="evenodd"
																				d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H3zm0 2h14v8H3V6zm7 7a1 1 0 100-2 1 1 0 000 2z"
																				clipRule="evenodd"
																			/>
																		</svg>
																		{selectedFile || UpdateEmployee ? (
																			<span className="mt-2 text-sm">{UpdateEmployee ? UpdateEmployee.image : selectedFile.name}</span>
																		) : (
																			<span className="mt-2 text-base leading-normal">Selecciona un archivo</span>
																		)}

																		<input
																			id="file-upload"
																			name="file-upload"
																			type="file"
																			className="hidden"
																			{...register(
																				"image",
																				{
																					required: false,
																				}
																			)}
																			onChange={handleFileChange}
																		/>
																	</label>
																</div>
																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<input
																		type="password"
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"employee_password",
																			{
																				required: false,
																			}
																		)}
																	/>
																	<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
																		CONTRASEÑA
																	</label>
																	{errors
																		.employee_password
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

																<div className="grid grid-cols-2">
																	<div className="m-3 flex">
																		<button
																			type="button"
																			className="mr-4 bg-white tracking-wide text-gray-900 text-sm font-bold rounded border-b-2 border-sky-900 hover:border-sky-900 hover:bg-sky-900 hover:text-white shadow-md py-2 px-5 inline-flex items-center"
																			onClick={() =>
																				setIsOpen(!isOpen)
																			}
																		>
																			CERRAR
																		</button>
																		<input
																			value={
																				UpdateEmployee
																					? "ACTUALIZAR"
																					: "CREAR"
																			}
																			type="submit"
																			className="bg-white tracking-wide text-gray-900 text-sm font-bold rounded border-b-2 border-[#007367] hover:border-[#007367] hover:bg-[#007367] hover:text-white shadow-md py-2 px-5 inline-flex items-center"
																		/>
																	</div>
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


	const specificEmployee = async (ccn_employee) => {
		try {
			const EmployeeData = await axios(
				`${import.meta.env.VITE_API_ADDRESS}employee/${ccn_employee.cells[0].value}`
			);
			setUpdateEmployee({
				age: EmployeeData.data.Employee.age,
				age_range: EmployeeData.data.Employee.age_range,
				auto_perceived_gender: EmployeeData.data.Employee.auto_perceived_gender,
				ccn_employee: EmployeeData.data.Employee.ccn_employee,
				ccn_type_id: EmployeeData.data.Employee.ccn_type_id,
				date_birth_employee: EmployeeData.data.Employee.date_birth_employee,
				employee_personal_cellphone: EmployeeData.data.Employee.employee_personal_cellphone,
				employee_personal_email: EmployeeData.data.Employee.employee_personal_email,
				first_last_name_employee: EmployeeData.data.Employee.first_last_name_employee,
				first_name_employee: EmployeeData.data.Employee.first_name_employee,
				full_name_employee: EmployeeData.data.Employee.full_name_employee,
				image: EmployeeData.data.Employee.image,
				informed_consent_law_1581: EmployeeData.data.Employee.informed_consent_law_1581,
				last_message_read_time: EmployeeData.data.Employee.last_message_read_time,
				middle_name_employee: EmployeeData.data.Employee.middle_name_employee,
				number_id_employee: EmployeeData.data.Employee.number_id_employee,
				rh: EmployeeData.data.Employee.rh,
				ccn_marital_status: EmployeeData.data.Employee.ccn_marital_status,
				second_last_name_employee: EmployeeData.data.Employee.second_last_name_employee,
			});

			const respImage = await axios(
				`${import.meta.env.VITE_API_ADDRESS}employee/images/${EmployeeData.data.Employee.ccn_employee}`
			);
			setImageToUpdate(`data:image/jpeg;base64,${respImage.data.image_b64}`);

			setImage(
				`../../../assets/images/${EmployeeData.data.Employee.image}`
			);
		} catch (error) { }
	};

	const onSubmit = async (data) => {

		const formData = new FormData();

		formData.append("image", selectedFile);
		formData.append("age", data.age);
		formData.append("age_range", data.age_range);
		formData.append("ccn_marital_status", data.ccn_marital_status);

		formData.append(
			"auto_perceived_gender",
			data.auto_perceived_gender
		);
		formData.append("ccn_employee", data.ccn_employee);
		formData.append("ccn_type_id", data.ccn_type_id);
		formData.append("date_birth_employee", data.date_birth_employee);
		formData.append(
			"employee_personal_cellphone",
			data.employee_personal_cellphone
		);
		formData.append(
			"employee_personal_email",
			data.employee_personal_email ? data.employee_personal_email : ""
		);
		formData.append(
			"first_last_name_employee",
			data.first_last_name_employee
		);
		formData.append("first_name_employee", data.first_name_employee);
		formData.append(
			"full_name_employee",
			`${data.first_name_employee} ${data.middle_name_employee} ${data.first_last_name_employee} ${data.second_last_name_employee}`
		);
		formData.append(
			"informed_consent_law_1581",
			data.informed_consent_law_1581
		);
		formData.append(
			"last_message_read_time",
			data.last_message_read_time
		);
		formData.append("middle_name_employee", data.middle_name_employee ? data.middle_name_employee : "");
		formData.append("number_id_employee", data.number_id_employee);
		formData.append("rh", data.rh);
		formData.append(
			"second_last_name_employee",
			data.second_last_name_employee ? data.second_last_name_employee : ""
		);
		formData.append(
			"informed_consent_law_1581",
			data.informed_consent_law_1581
		);
		formData.append("employee_password", data.employee_password);



		if (Method === "POST") {
			const response = await axios
				.post(
					`${import.meta.env.VITE_API_ADDRESS}employee`,
					formData,
					{
						header: { "Access-Control-Allow-Origin": "*" },
					}
				)
				.then((response) => {
					CreateUserIAP({
						"ccn_employee": response.data.Employees.ccn_employee,
						"number_id_employee": data.number_id_employee,
						"full_name_employee": `${data.first_name_employee} ${data.middle_name_employee} ${data.first_last_name_employee} ${data.second_last_name_employee}`,
						"informed_consent_law_1581": 0,
						"employee_password": data.employee_password,
					});
				})
				.catch((error) => {
					toast.error(`${error ? error.response.data.DuplicateError : ""}, verifique el numero de documento o la lista de empleados nuevamente`, {
						position: "bottom-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					})

				});
		} else if (Method === "PUT") {
			const response = await axios
				.put(
					`${import.meta.env.VITE_API_ADDRESS}employee/${UpdateEmployee.ccn_employee
					}`,
					formData,
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
	const columns = useMemo(() => COLUMNS, []);

	let [isOpen, setIsOpen] = useState(!true)

	useEffect(() => {
		if (isSuccess) {
			toast.success("Usuario creado correctamente!", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			})
			window.location = window.location.href;
		} else if (error_create_new_user) {
			toast.error(`El usuario fue registrado en HHRR App pero no el servicio de autenticacion, por favor notifique al departamento de IT , por favor recargue la pagina para ver al nuevo empleado.`, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			})
		}
		else if (is_success_update_user) {
			toast.success(`El usuario fue actualizado correctamente!`, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			})
			window.location = window.location.href;
		}


	}, [isSuccess, error_create_new_user, is_success_update_user])

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
		resetResizing,
	} = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const { globalFilter, pageIndex, pageSize, useResizeColumns } = state;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			auto_perceived_gender: UpdateEmployee
				? UpdateEmployee.auto_perceived_gender
				: 0,
			ccn_type_id: UpdateEmployee ? UpdateEmployee.ccn_type_id : 0,
			date_birth_employee: UpdateEmployee
				? UpdateEmployee.date_birth_employee
				: "",
			employee_personal_cellphone: UpdateEmployee
				? UpdateEmployee.employee_personal_cellphone
				: "",
			employee_personal_email: UpdateEmployee
				? UpdateEmployee.employee_personal_email
				: "",
			ccn_marital_status: UpdateEmployee
				? UpdateEmployee.ccn_marital_status
				: 1,
			first_last_name_employee: UpdateEmployee
				? UpdateEmployee.first_last_name_employee
				: "",
			first_name_employee: UpdateEmployee
				? UpdateEmployee.first_name_employee
				: "",
			middle_name_employee: UpdateEmployee
				? UpdateEmployee.middle_name_employee
				: "",
			number_id_employee: UpdateEmployee
				? UpdateEmployee.number_id_employee
				: "",
			rh: UpdateEmployee ? UpdateEmployee.rh : 0,
			second_last_name_employee: UpdateEmployee
				? UpdateEmployee.second_last_name_employee
				: "",
			employee_password: UpdateEmployee
				? UpdateEmployee.employee_password
				: "",
		},
	});


	return (
		<>

			<div className="container mx-auto px-2 py-2 uppercase bg-white shadow-md shadow-emerald-900">
				<div className="container mx-auto">
					<div className="flex">
						<h3 className="py-2 text-2xl text-slate-900 uppercase font-extrabold">
							Datos básicos de empleados
						</h3>
						<button
							className=""
							onClick={() => {
								setMethod("POST");
								setUpdateEmployee({})
								setUpdateEmployee();
								setIsOpen(!isOpen);
							}}
						>
							<FcPlus className="w-10 h-10" />
						</button>
					</div>
					<div className="w-full flex justify-end">
						<a href={`${import.meta.env.VITE_API_ADDRESS}generate-employee-excel-data`} className=""><ExcelIcon /></a>
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
						onClose={() => setIsOpen(!isOpen)}
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
			</div>


			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10 w-full" onClose={() => setIsOpen(!isOpen)}>
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

					<div className="fixed inset-0 overflow-y-auto ">
						<div className="flex min-h-full items-center  justify-center p-4 text-center ">
							<Transition.Child
								as={Fragment}
							>
								<Dialog.Panel className="w-[80vh] h-[50vh] transform overflow-y-scroll rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-2xl text-center font-bold leading-6 text-gray-900"
									>
										{UpdateEmployee ? "Actualizar Empleado" : "Crear Empleado"}
									</Dialog.Title>
									<form
										form
										onSubmit={handleSubmit(
											onSubmit
										)}
										className="overflow-y-scroll h-[50vh]"
									>

										<div className="relative flex h-10 mt-[25px] w-full min-w-[200px]">
											<input
												type="number"
												className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
												defaultValue={UpdateEmployee ? UpdateEmployee.number_id_employee : ""}
												{...register(
													"number_id_employee",
													{
														required: true,
													}
												)}

											/>
											<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
												# DE
												DOCUMENTO
												<div className="flex">
													<p className="italic font-bold text-md text-[15px] text-red-700 ">
														*
													</p>
												</div>
												{/*errors
													.number_id_employee
													?.type ===
													"required" && (
													)*/}
											</label>
										</div>

										<div className="col-span-6 mt-[25px] sm:col-span-3">
											<label
												htmlFor="country"
												className="block text-sm font-medium text-gray-700"
											>
												TIPO DE
												DOCUMENTO
											</label>
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
											<select

												{...register(
													"ccn_type_id",
													{
														required: true,
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

											<input
												className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
												placeholder=" "
												defaultValue={UpdateEmployee ? UpdateEmployee.first_name_employee : ""}
												{...register(
													"first_name_employee",
													{
														required: true,
													}
												)}
											/>
											<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
												PRIMER
												NOMBRE
												<div className="flex">
													<p className="italic font-bold text-md text-[15px] text-red-700 ">
														*
													</p>
												</div>
												{/*errors
													.first_name_employee
													?.type ===
													"required" && (
													)*/}
											</label>
										</div>

										<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
											<input
												className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
												placeholder=" "
												defaultValue={UpdateEmployee ? UpdateEmployee.middle_name_employee : ""}
												{...register(
													"middle_name_employee",
													{
														required: false,
													}
												)}
											/>
											<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
												SEGUNDO
												NOMBRE
											</label>
										</div>

										<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
											<input
												className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
												placeholder=" "
												defaultValue={UpdateEmployee ? UpdateEmployee.first_last_name_employee : ""}
												{...register(
													"first_last_name_employee",
													{
														required: true,
													}
												)}
											/>
											<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
												PRIMER
												APELLIDO
												<div className="flex">
													<p className="italic font-bold text-md text-[15px] text-red-700 ">
														*
													</p>
												</div>
												{/*errors
													.first_last_name_employee
													?.type ===
													"required" && (
													)*/}
											</label>
										</div>

										<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
											<input
												className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
												placeholder=" "
												defaultValue={UpdateEmployee ? UpdateEmployee.second_last_name_employee : ""}
												{...register(
													"second_last_name_employee",
													{
														required: false,
													}
												)}
											/>
											<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
												SEGUNDO
												APELLIDO
											</label>
										</div>

										<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
											<input
												type="date"
												className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
												placeholder=" "
												defaultValue={UpdateEmployee ? UpdateEmployee.date_birth_employee : ""}
												{...register(
													"date_birth_employee",
													{
														required: true,
													}
												)}
											/>
											<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
												FECHA DE
												NACIMIENTO
												<div className="flex">
													<p className="italic font-bold text-md text-[15px] text-red-700 ">
														*
													</p>
												</div>
												{/*errors
													.date_birth_employee
													?.type ===
													"required" && (
													)*/}
											</label>
										</div>

										<div className="col-span-6 mt-[25px] sm:col-span-3">
											<label className="text-sm flex font-medium text-gray-700">
												RH
												<div className="flex">
													<p className="italic font-bold text-md text-[15px] text-red-700 ">
														*
													</p>
												</div>
												{/*errors.rh
													?.type ===
													"required" && (
													)*/}
											</label>
											<select
												{...register(
													"rh",
													{
														required: true,
													}
												)}
												className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
											>
												{DataRH.map(
													(
														rh
													) => {
														return (
															<option
																key={
																	rh.ccn_rh
																}
																value={
																	rh.ccn_rh
																}
															>
																{
																	rh.rh
																}
															</option>
														);
													}
												)}
											</select>
										</div>
										<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
											<label className="text-sm flex font-medium text-gray-700">
												ESTADO
												CIVIL
												<div className="flex">
													<p className="italic font-bold text-md text-[15px] text-red-700 ">
														*
													</p>
												</div>
												{/*errors
													.ccn_marital_status
													?.type ===
													"required" && (
													)*/}
											</label>
											<select
												{...register(
													"ccn_marital_status",
													{
														required: true,
													}
												)}
												className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
											>
												{DataMaritalStatus.map(
													(
														martialStatus
													) => {
														return (
															<option
																key={
																	martialStatus.ccn_marital_status
																}
																value={
																	martialStatus.ccn_marital_status
																}
															>
																{
																	martialStatus.marital_status
																}
															</option>
														);
													}
												)}
											</select>
										</div>

										<div className="col-span-6 mt-[25px] sm:col-span-3">
											<label className="block text-sm font-medium text-gray-700">
												GENERO
												<div className="flex">
													<p className="italic font-bold text-md text-[15px] text-red-700 ">
														*
													</p>
												</div>
												{/*errors
													.auto_perceived_gender
													?.type ===
													"required" && (
													)*/}
											</label>
											<select
												{...register(
													"auto_perceived_gender",
													{
														required: true,
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
											<input
												className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
												placeholder=" "
												defaultValue={UpdateEmployee ? UpdateEmployee.employee_personal_email : ""}
												{...register(
													"employee_personal_email",
													{
														required: false,
													}
												)}
											/>
											<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
												CORREO
												PERSONAL
											</label>
										</div>

										<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
											<input
												className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
												placeholder=" "
												defaultValue={UpdateEmployee ? UpdateEmployee.employee_personal_cellphone : ""}
												{...register(
													"employee_personal_cellphone",
													{
														required: true,
													}
												)}
											/>
											<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
												TELEFONO
												PERSONAL
												<div className="flex">
													<p className="italic font-bold text-md text-[15px] text-red-700 ">
														*
													</p>
												</div>
												{/*errors
													.employee_personal_cellphone
													?.type ===
													"required" && (
													)*/}
											</label>
										</div>



										<div className="flex items-center justify-center mt-4">
											{imageToUpdate
												?
												<div className="h-[100px] w-[100px] mx-2 rounded-lg overflow-hidden">
													<img src={imageToUpdate} alt="Imagen de usuario" className="h-full w-full object-cover" />
												</div>
												:
												null
											}
											<label className="flex mt-4 flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
												<svg
													className="w-8 h-8"
													fill="currentColor"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H3zm0 2h14v8H3V6zm7 7a1 1 0 100-2 1 1 0 000 2z"
														clipRule="evenodd"
													/>
												</svg>
												{selectedFile || UpdateEmployee ? (
													<span className="mt-2 text-sm">{UpdateEmployee ? UpdateEmployee.image : selectedFile.name} </span>
												) : (
													<span className="mt-2 text-base leading-normal">Selecciona un archivo</span>
												)}

												<input
													id="file-upload"
													name="file-upload"
													type="file"
													className="hidden"
													{...register(
														"image",
														{
															required: true,
														}
													)}
													onChange={handleFileChange}
												/>
												<div className="flex">
													<p className="italic font-bold text-md text-[15px] text-red-700 ">
														*
													</p>
												</div>
												{/*errors
													.image
													?.type ===
													"required" && (
													)*/}
											</label>
										</div>

										<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
											<input
												type="password"
												className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
												placeholder=" "
												{...register(
													"employee_password",
													{
														required: true,
													}
												)}
											/>
											<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
												CONTRASEÑA
												<div className="flex">
													<p className="italic font-bold text-md text-[15px] text-red-700 ">
														*
													</p>
												</div>
												{/*errors
													.employee_password
													?.type ===
													"required" && (
													)*/}
											</label>
										</div>

										<div className="grid grid-cols-2 mt-5">
											<div className="m-3">
												<button
													type="button"
													className="mr-4 bg-white tracking-wide text-gray-900 text-sm font-bold rounded border-b-2 border-blue-600 hover:border-blue-900 hover:bg-blue-600 hover:text-white shadow-md py-2 px-5 inline-flex items-center"
													onClick={() =>
														setIsOpen(!isOpen)
													}
												>
													CERRAR
												</button>
												<input
													value={
														UpdateEmployee
															? "Actualizar"
															: "Crear"
													}
													type="submit"
													className="bg-white cursor-pointer tracking-wide text-gray-900 text-sm font-bold rounded border-b-2 border-green-600 hover:border-green-900 hover:bg-green-600 hover:text-white shadow-md py-2 px-5 inline-flex items-center"
												/>
											</div>
										</div>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition >
			<EditEmployee />

		</>
	);
};

export default BasicDataEmployee;
