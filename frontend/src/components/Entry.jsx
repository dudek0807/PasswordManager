import React, { useState } from "react";
import { FiCopy, FiEye, FiEyeOff, FiTrash2 } from "react-icons/fi";
import "../styles/Entry.css";

function Entry({ entry, onDelete, onCreate, isAddButton = false }) {
  if (isAddButton) {
    return (
      <div
        className="entry-container cursor-pointer hover:shadow-lg transition flex flex-col justify-center items-center min-h-[160px]"
        onClick={onCreate}
      >
        <p className="entry-name text-center text-blue-600">➕ Add new entry</p>
      </div>
    );
  }

  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="entry-container">
      <div className="entry-row">
        <span className="text-gray-500 text-sm w-1/3">Website</span>
        <div className="flex items-center gap-2 w-2/3 justify-end">
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm break-all hover:underline"
          >
            {entry.url}
          </a>
          <button onClick={() => handleCopy(entry.url, "url")}>
            <FiCopy className="icon text-gray-400 hover:text-black cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="entry-row">
        <span className="text-gray-500 text-sm w-1/3">Username</span>
        <div className="flex items-center gap-2 w-2/3 justify-end">
          <span className="text-gray-900 text-sm break-all">
            {entry.username}
          </span>
          <button onClick={() => handleCopy(entry.username, "username")}>
            <FiCopy className="icon text-gray-400 hover:text-black cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="entry-row">
        <span className="text-gray-500 text-sm w-1/3">Password</span>
        <div className="flex items-center gap-2 w-2/3 justify-end">
          <span className="text-gray-900 text-sm break-all select-all">
            {showPassword ? entry.password : "••••••••••"}
          </span>
          <button onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? (
              <FiEyeOff className="icon text-gray-400 hover:text-black cursor-pointer" />
            ) : (
              <FiEye className="icon text-gray-400 hover:text-black cursor-pointer" />
            )}
          </button>
          <button onClick={() => handleCopy(entry.password, "password")}>
            <FiCopy className="icon text-gray-400 hover:text-black cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="entry-row">
        <span className="text-gray-500 text-sm w-1/3">Folder</span>
        <span className="text-gray-900 text-sm break-all">
          {entry.folder_name || entry.folder}
        </span>
      </div>

      <div className="pt-3 text-right">
        <button className="delete-button" onClick={() => onDelete(entry.id)}>
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  );
}

export default Entry;
