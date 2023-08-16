import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_eps import EPS
from hhrr_app.models.tbl_arl import ARL
from hhrr_app.models.tbl_aap import AAP
from hhrr_app.models.tbl_afp import AFP
from hhrr_app.models.tbl_ccf import CCF
from hhrr_app.models.tbl_employee import Employee
from hhrr_app.models.tbl_ss_employee import SSEmployee
from hhrr_app.schema.ss_employee_schema import SSEmployeeSchema
from hhrr_app.models.tbl_type_contributor import TypeContributor
from hhrr_app.models.tbl_type_affiliation import TypeAffiliation


blueprint_api_ss_employee = Blueprint("api_ss_employee", __name__, url_prefix="")


@blueprint_api_ss_employee.route("/api/v1/ss_employee", methods=["POST"])
def post_ss_employee():
    data = request.get_json()

    new_social_security = SSEmployee(
        ccn_employee=data["ccn_employee"],
        ccn_type_affiliation=data["ccn_type_affiliation"],
        ccn_type_contributor=data["ccn_type_contributor"],
        ccn_eps=data["ccn_eps"],
        ccn_afp=data["ccn_afp"],
        ccn_arl=data["ccn_arl"],
        ccn_ccf=data["ccn_ccf"],
        ccn_aap=data["ccn_aap"],
    )
    db.session.add(new_social_security)
    db.session.commit()
    ss_employee_schema = SSEmployeeSchema(many=False)
    ss_employee = ss_employee_schema.dump(new_social_security)

    return make_response(jsonify({"SS Employee": ss_employee}), 201)


@blueprint_api_ss_employee.route("/api/v1/ss_employee", methods=["GET"])
def get_all_ss_employee():
    query_ss_employee = SSEmployee.query.all()
    list_ss_employee = []

    for ss_employee in query_ss_employee:
        list_ss_employee.append(
            {
                "ccn_ss_employee": ss_employee.ccn_ss_employee,
                "ccn_employee": ss_employee.ccn_employee,
                "ccn_type_affiliation": ss_employee.ccn_type_affiliation,
                "ccn_type_contributor": ss_employee.ccn_type_contributor,
                "ccn_eps": ss_employee.ccn_eps,
                "ccn_afp": ss_employee.ccn_afp,
                "ccn_arl": ss_employee.ccn_arl,
                "ccn_ccf": ss_employee.ccn_ccf,
                "ccn_aap": ss_employee.ccn_aap,
                "full_name_employee": ss_employee.Employee.full_name_employee,
                "type_affiliation": ss_employee.TypeAffiliation.description_type_affiliation,
                "type_contributor": ss_employee.TypeContributor.description_type_contributor,
                "eps": ss_employee.EPS.description_eps,
                "afp": ss_employee.AFP.description_afp,
                "arl": ss_employee.ARL.description_arl,
                "ccf": ss_employee.CCF.description_ccf,
                "aap": ss_employee.AAP.description_aap,
            }
        )

    return make_response(jsonify({"SSEmployee": list_ss_employee}), 200)


@blueprint_api_ss_employee.route(
    "/api/v1/ss_employee/<int:ccn_ss_employee>", methods=["GET"]
)
def get_ss_employee(ccn_ss_employee):
    query_ss_employee = SSEmployee.query.filter_by(
        ccn_ss_employee=ccn_ss_employee
    ).first()
    ss_employee_schema = SSEmployeeSchema(many=False)
    ss_employee = ss_employee_schema.dump(query_ss_employee)
    return make_response(jsonify({"SSEmployee": ss_employee}), 200)


@blueprint_api_ss_employee.route(
    "/api/v1/ss_employee/employee/<int:ccn_employee>", methods=["GET"]
)
def get_ss_for_employee(ccn_employee):
    query_ss_employee = SSEmployee.query.filter_by(ccn_employee=ccn_employee).first()
    ss_employee_schema = SSEmployeeSchema(many=False)
    ss_employee = ss_employee_schema.dump(query_ss_employee)
    return make_response(jsonify({"SSEmployee": ss_employee}), 200)


@blueprint_api_ss_employee.route(
    "/api/v1/ss_employee/<int:ccn_ss_employee>", methods=["PUT"]
)
def put_ss_employee(ccn_ss_employee):
    data = request.get_json()
    query_ss_employee = SSEmployee.query.filter_by(
        ccn_ss_employee=ccn_ss_employee
    ).first()
    query_ss_employee.ccn_employee = data["ccn_employee"]
    query_ss_employee.ccn_type_affiliation = data["ccn_type_affiliation"]
    query_ss_employee.ccn_type_contributor = data["ccn_type_contributor"]
    query_ss_employee.ccn_eps = data["ccn_eps"]
    query_ss_employee.ccn_afp = data["ccn_afp"]
    query_ss_employee.ccn_arl = data["ccn_arl"]
    query_ss_employee.ccn_ccf = data["ccn_ccf"]
    query_ss_employee.ccn_aap = data["ccn_aap"]

    db.session.commit()
    ss_employee_schema = SSEmployeeSchema(many=False)
    ss_employee_update = ss_employee_schema.dump(query_ss_employee)

    return make_response(jsonify({"SS Employee Updated": ss_employee_update}), 200)


@blueprint_api_ss_employee.route(
    "/api/v1/ss_employee/<int:ccn_ss_employee>", methods=["DELETE"]
)
def delete_ss_employee(ccn_ss_employee):
    query_delete_ss_employee = SSEmployee.query.filter_by(
        ccn_ss_employee=ccn_ss_employee
    ).first()
    db.session.delete(query_delete_ss_employee)
    db.session.commit()
    return make_response(
        jsonify(
            {"SS Employee Deleted": "The ss employee has been deleted succesfully"}
        ),
        200,
    )


@jwt_required
@blueprint_api_ss_employee.route("/social-security", defaults={"path": ""})
@blueprint_api_ss_employee.route("//<path:path>")
def social_security(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
