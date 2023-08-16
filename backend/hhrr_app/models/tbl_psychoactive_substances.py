from hhrr_app import db


class PsychoactiveSubstances(db.Model):
    __tablename__ = "tbl_psychoactive_substances"
    ccn_psychoactive_substances = db.Column(db.Integer, primary_key=True)
    psychoactive_substances = db.Column(db.String(100), nullable=True)

    #Relationship
    rel_health_codition_psychoactive_substances = db.relationship(
        "HealthCondition", backref="Psychoactive Substances", lazy=True
    )

    def __init__(
        self,
        psychoactive_substances,
    ):
        self.psychoactive_substances = psychoactive_substances

    def __repr__(self):
        return f"Psychoactive Substances: {self.ccn_psychoactive_substances}"

    def save(self):
        if not self.ccn_psychoactive_substances:
            db.session.add(self)
            db.session.commit()

    def delete_psychoactive_substances(ccn_psychoactive_substances):
        q = PsychoactiveSubstances.query.filter(PsychoactiveSubstances.ccn_psychoactive_substances == ccn_psychoactive_substances).first()
        db.session.delete(q)
        db.session.commit()
        return print(q)

    @staticmethod
    def get_by_id(ccn_psychoactive_substances):
        return PsychoactiveSubstances.query.get(ccn_psychoactive_substances)
