from hhrr_app import db


class MaritalStatus(db.Model):
    __tablename__ = "tbl_marital_status"
    ccn_marital_status = db.Column(db.Integer, primary_key=True)
    marital_status = db.Column(db.String(150), nullable=True)

    rel_employee = db.relationship("Employee", backref="MaritalStatus")

    def __init__(
        self,
        marital_status,
    ):
        self.marital_status = marital_status

    def __repr__(self):
        return f"Marital Status: {self.marital_status}"

    def choice_query():
        return MaritalStatus.query

    def save(self):
        if not self.ccn_marital_status:
            db.session.add(self)
            db.session.commit()

    def delete_marital_status(ccn_marital_status):
        q = MaritalStatus.query.filter(
            MaritalStatus.ccn_marital_status == ccn_marital_status
        ).first()
        db.session.delete(q)
        db.session.commit()
        return print(q)

    @staticmethod
    def get_by_id(ccn_marital_status):
        return MaritalStatus.query.get(ccn_marital_status)
