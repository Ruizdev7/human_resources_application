from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_work_shift import WorkShift


class WorkShiftSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = WorkShift
        csrf = False

    ccn_work_shift = fields.Number(dump_only=True)
    description_work_shift = auto_field()