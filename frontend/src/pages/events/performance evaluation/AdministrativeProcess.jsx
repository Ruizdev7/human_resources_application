import axios from "axios";
import { useState, useEffect } from "react";
import { get, useForm } from "react-hook-form";
import { ProgressBar } from "../../../assets/images/SVG";
import LogoOficial from "../../../assets/images/logo_oficial_plena.jpg"
import { BROZE, SILVER, GOLD, DIAMOND, PLATINUM } from "../../../assets/images/SVG";
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

function ImmediatiBossFormAPE({ ccn_performance_evaluation }) {
	const [engagementOrProductivity, setEngagementOrProductivity] = useState(0);
	const [communicationSkills, setCommunicationSkills] = useState(0);
	const [adaptation_to_change, setadaptation_to_change] = useState(0);
	const [customer_orientation, setcustomer_orientation] = useState(0);
	const [innovation, setinnovation] = useState(0);
	const [professional_rigor, setprofessional_rigor] = useState(0);
	const [problem_resolution, setproblem_resolution] = useState(0);
	const [leadership, setleadership] = useState(0);
	const [organization, setorganization] = useState(0);

	const total = (
		parseInt(engagementOrProductivity) +
		parseInt(communicationSkills) +
		parseInt(adaptation_to_change) +
		parseInt(customer_orientation) +
		parseInt(innovation) +
		parseInt(professional_rigor) +
		parseInt(problem_resolution) +
		parseInt(leadership) +
		parseInt(organization)
	);
	const average = total / 9;
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
				engagement_or_productivity: data.engagement_or_productivity,
				communication_skills: data.communication_skills,
				adaptation_to_change: data.adaptation_to_change,
				customer_orientation: data.customer_orientation,
				innovation: data.innovation,
				professional_rigor: data.professional_rigor,
				problem_resolution: data.problem_resolution,
				leadership: data.leadership,
				organization: data.organization,
				overall_score: total,
				level_value: average,
			};
			const response = await axios
				.put(
					`${import.meta.env.VITE_API_ADDRESS}first_section_ape/${ccn_performance_evaluation}`,
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
		const confirmation = window.confirm("¿Estás seguro(a) que deseas enviar la calificación de tu colaborador? Recuerda que una vez enviada no podrá ser modificada.")
		if (confirmation === true) {
			sedData();
		}
	};

	return (
		<div className="bg-white rounded-lg">
			<div className="lg:w-[834px] p-5 m-auto">
				<div className="mx-5 py-2">
					<dl className="rounded-full">
						<div className="lg:grid lg:grid-rows-1 sm:grid sm:grid-rows-2">
							<div className="lg:grid lg:grid-cols-2 justify-center sm:grid sm:grid-cols-1">
								<div className="p-[30px]">
									<h2 className="text-[20px] my-auto"><strong>2. Cuestionario de Evaluacion.</strong></h2>
								</div>
							</div>
						</div>
						<div className="text-center sm:grid sm:grid-cols-5">
							<dt className="border-y-2 border-black">
								<h2 className="text-[20px]"><strong>Criterio de Evaluacion.</strong></h2>
							</dt>
							<dd className="border-y-2 border-black col-span-2">
								<h2 className="text-[20px]"><strong>Definicion</strong></h2>
							</dd>
							<dd className="border-y-2 border-black">
								<h2 className="text-[20px]"><strong>Nivel</strong></h2>
							</dd>
							<dd className="border-y-2 border-black">
								<h2 className="text-[20px]"><strong>Valor</strong></h2>
							</dd>
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="text-start border-b-2 my-5 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
								<dt className="m-1 text-center">
									<strong>Compromiso/ Productividad</strong>
								</dt>
								<dd className="col-span-2 mx-1">
									Conoce y comparte los valores de la empresa
									orientando sus intereses y comportamientos
									hacia las necesidades, prioridades y
									objetivos de la Compañía. Demuestra
									implicación y orgullo de pertenecer a la
									compañía en la que trabaja.
								</dd>
								<dd className="m-1 text-center">
									<select
										{...register(
											"engagement_or_productivity",
											{
												required: false,
											}
										)}
										className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										onChange={(e) => setEngagementOrProductivity(e.target.value)}
									>
										<option value="0">No Aplica</option>
										<option value="25">Bajo</option>
										<option value="50">Medio</option>
										<option value="80">Alto</option>
										<option value="100">Excelente</option>
									</select>
								</dd>
								<dd className="m-1 text-center">
									{engagementOrProductivity}
								</dd>
							</div>
							<div className="text-start border-b-2 my-5 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
								<dt className="m-1 text-center">
									<strong>Orientación al Cliente (E/I)</strong>
								</dt>
								<dd className="col-span-2 mx-1">
									Es capaz de entender y detectar necesidades,
									ofreciendo soluciones de forma proactiva que
									superan las expectativas del cliente
									(cliente interno y externo). Procura la
									satisfacción del cliente al brindar un
									servicio de excelencia. Entiende las
									necesidades del cliente y busca exceder sus
									expectativas.{" "}
								</dd>
								<dd className="border-black">
									<select
										{...register("customer_orientation", {
											required: false,
										})}
										className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										onChange={(e) => setCommunicationSkills(e.target.value)}
									>
										<option value="0">No Aplica</option>
										<option value="25">Bajo</option>
										<option value="50">Medio</option>
										<option value="80">Alto</option>
										<option value="100">Excelente</option>
									</select>
								</dd>
								<dd className="m-1 text-center">
									{communicationSkills}
								</dd>

							</div>
							<div className="text-start border-b-2 my-5 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
								<dt className="m-1 text-center">
									<strong>Habilidades de Comunicación</strong>
								</dt>
								<dd className="col-span-2 mx-1">
									Es capaz de transmitir comunicar clara y
									efectivamente las ideas tanto oral como por
									escrito. Usa los canales de comunicación
									apropiados para promulgar y espacir
									información e ideas de forma oportuna.
									Participa activamente y contribuye como
									mimebro efectivo del equipo
								</dd>
								<dd className="m-1 text-center">
									<select
										{...register("communication_skills", {
											required: false,
										})}
										className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										onChange={(e) => setadaptation_to_change(e.target.value)}
									>
										<option value="0">No Aplica</option>
										<option value="25">Bajo</option>
										<option value="50">Medio</option>
										<option value="80">Alto</option>
										<option value="100">Excelente</option>
									</select>
								</dd>
								<dd className="m-1 text-center">
									{adaptation_to_change}
								</dd>

							</div>
							<div className="text-start border-b-2 my-5 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
								<dt className="m-1 text-center">
									<strong>Adaptación al Cambio</strong>
								</dt>
								<dd className="col-span-2 mx-1">
									Es capaz de adaptarse y trabajar
									eficientemente en distintas situaciones y
									con personas o areas diversos. Valora los
									puntos de vista de los demás, mostrándose
									flexible y adaptando su propia postura a
									medida que la situación lo requiere. Genera
									respeto y valor al trabajo y opinion de sus
									compañeros{" "}
								</dd>
								<dd className="">
									<select
										{...register("adaptation_to_change", {
											required: false,
										})}
										className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										onChange={(e) => setcustomer_orientation(e.target.value)}
									>
										<option value="0">No Aplica</option>
										<option value="25">Bajo</option>
										<option value="50">Medio</option>
										<option value="80">Alto</option>
										<option value="100">Excelente</option>
									</select>
								</dd>
								<dd className="m-1 text-center">
									{customer_orientation}
								</dd>
							</div>
							<div className="text-start border-b-2 my-5 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
								<dt className="m-1 text-center">
									<strong>Innovación</strong>
								</dt>
								<dd className="col-span-2 mx-1">
									Desarrolla, inspira, motiva y guía al equipo
									para el logro de las metas que contribuyen a
									la mejora de la Compañía. Comparte sus
									nuevos conocimiento, habilidades y
									experiencia con el resto del equipo.
								</dd>
								<dd className="">
									<select
										{...register("innovation", {
											required: false,
										})}
										className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										onChange={(e) => setinnovation(e.target.value)}
									>
										<option value="0">No Aplica</option>
										<option value="25">Bajo</option>
										<option value="50">Medio</option>
										<option value="80">Alto</option>
										<option value="100">Excelente</option>
									</select>
								</dd>
								<dd className="m-1 text-center">
									{innovation}
								</dd>
							</div>
							<div className="text-start border-b-2 my-5 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
								<dt className="m-1 text-center">
									<strong>Rigor Profesional</strong>
								</dt>
								<dd className="col-span-2 mx-1">
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
								<dd className="">
									<select
										{...register("professional_rigor", {
											required: false,
										})}
										className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										onChange={(e) => setprofessional_rigor(e.target.value)}
									>
										<option value="0">No Aplica</option>
										<option value="25">Bajo</option>
										<option value="50">Medio</option>
										<option value="80">Alto</option>
										<option value="100">Excelente</option>
									</select>
								</dd>
								<dd className="m-1 text-center">
									{professional_rigor}
								</dd>
							</div>
							<div className="text-start border-b-2 my-5 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
								<dt className="border-r-2">
									<strong>Resolución de Problemas</strong>
								</dt>
								<dd className="col-span-2 mx-1">
									Es capaz de organizar al equipo de trabajo
									que tiene bajo su responsabilidad,
									brindarles las pautas y alineamientos sobre
									cómo deben realizar su trabajo, bajo qué
									parámetros, y que dichas pautas sean
									comprendidas y acatadas por las personas.
									Considera las implicaciones antes de llevar
									a cabo una acción.{" "}
								</dd>
								<dd className="">
									<select
										{...register("problem_resolution", {
											required: false,
										})}
										className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										onChange={(e) => setproblem_resolution(e.target.value)}
									>
										<option value="0">No Aplica</option>
										<option value="25">Bajo</option>
										<option value="50">Medio</option>
										<option value="80">Alto</option>
										<option value="100">Excelente</option>
									</select>
								</dd>
								<dd className="m-1 text-center">
									{problem_resolution}
								</dd>
							</div>
							<div className="text-start border-b-2 my-5 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
								<dt className="m-1 text-center">
									<strong>Liderazgo</strong>
								</dt>
								<dd className="col-span-2 mx-1">
									Participa activamente en la consecución de
									una meta común, incluso cuando dicha meta no
									está directamente relacionada con los
									intereses personales. Demuestra interés por
									el logro de metas individuales y
									organizacionales con compromiso. El grupo lo
									percibe como líder y se orienta en función
									de los objetivos propuestos.
								</dd>
								<dd className="">
									<select
										{...register("leadership", {
											required: false,
										})}
										className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										onChange={(e) => setleadership(e.target.value)}
									>
										<option value="0">No Aplica</option>
										<option value="25">Bajo</option>
										<option value="50">Medio</option>
										<option value="80">Alto</option>
										<option value="100">Excelente</option>
									</select>
								</dd>
								<dd className="m-1 text-center">
									{leadership}
								</dd>
							</div>
							<div className="text-start border-b-2 my-5 border-black items-center lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-4">
								<dt className="m-1 text-center">
									<strong>Organización</strong>
								</dt>
								<dd className="col-span-2 mx-1">
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
								<dd className="">
									<select
										{...register("organization", {
											required: false,
										})}
										className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										onChange={(e) => setorganization(e.target.value)}
									>
										<option value="0">No Aplica</option>
										<option value="25">Bajo</option>
										<option value="50">Medio</option>
										<option value="80">Alto</option>
										<option value="100">Excelente</option>
									</select>
								</dd>
								<dd className="m-1 text-center">
									{organization}
								</dd>
							</div>
							<input
								value="Enviar"
								type="submit"
								className="bg-[#007367]  mx-auto w-[78px] h-[34px] rounded-lg text-white"
							/>
						</form>
					</dl>
				</div>
			</div>
		</div>
	);
}

