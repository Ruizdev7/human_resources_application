import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_ccf import CCF
from hhrr_app.schema.ccf_schema import CCFSchema


blueprint_api_ccf = Blueprint("api_ccf", __name__, url_prefix="")


@blueprint_api_ccf.route("/api/v1/ccf", methods=["POST"])
def post_ccf():
    data = request.get_json()
    new_ccf = CCF(
        code_ccf=data["code_ccf"],
        nit_ccf=data["nit_ccf"],
        dig_ver=data["dig_ver"],
        description_ccf=data["description_ccf"].upper(),
    )

    db.session.add(new_ccf)
    db.session.commit()
    ccf_schema = CCFSchema(many=False)
    ccf = ccf_schema.dump(new_ccf)

    return make_response(jsonify({"CCF": ccf}), 201)


@blueprint_api_ccf.route("/api/v1/ccf", methods=["GET"])
def get_all_ccf():
    query_all_ccf = CCF.query.all()
    ccf_schema = CCFSchema(many=True)
    ccf = ccf_schema.dump(query_all_ccf)
    return make_response(jsonify({"CCF": ccf}), 200)


@blueprint_api_ccf.route("/api/v1/ccf/<int:ccn_ccf>", methods=["GET"])
def get_ccf(ccn_ccf):
    query_ccf = CCF.query.filter_by(ccn_ccf=ccn_ccf).first()
    ccf_schema = CCFSchema(many=False)
    ccf = ccf_schema.dump(query_ccf)
    return make_response(jsonify({"CCF": ccf}), 200)


@blueprint_api_ccf.route("/api/v1/ccf/<int:ccn_ccf>", methods=["PUT"])
def put_ccf(ccn_ccf):
    data = request.get_json()
    query_ccf = CCF.query.filter_by(ccn_ccf=ccn_ccf).first()
    query_ccf.code_ccf = data["code_ccf"]
    query_ccf.nit_ccf = data["nit_ccf"]
    query_ccf.dig_ver = data["dig_ver"]
    query_ccf.description_ccf = data["description_ccf"].upper()

    db.session.commit()
    ccf_schema = CCFSchema(many=False)
    ccf_update = ccf_schema.dump(query_ccf)

    return make_response(jsonify({"CCF Updated": ccf_update}), 200)


@blueprint_api_ccf.route("/api/v1/ccf/<int:ccn_ccf>", methods=["DELETE"])
def delete_ccf(ccn_ccf):
    query_delete_ccf = CCF.query.filter_by(ccn_ccf=ccn_ccf).first()
    db.session.delete(query_delete_ccf)
    db.session.commit()
    return make_response(
        jsonify({"CCF Deleted": "The ccf has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_ccf.route('/definite-codes/ccf', defaults={'path': ''})
@blueprint_api_ccf.route('//<path:path>')
def ccf(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')