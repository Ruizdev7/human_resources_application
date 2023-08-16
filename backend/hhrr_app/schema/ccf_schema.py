from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_ccf import CCF


class CCFSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = CCF
        csrf = False

    ccn_ccf = fields.Number(dump_only=True)
    code_ccf = auto_field()
    nit_ccf = auto_field()
    dig_ver = auto_field()
    description_ccf = auto_field()