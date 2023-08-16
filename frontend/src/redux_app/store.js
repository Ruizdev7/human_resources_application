
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authApi } from "./services/authAPI";
import { AAPAPI } from "./services/aapAPI";
import { AFPAPI } from "./services/afpAPI";
import { AgeRangeAPI } from "./services/ageRange";
import { ARLAPI } from "./services/arlAPI";
import { AutoPerceivedGenderAPI } from "./services/autoPerceivedGenderAPI";
import { CCFAPI } from "./services/ccfAPI";
import { CitiesAPI } from "./services/cityAPI";
import { CountriesAPI } from "./services/countryAPI";
import { DemographicDataApi } from "./services/demographicData";
import { EmergencyContactDetailsApi } from "./services/emergencyContactDetailsAPI";
import { EPSAPI } from "./services/epsAPI";
import { FamilyNucleusApi } from "./services/familyNucleusAPI";
import { HealthConditionApi } from "./services/healthConditionAPI";
import { HouseTypeAPI } from "./services/houseTypeAPI";
import { MaritalStatusAPI } from "./services/maritalStatusAPI";
import { RaceAPI } from "./services/raceAPI";
import { RHAPI } from "./services/rhAPI";
import { SchoolingLevelAPI } from "./services/schoolingLevelAPI";
import { SsEmployeeApi } from "./services/ssEmployeeAPI";
import { SubhouseTypeAPI } from "./services/subhouseTypeAPI";
import { TypeAffiliationAPI } from "./services/typeAffiliation";
import { TypeContributorAPI } from "./services/typeContributor";
import { TypeIdAPI } from "./services/typeIdAPI";
import { TypeRelationshipAPI } from "./services/typeOfRelationshipAPI";
import { WorkShiftAPI } from "./services/workShift";
import { RBACApi } from "./services/rbacAPI";
import { RBACModulesApi } from "./services/rbacModules";
import { rolesApi } from "./services/rolesAPI";
import authAPISlice from "./role_base_access_control/authSlice"
import { EmployeeApi } from "./services/employeeAPI";
import { DepartmentAPI } from "./services/departmentAPI";
import { RelationshipAPI } from "./services/relationshipAPI";
import { EmploymentRelationshipAPI } from "./services/employmentRelationshipAPI";
import { SociodemographicDataAPI } from "./services/sociodemographicDataAPI";
import { DiseasesAPI } from "./services/diseasesAPI";
import { PerformanceEvaluationAPI } from "./services/performanceEvaluation";
import { MainDashboardAPI } from "./services/MainDashboard";
import { authIAPApi } from "./services/auth/authentication";

