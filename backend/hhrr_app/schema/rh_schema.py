from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_rh import RH


class RHSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = RH
        csrf = False

    ccn_rh = fields.Number(dump_only=True)
    rh = auto_field()
