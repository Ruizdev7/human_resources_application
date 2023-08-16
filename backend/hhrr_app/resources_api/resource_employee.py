import os
import base64
from flask import jsonify
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required
from flask import request, send_from_directory

from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from hhrr_app import db
from hhrr_app.models.tbl_employee import Employee
from hhrr_app.models.tbl_employment_relationship import EmploymentRelationship
from hhrr_app.models.tbl_age_range import AgeRange
from hhrr_app.schema.employee_schema import EmployeeSchema

blueprint_api_employee = Blueprint("api_employee", __name__, url_prefix="")


@jwt_required
@blueprint_api_employee.route("/api/v1/employee/images/<ccn_employee>")
def serve_images(ccn_employee):
    query_employee = Employee.query.filter_by(ccn_employee=ccn_employee).first()
    image_path = f"hhrr_app/static/images/employee_photos/{query_employee.image}"

    with open(image_path, "rb") as f:
        image_data = f.read()
        image_b64 = base64.b64encode(image_data)
    return jsonify({"image_b64": image_b64.decode("utf-8")})


def calculate_age(date_birth_employee):
    date_birth = datetime.strptime(date_birth_employee.replace("-", "/"), "%Y/%m/%d")
    year = datetime.now()

    if int(date_birth.month) > int(year.month):
        age = int(year.year) - int(date_birth.year) - 1
    else:
        if int(date_birth.day) <= int(year.day):
            age = int(year.year) - int(date_birth.year)
        else:
            age = int(year.year) - int(date_birth.year)

    list_age_range = ["5", "6", "7", "8", "9"]
    calculate_age = list(str(age))
    if len(calculate_age) == 1:
        calculate_age.insert(0, "0")
    if calculate_age[1] in list_age_range:
        age_range = f"{calculate_age[0]}5-{calculate_age[0]}9"
    else:
        age_range = f"{calculate_age[0]}0-{calculate_age[0]}4"
    query_age_range = AgeRange.query.filter_by(age_range=age_range).first()
    age_range = query_age_range.ccn_age_range
    return [age, age_range]


@jwt_required
@blueprint_api_employee.route("/api/v1/employee", methods=["POST"])
def post_employee():
    image = request.files["image"]
    filename = secure_filename(image.filename)
    image.save(os.path.join("hhrr_app/static/images/employee_photos", filename))
    age_age_range = calculate_age(
        date_birth_employee=request.form["date_birth_employee"]
    )
    query_for_ccn = Employee.query.all()

    query_validation = Employee.query.filter_by(
        number_id_employee=request.form["number_id_employee"]
    ).first()
    if query_validation:
        return make_response(jsonify({"DuplicateError": "El empleado ya existe"}), 405)

    new_employee = Employee(
        ccn_employee=int(query_for_ccn[-1].ccn_employee) + 1,
        ccn_type_id=request.form["ccn_type_id"],
        number_id_employee=request.form["number_id_employee"],
        first_name_employee=request.form["first_name_employee"],
        middle_name_employee=request.form["middle_name_employee"],
        first_last_name_employee=request.form["first_last_name_employee"],
        second_last_name_employee=request.form["second_last_name_employee"],
        date_birth_employee=request.form["date_birth_employee"],
        age=age_age_range[0],
        age_range=age_age_range[1],
        auto_perceived_gender=request.form["auto_perceived_gender"],
        rh=request.form["rh"],
        employee_personal_email=request.form["employee_personal_email"],
        employee_personal_cellphone=request.form["employee_personal_cellphone"],
        informed_consent_law_1581=request.form["informed_consent_law_1581"],
        ccn_marital_status=request.form["ccn_marital_status"],
        image=filename,
        employee_password=generate_password_hash(request.form["employee_password"]),
    )

    db.session.add(new_employee)
    db.session.commit()
    employee_schema = EmployeeSchema(many=False)
    employee = employee_schema.dump(new_employee)

    return make_response(
        jsonify(
            {
                "Employees": employee,
                "msg": "The employee has been add succesfully",
                "Success": "true",
            }
        ),
        201,
    )


@jwt_required(True)
@blueprint_api_employee.route("/api/v1/employee", methods=["GET"])
def get_employees():
    query_all_employees = Employee.query.filter(Employee.ccn_employee != 0).all()
    employee_schema = EmployeeSchema(many=True)
    employees = employee_schema.dump(query_all_employees)
    return make_response(jsonify({"Employees": employees}), 200)


@jwt_required(True)
@blueprint_api_employee.route(
    "/api/v1/performance_evaluation/employee", methods=["GET"]
)
def get_performance_evaluation_employees():
    fecha_limite = datetime(
        datetime.now().year - 1, 9, 30
    )  # Fecha límite para la comparación

    print(fecha_limite)
    query_all_employees = (
        db.session.query(Employee)
        .join(
            EmploymentRelationship,
            Employee.ccn_employee == EmploymentRelationship.ccn_employee,
        )
        .filter(
            EmploymentRelationship.binding_date <= fecha_limite,
            Employee.ccn_employee != 0,
        )
        .all()
    )
    employee_schema = EmployeeSchema(many=True)
    employees = employee_schema.dump(query_all_employees)
    return make_response(jsonify({"Employees": employees}), 200)


