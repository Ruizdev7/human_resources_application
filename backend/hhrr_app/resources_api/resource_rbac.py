import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_RBAC import RBAC
from hhrr_app.schema.rbac_schema import RBACSchema


blueprint_api_rbac = Blueprint("api_rbac", __name__, url_prefix="")


@blueprint_api_rbac.route("/api/v1/rbac", methods=["POST"])
def post_rbac():
    data = request.get_json()
    new_rbac = RBAC(
        ccn_role=data["ccn_role"],
        ccn_rbac_module=data["ccn_rbac_module"],
    )

    db.session.add(new_rbac)
    db.session.commit()
    rbac_schema = RBACSchema(many=False)
    rbac = rbac_schema.dump(new_rbac)

    return make_response(jsonify({"rbac": rbac}), 201)


@blueprint_api_rbac.route("/api/v1/rbac", methods=["GET"])
def get_all_rbac():
    query_all_rbac = RBAC.query.all()
    print(query_all_rbac)
    rbac_schema = RBACSchema(many=True)
    rbac = rbac_schema.dump(query_all_rbac)
    return make_response(jsonify({"RBAC": rbac}), 200)


@blueprint_api_rbac.route("/api/v1/rbac/<int:ccn_rbac>", methods=["GET"])
def get_rbac(ccn_rbac):
    query_rbac = RBAC.query.filter_by(ccn_rbac=ccn_rbac).first()
    rbac_schema = RBACSchema(many=False)
    rbac = rbac_schema.dump(query_rbac)
    return make_response(jsonify({"rbac": rbac}), 200)


@blueprint_api_rbac.route("/api/v1/rbac/role/<int:ccn_role>", methods=["GET"])
def get_rbac_by_role(ccn_role):
    query_rbac_by_role = RBAC.query.filter_by(ccn_role=ccn_role).all()
    rbac_schema = RBACSchema(many=True)
    rbac_by_role = rbac_schema.dump(query_rbac_by_role)
    return make_response(jsonify({"rbacByRole": rbac_by_role}), 200)


@blueprint_api_rbac.route("/api/v1/rbac/<int:ccn_rbac_module>/<int:ccn_role>", methods=["PUT"])
def put_rbac(ccn_rbac_module,ccn_role):
    data = request.get_json()
    query_rbac = RBAC.query.filter_by(ccn_role=ccn_role,ccn_rbac_module=ccn_rbac_module).first()
    query_rbac.create_access = data['create_access']
    query_rbac.read_access = data['read_access']
    query_rbac.update_access = data['update_access']
    query_rbac.delete_access = data['delete_access']

    db.session.commit()
    rbac_schema = RBACSchema(many=False)
    rbac_update = rbac_schema.dump(query_rbac)

    return make_response(jsonify({"rbac updated": rbac_update}), 200)


@blueprint_api_rbac.route("/api/v1/rbac/<int:ccn_rbac>", methods=["DELETE"])
def delete_rbac(ccn_rbac):
    query_delete_rbac = RBAC.query.filter_by(ccn_rbac=ccn_rbac).first()
    db.session.delete(query_delete_rbac)
    db.session.commit()
    return make_response(
        jsonify({"rbac Deleted": "The rbac has been deleted succesfully"}), 200
    )


@blueprint_api_rbac.route("/definite-codes/rbac", defaults={"path": ""})
@blueprint_api_rbac.route("//<path:path>")
def rbac(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
