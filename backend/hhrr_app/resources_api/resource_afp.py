import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_afp import AFP
from hhrr_app.schema.afp_schema import AFPSchema


blueprint_api_afp = Blueprint("api_afp", __name__, url_prefix="")


@blueprint_api_afp.route("/api/v1/afp", methods=["POST"])
def post_afp():
    data = request.get_json()
    new_afp = AFP(
        code_afp=data["code_afp"],
        nit_afp=data["nit_afp"],
        dig_ver=data["dig_ver"],
        description_afp=data["description_afp"].upper(),
    )

    db.session.add(new_afp)
    db.session.commit()
    afp_schema = AFPSchema(many=False)
    afp = afp_schema.dump(new_afp)

    return make_response(jsonify({"AFP ": afp}), 201)


@blueprint_api_afp.route("/api/v1/afp", methods=["GET"])
def get_all_afp():
    query_all_afp = AFP.query.all()
    afp_schema = AFPSchema(many=True)
    afp = afp_schema.dump(query_all_afp)
    return make_response(jsonify({"AFP": afp}), 200)


@blueprint_api_afp.route("/api/v1/afp/<int:ccn_afp>", methods=["GET"])
def get_afp(ccn_afp):
    query_afp = AFP.query.filter_by(ccn_afp=ccn_afp).first()
    afp_schema = AFPSchema(many=False)
    afp = afp_schema.dump(query_afp)
    return make_response(jsonify({"AFP": afp}), 200)


@blueprint_api_afp.route("/api/v1/afp/<int:ccn_afp>", methods=["PUT"])
def put_afp(ccn_afp):
    data = request.get_json()
    query_afp = AFP.query.filter_by(ccn_afp=ccn_afp).first()
    query_afp.code_afp = data["code_afp"]
    query_afp.nit_afp = data["nit_afp"]
    query_afp.dig_ver = data["dig_ver"]
    query_afp.description_afp = data["description_afp"].upper()

    db.session.commit()
    afp_schema = AFPSchema(many=False)
    afp_update = afp_schema.dump(query_afp)

    return make_response(jsonify({"AFP Updated": afp_update}), 200)


@blueprint_api_afp.route("/api/v1/afp/<int:ccn_afp>", methods=["DELETE"])
def delete_afp(ccn_afp):
    query_delete_afp = AFP.query.filter_by(ccn_afp=ccn_afp).first()
    db.session.delete(query_delete_afp)
    db.session.commit()
    return make_response(
        jsonify({"AFP Deleted": "The AFP has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_afp.route('/definite-codes/afp', defaults={'path': ''})
@blueprint_api_afp.route('//<path:path>')
def afp(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')