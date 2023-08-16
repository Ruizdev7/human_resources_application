from hhrr_app import db


class SubHouseType(db.Model):
    __tablename__ = "tbl_subhouse_type"
    ccn_sub_house_type = db.Column(db.Integer, primary_key=True)
    sub_house_type = db.Column(db.String(150), nullable=True)
    
    #Relationship
    rel_sociodemographic_sub_house_type = db.relationship(
        "SociodemographicData", backref="SubHouseType", lazy=True
    )

    def __init__(
        self,
        sub_house_type,
    ):
        self.sub_house_type = sub_house_type

    def __repr__(self):
        return f"Sub House Type: {self.ccn_sub_house_type}"

    def choice_query():
        return SubHouseType.query

    def save(self):
        if not self.ccn_sub_house_type:
            db.session.add(self)
            db.session.commit()

    def delete_sub_house_type(ccn_sub_house_type):
        q = SubHouseType.query.filter(SubHouseType.ccn_sub_house_type == ccn_sub_house_type).first()
        db.session.delete(q)
        db.session.commit()
        return print(q)

    @staticmethod
    def get_by_id(ccn_sub_house_type):
        return SubHouseType.query.get(ccn_sub_house_type)
