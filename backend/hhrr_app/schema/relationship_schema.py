from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_relationship import Relationship


class RelationshipSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = Relationship
        csrf = False

    ccn_relationship = fields.Number(dump_only=True)
    relationship = auto_field()
    relationship_level = auto_field()