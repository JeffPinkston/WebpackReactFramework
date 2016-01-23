import React from 'react';
import AltContainer from 'alt-container';
import Concerts from './Concerts.jsx';
import ConcertActions from '../ConcertActions';
import ConcertStore from './ConcertStore';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
    }
    render() {
        return (
        	<div>
        		<button className="add-concert" onClick={this.addConcert}>+</button>
	        	<AltContainer
	        		stores={[ConcertStore]}
	        		inject={{
	        			concerts: () => ConcertStore.getState().concerts || []
	        		}}>
	        		<Concerts/>
	        	</AltContainer>
        	</div>
    	);
    }
    addConcert() {
    	ConcertActions.create({name: 'New Concert'});
    }
}

export default App;
