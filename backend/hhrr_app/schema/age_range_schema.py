from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema
from hhrr_app.models.tbl_age_range import AgeRange


class AgeRangeSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = AgeRange
        csrf = False

    ccn_age_range = fields.Number(dump_only=True) 
    age_range = fields.String(required=True)    