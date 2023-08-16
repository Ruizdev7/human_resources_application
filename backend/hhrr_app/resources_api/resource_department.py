import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_department import Department
from hhrr_app.schema.department_schema import DepartmentSchema


blueprint_api_department = Blueprint("api_department", __name__, url_prefix="")


@blueprint_api_department.route("/api/v1/department", methods=["POST"])
def post_department():
    data = request.get_json()
    print(data)
    new_department = Department(
        id_department=data["id_department"],
        descripcion_department=data["descripcion_department"].upper(),
        ccn_country=data["ccn_country"],
    )

    db.session.add(new_department)
    db.session.commit()
    department_schema = DepartmentSchema(many=False)
    department = department_schema.dump(new_department)

    return make_response(jsonify({"Department": department}), 201)


@blueprint_api_department.route("/api/v1/department", methods=["GET"])
def get_all_department():
    query_all_department = Department.query.all()
    department_schema = DepartmentSchema(many=True)
    department = department_schema.dump(query_all_department)
    return make_response(jsonify({"Department": department}), 200)


@blueprint_api_department.route(
    "/api/v1/department/<int:ccn_department>", methods=["GET"]
)
def get_department(ccn_department):
    query_department = Department.query.filter_by(ccn_department=ccn_department).first()
    department_schema = DepartmentSchema(many=False)
    department = department_schema.dump(query_department)
    return make_response(jsonify({"Department": department}), 200)


@blueprint_api_department.route(
    "/api/v1/department_by_country/<int:ccn_country>", methods=["GET"]
)
def get_department_by_country(ccn_country):
    query_department_by_country = Department.query.filter_by(
        ccn_country=ccn_country
    ).all()
    list_department_by_country = []
    for department_by_country in query_department_by_country:
        list_department_by_country.append(
            {
                "ccn_department": department_by_country.ccn_department,
                "descripcion_department": department_by_country.descripcion_department,
                "ccn_country": department_by_country.ccn_country,
                "description_country": department_by_country.Country.description_country,
            }
        )

    city_by_country_schema = DepartmentSchema(many=False)
    city_by_country = city_by_country_schema.dump(query_department_by_country)
    return make_response(
        jsonify({"DepartmentByCountry": list_department_by_country}), 200
    )


@blueprint_api_department.route(
    "/api/v1/department/<int:ccn_department>", methods=["PUT"]
)
def put_department(ccn_department):
    data = request.get_json()
    query_department = Department.query.filter_by(ccn_department=ccn_department).first()
    query_department.id_department = data["id_department"]
    query_department.descripcion_department = data["descripcion_department"].upper()
    query_department.ccn_country = data["ccn_country"]

    db.session.commit()
    department_schema = DepartmentSchema(many=False)
    department_update = department_schema.dump(query_department)

    return make_response(jsonify({"Department Updated": department_update}), 200)


@blueprint_api_department.route(
    "/api/v1/department/<int:ccn_department>", methods=["DELETE"]
)
def delete_department(ccn_department):
    query_delete_department = Department.query.filter_by(
        ccn_department=ccn_department
    ).first()
    db.session.delete(query_delete_department)
    db.session.commit()
    return make_response(
        jsonify({"Department Deleted": "The department has been deleted succesfully"}),
        200,
    )


@jwt_required
@blueprint_api_department.route("/definite-codes/departments", defaults={"path": ""})
@blueprint_api_department.route("//<path:path>")
def departments(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
