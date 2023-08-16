from hhrr_app import db
from hhrr_app.models.tbl_demographic_data import DemographicData


class City(db.Model):
    __tablename__ = "tbl_city"
    ccn_city = db.Column(db.Integer, primary_key=True)
    id_city = db.Column(db.Integer, nullable=False)
    description_city = db.Column(db.String(60), nullable=False)
    ccn_department = db.Column(
        db.Integer,
        db.ForeignKey("tbl_department.ccn_department"),
        nullable=False,
    )

    rel_birth_department = db.relationship(
        "DemographicData",
        backref="CityBirthCity",
        foreign_keys=[DemographicData.birth_city],
        lazy=True,
    )
    rel_department_residence = db.relationship(
        "DemographicData",
        backref="CityCityResidence",
        foreign_keys=[DemographicData.city_residence],
        lazy=True,
    )

    def __init__(self, id_city, description_city, ccn_department):
        self.id_city = id_city
        self.description_city = description_city
        self.ccn_department = ccn_department

    def choice_query():
        return City.query

    def __repr__(self):
        return f"City: {self.description_city}"

    def save(self):
        if not self.description_city:
            db.session.add(self)
        db.session.commit()

    def delete_city(ccn_city):
        q = City.query.filter(City.id_city == ccn_city).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_id(ccn_city):
        return City.query.get(ccn_city)
