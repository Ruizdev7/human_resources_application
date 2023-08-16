from flask import jsonify
from flask import request
from flask import Blueprint
from flask import make_response
from flask_jwt_extended import jwt_required
from datetime import datetime

from hhrr_app import db
from hhrr_app.models.tbl_trial_time_evaluation_detail import TrialTimeEvaluationDetail
from hhrr_app.models.tbl_trial_time_evaluation import TrialTimeEvaluation
from hhrr_app.schema.trial_time_evaluation_schema import TrialTimeEvaluationSchema

blueprint_api_trial_time_evaluation_d = Blueprint("api_trial_time_evaluation_d", __name__, url_prefix="")

@blueprint_api_trial_time_evaluation_d.route("/api/v1/trial-time-evaluation-d", methods=["POST"])
def post_trial_time_evaluation_d():
    data = request.get_json()
    
    if data["ccn_trial_time_evaluation"] is None:
        return make_response(jsonify({"mng":"ccn_trial_time_evaluation es obligatorio"}))
    
    for key, value in data.items():
        if type(value) == str:
            data[key] = value.upper()
    
    try:
        new_trial_time_evaluation_d = TrialTimeEvaluationDetail(
            ccn_trial_time_evaluation = data["ccn_trial_time_evaluation"]
        )
        db.session.add(new_trial_time_evaluation_d)
        db.session.commit()
        trial_time_evaluation_d_schema = TrialTimeevaluationSchema(many=False)
        trial_time_evaluation_d = trial_time_evaluation_d_schema.dump(new_trial_time_evaluation_d)
        return make_response(jsonify({"TrialTimeevaluationDetail":trial_time_evaluation_d}),201)
    except Exception as ex:
        return make_response(jsonify({"Error al intentar insertar":str(ex)}),400)

@blueprint_api_trial_time_evaluation_d.route("/api/v1/trial-time-evaluation-d", methods=["GET"])
def get_all_trial_time_evaluation_d():
    try:
        query_all_trial_time_evaluation_d = TrialTimeEvaluationDetail.query.all()
        trial_time_evaluation_d_schema = TrialTimeevaluationSchema(many=True)
        trial_time_evaluation_d = trial_time_evaluation_d_schema.dump(query_all_trial_time_evaluation_d)
        return make_response(jsonify({"TrialTimeevaluationDetail":trial_time_evaluation_d}),200)
    except Exception as ex:
        return make_response(jsonify({"Error listando los trial time evaluation detail":str(ex)}),400)
    
@blueprint_api_trial_time_evaluation_d.route("/api/v1/trial-time-evaluation-d/<int:ccn_trial_time_evaluation_detail>", methods=["GET"])
def get_trial_time_evaluation_d(ccn_trial_time_evaluation_detail):
    query_trial_time_evaluation_d = db.get_or_404(TrialTimeEvaluationDetail, ccn_trial_time_evaluation_detail)
    
    if query_trial_time_evaluation_d == 404:
        return make_response(jsonify({"Message":"Trial time evaluation detail no encontrado"}),404)
    
    try:
        trial_time_evaluation_d_schema = TrialTimeevaluationSchema(many=False)
        trial_time_evaluation_d = trial_time_evaluation_d_schema.dump(query_trial_time_evaluation_d)
        return make_response(jsonify({"TrialTimeevaluationDetail":trial_time_evaluation_d}),200)
    except Exception as ex:
        return make_response(jsonify({"Error buscando un TrialTimeevaluationDetail":str(ex)}),400)

@blueprint_api_trial_time_evaluation_d.route("/api/v1/trial-time-evaluation-d/<int:ccn_trial_time_evaluation_detail>", methods=["PUT"])
def put_trial_time_evaluation_d(ccn_trial_time_evaluation_detail):
    
    
    try:
        query_trial_time_evaluation_d = TrialTimeEvaluationDetail.query.filter_by(ccn_trial_time_evaluation_detail=ccn_trial_time_evaluation_detail).first()
    except:
        return make_response(jsonify({"msg":"Error buscando la TrialTimeEvaluationDetail"}),400)
    
    data = request.get_json()
    
    for key, value in data.items():
        if type(value) == str:
            data[key] = value.upper()
    
    try:
        query_trial_time_evaluation_d.ccn_trial_time_evaluation = data["ccn_trial_time_evaluation"]
        query_trial_time_evaluation_d.initiative_coperation=data["initiative_coperation"]
        query_trial_time_evaluation_d.teamwork=data["teamwork"]
        query_trial_time_evaluation_d.responsability=data["responsability"]
        query_trial_time_evaluation_d.accountability_discipline=data["accountability_discipline"]
        query_trial_time_evaluation_d.work_quality=data["work_quality"]
        query_trial_time_evaluation_d.productivity=data["productivity"]
        query_trial_time_evaluation_d.agility_discipline=data["agility_discipline"]
        query_trial_time_evaluation_d.hseq=data["hseq"]
        query_trial_time_evaluation_d.total_score=data["total_score"]
        query_trial_time_evaluation_d.initial_induction=data["initial_induction"]
        query_trial_time_evaluation_d.coorporative_principles=data["coorporative_principles"]
        query_trial_time_evaluation_d.strength=data["strength"]
        query_trial_time_evaluation_d.improve_areas=data["improve_areas"]
        query_trial_time_evaluation_d.employee_approval=data["employee_approval"]
        query_trial_time_evaluation_d.employee_choice_reason=data["employee_choice_reason"]
        query_trial_time_evaluation_d.hhrr_approval=data["hhrr_approval"]
        query_trial_time_evaluation_d.hhrr_choice_reason=data["hhrr_choice_reason"]

        db.session.commit()
        return make_response(jsonify({"TrialTimeevaluation":"Actualización exitosa"}),201)
    except Exception as ex:
        return make_response(jsonify({"La Actualizacion falló":str(ex)}),400)


