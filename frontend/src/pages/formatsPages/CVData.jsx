import { useState, useEffect, Children } from "react";
import { IsotipoPlena } from "../../assets/images/SVG";
import { Approval, Disapprove } from "../../assets/images/SVG";
import { useGetRHQuery } from "../../redux_app/services/rhAPI";
import { useGetAapQuery } from "../../redux_app/services/aapAPI";
import { useGetAfpQuery } from "../../redux_app/services/afpAPI";
import { useGetArlQuery } from "../../redux_app/services/arlAPI";
import { useGetCcfQuery } from "../../redux_app/services/ccfAPI";
import { useGetEpsQuery } from "../../redux_app/services/epsAPI";
import { useGetRaceQuery } from "../../redux_app/services/raceAPI";
import { useGetCitiesQuery } from "../../redux_app/services/cityAPI";
import { useGetTypeIdQuery } from "../../redux_app/services/typeIdAPI";
import { useGetAgeRangeQuery } from "../../redux_app/services/ageRange";
import { useGetRolesByIDQuery } from "../../redux_app/services/rolesAPI";
import { useGetWorkShiftQuery } from "../../redux_app/services/workShift";
import { useGetDiseasesQuery } from "../../redux_app/services/diseasesAPI";
import { useGetEmployeeQuery } from "../../redux_app/services/employeeAPI";
import { useGetHouseTypeQuery } from "../../redux_app/services/houseTypeAPI";
import { useGetSsEmployeeQuery } from "../../redux_app/services/ssEmployeeAPI";
import { useGetDepartmentQuery } from "../../redux_app/services/departmentAPI";
import { useGetRelationshipQuery } from "../../redux_app/services/relationshipAPI";
import { useGetSubhouseTypeQuery } from "../../redux_app/services/subhouseTypeAPI";
import { useGetFamilyNucleusQuery } from "../../redux_app/services/familyNucleusAPI";
import { useGetMaritalStatusQuery } from "../../redux_app/services/maritalStatusAPI";
import { useGetTypeAffiliationQuery } from "../../redux_app/services/typeAffiliation";
import { useGetDemographicDataQuery } from "../../redux_app/services/demographicData";
import { useGetTypeContributorQuery } from "../../redux_app/services/typeContributor";
import { useGetSchoolingLevelQuery } from "../../redux_app/services/schoolingLevelAPI";
import { useGetHealthConditionQuery } from "../../redux_app/services/healthConditionAPI";
import { useGetTypeRelationshipQuery } from "../../redux_app/services/typeOfRelationshipAPI";
import { useGetAutoPerceivedGenderQuery } from "../../redux_app/services/autoPerceivedGenderAPI";
import { useGetSociodemographicDataQuery } from "../../redux_app/services/sociodemographicDataAPI";
import { useGetEmploymentRelationshipQuery } from "../../redux_app/services/employmentRelationshipAPI";
import { useGetEmergencyContactDetailsQuery } from "../../redux_app/services/emergencyContactDetailsAPI";


function DataSheet({ ccn_employee }) {
	const [DataEmployee, setDataEmployee] = useState([]);
	const { data: data_employee, error, isError, isSuccess } = useGetEmployeeQuery(ccn_employee);



	return (
		<>
			<div className="m-auto bg-slate-200 h-[100vh] uppercase">
				<h1 className="text-[25px] text-center pt-5">
					<strong>Informacion del Empleado</strong>
				</h1>
				<div className="grid grid-cols-1 pt-5 mt-5">
					<div className="grid m-auto grid-rows-5 ">
						<h2 className="px-2 text-center py-3">
							<strong>{data_employee.Employee.full_name_employee}</strong>
						</h2>
						<h2 className="px-2 text-center py-3">
							<strong>
								CC: {data_employee.Employee.number_id_employee}
							</strong>
						</h2>
						<h2 className="px-2 text-center py-3">
							<strong>
								{data_employee.Employee.employee_personal_email}
							</strong>
						</h2>
						<h2 className="px-2 text-center py-3">
							<strong>
								{data_employee.Employee.employee_personal_cellphone}
							</strong>
						</h2>
					</div>
				</div>
			</div>
		</>
	);
}

