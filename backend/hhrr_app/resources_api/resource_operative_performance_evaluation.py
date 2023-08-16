import os
import datetime
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_performance_evaluation import PerformanceEvaluation
from hhrr_app.models.tbl_operative_performance_evaluation import OperativePE
from hhrr_app.schema.operative_performance_evaluation_schema import OperativePESchema


blueprint_api_operative_performance_evaluation = Blueprint(
    "api_operative_performance_evaluation", __name__, url_prefix=""
)


@blueprint_api_operative_performance_evaluation.route(
    "/api/v1/operative_performance_evaluation", methods=["POST"]
)
def post_operative_performance_evaluation():
    data = request.get_json()
    new_operative_performance_evaluation = OperativePE(
        ccn_performance_evaluation=data["ccn_performance_evaluation"],
        ccn_employee=data["ccn_employee"],
    )

    db.session.add(new_operative_performance_evaluation)
    db.session.commit()
    operative_performance_evaluation_schema = OperativePE(many=False)
    operative_performance_evaluation = operative_performance_evaluation_schema.dump(
        new_operative_performance_evaluation
    )

    return make_response(
        jsonify({"OperativePE": operative_performance_evaluation}), 201
    )


@blueprint_api_operative_performance_evaluation.route(
    "/api/v1/operative_performance_evaluation", methods=["GET"]
)
def get_all_operative_performance_evaluation():
    query_all_operative_performance_evaluation = OperativePE.query.all()
    operative_performance_evaluation_schema = OperativePESchema(many=True)
    operative_performance_evaluation = operative_performance_evaluation_schema.dump(
        query_all_operative_performance_evaluation
    )
    return make_response(
        jsonify({"OperativePE": operative_performance_evaluation}), 200
    )


@blueprint_api_operative_performance_evaluation.route(
    "/api/v1/operative_performance_evaluation/<int:ccn_operative_performance_evaluation>",
    methods=["GET"],
)
def get_operative_performance_evaluation(ccn_operative_performance_evaluation):
    query_all_operative_performance_evaluation = OperativePE.query.filter_by(
        ccn_operative_performance_evaluation=ccn_operative_performance_evaluation
    ).first()
    operative_performance_evaluation_schema = OperativePESchema(many=False)
    operative_performance_evaluation = operative_performance_evaluation_schema.dump(
        query_all_operative_performance_evaluation
    )

    return make_response(
        jsonify({"OperativePE": operative_performance_evaluation}), 200
    )


@blueprint_api_operative_performance_evaluation.route(
    "/api/v1/operative_performance_evaluation_detail/<int:ccn_performance_evaluation>",
    methods=["GET"],
)
def get_operative_performance_evaluation_detail(ccn_performance_evaluation):
    query_all_operative_performance_evaluation = OperativePE.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    operative_performance_evaluation_schema = OperativePESchema(many=False)
    operative_performance_evaluation = operative_performance_evaluation_schema.dump(
        query_all_operative_performance_evaluation
    )

    return make_response(
        jsonify({"OperativePE": operative_performance_evaluation}), 200
    )


@blueprint_api_operative_performance_evaluation.route(
    "/api/v1/operative_performance_evaluation/<int:ccn_operative_performance_evaluation>",
    methods=["PUT"],
)
def put_operative_performance_evaluation(ccn_operative_performance_evaluation):
    data = request.get_json()
    query_operative_performance_evaluation = OperativePE.query.filter_by(
        ccn_operative_performance_evaluation=ccn_operative_performance_evaluation
    ).first()

    query_operative_performance_evaluation.ccn_performance_evaluation = data[
        "ccn_performance_evaluation"
    ]
    query_operative_performance_evaluation.ccn_employee = data["ccn_employee"]

    db.session.commit()
    operative_performance_evaluation_schema = OperativePESchema(many=False)
    operative_performance_evaluation_update = (
        operative_performance_evaluation_schema.dump(
            query_operative_performance_evaluation
        )
    )

    return make_response(
        jsonify({"OperativePE": operative_performance_evaluation_update}), 200
    )


@blueprint_api_operative_performance_evaluation.route(
    "/api/v1/first_section_ope/<int:ccn_performance_evaluation>", methods=["PUT"]
)
def put_first_section_ope(ccn_performance_evaluation):
    data = request.get_json()
    query_operative_performance_evaluation = OperativePE.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()

    query_operative_performance_evaluation.engagement_or_productivity = data[
        "engagement_or_productivity"
    ]
    query_operative_performance_evaluation.communication_skills = data[
        "communication_skills"
    ]
    query_operative_performance_evaluation.adaptation_to_change = data[
        "adaptation_to_change"
    ]
    query_operative_performance_evaluation.learning_and_development = data[
        "learning_and_development"
    ]
    query_operative_performance_evaluation.organization = data["organization"]
    query_operative_performance_evaluation.continuous_improvement = data[
        "continuous_improvement"
    ]
    query_operative_performance_evaluation.active_participation = data[
        "active_participation"
    ]
    query_operative_performance_evaluation.relations = data["relations"]
    query_operative_performance_evaluation.puntuality = data["puntuality"]
    query_operative_performance_evaluation.overall_score = data["overall_score"]
    query_operative_performance_evaluation.level_value = data["level_value"]

    db.session.commit()

    query_performance_evaluation = PerformanceEvaluation.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    query_performance_evaluation.ccn_states_performance_evaluation = 2
    query_performance_evaluation.immediate_boss_question_date = datetime.datetime.now()
    db.session.commit()

    operative_performance_evaluation_schema = OperativePESchema(many=False)
    operative_performance_evaluation_update = (
        operative_performance_evaluation_schema.dump(
            query_operative_performance_evaluation
        )
    )

    return make_response(
        jsonify({"OperativePE": operative_performance_evaluation_update}), 200
    )


