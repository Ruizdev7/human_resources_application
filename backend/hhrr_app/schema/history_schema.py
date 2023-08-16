from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from backend.hhrr_app.models.tbl_history import History


class HistoryEmployeeSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = History
        csrf = False

    ccn_history = fields.Number(dump_only=True)
    ccn_employee = auto_field()
    ccn_manager = auto_field()
    ccn_inmediate_boss = auto_field()
    ccn_last_role = auto_field()
    ccn_new_role = auto_field()