@blueprint_api_employee.route("/api/v1/employee/<int:ccn_employee>", methods=["GET"])
def get_employee(ccn_employee):
    query_employee = Employee.query.filter_by(ccn_employee=ccn_employee).first()
    employee_schema = EmployeeSchema(many=False)
    employee = employee_schema.dump(query_employee)
    return make_response(jsonify({"Employee": employee}), 200)


@jwt_required
@blueprint_api_employee.route(
    "/api/v1/employee/access_control/<int:number_id_employee>", methods=["GET"]
)
def get_employee_access_control(number_id_employee):
    query_employee = Employee.query.filter_by(
        number_id_employee=number_id_employee
    ).first()
    employee_schema = EmployeeSchema(many=False)
    employee = employee_schema.dump(query_employee)
    return make_response(jsonify({"Employee": employee}), 200)


@jwt_required
@blueprint_api_employee.route("/api/v1/employee/<int:ccn_employee>", methods=["PUT"])
def put_employee(ccn_employee):
    age_age_range = calculate_age(
        date_birth_employee=request.form["date_birth_employee"]
    )

    query_employee = Employee.query.filter_by(ccn_employee=ccn_employee).first()
    query_employee.number_id_employee = request.form["number_id_employee"].upper()
    query_employee.first_name_employee = request.form["first_name_employee"].upper()
    query_employee.middle_name_employee = request.form["middle_name_employee"].upper()

    query_employee.ccn_marital_status = request.form["ccn_marital_status"].upper()

    query_employee.first_last_name_employee = request.form[
        "first_last_name_employee"
    ].upper()
    query_employee.second_last_name_employee = request.form[
        "second_last_name_employee"
    ].upper()
    query_employee.full_name_employee = request.form["full_name_employee"].upper()
    query_employee.date_birth_employee = request.form["date_birth_employee"].upper()
    query_employee.age = age_age_range[0]
    query_employee.age_range = age_age_range[1]
    query_employee.auto_perceived_gender = request.form["auto_perceived_gender"].upper()
    query_employee.rh = request.form["rh"]
    query_employee.employee_personal_email = request.form[
        "employee_personal_email"
    ].upper()
    query_employee.employee_personal_cellphone = request.form[
        "employee_personal_cellphone"
    ].upper()
    if request.form["employee_password"]:
        query_employee.employee_password = generate_password_hash(
            request.form["employee_password"]
        )
    if len(request.files) != 0:
        image = request.files["image"]
        filename = secure_filename(image.filename)
        image.save(os.path.join("hhrr_app/static/images/employee_photos", filename))
        query_employee.image = filename

    db.session.commit()
    employee_schema = EmployeeSchema(many=False)
    employee_update = employee_schema.dump(query_employee)

    return make_response(jsonify({"Employee Updated": employee_update}), 200)


@jwt_required
@blueprint_api_employee.route(
    "/api/v1/employee/informed_consent_law_1581/<int:ccn_employee>", methods=["PUT"]
)
def put_informed_consent_law_1581(ccn_employee):
    data = request.get_json()
    query_employee = Employee.query.filter_by(ccn_employee=ccn_employee).first()
    query_employee.informed_consent_law_1581 = data["informed_consent_law_1581"]
    db.session.commit()
    employee_schema = EmployeeSchema(many=False)
    employee_update = employee_schema.dump(query_employee)

    return make_response(jsonify({"Employee Updated": employee_update}), 200)


@jwt_required
@blueprint_api_employee.route("/api/v1/employee/<int:ccn_employee>", methods=["DELETE"])
def delete_employee(ccn_employee):
    query_delete_employee = Employee.query.filter_by(ccn_employee=ccn_employee).first()
    db.session.delete(query_delete_employee)
    db.session.commit()
    return make_response(
        jsonify({"Employee Deleted": "The employee has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_employee.route("/basic-data-employee", defaults={"path": ""})
@blueprint_api_employee.route("//<path:path>")
def basic_data_employee(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


@jwt_required
@blueprint_api_employee.route(
    "/api/v1/employee/password/<int:ccn_employee>", methods=["PUT"]
)
def put_is_active_employee(ccn_employee):
    data = request.get_json()
    query_employee = Employee.query.filter_by(ccn_employee=ccn_employee).first()

    if check_password_hash(query_employee.employee_password, data["last_password"]):
        query_employee.employee_password = generate_password_hash(data["new_password"])

        db.session.commit()

        return make_response(
            jsonify(
                {
                    "EmployeeUpdated": {
                        "full_name_employee": query_employee.full_name_employee,
                    }
                }
            ),
            200,
        )
    else:
        return make_response(
            jsonify(
                {
                    "EmployeeUpdatedError": {
                        "full_name_employee": query_employee.full_name_employee,
                    }
                }
            ),
            400,
        )
