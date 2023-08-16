from hhrr_app import db
from hhrr_app.models.tbl_demographic_data import DemographicData


class Country(db.Model):
    __tablename__ = "tbl_country"
    ccn_country = db.Column(db.Integer, primary_key=True)
    id_country = db.Column(db.Integer, nullable=False)
    description_country = db.Column(db.String(100), nullable=False)

    rel_department = db.relationship("Department", backref="Country")

    rel_birth_country = db.relationship(
        "DemographicData",
        backref="CountryBirth",
        foreign_keys=[DemographicData.birth_country],
        lazy=True,
    )
    rel_country_residence = db.relationship(
        "DemographicData",
        backref="CountryResidence",
        foreign_keys=[DemographicData.country_residence],
        lazy=True,
    )

    def __init__(self, id_country, description_country):
        self.id_country = id_country
        self.description_country = description_country

    def choice_query():
        return Country.query

    def __repr__(self):
        return f"country: {self.description_country}"

    def save(self):
        if not self.description_country:
            db.session.add(self)
        db.session.commit()

    def delete_country(ccn_country):
        q = Country.query.filter(Country.ccn_country == ccn_country).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_id(ccn_country):
        return Country.query.get(ccn_country)