function BasicData({ ccn_employee }) {
	const { data: data_employee, error: error_employee, isError: is_error_employee, isSuccess: is_succes_employee } = useGetEmployeeQuery(ccn_employee);
	const { data: data_marital_status, error: error_marital_status, isError: is_error_marital_status, isSuccess: is_succes_marital_status } = useGetMaritalStatusQuery(data_employee ? data_employee.Employee.ccn_marital_status : 1);
	const { data: data_auto_perceived_gender, error: error_auto_perceived_gender, isError: is_error_auto_perceived_gender, isSuccess: is_success_auto_perceived_gender } = useGetAutoPerceivedGenderQuery(data_employee ? data_employee.Employee.auto_perceived_gender : 1);
	const { data: data_rh, error: error_rh, isError: is_error_rh, isSuccess: is_success_rh } = useGetRHQuery(data_employee ? data_employee.Employee.rh : 1);
	const { data: data_ccn_type_id, error: error_ccn_type_id, isError: is_error_ccn_type_id, isSuccess: is_success_ccn_type_id } = useGetTypeIdQuery(data_employee ? data_employee.Employee.ccn_type_id : 1);
	const { data: data_age_range, error: error_age_range, isError: is_error_age_range, isSuccess: is_success_age_range } = useGetAgeRangeQuery(data_employee ? data_employee.Employee.age_range : 1);

	return (
		<>{data_employee ?
			<div className="bg-gray-200 border-b-2 border-gray-200 uppercase shadow-lg sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6">
					<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase">
						datos básicos del empleado
					</h3>
					<p className="mt-1 max-w-2xl text-sm text-gray-500">
						En este apartado se puede visualizar la información
						básica del empleado.
					</p>
				</div>
				<div className="border-t border-gray-200 uppercase">
					<dl>
						{
							data_employee
								?
								<>
									<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="flex flex-col text-sm font-extrabold uppercase">
											<span className="text-xs">
												Código Consecutivo numérico Interno BD
											</span>
										</dt>
										<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
											{data_employee.Employee.ccn_employee}
										</dd>
									</div>
									<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="text-xs font-extrabold uppercase">
											Tipo de identificación
										</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
											{data_ccn_type_id ? data_ccn_type_id.TypeID.description_type_id : null}
										</dd>
									</div>
									<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="text-xs font-extrabold uppercase">
											Numero de identificación
										</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
											{data_employee.Employee.number_id_employee}
										</dd>
									</div>
									<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="text-xs font-extrabold uppercase">
											Nombre Completo
										</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
											{data_employee.Employee.full_name_employee}
										</dd>
									</div>
									<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="text-xs font-extrabold uppercase">
											Fecha de Nacimiento
										</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
											{data_employee.Employee.date_birth_employee}
										</dd>
									</div>
									<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="text-xs font-extrabold uppercase">
											Estado Civil
										</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
											{data_marital_status ? data_marital_status.MartialStatus.marital_status : "Cargando..."}
										</dd>
									</div>
									<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="text-xs font-extrabold uppercase">
											Edad
										</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
											{data_employee.Employee.age}
										</dd>
									</div>
									<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="text-xs font-extrabold uppercase">
											Rango de Edad
										</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
											{data_age_range ? data_age_range.AgeRange.age_range : null}
										</dd>
									</div>
									<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="text-xs font-extrabold uppercase">
											Genero
										</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
											{data_auto_perceived_gender ? data_auto_perceived_gender.AutoPerceivedGender.auto_perceived_gender : null}
										</dd>
									</div>
									<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="text-xs font-extrabold uppercase">
											RH
										</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
											{data_rh ? data_rh.RH.rh : null}
										</dd>
									</div>
									<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="text-xs font-extrabold uppercase">
											Correo electrónico Personal
										</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
											{data_employee.Employee.employee_personal_email}
										</dd>
									</div>

									<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="text-xs font-extrabold uppercase">
											teléfono Personal
										</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
											{data_employee.Employee.employee_personal_cellphone}
										</dd>
									</div>

									<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="text-xs font-extrabold uppercase">
											Habeas data Ley 1581
										</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
											{
												data_employee.Employee.informed_consent_law_1581 === 1
													?
													<Approval />
													:
													<Disapprove />
											}
										</dd>
									</div>
								</>
								:
								null
						}
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">

						</div>
					</dl>
				</div>
			</div>
			:
			<div className="h-[100%] container mx-auto flex items-center">
				<IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
			</div>}
		</>
	);
}
function EmergencyContact({ ccn_employee }) {
	const { data: data_emergency_contact_detail, error: error_emergency_contact_detail, isError: is_error_emergency_contact_detail, isSuccess: is_succes_emergency_contact_detail } = useGetEmergencyContactDetailsQuery(ccn_employee);
	const { data: data_relationship, error: error_type_relationship, isError: is_error_type_relationship, isSuccess: is_success_type_relationship } = useGetRelationshipQuery(data_emergency_contact_detail ? data_emergency_contact_detail.EmergencyContactDetails.ccn_relationship : 1);

	return (
		<>
			{data_emergency_contact_detail ?
				<div className="bg-gray-200 border-b-2 border-gray-200 uppercase shadow-lg sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase">
							Datos de contacto de emergencia
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							En este apartado se puede visualizar la información
							del contacto de emergencia.
						</p>
					</div>
					<div className="border-t border-gray-200 uppercase">
						<dl>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										Nombre de contacto de emergencia
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_emergency_contact_detail ? data_emergency_contact_detail.EmergencyContactDetails.emergency_contact : null}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										parentesco
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_relationship ? data_relationship.Relationship.relationship : null}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										Celular del contacto de emergencia
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_emergency_contact_detail ? data_emergency_contact_detail.EmergencyContactDetails.cellphone : null}
								</dd>
							</div>
						</dl>
					</div>
				</div>
				:
				<div className="h-[100%] container mx-auto flex items-center">
					<IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
				</div>}
		</>
	);
}

