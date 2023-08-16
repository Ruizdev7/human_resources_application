from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_employee import Employee


class EmployeeSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = Employee
        csrf = False

    ccn_employee = fields.Number(dump_only=True)
    ccn_type_id = auto_field()
    number_id_employee = auto_field()
    first_name_employee = auto_field()
    middle_name_employee = auto_field()
    first_last_name_employee = auto_field()
    second_last_name_employee = auto_field()
    full_name_employee = auto_field()
    date_birth_employee = auto_field()
    age = auto_field()
    age_range = auto_field()
    auto_perceived_gender = auto_field()
    rh = auto_field()
    employee_personal_email = auto_field()
    employee_personal_cellphone = auto_field()
    informed_consent_law_1581 = auto_field()
    image = auto_field()
    last_message_read_time = auto_field()
    ccn_marital_status = auto_field()
