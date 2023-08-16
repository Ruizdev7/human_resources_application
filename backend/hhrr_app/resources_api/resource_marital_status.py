import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_marital_status import MaritalStatus
from hhrr_app.schema.marital_status_schema import MaritalStatusSchema


blueprint_api_marital_status = Blueprint("api_marital_status", __name__, url_prefix="")


@blueprint_api_marital_status.route("/api/v1/marital_status", methods=["POST"])
def post_marital_status():
    data = request.get_json()
    new_marital_status = MaritalStatus(
        marital_status=data["marital_status"].upper()
    )

    db.session.add(new_marital_status)
    db.session.commit()
    marital_status_schema = MaritalStatusSchema(many=False)
    marital_status = marital_status_schema.dump(new_marital_status)

    return make_response(jsonify({"Martial Status": marital_status}), 201)


@blueprint_api_marital_status.route("/api/v1/marital_status", methods=["GET"])
def get_all_marital_status():
    query_all_marital_status = MaritalStatus.query.all()
    marital_status_schema = MaritalStatusSchema(many=True)
    marital_status = marital_status_schema.dump(query_all_marital_status)
    return make_response(jsonify({"MaritalStatus": marital_status}), 200)


@blueprint_api_marital_status.route("/api/v1/marital_status/<int:ccn_marital_status>", methods=["GET"])
def get_marital_status(ccn_marital_status):
    query_marital_status = MaritalStatus.query.filter_by(ccn_marital_status=ccn_marital_status).first()
    marital_status_schema = MaritalStatusSchema(many=False)
    marital_status = marital_status_schema.dump(query_marital_status)
    return make_response(jsonify({"MartialStatus": marital_status}), 200)


@blueprint_api_marital_status.route("/api/v1/marital_status/<int:ccn_marital_status>", methods=["PUT"])
def put_marital_status(ccn_marital_status):
    data = request.get_json()
    query_marital_status = MaritalStatus.query.filter_by(ccn_marital_status=ccn_marital_status).first()
    query_marital_status.marital_status = data["marital_status"].upper()
    
    db.session.commit()
    marital_status_schema = MaritalStatusSchema(many=False)
    marital_status_update = marital_status_schema.dump(query_marital_status)

    return make_response(jsonify({"Martial Status Updated": marital_status_update}), 200)


@blueprint_api_marital_status.route("/api/v1/marital_status/<int:ccn_marital_status>", methods=["DELETE"])
def delete_marital_status(ccn_marital_status):
    query_delete_marital_status = MaritalStatus.query.filter_by(ccn_marital_status=ccn_marital_status).first()
    db.session.delete(query_delete_marital_status)
    db.session.commit()
    return make_response(
        jsonify({"Martial Status Deleted": "The martial status has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_marital_status.route('/definite-codes/marital-status', defaults={'path': ''})
@blueprint_api_marital_status.route('//<path:path>')
def marital_status(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')