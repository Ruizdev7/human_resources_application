"""20221203_1935

Revision ID: 4e03a1c1ac60
Revises: 08eb8c0d780d
Create Date: 2022-12-03 19:35:16.776724

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4e03a1c1ac60'
down_revision = '08eb8c0d780d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tbl_employment_relationship',
    sa.Column('ccn_employment_relationship', sa.Integer(), nullable=False),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('ccn_role', sa.Integer(), nullable=True),
    sa.Column('ccn_work_shift', sa.Integer(), nullable=True),
    sa.Column('binding_date', sa.Date(), nullable=False),
    sa.Column('termination_date', sa.Date(), nullable=False),
    sa.Column('time_worked', sa.Float(), nullable=False),
    sa.Column('pending_days_to_enjoy_for_holidays', sa.Float(), nullable=False),
    sa.Column('ccn_type_relationship', sa.Integer(), nullable=True),
    sa.Column('employee_corporate_email', sa.String(length=100), nullable=False),
    sa.Column('employee_corporate_cellphone', sa.String(length=40), nullable=False),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_role'], ['tbl_roles.ccn_role'], ),
    sa.ForeignKeyConstraint(['ccn_type_relationship'], ['tbl_type_relationship.ccn_type_relationship'], ),
    sa.ForeignKeyConstraint(['ccn_work_shift'], ['tbl_work_shift.ccn_work_shift'], ),
    sa.PrimaryKeyConstraint('ccn_employment_relationship')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tbl_employment_relationship')
    # ### end Alembic commands ###
