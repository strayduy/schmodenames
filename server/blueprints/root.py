# Third party libs
from flask import Blueprint
from flask import render_template

# Initialize blueprint
blueprint = Blueprint('root', __name__)

@blueprint.route('/')
@blueprint.route('/spymaster')
@blueprint.route('/spymaster/game/<game_seed>')
@blueprint.route('/field-operative')
@blueprint.route('/field-operative/game/<game_seed>')
@blueprint.route('/duet')
@blueprint.route('/duet/player-1')
@blueprint.route('/duet/player-2')
@blueprint.route('/duet/player-1/game/<game_seed>')
@blueprint.route('/duet/player-2/game/<game_seed>')
def index(game_seed=None):
    return render_template('index.html')

