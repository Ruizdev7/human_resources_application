from hhrr_app import db


class SchoolingLevel(db.Model):

    __tablename__ = "tbl_schooling_level"
    ccn_schooling_level = db.Column(db.Integer, primary_key=True)
    description_schooling_level = db.Column(db.String(40), nullable=False)

    # Relationships
    rel_demographic_data_1 = db.relationship("DemographicData", backref="SchoolingLevel")

    # Relationships
    rel_demographic_data = db.relationship("FamilyNucleus", backref="SchoolingLevel")

    def __init__(self, description_schooling_level):

        self.description_schooling_level = description_schooling_level

    def choice_query():
        return SchoolingLevel.query

    def __repr__(self):
        return f"Nivel de Escolaridad: {self.description_schooling_level}"

    def delete_schooling_level(ccn_schooling_level):
        q = SchoolingLevel.query.filter(
            SchoolingLevel.ccn_schooling_level == ccn_schooling_level
        ).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_ccn(ccn_schooling_level):
        return SchoolingLevel.query.get(ccn_schooling_level)
