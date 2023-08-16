from hhrr_app import db


class AAP(db.Model):

    __tablename__ = "tbl_aap"
    ccn_aap = db.Column(db.Integer, primary_key=True)
    code_aap = db.Column(db.String(40), nullable=False)
    nit_aap = db.Column(db.String(20), nullable=False)
    dig_ver = db.Column(db.Integer, nullable=True)
    description_aap = db.Column(db.String(100), nullable=False)

    rel_ss_employee = db.relationship("SSEmployee", backref="AAP")

    def __init__(self, code_aap, nit_aap, dig_ver, description_aap):

        self.code_aap = code_aap
        self.nit_aap = nit_aap
        self.dig_ver = dig_ver
        self.description_aap = description_aap

    def choice_query():
        return AAP.query

    def __repr__(self):
        return f"AAP: {self.description_aap}"

    @staticmethod
    def delete_aap(ccn_aap):
        query_aap = AAP.query.filter(AAP.ccn_aap == ccn_aap).first()
        db.session.delete(query_aap)
        db.session.commit()
        return print(query_aap)

    @staticmethod
    def get_by_id(ccn_aap):
        return AAP.query.get(ccn_aap)
