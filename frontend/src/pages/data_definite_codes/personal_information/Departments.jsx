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

import { Checkbox } from "../../../components/Checkbox";
import { FcPlus, FcUp, FcDown } from "react-icons/fc";
import { RxEyeNone, RxPencil2 } from "react-icons/rx";
import { TiArrowBackOutline } from "react-icons/ti";
import { GlobalFilter } from "../../../components/GlobalFilter";

const Departments = () => {
    const [open, setOpen] = useState(true);
    const [openModalCheckboxes, setOpenModalCheckboxes] = useState(false);
    const [openModalForms, setOpenModalForms] = useState(false);
    const cancelButtonRef = useRef(null);
    const [loadingData, setLoadingData] = useState(true);
    const [DataCountrys, setDataCountrys] = useState([]);
    const [DataDepartments, setDataDepartments] = useState([]);
    const [UpdateDepartment, setUpdateDepartment] = useState(null);
    const [Method, setMethod] = useState("");

    const getDepartments = async () => {
        try {
            const respCountry = await axios(
                `${import.meta.env.VITE_API_ADDRESS}country`
            );
            for (const country of respCountry.data.Country) {
                DataCountrys.push({
                    ccn_country: country.ccn_country,
                    description_country: country.description_country,
                });
            }
            const respDepartment = await axios(
                `${import.meta.env.VITE_API_ADDRESS}department`
            );
            setDataDepartments(respDepartment.data.Department);
        } catch (error) {
            console.log(error);
        }
    };

    //Get all foreign key's, only once
    //if (!dataTypeID && !DataGender && !DataAgeRange && !DataRH) { GetDataEmployees(); };

    if (!DataDepartments) return <></>;
    useEffect(() => {
        getDepartments();
    }, []);

    function OpenColumnVisibility() {
        setOpenModalCheckboxes(!openModalCheckboxes);
    }

    const data = DataDepartments;

    const COLUMNS = [
        {
            Header: "CCN",
            Footer: "CCN",
            accessor: "ccn_department",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Código del departamento",
            Footer: "Código del departamento",
            accessor: "id_department",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "Departamentos",
            Footer: "Departamentos",
            accessor: "descripcion_department",
            Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
        },
        {
            Header: "País",
            Footer: "País",
            accessor: "ccn_country",
            Cell: (row) => (
                <div style={{ textAlign: "letf" }}>
                    <p>
                        {DataCountrys.length != 0
                            ? DataCountrys.find(
                                (country) =>
                                    country.ccn_country === row.value
                            ).description_country
                            : row.value}
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
                                    specificDepartment(row);
                                    EditDepartment();
                                }}>
                                <RxPencil2 className="h-5 w-5" />
                            </button>
                        </div>
                    </>
                );
            },
        },
    ];

    const specificDepartment = async (ccn_department) => {
        try {
            const respDepartment = await axios(
                `${import.meta.env.VITE_API_ADDRESS}department/${ccn_department.cells[0].value}`
            );
            setUpdateDepartment(respDepartment.data.Department);
        } catch (error) { }
    };

    const EditDepartment = () => {
        try {
            if (!UpdateDepartment) {
                specificDepartment();
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
                ccn_country: UpdateDepartment
                    ? UpdateDepartment.ccn_country
                    : 0,
                descripcion_department: UpdateDepartment
                    ? UpdateDepartment.descripcion_department
                    : 0,
                id_department: UpdateDepartment
                    ? UpdateDepartment.id_department
                    : 0,
                ccn_department: UpdateDepartment ? UpdateDepartment.ccn_department : 0,
            },
        });

        const onSubmit = async (data) => {
            const body = {
                ccn_country: data.ccn_country,
                ccn_department: data.ccn_department,
                descripcion_department: data.descripcion_department,
                id_department: data.id_department,
            };

            if (Method === "POST") {
                const response = await axios
                    .post(`${import.meta.env.VITE_API_ADDRESS}department`, body, {
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
                console.log(UpdateDepartment)
                const response = await axios
                    .put(
                        `${import.meta.env.VITE_API_ADDRESS}department/${UpdateDepartment.ccn_department}`,
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

                        <div className="fixed uppercase inset-0 overflow-hidden">
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
                                                        DEPARTAMENTOS
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
                                                                    <input
                                                                        type="text"
                                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                        placeholder=" "
                                                                        {...register(
                                                                            "descripcion_department",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                    />
                                                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                                        DEPARTAMENTO
                                                                    </label>
                                                                    {errors
                                                                        .descripcion_department
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
                                                                        type="text"
                                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                        placeholder=" "
                                                                        {...register(
                                                                            "id_department",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                    />
                                                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                                        CODIGO DEL DEPARTAMENTO
                                                                    </label>
                                                                    {errors
                                                                        .id_department
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
                                                                        PAIS
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "ccn_country",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        {DataCountrys.map(
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
                                                                    {errors
                                                                        .ccn_country
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
                                                                        Cerrar
                                                                    </button>
                                                                    <input
                                                                        value={
                                                                            UpdateDepartment
                                                                                ? "Actualizar"
                                                                                : "Crear"
                                                                        }
                                                                        type="submit"
                                                                        className="bg-white cursor-pointer tracking-wide text-gray-900 text-sm font-bold rounded border-b-2 border-[#007367] hover:border-[#007367] hover:bg-[#007367] hover:text-white shadow-md py-2 px-5 inline-flex items-center"
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
            <div className="container uppercase mx-auto px-2 py-2 bg-white shadow-md shadow-emerald-900">
                <div className="container mx-auto">
                    <div className="">
                        <h3 className="py-2 text-2xl text-slate-900 uppercase font-extrabold">
                            Departamentos
                        </h3>
                    </div>
                    <div className="py-1">
                        <button
                            className=""
                            onClick={() => {
                                setMethod("POST");
                                setUpdateDepartment();
                                setOpenModalForms(!openModalForms);
                            }}
                        >
                            <FcPlus className="w-10 h-10" />
                        </button>
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
                <EditDepartment />
            </div>
        </>
    );
};

export default Departments;