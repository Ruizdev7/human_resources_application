from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_medicines_employee import MedicinesEmployee


class MedicinesEmployeeSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = MedicinesEmployee
        csrf = False

    ccn_medicines_employee = fields.Number(dump_only=True)
    ccn_employee = auto_field()
    medicines = auto_field()
