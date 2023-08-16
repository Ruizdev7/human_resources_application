import axios from "axios";
import { useState, useEffect } from "react";

function DataSheet({ ccn_employee }) {
	const [DataEmployee, setDataEmployee] = useState([]);
	const [Image, setImage] = useState(null);

	useEffect(() => {
		async function fetchImage() {
			const respImage = await axios(
				`${import.meta.env.VITE_API_ADDRESS}employee/images/${ccn_employee}`
			);
			setImage(`data:image/jpeg;base64,${respImage.data.image_b64}`);
		}
		fetchImage();
	}, []);

	const getEmployee = async () => {
		try {
			const respEmployees = await axios(
				`${import.meta.env.VITE_API_ADDRESS}employee/${ccn_employee}`
			);
			setDataEmployee(respEmployees.data.Employee);
		} catch (error) {
			console.log(error);
		}
	};
	if (!DataEmployee) return <></>;
	useEffect(() => {
		getEmployee();
	}, []);
	return (
		<>
			<div className="m-auto bg-slate-200 h-[100vh]">
				<h1 className="text-[25px] text-center pt-5">
					<strong>Informacion del Empleado</strong>
				</h1>
				<img
					src={Image}
					className="mx-auto mt-5 h-[250px] rounded-full w-[90%]"
					alt=""
				/>
				<div className="grid grid-cols-1 pt-5 mt-5">
					<div className="grid m-auto grid-rows-5 ">
						<h2 className="px-2 text-center py-3">
							<strong>{DataEmployee.full_name_employee}</strong>
						</h2>
						<h2 className="px-2 text-center py-3">
							<strong>
								CC: {DataEmployee.number_id_employee}
							</strong>
						</h2>
						<h2 className="px-2 text-center py-3">
							<strong>
								{DataEmployee.employee_personal_email}
							</strong>
						</h2>
						<h2 className="px-2 text-center py-3">
							<strong>
								{DataEmployee.employee_personal_cellphone}
							</strong>
						</h2>
					</div>
				</div>
			</div>
		</>
	);
}

