from hhrr_app import db


class WorkShift(db.Model):

    __tablename__ = "tbl_work_shift"
    ccn_work_shift = db.Column(db.Integer, primary_key=True)
    description_work_shift = db.Column(db.String(40), nullable=False)

    # Relationships
    rel_employement_relationship = db.relationship(
        "EmploymentRelationship", backref="WorkShift"
    )

    def __init__(self, description_work_shift):

        self.description_work_shift = description_work_shift

    def choice_query():
        return WorkShift.query

    def __repr__(self):
        return f"TypeID: {self.description_work_shift}"

    def save(self):
        if not self.description_work_shift:
            db.session.add(self)
            db.session.commit()

    def delete_work_shift(ccn_work_shift):
        q = WorkShift.query.filter(WorkShift.ccn_work_shift == ccn_work_shift).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_id(ccn_work_shift):
        return WorkShift.query.get(ccn_work_shift)
