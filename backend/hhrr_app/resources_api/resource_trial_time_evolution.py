from flask import jsonify
from flask import request
from flask import Blueprint
from flask import make_response
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_trial_time_evaluation import TrialTimeEvaluation
from hhrr_app.schema.trial_time_evaluation_schema import TrialTimeEvaluationSchema

blueprint_api_trial_time_evaluation = Blueprint("api_trial_time_evaluation", __name__, url_prefix="")

@blueprint_api_trial_time_evaluation.route("/api/v1/trial-time-evaluation", methods=["POST"])
def post_trial_time_evaluation():
    data = request.get_json()
    
    if data["ccn_employee"] == "":
        return make_response(jsonify({"mng":"cc_employye es obligatorio"}))
    if data["ccn_hhrr_manager"]  == "":
        return make_response(jsonify({"mng":"ccn_hhrr_manager es obligatorio"}))
    if data["ccn_immediate_boss"]  == "":
        return make_response(jsonify({"mng":"ccn_immediate_boss es obligatorio"}))
    if data["ccn_order_state"]  == "":
        return make_response(jsonify({"mng":"ccn_order_state es obligatorio"}))
    
    for key, value in data.items():
        if type(value) == str:
            data[key] = value.upper()
    
    try:
        new_trial_time_evaluation = TrialTimeEvaluation(
            ccn_employee = data["ccn_employee"],
            ccn_hhr_manager = data["ccn_hhr_manager"],
            ccn_immediate_boss = data["ccn_immediate_boss"],
            ccn_order_state = data["ccn_order_state"],
            date_employee_response = data["date_employee_response"],
            date_employee_boss = data["date_employee_boss"],
            created_date = data["created_date"],
            hhrr_manager_date = data["hhrr_manager_date"]
        )
        trial_time_evaluation_schema = TrialTimeevaluationSchema(many=False)
        trial_time_evaluation = trial_time_evaluation_schema(new_trial_time_evaluation)
        db.session.add(new_trial_time_evaluation)
        db.session.commit()
        return make_response(jsonify({"TrialTimeevaluation":trial_time_evaluation, "msg":"La evaluacion de tiempo de prueba se creo correctamente"}), 200)
    except Exception as ex:
         return make_response(jsonify({"msg":"Errot en la creación de la evaluacion de tiempo de prueba"}),400)


@blueprint_api_trial_time_evaluation.route("/api/v1/trial-time-evaluation", methods=["GET"])
def get_all_trial_time_evaluation(): 
    try:
        query_all_trial_time_evaluation = TrialTimeEvaluation.query.all()
        trial_time_evaluation_schema = TrialTimeevaluationSchema(many=True)
        trial_time_evaluation = trial_time_evaluation_schema.dump(query_all_trial_time_evaluation)
        return make_response(jsonify({"TrialTimeevaluation":trial_time_evaluation}), 200)
    except Exception as ex:
        return make_response(jsonify({"Error listando todas los trial time evaluation":str(ex)}),400)

@blueprint_api_trial_time_evaluation.route("/api/v1/trial-time-evaluation/<ccn_trial_time_evaluation>", methods=["GET"])
def get_trial_time_evaluation(ccn_trial_time_evaluation):
    query_trial_time_evaluation = db.get_or_404(TrialTimeEvaluation, ccn_trial_time_evaluation)
    
    if query_trial_time_evaluation == 404:
        return make_response(jsonify({"Message":"Trial time evaluation no encontrado"}),404)
    
    try:
        trial_time_evaluation_schema = TrialTimeevaluationSchema(many=False)
        trial_time_evaluation = trial_time_evaluation_schema.dump(query_trial_time_evaluation)
        return make_response(jsonify({"TrialTimeevaluation":trial_time_evaluation}), 200)
    except Exception as ex:
        return make_response(jsonify({"Error buscando un trial_time_evaluation":str(ex)}),400)

@blueprint_api_trial_time_evaluation.route("/api/v1/trial-time-evaluation/<ccn_trial_time_evaluation>", methods=["PUT"])
def put_trial_time_evaluation(ccn_trial_time_evaluation):
    query_trial_time_evaluation = db.get_or_404(TrialTimeEvaluation, ccn_trial_time_evaluation)
    
    if query_trial_time_evaluation == 404:
        return make_response(jsonify({"Message":"Trial time evaluation no encontrado"}),404)
    
    data = request.get_json()
    
    if data["ccn_employee"] is None:
        return make_response(jsonify({"mng":"cc_employye es obligatorio"}))
    if data["ccn_hhrr_manager"] is None:
        return make_response(jsonify({"mng":"ccn_hhrr_manager es obligatorio"}))
    if data["ccn_immediate_boss"] is None:
        return make_response(jsonify({"mng":"ccn_immediate_boss es obligatorio"}))
    if data["ccn_order_state"] is None:
        return make_response(jsonify({"mng":"ccn_order_state es obligatorio"}))
    
    for key, value in data.items():
        if type(value) == str:
            data[key] = value.upper()
    
    try:
        query_trial_time_evaluation.ccn_employee = data["ccn_employee"]
        query_trial_time_evaluation.ccn_hhr_manager=data["ccn_hhr_manager"]
        query_trial_time_evaluation.ccn_immediate_boss=data["ccn_immediate_boss"]
        query_trial_time_evaluation.ccn_order_state=data["ccn_order_state"]
        query_trial_time_evaluation.date_employee_response=data["date_employee_response"]
        query_trial_time_evaluation.date_employee_boss=data["date_employee_boss"]
        query_trial_time_evaluation.created_date=data["created_date"]
        query_trial_time_evaluation.hhrr_manager_date=data["hhrr_manager_date"]

        db.session.commit()
        return make_response(jsonify({"TrialTimeevaluation":"Actualización exitosa"}),201)
    except Exception as ex:
        return make_response(jsonify({"La Actualizacion falló":str(ex)}),400)

           
