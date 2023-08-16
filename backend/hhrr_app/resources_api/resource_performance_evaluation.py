import os
import pandas as pd
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_sqlalchemy import sqlalchemy
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_roles import Role
from hhrr_app.models.tbl_employee import Employee
from hhrr_app.models.tbl_states_performance_evaluation import (
    StatesPerformanceEvaluation,
)
from hhrr_app.schema.administrative_performance_evaluation_schema import (
    AdministrativePESchema,
)
from hhrr_app.models.tbl_performance_evaluation import PerformanceEvaluation
from hhrr_app.models.tbl_employee import Employee
from hhrr_app.models.tbl_directive_performance_evaluation import DirectivePE
from hhrr_app.models.tbl_operative_performance_evaluation import OperativePE
from hhrr_app.models.tbl_employment_relationship import EmploymentRelationship
from hhrr_app.schema.directive_performance_evaluation_schema import DirectivePESchema
from hhrr_app.schema.operative_performance_evaluation_schema import OperativePESchema
from hhrr_app.schema.performance_evaluation_schema import PerformanceEvaluationSchema
from hhrr_app.schema.performance_evaluation_schema import PerformanceEvaluationSchema
from hhrr_app.models.tbl_administrative_performance_evaluation import AdministrativePE


blueprint_api_performance_evaluation = Blueprint(
    "api_performance_evaluation", __name__, url_prefix=""
)


@blueprint_api_performance_evaluation.route(
    "/api/v1/performance_evaluation", methods=["POST"]
)
def post_performance_evaluation():
    data = request.get_json()
    relationshipdata = EmploymentRelationship.query.filter_by(
        ccn_employee=data["ccn_employee"]
    ).first()

    new_performance_evaluation = PerformanceEvaluation(
        opening_date=data["opening_date"],
        immediate_boss=relationshipdata.immediate_boss,
        manager=relationshipdata.manager,
        ccn_employee=data["ccn_employee"],
        type_employee=relationshipdata.type_of_charge,
    )

    db.session.add(new_performance_evaluation)
    db.session.commit()

    relation_order = PerformanceEvaluation.query.all()
    last_record = relation_order[-1]
    last_record = last_record.ccn_performance_evaluation

    if relationshipdata.type_of_charge == "ADMINISTRATIVO":
        new_administrative_pe = AdministrativePE(
            ccn_performance_evaluation=last_record,
            ccn_employee=relationshipdata.immediate_boss,
        )
        db.session.add(new_administrative_pe)
        db.session.commit()

    elif relationshipdata.type_of_charge == "OPERATIVO":
        new_operative_pe = OperativePE(
            ccn_performance_evaluation=last_record,
            ccn_employee=relationshipdata.immediate_boss,
        )
        db.session.add(new_operative_pe)
        db.session.commit()
    elif relationshipdata.type_of_charge == "DIRECTIVO":
        new_directive_pe = DirectivePE(
            ccn_performance_evaluation=last_record,
            ccn_employee=data["ccn_employee"],
        )
        db.session.add(new_directive_pe)
        db.session.commit()
    performance_evaluation_schema = PerformanceEvaluationSchema(many=False)
    performance_evaluation = performance_evaluation_schema.dump(
        new_performance_evaluation
    )

    return make_response(
        jsonify({"PerformanceEvaluation": performance_evaluation}), 201
    )


@blueprint_api_performance_evaluation.route(
    "/api/v1/performance_evaluation/after/denied_approval", methods=["POST"]
)
def post_after_denied_approval():
    data = request.get_json()
    relationshipdata = EmploymentRelationship.query.filter_by(
        ccn_employee=data["ccn_employee"]
    ).first()

    new_performance_evaluation = PerformanceEvaluation(
        opening_date=data["opening_date"],
        immediate_boss=relationshipdata.manager,
        manager=relationshipdata.manager,
        ccn_employee=data["ccn_employee"],
        type_employee=relationshipdata.type_of_charge,
    )

    db.session.add(new_performance_evaluation)
    db.session.commit()

    relation_order = PerformanceEvaluation.query.all()
    last_record = relation_order[-1]
    last_record = last_record.ccn_performance_evaluation

    if relationshipdata.type_of_charge == "ADMINISTRATIVO":
        new_administrative_pe = AdministrativePE(
            ccn_performance_evaluation=last_record,
            ccn_employee=relationshipdata.immediate_boss,
        )
        db.session.add(new_administrative_pe)
        db.session.commit()

    elif relationshipdata.type_of_charge == "OPERATIVO":
        new_operative_pe = OperativePE(
            ccn_performance_evaluation=last_record,
            ccn_employee=relationshipdata.immediate_boss,
        )
        db.session.add(new_operative_pe)
        db.session.commit()
    elif relationshipdata.type_of_charge == "DIRECTIVO":
        new_directive_pe = DirectivePE(
            ccn_performance_evaluation=last_record,
            ccn_employee=data["ccn_employee"],
        )
        db.session.add(new_directive_pe)
        db.session.commit()
    performance_evaluation_schema = PerformanceEvaluationSchema(many=False)
    performance_evaluation = performance_evaluation_schema.dump(
        new_performance_evaluation
    )

    return make_response(
        jsonify({"PerformanceEvaluation": performance_evaluation}), 201
    )


@blueprint_api_performance_evaluation.route(
    "/api/v1/performance_evaluation", methods=["GET"]
)
def get_all_performance_evaluation():
    query_all_performance_evaluation = PerformanceEvaluation.query.all()
    performance_evaluation_schema = PerformanceEvaluationSchema(many=True)
    performance_evaluation = performance_evaluation_schema.dump(
        query_all_performance_evaluation
    )
    return make_response(
        jsonify({"PerformanceEvaluation": performance_evaluation}), 200
    )


@blueprint_api_performance_evaluation.route(
    "/api/v1/performance_evaluation/employee/<int:ccn_employee>", methods=["GET"]
)
def get_performance_evaluation_employee(ccn_employee):
    query_all_performance_evaluation = PerformanceEvaluation.query.filter_by(
        ccn_employee=ccn_employee, ccn_states_performance_evaluation=2
    ).all()

    performance_evaluation_schema = PerformanceEvaluationSchema(many=True)
    performance_evaluation = performance_evaluation_schema.dump(
        query_all_performance_evaluation
    )

    return make_response(
        jsonify({"PerformanceEvaluation": performance_evaluation}), 200
    )


