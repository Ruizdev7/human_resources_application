from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_afp import AFP


class AFPSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = AFP
        csrf = False

    ccn_afp = fields.Number(dump_only=True)
    code_afp = auto_field()
    nit_afp = auto_field()
    dig_ver = auto_field()
    description_afp = auto_field()