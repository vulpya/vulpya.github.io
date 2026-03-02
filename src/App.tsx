import { HashRouter, Routes, Route } from 'react-router-dom';

import { Desktop } from './components/views/Desktop/Desktop';

import './App.scss';
import './Icons.scss';
import './Input.scss';

const App = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Desktop />} />
			</Routes>
		</HashRouter>
	);
};

export default App;
