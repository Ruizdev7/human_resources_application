from hhrr_app import db


class TypeRelationship(db.Model):

    __tablename__ = "tbl_type_relationship"
    ccn_type_relationship = db.Column(db.Integer, primary_key=True)
    description_type_relationship = db.Column(db.String(40), nullable=False)

    # Relationships
    rel_employement_relationship = db.relationship(
        "EmploymentRelationship", backref="TypeRelationship"
    )

    def __init__(self, description_type_relationship):

        self.description_type_relationship = description_type_relationship

    def choice_query():
        return TypeRelationship.query

    def __repr__(self):
        return f"TypeRelationship: {self.description_type_relationship}"

    def delete_type_relationship(ccn_type_relationship):
        q = TypeRelationship.query.filter(
            TypeRelationship.ccn_type_relationship == ccn_type_relationship
        ).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_ccn(ccn_type_relationship):
        return TypeRelationship.query.get(ccn_type_relationship)
