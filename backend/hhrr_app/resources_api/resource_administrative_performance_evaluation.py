import datetime
from flask import jsonify
from flask import request
from flask import Blueprint
from flask import make_response
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_performance_evaluation import PerformanceEvaluation
from hhrr_app.models.tbl_administrative_performance_evaluation import AdministrativePE
from hhrr_app.schema.administrative_performance_evaluation_schema import (
    AdministrativePESchema,
)


blueprint_api_administrative_performance_evaluation = Blueprint(
    "api_administrative_performance_evaluation", __name__, url_prefix=""
)


@blueprint_api_administrative_performance_evaluation.route(
    "/api/v1/administrative_performance_evaluation", methods=["POST"]
)
def post_administrative_performance_evaluation():
    data = request.get_json()
    new_administrative_performance_evaluation = AdministrativePE(
        ccn_performance_evaluation=data["ccn_performance_evaluation"],
        ccn_employee=data["ccn_employee"],
    )

    db.session.add(new_administrative_performance_evaluation)
    db.session.commit()
    administrative_performance_evaluation_schema = AdministrativePESchema(many=False)
    performance_evaluation = administrative_performance_evaluation_schema.dump(
        new_administrative_performance_evaluation
    )

    return make_response(jsonify({"AdministrativePE": performance_evaluation}), 201)


@blueprint_api_administrative_performance_evaluation.route(
    "/api/v1/administrative_performance_evaluation", methods=["GET"]
)
def get_all_administrative_performance_evaluation():
    query_all_administrative_performance_evaluation = AdministrativePE.query.all()
    administrative_performance_evaluation_schema = AdministrativePESchema(many=True)
    administrative_performance_evaluation = (
        administrative_performance_evaluation_schema.dump(
            query_all_administrative_performance_evaluation
        )
    )
    return make_response(
        jsonify({"AdministrativePE": administrative_performance_evaluation}), 200
    )


@blueprint_api_administrative_performance_evaluation.route(
    "/api/v1/administrative_performance_evaluation/<int:ccn_administrative_performance_evaluation>",
    methods=["GET"],
)
def get_administrative_performance_evaluation(
    ccn_administrative_performance_evaluation,
):
    query_all_administrative_performance_evaluation = AdministrativePE.query.filter_by(
        ccn_administrative_performance_evaluation=ccn_administrative_performance_evaluation
    ).first()
    administrative_performance_evaluation_schema = AdministrativePESchema(many=False)
    administrative_performance_evaluation = (
        administrative_performance_evaluation_schema.dump(
            query_all_administrative_performance_evaluation
        )
    )

    return make_response(
        jsonify({"AdministrativePE": administrative_performance_evaluation}), 200
    )


@blueprint_api_administrative_performance_evaluation.route(
    "/api/v1/administrative_performance_evaluation_detail/<int:ccn_performance_evaluation>",
    methods=["GET"],
)
def get_administrative_performance_evaluation_detail(ccn_performance_evaluation):
    query_all_administrative_performance_evaluation = AdministrativePE.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    administrative_performance_evaluation_schema = AdministrativePESchema(many=False)
    administrative_performance_evaluation = (
        administrative_performance_evaluation_schema.dump(
            query_all_administrative_performance_evaluation
        )
    )

    return make_response(
        jsonify({"AdministrativePE": administrative_performance_evaluation}), 200
    )


@blueprint_api_administrative_performance_evaluation.route(
    "/api/v1/administrative_performance_evaluation/<int:ccn_administrative_performance_evaluation>",
    methods=["PUT"],
)
def put_administrative_performance_evaluation(
    ccn_administrative_performance_evaluation,
):
    data = request.get_json()
    query_administrative_performance_evaluation = AdministrativePE.query.filter_by(
        ccn_administrative_performance_evaluation=ccn_administrative_performance_evaluation
    ).first()

    query_administrative_performance_evaluation.ccn_performance_evaluation = data[
        "ccn_performance_evaluation"
    ]
    query_administrative_performance_evaluation.ccn_employee = data["ccn_employee"]

    db.session.commit()
    administrative_performance_evaluation_schema = AdministrativePESchema(many=False)
    administrative_performance_evaluation_update = (
        administrative_performance_evaluation_schema.dump(
            query_administrative_performance_evaluation
        )
    )

    return make_response(
        jsonify({"AdministrativePE": administrative_performance_evaluation_update}), 200
    )


@blueprint_api_administrative_performance_evaluation.route(
    "/api/v1/first_section_ape/<int:ccn_performance_evaluation>", methods=["PUT"]
)
def put_first_section_ape(ccn_performance_evaluation):
    data = request.get_json()

    query_administrative_performance_evaluation = AdministrativePE.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    query_administrative_performance_evaluation.engagement_or_productivity = data[
        "engagement_or_productivity"
    ]
    query_administrative_performance_evaluation.communication_skills = data[
        "communication_skills"
    ]
    query_administrative_performance_evaluation.adaptation_to_change = data[
        "adaptation_to_change"
    ]
    query_administrative_performance_evaluation.customer_orientation = data[
        "customer_orientation"
    ]
    query_administrative_performance_evaluation.innovation = data["innovation"]
    query_administrative_performance_evaluation.professional_rigor = data[
        "professional_rigor"
    ]
    query_administrative_performance_evaluation.problem_resolution = data[
        "problem_resolution"
    ]
    query_administrative_performance_evaluation.leadership = data["leadership"]
    query_administrative_performance_evaluation.organization = data["organization"]
    query_administrative_performance_evaluation.overall_score = data["overall_score"]
    query_administrative_performance_evaluation.level_value = data["level_value"]

    db.session.commit()

    query_performance_evaluation = PerformanceEvaluation.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    query_performance_evaluation.ccn_states_performance_evaluation = 2
    query_performance_evaluation.immediate_boss_question_date = datetime.datetime.now()

    db.session.commit()

    administrative_performance_evaluation_schema = AdministrativePESchema(many=False)
    administrative_performance_evaluation_update = (
        administrative_performance_evaluation_schema.dump(
            query_administrative_performance_evaluation
        )
    )
    return make_response(
        jsonify({"AdministrativePE": administrative_performance_evaluation_update}), 200
    )


