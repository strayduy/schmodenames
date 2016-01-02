import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    render: function() {
        return (
            <div>
                <h1 className="text-center text-uppercase">Schmodenames</h1>

                <div className="row">
                    <div className="col-xs-12">
                        <Link className="btn btn-lg btn-block btn-primary text-smallcaps" to="/spymaster">
                            <small class="text-lowercase">I am a</small>
                            <br />
                            <span class="text-uppercase">Spymaster</span>
                        </Link>

                        <br />

                        <Link className="btn btn-lg btn-block btn-info text-smallcaps" to="/field-operative">
                            <small class="text-lowercase">I am a</small>
                            <br />
                            <span class="text-uppercase">Field Operative</span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
});