@blueprint_api_operative_performance_evaluation.route(
    "/api/v1/second_section_ope/<int:ccn_performance_evaluation>", methods=["PUT"]
)
def put_second_section_ope(ccn_performance_evaluation):
    data = request.get_json()

    query_operative_performance_evaluation = OperativePE.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    query_operative_performance_evaluation.employee_response = data["employee_response"]

    db.session.commit()

    query_performance_evaluation = PerformanceEvaluation.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    query_performance_evaluation.ccn_states_performance_evaluation = 3
    query_performance_evaluation.employee_response_date = datetime.datetime.now()

    db.session.commit()

    operative_performance_evaluation_schema = OperativePESchema(many=False)
    operative_performance_evaluation_update = (
        operative_performance_evaluation_schema.dump(
            query_operative_performance_evaluation
        )
    )

    return make_response(
        jsonify({"OperativePE": operative_performance_evaluation_update}), 200
    )


@blueprint_api_operative_performance_evaluation.route(
    "/api/v1/third_section_ope/<int:ccn_performance_evaluation>", methods=["PUT"]
)
def put_third_section_ope(ccn_performance_evaluation):
    data = request.get_json()

    query_operative_performance_evaluation = OperativePE.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    query_operative_performance_evaluation.first_action_plan = data["first_accion_plan"]
    query_operative_performance_evaluation.first_action_plan_date = data[
        "first_accion_plan_date"
    ]
    query_operative_performance_evaluation.second_action_plan = data[
        "second_accion_plan"
    ]
    query_operative_performance_evaluation.second_action_plan_date = data[
        "second_accion_plan_date"
    ]
    query_operative_performance_evaluation.third_action_plan = data["third_accion_plan"]
    query_operative_performance_evaluation.third_action_plan_date = data[
        "third_accion_plan_date"
    ]
    query_operative_performance_evaluation.immediate_boss_observation = data[
        "immediate_boss_observation"
    ]

    db.session.commit()

    query_performance_evaluation = PerformanceEvaluation.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    query_performance_evaluation.ccn_states_performance_evaluation = 4
    query_performance_evaluation.action_plan_date = datetime.datetime.now()

    db.session.commit()

    operative_performance_evaluation_schema = OperativePESchema(many=False)
    operative_performance_evaluation_update = (
        operative_performance_evaluation_schema.dump(
            query_operative_performance_evaluation
        )
    )

    return make_response(
        jsonify({"OperativePE": operative_performance_evaluation_update}), 200
    )


@blueprint_api_operative_performance_evaluation.route(
    "/api/v1/four_section_ope/<int:ccn_performance_evaluation>", methods=["PUT"]
)
def put_four_section_ope(ccn_performance_evaluation):
    data = request.get_json()

    query_operative_performance_evaluation = OperativePE.query.filter_by(
        ccn_performance_evaluation=ccn_performance_evaluation
    ).first()
    query_operative_performance_evaluation.manager_response = data["manager_response"]
    query_operative_performance_evaluation.manager_approval = data["manager_approval"]

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

    operative_performance_evaluation_schema = OperativePESchema(many=False)
    operative_performance_evaluation_update = (
        operative_performance_evaluation_schema.dump(
            query_operative_performance_evaluation
        )
    )

    return make_response(
        jsonify({"OperativePE": operative_performance_evaluation_update}), 200
    )


@blueprint_api_operative_performance_evaluation.route(
    "/api/v1/operative_performance_evaluation/<int:ccn_operative_performance_evaluation>",
    methods=["DELETE"],
)
def delete_operative_performance_evaluation(ccn_operative_performance_evaluation):
    query_delete_operative_performance_evaluation = OperativePE.query.filter_by(
        ccn_operative_performance_evaluation=ccn_operative_performance_evaluation
    ).first()
    db.session.delete(query_delete_operative_performance_evaluation)
    db.session.commit()
    return make_response(
        jsonify(
            {
                "OperativePE": "The operative performance evaluation has been deleted succesfully"
            }
        ),
        200,
    )


@jwt_required
@blueprint_api_operative_performance_evaluation.route(
    "/performance-evaluation-detail-op", defaults={"path": ""}
)
@blueprint_api_operative_performance_evaluation.route("//<path:path>")
def performance_evaluation_detail_op(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
