from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_country import Country


class CountrySchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = Country
        csrf = False

    ccn_country = fields.Number(dump_only=True)
    id_country = auto_field()
    description_country = auto_field()