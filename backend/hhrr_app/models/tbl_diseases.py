from hhrr_app import db


class Diseases(db.Model):
    __tablename__ = "tbl_diseases"
    ccn_diseases = db.Column(db.Integer, primary_key=True)
    diseases = db.Column(db.String(150), nullable=True)
    
    #Relationship
    rel_health_codition_diseases = db.relationship(
        "HealthCondition", backref="Diseases", lazy=True
    )

    def __init__(
        self,
        diseases,
    ):
        self.diseases = diseases

    def __repr__(self):
        return f"Enfermedad: {self.ccn_diseases}"

    def choice_query():
        return Diseases.query

    def save(self):
        if not self.ccn_diseases:
            db.session.add(self)
            db.session.commit()

    def delete_diseases(ccn_diseases):
        q = Diseases.query.filter(Diseases.ccn_diseases == ccn_diseases).first()
        db.session.delete(q)
        db.session.commit()
        return print(q)

    @staticmethod
    def get_by_id(ccn_diseases):
        return Diseases.query.get(ccn_diseases)
