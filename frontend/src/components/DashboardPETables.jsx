import { useGetPerformanceEvaluationTablesQuery } from "../redux_app/services/performanceEvaluation";
import { Fragment, useMemo, useState, useRef } from "react";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";

import { Dialog, Transition } from "@headlessui/react";
//import { ExclamationTriangleIcon } from "@heroicons/react/outline";
import { FcPlus, FcUp, FcDown } from "react-icons/fc";
import { RxEyeNone } from "react-icons/rx";
import { TiArrowBackOutline } from "react-icons/ti";
import { Checkbox } from "./Checkbox";
import { format } from "date-fns";
import { GlobalFilter } from "./GlobalFilter";


const OperativeTable = () => {
    const { data: data_for_tables, error: operative_error, is_error: is_operative_error } = useGetPerformanceEvaluationTablesQuery();

    const [tableData, setTableData] = useState([])
    const [openModalCheckboxes, setOpenModalCheckboxes] = useState(false);
    const cancelButtonRef = useRef(null)


    const data = data_for_tables ? data_for_tables.tables_data.list_all_results_operative : tableData

    const COLUMNS = [
        {
            Header: "CCN",
            Footer: "CCN",
            accessor: "ccn_performance_evaluation",
            Cell: (row) => <div className="text-center">{row.value}</div>,
        },
        {
            Header: "Nombre Completo",
            Footer: "Nombre Completo",
            accessor: "full_name_employee",
            Cell: (row) => (
                <div className="text-center">
                    <p>
                        {row.value}
                    </p>
                </div>
            ),
        },
        {
            Header: "Jefe Inmediato",
            Footer: "Jefe Inmediato",
            accessor: "immediate_boss",
            Cell: (row) => (
                <div className="pr-2 text-end font-extrabold text-blue-600 hover:underline">
                    {row.value}
                </div>
            ),
        },
        {
            Header: "Fecha de Inicio",
            Footer: "Fecha de Inicio",
            accessor: "opening_date",
            Cell: ({ value }) => {
                return (
                    <div style={{ textAlign: "center" }}>
                        {format(new Date(value), "ddMMMyy")}
                    </div>
                );
            },
        },
        {
            Header: "Compromiso y Productividad",
            Footer: "Compromiso y Productividad",
            accessor: "engagement_or_productivity",
            Cell: (row) => <div className="w-72">{row.value}</div>,
        },
        {
            Header: "Habilidades de Comunicacion",
            Footer: "Habilidades de Comunicacion",
            accessor: "communication_skills",
            Cell: (row) => <div className="w-72">{row.value}</div>,
        },

        {
            Header: "Adaptacion al Cambio",
            Footer: "Adaptacion al Cambio",
            accessor: "adaptation_to_change",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>{row.value}</div>
            ),
        },
        {
            Header: "Organizacion",
            Footer: "Organizacion",
            accessor: "organization",
            Cell: (row) => (
                <div className="p-1.5 text-xs font-bold uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                    <p>
                        {row.value}
                    </p>
                </div>
            ),
        },
        {
            Header: "Aprendizaje y Desarrollo",
            Footer: "Aprendizaje y Desarrollo",
            accessor: "learning_and_development",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>
                    {row.value}
                </div>
            ),
        },
        {
            Header: "Mejoramiento Continuo",
            Footer: "Mejoramiento Continuo",
            accessor: "continuous_improvement",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>
                    <p>
                        {row.value}
                    </p>
                </div>
            ),
        },
        {
            Header: "Participacion Activa",
            Footer: "Participacion Activa",
            accessor: "active_participation",
            Cell: (row) => <div style={{ textAlign: "left" }}>{row.value}</div>,
        },
        {
            Header: "Relaciones",
            Footer: "Relaciones",
            accessor: "relations",
            Cell: (row) => (
                <div style={{ textAlign: "right" }}>{row.value}</div>
            ),
        },
        {
            Header: "Puntualidad",
            Footer: "Puntualidad",
            accessor: "puntuality",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>{row.value}</div>
            ),
        },
        {
            Header: "Puntuacion Global",
            Footer: "Puntuacion Global",
            accessor: "overall_score",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>{row.value}</div>
            ),
        },
        {
            Header: "Valor del Nivel",
            Footer: "Valor del Nivel",
            accessor: "level_value",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>{row.value}</div>
            ),
        },

    ];


    const columns = useMemo(() => COLUMNS, []);

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
    return (
        <>
            <div className="container mx-auto px-2 py-2 bg-white shadow-md">
                <div className="container mx-auto">
                    <div className="">
                        <h3 className="py-2 text-2xl text-slate-900 uppercase font-extrabold">
                            Resultados de la Evaluación de Desempeño Personal Operativo
                        </h3>
                    </div>

                    <div className="container mx-auto">
                        <div className="mb-5 overflow-auto shadow">
                            <table className="table-auto" {...getTableProps()}>
                                <thead className="bg-gray-100 border-b-2 border-gray-100 uppercase">
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
        </>
    );
}


