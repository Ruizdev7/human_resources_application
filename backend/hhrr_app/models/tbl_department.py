from hhrr_app import db
from hhrr_app.models.tbl_demographic_data import DemographicData


class Department(db.Model):
    __tablename__ = "tbl_department"
    ccn_department = db.Column(db.Integer, primary_key=True)
    id_department = db.Column(db.Integer, nullable=False)
    descripcion_department = db.Column(db.String(60), nullable=False)
    ccn_country = db.Column(
        db.Integer,
        db.ForeignKey("tbl_country.ccn_country"),
        nullable=False,
    )
    rel_department = db.relationship("City", backref="Department")

    rel_birth_department = db.relationship(
        "DemographicData",
        backref="DepartmentBirth",
        foreign_keys=[DemographicData.birth_department],
        lazy=True,
    )
    rel_department_residence = db.relationship(
        "DemographicData",
        backref="DepartmentResidence",
        foreign_keys=[DemographicData.department_residence],
        lazy=True,
    )

    def __init__(self, id_department, descripcion_department, ccn_country):
        self.id_department = id_department
        self.descripcion_department = descripcion_department
        self.ccn_country = ccn_country

    def choice_query():
        return Department.query

    def __repr__(self):
        return f"Department: {self.descripcion_department}"

    def save(self):
        if not self.ccn_department:
            db.session.add(self)
        db.session.commit()

    def delete_department(ccn_department):
        q = Department.query.filter(Department.id_department == ccn_department).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_id(ccn_department):
        return Department.query.get(ccn_department)
