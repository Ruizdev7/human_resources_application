import os
from flask import jsonify
from flask import request
from flask import Blueprint
from flask import make_response
from hhrr_app import create_app
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_eps import EPS
from hhrr_app.schema.eps_schema import EPSSchema


blueprint_api_eps = Blueprint("api_eps", __name__, url_prefix="")


@blueprint_api_eps.route("/api/v1/eps", methods=["POST"])
def post_eps():
    data = request.get_json()
    new_eps = EPS(
        code_eps=data["code_eps"],
        code_sgp_eps=data["code_sgp_eps"],
        nit_eps=data["nit_eps"],
        dig_ver=data["dig_ver"],
        description_eps=data["description_eps"].upper(),
    )

    db.session.add(new_eps)
    db.session.commit()
    eps_schema = EPSSchema(many=False)
    eps = eps_schema.dump(new_eps)

    return make_response(jsonify({"EPS": eps}), 201)


@blueprint_api_eps.route("/api/v1/eps", methods=["GET"])
def get_all_eps():
    query_all_eps = EPS.query.all()
    eps_schema = EPSSchema(many=True)
    eps = eps_schema.dump(query_all_eps)
    return make_response(jsonify({"EPS": eps}), 200)


@blueprint_api_eps.route("/api/v1/eps/<int:ccn_eps>", methods=["GET"])
def get_eps(ccn_eps):
    query_eps = EPS.query.filter_by(ccn_eps=ccn_eps).first()
    eps_schema = EPSSchema(many=False)
    eps = eps_schema.dump(query_eps)
    return make_response(jsonify({"EPS": eps}), 200)


@blueprint_api_eps.route("/api/v1/eps/<int:ccn_eps>", methods=["PUT"])
def put_eps(ccn_eps):
    data = request.get_json()
    query_eps = EPS.query.filter_by(ccn_eps=ccn_eps).first()
    query_eps.code_eps = data["code_eps"]
    query_eps.code_sgp_eps = data["code_sgp_eps"]
    query_eps.nit_eps = data["nit_eps"]
    query_eps.dig_ver = data["dig_ver"]
    query_eps.description_eps = data["description_eps"].upper()

    db.session.commit()
    eps_schema = EPSSchema(many=False)
    eps_update = eps_schema.dump(query_eps)

    return make_response(jsonify({"EPS Updated": eps_update}), 200)


@blueprint_api_eps.route("/api/v1/eps/<int:ccn_eps>", methods=["DELETE"])
def delete_eps(ccn_eps):
    query_delete_eps = EPS.query.filter_by(ccn_eps=ccn_eps).first()
    db.session.delete(query_delete_eps)
    db.session.commit()
    return make_response(
        jsonify({"EPS Deleted": "The EPS has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_eps.route('/definite-codes/eps', defaults={'path': ''})
@blueprint_api_eps.route('//<path:path>')
def eps(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')