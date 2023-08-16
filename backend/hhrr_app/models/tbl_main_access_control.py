from hhrr_app import db


class MainAccessControl(db.Model):

    __tablename__ = "tbl_main_access_control"
    ccn_main_access_control = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(40), nullable=False)
    hour = db.Column(db.String(20), nullable=False)
    number_id_employee = db.Column(db.Integer, nullable=True)
    name = db.Column(db.String(100), nullable=False)
    area = db.Column(db.String(100), nullable=False)
    event = db.Column(db.String(100), nullable=False)
    observations = db.Column(db.String(200), nullable=True)

    def __init__(
            self, 
            date,
            hour,
            number_id_employee,
            name,
            area,
            event,
        ):

        self.date = date
        self.hour = hour
        self.number_id_employee = number_id_employee
        self.name = name
        self.area = area
        self.event = event

    def choice_query():
        return MainAccessControl.query

    def __repr__(self):
        return f"AFP: {self.ccn_main_access_control}"

    @staticmethod
    def delete_afp(ccn_main_access_control):
        query_main_access_control = MainAccessControl.query.filter(MainAccessControl.ccn_main_access_control == ccn_main_access_control).first()
        db.session.delete(query_main_access_control)
        db.session.commit()
        return print(query_main_access_control)

    @staticmethod
    def get_by_id(ccn_main_access_control):
        return MainAccessControl.query.get(ccn_main_access_control)
