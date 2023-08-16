from hhrr_app import db


class Race(db.Model):

    __tablename__ = "tbl_race"
    ccn_race = db.Column(db.Integer, primary_key=True)
    description_race = db.Column(db.String(40), nullable=False)

    # Relationships
    rel_demographic_data = db.relationship("DemographicData", backref="Race")

    def __init__(self, description_race):

        self.description_race = description_race

    def choice_query():
        return Race.query

    def __repr__(self):
        return f"Raza: {self.description_race}"

    def delete_race(ccn_race):
        q = Race.query.filter(Race.ccn_race == ccn_race).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_ccn(ccn_race):
        return Race.query.get(ccn_race)
