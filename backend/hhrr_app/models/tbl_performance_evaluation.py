import datetime

from hhrr_app import db


class PerformanceEvaluation(db.Model):

    __tablename__ = "tbl_performance_evaluation"
    ccn_performance_evaluation = db.Column(db.Integer, primary_key=True)
    opening_date = db.Column(db.DateTime, nullable=True)
    entry_date = db.Column(db.DateTime, nullable=True)
    action_date = db.Column(db.DateTime, nullable=True)
    immediate_boss_question_date = db.Column(db.DateTime, nullable=True)
    employee_response_date = db.Column(db.DateTime, nullable=True)
    action_plan_date = db.Column(db.DateTime, nullable=True)
    finish_date = db.Column(db.DateTime, nullable=True)
    immediate_boss = db.Column(
        db.Integer, db.ForeignKey("tbl_employment_relationship.ccn_employee")
    )
    manager = db.Column(
        db.Integer, db.ForeignKey("tbl_employment_relationship.ccn_employee")
    )
    ccn_employee = db.Column(
        db.Integer, db.ForeignKey("tbl_employment_relationship.ccn_employee")
    )
    ccn_states_performance_evaluation = db.Column(
        db.Integer,
        db.ForeignKey(
            "tbl_states_performance_evaluation.ccn_states_performance_evaluation"
        ),
    )
    type_employee = db.Column(db.String(50), nullable=False)

    rel_administrative_pe = db.relationship(
        "AdministrativePE", backref="PerformanceEvaluation"
    )
    rel_directive_pe = db.relationship("DirectivePE", backref="PerformanceEvaluation")
    rel_operative_pe = db.relationship("OperativePE", backref="PerformanceEvaluation")
    

    def __init__(
        self,
        opening_date,
        immediate_boss,
        manager,
        ccn_employee,
        type_employee,
    ):
        self.opening_date = opening_date
        self.immediate_boss = immediate_boss
        self.manager = manager
        self.ccn_employee = ccn_employee
        self.ccn_states_performance_evaluation = 1
        self.entry_date = datetime.datetime.now()
        self.type_employee = type_employee

    def __repr__(self):
        return f"Performance Evaluation:{self.ccn_performance_evaluation}"

    def choice_query():
        return PerformanceEvaluation.query
