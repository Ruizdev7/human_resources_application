from hhrr_app import db


class SSEmployee(db.Model):
    __tablename__ = "tbl_ss_employee"
    ccn_ss_employee = db.Column(db.Integer, primary_key=True)
    ccn_employee = db.Column(
        db.Integer, db.ForeignKey("tbl_employee.ccn_employee"), unique=True
    )
    ccn_type_affiliation = db.Column(
        db.Integer, db.ForeignKey("tbl_type_affiliation.ccn_type_affiliation")
    )
    ccn_type_contributor = db.Column(
        db.Integer, db.ForeignKey("tbl_type_contributor.ccn_type_contributor")
    )
    ccn_eps = db.Column(db.Integer, db.ForeignKey("tbl_eps.ccn_eps"))
    ccn_afp = db.Column(db.Integer, db.ForeignKey("tbl_afp.ccn_afp"))
    ccn_arl = db.Column(db.Integer, db.ForeignKey("tbl_arl.ccn_arl"))
    ccn_ccf = db.Column(db.Integer, db.ForeignKey("tbl_ccf.ccn_ccf"))
    ccn_aap = db.Column(db.Integer, db.ForeignKey("tbl_aap.ccn_aap"))

    def __init__(
        self,
        ccn_employee,
        ccn_type_affiliation,
        ccn_type_contributor,
        ccn_eps,
        ccn_afp,
        ccn_arl,
        ccn_ccf,
        ccn_aap,
    ):
        self.ccn_employee = ccn_employee
        self.ccn_type_affiliation = ccn_type_affiliation
        self.ccn_type_contributor = ccn_type_contributor
        self.ccn_eps = ccn_eps
        self.ccn_afp = ccn_afp
        self.ccn_arl = ccn_arl
        self.ccn_ccf = ccn_ccf
        self.ccn_aap = ccn_aap

    def __repr__(self):
        return f"SS Employee:{self.ccn_employee}"

    def choice_query():
        return SSEmployee.query
