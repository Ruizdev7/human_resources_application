"""20230629_0757

Revision ID: 20c5030cf50d
Revises: 33a7c3729988
Create Date: 2023-06-29 07:57:53.587392

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '20c5030cf50d'
down_revision = '33a7c3729988'
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
