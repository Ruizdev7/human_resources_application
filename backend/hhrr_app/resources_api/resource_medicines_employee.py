import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required


from hhrr_app import db
from hhrr_app.models.tbl_medicines_employee import MedicinesEmployee
from hhrr_app.schema.medicines_employee_schema import MedicinesEmployeeSchema


blueprint_api_medicines_employee = Blueprint("api_medicines_employee", __name__, url_prefix="")


@blueprint_api_medicines_employee.route("/api/v1/medicines_employee", methods=["POST"])
def post_medicines_employee():
    data = request.get_json()
    new_medicines_employee = MedicinesEmployee(
        ccn_employee=data["ccn_employee"],
        ccn_medicines_employee=data["ccn_medicines_employee"],
        medicines_employee=data["medicines_employee"].upper()
    )

    db.session.add(new_medicines_employee)
    db.session.commit()
    medicines_employee_schema = MedicinesEmployeeSchema(many=False)
    medicines_employee = medicines_employee_schema.dump(new_medicines_employee)

    return make_response(jsonify({"Medicines Employee": medicines_employee}), 201)


@blueprint_api_medicines_employee.route("/api/v1/medicines_employee", methods=["GET"])
def get_all_medicines_employee():
    query_all_medicines_employee = MedicinesEmployee.query.all()
    medicines_employee_schema = MedicinesEmployeeSchema(many=True)
    medicines_employee = medicines_employee_schema.dump(query_all_medicines_employee)
    return make_response(jsonify({"Medicines Employee": medicines_employee}), 200)

@blueprint_api_medicines_employee.route("/api/v1/medicines_employee/<int:ccn_medicines_employee>", methods=["GET"])
def get_medicines_employee(ccn_medicines_employee):
    query_medicines_employee = MedicinesEmployee.query.filter_by(ccn_medicines_employee=ccn_medicines_employee).first()
    medicines_employee_schema = MedicinesEmployeeSchema(many=False)
    medicines_employee = medicines_employee_schema.dump(query_medicines_employee)
    return make_response(jsonify({"Medicines Employee": medicines_employee}), 200)


@blueprint_api_medicines_employee.route("/api/v1/medicines_employee/<int:ccn_medicines_employee>", methods=["PUT"])
def put_medicines_employee(ccn_medicines_employee):
    data = request.get_json()
    try:
        query_medicines_employee = MedicinesEmployee.query.filter_by(ccn_medicines_employee=ccn_medicines_employee).first()
        query_medicines_employee.ccn_medicines_employee = data["ccn_medicines_employee"]
        query_medicines_employee.medicines_employee = data["medicines_employee"].upper()
        query_medicines_employee.ccn_employee = data["ccn_employee"]

        db.session.commit()
        medicines_employee_schema = MedicinesEmployeeSchema(many=False)
        medicines_employee_update = medicines_employee_schema.dump(query_medicines_employee)

        return make_response(jsonify({"Employee's Medicines Updated": medicines_employee_update}), 200)
    except: 
        return make_response(jsonify({"System couldn't update the employee's medicines, contact the IT department"}), 200)

@blueprint_api_medicines_employee.route("/api/v1/medicines_employee/<int:ccn_medicines_employee>", methods=["DELETE"])
def delete_medicines_employee(ccn_medicines_employee):
    query_delete_medicines_employee = MedicinesEmployee.query.filter_by(ccn_medicines_employee=ccn_medicines_employee).first()
    db.session.delete(query_delete_medicines_employee)
    #db.session.commit()
    return make_response(
        jsonify({"Medicines Employee Deleted": "The medicines_employee has been deleted succesfully"}), 200
    )
