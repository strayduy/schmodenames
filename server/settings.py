# Standard libs
import os

class Config(object):
    DEBUG = False

    SECRET_KEY = os.getenv('SECRET_KEY', 'replace_me_in_production')

class ProdConfig(Config):
    pass

class DevConfig(Config):
    DEBUG = True

