from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_aap import AAP


class AAPSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = AAP
        csrf = False

    ccn_aap = fields.Number(dump_only=True)
    code_aap = auto_field()
    nit_aap = auto_field()
    dig_ver = auto_field()
    description_aap = auto_field()
