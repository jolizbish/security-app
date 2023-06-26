import './App.css';
import ParentForm from './parentForm/ParentForm';
import AugmentedTable from './augmentedTable/AugmentedTable';
import { useState } from 'react';

const App = () => {
    const [breachData, setBreachData] = useState(null);

    return (
        <div className="app">
            <ParentForm setBreachData={setBreachData.bind(this)} /> 
            { breachData ? <AugmentedTable data={breachData.breachData} /> : null }
        </div>
    )
}

export default App;
