import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_city import City
from hhrr_app.schema.city_schema import CitySchema


blueprint_api_city = Blueprint("api_city", __name__, url_prefix="")


@blueprint_api_city.route("/api/v1/city", methods=["POST"])
def post_city():
    data = request.get_json()
    new_city = City(
        id_city=data["id_city"],
        description_city=data["description_city"].upper(),
        ccn_department=data["ccn_department"],
    )

    db.session.add(new_city)
    db.session.commit()
    city_schema = CitySchema(many=False)
    city = city_schema.dump(new_city)

    return make_response(jsonify({"City": city}), 201)


@blueprint_api_city.route("/api/v1/city", methods=["GET"])
def get_all_city():
    query_all_city = City.query.all()
    city_schema = CitySchema(many=True)
    city = city_schema.dump(query_all_city)
    return make_response(jsonify({"City": city}), 200)


@blueprint_api_city.route("/api/v1/city/<int:ccn_city>", methods=["GET"])
def get_city(ccn_city):
    query_city = City.query.filter_by(ccn_city=ccn_city).first()
    city_schema = CitySchema(many=False)
    city = city_schema.dump(query_city)
    return make_response(jsonify({"City": city}), 200)


@blueprint_api_city.route(
    "/api/v1/city_by_department/<int:ccn_department>", methods=["GET"]
)
def get_city_by_department(ccn_department):
    query_city_by_department = City.query.filter_by(ccn_department=ccn_department).all()

    list_city_by_department = []
    for city_by_department in query_city_by_department:
        list_city_by_department.append(
            {
                "ccn_city": city_by_department.ccn_city,
                "description_city": city_by_department.description_city,
                "ccn_department": city_by_department.ccn_department,
                "descripcion_department": city_by_department.Department.descripcion_department,
            }
        )
    city_by_department_schema = CitySchema(many=False)
    city_by_department = city_by_department_schema.dump(query_city_by_department)
    return make_response(jsonify({"CityByDepartment": list_city_by_department}), 200)


@blueprint_api_city.route("/api/v1/city/<int:ccn_city>", methods=["PUT"])
def put_city(ccn_city):
    data = request.get_json()
    query_city = City.query.filter_by(ccn_city=ccn_city).first()
    query_city.id_city = data["id_city"]
    query_city.description_city = data["description_city"].upper()
    query_city.ccn_department = data["ccn_department"]

    db.session.commit()
    city_schema = CitySchema(many=False)
    city_update = city_schema.dump(query_city)

    return make_response(jsonify({"City Updated": city_update}), 200)


@blueprint_api_city.route("/api/v1/city/<int:ccn_city>", methods=["DELETE"])
def delete_city(ccn_city):
    query_delete_city = City.query.filter_by(ccn_city=ccn_city).first()
    db.session.delete(query_delete_city)
    db.session.commit()
    return make_response(
        jsonify({"City Deleted": "The city has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_city.route("/definite-codes/cities", defaults={"path": ""})
@blueprint_api_city.route("//<path:path>")
def cities(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
