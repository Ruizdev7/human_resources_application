import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_aap import AAP
from hhrr_app.schema.aap_schema import AAPSchema


blueprint_api_aap = Blueprint("api_aap", __name__, url_prefix="")


@blueprint_api_aap.route("/api/v1/aap", methods=["POST"])
def post_aap():
    data = request.get_json()
    new_aap = AAP(
        code_aap=data["code_aap"],
        nit_aap=data["nit_aap"],
        dig_ver=data["dig_ver"],
        description_aap=data["description_aap"].upper(),
    )

    db.session.add(new_aap)
    db.session.commit()
    aap_schema = AAPSchema(many=False)
    aap = aap_schema.dump(new_aap)

    return make_response(jsonify({"AAP": aap}), 201)


@blueprint_api_aap.route("/api/v1/aap", methods=["GET"])
def get_all_aap():
    query_all_aap = AAP.query.all()
    aap_schema = AAPSchema(many=True)
    aap = aap_schema.dump(query_all_aap)
    return make_response(jsonify({"AAP": aap}), 200)


@blueprint_api_aap.route("/api/v1/aap/<int:ccn_aap>", methods=["GET"])
def get_aap(ccn_aap):
    query_aap = AAP.query.filter_by(ccn_aap=ccn_aap).first()
    aap_schema = AAPSchema(many=False)
    aap = aap_schema.dump(query_aap)
    return make_response(jsonify({"AAP": aap}), 200)


@blueprint_api_aap.route("/api/v1/aap/<int:ccn_aap>", methods=["PUT"])
def put_aap(ccn_aap):
    data = request.get_json()
    query_aap = AAP.query.filter_by(ccn_aap=ccn_aap).first()
    query_aap.code_aap = data["code_aap"]
    query_aap.nit_aap = data["nit_aap"]
    query_aap.dig_ver = data["dig_ver"]
    query_aap.description_aap = data["description_aap"].upper()

    db.session.commit()
    aap_schema = AAPSchema(many=False)
    aap_update = aap_schema.dump(query_aap)

    return make_response(jsonify({"AAP Updated": aap_update}), 200)


@blueprint_api_aap.route("/api/v1/aap/<int:ccn_aap>", methods=["DELETE"])
def delete_aap(ccn_aap):
    query_delete_aap = AAP.query.filter_by(ccn_aap=ccn_aap).first()
    db.session.delete(query_delete_aap)
    db.session.commit()
    return make_response(
        jsonify({"AAP Deleted": "The age range has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_aap.route('/definite-codes/aap', defaults={'path': ''})
@blueprint_api_aap.route('//<path:path>')
def aap(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')