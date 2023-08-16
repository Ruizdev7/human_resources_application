from hhrr_app import db
from datetime import datetime

class TrialTimeEvaluation(db.Model):
    __tablename__ = "tbl_trial_time_evaluation"
    ccn_trial_time_evaluation = db.Column(db.Integer, primary_key=True)
    ccn_employee = db.Column(db.Integer, db.ForeignKey("tbl_employee.ccn_employee"))
    ccn_hhrr_manager =  db.Column(db.Integer, db.ForeignKey("tbl_employee.ccn_employee"))
    ccn_immediate_boss = db.Column(db.Integer, db.ForeignKey("tbl_employee.ccn_employee"))
    ccn_order_state = db.Column(db.Integer, db.ForeignKey("tbl_states_performance_evaluation.ccn_states_performance_evaluation"))
    date_employee_response = db.Column(db.Date, nullable=False)
    date_immediate_boss = db.Column(db.Date, nullable=False)
    created_date = db.Column(db.Date, nullable=False)
    hhrr_manager_date = db.Column(db.Date, nullable=False)

    def __init__(
            self,
            ccn_employee,
            ccn_hhr_manager,
            ccn_immediate_boss,
            ccn_order_state,
    ):
        self.ccn_employee = ccn_employee
        self.ccn_hhr_manager = ccn_hhr_manager
        self.ccn_immediate_boss = ccn_immediate_boss
        self.ccn_order_state = ccn_order_state
        self.created_date = datetime.now()
    
    rel_trial_time_evolution = db.relationship("StatesPerformanceEvaluation", backref="TrialTimeEvaluation")
    
    
