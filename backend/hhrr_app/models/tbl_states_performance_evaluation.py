from hhrr_app import db


class StatesPerformanceEvaluation(db.Model):
    __tablename__ = "tbl_states_performance_evaluation"
    ccn_states_performance_evaluation = db.Column(db.Integer, primary_key=True)
    states_performance_evaluation = db.Column(db.String(20), nullable=False)


    def __init__(self, states_performance_evaluation):
        self.states_performance_evaluation = states_performance_evaluation

    def choice_query():
        return StatesPerformanceEvaluation.query

    def __repr__(self):
        return f"StatesPerformanceEvaluation: {self.states_performance_evaluation}"

    def save(self):
        if not self.states_performance_evaluation:
            db.session.add(self)
            db.session.commit()

    def delete_rh(ccn_states_performance_evaluation):
        q = StatesPerformanceEvaluation.query.filter(
            StatesPerformanceEvaluation.ccn_states_performance_evaluation
            == ccn_states_performance_evaluation
        ).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_id(ccn_states_performance_evaluation):
        return StatesPerformanceEvaluation.query.get(ccn_states_performance_evaluation)
    
    rel_performance_evaluation = db.relationship(
        "PerformanceEvaluation", backref="StatesPerformanceEvaluation"
    )
