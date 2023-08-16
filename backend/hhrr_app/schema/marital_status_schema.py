from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_marital_status import MaritalStatus


class MaritalStatusSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = MaritalStatus
        csrf = False

    ccn_marital_status = fields.Number(dump_only=True)
    marital_status = auto_field()