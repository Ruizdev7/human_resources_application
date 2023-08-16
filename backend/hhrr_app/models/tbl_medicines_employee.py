from hhrr_app import db


class MedicinesEmployee(db.Model):
    __tablename__ = "tbl_medicines_employee"
    ccn_medicines_employee = db.Column(db.Integer, primary_key=True)
    ccn_employee = db.Column(
        db.Integer, db.ForeignKey("tbl_employee.ccn_employee"), unique=False
    )
    ccn_medicines = db.Column(
        db.Integer, db.ForeignKey("tbl_medicines.ccn_medicines"), unique=False
    )
    #Relationship
    rel_health_codition_medicines_employee = db.relationship(
        "HealthCondition", backref="Medicines Employee", lazy=True
    )

    def __init__(
        self,
        ccn_employee,
        ccn_medicines,
    ):
        self.medicines_employee = ccn_employee
        self.ccn_medicines = ccn_medicines

    def __repr__(self):
        return f"Medicines Employee: {self.ccn_medicines_employee}"

    def save(self):
        if not self.ccn_medicines_employee:
            db.session.add(self)
            db.session.commit()

    def delete_medicines_employee(ccn_medicines_employee):
        q = MedicinesEmployee.query.filter(MedicinesEmployee.ccn_medicines_employee == ccn_medicines_employee).first()
        db.session.delete(q)
        db.session.commit()
        return print(q)

    @staticmethod
    def get_by_id(ccn_medicines_employee):
        return MedicinesEmployee.query.get(ccn_medicines_employee)
