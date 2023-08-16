import os
import datetime
from flask import jsonify
from flask import request
from flask import Blueprint
from flask import make_response
from hhrr_app import create_app
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_employment_relationship import EmploymentRelationship

from hhrr_app.schema.employment_relationship_schema import EmploymentRelationshipSchema


blueprint_api_employment_relationship = Blueprint(
    "api_employment_relationship", __name__, url_prefix=""
)


@blueprint_api_employment_relationship.route(
    "/api/v1/employment_relationship", methods=["POST"]
)
def post_employee_relationship():
    data = request.get_json()
    new_employee_relationship = EmploymentRelationship(
        ccn_employee=data["ccn_employee"],
        ccn_role=data["ccn_role"],
        ccn_work_shift=data["ccn_work_shift"],
        binding_date=data["binding_date"],
        time_worked=data["time_worked"],
        ccn_type_relationship=data["ccn_type_relationship"],
        employee_corporate_email=data["employee_corporate_email"],
        employee_corporate_cellphone=data["employee_corporate_cellphone"],
        immediate_boss=data["immediate_boss"],
        manager=data["manager"],
        type_of_charge=data["type_of_charge"],
        is_active_employee=1,
    )

    db.session.add(new_employee_relationship)
    db.session.commit()
    employee_relationship_schema = EmploymentRelationshipSchema(many=False)
    employee_relationship = employee_relationship_schema.dump(new_employee_relationship)

    return make_response(jsonify({"Employee Relationship": employee_relationship}), 201)


@blueprint_api_employment_relationship.route(
    "/api/v1/employment_relationship", methods=["GET"]
)
def get_all_employment_relationship():
    list_all_data = []
    query_all_employment_relationship = EmploymentRelationship.query.all()

    for employee_relation_ship in query_all_employment_relationship:
        list_all_data.append(
            {
                "ccn_employment_relationship": employee_relation_ship.ccn_employment_relationship,
                "ccn_employee": employee_relation_ship.ccn_employee,
                "ccn_role": employee_relation_ship.ccn_role,
                "ccn_work_shift": employee_relation_ship.ccn_work_shift,
                "binding_date": employee_relation_ship.binding_date,
                "termination_date": employee_relation_ship.termination_date,
                "time_worked": employee_relation_ship.time_worked,
                "ccn_type_relationship": employee_relation_ship.ccn_type_relationship,
                "employee_corporate_email": employee_relation_ship.employee_corporate_email,
                "employee_corporate_cellphone": employee_relation_ship.employee_corporate_cellphone,
                "immediate_boss": employee_relation_ship.ImmediateBoss.full_name_employee,
                "manager": employee_relation_ship.Manager.full_name_employee,
                "type_of_charge": employee_relation_ship.type_of_charge,
                "is_active_employee": employee_relation_ship.is_active_employee,
                "full_name_employee": employee_relation_ship.Employee.full_name_employee,
                "role": employee_relation_ship.Role.role,
                "area": employee_relation_ship.Role.area,
                "process": employee_relation_ship.Role.process,
                "work_shift": employee_relation_ship.WorkShift.description_work_shift,
                "type_relationship": employee_relation_ship.TypeRelationship.description_type_relationship,
            }
        )
    return make_response(
        jsonify({"EmployeeRelationship": list_all_data}),
        200,
    )


@blueprint_api_employment_relationship.route(
    "/api/v1/employment_relationship/<int:ccn_employment_relationship>", methods=["GET"]
)
def get_employment_relationship(ccn_employment_relationship):
    query_employment_relationship = EmploymentRelationship.query.filter_by(
        ccn_employment_relationship=ccn_employment_relationship
    ).first()
    employment_relationship_schema = EmploymentRelationshipSchema(many=False)
    employment_relationship = employment_relationship_schema.dump(
        query_employment_relationship
    )

    return make_response(
        jsonify({"EmployeeRelationship": employment_relationship}), 200
    )


