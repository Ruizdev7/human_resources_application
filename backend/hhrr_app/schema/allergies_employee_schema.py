from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from backend.hhrr_app.models.tbl_allergies_employee import AllergiesEmployee


class AllergiesEmployeeSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = AllergiesEmployee
        csrf = False

    ccn_allergies_employee = fields.Number(dump_only=True)
    ccn_employee = auto_field()
    ccn_allergies = auto_field()
