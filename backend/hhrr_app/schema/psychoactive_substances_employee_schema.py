from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_psychoactive_substances_employee import PsychoactiveSubstancesEmployee


class PsychoactiveSubstancesEmployeeSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = PsychoactiveSubstancesEmployee
        csrf = False

    ccn_psychoactive_substances_employee = fields.Number(dump_only=True)
    ccn_employee = auto_field()
    psychoactive_substances = auto_field()