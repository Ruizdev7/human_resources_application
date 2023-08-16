import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_work_shift import WorkShift
from hhrr_app.schema.work_shift_schema import WorkShiftSchema


blueprint_api_work_shift = Blueprint("api_work_shift", __name__, url_prefix="")


@blueprint_api_work_shift.route("/api/v1/work_shift", methods=["POST"])
def post_work_shift():
    data = request.get_json()
    new_work_shift = WorkShift(description_work_shift=data["description_work_shift"].upper())

    db.session.add(new_work_shift)
    db.session.commit()
    work_shift_schema = WorkShiftSchema(many=False)
    work_shift = work_shift_schema.dump(new_work_shift)

    return make_response(jsonify({"Work Shift": work_shift}), 201)


@blueprint_api_work_shift.route("/api/v1/work_shift", methods=["GET"])
def get_all_work_shift():
    query_all_work_shift = WorkShift.query.all()
    work_shift_schema = WorkShiftSchema(many=True)
    work_shift = work_shift_schema.dump(query_all_work_shift)
    return make_response(jsonify({"WorkShift": work_shift}), 200)


@blueprint_api_work_shift.route(
    "/api/v1/work_shift/<int:ccn_work_shift>", methods=["GET"]
)
def get_work_shift(ccn_work_shift):
    query_work_shift = WorkShift.query.filter_by(ccn_work_shift=ccn_work_shift).first()
    work_shift_schema = WorkShiftSchema(many=False)
    work_shift = work_shift_schema.dump(query_work_shift)
    return make_response(jsonify({"WorkShift": work_shift}), 200)


@blueprint_api_work_shift.route(
    "/api/v1/work_shift/<int:ccn_work_shift>", methods=["PUT"]
)
def put_work_shift(ccn_work_shift):
    data = request.get_json()
    query_work_shift = WorkShift.query.filter_by(ccn_work_shift=ccn_work_shift).first()
    query_work_shift.description_work_shift = data["description_work_shift"].upper()

    db.session.commit()
    work_shift_schema = WorkShiftSchema(many=False)
    work_shift_update = work_shift_schema.dump(query_work_shift)

    return make_response(jsonify({"Work Shift Updated": work_shift_update}), 200)


@blueprint_api_work_shift.route(
    "/api/v1/work_shift/<int:ccn_work_shift>", methods=["DELETE"]
)
def delete_work_shift(ccn_work_shift):
    query_delete_work_shift = WorkShift.query.filter_by(
        ccn_work_shift=ccn_work_shift
    ).first()
    db.session.delete(query_delete_work_shift)
    db.session.commit()
    return make_response(
        jsonify({"Work Shift Deleted": "The work shift has been deleted succesfully"}),
        200,
    )


@jwt_required
@blueprint_api_work_shift.route('/definite-codes/work-shift', defaults={'path': ''})
@blueprint_api_work_shift.route('//<path:path>')
def work_shift(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')