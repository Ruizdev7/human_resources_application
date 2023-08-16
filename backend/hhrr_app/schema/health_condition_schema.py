from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_health_condition import HealthCondition


class HealthConditionSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = HealthCondition
        csrf = False
        
    ccn_health_condition = fields.Number(dump_only=True)
    ccn_employee = auto_field()
    consume_alcoholic_beverages = auto_field()
    ccn_diseases = auto_field()
    allergies = auto_field()
    what_allergy = auto_field()
    medicines = auto_field()
    what_medicin = auto_field()
    last_medical_consultation = auto_field()
    plan_to_drink_less_alcoholic_beverages = auto_field()
    discomfort_due_to_criticism_when_ingesting_alcohol = auto_field()
    need_to_drink_alcohol_in_the_morning = auto_field()
    physical_activity_3_times_a_week_30_minutes = auto_field()
    he_is_a_smoker = auto_field()
    how_many_cigarettes_a_day = auto_field()
    he_is_ex_smoker = auto_field()
    consume_psychoactive_substances = auto_field()
    used_psychoactive_substances_before = auto_field()
    what_psychoactive_substances = auto_field()