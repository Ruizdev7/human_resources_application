from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_emergency_contact_details import EmergencyContactDetails


class EmergencyContactDetailsSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = EmergencyContactDetails
        csrf = False

    ccn_emergency_contact_details = fields.Number(dump_only=True)
    ccn_employee = auto_field()
    emergency_contact = auto_field()
    ccn_relationship = auto_field()
    cellphone = auto_field()