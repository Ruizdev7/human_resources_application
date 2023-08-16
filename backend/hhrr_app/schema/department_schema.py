from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_department import Department


class DepartmentSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = Department
        csrf = False

    ccn_department = fields.Number(dump_only=True)
    id_department = auto_field()
    descripcion_department = auto_field()
    ccn_country = auto_field()