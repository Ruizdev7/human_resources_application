import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_race import Race
from hhrr_app.schema.race_schema import RaceSchema


blueprint_api_race = Blueprint("api_race", __name__, url_prefix="")


@blueprint_api_race.route("/api/v1/race", methods=["POST"])
def post_race():
    data = request.get_json()
    new_race = Race(
        description_race=data["description_race"].upper()
    )

    db.session.add(new_race)
    db.session.commit()
    race_schema = RaceSchema(many=False)
    race = race_schema.dump(new_race)

    return make_response(jsonify({"Race": race}), 201)


@blueprint_api_race.route("/api/v1/race", methods=["GET"])
def get_all_race():
    query_all_race = Race.query.all()
    race_schema = RaceSchema(many=True)
    race = race_schema.dump(query_all_race)
    return make_response(jsonify({"Race": race}), 200)


@blueprint_api_race.route("/api/v1/race/<int:ccn_race>", methods=["GET"])
def get_race(ccn_race):
    query_race = Race.query.filter_by(ccn_race=ccn_race).first()
    race_schema = RaceSchema(many=False)
    race = race_schema.dump(query_race)
    return make_response(jsonify({"Race": race}), 200)


@blueprint_api_race.route("/api/v1/race/<int:ccn_race>", methods=["PUT"])
def put_race(ccn_race):
    data = request.get_json()
    query_race = Race.query.filter_by(ccn_race=ccn_race).first()
    query_race.description_race = data["description_race"].upper()
    
    db.session.commit()
    race_schema = RaceSchema(many=False)
    race_update = race_schema.dump(query_race)

    return make_response(jsonify({"Race Updated": race_update}), 200)


@blueprint_api_race.route("/api/v1/race/<int:ccn_race>", methods=["DELETE"])
def delete_race(ccn_race):
    query_delete_race = Race.query.filter_by(ccn_race=ccn_race).first()
    db.session.delete(query_delete_race)
    db.session.commit()
    return make_response(
        jsonify({"Race Deleted": "The race has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_race.route('/definite-codes/race', defaults={'path': ''})
@blueprint_api_race.route('//<path:path>')
def race(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')