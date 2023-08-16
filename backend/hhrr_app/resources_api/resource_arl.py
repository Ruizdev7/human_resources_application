import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_arl import ARL
from hhrr_app.schema.arl_schema import ARLSchema


blueprint_api_arl = Blueprint("api_arl", __name__, url_prefix="")


@blueprint_api_arl.route("/api/v1/arl", methods=["POST"])
def post_age_range():
    data = request.get_json()
    new_arl = ARL(
        code_arl=data["code_arl"],
        nit_arl=data["nit_arl"],
        dig_ver=data["dig_ver"],
        description_arl=data["description_arl"].upper(),
    )

    db.session.add(new_arl)
    db.session.commit()
    arl_schema = ARLSchema(many=False)
    arl = arl_schema.dump(new_arl)

    return make_response(jsonify({"ARL": arl}), 201)


@blueprint_api_arl.route("/api/v1/arl", methods=["GET"])
def get_all_arl():
    query_all_arl = ARL.query.all()
    arl_schema = ARLSchema(many=True)
    arl = arl_schema.dump(query_all_arl)
    return make_response(jsonify({"ARL": arl}), 200)


@blueprint_api_arl.route("/api/v1/arl/<int:ccn_arl>", methods=["GET"])
def get_arl(ccn_arl):
    query_arl = ARL.query.filter_by(ccn_arl=ccn_arl).first()
    arl_schema = ARLSchema(many=False)
    arl = arl_schema.dump(query_arl)
    return make_response(jsonify({"ARL": arl}), 200)


@blueprint_api_arl.route("/api/v1/arl/<int:ccn_arl>", methods=["PUT"])
def put_arl(ccn_arl):
    data = request.get_json()
    query_arl = ARL.query.filter_by(ccn_arl=ccn_arl).first()
    query_arl.code_arl = data["code_arl"]
    query_arl.nit_arl = data["nit_arl"]
    query_arl.dig_ver = data["dig_ver"]
    query_arl.description_arl = data["description_arl"].upper()

    db.session.commit()
    arl_schema = ARLSchema(many=False)
    arl_update = arl_schema.dump(query_arl)

    return make_response(jsonify({"ARL Updated": arl_update}), 200)


@blueprint_api_arl.route("/api/v1/arl/<int:ccn_arl>", methods=["DELETE"])
def delete_arl(ccn_arl):
    query_delete_arl = ARL.query.filter_by(ccn_arl=ccn_arl).first()
    db.session.delete(query_delete_arl)
    db.session.commit()
    return make_response(
        jsonify({"ARL Deleted": "The ARL has been deleted succesfully"}), 200
    )

@jwt_required
@blueprint_api_arl.route('/definite-codes/arl', defaults={'path': ''})
@blueprint_api_arl.route('//<path:path>')
def arl(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')