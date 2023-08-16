from hhrr_app import db


class FamilyNucleus(db.Model):
    __tablename__ = "tbl_family_nucleus"
    ccn_family_nucleus = db.Column(db.Integer, primary_key=True)
    ccn_employee = db.Column(
        db.Integer,
        db.ForeignKey("tbl_employee.ccn_employee"),
        nullable=False,
    )
    number_of_children = db.Column(db.BigInteger, nullable=True)  # numero de hijos
    ccn_type_id = db.Column(
        db.Integer,
        db.ForeignKey("tbl_type_id.ccn_type_id"),
        nullable=False,
    )  # Foreign Key Tipo de documento
    number_id = db.Column(db.BigInteger, nullable=True)  # id del hijo
    ccn_auto_perceived_gender = db.Column(
        db.Integer,
        db.ForeignKey("tbl_auto_perceived_gender.ccn_auto_perceived_gender"),
        nullable=False,
    )  # probably Foreign key
    first_name = db.Column(db.String(30), nullable=True)
    middle_name = db.Column(db.String(30), nullable=True)
    first_last_name = db.Column(db.String(30), nullable=True)
    second_last_name = db.Column(db.String(30), nullable=True)
    date_of_birth = db.Column(db.Date, nullable=True)
    age = db.Column(db.Integer, nullable=True)  # Campo autocalculado?
    age_range = db.Column(
        db.Integer,
        db.ForeignKey("tbl_age_range.ccn_age_range"),
        nullable=False,
    )
    ccn_schooling_level = db.Column(
        db.Integer,
        db.ForeignKey("tbl_schooling_level.ccn_schooling_level"),
        nullable=False,
    )  # Probably Foreign Key de escolaridad

    def __init__(
        self,
        ccn_employee,
        number_of_children,
        ccn_type_id,
        number_id,
        ccn_auto_perceived_gender,
        first_name,
        middle_name,
        first_last_name,
        second_last_name,
        date_of_birth,
        age,
        age_range,
        ccn_schooling_level,
    ):
        self.ccn_employee = ccn_employee
        self.number_of_children = number_of_children
        self.ccn_type_id = ccn_type_id
        self.number_id = number_id
        self.ccn_auto_perceived_gender = ccn_auto_perceived_gender
        self.first_name = first_name
        self.middle_name = middle_name
        self.first_last_name = first_last_name
        self.second_last_name = second_last_name
        self.date_of_birth = date_of_birth
        self.age = age
        self.age_range = age_range
        self.ccn_schooling_level = ccn_schooling_level

    def choice_query():
        return FamilyNucleus.query

    def __repr__(self):
        return f"Family Nucleus: {self.first_name} {self.first_last_name}"

    def delete_family_nuclus(ccn_family_nucleus):
        q = FamilyNucleus.query.filter(
            FamilyNucleus.ccn_family_nucleus == ccn_family_nucleus
        ).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_ccn(ccn_family_nucleus):
        return FamilyNucleus.query.get(ccn_family_nucleus)
