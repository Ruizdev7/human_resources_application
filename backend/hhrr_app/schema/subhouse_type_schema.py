from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_subhouse_type import SubHouseType


class SubHouseTypeSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = SubHouseType
        csrf = False

    ccn_sub_house_type = fields.Number(dump_only=True)
    sub_house_type = auto_field()