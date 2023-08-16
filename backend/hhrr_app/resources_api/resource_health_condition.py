import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_diseases import Diseases
from hhrr_app.models.tbl_employee import Employee
from hhrr_app.models.tbl_health_condition import HealthCondition

from hhrr_app.schema.health_condition_schema import HealthConditionSchema


blueprint_api_health_condition = Blueprint(
    "api_health_condition", __name__, url_prefix=""
)


@blueprint_api_health_condition.route("/api/v1/health_condition", methods=["POST"])
def post_health_condition():
    data = request.get_json()
    new_health_condition = HealthCondition(
        ccn_employee=data["ccn_employee"],
        consume_alcoholic_beverages=data["consume_alcoholic_beverages"],
        diseases=data["ccn_diseases"],
        allergies=data["allergies"],
        what_allergy=data["what_allergy"].upper(),
        medicines=data["medicines"],
        what_medicin=data["what_medicin"].upper(),
        last_medical_consultation=data["last_medical_consultation"],
        plan_to_drink_less_alcoholic_beverages=data[
            "plan_to_drink_less_alcoholic_beverages"
        ],
        discomfort_due_to_criticism_when_ingesting_alcohol=data[
            "discomfort_due_to_criticism_when_ingesting_alcohol"
        ],
        need_to_drink_alcohol_in_the_morning=data[
            "need_to_drink_alcohol_in_the_morning"
        ],
        physical_activity_3_times_a_week_30_minutes=data[
            "physical_activity_3_times_a_week_30_minutes"
        ],
        he_is_a_smoker=data["he_is_a_smoker"],
        how_many_cigarettes_a_day=data["how_many_cigarettes_a_day"],
        he_is_ex_smoker=data["he_is_ex_smoker"],
        consume_psychoactive_substances=data["consume_psychoactive_substances"],
        used_psychoactive_substances_before=data["used_psychoactive_substances_before"],
        what_psychoactive_substances=data["what_psychoactive_substances"].upper(),
    )

    db.session.add(new_health_condition)
    db.session.commit()
    health_condition_schema = HealthConditionSchema(many=False)
    health_condition = health_condition_schema.dump(new_health_condition)

    return make_response(jsonify({"Health Condition": health_condition}), 201)


@blueprint_api_health_condition.route("/api/v1/health_condition", methods=["GET"])
def get_all_health_condition():
    list_health_condition = []
    query_all_health_condition = HealthCondition.query.all()

    for health_condition in query_all_health_condition:
        list_health_condition.append(
            {
                "ccn_health_condition": health_condition.ccn_health_condition,
                "ccn_employee": health_condition.ccn_employee,
                "consume_alcoholic_beverages": health_condition.consume_alcoholic_beverages,
                "ccn_diseases": health_condition.ccn_diseases,
                "allergies": health_condition.allergies,
                "what_allergy": health_condition.what_allergy,
                "medicines": health_condition.medicines,
                "what_medicin": health_condition.what_medicin,
                "last_medical_consultation": health_condition.last_medical_consultation,
                "plan_to_drink_less_alcoholic_beverages": health_condition.plan_to_drink_less_alcoholic_beverages,
                "discomfort_due_to_criticism_when_ingesting_alcohol": health_condition.discomfort_due_to_criticism_when_ingesting_alcohol,
                "need_to_drink_alcohol_in_the_morning": health_condition.need_to_drink_alcohol_in_the_morning,
                "physical_activity_3_times_a_week_30_minutes": health_condition.physical_activity_3_times_a_week_30_minutes,
                "he_is_a_smoker": health_condition.he_is_a_smoker,
                "how_many_cigarettes_a_day": health_condition.how_many_cigarettes_a_day,
                "he_is_ex_smoker": health_condition.he_is_ex_smoker,
                "consume_psychoactive_substances": health_condition.consume_psychoactive_substances,
                "used_psychoactive_substances_before": health_condition.used_psychoactive_substances_before,
                "what_psychoactive_substances": health_condition.what_psychoactive_substances,
                "full_name_employee": health_condition.Employee.full_name_employee,
                "diseases": health_condition.Diseases.diseases,
            }
        )

    return make_response(jsonify({"HealthCondition": list_health_condition}), 200)


