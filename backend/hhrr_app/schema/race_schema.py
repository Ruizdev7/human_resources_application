from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_race import Race


class RaceSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = Race
        csrf = False

    ccn_race = fields.Number(dump_only=True)
    description_race = auto_field()