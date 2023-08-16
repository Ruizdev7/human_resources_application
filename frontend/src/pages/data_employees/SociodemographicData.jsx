import React, { useMemo } from "react";

import { useState, useEffect, Fragment, useRef } from "react";

import axios from "axios";
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
import { FcPlus, FcUp, FcDown } from "react-icons/fc";
import { RxEyeNone, RxPencil2 } from "react-icons/rx";
import { IsotipoPlena, ExcelIcon } from "../../assets/images/SVG";
import { TiArrowBackOutline } from "react-icons/ti";
import { GlobalFilter } from "../../components/GlobalFilter";
import { useGetAllSociodemographicDataQuery } from "../../redux_app/services/sociodemographicDataAPI";

const SociodemographicData = () => {
    const [open, setOpen] = useState(true);
    const [openModalCheckboxes, setOpenModalCheckboxes] = useState(false);
    const [openModalForms, setOpenModalForms] = useState(false);
    const cancelButtonRef = useRef(null);
    const [dataEmployees, setDataEmployees] = useState([]);
    const [DataHouseType, setDataHouseType] = useState([]);
    const [DataSubhouseType, setDataSubhouseType] = useState([]);
    const [SociodemographicData, setSociodemographicData] = useState([]);
    const [UpdateSociodemographicData, setUpdateSociodemographicData] = useState(null);
    const [Method, setMethod] = useState("");
    const getSociodemographicData = async () => {
        try {
            const resEmployees = await axios(
                `${import.meta.env.VITE_API_ADDRESS}employee`
            );
            for (const employee of resEmployees.data.Employees) {
                dataEmployees.push({
                    ccn_employee: employee.ccn_employee,
                    full_name_employee: employee.full_name_employee,
                });
            }
            const respHouseType = await axios(`${import.meta.env.VITE_API_ADDRESS}house_type`);
            for (const houseType of respHouseType.data.HouseType) {
                DataHouseType.push({
                    ccn_house_type: houseType.ccn_house_type,
                    house_type: houseType.house_type,
                });
            }
            const respSubhouseType = await axios(
                `${import.meta.env.VITE_API_ADDRESS}subhouse_type`
            );
            for (const gender of respSubhouseType.data.SubHouseType) {
                DataSubhouseType.push({
                    ccn_sub_house_type: gender.ccn_sub_house_type,
                    sub_house_type: gender.sub_house_type,
                });
            }
            const resSociodemographicData = await axios(
                `${import.meta.env.VITE_API_ADDRESS}sociodemographic_data`
            );
            setSociodemographicData(resSociodemographicData.data.SociodemographicData)
        } catch (error) {
            console.log(error);
        }
    };

    if (!DataHouseType && !DataSubhouseType && !dataEmployees) return <></>;
    useEffect(() => {
        getSociodemographicData();
    }, []);


    function OpenColumnVisibility() {
        setOpenModalCheckboxes(!openModalCheckboxes);
    }

    const data = SociodemographicData ? SociodemographicData : [];

    const COLUMNS = [
        {
            Header: "CCN",
            Footer: "CCN",
            accessor: "ccn_sociodemographic_data",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
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
            Header: "Personas a Cargo",
            Footer: "Personas a Cargo",
            accessor: "other_dependents",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "No. Personas en el Hogar",
            Footer: "No. Personas en el Hogar",
            accessor: "relatives",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Personas a Cargo",
            Footer: "Personas a Cargo",
            accessor: "how_many_people_in_change",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Personas en situación de discapacidad",
            Footer: "Personas en situación de discapacidad",
            accessor: "people_with_disabilities",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Ingresos Familiares Mensuales",
            Footer: "Ingresos Familiares Mensuales",
            accessor: "monthly_income",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Los gatos alcanzan para cubrir los gastos mínimos",
            Footer: "Los gatos alcanzan para cubrir los gastos mínimos",
            accessor: "is_income_enougth",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Tipo de vivienda",
            Footer: "Tipo de vivienda",
            accessor: "house_type",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>
                    <p>
                        {row.value}
                    </p>
                </div>
            ),
        },
        {
            Header: "Características de la vivienda",
            Footer: "Características de la vivienda",
            accessor: "sub_house_type",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>
                    <p>
                        {row.value}
                    </p>
                </div>
            ),
        },
        {
            Header: "Zona en la que se ubica",
            Footer: "Zona en la que se ubica",
            accessor: "where_its_located",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Dirección de residencia",
            Footer: "Dirección de residencia",
            accessor: "residence_address",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Barrio",
            Footer: "Barrio",
            accessor: "neighborhood",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Tipo de transporte para ir al trabajo",
            Footer: "Tipo de transporte para ir al trabajo",
            accessor: "type_transportation",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Tipo de transporte opcional para ir al trabajo",
            Footer: "Tipo de transporte opcional para ir al trabajo",
            accessor: "type_transportation_2",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Estrato de servicios públicos",
            Footer: "Estrato de servicios públicos",
            accessor: "social_stratum",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Emergencia eléctrica",
            Footer: "Emergencia eléctrica",
            accessor: "electric_power",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Alcantarillado",
            Footer: "Alcantarillado",
            accessor: "sewerage",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Acueducto",
            Footer: "Acueducto",
            accessor: "aqueduct",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Gas natural red pública",
            Footer: "Gas natural red pública",
            accessor: "natural_gas",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Recolección de basuras",
            Footer: "Recolección de basuras",
            accessor: "garbage_collection",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Teléfono fijo",
            Footer: "Teléfono fijo",
            accessor: "landline",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Tiene deudas",
            Footer: "Tiene deudas",
            accessor: "debts",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Interés en refinanciar las deudas y consolidarlas",
            Footer: "Interés en refinanciar las deudas y consolidarlas",
            accessor: "debt_refinancing",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "En su hogar hay computador",
            Footer: "En su hogar hay computador",
            accessor: "computer_at_home",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Tiene acceso a internet",
            Footer: "Tiene acceso a internet",
            accessor: "have_internet_access",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
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
                                    specificSociodemograpichData(row);
                                    EditSociodemograpichData();
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

    const specificSociodemograpichData = async (ccn_sociodemographic_data) => {
        try {
            const SociodemographicData = await axios(
                `${import.meta.env.VITE_API_ADDRESS}sociodemographic_data/${ccn_sociodemographic_data.cells[0].value}`
            );
            setUpdateSociodemographicData(SociodemographicData.data.SociodemographicData);
        } catch (error) { }
    };

    const EditSociodemograpichData = () => {
        try {
            if (!UpdateSociodemographicData) {
                specificSociodemograpichData();
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
                ccn_employee: UpdateSociodemographicData
                    ? UpdateSociodemographicData.ccn_employee
                    : "",
                other_dependents: UpdateSociodemographicData
                    ? UpdateSociodemographicData.other_dependents
                    : "",
                relatives: UpdateSociodemographicData
                    ? UpdateSociodemographicData.relatives
                    : "",
                how_many_people_in_change: UpdateSociodemographicData
                    ? UpdateSociodemographicData.how_many_people_in_change
                    : "",
                people_with_disabilities: UpdateSociodemographicData
                    ? UpdateSociodemographicData.people_with_disabilities
                    : "",
                monthly_income: UpdateSociodemographicData
                    ? UpdateSociodemographicData.monthly_income
                    : "",
                is_income_enougth: UpdateSociodemographicData
                    ? UpdateSociodemographicData.is_income_enougth
                    : "",
                ccn_sub_house_type: UpdateSociodemographicData
                    ? UpdateSociodemographicData.ccn_sub_house_type
                    : "",
                ccn_house_type: UpdateSociodemographicData
                    ? UpdateSociodemographicData.ccn_house_type
                    : "",
                where_its_located: UpdateSociodemographicData
                    ? UpdateSociodemographicData.where_its_located
                    : "",
                residence_address: UpdateSociodemographicData
                    ? UpdateSociodemographicData.residence_address
                    : "",
                neighborhood: UpdateSociodemographicData
                    ? UpdateSociodemographicData.neighborhood
                    : "",
                type_transportation: UpdateSociodemographicData
                    ? UpdateSociodemographicData.type_transportation
                    : "",
                type_transportation_2: UpdateSociodemographicData
                    ? UpdateSociodemographicData.type_transportation_2
                    : "",
                social_stratum: UpdateSociodemographicData
                    ? UpdateSociodemographicData.social_stratum
                    : "",
                electric_power: UpdateSociodemographicData
                    ? UpdateSociodemographicData.electric_power
                    : "",
                sewerage: UpdateSociodemographicData
                    ? UpdateSociodemographicData.sewerage
                    : "",
                aqueduct: UpdateSociodemographicData
                    ? UpdateSociodemographicData.aqueduct
                    : "",
                natural_gas: UpdateSociodemographicData
                    ? UpdateSociodemographicData.natural_gas
                    : "",
                garbage_collection: UpdateSociodemographicData
                    ? UpdateSociodemographicData.garbage_collection
                    : "",
                landline: UpdateSociodemographicData
                    ? UpdateSociodemographicData.landline
                    : "",
                debts: UpdateSociodemographicData
                    ? UpdateSociodemographicData.debts
                    : "",
                debt_refinancing: UpdateSociodemographicData
                    ? UpdateSociodemographicData.debt_refinancing
                    : "",
                computer_at_home: UpdateSociodemographicData
                    ? UpdateSociodemographicData.computer_at_home
                    : "",
                have_internet_access: UpdateSociodemographicData
                    ? UpdateSociodemographicData.have_internet_access
                    : "",
            },
        });



        const onSubmit = async (data) => {
            const body = {
                ccn_sociodemographic_data: 1,
                ccn_employee: data.ccn_employee,
                other_dependents: data.other_dependents,
                relatives: data.relatives,
                how_many_people_in_change: data.how_many_people_in_change,
                people_with_disabilities: data.people_with_disabilities,
                monthly_income: data.monthly_income,
                is_income_enougth: data.is_income_enougth,
                ccn_sub_house_type: data.ccn_sub_house_type,
                ccn_house_type: data.ccn_house_type,
                where_its_located: data.where_its_located,
                residence_address: data.residence_address,
                neighborhood: data.neighborhood,
                type_transportation: data.type_transportation,
                type_transportation_2: data.type_transportation_2,
                social_stratum: data.social_stratum,
                electric_power: data.electric_power,
                sewerage: data.sewerage,
                aqueduct: data.aqueduct,
                natural_gas: data.natural_gas,
                garbage_collection: data.garbage_collection,
                landline: data.landline,
                debts: data.debts,
                debt_refinancing: data.debt_refinancing,
                computer_at_home: data.computer_at_home,
                have_internet_access: data.have_internet_access,
            };

            console.log(body);
            if (Method === "POST") {
                const response = await axios
                    .post(`${import.meta.env.VITE_API_ADDRESS}sociodemographic_data`, body, {
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
                        `${import.meta.env.VITE_API_ADDRESS}sociodemographic_data/${UpdateSociodemographicData.ccn_sociodemographic_data}`,
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

                        <div className="fixed inset-0  uppercase overflow-hidden">
                            <div className="absolute inset -0 overflow-hidden">
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
                                                        Datos Sociodemográficos
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
                                                                        OTROS DEPENDEN DE USTED
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .other_dependents
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "other_dependents",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="SI">SI</option>
                                                                        <option value="NO">NO</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        No. DE PERSONAS EN EL HOGAR
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .relatives
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                        placeholder=" "
                                                                        {...register(
                                                                            "relatives",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        CUANTAS PERSONAS A CARGO
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .how_many_people_in_change
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                        placeholder=" "
                                                                        {...register(
                                                                            "how_many_people_in_change",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        No. DE PERSONAS EN CONDICION DE DISCAPACIDAD
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .people_with_disabilities
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <input
                                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                        placeholder=" "
                                                                        type="number"
                                                                        {...register(
                                                                            "people_with_disabilities",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        INGRESOS FAMILIARES MENSUALES SMLMV
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .monthly_income
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                        placeholder=" "
                                                                        {...register(
                                                                            "monthly_income",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        LOS INGRESOS ALCANZAN PARA CUBRIR LOS GASTOS MINIMOS
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .is_income_enougth
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "is_income_enougth",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="SI">SI</option>
                                                                        <option value="NO">NO</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        TIPO DE VIVIENDA
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .ccn_house_type
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "ccn_house_type",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        {DataHouseType.map(
                                                                            (
                                                                                housetype
                                                                            ) => {
                                                                                return (
                                                                                    <option
                                                                                        key={
                                                                                            housetype.ccn_house_type
                                                                                        }
                                                                                        value={
                                                                                            housetype.ccn_house_type
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            housetype.house_type
                                                                                        }
                                                                                    </option>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        CARACTICAS DE LA VIVIENDA
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .ccn_sub_house_type
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "ccn_sub_house_type",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        {DataSubhouseType.map(
                                                                            (
                                                                                subhousetype
                                                                            ) => {
                                                                                return (
                                                                                    <option
                                                                                        key={
                                                                                            subhousetype.ccn_sub_house_type
                                                                                        }
                                                                                        value={
                                                                                            subhousetype.ccn_sub_house_type
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            subhousetype.sub_house_type
                                                                                        }
                                                                                    </option>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        ZONA EN LA QUE SE UBICA
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .where_its_located
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "where_its_located",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="RURAL">RURAL</option>
                                                                        <option value="URBANA">URBANA</option>
                                                                        <option value="SUBURBANA">SUBURBANA</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        DIRECCION DE RESIDENCIA
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .residence_address
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                        placeholder=" "
                                                                        {...register(
                                                                            "residence_address",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        BARRIO
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .neighborhood
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                        placeholder=" "
                                                                        {...register(
                                                                            "neighborhood",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        TIPO DE TRANSPORTE PARA IR AL TRABAJO
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .where_its_located
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "type_transportation",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="RUTA">RUTA</option>
                                                                        <option value="CAMINANDO">CAMINANDO</option>
                                                                        <option value="BICICLETA">BICICLETA</option>
                                                                        <option value="MOTO">MOTO</option>
                                                                        <option value="VEHICULO PARTICULAR">VEHICULO PARTICULAR</option>
                                                                        <option value="TRANSPORTE PUBLICO">TRANSPORTE PUBLICO</option>
                                                                        <option value="OTRO">OTRO</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        TIPO DE TRANSPORTE PARA IR AL TRABAJO (OPCIONAL)
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .type_transportation_2
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "type_transportation_2",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="RUTA">RUTA</option>
                                                                        <option value="CAMINANDO">CAMINANDO</option>
                                                                        <option value="BICICLETA">BICICLETA</option>
                                                                        <option value="MOTO">MOTO</option>
                                                                        <option value="VEHICULO PARTICULAR">VEHICULO PARTICULAR</option>
                                                                        <option value="TRANSPORTE PUBLICO">TRANSPORTE PUBLICO</option>
                                                                        <option value="OTRO">OTRO</option>
                                                                        <option value=" ">NO APLICA</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        ESTRATO DE SERVICIOS PUBLICOS
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .social_stratum
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "social_stratum",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                        <option value="6">6</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        CUENTA CON ENERGIA ELECTRICA?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .electric_power
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "electric_power",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="SI">SI</option>
                                                                        <option value="NO">NO</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        CUENTA CON ALCANTARILLADO ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .sewerage
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "sewerage",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="SI">SI</option>
                                                                        <option value="NO">NO</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        CUENTA CON ACUEDUCTO ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .aqueduct
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "aqueduct",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="SI">SI</option>
                                                                        <option value="NO">NO</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        CUENTA CON GAS NATURAL ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .natural_gas
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "natural_gas",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="SI">SI</option>
                                                                        <option value="NO">NO</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        CUENTA CON RECOLECCION DE BASURAS ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .garbage_collection
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "garbage_collection",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="SI">SI</option>
                                                                        <option value="NO">NO</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        CUENTA CON TELEFONO FIJO ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .landline
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "landline",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="SI">SI</option>
                                                                        <option value="NO">NO</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        TIENE DEUDAS ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .debts
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "debts",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="SI">SI</option>
                                                                        <option value="NO">NO</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative mb-5 h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        ESTA INSTERESADO EN REFINANCIAR LAS DEUDAS Y CONSOLIDARLAS EN UN SOLO CREDITO ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .debt_refinancing
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "debt_refinancing",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="SI">SI</option>
                                                                        <option value="NO">NO</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[50px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        EN SU HOGAR HAY COMPUTADOR ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .computer_at_home
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "computer_at_home",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="SI">SI</option>
                                                                        <option value="NO">NO</option>
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        TIENE ACCESO A INTERNET ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .have_internet_access
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "have_internet_access",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="SI">SI</option>
                                                                        <option value="NO">NO</option>
                                                                    </select>
                                                                </div>

                                                                <div className="bg-gray-50 px-4 mt-5 py-3 sm:flex  sm:px-6">
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
                                                                        value={UpdateSociodemographicData ? "ACTUALIZAR" : "CREAR"}
                                                                        type="submit"
                                                                        className="bg-white tracking-wide text-gray-900 text-sm font-bold rounded border-b-2 border-[#007367] cursor-pointer hover:border-[#007367] hover:bg-[#007367]  hover:text-white shadow-md py-2 px-5 inline-flex items-center"
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
            {SociodemographicData.length != 0 ?
                <div className="container mx-auto px-2 uppercase py-2 bg-white shadow-md shadow-emerald-900">
                    <div className="container mx-auto">
                        <div className="flex">
                            <h3 className="py-2 text-2xl text-slate-900 uppercase font-extrabold">
                                Datos Sociodemográficos
                            </h3>
                            <button
                                className=""
                                onClick={() => {
                                    setMethod("POST");
                                    setUpdateSociodemographicData();
                                    setOpenModalForms(!openModalForms);
                                }}
                            >
                                <FcPlus className="w-10 h-10" />
                            </button>
                        </div>
                        <div className="w-full flex justify-end">
                            <a href={`${import.meta.env.VITE_API_ADDRESS}generate-datos-sociodemograficos-excel-data`} className=""><ExcelIcon /></a>
                        </div>

                        <div className="container mx-auto">
                            <div className="mb-5 overflow-auto shadow">
                                <table className="table-auto w-full" {...getTableProps()}>
                                    <thead className="bg-gray-200 border-b-2 border-gray-200  uppercase">
                                        {headerGroups.map((headerGroup) => (
                                            <tr
                                                className=" "
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
                    <EditSociodemograpichData />
                </div>
                :
                <div className="h-[100%] container mx-auto flex items-center">
                    <IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
                </div>}
        </>
    );
};

export default SociodemographicData;
