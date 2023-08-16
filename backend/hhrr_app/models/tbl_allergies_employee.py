from hhrr_app import db


class AllergiesEmployee(db.Model):
    __tablename__ = "tbl_allergies_employee"
    ccn_allergies_employee = db.Column(db.Integer, primary_key=True)
    ccn_employee = db.Column(
        db.Integer, db.ForeignKey("tbl_employee.ccn_employee"), unique=False
    )
    ccn_allergies = db.Column(
        db.Integer, db.ForeignKey("tbl_allergies.ccn_allergies"), unique=False
    )

    #Relationship
    rel_health_codition_allergies_employee = db.relationship(
        "HealthCondition", backref="Allergies Employee", lazy=True
    )

    def __init__(
        self,
        ccn_employee,
        ccn_allergies,
    ):
        self.ccn_employee = ccn_employee
        self.ccn_allergies = ccn_allergies


    def __repr__(self):
        return f"Allergies Employee: {self.ccn_allergies_employee}"

    def save(self):
        if not self.ccn_allergies_employee:
            db.session.add(self)
            db.session.commit()

    def delete_allergies_employee(ccn_allergies_employee):
        q = AllergiesEmployee.query.filter(AllergiesEmployee.ccn_allergies_employee == ccn_allergies_employee).first()
        db.session.delete(q)
        db.session.commit()
        return print(q)

    @staticmethod
    def get_by_id(ccn_allergies_employee):
        return AllergiesEmployee.query.get(ccn_allergies_employee)
