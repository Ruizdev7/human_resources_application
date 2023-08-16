from hhrr_app import db


class RH(db.Model):
    __tablename__ = "tbl_rh"
    ccn_rh = db.Column(db.Integer, primary_key=True)
    rh = db.Column(db.String(10), nullable=False)

    rel_employee = db.relationship("Employee", backref="RH")

    def __init__(self, rh):
        self.rh = rh

    def choice_query():
        return RH.query

    def __repr__(self):
        return f"RH: {self.rh}"

    def save(self):
        if not self.rh:
            db.session.add(self)
            db.session.commit()

    def delete_rh(ccn_rh):
        q = RH.query.filter(RH.ccn_rh == ccn_rh).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_id(ccn_rh):
        return RH.query.get(ccn_rh)