@blueprint_api_employment_relationship.route(
    "/api/v1/employment_relationship/employee/<int:ccn_employee>", methods=["GET"]
)
def get_employement_relationship_employee(ccn_employee):
    query_employment_relationship = EmploymentRelationship.query.filter_by(
        ccn_employee=ccn_employee
    ).first()
    if query_employment_relationship is not None:
        from dateutil import relativedelta
        from datetime import date

        current_day = relativedelta.relativedelta(
            date.today(), query_employment_relationship.binding_date
        )

        query_employment_relationship.time_worked = f"{current_day.years} AÑOS, {current_day.months} MESES Y {current_day.days} DIAS, TOTAL EN DIAS = {(date.today()-query_employment_relationship.binding_date).days} "

        pending_days_to_enjoy_for_holidays = (
            query_employment_relationship.pending_days_to_enjoy_for_holidays
            if query_employment_relationship.pending_days_to_enjoy_for_holidays
            is not None
            else 0
        )

        query_employment_relationship.pending_days_to_enjoy_for_holidays = (
            date.today() - query_employment_relationship.binding_date
        ).days * 0.0410958904109589 - pending_days_to_enjoy_for_holidays

        db.session.commit()
    employment_relationship_schema = EmploymentRelationshipSchema(many=False)
    employment_relationship = employment_relationship_schema.dump(
        query_employment_relationship
    )
    employment_relationship["area"] = query_employment_relationship.Role.area
    employment_relationship["role"] = query_employment_relationship.Role.role
    employment_relationship["process"] = query_employment_relationship.Role.process

    return make_response(
        jsonify({"EmployeeRelationship": employment_relationship}), 200
    )


@blueprint_api_employment_relationship.route(
    "/api/v1/employment_relationship/<int:ccn_employment_relationship>", methods=["PUT"]
)
def put_employment_relationship(ccn_employment_relationship):
    data = request.get_json()
    query_employment_relationship = EmploymentRelationship.query.filter_by(
        ccn_employment_relationship=ccn_employment_relationship
    ).first()
    query_employment_relationship.ccn_employee = data["ccn_employee"]
    query_employment_relationship.ccn_role = data["ccn_role"]
    query_employment_relationship.ccn_work_shift = data["ccn_work_shift"]
    query_employment_relationship.binding_date = data["binding_date"]
    query_employment_relationship.time_worked = data["time_worked"]
    query_employment_relationship.ccn_type_relationship = data["ccn_type_relationship"]
    query_employment_relationship.employee_corporate_email = data[
        "employee_corporate_email"
    ].upper()
    query_employment_relationship.employee_corporate_cellphone = data[
        "employee_corporate_cellphone"
    ]
    query_employment_relationship.immediate_boss = data["immediate_boss"]
    query_employment_relationship.manager = data["manager"]
    query_employment_relationship.type_of_charge = data["type_of_charge"]
    if data["termination_date"]:
        query_employment_relationship.termination_date = data["termination_date"]
    if data["pending_days_to_enjoy_for_holidays"]:
        query_employment_relationship.pending_days_to_enjoy_for_holidays = data[
            "pending_days_to_enjoy_for_holidays"
        ]

    db.session.commit()
    employment_relationship_schema = EmploymentRelationshipSchema(many=False)
    employment_relationship_update = employment_relationship_schema.dump(
        query_employment_relationship
    )

    return make_response(
        jsonify({"Employee Relationship Updated": employment_relationship_update}), 200
    )


@blueprint_api_employment_relationship.route(
    "/api/v1/employment_relationship/end_contract/<int:ccn_employment_relationship>",
    methods=["PUT"],
)
def put_end_contract(ccn_employment_relationship):
    data = request.get_json()
    query_employment_relationship = EmploymentRelationship.query.filter_by(
        ccn_employment_relationship=ccn_employment_relationship
    ).first()
    query_employment_relationship.termination_date = datetime.datetime.now()
    query_employment_relationship.is_active_employee = data["is_active_employee"]

    db.session.commit()
    employment_relationship_schema = EmploymentRelationshipSchema()
    employment_relationship_update = employment_relationship_schema.dump(
        query_employment_relationship
    )

    return make_response(
        jsonify({"Employee Relationship Updated": employment_relationship_update}), 200
    )


@blueprint_api_employment_relationship.route(
    "/api/v1/employment_relationship/<int:ccn_employment_relationship>",
    methods=["DELETE"],
)
def delete_employment_relationship(ccn_employment_relationship):
    query_delete_employment_relationship = EmploymentRelationship.query.filter_by(
        ccn_employment_relationship=ccn_employment_relationship
    ).first()
    db.session.delete(query_delete_employment_relationship)
    db.session.commit()
    return make_response(
        jsonify(
            {
                "Employee Relationship Deleted": "The employee relationship has been deleted succesfully"
            }
        ),
        200,
    )


@jwt_required
@blueprint_api_employment_relationship.route(
    "/employment-relationship", defaults={"path": ""}
)
@blueprint_api_employment_relationship.route("//<path:path>")
def employment_relationship(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
