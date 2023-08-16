import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required


from hhrr_app import db
from hhrr_app.models.tbl_diseases import Diseases
from hhrr_app.schema.diseases_schema import DiseasesSchema


blueprint_api_diseases = Blueprint("api_diseases", __name__, url_prefix="")


@blueprint_api_diseases.route("/api/v1/diseases", methods=["POST"])
def post_diseases():
    data = request.get_json()
    new_diseases = Diseases(
        ccn_diseases=data["ccn_diseases"],
        diseases=data["diseases"].upper()
    )

    db.session.add(new_diseases)
    db.session.commit()
    diseases_schema = DiseasesSchema(many=False)
    diseases = diseases_schema.dump(new_diseases)

    return make_response(jsonify({"Diseases": diseases}), 201)


@blueprint_api_diseases.route("/api/v1/diseases", methods=["GET"])
def get_all_diseases():
    query_all_diseases = Diseases.query.all()
    diseases_schema = DiseasesSchema(many=True)
    diseases = diseases_schema.dump(query_all_diseases)
    return make_response(jsonify({"Diseases": diseases}), 200)


@blueprint_api_diseases.route("/api/v1/diseases/<int:ccn_diseases>", methods=["GET"])
def get_diseases(ccn_diseases):
    query_diseases = Diseases.query.filter_by(ccn_diseases=ccn_diseases).first()
    diseases_schema = DiseasesSchema(many=False)
    diseases = diseases_schema.dump(query_diseases)
    return make_response(jsonify({"Diseases": diseases}), 200)


@blueprint_api_diseases.route("/api/v1/diseases/<int:ccn_diseases>", methods=["PUT"])
def put_diseases(ccn_diseases):
    data = request.get_json()
    query_diseases = Diseases.query.filter_by(ccn_diseases=ccn_diseases).first()
    query_diseases.ccn_diseases = data["ccn_diseases"]
    query_diseases.diseases = data["diseases"].upper()
    
    db.session.commit()
    diseases_schema = DiseasesSchema(many=False)
    diseases_update = diseases_schema.dump(query_diseases)

    return make_response(jsonify({"Diseases Updated": diseases_update}), 200)


@blueprint_api_diseases.route("/api/v1/diseases/<int:ccn_diseases>", methods=["DELETE"])
def delete_diseases(ccn_diseases):
    query_delete_diseases = Diseases.query.filter_by(ccn_diseases=ccn_diseases).first()
    db.session.delete(query_delete_diseases)
    db.session.commit()
    return make_response(
        jsonify({"Diseases Deleted": "The diseases has been deleted succesfully"}), 200
    )


#@jwt_required
#@blueprint_api_emergency_contact_details.route('/emergency-contact-details', defaults={'path': ''})
#@blueprint_api_emergency_contact_details.route('//<path:path>')
#def emergency_contact_details(path):
#    app = create_app()
#    if path != "" and os.path.exists(app.static_folder + "/" + path):
#        return send_from_directory(app.static_folder, path)
#    else:
#        return send_from_directory(app.static_folder, 'index.html')