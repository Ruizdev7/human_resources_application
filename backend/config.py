# CONFIGURATION BASE CONFIGURATION
class Config:
    DEBUG: True
    TESTING: True

    # SQLALCHEMY DATABASE CONFIGURATION
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@127.0.0.1:3306/hhrr_app_dev"


# PRODUCTION SERVER CONFIGURATION
class ProductionConfig(Config):
    DEBUG: False


# DEVELOPMENT SERVER CONFIGURATION
class DevelopmentConfig(Config):
    SECRET_KEY = "hardsecretkey"
    DEBUG = True
    TESTING = True
