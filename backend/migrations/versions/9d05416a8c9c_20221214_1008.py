"""20221214_1008

Revision ID: 9d05416a8c9c
Revises: 229eb751fd14
Create Date: 2022-12-14 10:08:37.618701

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9d05416a8c9c'
down_revision = '229eb751fd14'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tbl_diseases',
    sa.Column('ccn_diseases', sa.Integer(), nullable=False),
    sa.Column('diseases', sa.String(length=150), nullable=True),
    sa.PrimaryKeyConstraint('ccn_diseases')
    )
    op.create_table('tbl_health_condition',
    sa.Column('ccn_health_condition', sa.Integer(), nullable=False),
    sa.Column('ccn_employee', sa.Integer(), nullable=False),
    sa.Column('consume_alcoholic_beverages', sa.String(length=50), nullable=False),
    sa.Column('ccn_diseases', sa.Integer(), nullable=False),
    sa.Column('allergies', sa.String(length=50), nullable=False),
    sa.Column('what_allergy', sa.String(length=255), nullable=True),
    sa.Column('medicines', sa.String(length=50), nullable=False),
    sa.Column('what_medicin', sa.String(length=255), nullable=True),
    sa.Column('last_medical_consultation', sa.String(length=255), nullable=False),
    sa.Column('plan_to_drink_less_alcoholic_beverages', sa.String(length=50), nullable=False),
    sa.Column('discomfort_due_to_criticism_when_ingesting_alcohol', sa.String(length=50), nullable=False),
    sa.Column('need_to_drink_alcohol_in_the_morning', sa.String(length=50), nullable=False),
    sa.Column('physical_activity_3_times_a_week_30_minutes', sa.String(length=50), nullable=False),
    sa.Column('he_is_a_smoker', sa.String(length=50), nullable=False),
    sa.Column('how_many_cigarettes_a_day', sa.Integer(), nullable=False),
    sa.Column('he_is_ex_smoker', sa.String(length=50), nullable=False),
    sa.Column('consume_psychoactive_substances', sa.String(length=50), nullable=False),
    sa.Column('used_psychoactive_substances_before', sa.String(length=50), nullable=False),
    sa.Column('what_psychoactive_substances', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['ccn_diseases'], ['tbl_diseases.ccn_diseases'], ),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employee.ccn_employee'], ),
    sa.PrimaryKeyConstraint('ccn_health_condition')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tbl_health_condition')
    op.drop_table('tbl_diseases')
    # ### end Alembic commands ###