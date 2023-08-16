from hhrr_app import db


class RBACModule(db.Model):
    __tablename__ = "tbl_RBAC_modules"
    ccn_rbac_module = db.Column(db.Integer, primary_key=True)
    rbac_module = db.Column(db.String(100), nullable=True)

    rel_rbac = db.relationship("RBAC", backref="RBACModule")

    def __init__(self, rbac_module):
        self.rbac_module = rbac_module

    def choice_query():
        return RBACModule.query

    def __repr__(self):
        return f"RBAC_Module: {self.rbac_module}"

    @staticmethod
    def delete_rbac_module(ccn_rbac_module):
        query_rbac_module = RBACModule.query.filter(
            RBACModule.ccn_rbac_module == ccn_rbac_module
        ).first()
        db.session.delete(query_rbac_module)
        db.session.commit()
        return print(query_rbac_module)
