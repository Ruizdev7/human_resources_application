from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_diseases import Diseases


class DiseasesSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = Diseases
        csrf = False

    ccn_diseases = fields.Number(dump_only=True)
    diseases = auto_field()