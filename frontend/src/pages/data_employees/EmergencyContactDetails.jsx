import { useForm } from "react-hook-form";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import axios from "axios";
import { Checkbox } from "../../components/Checkbox";
import { RxEyeNone, RxPencil2 } from "react-icons/rx";
import { FcPlus, FcUp, FcDown } from "react-icons/fc";
import { IsotipoPlena, ExcelIcon } from "../../assets/images/SVG";
import { Dialog, Transition } from "@headlessui/react";
import { GlobalFilter } from "../../components/GlobalFilter";
import { useState, useMemo, useEffect, Fragment, useRef } from "react";
import { useGetAllEmergencyContactDetailsQuery } from "../../redux_app/services/emergencyContactDetailsAPI";

const EmergencyContactDetails = () => {
    const [open, setOpen] = useState(true);
    const [openModalCheckboxes, setOpenModalCheckboxes] = useState(false);
    const [openModalForms, setOpenModalForms] = useState(false);
    const cancelButtonRef = useRef(null);
    const [loadingData, setLoadingData] = useState(true);
    const [dataEmergencyContactDetails, setdataEmergencyContactDetails] = useState([]);
    const [dataEmployees, setDataEmployees] = useState([]);
    const [dataRelationship, setdataRelationship] = useState([]);
    const [UpdateEmergencyContactDetails, setUpdateEmergencyContactDetails] = useState(null);
    const [Method, setMethod] = useState("");

    const getEmergencyContactDetails = async () => {
        try {
            const respdataRelationship = await axios(`${import.meta.env.VITE_API_ADDRESS}relationship`);
            for (const Relationship of respdataRelationship.data.Relationship) {
                dataRelationship.push({
                    ccn_relationship: Relationship.ccn_relationship,
                    relationship: Relationship.relationship,
                    relationship_level: Relationship.relationship_level,
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
            const respEmergencyContactDetails = await axios(
                `${import.meta.env.VITE_API_ADDRESS}emergency_contact_details`
            );
            setdataEmergencyContactDetails(respEmergencyContactDetails.data.EmergencyContactDetails)
        } catch (error) {
            console.log(error);
        }
    };
    const { data: data_emergency_contact } = useGetAllEmergencyContactDetailsQuery()

    if (!dataEmergencyContactDetails) return <></>;
    useEffect(() => {
        getEmergencyContactDetails();
    }, []);

    function OpenColumnVisibility() {
        setOpenModalCheckboxes(!openModalCheckboxes);
    }

    const data = dataEmergencyContactDetails ? dataEmergencyContactDetails : [];

    const COLUMNS = [
        {
            Header: "CCN",
            Footer: "CCN",
            accessor: "ccn_emergency_contact_details",
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
            Header: "Nombre del contacto de emergencia",
            Footer: "Nombre del contacto de emergencia",
            accessor: "emergency_contact",

            Cell: (row) => (
                <div style={{ textAlign: "center" }}>{row.value}</div>
            ),
        },
        {
            Header: "Parentesco",
            Footer: "Parentesco",
            accessor: "relationship",

            Cell: (row) => (
                <div style={{ textAlign: "center" }}>
                    <p>
                        {row.value}
                    </p>
                </div>
            ),
        },
        {
            Header: "Teléfono",
            Footer: "Teléfono",
            accessor: "cellphone",

            Cell: (row) => (
                <div style={{ textAlign: "center" }}>{row.value}</div >
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
                                    specificEmergencyContactDetails(row);
                                    EditEmergencyContactDetails();
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

    const specificEmergencyContactDetails = async (ccn_emergency_contact_details) => {
        try {
            const respEmergencyContactDetails = await axios(
                `${import.meta.env.VITE_API_ADDRESS}emergency_contact_details/${ccn_emergency_contact_details.cells[0].value}`
            );
            setUpdateEmergencyContactDetails(respEmergencyContactDetails.data.EmergencyContactDetails);
        } catch (error) { }
    };

    const EditEmergencyContactDetails = () => {
        try {
            if (!UpdateEmergencyContactDetails) {
                specificEmergencyContactDetails();
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
                ccn_emergency_contact_details: UpdateEmergencyContactDetails ? UpdateEmergencyContactDetails.ccn_emergency_contact_details : "",
                ccn_employee: UpdateEmergencyContactDetails ? UpdateEmergencyContactDetails.ccn_employee : "",
                emergency_contact: UpdateEmergencyContactDetails ? UpdateEmergencyContactDetails.emergency_contact : "",
                ccn_relationship: UpdateEmergencyContactDetails ? UpdateEmergencyContactDetails.ccn_relationship : "",
                cellphone: UpdateEmergencyContactDetails ? UpdateEmergencyContactDetails.cellphone : "",
            },
        });


        const onSubmit = async (data) => {
            const body = {
                ccn_emergency_contact_details: data.ccn_emergency_contact_details,
                ccn_employee: data.ccn_employee,
                emergency_contact: data.emergency_contact,
                ccn_relationship: data.ccn_relationship,
                cellphone: data.cellphone,
            };


            if (Method === "POST") {
                const response = await axios
                    .post(`${import.meta.env.VITE_API_ADDRESS}emergency_contact_details`, body, {
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
                        `${import.meta.env.VITE_API_ADDRESS}emergency_contact_details/${UpdateEmergencyContactDetails.ccn_emergency_contact_details}`,
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
                                                <div className="absolute ml-6">
                                                    <button
                                                        type="button"
                                                        className="uppercase"
                                                        onClick={() =>
                                                            setOpenModalForms(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        <span className="hidden">
                                                            Close panel
                                                        </span>
                                                        <p>X</p>
                                                    </button>
                                                </div>
                                            </Transition.Child>
                                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                                <div className="px-4 sm:px-6">
                                                    <Dialog.Title className="text-lg text-sky-900 font-bold uppercase">
                                                        Información De Contacto De Emergencia
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
                                                                        NOMBRE DEL COMPLETO CONTACTO DE EMERGENCIA
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .emergency_contact
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <input
                                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                        placeholder=" "
                                                                        {...register(
                                                                            "emergency_contact",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        PARENTESCO
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .ccn_relationship
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <select
                                                                        {...register(
                                                                            "ccn_relationship",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                        {dataRelationship.map(
                                                                            (
                                                                                relationship
                                                                            ) => {
                                                                                return (
                                                                                    <option
                                                                                        key={
                                                                                            relationship.ccn_relationship
                                                                                        }
                                                                                        value={
                                                                                            relationship.ccn_relationship
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            relationship.relationship
                                                                                        }
                                                                                    </option>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </select>
                                                                </div>

                                                                <div className="relative h-10 mt-[25px] w-full min-w-[200px]">
                                                                    <label className="flex text-sm font-medium text-gray-700">
                                                                        TELEFONO DEL CONTACTO DE EMERGENCIA
                                                                        <div className="flex">
                                                                            <p className="italic font-bold text-md text-[15px] text-red-700 ">
                                                                                *
                                                                            </p>
                                                                        </div>
                                                                        {/*errors
                                                                            .cellphone
                                                                            ?.type ===
                                                                            "required" && (
                                                                            )*/}
                                                                    </label>
                                                                    <input
                                                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                                        placeholder=" "
                                                                        {...register(
                                                                            "cellphone",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="bg-gray-50 mt-5 px-4 py-3 sm:flex  sm:px-6">
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
                                                                        value={UpdateEmergencyContactDetails ? "ACTUALIZAR" : "CREAR"}
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
        <>{dataEmergencyContactDetails != 0 ?
            <div className="container mx-auto uppercase px-2 py-2 bg-white shadow-md shadow-emerald-900">
                <div className="container mx-auto">
                    <div className="flex">
                        <h3 className="py-2 text-2xl text-slate-900 uppercase font-extrabold">
                            Datos de Contactos de Emergencia
                        </h3>
                        <button
                            className="mx-5"
                            onClick={() => {
                                setMethod("POST");
                                setUpdateEmergencyContactDetails();
                                setOpenModalForms(!openModalForms);
                            }}
                        >
                            <FcPlus className="w-10 h-10" />
                        </button>
                    </div>
                    <div className="w-full flex justify-end">
                        <a href={`${import.meta.env.VITE_API_ADDRESS}generate-emergency-contact-detail-excel-data`} className=""><ExcelIcon /></a>
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
                <EditEmergencyContactDetails />
            </div>
            :
            <div className="h-[100%] container mx-auto flex items-center">
                <IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
            </div>}
        </>
    );
};

export default EmergencyContactDetails;