@blueprint_api_health_condition.route(
    "/api/v1/health_condition/<int:ccn_health_condition>", methods=["GET"]
)
def get_health_condition(ccn_health_condition):
    query_health_condition = HealthCondition.query.filter_by(
        ccn_health_condition=ccn_health_condition
    ).first()
    health_condition_schema = HealthConditionSchema(many=False)
    health_condition = health_condition_schema.dump(query_health_condition)
    return make_response(jsonify({"HealthCondition": health_condition}), 200)


@blueprint_api_health_condition.route(
    "/api/v1/health_condition/employee/<int:ccn_employee>", methods=["GET"]
)
def get_health_condition_employee(ccn_employee):
    query_health_condition = HealthCondition.query.filter_by(
        ccn_employee=ccn_employee
    ).first()
    health_condition_schema = HealthConditionSchema(many=False)
    health_condition = health_condition_schema.dump(query_health_condition)
    return make_response(jsonify({"HealthCondition": health_condition}), 200)


@blueprint_api_health_condition.route(
    "/api/v1/health_condition/<int:ccn_health_condition>", methods=["PUT"]
)
def put_health_condition(ccn_health_condition):
    data = request.get_json()
    query_health_condition = HealthCondition.query.filter_by(
        ccn_health_condition=ccn_health_condition
    ).first()
    query_health_condition.ccn_employee = data["ccn_employee"]
    query_health_condition.consume_alcoholic_beverages = data[
        "consume_alcoholic_beverages"
    ]
    query_health_condition.ccn_diseases = data["ccn_diseases"]
    query_health_condition.allergies = data["allergies"]
    query_health_condition.what_allergy = data["what_allergy"].upper()
    query_health_condition.medicines = data["medicines"]
    query_health_condition.what_medicin = data["what_medicin"].upper()
    query_health_condition.last_medical_consultation = data["last_medical_consultation"]
    query_health_condition.plan_to_drink_less_alcoholic_beverages = data[
        "plan_to_drink_less_alcoholic_beverages"
    ]
    query_health_condition.discomfort_due_to_criticism_when_ingesting_alcohol = data[
        "discomfort_due_to_criticism_when_ingesting_alcohol"
    ]
    query_health_condition.need_to_drink_alcohol_in_the_morning = data[
        "need_to_drink_alcohol_in_the_morning"
    ]
    query_health_condition.physical_activity_3_times_a_week_30_minutes = data[
        "physical_activity_3_times_a_week_30_minutes"
    ]
    query_health_condition.he_is_a_smoker = data["he_is_a_smoker"]
    query_health_condition.how_many_cigarettes_a_day = data["how_many_cigarettes_a_day"]
    query_health_condition.he_is_ex_smoker = data["he_is_ex_smoker"]
    query_health_condition.consume_psychoactive_substances = data[
        "consume_psychoactive_substances"
    ]
    query_health_condition.used_psychoactive_substances_before = data[
        "used_psychoactive_substances_before"
    ]
    query_health_condition.what_psychoactive_substances = data[
        "what_psychoactive_substances"
    ].upper()

    db.session.commit()
    health_condition_schema = HealthConditionSchema(many=False)
    health_condition_update = health_condition_schema.dump(query_health_condition)

    return make_response(
        jsonify({"Health Condition Updated": health_condition_update}), 200
    )


@blueprint_api_health_condition.route(
    "/api/v1/health_condition/<int:ccn_health_condition>", methods=["DELETE"]
)
def delete_health_condition(ccn_health_condition):
    query_delete_health_condition = HealthCondition.query.filter_by(
        ccn_health_condition=ccn_health_condition
    ).first()
    db.session.delete(query_delete_health_condition)
    db.session.commit()
    return make_response(
        jsonify(
            {
                "Health Condition Deleted": "The health condition has been deleted succesfully"
            }
        ),
        200,
    )


@jwt_required
@blueprint_api_health_condition.route("/health-condition", defaults={"path": ""})
@blueprint_api_health_condition.route("//<path:path>")
def health_condition(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
