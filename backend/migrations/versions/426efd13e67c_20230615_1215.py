"""20230615_1215

Revision ID: 426efd13e67c
Revises: b9eaa4357a5c
Create Date: 2023-06-15 12:18:41.871965

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '426efd13e67c'
down_revision = 'b9eaa4357a5c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'tbl_employee', 'tbl_marital_status', ['ccn_marital_status'], ['ccn_marital_status'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tbl_employee', type_='foreignkey')
    # ### end Alembic commands ###