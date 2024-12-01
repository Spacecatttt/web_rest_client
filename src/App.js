import './App.css';
import { TabComponent } from './Tabs/TabComponent';

const API_URL = "http://localhost:5173/api";

const App = () => {

  return (
    <div className="App">
      <TabComponent />
    </div >
  );
}

export default App;
