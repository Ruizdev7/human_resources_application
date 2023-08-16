from hhrr_app import db

class TrialTimeEvaluationDetail(db.Model):
    __tablename__ = "tbl_trial_time_evaluation_detail"
    ccn_trial_time_evaluation_detail = db.Column(db.Integer, primary_key=True)
    ccn_trial_time_evaluation = db.Column(db.Integer, db.ForeignKey("tbl_trial_time_evaluation.ccn_trial_time_evaluation"))
    initiative_coperation = db.Column(db.Integer, nullable=True)
    teamwork = db.Column(db.Integer, nullable=True)
    responsability = db.Column(db.Integer, nullable=True)
    accountability_discipline = db.Column(db.Integer, nullable=True)
    work_quality = db.Column(db.Integer, nullable=True)
    productivity = db.Column(db.Integer, nullable=True)
    agility_discipline = db.Column(db.Integer, nullable=True)
    hseq = db.Column(db.Integer, nullable=True)
    total_score = db.Column(db.Integer, nullable=True)
    initial_induction = db.Column(db.Boolean, nullable=True)
    coorporative_principles = db.Column(db.Boolean, nullable=True)
    strength = db.Column(db.String(500), nullable=True)
    improve_areas = db.Column(db.String(500), nullable=True)
    employee_approval = db.Column(db.Boolean, nullable=True)  # employye
    employee_choice_reason = db.Column(db.String(500), nullable=True) # employye
    hhrr_approval = db.Column(db.Boolean, nullable=True)
    hhrr_choice_reason = db.Column(db.String(500), nullable=True)

    rel_rial_time_evaluation_detail_relationship_trial_time_evaluation= db.relationship(
        "TrialTimeEvaluation",
        backref="trialTimeEvaluation",
        lazy=True
    )

    def __init__(self, ccn_trial_time_evaluation):
        self.ccn_trial_time_evaluation = ccn_trial_time_evaluation
    