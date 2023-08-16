from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from hhrr_app.models.tbl_sociodemographic_data import SociodemographicData


class SociodemographicDataSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = SociodemographicData
        csrf = False

    ccn_sociodemographic_data = fields.Number(dump_only=True)
    ccn_employee = auto_field()
    other_dependents = auto_field()
    relatives = auto_field()
    how_many_people_in_change = auto_field()
    people_with_disabilities = auto_field()
    monthly_income = auto_field()
    is_income_enougth = auto_field()
    ccn_sub_house_type = auto_field()
    ccn_house_type = auto_field()
    where_its_located = auto_field()
    residence_address = auto_field()
    neighborhood = auto_field()
    type_transportation = auto_field()
    type_transportation_2 = auto_field()
    social_stratum = auto_field()
    electric_power = auto_field()
    sewerage = auto_field()
    aqueduct = auto_field()
    natural_gas = auto_field()
    garbage_collection = auto_field()
    landline = auto_field()
    debts = auto_field()
    debt_refinancing = auto_field()
    computer_at_home = auto_field()
    have_internet_access = auto_field()