function AffiliationData({ ccn_employee }) {

	const { data: data_ss_employee, error: error_ss_employee, isError: is_error_ss_employee, isSuccess: is_succes_ss_employee } = useGetSsEmployeeQuery(ccn_employee);

	const { data: data_aap, error: error_aap, isError: is_error_aap, isSuccess: is_success_aap } = useGetAapQuery(data_ss_employee ? data_ss_employee.SSEmployee.ccn_aap : 1);
	const { data: data_afp, error: error_afp, isError: is_error_afp, isSuccess: is_success_afp } = useGetAfpQuery(data_ss_employee ? data_ss_employee.SSEmployee.ccn_afp : 1);
	const { data: data_arl, error: error_arl, isError: is_error_arl, isSuccess: is_success_arl } = useGetArlQuery(data_ss_employee ? data_ss_employee.SSEmployee.ccn_arl : 1);
	const { data: data_ccf, error: error_ccf, isError: is_error_ccf, isSuccess: is_success_ccf } = useGetCcfQuery(data_ss_employee ? data_ss_employee.SSEmployee.ccn_ccf : 1);
	const { data: data_eps, error: error_eps, isError: is_error_eps, isSuccess: is_success_eps } = useGetEpsQuery(data_ss_employee ? data_ss_employee.SSEmployee.ccn_eps : 1);
	const { data: data_type_affiliation, error: error_type_affiliation, isError: is_error_type_affiliation, isSuccess: is_success_type_affiliation } = useGetTypeAffiliationQuery(data_ss_employee ? data_ss_employee.SSEmployee.ccn_type_affiliation : 1);
	const { data: data_type_contributor, error: error_type_contributor, isError: is_error_type_contributor, isSuccess: is_success_type_contributor } = useGetTypeContributorQuery(data_ss_employee ? data_ss_employee.SSEmployee.ccn_type_contributor : 1);


	return (
		<>
			{data_ss_employee ?
				<div className="bg-gray-200 border-b-2 border-gray-200 uppercase shadow-lg sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase">
							Datos de afiliación
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							En este apartado se puede visualizar la información
							de los datos de afiliación del empleado.
						</p>
					</div>
					<div className="border-t border-gray-200 uppercase">
						<dl>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										tipo de afiliación
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_type_affiliation ? data_type_affiliation.TypeAffiliation.description_type_affiliation : null}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										Tipo de contribuidor
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_type_contributor ? data_type_contributor.TypeContributor.description_type_contributor : null}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										EPS:
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_eps ? data_eps.EPS.description_eps : null}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										AFP:
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_afp ? data_afp.AFP.description_afp : null}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										ARL:
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_arl ? data_arl.ARL.description_arl : null}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										CCF:
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_ccf ? data_ccf.CCF.description_ccf : null}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										AAP:
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_aap ? data_aap.AAP.description_aap : null}
								</dd>
							</div>
						</dl>
					</div>
				</div>
				:
				<div className="h-[100%] container mx-auto flex items-center">
					<IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
				</div>}
		</>
	);
}

