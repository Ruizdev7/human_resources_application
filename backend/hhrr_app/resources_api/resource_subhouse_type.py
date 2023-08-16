import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_subhouse_type import SubHouseType
from hhrr_app.schema.subhouse_type_schema import SubHouseTypeSchema


blueprint_api_subhouse_type = Blueprint("api_subhouse_type", __name__, url_prefix="")


@blueprint_api_subhouse_type.route("/api/v1/subhouse_type", methods=["POST"])
def post_subhouse_type():
    data = request.get_json()
    new_subhouse_type = SubHouseType(sub_house_type=data["sub_house_type"].upper())

    db.session.add(new_subhouse_type)
    db.session.commit()
    subhouse_type_schema = SubHouseTypeSchema(many=False)
    subhouse_type = subhouse_type_schema.dump(new_subhouse_type)

    return make_response(jsonify({"Sub House Type": subhouse_type}), 201)


@blueprint_api_subhouse_type.route("/api/v1/subhouse_type", methods=["GET"])
def get_all_subhouse_type():
    query_all_subhouse_type = SubHouseType.query.all()
    subhouse_type_schema = SubHouseTypeSchema(many=True)
    subhouse_type = subhouse_type_schema.dump(query_all_subhouse_type)
    return make_response(jsonify({"SubHouseType": subhouse_type}), 200)


@blueprint_api_subhouse_type.route(
    "/api/v1/subhouse_type/<int:ccn_subhouse_type>", methods=["GET"]
)
def get_subhouse_type(ccn_subhouse_type):
    query_subhouse_type = SubHouseType.query.filter_by(
        ccn_sub_house_type=ccn_subhouse_type
    ).first()
    subhouse_type_schema = SubHouseTypeSchema(many=False)
    subhouse_type = subhouse_type_schema.dump(query_subhouse_type)
    return make_response(jsonify({"SubHouseType": subhouse_type}), 200)


@blueprint_api_subhouse_type.route(
    "/api/v1/subhouse_type/<int:ccn_sub_house_type>", methods=["PUT"]
)
def put_subhouse_type(ccn_sub_house_type):
    data = request.get_json()
    query_subhouse_type = SubHouseType.query.filter_by(
        ccn_sub_house_type=ccn_sub_house_type
    ).first()
    query_subhouse_type.sub_house_type = data["sub_house_type"].upper()

    db.session.commit()
    subhouse_type_schema = SubHouseTypeSchema(many=False)
    subhouse_type_update = subhouse_type_schema.dump(query_subhouse_type)

    return make_response(jsonify({"Sub House Type Updated": subhouse_type_update}), 200)


@blueprint_api_subhouse_type.route(
    "/api/v1/subhouse_type/<int:ccn_subhouse_type>", methods=["DELETE"]
)
def delete_subhouse_type(ccn_subhouse_type):
    query_delete_subhouse_type = SubHouseType.query.filter_by(
        ccn_subhouse_type=ccn_subhouse_type
    ).first()
    db.session.delete(query_delete_subhouse_type)
    db.session.commit()
    return make_response(
        jsonify(
            {
                "Sub House Type Deleted": "The sub house type has been deleted succesfully"
            }
        ),
        200,
    )


@jwt_required
@blueprint_api_subhouse_type.route(
    "/definite-codes/subhouse-type", defaults={"path": ""}
)
@blueprint_api_subhouse_type.route("//<path:path>")
def subhouse_type(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
