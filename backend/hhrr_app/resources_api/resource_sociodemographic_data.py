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
from hhrr_app.models.tbl_house_type import HouseType
from hhrr_app.models.tbl_subhouse_type import SubHouseType
from hhrr_app.models.tbl_sociodemographic_data import SociodemographicData

from hhrr_app.schema.sociodemographic_data_schema import SociodemographicDataSchema


blueprint_api_sociodemographic_data = Blueprint(
    "api_sociodemographic_data", __name__, url_prefix=""
)


@blueprint_api_sociodemographic_data.route(
    "/api/v1/sociodemographic_data", methods=["POST"]
)
def post_sociodemographic_data():
    data = request.get_json()
    new_sociodemographic_data = SociodemographicData(
        ccn_employee=data["ccn_employee"],
        other_dependents=data["other_dependents"],
        relatives=data["relatives"],
        how_many_people_in_change=data["how_many_people_in_change"],
        people_with_disabilities=data["people_with_disabilities"],
        monthly_income=data["monthly_income"],
        is_income_enougth=data["is_income_enougth"],
        ccn_sub_house_type=data["ccn_sub_house_type"],
        ccn_house_type=data["ccn_house_type"],
        where_its_located=data["where_its_located"],
        residence_address=data["residence_address"],
        neighborhood=data["neighborhood"],
        type_transportation=data["type_transportation"],
        type_transportation_2=data["type_transportation_2"],
        social_stratum=data["social_stratum"],
        electric_power=data["electric_power"],
        sewerage=data["sewerage"],
        aqueduct=data["aqueduct"],
        natural_gas=data["natural_gas"],
        garbage_collection=data["garbage_collection"],
        landline=data["landline"],
        debts=data["debts"],
        debt_refinancing=data["debt_refinancing"],
        computer_at_home=data["computer_at_home"],
        have_internet_access=data["have_internet_access"],
    )

    db.session.add(new_sociodemographic_data)
    db.session.commit()
    sociodemographic_data_schema = SociodemographicDataSchema(many=False)
    sociodemographic_data = sociodemographic_data_schema.dump(new_sociodemographic_data)

    return make_response(jsonify({"Sociodemographic Data": sociodemographic_data}), 201)


@blueprint_api_sociodemographic_data.route(
    "/api/v1/sociodemographic_data", methods=["GET"]
)
def get_all_sociodemographic_data():
    list_sociodemographic_data = []
    query_all_sociodemographic_data = SociodemographicData.query.all()

    for sociodemographic_data in query_all_sociodemographic_data:
        list_sociodemographic_data.append(
            {
                "ccn_sociodemographic_data": sociodemographic_data.ccn_sociodemographic_data,
                "other_dependents": sociodemographic_data.other_dependents,
                "relatives": sociodemographic_data.relatives,
                "how_many_people_in_change": sociodemographic_data.how_many_people_in_change,
                "people_with_disabilities": sociodemographic_data.people_with_disabilities,
                "monthly_income": sociodemographic_data.monthly_income,
                "is_income_enougth": sociodemographic_data.is_income_enougth,
                "ccn_sub_house_type": sociodemographic_data.ccn_sub_house_type,
                "ccn_house_type": sociodemographic_data.ccn_house_type,
                "ccn_employee": sociodemographic_data.ccn_employee,
                "where_its_located": sociodemographic_data.where_its_located,
                "residence_address": sociodemographic_data.residence_address,
                "neighborhood": sociodemographic_data.neighborhood,
                "type_transportation": sociodemographic_data.type_transportation,
                "type_transportation_2": sociodemographic_data.type_transportation_2,
                "social_stratum": sociodemographic_data.social_stratum,
                "electric_power": sociodemographic_data.electric_power,
                "sewerage": sociodemographic_data.sewerage,
                "aqueduct": sociodemographic_data.aqueduct,
                "natural_gas": sociodemographic_data.natural_gas,
                "garbage_collection": sociodemographic_data.garbage_collection,
                "landline": sociodemographic_data.landline,
                "debts": sociodemographic_data.debts,
                "debt_refinancing": sociodemographic_data.debt_refinancing,
                "computer_at_home": sociodemographic_data.computer_at_home,
                "have_internet_access": sociodemographic_data.have_internet_access,
                "full_name_employee": sociodemographic_data.Employee.full_name_employee,
                "sub_house_type": sociodemographic_data.SubHouseType.sub_house_type,
                "house_type": sociodemographic_data.HouseType.house_type,
            }
        )

    return make_response(
        jsonify({"SociodemographicData": list_sociodemographic_data}), 200
    )


