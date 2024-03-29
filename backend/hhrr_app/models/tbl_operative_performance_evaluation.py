from hhrr_app import db


class OperativePE(db.Model):

    __tablename__ = "tbl_operative_performance_evaluation"
    ccn_operative_performance_evaluation = db.Column(db.Integer, primary_key=True)
    ccn_performance_evaluation = db.Column(
        db.Integer,
        db.ForeignKey("tbl_performance_evaluation.ccn_performance_evaluation"),
    )
    ccn_employee = db.Column(
        db.Integer, db.ForeignKey("tbl_employment_relationship.ccn_employee")
    )
    engagement_or_productivity = db.Column(db.String(10), nullable=True)
    communication_skills = db.Column(db.String(10), nullable=True)
    adaptation_to_change = db.Column(db.String(10), nullable=True)
    learning_and_development = db.Column(db.String(10), nullable=True)
    organization = db.Column(db.String(10), nullable=True)
    continuous_improvement = db.Column(db.String(10), nullable=True)
    active_participation = db.Column(db.String(10), nullable=True)
    relations = db.Column(db.String(10), nullable=True)
    puntuality = db.Column(db.String(10), nullable=True)
    overall_score = db.Column(db.Integer, nullable=True)
    level_value = db.Column(db.String(50), nullable=True)
    employee_response = db.Column(db.String(300), nullable=True)
    first_action_plan = db.Column(db.String(50), nullable=True)
    first_action_plan_date = db.Column(db.String(10), nullable=True)
    first_period_of_execution = db.Column(db.String(100), nullable=True)
    second_action_plan = db.Column(db.String(50), nullable=True)
    second_action_plan_date = db.Column(db.String(10), nullable=True)
    second_period_of_execution = db.Column(db.String(100), nullable=True)
    third_action_plan = db.Column(db.String(50), nullable=True)
    third_action_plan_date = db.Column(db.String(10), nullable=True)
    third_period_of_execution = db.Column(db.String(100), nullable=True)
    immediate_boss_observation = db.Column(db.String(100), nullable=True)
    manager_response = db.Column(db.String(250), nullable=True)
    manager_approval = db.Column(db.Boolean, default=True)

    def __init__(self, ccn_performance_evaluation, ccn_employee):
        self.ccn_performance_evaluation = ccn_performance_evaluation
        self.ccn_employee = ccn_employee

    def __repr__(self):
        return f"Operatice Performance Evaluation:{self.ccn_operative_performance_evaluation}"

    def choice_query():
        return OperativePE.query