@blueprint_api_performance_evaluation.route(
    "/api/v1/performance_evaluation/immediate_boss/<int:immediate_boss>",
    methods=["GET"],
)
def get_performance_evaluation_immediate_boss(immediate_boss):
    query_all_performance_evaluation = (
        PerformanceEvaluation.query.filter_by(immediate_boss=immediate_boss)
        .filter(
            db.or_(
                PerformanceEvaluation.ccn_states_performance_evaluation == 3,
                PerformanceEvaluation.ccn_states_performance_evaluation == 1,
            )
        )
        .all()
    )

    performance_evaluation_schema = PerformanceEvaluationSchema(many=True)
    performance_evaluation = performance_evaluation_schema.dump(
        query_all_performance_evaluation
    )

    return make_response(
        jsonify({"PerformanceEvaluation": performance_evaluation}), 200
    )


@blueprint_api_performance_evaluation.route(
    "/api/v1/performance_evaluation_detail/<int:ccn_performance_evaluation>",
    methods=["GET"],
)
def get_performance_evaluation_detail(ccn_performance_evaluation):
    query_all_performance_evaluation = PerformanceEvaluation.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    query_manager = Employee.query.filter_by(
        ccn_employee=query_all_performance_evaluation.manager
    ).first()
    query_immediate_boss = Employee.query.filter_by(
        ccn_employee=query_all_performance_evaluation.immediate_boss
    ).first()
    if query_all_performance_evaluation.type_employee == "ADMINISTRATIVO":
        query_administrative = (
            db.session.query(
                AdministrativePE,
                PerformanceEvaluation,
                EmploymentRelationship,
                Employee,
                Role,
                StatesPerformanceEvaluation,
            )
            .join(
                PerformanceEvaluation,
                AdministrativePE.ccn_performance_evaluation
                == PerformanceEvaluation.ccn_performance_evaluation,
            )
            .join(
                EmploymentRelationship,
                PerformanceEvaluation.ccn_employee
                == EmploymentRelationship.ccn_employee,
            )
            .join(Employee, PerformanceEvaluation.ccn_employee == Employee.ccn_employee)
            .join(Role, EmploymentRelationship.ccn_role == Role.ccn_role)
            .join(
                StatesPerformanceEvaluation,
                PerformanceEvaluation.ccn_states_performance_evaluation
                == StatesPerformanceEvaluation.ccn_states_performance_evaluation,
            )
            .filter(
                AdministrativePE.ccn_performance_evaluation
                == ccn_performance_evaluation
            )
            .first()
        )

        list_pe_detail = {
            "ccn_performance_evaluation": query_administrative[
                1
            ].ccn_performance_evaluation,
            "opening_date": query_administrative[1].opening_date,
            "entry_date": query_administrative[1].entry_date,
            "action_date": query_administrative[1].action_date,
            "immediate_boss_question_date": query_administrative[
                1
            ].immediate_boss_question_date,
            "employee_response_date": query_administrative[1].employee_response_date,
            "action_plan_date": query_administrative[1].action_plan_date,
            "finish_date": query_administrative[1].finish_date,
            "immediate_boss": query_immediate_boss.full_name_employee,
            "immediate_boss_number_id_employee": query_immediate_boss.number_id_employee,
            "manager": query_manager.full_name_employee,
            "manager_number_id_employee": query_manager.number_id_employee,
            "ccn_manager": query_manager.ccn_employee,
            "ccn_employee": query_administrative[1].ccn_employee,
            "ccn_states_performance_evaluation": query_administrative[
                1
            ].ccn_states_performance_evaluation,
            "type_employee": query_administrative[1].type_employee,
            "engagement_or_productivity": query_administrative[
                0
            ].engagement_or_productivity,
            "communication_skills": query_administrative[0].communication_skills,
            "adaptation_to_change": query_administrative[0].adaptation_to_change,
            "customer_orientation": query_administrative[0].customer_orientation,
            "innovation": query_administrative[0].innovation,
            "professional_rigor": query_administrative[0].professional_rigor,
            "problem_resolution": query_administrative[0].problem_resolution,
            "leadership": query_administrative[0].leadership,
            "organization": query_administrative[0].organization,
            "overall_score": query_administrative[0].overall_score,
            "level_value": query_administrative[0].level_value,
            "employee_response": query_administrative[0].employee_response,
            "first_action_plan": query_administrative[0].first_action_plan,
            "first_action_plan_date": query_administrative[0].first_action_plan_date,
            "first_period_of_execution": query_administrative[
                0
            ].first_period_of_execution,
            "second_action_plan": query_administrative[0].second_action_plan,
            "second_action_plan_date": query_administrative[0].second_action_plan_date,
            "second_period_of_execution": query_administrative[
                0
            ].second_period_of_execution,
            "third_action_plan": query_administrative[0].third_action_plan,
            "third_action_plan_date": query_administrative[0].third_action_plan_date,
            "third_period_of_execution": query_administrative[
                0
            ].third_period_of_execution,
            "immediate_boss_observation": query_administrative[
                0
            ].immediate_boss_observation,
            "manager_response": query_administrative[0].manager_response,
            "manager_approval": query_administrative[0].manager_approval,
            "states_performance_evaluation": query_administrative[
                5
            ].states_performance_evaluation,
            "full_name_employee": query_administrative[3].full_name_employee,
            "number_id_employee": query_administrative[3].number_id_employee,
            "role": query_administrative[4].role,
            "area": query_administrative[4].area,
        }
    elif query_all_performance_evaluation.type_employee == "DIRECTIVO":
        query_directive = (
            db.session.query(
                DirectivePE,
                PerformanceEvaluation,
                EmploymentRelationship,
                Employee,
                Role,
                StatesPerformanceEvaluation,
            )
            .join(
                PerformanceEvaluation,
                DirectivePE.ccn_performance_evaluation
                == PerformanceEvaluation.ccn_performance_evaluation,
            )
            .join(
                EmploymentRelationship,
                PerformanceEvaluation.ccn_employee
                == EmploymentRelationship.ccn_employee,
            )
            .join(Employee, PerformanceEvaluation.ccn_employee == Employee.ccn_employee)
            .join(Role, EmploymentRelationship.ccn_role == Role.ccn_role)
            .join(
                StatesPerformanceEvaluation,
                PerformanceEvaluation.ccn_states_performance_evaluation
                == StatesPerformanceEvaluation.ccn_states_performance_evaluation,
            )
            .filter(
                DirectivePE.ccn_performance_evaluation == ccn_performance_evaluation
            )
            .first()
        )

        list_pe_detail = {
            "ccn_performance_evaluation": query_directive[1].ccn_performance_evaluation,
            "opening_date": query_directive[1].opening_date,
            "entry_date": query_directive[1].entry_date,
            "action_date": query_directive[1].action_date,
            "immediate_boss_question_date": query_directive[
                1
            ].immediate_boss_question_date,
            "employee_response_date": query_directive[1].employee_response_date,
            "action_plan_date": query_directive[1].action_plan_date,
            "finish_date": query_directive[1].finish_date,
            "immediate_boss": query_immediate_boss.full_name_employee,
            "immediate_boss_number_id_employee": query_immediate_boss.number_id_employee,
            "manager": query_manager.full_name_employee,
            "ccn_manager": query_manager.ccn_employee,
            "manager_number_id_employee": query_manager.number_id_employee,
            "ccn_employee": query_directive[1].ccn_employee,
            "ccn_states_performance_evaluation": query_directive[
                1
            ].ccn_states_performance_evaluation,
            "type_employee": query_directive[1].type_employee,
            "engagement_or_productivity": query_directive[0].engagement_or_productivity,
            "communication_skills": query_directive[0].communication_skills,
            "adaptation_to_change": query_directive[0].adaptation_to_change,
            "customer_orientation": query_directive[0].customer_orientation,
            "innovation": query_directive[0].innovation,
            "professional_rigor": query_directive[0].professional_rigor,
            "problem_resolution": query_directive[0].problem_resolution,
            "leadership": query_directive[0].leadership,
            "organization": query_directive[0].organization,
            "overall_score": query_directive[0].overall_score,
            "level_value": query_directive[0].level_value,
            "employee_response": query_directive[0].employee_response,
            "first_action_plan": query_directive[0].first_action_plan,
            "first_action_plan_date": query_directive[0].first_action_plan_date,
            "first_period_of_execution": query_directive[0].first_period_of_execution,
            "second_action_plan": query_directive[0].second_action_plan,
            "second_action_plan_date": query_directive[0].second_action_plan_date,
            "second_period_of_execution": query_directive[0].second_period_of_execution,
            "third_action_plan": query_directive[0].third_action_plan,
            "third_action_plan_date": query_directive[0].third_action_plan_date,
            "third_period_of_execution": query_directive[0].third_period_of_execution,
            "immediate_boss_observation": query_directive[0].immediate_boss_observation,
            "manager_response": query_directive[0].manager_response,
            "manager_approval": query_directive[0].manager_approval,
            "states_performance_evaluation": query_directive[
                5
            ].states_performance_evaluation,
            "full_name_employee": query_directive[3].full_name_employee,
            "number_id_employee": query_directive[3].number_id_employee,
            "role": query_directive[4].role,
            "area": query_directive[4].area,
        }
    elif query_all_performance_evaluation.type_employee == "OPERATIVO":
        query_operative = (
            db.session.query(
                OperativePE,
                PerformanceEvaluation,
                EmploymentRelationship,
                Employee,
                Role,
                StatesPerformanceEvaluation,
            )
            .join(
                PerformanceEvaluation,
                OperativePE.ccn_performance_evaluation
                == PerformanceEvaluation.ccn_performance_evaluation,
            )
            .join(
                EmploymentRelationship,
                PerformanceEvaluation.ccn_employee
                == EmploymentRelationship.ccn_employee,
            )
            .join(Employee, PerformanceEvaluation.ccn_employee == Employee.ccn_employee)
            .join(Role, EmploymentRelationship.ccn_role == Role.ccn_role)
            .join(
                StatesPerformanceEvaluation,
                PerformanceEvaluation.ccn_states_performance_evaluation
                == StatesPerformanceEvaluation.ccn_states_performance_evaluation,
            )
            .filter(
                OperativePE.ccn_performance_evaluation == ccn_performance_evaluation
            )
            .first()
        )

        list_pe_detail = {
            "ccn_performance_evaluation": query_operative[1].ccn_performance_evaluation,
            "opening_date": query_operative[1].opening_date,
            "entry_date": query_operative[1].entry_date,
            "action_date": query_operative[1].action_date,
            "immediate_boss_question_date": query_operative[
                1
            ].immediate_boss_question_date,
            "employee_response_date": query_operative[1].employee_response_date,
            "action_plan_date": query_operative[1].action_plan_date,
            "finish_date": query_operative[1].finish_date,
            "immediate_boss": query_immediate_boss.full_name_employee,
            "immediate_boss_number_id_employee": query_immediate_boss.number_id_employee,
            "manager": query_manager.full_name_employee,
            "ccn_manager": query_manager.ccn_employee,
            "manager_number_id_employee": query_manager.number_id_employee,
            "ccn_employee": query_operative[1].ccn_employee,
            "ccn_states_performance_evaluation": query_operative[
                1
            ].ccn_states_performance_evaluation,
            "type_employee": query_operative[1].type_employee,
            "engagement_or_productivity": query_operative[0].engagement_or_productivity,
            "communication_skills": query_operative[0].communication_skills,
            "adaptation_to_change": query_operative[0].adaptation_to_change,
            "learning_and_development": query_operative[0].learning_and_development,
            "organization": query_operative[0].organization,
            "continuous_improvement": query_operative[0].continuous_improvement,
            "active_participation": query_operative[0].active_participation,
            "relations": query_operative[0].relations,
            "puntuality": query_operative[0].puntuality,
            "overall_score": query_operative[0].overall_score,
            "level_value": query_operative[0].level_value,
            "employee_response": query_operative[0].employee_response,
            "first_action_plan": query_operative[0].first_action_plan,
            "first_action_plan_date": query_operative[0].first_action_plan_date,
            "first_period_of_execution": query_operative[0].first_period_of_execution,
            "second_action_plan": query_operative[0].second_action_plan,
            "second_action_plan_date": query_operative[0].second_action_plan_date,
            "second_period_of_execution": query_operative[0].second_period_of_execution,
            "third_action_plan": query_operative[0].third_action_plan,
            "third_action_plan_date": query_operative[0].third_action_plan_date,
            "third_period_of_execution": query_operative[0].third_period_of_execution,
            "immediate_boss_observation": query_operative[0].immediate_boss_observation,
            "manager_response": query_operative[0].manager_response,
            "manager_approval": query_operative[0].manager_approval,
            "states_performance_evaluation": query_operative[
                5
            ].states_performance_evaluation,
            "full_name_employee": query_operative[3].full_name_employee,
            "number_id_employee": query_operative[3].number_id_employee,
            "role": query_operative[4].role,
            "area": query_operative[4].area,
        }

    return make_response(jsonify({"PEDetail": list_pe_detail}), 200)