function BasicData({ ccn_employee }) {
	const [DataEmployee, setDataEmployee] = useState([]);

	const getEmployee = async () => {
		try {
			const respEmployees = await axios(
				`${import.meta.env.VITE_API_ADDRESS}employee/${ccn_employee}`
			);
			setDataEmployee(respEmployees.data.Employee);
		} catch (error) {
			console.log(error);
		}
	};

	if (!DataEmployee) return <></>;
	useEffect(() => {
		getEmployee();
	}, []);

	return (
		<div className="bg-white h-[80vh]">
			<h1 className="text-[35px] p-5">Datos Basicos del Empleado</h1>
			<div className="h-[2px] bg-black"></div>
			{/*Modificar linea separadorapor un hr o span*/}
			<p>
				<strong>TIPO DE DOCUMENTO: </strong>
				{DataEmployee.ccn_type_id}
			</p>
			<p>
				<strong>No. DE DOCUMENTO: </strong>
				{DataEmployee.number_id_employee}
			</p>
			<p>
				<strong>PRIMER NOMBRE: </strong>
				{DataEmployee.first_name_employee}
			</p>
			<p>
				<strong>SEGUNDO NOMBRE: </strong>
				{DataEmployee.middle_name_employee}
			</p>
			<p>
				<strong>PRIMER APELLIDO: </strong>
				{DataEmployee.first_last_name_employee}
			</p>
			<p>
				<strong>SEGUNDO APELLIDO: </strong>
				{DataEmployee.second_last_name_employee}
			</p>
			<p>
				<strong>FECHA DE NACIMIENTO: </strong>
				{DataEmployee.date_birth_employee}
			</p>
			<p>
				<strong>CORREO PERSONAL: </strong>
				{DataEmployee.employee_personal_email}
			</p>
			<p>
				<strong>RANGO DE EDAD: </strong>
				{DataEmployee.age_range}
			</p>
			<p>
				<strong>GENERO: </strong>
				{DataEmployee.auto_perceived_gender}
			</p>
			<p>
				<strong>RH: </strong>
				{DataEmployee.rh}
			</p>
			<p>
				<strong>EDAD: </strong>
				{DataEmployee.age}
			</p>
			<p>
				<strong>TELEFONO PERSONAL: </strong>
				{DataEmployee.employee_personal_cellphone}
			</p>
			<p>
				<strong>CONSENTIMIENTO DE LEY DE TRATAMIENTO DE DATOS: </strong>
				{DataEmployee.informed_consent_law_1581}
			</p>
			<p>
				<strong>NOMBRE DE LA IMAGEN: </strong>
				{DataEmployee.image}
			</p>
			<div className="h-[2px] bg-black"></div>
			{/*Modificar linea separadorapor un hr o span*/}
			<p className="p-5">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit.
				Temporibus numquam facilis voluptatum itaque non illo, cum ullam
				recusandae! Libero doloremque incidunt reprehenderit eveniet?
				Natus possimus aperiam iusto ab tempora sapiente.
			</p>
		</div>
	);
}
function EmergencyContact({ ccn_employee }) {
	const [DataEmployee, setDataEmployee] = useState([]);

	const getEmployee = async () => {
		try {
			const respEmployees = await axios(
				`${import.meta.env.VITE_API_ADDRESS}emergency_contact_details/employee/${ccn_employee}`
			);
			setDataEmployee(respEmployees.data.EmergencyContactDetails);
		} catch (error) {
			console.log(error);
		}
	};

	if (!DataEmployee) return <></>;
	useEffect(() => {
		getEmployee();
	}, []);

	return (
		<>
			<div className="bg-white h-[80vh]">
				<h1 className="text-[35px] p-5">Datos Basicos del Empleado</h1>
				<div className="h-[2px] bg-black"></div>
				{/*Modificar linea separadorapor un hr o span*/}
				<p>
					<strong>NOMBRE DE CONTACTO DE EMERGENCIA: </strong>
					{DataEmployee.emergency_contact}
				</p>
				<p>
					<strong>PARENTESCO: </strong>
					{DataEmployee.ccn_relationship}
				</p>
				<p>
					<strong>CELULAR DEL CONTACTO DE EMERGENCIA: </strong>
					{DataEmployee.cellphone}
				</p>
				<div className="h-[2px] bg-black"></div>
				{/*Modificar linea separadorapor un hr o span*/}
				<p className="p-5">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Temporibus numquam facilis voluptatum itaque non illo, cum
					ullam recusandae! Libero doloremque incidunt reprehenderit
					eveniet? Natus possimus aperiam iusto ab tempora sapiente.
				</p>
			</div>
		</>
	);
}
function AffiliationData({ ccn_employee }) {
	const [DataEmployee, setDataEmployee] = useState([]);

	const getEmployee = async () => {
		try {
			const respEmployees = await axios(
				`${import.meta.env.VITE_API_ADDRESS}ss_employee/employee/${ccn_employee}`
			);
			setDataEmployee(respEmployees.data.SSEmployee);
		} catch (error) {
			console.log(error);
		}
	};

	if (!DataEmployee) return <></>;
	useEffect(() => {
		getEmployee();
	}, []);

	return (
		<>
			<div className="bg-white h-[80vh]">
				<h1 className="text-[35px] p-5">Datos Basicos del Empleado</h1>
				<div className="h-[2px] bg-black"></div>
				{/*Modificar linea separadorapor un hr o span*/}
				<p>
					<strong>TIPO DE AFILIACION: </strong>{" "}
					{DataEmployee.ccn_type_affiliation}
				</p>
				<p>
					<strong>TIPO DE CONTRIBUIDOR: </strong>
					{DataEmployee.ccn_type_contributor}
				</p>
				<p>
					<strong>EPS: </strong> {DataEmployee.ccn_eps}
				</p>
				<p>
					<strong>AFP: </strong> {DataEmployee.ccn_afp}
				</p>
				<p>
					<strong>ARL: </strong> {DataEmployee.ccn_arl}
				</p>
				<p>
					<strong>CCF: </strong> {DataEmployee.ccn_ccf}
				</p>
				<p>
					<strong>AAP: </strong> {DataEmployee.ccn_aap}
				</p>
				<div className="h-[2px] bg-black"></div>
				{/*Modificar linea separadorapor un hr o span*/}
				<p className="p-5">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Temporibus numquam facilis voluptatum itaque non illo, cum
					ullam recusandae! Libero doloremque incidunt reprehenderit
					eveniet? Natus possimus aperiam iusto ab tempora sapiente.
				</p>
			</div>
		</>
	);
}
function FamilyNucleus({ ccn_employee }) {
	const [DataEmployee, setDataEmployee] = useState([]);

	const getEmployee = async () => {
		try {
			const respEmployees = await axios(
				`${import.meta.env.VITE_API_ADDRESS}family_nucleus/employee/${ccn_employee}`
			);
			setDataEmployee(respEmployees.data.FamilyNucleus);
		} catch (error) {
			console.log(error);
		}
	};

	if (!DataEmployee) return <></>;
	useEffect(() => {
		getEmployee();
	}, []);

	return (
		<>
			<div className="bg-white h-[80vh]">
				<h1 className="text-[35px] p-5">Datos Basicos del Empleado</h1>
				<div className="h-[2px] bg-black"></div>
				{/*Modificar linea separadorapor un hr o span*/}
				<p>
					<strong>ESTADO CIVIL: </strong>
					{DataEmployee.ccn_marital_status}
				</p>
				<p>
					<strong>No. DE HIJOS: </strong>
					{DataEmployee.number_of_children}
				</p>
				<p>
					<strong>TIPO DE DOCUMENTO: </strong>
					{DataEmployee.ccn_type_id}
				</p>
				<p>
					<strong>No.DE DOCUMENTO: </strong>
					{DataEmployee.number_id}
				</p>
				<p>
					<strong>GENERO: </strong>
					{DataEmployee.ccn_auto_perceived_gender}
				</p>
				<p>
					<strong>PRIMER NOMBRE: </strong>
					{DataEmployee.first_name}
				</p>
				<p>
					<strong>SEGUNDO NOMBRE: </strong>
					{DataEmployee.middle_name}
				</p>
				<p>
					<strong>PRIMER APELLIDO: </strong>
					{DataEmployee.first_last_name}
				</p>
				<p>
					<strong>SEGUNDO APELLIDO: </strong>
					{DataEmployee.second_last_name}
				</p>
				<p>
					<strong>FECHA DE NACIMIENTO: </strong>
					{DataEmployee.date_of_birth}
				</p>
				<p>
					<strong>EDAD: </strong>
					{DataEmployee.age}
				</p>
				<p>
					<strong>RANGO DE EDAD: </strong>
					{DataEmployee.age_range}
				</p>
				<p>
					<strong>NIVEL DE ESCOLARIDAD: </strong>
					{DataEmployee.ccn_schooling_level}
				</p>
				<div className="h-[2px] bg-black"></div>
				{/*Modificar linea separadorapor un hr o span*/}
				<p className="p-5">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Temporibus numquam facilis voluptatum itaque non illo, cum
					ullam recusandae! Libero doloremque incidunt reprehenderit
					eveniet? Natus possimus aperiam iusto ab tempora sapiente.
				</p>
			</div>
		</>
	);
}
function HealthCondition({ ccn_employee }) {
	const [DataEmployee, setDataEmployee] = useState([]);

	const getEmployee = async () => {
		try {
			const respEmployees = await axios(
				`${import.meta.env.VITE_API_ADDRESS}health_condition/employee/${ccn_employee}`
			);
			setDataEmployee(respEmployees.data.HealthCondition);
		} catch (error) {
			console.log(error);
		}
	};

	if (!DataEmployee) return <></>;
	useEffect(() => {
		getEmployee();
	}, []);

	return (
		<>
			<div className="bg-white h-[80vh]">
				<h1 className="text-[35px] p-5">Datos Basicos del Empleado</h1>
				<div className="h-[2px] bg-black"></div>
				{/*Modificar linea separadorapor un hr o span*/}
				<p>
					<strong>CONSUME BEBIDAS ALCOHOLICAS: </strong>
					{DataEmployee.consume_alcoholic_beverages}
				</p>
				<p>
					<strong>ENFERMEDADES: </strong>
					{DataEmployee.diseases}
				</p>
				<p>
					<strong>ALERGIAS: </strong>
					{DataEmployee.allergies}
				</p>
				<p>
					<strong>CUALES ALERGIAS: </strong>
					{DataEmployee.what_allergy}
				</p>
				<p>
					<strong>MEDICAMENTOS: </strong>
					{DataEmployee.medicines}
				</p>
				<p>
					<strong>CUALES MEDICAMENTOS: </strong>
					{DataEmployee.what_medicin}
				</p>
				<p>
					<strong>ULTIMA CONSULTA MEDICA: </strong>
					{DataEmployee.last_medical_consultation}
				</p>
				<p>
					<strong>
						SENTIR NECESIDAD DE INGERIR MENOS CANTIDAD DE BEBIDAS
						ALCOHOLICAS:{" "}
					</strong>
					{DataEmployee.plan_to_drink_less_alcoholic_beverages}
				</p>
				<p>
					<strong>
						MOLESTIA POR CRITICAS DEBIDO A LA FORMA DE INGERIR
						BEBIDAS ALCOHOLICAS:{" "}
					</strong>
					{
						DataEmployee.discomfort_due_to_criticism_when_ingesting_alcohol
					}
				</p>
				<p>
					<strong>
						SENTIR NECESIDAD DE INGERIR BEBIDAS ALCOHOLICAS EN LA
						MAÑANA:{" "}
					</strong>
					{DataEmployee.need_to_drink_alcohol_in_the_morning}
				</p>
				<p>
					<strong>
						ACTIVIDAD FISICA 3 VECES A LA SEMANA POR MINIMO 30
						MINUTOS CADA SESION:{" "}
					</strong>
					{DataEmployee.physical_activity_3_times_a_week_30_minutes}
				</p>
				<p>
					<strong>ES FUMADOR: </strong>
					{DataEmployee.he_is_a_smoker}
				</p>
				<p>
					<strong>CANTIDAD DE CIGARRILLOS AL DIA: </strong>
					{DataEmployee.how_many_cigarettes_a_day}
				</p>
				<p>
					<strong>ES EXFUMADOR: </strong>
					{DataEmployee.he_is_ex_smoker}
				</p>
				<p>
					<strong>CONSUMO DE SUSTANCIAS PSICOACTIVAS: </strong>
					{DataEmployee.consume_psychoactive_substances}
				</p>
				<p>
					<strong>ANTES CONSUMIA SUSTANCIAS PSICOACTIVAS: </strong>
					{DataEmployee.used_psychoactive_substances_before}
				</p>
				<p>
					<strong>QUE SUSTANCIAS PSICOACTIVAS: </strong>
					{DataEmployee.what_psychoactive_substances}
				</p>
				<div className="h-[2px] bg-black"></div>
				{/*Modificar linea separadorapor un hr o span*/}
				<p className="p-5">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Temporibus numquam facilis voluptatum itaque non illo, cum
					ullam recusandae! Libero doloremque incidunt reprehenderit
					eveniet? Natus possimus aperiam iusto ab tempora sapiente.
				</p>
			</div>
		</>
	);
}
function Relationship({ ccn_employee }) {
	const [DataEmployee, setDataEmployee] = useState([]);

	const getEmployee = async () => {
		try {
			const respEmployees = await axios(
				`${import.meta.env.VITE_API_ADDRESS}employment_relationship/employee/${ccn_employee}`
			);
			setDataEmployee(respEmployees.data.EmployeeRelationship);
		} catch (error) {
			console.log(error);
		}
	};

	if (!DataEmployee) return <></>;
	useEffect(() => {
		getEmployee();
	}, []);

	return (
		<>
			<div className="bg-white h-[80vh]">
				<h1 className="text-[35px] p-5">Datos Basicos del Empleado</h1>
				<div className="h-[2px] bg-black"></div>
				{/*Modificar linea separadorapor un hr o span*/}
				<p>
					<strong>ROLE - CARGO: </strong>
					{DataEmployee.ccn_role}
				</p>
				<p>
					<strong>TURNO DE TRABAJO: </strong>
					{DataEmployee.ccn_work_shift}
				</p>
				<p>
					<strong>FECHA DE VINCULACION: </strong>
					{DataEmployee.binding_date}
				</p>
				<p>
					<strong>TIEMPO LABORADO: </strong>
					{DataEmployee.time_worked}
				</p>
				<p>
					<strong>TIPO DE VINCULACION: </strong>
					{DataEmployee.ccn_type_relationship}
				</p>
				<p>
					<strong>CORREO ELECTRONICO CORPORATIVO: </strong>
					{DataEmployee.employee_corporate_email}
				</p>
				<p>
					<strong>TELEFONO CORPORATIVO: </strong>
					{DataEmployee.employee_corporate_cellphone}
				</p>
				<p>
					<strong>JEFE INMEDIATO: </strong>
					{DataEmployee.immediate_boss}
				</p>
				<p>
					<strong>MANAGER: </strong>
					{DataEmployee.manager}
				</p>
				<p>
					<strong>TIPO DE CARGO: </strong>
					{DataEmployee.type_of_charge}
				</p>
				<div className="h-[2px] bg-black"></div>
				{/*Modificar linea separadorapor un hr o span*/}
				<p className="p-5">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Temporibus numquam facilis voluptatum itaque non illo, cum
					ullam recusandae! Libero doloremque incidunt reprehenderit
					eveniet? Natus possimus aperiam iusto ab tempora sapiente.
				</p>
			</div>
		</>
	);
}
function DemographicData({ ccn_employee }) {
	const [DataEmployee, setDataEmployee] = useState([]);

	const getEmployee = async () => {
		try {
			const respEmployees = await axios(
				`${import.meta.env.VITE_API_ADDRESS}demographic_data/employee/${ccn_employee}`
			);
			setDataEmployee(respEmployees.data.DemographicData);
		} catch (error) {
			console.log(error);
		}
	};

	if (!DataEmployee) return <></>;
	useEffect(() => {
		getEmployee();
	}, []);

	return (
		<>
			<div className="bg-white h-[80vh]">
				<h1 className="text-[35px] p-5">Datos Basicos del Empleado</h1>
				<div className="h-[2px] bg-black"></div>
				{/*Modificar linea separadorapor un hr o span*/}
				<p>
					<strong>DEPARTAMENTO DE NACIMIENTO:</strong>{" "}
					{DataEmployee.birth_department}
				</p>
				<p>
					<strong>CIUDAD DE NACIMIENTO:</strong>{" "}
					{DataEmployee.birth_city}
				</p>
				<p>
					<strong>DEPARTAMENTO DE RESIDENCIA:</strong>{" "}
					{DataEmployee.department_residence}
				</p>
				<p>
					<strong>DEPARTAMENTO DE CIUDAD:</strong>{" "}
					{DataEmployee.city_residence}
				</p>
				<p>
					<strong>NIVEL DE ESCOLARIDAD:</strong>{" "}
					{DataEmployee.ccn_schooling_level}
				</p>
				<p>
					<strong>RAZA:</strong> {DataEmployee.ccn_race}
				</p>
				<p>
					<strong>ES CABEZA DE HOGAR:</strong>{" "}
					{DataEmployee.is_head_of_household}
				</p>
				<div className="h-[2px] bg-black"></div>
				{/*Modificar linea separadorapor un hr o span*/}
				<p className="p-5">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Temporibus numquam facilis voluptatum itaque non illo, cum
					ullam recusandae! Libero doloremque incidunt reprehenderit
					eveniet? Natus possimus aperiam iusto ab tempora sapiente.
				</p>
			</div>
		</>
	);
}
function SociodemographicData({ ccn_employee }) {
	const [DataEmployee, setDataEmployee] = useState([]);

	const getEmployee = async () => {
		try {
			const respEmployees = await axios(
				`${import.meta.env.VITE_API_ADDRESS}sociodemographic_data/employee/${ccn_employee}`
			);
			setDataEmployee(respEmployees.data.SociodemographicData);
		} catch (error) {
			console.log(error);
		}
	};

	if (!DataEmployee) return <></>;
	useEffect(() => {
		getEmployee();
	}, []);

	return (
		<>
			<div className="bg-white h-[80vh]">
				<h1 className="text-[35px] p-5">Datos Basicos del Empleado</h1>
				<div className="h-[2px] bg-black"></div>
				{/*Modificar linea separadorapor un hr o span*/}
				<p>
					<strong>PERSONAS QUE DEPENDEN: </strong>
					{DataEmployee.other_dependents}
				</p>
				<p>
					<strong>No. DE PERSONAS EN EL HOGAR: </strong>
					{DataEmployee.relatives}
				</p>
				<p>
					<strong>
						No. DE PERSONAS EN CONDICION DE DISCAPACIDAD:{" "}
					</strong>
					{DataEmployee.people_with_disabilities}
				</p>
				<p>
					<strong>INGRESOS FAMILIARES SMLMV: </strong>
					{DataEmployee.monthly_income}
				</p>
				<p>
					<strong>
						LOS INGRESOS ALCANZAN PARA LOS GASTOS MINIMOS:{" "}
					</strong>
					{DataEmployee.is_income_enougth}
				</p>
				<p>
					<strong>TIPO DE VIVIENDA: </strong>
					{DataEmployee.ccn_sub_house_type}
				</p>
				<p>
					<strong>CARACTERISTICAS DE LA VIVIENDA: </strong>
					{DataEmployee.ccn_house_type}
				</p>
				<p>
					<strong>ZONA EN LA QUE SE UBICA: </strong>
					{DataEmployee.where_its_located}
				</p>
				<p>
					<strong>DIRECCION DE RESIDENCIA: </strong>
					{DataEmployee.residence_address}
				</p>
				<p>
					<strong>TIPO DE TRANSPORTE PARA IR AL TRABAJO: </strong>
					{DataEmployee.type_transportation}
				</p>
				<p>
					<strong>
						TIPO DE TRANSPORTE ALTERNO PARA IR AL TRABAJO
						(opcional):{" "}
					</strong>
					{DataEmployee.type_transportation_2}
				</p>
				<p>
					<strong>ESTRATO DE SERVICIOS PUBLICOS: </strong>
					{DataEmployee.social_stratum}
				</p>
				<p>
					<strong>ENERGIA ELECTRICA: </strong>
					{DataEmployee.electric_power}
				</p>
				<p>
					<strong>ALCANTARILLADO: </strong>
					{DataEmployee.sewerage}
				</p>
				<p>
					<strong>ACUEDUCTO: </strong>
					{DataEmployee.aqueduct}
				</p>
				<p>
					<strong>GAS NATURAL: </strong>
					{DataEmployee.natural_gas}
				</p>
				<p>
					<strong>RECOLECCION DE BASURAS: </strong>
					{DataEmployee.garbage_collection}
				</p>
				<p>
					<strong>TELEFONO FIJO: </strong>
					{DataEmployee.landline}
				</p>
				<p>
					<strong>TIENE DEUDAS: </strong>
					{DataEmployee.debts}
				</p>
				<p>
					<strong>
						INTERES EN CONSOLIDAR LAS DEUDAS EN UN SOLO CREDITO:{" "}
					</strong>
					{DataEmployee.debt_refinancing}
				</p>
				<p>
					<strong>TIENE COMPUTADOR EN SU HOGAR: </strong>
					{DataEmployee.computer_at_home}
				</p>
				<p>
					<strong>CUENTA CON ACCESO A INTERNET: </strong>
					{DataEmployee.have_internet_access}
				</p>
				<div className="h-[2px] bg-black"></div>
				{/*Modificar linea separadorapor un hr o span*/}
				<p className="p-5">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Temporibus numquam facilis voluptatum itaque non illo, cum
					ullam recusandae! Libero doloremque incidunt reprehenderit
					eveniet? Natus possimus aperiam iusto ab tempora sapiente.
				</p>
			</div>
		</>
	);
}

export {
	BasicData,
	EmergencyContact,
	AffiliationData,
	FamilyNucleus,
	HealthCondition,
	Relationship,
	DemographicData,
	SociodemographicData,
	DataSheet,
};
