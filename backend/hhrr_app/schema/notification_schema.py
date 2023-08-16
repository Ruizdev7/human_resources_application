from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_notification import Notification

class NotificationShema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = Notification
        csrf = True
    
    ccn_notification = fields.Number(dump_only=True)
    ccn_employee = auto_field()
    event_name = auto_field()
    content = auto_field()
    link = auto_field()
    is_checked = auto_field()