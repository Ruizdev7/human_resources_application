import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required


from hhrr_app import db
from hhrr_app.models.tbl_psychoactive_substances_employee import PsychoactiveSubstancesEmployee
from hhrr_app.schema.psychoactive_substances_employee_schema import PsychoactiveSubstancesEmployeeSchema


blueprint_api_psychoactive_substances_employee = Blueprint("api_psychoactive_substances_employee", __name__, url_prefix="")


@blueprint_api_psychoactive_substances_employee.route("/api/v1/psychoactive_substances_employee", methods=["POST"])
def post_psychoactive_substances_employee():
    data = request.get_json()
    new_psychoactive_substances_employee = PsychoactiveSubstancesEmployee(
        ccn_employee=data["ccn_employee"],
        ccn_psychoactive_substances_employee=data["ccn_psychoactive_substances_employee"],
        psychoactive_substances_employee=data["psychoactive_substances_employee"].upper()
    )

    db.session.add(new_psychoactive_substances_employee)
    db.session.commit()
    psychoactive_substances_employee_schema = PsychoactiveSubstancesEmployeeSchema(many=False)
    psychoactive_substances_employee = psychoactive_substances_employee_schema.dump(new_psychoactive_substances_employee)

    return make_response(jsonify({"Psychoactive Substances Employee": psychoactive_substances_employee}), 201)


@blueprint_api_psychoactive_substances_employee.route("/api/v1/psychoactive_substances_employee", methods=["GET"])
def get_all_psychoactive_substances_employee():
    query_all_psychoactive_substances_employee = PsychoactiveSubstancesEmployee.query.all()
    psychoactive_substances_employee_schema = PsychoactiveSubstancesEmployeeSchema(many=True)
    psychoactive_substances_employee = psychoactive_substances_employee_schema.dump(query_all_psychoactive_substances_employee)
    return make_response(jsonify({"Psychoactive Substances Employee": psychoactive_substances_employee}), 200)

@blueprint_api_psychoactive_substances_employee.route("/api/v1/psychoactive_substances_employee/<int:ccn_psychoactive_substances_employee>", methods=["GET"])
def get_psychoactive_substances_employee(ccn_psychoactive_substances_employee):
    query_psychoactive_substances_employee = PsychoactiveSubstancesEmployee.query.filter_by(ccn_psychoactive_substances_employee=ccn_psychoactive_substances_employee).first()
    psychoactive_substances_employee_schema = PsychoactiveSubstancesEmployeeSchema(many=False)
    psychoactive_substances_employee = psychoactive_substances_employee_schema.dump(query_psychoactive_substances_employee)
    return make_response(jsonify({"Psychoactive Substances Employee": psychoactive_substances_employee}), 200)


@blueprint_api_psychoactive_substances_employee.route("/api/v1/psychoactive_substances_employee/<int:ccn_psychoactive_substances_employee>", methods=["PUT"])
def put_psychoactive_substances_employee(ccn_psychoactive_substances_employee):
    data = request.get_json()
    try:
        query_psychoactive_substances_employee = PsychoactiveSubstancesEmployee.query.filter_by(ccn_psychoactive_substances_employee=ccn_psychoactive_substances_employee).first()
        query_psychoactive_substances_employee.ccn_psychoactive_substances_employee = data["ccn_psychoactive_substances_employee"]
        query_psychoactive_substances_employee.psychoactive_substances_employee = data["psychoactive_substances_employee"].upper()
        query_psychoactive_substances_employee.ccn_employee = data["ccn_employee"]

        db.session.commit()
        psychoactive_substances_employee_schema = PsychoactiveSubstancesEmployeeSchema(many=False)
        psychoactive_substances_employee_update = psychoactive_substances_employee_schema.dump(query_psychoactive_substances_employee)

        return make_response(jsonify({"Employee's Psychoactive Substances Updated": psychoactive_substances_employee_update}), 200)
    except: 
        return make_response(jsonify({"System couldn't update the Employee's Psychoactive Substances , contact the IT department"}), 200)

@blueprint_api_psychoactive_substances_employee.route("/api/v1/psychoactive_substances_employee/<int:ccn_psychoactive_substances_employee>", methods=["DELETE"])
def delete_psychoactive_substances_employee(ccn_psychoactive_substances_employee):
    query_delete_psychoactive_substances_employee = PsychoactiveSubstancesEmployee.query.filter_by(ccn_psychoactive_substances_employee=ccn_psychoactive_substances_employee).first()
    db.session.delete(query_delete_psychoactive_substances_employee)
    #db.session.commit()
    return make_response(
        jsonify({"Psychoactive Substances Employee Deleted": "The employee's psychoactive substances  has been deleted succesfully"}), 200
    )
