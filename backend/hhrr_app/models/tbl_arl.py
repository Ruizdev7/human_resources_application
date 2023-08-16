from hhrr_app import db


class ARL(db.Model):

    __tablename__ = "tbl_arl"
    ccn_arl = db.Column(db.Integer, primary_key=True)
    code_arl = db.Column(db.String(40), nullable=False)
    nit_arl = db.Column(db.String(20), nullable=False)
    dig_ver = db.Column(db.Integer, nullable=True)
    description_arl = db.Column(db.String(100), nullable=False)

    rel_ss_employee = db.relationship("SSEmployee", backref="ARL")

    def __init__(self, code_arl, nit_arl, dig_ver, description_arl):

        self.code_arl = code_arl
        self.nit_arl = nit_arl
        self.dig_ver = dig_ver
        self.description_arl = description_arl

    def choice_query():
        return ARL.query

    def __repr__(self):
        return f"ARL: {self.description_arl}"

    @staticmethod
    def delete_arl(ccn_arl):
        query_arl = ARL.query.filter(ARL.ccn_arl == ccn_arl).first()
        db.session.delete(query_arl)
        db.session.commit()
        return print(query_arl)

    @staticmethod
    def get_by_id(ccn_arl):
        return ARL.query.get(ccn_arl)
