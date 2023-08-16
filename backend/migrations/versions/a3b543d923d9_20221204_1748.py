"""20221204_1748

Revision ID: a3b543d923d9
Revises: 1b8211785f50
Create Date: 2022-12-04 17:48:37.723501

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a3b543d923d9'
down_revision = '1b8211785f50'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tbl_demographic_data',
    sa.Column('ccn_demographic_data', sa.Integer(), nullable=False),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('birth_department', sa.Integer(), nullable=True),
    sa.Column('birth_city', sa.Integer(), nullable=True),
    sa.Column('department_residence', sa.Integer(), nullable=True),
    sa.Column('city_residence', sa.Integer(), nullable=True),
    sa.Column('ccn_schooling_level', sa.Integer(), nullable=True),
    sa.Column('ccn_race', sa.Integer(), nullable=True),
    sa.Column('is_head_of_household', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['birth_city'], ['tbl_city.ccn_city'], ),
    sa.ForeignKeyConstraint(['birth_department'], ['tbl_department.ccn_department'], ),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_race'], ['tbl_race.ccn_race'], ),
    sa.ForeignKeyConstraint(['ccn_schooling_level'], ['tbl_schooling_level.ccn_schooling_level'], ),
    sa.ForeignKeyConstraint(['city_residence'], ['tbl_city.ccn_city'], ),
    sa.ForeignKeyConstraint(['department_residence'], ['tbl_department.ccn_department'], ),
    sa.PrimaryKeyConstraint('ccn_demographic_data')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tbl_demographic_data')
    # ### end Alembic commands ###
