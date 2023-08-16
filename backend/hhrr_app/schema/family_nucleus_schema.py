from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_family_nucleus import FamilyNucleus


class FamilyNucleusSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = FamilyNucleus
        csrf = False

    ccn_family_nucleus = fields.Number(dump_only=True)
    ccn_employee = auto_field()
    number_of_children = auto_field()
    ccn_type_id = auto_field()
    number_id = auto_field()
    ccn_auto_perceived_gender = auto_field()
    first_name = auto_field()
    middle_name = auto_field()
    first_last_name = auto_field()
    second_last_name = auto_field()
    date_of_birth = auto_field()
    age = auto_field()
    age_range = auto_field()
    ccn_schooling_level = auto_field()
