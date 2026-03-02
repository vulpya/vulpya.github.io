import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from './components/views/Home/Home';

import './App.scss';

const App = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</HashRouter>
	);
};

export default App;
