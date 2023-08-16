// Importaciones
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


// Layouts
import AppLayout from "./layouts/home/AppLayout";
import AuthLayout from "./layouts/auth/AuthLayout";
import CVLayout from "./layouts/formatsLayout/CVLayout";
// Pages Authorization
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ChangePassword from "./pages/auth/ChangePassword";
// Pages Aplication

import UsersRoles from "./pages/admin_panel/UsersRoles";

import Home from "./pages/home/Home";
import AdminPanel from "./pages/admin_panel/AdminPanel";
import { MainDashboard } from "./pages/dashboard/dashboard-hhrr/vizualization-components/DashboardsGraphics";
import { AccessControl } from "./pages/security/AccessControl";
import FamilyNucleus from "./pages/data_employees/FamilyNucleus";
import AAP from "./pages/data_definite_codes/afiliation_data/AAP";
import AFP from "./pages/data_definite_codes/afiliation_data/AFP";
import EPS from "./pages/data_definite_codes/afiliation_data/EPS";
import ARL from "./pages/data_definite_codes/afiliation_data/ARL";
import CCF from "./pages/data_definite_codes/afiliation_data/CCF";
import SocialSecurity from "./pages/data_employees/SocialSecurity";
import HealthCondition from "./pages/data_employees/HealthCondition";
import DemographicData from "./pages/data_employees/DemographicData";
import RH from "./pages/data_definite_codes/personal_information/RH";
import Race from "./pages/data_definite_codes/demographic_data/Race";
import Roles from "./pages/data_definite_codes/data_relationship/Roles";
import Citys from "./pages/data_definite_codes/personal_information/Citys";
import DashboardHHRR from "./pages/dashboard/dashboard-hhrr/DashboardHHRR";
import TypeID from "./pages/data_definite_codes/personal_information/TypeID";
import SociodemographicData from "./pages/data_employees/SociodemographicData";
import WorkShift from "./pages/data_definite_codes/data_relationship/WorkShift";
import AgeRange from "./pages/data_definite_codes/personal_information/AgeRange";
import ReadBasicDataEmployee from "./pages/data_employees/ReadBasicDataEmployee";
import Countrys from "./pages/data_definite_codes/personal_information/Countrys";
import EmploymentRelationship from "./pages/data_employees/EmploymentRelationship";
import HouseType from "./pages/data_definite_codes/sociodemographic_data/HouseType";
import EmergencyContactDetails from "./pages/data_employees/EmergencyContactDetails";
import Departments from "./pages/data_definite_codes/personal_information/Departments";
import SchoolingLevel from "./pages/data_definite_codes/demographic_data/SchoolingLevel";
import TypeAfiliation from "./pages/data_definite_codes/afiliation_data/TypeAffiliation";
import AutoPerceivedGender from "./pages/data_definite_codes/personal_information/Gender";
import SubHouseType from "./pages/data_definite_codes/sociodemographic_data/SubhouseType";
import TypeContribuidor from "./pages/data_definite_codes/afiliation_data/TypeContributor";
import MaritalStatus from "./pages/data_definite_codes/sociodemographic_data/MaritalStatus";
import TypeRelationship from "./pages/data_definite_codes/data_relationship/TypeRelationship";
import { PerformanceEvaluation } from "./pages/events/performance evaluation/PerformanceEvaluation";
import ListPerformanceEvaluation from "./pages/events/performance evaluation/ListPerformanceEvaluation";
import PerformanceEvaluationDetail from "./pages/events/performance evaluation/PerformanceEvaluationDetail";
import { DashboardPBI } from "./pages/dashboard/dashboard-hhrr/DashboarPBI";
// Page 404 Error
import Error404 from "./pages/404";
import AccessDenied from "./components/AccessDenied";
import { useSelector } from "react-redux";
import { useGetRBACByRoleQuery } from "./redux_app/services/rbacAPI";
import { InformedConsentLaw1581 } from "./components/InformedConsentLaw1581";
import { DashboardPE } from "./pages/events/performance evaluation/DashboardPE";

