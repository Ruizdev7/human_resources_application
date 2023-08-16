from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_city import City


class CitySchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = City
        csrf = False

    ccn_city = fields.Number(dump_only=True)
    id_city = auto_field()
    description_city = auto_field()
    ccn_department = auto_field()