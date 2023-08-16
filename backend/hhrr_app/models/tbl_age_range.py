from hhrr_app import db


class AgeRange(db.Model):
    __tablename__ = "tbl_age_range"
    ccn_age_range = db.Column(db.Integer, primary_key=True)
    age_range = db.Column(db.String(40), nullable=False)

    # Relations
    rel_employee = db.relationship("Employee", backref="AgeRange")
    rel_family_nucleus = db.relationship("FamilyNucleus", backref="AgeRange")
    
    def __init__(self, age_range):
        self.age_range = age_range

    def choice_query():
        return AgeRange.query

    def __repr__(self):
        return f"Size: {self.age_range}"

    def save(self):
        if not self.age_range:
            db.session.add(self)
            db.session.commit()

    def delete_age_range(ccn_age_range):
        q = AgeRange.query.filter(AgeRange.ccn_age_range == ccn_age_range).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_id(ccn_age_range):
        return AgeRange.query.get(ccn_age_range)
