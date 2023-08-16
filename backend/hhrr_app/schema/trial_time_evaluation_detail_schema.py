from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_trial_time_evaluation_detail import TrialTimeEvolutionDetail

class TrialTimeEvaluationDetailSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = TrialTimeEvaluationnDetail
        crsf = False
    
    ccn_trial_time_evaluation_detail = fields.Number(dump_only=True)
    ccn_trial_time_evaluation = auto_field()
    initiative_coperation = auto_field()
    teamwork = auto_field()
    responsability = auto_field()
    accountability_discipline = auto_field()
    work_quality = auto_field()
    productivity = auto_field()
    agility_discipline = auto_field()
    hseq = auto_field()
    total_score = auto_field()
    initial_induction = auto_field()
    coorporative_principles = auto_field()
    strength = auto_field()
    improve_areas = auto_field()
    employee_approval = auto_field()
    employee_choice_reason = auto_field()
    hhrr_approval = auto_field()
    hhrr_choice_reason = auto_field()