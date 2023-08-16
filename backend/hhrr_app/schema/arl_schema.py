from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_arl import ARL


class ARLSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = ARL
        csrf = False
 
    ccn_arl = fields.Number(dump_only=True)
    code_arl = auto_field()
    nit_arl = auto_field()
    dig_ver = auto_field()
    description_arl = auto_field()