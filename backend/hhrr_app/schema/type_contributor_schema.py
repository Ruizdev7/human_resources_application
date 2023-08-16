from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_type_contributor import TypeContributor


class TypeContributorSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = TypeContributor
        csrf = False

    ccn_type_contributor = fields.Number(dump_only=True)
    contributor_code = auto_field()
    description_type_contributor = auto_field()