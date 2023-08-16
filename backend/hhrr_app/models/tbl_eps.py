from hhrr_app import db


class EPS(db.Model):

    __tablename__ = "tbl_eps"
    ccn_eps = db.Column(db.Integer, primary_key=True)
    code_eps = db.Column(db.String(40), nullable=True)
    code_sgp_eps = db.Column(db.String(40), nullable=True)
    nit_eps = db.Column(db.String(20), nullable=False)
    dig_ver = db.Column(db.Integer, nullable=True)
    description_eps = db.Column(db.String(100), nullable=False)

    rel_ss_employee = db.relationship("SSEmployee", backref="EPS")

    def __init__(self, code_eps, code_sgp_eps, nit_eps, dig_ver, description_eps):
        self.code_eps = code_eps
        self.code_sgp_eps = code_sgp_eps
        self.nit_eps = nit_eps
        self.dig_ver = dig_ver
        self.description_eps = description_eps

    def choice_query():
        return EPS.query

    def __repr__(self):
        return f"EPS: {self.description_eps}"

    @staticmethod
    def delete_eps(ccn_eps):
        query_eps = EPS.query.filter(EPS.ccn_eps == ccn_eps).first()
        db.session.delete(query_eps)
        db.session.commit()
        return print(query_eps)

    @staticmethod
    def get_by_id(ccn_eps):
        return EPS.query.get(ccn_eps)
