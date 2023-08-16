import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { GOLDI, ProgressBar, SILVERI, DIAMONDI, PLATINUMI, BRONZEI } from "../assets/images/SVG";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

const EventNotifierEmployees = () => {

	const nombre_usuario_actual = useSelector((state) => state);

	const current_user = nombre_usuario_actual.authAPISlice.current_user.ccn_employee || 0

	const [employeePerformanceEvaluation, setEmployeePerformanceEvaluation] =
		useState([]);
	const [employeeDetail, setemployeeDetail] = useState({
		type: null,
		ccn_performance_evaluation: 0,
	});
	const [PerformanceEvaluationDetail, setPerformanceEvaluationDetail] =
		useState({});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {},
	});

	const onSubmit = (data) => {
		const sedData = async () => {
			const body = {
				employee_response: data.employee_response,
			};

			const type_of_employee = employeePerformanceEvaluation.length != 0 ? employeePerformanceEvaluation[0].type_employee : null

			const url = type_of_employee === "ADMINISTRATIVO"
				?
				`${import.meta.env.VITE_API_ADDRESS}second_section_ape/${employeePerformanceEvaluation[0].ccn_performance_evaluation}`
				:
				type_of_employee === "OPERATIVO" ? `${import.meta.env.VITE_API_ADDRESS}second_section_ope/${employeePerformanceEvaluation[0].ccn_performance_evaluation}`
					:
					`${import.meta.env.VITE_API_ADDRESS}second_section_dpe/${employeePerformanceEvaluation[0].ccn_performance_evaluation}`
			const response = await axios
				.put(url
					,
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
		};
		const confirmation = window.confirm("¿Estás seguro(a) que deseas enviar tus comentarios? \n Recuerda que una vez enviado no podrás modificarlo.")
		if (confirmation === true) {
			sedData();
		}
	};
	const getEvents = async () => {
		try {
			const respEmployeePerformanceEvaluation = await axios(
				`${import.meta.env.VITE_API_ADDRESS
				}performance_evaluation/employee/${current_user}`
			);
			setEmployeePerformanceEvaluation(
				respEmployeePerformanceEvaluation.data.PerformanceEvaluation
			);
			setemployeeDetail({
				type: respEmployeePerformanceEvaluation.data
					.PerformanceEvaluation[0].type_employee,
				ccn_performance_evaluation:
					respEmployeePerformanceEvaluation.data
						.PerformanceEvaluation[0].ccn_performance_evaluation,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const getDetails = async () => {
		if (employeeDetail.type === "DIRECTIVO") {
			const respDetailPerformanceEvaluation = await axios(
				`${import.meta.env.VITE_API_ADDRESS
				}directive_performance_evaluation_detail/${employeeDetail.ccn_performance_evaluation
				}`
			);
			setPerformanceEvaluationDetail(
				respDetailPerformanceEvaluation.data.DirectivePE
			);
		} else if (employeeDetail.type === "ADMINISTRATIVO") {
			const respDetailPerformanceEvaluation = await axios(
				`${import.meta.env.VITE_API_ADDRESS
				}administrative_performance_evaluation_detail/${employeeDetail.ccn_performance_evaluation
				}`
			);
			setPerformanceEvaluationDetail(
				respDetailPerformanceEvaluation.data.AdministrativePE
			);
		} else if (employeeDetail.type === "OPERATIVO") {
			const respDetailPerformanceEvaluation = await axios(
				`${import.meta.env.VITE_API_ADDRESS
				}operative_performance_evaluation_detail/${employeeDetail.ccn_performance_evaluation
				}`
			);
			setPerformanceEvaluationDetail(
				respDetailPerformanceEvaluation.data.OperativePE
			);
		}
	};

	if (!employeePerformanceEvaluation) return <></>;
	useEffect(() => {
		getEvents();
	}, []);
	if (!PerformanceEvaluationDetail) return <></>;
	useEffect(() => {
		getDetails();
	}, [employeePerformanceEvaluation]);

	return (
		<>
			{employeePerformanceEvaluation.length > 0 ? (
				<>
					<div className=" border-gray-400  rounded-lg border-2 lg:grid lg:grid-cols-2 sm:grid sm:grid-cols-1 overflow-x-scroll ">
						<div className="px-4 w-[293px] lg:py-5 sm:py-1 sm:px-6 ">
							<h4 className="justify-items-start text-start px-3 text-[35px] text-black">
								<strong>Evaluacion de Desempeño 2022</strong>
							</h4>
							<p className="px-3 justify-items-center">
								Una vez realizado el proceso de la evaluación de desempeño
								por parte de su jefe inmediato y teniendo en cuenta el tiempo
								que lleva desempeñando sus funciones en el año 2022.
							</p>
							<p className="px-3 font-bold">Estos son los resultados acordes a cada habilidad evaluada.</p>
						</div>
						<div className="px-3 mt-3 border-t lg:w-[400px] sm:w-[250px]  lg:py-5 border-gray-200">
							<dl>
								<div className="bg-gray-50 px-4 lg:py-2 grid grid-rows-2 sm:grid sm:grid-rows-2">
									{employeeDetail.type != "OPERATIVO" ? (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Compromiso/ Productividad:{" "}
													{
														PerformanceEvaluationDetail.engagement_or_productivity
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.engagement_or_productivity
												}
											/>
										</>
									) : (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Compromiso/ Productividad:
													{
														PerformanceEvaluationDetail.engagement_or_productivity
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.engagement_or_productivity
												}
											/>
										</>
									)}
								</div>
								<div className="bg-gray-50 px-4 py-2 grid grid-rows-2 sm:grid sm:grid-rows-2">
									{employeeDetail.type != "OPERATIVO" ? (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Habilidades de Comunicación:
													{
														PerformanceEvaluationDetail.communication_skills
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.communication_skills
												}
											/>
										</>
									) : (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Habilidades de Comunicación:
													{
														PerformanceEvaluationDetail.communication_skills
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.communication_skills
												}
											/>
										</>
									)}
								</div>
								<div className="bg-gray-50 px-4 py-2 grid grid-rows-2 sm:grid sm:grid-rows-2">
									{employeeDetail.type != "OPERATIVO" ? (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Adaptación al Cambio:
													{
														PerformanceEvaluationDetail.adaptation_to_change
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.adaptation_to_change
												}
											/>
										</>
									) : (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Adaptación al Cambio:
													{
														PerformanceEvaluationDetail.adaptation_to_change
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.adaptation_to_change
												}
											/>
										</>
									)}
								</div>
								<div className="bg-gray-50 px-4 py-2 grid grid-rows-2 sm:grid sm:grid-rows-2">
									{employeeDetail.type != "OPERATIVO" ? (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Orientacion al Cliente
													(E/I):
													{
														PerformanceEvaluationDetail.customer_orientation
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.customer_orientation
												}
											/>
										</>
									) : (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Aprendizaje y Desarrollo:
													{
														PerformanceEvaluationDetail.learning_and_development
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.learning_and_development
												}
											/>
										</>
									)}
								</div>
								<div className="bg-gray-50 px-4 py-2 grid grid-rows-2 sm:grid sm:grid-rows-2">
									{employeeDetail.type != "OPERATIVO" ? (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Innovación:
													{
														PerformanceEvaluationDetail.innovation
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.innovation
												}
											/>
										</>
									) : (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Organización:
													{
														PerformanceEvaluationDetail.organization
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.organization
												}
											/>
										</>
									)}
								</div>
								<div className="bg-gray-50 px-4 py-2 grid grid-rows-2 sm:grid sm:grid-rows-2">
									{employeeDetail.type != "OPERATIVO" ? (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Rigor Profesional:
													{
														PerformanceEvaluationDetail.professional_rigor
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.professional_rigor
												}
											/>
										</>
									) : (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Mejoramiento continuo:
													{
														PerformanceEvaluationDetail.continuous_improvement
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.continuous_improvement
												}
											/>
										</>
									)}
								</div>
								<div className="bg-gray-50 px-4 py-2 grid grid-rows-2 sm:grid sm:grid-rows-2">
									{employeeDetail.type != "OPERATIVO" ? (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Resolucion de Problemas:
													{
														PerformanceEvaluationDetail.problem_resolution
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.problem_resolution
												}
											/>
										</>
									) : (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Participación Activa:
													{
														PerformanceEvaluationDetail.active_participation
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.active_participation
												}
											/>
										</>
									)}
								</div>
								<div className="bg-gray-50 px-4 py-2 grid grid-rows-2 sm:grid sm:grid-rows-2">
									{employeeDetail.type != "OPERATIVO" ? (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Liderazgo:
													{
														PerformanceEvaluationDetail.leadership
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.leadership
												}
											/>
										</>
									) : (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Relaciones:
													{
														PerformanceEvaluationDetail.relations
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.relations
												}
											/>
										</>
									)}
								</div>
								<div className="bg-gray-50 px-4 py-2 grid grid-rows-2 sm:grid sm:grid-rows-2">
									{employeeDetail.type != "OPERATIVO" ? (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Organización:
													{
														PerformanceEvaluationDetail.organization
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.organization
												}
											/>
										</>
									) : (
										<>
											<dd className="text-[14px] text-gray-900 sm:mt-0">
												<strong>
													Puntualidad:
													{
														PerformanceEvaluationDetail.puntuality
													}
													%
												</strong>
											</dd>
											<ProgressBar
												value={
													PerformanceEvaluationDetail.puntuality
												}
											/>
										</>
									)}
								</div>
							</dl>
						</div>
						<div className="text-[20px] p-3 col-span-2">
							<h3 className="text-[20px]"><strong>3. Autoevaliacion</strong></h3>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="text-xs mt-3 lg:text-sm">
									Estimado Empleado: Escribe una breve
									apreciación de su desempeño durante este año o
									desde el inicio con Plena Global.
									<div className="mt-3">
										<p className="opacity-50"><i>puedes agregar maximo 500 caracteres</i></p>
										<textarea
											{...register("employee_response", {
												required: true,
											})}
											className="mt-1 block w-full p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 "
											placeholder="Escribe el texto aqui"
										/>
										<input
											value="Enviar"
											type="submit"
											className="bg-[#007367] my-5 mx-auto w-[78px] h-[34px] rounded-lg text-white"
										/>
									</div>
								</div>
							</form>
						</div>
					</div>
				</>
			) : null}
		</>
	);
};
const EventNotifierInmediateBoss = () => {
	const dispatch = useDispatch();
	const [employee, setEmployee] = useState([]);
	const [instructions, setInstructions] = useState(1);
	const [
		immediateBossPerformanceEvaluation,
		setImmediateBossPerformanceEvaluation,
	] = useState([]);

	const nombre_usuario_actual = useSelector((state) => state);

	const current_user = nombre_usuario_actual.authAPISlice.current_user.ccn_employee || 0

	const getEvents = async () => {
		try {
			const respEmployee = await axios(
				`${import.meta.env.VITE_API_ADDRESS}employee`
			);
			for (const currentEmployee of respEmployee.data.Employees) {
				employee.push({
					ccn_employee: currentEmployee.ccn_employee,
					full_name_employee: currentEmployee.full_name_employee,
				});
			}
			const ImmediateBossPerformanceEvaluation = await axios(
				`${import.meta.env.VITE_API_ADDRESS
				}performance_evaluation/immediate_boss/${current_user}`
			);
			setImmediateBossPerformanceEvaluation(
				ImmediateBossPerformanceEvaluation.data.PerformanceEvaluation
			);
		} catch (error) {
			console.log(error);
		}
	};

	if (!immediateBossPerformanceEvaluation) return <></>;
	useEffect(() => {
		getEvents();
	}, []);

	return (
		<>
			{immediateBossPerformanceEvaluation.length != 0 &&
				instructions === 1 ? (
				<div className="lg:w-[50%] ml-3 mt-5 sm:w-[100%]">
					{immediateBossPerformanceEvaluation.find((state) => state.ccn_states_performance_evaluation === 1) ? <div className="lg:w-[966px] rounded-lg text-[35px] bg-[#EFE5F1] p-5">
						<strong> Evaluacion de Desempeño 2022</strong>
						<div className="lg:grid lg:grid-cols-2 p-3 sm:grid sm:grid-cols-1">
							<li className="text-[16px] my-[50px]">
								Antes de iniciar la evaluación por favor lee y analiza las instrucciones;
								si tienes alguna duda o novedad, por favor notifica al equipo de Recursos Humanos.
							</li>
							<li className="text-[16px] my-[50px]">
								Recuerda que un líder es capaz de percibir los problemas, analizarlos y
								transmitirlos de forma constructiva.
							</li>
						</div>
						<button
							className="text-[16px]  bg-[#B37FB9] p-2 rounded-lg text-white"
							onClick={() => setInstructions(2)}
						>
							<strong>Instrucciones</strong>
						</button>
					</div> : null}
					<div className="lg:grid lg:grid-cols-1 mx-auto justify-center sm:grid sm:grid-cols-1">
						{immediateBossPerformanceEvaluation.map(
							(performanceEvaluation) => (
								<div
									key={
										performanceEvaluation.ccn_performance_evaluation
									}
									className="lg:w-[450px] rounded-lg bg-white grid grig-cols-1  my-2 border-4"
								>
									<p className="">
										{performanceEvaluation.ccn_states_performance_evaluation ===
											1 ? (
											<div className="mx-auto">
												<h2 className={new Date(performanceEvaluation.opening_date) > new Date() ?
													"text-end text-[13px] mx-2 text-red-800"
													:
													"text-end text-[13px] mx-2 text-green-800"}>
													{new Date(performanceEvaluation.opening_date) < new Date() ?
														<div className="flex gap-x-1 justify-end items-center my-auto "><AiFillCheckCircle /><strong>disponible</strong></div> :
														<div className="flex gap-x-1 justify-end items-center my-auto "><AiFillCloseCircle /><strong>disponible el {format(new Date(performanceEvaluation.opening_date), "ddMMMyy")}</strong></div>}

												</h2>
												<h2 className="mx-3 my-1">
													<strong>Calificar</strong>
												</h2>
												<p className="p-3">
													Pulsa sobre el nombre del evaluado para iniciar la
													evaluación de desempeño de:
												</p>
											</div>
										) : (
											<div className="mx-auto">
												<h2 className="mx-3 my-1">
													<strong>
														Plan de Accion
													</strong>
												</h2>
												<p className="p-3">
													Pulsa sobre el nombre para
													asignar el plan de accion
													correspondiente para:
												</p>
											</div>
										)}
										{new Date(performanceEvaluation.opening_date) > new Date()
											?
											<div
												className="flex ml-3 mb-2 rounded-lg "
											>
												<strong className="underline text-gray-400">
													{employee.length != 0
														? employee.find(
															(employee) =>
																employee.ccn_employee ===
																performanceEvaluation.ccn_employee
														).full_name_employee
														: performanceEvaluation.ccn_performance_evaluation}
												</strong>
											</div>
											:
											<Link
												onClick={() =>
													dispatch(
														change_state_step1_to_step2(
															"test"
														)
													)
												}
												className="flex ml-3 mb-2 rounded-lg"
												to={`${import.meta.env.VITE_REDIRECT
													}/performance-evaluation-detail/${performanceEvaluation.ccn_performance_evaluation
													}/ImmediateBoss`}
											>
												<strong className="underline text-[#B37FB9]">
													{employee.length != 0
														? employee.find(
															(employee) =>
																employee.ccn_employee ===
																performanceEvaluation.ccn_employee
														).full_name_employee
														: performanceEvaluation.ccn_performance_evaluation}
												</strong>
											</Link>
										}

									</p>
								</div>

							)
						)}
					</div>
				</div >
			) : immediateBossPerformanceEvaluation.length != 0 &&
				instructions === 2 ? (
				<div className="bg-white mx-auto">
					<div className="lg:w-[100%] sm:w-[50%] gap-x-5 lg:grid lg:grid-cols-2 lg:p-5 sm:grid sm:grid-cols-1">
						<h1 className="lg:px-[35px] col-span-2 sm:p-5 ">
							<strong>Instrucciones</strong>
						</h1>
						<div className="col-span-1 p-5 lg:w-[500px]">
							<p className=""><strong>• Fecha de evaluación:</strong> la evaluación estará disponible a partir de la fecha que aparece en el recuadro superior del colaborador. (Poner imagen de ejemplo)</p>
							<p className="mt-5"><strong>• Puntaje Total:</strong> Es el puntaje total de las habilidades evaluadas.</p>
							<p className="ml-5 mt-5">o Nivel de Resultados Escala Global: Acuerdo al resultado promedio total, es el título que recibe cada empleado evaluado.</p>

							<div className="gird grid-rows-2 mx-5 py-2 gap-4">
								<div className="grid grid-cols-2 lg:grid lg:grid-cols-2 px-4 py-1">
									<h3 className="text-base text-center border border-y-black col-span-2 text-[30px] font-semibold leading-6 bg-[#E5F1EF] text-black">
										Escala Global
									</h3>
									<h2 className="border border-b-black text-center">
										<strong>Nivel</strong>
									</h2>
									<h2 className="border border-b-black text-center">
										<strong>Puntos</strong>
									</h2>
									<h4 className="text-center border border-b-black">
										BRONCE
									</h4>
									<h4 className="border border-b-black">
										<BRONZEI />
									</h4>
									<h4 className="text-center border border-b-black">
										PLATA
									</h4>
									<h4 className="text-center border border-b-black">
										<SILVERI />
									</h4>

									<h4 className="text-center border border-b-black">
										ORO
									</h4>
									<h4 className="text-center border border-b-black">
										<GOLDI />
									</h4>

									<h4 className="text-center border border-b-black">
										DIAMANTE
									</h4>
									<h4 className="text-center border border-b-black">
										<DIAMONDI />
									</h4>

									<h4 className="text-center border border-b-black">
										PLATINO
									</h4>
									<h4 className="text-center border border-b-black">
										<PLATINUMI />
									</h4>
								</div>
							</div>
							<p className="mt-5">
								<strong>• Calificación de Habilidades:</strong> De manera objetiva el evaluador asignará un puntaje por competencia evaluada.
							</p>
						</div>
						<div className="col-span-1 p-5 m-auto lg:w-[500px]">
							<div className="gird grid-rows-2 mx-5 py-2 gap-4">
								<div className="grid grid-cols-2 lg:grid lg:grid-cols-2 px-4 py-1">
									<h3 className="text-base text-center border border-y-black col-span-2 text-[30px] font-semibold leading-6 bg-[#E5F1EF] text-black">
										Tabla de Niveles
									</h3>
									<h2 className="border border-b-black text-center">
										<strong>Nivel</strong>
									</h2>
									<h2 className="border border-b-black text-center">
										<strong>Puntos</strong>
									</h2>
									<h4 className="text-center border border-b-black">
										No Aplica
									</h4>
									<h4 className="text-center border border-b-black">
										0
									</h4>
									<h4 className="text-center border border-b-black">
										Bajo
									</h4>
									<h4 className="text-center border border-b-black">
										25
									</h4>
									<h4 className="text-center border border-b-black">
										Medio
									</h4>
									<h4 className="text-center border border-b-black">
										50
									</h4>
									<h4 className="text-center border border-b-black">
										Alto
									</h4>
									<h4 className="text-center border border-b-black">
										80
									</h4>
									<h4 className="text-center border border-b-black">
										Excelente
									</h4>
									<h4 className="text-center border border-b-black">
										100
									</h4>
								</div>
							</div>
							<p className="mt-5"><strong>• Autoevaluación:</strong>Espacio en el que el evaluado puede hacer un breve descripción o apreciación de su desempeño laboral del periodo evaluado, de acuerdo con los ítems evaluados.</p>
							<p className="mt-5"><strong>• Plan de Acción:</strong> El evaluador teniendo en cuenta la evaluación y autoevaluación generará entre 1 a 3 propuestas de mejora para el evaluado para el nuevo año de evaluación.</p>
							<p className="mt-5"><strong>• Comentario de Cierre de Evaluación:</strong> El evaluador realizará un comentario final sobre la evaluación informando el porqué está de acuerdo o en desacuerdo con el resultado de la evaluación.</p>
							<p className="mt-5"><strong>• Nota Final:</strong> Es de aclarar que si la evaluación se envía en estado Rechazado la evaluación se generará de nuevo, pero para la calificación del jefe superior inmediato.</p>
						</div>
					</div>
					<button
						className=" mx-5 text-[16px] mb-3 bg-[#B37FB9] p-2 rounded-lg text-white"
						onClick={() => setInstructions(1)}
					>
						<strong>Regresar</strong>
					</button>
				</div>
			) : null}
		</>
	);
};
const EventNotifierManager = () => {
	const [managerPerformanceEvaluation, setManagerPerformanceEvaluation] =
		useState([]);

	const [employee, setEmployee] = useState([]);
	const nombre_usuario_actual = useSelector((state) => state);

	const current_user = nombre_usuario_actual.authAPISlice.current_user.ccn_employee || 0

	const getEvents = async () => {
		try {
			const respEmployee = await axios(
				`${import.meta.env.VITE_API_ADDRESS}employee`
			);
			for (const currentEmployee of respEmployee.data.Employees) {
				employee.push({
					ccn_employee: currentEmployee.ccn_employee,
					full_name_employee: currentEmployee.full_name_employee,
				});
			}
			const ManagerPerformanceEvaluation = await axios(
				`${import.meta.env.VITE_API_ADDRESS
				}performance_evaluation/manager/${current_user}`
			);
			setManagerPerformanceEvaluation(
				ManagerPerformanceEvaluation.data.PerformanceEvaluation
			);
		} catch (error) {
			console.log(error);
		}
	};

	if (!managerPerformanceEvaluation) return <></>;
	useEffect(() => {
		getEvents();
	}, []);
	return (
		<>
			{managerPerformanceEvaluation.length != 0
				? <div className="lg:w-[50%] sm:w-[100%]">
					<div className="lg:w-[966px] lg:h-[299px] text-[35px] bg-[#F2F2F2] p-5">
						<strong> Evaluacion de Desempeño 2022</strong>
						<div className="lg:grid lg:grid-cols-1 sm:grid sm:grid-cols-1">
							<li className="text-[16px] my-[50px]">
								A continuación se presentan las evaluaciones de desempeño
								pendientes por validación. Por favor dirígete a la evaluación
								de cada empleado, e indica si apruebas o desapruebas el resultado.
							</li>
						</div>
					</div>
				</div>
				:
				null
			}
			<div className="">
				{managerPerformanceEvaluation.map((performanceEvaluation) => (
					<div
						key={performanceEvaluation.ccn_performance_evaluation}
						className="lg:w-[350px] rounded-lg bg-white grid grig-cols-1 my-5 border-4"
					>
						<h2 className="mx-3 my-1">
							<strong>
								Evaluacion de Desempeño 2022
							</strong>
						</h2>
						<p className="p-3">
							Pulsa para validar la evaluación de desempeño de
						</p>
						<Link
							onClick={() =>
								dispatch(
									change_state_step1_to_step2(
										"test"
									)
								)
							}
							className="flex ml-3 mb-2 rounded-lg"
							to={`${import.meta.env.VITE_REDIRECT
								}/performance-evaluation-detail/${performanceEvaluation.ccn_performance_evaluation
								}`}
						>
							<strong className="underline">
								{employee.length != 0
									? employee.find(
										(employee) =>
											employee.ccn_employee ===
											performanceEvaluation.ccn_employee
									).full_name_employee
									: performanceEvaluation.ccn_performance_evaluation}
							</strong>
						</Link>
					</div>
				))}
			</div>
		</ >
	);
};

export {
	EventNotifierEmployees,
	EventNotifierInmediateBoss,
	EventNotifierManager,
};
