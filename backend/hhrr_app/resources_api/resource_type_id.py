import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_type_id import TypeId
from hhrr_app.schema.type_id_schema import TypeIdSchema


blueprint_api_type_id = Blueprint("api_type_id", __name__, url_prefix="")


@blueprint_api_type_id.route("/api/v1/type_id", methods=["POST"])
def post_type_id():
    data = request.get_json()
    new_type_id = TypeId(
        type_id=data["type_id"],
        description_type_id=data["description_type_id"].upper(),
    )

    db.session.add(new_type_id)
    db.session.commit()
    type_id_schema = TypeIdSchema(many=False)
    type_id = type_id_schema.dump(new_type_id)

    return make_response(jsonify({"Type ID": type_id}), 201)


@blueprint_api_type_id.route("/api/v1/type_id", methods=["GET"])
def get_all_type_id():
    query_all_type_id = TypeId.query.all()
    type_id_schema = TypeIdSchema(many=True)
    type_id = type_id_schema.dump(query_all_type_id)
    return make_response(jsonify({"TypeID": type_id}), 200)


@blueprint_api_type_id.route("/api/v1/type_id/<int:ccn_type_id>", methods=["GET"])
def get_type_id(ccn_type_id):
    query_type_id = TypeId.query.filter_by(ccn_type_id=ccn_type_id).first()
    type_id_schema = TypeIdSchema(many=False)
    type_id = type_id_schema.dump(query_type_id)
    return make_response(jsonify({"TypeID": type_id}), 200)


@blueprint_api_type_id.route("/api/v1/type_id/<int:ccn_type_id>", methods=["PUT"])
def put_type_id(ccn_type_id):
    data = request.get_json()
    query_type_id = TypeId.query.filter_by(ccn_type_id=ccn_type_id).first()
    query_type_id.type_id = data["type_id"]
    query_type_id.description_type_id = data["description_type_id"].upper()

    db.session.commit()
    type_id_schema = TypeIdSchema(many=False)
    type_id_update = type_id_schema.dump(query_type_id)

    return make_response(jsonify({"Type ID Updated": type_id_update}), 200)


@blueprint_api_type_id.route("/api/v1/type_id/<int:ccn_type_id>", methods=["DELETE"])
def delete_type_id(ccn_type_id):
    query_delete_type_id = TypeId.query.filter_by(ccn_type_id=ccn_type_id).first()
    db.session.delete(query_delete_type_id)
    db.session.commit()
    return make_response(
        jsonify({"Type Id Deleted": "The type id has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_type_id.route('/definite-codes/types-id', defaults={'path': ''})
@blueprint_api_type_id.route('//<path:path>')
def types_id(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')