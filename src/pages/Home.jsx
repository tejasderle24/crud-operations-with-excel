import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [seminar, setSeminar] = useState({ topic: '', speaker: '', date: '', time: '' });
  const navigate = useNavigate();

  const handleSave = () => {
    const ws = XLSX.utils.json_to_sheet([seminar]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Seminar');
    XLSX.writeFile(wb, 'seminar.xlsx');
    navigate('/form');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Seminar Details</h2>
      <input type="text" placeholder="Seminar Topic" onChange={(e) => setSeminar({ ...seminar, topic: e.target.value })} className="border p-2 w-full" />
      <input type="text" placeholder="Speaker Name" onChange={(e) => setSeminar({ ...seminar, speaker: e.target.value })} className="border p-2 w-full" />
      <input type="date" onChange={(e) => setSeminar({ ...seminar, date: e.target.value })} className="border p-2 w-full" />
      <input type="time" onChange={(e) => setSeminar({ ...seminar, time: e.target.value })} className="border p-2 w-full" />
      <button onClick={handleSave} className="bg-blue-500 text-white p-2 mt-4">Save & Next</button>
    </div>
  );
}