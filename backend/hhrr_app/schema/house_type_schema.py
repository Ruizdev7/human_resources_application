from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_house_type import HouseType


class HouseTypeSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = HouseType
        csrf = False

    ccn_house_type = fields.Number(dump_only=True)
    house_type = auto_field()
