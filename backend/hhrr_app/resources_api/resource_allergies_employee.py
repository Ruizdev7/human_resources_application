import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required


from hhrr_app import db
from backend.hhrr_app.models.tbl_allergies_employee import AllergiesEmployee
from backend.hhrr_app.schema.allergies_employee_schema import AllergiesEmployeeSchema


blueprint_api_allergies_employee = Blueprint("api_allergies_employee", __name__, url_prefix="")


@blueprint_api_allergies_employee.route("/api/v1/allergies_employee", methods=["POST"])
def post_allergies_employee():
    data = request.get_json()
    new_allergies_employee = AllergiesEmployee(
        ccn_employee=data["ccn_employee"],
        ccn_allergies_employee=data["ccn_allergies_employee"],
        allergies_employee=data["allergies_employee"].upper()
    )

    db.session.add(new_allergies_employee)
    db.session.commit()
    allergies_employee_schema = AllergiesEmployeeSchema(many=False)
    allergies_employee = allergies_employee_schema.dump(new_allergies_employee)

    return make_response(jsonify({"Allergies Employee": allergies_employee}), 201)


@blueprint_api_allergies_employee.route("/api/v1/allergies_employee", methods=["GET"])
def get_all_allergies_employee():
    query_all_allergies_employee = AllergiesEmployee.query.all()
    allergies_employee_schema = AllergiesEmployeeSchema(many=True)
    allergies_employee = allergies_employee_schema.dump(query_all_allergies_employee)
    return make_response(jsonify({"AllergiesEmployee": allergies_employee}), 200)

@blueprint_api_allergies_employee.route("/api/v1/allergies_employee/<int:ccn_allergies_employee>", methods=["GET"])
def get_allergies_employee(ccn_allergies_employee):
    query_allergies_employee = AllergiesEmployee.query.filter_by(ccn_allergies_employee=ccn_allergies_employee).first()
    allergies_employee_schema = AllergiesEmployeeSchema(many=False)
    allergies_employee = allergies_employee_schema.dump(query_allergies_employee)
    return make_response(jsonify({"AllergiesEmployee": allergies_employee}), 200)


@blueprint_api_allergies_employee.route("/api/v1/allergies_employee/<int:ccn_allergies_employee>", methods=["PUT"])
def put_allergies_employee(ccn_allergies_employee):
    data = request.get_json()
    try:
        query_allergies_employee = AllergiesEmployee.query.filter_by(ccn_allergies_employee=ccn_allergies_employee).first()
        query_allergies_employee.ccn_allergies_employee = data["ccn_allergies_employee"]
        query_allergies_employee.allergies_employee = data["AllergiesEmployee"].upper()
        query_allergies_employee.ccn_employee = data["ccn_employee"]
        db.session.commit()
        allergies_employee_schema = AllergiesEmployeeSchema(many=False)
        allergies_employee_update = allergies_employee_schema.dump(query_allergies_employee)
        return make_response(jsonify({"Employee's Allergies Updated": allergies_employee_update}), 200)
    except: 
        return make_response(jsonify({"System couldn't update the employee's allergies, contact the IT department"}), 200)

@blueprint_api_allergies_employee.route("/api/v1/allergies_employee/<int:ccn_allergies_employee>", methods=["DELETE"])
def delete_allergies_employee(ccn_allergies_employee):
    query_delete_allergies_employee = AllergiesEmployee.query.filter_by(ccn_allergies_employee=ccn_allergies_employee).first()
    db.session.delete(query_delete_allergies_employee)
    #db.session.commit()
    return make_response(
        jsonify({"Allergies Employee Deleted": "The employee's allegries has been deleted succesfully"}), 200
    )
