"""20230808_1432

Revision ID: 7bff71f2c850
Revises: 5bd2482cce5a
Create Date: 2023-08-08 14:32:17.823934

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7bff71f2c850'
down_revision = '5bd2482cce5a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tbl_notification',
    sa.Column('ccn_notification', sa.Integer(), nullable=False),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('event_name', sa.String(length=100), nullable=False),
    sa.Column('content', sa.String(length=200), nullable=False),
    sa.Column('link', sa.String(length=250), nullable=True),
    sa.Column('is_checked', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employee.ccn_employee'], ),
    sa.PrimaryKeyConstraint('ccn_notification')
    )
    op.create_table('tbl_trial_time_evaluation',
    sa.Column('ccn_trial_time_evaluation', sa.Integer(), nullable=False),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('ccn_hhrr_manager', sa.Integer(), nullable=True),
    sa.Column('ccn_immediate_boss', sa.Integer(), nullable=True),
    sa.Column('ccn_order_state', sa.Integer(), nullable=True),
    sa.Column('date_employee_response', sa.Date(), nullable=False),
    sa.Column('date_employee_boss', sa.Date(), nullable=False),
    sa.Column('created_date', sa.Date(), nullable=False),
    sa.Column('hhrr_manager_date', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_hhrr_manager'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_immediate_boss'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_order_state'], ['tbl_states_performance_evaluation.ccn_states_performance_evaluation'], ),
    sa.PrimaryKeyConstraint('ccn_trial_time_evaluation')
    )
    op.create_table('tbl_trial_time_evaluation_detail',
    sa.Column('ccn_trial_time_evaluation_detail', sa.Integer(), nullable=False),
    sa.Column('ccn_trial_time_evaluation', sa.Integer(), nullable=True),
    sa.Column('initiative_coperation', sa.Integer(), nullable=True),
    sa.Column('teamwork', sa.Integer(), nullable=True),
    sa.Column('responsability', sa.Integer(), nullable=True),
    sa.Column('accountability_discipline', sa.Integer(), nullable=True),
    sa.Column('work_quality', sa.Integer(), nullable=True),
    sa.Column('productivity', sa.Integer(), nullable=True),
    sa.Column('agility_discipline', sa.Integer(), nullable=True),
    sa.Column('hseq', sa.Integer(), nullable=True),
    sa.Column('total_score', sa.Integer(), nullable=True),
    sa.Column('initial_induction', sa.Boolean(), nullable=True),
    sa.Column('coorporative_principles', sa.Boolean(), nullable=True),
    sa.Column('strength', sa.String(length=500), nullable=True),
    sa.Column('improve_areas', sa.String(length=500), nullable=True),
    sa.Column('employee_approval', sa.Boolean(), nullable=True),
    sa.Column('employee_choice_reason', sa.String(length=500), nullable=True),
    sa.Column('hhrr_approval', sa.Boolean(), nullable=True),
    sa.Column('hhrr_choice_reason', sa.String(length=500), nullable=True),
    sa.ForeignKeyConstraint(['ccn_trial_time_evaluation'], ['tbl_trial_time_evaluation.ccn_trial_time_evaluation'], ),
    sa.PrimaryKeyConstraint('ccn_trial_time_evaluation_detail')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tbl_trial_time_evaluation_detail')
    op.drop_table('tbl_trial_time_evaluation')
    op.drop_table('tbl_notification')
    # ### end Alembic commands ###
