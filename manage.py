# Third party libs
from flask.ext.script import Manager

# Our libs
from server.app import create_app
from server.settings import DevConfig

def main():
    app = create_app(DevConfig)
    manager = Manager(app)
    manager.run()

if __name__ == '__main__':
    main()

