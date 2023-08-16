from flask import jsonify
from flask import request
from flask import Blueprint
from flask import make_response

from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

from hhrr_app import db
from hhrr_app.models.tbl_employee import Employee
from hhrr_app.models.tbl_employment_relationship import EmploymentRelationship


blueprint_api_authorization_employee = Blueprint(
    "api_authorization_employee", __name__, url_prefix=""
)


@blueprint_api_authorization_employee.route(
    "/api/v1/login_employee/token", methods=["POST"]
)
def create_token():

    id_received = request.json.get("number_id_employee", None)
    password_received = request.json.get("employee_password", None)

    query_logged_employee = Employee.query.filter(
        Employee.number_id_employee == id_received
    ).first()

    if query_logged_employee == None:
        return make_response(jsonify({"msg": "Usuario no encontrado!!!"}), 401)

    query_employment_relationship = EmploymentRelationship.query.filter(
        EmploymentRelationship.ccn_employee == query_logged_employee.ccn_employee
    ).first()
    
    
    
    if check_password_hash(query_logged_employee.employee_password, password_received):
        access_token = create_access_token(identity=id_received)
        return make_response(
            jsonify(
                {
                    "current_user": {
                        "ccn_employee": query_logged_employee.ccn_employee,
                        "token": access_token,
                        "full_name_employee": query_logged_employee.full_name_employee,
                        "informed_consent_law_1581": query_logged_employee.informed_consent_law_1581,
                    },
                    "access_level": {
                        "Type_Relationship": query_employment_relationship.TypeRelationship.description_type_relationship,
                        "area": query_employment_relationship.Role.area,
                        "role": query_employment_relationship.Role.role,
                        "ccn_role": query_employment_relationship.Role.ccn_role,
                        "process": query_employment_relationship.Role.process,
                    },
                }
            )
        )
    else:
        return make_response(jsonify({"msg": "Contraseña Invalida"}), 400)


@blueprint_api_authorization_employee.route("/api/v1/models", methods=["GET"])
def get_all_models():
    query_all_models = db.engine.table_names()
    print(query_all_models)

    if query_all_models == None:
        return make_response(
            jsonify({"msg": "Error en el proceso de consulta!!!"}), 401
        )

    else:

        return make_response(
            jsonify({"models": query_all_models}),
            200,
        )
