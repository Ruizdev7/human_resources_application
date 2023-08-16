from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_demographic_data import DemographicData


class DemographicDataSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = DemographicData
        csrf = False

    ccn_demographic_data = fields.Number(dump_only=True)
    ccn_employee = auto_field()
    birth_department = auto_field()
    birth_city = auto_field()
    department_residence = auto_field()
    city_residence = auto_field()
    ccn_schooling_level = auto_field()
    ccn_race = auto_field()
    is_head_of_household = auto_field()
    birth_country = auto_field()
    country_residence = auto_field()
