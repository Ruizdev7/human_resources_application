"""private messages

Revision ID: 97dc8c3a44a7
Revises: dad0a7029e68
Create Date: 2023-01-18 12:21:53.939118

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '97dc8c3a44a7'
down_revision = 'dad0a7029e68'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tbl_employee', sa.Column('last_message_read_time', sa.DateTime(), nullable=True))
    op.add_column('tbl_message', sa.Column('ccn_sender', sa.Integer(), nullable=True))
    op.add_column('tbl_message', sa.Column('ccn_recipient', sa.Integer(), nullable=True))
    op.add_column('tbl_message', sa.Column('title_message', sa.String(length=50), nullable=False))
    op.add_column('tbl_message', sa.Column('body_message', sa.String(length=240), nullable=False))
    op.add_column('tbl_message', sa.Column('time_stamp', sa.DateTime(), nullable=True))
    op.drop_index('ix_tbl_message_timestamp', table_name='tbl_message')
    op.create_index(op.f('ix_tbl_message_time_stamp'), 'tbl_message', ['time_stamp'], unique=False)
    op.drop_constraint('tbl_message_ibfk_2', 'tbl_message', type_='foreignkey')
    op.drop_constraint('tbl_message_ibfk_1', 'tbl_message', type_='foreignkey')
    op.create_foreign_key(None, 'tbl_message', 'tbl_employee', ['ccn_recipient'], ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_message', 'tbl_employee', ['ccn_sender'], ['ccn_employee'])
    op.drop_column('tbl_message', 'body')
    op.drop_column('tbl_message', 'recipient_id')
    op.drop_column('tbl_message', 'sender_id')
    op.drop_column('tbl_message', 'timestamp')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tbl_message', sa.Column('timestamp', mysql.DATETIME(), nullable=True))
    op.add_column('tbl_message', sa.Column('sender_id', mysql.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('tbl_message', sa.Column('recipient_id', mysql.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('tbl_message', sa.Column('body', mysql.VARCHAR(length=140), nullable=True))
    op.drop_constraint(None, 'tbl_message', type_='foreignkey')
    op.drop_constraint(None, 'tbl_message', type_='foreignkey')
    op.create_foreign_key('tbl_message_ibfk_1', 'tbl_message', 'tbl_employee', ['recipient_id'], ['ccn_employee'])
    op.create_foreign_key('tbl_message_ibfk_2', 'tbl_message', 'tbl_employee', ['sender_id'], ['ccn_employee'])
    op.drop_index(op.f('ix_tbl_message_time_stamp'), table_name='tbl_message')
    op.create_index('ix_tbl_message_timestamp', 'tbl_message', ['timestamp'], unique=False)
    op.drop_column('tbl_message', 'time_stamp')
    op.drop_column('tbl_message', 'body_message')
    op.drop_column('tbl_message', 'title_message')
    op.drop_column('tbl_message', 'ccn_recipient')
    op.drop_column('tbl_message', 'ccn_sender')
    op.drop_column('tbl_employee', 'last_message_read_time')
    # ### end Alembic commands ###