const rootReducer = combineReducers({
	authAPISlice: authAPISlice,
	[authApi.reducerPath]: authApi.reducer,
	[rolesApi.reducerPath]: rolesApi.reducer,
	[RBACApi.reducerPath]: RBACApi.reducer,
	[RBACModulesApi.reducerPath]: RBACModulesApi.reducer,
	[EmployeeApi.reducerPath]: EmployeeApi.reducer,
	[DepartmentAPI.reducerPath]: DepartmentAPI.reducer,
	[EmploymentRelationshipAPI.reducerPath]: EmploymentRelationshipAPI.reducer,
	[AAPAPI.reducerPath]: AAPAPI.reducer,
	[AFPAPI.reducerPath]: AFPAPI.reducer,
	[AgeRangeAPI.reducerPath]: AgeRangeAPI.reducer,
	[ARLAPI.reducerPath]: ARLAPI.reducer,
	[AutoPerceivedGenderAPI.reducerPath]: AutoPerceivedGenderAPI.reducer,
	[CCFAPI.reducerPath]: CCFAPI.reducer,
	[CitiesAPI.reducerPath]: CitiesAPI.reducer,
	[CountriesAPI.reducerPath]: CountriesAPI.reducer,
	[DemographicDataApi.reducerPath]: DemographicDataApi.reducer,
	[EmergencyContactDetailsApi.reducerPath]: EmergencyContactDetailsApi.reducer,
	[EPSAPI.reducerPath]: EPSAPI.reducer,
	[FamilyNucleusApi.reducerPath]: FamilyNucleusApi.reducer,
	[HealthConditionApi.reducerPath]: HealthConditionApi.reducer,
	[HouseTypeAPI.reducerPath]: HouseTypeAPI.reducer,
	[MaritalStatusAPI.reducerPath]: MaritalStatusAPI.reducer,
	[RaceAPI.reducerPath]: RaceAPI.reducer,
	[RHAPI.reducerPath]: RHAPI.reducer,
	[SchoolingLevelAPI.reducerPath]: SchoolingLevelAPI.reducer,
	[SsEmployeeApi.reducerPath]: SsEmployeeApi.reducer,
	[SubhouseTypeAPI.reducerPath]: SubhouseTypeAPI.reducer,
	[TypeAffiliationAPI.reducerPath]: TypeAffiliationAPI.reducer,
	[TypeContributorAPI.reducerPath]: TypeContributorAPI.reducer,
	[TypeIdAPI.reducerPath]: TypeIdAPI.reducer,
	[TypeRelationshipAPI.reducerPath]: TypeRelationshipAPI.reducer,
	[WorkShiftAPI.reducerPath]: WorkShiftAPI.reducer,
	[RelationshipAPI.reducerPath]: RelationshipAPI.reducer,
	[SociodemographicDataAPI.reducerPath]: SociodemographicDataAPI.reducer,
	[DiseasesAPI.reducerPath]: DiseasesAPI.reducer,
	[PerformanceEvaluationAPI.reducerPath]: PerformanceEvaluationAPI.reducer,
	[MainDashboardAPI.reducerPath]: MainDashboardAPI.reducer,
	[authIAPApi.reducerPath]: authIAPApi.reducer,
});
const persistConfig = {
	key: "root",
	storage,
	whitelist: [
		"authApi",
		"rolesApi",
		"RBACApi",
		"RBACModulesApi",
		"authAPISlice",
		"EmployeeApi",
		"DepartmentAPI",
		"EmploymentRelationshipAPI",
		"AAPAPI",
		"AFPAPI",
		"AgeRangeAPI",
		"ARLAPI",
		"AutoPerceivedGenderAPI",
		"CCFAPI",
		"CitiesAPI",
		"CountriesAPI",
		"DemographicDataApi",
		"EmergencyContactDetailsApi",
		"EPSAPI",
		"FamilyNucleusApi",
		"HealthConditionApi",
		"HouseTypeAPI",
		"MaritalStatusAPI",
		"RaceAPI",
		"RHAPI",
		"SchoolingLevelAPI",
		"SsEmployeeApi",
		"SubhouseTypeAPI",
		"TypeAffiliationAPI",
		"TypeContributorAPI",
		"TypeIdAPI",
		"TypeRelationshipAPI",
		"WorkShiftAPI",
		"RelationshipAPI",
		"SociodemographicDataAPI",
		"DiseasesAPI",
		"PerformanceEvaluationAPI",
		"MainDashboardAPI",
		"authIAPApi",
	],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({

	reducer: persistedReducer,
	//middleware:[thunk],
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(
			authApi.middleware,
			rolesApi.middleware,
			RBACApi.middleware,
			RBACModulesApi.middleware,
			EmployeeApi.middleware,
			DepartmentAPI.middleware,
			EmploymentRelationshipAPI.middleware,
			AAPAPI.middleware,
			AFPAPI.middleware,
			AgeRangeAPI.middleware,
			ARLAPI.middleware,
			AutoPerceivedGenderAPI.middleware,
			CCFAPI.middleware,
			CitiesAPI.middleware,
			CountriesAPI.middleware,
			DemographicDataApi.middleware,
			EmergencyContactDetailsApi.middleware,
			EPSAPI.middleware,
			FamilyNucleusApi.middleware,
			HealthConditionApi.middleware,
			HouseTypeAPI.middleware,
			MaritalStatusAPI.middleware,
			RaceAPI.middleware,
			RHAPI.middleware,
			SchoolingLevelAPI.middleware,
			SsEmployeeApi.middleware,
			SubhouseTypeAPI.middleware,
			TypeAffiliationAPI.middleware,
			TypeContributorAPI.middleware,
			TypeIdAPI.middleware,
			TypeRelationshipAPI.middleware,
			WorkShiftAPI.middleware,
			RelationshipAPI.middleware,
			SociodemographicDataAPI.middleware,
			DiseasesAPI.middleware,
			PerformanceEvaluationAPI.middleware,
			MainDashboardAPI.middleware,
			authIAPApi.middleware,
		),
});
export default store;

setupListeners(store.dispatch);