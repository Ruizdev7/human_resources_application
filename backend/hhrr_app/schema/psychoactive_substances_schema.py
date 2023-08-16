from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_psychoactive_substances import PsychoactiveSubstances


class PsychoactiveSubstancesSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = PsychoactiveSubstances
        csrf = False

    ccn_psychoactive_substances = fields.Number(dump_only=True)
    psychoactive_substances = auto_field()
