from hhrr_app import db


class Relationship(db.Model):
    __tablename__ = "tbl_relationship"
    ccn_relationship = db.Column(db.Integer, primary_key=True)
    relationship = db.Column(db.String(50), nullable=True)
    relationship_level = db.Column(db.String(50), nullable=True)

    rel_emergency_contact_details = db.relationship(
        "EmergencyContactDetails", backref="Relationship"
    )

    def __init__(
        self,
        relationship,
        relationship_level,
    ):
        self.relationship = relationship
        self.relationship_level = relationship_level

    def __repr__(self):
        return f"Parentesco: {self.relationship}"

    def choice_query():
        return Relationship.query

    def delete_relationship(ccn_relationship):
        q = Relationship.query.filter(
            Relationship.ccn_relationship == ccn_relationship
        ).first()
        db.session.delete(q)
        db.session.commit()
        return print(q)

    @staticmethod
    def get_by_ccn(ccn_relationship):
        return Relationship.query.get(ccn_relationship)
