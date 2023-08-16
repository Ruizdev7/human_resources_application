import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required


from hhrr_app import db
from hhrr_app.models.tbl_psychoactive_substances import PsychoactiveSubstances
from hhrr_app.schema.psychoactive_substances_schema import PsychoactiveSubstancesSchema


blueprint_api_psychoactive_substances = Blueprint("api_psychoactive_substances", __name__, url_prefix="")


@blueprint_api_psychoactive_substances.route("/api/v1/psychoactive_substances", methods=["POST"])
def post_psychoactive_substances():
    data = request.get_json()
    new_psychoactive_substances = PsychoactiveSubstances(
        ccn_psychoactive_substances=data["ccn_psychoactive_substances"],
        psychoactive_substances=data["psychoactive_substances"].upper()
    )

    db.session.add(new_psychoactive_substances)
    db.session.commit()
    psychoactive_substances_schema = PsychoactiveSubstancesSchema(many=False)
    psychoactive_substances = psychoactive_substances_schema.dump(new_psychoactive_substances)

    return make_response(jsonify({"Psychoactive Substances": psychoactive_substances}), 201)


@blueprint_api_psychoactive_substances.route("/api/v1/psychoactive_substances", methods=["GET"])
def get_all_psychoactive_substances():
    query_all_psychoactive_substances = PsychoactiveSubstances.query.all()
    psychoactive_substances_schema = PsychoactiveSubstancesSchema(many=True)
    psychoactive_substances = psychoactive_substances_schema.dump(query_all_psychoactive_substances)
    return make_response(jsonify({"psychoactive_substances": psychoactive_substances}), 200)

@blueprint_api_psychoactive_substances.route("/api/v1/psychoactive_substances/<int:ccn_psychoactive_substances>", methods=["GET"])
def get_psychoactive_substances(ccn_psychoactive_substances):
    query_psychoactive_substances = PsychoactiveSubstances.query.filter_by(ccn_psychoactive_substances=ccn_psychoactive_substances).first()
    psychoactive_substances_schema = PsychoactiveSubstancesSchema(many=False)
    psychoactive_substances = psychoactive_substances_schema.dump(query_psychoactive_substances)
    return make_response(jsonify({"Psychoactive Substances": psychoactive_substances}), 200)


@blueprint_api_psychoactive_substances.route("/api/v1/psychoactive_substances/<int:ccn_psychoactive_substances>", methods=["PUT"])
def put_psychoactive_substances(ccn_psychoactive_substances):
    data = request.get_json()
    query_psychoactive_substances = PsychoactiveSubstances.query.filter_by(ccn_psychoactive_substances=ccn_psychoactive_substances).first()
    query_psychoactive_substances.ccn_psychoactive_substances = data["ccn_psychoactive_substances"]
    query_psychoactive_substances.psychoactive_substances = data["psychoactive_substances"].upper()
    
    db.session.commit()
    psychoactive_substances_schema = PsychoactiveSubstancesSchema(many=False)
    psychoactive_substances_update = psychoactive_substances_schema.dump(query_psychoactive_substances)

    return make_response(jsonify({"Psychoactive Substances Updated": psychoactive_substances_update}), 200)


@blueprint_api_psychoactive_substances.route("/api/v1/psychoactive_substances/<int:ccn_psychoactive_substances>", methods=["DELETE"])
def delete_psychoactive_substances(ccn_psychoactive_substances):
    query_delete_psychoactive_substances = PsychoactiveSubstances.query.filter_by(ccn_psychoactive_substances=ccn_psychoactive_substances).first()
    db.session.delete(query_delete_psychoactive_substances)
    db.session.commit()
    return make_response(
        jsonify({"Psychoactive Substances Deleted": "The psychoactive substances has been deleted succesfully"}), 200
    )
