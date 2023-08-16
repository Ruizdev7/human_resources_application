"""20230510_0846

Revision ID: fe51d02dd5a0
Revises: fb6902f10fac
Create Date: 2023-05-10 08:46:53.163354

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'fe51d02dd5a0'
down_revision = 'fb6902f10fac'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tbl_RBAC_modules',
    sa.Column('ccn_rbac_module', sa.Integer(), nullable=False),
    sa.Column('rbac_module', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('ccn_rbac_module')
    )
    op.create_table('tbl_main_access_control',
    sa.Column('ccn_main_access_control', sa.Integer(), nullable=False),
    sa.Column('date', sa.String(length=40), nullable=False),
    sa.Column('hour', sa.String(length=20), nullable=False),
    sa.Column('number_id_employee', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('area', sa.String(length=100), nullable=False),
    sa.Column('event', sa.String(length=100), nullable=False),
    sa.Column('observations', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('ccn_main_access_control')
    )
    op.create_table('tbl_states_performance_evaluation',
    sa.Column('ccn_states_performance_evaluation', sa.Integer(), nullable=False),
    sa.Column('states_performance_evaluation', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('ccn_states_performance_evaluation')
    )
    op.create_table('tbl_RBAC',
    sa.Column('ccn_rbac', sa.Integer(), nullable=False),
    sa.Column('ccn_role', sa.Integer(), nullable=True),
    sa.Column('ccn_rbac_module', sa.Integer(), nullable=True),
    sa.Column('create_access', sa.Boolean(), nullable=True),
    sa.Column('read_access', sa.Boolean(), nullable=True),
    sa.Column('update_access', sa.Boolean(), nullable=True),
    sa.Column('delete_access', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['ccn_rbac_module'], ['tbl_RBAC_modules.ccn_rbac_module'], ),
    sa.ForeignKeyConstraint(['ccn_role'], ['tbl_roles.ccn_role'], ),
    sa.PrimaryKeyConstraint('ccn_rbac')
    )
    op.create_table('tbl_message',
    sa.Column('ccn_message', sa.Integer(), nullable=False),
    sa.Column('ccn_sender', sa.Integer(), nullable=True),
    sa.Column('ccn_recipient', sa.Integer(), nullable=True),
    sa.Column('title_message', sa.String(length=50), nullable=False),
    sa.Column('body_message', sa.String(length=240), nullable=False),
    sa.Column('time_stamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['ccn_recipient'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_sender'], ['tbl_employee.ccn_employee'], ),
    sa.PrimaryKeyConstraint('ccn_message')
    )
    op.create_index(op.f('ix_tbl_message_time_stamp'), 'tbl_message', ['time_stamp'], unique=False)
    op.create_table('tbl_performance_evaluation',
    sa.Column('ccn_performance_evaluation', sa.Integer(), nullable=False),
    sa.Column('opening_date', sa.DateTime(), nullable=True),
    sa.Column('entry_date', sa.DateTime(), nullable=True),
    sa.Column('action_date', sa.DateTime(), nullable=True),
    sa.Column('immediate_boss_question_date', sa.DateTime(), nullable=True),
    sa.Column('employee_response_date', sa.DateTime(), nullable=True),
    sa.Column('action_plan_date', sa.DateTime(), nullable=True),
    sa.Column('finish_date', sa.DateTime(), nullable=True),
    sa.Column('immediate_boss', sa.Integer(), nullable=True),
    sa.Column('manager', sa.Integer(), nullable=True),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('ccn_states_performance_evaluation', sa.Integer(), nullable=True),
    sa.Column('type_employee', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employment_relationship.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_states_performance_evaluation'], ['tbl_states_performance_evaluation.ccn_states_performance_evaluation'], ),
    sa.ForeignKeyConstraint(['immediate_boss'], ['tbl_employment_relationship.ccn_employee'], ),
    sa.ForeignKeyConstraint(['manager'], ['tbl_employment_relationship.ccn_employee'], ),
    sa.PrimaryKeyConstraint('ccn_performance_evaluation')
    )
    op.create_table('tbl_administrative_performance_evaluation',
    sa.Column('ccn_administrative_performance_evaluation', sa.Integer(), nullable=False),
    sa.Column('ccn_performance_evaluation', sa.Integer(), nullable=True),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('engagement_or_productivity', sa.String(length=10), nullable=True),
    sa.Column('communication_skills', sa.String(length=10), nullable=True),
    sa.Column('adaptation_to_change', sa.String(length=10), nullable=True),
    sa.Column('customer_orientation', sa.String(length=10), nullable=True),
    sa.Column('innovation', sa.String(length=10), nullable=True),
    sa.Column('professional_rigor', sa.String(length=10), nullable=True),
    sa.Column('problem_resolution', sa.String(length=10), nullable=True),
    sa.Column('leadership', sa.String(length=10), nullable=True),
    sa.Column('organization', sa.String(length=10), nullable=True),
    sa.Column('overall_score', sa.Integer(), nullable=True),
    sa.Column('level_value', sa.String(length=50), nullable=True),
    sa.Column('employee_response', sa.String(length=300), nullable=True),
    sa.Column('first_action_plan', sa.String(length=50), nullable=True),
    sa.Column('first_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('first_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('second_action_plan', sa.String(length=50), nullable=True),
    sa.Column('second_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('second_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('third_action_plan', sa.String(length=50), nullable=True),
    sa.Column('third_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('third_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('immediate_boss_observation', sa.String(length=100), nullable=True),
    sa.Column('manager_response', sa.String(length=250), nullable=True),
    sa.Column('manager_approval', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employment_relationship.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_performance_evaluation'], ['tbl_performance_evaluation.ccn_performance_evaluation'], ),
    sa.PrimaryKeyConstraint('ccn_administrative_performance_evaluation')
    )
    op.create_table('tbl_directive_performance_evaluation',
    sa.Column('ccn_directive_performance_evaluation', sa.Integer(), nullable=False),
    sa.Column('ccn_performance_evaluation', sa.Integer(), nullable=True),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('engagement_or_productivity', sa.String(length=10), nullable=True),
    sa.Column('communication_skills', sa.String(length=10), nullable=True),
    sa.Column('adaptation_to_change', sa.String(length=10), nullable=True),
    sa.Column('customer_orientation', sa.String(length=10), nullable=True),
    sa.Column('innovation', sa.String(length=10), nullable=True),
    sa.Column('professional_rigor', sa.String(length=10), nullable=True),
    sa.Column('problem_resolution', sa.String(length=10), nullable=True),
    sa.Column('leadership', sa.String(length=10), nullable=True),
    sa.Column('organization', sa.String(length=10), nullable=True),
    sa.Column('overall_score', sa.Integer(), nullable=True),
    sa.Column('level_value', sa.String(length=50), nullable=True),
    sa.Column('employee_response', sa.String(length=300), nullable=True),
    sa.Column('first_action_plan', sa.String(length=50), nullable=True),
    sa.Column('first_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('first_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('second_action_plan', sa.String(length=50), nullable=True),
    sa.Column('second_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('second_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('third_action_plan', sa.String(length=50), nullable=True),
    sa.Column('third_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('third_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('immediate_boss_observation', sa.String(length=100), nullable=True),
    sa.Column('manager_response', sa.String(length=250), nullable=True),
    sa.Column('manager_approval', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employment_relationship.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_performance_evaluation'], ['tbl_performance_evaluation.ccn_performance_evaluation'], ),
    sa.PrimaryKeyConstraint('ccn_directive_performance_evaluation')
    )
    op.create_table('tbl_operative_performance_evaluation',
    sa.Column('ccn_operative_performance_evaluation', sa.Integer(), nullable=False),
    sa.Column('ccn_performance_evaluation', sa.Integer(), nullable=True),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('engagement_or_productivity', sa.String(length=10), nullable=True),
    sa.Column('communication_skills', sa.String(length=10), nullable=True),
    sa.Column('adaptation_to_change', sa.String(length=10), nullable=True),
    sa.Column('learning_and_development', sa.String(length=10), nullable=True),
    sa.Column('organization', sa.String(length=10), nullable=True),
    sa.Column('continuous_improvement', sa.String(length=10), nullable=True),
    sa.Column('active_participation', sa.String(length=10), nullable=True),
    sa.Column('relations', sa.String(length=10), nullable=True),
    sa.Column('puntuality', sa.String(length=10), nullable=True),
    sa.Column('overall_score', sa.Integer(), nullable=True),
    sa.Column('level_value', sa.String(length=50), nullable=True),
    sa.Column('employee_response', sa.String(length=300), nullable=True),
    sa.Column('first_action_plan', sa.String(length=50), nullable=True),
    sa.Column('first_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('first_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('second_action_plan', sa.String(length=50), nullable=True),
    sa.Column('second_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('second_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('third_action_plan', sa.String(length=50), nullable=True),
    sa.Column('third_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('third_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('immediate_boss_observation', sa.String(length=100), nullable=True),
    sa.Column('manager_response', sa.String(length=250), nullable=True),
    sa.Column('manager_approval', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employment_relationship.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_performance_evaluation'], ['tbl_performance_evaluation.ccn_performance_evaluation'], ),
    sa.PrimaryKeyConstraint('ccn_operative_performance_evaluation')
    )
    op.add_column('tbl_employee', sa.Column('last_message_read_time', sa.DateTime(), nullable=True))
    op.add_column('tbl_employment_relationship', sa.Column('manager', sa.Integer(), nullable=False))
    op.add_column('tbl_employment_relationship', sa.Column('type_of_charge', sa.String(length=50), nullable=False))
    op.add_column('tbl_employment_relationship', sa.Column('is_active_employee', sa.Boolean(), nullable=False))
    op.alter_column('tbl_employment_relationship', 'pending_days_to_enjoy_for_holidays',
               existing_type=mysql.FLOAT(),
               nullable=True)
    op.alter_column('tbl_employment_relationship', 'immediate_boss',
               existing_type=mysql.VARCHAR(length=255),
               nullable=True)
    op.create_foreign_key(None, 'tbl_employment_relationship', 'tbl_employee', ['immediate_boss'], ['ccn_employee'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tbl_employment_relationship', type_='foreignkey')
    op.alter_column('tbl_employment_relationship', 'immediate_boss',
               existing_type=mysql.VARCHAR(length=255),
               nullable=False)
    op.alter_column('tbl_employment_relationship', 'pending_days_to_enjoy_for_holidays',
               existing_type=mysql.FLOAT(),
               nullable=False)
    op.drop_column('tbl_employment_relationship', 'is_active_employee')
    op.drop_column('tbl_employment_relationship', 'type_of_charge')
    op.drop_column('tbl_employment_relationship', 'manager')
    op.drop_column('tbl_employee', 'last_message_read_time')
    op.drop_table('tbl_operative_performance_evaluation')
    op.drop_table('tbl_directive_performance_evaluation')
    op.drop_table('tbl_administrative_performance_evaluation')
    op.drop_table('tbl_performance_evaluation')
    op.drop_index(op.f('ix_tbl_message_time_stamp'), table_name='tbl_message')
    op.drop_table('tbl_message')
    op.drop_table('tbl_RBAC')
    op.drop_table('tbl_states_performance_evaluation')
    op.drop_table('tbl_main_access_control')
    op.drop_table('tbl_RBAC_modules')
    # ### end Alembic commands ###
