import { useEffect, useState } from "react";
import api from "../api";
import "../styles/Home.css";
import Entry from "../components/Entry";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { FiFolder, FiUser, FiLock, FiLink, FiPlus } from "react-icons/fi";

function Home() {
  const [folders, setFolders] = useState([]);
  const [entries, setEntries] = useState([]);

  const [selectedFolder, setSelectedFolder] = useState("");
  const [showNewFolderInput, setShowNewFolderInput] = useState(true);
  const [newFolderName, setNewFolderName] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");

  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  useEffect(() => {
    getFolders();
    getEntries();
  }, []);

  const getFolders = async () => {
    await api
      .get("/api/folders/")
      .then((res) => res.data)
      .then((data) => {
        setFolders(data);
      })
      .catch((err) => alert(err));
  };

  const getEntries = async () => {
    await api
      .get("/api/entries/")
      .then((res) => res.data)
      .then((data) => setEntries(data))
      .catch((err) => alert(err));
  };

  const deleteFolder = async (id) => {
    await api
      .delete(`/api/folders/${id}/delete/`)
      .then((res) => {
        if (res.status === 204) alert("Folder deleted");
        else alert("Error deleting folder");
        getFolders();
      })
      .catch((err) => alert(err));
  };

  const deleteEntry = async (id) => {
    await api
      .delete(`/api/entries/${id}/delete/`)
      .then((res) => {
        if (res.status === 204) alert("Entry deleted");
        else alert("Error deleting entry");
        getEntries();
      })
      .catch((err) => alert(err));
  };

  const handleFolderChange = (e) => {
    const value = e.target.value;
    if (value === "__create__") {
      setShowNewFolderInput(true);
      setSelectedFolder(value);
      setIsButtonDisabled(true);
    } else {
      setShowNewFolderInput(false);
      setSelectedFolder(value);
      setIsButtonDisabled(false);
    }
  };

  const createFolder = async (e) => {
    e.preventDefault();
    await api
      .post("/api/folders/", { name: newFolderName })
      .then((res) => {
        if (res.status === 201) {
          alert("Folder created");
          const newFolder = res.data;
          setFolders([...folders, newFolder]);
          setSelectedFolder(newFolder.id);
          setShowNewFolderInput(false);
          setIsButtonDisabled(false);
          setNewFolderName("");
        } else alert("Error creating folder");
      })
      .catch((err) => alert(err));
  };

  const createEntry = async (e) => {
    e.preventDefault();

    await api
      .post("/api/entries/", {
        folder: selectedFolder,
        username,
        password,
        url,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Entry created");
          getEntries();
          setUsername("");
          setPassword("");
          setUrl("");
          setState({ isPaneOpen: false });
        } else alert("Error creating entry");
      })
      .catch((err) => alert("Error: " + err));
  };

  return (
    <div className="home-container">
      <h2 className="home-header">Entries</h2>

      <div className="entry-section">
        <div className="entry-list">
          {entries.map((entry) => (
            <Entry entry={entry} onDelete={deleteEntry} key={entry.id} />
          ))}
          <Entry isAddButton onCreate={() => setState({ isPaneOpen: true })} />
        </div>
      </div>
      <div>
        <SlidingPane
          className="some-custom-class"
          overlayClassName="some-custom-overlay-class"
          isOpen={state.isPaneOpen}
          from="left"
          width="50%"
          onRequestClose={() => {
            setState({ isPaneOpen: false });
          }}
        >
          <form onSubmit={createEntry} className="entry-container space-y-4">
            <div className="entry-row flex-col sm:flex-row sm:items-center">
              <label
                htmlFor="folder"
                className="w-full sm:w-1/3 text-gray-500 text-sm mb-1 sm:mb-0"
              >
                Select folder:
              </label>
              <div className="w-full sm:w-2/3 flex flex-col">
                <select
                  value={selectedFolder}
                  onChange={handleFolderChange}
                  className="entry-input rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="__create__">➕ Create new folder</option>
                  {folders.map((f) => (
                    <option value={f.id} key={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>

                {showNewFolderInput && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Nowy folder"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      className="entry-input w-full sm:w-2/3 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <br />
                    <button
                      type="button"
                      onClick={createFolder}
                      className="entry-button"
                    >
                      Add fodler
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="entry-row flex-col sm:flex-row sm:items-center">
              <label
                htmlFor="username"
                className="w-full sm:w-1/3 text-gray-500 text-sm mb-1 sm:mb-0"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="entry-input w-full sm:w-2/3 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="entry-row flex-col sm:flex-row sm:items-center">
              <label
                htmlFor="password"
                className="w-full sm:w-1/3 text-gray-500 text-sm mb-1 sm:mb-0"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="entry-input w-full sm:w-2/3 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="entry-row flex-col sm:flex-row sm:items-center">
              <label
                htmlFor="url"
                className="w-full sm:w-1/3 text-gray-500 text-sm mb-1 sm:mb-0"
              >
                URL:
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="entry-input w-full sm:w-2/3 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className={`entry-button ${
                  isButtonDisabled ? "entry-button-disabled" : ""
                }`}
                disabled={isButtonDisabled}
              >
                Add entry
              </button>
            </div>
          </form>
        </SlidingPane>
      </div>
    </div>
  );
}

export default Home;
