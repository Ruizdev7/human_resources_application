import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_relationship import Relationship
from hhrr_app.schema.relationship_schema import RelationshipSchema


blueprint_api_relationship = Blueprint("api_relationship", __name__, url_prefix="")


@blueprint_api_relationship.route("/api/v1/relationship", methods=["POST"])
def post_Relationship():
    data = request.get_json()
    new_relationship = Relationship(
        relationship = data['relationship'],
        relationship_level = data['relationship_level']
    )

    db.session.add(new_relationship)
    db.session.commit()
    Relationship_schema = RelationshipSchema(many=False)
    relationship = Relationship_schema.dump(new_relationship)

    return make_response(jsonify({"Relationship": relationship}), 201)


@blueprint_api_relationship.route("/api/v1/relationship", methods=["GET"])
def get_all_relationship():
    query_all_Relationship = Relationship.query.all()
    relationship_schema = RelationshipSchema(many=True)
    relationship = relationship_schema.dump(query_all_Relationship)
    return make_response(jsonify({"Relationship": relationship}), 200)


@blueprint_api_relationship.route("/api/v1/relationship/<int:ccn_relationship>", methods=["GET"])
def get_relationship(ccn_relationship):
    query_relationship = Relationship.query.filter_by(ccn_relationship=ccn_relationship).first()
    relationship_schema = RelationshipSchema(many=False)
    relationship = relationship_schema.dump(query_relationship)
    return make_response(jsonify({"Relationship": relationship}), 200)


@blueprint_api_relationship.route("/api/v1/relationship/<int:ccn_relationship>", methods=["PUT"])
def put_relationship(ccn_relationship):
    data = request.get_json()
    query_Relationship = Relationship.query.filter_by(ccn_relationship=ccn_relationship).first()
    query_Relationship.relationship = data['relationship']
    query_Relationship.relationship_level = data['relationship_level']
    db.session.commit()
    relationship_schema = RelationshipSchema(many=False)
    relationship_update = relationship_schema.dump(query_Relationship)

    return make_response(jsonify({"Relationship updated": relationship_update}), 200)


@blueprint_api_relationship.route("/api/v1/relationship/<int:ccn_relationship>", methods=["DELETE"])
def delete_relationship(ccn_Relationship):
    query_delete_relationship = Relationship.query.filter_by(ccn_Relationship=ccn_Relationship).first()
    db.session.delete(query_delete_relationship)
    db.session.commit()
    return make_response(
        jsonify({"Relationship Deleted": "The Relationship has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_relationship.route('/definite-codes/type-relationship', defaults={'path': ''})
@blueprint_api_relationship.route('//<path:path>')
def type_of_relationship(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')