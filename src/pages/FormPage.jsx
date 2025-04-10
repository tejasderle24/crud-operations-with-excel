import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function FormPage() {
    const [attendees, setAttendees] = useState([]);
  
    const addAttendee = () => {
      setAttendees([...attendees, { roll: '', name: '', email: '', class: '', address: '' }]);
    };
  
    const updateAttendee = (index, key, value) => {
      const newAttendees = [...attendees];
      newAttendees[index][key] = value;
      setAttendees(newAttendees);
    };
  
    const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(attendees);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Attendees');
      XLSX.writeFile(wb, 'attendees.xlsx');
    };

    const importFromExcel = (event) => {
            const file = event.target.files[0];
            if (!file) return;
    
            const reader = new FileReader();
            reader.onload = (e) => {
                const workbook = XLSX.read(e.target.result, { type: "binary" });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                setDataList(jsonData);
            };
            reader.readAsBinaryString(file);
        };
    
  
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Attendee Details</h2>
        <button onClick={addAttendee} className="bg-green-500 text-white p-2">Add Attendee</button>
        <input type="file" accept=".xlsx" onChange={importFromExcel} className="mt-3 w-full p-2 border rounded" />
        {attendees.map((attendee, index) => (
          <div key={index} className="border p-2 mt-2">
            <input type="text" placeholder="Roll No" onChange={(e) => updateAttendee(index, 'roll', e.target.value)} className="border p-2" />
            <input type="text" placeholder="Name" onChange={(e) => updateAttendee(index, 'name', e.target.value)} className="border p-2" />
            <input type="email" placeholder="Email" onChange={(e) => updateAttendee(index, 'email', e.target.value)} className="border p-2" />
            <input type="text" placeholder="Class" onChange={(e) => updateAttendee(index, 'class', e.target.value)} className="border p-2" />
            <input type="text" placeholder="Address" onChange={(e) => updateAttendee(index, 'address', e.target.value)} className="border p-2" />
          </div>
        ))}
        <button onClick={exportToExcel} className="bg-blue-500 text-white p-2 mt-4">Export to Excel</button>
      </div>
    );
  }

