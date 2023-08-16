from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_roles import Role


class RoleSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = Role
        csrf = False

    ccn_role =fields.Number(dump_only=True)
    area = auto_field()
    role = auto_field()
    process = auto_field()
    full_role = auto_field()