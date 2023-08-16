from hhrr_app import db


class Allergies(db.Model):
    __tablename__ = "tbl_allergies"
    ccn_allergies = db.Column(db.Integer, primary_key=True)
    allergies = db.Column(db.String(100), nullable=True)

    #Relationship
    rel_health_codition_allergies = db.relationship(
        "HealthCondition", backref="Allergies", lazy=True
    )

    def __init__(
        self,
        allergies,
    ):
        self.allergies = allergies

    def __repr__(self):
        return f"Allergies: {self.ccn_allergies}"

    def save(self):
        if not self.ccn_allergies:
            db.session.add(self)
            db.session.commit()

    def delete_allergies(ccn_allergies):
        q = Allergies.query.filter(Allergies.ccn_allergies == ccn_allergies).first()
        db.session.delete(q)
        db.session.commit()
        return print(q)

    @staticmethod
    def get_by_id(ccn_allergies):
        return Allergies.query.get(ccn_allergies)