@blueprint_api_performance_evaluation.route(
    "/api/v1/performance_evaluation/manager/<int:manager>", methods=["GET"]
)
def get_performance_evaluation_manager(manager):
    query_all_performance_evaluation = PerformanceEvaluation.query.filter_by(
        manager=manager, ccn_states_performance_evaluation=4
    ).all()
    performance_evaluation_schema = PerformanceEvaluationSchema(many=True)
    performance_evaluation = performance_evaluation_schema.dump(
        query_all_performance_evaluation
    )

    return make_response(
        jsonify({"PerformanceEvaluation": performance_evaluation}), 200
    )


@blueprint_api_performance_evaluation.route(
    "/api/v1/performance_evaluation/<int:ccn_performance_evaluation>", methods=["GET"]
)
def get_performance_evaluation(ccn_performance_evaluation):
    query_all_performance_evaluation = PerformanceEvaluation.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()

    performance_evaluation_schema = PerformanceEvaluationSchema(many=False)
    performance_evaluation = performance_evaluation_schema.dump(
        query_all_performance_evaluation
    )
    from hhrr_app.models.tbl_roles import Role
    from hhrr_app.models.tbl_employee import Employee
    from hhrr_app.models.tbl_employment_relationship import EmploymentRelationship
    from hhrr_app.models.tbl_states_performance_evaluation import (
        StatesPerformanceEvaluation,
    )

    query_performance_evaluation = (
        db.session.query(PerformanceEvaluation, Role, Employee, EmploymentRelationship)
        .join(
            EmploymentRelationship,
            PerformanceEvaluation.ccn_employee == EmploymentRelationship.ccn_employee,
        )
        .join(
            Employee,
            EmploymentRelationship.ccn_employee == Employee.ccn_employee,
        )
        .join(Role, EmploymentRelationship.ccn_role == Role.ccn_role)
        .join(
            StatesPerformanceEvaluation,
            PerformanceEvaluation.ccn_states_performance_evaluation
            == StatesPerformanceEvaluation.ccn_states_performance_evaluation,
        )
        .filter(
            PerformanceEvaluation.ccn_performance_evaluation
            == ccn_performance_evaluation
        )
        .first()
    )

    list_performance_evaluation = [
        {
            "ccn_performance_evaluation": query_performance_evaluation[
                0
            ].ccn_performance_evaluation,
            "opening_date": query_performance_evaluation[0].opening_date,
            "entry_date": query_performance_evaluation[0].entry_date,
            "action_date": query_performance_evaluation[0].action_date,
            "immediate_boss_question_date": query_performance_evaluation[
                0
            ].immediate_boss_question_date,
            "employee_response_date": query_performance_evaluation[
                0
            ].employee_response_date,
            "action_plan_date": query_performance_evaluation[0].action_plan_date,
            "finish_date": query_performance_evaluation[0].finish_date,
            "immediate_boss": query_performance_evaluation[0].immediate_boss,
            "manager": query_performance_evaluation[0].manager,
            "ccn_employee": query_performance_evaluation[0].ccn_employee,
            "ccn_states_performance_evaluation": query_performance_evaluation[
                0
            ].ccn_states_performance_evaluation,
            "type_employee": query_performance_evaluation[0].type_employee,
            "full_name_employee": query_performance_evaluation[2].full_name_employee,
            "role": query_performance_evaluation[1].role,
            "area": query_performance_evaluation[1].area,
        }
    ]

    return make_response(
        jsonify({"PerformanceEvaluation": list_performance_evaluation}), 200
    )


