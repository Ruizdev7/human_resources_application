import os
from flask import jsonify
from flask import request
from flask import Blueprint
from hhrr_app import create_app
from flask import make_response
from flask import send_from_directory
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_RBAC_modules import RBACModule
from hhrr_app.schema.rbac_modules_schema import RBACModuleSchema


blueprint_api_rbac_modules = Blueprint("api_rbac_modules", __name__, url_prefix="")


@blueprint_api_rbac_modules.route("/api/v1/rbac_modules", methods=["POST"])
def post_rbac_modules():
    data = request.get_json()
    new_rbac = RBACModule(rbac_module=data["rbac_module"])

    db.session.add(new_rbac)
    db.session.commit()
    rbac_schema = RBACModuleSchema(many=False)
    rbac = rbac_schema.dump(new_rbac)

    return make_response(jsonify({"rbac": rbac}), 201)


@blueprint_api_rbac_modules.route("/api/v1/rbac_modules", methods=["GET"])
def get_all_rbac_modules():
    query_all_rbac = RBACModule.query.all()
    rbac_schema = RBACModuleSchema(many=True)
    rbac = rbac_schema.dump(query_all_rbac)
    return make_response(jsonify({"rbac": rbac}), 200)


@blueprint_api_rbac_modules.route(
    "/api/v1/rbac_modules/<int:ccn_rbac_module>", methods=["GET"]
)
def get_rbac_module(ccn_rbac_module):
    query_rbac = RBACModule.query.filter_by(ccn_rbac_module=ccn_rbac_module).first()
    rbac_schema = RBACModuleSchema(many=False)
    rbac = rbac_schema.dump(query_rbac)
    return make_response(jsonify({"rbac": rbac}), 200)


@blueprint_api_rbac_modules.route(
    "/api/v1/rbac_modules/<int:ccn_rbac_module>", methods=["PUT"]
)
def put_rbac_module(ccn_rbac_module):
    data = request.get_json()
    query_rbac_module = RBACModule.query.filter_by(
        ccn_rbac_module=ccn_rbac_module
    ).first()
    query_rbac_module.rbac_module = data["rbac_module"]

    db.session.commit()
    rbac_schema = RBACModuleSchema(many=False)
    rbac_update = rbac_schema.dump(query_rbac_module)

    return make_response(jsonify({"rbac updated": rbac_update}), 200)


@blueprint_api_rbac_modules.route(
    "/api/v1/rbac_modules/<int:ccn_rbac_module>", methods=["DELETE"]
)
def delete_rbac_module(ccn_rbac_module):
    query_delete_rbac = RBACModule.query.filter_by(
        ccn_rbac_module=ccn_rbac_module
    ).first()
    db.session.delete(query_delete_rbac)
    db.session.commit()
    return make_response(
        jsonify({"rbac Deleted": "The rbac has been deleted succesfully"}), 200
    )


@jwt_required
@blueprint_api_rbac_modules.route("/definite-codes/rbac_modules", defaults={"path": ""})
@blueprint_api_rbac_modules.route("//<path:path>")
def rbac_modules(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
