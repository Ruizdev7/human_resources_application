"""20221209_0950


Revision ID: 48d96a3e8f89
Revises: a71f50efa201
Create Date: 2022-12-09 09:50:39.450138

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '48d96a3e8f89'
down_revision = 'a71f50efa201'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'tbl_family_nucleus', 'tbl_age_range', ['age_range'], ['ccn_age_range'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tbl_family_nucleus', type_='foreignkey')
    # ### end Alembic commands ###
