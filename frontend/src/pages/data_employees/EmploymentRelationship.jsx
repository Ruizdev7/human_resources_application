import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { TiArrowBackOutline } from "react-icons/ti";
import { Checkbox } from "../../components/Checkbox";
import { FcPlus, FcUp, FcDown } from "react-icons/fc";
import { RxEyeNone, RxPencil2 } from "react-icons/rx";
import { Dialog, Transition } from "@headlessui/react";
import { GlobalFilter } from "../../components/GlobalFilter";
import { useState, useEffect, Fragment, useRef, useMemo } from "react";
import { IsotipoPlena, ExcelIcon } from "../../assets/images/SVG";
import { useAddRoleMutation, useUpdateIsActiveMutation } from "../../redux_app/services/auth/authentication";

const EmployeeRelationship = () => {
	const cancelButtonRef = useRef(null);
	const [open, setOpen] = useState(true);
	const [Method, setMethod] = useState("");
	const [dataRole, setDataRole] = useState([]);
	const [finishDate, setFinishDate] = useState(null);
	const [dataEmployees, setDataEmployees] = useState([]);
	const [dataWorkShirt, setDataWorkShirt] = useState([]);
	const [finishContract, setFinishContract] = useState(0);
	const [isInactiveOpen, setIsInactiveOpen] = useState(false);
	const [openModalForms, setOpenModalForms] = useState(false);
	const [dataTypeRelationship, setDataTypeRelationship] = useState([]);
	const [openModalCheckboxes, setOpenModalCheckboxes] = useState(false);
	const [UpdateEmployeeRelationship, setUpdateEmployeeRelationship] = useState(null);
	const [dataEmployeeRelationship, setdataEmployeeRelationship] = useState(
		[]
	);

	const [AddRoleIAP, { data: add_role_iap, isSuccess: isSuccess_add_role_iap, error: error_add_role_iap, isLoading: is_loading_add_role_iap }] = useAddRoleMutation();
	const [UpdateUserIAP, { data: data_update_user, isSuccess: is_success_update_user, isLoading: is_loading_update_user, error: error_update_user }] =
		useUpdateIsActiveMutation();

	const getEmployeeRelationship = async () => {
		try {
			const respDataRole = await axios(
				`${import.meta.env.VITE_API_ADDRESS}role`
			);
			for (const Role of respDataRole.data.Role) {
				dataRole.push({
					area: Role.area,
					ccn_role: Role.ccn_role,
					full_role: Role.full_role,
					process: Role.process,
					role: Role.role,
				});
			}

			const respDataWorkShirt = await axios(
				`${import.meta.env.VITE_API_ADDRESS}work_shift`
			);
			for (const WorkShirt of respDataWorkShirt.data.WorkShift) {
				dataWorkShirt.push({
					ccn_work_shift: WorkShirt.ccn_work_shift,
					description_work_shift: WorkShirt.description_work_shift,
				});
			}
			const respDataTypeRelationship = await axios(
				`${import.meta.env.VITE_API_ADDRESS}type_relationship`
			);
			for (const typeRelationship of respDataTypeRelationship.data
				.TypeRelationship) {
				dataTypeRelationship.push({
					ccn_type_relationship:
						typeRelationship.ccn_type_relationship,
					description_type_relationship:
						typeRelationship.description_type_relationship,
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
			const respEmployeeRelationship = await axios(
				`${import.meta.env.VITE_API_ADDRESS}employment_relationship`
			);
			setdataEmployeeRelationship(respEmployeeRelationship.data.EmployeeRelationship);

		} catch (error) {
			console.log(error);
		}
	};


	if (!dataEmployeeRelationship) return <></>;
	useEffect(() => {
		getEmployeeRelationship();
	}, []);

	function OpenColumnVisibility() {
		setOpenModalCheckboxes(!openModalCheckboxes);
	}

	const [CreateUserIAP, { data: data_create_user, isSuccess, isLoading, error: error_create_new_user }] =
		useAddRoleMutation();



	const data = dataEmployeeRelationship ? dataEmployeeRelationship : [];

	const COLUMNS = [
		{
			Header: "CCN",
			Footer: "CCN",
			accessor: "ccn_employment_relationship",
			Cell: (row) => (
				<div className={`${!row.row.values.is_active_employee ? "text-gray-400" : "text-black"}`} style={{ textAlign: "center" }}>{row.value}</div>
			),
		},
		{
			Header: "Empleado",
			Footer: "Empleado",
			accessor: "full_name_employee",

			Cell: (row) => (
				<div className={`${!row.row.values.is_active_employee ? "text-gray-400" : "text-black"}`} style={{ textAlign: "letf" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "Área",
			Footer: "Área",
			accessor: "area",

			Cell: (row) => (
				<div className={`${!row.row.values.is_active_employee ? "text-gray-400" : "text-black"}`} style={{ textAlign: "center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "Role",
			Footer: "Role",
			accessor: "role",

			Cell: (row) => (
				<div className={`${!row.row.values.is_active_employee ? "text-gray-400" : "text-black"}`} style={{ textAlign: "center" }}>
					<p >
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "Proceso",
			Footer: "Proceso",
			accessor: "process",

			Cell: (row) => (
				<div className={`${!row.row.values.is_active_employee ? "text-gray-400" : "text-black"}`} style={{ textAlign: "center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "Turno",
			Footer: "Turno",
			accessor: "work_shift",

			Cell: (row) => (
				<div className={`${!row.row.values.is_active_employee ? "text-gray-400" : "text-black"}`} style={{ textAlign: "center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "Fecha de vinculación",
			Footer: "Fecha de vinculación",
			accessor: "binding_date",
			Cell: (row) => {
				return (
					<div className={`${!row.row.values.is_active_employee ? "text-gray-400" : "text-black"}`} style={{ textAlign: "center" }}>
						{format(new Date(row.value), "ddMMMyy")}
					</div>
				);
			},
		},
		{
			Header: "FECHA DE DESVINCULACIÓN",
			Footer: "FECHA DE DESVINCULACIÓN",
			accessor: "termination_date",
			Cell: (row) => {
				return (
					<div className={`${!row.row.values.is_active_employee ? "text-gray-400" : "text-black"}`} style={{ textAlign: "center" }}>
						{row.cell.row.values.is_active_employee ? "" : format(new Date(row.value), "ddMMMyy")}
					</div>
				);
			},
		},
		{
			Header: "Tipo de vinculación laboral",
			Footer: "Tipo de vinculación laboral",
			accessor: "type_relationship",
			Cell: (row) => (
				<div className={`${!row.row.values.is_active_employee ? "text-gray-400" : "text-black"}`} style={{ textAlign: "center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "E-mail corporativo",
			Footer: "E-mail corporativo",
			accessor: "employee_corporate_email",
			Cell: (row) => <div className={`${!row.row.values.is_active_employee ? "text-gray-400" : "text-black"}`} style={{ textAlign: "left" }}>{row.cell.row.values.employee_corporate_email ? "" : row.value}</div>,
		},
		{
			Header: "Teléfono corporativo",
			Footer: "Teléfono corporativo",
			accessor: "employee_corporate_cellphone",
			Cell: (row) => (
				<div className={`${!row.row.values.is_active_employee ? "text-gray-400" : "text-black"}`} style={{ textAlign: "center" }}>
					{row.value === 1111111111 ? "" : row.value}
				</div>
			),
		},
		{
			Header: "Jefe inmediato",
			Footer: "Jefe inmediato",
			accessor: "immediate_boss",

			Cell: (row) => (
				<div className={`${!row.row.values.is_active_employee ? "text-gray-400" : "text-black"}`} style={{ textAlign: "letf" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "Manager",
			Footer: "Manager",
			accessor: "manager",

			Cell: (row) => (
				<div className={`${!row.row.values.is_active_employee ? "text-gray-400" : "text-black"}`} style={{ textAlign: "letf" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "Tipo de cargo",
			Footer: "Tipo de cargo",
			accessor: "type_of_charge",

			Cell: (row) => <div className={`${!row.row.values.is_active_employee ? "text-gray-400" : "text-black"}`} style={{ textAlign: "letf" }}>{row.value}</div>,
		},
		{
			Header: "Editar",
			Footer: "Editar",
			accessor: "",
			row: 0,
			Cell: ({ row }) => {
				return (
					<div className="">
						<div className="flex justify-center">
							<button
								className={`${!row.values.is_active_employee ? "text-gray-400" : ""} text-center`}
								onClick={() => {
									setMethod("PUT");
									setOpenModalForms(!openModalForms);
									specificRelationship(row);
									EditRelationship();
								}}
							>
								<RxPencil2 className="h-5 w-5" />
							</button>
						</div>
					</div>
				);
			},
		},
		{
			Header: "Estado del contrato",
			Footer: "Estado del contrato",
			accessor: "is_active_employee",
			row: 0,
			Cell: ({ row }) => {
				return (
					<div className="">
						<div className="flex justify-center ">
							<button
								className={row.values.is_active_employee ? "text-center font-bold rounded-lg text-green-900" : "text-center font-bold rounded-lg text-red-900"}
								onClick={() => {
									setIsInactiveOpen(true);
									setFinishContract(row.cells[0].row.values);
								}}
							>
								{
									row.values.is_active_employee
										?
										<p className="text-[#166534] py-[2px] px-[10px] rounded-[6px] bg-[#DCFCE7]">Activo</p>
										:
										<p className="text-[#991B1B] py-[2px] px-[10px] rounded-[6px] bg-[#FEE2E2]">Inactivo</p>
								}
							</button>
						</div>
					</div>
				);
			},
		},
	];

	const endContract = async (ccn_employment_relationship) => {
		const employee_name = ccn_employment_relationship.full_name_employee
		const confirmation = window.confirm(ccn_employment_relationship.is_active_employee ? `¿Esta seguro que desea inactivar al empleado(a) ${employee_name}?` : `¿Esta seguro que desea activar al empleado(a) ${employee_name}?`)

		if (confirmation === true) {

			const body = {
				is_active_employee: !ccn_employment_relationship.is_active_employee
			}
			const response = await axios
				.put(
					`${import.meta.env.VITE_API_ADDRESS}employment_relationship/end_contract/${ccn_employment_relationship.ccn_employment_relationship}`,
					body,
					{ header: { "Access-Control-Allow-Origin": "*" } }
				)
				.then((response) => {
					console.log(response);
					UpdateUserIAP({
						ccn_employee: response.data["Employee Relationship Updated"].ccn_employee,
						is_active_employee: body.is_active_employee
					})
				})
				.catch((error) => {
					console.log(error);
				});

		} else {
			alert(`Se cancelo el proceso de finalizacion de contrato de ${employee_name}`)
			window.location = window.location.href;
		}
	};

	const specificRelationship = async (ccn_employment_relationship) => {
		try {
			const respRelationship = await axios(
				`${import.meta.env.VITE_API_ADDRESS}employment_relationship/${ccn_employment_relationship.cells[0].value}`
			);
			setUpdateEmployeeRelationship(
				respRelationship.data.EmployeeRelationship
			);
		} catch (error) { }
	};


	const EditRelationship = () => {
		try {
			if (!UpdateEmployeeRelationship) {
				specificRelationship();
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
				ccn_employee: UpdateEmployeeRelationship
					? UpdateEmployeeRelationship.ccn_employee
					: 0,
				ccn_role: UpdateEmployeeRelationship
					? UpdateEmployeeRelationship.ccn_role
					: 0,
				ccn_work_shift: UpdateEmployeeRelationship
					? UpdateEmployeeRelationship.ccn_work_shift
					: 0,
				binding_date: UpdateEmployeeRelationship
					? UpdateEmployeeRelationship.binding_date
					: "",
				time_worked: UpdateEmployeeRelationship
					? UpdateEmployeeRelationship.time_worked
					: 0,
				pending_days_to_enjoy_for_holidays: UpdateEmployeeRelationship
					? UpdateEmployeeRelationship.pending_days_to_enjoy_for_holidays
					: 0,
				ccn_type_relationship: UpdateEmployeeRelationship
					? UpdateEmployeeRelationship.ccn_type_relationship
					: 0,
				termination_date: UpdateEmployeeRelationship
					? UpdateEmployeeRelationship.termination_date
					: "",

				employee_corporate_email: UpdateEmployeeRelationship
					? UpdateEmployeeRelationship.employee_corporate_email
					: "",
				employee_corporate_cellphone: UpdateEmployeeRelationship
					? UpdateEmployeeRelationship.employee_corporate_cellphone
					: 0,
				immediate_boss: UpdateEmployeeRelationship
					? UpdateEmployeeRelationship.immediate_boss
					: 0,
				manager: UpdateEmployeeRelationship
					? UpdateEmployeeRelationship.manager
					: 0,
				type_of_charge: UpdateEmployeeRelationship
					? UpdateEmployeeRelationship.type_of_charge
					: "OPERATIVO",
			},
		});

		const onSubmit = async (data) => {
			const body = {
				ccn_employee: data.ccn_employee,
				ccn_role: data.ccn_role,
				ccn_work_shift: data.ccn_work_shift,
				binding_date: data.binding_date,
				time_worked: data.time_worked || "01/01/2001",
				pending_days_to_enjoy_for_holidays:
					data.pending_days_to_enjoy_for_holidays,
				ccn_type_relationship: data.ccn_type_relationship,
				employee_corporate_email: data.employee_corporate_email ? data.employee_corporate_email : "",
				employee_corporate_cellphone: data.employee_corporate_cellphone ? data.employee_corporate_cellphone : 0,
				termination_date: data.termination_date || "",
				immediate_boss: data.immediate_boss,
				manager: data.manager,
				type_of_charge: data.type_of_charge,
			};

			if (Method === "POST") {
				const response = await axios
					.post(
						`${import.meta.env.VITE_API_ADDRESS}employment_relationship`,
						body,
						{
							header: { "Access-Control-Allow-Origin": "*" },
						}
					)
					.then((response) => {
						AddRoleIAP({
							ccn_employee: data.ccn_employee,
							ccn_role: data.ccn_role,
						});
					})
					.catch((error) => {
						console.log(error);
					});
			} else if (Method === "PUT") {
				const response = await axios
					.put(
						`${import.meta.env.VITE_API_ADDRESS}employment_relationship/${UpdateEmployeeRelationship.ccn_employment_relationship}`,
						body,
						{ header: { "Access-Control-Allow-Origin": "*" } }
					)
					.then((response) => {

						AddRoleIAP({
							ccn_employee: response.data["Employee Relationship Updated"].ccn_employee,
							ccn_role: data.ccn_role,
						});

					})
					.catch((error) => {
						console.log(error);
					});
			}
		};

		useEffect(() => {

			if (isSuccess_add_role_iap) {
				toast.success(`Se asignaron los campos de manera correcta!`, {
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
			} else if (error_add_role_iap) {
				toast.error(`No fue posible aisgnar la informacion: ${error_create_new_user.data.msg} `, {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				})
			} else if (is_success_update_user) {
				toast.success("El usuario fue actualizado correctamente", {
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


		}, [isSuccess_add_role_iap, error_add_role_iap])

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
														DATOS DE VINCULACIÓN LABORAL
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
																		ROL -
																		CARGO
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_role
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"ccn_role",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataRole.map(
																			(
																				role
																			) => {
																				return (
																					<option
																						key={
																							role.ccn_role
																						}
																						value={
																							role.ccn_role
																						}
																					>
																						{
																							role.full_role
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		TURNO DE
																		TRABAJO
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_work_shift
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"ccn_work_shift",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataWorkShirt.map(
																			(
																				workShirt
																			) => {
																				return (
																					<option
																						key={
																							workShirt.ccn_work_shift
																						}
																						value={
																							workShirt.ccn_work_shift
																						}
																					>
																						{
																							workShirt.description_work_shift
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		TIPO DE
																		VINCULACION
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_type_relationship
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"ccn_type_relationship",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataTypeRelationship.map(
																			(
																				typeRelationship
																			) => {
																				return (
																					<option
																						key={
																							typeRelationship.ccn_type_relationship
																						}
																						value={
																							typeRelationship.ccn_type_relationship
																						}
																					>
																						{
																							typeRelationship.description_type_relationship
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		FECHA DE
																		VINCULACION
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.binding_date
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<input
																		type="date"
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		{...register(
																			"binding_date",
																			{
																				required: true,
																			}
																		)}
																	/>
																</div>
																{UpdateEmployeeRelationship ?
																	<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																		<label className="flex text-sm font-medium text-gray-700">
																			FECHA DE
																			DESVINCULACION
																		</label>
																		<input
																			type="date"
																			className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																			placeholder=" "
																			{...register(
																				"termination_date",
																				{
																					required: false,
																				}
																			)}
																		/>
																	</div>
																	: null
																}

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		TELEFONO
																		CORPORATIVO
																	</label>
																	<input
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		type="number"
																		{...register(
																			"employee_corporate_cellphone",
																			{
																				required: false,
																			}
																		)}
																	/>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		CORREO
																		ELECTRONICO
																		CORPORATIVO
																	</label>
																	<input
																		className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
																		placeholder=" "
																		type="text"
																		{...register(
																			"employee_corporate_email",
																			{
																				required: false,
																			}
																		)}
																	/>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		JEFE
																		INMEDIATO
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.immediate_boss
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"immediate_boss",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataEmployees.map(
																			(
																				employees
																			) => {
																				return (
																					<option
																						key={
																							employees.ccn_employee
																						}
																						value={
																							employees.ccn_employee
																						}
																					>
																						{
																							employees.full_name_employee
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		MANAGER
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.manager
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"manager",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataEmployees.map(
																			(
																				employees
																			) => {
																				return (
																					<option
																						key={
																							employees.ccn_employee
																						}
																						value={
																							employees.ccn_employee
																						}
																					>
																						{
																							employees.full_name_employee
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>

																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		TIPO DE
																		CARGO
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.type_of_charge
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"type_of_charge",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		<option
																			key="OPERATIVO"
																			value="OPERATIVO"
																		>
																			OPERATIVO
																		</option>
																		<option
																			key="ADMINISTRATIVO"
																			value="ADMINISTRATIVO"
																		>
																			ADMINISTRATIVO
																		</option>
																		<option
																			key="DIRECTIVO"
																			value="DIRECTIVO"
																		>
																			DIRECTIVO
																		</option>
																	</select>
																</div>

																<div className="bg-gray-50 px-4 py-3 sm:flex mt-5 sm:px-6">
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
																		value={UpdateEmployeeRelationship ? "ACTUALIZAR" : "CREAR"}
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
	);

	const { globalFilter, pageIndex, pageSize } = state;

	return (
		<>
			{dataEmployeeRelationship != 0 ?
				<div className="container mx-auto px-2 uppercase py-2 bg-white shadow-md shadow-emerald-900">
					<div className="container mx-auto">
						<div className="flex">
							<h3 className="py-2 text-2xl text-slate-900 uppercase font-extrabold">
								Datos de Vinculación Laboral
							</h3>
							<button
								className=""
								onClick={() => {
									setMethod("POST");
									setUpdateEmployeeRelationship();
									setOpenModalForms(!openModalForms);
								}}
							>
								<FcPlus className="w-10 h-10" />
							</button>
						</div>
						<div className="w-full flex justify-end">
							<a href={`${import.meta.env.VITE_API_ADDRESS}generate-employment-relationship-excel-data`} className=""><ExcelIcon /></a>
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

					<EditRelationship />
				</div> : <div className="h-[100%] container mx-auto flex items-center">
					<IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
				</div>
			}
			<Transition appear show={isInactiveOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={() => setIsInactiveOpen(false)}>
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
										className="text-lg font-bold text-center leading-6 text-gray-900"
									>
										Finalizacion de Contrato
									</Dialog.Title>
									<div className="mt-2">
										¿Esta seguro que desea inactivar al empleado(a) <p className="font-bold">{finishContract.full_name_employee}</p>?
										<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
											<label className="flex text-sm font-medium text-gray-700">
												FECHA DE
												DESVINCULACION
											</label>
											<input
												type="date"
												value={finishDate}
												onChange={(e) => setFinishDate(e.target.value)}
												className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
												placeholder=" "
											/>
										</div>
									</div>

									<div className="mt-10 gap-x-2 flex w-full justify-end">
										<button
											type="button"
											onClick={() => setIsInactiveOpen(false)}
											className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
										>
											Cancelar
										</button>
										{finishDate ? new Date(finishDate).getTime() < new Date().getTime() || new Date(finishDate).getTime() === new Date().getTime() ?
											<button
												type="button"
												className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
												onClick={() => endContract(finishContract)}
											>
												Inactivar
											</button>
											:
											<button
												type="button"
												className="inline-flex justify-center opacity-50 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
												onClick={() => alert("Por favor ingrese una fecha menor a la fecha actual")}
											>
												Inactivar
											</button>
											:
											<button
												type="button"
												className="inline-flex justify-center opacity-50 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
												onClick={() => alert("Por favor ingrese la fecha de retiro")}
											>
												Inactivar
											</button>
										}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default EmployeeRelationship;
