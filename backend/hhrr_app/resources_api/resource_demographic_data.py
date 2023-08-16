import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_race import Race
from hhrr_app.models.tbl_city import City
from hhrr_app.models.tbl_employee import Employee
from hhrr_app.models.tbl_department import Department
from hhrr_app.models.tbl_schooling_level import SchoolingLevel
from hhrr_app.models.tbl_demographic_data import DemographicData

from hhrr_app.schema.demographic_data_schema import DemographicDataSchema


blueprint_api_demographic_data = Blueprint(
    "api_demographic_data", __name__, url_prefix=""
)


@blueprint_api_demographic_data.route("/api/v1/demographic_data", methods=["POST"])
def post_demographic_data():
    data = request.get_json()

    new_demographic_data = DemographicData(
        ccn_employee=data["ccn_employee"],
        birth_country=data["birth_country"],
        birth_department=data["birth_department"],
        birth_city=data["birth_city"],
        country_residence=data["country_residence"],
        department_residence=data["department_residence"],
        city_residence=data["city_residence"],
        ccn_schooling_level=data["ccn_schooling_level"],
        ccn_race=data["ccn_race"],
        is_head_of_household=data["is_head_of_household"],
    )

    db.session.add(new_demographic_data)
    db.session.commit()
    demographic_data_schema = DemographicDataSchema(many=False)
    demographic_data = demographic_data_schema.dump(new_demographic_data)

    return make_response(jsonify({"Demographic Data": demographic_data}), 201)


@blueprint_api_demographic_data.route("/api/v1/demographic_data", methods=["GET"])
def get_all_demographic_data():
    list_of_demographic_data = []
    query_all_demographic_data = DemographicData.query.all()

    for demographic_data in query_all_demographic_data:
        list_of_demographic_data.append(
            {
                "ccn_demographic_data": demographic_data.ccn_demographic_data,
                "ccn_employee": demographic_data.ccn_employee,
                "ccn_birth_department": demographic_data.birth_department,
                "ccn_birth_city": demographic_data.birth_city,
                "ccn_department_residence": demographic_data.department_residence,
                "ccn_city_residence": demographic_data.city_residence,
                "ccn_schooling_level": demographic_data.ccn_schooling_level,
                "ccn_race": demographic_data.ccn_race,
                "is_head_of_household": demographic_data.is_head_of_household,
                "full_name_employee": demographic_data.Employee.full_name_employee,
                "race": demographic_data.Race.description_race,
                "schooling_level": demographic_data.SchoolingLevel.description_schooling_level,
                "ccn_birth_country": demographic_data.birth_country,
                "ccn_country_residence": demographic_data.country_residence,
                "birth_country": demographic_data.CountryBirth.description_country,
                "country_residence": demographic_data.CountryResidence.description_country,
                "birth_department": demographic_data.DepartmentBirth.descripcion_department,
                "birth_city": demographic_data.CityBirthCity.description_city,
                "department_residence": demographic_data.DepartmentResidence.descripcion_department,
                "city_residence": demographic_data.CityCityResidence.description_city,
            }
        )

    return make_response(
        jsonify({"DemographicData": list_of_demographic_data}),
        200,
    )


@blueprint_api_demographic_data.route(
    "/api/v1/demographic_data/<int:ccn_demographic_data>", methods=["GET"]
)
def get_demographic_data(ccn_demographic_data):
    query_demographic_data = DemographicData.query.filter_by(
        ccn_demographic_data=ccn_demographic_data
    ).first()
    demographic_data_schema = DemographicDataSchema(many=False)
    demographic_data = demographic_data_schema.dump(query_demographic_data)

    return make_response(
        jsonify({"DemographicData": demographic_data}),
        200,
    )


@blueprint_api_demographic_data.route(
    "/api/v1/demographic_data/employee/<int:ccn_employee>", methods=["GET"]
)
def get_demographic_data_employee(ccn_employee):
    query_demographic_data = DemographicData.query.filter_by(
        ccn_employee=ccn_employee
    ).first()
    demographic_data_schema = DemographicDataSchema(many=False)
    demographic_data = demographic_data_schema.dump(query_demographic_data)
    return make_response(jsonify({"DemographicData": demographic_data}), 200)


@blueprint_api_demographic_data.route(
    "/api/v1/demographic_data/<int:ccn_demographic_data>", methods=["PUT"]
)
def put_demographic_data(ccn_demographic_data):
    data = request.get_json()

    query_demographic_data = DemographicData.query.filter_by(
        ccn_demographic_data=ccn_demographic_data
    ).first()
    query_demographic_data.ccn_demographic_data = data["ccn_demographic_data"]
    query_demographic_data.ccn_employee = data["ccn_employee"]
    query_demographic_data.birth_country = data["birth_country"]
    query_demographic_data.birth_department = data["birth_department"]
    query_demographic_data.birth_city = data["birth_city"]
    query_demographic_data.country_residence = data["country_residence"]
    query_demographic_data.department_residence = data["department_residence"]
    query_demographic_data.city_residence = data["city_residence"]
    query_demographic_data.ccn_schooling_level = data["ccn_schooling_level"]
    query_demographic_data.ccn_race = data["ccn_race"]
    query_demographic_data.is_head_of_household = data["is_head_of_household"]
    db.session.commit()
    demographic_data_schema = DemographicDataSchema(many=False)
    demographic_data_update = demographic_data_schema.dump(query_demographic_data)

    return make_response(
        jsonify({"Demographic Data Updated": demographic_data_update}), 200
    )


@blueprint_api_demographic_data.route(
    "/api/v1/demographic_data/<int:ccn_demographic_data>", methods=["DELETE"]
)
def delete_demographic_data(ccn_demographic_data):
    query_delete_demographic_data = DemographicData.query.filter_by(
        ccn_demographic_data=ccn_demographic_data
    ).first()
    db.session.delete(query_delete_demographic_data)
    db.session.commit()
    return make_response(
        jsonify(
            {
                "Demographic Data Deleted": "The demographic data has been deleted succesfully"
            }
        ),
        200,
    )


@jwt_required
@blueprint_api_demographic_data.route("/demographic-data", defaults={"path": ""})
@blueprint_api_demographic_data.route("//<path:path>")
def demographic_data(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
