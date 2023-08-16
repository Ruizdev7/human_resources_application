import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_employee import Employee
from hhrr_app.models.tbl_relationship import Relationship
from hhrr_app.models.tbl_emergency_contact_details import EmergencyContactDetails

from hhrr_app.schema.emergency_contact_details_schema import (
    EmergencyContactDetailsSchema,
)


blueprint_api_emergency_contact_details = Blueprint(
    "api_emergency_contact_details", __name__, url_prefix=""
)


@blueprint_api_emergency_contact_details.route(
    "/api/v1/emergency_contact_details", methods=["POST"]
)
def post_emergency_contact_details():
    data = request.get_json()
    new_emergency_contact_details = EmergencyContactDetails(
        ccn_employee=data["ccn_employee"],
        emergency_contact=data["emergency_contact"].upper(),
        ccn_relationship=data["ccn_relationship"],
        cellphone=data["cellphone"],
    )

    db.session.add(new_emergency_contact_details)
    db.session.commit()
    emergency_contact_details_schema = EmergencyContactDetailsSchema(many=False)
    emergency_contact_details = emergency_contact_details_schema.dump(
        new_emergency_contact_details
    )

    return make_response(
        jsonify({"Emergency Contact Details": emergency_contact_details}), 201
    )


@blueprint_api_emergency_contact_details.route(
    "/api/v1/emergency_contact_details", methods=["GET"]
)
def get_all_emergency_contact_details():
    list_emergency_contact_details = []
    query_all_emergency_contact_details = EmergencyContactDetails.query.all()

    for emergency_contact_details in query_all_emergency_contact_details:
        list_emergency_contact_details.append(
            {
                "ccn_emergency_contact_details": emergency_contact_details.ccn_emergency_contact_details,
                "ccn_employee": emergency_contact_details.ccn_employee,
                "emergency_contact": emergency_contact_details.emergency_contact,
                "ccn_relationship": emergency_contact_details.ccn_relationship,
                "cellphone": emergency_contact_details.cellphone,
                "full_name_employee": emergency_contact_details.Employee.full_name_employee,
                "relationship": emergency_contact_details.Relationship.relationship,
            }
        )

    return make_response(
        jsonify({"EmergencyContactDetails": list_emergency_contact_details}), 200
    )


@blueprint_api_emergency_contact_details.route(
    "/api/v1/emergency_contact_details/<int:ccn_emergency_contact_details>",
    methods=["GET"],
)
def get_emergency_contact_details(ccn_emergency_contact_details):
    query_emergency_contact_details = EmergencyContactDetails.query.filter_by(
        ccn_emergency_contact_details=ccn_emergency_contact_details
    ).first()
    emergency_contact_details_schema = EmergencyContactDetailsSchema(many=False)
    emergency_contact_details = emergency_contact_details_schema.dump(
        query_emergency_contact_details
    )
    return make_response(
        jsonify({"EmergencyContactDetails": emergency_contact_details}), 200
    )


@blueprint_api_emergency_contact_details.route(
    "/api/v1/emergency_contact_details/employee/<int:ccn_employee>", methods=["GET"]
)
def get_emergency_contact_details_employee(ccn_employee):
    query_emergency_contact_details = EmergencyContactDetails.query.filter_by(
        ccn_employee=ccn_employee
    ).first()
    emergency_contact_details_schema = EmergencyContactDetailsSchema(many=False)
    emergency_contact_details = emergency_contact_details_schema.dump(
        query_emergency_contact_details
    )
    return make_response(
        jsonify({"EmergencyContactDetails": emergency_contact_details}), 200
    )


@blueprint_api_emergency_contact_details.route(
    "/api/v1/emergency_contact_details/<int:ccn_emergency_contact_details>",
    methods=["PUT"],
)
def put_emergency_contact_details(ccn_emergency_contact_details):
    data = request.get_json()
    query_emergency_contact_details = EmergencyContactDetails.query.filter_by(
        ccn_emergency_contact_details=ccn_emergency_contact_details
    ).first()
    query_emergency_contact_details.ccn_employee = data["ccn_employee"]
    query_emergency_contact_details.emergency_contact = data[
        "emergency_contact"
    ].upper()
    query_emergency_contact_details.ccn_relationship = data["ccn_relationship"]
    query_emergency_contact_details.cellphone = data["cellphone"]

    db.session.commit()
    emergency_contact_details_schema = EmergencyContactDetailsSchema(many=False)
    emergency_contact_details_update = emergency_contact_details_schema.dump(
        query_emergency_contact_details
    )

    return make_response(
        jsonify(
            {"Emergency Contact Details Updated": emergency_contact_details_update}
        ),
        200,
    )


@blueprint_api_emergency_contact_details.route(
    "/api/v1/emergency_contact_details/<int:ccn_emergency_contact_details>",
    methods=["DELETE"],
)
def delete_emergency_contact_details(ccn_emergency_contact_details):
    query_delete_emergency_contact_details = EmergencyContactDetails.query.filter_by(
        ccn_emergency_contact_details=ccn_emergency_contact_details
    ).first()
    db.session.delete(query_delete_emergency_contact_details)
    db.session.commit()
    return make_response(
        jsonify(
            {
                "Emergency Contact Details Deleted": "The emergency contact details has been deleted succesfully"
            }
        ),
        200,
    )


@jwt_required
@blueprint_api_emergency_contact_details.route(
    "/emergency-contact-details", defaults={"path": ""}
)
@blueprint_api_emergency_contact_details.route("//<path:path>")
def emergency_contact_details(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