const DirectiveTable = () => {
    const { data: data_for_tables, error: operative_error, is_error: is_operative_error } = useGetPerformanceEvaluationTablesQuery();

    const [tableData, setTableData] = useState([]);
    const [openModalCheckboxes, setOpenModalCheckboxes] = useState(false);
    const cancelButtonRef = useRef(null);


    const data = data_for_tables ? data_for_tables.tables_data.list_all_results_directive : tableData

    const COLUMNS = [
        {
            Header: "CCN",
            Footer: "CCN",
            accessor: "ccn_performance_evaluation",
            Cell: (row) => <div className="text-center">{row.value}</div>,
        },
        {
            Header: "Nombre Completo",
            Footer: "Nombre Completo",
            accessor: "full_name_employee",
            Cell: (row) => (
                <div className="text-center">
                    <p>
                        {row.value}
                    </p>
                </div>
            ),
        },
        {
            Header: "Jefe Inmediato",
            Footer: "Jefe Inmediato",
            accessor: "immediate_boss",
            Cell: (row) => (
                <div className="pr-2 text-end font-extrabold text-blue-600 hover:underline">
                    {row.value}
                </div>
            ),
        },
        {
            Header: "Fecha de Inicio",
            Footer: "Fecha de Inicio",
            accessor: "opening_date",
            Cell: ({ value }) => {
                return (
                    <div style={{ textAlign: "center" }}>
                        {format(new Date(value), "ddMMMyy")}
                    </div>
                );
            },
        },
        {
            Header: "Compromiso y Productividad",
            Footer: "Compromiso y Productividad",
            accessor: "engagement_or_productivity",
            Cell: (row) => <div className="w-72">{row.value}</div>,
        },
        {
            Header: "Habilidades de Comunicacion",
            Footer: "Habilidades de Comunicacion",
            accessor: "communication_skills",
            Cell: (row) => <div className="w-72">{row.value}</div>,
        },

        {
            Header: "Adaptacion al Cambio",
            Footer: "Adaptacion al Cambio",
            accessor: "adaptation_to_change",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>{row.value}</div>
            ),
        },
        {
            Header: "Organizacion",
            Footer: "Organizacion",
            accessor: "organization",
            Cell: (row) => (
                <div className="p-1.5 text-xs font-bold uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                    <p>
                        {row.value}
                    </p>
                </div>
            ),
        },
        {
            Header: "Orientacion al Cliente",
            Footer: "Orientacion al Cliente",
            accessor: "customer_orientation",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>
                    {row.value}
                </div>
            ),
        },
        {
            Header: "Inovacion",
            Footer: "Inovacion",
            accessor: "innovation",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>
                    <p>
                        {row.value}
                    </p>
                </div>
            ),
        },
        {
            Header: "Rigor Profesional",
            Footer: "Rigor Profesional",
            accessor: "professional_rigor",
            Cell: (row) => <div style={{ textAlign: "left" }}>{row.value}</div>,
        },
        {
            Header: "Resolucion de Problemas",
            Footer: "Resolucion de Problemas",
            accessor: "problem_resolution",
            Cell: (row) => (
                <div style={{ textAlign: "right" }}>{row.value}</div>
            ),
        },
        {
            Header: "Liderazgo",
            Footer: "Liderazgo",
            accessor: "leadership",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>{row.value}</div>
            ),
        },
        {
            Header: "Puntuacion Global",
            Footer: "Puntuacion Global",
            accessor: "puntuality",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>{row.value}</div>
            ),
        },
        {
            Header: "Valor del Nivel",
            Footer: "Valor del Nivel",
            accessor: "level_value",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>{row.value}</div>
            ),
        },
    ];

    const columns = useMemo(() => COLUMNS, []);

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
    return (
        <>
            <div className="container mx-auto px-2 py-2 bg-white shadow-md ">
                <div className="container mx-auto">
                    <div className="">
                        <h3 className="py-2 text-2xl text-slate-900 uppercase font-extrabold">
                            Resultados de la Evaluación de Desempeño Personal Directivo
                        </h3>
                    </div>

                    <div className="container mx-auto">
                        <div className="mb-5 overflow-auto shadow">
                            <table className="table-auto" {...getTableProps()}>
                                <thead className="bg-gray-100 border-b-2 border-gray-100 uppercase">
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
        </>
    );
}


