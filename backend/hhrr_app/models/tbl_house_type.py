from hhrr_app import db


class HouseType(db.Model):
    __tablename__ = "tbl_house_type"
    ccn_house_type = db.Column(db.Integer, primary_key=True)
    house_type = db.Column(db.String(150), nullable=True)
    
    #Relationship
    rel_sociodemographic_house_type = db.relationship(
        "SociodemographicData", backref="HouseType", lazy=True
    )

    def __init__(
        self,
        house_type,
    ):
        self.house_type = house_type

    def __repr__(self):
        return f"House Type: {self.ccn_house_type}"

    def choice_query():
        return HouseType.query

    def save(self):
        if not self.ccn_house_type:
            db.session.add(self)
            db.session.commit()

    def delete_house_type(ccn_house_type):
        q = HouseType.query.filter(HouseType.ccn_house_type == ccn_house_type).first()
        db.session.delete(q)
        db.session.commit()
        return print(q)

    @staticmethod
    def get_by_id(ccn_house_type):
        return HouseType.query.get(ccn_house_type)
