import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_history import History
from hhrr_app.schema.history_schema import HistoryEmployeeSchema


blueprint_api_history = Blueprint("api_history", __name__, url_prefix="")


@blueprint_api_history.route("/api/v1/history", methods=["POST"])
def post_history():
    time_details = data["final_date"] - data["initial_date"]
    data = request.get_json()
    new_history = History(
        ccn_employee=data["ccn_employee"],
        ccn_manager=data["ccn_manager"],
        ccn_inmediate_boss=data["ccn_inmediate_boss"],
        ccn_last_role=data["ccn_last_role"],
        ccn_new_role=data["ccn_new_role"],
        initial_date =data["initial_date"],
        final_date =data["final_date"],
        time_details = time_details,
        employee_picture =data["employee_picture"],
    )

    db.session.add(new_history)
    db.session.commit()
    history_schema = HistoryEmployeeSchema(many=False)
    history = history_schema.dump(new_history)

    return make_response(jsonify({"History": history}), 201)

@blueprint_api_history.route("/api/v1/history", methods=["GET"])
def get_all_history():
    query_all_history = History.query.all()
    history_schema = HistoryEmployeeSchema(many=True)
    history = history_schema.dump(query_all_history)
    return make_response(jsonify({"History": history}), 200)

@blueprint_api_history.route("/api/v1/history/<int:ccn_history>", methods=["GET"])
def get_history(ccn_history):
    query_history = History.query.filter_by(ccn_history=ccn_history).first()
    history_schema = HistoryEmployeeSchema(many=False)
    history = history_schema.dump(query_history)
    return make_response(jsonify({"History": history}), 200)

@blueprint_api_history.route("/api/v1/history/<int:ccn_history>", methods=["PUT"])
def put_history(ccn_history):
    data = request.get_json()
    query_history = History.query.filter_by(ccn_history=ccn_history).first()
    query_history.history = data["history"].upper()

    
    db.session.commit()
    history_schema = HistoryEmployeeSchema(many=False)
    history_update = history_schema.dump(query_history)

    return make_response(jsonify({"History Updated": history_update}), 200)
