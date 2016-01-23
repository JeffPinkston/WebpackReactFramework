import AltContainer from 'alt-container';
import React from 'react';
import ConcertActions from '../actions/ConcertActions';
import SongStore from '../stores/SongStore';
import ItemTypes from '../constant/itemTypes';
import Editable from './Editable.jsx';

import React from 'react';

class Concert extends React.Component {
	const {concert, ...props} = this.props;
	const id = concert.id;
    constructor(props) {
        super(props);
        this.displayName = 'Concert';
    }
    render() {
        return (
        	<div {...props}>
        		<div className="concert-header">
        			<Editable className="concert-name" editing={concert.editing}
        				value={concert.name} onEdit={this.editName.bind(this, id)}
        				onValueClick={this.activateLaneEdit.bind(this, id)}/>
    				<div className="concert-add-song">
    					<button onClick={this.addSong.bind(this, id)}>+</button>
    				</div>
        		</div>
	        	<AltContainer
	        		store={[SongStore]}
	        		inject={
	        			songs: () => SongStore.get(concert.songs)
	        		}
	        	>
	        		<Songs
	        			onValueClick={this.activateSongEdit}
	        			onEdit={this.editNote}
	        			onDelete={this.deleteNote.bind(this, id)}
	        		/>
	        	</AltContainer>
        	</div>
        );
    }
    addSong(concertId) {
    	const song = SongActions.create({name: 'Song Name'});

    	Concert.attachToConcert({
    		songId: song.id,
    		concertId
    	});
    }
    editSong(id, name){
    	SongActions.update({id, name, editing: false});
    }
    deleteSong(concertId, songId) {
    	ConcertActions.detachFromConcert({conertId, songId});
    	SongActions.delete(songId);
    }
    editName(id, name){
    	if(name){
    		ConcertActions.udpate({id, name, editing: false});
    	}else{
    		ConcertActions.delete(id);
    	}
    }
    activateConcertEdit(id) {
    	ConcertActions.update({id, editing: true});
    }
    activateSondEdit(id) {
    	SongActions.udpate({id, editing: true});
    }
}

export default Concert;
t