@blueprint_api_administrative_performance_evaluation.route(
    "/api/v1/second_section_ape/<int:ccn_performance_evaluation>", methods=["PUT"]
)
def put_second_section_ape(ccn_performance_evaluation):
    data = request.get_json()
    query_administrative_performance_evaluation = AdministrativePE.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    query_administrative_performance_evaluation.employee_response = data[
        "employee_response"
    ]

    db.session.commit()

    query_performance_evaluation = PerformanceEvaluation.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    query_performance_evaluation.ccn_states_performance_evaluation = 3
    query_performance_evaluation.employee_response_date = datetime.datetime.now()

    db.session.commit()

    administrative_performance_evaluation_schema = AdministrativePESchema(many=False)
    administrative_performance_evaluation_update = (
        administrative_performance_evaluation_schema.dump(
            query_administrative_performance_evaluation
        )
    )
    return make_response(
        jsonify({"AdministrativePE": administrative_performance_evaluation_update}), 200
    )


@blueprint_api_administrative_performance_evaluation.route(
    "/api/v1/third_section_ape/<int:ccn_performance_evaluation>", methods=["PUT"]
)
def put_third_section_ape(ccn_performance_evaluation):
    data = request.get_json()

    query_administrative_performance_evaluation = AdministrativePE.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    query_administrative_performance_evaluation.first_action_plan = data[
        "first_accion_plan"
    ]
    query_administrative_performance_evaluation.first_action_plan_date = data[
        "first_accion_plan_date"
    ]
    query_administrative_performance_evaluation.second_action_plan = data[
        "second_accion_plan"
    ]
    query_administrative_performance_evaluation.second_action_plan_date = data[
        "second_accion_plan_date"
    ]
    query_administrative_performance_evaluation.third_action_plan = data[
        "third_accion_plan"
    ]
    query_administrative_performance_evaluation.third_action_plan_date = data[
        "third_accion_plan_date"
    ]
    query_administrative_performance_evaluation.immediate_boss_observation = data[
        "immediate_boss_observation"
    ]

    db.session.commit()

    query_performance_evaluation = PerformanceEvaluation.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    query_performance_evaluation.ccn_states_performance_evaluation = 4
    query_performance_evaluation.action_plan_date = datetime.datetime.now()

    db.session.commit()

    administrative_performance_evaluation_schema = AdministrativePESchema(many=False)
    administrative_performance_evaluation_update = (
        administrative_performance_evaluation_schema.dump(
            query_administrative_performance_evaluation
        )
    )
    return make_response(
        jsonify({"AdministrativePE": administrative_performance_evaluation_update}), 200
    )


@blueprint_api_administrative_performance_evaluation.route(
    "/api/v1/four_section_ape/<int:ccn_performance_evaluation>", methods=["PUT"]
)
def put_four_section_ape(ccn_performance_evaluation):
    data = request.get_json()
    query_administrative_performance_evaluation = AdministrativePE.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    query_administrative_performance_evaluation.manager_response = data[
        "manager_response"
    ]
    query_administrative_performance_evaluation.manager_approval = data[
        "manager_approval"
    ]

    db.session.commit()

    query_performance_evaluation = PerformanceEvaluation.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    if data["manager_approval"]:
        query_performance_evaluation.ccn_states_performance_evaluation = 5
    else:
        query_performance_evaluation.ccn_states_performance_evaluation = 6
    query_performance_evaluation.finish_date = datetime.datetime.now()

    db.session.commit()

    administrative_performance_evaluation_schema = AdministrativePESchema(many=False)
    administrative_performance_evaluation_update = (
        administrative_performance_evaluation_schema.dump(
            query_administrative_performance_evaluation
        )
    )
    return make_response(
        jsonify({"AdministrativePE": administrative_performance_evaluation_update}), 200
    )


@blueprint_api_administrative_performance_evaluation.route(
    "/api/v1/administrative_performance_evaluation/<int:ccn_administrative_performance_evaluation>",
    methods=["DELETE"],
)
def delete_administrative_performance_evaluation(
    ccn_administrative_performance_evaluation,
):
    query_delete_administrative_performance_evaluation = AdministrativePE.query.filter_by(
        ccn_administrative_performance_evaluation=ccn_administrative_performance_evaluation
    ).first()
    db.session.delete(query_delete_administrative_performance_evaluation)
    db.session.commit()
    return make_response(
        jsonify(
            {
                "AdministrativePE": "The administrative performance evaluation has been deleted succesfully"
            }
        ),
        200,
    )
