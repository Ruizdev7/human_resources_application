from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_operative_performance_evaluation import OperativePE

class OperativePESchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = OperativePE
        csrf = False

    ccn_operative_performance_evaluation = fields.Number(dump_only=True)
    ccn_performance_evaluation = auto_field()
    ccn_employee = auto_field()
    engagement_or_productivity = auto_field()   
    communication_skills = auto_field()   
    adaptation_to_change = auto_field()   
    learning_and_development = auto_field() 
    organization = auto_field() 
    continuous_improvement = auto_field() 
    active_participation = auto_field() 
    relations = auto_field() 
    puntuality = auto_field()     
    employee_response = auto_field() 
    first_action_plan = auto_field() 
    first_action_plan_date = auto_field()
    first_period_of_execution = auto_field() 
    second_action_plan = auto_field() 
    second_action_plan_date = auto_field()
    second_period_of_execution = auto_field() 
    third_action_plan = auto_field() 
    third_action_plan_date = auto_field()
    third_period_of_execution = auto_field() 
    manager_response = auto_field() 
    manager_approval = auto_field() 
    overall_score = auto_field()
    level_value = auto_field()
    immediate_boss_observation = auto_field()