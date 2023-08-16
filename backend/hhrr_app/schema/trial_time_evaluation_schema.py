from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_trial_time_evaluation import TrialTimeEvaluation

class TrialTimeEvaluationSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = TrialTimeEvaluation
        csrf = False
    
    ccn_trial_time_evaluation = fields.Number(dump_only=True)
    ccn_employee = auto_field()
    ccn_hhrr_manager = auto_field()
    ccn_immediate_boss = auto_field()
    ccn_order_state = auto_field()
    date_employee_response = auto_field()
    date_immediate_boss = auto_field()
    created_date = auto_field()
    hhrr_manager_date = auto_field()