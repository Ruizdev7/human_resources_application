import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_country import Country
from hhrr_app.schema.country_schema import CountrySchema


blueprint_api_country = Blueprint("api_country", __name__, url_prefix="")


@blueprint_api_country.route("/api/v1/country", methods=["POST"])
def post_country():
    data = request.get_json()
    new_country = Country(
        id_country=data["id_country"],
        description_country=data["description_country"].upper()
    )

    db.session.add(new_country)
    db.session.commit()
    country_schema = CountrySchema(many=False)
    country = country_schema.dump(new_country)

    return make_response(jsonify({"Country": country}), 201)


@blueprint_api_country.route("/api/v1/country", methods=["GET"])
def get_all_country():
    query_all_country = Country.query.all()
    country_schema = CountrySchema(many=True)
    country = country_schema.dump(query_all_country)
    return make_response(jsonify({"Country": country}), 200)


@blueprint_api_country.route("/api/v1/country/<int:ccn_country>", methods=["GET"])
def get_country(ccn_country):
    query_country = Country.query.filter_by(ccn_country=ccn_country).first()
    country_schema = CountrySchema(many=False)
    country = country_schema.dump(query_country)
    return make_response(jsonify({"Country": country}), 200)


@blueprint_api_country.route("/api/v1/country/<int:ccn_country>", methods=["PUT"])
def put_country(ccn_country):
    data = request.get_json()
    query_country = Country.query.filter_by(ccn_country=ccn_country).first()
    query_country.id_country=data["id_country"]
    query_country.description_country=data["description_country"].upper()
    
    db.session.commit()
    country_schema = CountrySchema(many=False)
    country_update = country_schema.dump(query_country)

    return make_response(jsonify({"Country Updated": country_update}), 200)


@blueprint_api_country.route("/api/v1/country/<int:ccn_country>", methods=["DELETE"])
def delete_country(ccn_country):
    query_delete_country = Country.query.filter_by(ccn_country=ccn_country).first()
    db.session.delete(query_delete_country)
    db.session.commit()
    return make_response(
        jsonify({"Country Deleted": "The country has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_country.route('/definite-codes/countries', defaults={'path': ''})
@blueprint_api_country.route('//<path:path>')
def countries(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')