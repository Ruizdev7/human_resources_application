import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_rh import RH
from hhrr_app.schema.rh_schema import RHSchema


blueprint_api_rh = Blueprint("api_rh", __name__, url_prefix="")


@blueprint_api_rh.route("/api/v1/rh", methods=["POST"])
def post_rh():
    data = request.get_json()
    
    new_rh = RH(
        rh=data["rh"].upper()
    )

    db.session.add(new_rh)
    db.session.commit()
    rh_schema = RHSchema(many=False)
    rh = rh_schema.dump(new_rh)

    return make_response(jsonify({"RH": rh}), 201)


@blueprint_api_rh.route("/api/v1/rh", methods=["GET"])
def get_all_rh():
    query_all_rh = RH.query.all()
    rh_schema = RHSchema(many=True)
    rh = rh_schema.dump(query_all_rh)
    return make_response(jsonify({"RH": rh}), 200)


@blueprint_api_rh.route("/api/v1/rh/<int:ccn_rh>", methods=["GET"])
def get_rh(ccn_rh):
    query_rh = RH.query.filter_by(ccn_rh=ccn_rh).first()
    rh_schema = RHSchema(many=False)
    rh = rh_schema.dump(query_rh)
    return make_response(jsonify({"RH": rh}), 200)


@blueprint_api_rh.route("/api/v1/rh/<int:ccn_rh>", methods=["PUT"])
def put_rh(ccn_rh):
    data = request.get_json()
    query_rh = RH.query.filter_by(ccn_rh=ccn_rh).first()
    query_rh.rh = data["rh"].upper()
    
    db.session.commit()
    rh_schema = RHSchema(many=False)
    rh_update = rh_schema.dump(query_rh)

    return make_response(jsonify({"RH updated": rh_update}), 200)


@blueprint_api_rh.route("/api/v1/rh/<int:ccn_rh>", methods=["DELETE"])
def delete_rh(ccn_rh):
    query_delete_rh = RH.query.filter_by(ccn_rh=ccn_rh).first()
    db.session.delete(query_delete_rh)
    db.session.commit()
    return make_response(
        jsonify({"RH Deleted": "The rh has been deleted succesfully"}), 200
    )

@jwt_required
@blueprint_api_rh.route('/definite-codes/rh', defaults={'path': ''})
@blueprint_api_rh.route('//<path:path>')
def rh(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')