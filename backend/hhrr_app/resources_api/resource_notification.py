from flask import jsonify
from flask import request
from flask import Blueprint
from flask import make_response
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_notification import Notification
from hhrr_app.schema.notification_schema import NotificationShema

blueprint_api_notification = Blueprint("api_notification", __name__, url_prefix="")

@blueprint_api_notification.route("/api/v1/notification", methods=["POST"])
def post_notification():
    data = request.get_json()
    
    if data["ccn_employee"] == "":
        return make_response(jsonify({"mng":"cc_employye es obligatorio"}))
    if data["event_name"] == "":
        return make_response(jsonify({"mng":"event_name es obligatorio"}))
    if data["content"] == "":
        return make_response(jsonify({"mng":"content es obligatorio"}))
    
    print(data["event_name"])
    
    for key, value in data.items():
        if type(value) == str:
            data[key] = value.upper()
    
    try:
        new_notification = Notification(
        ccn_employee=data["ccn_employee"],
        event_name=data["event_name"],
        content=data["content"]
        )

        if data["link"]:
            new_notification.link=data["link"]
        if data["is_checked"]:
            new_notification.is_checked=data["is_checked"]
 
        db.session.add(new_notification)
        db.session.commit()
        notification_schema = NotificationShema(many=False)
        notification = notification_schema.dump(new_notification)
        return make_response(jsonify({"Notification":notification, "mng":"Succesfully"}),201)
    except Exception as ex:
        return make_response(jsonify({"msg":"Error al insertar la notificación: "+str(ex)}),400)

@blueprint_api_notification.route("/api/v1/notification", methods=["GET"])
def get_all_notification():
    try:
        query_all_notification = Notification.query.all()
        notification_schema = NotificationShema(many=True)
        notification = notification_schema.dump(query_all_notification)
        return make_response(jsonify({"Notifications":notification, "msg":"Succesfully"}), 200)
    except Exception as ex:
        return make_response(jsonify({"msg":"Error listando todas las notificaciones: "+str(ex)}),400)
    
@blueprint_api_notification.route("/api/v1/notification/<int:ccn_notification>", methods=["GET"])
def get_notification(ccn_notification): 
    try:
        query_notification = Notification.query.filter_by(ccn_notification=ccn_notification).first()
        notification_schema = NotificationShema(many=False)
        notification = notification_schema.dump(query_notification)
        return make_response(jsonify({"Notification":notification, "msg":"Succesfully"}), 200)
    except Exception as ex:
        return make_response(jsonify({"msg":"Error buscando la notificación"}),400)
    
@blueprint_api_notification.route("/api/v1/notification/<int:ccn_notification>", methods=["PUT"])
def put_notification(ccn_notification): 
    try:
        query_notification = Notification.query.filter_by(ccn_notification=ccn_notification).first()
    except:
        return make_response(jsonify({"msg":"Error buscando la notificación"}),400)
    
    data = request.get_json()
    
    if data["ccn_employee"] == "":
        return make_response(jsonify({"mng":"cc_employye es obligatorio"}))
    if data["event_name"] == "":
        return make_response(jsonify({"mng":"event_name es obligatorio"}))
    if data["content"] == "":
        return make_response(jsonify({"mng":"content es obligatorio"}))
    
    for key, value in data.items():
        if type(value) == str:
            data[key] = value.upper()
    
    try:
        query_notification.ccn_employee = data["ccn_employee"]
        query_notification.event_name=data["event_name"]
        query_notification.content=data["content"]
        if data["link"]:
            query_notification.link=data["link"]
        if data["is_checked"]:
            query_notification.is_checked=data["is_checked"]

        db.session.commit()
        return make_response(jsonify({"Notification":"Actualización exitosa"}),200)
    except Exception as ex:
        return make_response(jsonify({"La Actualizacion falló":str(ex)}),400)
    
    
    
    
    