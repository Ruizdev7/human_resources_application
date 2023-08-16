from hhrr_app import db


class AFP(db.Model):

    __tablename__ = "tbl_afp"
    ccn_afp = db.Column(db.Integer, primary_key=True)
    code_afp = db.Column(db.String(40), nullable=False)
    nit_afp = db.Column(db.String(20), nullable=False)
    dig_ver = db.Column(db.Integer, nullable=True)
    description_afp = db.Column(db.String(100), nullable=False)

    rel_ss_employee = db.relationship("SSEmployee", backref="AFP")

    def __init__(self, code_afp, nit_afp, dig_ver, description_afp):

        self.code_afp = code_afp
        self.nit_afp = nit_afp
        self.dig_ver = dig_ver
        self.description_afp = description_afp

    def choice_query():
        return AFP.query

    def __repr__(self):
        return f"AFP: {self.description_afp}"

    @staticmethod
    def delete_afp(ccn_afp):
        query_afp = AFP.query.filter(AFP.ccn_afp == ccn_afp).first()
        db.session.delete(query_afp)
        db.session.commit()
        return print(query_afp)

    @staticmethod
    def get_by_id(ccn_afp):
        return AFP.query.get(ccn_afp)
