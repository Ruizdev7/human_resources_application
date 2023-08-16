import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_age_range import AgeRange
from hhrr_app.schema.age_range_schema import AgeRangeSchema


blueprint_api_age_range = Blueprint("api_age_range", __name__, url_prefix="")


@blueprint_api_age_range.route("/api/v1/age_range", methods=["POST"])
def post_age_range():
    data = request.get_json()
    new_age_range = AgeRange(
        age_range=data["age_range"],
    )

    db.session.add(new_age_range)
    db.session.commit()
    age_range_schema = AgeRangeSchema(many=False)
    age_range = age_range_schema.dump(new_age_range)

    return make_response(jsonify({"Age Range": age_range}), 201)


@blueprint_api_age_range.route("/api/v1/age_range", methods=["GET"])
def get_all_age_range():
    query_all_age_range = AgeRange.query.all()
    age_range_schema = AgeRangeSchema(many=True)
    age_range = age_range_schema.dump(query_all_age_range)
    return make_response(jsonify({"AgeRange": age_range}), 200)


@blueprint_api_age_range.route("/api/v1/age_range/<int:ccn_age_range>", methods=["GET"])
def get_age_range(ccn_age_range):
    query_age_range = AgeRange.query.filter_by(ccn_age_range=ccn_age_range).first()
    age_range_schema = AgeRangeSchema(many=False)
    age_range = age_range_schema.dump(query_age_range)
    return make_response(jsonify({"AgeRange": age_range}), 200)


@blueprint_api_age_range.route("/api/v1/age_range/<int:ccn_age_range>", methods=["PUT"])
def put_age_range(ccn_age_range):
    data = request.get_json()
    query_age_range = AgeRange.query.filter_by(ccn_age_range=ccn_age_range).first()
    query_age_range.age_range = data["age_range"]
    
    db.session.commit()
    age_range_schema = AgeRangeSchema(many=False)
    age_range_update = age_range_schema.dump(query_age_range)

    return make_response(jsonify({"Age Range Updated": age_range_update}), 200)


@blueprint_api_age_range.route("/api/v1/age_range/<int:ccn_age_range>", methods=["DELETE"])
def delete_age_range(ccn_age_range):
    query_delete_age_range = AgeRange.query.filter_by(ccn_age_range=ccn_age_range).first()
    db.session.delete(query_delete_age_range)
    db.session.commit()
    return make_response(
        jsonify({"Age Range Deleted": "The age range has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_age_range.route('/definite-codes/age-ranges', defaults={'path': ''})
@blueprint_api_age_range.route('//<path:path>')
def age_ranges(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')