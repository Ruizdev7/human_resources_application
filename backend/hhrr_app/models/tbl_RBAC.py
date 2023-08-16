from hhrr_app import db


class RBAC(db.Model):
    __tablename__ = "tbl_RBAC"
    ccn_rbac = db.Column(db.Integer, primary_key=True)
    ccn_role = db.Column(db.Integer, db.ForeignKey("tbl_roles.ccn_role"), nullable=True)
    ccn_rbac_module = db.Column(
        db.Integer, db.ForeignKey("tbl_RBAC_modules.ccn_rbac_module"), nullable=True
    )
    create_access = db.Column(db.Boolean, default=False)
    read_access = db.Column(db.Boolean, default=False)
    update_access = db.Column(db.Boolean, default=False)
    delete_access = db.Column(db.Boolean, default=False)

    def __init__(
        self,
        ccn_role,
        ccn_rbac_module,
        create_access,
        read_access,
        update_access,
        delete_access,
    ):
        self.ccn_role = ccn_role
        self.ccn_rbac_module = ccn_rbac_module
        self.create_access = create_access
        self.read_access = read_access
        self.update_access = update_access
        self.delete_access = delete_access

    def choice_query():
        return RBAC.query

    def __repr__(self):
        return f"RBAC: {self.ccn_role}"

    @staticmethod
    def delete_rbac(ccn_rbac):
        query_rbac = RBAC.query.filter(RBAC.ccn_rbac == ccn_rbac).first()
        db.session.delete(query_rbac)
        db.session.commit()
        return print(query_rbac)
