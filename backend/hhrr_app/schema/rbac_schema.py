from marshmallow import fields
from hhrr_app.models.tbl_RBAC import RBAC
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field


class RBACSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = RBAC
        csrf = False

    ccn_rbac = fields.Number(dump_only=True)
    ccn_role = auto_field()
    ccn_rbac_module = auto_field()
    create_access = auto_field()
    read_access = auto_field()
    update_access = auto_field()
    delete_access = auto_field()
