import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required


from hhrr_app import db
from backend.hhrr_app.models.tbl_allergies import Allergies
from backend.hhrr_app.schema.allergies_schema import AllergiesSchema


blueprint_api_allergies = Blueprint("api_allergies", __name__, url_prefix="")


@blueprint_api_allergies.route("/api/v1/allergies", methods=["POST"])
def post_allergies():
    data = request.get_json()
    new_allergies = Allergies(
        ccn_allergies=data["ccn_allergies"],
        allergies=data["allergies"].upper()
    )

    db.session.add(new_allergies)
    db.session.commit()
    allergies_schema = AllergiesSchema(many=False)
    allergies = allergies_schema.dump(new_allergies)

    return make_response(jsonify({"Allergies": allergies}), 201)


@blueprint_api_allergies.route("/api/v1/allergies", methods=["GET"])
def get_all_allergies():
    query_all_allergies = Allergies.query.all()
    allergies_schema = AllergiesSchema(many=True)
    allergies = allergies_schema.dump(query_all_allergies)
    return make_response(jsonify({"Allergies": allergies}), 200)

@blueprint_api_allergies.route("/api/v1/allergies/<int:ccn_allergies>", methods=["GET"])
def get_allergies(ccn_allergies):
    query_allergies = Allergies.query.filter_by(ccn_allergies=ccn_allergies).first()
    allergies_schema = AllergiesSchema(many=False)
    allergies = allergies_schema.dump(query_allergies)
    return make_response(jsonify({"Allergies": allergies}), 200)


@blueprint_api_allergies.route("/api/v1/allergies/<int:ccn_allergies>", methods=["PUT"])
def put_allergies(ccn_allergies):
    data = request.get_json()
    query_allergies = Allergies.query.filter_by(ccn_allergies=ccn_allergies).first()
    query_allergies.ccn_allergies = data["ccn_allergies"]
    query_allergies.allergies = data["allergies"].upper()
    
    db.session.commit()
    allergies_schema = AllergiesSchema(many=False)
    allergies_update = allergies_schema.dump(query_allergies)

    return make_response(jsonify({"Allergies Updated": allergies_update}), 200)


@blueprint_api_allergies.route("/api/v1/allergies/<int:ccn_allergies>", methods=["DELETE"])
def delete_allergies(ccn_allergies):
    query_delete_allergies = Allergies.query.filter_by(ccn_allergies=ccn_allergies).first()
    db.session.delete(query_delete_allergies)
    db.session.commit()
    return make_response(
        jsonify({"Allergies Deleted": "The allergies has been deleted succesfully"}), 200
    )
