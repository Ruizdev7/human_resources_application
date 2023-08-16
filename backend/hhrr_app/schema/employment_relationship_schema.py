from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_employment_relationship import EmploymentRelationship


class EmploymentRelationshipSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = EmploymentRelationship
        csrf = False

    ccn_employment_relationship = fields.Number(dump_only=True)
    ccn_employee = auto_field()
    ccn_role = auto_field()
    ccn_work_shift = auto_field()
    binding_date = auto_field()
    termination_date = auto_field()
    time_worked = auto_field()
    pending_days_to_enjoy_for_holidays = auto_field()
    ccn_type_relationship = auto_field()
    employee_corporate_email = auto_field()
    employee_corporate_cellphone = auto_field()
    immediate_boss = auto_field()
    manager = auto_field()
    type_of_charge = auto_field()
    is_active_employee = auto_field()
