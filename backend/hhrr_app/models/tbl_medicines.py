from hhrr_app import db


class Medicines(db.Model):
    __tablename__ = "tbl_medicines"
    ccn_medicines = db.Column(db.Integer, primary_key=True)
    medicines = db.Column(db.String(100), nullable=True)

    #Relationship
    rel_health_codition_medicines = db.relationship(
        "HealthCondition", backref="Medicines", lazy=True
    )

    def __init__(
        self,
        medicines,
    ):
        self.medicines = medicines

    def __repr__(self):
        return f"Medicines: {self.ccn_medicines}"

    def save(self):
        if not self.ccn_medicines:
            db.session.add(self)
            db.session.commit()

    def delete_medicines(ccn_medicines):
        q = Medicines.query.filter(Medicines.ccn_medicines == ccn_medicines).first()
        db.session.delete(q)
        db.session.commit()
        return print(q)

    @staticmethod
    def get_by_id(ccn_medicines):
        return Medicines.query.get(ccn_medicines)
