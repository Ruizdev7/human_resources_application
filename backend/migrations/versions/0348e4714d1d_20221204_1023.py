"""20221204_1023

Revision ID: 0348e4714d1d
Revises: b63605617189
Create Date: 2022-12-04 10:23:41.802610

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0348e4714d1d'
down_revision = 'b63605617189'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tbl_employment_relationship', 'termination_date',
               existing_type=sa.DATE(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tbl_employment_relationship', 'termination_date',
               existing_type=sa.DATE(),
               nullable=False)
    # ### end Alembic commands ###
