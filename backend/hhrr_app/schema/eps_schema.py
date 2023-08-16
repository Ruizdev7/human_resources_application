from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_eps import EPS


class EPSSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = EPS
        csrf = False

    ccn_eps = fields.Number(dump_only=True)
    code_eps = auto_field()
    code_sgp_eps = auto_field()
    nit_eps = auto_field()
    dig_ver = auto_field()
    description_eps = auto_field()