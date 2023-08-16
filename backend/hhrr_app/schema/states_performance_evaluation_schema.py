from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemySchema,auto_field
from hhrr_app.models.tbl_states_performance_evaluation import StatesPerformanceEvaluation


class StatesPerformanceEvaluationSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = StatesPerformanceEvaluation
        csrf = False

    ccn_states_performance_evaluation = fields.Number(dump_only=True)
    states_performance_evaluation = auto_field()