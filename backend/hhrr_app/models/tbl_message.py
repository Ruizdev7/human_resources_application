from datetime import datetime
from hhrr_app import db


class Message(db.Model):

    __tablename__ = "tbl_message"
    ccn_message = db.Column(db.Integer, primary_key=True)
    ccn_sender = db.Column(db.Integer, db.ForeignKey("tbl_employee.ccn_employee"))
    ccn_recipient = db.Column(db.Integer, db.ForeignKey("tbl_employee.ccn_employee"))
    title_message = db.Column(db.String(50), nullable=False)
    body_message = db.Column(db.String(240), nullable=False)
    time_stamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __init__(
        self,
        ccn_sender,
        ccn_recipient,
        title_message,
        body_message,
        time_stamp,
    ):
        self.ccn_sender = ccn_sender
        self.ccn_recipient = ccn_recipient
        self.title_message = title_message
        self.body_message = body_message
        self.time_stamp = time_stamp

    def __repr__(self):
        return f"Message: {self.title_message}"
