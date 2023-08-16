import { useState, useEffect } from "react";
import axios from "axios";
import { BROZE, SILVER, GOLD, DIAMOND, PLATINUM, Approval, Disapprove, IsotipoPlena } from "../../../assets/images/SVG";
import { toast } from "react-toastify";
import LogoOficial from "../../../assets/images/logo_oficial_plena.jpg"
import { useParams } from "react-router-dom";
import { get, useForm } from "react-hook-form";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';
import { useGetRolesQuery } from "../../../redux_app/services/rolesAPI";
import { useSelector } from "react-redux";
import { useGetEmployeesQuery } from "../../../redux_app/services/employeeAPI";
import { useGetAdministrativeDetailQuery } from "../../../redux_app/services/performanceEvaluation";
import { useGetEmploymentRelationshipQuery } from "../../../redux_app/services/employmentRelationshipAPI";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

function PerformanceEvaluationDetail() {
    const { data: list_data_employee, isError: is_error_data_employee, isSuccess: is_succes_data_employee, error: error_data_employee, isLoading: is_loading_data_employee } = useGetEmployeesQuery()
    const { data: list_roles, isError: is_error_roles, isSuccess: is_succes_roles, error: error_roles, isLoading: is_loading_roles } = useGetRolesQuery()
    const [performanceEvaluation, setPerformanceEvaluation] = useState([]);
    const [detailPerformanceEvaluation, setDetailPerformanceEvaluation] = useState([]);
    const [employees, setEmployees] = useState([]);
    const { ccn_performance_evaluation } = useParams();

    const { data: list_pe_detail, isError: is_error_administrative, isSuccess: is_succes_administrative, error: error_administrative, isLoading: is_loading_administrative } = useGetAdministrativeDetailQuery(ccn_performance_evaluation || 0)

    const [managerApproval, setManagerApproval] = useState(null)

    const nombre_usuario_actual = useSelector((state) => state);
    const current_user = nombre_usuario_actual.authAPISlice.current_user.ccn_employee || 0
    const access_level = nombre_usuario_actual.authAPISlice.access_level.role || ""


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {},
    });

    const getDetail = async () => {
        try {
            const respDetail = await axios(
                `${import.meta.env.VITE_API_ADDRESS}performance_evaluation/${ccn_performance_evaluation}`
            );
            console.log(list_pe_detail)
            setPerformanceEvaluation(
                list_pe_detail.PEDetail
            );
            const resEmployees = await axios(
                `${import.meta.env.VITE_API_ADDRESS}employee/${respDetail ? respDetail.data.PerformanceEvaluation.ccn_employee : 0}`
            );
            setEmployees(resEmployees.data.Employee)

        } catch (error) {
            console.log(error);
        }
    };


    if (!performanceEvaluation) return <></>;
    useEffect(() => {
        getDetail();
    }, []);

    const { data: list_employee_relationship, isError: is_error_employee_relationship, isSuccess: is_succes_employee_relationship, error: error_employee_relationship, isLoading_is_loading_employee_relationship } = useGetEmploymentRelationshipQuery(performanceEvaluation.ccn_employee)

    const onSubmit = (data) => {
        const sedData = async () => {
            if (managerApproval === null) {
                toast.error("😶 Es necesario aprobar o denegar la evaluacion!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                const body = {
                    manager_response: data.manager_response,
                    manager_approval: managerApproval,
                };

                const urlAddress = performanceEvaluation.type_employee === "OPERATIVO"
                    ? `${import.meta.env.VITE_API_ADDRESS}four_section_ope/${ccn_performance_evaluation}`
                    : performanceEvaluation.type_employee === "ADMINISTRATIVO"
                        ? `${import.meta.env.VITE_API_ADDRESS}four_section_ape/${ccn_performance_evaluation}`
                        : `${import.meta.env.VITE_API_ADDRESS}four_section_dpe/${ccn_performance_evaluation}`


                if (!managerApproval) {

                    const body = {
                        opening_date: performanceEvaluation.opening_date,
                        ccn_employee: performanceEvaluation.ccn_employee,
                    };
                    const response = await axios
                        .post(
                            `${import.meta.env.VITE_API_ADDRESS}performance_evaluation/after/denied_approval`,
                            body,
                            { header: { "Access-Control-Allow-Origin": "*" } }
                        )
                        .then((response) => {
                            if (response.status === 200) {
                                window.location = "/home";
                            } else {

                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                const response = await axios
                    .put(
                        urlAddress,
                        body,
                        { header: { "Access-Control-Allow-Origin": "*" } }
                    )
                    .then((response) => {
                        if (response.status === 200) {
                            window.location = "/home";
                        } else {

                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            }
        };
        const confirmation = managerApproval ? window.confirm("¿Estás seguro/a de que quieres enviar la evaluación? ") : window.confirm("¿Estás seguro/a de que quieres enviar la evaluación? \n \nNota: \nRecuerda que, si seleccionas DESAPROBAR, la evaluación nuevamente deberá ser realizada por el Jefe superior Inmediato.")
        if (confirmation === true) {
            sedData();
        }
    };

    const average = parseInt(list_pe_detail ? list_pe_detail.PEDetail.overall_score : 9) / 9

    const generatePdf = () => {
        const input = document.getElementById('Performans-Evaluation-Detail');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image.png');
                const pdf = new jsPDF();
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();

                pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight, '', 'FAST');
                pdf.save('Evaluacion-de-Desempeño-2022.pdf');
            });
    }

    const levels = {
        0: "No Aplica",
        25: "Bajo",
        50: "Medio",
        80: "Alto",
        100: "Excelente"
    }
    const data = {
        labels: performanceEvaluation ?
            performanceEvaluation.type_employee === "OPERATIVO" ? [
                `Compromiso/ Productividad ${list_pe_detail ? list_pe_detail.PEDetail.engagement_or_productivity : 0}`,
                `Puntualidad ${list_pe_detail ? list_pe_detail.PEDetail.puntuality : 0}`,
                `Relaciones ${list_pe_detail ? list_pe_detail.PEDetail.relations : 0}`,
                `Organización ${list_pe_detail ? list_pe_detail.PEDetail.organization : 0}`,
                `Adaptación al Cambio ${list_pe_detail ? list_pe_detail.PEDetail.adaptation_to_change : 0}`,
                `Aprendizaje y Desarrollo ${list_pe_detail ? list_pe_detail.PEDetail.learning_and_development : 0}`,
                `Mejoramiento continuo  ${list_pe_detail ? list_pe_detail.PEDetail.continuous_improvement : 0}`,
                `Participación Activa ${list_pe_detail ? list_pe_detail.PEDetail.active_participation : 0}`,
                `Habilidades de Comunicación ${list_pe_detail ? list_pe_detail.PEDetail.communication_skills : 0}`,
            ]
                :
                [
                    `Compromiso/ Productividad ${list_pe_detail ? list_pe_detail.PEDetail.engagement_or_productivity : 0}`,
                    `Innovación ${list_pe_detail ? list_pe_detail.PEDetail.innovation : 0}`,
                    `Liderazgo ${list_pe_detail ? list_pe_detail.PEDetail.leadership : 0}`,
                    `Organización ${list_pe_detail ? list_pe_detail.PEDetail.organization : 0}`,
                    `Adaptación al Cambio ${list_pe_detail ? list_pe_detail.PEDetail.adaptation_to_change : 0}`,
                    `Resolución de Problemas ${list_pe_detail ? list_pe_detail.PEDetail.problem_resolution : 0}`,
                    `Rigor Profesional ${list_pe_detail ? list_pe_detail.PEDetail.professional_rigor : 0}`,
                    `Orientación al Cliente (E/I) ${list_pe_detail ? list_pe_detail.PEDetail.customer_orientation : 0}`,
                    `Habilidades de Comunicación ${list_pe_detail ? list_pe_detail.PEDetail.communication_skills : 0}`,
                ]
            : null
        ,
        datasets: [
            {
                label: 'Resultados',
                data: list_pe_detail ? list_pe_detail.PEDetail.type_employee === "OPERATIVO" ? [
                    parseInt(list_pe_detail ? list_pe_detail.PEDetail.engagement_or_productivity : 0),
                    parseInt(list_pe_detail ? list_pe_detail.PEDetail.puntuality : 0),
                    parseInt(list_pe_detail ? list_pe_detail.PEDetail.relations : 0),
                    parseInt(list_pe_detail ? list_pe_detail.PEDetail.organization : 0),
                    parseInt(list_pe_detail ? list_pe_detail.PEDetail.adaptation_to_change : 0),
                    parseInt(list_pe_detail ? list_pe_detail.PEDetail.learning_and_development : 0),
                    parseInt(list_pe_detail ? list_pe_detail.PEDetail.continuous_improvement : 0),
                    parseInt(list_pe_detail ? list_pe_detail.PEDetail.active_participation : 0),
                    parseInt(list_pe_detail ? list_pe_detail.PEDetail.communication_skills : 0),
                ]
                    :
                    [
                        parseInt(list_pe_detail ? list_pe_detail.PEDetail.engagement_or_productivity : 0),
                        parseInt(list_pe_detail ? list_pe_detail.PEDetail.innovation : 0),
                        parseInt(list_pe_detail ? list_pe_detail.PEDetail.leadership : 0),
                        parseInt(list_pe_detail ? list_pe_detail.PEDetail.organization : 0),
                        parseInt(list_pe_detail ? list_pe_detail.PEDetail.adaptation_to_change : 0),
                        parseInt(list_pe_detail ? list_pe_detail.PEDetail.problem_resolution : 0),
                        parseInt(list_pe_detail ? list_pe_detail.PEDetail.professional_rigor : 0),
                        parseInt(list_pe_detail ? list_pe_detail.PEDetail.customer_orientation : 0),
                        parseInt(list_pe_detail ? list_pe_detail.PEDetail.communication_skills : 0),
                    ]
                    :
                    null
                ,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <div className="bg-white p-4  text-[12px] m-auto" id="Performans-Evaluation-Detail">
                {list_pe_detail ?
                    <>
                        <div className="m-auto lg:grid lg:grid-cols-3 grid grid-cols-1" >
                            {list_pe_detail.PEDetail.ccn_states_performance_evaluation === 4 && list_pe_detail.PEDetail.ccn_manager === current_user
                                ?
                                <div className="bg-white mx-auto rounded-lg ">
                                    <div className="mx-auto p-5">
                                        <div className="lg:grid lg:grid-cols-1 text-start sm:grid sm:grid-cols-1 my-3">
                                            <div className="mx-auto p-5">
                                                <form className="" onSubmit={handleSubmit(onSubmit)}>
                                                    <div>
                                                        <label
                                                            htmlFor="about"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            <h6 className="text-[20px] font-bold  mb-3">Validación</h6>
                                                            <p className="flex">
                                                                Apruebas o desapruebas los resultados de la evaluación <p className="text-red-700">* </p>

                                                            </p>
                                                        </label>
                                                        <div className="relative  gap-x-3 mb-3">
                                                            <fieldset className="flex flex-col">
                                                                <div className="mt-6 flex text-start justify-items-start">
                                                                    <div className="items-start mb-3 gap-x-3">
                                                                        <label htmlFor="push-email" className="block text-sm font-bold leading-6 text-gray-900">
                                                                            Apruebo
                                                                        </label>
                                                                        <label htmlFor="push-everything" className="block font-bold text-sm leading-6 text-gray-900">
                                                                            Desapruebo
                                                                        </label>
                                                                    </div>
                                                                    <div className="items-center grid mx-auto mb-3 gap-x-3">
                                                                        <input
                                                                            onChange={() => setManagerApproval(true)}
                                                                            name="push-notifications"
                                                                            type="radio"
                                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                        />
                                                                        <input
                                                                            onChange={() => setManagerApproval(false)}
                                                                            name="push-notifications"
                                                                            type="radio"
                                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                {errors
                                                                    .manager_response
                                                                    ?.type ===
                                                                    "required" && (
                                                                        <p className="text-red-700">* Es necesario seleccionar alguna opcion </p>
                                                                    )}
                                                            </fieldset>
                                                        </div>
                                                        <p className="flex mt-1 text-sm leading-6 mb-3 text-gray-600">Escribe un breve comentario justificando la decisión. <p className="text-red-700">* </p></p>
                                                        <div className="">
                                                            <p className="opacity-50"><i>puedes agregar maximo 500 caracteres</i></p>
                                                            <textarea
                                                                {...register("manager_response", {
                                                                    required: true,
                                                                })}
                                                                className="mt-1 block w-full  p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 "
                                                                placeholder="Escribe el texto aqui"
                                                            />
                                                            {errors
                                                                .manager_response
                                                                ?.type ===
                                                                "required" && (
                                                                    <p className="text-red-700">*Es necesario agregar un comentario </p>
                                                                )}

                                                        </div>
                                                    </div>
                                                    <input
                                                        value="Enviar"
                                                        type="submit"
                                                        className="bg-[#007367] cursor-pointer my-5 mx-auto w-[78px] h-[34px] rounded-lg text-white"
                                                    />
                                                </form>
                                            </div>
                                        </div>
                                    </div >
                                </div >
                                :
                                null
                            }
                            <div className={list_pe_detail.PEDetail.ccn_states_performance_evaluation === 4 ?
                                "lg:w-[812px] lg:col-span-2 mx-auto p-2 h-[83vh] overflow-y-auto block border-black lg:border-2 " :
                                "lg:w-[812px] lg:col-span-3 mx-auto p-2 h-[83vh] overflow-y-auto block border-black lg:border-2"}
                            >
                                <div className="hidden lg:block ">
                                    <div className="">
                                        <div className="grid grid-cols-5">
                                            <div className="grid grid-rows-5 mt-5 border-2 border-black">
                                                <h3 className="font-arial  border-black border-b-2 text-center">Codigo: <strong>HR-SOP004-F03</strong></h3>
                                                <h3 className="font-arial  border-black border-b-2">Versión: <strong>01</strong></h3>
                                                <h3 className="font-arial  border-black border-b-2">Creación: <strong>nov21</strong></h3>
                                                <h3 className="font-arial  border-black border-b-2">Revisión: <strong>nov24</strong></h3>
                                                <h3 className="font-arial  text-center"><strong>Página 1 de 2</strong></h3>
                                            </div>
                                            <div className="col-span-3 p-3 mt-5 border-2 border-y-black">
                                                <h3 className="mt-[50px] text-center">
                                                    <strong className=" font-arial">FORMATO EVALUACIÓN DE DESEMPEÑO PERSONAL
                                                        {list_pe_detail.PEDetail.type_employee === "OPERATIVO"
                                                            ?
                                                            " OPERATIVO"
                                                            :
                                                            list_pe_detail.PEDetail.type_employee === "ADMINISTRATIVO"
                                                                ?
                                                                " ADMINISTRATIVO"
                                                                :
                                                                " DIRECTIVO"}
                                                    </strong>
                                                </h3>
                                            </div>
                                            <div className="mt-5 border-2 border-black">
                                                <div className="my-auto">
                                                    <img src={LogoOficial} className="my-5" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <h3 className="lg:h-[25px] border-b-2 font-arial text-center border-black border-x-2"><strong>PROCESO: HUMAN RESOURCES</strong></h3>
                                            <h3 className="lg:h-[25px] border-b-2 font-arial text-center border-black border-r-2"><strong>DOCUMENTO CONTROLADO</strong></h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:grid lg:grid-cols-2 justify-items-center">
                                    <strong className="font-arial mt-[40px] mb-[30px] col-span-2 text-[20px] uppercase">Datos Generales</strong>
                                    <div className="my-3 ">
                                        <div className="grid grid-cols-1 ">
                                            <h6 className="font-arial"><strong>Nombre </strong></h6>
                                            <p className="font-arial border-2 border-gray-300 bg-gray-200 rounded-lg w-[300px] p-2">
                                                {list_pe_detail.PEDetail.full_name_employee}
                                            </p>
                                        </div>
                                        <div className="my-3">
                                            <h6 className="font-arial"><strong>Puesto </strong></h6>
                                            <p className="font-arial border-2 border-gray-300 bg-gray-200 rounded-lg w-[300px] p-2">
                                                {
                                                    list_pe_detail.PEDetail.role
                                                }
                                            </p>
                                        </div>
                                        <div className="my-3">
                                            <h6 className="font-arial "><strong>Resp./Evaluador </strong></h6>
                                            <p className="font-arial border-2 border-gray-300 bg-gray-200 rounded-lg w-[300px] p-2">
                                                {list_pe_detail.PEDetail.immediate_boss}
                                            </p>
                                        </div>
                                    </div>


                                    <div>
                                        <div className="my-3">
                                            <h6 className="font-arial "><strong>Fecha de Evaluación </strong></h6>
                                            <p className="font-arial border-2 border-gray-300 bg-gray-200 rounded-lg w-[300px] p-2">
                                                {moment(list_pe_detail.PEDetail.opening_date).format('DDMMMYY HH:mm')}
                                            </p>
                                        </div>
                                        <div className="my-3">
                                            <h6 className="font-arial "><strong>Fecha de Alta </strong></h6>
                                            <p className="font-arial border-2 border-gray-300 bg-gray-200 rounded-lg w-[300px] p-2">
                                                {moment(list_pe_detail.PEDetail.immediate_boss_question_date).format('DDMMMYY HH:mm')}
                                            </p>
                                        </div>
                                        <div className="my-3">
                                            <h6 className="font-arial "><strong>Departamento </strong></h6>
                                            <p className="font-arial border-2 border-gray-300 bg-gray-200 rounded-lg w-[300px] p-2">
                                                {
                                                    list_pe_detail.PEDetail.area
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <>
                                    <h6 className="font-arial mt-[40px] mb-[30px] text-[20px] uppercase"><strong>Informe de Resultados</strong></h6>
                                    <div className="lg:grid lg:w-[600px] lg:grid-cols-3 grid grid-cols-1 my-3">
                                        <div className=" border-black border-2 justify-items-center">
                                            <div className="">
                                                <div className="p-2 mx-auto border-black border-b-2 grid grid-cols-1 text-center">
                                                    <strong className="text-[60px] font-arial">{parseInt(list_pe_detail.PEDetail.overall_score / 9)}</strong>
                                                    <strong className="text-[40px] font-arial">Puntos</strong>
                                                </div>
                                                <div className="w-[110px] text-center mt-[40px] mx-auto">
                                                    {(average >= 0 && average < 25) ? <BROZE height="100" width="100" /> : null}
                                                    {(average >= 25 && average < 50) ? <SILVER height="100" width="100" /> : null}
                                                    {(average >= 50 && average < 80) ? <GOLD height="100" width="100" /> : null}
                                                    {(average >= 80 && average < 100) ? <DIAMOND height="100" width="100" /> : null}
                                                    {average === 100 ? <PLATINUM height="100" width="100" /> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:w-[593px] hidden lg:block lg:border-black lg:border-y-2 lg:border-r-2 border-black border-x-2 border-b-2">
                                            {list_pe_detail ?
                                                <Radar data={data} />
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                </>



                                <div className="">
                                    <h6 className="font-arial mt-[40px] mb-[30px] text-[20px] uppercase"><strong>Cuestionario de Evaluación</strong></h6>
                                    <div className="border-black border-2">
                                        <div className="text-center sm:grid sm:grid-cols-5">
                                            <dt className="lg:border-b-2 border-b-2 border-black">
                                                <h2 className="font-arial"><strong>Criterio de Evaluacion.</strong></h2>
                                            </dt>
                                            <dd className="lg:border-b-2 border-b-2 border-black col-span-2">
                                                <h2 className="font-arial"><strong>Definicion</strong></h2>
                                            </dd>
                                            <dd className="lg:border-b-2 border-b-2 border-black">
                                                <h2 className="font-arial"><strong>Nivel</strong></h2>
                                            </dd>
                                            <dd className="lg:border-b-2 border-b-2 border-black">
                                                <h2 className="font-arial"><strong>Valor</strong></h2>
                                            </dd>
                                        </div>
                                        <div className="text-start border-b-2 my-1 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
                                            <dt className="m-1 text-center">
                                                <strong className="font-arial">Compromiso/ Productividad</strong>
                                            </dt>
                                            <dd className="col-span-2 mx-1 font-arial">
                                                Conoce y comparte los valores de la empresa
                                                orientando sus intereses y comportamientos
                                                hacia las necesidades, prioridades y
                                                objetivos de la Compañía. Demuestra
                                                implicación y orgullo de pertenecer a la
                                                compañía en la que trabaja.
                                            </dd>
                                            <dd className="m-1 text-center font-arial rounded-lg p-2">
                                                {levels[list_pe_detail.PEDetail.engagement_or_productivity]}
                                            </dd>
                                            <dd className="m-1 text-center font-arial rounded-lg p-2">
                                                {list_pe_detail.PEDetail.engagement_or_productivity}
                                            </dd>
                                        </div>
                                        <div className="text-start border-b-2 my-1 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
                                            <dt className="m-1 text-center">
                                                <strong className="font-arial">Habilidades de Comunicación</strong>
                                            </dt>
                                            <dd className="col-span-2 mx-1 font-arial">
                                                Es capaz de transmitir comunicar clara y
                                                efectivamente las ideas tanto oral como por
                                                escrito. Usa los canales de comunicación
                                                apropiados para promulgar y espacir
                                                información e ideas de forma oportuna.
                                                Participa activamente y contribuye como
                                                mimebro efectivo del equipo
                                            </dd>
                                            <dd className="m-1 text-center font-arial  rounded-lg p-2">
                                                {levels[list_pe_detail.PEDetail.communication_skills]}
                                            </dd>
                                            <dd className="m-1 text-center font-arial  rounded-lg p-2">
                                                {list_pe_detail.PEDetail.communication_skills}
                                            </dd>
                                        </div>
                                        <div className="text-start border-b-2 my-1 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
                                            <dt className="m-1 text-center">
                                                <strong className="font-arial">Adaptación al Cambio</strong>
                                            </dt>
                                            <dd className="col-span-2 mx-1 font-arial">
                                                Es capaz de adaptarse y trabajar
                                                eficientemente en distintas situaciones y
                                                con personas o areas diversos. Valora los
                                                puntos de vista de los demás, mostrándose
                                                flexible y adaptando su propia postura a
                                                medida que la situación lo requiere. Genera
                                                respeto y valor al trabajo y opinion de sus
                                                compañeros{" "}
                                            </dd>
                                            <dd className=" m-1 text-center font-arial  rounded-lg p-2">
                                                {levels[list_pe_detail.PEDetail.adaptation_to_change]}
                                            </dd>
                                            <dd className="m-1 text-center font-arial  rounded-lg p-2">
                                                {list_pe_detail.PEDetail.adaptation_to_change}
                                            </dd>
                                        </div>
                                        <div className="text-start border-b-2 my-1 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
                                            <dt className="m-1 text-center">
                                                <strong className="font-arial">Organización</strong>
                                            </dt>
                                            <dd className="col-span-2 mx-1 font-arial">
                                                La persona conoce y tiene claras las
                                                políticas y responsabilidades de los
                                                sistemas de Gestion HSEQ. Participa
                                                activamente en los programas y
                                                capacitaciones de los sistemas de Gestion
                                                HSEQ. Revisa permanententemente los procesos
                                                y Procedimientos para la optimizacion de
                                                resultados y objetivos. Se anticipa a
                                                futuros problemas.
                                            </dd>
                                            <dd className=" m-1 text-center font-arial  rounded-lg p-2">
                                                {levels[list_pe_detail.PEDetail.organization]}
                                            </dd>
                                            <dd className="m-1 text-center font-arial  rounded-lg p-2">
                                                {list_pe_detail.PEDetail.organization}
                                            </dd>
                                        </div>
                                        {list_pe_detail.PEDetail.type_employee === "OPERATIVO"
                                            ?
                                            <>
                                                <div className="text-start border-b-2 my-1 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
                                                    <dt className="m-1 text-center">
                                                        <strong className="font-arial">Mejora Continua</strong>
                                                    </dt>
                                                    <dd className="col-span-2 mx-1 font-arial">
                                                        La persona tiene la capacidad para
                                                        identificar oportunidades de mejora de
                                                        procesos y condiciones de trabajo existentes
                                                        y proponer soluciones,
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial  rounded-lg p-2">
                                                        {levels[list_pe_detail.PEDetail.continuous_improvement]}
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial  rounded-lg p-2">
                                                        {list_pe_detail.PEDetail.continuous_improvement}
                                                    </dd>
                                                </div>
                                                <div className="text-start border-b-2 my-1 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
                                                    <dt className="m-1 text-center">
                                                        <strong className="font-arial">Aprendizaje y Desarrollo</strong>
                                                    </dt>
                                                    <dd className="col-span-2 mx-1 font-arial">
                                                        La persona tiene la capacidad para
                                                        identificar oportunidades de mejora de
                                                        procesos y condiciones de trabajo existentes
                                                        y proponer soluciones,
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial  rounded-lg p-2">
                                                        {levels[list_pe_detail.PEDetail.learning_and_development]}
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial  rounded-lg p-2">
                                                        {list_pe_detail.PEDetail.learning_and_development}
                                                    </dd>
                                                </div>
                                                <div className="text-start border-b-2 my-1 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
                                                    <dt className="m-1 text-center">
                                                        <strong className="font-arial">Participación Activa</strong>
                                                    </dt>
                                                    <dd className="col-span-2 mx-1 font-arial">
                                                        Transmite respeto en el trato con los demás
                                                        aceptando y valorando las diferencias
                                                        individuales. Habla de manera positiva en su
                                                        trabajo dando apoyo a sus pares y a la
                                                        compañía.?
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial  rounded-lg p-2">
                                                        {levels[list_pe_detail.PEDetail.active_participation]}
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial  rounded-lg p-2">
                                                        {list_pe_detail.PEDetail.active_participation}
                                                    </dd>
                                                </div>
                                                <div className="text-start border-b-2 my-1 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
                                                    <dt className="m-1 text-center">
                                                        <strong className="font-arial">Relaciones</strong>
                                                    </dt>
                                                    <dd className="col-span-2 mx-1 font-arial">
                                                        Es capaz de desempeñarse como miembro activo
                                                        del equipo, mantiene buenas relaciones
                                                        interpersonales. Mantiene una actitud de
                                                        servicio frente a sus clientes o solicitudes
                                                        de los compañeros. Fomenta el diálogo de
                                                        manera abierta y directa.{" "}
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial  rounded-lg p-2">
                                                        {levels[list_pe_detail.PEDetail.relations]}
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial   rounded-lg p-2">
                                                        {list_pe_detail.PEDetail.relations}
                                                    </dd>
                                                </div>
                                                <div className="text-start  my-1 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
                                                    <dt className="m-1 text-center">
                                                        <strong className="font-arial">Puntualidad</strong>
                                                    </dt>
                                                    <dd className="col-span-2 mx-1 font-arial">
                                                        La persona cumple y es puntual con el
                                                        horario y la jornada laboral. Muestra
                                                        interés para solucionar los errores
                                                        cometidos por el o sus compañeros Mantiene
                                                        interes por seguir los procesos relacionados
                                                        con permisos y ausencias.
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial  rounded-lg p-2">
                                                        {levels[list_pe_detail.PEDetail.puntuality]}
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial  rounded-lg p-2">
                                                        {list_pe_detail.PEDetail.puntuality}
                                                    </dd>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="text-start border-b-2  my-1 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
                                                    <dt className="m-1 text-center">
                                                        <strong className="font-arial">Orientación al Cliente (E/I)</strong>
                                                    </dt>
                                                    <dd className="col-span-2 mx-1 font-arial">
                                                        Es capaz de entender y detectar necesidades,
                                                        ofreciendo soluciones de forma proactiva que
                                                        superan las expectativas del cliente
                                                        (cliente interno y externo). Procura la
                                                        satisfacción del cliente al brindar un
                                                        servicio de excelencia. Entiende las
                                                        necesidades del cliente y busca exceder sus
                                                        expectativas.{" "}
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial rounded-lg p-2">
                                                        {levels[list_pe_detail.PEDetail.customer_orientation]}
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial rounded-lg p-2">
                                                        {list_pe_detail.PEDetail.customer_orientation}
                                                    </dd>

                                                </div>

                                                <div className="text-start border-b-2 my-1 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
                                                    <dt className="m-1 text-center">
                                                        <strong className="font-arial">Innovación</strong>
                                                    </dt>
                                                    <dd className="col-span-2 mx-1 font-arial">
                                                        Desarrolla, inspira, motiva y guía al equipo
                                                        para el logro de las metas que contribuyen a
                                                        la mejora de la Compañía. Comparte sus
                                                        nuevos conocimiento, habilidades y
                                                        experiencia con el resto del equipo.
                                                    </dd>
                                                    <dd className=" m-1 text-center font-arial rounded-lg p-2">
                                                        {levels[list_pe_detail.PEDetail.innovation]}
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial rounded-lg p-2">
                                                        {list_pe_detail.PEDetail.innovation}
                                                    </dd>
                                                </div>
                                                <div className="text-start border-b-2 my-1 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
                                                    <dt className="m-1 text-center">
                                                        <strong className="font-arial">Rigor Profesional</strong>
                                                    </dt>
                                                    <dd className="col-span-2 mx-1 font-arial">
                                                        Posee y demuestra aprendizaje continuo al
                                                        estar al tanto de nuevos desarrollos y
                                                        adquiriendo nuevas habilidades relacionadas
                                                        la trabajo las capacidades y/o conocimientos
                                                        técnicos que le permiten desarrollar las
                                                        labores relativas a su puesto de trabajo.
                                                        Genera credibilidad en otros teniendo como
                                                        base los conocimientos técnicos de su
                                                        especialidad.
                                                    </dd>
                                                    <dd className=" m-1 text-center font-arial rounded-lg p-2">
                                                        {levels[list_pe_detail.PEDetail.professional_rigor]}
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial rounded-lg p-2">
                                                        {list_pe_detail.PEDetail.professional_rigor}
                                                    </dd>
                                                </div>
                                                <div className="text-start border-b-2 my-1 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
                                                    <dt className="m-1 text-center">
                                                        <strong className="font-arial">Resolución de Problemas</strong>
                                                    </dt>
                                                    <dd className="col-span-2 mx-1 font-arial">
                                                        Es capaz de organizar al equipo de trabajo
                                                        que tiene bajo su responsabilidad,
                                                        brindarles las pautas y alineamientos sobre
                                                        cómo deben realizar su trabajo, bajo qué
                                                        parámetros, y que dichas pautas sean
                                                        comprendidas y acatadas por las personas.
                                                        Considera las implicaciones antes de llevar
                                                        a cabo una acción.{" "}
                                                    </dd>
                                                    <dd className=" m-1 text-center font-arial rounded-lg p-2">
                                                        {levels[list_pe_detail.PEDetail.problem_resolution]}
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial rounded-lg p-2">
                                                        {list_pe_detail.PEDetail.problem_resolution}
                                                    </dd>
                                                </div>
                                                <div className="text-start  my-1 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
                                                    <dt className="m-1 text-center">
                                                        <strong className="font-arial">Liderazgo</strong>
                                                    </dt>
                                                    <dd className="col-span-2 mx-1 font-arial">
                                                        Participa activamente en la consecución de
                                                        una meta común, incluso cuando dicha meta no
                                                        está directamente relacionada con los
                                                        intereses personales. Demuestra interés por
                                                        el logro de metas individuales y
                                                        organizacionales con compromiso. El grupo lo
                                                        percibe como líder y se orienta en función
                                                        de los objetivos propuestos.
                                                    </dd>
                                                    <dd className=" m-1 text-center font-arial  rounded-lg p-2">
                                                        {levels[list_pe_detail.PEDetail.leadership]}
                                                    </dd>
                                                    <dd className="m-1 text-center font-arial rounded-lg p-2">
                                                        {list_pe_detail.PEDetail.leadership}
                                                    </dd>
                                                </div></>}
                                    </div>
                                </div>
                                <div className="mb-[59px]">
                                    <h3 className="mt-[40px] mb-[30px] font-arial text-[20px] uppercase"><strong>Comentario del Empleado</strong></h3>
                                    <dd className="mx-4 text-gray-900  rounded-lg p-2 min-h-[50px] font-arial">{list_pe_detail.PEDetail.employee_response}</dd>
                                </div>

                                <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 border-black border-2 p-2">
                                    <div className="border-black lg:border-r-2 p-2">
                                        <div className="grid grid-cols-1 gap-2 ">
                                            <h3 className="font-arial text-[13px]"><strong>Plan de Accion</strong></h3>

                                            <div className="border-2 border-black">
                                                <div className="grid grid-cols-2 border-black border-b-2">
                                                    <h4 className="mx-5 my-3 font-arial text-center text-black"><strong>Plan de accion </strong></h4>
                                                    <h4 className="mx-5 my-3 font-arial text-center text-black"><strong>Fecha de Inicio (Cuatrimestre)</strong></h4>
                                                </div>

                                                <div className="grid grid-cols-2 ">
                                                    <p className="mx-5 font-arial rounded-lg my-2 text-center">{list_pe_detail.PEDetail.first_action_plan}</p>
                                                    <p className="mx-5 font-arial rounded-lg my-2 text-center">{list_pe_detail.PEDetail.first_action_plan_date}</p>
                                                </div>
                                                {list_pe_detail.PEDetail.second_action_plan_date != 0
                                                    ?
                                                    <div className="grid grid-cols-2 border-t-2 border-black">
                                                        <p className="mx-5 font-arial my-2 text-center">{list_pe_detail.PEDetail.second_action_plan}</p>
                                                        <p className="mx-5 font-arial my-2 text-center">{list_pe_detail.PEDetail.second_action_plan_date}</p>
                                                    </div>
                                                    :
                                                    null}

                                                {list_pe_detail.PEDetail.third_action_plan_date != 0
                                                    ?
                                                    <div className="grid grid-cols-2 border-t-2 border-black">
                                                        <p className="mx-5 font-arial rounded-lg my-2 text-center">{list_pe_detail.PEDetail.third_action_plan}</p>
                                                        <p className="mx-5 font-arial rounded-lg my-2 text-center">{list_pe_detail.PEDetail.third_action_plan_date}</p>
                                                    </div>
                                                    :
                                                    null}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 p-2">
                                        </div>
                                    </div>
                                    <div className="">
                                        <h3 className="mx-4 my-5 font-arial text-[13px]"><strong>Comentarios, observaciones incluyendo, fortalezas y áreas de mejora o concreta el plan de acción. </strong></h3>
                                        <p className="mx-4 my-5 font-arial rounded-lg p-2 min-h-[50px] text-gray-900 ">{list_pe_detail.PEDetail.immediate_boss_observation}</p>
                                    </div>
                                </div>


                                {list_pe_detail.PEDetail.ccn_states_performance_evaluation == 5 || 6
                                    ?
                                    <div className="grid grid-cols-1 p-3">
                                        <div className="grid grid-cols-1 mb-5">
                                            <div className="mt-[40px] mb-[30px]">
                                                <h4><strong className="text-[20px] uppercase">Aprobaciones</strong></h4>
                                            </div>
                                            <div className="grid grid-cols-1 gap-y-10 lg:grid lg:grid-cols-3 ">
                                                <div className="grid grid-cols-1 px-5">
                                                    <p>Firmado Digitalmente por:</p>
                                                    <p>
                                                        <strong>
                                                            {list_pe_detail.PEDetail.manager}
                                                        </strong>
                                                    </p>
                                                    <p>C.C. {list_pe_detail.PEDetail.manager_number_id_employee}</p>
                                                    <p>{moment(performanceEvaluation.finish_date).format('DDMMMYY HH:mm')}</p>
                                                    <div className="border-2 border-b-black"></div>
                                                    <p className="text-center"><strong>Firma Manager</strong></p>
                                                </div>
                                                <div className="grid grid-cols-1 px-5">
                                                    <p>Firmado Digitalmente por:</p>
                                                    <p>
                                                        <strong>
                                                            {list_pe_detail.PEDetail.full_name_employee}
                                                        </strong>
                                                    </p>
                                                    <p>C.C. {list_pe_detail.PEDetail.number_id_employee}</p>
                                                    <p>{moment(performanceEvaluation.employee_response_date).format('DDMMMYY HH:mm')}</p>
                                                    <div className="border-2 border-b-black"></div>
                                                    <p className="text-center"><strong>Firma Empleado</strong></p>
                                                </div>
                                                <div className="grid grid-cols-1 px-5">
                                                    <p>Firmado Digitalmente por:</p>
                                                    <p>
                                                        <strong>
                                                            {list_data_employee
                                                                ? list_data_employee.Employees.find(
                                                                    (employee) =>
                                                                        employee.ccn_employee === 3
                                                                ).full_name_employee
                                                                : 3}
                                                        </strong>
                                                    </p>
                                                    <p>C.C. {list_data_employee
                                                        ? list_data_employee.Employees.find(
                                                            (employee) =>
                                                                employee.ccn_employee === 3
                                                        ).number_id_employee
                                                        : 3}
                                                    </p>
                                                    <p>{moment(list_pe_detail.PEDetail.finish_date).format('DDMMMYY HH:mm')}</p>
                                                    <div className="border-2 border-b-black"></div>
                                                    <p className="text-center"><strong>Firma Recursos Humanos</strong></p>
                                                </div>
                                            </div>
                                            <div className="flex mt-[40px] mb-[30px]">
                                                <p>{list_pe_detail.PEDetail.manager_approval ? <Approval /> : <Disapprove />}</p>
                                                <p className="my-auto mx-5 "><strong>{list_pe_detail.PEDetail.manager_response}</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </>
                    :
                    <IsotipoPlena className={"animate-spin mx-auto"} width="100" height="100" />}
            </div >
            {/*{performanceEvaluation.ccn_states_performance_evaluation === 5
                ? <div className="mx-auto">
                    <button className=" bg-white tracking-wide text-gray-900 text-sm font-bold rounded border-b-2 border-green-600 hover:border-green-900 hover:bg-green-600 hover:text-white shadow-md py-2 px-5 inline-flex items-center" onClick={generatePdf}>Descargar</button >
                </div>
                : null}*/}
        </>);
}
export default PerformanceEvaluationDetail;

