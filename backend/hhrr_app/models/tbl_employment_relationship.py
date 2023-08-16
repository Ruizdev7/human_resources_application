from hhrr_app import db
from hhrr_app.models.tbl_performance_evaluation import PerformanceEvaluation


class EmploymentRelationship(db.Model):
    __tablename__ = "tbl_employment_relationship"
    ccn_employment_relationship = db.Column(db.Integer, primary_key=True)
    ccn_employee = db.Column(
        db.Integer, db.ForeignKey("tbl_employee.ccn_employee"), unique=True
    )
    ccn_role = db.Column(db.Integer, db.ForeignKey("tbl_roles.ccn_role"))
    ccn_work_shift = db.Column(
        db.Integer, db.ForeignKey("tbl_work_shift.ccn_work_shift")
    )
    binding_date = db.Column(db.Date, nullable=False)
    termination_date = db.Column(db.Date, nullable=True)
    time_worked = db.Column(db.String(255), nullable=False)
    pending_days_to_enjoy_for_holidays = db.Column(db.Float, nullable=True)
    ccn_type_relationship = db.Column(
        db.Integer, db.ForeignKey("tbl_type_relationship.ccn_type_relationship")
    )

    employee_corporate_email = db.Column(db.String(100), nullable=False)
    employee_corporate_cellphone = db.Column(db.BigInteger, nullable=False)
    immediate_boss = db.Column(db.Integer, db.ForeignKey("tbl_employee.ccn_employee"))
    manager = db.Column(db.Integer, db.ForeignKey("tbl_employee.ccn_employee"))
    type_of_charge = db.Column(db.String(50), nullable=False)
    is_active_employee = db.Column(db.Boolean, nullable=True)

    # rel_administrator_performance_evaluation = db.relationship("AdministrativePerformanceEvaluation", backref="RelationshipEmployee")
    # rel_operative_performance_evaluation = db.relationship("OperativePerformanceEvaluation", backref="RelationshipEmployee")
    # rel_directive_performance_evaluation = db.relationship("DirectivePerformanceEvaluation", backref="RelationshipEmployee")

    rel_employement_relationship_immediate_boss = db.relationship(
        "PerformanceEvaluation",
        backref="ImmediateBoss",
        foreign_keys=[PerformanceEvaluation.immediate_boss],
        lazy=True,
    )
    rel_employement_relationship_manager = db.relationship(
        "PerformanceEvaluation",
        backref="Manager",
        foreign_keys=[PerformanceEvaluation.manager],
        lazy=True,
    )
    rel_employement_relationship_employee = db.relationship(
        "PerformanceEvaluation",
        backref="Employee",
        foreign_keys=[PerformanceEvaluation.ccn_employee],
        lazy=True,
    )

    def __init__(
        self,
        ccn_employee,
        ccn_role,
        ccn_work_shift,
        binding_date,
        time_worked,
        ccn_type_relationship,
        employee_corporate_email,
        employee_corporate_cellphone,
        immediate_boss,
        manager,
        type_of_charge,
        is_active_employee,
    ):
        self.ccn_employee = ccn_employee
        self.ccn_role = ccn_role
        self.ccn_work_shift = ccn_work_shift
        self.binding_date = binding_date
        self.time_worked = time_worked
        self.ccn_type_relationship = ccn_type_relationship
        self.employee_corporate_email = employee_corporate_email
        self.employee_corporate_cellphone = employee_corporate_cellphone
        self.immediate_boss = immediate_boss
        self.manager = manager
        self.type_of_charge = type_of_charge
        self.is_active_employee = is_active_employee

    def __repr__(self):
        return f"Registro de Afiliacion:{self.ccn_employee}"

    def delete_employment_relationship(ccn_employment_relationship):
        q = EmploymentRelationship.query.filter(
            EmploymentRelationship.ccn_employment_relationship
            == ccn_employment_relationship
        ).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    def choice_query():
        return EmploymentRelationship.query
