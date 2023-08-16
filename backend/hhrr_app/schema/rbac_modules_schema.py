from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_RBAC_modules import RBACModule


class RBACModuleSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = RBACModule
        csrf = False

    ccn_rbac_module = fields.Number(dump_only=True)
    rbac_module = auto_field()