@blueprint_api_trial_time_evaluation_d.route("/api/v1/immediate-boss-qualification-trial-time-evaluation-d/<int:ccn_trial_time_evaluation>", methods=["PUT"])
def put_immediate_boss_qualificationtrial_time_evaluation_d(ccn_trial_time_evaluation):
    query_trial_time_evaluation_d = TrialTimeEvaluationDetail.query.filter_by(ccn_trial_time_evaluation=ccn_trial_time_evaluation).first()
    query_trial_time_evaluation = TrialTimeEvaluation.query.filter_by(ccn_trial_time_evaluation=ccn_trial_time_evaluation).first()

    
    data = request.get_json()
    
    for key, value in data.items():
        if type(value) == str:
            data[key] = value.upper()
    
    try:
        query_trial_time_evaluation_d.initiative_coperation=data["initiative_coperation"]
        query_trial_time_evaluation_d.teamwork=data["teamwork"]
        query_trial_time_evaluation_d.responsability=data["responsability"]
        query_trial_time_evaluation_d.accountability_discipline=data["accountability_discipline"]
        query_trial_time_evaluation_d.work_quality=data["work_quality"]
        query_trial_time_evaluation_d.productivity=data["productivity"]
        query_trial_time_evaluation_d.agility_discipline=data["agility_discipline"]
        query_trial_time_evaluation_d.hseq=data["hseq"]
        query_trial_time_evaluation_d.total_score=data["total_score"]
        query_trial_time_evaluation_d.initial_induction=data["initial_induction"]
        query_trial_time_evaluation_d.coorporative_principles=data["coorporative_principles"]
        query_trial_time_evaluation_d.strength=data["strength"]
        query_trial_time_evaluation_d.improve_areas=data["improve_areas"]
        query_trial_time_evaluation.date_immediate_boss=datetime.now()

        db.session.commit()
        return make_response(jsonify({"TrialTimeevaluation":"Actualización exitosa"}),201)
    except Exception as ex:
        return make_response(jsonify({"La Actualizacion falló":str(ex)}),400)
    
@blueprint_api_trial_time_evaluation_d.route("/api/v1/employee-response-trial-time-evaluation-d/<int:ccn_trial_time_evaluation>", methods=["PUT"])
def put_employee_response_trial_time_evaluation_d(ccn_trial_time_evaluation):
    query_trial_time_evaluation_d = TrialTimeEvaluationDetail.query.filter_by(ccn_trial_time_evaluation=ccn_trial_time_evaluation).first()
    query_trial_time_evaluation = TrialTimeEvaluation.query.filter_by(ccn_trial_time_evaluation=ccn_trial_time_evaluation).first()

    
    data = request.get_json()
    
    for key, value in data.items():
        if type(value) == str:
            data[key] = value.upper()
    
    try:
        query_trial_time_evaluation_d.employee_approval=data["employee_approval"]
        query_trial_time_evaluation_d.employee_choice_reason=data["employee_choice_reason"]
        query_trial_time_evaluation.date_employee_response=datetime.now()

        db.session.commit()
        return make_response(jsonify({"TrialTimeevaluation":"Actualización exitosa"}),201)
    except Exception as ex:
        return make_response(jsonify({"La Actualizacion falló":str(ex)}),400)
    
@blueprint_api_trial_time_evaluation_d.route("/api/v1/hhrr-manager-date-trial-time-evaluation-d/<int:ccn_trial_time_evaluation>", methods=["PUT"])
def put_hhrr_manager_date_employee_response_trial_time_evaluation_d(ccn_trial_time_evaluation):
    query_trial_time_evaluation_d = TrialTimeEvaluationDetail.query.filter_by(ccn_trial_time_evaluation=ccn_trial_time_evaluation).first()
    query_trial_time_evaluation = TrialTimeEvaluation.query.filter_by(ccn_trial_time_evaluation=ccn_trial_time_evaluation).first()

    
    data = request.get_json()
    
    for key, value in data.items():
        if type(value) == str:
            data[key] = value.upper()
    
    try:
        query_trial_time_evaluation_d.hhrr_approval=data["hhrr_approval"]
        query_trial_time_evaluation_d.hhrr_choice_reason=data["hhrr_choice_reason"]
        query_trial_time_evaluation.hhrr_manager_date=datetime.now()

        db.session.commit()
        return make_response(jsonify({"TrialTimeevaluation":"Actualización exitosa"}),201)
    except Exception as ex:
        return make_response(jsonify({"La Actualizacion falló":str(ex)}),400)