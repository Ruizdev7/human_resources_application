from hhrr_app import db


class TypeAffiliation(db.Model):

    __tablename__ = "tbl_type_affiliation"
    ccn_type_affiliation = db.Column(db.Integer, primary_key=True)
    affiliation_code = db.Column(db.Integer, nullable=False)
    description_type_affiliation = db.Column(db.String(30), nullable=False)

    rel_ss_employee = db.relationship("SSEmployee", backref="TypeAffiliation")

    def __init__(self, affiliation_code, description_type_affiliation):

        self.affiliation_code = affiliation_code
        self.description_type_affiliation = description_type_affiliation

    def choice_query():
        return TypeAffiliation.query

    def __repr__(self):
        return f"TypeAffiliation: {self.description_type_affiliation}"

    @staticmethod
    def delete_type_affiliation(ccn_type_affiliation):
        query_type_affiliation = TypeAffiliation.query.filter(
            TypeAffiliation.ccn_type_affiliation == ccn_type_affiliation
        ).first()
        db.session.delete(query_type_affiliation)
        db.session.commit()
        return print(query_type_affiliation)

    @staticmethod
    def get_by_id(ccn_type_affiliation):
        return TypeAffiliation.query.get(ccn_type_affiliation)