const Accordion = ({ title, content }) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<button className="w-full">
			<div className="accordion my-2">
				<div className={isOpen ? "h-[50px] border-black border-y bg-gray-200" : "h-[50px] border-black border-y bg-white hover:bg-gray-200"} onClick={toggleAccordion}>
					<h3 className="text-xl flex uppercase justify-center items-center">{title}<p className={isOpen ? " mx-3 text-3xl my-auto transition-all rotate-180" : "mx-3 first-letter:text-3xl my-auto transition-all"} >{isOpen ? "-" : "+"}</p></h3>
				</div>
				{isOpen && (
					<div className="accordion-content p-2 uppercase transition-all">
						<>
							<div className="bg-white px-4 py-5 border-gray-300 hover:bg-gray-100 border-y sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										Tipo de documento
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{content.type_id}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid border-gray-300 hover:bg-gray-100 border-y sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										No. de documento
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{content.number_id}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid border-gray-300 hover:bg-gray-100 border-y sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										GENERO:
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{content.auto_perceived_gender}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid border-gray-300 hover:bg-gray-100 border-y sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										PRIMER NOMBRE:
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{content.first_name}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid border-gray-300 hover:bg-gray-100 border-y sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										SEGUNDO NOMBRE:
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{content.middle_name}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid border-gray-300 hover:bg-gray-100 border-y sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										PRIMER APELLIDO:
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{content.first_last_name}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid border-gray-300 hover:bg-gray-100 border-y sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										SEGUNDO APELLIDO:
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{content.second_last_name}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid border-gray-300 hover:bg-gray-100 border-y sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										FECHA DE NACIMIENTO:
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{content.date_of_birth}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid border-gray-300 hover:bg-gray-100 border-y sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										EDAD:
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{content.age}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid border-gray-300 hover:bg-gray-100 border-y sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										RANGO DE EDAD:
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{content.age_range}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid border-gray-300 hover:bg-gray-100 border-y sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										NIVEL DE ESCOLARIDAD:
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{content.schooling_level}
								</dd>
							</div>
						</>
					</div>
				)}
			</div>
		</button >
	);
};

function FamilyNucleus({ ccn_employee }) {
	const [children, setChildren] = useState(0)

	const { data: data_family_nucleus, error: error_family_nucleus, isError: is_error_family_nucleus, isSuccess: is_succes_family_nucleus } = useGetFamilyNucleusQuery(ccn_employee);

	return (
		<>
			{data_family_nucleus ?
				<div className="bg-gray-200 border-b-2 border-gray-200 uppercase shadow-lg sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase">
							Núcleo familiar
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							En este apartado se puede visualizar la información
							de los datos núcleo familiar del empleado.
						</p>
					</div>

					<div className="border-t border-gray-200 bg-white uppercase">
						{data_family_nucleus ? data_family_nucleus.FamilyNucleu.map((numberChildren, index) => {
							if (numberChildren.number_of_children) {
								return (
									<Accordion title={`${numberChildren.first_name} ${numberChildren.first_last_name}`} content={numberChildren} />
								)
							} else if (!numberChildren.number_of_children) {
								return (
									<p className="text-center hover:bg-gray-200 my-2 h-[50px] border-black border-y">El empleado {numberChildren.full_name_employee} no tiene hijos registrados</p>
								)
							}
						}) : <div className="h-[100%] container mx-auto flex items-center">
							<IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
						</div>}
					</div>
				</div>
				:
				<div className="h-[100%] container mx-auto flex items-center">
					<IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
				</div>}
		</>
	);
}

