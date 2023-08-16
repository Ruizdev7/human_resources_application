

import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import axios from "axios";
import { useForm } from "react-hook-form";
import { TiArrowBackOutline } from "react-icons/ti";
import { Checkbox } from "../../components/Checkbox";
import { FcPlus, FcUp, FcDown } from "react-icons/fc";
import { RxEyeNone, RxPencil2 } from "react-icons/rx";
import { IsotipoPlena, ExcelIcon } from "../../assets/images/SVG";
import { Dialog, Transition } from "@headlessui/react";
import { GlobalFilter } from "../../components/GlobalFilter";
import { useState, useMemo, useEffect, Fragment, useRef } from "react";

const SocialSecurity = () => {
	const cancelButtonRef = useRef(null);
	const [open, setOpen] = useState(true);
	const [openModalForms, setOpenModalForms] = useState(false);
	const [openModalCheckboxes, setOpenModalCheckboxes] = useState(false);

	const [dataEPS, setDataEPS] = useState([]);
	const [dataAFP, setDataAFP] = useState([]);
	const [dataARL, setDataARL] = useState([]);
	const [dataCCF, setDataCCF] = useState([]);
	const [dataAAP, setDataAAP] = useState([]);
	const [dataEmployees, setDataEmployees] = useState([]);
	const [dataSocialSecurity, setdataSocialSecurity] = useState(null);
	const [dataTypeAffiliation, setDataTypeAffiliation] = useState([]);
	const [dataTypeContributor, setdataTypeContributor] = useState([]);

	const [Method, setMethod] = useState("");
	const [updateSocialSecurity, setupdateSocialSecurity] = useState(null);



	const getSocialSecurity = async () => {
		try {
			const respEmployees = await axios(
				`${import.meta.env.VITE_API_ADDRESS}employee`
			);
			for (const employee of respEmployees.data.Employees) {
				dataEmployees.push({
					ccn_employee: employee.ccn_employee,
					full_name_employee: employee.full_name_employee,
				});
			}

			const respTypeAffiliation = await axios(
				`${import.meta.env.VITE_API_ADDRESS}type_affiliation`
			);

			for (const typeAffiliation of respTypeAffiliation.data
				.TypeAffiliation) {
				dataTypeAffiliation.push({
					ccn_type_affiliation: typeAffiliation.ccn_type_affiliation,
					description_type_affiliation:
						typeAffiliation.description_type_affiliation,
				});
			}

			const respTypeContrubutor = await axios(
				`${import.meta.env.VITE_API_ADDRESS}type_contributor`
			);
			for (const typeContributor of respTypeContrubutor.data
				.TypeContributor) {
				dataTypeContributor.push({
					ccn_type_contributor: typeContributor.ccn_type_contributor,
					description_type_contributor:
						typeContributor.description_type_contributor,
				});
			}
			const respEPS = await axios(
				`${import.meta.env.VITE_API_ADDRESS}eps`
			);
			for (const EPS of respEPS.data.EPS) {
				dataEPS.push({
					ccn_eps: EPS.ccn_eps,
					description_eps: EPS.description_eps,
				});
			}
			const respAFP = await axios(
				`${import.meta.env.VITE_API_ADDRESS}afp`
			);
			for (const AFP of respAFP.data.AFP) {
				dataAFP.push({
					ccn_afp: AFP.ccn_afp,
					description_afp: AFP.description_afp,
				});
			}

			const respARL = await axios(
				`${import.meta.env.VITE_API_ADDRESS}arl`
			);
			for (const ARL of respARL.data.ARL) {
				dataARL.push({
					ccn_arl: ARL.ccn_arl,
					description_arl: ARL.description_arl,
				});
			}

			const respCCF = await axios(
				`${import.meta.env.VITE_API_ADDRESS}ccf`
			);
			for (const CCF of respCCF.data.CCF) {
				dataCCF.push({
					ccn_ccf: CCF.ccn_ccf,
					description_ccf: CCF.description_ccf,
				});
			}

			const respAAP = await axios(
				`${import.meta.env.VITE_API_ADDRESS}aap`
			);
			for (const AAP of respAAP.data.AAP) {
				dataAAP.push({
					ccn_aap: AAP.ccn_aap,
					description_aap: AAP.description_aap,
				});
			}

			const resSocialSeurity = await axios(
				`${import.meta.env.VITE_API_ADDRESS}ss_employee`
			);
			setdataSocialSecurity(resSocialSeurity.data.SSEmployee)
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getSocialSecurity();
	}, []);

	const data = dataSocialSecurity ? dataSocialSecurity : [];

	const COLUMNS = [
		{
			Header: "CCN",
			Footer: "CCN",
			accessor: "ccn_ss_employee",
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
			Header: "Tipo de afiliación",
			Footer: "Tipo de afiliación",
			accessor: "type_affiliation",

			Cell: (row) => (
				<div style={{ textAlign: "center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "Tipo de contribuidor",
			Footer: "Tipo de contribuidor",
			accessor: "type_contributor",

			Cell: (row) => (
				<div style={{ textAlign: "center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "EPS",
			Footer: "EPS",
			accessor: "eps",

			Cell: (row) => (
				<div style={{ textAlign: "letf" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "AFP",
			Footer: "AFP",
			accessor: "afp",

			Cell: (row) => (
				<div style={{ textAlign: "letf" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "ARL",
			Footer: "ARL",
			accessor: "arl",

			Cell: (row) => (
				<div style={{ textAlign: "letf" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "CCF",
			Footer: "CCF",
			accessor: "ccf",

			Cell: (row) => (
				<div style={{ textAlign: "letf" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{
			Header: "AAP",
			Footer: "AAP",
			accessor: "aap",

			Cell: (row) => (
				<div style={{ textAlign: "letf" }}>
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
									specificSocialSecurity(row);
									EditSocialSecurity();
								}}
							>
								<RxPencil2 className="h-5 w-5" />
							</button>
						</div>
					</>
				);
			},
		},
	];

	const specificSocialSecurity = async (ccn_ss_employee) => {
		try {
			const respSocialSecurity = await axios(
				`${import.meta.env.VITE_API_ADDRESS}ss_employee/${ccn_ss_employee.cells[0].value
				}`
			);
			setupdateSocialSecurity(respSocialSecurity.data.SSEmployee);
		} catch (error) { }
	};

	const EditSocialSecurity = () => {
		try {
			if (!updateSocialSecurity) {
				specificSocialSecurity();
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
				ccn_employee: updateSocialSecurity
					? updateSocialSecurity.ccn_employee
					: 0,
				ccn_type_affiliation: updateSocialSecurity
					? updateSocialSecurity.ccn_type_affiliation
					: 0,
				ccn_type_contributor: updateSocialSecurity
					? updateSocialSecurity.ccn_type_contributor
					: 0,
				ccn_eps: updateSocialSecurity
					? updateSocialSecurity.ccn_eps
					: 0,
				ccn_afp: updateSocialSecurity
					? updateSocialSecurity.ccn_afp
					: 0,
				ccn_arl: updateSocialSecurity
					? updateSocialSecurity.ccn_arl
					: 0,
				ccn_ccf: updateSocialSecurity
					? updateSocialSecurity.ccn_ccf
					: 0,
				ccn_aap: updateSocialSecurity
					? updateSocialSecurity.ccn_aap
					: 0,
			},
		});

		const onSubmit = async (data) => {
			const body = {
				ccn_employee: data.ccn_employee,
				ccn_type_affiliation: data.ccn_type_affiliation,
				ccn_type_contributor: data.ccn_type_contributor,
				ccn_eps: data.ccn_eps,
				ccn_afp: data.ccn_afp,
				ccn_arl: data.ccn_arl,
				ccn_ccf: data.ccn_ccf,
				ccn_aap: data.ccn_aap,
			};

			if (Method === "POST") {
				const response = await axios
					.post(
						`${import.meta.env.VITE_API_ADDRESS}ss_employee`,
						body,
						{
							header: { "Access-Control-Allow-Origin": "*" },
						}
					)
					.then((response) => {
						console.log(response);
						window.location.href = window.location.href;
					})
					.catch((error) => {
						console.log(error);
					});
			} else if (Method === "PUT") {
				const response = await axios
					.put(
						`${import.meta.env.VITE_API_ADDRESS}ss_employee/${updateSocialSecurity.ccn_ss_employee
						}`,
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
														Datos de Seguridad Social
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
																<div className="col-span-6 mt-[25px] sm:col-span-3">
																	<label
																		htmlFor="country"
																		className="flex text-sm font-medium text-gray-700"
																	>
																		NOMBRE
																		COMPLETO
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

																<div className="col-span-6 mt-[25px] sm:col-span-3">
																	<label
																		htmlFor="country"
																		className="flex text-sm font-medium text-gray-700"
																	>
																		TIPO DE
																		AFILIACION
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_type_affiliation
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"ccn_type_affiliation",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataTypeAffiliation.map(
																			(
																				typeAffiliation
																			) => {
																				return (
																					<option
																						key={
																							typeAffiliation.ccn_type_affiliation
																						}
																						value={
																							typeAffiliation.ccn_type_affiliation
																						}
																					>
																						{
																							typeAffiliation.description_type_affiliation
																						}
																					</option>
																				);
																			}
																		)}
																	</select>

																</div>

																<div className="col-span-6 mt-[25px] sm:col-span-3">
																	<label
																		htmlFor="country"
																		className="flex text-sm font-medium text-gray-700"
																	>
																		TIPO DE
																		CONTRIBIUDOR
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_type_contributor
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"ccn_type_contributor",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataTypeContributor.map(
																			(
																				typeContributor
																			) => {
																				return (
																					<option
																						key={
																							typeContributor.ccn_type_contributor
																						}
																						value={
																							typeContributor.ccn_type_contributor
																						}
																					>
																						{
																							typeContributor.description_type_contributor
																						}
																					</option>
																				);
																			}
																		)}
																	</select>

																</div>

																<div className="col-span-6 mt-[25px] sm:col-span-3">
																	<label
																		htmlFor="country"
																		className="flex text-sm font-medium text-gray-700"
																	>
																		EPS
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_eps
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"ccn_eps",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataEPS.map(
																			(
																				eps
																			) => {
																				return (
																					<option
																						key={
																							eps.ccn_eps
																						}
																						value={
																							eps.ccn_eps
																						}
																					>
																						{
																							eps.description_eps
																						}
																					</option>
																				);
																			}
																		)}
																	</select>

																</div>

																<div className="col-span-6 mt-[25px] sm:col-span-3">
																	<label
																		htmlFor="country"
																		className="flex text-sm font-medium text-gray-700"
																	>
																		AFP
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_afp
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"ccn_afp",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataAFP.map(
																			(
																				afp
																			) => {
																				return (
																					<option
																						key={
																							afp.ccn_afp
																						}
																						value={
																							afp.ccn_afp
																						}
																					>
																						{
																							afp.description_afp
																						}
																					</option>
																				);
																			}
																		)}
																	</select>

																</div>

																<div className="col-span-6 mt-[25px] sm:col-span-3">
																	<label
																		htmlFor="country"
																		className="flex text-sm font-medium text-gray-700"
																	>
																		ARL
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_arl
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"ccn_arl",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataARL.map(
																			(
																				arl
																			) => {
																				return (
																					<option
																						key={
																							arl.ccn_arl
																						}
																						value={
																							arl.ccn_arl
																						}
																					>
																						{
																							arl.description_arl
																						}
																					</option>
																				);
																			}
																		)}
																	</select>

																</div>

																<div className="col-span-6 mt-[25px] sm:col-span-3">
																	<label
																		htmlFor="country"
																		className="flex text-sm font-medium text-gray-700"
																	>
																		CCF
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_ccf
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"ccn_ccf",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataCCF.map(
																			(
																				ccf
																			) => {
																				return (
																					<option
																						key={
																							ccf.ccn_ccf
																						}
																						value={
																							ccf.ccn_ccf
																						}
																					>
																						{
																							ccf.description_ccf
																						}
																					</option>
																				);
																			}
																		)}
																	</select>

																</div>

																<div className="col-span-6 mt-[25px] sm:col-span-3">
																	<label
																		htmlFor="country"
																		className="flex text-sm font-medium text-gray-700"
																	>
																		AAP
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_aap
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"ccn_aap",
																			{
																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataAAP.map(
																			(
																				aap
																			) => {
																				return (
																					<option
																						key={
																							aap.ccn_aap
																						}
																						value={
																							aap.ccn_aap
																						}
																					>
																						{
																							aap.description_aap
																						}
																					</option>
																				);
																			}
																		)}
																	</select>

																</div>

																<div className="bg-gray-50  px-4 py-3 sm:flex  sm:px-6">
																	<button
																		type="button"
																		className="mr-4 bg-white tracking-wide text-gray-900 text-sm font-bold rounded border-b-2 border-sky-900 hover:border-sky-900 hover:bg-sky-900 hover:text-white shadow-md py-2 px-5 inline-flex items-center"
																		onClick={() =>
																			setOpen(
																				!open
																			)
																		}
																	>
																		CERRAR
																	</button>
																	<input
																		value={updateSocialSecurity ? "ACTUALIZAR" : "CREAR"}
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
			{
				dataSocialSecurity
					?
					<div className="container mx-auto uppercase px-2 py-2 bg-white shadow-md shadow-emerald-900">
						<div className="container mx-auto">
							<div className="flex">
								<h3 className="py-2 text-2xl text-slate-900 uppercase font-extrabold">
									Datos de Seguridad Social
								</h3>
								<button
									className=""
									onClick={() => {
										setMethod("POST");
										setupdateSocialSecurity();
										setOpenModalForms(!openModalForms);
									}}
								>
									<FcPlus className="w-10 h-10" />
								</button>
							</div>
							<div className="w-full flex justify-end">
								<a href={`${import.meta.env.VITE_API_ADDRESS}generate-ss-employee-excel-data`} className=""><ExcelIcon /></a>
							</div>

							<div className="container mx-auto">
								<div className="mb-5 overflow-auto  shadow">
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
													<select className="flex w-15 px-2 py-2 rounded-md border border-gray-300 bg-gray-100 focus:border-2 focus:border-sky-900 focus:outline-0 disabled:border-0 sm:text-base">
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
						<EditSocialSecurity />
					</div>
					:
					<div className="h-[100%] container mx-auto flex items-center">
						<IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
					</div>
			}
		</>
	);
};

export default SocialSecurity;
