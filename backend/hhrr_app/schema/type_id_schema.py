from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema
from hhrr_app.models.tbl_type_id import TypeId


class TypeIdSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = TypeId
        csrf = False

    ccn_type_id = fields.Number(dump_only=True)
    type_id = fields.String(required=True)
    description_type_id = fields.String(required=True)