const AdministrativeTable = () => {
    const { data: data_for_tables, error: operative_error, is_error: is_operative_error } = useGetPerformanceEvaluationTablesQuery();

    const [tableData, setTableData] = useState([])
    const [openModalCheckboxes, setOpenModalCheckboxes] = useState(false);
    const cancelButtonRef = useRef(null)


    const data = data_for_tables ? data_for_tables.tables_data.list_all_results_administrative : tableData

    const COLUMNS = [
        {
            Header: "CCN",
            Footer: "CCN",
            accessor: "ccn_performance_evaluation",
            Cell: (row) => <div className="text-center">{row.value}</div>,
        },
        {
            Header: "Nombre Completo",
            Footer: "Nombre Completo",
            accessor: "full_name_employee",
            Cell: (row) => (
                <div className="text-center">
                    <p>
                        {row.value}
                    </p>
                </div>
            ),
        },
        {
            Header: "Jefe Inmediato",
            Footer: "Jefe Inmediato",
            accessor: "immediate_boss",
            Cell: (row) => (
                <div className="pr-2 text-end font-extrabold text-blue-600 hover:underline">
                    {row.value}
                </div>
            ),
        },
        {
            Header: "Fecha de Inicio",
            Footer: "Fecha de Inicio",
            accessor: "opening_date",
            Cell: ({ value }) => {
                return (
                    <div style={{ textAlign: "center" }}>
                        {format(new Date(value), "ddMMMyy")}
                    </div>
                );
            },
        },
        {
            Header: "Compromiso y Productividad",
            Footer: "Compromiso y Productividad",
            accessor: "engagement_or_productivity",
            Cell: (row) => <div className="w-72">{row.value}</div>,
        },
        {
            Header: "Habilidades de Comunicacion",
            Footer: "Habilidades de Comunicacion",
            accessor: "communication_skills",
            Cell: (row) => <div className="w-72">{row.value}</div>,
        },

        {
            Header: "Adaptacion al Cambio",
            Footer: "Adaptacion al Cambio",
            accessor: "adaptation_to_change",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>{row.value}</div>
            ),
        },
        {
            Header: "Organizacion",
            Footer: "Organizacion",
            accessor: "organization",
            Cell: (row) => (
                <div className="p-1.5 text-xs font-bold uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                    <p>
                        {row.value}
                    </p>
                </div>
            ),
        },
        {
            Header: "Orientacion al Cliente",
            Footer: "Orientacion al Cliente",
            accessor: "customer_orientation",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>
                    {row.value}
                </div>
            ),
        },
        {
            Header: "Inovacion",
            Footer: "Inovacion",
            accessor: "innovation",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>
                    <p>
                        {row.value}
                    </p>
                </div>
            ),
        },
        {
            Header: "Rigor Profesional",
            Footer: "Rigor Profesional",
            accessor: "professional_rigor",
            Cell: (row) => <div style={{ textAlign: "left" }}>{row.value}</div>,
        },
        {
            Header: "Resolucion de Problemas",
            Footer: "Resolucion de Problemas",
            accessor: "problem_resolution",
            Cell: (row) => (
                <div style={{ textAlign: "right" }}>{row.value}</div>
            ),
        },
        {
            Header: "Liderazgo",
            Footer: "Liderazgo",
            accessor: "leadership",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>{row.value}</div>
            ),
        },
        {
            Header: "Puntuacion Global",
            Footer: "Puntuacion Global",
            accessor: "puntuality",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>{row.value}</div>
            ),
        },
        {
            Header: "Valor del Nivel",
            Footer: "Valor del Nivel",
            accessor: "level_value",
            Cell: (row) => (
                <div style={{ textAlign: "center" }}>{row.value}</div>
            ),
        },
    ];

    const columns = useMemo(() => COLUMNS, []);

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
    return (
        <>
            <div className="container mx-auto px-2 py-2 bg-white shadow-md">
                <div className="container mx-auto">
                    <div className="">
                        <h3 className="py-2 text-2xl text-slate-900 uppercase font-extrabold">
                            Resultados de la Evaluación de Desempeño Personal Administrativo
                        </h3>
                    </div>

                    <div className="container mx-auto">
                        <div className="mb-5 overflow-auto shadow">
                            <table className="table-auto" {...getTableProps()}>
                                <thead className="bg-gray-100 border-b-2 border-gray-100 uppercase">
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
        </>
    );
}

export { OperativeTable, AdministrativeTable, DirectiveTable };