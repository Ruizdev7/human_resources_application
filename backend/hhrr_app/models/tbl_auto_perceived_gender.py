from hhrr_app import db


class AutoPerceivedGender(db.Model):

    __tablename__ = "tbl_auto_perceived_gender"
    ccn_auto_perceived_gender = db.Column(db.Integer, primary_key=True)
    auto_perceived_gender = db.Column(db.String(40), nullable=True)

    # Relations
    rel_employee = db.relationship("Employee", backref="AutoPerceivedGender")
    rel_falmily_nucleus = db.relationship("FamilyNucleus", backref="AutoPerceivedGender")

    def __init__(self, auto_perceived_gender):

        self.auto_perceived_gender = auto_perceived_gender

    def __repr__(self):
        return f"The Harvest Batch : {self.auto_perceived_gender}"

    def choice_query():
        return AutoPerceivedGender.query

    def save(self):
        if not self.auto_perceived_gender:
            db.session.add(self)
        db.session.commit()

    def delete_auto_perceived_gender(ccn_auto_perceived_gender):
        q = AutoPerceivedGender.query.filter(
            AutoPerceivedGender.ccn_auto_perceived_gender == ccn_auto_perceived_gender
        ).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_id(ccn_auto_perceived_gender):
        return AutoPerceivedGender.query.get(ccn_auto_perceived_gender)
