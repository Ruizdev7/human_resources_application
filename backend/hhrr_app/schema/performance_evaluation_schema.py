from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_performance_evaluation import PerformanceEvaluation

class PerformanceEvaluationSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = PerformanceEvaluation
        csrf = False

    ccn_performance_evaluation = fields.Number(dump_only=True)
    opening_date = auto_field() 
    entry_date = auto_field() 
    action_date = auto_field() 
    finish_date = auto_field() 
    immediate_boss = auto_field()
    manager = auto_field() 
    ccn_employee = auto_field() 
    ccn_states_performance_evaluation = auto_field() 
    type_employee = auto_field() 
    immediate_boss_question_date = auto_field()
    employee_response_date = auto_field()