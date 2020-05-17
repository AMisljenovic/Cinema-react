import React, { useState } from 'react';
import JqxGrid, {
	IGridProps,
	jqx
} from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';

const App = () => {
	const initSource: IGridProps['source'] = {
		localdata: [
			['Maria Anders', 'Sales Representative', 'Berlin', 'Germany'],
			['Ana Trujillo', 'Owner', 'Mxico D.F.', 'Mexico'],
			['Antonio Moreno', 'Owner', 'Mxico D.F.', 'Mexico'],
			['Thomas Hardy', 'Sales Representative', 'London', 'UK'],
			['Christina Berglund', 'Order Administrator', 'Lule', 'Sweden'],
			['Hanna Moos', 'Sales Representative', 'Mannheim', 'Germany'],
			['Frdrique Citeaux', 'Marketing Manager', 'Strasbourg', 'France'],
			['Martn Sommer', 'Owner', 'Madrid', 'Spain'],
			['Owner', 'Marseille', 'France'],
			['Elizabeth Lincoln', 'Accounting Manager', 'Tsawassen', 'Canada'],
			['Victoria Ashworth', 'Sales Representative', 'London', 'UK'],
			['Patricio Simpson', 'Sales Agent', 'Buenos Aires', 'Argentina'],
			['Francisco Chang', 'Marketing Manager', 'Mxico D.F.', 'Mexico'],
			['Yang Wang', 'Owner', 'Bern', 'Switzerland'],
			['Pedro Afonso', 'Sales Associate', 'Sao Paulo', 'Brazil'],
			['Elizabeth Brown', 'Sales Representative', 'London', 'UK'],
			['Sven Ottlieb', 'Order Administrator', 'Aachen', 'Germany'],
			['Janine Labrune', 'Owner', 'Nantes', 'France'],
			['Ann Devon', 'Sales Agent', 'London', 'UK'],
			['Roland Mendel', 'Sales Manager', 'Graz', 'Austria']
		],
		datafields: [
			{ name: 'ContactName', type: 'string', map: '0' },
			{ name: 'Title', type: 'string', map: '1' },
			{ name: 'City', type: 'string', map: '2' },
			{ name: 'Country', type: 'string', map: '3' }
		],
		datatype: 'array'
	};

	const initColumns: IGridProps['columns'] = [
		{ text: 'Contact Name', datafield: 'ContactName', width: 240 },
		{ text: 'Contact Title', datafield: 'Title', width: 240 },
		{ text: 'City', datafield: 'City', width: 150 },
		{ text: 'Country', datafield: 'Country' }
	];

	const [columns, setColumns] = useState(initColumns);
	const [source, setSource] = useState(new jqx.dataAdapter(initSource));

	return (
		<JqxGrid
			width={850}
			source={source}
			columns={columns}
			pageable={true}
			autoheight={true}
			sortable={true}
			theme={'material-purple'}
			altrows={true}
			enabletooltips={true}
			editable={true}
		/>
	);
};

export default App;
