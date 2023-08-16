import os
from flask import jsonify
from flask import request
from flask import Blueprint
from datetime import datetime
from flask import make_response
from hhrr_app import create_app
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_type_id import TypeId
from hhrr_app.models.tbl_employee import Employee
from hhrr_app.models.tbl_age_range import AgeRange
from hhrr_app.models.tbl_family_nucleus import FamilyNucleus
from hhrr_app.models.tbl_marital_status import MaritalStatus
from hhrr_app.models.tbl_schooling_level import SchoolingLevel
from hhrr_app.models.tbl_auto_perceived_gender import AutoPerceivedGender
from hhrr_app.schema.family_nucleus_schema import FamilyNucleusSchema

blueprint_api_family_nucleus = Blueprint("api_family_nucleus", __name__, url_prefix="")


def calculate_age(date_of_birth):
    date_birth = datetime.strptime(date_of_birth.replace("-", "/"), "%Y/%m/%d")
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


@blueprint_api_family_nucleus.route("/api/v1/family_nucleus", methods=["POST"])
def post_family_nucleus():
    data = request.get_json()
    if data["date_of_birth"] != "No aplica":
        age_age_range = calculate_age(date_of_birth=data["date_of_birth"])
    else:
        age_age_range = [0, 21]
    new_family_nucleus = FamilyNucleus(
        ccn_employee=data["ccn_employee"],
        number_of_children=data["number_of_children"],
        ccn_type_id=data["ccn_type_id"],
        number_id=data["number_id"],
        ccn_auto_perceived_gender=data["ccn_auto_perceived_gender"],
        first_name=data["first_name"].upper(),
        middle_name=data["middle_name"].upper(),
        first_last_name=data["first_last_name"].upper(),
        second_last_name=data["second_last_name"].upper(),
        date_of_birth=data["date_of_birth"]
        if data["date_of_birth"] != "No aplica"
        else "1111-11-11",
        age=age_age_range[0],
        age_range=age_age_range[1],
        ccn_schooling_level=data["ccn_schooling_level"],
    )

    db.session.add(new_family_nucleus)
    db.session.commit()
    family_nucleus_schema = FamilyNucleusSchema(many=False)
    family_nucleus = family_nucleus_schema.dump(new_family_nucleus)

    return make_response(jsonify({"Family Nucleus": family_nucleus}), 201)


@blueprint_api_family_nucleus.route("/api/v1/family_nucleus", methods=["GET"])
def get_all_family_nucleus():
    list_family_nucleus = []
    query_all_family_nucleus = FamilyNucleus.query.all()

    for family_nucleus in query_all_family_nucleus:
        list_family_nucleus.append(
            {
                "ccn_family_nucleus": family_nucleus.ccn_family_nucleus,
                "ccn_employee": family_nucleus.ccn_employee,
                "number_of_children": family_nucleus.number_of_children,
                "ccn_type_id": family_nucleus.ccn_type_id,
                "number_id": family_nucleus.number_id,
                "ccn_auto_perceived_gender": family_nucleus.ccn_auto_perceived_gender,
                "first_name": family_nucleus.first_name,
                "middle_name": family_nucleus.middle_name,
                "first_last_name": family_nucleus.first_last_name,
                "second_last_name": family_nucleus.second_last_name,
                "date_of_birth": family_nucleus.date_of_birth,
                "age": family_nucleus.age,
                "ccn_age_range": family_nucleus.age_range,
                "ccn_schooling_level": family_nucleus.ccn_schooling_level,
                "full_name_employee": family_nucleus.Employee.full_name_employee,
                "type_id": family_nucleus.TypeId.type_id,
                "auto_perceived_gender": family_nucleus.AutoPerceivedGender.auto_perceived_gender,
                "age_range": family_nucleus.AgeRange.age_range,
                "schooling_level": family_nucleus.SchoolingLevel.description_schooling_level,
            }
        )

    return make_response(jsonify({"FamilyNucleus": list_family_nucleus}), 200)


@blueprint_api_family_nucleus.route(
    "/api/v1/family_nucleus/<int:ccn_family_nucleus>", methods=["GET"]
)
def get_family_nucleus(ccn_family_nucleus):
    query_family_nucleus = FamilyNucleus.query.filter_by(
        ccn_family_nucleus=ccn_family_nucleus
    ).first()
    family_nucleus_schema = FamilyNucleusSchema(many=False)
    family_nucleus = family_nucleus_schema.dump(query_family_nucleus)
    return make_response(jsonify({"FamilyNucleus": family_nucleus}), 200)


@blueprint_api_family_nucleus.route(
    "/api/v1/family_nucleus/employee/<int:ccn_employee>", methods=["GET"]
)
def get_family_nucleus_employee(ccn_employee):
    query_family_nucleus = FamilyNucleus.query.filter_by(
        ccn_employee=ccn_employee
    ).first()
    family_nucleus_schema = FamilyNucleusSchema(many=False)
    family_nucleus = family_nucleus_schema.dump(query_family_nucleus)
    return make_response(jsonify({"FamilyNucleus": family_nucleus}), 200)


