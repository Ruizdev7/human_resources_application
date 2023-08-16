"""20221229_1157

Revision ID: 29089e68096b
Revises: 0dc3503823b1
Create Date: 2022-12-29 11:57:07.372998

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '29089e68096b'
down_revision = '0dc3503823b1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'tbl_city', 'tbl_department', ['ccn_department'], ['ccn_department'])
    op.create_foreign_key(None, 'tbl_demographic_data', 'tbl_city', ['city_residence'], ['ccn_city'])
    op.create_foreign_key(None, 'tbl_demographic_data', 'tbl_city', ['birth_city'], ['ccn_city'])
    op.add_column('tbl_employment_relationship', sa.Column('immediate_boss', sa.String(length=255), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tbl_employment_relationship', 'immediate_boss')
    op.drop_constraint(None, 'tbl_demographic_data', type_='foreignkey')
    op.drop_constraint(None, 'tbl_demographic_data', type_='foreignkey')
    op.drop_constraint(None, 'tbl_city', type_='foreignkey')
    # ### end Alembic commands ###