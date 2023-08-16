import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required


from hhrr_app import db
from hhrr_app.models.tbl_medicines import Medicines
from hhrr_app.schema.medicines_schema import MedicinesSchema


blueprint_api_medicines = Blueprint("api_medicines", __name__, url_prefix="")


@blueprint_api_medicines.route("/api/v1/medicines", methods=["POST"])
def post_medicines():
    data = request.get_json()
    new_medicines = Medicines(
        ccn_medicines=data["ccn_medicines"],
        medicines=data["medicines"].upper()
    )

    db.session.add(new_medicines)
    db.session.commit()
    medicines_schema = MedicinesSchema(many=False)
    medicines = medicines_schema.dump(new_medicines)

    return make_response(jsonify({"Medicines": medicines}), 201)


@blueprint_api_medicines.route("/api/v1/medicines", methods=["GET"])
def get_all_medicines():
    query_all_medicines = Medicines.query.all()
    medicines_schema = MedicinesSchema(many=True)
    medicines = medicines_schema.dump(query_all_medicines)
    return make_response(jsonify({"Medicines": medicines}), 200)

@blueprint_api_medicines.route("/api/v1/medicines/<int:ccn_medicines>", methods=["GET"])
def get_medicines(ccn_medicines):
    query_medicines = Medicines.query.filter_by(ccn_medicines=ccn_medicines).first()
    medicines_schema = MedicinesSchema(many=False)
    medicines = medicines_schema.dump(query_medicines)
    return make_response(jsonify({"Medicines": medicines}), 200)


@blueprint_api_medicines.route("/api/v1/medicines/<int:ccn_medicines>", methods=["PUT"])
def put_medicines(ccn_medicines):
    data = request.get_json()
    query_medicines = Medicines.query.filter_by(ccn_medicines=ccn_medicines).first()
    query_medicines.ccn_medicines = data["ccn_medicines"]
    query_medicines.medicines = data["medicines"].upper()
    
    db.session.commit()
    medicines_schema = MedicinesSchema(many=False)
    medicines_update = medicines_schema.dump(query_medicines)

    return make_response(jsonify({"Medicines Updated": medicines_update}), 200)


@blueprint_api_medicines.route("/api/v1/medicines/<int:ccn_medicines>", methods=["DELETE"])
def delete_medicines(ccn_medicines):
    query_delete_medicines = Medicines.query.filter_by(ccn_medicines=ccn_medicines).first()
    db.session.delete(query_delete_medicines)
    db.session.commit()
    return make_response(
        jsonify({"Medicines Deleted": "The medicines has been deleted succesfully"}), 200
    )
