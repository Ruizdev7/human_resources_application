from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_schooling_level import SchoolingLevel


class SchoolingLevelSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = SchoolingLevel
        csrf = False

    ccn_schooling_level = fields.Number(dump_only=True)
    description_schooling_level = auto_field()