@blueprint_api_family_nucleus.route(
    "/api/v1/cv_family_nucleus/employee/<int:ccn_employee>", methods=["GET"]
)
def get_cv_family_nucleus_employee(ccn_employee):
    query_family_nucleus = (
        db.session.query(
            FamilyNucleus,
            TypeId,
            Employee,
            AgeRange,
            SchoolingLevel,
            AutoPerceivedGender,
        )
        .join(TypeId, FamilyNucleus.ccn_type_id == TypeId.ccn_type_id)
        .join(Employee, FamilyNucleus.ccn_employee == Employee.ccn_employee)
        .join(AgeRange, FamilyNucleus.age_range == AgeRange.ccn_age_range)
        .join(
            SchoolingLevel,
            FamilyNucleus.ccn_schooling_level == SchoolingLevel.ccn_schooling_level,
        )
        .join(
            AutoPerceivedGender,
            FamilyNucleus.ccn_auto_perceived_gender
            == AutoPerceivedGender.ccn_auto_perceived_gender,
        )
        .filter(FamilyNucleus.ccn_employee == ccn_employee)
        .all()
    )
    list_family_nucleus = []

    for family_nucleus in query_family_nucleus:
        list_family_nucleus.append(
            {
                "ccn_family_nucleus": family_nucleus[0].ccn_family_nucleus,
                "ccn_employee": family_nucleus[0].ccn_employee,
                "number_of_children": family_nucleus[0].number_of_children,
                "ccn_type_id": family_nucleus[0].ccn_type_id,
                "number_id": family_nucleus[0].number_id,
                "ccn_auto_perceived_gender": family_nucleus[
                    0
                ].ccn_auto_perceived_gender,
                "first_name": family_nucleus[0].first_name,
                "middle_name": family_nucleus[0].middle_name,
                "first_last_name": family_nucleus[0].first_last_name,
                "second_last_name": family_nucleus[0].second_last_name,
                "date_of_birth": family_nucleus[0].date_of_birth,
                "age": family_nucleus[0].age,
                "ccn_age_range": family_nucleus[0].age_range,
                "ccn_schooling_level": family_nucleus[0].ccn_schooling_level,
                "full_name_employee": family_nucleus[2].full_name_employee,
                "type_id": family_nucleus[1].type_id,
                "auto_perceived_gender": family_nucleus[5].auto_perceived_gender,
                "age_range": family_nucleus[3].age_range,
                "schooling_level": family_nucleus[4].description_schooling_level,
            }
        )

    query_family_nucleus = FamilyNucleus.query.filter_by(
        ccn_employee=ccn_employee
    ).all()
    family_nucleus_schema = FamilyNucleusSchema(many=False)
    family_nucleus = family_nucleus_schema.dump(query_family_nucleus)
    return make_response(
        jsonify({"FamilyNucleus": family_nucleus, "FamilyNucleu": list_family_nucleus}),
        200,
    )


@blueprint_api_family_nucleus.route(
    "/api/v1/family_nucleus/<int:ccn_family_nucleus>", methods=["PUT"]
)
def put_family_nucleus(ccn_family_nucleus):
    data = request.get_json()

    if data["date_of_birth"] != "No aplica":
        age_age_range = calculate_age(date_of_birth=data["date_of_birth"])
    else:
        age_age_range = [0, 21]

    query_family_nucleus = FamilyNucleus.query.filter_by(
        ccn_family_nucleus=ccn_family_nucleus
    ).first()
    query_family_nucleus.ccn_employee = data["ccn_employee"]
    # query_family_nucleus.ccn_marital_status = data["ccn_marital_status"]
    query_family_nucleus.number_of_children = data["number_of_children"]
    query_family_nucleus.ccn_type_id = data["ccn_type_id"]
    query_family_nucleus.number_id = data["number_id"]
    query_family_nucleus.ccn_auto_perceived_gender = data["ccn_auto_perceived_gender"]
    query_family_nucleus.first_name = data["first_name"].upper()
    query_family_nucleus.middle_name = data["middle_name"].upper()
    query_family_nucleus.first_last_name = data["first_last_name"].upper()
    query_family_nucleus.second_last_name = data["second_last_name"].upper()
    query_family_nucleus.date_of_birth = (
        data["date_of_birth"] if data["date_of_birth"] != "No aplica" else "1111-11-11"
    )
    query_family_nucleus.age = age_age_range[0]
    query_family_nucleus.age_range = age_age_range[1]
    query_family_nucleus.ccn_schooling_level = data["ccn_schooling_level"]

    db.session.commit()
    family_nucleus_schema = FamilyNucleusSchema(many=False)
    family_nucleus_update = family_nucleus_schema.dump(query_family_nucleus)

    return make_response(
        jsonify({"Family Nucleus Updated": family_nucleus_update}), 200
    )


@blueprint_api_family_nucleus.route(
    "/api/v1/family_nucleus/<int:ccn_family_nucleus>", methods=["DELETE"]
)
def delete_family_nucleus(ccn_family_nucleus):
    query_delete_family_nucleus = FamilyNucleus.query.filter_by(
        ccn_family_nucleus=ccn_family_nucleus
    ).first()
    db.session.delete(query_delete_family_nucleus)
    db.session.commit()
    return make_response(
        jsonify(
            {
                "Family Nucleus Deleted": "The family nucleus has been deleted succesfully"
            }
        ),
        200,
    )


@jwt_required
@blueprint_api_family_nucleus.route("/family-nucleus", defaults={"path": ""})
@blueprint_api_family_nucleus.route("//<path:path>")
def family_nucleus(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
