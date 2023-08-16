import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_type_relationship import TypeRelationship
from hhrr_app.schema.type_relationship_schema import TypeRelationshipSchema


blueprint_api_type_relationship = Blueprint("api_type_relationship", __name__, url_prefix="")


@blueprint_api_type_relationship.route("/api/v1/type_relationship", methods=["POST"])
def post_type_relationship():
    data = request.get_json()
    new_type_relationship = TypeRelationship(
        description_type_relationship=data["description_type_relationship"].upper()
    )

    db.session.add(new_type_relationship)
    db.session.commit()
    type_relationship_schema = TypeRelationshipSchema(many=False)
    type_relationship = type_relationship_schema.dump(new_type_relationship)

    return make_response(jsonify({"Type RelationShip": type_relationship}), 201)


@blueprint_api_type_relationship.route("/api/v1/type_relationship", methods=["GET"])
def get_all_type_relationship():
    query_all_type_relation_ship = TypeRelationship.query.all()
    type_relationship_schema = TypeRelationshipSchema(many=True)
    type_relationship = type_relationship_schema.dump(query_all_type_relation_ship)
    return make_response(jsonify({"TypeRelationship": type_relationship}), 200)


@blueprint_api_type_relationship.route("/api/v1/type_relationship/<int:ccn_type_relationship>", methods=["GET"])
def get_type_relationship(ccn_type_relationship):
    query_type_relationship = TypeRelationship.query.filter_by(ccn_type_relationship=ccn_type_relationship).first()
    type_relationship_schema = TypeRelationshipSchema(many=False)
    type_relationship = type_relationship_schema.dump(query_type_relationship)
    return make_response(jsonify({"TypeRelationship": type_relationship}), 200)


@blueprint_api_type_relationship.route("/api/v1/type_relationship/<int:ccn_type_relationship>", methods=["PUT"])
def put_type_reltationship(ccn_type_relationship):
    data = request.get_json()
    query_type_relationship = TypeRelationship.query.filter_by(ccn_type_relationship=ccn_type_relationship).first()
    query_type_relationship.description_type_relationship = data["description_type_relationship"].upper()

    db.session.commit()
    type_relationship_schema = TypeRelationshipSchema(many=False)
    type_relationship_update = type_relationship_schema.dump(query_type_relationship)

    return make_response(jsonify({"Type Relationship Updated": type_relationship_update}), 200)


@blueprint_api_type_relationship.route("/api/v1/type_relationship/<int:ccn_type_relationship>", methods=["DELETE"])
def delete_type_relationship(ccn_type_relationship):
    query_delete_type_relationship = TypeRelationship.query.filter_by(ccn_type_relationship=ccn_type_relationship).first()
    db.session.delete(query_delete_type_relationship)
    db.session.commit()
    return make_response(
        jsonify({"Type Relationship Deleted": "The type relationship has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_type_relationship.route('/definite-codes/type-relationship', defaults={'path': ''})
@blueprint_api_type_relationship.route('//<path:path>')
def type_relationship(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')