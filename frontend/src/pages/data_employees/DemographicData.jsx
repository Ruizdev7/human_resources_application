
import React, { useMemo } from "react";
import { useState, useEffect, Fragment, useRef } from "react";
import axios from "axios";
import { IsotipoPlena, ExcelIcon } from "../../assets/images/SVG";
import { get, useForm } from "react-hook-form";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import { Dialog, Transition } from "@headlessui/react";
//import { ExclamationTriangleIcon } from "@heroicons/react/outline";
import { Checkbox } from "../../components/Checkbox";
import { RxEyeNone, RxPencil2 } from "react-icons/rx";
import { FcPlus, FcUp, FcDown } from "react-icons/fc";
import { GlobalFilter } from "../../components/GlobalFilter";
import { useGetAllDemographicDataQuery } from "../../redux_app/services/demographicData";

const DemographicData = () => {
	const { data: complete_data } = useGetAllDemographicDataQuery();
	const [createForm, setCreateForm] = useState(false);

	const [open, setOpen] = useState(true);
	const [openModalCheckboxes, setOpenModalCheckboxes] = useState(false);
	const [openModalForms, setOpenModalForms] = useState(false);
	const cancelButtonRef = useRef(null);
	const [loadingData, setLoadingData] = useState(true);

	const [dataDemographicData, setdataDemographicData] = useState([]);
	const [dataDepartments, setDataDepartments] = useState([]);
	const [dataCities, setDataCities] = useState([]);
	const [dataEmployees, setDataEmployees] = useState([]);
	const [dataCountries, setDataCountries] = useState([]);
	const [dataBirthDepartments, setdataBirthDepartments] = useState([]);
	const [dataBirthCitys, setdataBirthCitys] = useState([]);
	const [dataDepartmentsRecidence, setDataDepartmentsRecidence] = useState([]);
	const [dataCitysRecidence, setDataCitysRecidence] = useState([]);

	const [dataSchoolingLevel, setdataSchoolingLevel] = useState([]);
	const [dataRace, setdataRace] = useState([]);
	const [UpdateDemographicData, setUpdateDemographicData] = useState(null);
	const [Method, setMethod] = useState("");

	const [country, setCountry] = useState();
	const [countryResidence, setCountryResidence] = useState();

	const [birthDepartment, setBirthDepartment] = useState(null);
	const [birthCity, setBirthCity] = useState(null);
	const [departmentResidence, setDepartmentResidence] = useState(null);
	const [cityResidence, setCityResidence] = useState(null);

	const getDemographicData = async () => {

		try {
			const respDataDepartments = await axios(
				`${import.meta.env.VITE_API_ADDRESS}department`
			);
			setDataDepartments(respDataDepartments.data.Department)
			const respDataCities = await axios(
				`${import.meta.env.VITE_API_ADDRESS}city`
			);
			setDataCities(respDataCities.data.City)
			const respdataSchoolingLevel = await axios(`${import.meta.env.VITE_API_ADDRESS}schooling_level`);
			for (const SchoolingLevel of respdataSchoolingLevel.data.SchoolingLevel) {

				dataSchoolingLevel.push({

					ccn_schooling_level: SchoolingLevel.ccn_schooling_level,
					description_schooling_level: SchoolingLevel.description_schooling_level,
				});
			}
			const respdataRace = await axios(`${import.meta.env.VITE_API_ADDRESS}race`);
			for (const Race of respdataRace.data.Race) {

				dataRace.push({

					ccn_race: Race.ccn_race,
					description_race: Race.description_race,
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
			const respdataCountries = await axios(

				`${import.meta.env.VITE_API_ADDRESS}country`
			);
			setDataCountries(respdataCountries.data.Country)
			const respEmployeeRelationship = await axios(
				`${import.meta.env.VITE_API_ADDRESS}demographic_data`
			);
			setdataDemographicData(respEmployeeRelationship.data.DemographicData);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDemographicData();
	}, []);

	const data = dataDemographicData ? dataDemographicData : [];

	const COLUMNS = [
		{

			Header: "CCN",
			Footer: "CCN",
			accessor: "ccn_demographic_data",
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

			Header: "Dpto. de nacimiento",
			Footer: "Dpto. de nacimiento",
			accessor: "birth_department",
			Cell: (row) => (

				<div style={{ textAlign: "center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{

			Header: "Ciudad de nacimiento",
			Footer: "Ciudad de nacimiento",
			accessor: "birth_city",
			Cell: (row) => (

				<div style={{ textAlign: "center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{

			Header: "Dpto. de residencia",
			Footer: "Dpto. de residencia",
			accessor: "department_residence",
			Cell: (row) => (

				<div style={{ textAlign: "center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{

			Header: "Ciudad de residencia",
			Footer: "Ciudad de residencia",
			accessor: "city_residence",
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

				<div style={{ textAlign: "center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{

			Header: "Raza",
			Footer: "Raza",
			accessor: "race",
			Cell: (row) => (

				<div style={{ textAlign: "center" }}>
					<p>
						{row.value}
					</p>
				</div>
			),
		},
		{

			Header: "Es cabeza de hogar",
			Footer: "Es cabeza de hogar",
			accessor: "is_head_of_household",
			Cell: (row) => (
				<div style={{ textAlign: "center" }}>{row.value ? "SI" : "NO"}</div>
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
									specificDemographicData(row);
									EditDemographicData();
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

	const GetBirthDeartment = async (country) => {
		const respDataDepartments = await axios(
			`${import.meta.env.VITE_API_ADDRESS}department_by_country/${country}`
		);
		setdataBirthDepartments(respDataDepartments.data.DepartmentByCountry)
	}
	const GetBirthCity = async (department) => {
		const respdataCitys = await axios(
			`${import.meta.env.VITE_API_ADDRESS}city_by_department/${department}`
		);
		setdataBirthCitys(respdataCitys.data.CityByDepartment)
	}
	const GetDeartmentResidence = async (country) => {
		const respDataDepartments = await axios(
			`${import.meta.env.VITE_API_ADDRESS}department_by_country/${country}`
		);
		setDataDepartmentsRecidence(respDataDepartments.data.DepartmentByCountry)
	}
	const GetCityRecidence = async (department) => {
		const respdataCitys = await axios(
			`${import.meta.env.VITE_API_ADDRESS}city_by_department/${department}`
		);
		setDataCitysRecidence(respdataCitys.data.CityByDepartment)
	}

	const specificDemographicData = async (ccn_demographic_data) => {

		try {
			const respDemographicData = await axios(
				`${import.meta.env.VITE_API_ADDRESS}demographic_data/${ccn_demographic_data.cells[0].value}`
			);
			setUpdateDemographicData(respDemographicData.data.DemographicData);

		} catch (error) { }
	};
	const EditDemographicData = () => {

		try {

			if (!UpdateDemographicData) {
				specificDemographicData();
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
				ccn_demographic_data: UpdateDemographicData ? UpdateDemographicData.ccn_demographic_data : "",
				ccn_employee: UpdateDemographicData ? UpdateDemographicData.ccn_employee : "",
				birth_department: UpdateDemographicData ? UpdateDemographicData.birth_department : "",
				birth_city: UpdateDemographicData ? UpdateDemographicData.birth_city : "",
				department_residence: UpdateDemographicData ? UpdateDemographicData.department_residence : "",
				city_residence: UpdateDemographicData ? UpdateDemographicData.city_residence : "",
				ccn_schooling_level: UpdateDemographicData ? UpdateDemographicData.ccn_schooling_level : "",
				ccn_race: UpdateDemographicData ? UpdateDemographicData.ccn_race : "",
				birth_country: UpdateDemographicData ? UpdateDemographicData.birth_country : "",
				country_residence: UpdateDemographicData ? UpdateDemographicData.country_residence : "",
				is_head_of_household: UpdateDemographicData ? UpdateDemographicData.is_head_of_household : false,
			},
		});
		const onSubmit = async (data) => {
			const body = {
				ccn_demographic_data: data.ccn_demographic_data,
				ccn_employee: data.ccn_employee,
				birth_department: data.birth_department,
				birth_city: data.birth_city,
				department_residence: data.department_residence,
				city_residence: data.city_residence,
				ccn_schooling_level: data.ccn_schooling_level,
				ccn_race: data.ccn_race,
				is_head_of_household: data.is_head_of_household,
				birth_country: data.birth_country,
				country_residence: data.country_residence,
			};
			if (Method === "POST") {

				const response = await axios
					.post(`${import.meta.env.VITE_API_ADDRESS}demographic_data`, body, {

						header: { "Access-Control-Allow-Origin": "*" },
					})
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

						`${import.meta.env.VITE_API_ADDRESS}demographic_data/${UpdateDemographicData.ccn_demographic_data}`,
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
														datos demográficos
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
																		PAIS DE NACIMIENTO
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.birth_department
																			?.type ===
																			"required" && (

																			)*/}
																	</label>
																	<select
																		{...register(
																			"birth_country",
																			{

																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataCountries.map(

																			(

																				country
																			) => {

																				return (

																					<option
																						key={

																							country.ccn_country
																						}
																						value={

																							country.ccn_country
																						}
																					>
																						{
																							country.description_country
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>
																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		DEPARTAMENTO DE NACIMIENTO
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.birth_department
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"birth_department",
																			{

																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataDepartments.map(

																			(

																				departments
																			) => {

																				return (

																					<option
																						key={

																							departments.ccn_department
																						}
																						value={

																							departments.ccn_department
																						}
																					>
																						{

																							departments.descripcion_department
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>
																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		CIUDAD DE NACIMIENTO
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.birth_city
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"birth_city",
																			{

																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataCities.map(

																			(

																				city
																			) => {

																				return (

																					<option
																						key={

																							city.ccn_city
																						}
																						value={

																							city.ccn_city
																						}
																					>
																						{

																							city.description_city
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>
																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		PAIS DE RESIDENCIA
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.birth_department
																			?.type ===
																			"required" && (

																			)*/}
																	</label>
																	<select
																		{...register(
																			"country_residence",
																			{

																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataCountries.map(

																			(

																				country
																			) => {

																				return (

																					<option
																						key={

																							country.ccn_country
																						}
																						value={

																							country.ccn_country
																						}
																					>
																						{
																							country.description_country
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>
																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		DEPARTAMENTO DE RESIDENCIA
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.department_residence
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"department_residence",
																			{

																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataDepartments.map(

																			(

																				departments
																			) => {

																				return (

																					<option
																						key={

																							departments.ccn_department
																						}
																						value={

																							departments.ccn_department
																						}
																					>
																						{

																							departments.descripcion_department
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>
																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		CIUDAD DE RESIDENCIA
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.city_residence
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(
																			"city_residence",
																			{

																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataCities.map(

																			(

																				city
																			) => {

																				return (

																					<option
																						key={

																							city.ccn_city
																						}
																						value={

																							city.ccn_city
																						}
																					>
																						{

																							city.description_city
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>
																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		NIVEL DE ESCOLARIDAD
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

																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataSchoolingLevel.map(

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
																<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																	<label className="flex text-sm font-medium text-gray-700">
																		RAZA
																		<div className="flex">
																			<p className="italic font-bold text-md text-[15px] text-red-700 ">
																				*
																			</p>
																		</div>
																		{/*errors
																			.ccn_race
																			?.type ===
																			"required" && (
																			)*/}
																	</label>
																	<select
																		{...register(

																			"ccn_race",
																			{

																				required: true,
																			}
																		)}
																		className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																	>
																		{dataRace.map(

																			(

																				race
																			) => {

																				return (

																					<option
																						key={

																							race.ccn_race
																						}
																						value={

																							race.ccn_race
																						}
																					>
																						{

																							race.description_race
																						}
																					</option>
																				);
																			}
																		)}
																	</select>
																</div>
																<div className="relative flex gap-x-3 my-3 w-[450px]">
																	<div className="flex h-6 ml-3 my-3 items-center">
																		<input
																			{...register("is_head_of_household", {

																				required: false,
																			})}
																			name="is_head_of_household"
																			type="checkbox"
																			className="h-5 w-5 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
																		/>
																	</div>
																	<div className="text-sm my-3 leading-6">
																		<label htmlFor="manager_approval" className="font-medium text-gray-900">
																			<strong>Es Cabeza de Hogar</strong>
																		</label>
																	</div>
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
																		value={UpdateDemographicData ? "ACTUALIZAR" : "CREAR"}
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

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({

		defaultValues: {
			ccn_demographic_data: UpdateDemographicData ? UpdateDemographicData.ccn_demographic_data : "",
			ccn_employee: UpdateDemographicData ? UpdateDemographicData.ccn_employee : "",
			birth_department: UpdateDemographicData ? UpdateDemographicData.birth_department : "",
			birth_city: UpdateDemographicData ? UpdateDemographicData.birth_city : "",
			department_residence: UpdateDemographicData ? UpdateDemographicData.department_residence : "",
			city_residence: UpdateDemographicData ? UpdateDemographicData.city_residence : "",
			ccn_schooling_level: UpdateDemographicData ? UpdateDemographicData.ccn_schooling_level : "",
			ccn_race: UpdateDemographicData ? UpdateDemographicData.ccn_race : "",
			is_head_of_household: UpdateDemographicData ? UpdateDemographicData.is_head_of_household : false,
		},
	});
	const onSubmit = async (data) => {
		const body = {
			ccn_demographic_data: data.ccn_demographic_data,
			ccn_employee: data.ccn_employee,
			birth_department: birthDepartment,
			birth_city: birthCity,
			department_residence: departmentResidence,
			city_residence: cityResidence,
			ccn_schooling_level: data.ccn_schooling_level,
			ccn_race: data.ccn_race,
			is_head_of_household: data.is_head_of_household,
			birth_country: country,
			country_residence: countryResidence,
		};
		if (Method === "POST") {
			const response = await axios
				.post(`${import.meta.env.VITE_API_ADDRESS}demographic_data`, body, {
					header: { "Access-Control-Allow-Origin": "*" },
				})
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
					`${import.meta.env.VITE_API_ADDRESS}demographic_data/${UpdateDemographicData.ccn_demographic_data}`,
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
			{dataDemographicData ?
				<div className="container mx-auto px-2 py-2 uppercase bg-white shadow-md shadow-emerald-900">
					<div className="container mx-auto">
						<div className="flex">
							<h3 className="py-2 text-2xl text-slate-900 uppercase font-extrabold">
								Datos Demográficos
							</h3>
							<button
								className=""
								onClick={() => {
									setMethod("POST");
									setUpdateDemographicData();
									setCreateForm(!createForm);
								}}
							>
								<FcPlus className="w-10 h-10" />
							</button>
						</div>
						<div className="w-full flex justify-end">
							<a href={`${import.meta.env.VITE_API_ADDRESS}generate-demographic-data-excel-data`} className=""><ExcelIcon /></a>
						</div>
						<div className="container mx-auto">
							<div className="mb-5 overflow-auto shadow">
								<table className="table-auto w-full" {...getTableProps()}>
									<thead className="text-sm font-bold border-b-2 border-black uppercase">
										{headerGroups.map((headerGroup) => (

											<tr
												className=""
												{...headerGroup.getHeaderGroupProps()}
											>
												{headerGroup.headers.map(

													(column) => (

														<th
															scope="col"
															className="py-2"
															{...column.getHeaderProps(

																column.getSortByToggleProps()
															)}
														>
															{column.render(

																"Header"
															)}
															<span>
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
													{row.cells.map(

														(cell) => {

															return (

																<td
																	className="px-1 py-1 text-xs"
																	{...cell.getCellProps()}
																>
																	{cell.render(

																		"Cell"
																	)}
																</td>
															);
														}
													)}
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
					<Transition.Root
						show={openModalCheckboxes}
						as={Fragment}
					>
						<Dialog
							as="div"
							className="relative z-10"
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
								<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
															className="text-base font-semibold leading-6 text-gray-900"
														>
															Visibilidad de
															Columnas
														</Dialog.Title>
														<div className="mt-2">
															<div className="overflow-hidden bg-white">
																<div className="">
																	<Checkbox
																		{...getToggleHideAllColumnsProps}
																	/>
																</div>
																{allColumns.map(

																	(

																		column
																	) => (

																		<div
																			className="text-sm"
																			key={

																				column.id
																			}
																		>
																			<label>
																				<input
																					className="text-indigo-600 focus:ring-indigo-500"
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
													className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-700 text-white px-4 py-2 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
													onClick={() =>
														setOpenModalCheckboxes(

															false
														)
													}
												>
													Volver al Reporte
												</button>
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</div>
						</Dialog>
					</Transition.Root>

					<Transition.Root show={createForm} as={Fragment}>
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
															datos demográficos
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
																			PAIS DE NACIMIENTO
																			<div className="flex">
																				<p className="italic font-bold text-md text-[15px] text-red-700 ">
																					*
																				</p>
																			</div>
																			{/*errors
																				.birth_department
																				?.type ===
																				"required" && (
																				)*/}
																		</label>
																		<select
																			value={country}
																			onChange={(e) => {
																				setCountry(e.target.value)
																				GetBirthDeartment(e.target.value)
																			}}
																			className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																		>
																			{dataCountries.map(

																				(

																					country
																				) => {

																					return (

																						<option
																							key={

																								country.ccn_country
																							}
																							value={

																								country.ccn_country
																							}
																						>
																							{
																								country.description_country
																							}
																						</option>
																					);
																				}
																			)}
																		</select>
																	</div>
																	{dataBirthDepartments.length != 0 || UpdateDemographicData ?
																		<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																			<label className="flex text-sm font-medium text-gray-700">
																				DEPARTAMENTO DE NACIMIENTO
																				<div className="flex">
																					<p className="italic font-bold text-md text-[15px] text-red-700 ">
																						*
																					</p>
																				</div>
																				{/*errors
																					.birth_department
																					?.type ===
																					"required" && (
																					)*/}
																			</label>
																			<select
																				value={birthDepartment}
																				onChange={(e) => {
																					setBirthDepartment(e.target.value)
																					GetBirthCity(e.target.value)
																				}}
																				className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																			>
																				{dataBirthDepartments.map(

																					(

																						departments
																					) => {

																						return (

																							<option
																								key={

																									departments.ccn_department
																								}
																								value={

																									departments.ccn_department
																								}
																							>
																								{

																									departments.descripcion_department
																								}
																							</option>
																						);
																					}
																				)}
																			</select>
																		</div>
																		: null}
																	{dataBirthCitys.length != 0 || UpdateDemographicData ?

																		<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																			<label className="flex text-sm font-medium text-gray-700">
																				CIUDAD DE NACIMIENTO
																				<div className="flex">
																					<p className="italic font-bold text-md text-[15px] text-red-700 ">
																						*
																					</p>
																				</div>
																				{/*errors
																					.birth_city
																					?.type ===
																					"required" && (
																					)*/}
																			</label>
																			<select
																				value={birthCity}
																				onChange={(e) => {
																					setBirthCity(e.target.value)
																				}}
																				className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																			>
																				{dataBirthCitys.map(

																					(

																						city
																					) => {

																						return (

																							<option
																								key={

																									city.ccn_city
																								}
																								value={

																									city.ccn_city
																								}
																							>
																								{

																									city.description_city
																								}
																							</option>
																						);
																					}
																				)}
																			</select>
																		</div>
																		: null}
																	<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																		<label className="flex text-sm font-medium text-gray-700">
																			PAIS DE RESIDENCIA
																			<div className="flex">
																				<p className="italic font-bold text-md text-[15px] text-red-700 ">
																					*
																				</p>
																			</div>
																			{/*errors
																				.birth_department
																				?.type ===
																				"required" && (
																				)*/}
																		</label>
																		<select
																			value={countryResidence}
																			onChange={(e) => {
																				setCountryResidence(e.target.value)
																				GetDeartmentResidence(e.target.value)
																			}}
																			className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																		>
																			{dataCountries.map(

																				(

																					country
																				) => {

																					return (

																						<option
																							key={

																								country.ccn_country
																							}
																							value={

																								country.ccn_country
																							}
																						>
																							{
																								country.description_country
																							}
																						</option>
																					);
																				}
																			)}
																		</select>
																	</div>
																	{dataDepartmentsRecidence.length != 0 || UpdateDemographicData ?
																		<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																			<label className="flex text-sm font-medium text-gray-700">
																				DEPARTAMENTO DE RESIDENCIA
																				<div className="flex">
																					<p className="italic font-bold text-md text-[15px] text-red-700 ">
																						*
																					</p>
																				</div>
																				{/*errors
																				.department_residence
																				?.type ===
																				"required" && (
																				)*/}
																			</label>
																			<select
																				value={departmentResidence}
																				onChange={(e) => {
																					setDepartmentResidence(e.target.value)
																					GetCityRecidence(e.target.value)
																				}}
																				className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																			>
																				{dataDepartments.map(

																					(

																						departments
																					) => {

																						return (

																							<option
																								key={

																									departments.ccn_department
																								}
																								value={

																									departments.ccn_department
																								}
																							>
																								{

																									departments.descripcion_department
																								}
																							</option>
																						);
																					}
																				)}
																			</select>
																		</div> : null}
																	{dataCitysRecidence.length != 0 || UpdateDemographicData ?
																		<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																			<label className="flex text-sm font-medium text-gray-700">
																				CIUDAD DE RESIDENCIA
																				<div className="flex">
																					<p className="italic font-bold text-md text-[15px] text-red-700 ">
																						*
																					</p>
																				</div>
																				{/*errors
																					.city_residence
																					?.type ===
																					"required" && (
																					)*/}
																			</label>
																			<select
																				value={cityResidence}
																				onChange={(e) => setCityResidence(e.target.value)}
																				className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																			>
																				{dataCitysRecidence.map(

																					(

																						city
																					) => {

																						return (

																							<option
																								key={

																									city.ccn_city
																								}
																								value={

																									city.ccn_city
																								}
																							>
																								{

																									city.description_city
																								}
																							</option>
																						);
																					}
																				)}
																			</select>
																		</div>
																		: null}
																	<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																		<label className="flex text-sm font-medium text-gray-700">
																			NIVEL DE ESCOLARIDAD
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

																					required: true,
																				}
																			)}
																			className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																		>
																			{dataSchoolingLevel.map(

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
																	<div className="relative h-10 mt-[25px] w-full min-w-[200px]">
																		<label className="flex text-sm font-medium text-gray-700">
																			RAZA
																			<div className="flex">
																				<p className="italic font-bold text-md text-[15px] text-red-700 ">
																					*
																				</p>
																			</div>
																			{/*errors
																				.ccn_race
																				?.type ===
																				"required" && (
																				)*/}
																		</label>
																		<select
																			{...register(

																				"ccn_race",
																				{

																					required: true,
																				}
																			)}
																			className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																		>
																			{dataRace.map(

																				(

																					race
																				) => {

																					return (

																						<option
																							key={

																								race.ccn_race
																							}
																							value={

																								race.ccn_race
																							}
																						>
																							{

																								race.description_race
																							}
																						</option>
																					);
																				}
																			)}
																		</select>
																	</div>
																	<div className="relative flex gap-x-3 my-3 w-[450px]">
																		<div className="flex h-6 ml-3 my-3 items-center">
																			<input
																				{...register("is_head_of_household", {

																					required: false,
																				})}
																				name="is_head_of_household"
																				type="checkbox"
																				className="h-5 w-5 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
																			/>
																		</div>
																		<div className="text-sm my-3 leading-6">
																			<label htmlFor="manager_approval" className="font-medium text-gray-900">
																				<strong>Es Cabeza de Hogar</strong>
																			</label>
																		</div>
																	</div>
																	<div className="bg-gray-50 px-4 py-3 sm:flex  sm:px-6">
																		<button
																			type="button"
																			className="mr-4 bg-white tracking-wide text-gray-900 text-sm font-bold rounded border-b-2 border-sky-900 hover:border-sky-900 hover:bg-sky-900 hover:text-white shadow-md py-2 px-5 inline-flex items-center"
																			onClick={() =>
																				setCreateForm(
																					!createForm
																				)
																			}
																		>
																			CERRAR
																		</button>
																		<input
																			value={UpdateDemographicData ? "ACTUALIZAR" : "CREAR"}
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


					<EditDemographicData />
				</div>
				:
				<div className="h-[100%] container mx-auto flex items-center">
					<IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
				</div>}

		</>
	);
};

export default DemographicData;