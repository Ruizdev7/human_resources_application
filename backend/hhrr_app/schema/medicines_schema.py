from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_medicines import Medicines


class MedicinesSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = Medicines
        csrf = False

    ccn_medicines = fields.Number(dump_only=True)
    medicines = auto_field()
