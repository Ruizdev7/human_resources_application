from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_type_affiliation import TypeAffiliation


class TypeAffiliationSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = TypeAffiliation
        csrf = False

    ccn_type_affiliation = fields.Number(dump_only=True)
    affiliation_code = auto_field()
    description_type_affiliation = auto_field()
    