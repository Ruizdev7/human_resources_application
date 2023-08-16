import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_type_contributor import TypeContributor
from hhrr_app.schema.type_contributor_schema import TypeContributorSchema


blueprint_api_type_contributor = Blueprint(
    "api_type_contributor", __name__, url_prefix=""
)


@blueprint_api_type_contributor.route("/api/v1/type_contributor", methods=["POST"])
def post_type_contributor():
    data = request.get_json()
    new_type_contributor = TypeContributor(
        contributor_code=data["contributor_code"],
        description_type_contributor=data["description_type_contributor"].upper(),
    )

    db.session.add(new_type_contributor)
    db.session.commit()
    type_contributor_schema = TypeContributorSchema(many=False)
    type_contributor = type_contributor_schema.dump(new_type_contributor)

    return make_response(jsonify({"Type Contributor ": type_contributor}), 201)


@blueprint_api_type_contributor.route("/api/v1/type_contributor", methods=["GET"])
def get_all_type_contributor():
    query_all_type_contributor = TypeContributor.query.all()
    type_contributor_schema = TypeContributorSchema(many=True)
    type_contributor = type_contributor_schema.dump(query_all_type_contributor)
    return make_response(jsonify({"TypeContributor": type_contributor}), 200)


@blueprint_api_type_contributor.route(
    "/api/v1/type_contributor/<int:ccn_type_contributor>", methods=["GET"]
)
def get_type_contributor(ccn_type_contributor):
    query_type_contributor = TypeContributor.query.filter_by(
        ccn_type_contributor=ccn_type_contributor
    ).first()
    type_contributor_schema = TypeContributorSchema(many=False)
    type_contributor = type_contributor_schema.dump(query_type_contributor)
    return make_response(jsonify({"TypeContributor": type_contributor}), 200)


@blueprint_api_type_contributor.route(
    "/api/v1/type_contributor/<int:ccn_type_contributor>", methods=["PUT"]
)
def put_type_contributor(ccn_type_contributor):
    data = request.get_json()
    query_type_contributor = TypeContributor.query.filter_by(
        ccn_type_contributor=ccn_type_contributor
    ).first()
    query_type_contributor.ccn_type_contributor = data["ccn_type_contributor"]
    query_type_contributor.contributor_code = data["contributor_code"]
    query_type_contributor.description_type_contributor = data[
        "description_type_contributor"
    ].upper()

    db.session.commit()
    type_contributor_schema = TypeContributorSchema(many=False)
    type_contributor_update = type_contributor_schema.dump(query_type_contributor)

    return make_response(
        jsonify({"Type Contributor Updated": type_contributor_update}), 200
    )


@blueprint_api_type_contributor.route(
    "/api/v1/type_contributor/<int:ccn_type_contributor>", methods=["DELETE"]
)
def delete_type_contributor(ccn_type_contributor):
    query_delete_type_contributor = TypeContributor.query.filter_by(
        ccn_type_contributor=ccn_type_contributor
    ).first()
    db.session.delete(query_delete_type_contributor)
    db.session.commit()
    return make_response(
        jsonify(
            {
                "Type Contributor Deleted": "The type contributor has been deleted succesfully"
            }
        ),
        200,
    )


@jwt_required
@blueprint_api_type_contributor.route('/definite-codes/type-contributor', defaults={'path': ''})
@blueprint_api_type_contributor.route('//<path:path>')
def type_contributor(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')