@blueprint_api_sociodemographic_data.route(
    "/api/v1/sociodemographic_data/<int:ccn_sociodemographic_data>", methods=["GET"]
)
def get_sociodemographic_data(ccn_sociodemographic_data):
    query_sociodemographic_data = SociodemographicData.query.filter_by(
        ccn_sociodemographic_data=ccn_sociodemographic_data
    ).first()
    sociodemographic_data_schema = SociodemographicDataSchema(many=False)
    sociodemographic_data = sociodemographic_data_schema.dump(
        query_sociodemographic_data
    )
    return make_response(jsonify({"SociodemographicData": sociodemographic_data}), 200)


@blueprint_api_sociodemographic_data.route(
    "/api/v1/sociodemographic_data/employee/<int:ccn_employee>", methods=["GET"]
)
def get_sociodemographic_data_employee(ccn_employee):
    query_sociodemographic_data = SociodemographicData.query.filter_by(
        ccn_employee=ccn_employee
    ).first()
    sociodemographic_data_schema = SociodemographicDataSchema(many=False)
    sociodemographic_data = sociodemographic_data_schema.dump(
        query_sociodemographic_data
    )
    return make_response(jsonify({"SociodemographicData": sociodemographic_data}), 200)


@blueprint_api_sociodemographic_data.route(
    "/api/v1/sociodemographic_data/<int:ccn_sociodemographic_data>", methods=["PUT"]
)
def put_sociodemographic_data(ccn_sociodemographic_data):
    data = request.get_json()
    query_sociodemographic_data = SociodemographicData.query.filter_by(
        ccn_sociodemographic_data=ccn_sociodemographic_data
    ).first()
    query_sociodemographic_data.ccn_employee = data["ccn_employee"]
    query_sociodemographic_data.other_dependents = data["other_dependents"]
    query_sociodemographic_data.relatives = data["relatives"]
    query_sociodemographic_data.how_many_people_in_change = data[
        "how_many_people_in_change"
    ]
    query_sociodemographic_data.people_with_disabilities = data[
        "people_with_disabilities"
    ]
    query_sociodemographic_data.monthly_income = data["monthly_income"]
    query_sociodemographic_data.is_income_enougth = data["is_income_enougth"]
    query_sociodemographic_data.ccn_sub_house_type = data["ccn_sub_house_type"]
    query_sociodemographic_data.ccn_house_type = data["ccn_house_type"]
    query_sociodemographic_data.where_its_located = data["where_its_located"]
    query_sociodemographic_data.residence_address = data["residence_address"]
    query_sociodemographic_data.neighborhood = data["neighborhood"]
    query_sociodemographic_data.type_transportation = data["type_transportation"]
    query_sociodemographic_data.type_transportation_2 = data["type_transportation_2"]
    query_sociodemographic_data.social_stratum = data["social_stratum"]
    query_sociodemographic_data.electric_power = data["electric_power"]
    query_sociodemographic_data.sewerage = data["sewerage"]
    query_sociodemographic_data.aqueduct = data["aqueduct"]
    query_sociodemographic_data.natural_gas = data["natural_gas"]
    query_sociodemographic_data.garbage_collection = data["garbage_collection"]
    query_sociodemographic_data.landline = data["landline"]
    query_sociodemographic_data.debts = data["debts"]
    query_sociodemographic_data.debt_refinancing = data["debt_refinancing"]
    query_sociodemographic_data.computer_at_home = data["computer_at_home"]
    query_sociodemographic_data.have_internet_access = data["have_internet_access"]

    db.session.commit()
    sociodemographic_data_schema = SociodemographicDataSchema(many=False)
    sociodemographic_data_update = sociodemographic_data_schema.dump(
        query_sociodemographic_data
    )

    return make_response(
        jsonify({"Sociodemographic Data Updated": sociodemographic_data_update}), 200
    )


@blueprint_api_sociodemographic_data.route(
    "/api/v1/sociodemographic_data/<int:ccn_sociodemographic_data>", methods=["DELETE"]
)
def delete_sociodemographic_data(ccn_sociodemographic_data):
    query_delete_sociodemographic_data = SociodemographicData.query.filter_by(
        ccn_sociodemographic_data=ccn_sociodemographic_data
    ).first()
    db.session.delete(query_delete_sociodemographic_data)
    db.session.commit()
    return make_response(
        jsonify(
            {
                "Sociodemographic Data Deleted": "The sociodemographic data has been deleted succesfully"
            }
        ),
        200,
    )


@jwt_required
@blueprint_api_sociodemographic_data.route(
    "/sociodemographic-data", defaults={"path": ""}
)
@blueprint_api_sociodemographic_data.route("//<path:path>")
def sociodemographic_data(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
