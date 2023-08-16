import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_house_type import HouseType
from hhrr_app.schema.house_type_schema import HouseTypeSchema


blueprint_api_house_type = Blueprint("api_house_type", __name__, url_prefix="")


@blueprint_api_house_type.route("/api/v1/house_type", methods=["POST"])
def post_house_type():
    data = request.get_json()
    new_house_type = HouseType(
        house_type=data["house_type"].upper()
    )

    db.session.add(new_house_type)
    db.session.commit()
    house_type_schema = HouseTypeSchema(many=False)
    house_type = house_type_schema.dump(new_house_type)

    return make_response(jsonify({"HouseType": house_type}), 201)


@blueprint_api_house_type.route("/api/v1/house_type", methods=["GET"])
def get_all_house_type():
    query_all_house_type = HouseType.query.all()
    house_type_schema = HouseTypeSchema(many=True)
    house_type = house_type_schema.dump(query_all_house_type)
    return make_response(jsonify({"HouseType": house_type}), 200)


@blueprint_api_house_type.route("/api/v1/house_type/<int:ccn_house_type>", methods=["GET"])
def get_house_type(ccn_house_type):
    query_house_type = HouseType.query.filter_by(ccn_house_type=ccn_house_type).first()
    house_type_schema = HouseTypeSchema(many=False)
    house_type = house_type_schema.dump(query_house_type)
    return make_response(jsonify({"HouseType": house_type}), 200)


@blueprint_api_house_type.route("/api/v1/house_type/<int:ccn_house_type>", methods=["PUT"])
def put_house_type(ccn_house_type):
    data = request.get_json()
    query_house_type = HouseType.query.filter_by(ccn_house_type=ccn_house_type).first()
    query_house_type.house_type = data["house_type"].upper()
    
    db.session.commit()
    house_type_schema = HouseTypeSchema(many=False)
    house_type_update = house_type_schema.dump(query_house_type)

    return make_response(jsonify({"House Type Updated": house_type_update}), 200)


@blueprint_api_house_type.route("/api/v1/house_type/<int:ccn_house_type>", methods=["DELETE"])
def delete_house_type(ccn_house_type):
    query_delete_house_type = HouseType.query.filter_by(ccn_house_type=ccn_house_type).first()
    db.session.delete(query_delete_house_type)
    db.session.commit()
    return make_response(
        jsonify({"House Type Deleted": "The hpuse type has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_house_type.route('/definite-codes/house-type', defaults={'path': ''})
@blueprint_api_house_type.route('//<path:path>')
def house_type(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')