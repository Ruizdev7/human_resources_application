import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_type_affiliation import TypeAffiliation
from hhrr_app.schema.type_affiliation_schema import TypeAffiliationSchema


blueprint_api_type_affiliation = Blueprint(
    "api_type_affiliation", __name__, url_prefix=""
)


@blueprint_api_type_affiliation.route("/api/v1/type_affiliation", methods=["POST"])
def post_type_affiliation():
    data = request.get_json()
    new_type_affiliation = TypeAffiliation(
        affiliation_code=data["affiliation_code"],
        description_type_affiliation=data["description_type_affiliation"].upper(),
    )

    db.session.add(new_type_affiliation)
    db.session.commit()
    type_affiliation_schema = TypeAffiliationSchema(many=False)
    type_affiliation = type_affiliation_schema.dump(new_type_affiliation)

    return make_response(jsonify({"Type Affiliation ": type_affiliation}), 201)


@blueprint_api_type_affiliation.route("/api/v1/type_affiliation", methods=["GET"])
def get_all_type_affiliation():
    query_all_type_affiliation = TypeAffiliation.query.all()
    type_affiliation_schema = TypeAffiliationSchema(many=True)
    type_affiliation = type_affiliation_schema.dump(query_all_type_affiliation)
    return make_response(jsonify({"TypeAffiliation": type_affiliation}), 200)


@blueprint_api_type_affiliation.route(
    "/api/v1/type_affiliation/<int:ccn_type_affiliation>", methods=["GET"]
)
def get_type_affiliation(ccn_type_affiliation):
    query_type_affiliation = TypeAffiliation.query.filter_by(
        ccn_type_affiliation=ccn_type_affiliation
    ).first()
    type_affiliation_schema = TypeAffiliationSchema(many=False)
    type_affiliation = type_affiliation_schema.dump(query_type_affiliation)
    return make_response(jsonify({"TypeAffiliation": type_affiliation}), 200)


@blueprint_api_type_affiliation.route(
    "/api/v1/type_affiliation/<int:ccn_type_affiliation>", methods=["PUT"]
)
def put_type_affiliation(ccn_type_affiliation):
    data = request.get_json()
    query_type_affiliation = TypeAffiliation.query.filter_by(
        ccn_type_affiliation=ccn_type_affiliation
    ).first()
    query_type_affiliation.affiliation_code = data["affiliation_code"]
    query_type_affiliation.description_type_affiliation = data[
        "description_type_affiliation"
    ].upper()

    db.session.commit()
    type_affiliation_schema = TypeAffiliationSchema(many=False)
    type_affiliation_update = type_affiliation_schema.dump(query_type_affiliation)

    return make_response(
        jsonify({"Type Affiliation Updated": type_affiliation_update}), 200
    )


@blueprint_api_type_affiliation.route(
    "/api/v1/type_affiliation/<int:ccn_type_affiliation>", methods=["DELETE"]
)
def delete_type_affiliation(ccn_type_affiliation):
    query_delete_type_affiliation = TypeAffiliation.query.filter_by(
        ccn_type_affiliation=ccn_type_affiliation
    ).first()
    db.session.delete(query_delete_type_affiliation)
    db.session.commit()
    return make_response(
        jsonify(
            {
                "Type Affiliation Deleted": "The type affiliation has been deleted succesfully"
            }
        ),
        200,
    )


@jwt_required
@blueprint_api_type_affiliation.route('/definite-codes/type-affiliation', defaults={'path': ''})
@blueprint_api_type_affiliation.route('//<path:path>')
def type_affiliation(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')