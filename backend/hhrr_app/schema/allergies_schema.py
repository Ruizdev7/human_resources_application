from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from backend.hhrr_app.models.tbl_allergies import Allergies


class AllergiesSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = Allergies
        csrf = False

    ccn_allergies = fields.Number(dump_only=True)
    allergies = auto_field()
