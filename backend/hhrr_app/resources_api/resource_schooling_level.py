import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_schooling_level import SchoolingLevel
from hhrr_app.schema.schooling_level_schema import SchoolingLevelSchema


blueprint_api_schooling_level = Blueprint("api_schooling_level", __name__, url_prefix="")


@blueprint_api_schooling_level.route("/api/v1/schooling_level", methods=["POST"])
def post_schooling_level():
    data = request.get_json()
    new_schooling_level = SchoolingLevel(
        
        description_schooling_level=data["description_schooling_level"].upper()
    )

    db.session.add(new_schooling_level)
    db.session.commit()
    schooling_level_schema = SchoolingLevelSchema(many=False)
    schooling_level = schooling_level_schema.dump(new_schooling_level)

    return make_response(jsonify({"SchoolingLevel": schooling_level}), 201)


@blueprint_api_schooling_level.route("/api/v1/schooling_level", methods=["GET"])
def get_all_schooling_level():
    query_all_schooling_level = SchoolingLevel.query.all()
    schooling_level_schema = SchoolingLevelSchema(many=True)
    schooling_level = schooling_level_schema.dump(query_all_schooling_level)
    return make_response(jsonify({"SchoolingLevel": schooling_level}), 200)


@blueprint_api_schooling_level.route("/api/v1/schooling_level/<int:ccn_schooling_level>", methods=["GET"])
def get_schooling_level(ccn_schooling_level):
    query_schooling_level = SchoolingLevel.query.filter_by(ccn_schooling_level=ccn_schooling_level).first()
    schooling_level_schema = SchoolingLevelSchema(many=False)
    schooling_level = schooling_level_schema.dump(query_schooling_level)
    return make_response(jsonify({"SchoolingLevel": schooling_level}), 200)


@blueprint_api_schooling_level.route("/api/v1/schooling_level/<int:ccn_schooling_level>", methods=["PUT"])
def put_schooling_level(ccn_schooling_level):
    data = request.get_json()
    query_schooling_level = SchoolingLevel.query.filter_by(ccn_schooling_level=ccn_schooling_level).first()
    query_schooling_level.description_schooling_level = data["description_schooling_level"].upper()
    
    db.session.commit()
    schooling_level_schema = SchoolingLevelSchema(many=False)
    schooling_level_update = schooling_level_schema.dump(query_schooling_level)

    return make_response(jsonify({"Schooling Level Updated": schooling_level_update}), 200)


@blueprint_api_schooling_level.route("/api/v1/schooling_level/<int:ccn_schooling_level>", methods=["DELETE"])
def delete_schooling_level(ccn_schooling_level):
    query_delete_schooling_level = SchoolingLevel.query.filter_by(ccn_schooling_level=ccn_schooling_level).first()
    db.session.delete(query_delete_schooling_level)
    db.session.commit()
    return make_response(
        jsonify({"Schooling Level Deleted": "The schooling level has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_schooling_level.route('/definite-codes/schooling-level', defaults={'path': ''})
@blueprint_api_schooling_level.route('//<path:path>')
def schooling_level(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')