function App() {

	const nombre_usuario_actual = useSelector((state) => state);

	const current_user = nombre_usuario_actual.authAPISlice.current_user.ccn_employee || 0
	const ccn_role = nombre_usuario_actual.authAPISlice.access_level.ccn_role || 1

	const {
		data: list_rbac_by_role,
		isLoading: is_loading_rbac_by_role,
		isError: is_error_role_rbac_by_role,
		error,
		isSuccess,
	} = useGetRBACByRoleQuery(ccn_role, { skip: false });

	return (
		<Router>
			<Routes>
				<Route path="/" element={<AuthLayout />}>
					<Route index element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route
						path="forget-password"
						element={<ForgetPassword />}
					/>
					<Route
						path="change-password/:token"
						element={<ChangePassword />}
					/>
				</Route>
				<Route path="/home" element={<AppLayout />}>
					<Route index element={<Home />} />
				</Route>

				<Route
					path="/performance-evaluation-detail/:ccn_performance_evaluation/:role"
					element={<AppLayout />}
				>
					<Route index element={<PerformanceEvaluation />} />
				</Route>

				<Route path="/basic-data-employee" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[2].read_access ? (
								<ReadBasicDataEmployee />
							) : (
								<AccessDenied />
							)
								: null
						}
					/>
				</Route>

				<Route path="/social-security" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[8].read_access ? (
								<SocialSecurity />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/employment-relationship" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[21].read_access ? (
								<EmploymentRelationship />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/emergency-contact-details"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[35].read_access ? (
								<EmergencyContactDetails />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/demographic-data" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[10].read_access ? (
								<DemographicData />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/sociodemographic-data" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[17].read_access ? (
								<SociodemographicData />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/family-nucleus" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[36].read_access ? (
								<FamilyNucleus />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/health-condition" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[37].read_access ? (
								<HealthCondition />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/definite-codes/rh" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[11].read_access ? (
								<RH />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/definite-codes/gender" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[28].read_access ? (
								<AutoPerceivedGender />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/definite-codes/cities" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[14].read_access ? (
								<Citys />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/definite-codes/departments"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[24].read_access ? (
								<Departments />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/definite-codes/countries" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[20].read_access ? (
								<Countrys />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/definite-codes/age-ranges"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[19].read_access ? (
								<AgeRange />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/definite-codes/types-id" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[38].read_access ? (
								<TypeID />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/definite-codes/type-affiliation"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[27].read_access ? (
								<TypeAfiliation />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/definite-codes/type-contributor"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[29].read_access ? (
								<TypeContribuidor />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/definite-codes/eps" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[5].read_access ? (
								<EPS />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/definite-codes/afp" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[4].read_access ? (
								<AFP />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/definite-codes/arl" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[6].read_access ? (
								<ARL />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/definite-codes/ccf" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[7].read_access ? (
								<CCF />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/definite-codes/aap" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[3].read_access ? (
								<AAP />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/definite-codes/roles" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[13].read_access ? (
								<Roles />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/definite-codes/work-shift"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[18].read_access ? (
								<WorkShift />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/definite-codes/type-relationship"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[31].read_access ? (
								<TypeRelationship />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/definite-codes/schooling-level"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[25].read_access ? (
								<SchoolingLevel />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/definite-codes/race" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[12].read_access ? (
								<Race />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/definite-codes/marital-status"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[30].read_access ? (
								<MaritalStatus />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/definite-codes/house-type"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[22].read_access ? (
								<HouseType />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/definite-codes/subhouse-type"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[28].read_access ? (
								<SubHouseType />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/perfomance-evaluation-2022"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[33].read_access ? (
								<ListPerformanceEvaluation />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/performance-evaluation-detail/:ccn_performance_evaluation/:role"
					element={<AppLayout />}
				>
					<Route index element={<PerformanceEvaluation />} />
				</Route>

				<Route path="/access-control" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[0].read_access ? (
								<AccessControl />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route path="/cv-employees/:ccn_employee" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[39].read_access ? (
								<CVLayout />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/performance-evaluation-detail/:ccn_performance_evaluation"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[34].read_access ? (
								<PerformanceEvaluationDetail />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/performance-evaluation-detail/dashboard-performance-evaluation"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[41].read_access ? (
								<DashboardPE />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				{/*<AdminPanel />*/}
				<Route path="/administration-panel" element={<AppLayout />}>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[0].read_access ? (
								<UsersRoles />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/administration-panel/users-roles"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[0].read_access ? (
								<UsersRoles />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>

				<Route
					path="/informedConsent-law-1581"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							<InformedConsentLaw1581 />
						}
					/>
				</Route>

				<Route
					path="/dashboard-PBI"
					element={<AppLayout />}
				>
					<Route
						index
						element={
							<DashboardPBI />
						}
					/>
				</Route>


				<Route path="/metrics" element={<AppLayout />}>
					<Route
						path="hhrr"
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[40].read_access ? (
								<MainDashboard />
							) : (
								<AccessDenied />
							) : null
						}
					/>
					<Route
						path="hhrr"
						element={
							list_rbac_by_role ? list_rbac_by_role.rbacByRole[15].read_access ? (
								<DashboardHHRR />
							) : (
								<AccessDenied />
							) : null
						}
					/>
				</Route>
				<Route path="*" element={<Error404 />} />
			</Routes>
		</Router>
	);
}

export default App;
