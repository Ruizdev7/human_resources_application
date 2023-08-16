from hhrr_app import db

class History(db.Model):
    __tablename__ = "tbl_history"
    ccn_history = db.Column(db.Integer, primary_key=True)
    ccn_employee = db.Column(
        db.Integer, db.ForeignKey("tbl_employee.ccn_employee"), unique=False
    )
    ccn_manager = db.Column(
        db.Integer, db.ForeingKey("tbl_employee.ccn_employee"), unique=False
    )
    ccn_inmediate_boss = db.Column(
        db.Integer, db.ForeingKey("tbl_employee.ccn_employee"), unique=False
    )
    ccn_last_role = db.Column(
        db.Integer, db.ForeignKey("tbl_role.ccn_role"), unique=False
    )
    ccn_new_role = db.Column(
        db.Integer, db.ForeignKey("tbl_role.ccn_role"), unique=False
    )
    time_details = db.Column(db.String(150), nullable=True)
    employee_picture = db.Column(db.String(250), nullable=True)
    initial_date = db.Column(db.DateTime, nullable=True)
    final_date = db.Column(db.DateTime, nullable=True)

    def __init__(
        self,
        ccn_employee,
        ccn_manager,
        ccn_inmediate_boss,
        ccn_last_role,
        ccn_new_role,
    ):
        self.ccn_employee = ccn_employee
        self.ccn_manager = ccn_manager
        self.ccn_inmediate_boss = ccn_inmediate_boss
        self.ccn_last_role = ccn_last_role
        self.ccn_new_role = ccn_new_role


    def __repr__(self):
        return f"History: {self.ccn_history}"

    def save(self):
        if not self.ccn_history:
            db.session.add(self)
            db.session.commit()

    def delete_history(ccn_history):
        q = History.query.filter(History.ccn_history == ccn_history).first()
        db.session.delete(q)
        db.session.commit()
        return print(q)

    @staticmethod
    def get_by_id(ccn_history):
        return History.query.get(ccn_history)
