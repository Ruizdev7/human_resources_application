from hhrr_app import db


class Role(db.Model):
    __tablename__ = "tbl_roles"
    ccn_role = db.Column(db.Integer, primary_key=True)
    area = db.Column(db.String(50), nullable=True)
    role = db.Column(db.String(50), nullable=True)
    process = db.Column(db.String(50), nullable=True)
    full_role = db.Column(db.String(250), nullable=True)

    rel_employement_relationship = db.relationship(
        "EmploymentRelationship", backref="Role"
    )

    rel_rbac = db.relationship("RBAC", backref="Role")

    def __init__(
        self,
        area,
        role,
        process,
        full_role,
    ):
        self.area = area
        self.role = role
        self.process = process
        self.full_role = full_role.upper()
    def __repr__(self):
        return f"Role: {self.role}"

    def choice_query():
        return Role.query

    def save(self):
        if not self.ccn_role:
            db.session.add(self)
            db.session.commit()

    def delete_role(ccn_role):
        q = Role.query.filter(Role.ccn_role == ccn_role).first()
        db.session.delete(q)
        db.session.commit()
        return print(q)

    @staticmethod
    def get_by_id(ccn_role):
        return Role.query.get(ccn_role)
