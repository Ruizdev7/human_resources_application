from hhrr_app import db


class TypeContributor(db.Model):

    __tablename__ = "tbl_type_contributor"
    ccn_type_contributor = db.Column(db.Integer, primary_key=True)
    contributor_code = db.Column(db.Integer, nullable=False)
    description_type_contributor = db.Column(db.String(200), nullable=False)

    rel_ss_employee = db.relationship("SSEmployee", backref="TypeContributor")

    def __init__(self, contributor_code, description_type_contributor):

        self.contributor_code = contributor_code
        self.description_type_contributor = description_type_contributor

    def choice_query():
        return TypeContributor.query

    def __repr__(self):
        return f"TypeContributor: {self.description_type_contributor}"

    @staticmethod
    def delete_type_contributor(ccn_type_contributor):
        query_type_contributor = TypeContributor.query.filter(
            TypeContributor.ccn_type_contributor == ccn_type_contributor
        ).first()
        db.session.delete(query_type_contributor)
        db.session.commit()
        return print(query_type_contributor)

    @staticmethod
    def get_by_id(ccn_type_contributor):
        return TypeContributor.query.get(ccn_type_contributor)
