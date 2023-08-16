from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema
from hhrr_app.models.tbl_auto_perceived_gender import AutoPerceivedGender


class AutoPerceivedGenderSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = AutoPerceivedGender
        csrf = False

    ccn_auto_perceived_gender = fields.Number(dump_only=True)
    auto_perceived_gender = fields.String(required=True)