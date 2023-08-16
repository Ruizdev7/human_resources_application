from hhrr_app import db


class EmergencyContactDetails(db.Model):
    __tablename__ = "tbl_emergency_contact_details"
    ccn_emergency_contact_details = db.Column(db.Integer, primary_key=True)
    ccn_employee = db.Column(
        db.Integer, db.ForeignKey("tbl_employee.ccn_employee"), unique=True
    )
    emergency_contact = db.Column(db.String(60), nullable=False)
    ccn_relationship = db.Column(
        db.Integer, db.ForeignKey("tbl_relationship.ccn_relationship")
    )
    cellphone = db.Column(db.BigInteger, nullable=False)

    def __init__(
        self,
        ccn_employee,
        emergency_contact,
        ccn_relationship,
        cellphone,
    ):
        self.ccn_employee = ccn_employee
        self.emergency_contact = emergency_contact
        self.ccn_relationship = ccn_relationship
        self.cellphone = cellphone

    def __repr__(self):
        return f"Contacto de Emergencia :{self.emergency_contact}"

    def delete_emergency_contact_details(ccn_emergency_contact_details):
        q = EmergencyContactDetails.query.filter(
            EmergencyContactDetails.ccn_emergency_contact_details
            == ccn_emergency_contact_details
        ).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    def choice_query():
        return EmergencyContactDetails.query
