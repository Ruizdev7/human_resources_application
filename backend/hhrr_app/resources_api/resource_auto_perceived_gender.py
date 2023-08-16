import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_auto_perceived_gender import AutoPerceivedGender
from hhrr_app.schema.auto_perceived_gender_schema import AutoPerceivedGenderSchema


blueprint_api_auto_perceived_gender = Blueprint("api_auto_perceived_gender", __name__, url_prefix="")


@blueprint_api_auto_perceived_gender.route("/api/v1/auto_perceived_gender", methods=["POST"])
def post_auto_perceived_gender():
    data = request.get_json()
    new_auto_perceived_gender = AutoPerceivedGender(
        auto_perceived_gender=data["auto_perceived_gender"].upper()
    )

    db.session.add(new_auto_perceived_gender)
    db.session.commit()
    auto_perceived_gender_schema = AutoPerceivedGenderSchema(many=False)
    auto_perceived_gender = auto_perceived_gender_schema.dump(new_auto_perceived_gender)

    return make_response(jsonify({"Type ID": auto_perceived_gender}), 201)


@blueprint_api_auto_perceived_gender.route("/api/v1/auto_perceived_gender", methods=["GET"])
def get_all_auto_perceived_gender():
    query_all_auto_perceived_gender = AutoPerceivedGender.query.all()
    auto_perceived_gender_schema = AutoPerceivedGenderSchema(many=True)
    auto_perceived_gender = auto_perceived_gender_schema.dump(query_all_auto_perceived_gender)
    return make_response(jsonify({"AutoPerceivedGender": auto_perceived_gender}), 200)


@blueprint_api_auto_perceived_gender.route("/api/v1/auto_perceived_gender/<int:ccn_auto_perceived_gender>", methods=["GET"])
def get_auto_perceived_gender(ccn_auto_perceived_gender):
    query_auto_perceived_gender = AutoPerceivedGender.query.filter_by(ccn_auto_perceived_gender=ccn_auto_perceived_gender).first()
    auto_perceived_gender_schema = AutoPerceivedGenderSchema(many=False)
    auto_perceived_gender = auto_perceived_gender_schema.dump(query_auto_perceived_gender)
    return make_response(jsonify({"AutoPerceivedGender": auto_perceived_gender}), 200)


@blueprint_api_auto_perceived_gender.route("/api/v1/auto_perceived_gender/<int:ccn_auto_perceived_gender>", methods=["PUT"])
def put_auto_perceived_gender(ccn_auto_perceived_gender):
    data = request.get_json()
    query_auto_perceived_gender = AutoPerceivedGender.query.filter_by(ccn_auto_perceived_gender=ccn_auto_perceived_gender).first()
    query_auto_perceived_gender.auto_perceived_gender = data["auto_perceived_gender"].upper()

    db.session.commit()
    auto_perceived_gender_schema = AutoPerceivedGenderSchema(many=False)
    auto_perceived_gender_update = auto_perceived_gender_schema.dump(query_auto_perceived_gender)

    return make_response(jsonify({"Auto Perceived Gender Updated": auto_perceived_gender_update}), 200)


@blueprint_api_auto_perceived_gender.route("/api/v1/auto_perceived_gender/<int:ccn_auto_perceived_gender>", methods=["DELETE"])
def delete_auto_perceived_gender(ccn_auto_perceived_gender):
    query_delete_auto_perceived_gender = AutoPerceivedGender.query.filter_by(ccn_auto_perceived_gender=ccn_auto_perceived_gender).first()
    db.session.delete(query_delete_auto_perceived_gender)
    db.session.commit()
    return make_response(
        jsonify({"Type Id Deleted": "The type id has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_auto_perceived_gender.route('/definite-codes/gender', defaults={'path': ''})
@blueprint_api_auto_perceived_gender.route('//<path:path>')
def gender(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')