function EmployeeAnswerAPE({ ccn_performance_evaluation }) {
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

			const response = await axios
				.put(
					`${import.meta.env.VITE_API_ADDRESS}second_section_ape/${ccn_performance_evaluation}`,
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
		const confirmation = window.confirm("¿Estás seguro(a) que deseas enviar tus comentarios? Recuerda que una vez enviado no podrás modificarlo.")
		if (confirmation === true) {
			sedData();
		}
	};
	return (
		<div className="bg-white rounded-lg">
			<div className="lg:w-[740px] p-5 mx-auto rounded-md h-[70vh] bg-white">
				<h3 className="text-[20px] py-[25px]"><strong>3. Autoevaliacion</strong></h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="py-[25px]">
						<strong>
							Estimado Empleado: Escribe una breve
							apreciación de su desempeño durante este año o
							desde el inicio con Plena Global.
						</strong>
						<div className="mt-2">
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
	);
}

function ActionPlanAPE({ ccn_performance_evaluation }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			second_accion_plan: "",
			second_accion_plan_date: "",
			second_period_of_execution: "",
			third_accion_plan: "",
			third_accion_plan_date: "",
			third_period_of_execution: "",
		},
	});
	const [detailPerformanceEvaluation, setDetailPerformanceEvaluation] = useState([])

	const getDetail = async () => {
		try {
			const respPerformanceEvaluation = await axios(
				`${import.meta.env.VITE_API_ADDRESS}administrative_performance_evaluation_detail/${ccn_performance_evaluation}`

			);
			setDetailPerformanceEvaluation(respPerformanceEvaluation.data.AdministrativePE);
		} catch (error) {
			console.log(error);
		}
	};
	if (!detailPerformanceEvaluation) return <></>;
	useEffect(() => {
		getDetail();
	}, []);


	const data = {
		labels: [
			`Compromiso/ Productividad ${detailPerformanceEvaluation.engagement_or_productivity}`,
			`Innovación ${detailPerformanceEvaluation.innovation}`,
			`Liderazgo ${detailPerformanceEvaluation.leadership}`,
			`Organización ${detailPerformanceEvaluation.organization}`,
			`Adaptación al Cambio ${detailPerformanceEvaluation.adaptation_to_change}`,
			`Resolución de Problemas ${detailPerformanceEvaluation.problem_resolution}`,
			`Rigor Profesional ${detailPerformanceEvaluation.professional_rigor}`,
			`Orientación al Cliente (E/I) ${detailPerformanceEvaluation.customer_orientation}`,
			`Habilidades de Comunicación ${detailPerformanceEvaluation.communication_skills}`,
		],

		datasets: [
			{
				label: '# of Votes',
				data: [
					parseInt(detailPerformanceEvaluation.engagement_or_productivity),
					parseInt(detailPerformanceEvaluation.innovation),
					parseInt(detailPerformanceEvaluation.leadership),
					parseInt(detailPerformanceEvaluation.organization),
					parseInt(detailPerformanceEvaluation.adaptation_to_change),
					parseInt(detailPerformanceEvaluation.problem_resolution),
					parseInt(detailPerformanceEvaluation.professional_rigor),
					parseInt(detailPerformanceEvaluation.customer_orientation),
					parseInt(detailPerformanceEvaluation.communication_skills),
				],
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
			},
		],
	};

	const average = parseInt(detailPerformanceEvaluation.overall_score) / 9

	const [actionPlanQty, setActionPlanQty] = useState(1)
	const onSubmit = (data) => {
		const sedData = async () => {
			const body = {
				first_accion_plan: data.first_accion_plan,
				first_accion_plan_date: data.first_accion_plan_date,
				first_period_of_execution: "",
				second_accion_plan: data.second_accion_plan ? data.second_accion_plan : "",
				second_accion_plan_date: data.second_accion_plan_date ? data.second_accion_plan_date : "0",
				second_period_of_execution: "",
				third_accion_plan: data.third_accion_plan ? data.third_accion_plan : "",
				third_accion_plan_date: data.third_accion_plan_date ? data.third_accion_plan_date : "0",
				third_period_of_execution: "",
				immediate_boss_observation: data.immediate_boss_observation,
			};
			const response = await axios
				.put(
					`${import.meta.env.VITE_API_ADDRESS}third_section_ape/${ccn_performance_evaluation}`,
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
		const confirmation = window.confirm("¿Estás seguro(a) que deseas asignar el(los) plan(planes) de acción? Recuerda que una vez enviados no podrás modificarlos.")
		if (confirmation === true) {
			sedData();
		}
	};

	return (
		<div className="bg-white rounded-lg h-[70vh]">
			<div className="mx-auto p-5">
				<div className="lg:grid lg:grid-cols-2  text-start grid grid-cols-1 my-3">
					<form className="justify-self-start mx-auto" onSubmit={handleSubmit(onSubmit)}>
						<h3 className="text-[20px] "><strong>4. Plan de Accion</strong></h3>
						<strong className="my-5">
							Define un Plan de Acción para el Evaluado: puedes
							proponer hasta 3 acciones
						</strong>
						<div className="lg:grid my-5 lg:grid-cols-2 border-black border-y-2  sm:grid sm:grid-cols-1">
							<div className="p-2">
								<label
									htmlFor="country"
									className="block text-sm font-medium text-gray-700"
								>
									Tipo de plan de accion
								</label>
								<select
									{...register("first_accion_plan", {
										required: true,
									})}
									className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								>
									<option value="Formacion">Formacion</option>
									<option value="Supervision">Supervision</option>
									<option value="Reinduccion">Reinduccion</option>
									<option value="Promocion">Promocion</option>
									<option value="Plan de Desarrollo">
										Plan de Desarrollo
									</option>
								</select>
							</div>
							<div className="p-2">
								<label
									htmlFor="country"
									className="block text-sm font-medium text-gray-700"
								>
									Trimestre de inicio del plan de accion
								</label>
								<select
									{...register("first_accion_plan_date", {
										required: true,
									})}
									className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
								</select>
							</div>
						</div>
						{[2, 3].includes(actionPlanQty) ?
							<>
								<div className="lg:grid lg:grid-cols-2 border-black border-y-2 sm:grid sm:grid-cols-1">
									<div className="p-2">
										<label
											htmlFor="country"
											className="block text-sm font-medium text-gray-700"
										>
											Tipo de plan de accion
										</label>
										<select
											{...register("second_accion_plan", {
												required: false,
											})}
											className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										>
											<option value="Formacion">Formacion</option>
											<option value="Supervision">Supervision</option>
											<option value="Reinduccion">Reinduccion</option>
											<option value="Promocion">Promocion</option>
											<option value="Plan de Desarrollo">
												Plan de Desarrollo
											</option>
										</select>
									</div>
									<div className="p-2">
										<label
											htmlFor="country"
											className="block text-sm font-medium text-gray-700"
										>
											Trimestre de inicio del plan de accion
										</label>
										<select
											{...register("second_accion_plan_date", {
												required: true,
											})}
											className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
										</select>
									</div>
								</div>
							</>
							: null}
						{actionPlanQty === 3 ?
							<>
								<div className="lg:grid lg:grid-cols-2 my-5 border-black border-y-2 sm:grid sm:grid-cols-1">
									<div className="p-2">
										<label
											htmlFor="country"
											className="block text-sm font-medium text-gray-700"
										>
											Tipo de plan de accion
										</label>
										<select
											{...register("third_accion_plan", {
												required: false,
											})}
											className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										>
											<option value="Formacion">Formacion</option>
											<option value="Supervision">Supervision</option>
											<option value="Reinduccion">Reinduccion</option>
											<option value="Promocion">Promocion</option>
											<option value="Plan de Desarrollo">
												Plan de Desarrollo
											</option>
										</select>
									</div>
									<div className="p-2">
										<label
											htmlFor="country"
											className="block text-sm font-medium text-gray-700"
										>
											Trimestre de inicio del plan de accion
										</label>
										<select
											{...register("third_accion_plan_date", {
												required: true,
											})}
											className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
										</select>
									</div>
								</div>
							</> : null
						}
						{actionPlanQty != 3
							?
							<button onClick={() => setActionPlanQty(parseInt(actionPlanQty) + 1)}
								className="bg-[#007367] mr-2 my-5 w-[34px] h-[34px] rounded-lg text-white">
								+
							</button>
							: null

						}
						{actionPlanQty != 1
							?
							<button onClick={() => setActionPlanQty(parseInt(actionPlanQty) - 1)}
								className="bg-[#007367] mr-2 my-5 w-[34px] h-[34px] rounded-lg text-white">
								-
							</button>
							: null

						}
						<div>
							<label
								htmlFor="about"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								<strong>
									Escribe tus comentarios, observaciones incluyendo,
									fortalezas y áreas de mejora y/o concreta el o los
									planes de acción para el colaborador
								</strong>
							</label>
							<div className="mt-4">
								<p className="opacity-50"><i>puedes agregar maximo 500 caracteres</i></p>
								<textarea
									{...register("immediate_boss_observation", {
										required: true,
									})}
									className="mt-1 block w-full p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 "
									placeholder="Escribe el texto aqui"
								/>
							</div>
						</div>
						<input
							value="Enviar"
							type="submit"
							className="bg-[#007367] my-5 mx-auto w-[78px] h-[34px] rounded-lg text-white"
						/>
					</form>
					<div className="grid grid-cols-1 lg:grid lg:grid-cols-2 overflow-y-auto h-[60vh] p-5">
						<h6 className="font-arial col-span-2 grid grid-cols-1 lg:grid lg:grid-cols-2 border-black border-b-2 text-[20px]"><strong>Informe de Resultados</strong></h6>
						<div className="col-span-2 grid grid-cols-1 lg:grid lg:grid-cols-2">
							<div className="mx-auto grid grid-cols-1 my-auto text-center">
								<strong className="text-[60px] font-arial ">{parseInt(detailPerformanceEvaluation.overall_score / 9)}</strong>
								<strong className="text-[40px] font-arial mb-5">Puntos</strong>
							</div>
							<div className="text-start mx-auto">
								{(average >= 0 && average < 25) ? <BROZE height="100" width="100" /> : null}
								{(average >= 25 && average < 50) ? <SILVER height="100" width="100" /> : null}
								{(average >= 50 && average < 80) ? <GOLD height="100" width="100" /> : null}
								{(average >= 80 && average < 100) ? <DIAMOND height="100" width="100" /> : null}
								{average === 100 ? <PLATINUM height="100" width="100" /> : null}
							</div>
						</div>
						<div className="flex col-span-2 h-auto border-y-2 border-black">
							<div className="w-[100%] mx-auto bg-orange">
								<Radar data={data} />
							</div>
						</div>
						<div className="col-span-2 border-b-2 border-black">
							<div className="bg-orange gap-y-4">
								<h3 className="font-bold my-3">Comentario del Empleado</h3>
								<h3 className="justify-center my-3">{detailPerformanceEvaluation.employee_response}</h3>
							</div>
						</div>
					</div>
				</div >
			</div >
		</div >
	);
}

function ManagerAprovalAPE({ ccn_performance_evaluation }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {},
	});

	const [managerApproval, setManagerApproval] = useState([]);
	const [managerEmployeeDetail, setManagerEmployeeDetail] = useState([]);
	const [detailPerformanceEvaluation, setDetailPerformanceEvaluation] = useState([]);

	const getDetailData = async () => {
		try {
			const respManagerEmployeeDetail = await axios(
				`${import.meta.env.VITE_API_ADDRESS}performance_evaluation/${ccn_performance_evaluation}`
			);
			setManagerEmployeeDetail(
				respManagerEmployeeDetail.data.PerformanceEvaluation
			);

			const respDetailPerformanceEvaluation = await axios(
				`${import.meta.env.VITE_API_ADDRESS}administrative_performance_evaluation_detail/${ccn_performance_evaluation}`
			);
			setDetailPerformanceEvaluation(respDetailPerformanceEvaluation.data.AdministrativePE);
		} catch (error) {
			console.log(error);
		}
	};

	if (!managerEmployeeDetail) return <></>;
	useEffect(() => {
		getDetailData();
	}, []);

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
				const urlAddress = `${import.meta.env.VITE_API_ADDRESS}four_section_ape/${ccn_performance_evaluation}`


				if (!managerApproval) {

					const body = {
						opening_date: managerEmployeeDetail.opening_date,
						ccn_employee: managerEmployeeDetail.ccn_employee,
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
		const confirmation = window.confirm("¿Estás seguro/a de que quieres enviar la evaluación?")
		if (confirmation === true) {
			sedData();
		}
	};

	const average = parseInt(detailPerformanceEvaluation.overall_score) / 9
	const data = [
		{
			subject: `Compromiso/ Productividad ${detailPerformanceEvaluation.engagement_or_productivity}`,
			A: parseInt(detailPerformanceEvaluation.engagement_or_productivity),
		},
		{
			subject: `Innovación ${detailPerformanceEvaluation.innovation}`,
			A: parseInt(detailPerformanceEvaluation.innovation),
		},

		{
			subject: `Liderazgo ${detailPerformanceEvaluation.leadership}`,
			A: parseInt(detailPerformanceEvaluation.leadership),
		},
		{
			subject: `Organización ${detailPerformanceEvaluation.organization}`,
			A: parseInt(detailPerformanceEvaluation.organization),
		},
		{
			subject: `Adaptación al Cambio ${detailPerformanceEvaluation.adaptation_to_change}`,
			A: parseInt(detailPerformanceEvaluation.adaptation_to_change),
		},
		{
			subject: `Resolución de Problemas ${detailPerformanceEvaluation.problem_resolution}`,
			A: parseInt(detailPerformanceEvaluation.problem_resolution),
		},
		{
			subject: `Rigor Profesional ${detailPerformanceEvaluation.professional_rigor}`,
			A: parseInt(detailPerformanceEvaluation.professional_rigor),

		},
		{
			subject: `Orientación al Cliente (E/I) ${detailPerformanceEvaluation.customer_orientation}`,
			A: parseInt(detailPerformanceEvaluation.customer_orientation),
		},
		{
			subject: `Habilidades de Comunicación ${detailPerformanceEvaluation.communication_skills}`,
			A: parseInt(detailPerformanceEvaluation.communication_skills),
		},
	];
	return (
		<div className="bg-white rounded-lg">
			<div className="mx-auto p-5">
				<div className="lg:grid lg:grid-cols-2 text-start sm:grid sm:grid-cols-1 my-3">
					<div className="grid grid-cols-2 p-5 ">
						<h6 className="font-arial col-span-2 border-black border-b-2 text-[20px]"><strong>Informe de Resultados</strong></h6>
						<div className="mx-auto grid grid-cols-1 my-auto text-center">
							<strong className="text-[60px] font-arial ">{parseInt(detailPerformanceEvaluation.overall_score / 9)}</strong>
							<strong className="text-[40px] font-arial mb-5">Puntos</strong>
						</div>
						<div className=" text-start mx-auto">
							{(average >= 0 && average < 25) ? <BROZE height="100" width="100" /> : null}
							{(average >= 25 && average < 50) ? <SILVER height="100" width="100" /> : null}
							{(average >= 50 && average < 80) ? <GOLD height="100" width="100" /> : null}
							{(average >= 80 && average < 100) ? <DIAMOND height="100" width="100" /> : null}
							{average === 100 ? <PLATINUM height="100" width="100" /> : null}
						</div>
						<div className="flex col-span-2 h-auto border-y-2 border-black">
							<div className="w-[600px] h-[350px] bg-orange">
								<ResponsiveContainer width="100%" height="100%">
									<RadarChart cx="55%" cy="50%" outerRadius="70%" data={data}>
										<PolarGrid />
										<PolarAngleAxis dataKey="subject" />
										<PolarRadiusAxis />
										<Radar name="Mike" dataKey="A" stroke="#000000" fill="#192954" fillOpacity={0.6} />
									</RadarChart>
								</ResponsiveContainer>
							</div>
						</div>
					</div>
					<div className="mx-auto p-5">
						<h6 className="font-arial col-span-2 text-[20px]"><strong>Plan de Accion</strong></h6>
						<div className="lg:grid lg:grid-cols-2 sm:grid sm:grid-cols-2 border-black border-y-2">
							<div className="lg:border-black lg:border-r-2">
								<div className="grid grid-cols-1 p-3">
									<div className="grid grid-cols-2 border-black border-2">
										<h4 className="mx-5 my-3 font-arial text-center text-black"><strong>Plan de accion </strong></h4>
										<h4 className="mx-5 my-3 font-arial text-center text-black"><strong>Fecha de Inicio (Cuatrimestre)</strong></h4>
									</div>

									<div className="grid grid-cols-2 border-black border-x-2 border-b-2">
										<p className="mx-5 font-arial my-2 text-center rounded-lg border-2 border-gray-500">{detailPerformanceEvaluation.first_action_plan}</p>
										<p className="mx-5 font-arial my-2 text-center rounded-lg border-2 border-gray-500">{detailPerformanceEvaluation.first_action_plan_date}</p>
									</div>
									{detailPerformanceEvaluation.second_action_plan_date != 0
										?
										<div className="grid grid-cols-2 border-black border-x-2 border-b-2">
											<p className="mx-5 font-arial my-2 text-center rounded-lg border-2 border-gray-500">{detailPerformanceEvaluation.second_action_plan}</p>
											<p className="mx-5 font-arial my-2 text-center rounded-lg border-2 border-gray-500">{detailPerformanceEvaluation.second_action_plan_date}</p>
										</div>
										:
										null}

									{detailPerformanceEvaluation.third_action_plan_date != 0
										?
										<div className="grid grid-cols-2 border-black border-x-2 border-b-2">
											<p className="mx-5 font-arial my-2 text-center rounded-lg border-2 border-gray-500">{detailPerformanceEvaluation.third_action_plan}</p>
											<p className="mx-5 font-arial my-2 text-center rounded-lg border-2 border-gray-500">{detailPerformanceEvaluation.third_action_plan_date}</p>
										</div>
										:
										null}
								</div>
								<div className="grid grid-cols-1 p-2">
								</div>
							</div>
							<div className="my-[20px]">
								<h3 className="p-2 font-arial"><strong>Comentarios, observaciones incluyendo, fortalezas y áreas de mejora o concreta el plan de acción. </strong></h3>
								<p className="mx-4 font-arial text-gray-900 rounded-lg border-2 border-gray-500 p-3">{detailPerformanceEvaluation.immediate_boss_observation}</p>
							</div>
						</div>
						<form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
							<div>
								<label
									htmlFor="about"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									<strong>
										Por favor indique si aprueba o denega la evaluacion con una breve argumentacion
									</strong>
								</label>
								<div className="mt-2">
									<textarea
										{...register("manager_response", {
											required: true,
										})}
										className="mt-1 block w-full p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 "
										placeholder="Escribe el texto aqui"
									/>
								</div>
							</div>
							<div className="relative gap-x-3 my-3">
								<fieldset>
									<legend className="text-sm font-semibold leading-6 text-gray-900">Aprobacion de la Evaluacion de Desempeño</legend>
									<p className="mt-1 text-sm leading-6 text-gray-600">Al seleccionar esta casilla usted esta aprobando e indicando que esta de acuerdo con los resultados de esta evaluacion.</p>
									<div className="mt-6 flex ">
										<div className="flex items-center mx-auto gap-x-3">
											<input
												onChange={() => setManagerApproval(false)}
												name="push-notifications"
												type="radio"
												className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
											/>
											<label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
												Denegar evaluación
											</label>
										</div>
										<div className="flex items-center mx-auto gap-x-3">
											<input
												onChange={() => setManagerApproval(true)}
												name="push-notifications"
												type="radio"
												className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
											/>
											<label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
												Aprobar evaluación
											</label>
										</div>
									</div>
								</fieldset>
							</div>
							<input
								value="Enviar"
								type="submit"
								className="bg-[#007367] cursor-pointer my-5 mx-auto w-[78px] h-[34px] rounded-lg text-white"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

function InstrucctionsAPE({ ccn_performance_evaluation }) {
	const [respEvents, setRespEvents] = useState([]);
	const getEvents = async () => {
		try {
			const ImmediateBossPerformanceEvaluation = await axios(
				`${import.meta.env.VITE_API_ADDRESS}performance_evaluation/${ccn_performance_evaluation}`
			);

			setRespEvents(ImmediateBossPerformanceEvaluation.data);
		} catch (error) {
			console.log(error);
		}
	};

	if (!respEvents) return <></>;
	useEffect(() => {
		getEvents();
	}, []);

	return (
		<div className="bg-white justify-center">
			<div className="bg-[#333333] text-white">
				<h3 className="text-[35px] mx-[100px] p-5">Evaluacion de Desempeño 2022</h3>
				<div className="lg:grid lg:grid-cols-2 sm:grid sm:grid-cols-1 mx-[100px] p-5">
					<li className="col-span-1 lg:w-[550px] sm:w-[300px] lg:p-5 sm:p-2">Antes de inicial la evaluacion del equipo de personal a cargo, por favor lee y analiza las instrucciones,
						y si tienes alguna duda consulta con RRHH personal responsable de esta evaluacion.
					</li>
					<li className="col-span-1 lg:w-[550px] sm:w-[300px] lg:p-5 sm:p-2">Recuerda que un buen lider ha de ser capaz de percibir los problemas,
						analizarlos objetivamente y, lo mas importante, comunicarlos de forma constructiva.
					</li>
				</div>
			</div>
			<div
				className="lg:w-[80%] sm:w-[50%] mx-[100px] lg:grid lg:grid-cols-2 lg:p-5 sm:grid sm:grid-cols-1"
			>
				<h1 className="lg:px-[35px] col-span-2 sm:p-5"><strong>Instrucciones</strong></h1>
				<div className="col-span-1 lg:p-5 m-auto lg:w-[500px]">
					<p>
						<strong>a. Configuracion: </strong> En esta
						plantilla vamos a realizar la Evaluación de
						Desempeño para su equipo Administrativo a cargo, en
						los cuales, utilizaremos 9 criterios de evaluación
						con su significado para mayor interpretación
					</p>
					<p>
						<strong>b. Empleados: </strong> En la Plantilla 3
						encuentra la lista de su equipo de trabajo a
						evaluar.
					</p>
					<p>
						<strong>c. Cuestionario de Evaluacion(CE): </strong>{" "}
						Utilice una plantilla para cada evaluado. Las
						pestañas de los 13 cuestionarios disponibles para
						los 13 evaluados. Cada empleado lleva su número de
						cuestionario.
					</p>
					<p>
						<strong>d. Fecha de Evaluación: </strong> Introduzca
						la fecha del dia de la evaluacion (dd-mm-aa)
					</p>
					<p>
						<strong>e. Puntuacion Total: </strong> Es el puntaje
						total de los criterios evaluados.
					</p>
					<div className="gird grid-rows-2 mx-5 py-2 gap-4">
						<p>
							<strong>
								Nivel de Resultado: Escala Global:
							</strong>{" "}
							De acurdo al resultado del promedio total, es el
							titulo que recibe cada empladado evaluado.
						</p>
						<div className="sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-2 px-4 py-1">
							<h3 className="text-base text-center border border-y-black col-span-2 text-[30px] font-semibold leading-6 bg-[#E5F1EF] text-black">
								Escala Global
							</h3>
							<div className="grid grid-cols-1">
								<div className="grid grid-rows-1 border border-b-black">
									<h2 className="text-black text-center"><strong>Nivel</strong></h2>
								</div>
								<div className="grid grid-rows-5 bg-white">
									<h4 className="text-center border border-b-black">BRONCE</h4>
									<h4 className="text-center border border-b-black">PLATA</h4>
									<h4 className="text-center border border-b-black">ORO</h4>
									<h4 className="text-center border border-b-black">DIAMANTE</h4>
									<h4 className="text-center border border-b-black">PLATINO</h4>
								</div>
							</div>
							<div className="grid grid-cols-1">
								<div className="grid grid-rows-1 border border-b-black">
									<h2 className="text-black text-center"><strong>Puntos</strong></h2>
								</div>
								<div className="grid grid-rows-5 bg-white">
									<h4 className="text-center border border-b-black">0</h4>
									<h4 className="text-center border border-b-black">25</h4>
									<h4 className="text-center border border-b-black">50</h4>
									<h4 className="text-center border border-b-black">80</h4>
									<h4 className="text-center border border-b-black">100</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-1 p-5 m-auto lg:w-[500px]">
					<p>
						f. <strong>Tabla de Niveles: </strong> Lea cada uno
						de los criterios de evaluacion, y en forma objetiva,
						asigne el puntaje correspondiente, desplegando la
						lista en columna G y marque según considere el grado
						de la competencia desarrollada.
					</p>
					<div className="sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-2 px-4 py-1">
						<h3 className="text-base text-center border border-y-black col-span-2 text-[30px] font-semibold leading-6 bg-[#E5F1EF] text-black">
							Tabla de Niveles
						</h3>
						<div className="grid grid-cols-1">
							<div className="grid grid-rows-1 border border-b-black">
								<h2 className="text-black text-center"><strong>Nivel</strong></h2>
							</div>
							<div className="grid grid-rows-5 bg-white">
								<h4 className="text-center border border-b-black">No Aplica</h4>
								<h4 className="text-center border border-b-black">Bajo</h4>
								<h4 className="text-center border border-b-black">Medio</h4>
								<h4 className="text-center border border-b-black">Alto</h4>
								<h4 className="text-center border border-b-black">Excelente</h4>
							</div>
						</div>
						<div className="grid grid-cols-1">
							<div className="grid grid-rows-1 border border-b-black">
								<h2 className="text-black text-center"><strong>Puntos</strong></h2>
							</div>
							<div className="grid grid-rows-5 bg-white">
								<h4 className="text-center border border-b-black">0</h4>
								<h4 className="text-center border border-b-black">25</h4>
								<h4 className="text-center border border-b-black">50</h4>
								<h4 className="text-center border border-b-black">80</h4>
								<h4 className="text-center border border-b-black">100</h4>
							</div>
						</div>
					</div>

					<p>
						<strong>g. Empleado:</strong> Espacio en el que el
						empleado evaluado, puede hacer una breve descripción
						o apreciacion de su desempeño laboral durante el año
						o desde el incio con Econnabis Plena.
					</p>
					<p>
						<strong>h. Plan de Accion:</strong> Define un plan
						de acción, proponga 3 ideas de mejora para el
						evaludado.
					</p>
					<p>
						<strong>i. </strong>Termine la evaluacion con
						comentarios. Escriba un resumen de la
						retroalimentación con el evaluado empleado. Recuerde
						que sin claridad y transparencia, la evaluación del
						desempeño no será efectiva.
					</p>
					<p>
						<strong>j. Firmas: </strong> Despues de haber
						finalizado el proceso de evaluacion. No se olvide de
						firmar y hacer firmar a su evaludado la evaluación.
					</p>
					<p>
						<strong>k. </strong>Por ultimo envie a Recursos
						Humanos las evaluaciones de su equipo, para que a su
						ves ellos generen el informe final.
					</p>
				</div>
			</div>
		</div>
	);
}

export {
	ImmediatiBossFormAPE,
	EmployeeAnswerAPE,
	ActionPlanAPE,
	ManagerAprovalAPE,
	InstrucctionsAPE,
};
