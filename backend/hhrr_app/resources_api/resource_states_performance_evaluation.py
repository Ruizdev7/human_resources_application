from flask import jsonify
from flask import request
from flask import Blueprint
from flask import make_response
from flask_jwt_extended import jwt_required

from hhrr_app import db
from hhrr_app.models.tbl_states_performance_evaluation import StatesPerformanceEvaluation
from hhrr_app.schema.states_performance_evaluation_schema import StatesPerformanceEvaluationSchema


blueprint_api_state_performance_evaluation = Blueprint("api_state_performance_evaluation", __name__, url_prefix="")


@blueprint_api_state_performance_evaluation.route("/api/v1/state_performance_evaluation", methods=["POST"])
def post_state_performance_evaluation():
    data = request.get_json()
    new_state_performance_evaluation = StatesPerformanceEvaluation(
        states_performance_evaluation=data["states_performance_evaluation"].upper()
    )

    db.session.add(new_state_performance_evaluation)
    db.session.commit()
    state_performance_schema = StatesPerformanceEvaluationSchema(many=False)
    state_performance = state_performance_schema.dump(new_state_performance_evaluation)

    return make_response(jsonify({"StatePerformanceEvaluation": state_performance}), 201)


@blueprint_api_state_performance_evaluation.route("/api/v1/state_performance_evaluation", methods=["GET"])
def get_all_state_performance_evaluation():
    query_all_state_performance_evaluation = StatesPerformanceEvaluation.query.all()
    state_performance_evaluation_schema = StatesPerformanceEvaluationSchema(many=True)
    state_performance_evaluation = state_performance_evaluation_schema.dump(query_all_state_performance_evaluation)
    return make_response(jsonify({"StatePerformanceEvaluation": state_performance_evaluation}), 200)


@blueprint_api_state_performance_evaluation.route("/api/v1/state_performance_evaluation/<int:ccn_states_performance_evaluation>", methods=["GET"])
def get_state_performance_evaluation(ccn_states_performance_evaluation):
    query_all_state_performance_evaluation = StatesPerformanceEvaluation.query.filter_by(ccn_states_performance_evaluation=ccn_states_performance_evaluation).first()
    state_performance_evaluation_schema = StatesPerformanceEvaluationSchema(many=False)
    state_performance_evaluation = state_performance_evaluation_schema.dump(query_all_state_performance_evaluation)
    return make_response(jsonify({"StatePerformanceEvaluation": state_performance_evaluation}), 200)


@blueprint_api_state_performance_evaluation.route("/api/v1/state_performance_evaluation/<int:ccn_states_performance_evaluation>", methods=["PUT"])
def put_state_performance_evaluation(ccn_states_performance_evaluation):
    data = request.get_json()
    query_all_state_performance_evaluation = StatesPerformanceEvaluation.query.filter_by(ccn_states_performance_evaluation=ccn_states_performance_evaluation).first()
    query_all_state_performance_evaluation.states_performance_evaluation = data["states_performance_evaluation"].upper()
    
    db.session.commit()
    state_performance_evaluation_schema = StatesPerformanceEvaluationSchema(many=False)
    state_performance_evaluation_update = state_performance_evaluation_schema.dump(query_all_state_performance_evaluation)

    return make_response(jsonify({"StatePerformanceEvaluation": state_performance_evaluation_update}), 200)


@blueprint_api_state_performance_evaluation.route("/api/v1/state_performance_evaluation/<int:ccn_states_performance_evaluation>", methods=["DELETE"])
def delete_state_performance_evaluation(ccn_states_performance_evaluation):
    query_delete_state_performance_evaluation = StatesPerformanceEvaluation.query.filter_by(ccn_states_performance_evaluation=ccn_states_performance_evaluation).first()
    db.session.delete(query_delete_state_performance_evaluation)
    db.session.commit()
    return make_response(
        jsonify({"State Performance Evaluation Deleted": "The state performance evaluation has been deleted succesfully"}), 200
    )


#@jwt_required
#@blueprint_api_state_performance_evaluation.route('/social-security', defaults={'path': ''})
#@blueprint_api_state_performance_evaluation.route('//<path:path>')
#def social_security(path):
#    app = create_app()
#    if path != "" and os.path.exists(app.static_folder + "/" + path):
#        return send_from_directory(app.static_folder, path)
#    else:
#        return send_from_directory(app.static_folder, 'index.html')