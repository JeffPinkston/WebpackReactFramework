import React from 'react';
import Concert from './Concert.jsx';

export default ({concerts}) => {
	return (
		<div className="concerts">
		{concerts.map((concert) =>
			<Concert className="concert" key={concert.id} concert={concert}/>
		)}</div>
	);
}
