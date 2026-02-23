import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen/HomeScreen';
import ToolShed from './components/ToolShed/ToolShed';
import MineralShop from './components/MineralShop/MineralShop';
import Reference from './components/Reference/Reference';
import MineralCard from './components/Reference/MineralCard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/toolshed" element={<ToolShed />} />
        <Route path="/shop" element={<MineralShop />} />
        <Route path="/reference" element={<Reference />} />
        <Route path="/reference/:id" element={<MineralCard />} />
      </Routes>
    </BrowserRouter>
  );
}
