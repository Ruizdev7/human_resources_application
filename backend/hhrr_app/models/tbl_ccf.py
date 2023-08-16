from hhrr_app import db


class CCF(db.Model):

    __tablename__ = "tbl_ccf"
    ccn_ccf = db.Column(db.Integer, primary_key=True)
    code_ccf = db.Column(db.String(40), nullable=False)
    nit_ccf = db.Column(db.String(20), nullable=False)
    dig_ver = db.Column(db.Integer, nullable=True)
    description_ccf = db.Column(db.String(100), nullable=False)

    rel_ss_employee = db.relationship("SSEmployee", backref="CCF")

    def __init__(self, code_ccf, nit_ccf, dig_ver, description_ccf):

        self.code_ccf = code_ccf
        self.nit_ccf = nit_ccf
        self.dig_ver = dig_ver
        self.description_ccf = description_ccf

    def choice_query():
        return CCF.query

    def __repr__(self):
        return f"CCF: {self.description_ccf}"

    @staticmethod
    def delete_ccf(ccn_ccf):
        query_ccf = CCF.query.filter(CCF.ccn_ccf == ccn_ccf).first()
        db.session.delete(query_ccf)
        db.session.commit()
        return print(query_ccf)

    @staticmethod
    def get_by_id(ccn_ccf):
        return CCF.query.get(ccn_ccf)
