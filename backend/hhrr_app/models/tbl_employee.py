from datetime import datetime

from hhrr_app import db
from hhrr_app.models.tbl_message import Message
from hhrr_app.models.tbl_employment_relationship import EmploymentRelationship


class Employee(db.Model):
    __tablename__ = "tbl_employee"
    ccn_employee = db.Column(db.Integer, primary_key=True)
    ccn_type_id = db.Column(db.Integer, db.ForeignKey("tbl_type_id.ccn_type_id"))
    number_id_employee = db.Column(db.BigInteger, nullable=False, unique=True)
    first_name_employee = db.Column(db.String(30), nullable=False)
    middle_name_employee = db.Column(db.String(30), nullable=True)
    first_last_name_employee = db.Column(db.String(30), nullable=False)
    second_last_name_employee = db.Column(db.String(30), nullable=True)
    full_name_employee = db.Column(db.String(200), nullable=False)
    date_birth_employee = db.Column(db.Date, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    age_range = db.Column(db.Integer, db.ForeignKey("tbl_age_range.ccn_age_range"))
    auto_perceived_gender = db.Column(
        db.Integer, db.ForeignKey("tbl_auto_perceived_gender.ccn_auto_perceived_gender")
    )
    rh = db.Column(db.Integer, db.ForeignKey("tbl_rh.ccn_rh"))
    employee_personal_email = db.Column(db.String(100), nullable=False)
    employee_personal_cellphone = db.Column(db.BigInteger, nullable=False)
    informed_consent_law_1581 = db.Column(db.String(10), nullable=False)
    image = db.Column(db.String(255), nullable=True)
    employee_password = db.Column(db.String(300), nullable=False)
    last_message_read_time = db.Column(db.DateTime)
    ccn_marital_status = db.Column(
        db.Integer,
        db.ForeignKey("tbl_marital_status.ccn_marital_status"),
        nullable=False,
    )

    rel_ss_employee = db.relationship("SSEmployee", backref="Employee")

    rel_employement_relationship_employee = db.relationship(
        "EmploymentRelationship",
        backref="Employee",
        foreign_keys=[EmploymentRelationship.ccn_employee],
        lazy=True,
    )
    rel_employement_relationship_immediate_boss = db.relationship(
        "EmploymentRelationship",
        backref="ImmediateBoss",
        foreign_keys=[EmploymentRelationship.immediate_boss],
        lazy=True,
    )
    rel_employement_relationship_manager = db.relationship(
        "EmploymentRelationship",
        backref="Manager",
        foreign_keys=[EmploymentRelationship.manager],
        lazy=True,
    )
    rel_demographic_data = db.relationship("DemographicData", backref="Employee")
    rel_emergency_contact_details = db.relationship(
        "EmergencyContactDetails", backref="Employee"
    )
    rel_sociodemographic_data = db.relationship(
        "SociodemographicData", backref="Employee"
    )
    rel_family_nucleus = db.relationship("FamilyNucleus", backref="Employee")
    rel_health_condition = db.relationship("HealthCondition", backref="Employee")

    rel_messages_sent = db.relationship(
        "Message", backref="sender", foreign_keys=[Message.ccn_sender], lazy=True
    )

    messages_received = db.relationship(
        "Message",
        backref="recipient",
        foreign_keys="Message.ccn_recipient",
        lazy=True,
    )

    # rel_employee_relationship_notification = db.relationship(
    #     "Notification", backref="employee",lazy=True
    # )

    # rel_trial_time_evolution_employee = db.relationship(
    #     "TrialTimeEvaluation", backref="employee", lazy=True
    # )

    # rel_trial_time_evolution_hhrr_manager = db.relationship(
    #     "TrialTimeEvaluation", backref="hhrr_manager", lazy=True
    # )

    # rel_trial_time_evolution_immediate_boss = db.relationship(
    #     "TrialTimeEvaluation", backref="immediate_boss", lazy=True
    # )

    def __init__(
        self,
        ccn_employee,
        ccn_type_id,
        number_id_employee,
        first_name_employee,
        middle_name_employee,
        first_last_name_employee,
        second_last_name_employee,
        date_birth_employee,
        age,
        age_range,
        auto_perceived_gender,
        rh,
        employee_personal_email,
        employee_personal_cellphone,
        informed_consent_law_1581,
        ccn_marital_status,
        image,
        employee_password,
    ):
        self.ccn_employee = ccn_employee
        self.ccn_type_id = ccn_type_id
        self.number_id_employee = number_id_employee
        self.first_name_employee = first_name_employee
        self.middle_name_employee = middle_name_employee
        self.first_last_name_employee = first_last_name_employee
        self.second_last_name_employee = second_last_name_employee
        self.full_name_employee = f"{first_name_employee} {middle_name_employee} {first_last_name_employee} {second_last_name_employee}"
        self.date_birth_employee = date_birth_employee
        self.age = age
        self.age_range = age_range
        self.auto_perceived_gender = auto_perceived_gender
        self.rh = rh
        self.employee_personal_email = employee_personal_email
        self.employee_personal_cellphone = employee_personal_cellphone
        self.informed_consent_law_1581 = informed_consent_law_1581
        self.ccn_marital_status = ccn_marital_status
        self.image = image
        self.employee_password = employee_password

    def new_messages(self):
        last_read_time = self.last_message_read_time or datetime(1900, 1, 1)
        return (
            Message.query.filter_by(recipient=self)
            .filter(Message.timestamp > last_read_time)
            .count()
        )

    def choice_query():
        return Employee.query

    def __repr__(self):
        return f"Employee: {self.full_name_employee}"
