"""20230615_1213

Revision ID: d30e88eebed9
Revises: 5821aa3f2a47
Create Date: 2023-06-15 12:13:50.135028

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd30e88eebed9'
down_revision = '5821aa3f2a47'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tbl_employee', sa.Column('ccn_marital_status', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tbl_employee', 'ccn_marital_status')
    # ### end Alembic commands ###