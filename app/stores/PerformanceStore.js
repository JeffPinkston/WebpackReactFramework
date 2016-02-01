import uuid from 'node-uuid';
import assign from 'object-assign';
import alt from '../libs/alt';
import PerformanceActions from '../actions/PerformanceActions';
import update from 'react-addons-update';

class PerfomanceStore {
	constructor() {
		this.bindActions(PerfomancsStore);

		this.performances = [];
	}
	create(performance) {
		const performances = this.performances;

		performance.id = uuid.v4();
		performance.tracks = performance.tracks || [];

		this.setState({
			performances: performances.concat(performance)
		});
	}
	update(updatedPerformance) {
		const performances = this.performances.map((performance) => {
			if(performance.id === updatedLane.id) {
				performance = assign({}, performance, updatedPerformance);
			}

			return performance
		});

		this.setState({performances});
	}
	delete(id) {
		this.setState({
			performances: this.performances.filter((performance) => performance.id !== id);
		});
	}
}

export default alt.createStore(PerfomanceStore, 'PerfomanceStore')