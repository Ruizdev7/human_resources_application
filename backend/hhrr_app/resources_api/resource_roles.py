import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_roles import Role
from hhrr_app.schema.roles_schema import RoleSchema


blueprint_api_role = Blueprint("api_role", __name__, url_prefix="")


@blueprint_api_role.route("/api/v1/role", methods=["POST"])
def post_role():
    data = request.get_json()
    new_role = Role(
        area = data["area"].upper(),
        role = data["role"].upper(),
        process = data["process"].upper(),
        full_role = f'{data["role"]} {data["process"]}'
    )

    db.session.add(new_role)
    db.session.commit()
    role_schema = RoleSchema(many=False)
    role = role_schema.dump(new_role)

    return make_response(jsonify({"Role": role}), 201)


@blueprint_api_role.route("/api/v1/role", methods=["GET"])
def get_all_role():
    query_all_role = Role.query.all()
    role_schema = RoleSchema(many=True)
    role = role_schema.dump(query_all_role)
    return make_response(jsonify({"Role": role}), 200)


@blueprint_api_role.route("/api/v1/role/<int:ccn_role>", methods=["GET"])
def get_role(ccn_role):
    query_role = Role.query.filter_by(ccn_role=ccn_role).first()
    role_schema = RoleSchema(many=False)
    role = role_schema.dump(query_role)
    return make_response(jsonify({"Role": role}), 200)


@blueprint_api_role.route("/api/v1/role/<int:ccn_role>", methods=["PUT"])
def put_role(ccn_role):
    data = request.get_json()
    query_role = Role.query.filter_by(ccn_role=ccn_role).first()
    query_role.area = data["area"].upper()
    query_role.role = data["role"].upper()
    query_role.process = data["process"].upper()
    query_role.full_role = data["full_role"]

    db.session.commit()
    role_schema = RoleSchema(many=False)
    role_update = role_schema.dump(query_role)

    return make_response(jsonify({"Role Updated": role_update}), 200)


@blueprint_api_role.route("/api/v1/role/<int:ccn_role>", methods=["DELETE"])
def delete_role(ccn_role):
    query_delete_role = Role.query.filter_by(ccn_role=ccn_role).first()
    db.session.delete(query_delete_role)
    db.session.commit()
    return make_response(
        jsonify({"Role Deleted": "The role has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_role.route('/definite-codes/roles', defaults={'path': ''})
@blueprint_api_role.route('//<path:path>')
def roles(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')