from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_type_relationship import TypeRelationship


class TypeRelationshipSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = TypeRelationship
        csrf = False

    ccn_type_relationship = fields.Number(dump_only=True)
    description_type_relationship = auto_field()