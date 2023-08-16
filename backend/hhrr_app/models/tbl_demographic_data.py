from hhrr_app import db


class DemographicData(db.Model):
    __tablename__ = "tbl_demographic_data"
    ccn_demographic_data = db.Column(db.Integer, primary_key=True)
    ccn_employee = db.Column(
        db.Integer, db.ForeignKey("tbl_employee.ccn_employee"), unique=True
    )
    birth_country = db.Column(db.Integer, db.ForeignKey("tbl_country.ccn_country"))
    birth_department = db.Column(
        db.Integer, db.ForeignKey("tbl_department.ccn_department")
    )
    birth_city = db.Column(db.Integer, db.ForeignKey("tbl_city.ccn_city"))

    country_residence = db.Column(db.Integer, db.ForeignKey("tbl_country.ccn_country"))
    department_residence = db.Column(
        db.Integer, db.ForeignKey("tbl_department.ccn_department")
    )
    city_residence = db.Column(db.Integer, db.ForeignKey("tbl_city.ccn_city"))
    ccn_schooling_level = db.Column(
        db.Integer, db.ForeignKey("tbl_schooling_level.ccn_schooling_level")
    )
    ccn_race = db.Column(db.Integer, db.ForeignKey("tbl_race.ccn_race"))

    is_head_of_household = db.Column(db.Boolean, nullable=False)

    def __init__(
        self,
        ccn_employee,
        birth_country,
        birth_department,
        birth_city,
        country_residence,
        department_residence,
        city_residence,
        ccn_schooling_level,
        ccn_race,
        is_head_of_household,
    ):
        self.ccn_employee = ccn_employee
        self.birth_country = birth_country
        self.birth_department = birth_department
        self.birth_city = birth_city
        self.country_residence = country_residence
        self.department_residence = department_residence
        self.city_residence = city_residence
        self.ccn_schooling_level = ccn_schooling_level
        self.ccn_race = ccn_race
        self.is_head_of_household = is_head_of_household

    def __repr__(self):
        return f"Demographic Data: {self.ccn_demographic_data}"

    def delete_demographic_data(ccn_demographic_data):
        q = DemographicData.query.filter(
            DemographicData.ccn_demographic_data == ccn_demographic_data
        ).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_ccn(ccn_demographic_data):
        return DemographicData.query.get(ccn_demographic_data)
