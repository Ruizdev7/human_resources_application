from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_ss_employee import SSEmployee


class SSEmployeeSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = SSEmployee
        csrf = False

    ccn_ss_employee = fields.Number(dump_only=True)
    ccn_employee = auto_field()
    ccn_type_affiliation = auto_field()
    ccn_type_contributor = auto_field()
    ccn_eps = auto_field()
    ccn_afp = auto_field()
    ccn_arl = auto_field()
    ccn_ccf = auto_field()
    ccn_aap = auto_field()