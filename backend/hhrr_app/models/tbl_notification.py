from re import X
from hhrr_app import db

class Notification(db.Model):
    __tablename__ = "tbl_notification"
    ccn_notification = db.Column(db.Integer, primary_key=True)
    ccn_employee = db.Column(db.Integer, db.ForeignKey("tbl_employee.ccn_employee"))
    event_name = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(200), nullable=False)
    link = db.Column(db.String(250), nullable=True)
    is_checked = db.Column(db.Boolean, nullable=True)

    def __init__(self,ccn_employee,event_name,content):
        self.ccn_employee = ccn_employee,
        self.event_name = event_name,
        self.content = content,
    