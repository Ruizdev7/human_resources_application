from hhrr_app import db


class HealthCondition(db.Model):
    __tablename__ = "tbl_health_condition"
    ccn_health_condition = db.Column(db.Integer, primary_key=True)
    ccn_employee = db.Column(
        db.Integer,
        db.ForeignKey("tbl_employee.ccn_employee"),
        nullable=False,
        unique=True,
    )
    consume_alcoholic_beverages = db.Column(
        db.String(50), nullable=False
    )  # Select Field SI NO consume bebidas alcoholicas?
    ccn_diseases = db.Column(
        db.Integer,
        db.ForeignKey("tbl_diseases.ccn_diseases"),
        nullable=False,
    )
    allergies = db.Column(db.String(50), nullable=False)  # Select Field SI NO
    what_allergy = db.Column(db.String(255), nullable=True)  # cual alergia tiene
    medicines = db.Column(db.String(50), nullable=False)  # Select Field SI NO
    what_medicin = db.Column(db.String(255), nullable=True)  # cual medicina tiene
    last_medical_consultation = db.Column(
        db.String(255), nullable=False
    )  # ultima consulta medica Menor a 3, 5 meses, mas de 6 meses, no contesta
    plan_to_drink_less_alcoholic_beverages = db.Column(
        db.String(50), nullable=False
    )  # Select Field SI NO a pensado ingerir menos bebidas alcoholicas
    discomfort_due_to_criticism_when_ingesting_alcohol = db.Column(
        db.String(50), nullable=False
    )  # Select Field SI NO le molesta las criticas por ingerir alcohol
    need_to_drink_alcohol_in_the_morning = db.Column(
        db.String(50), nullable=False
    )  # Select Field SI NO siente necesidad por ingerir alcohol en horas de la mañana
    physical_activity_3_times_a_week_30_minutes = db.Column(
        db.String(50), nullable=False
    )  # Select Field SI NO actividad fisica 3 veces por semana minimo 30 minutos
    he_is_a_smoker = db.Column(
        db.String(50), nullable=False
    )  # Select Field SI NO es fumador
    how_many_cigarettes_a_day = db.Column(
        db.Integer, nullable=False
    )  # Cuantos cigarrillos al dia
    he_is_ex_smoker = db.Column(
        db.String(50), nullable=False
    )  # Select Field SI NO es exfumador
    consume_psychoactive_substances = db.Column(
        db.String(50), nullable=False
    )  # Select Field SI NO consume sustancias psicoactivas
    used_psychoactive_substances_before = db.Column(
        db.String(50), nullable=False
    )  # Select Field SI NO antes consumia sustancias psicoactivas
    what_psychoactive_substances = db.Column(
        db.String(255), nullable=False
    )  # cual sustancia psicoactiva

    # falta el ccn del empleado para relacionarlo
    def __init__(
        self,
        ccn_employee,
        consume_alcoholic_beverages,
        diseases,
        allergies,
        what_allergy,
        medicines,
        what_medicin,
        last_medical_consultation,
        plan_to_drink_less_alcoholic_beverages,
        discomfort_due_to_criticism_when_ingesting_alcohol,
        need_to_drink_alcohol_in_the_morning,
        physical_activity_3_times_a_week_30_minutes,
        he_is_a_smoker,
        how_many_cigarettes_a_day,
        he_is_ex_smoker,
        consume_psychoactive_substances,
        used_psychoactive_substances_before,
        what_psychoactive_substances,
    ):
        self.ccn_employee = ccn_employee
        self.consume_alcoholic_beverages = consume_alcoholic_beverages
        self.ccn_diseases = diseases
        self.allergies = allergies
        self.what_allergy = what_allergy
        self.medicines = medicines
        self.what_medicin = what_medicin
        self.last_medical_consultation = last_medical_consultation
        self.plan_to_drink_less_alcoholic_beverages = (
            plan_to_drink_less_alcoholic_beverages
        )
        self.discomfort_due_to_criticism_when_ingesting_alcohol = (
            discomfort_due_to_criticism_when_ingesting_alcohol
        )
        self.need_to_drink_alcohol_in_the_morning = need_to_drink_alcohol_in_the_morning
        self.physical_activity_3_times_a_week_30_minutes = (
            physical_activity_3_times_a_week_30_minutes
        )
        self.he_is_a_smoker = he_is_a_smoker
        self.how_many_cigarettes_a_day = how_many_cigarettes_a_day
        self.he_is_ex_smoker = he_is_ex_smoker
        self.consume_psychoactive_substances = consume_psychoactive_substances
        self.used_psychoactive_substances_before = used_psychoactive_substances_before
        self.what_psychoactive_substances = what_psychoactive_substances

    def choice_query():
        return HealthCondition.query

    def __repr__(self):
        return f"Number Health Condition: {self.ccn_health_condition}"

    def delete_health_condition(ccn_health_condition):
        q = HealthCondition.query.filter(
            HealthCondition.ccn_health_condition == ccn_health_condition
        ).first()

        db.session.delete(q)
        db.session.commit()

        return print(q)

    @staticmethod
    def get_by_ccn(ccn_health_condition):
        return HealthCondition.query.get(ccn_health_condition)
