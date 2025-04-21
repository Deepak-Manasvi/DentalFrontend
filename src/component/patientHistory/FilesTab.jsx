/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const FilesTab = () => {
  const [note, setNote] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Files</h2>

      <div className="border rounded p-4">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            Upload Files *
          </label>
          <div className="flex">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
              Choose Files
            </button>
            <span className="ml-2 py-2 text-gray-500">
              {selectedFiles.length
                ? `${selectedFiles.length} file(s) selected`
                : "No file chosen"}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            * Max 5 files, 500KB each
          </p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Note</label>
          <textarea
            className="w-full border rounded p-2 h-24"
            placeholder="Add notes about the files here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={100}
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            {100 - note.length} characters remaining
          </p>
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </div>

      <div className="mt-6">
        <table className="w-full border">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Image/File</th>
              <th className="text-left p-2">Notes</th>
              <th className="text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No Record Available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FilesTab;
