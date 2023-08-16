from hhrr_app import db


class SociodemographicData(db.Model):
    __tablename__ = "tbl_sociodemographic_data"
    ccn_sociodemographic_data = db.Column(db.Integer, primary_key=True)
    ccn_employee = db.Column(
        db.Integer,
        db.ForeignKey("tbl_employee.ccn_employee"),
        nullable=False,
        unique=True,
    )
    other_dependents = db.Column(
        db.String(50), nullable=False
    )  # otros dependen de usted
    relatives = db.Column(db.Integer, nullable=False)  # numero de personas en la casa
    how_many_people_in_change = db.Column(
        db.Integer, nullable=False
    )  # Personas a cargo
    people_with_disabilities = db.Column(
        db.Integer, nullable=False
    )  # numero de personas con discapacidades en el hogar
    monthly_income = db.Column(
        db.String(50), nullable=False
    )  # Rename ingresos familiares mensuales
    is_income_enougth = db.Column(
        db.String(50), nullable=False
    )  # Rename los ingresos alcanzan para cubrir los gastos familiares
    ccn_sub_house_type = db.Column(
        db.Integer,
        db.ForeignKey("tbl_subhouse_type.ccn_sub_house_type"),
        nullable=False,
    )  # select or foreign key tipo de vivienda
    ccn_house_type = db.Column(
        db.Integer,
        db.ForeignKey("tbl_house_type.ccn_house_type"),
        nullable=False,
    )  # Select or foreign Key  arrendada propia familiar
    where_its_located = db.Column(
        db.String(100), nullable=False
    )  # Select Field rural urbana suburbana
    residence_address = db.Column(
        db.String(300), nullable=False
    )  # direccion de residencia
    neighborhood = db.Column(db.String(200), nullable=False)  # Barrio
    type_transportation = db.Column(
        db.String(150), nullable=False
    )  # Select Field tipo de transportes para ir al trabajo
    type_transportation_2 = db.Column(
        db.String(150), nullable=False
    )  # Select Field tipo de transportes para ir al trabajo
    social_stratum = db.Column(db.Integer, nullable=False)  # Select Field
    electric_power = db.Column(db.String(50), nullable=False)  # Select Field SI NO
    sewerage = db.Column(
        db.String(50), nullable=False
    )  # Select Field SI NO Alcantarillado
    aqueduct = db.Column(db.String(50), nullable=False)  # Select Field SI NO
    natural_gas = db.Column(db.String(50), nullable=False)  # Select Field SI NO
    garbage_collection = db.Column(
        db.String(50), nullable=False
    )  # Select Field SI NO recoleccion de basuras
    landline = db.Column(
        db.String(50), nullable=False
    )  # telefono personal select field SI NO
    debts = db.Column(db.String(50), nullable=False)  # Select Field SI NO Tiene deudas
    debt_refinancing = db.Column(
        db.String(50), nullable=False
    )  # Select Field SI NO desea refinanciar las deudas
    computer_at_home = db.Column(
        db.String(50), nullable=False
    )  # Select Field SI NO tiene computador en casa
    have_internet_access = db.Column(
        db.String(50), nullable=False
    )  # Select Field SI NO tiene internet

    # falta el ccn del empleado para relacionarlo
    def __init__(
        self,
        ccn_employee,
        other_dependents,
        relatives,
        how_many_people_in_change,
        people_with_disabilities,
        monthly_income,
        is_income_enougth,
        ccn_sub_house_type,
        ccn_house_type,
        where_its_located,
        residence_address,
        neighborhood,
        type_transportation,
        type_transportation_2,
        social_stratum,
        electric_power,
        sewerage,
        aqueduct,
        natural_gas,
        garbage_collection,
        landline,
        debts,
        debt_refinancing,
        computer_at_home,
        have_internet_access,
    ):
        self.ccn_employee = ccn_employee
        self.other_dependents = other_dependents
        self.relatives = relatives
        self.how_many_people_in_change = how_many_people_in_change
        self.people_with_disabilities = people_with_disabilities
        self.monthly_income = monthly_income
        self.is_income_enougth = is_income_enougth
        self.ccn_sub_house_type = ccn_sub_house_type
        self.ccn_house_type = ccn_house_type
        self.where_its_located = where_its_located
        self.residence_address = residence_address
        self.neighborhood = neighborhood
        self.type_transportation = type_transportation
        self.type_transportation_2 = type_transportation_2
        self.social_stratum = social_stratum
        self.electric_power = electric_power
        self.sewerage = sewerage
        self.aqueduct = aqueduct
        self.natural_gas = natural_gas
        self.garbage_collection = garbage_collection
        self.landline = landline
        self.debts = debts
        self.debt_refinancing = debt_refinancing
        self.computer_at_home = computer_at_home
        self.have_internet_access = have_internet_access

    def choice_query():
        return SociodemographicData.query

    def __repr__(self):
        return f"Number Sociodemographic Data: {self.ccn_sociodemographic_data}"

    def delete_sociodemographic_data(ccn_sociodemographic_data):
        q = SociodemographicData.query.filter(
            SociodemographicData.ccn_sociodemographic_data == ccn_sociodemographic_data
        ).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_ccn(ccn_sociodemographic_data):
        return SociodemographicData.query.get(ccn_sociodemographic_data)