function HealthCondition({ ccn_employee }) {
	const { data: data_health_condition, error: error_health_condition, isError: is_error_health_condition, isSuccess: is_success_health_condition } = useGetHealthConditionQuery(ccn_employee);

	const { data: data_diseases, error: error_diseases, isError: is_error_diseases, isSuccess: is_success_diseases } = useGetDiseasesQuery(data_health_condition ? data_health_condition.HealthCondition.ccn_diseases : 1);

	return (
		<>
			{data_health_condition ?
				<div className="bg-gray-200 border-b-2 border-gray-200 uppercase shadow-lg sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase">
							ESTADO DE SALUD
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							En este apartado se puede visualizar la información
							de los datos del estado de salud del empleado.
						</p>
					</div>
					<div className="border-t border-gray-200 uppercase">
						{data_health_condition ? <><dl>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Consume bebidas alcohólicas  </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.consume_alcoholic_beverages}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>ENFERMEDADES: </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_diseases ? data_diseases.Diseases.diseases : null}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>ALERGIAS: </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.allergies}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>CUALES ALERGIAS: </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.what_allergy}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>MEDICAMENTOS: </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.medicines}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>CUALES MEDICAMENTOS: </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.what_medicin}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>ULTIMA CONSULTA MEDICA: </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.last_medical_consultation}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Sentir necesidad de ingerir menos cantidad de bebidas alcohólicas </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.plan_to_drink_less_alcoholic_beverages}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Molestia por criticas debido a la forma de ingerir bebidas alcohólicas </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.discomfort_due_to_criticism_when_ingesting_alcohol}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Sentir necesidad de ingerir bebidas alcohólicas en la mañana </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.need_to_drink_alcohol_in_the_morning}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Actividad física 3 veces por semana 30 minutos cada sesión </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.physical_activity_3_times_a_week_30_minutes}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Fuma</strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.he_is_a_smoker}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Cantidad de cigarrillos al día  </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.how_many_cigarettes_a_day}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Exfumador </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.he_is_ex_smoker}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Consume sustancias psicoactivas  </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.consume_psychoactive_substances}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Antes consumió sustancias psicoactivas </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.used_psychoactive_substances_before}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Que sustancias psicoactivas </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_health_condition.HealthCondition.what_psychoactive_substances}
								</dd>
							</div>
						</dl>
						</>
							: null}
					</div>
				</div>
				:
				<div className="h-[100%] container mx-auto flex items-center">
					<IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
				</div>}
		</>
	);
}
function Relationship({ ccn_employee }) {

	const { data: data_relationship, error: error_relationship, isError: is_error_relationship, isSuccess: is_success_relationship } = useGetEmploymentRelationshipQuery(ccn_employee);

	const { data: data_immediate_boss, error: error_immediate_boss, isError: is_error_immediate_boss, isSuccess: is_succes_immediate_boss } = useGetEmployeeQuery(data_relationship ? data_relationship.EmployeeRelationship.immediate_boss : 1);
	const { data: data_manager, error: error_manager, isError: is_error_manager, isSuccess: is_succes_manager } = useGetEmployeeQuery(data_relationship ? data_relationship.EmployeeRelationship.manager : 1);
	const { data: data_role, error: error_role, isError: is_error_role, isSuccess: is_success_role } = useGetRolesByIDQuery(data_relationship ? data_relationship.EmployeeRelationship.ccn_role : 1);
	const { data: data_type_relationship, error: error_type_relationship, isError: is_error_type_relationship, isSuccess: is_success_type_relationship } = useGetTypeRelationshipQuery(data_relationship ? data_relationship.EmployeeRelationship.ccn_type_relationship : 1);
	const { data: data_work_shift, error: error_work_shift, isError: is_error_work_shift, isSuccess: is_success_work_shift } = useGetWorkShiftQuery(data_relationship ? data_relationship.EmployeeRelationship.ccn_work_shift : 1);

	return (
		<>
			{data_immediate_boss ?
				<div className="bg-gray-200 border-b-2 border-gray-200 uppercase shadow-lg sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase">
							Vinculación laboral
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							En este apartado se puede visualizar la información
							de los datos de la vinculación laboral del empleado.
						</p>
					</div>
					{
						data_relationship
							?
							<>

								<div className="border-t border-gray-200 uppercase">
									<dl>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Área  </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_role ? data_role.Role.area : null}
											</dd>
										</div>

										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Cargo  </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_role ? data_role.Role.role : null}
											</dd>
										</div>

										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Proceso </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_role ? data_role.Role.process : null}
											</dd>
										</div>

										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Turno de trabajo  </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_work_shift ? data_work_shift.WorkShift.description_work_shift : null}
											</dd>
										</div>

										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Tipo de vinculación </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_type_relationship ? data_type_relationship.TypeRelationship.description_type_relationship : null}
											</dd>
										</div >

										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Fecha de vinculación </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_relationship.EmployeeRelationship.binding_date}
											</dd>
										</div >

										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Tiempo laborado </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_relationship.EmployeeRelationship.time_worked}
											</dd>
										</div >

										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Correo electrónico corporativo 	</strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_relationship.EmployeeRelationship.employee_corporate_email}
											</dd>
										</div >

										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Teléfono corporativo </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_relationship.EmployeeRelationship.employee_corporate_cellphone}
											</dd>
										</div >

										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Jefe inmediato </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_immediate_boss ? data_immediate_boss.Employee.full_name_employee : null}
											</dd>
										</div >

										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Manager </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_manager ? data_manager.Employee.full_name_employee : null}
											</dd>
										</div >

										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Tipo de cargo  </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_relationship.EmployeeRelationship.type_of_charge}
											</dd>
										</div>
									</dl>
								</div>
							</>
							:
							null}
				</div>
				:
				<div className="h-[100%] container mx-auto flex items-center">
					<IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
				</div>}
		</>
	);
}
function DemographicData({ ccn_employee }) {
	const { data: data_demographic_data, error: error_demographic_data, isError: is_error_demographic_data, isSuccess: is_succes_demographic_data } = useGetDemographicDataQuery(ccn_employee);

	const { data: data_city_residence, error: error_city_residence, isError: is_error_city_residence, isSuccess: is_success_city_residence } = useGetCitiesQuery(data_demographic_data ? data_demographic_data.DemographicData.city_residence : 1);
	const { data: data_department_residence, error: error_department_residence, isError: is_error_department_residence, isSuccess: is_success_department_residence } = useGetDepartmentQuery(data_demographic_data ? data_demographic_data.DemographicData.department_residence : 1);
	const { data: data_city_birth, error: error_city_birth, isError: is_error_city_birth, isSuccess: is_success_city_birth } = useGetCitiesQuery(data_demographic_data ? data_demographic_data.DemographicData.birth_city : 1);
	const { data: data_department_birth, error: error_department_birth, isError: is_error_department_birth, isSuccess: is_success_department_birth } = useGetDepartmentQuery(data_demographic_data ? data_demographic_data.DemographicData.birth_department : 1);
	const { data: data_race, error: error_race, isError: is_error_race, isSuccess: is_success_race } = useGetRaceQuery(data_demographic_data ? data_demographic_data.DemographicData.ccn_race : 1);
	const { data: data_schooling_level, error: error_schooling_level, isError: is_error_schooling_level, isSuccess: is_success_schooling_level } = useGetSchoolingLevelQuery(data_demographic_data ? data_demographic_data.DemographicData.ccn_schooling_level : 1);

	return (
		<>
			{data_demographic_data ?
				<div className="bg-gray-200 border-b-2 border-gray-200 uppercase shadow-lg sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase">
							Datos demográficos
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							En este apartado se puede visualizar la información
							de los datos demográficos del empleado.
						</p>
					</div>
					<div className="border-t border-gray-200 uppercase">
						<dl>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Departamento de nacimiento</strong>{" "}
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_department_birth ? data_department_birth.Department.descripcion_department : null}
								</dd>
							</div>


							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Ciudad de nacimiento </strong>{" "}
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_city_birth ? data_city_birth.City.description_city : null}
								</dd>
							</div>


							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Departamento de residencia </strong>{" "}
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_department_residence ? data_department_residence.Department.descripcion_department : null}
								</dd>
							</div>


							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Ciudad de residencia </strong>{" "}
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_city_residence ? data_city_residence.City.description_city : null}
								</dd>
							</div>


							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Nivel de escolaridad </strong>{" "}
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_schooling_level ? data_schooling_level.SchoolingLevel.description_schooling_level : null}
								</dd>
							</div>


							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Raza </strong>
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_race ? data_race.Race.description_race : null}
								</dd>
							</div>


							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="flex flex-col text-sm font-extrabold uppercase">
									<span className="text-xs">
										<strong>Cabeza de hogar</strong>{" "}
									</span>
								</dt>
								<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
									{data_demographic_data ?
										data_demographic_data.is_head_of_household === 1
											?
											<Approval />
											:
											<Disapprove />

										: null}
								</dd>
							</div>
						</dl>
					</div>
				</div>
				:
				<div className="h-[100%] container mx-auto flex items-center">
					<IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
				</div>}
		</>
	);
}