@blueprint_api_performance_evaluation.route(
    "/api/v1/performance_evaluation/<int:ccn_performance_evaluation>", methods=["PUT"]
)
def put_performance_evaluation(ccn_performance_evaluation):
    data = request.get_json()
    query_performance_evaluation = PerformanceEvaluation.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()

    query_performance_evaluation.opening_date = data["opening_date"]
    query_performance_evaluation.ccn_employee = data["ccn_employee"]

    db.session.commit()
    performance_evaluation_schema = PerformanceEvaluationSchema(many=False)
    performance_evaluation_update = performance_evaluation_schema.dump(
        query_performance_evaluation
    )

    return make_response(
        jsonify({"PerformanceEvaluation": performance_evaluation_update}), 200
    )


@blueprint_api_performance_evaluation.route(
    "/api/v1/performance_evaluation/<int:ccn_performance_evaluation>",
    methods=["DELETE"],
)
def delete_performance_evaluation(ccn_performance_evaluation):
    query_delete_performance_evaluation = PerformanceEvaluation.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    db.session.delete(query_delete_performance_evaluation)
    db.session.commit()
    return make_response(
        jsonify(
            {
                "PerformanceEvaluation": "The performance evaluation has been deleted succesfully"
            }
        ),
        200,
    )


@jwt_required
@blueprint_api_performance_evaluation.route(
    "/perfomance-evaluation-2022", defaults={"path": ""}
)
@blueprint_api_performance_evaluation.route("//<path:path>")
def perfomance_evaluation_2022(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


@jwt_required
@blueprint_api_performance_evaluation.route(
    "/performance-evaluation-detail/<ccn_performance_evaluation>/<role>",
    defaults={"path": ""},
)
@blueprint_api_performance_evaluation.route("//<path:path>")
def perfomance_evaluation_2022_detail(path, ccn_performance_evaluation, role):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


@jwt_required
@blueprint_api_performance_evaluation.route(
    "/performance-evaluation-detail/<ccn_performance_evaluation>", defaults={"path": ""}
)
@blueprint_api_performance_evaluation.route("//<path:path>")
def perfomance_evaluation_especific_detail(path, ccn_performance_evaluation):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


"""
@blueprint_api_performance_evaluation.route(
    "/api/v1/performance_evaluation/metrics_for_dashboard/<ccn_employee_one>/<ccn_employee_two>/<ccn_employee_three>/<ccn_employee_four>/<ccn_employee_five>", methods=["GET"]
)
"""


@blueprint_api_performance_evaluation.route(
    "/api/v1/performance_evaluation/metrics_for_dashboard", methods=["GET"]
)
def metrics_for_dashboard():
    # Informacion especifica para el conteo de cuantas evaluaciones se han programado a la fecha
    query_all_global_PE = PerformanceEvaluation.query.all()
    total_data_by_state = {
        "DIRECTIVO": {
            "pending_for_inmediate_boss": 0,
            "pending_for_employee_answer": 0,
            "pending_for_action_plan": 0,
            "pending_for_manager_approbal": 0,
            "approbal_evaluation": 0,
            "failed_assessments": 0,
            "total_directive": 0,
        },
        "OPERATIVO": {
            "pending_for_inmediate_boss": 0,
            "pending_for_employee_answer": 0,
            "pending_for_action_plan": 0,
            "pending_for_manager_approbal": 0,
            "approbal_evaluation": 0,
            "failed_assessments": 0,
            "total_operative": 0,
        },
        "ADMINISTRATIVO": {
            "pending_for_inmediate_boss": 0,
            "pending_for_employee_answer": 0,
            "pending_for_action_plan": 0,
            "pending_for_manager_approbal": 0,
            "approbal_evaluation": 0,
            "failed_assessments": 0,
            "total_administrativo": 0,
        },
        "TOTAL": {
            "pending_for_inmediate_boss": 0,
            "pending_for_employee_answer": 0,
            "pending_for_action_plan": 0,
            "pending_for_manager_approbal": 0,
            "approbal_evaluation": 0,
            "failed_assessments": 0,
            "total": 0,
        },
    }
    for pe in query_all_global_PE:
        if pe.type_employee == "DIRECTIVO":
            if pe.ccn_states_performance_evaluation == 1:
                total_data_by_state["DIRECTIVO"]["pending_for_inmediate_boss"] = (
                    total_data_by_state["DIRECTIVO"]["pending_for_inmediate_boss"] + 1
                )
            elif pe.ccn_states_performance_evaluation == 2:
                total_data_by_state["DIRECTIVO"]["pending_for_employee_answer"] = (
                    total_data_by_state["DIRECTIVO"]["pending_for_employee_answer"] + 1
                )
            elif pe.ccn_states_performance_evaluation == 3:
                total_data_by_state["DIRECTIVO"]["pending_for_action_plan"] = (
                    total_data_by_state["DIRECTIVO"]["pending_for_action_plan"] + 1
                )
            elif pe.ccn_states_performance_evaluation == 4:
                total_data_by_state["DIRECTIVO"]["pending_for_manager_approbal"] = (
                    total_data_by_state["DIRECTIVO"]["pending_for_manager_approbal"] + 1
                )
            elif pe.ccn_states_performance_evaluation == 5:
                total_data_by_state["DIRECTIVO"]["approbal_evaluation"] = (
                    total_data_by_state["DIRECTIVO"]["approbal_evaluation"] + 1
                )
            elif pe.ccn_states_performance_evaluation == 6:
                total_data_by_state["DIRECTIVO"]["failed_assessments"] = (
                    total_data_by_state["DIRECTIVO"]["failed_assessments"] + 1
                )
            total_data_by_state["DIRECTIVO"]["total_directive"] = (
                total_data_by_state["DIRECTIVO"]["total_directive"] + 1
            )
        elif pe.type_employee == "OPERATIVO":
            if pe.ccn_states_performance_evaluation == 1:
                total_data_by_state["OPERATIVO"]["pending_for_inmediate_boss"] = (
                    total_data_by_state["OPERATIVO"]["pending_for_inmediate_boss"] + 1
                )
            elif pe.ccn_states_performance_evaluation == 2:
                total_data_by_state["OPERATIVO"]["pending_for_employee_answer"] = (
                    total_data_by_state["OPERATIVO"]["pending_for_employee_answer"] + 1
                )
            elif pe.ccn_states_performance_evaluation == 3:
                total_data_by_state["OPERATIVO"]["pending_for_action_plan"] = (
                    total_data_by_state["OPERATIVO"]["pending_for_action_plan"] + 1
                )
            elif pe.ccn_states_performance_evaluation == 4:
                total_data_by_state["OPERATIVO"]["pending_for_manager_approbal"] = (
                    total_data_by_state["OPERATIVO"]["pending_for_manager_approbal"] + 1
                )
            elif pe.ccn_states_performance_evaluation == 5:
                total_data_by_state["OPERATIVO"]["approbal_evaluation"] = (
                    total_data_by_state["OPERATIVO"]["approbal_evaluation"] + 1
                )
            elif pe.ccn_states_performance_evaluation == 6:
                total_data_by_state["OPERATIVO"]["failed_assessments"] = (
                    total_data_by_state["OPERATIVO"]["failed_assessments"] + 1
                )
            total_data_by_state["OPERATIVO"]["total_operative"] = (
                total_data_by_state["OPERATIVO"]["total_operative"] + 1
            )
        elif pe.type_employee == "ADMINISTRATIVO":
            if pe.ccn_states_performance_evaluation == 1:
                total_data_by_state["ADMINISTRATIVO"]["pending_for_inmediate_boss"] = (
                    total_data_by_state["ADMINISTRATIVO"]["pending_for_inmediate_boss"]
                    + 1
                )
            elif pe.ccn_states_performance_evaluation == 2:
                total_data_by_state["ADMINISTRATIVO"]["pending_for_employee_answer"] = (
                    total_data_by_state["ADMINISTRATIVO"]["pending_for_employee_answer"]
                    + 1
                )
            elif pe.ccn_states_performance_evaluation == 3:
                total_data_by_state["ADMINISTRATIVO"]["pending_for_action_plan"] = (
                    total_data_by_state["ADMINISTRATIVO"]["pending_for_action_plan"] + 1
                )
            elif pe.ccn_states_performance_evaluation == 4:
                total_data_by_state["ADMINISTRATIVO"][
                    "pending_for_manager_approbal"
                ] = (
                    total_data_by_state["ADMINISTRATIVO"][
                        "pending_for_manager_approbal"
                    ]
                    + 1
                )
            elif pe.ccn_states_performance_evaluation == 5:
                total_data_by_state["ADMINISTRATIVO"]["approbal_evaluation"] = (
                    total_data_by_state["ADMINISTRATIVO"]["approbal_evaluation"] + 1
                )
            elif pe.ccn_states_performance_evaluation == 6:
                total_data_by_state["ADMINISTRATIVO"]["failed_assessments"] = (
                    total_data_by_state["ADMINISTRATIVO"]["failed_assessments"] + 1
                )
            total_data_by_state["ADMINISTRATIVO"]["total_administrativo"] = (
                total_data_by_state["ADMINISTRATIVO"]["total_administrativo"] + 1
            )

    total_data_by_state["TOTAL"]["pending_for_inmediate_boss"] = (
        total_data_by_state["ADMINISTRATIVO"]["pending_for_inmediate_boss"]
        + total_data_by_state["DIRECTIVO"]["pending_for_inmediate_boss"]
        + total_data_by_state["OPERATIVO"]["pending_for_inmediate_boss"]
    )
    total_data_by_state["TOTAL"]["pending_for_employee_answer"] = (
        total_data_by_state["ADMINISTRATIVO"]["pending_for_employee_answer"]
        + total_data_by_state["DIRECTIVO"]["pending_for_employee_answer"]
        + total_data_by_state["OPERATIVO"]["pending_for_employee_answer"]
    )
    total_data_by_state["TOTAL"]["pending_for_action_plan"] = (
        total_data_by_state["ADMINISTRATIVO"]["pending_for_action_plan"]
        + total_data_by_state["DIRECTIVO"]["pending_for_action_plan"]
        + total_data_by_state["OPERATIVO"]["pending_for_action_plan"]
    )
    total_data_by_state["TOTAL"]["pending_for_manager_approbal"] = (
        total_data_by_state["ADMINISTRATIVO"]["pending_for_manager_approbal"]
        + total_data_by_state["DIRECTIVO"]["pending_for_manager_approbal"]
        + total_data_by_state["OPERATIVO"]["pending_for_manager_approbal"]
    )
    total_data_by_state["TOTAL"]["approbal_evaluation"] = (
        total_data_by_state["ADMINISTRATIVO"]["approbal_evaluation"]
        + total_data_by_state["DIRECTIVO"]["approbal_evaluation"]
        + total_data_by_state["OPERATIVO"]["approbal_evaluation"]
    )
    total_data_by_state["TOTAL"]["failed_assessments"] = (
        total_data_by_state["ADMINISTRATIVO"]["failed_assessments"]
        + total_data_by_state["DIRECTIVO"]["failed_assessments"]
        + total_data_by_state["OPERATIVO"]["failed_assessments"]
    )
    total_data_by_state["TOTAL"]["total"] = (
        total_data_by_state["ADMINISTRATIVO"]["total_administrativo"]
        + total_data_by_state["DIRECTIVO"]["total_directive"]
        + total_data_by_state["OPERATIVO"]["total_operative"]
    )

    # Información que alimenta a la grafica que tiene el total y compara por el tipo de empleado dependiendo del cargo (OPERATIVO,ADMINISTRATIVO,DIRECTIVO)
    query_directive_pe = DirectivePE.query.all()
    query_operative_pe = OperativePE.query.all()
    query_administrative_pe = AdministrativePE.query.all()

    list_all_results_operative = []
    list_all_results_directive = []
    list_all_results_administrative = []

    for directive_pe in query_directive_pe:
        list_all_results_directive.append(
            {
                "ccn_performance_evaluation": directive_pe.ccn_performance_evaluation,
                "ccn_employee": directive_pe.PerformanceEvaluation.ccn_employee,
                "full_name_employee": directive_pe.PerformanceEvaluation.Employee.Employee.full_name_employee,
                "level_value": directive_pe.level_value,
            }
        )

    for operative_pe in query_operative_pe:
        list_all_results_operative.append(
            {
                "ccn_performance_evaluation": operative_pe.ccn_performance_evaluation,
                "ccn_employee": operative_pe.PerformanceEvaluation.ccn_employee,
                "full_name_employee": operative_pe.PerformanceEvaluation.Employee.Employee.full_name_employee,
                "level_value": operative_pe.level_value,
            }
        )

    for administrative_pe in query_administrative_pe:
        list_all_results_administrative.append(
            {
                "ccn_performance_evaluation": administrative_pe.PerformanceEvaluation.ccn_performance_evaluation,
                "ccn_employee": administrative_pe.PerformanceEvaluation.ccn_employee,
                "full_name_employee": administrative_pe.PerformanceEvaluation.Employee.Employee.full_name_employee,
                "level_value": administrative_pe.level_value,
            }
        )

    fourth_graphic = {
        "list_all_results_directive": list_all_results_directive,
        "list_all_results_administrative": list_all_results_administrative,
        "list_all_results_operative": list_all_results_operative,
    }

    # Informacion que alimenta las graficas de torta y la comparacion de las tres evaluaciones
    level_value_data = {
        "admin_total_points": {
            "count_ad_0_25": 0,
            "count_ad_26_50": 0,
            "count_ad_51_80": 0,
            "count_ad_81_99": 0,
            "count_ad_100": 0,
        },
        "directive_total_points": {
            "count_ad_0_25": 0,
            "count_ad_26_50": 0,
            "count_ad_51_80": 0,
            "count_ad_81_99": 0,
            "count_ad_100": 0,
        },
        "operative_total_points": {
            "count_ad_0_25": 0,
            "count_ad_26_50": 0,
            "count_ad_51_80": 0,
            "count_ad_81_99": 0,
            "count_ad_100": 0,
        },
    }

    for admin_avg_pe in query_administrative_pe:
        if admin_avg_pe.level_value:
            admin_avg = float(admin_avg_pe.level_value)
            if admin_avg >= 0 and admin_avg <= 25:
                level_value_data["admin_total_points"]["count_ad_0_25"] = (
                    level_value_data["admin_total_points"]["count_ad_0_25"] + 1
                )
            elif admin_avg > 25 and admin_avg <= 50:
                level_value_data["admin_total_points"]["count_ad_26_50"] = (
                    level_value_data["admin_total_points"]["count_ad_26_50"] + 1
                )
            elif admin_avg > 51 and admin_avg <= 80:
                level_value_data["admin_total_points"]["count_ad_51_80"] = (
                    level_value_data["admin_total_points"]["count_ad_51_80"] + 1
                )
            elif admin_avg > 81 and admin_avg <= 99:
                level_value_data["admin_total_points"]["count_ad_81_99"] = (
                    level_value_data["admin_total_points"]["count_ad_81_99"] + 1
                )
            elif admin_avg == 100:
                level_value_data["admin_total_points"]["count_ad_100"] = (
                    level_value_data["admin_total_points"]["count_ad_100"] + 1
                )

    for operative_avg_pe in query_operative_pe:
        if operative_avg_pe.level_value:
            operative_avg = float(operative_avg_pe.level_value)
            if operative_avg >= 0 and operative_avg <= 25:
                level_value_data["operative_total_points"]["count_ad_0_25"] = (
                    level_value_data["operative_total_points"]["count_ad_0_25"] + 1
                )
            elif operative_avg > 25 and operative_avg <= 50:
                level_value_data["operative_total_points"]["count_ad_26_50"] = (
                    level_value_data["operative_total_points"]["count_ad_26_50"] + 1
                )
            elif operative_avg > 51 and operative_avg <= 80:
                level_value_data["operative_total_points"]["count_ad_51_80"] = (
                    level_value_data["operative_total_points"]["count_ad_51_80"] + 1
                )
            elif operative_avg > 81 and operative_avg <= 99:
                level_value_data["operative_total_points"]["count_ad_81_99"] = (
                    level_value_data["operative_total_points"]["count_ad_81_99"] + 1
                )
            elif operative_avg == 100:
                level_value_data["operative_total_points"]["count_ad_100"] = (
                    level_value_data["operative_total_points"]["count_ad_100"] + 1
                )
    for directive_avg_pe in query_directive_pe:
        if directive_avg_pe.level_value:
            directive_avg = float(directive_avg_pe.level_value)
            if directive_avg >= 0 and directive_avg <= 25:
                level_value_data["directive_total_points"]["count_ad_0_25"] = (
                    level_value_data["directive_total_points"]["count_ad_0_25"] + 1
                )
            elif directive_avg > 25 and directive_avg <= 50:
                level_value_data["directive_total_points"]["count_ad_26_50"] = (
                    level_value_data["directive_total_points"]["count_ad_26_50"] + 1
                )
            elif directive_avg > 51 and directive_avg <= 80:
                level_value_data["directive_total_points"]["count_ad_51_80"] = (
                    level_value_data["directive_total_points"]["count_ad_51_80"] + 1
                )
            elif directive_avg > 81 and directive_avg <= 99:
                level_value_data["directive_total_points"]["count_ad_81_99"] = (
                    level_value_data["directive_total_points"]["count_ad_81_99"] + 1
                )
            elif directive_avg == 100:
                level_value_data["directive_total_points"]["count_ad_100"] = (
                    level_value_data["directive_total_points"]["count_ad_100"] + 1
                )

    # Informacion que valida los items en especifico por cada evaluacion

    administrative_engagement_or_productivity = []
    administrative_communication_skills = []
    administrative_adaptation_to_change = []
    administrative_customer_orientation = []
    administrative_innovation = []
    administrative_professional_rigor = []
    administrative_problem_resolution = []
    administrative_leadership = []
    administrative_organization = []

    for avg_administrative in query_administrative_pe:
        if avg_administrative.level_value:
            administrative_engagement_or_productivity.append(
                int(avg_administrative.engagement_or_productivity)
            )
            administrative_communication_skills.append(
                int(avg_administrative.communication_skills)
            )
            administrative_adaptation_to_change.append(
                int(avg_administrative.adaptation_to_change)
            )
            administrative_customer_orientation.append(
                int(avg_administrative.customer_orientation)
            )
            administrative_innovation.append(int(avg_administrative.innovation))
            administrative_professional_rigor.append(
                int(avg_administrative.professional_rigor)
            )
            administrative_problem_resolution.append(
                int(avg_administrative.problem_resolution)
            )
            administrative_leadership.append(int(avg_administrative.leadership))
            administrative_organization.append(int(avg_administrative.organization))

    directive_engagement_or_productivity = []
    directive_communication_skills = []
    directive_adaptation_to_change = []
    directive_customer_orientation = []
    directive_innovation = []
    directive_professional_rigor = []
    directive_problem_resolution = []
    directive_leadership = []
    directive_organization = []

    for avg_directive in query_directive_pe:
        if avg_directive.level_value:
            directive_engagement_or_productivity.append(
                int(avg_directive.engagement_or_productivity)
            )
            directive_communication_skills.append(
                int(avg_directive.communication_skills)
            )
            directive_adaptation_to_change.append(
                int(avg_directive.adaptation_to_change)
            )
            directive_customer_orientation.append(
                int(avg_directive.customer_orientation)
            )
            directive_innovation.append(int(avg_directive.innovation))
            directive_professional_rigor.append(int(avg_directive.professional_rigor))
            directive_problem_resolution.append(int(avg_directive.problem_resolution))
            directive_leadership.append(int(avg_directive.leadership))
            directive_organization.append(int(avg_directive.organization))

    operative_engagement_or_productivity = []
    operative_communication_skills = []
    operative_adaptation_to_change = []
    operative_learning_and_development = []
    operative_organization = []
    operative_continuous_improvement = []
    operative_active_participation = []
    operative_relations = []
    operative_puntuality = []

    for avg_operative in query_operative_pe:
        if avg_operative.level_value:
            operative_engagement_or_productivity.append(
                int(avg_operative.engagement_or_productivity)
            )
            operative_communication_skills.append(
                int(avg_operative.communication_skills)
            )
            operative_adaptation_to_change.append(
                int(avg_operative.adaptation_to_change)
            )
            operative_learning_and_development.append(
                int(avg_operative.learning_and_development)
            )
            operative_organization.append(int(avg_operative.organization))
            operative_continuous_improvement.append(
                int(avg_operative.continuous_improvement)
            )
            operative_active_participation.append(
                int(avg_operative.active_participation)
            )
            operative_relations.append(int(avg_operative.relations))
            operative_puntuality.append(int(avg_operative.puntuality))

    """
    avg_engagement_or_productivity_ad_pe = db.session.query(
        sqlalchemy.func.avg(AdministrativePE.engagement_or_productivity)
    ).scalar()

    avg_engagement_or_productivity_di_pe = db.session.query(
        sqlalchemy.func.avg(DirectivePE.engagement_or_productivity)
    ).scalar()

    avg_engagement_or_productivity_op_pe = db.session.query(
        sqlalchemy.func.avg(OperativePE.engagement_or_productivity)
    ).scalar()
    """
    average_for_skills = {
        "administrative_average_skill": {
            "avg_engagement_or_productivity_ad_pe": sum(
                administrative_engagement_or_productivity
            )
            / len(administrative_engagement_or_productivity)
            if len(administrative_engagement_or_productivity) != 0
            else 0,
            "avg_communication_skills_ad_pe": sum(administrative_communication_skills)
            / len(administrative_communication_skills)
            if len(administrative_communication_skills) != 0
            else 0,
            "avg_adaptation_to_change_ad_pe": sum(administrative_adaptation_to_change)
            / len(administrative_adaptation_to_change)
            if len(administrative_adaptation_to_change) != 0
            else 0,
            "avg_customer_orientation_ad_pe": sum(administrative_customer_orientation)
            / len(administrative_customer_orientation)
            if len(administrative_customer_orientation) != 0
            else 0,
            "avg_innovation_ad_pe": sum(administrative_innovation)
            / len(administrative_innovation)
            if len(administrative_innovation) != 0
            else 0,
            "avg_professional_rigor_ad_pe": sum(administrative_professional_rigor)
            / len(administrative_professional_rigor)
            if len(administrative_professional_rigor) != 0
            else 0,
            "avg_problem_resolution_ad_pe": sum(administrative_problem_resolution)
            / len(administrative_problem_resolution)
            if len(administrative_problem_resolution) != 0
            else 0,
            "avg_leadership_ad_pe": sum(administrative_leadership)
            / len(administrative_leadership)
            if len(administrative_leadership) != 0
            else 0,
            "avg_organization_ad_pe": sum(administrative_organization)
            / len(administrative_organization)
            if len(administrative_organization) != 0
            else 0,
        },
        "directive_average_skill": {
            "avg_engagement_or_productivity_di_pe": sum(
                directive_engagement_or_productivity
            )
            / len(directive_engagement_or_productivity)
            if len(directive_engagement_or_productivity) != 0
            else 0,
            "avg_communication_skills_di_pe": sum(directive_communication_skills)
            / len(directive_communication_skills)
            if len(directive_communication_skills) != 0
            else 0,
            "avg_adaptation_to_change_di_pe": sum(directive_adaptation_to_change)
            / len(directive_adaptation_to_change)
            if len(directive_adaptation_to_change) != 0
            else 0,
            "avg_customer_orientation_di_pe": sum(directive_customer_orientation)
            / len(directive_customer_orientation)
            if len(directive_customer_orientation) != 0
            else 0,
            "avg_innovation_di_pe": sum(directive_innovation)
            / len(directive_innovation)
            if len(directive_innovation) != 0
            else 0,
            "avg_professional_rigor_di_pe": sum(directive_professional_rigor)
            / len(directive_professional_rigor)
            if len(directive_professional_rigor) != 0
            else 0,
            "avg_problem_resolution_di_pe": sum(directive_problem_resolution)
            / len(directive_problem_resolution)
            if len(directive_problem_resolution) != 0
            else 0,
            "avg_leadership_di_pe": sum(directive_leadership)
            / len(directive_leadership)
            if len(directive_leadership) != 0
            else 0,
            "avg_organization_di_pe": sum(directive_organization)
            / len(directive_organization)
            if len(directive_organization) != 0
            else 0,
        },
        "operative_average_skill": {
            "avg_engagement_or_productivity_op_pe": sum(
                operative_engagement_or_productivity
            )
            / len(operative_engagement_or_productivity)
            if len(operative_engagement_or_productivity) != 0
            else 0,
            "avg_communication_skills_op_pe": sum(operative_communication_skills)
            / len(operative_communication_skills)
            if len(operative_communication_skills) != 0
            else 0,
            "avg_adaptation_to_change_op_pe": sum(operative_adaptation_to_change)
            / len(operative_adaptation_to_change)
            if len(operative_adaptation_to_change) != 0
            else 0,
            "avg_learning_and_development_op_pe": sum(
                operative_learning_and_development
            )
            / len(operative_learning_and_development)
            if len(operative_learning_and_development) != 0
            else 0,
            "avg_organization_op_pe": sum(operative_organization)
            / len(operative_organization)
            if len(operative_organization) != 0
            else 0,
            "avg_continuous_improvement_op_pe": sum(operative_continuous_improvement)
            / len(operative_continuous_improvement)
            if len(operative_continuous_improvement) != 0
            else 0,
            "avg_active_participation_op_pe": sum(operative_active_participation)
            / len(operative_active_participation)
            if len(operative_active_participation) != 0
            else 0,
            "avg_relations_op_pe": sum(operative_relations) / len(operative_relations)
            if len(operative_relations) != 0
            else 0,
            "avg_puntuality_op_pe": sum(operative_puntuality)
            / len(operative_puntuality)
            if len(operative_puntuality) != 0
            else 0,
        },
    }

    administrative_results_for_employee = []
    directive_results_for_employee = []
    operative_results_for_employee = []

    for administrative_result in query_administrative_pe:
        if (
            administrative_result.PerformanceEvaluation.ccn_states_performance_evaluation
            >= 2
        ):
            administrative_results_for_employee.append(
                {
                    "full_name_employee": administrative_result.PerformanceEvaluation.Employee.Employee.full_name_employee,
                    "level_value": administrative_result.level_value,
                }
            )

    for operative_result in query_operative_pe:
        if (
            operative_result.PerformanceEvaluation.ccn_states_performance_evaluation
            >= 2
        ):
            operative_results_for_employee.append(
                {
                    "full_name_employee": operative_result.PerformanceEvaluation.Employee.Employee.full_name_employee,
                    "level_value": operative_result.level_value,
                }
            )

    for directive_result in query_directive_pe:
        if (
            directive_result.PerformanceEvaluation.ccn_states_performance_evaluation
            >= 2
        ):
            directive_results_for_employee.append(
                {
                    "full_name_employee": directive_result.PerformanceEvaluation.Employee.Employee.full_name_employee,
                    "level_value": directive_result.level_value,
                }
            )

    metrics_for_dashboard = {
        "total_by_states": total_data_by_state,
        "average_for_skills": average_for_skills,
        "fourth_graphic": fourth_graphic,
        "level_value_data": level_value_data,
    }

    return make_response(jsonify({"Metrics": metrics_for_dashboard}), 200)
