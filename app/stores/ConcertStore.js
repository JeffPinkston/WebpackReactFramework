import uuid from 'node-uuid';
import assign from 'object-assign';
import alt from '../libs/alt';
import ConcertActions from '../actions/ConcertActions';
import update from 'react-addons-update';

class ConcertStore {
	constructor() {
		this.bindActions(ConcertActions);

		this.concerts = [];
	}
	create(concert) {
		const concerts = this.concerts;

		concert.id = uuid.v4();
		concert.songs = concert.songs || [];

		this.setState({
			concerts: concerts.concat(concert)
		});
	}
	update(updatedConcert) {
		const concerts = this.concerts.map((concert) => {
			if(concert.id === updatedConcert.id) {
				concert = assign({}, concert, updatedConcert);
			}

			return concert;
		});

		this.setState({concerts});
	}
	delete(id) {
		this.setState({
			concerts: this.concerts.filter((concert) => concert.id !== id)
		});
	}
	attachToConcert({concertId, songId}) {
	    this.removeSong(sondId);

	    const concerts = this.concerts.map((concert) => {
	      if(concert.id === concertId) {
	        if(concert.notes.indexOf(songId) === -1) {
	          concert.notes.push(songId);
	        }
	        else {
	          console.warn('Already attached song to concert', concerts);
	        }
	      }

	      return concert;
	    });

	    this.setState({concerts});
	  }
	  removeNote(songId) {
	    const concerts = this.concerts;
	    const removeConcert = concerts.filter((concert) => {
	      return concert.songs.indexOf(songId) >= 0;
	    })[0];

	    if(!removeSong) {
	      return;
	    }

	    const removeSongIndex = removeConcert.songs.indexOf(songId);

	    removeConcert.songs = removeConcert.songs.slice(0, removeSongIndex).
	      concat(removeConcert.songs.slice(removeSondIndex + 1));
	  }
}

export default alt.createStore(ConcertStore, 'ConcertStore');