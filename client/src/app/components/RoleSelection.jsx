import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    render: function() {
        return (
            <div>
                <Link to="/spymaster">I am a Spymaster</Link>
                <br />
                <Link to="/field-operative">I am a Field Operative</Link>
            </div>
        )
    }
});