function SociodemographicData({ ccn_employee }) {
	const { data: data_sociodemographic_data, error: error_demographic_data, isError: is_error_demographic_data, isSuccess: is_succes_demographic_data } = useGetSociodemographicDataQuery(ccn_employee);

	const { data: data_house_type, error: error_house_type, isError: is_error_house_type, isSuccess: is_success_house_type } = useGetHouseTypeQuery(data_sociodemographic_data ? data_sociodemographic_data.SociodemographicData.ccn_house_type : 1);
	const { data: data_sub_house_type, error: error_sub_house_type, isError: is_error_sub_house_type, isSuccess: is_success_sub_house_type } = useGetSubhouseTypeQuery(data_sociodemographic_data ? data_sociodemographic_data.SociodemographicData.ccn_sub_house_type : 1);

	return (
		<>
			{data_sociodemographic_data ?
				<div className="bg-gray-200 border-b-2 border-gray-200 uppercase shadow-lg sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase">
							Datos sociodemográficos
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							En este apartado se puede visualizar la información
							de los datos sociodemográficos del empleado.
						</p>
					</div>

					{
						data_sociodemographic_data
							?
							<>
								<div className="border-t border-gray-200 uppercase">
									<dl>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Personas que dependen del empleado  </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.other_dependents}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>No de personas en el hogar </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.relatives}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>
														No. De personas en condición de discapacidad
													</strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.people_with_disabilities}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Ingresos familiares SMLMV </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.monthly_income}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>
														Los ingresos alcanzan para los gastos mínimos
													</strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.is_income_enougth}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Tipo de vivienda </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sub_house_type ? data_sub_house_type.SubHouseType.sub_house_type : null}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Características de la vivienda </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_house_type ? data_house_type.HouseType.house_type : null}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Zona en la que se ubica </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.where_its_located}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Dirección de residencia </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.residence_address}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Tipo de transporte para ir al trabajo  </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.type_transportation}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>
														Tipo de transporte alterno para ir al trabajo (opcional)
													</strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.type_transportation_2}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Estrato de servicios públicos </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.social_stratum}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Energía eléctrica </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.electric_power}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Alcantarillado  </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.sewerage}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Acueducto </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.aqueduct}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Gas Natural  </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.natural_gas}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Recolección de basuras </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.garbage_collection}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Teléfono fijo </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.landline}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Tiene deudas </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.debts}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>
														Interés en consolidar las deudas en un solo crédito
													</strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.debt_refinancing}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Computador en el hogar </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.computer_at_home}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="flex flex-col text-sm font-extrabold uppercase">
												<span className="text-xs">
													<strong>Acceso a internet  </strong>
												</span>
											</dt>
											<dd className="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">
												{data_sociodemographic_data.SociodemographicData.have_internet_access}
											</dd>
										</div>
									</dl>
								</div>
							</>
							:
							null
					}
				</div>
				:
				<div className="h-[100%] container mx-auto flex items-center">
					<IsotipoPlena width="40" height="40" className="mx-auto animate-spin" />
				</div>}
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
