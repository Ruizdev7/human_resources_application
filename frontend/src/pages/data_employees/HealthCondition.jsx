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
import { useGetAllHealthConditionQuery } from "../../redux_app/services/healthConditionAPI";
import { Dialog, Transition } from "@headlessui/react";
//import { ExclamationTriangleIcon } from "@heroicons/react/outline";
import { IsotipoPlena, ExcelIcon } from "../../assets/images/SVG";
import { Checkbox } from "../../components/Checkbox";
import { FcPlus, FcUp, FcDown } from "react-icons/fc";
import { RxEyeNone, RxPencil2 } from "react-icons/rx";
import { TiArrowBackOutline } from "react-icons/ti";

import { GlobalFilter } from "../../components/GlobalFilter";


const HealthCondition = () => {
    const [open, setOpen] = useState(true);
    const [openModalCheckboxes, setOpenModalCheckboxes] = useState(false);
    const [openModalForms, setOpenModalForms] = useState(false);
    const cancelButtonRef = useRef(null);
    const [loadingData, setLoadingData] = useState(true);
    const [DataEmployees, setDataEmployees] = useState([]);
    const [DataDiseases, setDataDiseases] = useState([]);
    const [HealthCondition, setHealthCondition] = useState([]);
    const [UpdateHealthCondition, setUpdateHealthCondition] = useState(null);
    const [Method, setMethod] = useState("");

    const GetRelationShipData = async () => {
        //Call to the API's with relationship
        const respEmployees = await axios(`${import.meta.env.VITE_API_ADDRESS}employee`);
        const respHouseType = await axios(`${import.meta.env.VITE_API_ADDRESS}diseases`);
        const resHealthCondition = await axios(`${import.meta.env.VITE_API_ADDRESS}health_condition`);
        //Clean the API's responses
        const Employees = respEmployees.data.Employees;
        const Diseases = respHouseType.data.Diseases;

        //Set relationship variables
        setDataEmployees(Employees);
        setDataDiseases(Diseases);
        setHealthCondition(resHealthCondition.data.HealthCondition);
    };

    if (!DataDiseases && !DataEmployees) return <></>;
    useEffect(() => {
        GetRelationShipData();
    }, []);

    function OpenColumnVisibility() {
        setOpenModalCheckboxes(!openModalCheckboxes);
    }

    const data = HealthCondition ? HealthCondition : [];

    const COLUMNS = [
        {
            Header: "CCN",
            Footer: "CCN",
            accessor: "ccn_health_condition",
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
            Header: "Consume bebidas alcohólicas",
            Footer: "Consume bebidas alcohólicas",
            accessor: "consume_alcoholic_beverages",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Enfermedades",
            Footer: "Enfermedades",
            accessor: "diseases",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>
                    <p>
                        {row.value}
                    </p>
                </div>
            ),
        },
        {
            Header: "Alergias",
            Footer: "Alergias",
            accessor: "allergies",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Cuales Alergias",
            Footer: "Cuales Alergias",
            accessor: "what_allergy",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Medicamentos",
            Footer: "Medicamentos",
            accessor: "medicines",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Cuales medicamentos",
            Footer: "Cuales medicamentos",
            accessor: "what_medicin",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Última consulta médica",
            Footer: "Última consulta médica",
            accessor: "last_medical_consultation",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Ha sentido que debe ingerir menos alcohol",
            Footer: "Ha sentido que debe ingerir menos alcohol",
            accessor: "plan_to_drink_less_alcoholic_beverages",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Le molesta que lo critiquen por tomar alcohol",
            Footer: "Le molesta que lo critiquen por tomar alcohol",
            accessor: "discomfort_due_to_criticism_when_ingesting_alcohol",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Ha sentido necesidad de ingerir alcohol en las mañanas",
            Footer: " Ha sentido necesidad de ingerir alcohol en las mañanas ",
            accessor: "need_to_drink_alcohol_in_the_morning",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Práctica deporte 3 veces por semana, mínimo 30 minutos",
            Footer: "Práctica deporte 3 veces por semana, mínimo 30 minutos ",
            accessor: "physical_activity_3_times_a_week_30_minutes",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "fumador",
            Footer: "fumador",
            accessor: "he_is_a_smoker",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Cuantos cigarrillos al día",
            Footer: "Cuantos cigarrillos al día",
            accessor: "how_many_cigarettes_a_day",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "exfumador",
            Footer: "exfumador",
            accessor: "he_is_ex_smoker",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Consume sustancias psicoactivas",
            Footer: "Consume sustancias psicoactivas",
            accessor: "consume_psychoactive_substances",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Ha consumido sustancias psicoactivas",
            Footer: "Ha consumido sustancias psicoactivas",
            accessor: "used_psychoactive_substances_before",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Cuales sustancias psicoactivas",
            Footer: "Cuales sustancias psicoactivas",
            accessor: "what_psychoactive_substances",
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
                                    specificHealthCondition(row);
                                    EditHealthCondition();
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

    const specificHealthCondition = async (ccn_sociodemographic_data) => {
        try {
            const HealthCondition = await axios(
                `${import.meta.env.VITE_API_ADDRESS}health_condition/${ccn_sociodemographic_data.cells[0].value}`
            );
            setUpdateHealthCondition(HealthCondition.data.HealthCondition);
        } catch (error) { }
    };

    const EditHealthCondition = () => {
        try {
            if (!UpdateHealthCondition) {
                specificHealthCondition();
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
                ccn_employee: UpdateHealthCondition
                    ? UpdateHealthCondition.ccn_employee
                    : "",
                consume_alcoholic_beverages: UpdateHealthCondition
                    ? UpdateHealthCondition.consume_alcoholic_beverages
                    : "",
                ccn_diseases: UpdateHealthCondition
                    ? UpdateHealthCondition.ccn_diseases
                    : "",
                allergies: UpdateHealthCondition
                    ? UpdateHealthCondition.allergies
                    : "",
                what_allergy: UpdateHealthCondition
                    ? UpdateHealthCondition.what_allergy
                    : "",
                medicines: UpdateHealthCondition
                    ? UpdateHealthCondition.medicines
                    : "",
                what_medicin: UpdateHealthCondition
                    ? UpdateHealthCondition.what_medicin
                    : "",
                last_medical_consultation: UpdateHealthCondition
                    ? UpdateHealthCondition.last_medical_consultation
                    : "",
                plan_to_drink_less_alcoholic_beverages: UpdateHealthCondition
                    ? UpdateHealthCondition.plan_to_drink_less_alcoholic_beverages
                    : "",
                discomfort_due_to_criticism_when_ingesting_alcohol: UpdateHealthCondition
                    ? UpdateHealthCondition.discomfort_due_to_criticism_when_ingesting_alcohol
                    : "",
                need_to_drink_alcohol_in_the_morning: UpdateHealthCondition
                    ? UpdateHealthCondition.need_to_drink_alcohol_in_the_morning
                    : "",
                physical_activity_3_times_a_week_30_minutes: UpdateHealthCondition
                    ? UpdateHealthCondition.physical_activity_3_times_a_week_30_minutes
                    : "",
                he_is_a_smoker: UpdateHealthCondition
                    ? UpdateHealthCondition.he_is_a_smoker
                    : "",
                how_many_cigarettes_a_day: UpdateHealthCondition
                    ? UpdateHealthCondition.how_many_cigarettes_a_day
                    : "",
                he_is_ex_smoker: UpdateHealthCondition
                    ? UpdateHealthCondition.he_is_ex_smoker
                    : "",
                consume_psychoactive_substances: UpdateHealthCondition
                    ? UpdateHealthCondition.consume_psychoactive_substances
                    : "",
                used_psychoactive_substances_before: UpdateHealthCondition
                    ? UpdateHealthCondition.used_psychoactive_substances_before
                    : "",
                what_psychoactive_substances: UpdateHealthCondition
                    ? UpdateHealthCondition.what_psychoactive_substances
                    : ""
            },
        });

        const onSubmit = async (data) => {
            const body = {
                ccn_health_condition: 1,
                ccn_employee: data.ccn_employee,
                consume_alcoholic_beverages: data.consume_alcoholic_beverages,
                ccn_diseases: data.ccn_diseases,
                allergies: data.allergies,
                what_allergy: data.what_allergy || "",
                medicines: data.medicines,
                what_medicin: data.what_medicin || "",
                last_medical_consultation: data.last_medical_consultation,
                plan_to_drink_less_alcoholic_beverages: data.plan_to_drink_less_alcoholic_beverages,
                discomfort_due_to_criticism_when_ingesting_alcohol: data.discomfort_due_to_criticism_when_ingesting_alcohol,
                need_to_drink_alcohol_in_the_morning: data.need_to_drink_alcohol_in_the_morning,
                physical_activity_3_times_a_week_30_minutes: data.physical_activity_3_times_a_week_30_minutes,
                he_is_a_smoker: data.he_is_a_smoker,
                how_many_cigarettes_a_day: data.how_many_cigarettes_a_day || 0,
                he_is_ex_smoker: data.he_is_ex_smoker,
                consume_psychoactive_substances: data.consume_psychoactive_substances,
                used_psychoactive_substances_before: data.used_psychoactive_substances_before,
                what_psychoactive_substances: data.what_psychoactive_substances || "",
            };

            if (Method === "POST") {
                const response = await axios
                    .post(`${import.meta.env.VITE_API_ADDRESS}health_condition`, body, {
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
                        `${import.meta.env.VITE_API_ADDRESS}health_condition/${UpdateHealthCondition.ccn_health_condition}`,
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
                                                        Datos de Estado de Salud
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
                                                                        {DataEmployees.map(
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
                                                                        CONSUME BEBIDAS ALCOHOLICAS ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .consume_alcoholic_beverages
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "consume_alcoholic_beverages",
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
                                                                        ENFERMEDADES ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .ccn_diseases
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "ccn_diseases",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        {DataDiseases.map(
                                                                            (
                                                                                Diseases
                                                                            ) => {
                                                                                return (
                                                                                    <option
                                                                                        key={
                                                                                            Diseases.ccn_diseases
                                                                                        }
                                                                                        value={
                                                                                            Diseases.ccn_diseases
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            Diseases.diseases
                                                                                        }
                                                                                    </option>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        ALERGIAS ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .allergies
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "allergies",
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
                                                                        CUALES ALERGIAS ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .what_allergy
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                        placeholder=" "
                                                                        {...register(
                                                                            "what_allergy",
                                                                            {
                                                                                required: false,
                                                                            }
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        CONSUME MEDICAMENTOS ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .medicines
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "medicines",
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
                                                                        CUALES MEDICAMENTOS ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .what_medicin
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                        placeholder=" "
                                                                        {...register(
                                                                            "what_medicin",
                                                                            {
                                                                                required: false,
                                                                            }
                                                                        )}
                                                                    />
                                                                </div>



                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        HACE CUANTO FUE SU ULTIMA CONSULTA MEDICA ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .last_medical_consultation
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "last_medical_consultation",
                                                                            {
                                                                                required: false,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option value="MENOR DE 3 MESES">MENOR DE 3 MESES</option>
                                                                        <option value="HACE 5 MESES">HACE 5 MESES</option>
                                                                        <option value="MAYOR A 6 MESES">MAYOR A 6 MESES</option>
                                                                        <option value="NO CONTESTA">NO CONTESTA</option>
                                                                    </select>
                                                                </div>


                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        HA SENTIDO ALGUNA VEZ QUE DEBE INGERIR MENOR CANTIDAD DE BEBIDAS ALCOHOLICAS ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .plan_to_drink_less_alcoholic_beverages
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "plan_to_drink_less_alcoholic_beverages",
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
                                                                        LE HA MOLESTADO QUE LA GENTE LO CRITIQUE POR SU FORMA DE INGERIR BEBIDAS ALCOHOLICAS ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .discomfort_due_to_criticism_when_ingesting_alcohol
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "discomfort_due_to_criticism_when_ingesting_alcohol",
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
                                                                        ALGUNA VEZ HA SENTIDO LA NECESIDAD DE INGERIR BEBIDAS ALCOHOLICAS EN LA MAÑANA ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .need_to_drink_alcohol_in_the_morning
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "need_to_drink_alcohol_in_the_morning",
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
                                                                        PRACTICA ACTIVIDAD FISICA POR LO MENOS 3 VECES A LA SEMANA POR 30 MINUTOS MINIMO ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .physical_activity_3_times_a_week_30_minutes
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "physical_activity_3_times_a_week_30_minutes",
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
                                                                        ES FUMADOR ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .he_is_a_smoker
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "he_is_a_smoker",
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
                                                                        CUANTOS CIGARRILLOS ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .how_many_cigarettes_a_day
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                        placeholder=" "
                                                                        {...register(
                                                                            "how_many_cigarettes_a_day",
                                                                            {
                                                                                required: false,
                                                                            }
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        USTED ES EX EXFUMADOR ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .he_is_ex_smoker
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "he_is_ex_smoker",
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
                                                                        CONSUME SUSTANCIAS PSICOACTIVAS ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .consume_psychoactive_substances
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "consume_psychoactive_substances",
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
                                                                        HA CONSUMIDO SUSTANCIAS PSICOACTIVAS ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .used_psychoactive_substances_before
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "used_psychoactive_substances_before",
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
                                                                        CUAL O CUALES SUSTANCIAS PSICOACTIVIDAD ?
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .what_psychoactive_substances
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                        placeholder=" "
                                                                        {...register(
                                                                            "what_psychoactive_substances",
                                                                            {
                                                                                required: false,
                                                                            }
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="bg-gray-50 px-4 py-3 MT-5 sm:flex  sm:px-6">
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
                                                                        value={UpdateHealthCondition ? "ACTUALIZAR" : "CREAR"}
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
            {HealthCondition != 0 ?
                <div className="container mx-auto px-2 py-2 bg-white shadow-md shadow-emerald-900">
                    <div className="container mx-auto">
                        <div className="flex">
                            <h3 className="py-2 text-2xl text-slate-900 uppercase font-extrabold">
                                Datos de Estado de Salud
                            </h3>
                            <button
                                className=""
                                onClick={() => {
                                    setMethod("POST");
                                    setUpdateHealthCondition();
                                    setOpenModalForms(!openModalForms);
                                }}
                            >
                                <FcPlus className="w-10 h-10" />
                            </button>
                        </div>
                        <div className="w-full flex justify-end">
                            <a href={`${import.meta.env.VITE_API_ADDRESS}generate-health-condition-excel-data`} className=""><ExcelIcon /></a>
                        </div>

                        <div className="container mx-auto uppercase">
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
                    <EditHealthCondition />
                </div> :
                <div className="h-[100%] container mx-auto flex items-center">
                    <IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
                </div>}
        </>
    );
};

export default HealthCondition;
