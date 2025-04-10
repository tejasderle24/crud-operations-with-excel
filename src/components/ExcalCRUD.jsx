import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelCRUD = () => {
    const [dataList, setDataList] = useState([]);
    const [formData, setFormData] = useState({ roll: "", name: "", email: "", class: "", address: "" });
    const [editingIndex, setEditingIndex] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedList;
        if (editingIndex !== null) {
            updatedList = [...dataList];
            updatedList[editingIndex] = formData;
            setEditingIndex(null);
        } else {
            updatedList = [formData, ...dataList]; // Add new data at the top
        }
        setDataList(updatedList);
        setFormData({ roll: "", name: "", email: "", class: "", address: "" });
    };


    // Edit an Entry
    const handleEdit = (index) => {
        setFormData(dataList[index]);
        setEditingIndex(index);
    };

    // Delete an Entry
    const handleDelete = (index) => {
        setDataList(dataList.filter((_, i) => i !== index));
    };

    // Export to Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(dataList);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Attendees");
        XLSX.writeFile(wb, "attendees.xlsx");
    };

    // Import from Excel
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
        <div className="p-6 max-w-6xl mx-auto bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-6">Attendee Management</h2>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Form Section */}
                <div className="lg:w-1/3 bg-white p-5 shadow-md rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Add / Edit Attendee</h3>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input type="number" name="roll" value={formData.roll} onChange={handleChange} placeholder="Roll No" className="w-full p-2 border rounded" required />
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
                        <select
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                            placeholder="Select Class"
                        >
                            <option value="#">-- Select Class --</option>
                            <option value="FYMCA">FYMCA</option>
                            <option value="SYMCA">SYMCA</option>
                            <option value="FE">FE</option>
                            <option value="SE">SE</option>
                            <option value="TE">TE</option>
                            <option value="BE">BE</option>
                        </select>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" required />
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                            {editingIndex !== null ? "Update" : "Submit"}
                        </button>
                    </form>
                    <input type="file" accept=".xlsx" onChange={importFromExcel} className="mt-3 w-full p-2 border rounded" />
                    <button onClick={exportToExcel} className="w-full bg-green-500 text-white p-2 mt-3 rounded">Export to Excel</button>
                </div>

                {/* Table Section */}
                <div className="lg:w-2/3 bg-white p-5 shadow-md rounded-lg overflow-x-auto">
                    <h3 className="text-lg font-semibold mb-3">Stored Attendees</h3>
                    {dataList.length > 0 ? (
                        <table className="w-full border-collapse border border-gray-300 text-sm">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Roll No</th>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Class</th>
                                    <th className="border p-2">Address</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataList.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border p-2">{item.roll}</td>
                                        <td className="border p-2">{item.name}</td>
                                        <td className="border p-2">{item.email}</td>
                                        <td className="border p-2">{item.class}</td>
                                        <td className="border p-2">{item.address}</td>
                                        <td className="border p-2">
                                            <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                            <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">No data available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExcelCRUD;
