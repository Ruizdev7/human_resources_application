from hhrr_app import db


class PsychoactiveSubstancesEmployee(db.Model):
    __tablename__ = "tbl_psychoactive_substances_employee"
    ccn_psychoactive_substances_employee = db.Column(db.Integer, primary_key=True)
    ccn_employee = db.Column(
        db.Integer, db.ForeignKey("tbl_employee.ccn_employee"), unique=False
    )
    ccn_psychoactive_substances = db.Column(
        db.Integer, db.ForeignKey("tbl_psychoactive_substances_.ccn_psychoactive_substances"), unique=False
    )

    #Relationship
    rel_health_codition_psychoactive_substances_employee = db.relationship(
        "HealthCondition", backref="Psychoactive Substances Employee", lazy=True
    )

    def __init__(
        self,
        ccn_employee,
        psychoactive_substances,
    ):
        self.ccn_employee = ccn_employee
        self.psychoactive_substances = psychoactive_substances

    def __repr__(self):
        return f"Psychoactive Substances Employee: {self.ccn_psychoactive_substances_employee}"

    def save(self):
        if not self.ccn_psychoactive_substances_employee:
            db.session.add(self)
            db.session.commit()

    def delete_psychoactive_substances_employee(ccn_psychoactive_substances_employee):
        q = PsychoactiveSubstancesEmployee.query.filter(PsychoactiveSubstancesEmployee.ccn_psychoactive_substances_employee == ccn_psychoactive_substances_employee).first()
        db.session.delete(q)
        db.session.commit()
        return print(q)

    @staticmethod
    def get_by_id(ccn_psychoactive_substances_employee):
        return PsychoactiveSubstancesEmployee.query.get(ccn_psychoactive_substances_employee)
