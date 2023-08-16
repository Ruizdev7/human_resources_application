import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
	ImmediatiBossFormAPE,
	EmployeeAnswerAPE,
	ActionPlanAPE,
	ManagerAprovalAPE,
	InstrucctionsAPE,
} from "./AdministrativeProcess";
import {
	ImmediatiBossFormDPE,
	EmployeeAnswerDPE,
	ActionPlanDPE,
	ManagerAprovalDPE,
	InstrucctionsDPE,
} from "./DirectiveProcess";
import {
	ImmediatiBossFormOPE,
	EmployeeAnswerOPE,
	ActionPlanOPE,
	ManagerAprovalOPE,
	InstrucctionsOPE,
} from "./OperativeProcess";

export const PerformanceEvaluation = () => {
	const {
		ccn_performance_evaluation,
		role,
	} = useParams();

	const [performanceEvaluation, setperformanceEvaluation] = useState("");
	const [state, setState] = useState(1);
	const [stateByButtons, setStateByButtons] = useState(0)
	const getRelationship = async () => {
		const respPerformanceEvaluation = await axios(
			`${import.meta.env.VITE_API_ADDRESS}performance_evaluation/${ccn_performance_evaluation}`
		);
		setperformanceEvaluation(
			respPerformanceEvaluation.data.PerformanceEvaluation[0]
		);
		setStateByButtons(respPerformanceEvaluation.data.PerformanceEvaluation.ccn_states_performance_evaluation);
	};

	useEffect(() => {
		getRelationship();
	}, []);
	return (
		<>
			{performanceEvaluation.type_employee === "ADMINISTRATIVO" ? (
				<div className="overflow-auto">
					{performanceEvaluation.ccn_states_performance_evaluation === 1 ? (
						<ImmediatiBossFormAPE
							ccn_performance_evaluation={
								ccn_performance_evaluation
							}
						/>
					) : null}
					{performanceEvaluation.ccn_states_performance_evaluation === 2 ? (
						<EmployeeAnswerAPE
							ccn_performance_evaluation={
								ccn_performance_evaluation
							}
						/>
					) : null}
					{performanceEvaluation.ccn_states_performance_evaluation === 3 ? (
						<ActionPlanAPE
							ccn_performance_evaluation={
								ccn_performance_evaluation
							}
						/>
					) : null}
					{performanceEvaluation.ccn_states_performance_evaluation === 4 ? (
						<ManagerAprovalAPE
							ccn_performance_evaluation={
								ccn_performance_evaluation
							}
						/>
					) : null}
				</div>
			) : (
				""
			)}
			{performanceEvaluation.type_employee === "DIRECTIVO" ? (
				<div className="overflow-auto">
					{performanceEvaluation.ccn_states_performance_evaluation === 1 ? (
						<ImmediatiBossFormDPE
							ccn_performance_evaluation={
								ccn_performance_evaluation
							}
						/>
					) : null}
					{performanceEvaluation.ccn_states_performance_evaluation === 2 ? (
						<EmployeeAnswerDPE
							ccn_performance_evaluation={
								ccn_performance_evaluation
							}
						/>
					) : null}
					{performanceEvaluation.ccn_states_performance_evaluation === 3 ? (
						<ActionPlanDPE
							ccn_performance_evaluation={
								ccn_performance_evaluation
							}
						/>
					) : null}
					{performanceEvaluation.ccn_states_performance_evaluation === 4 ? (
						<ManagerAprovalDPE
							ccn_performance_evaluation={
								ccn_performance_evaluation
							}
						/>
					) : null}
				</div>
			) : (
				""
			)}
			{performanceEvaluation.type_employee === "OPERATIVO" ? (
				<div className="overflow-auto">
					{performanceEvaluation.ccn_states_performance_evaluation === 1 ? (
						<ImmediatiBossFormOPE
							ccn_performance_evaluation={
								ccn_performance_evaluation
							}
						/>
					) : null}
					{performanceEvaluation.ccn_states_performance_evaluation === 2 ? (
						<EmployeeAnswerOPE
							ccn_performance_evaluation={
								ccn_performance_evaluation
							}
						/>
					) : null}
					{performanceEvaluation.ccn_states_performance_evaluation === 3 ? (
						<ActionPlanOPE
							ccn_performance_evaluation={
								ccn_performance_evaluation
							}
						/>
					) : null}
					{performanceEvaluation.ccn_states_performance_evaluation === 4 ? (
						<ManagerAprovalOPE
							ccn_performance_evaluation={
								ccn_performance_evaluation
							}
						/>
					) : null}
				</div>
			) : (
				""
			)}
		</>
	);
};
