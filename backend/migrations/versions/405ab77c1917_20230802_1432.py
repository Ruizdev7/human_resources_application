"""20230802_1432

Revision ID: 405ab77c1917
Revises: 20c5030cf50d
Create Date: 2023-08-02 14:32:22.846365

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '405ab77c1917'
down_revision = '20c5030cf50d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tbl_sociodemographic_data', sa.Column('how_many_people_in_change', sa.Integer(), nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('neighborhood', sa.String(length=200), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tbl_sociodemographic_data', 'neighborhood')
    op.drop_column('tbl_sociodemographic_data', 'how_many_people_in_change')
    # ### end Alembic commands ###
