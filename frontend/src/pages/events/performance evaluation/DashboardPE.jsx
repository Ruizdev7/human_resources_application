import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import axios from "axios";
import CountUp from 'react-countup';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ListPerformanceEvaluation from './ListPerformanceEvaluation';
import { OperativeTable, AdministrativeTable, DirectiveTable } from '../../../components/DashboardPETables';
import { DirectiveDashboard, OperativeDashboard, AdministrativeDashboard, GlobalDashboard, InfoButton } from '../../../assets/images/SVG';
ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Tooltips = ({ text, children }) => {
    const [showTooltip, setShowTooltip] = React.useState(false);

    const toggleTooltip = () => {
        setShowTooltip(!showTooltip);
    };
    return (
        <div className="relative w-full">
            <div
                className="inline-block w-full"
                onMouseEnter={toggleTooltip}
                onMouseLeave={toggleTooltip}
            >
                {children}
            </div>
            {showTooltip && (
                <div className="w-full font-bold mt-5 absolute z-10 p-5 text-white bg-gray-700 rounded-md">
                    <div className='text-[#b37fb9] flex justify-between'>
                        <p>Pendientes Calificación</p>
                        <p>{text.pending_for_inmediate_boss}</p>
                    </div>
                    <div className='text-[#e19974] flex justify-between'>
                        <p>Pendientes Respuesta</p>
                        <p>{text.pending_for_employee_answer}</p>
                    </div>
                    <div className='text-[#e2c4e5] flex justify-between'>
                        <p>Pendientes Plan de Acción</p>
                        <p>{text.pending_for_action_plan}</p>
                    </div>
                    <div className='text-[#8c94a9] flex justify-between'>
                        <p>Pendientes Aprobación</p>
                        <p>{text.pending_for_manager_approbal}</p>
                    </div>
                    <div className='text-[#85c988] flex justify-between'>
                        <p>Aprobadas</p>
                        <p>{text.approbal_evaluation}</p>
                    </div>
                    <div className='text-[#ea615d] flex justify-between'>
                        <p>Rechazadas</p>
                        <p>{text.failed_assessments}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const DashboardPE = () => {
    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)

    const [typeOfCharge, setTypeOfCharge] = useState(1)
    const [dataForMetrics, setDataForMetrics] = useState(null)


    const getDataForMetrics = async () => {
        try {
            const resData = await axios(
                `${import.meta.env.VITE_API_ADDRESS}performance_evaluation/metrics_for_dashboard`
            );
            setDataForMetrics(resData.data.Metrics);
        } catch (error) {
            //console.log(error);
        }
    };
    useEffect(() => {
        getDataForMetrics();
    }, []);

    if (!dataForMetrics) return <></>;


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Distribución de Resultados de Evaluación en Número de Empleados',
            },
        },
    };

    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    const options3 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
            },
        },
    };

    const data = {
        labels: ['0-25', '25-50', '50-80', '80-100', '100'],
        datasets: [
            {
                label: 'Administrativo',
                data: [
                    dataForMetrics ? dataForMetrics.level_value_data.admin_total_points.count_ad_0_25 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.admin_total_points.count_ad_26_50 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.admin_total_points.count_ad_51_80 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.admin_total_points.count_ad_81_99 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.admin_total_points.count_ad_100 : 0
                ],
                fill: false,
                tension: 0.1,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Operativo',
                data: [
                    dataForMetrics ? dataForMetrics.level_value_data.operative_total_points.count_ad_0_25 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.operative_total_points.count_ad_26_50 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.operative_total_points.count_ad_51_80 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.operative_total_points.count_ad_81_99 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.operative_total_points.count_ad_100 : 0
                ],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                fill: false,
                tension: 0.1,
            },
            {
                label: 'Directivo',
                data: [
                    dataForMetrics ? dataForMetrics.level_value_data.directive_total_points.count_ad_0_25 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.directive_total_points.count_ad_26_50 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.directive_total_points.count_ad_51_80 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.directive_total_points.count_ad_81_99 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.directive_total_points.count_ad_100 : 0
                ],
                borderColor: '#3d6b5c',
                backgroundColor: 'rgba(61, 107, 92, .5)',
                fill: false,
                tension: 0.1,
            },
        ],
    };




    const data4 = {
        labels: typeOfCharge === 1 ?
            dataForMetrics ? dataForMetrics.fourth_graphic.list_all_results_administrative.map((employee) => employee.full_name_employee) : 0
            : typeOfCharge === 2 ?
                dataForMetrics ? dataForMetrics.fourth_graphic.list_all_results_operative.map((employee) => employee.full_name_employee) : 0
                : dataForMetrics ? dataForMetrics.fourth_graphic.list_all_results_directive.map((employee) => employee.full_name_employee) : 0,
        datasets: [
            {
                label: '',
                data: typeOfCharge === 1 ?
                    dataForMetrics ? dataForMetrics.fourth_graphic.list_all_results_administrative.map((employee) => employee.level_value) : 0
                    : typeOfCharge === 2 ?
                        dataForMetrics ? dataForMetrics.fourth_graphic.list_all_results_operative.map((employee) => employee.level_value) : 0
                        : dataForMetrics ? dataForMetrics.fourth_graphic.list_all_results_directive.map((employee) => employee.level_value) : 0,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                ],
            },
        ],
    };

    const Piedata = {
        labels: ['Bronce', 'Plata', 'Oro', 'Diamante', 'Platino'],
        datasets: [
            {
                label: '',
                data: typeOfCharge === 1 ? [
                    dataForMetrics ? dataForMetrics.level_value_data.admin_total_points.count_ad_0_25 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.admin_total_points.count_ad_26_50 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.admin_total_points.count_ad_51_80 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.admin_total_points.count_ad_81_99 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.admin_total_points.count_ad_100 : 0
                ] : typeOfCharge === 2 ? [
                    dataForMetrics ? dataForMetrics.level_value_data.operative_total_points.count_ad_0_25 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.operative_total_points.count_ad_26_50 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.operative_total_points.count_ad_51_80 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.operative_total_points.count_ad_81_99 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.operative_total_points.count_ad_100 : 0
                ] : [
                    dataForMetrics ? dataForMetrics.level_value_data.directive_total_points.count_ad_0_25 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.directive_total_points.count_ad_26_50 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.directive_total_points.count_ad_51_80 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.directive_total_points.count_ad_81_99 : 0,
                    dataForMetrics ? dataForMetrics.level_value_data.directive_total_points.count_ad_100 : 0
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const data5 = {
        labels: typeOfCharge === 2 ? [
            `Participación Activa`,
            `Adaptación al Cambio`,
            `Habilidades de Comunicación`,
            `Mejoramiento continuo `,
            `Compromiso/ Productividad`,
            `Aprendizaje y Desarrollo`,
            `Puntualidad`,
            `Organización`,
            `Relaciones`,
        ] : [
            `Adaptación al Cambio`,
            `Habilidades de Comunicación`,
            `Orientación al Cliente (E/I)`,
            `Compromiso/ Productividad`,
            `Innovación`,
            `Liderazgo`,
            `Organización`,
            `Resolución de Problemas`,
            `Rigor Profesional`,
        ],
        datasets: [
            {
                label: "",
                data: typeOfCharge === 1 ? [
                    dataForMetrics ? dataForMetrics.average_for_skills.administrative_average_skill.avg_adaptation_to_change_ad_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.administrative_average_skill.avg_communication_skills_ad_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.administrative_average_skill.avg_customer_orientation_ad_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.administrative_average_skill.avg_engagement_or_productivity_ad_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.administrative_average_skill.avg_innovation_ad_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.administrative_average_skill.avg_leadership_ad_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.administrative_average_skill.avg_organization_ad_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.administrative_average_skill.avg_problem_resolution_ad_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.administrative_average_skill.avg_professional_rigor_ad_pe : 0,
                ] : typeOfCharge === 2 ? [
                    dataForMetrics ? dataForMetrics.average_for_skills.operative_average_skill.avg_active_participation_op_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.operative_average_skill.avg_adaptation_to_change_op_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.operative_average_skill.avg_communication_skills_op_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.operative_average_skill.avg_continuous_improvement_op_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.operative_average_skill.avg_engagement_or_productivity_op_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.operative_average_skill.avg_learning_and_development_op_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.operative_average_skill.avg_organization_op_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.operative_average_skill.avg_puntuality_op_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.operative_average_skill.avg_relations_op_pe : 0,
                ] : [
                    dataForMetrics ? dataForMetrics.average_for_skills.directive_average_skill.avg_adaptation_to_change_di_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.directive_average_skill.avg_communication_skills_di_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.directive_average_skill.avg_customer_orientation_di_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.directive_average_skill.avg_engagement_or_productivity_di_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.directive_average_skill.avg_innovation_di_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.directive_average_skill.avg_leadership_di_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.directive_average_skill.avg_organization_di_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.directive_average_skill.avg_problem_resolution_di_pe : 0,
                    dataForMetrics ? dataForMetrics.average_for_skills.directive_average_skill.avg_professional_rigor_di_pe : 0,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ],
                borderWidth: 1,
                fill: false,
                tension: 0.1,

            },
        ],
    };
    console.log(typeOfCharge)
    return (
        <>

            <div className='container flex mx-auto mt-[20px]' >
                <Tooltips text={dataForMetrics.total_by_states.OPERATIVO}>
                    <div
                        className="w-[250px] h-[100px] hover:bg-[#E5F1EF] cursor-pointer mx-auto text-center rounded-lg bg-white border-2 border-gray-200"
                    >
                        <>
                            <div className='container flex'>
                                <OperativeDashboard />
                                <div>
                                    <h2 className="mx-5 my-1 text-[20px]">
                                        <strong>Operativo</strong>
                                    </h2>
                                    <strong>
                                        <CountUp
                                            className="custom-count text-[35px]"
                                            start={100}
                                            end={dataForMetrics ? dataForMetrics.total_by_states.OPERATIVO.total_operative : 0}
                                            duration={5}
                                            useEasing={true}
                                            separator=" "
                                            decimal=","
                                        />
                                    </strong>
                                </div>
                            </div>
                        </>
                    </div>
                </Tooltips>
                <Tooltips text={dataForMetrics.total_by_states.ADMINISTRATIVO}>
                    <div
                        className="w-[250px] h-[100px] hover:bg-[#E5F1EF] cursor-pointer mx-auto text-center rounded-lg bg-white border-2 border-gray-200"
                    >
                        <>
                            <div className='container flex'>
                                <AdministrativeDashboard />
                                <div>
                                    <h2 className="mx-5 my-1 text-[20px]">
                                        <strong>Administrativo</strong>
                                    </h2>
                                    <strong>
                                        <CountUp
                                            className="custom-count text-[35px]"
                                            start={500}
                                            end={dataForMetrics ? dataForMetrics.total_by_states.ADMINISTRATIVO.total_administrativo : 0}
                                            duration={5}
                                            useEasing={true}
                                            separator=" "
                                            decimal=","
                                        />
                                    </strong>
                                </div>
                            </div>
                        </>
                    </div>
                </Tooltips>
                <Tooltips text={dataForMetrics.total_by_states.DIRECTIVO}>

                    <div
                        className="w-[250px] h-[100px] hover:bg-[#E5F1EF] cursor-pointer mx-auto text-center rounded-lg bg-white border-2 border-gray-200"
                    >
                        <>
                            <div className='container flex'>
                                <DirectiveDashboard />
                                <div>
                                    <h2 className="mx-5 my-1 text-[20px]">
                                        <strong>Directivo</strong>
                                    </h2>
                                    <strong>
                                        <CountUp
                                            className="custom-count text-[35px]"
                                            start={200}
                                            end={dataForMetrics ? dataForMetrics.total_by_states.DIRECTIVO.total_directive : 0}
                                            duration={5}
                                            useEasing={true}
                                            separator=" "
                                            decimal=","
                                        />
                                    </strong>
                                </div>
                            </div>
                        </>
                    </div>
                </Tooltips>
                <Tooltips text={dataForMetrics.total_by_states.TOTAL}>
                    <div
                        className="w-[250px] h-[100px] hover:bg-[#E5F1EF] cursor-pointer mx-auto text-center rounded-lg bg-white border-2 border-gray-200"
                    >
                        <>
                            <div className='container flex'>
                                <GlobalDashboard />
                                <div>
                                    <h2 className="mx-5 my-1 text-[20px]">
                                        <strong>Global</strong>
                                    </h2>
                                    <strong>
                                        <CountUp
                                            className="custom-count text-[35px]"
                                            start={0}
                                            end={dataForMetrics ? dataForMetrics.total_by_states.TOTAL.total : 0}
                                            duration={5}
                                            useEasing={true}
                                            separator=" "
                                            decimal=","
                                        />
                                    </strong>
                                </div>
                            </div>
                        </>
                    </div>
                </Tooltips >
            </div>

            <div className='container flex flex-row my-5 gap-x-5 mx-auto border-b-2 rounded-lg border-gray-200'>
                <div className='basis-1/3 p-5'>
                    <h2 className='text-2xl uppercase font-bold'>Distribución de Resultados de Evaluación en Número de Empleados</h2>
                    <p>
                        En el eje horizontal de la gráfica, se representa el total de personas que obtuvieron los
                        diferentes puntajes globales en la evaluacion de desempeño correspondiente al año 2022.
                    </p>
                </div>
                <div className='basis-2/3 h-[60vh]'>
                    <Line options={options} data={data} />
                </div>
            </div>

            <div className='container flex flex-row my-5 gap-x-5 mx-auto border-b-2 rounded-lg border-gray-200'>
                <div className='basis-2/3 h-[60vh] p-5'>
                    <Pie data={Piedata} />
                </div>
                <div className=' basis-1/3 p-5'>
                    <h2 className='text-2xl uppercase font-bold'>Distribución en porcentajes de empleados según escala </h2>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, libero aliquid! Perferendis id, numquam vitae rerum illum veritatis repudiandae, eius fuga odio recusandae debitis voluptate earum quas facilis ducimus nam.</p>
                </div>
            </div>

            <div className='container flex flex-row my-5 gap-x-5 mx-auto border-b-2 rounded-lg border-gray-200'>
                <div className='basis-1/3 p-5 items-center'>
                    <h2 className='text-2xl uppercase font-bold'>Fuerza de Criterios de Evaluación (media de puntuaciones por criterio)</h2>
                    <p className='whitespace-normal my-5'>
                        El siguiente grafico de barras gráfico muestra una representación visual de la fuerza de los criterios de evaluación para el personal directivo, administrativo y operativo. En el eje horizontal
                        (x) se encuentran los criterios de evaluación En el eje vertical (y) se evalúa el promedio de la calificación del personal directivo para cada uno de los criterios evaluados.
                    </p>
                </div>
                <div className='basis-2/3 p-5'>
                    <Bar options={options3} data={data5} />
                </div>
            </div>


            <div className='container text-center grid grid-cols-1 my-5 gap-x-5 mx-auto border-b-2 rounded-lg border-gray-200'>
                <h1 className='text-2xl uppercase font-bold'>Ranking de Resultados de Evaluación</h1>
                <div className='h-[90vh]'>
                    <Bar options={options3} data={data4} />
                </div>
            </div>


            <div className='container relative mx-auto border border-gray-200 col-span-4'>
                <button className='absolute right-1 top-1' onClick={() => {
                    setOpen(true)
                    setText("Tenga en cuenta que solo podrá ver los resultados de las personas cuyas evaluaciones fueran finalizadas con éxito (No aplican las evaluaciones rechazadas).")
                }}><InfoButton /></button>
                {
                    typeOfCharge === 1 ?
                        <AdministrativeTable />
                        : typeOfCharge === 2 ?
                            <OperativeTable />
                            : <DirectiveTable />
                }
            </div>
            <div className='fixed flex justify-center bottom-5 mx-auto z-30 justify-items-center text-white rounded-lg  w-full'>
                <div className='border border-black bg-gray-600 text-white flex gap-5 opacity-80 p-2 rounded-lg'>
                    <button
                        className={`bg-gray-900 w-[150px] justify-center hover:border hover:border-white text-sm font-bold rounded hover:text-white shadow-md py-2 px-5 inline-flex items-center ${typeOfCharge === 1 ? " border border-white" : ""}`}
                        onClick={() => setTypeOfCharge(1)}>
                        Administrativo
                    </button>

                    <button
                        className={`bg-gray-900 w-[150px] justify-center hover:border hover:border-white text-sm font-bold rounded hover:text-white shadow-md py-2 px-5 inline-flex items-center ${typeOfCharge === 2 ? " border border-white" : ""}`}
                        onClick={() => setTypeOfCharge(2)}>
                        Operativo
                    </button>

                    <button
                        className={`bg-gray-900 w-[150px] justify-center hover:border hover:border-white text-sm font-bold rounded hover:text-white shadow-md py-2 px-5 inline-flex items-center ${typeOfCharge === 3 ? " border border-white" : ""}`}
                        onClick={() => setTypeOfCharge(3)}>
                        Directivo
                    </button>
                </div>
            </div>
            <div className='my-[70px]'>
                <ListPerformanceEvaluation />
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <Dialog.Title className="text-base text-center font-bold leading-6 text-gray-900">
                                                    <h4 className='font-bold '>DESCRIPCIÓN DE LA GRAFICA</h4>
                                                </Dialog.Title>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4">
                                                <div className='gap-x-5 justify-center items-center flex-col p-1 flex w-[400px]'>
                                                    <p>{text}</p>
                                                </div>
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
}

export { DashboardPE };