import { RxCross2 } from "react-icons/rx"; 
import { useState } from "react";
import axios from "axios";

const ManageServices = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [actionDropdown, setActionDropdown] = useState(null);
  const [services, setServices] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedService, setEditedService] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  const serviceTypes = [
    {
      id: 1,
      title: "Chief Complaint",
      icon: "🩺",
      endpoint: "/getAllChief",
      deleteEndpoint: "/deleteChiefById/",
      getByIdEndpoint: "/getChiefById/",
      updateEndpoint: "/updateChiefById/",
    },
    {
      id: 2,
      title: "Examination",
      icon: "🔍",
      endpoint: "/getAllExamination",
      deleteEndpoint: "/deleteExaminationById/",
      getByIdEndpoint: "/getExaminationById/",
      updateEndpoint: "/updateExaminationById/",
    },
    {
      id: 3,
      title: "Treatment Procedure",
      icon: "💊",
      endpoint: "/getAllTreatment",
      deleteEndpoint: "/deleteTreatmentById/",
      getByIdEndpoint: "/getTreatmentById/",
      updateEndpoint: "/updateTreatmentById/",
    },
    {
      id: 4,
      title: "Medicine",
      icon: "💉",
      endpoint: "/getAllMedicine",
      deleteEndpoint: "/deleteMedicineById/",
      getByIdEndpoint: "/getMedicineById/",
      updateEndpoint: "/updateMedicineById/",
    },
  ];

  const fetchServices = async (categoryTitle) => {
    setLoading(true);
    setError(null);
    try {
      const category = serviceTypes.find(
        (type) => type.title === categoryTitle
      );
      if (!category) throw new Error("Category not found");
      const response = await axios.get(
        `${baseURL}/services${category.endpoint}`
      );
      const key = Object.keys(response.data).find((k) =>
        Array.isArray(response.data[k])
      );
      setServices(response.data[key] || []);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to load services.");
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (title) => {
    setActiveCategory(title);
    setIsModalOpen(true);
    fetchServices(title);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const toggleDropdown = (index) => {
    setActionDropdown((prev) => (prev === index ? null : index));
  };

  const handleViewService = (service) => {
    setModalData(service);
  };

  const handleEditService = (service, index) => {
    setEditingIndex(index);
    setEditedService(service);
  };

  const handleInputChange = (e, key) => {
    setEditedService({ ...editedService, [key]: e.target.value });
  };

  const handleSave = async (serviceId) => {
    try {
      const category = serviceTypes.find(
        (type) => type.title === activeCategory
      );
      const endpoint = `${baseURL}/services${category.updateEndpoint}${serviceId}`;
      await axios.patch(endpoint, editedService);
      setEditingIndex(null);
      fetchServices(activeCategory);
    } catch (err) {
      console.error("Error updating service:", err);
      alert("Update failed");
    }
  };

  const handleDeleteService = async (service) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const category = serviceTypes.find(
          (type) => type.title === activeCategory
        );
        await axios.delete(
          `${baseURL}/services${category.deleteEndpoint}${service._id}`
        );
        fetchServices(activeCategory);
      } catch (err) {
        console.error("Error deleting service:", err);
        alert("Delete failed");
      }
    }
  };

  const renderTableHeaders = () => {
    if (services.length === 0) return null;
    return (
      <tr>
        {Object.keys(services[0])
          .filter((key) => key !== "__v" && key !== "_id")
          .map((key) => (
            <th key={key} className="py-2 px-4 bg-gray-100 text-left">
              {key}
            </th>
          ))}
        <th className="py-2 px-4 bg-gray-100 text-right">Actions</th>
      </tr>
    );
  };

  const renderTableRows = () => {
    if (loading)
      return (
        <tr>
          <td colSpan="100%" className="text-center p-4">
            Loading...
          </td>
        </tr>
      );
    if (error)
      return (
        <tr>
          <td colSpan="100%" className="text-center text-red-500 p-4">
            {error}
          </td>
        </tr>
      );
    if (services.length === 0)
      return (
        <tr>
          <td colSpan="100%" className="text-center p-4">
            No items found.
          </td>
        </tr>
      );

    return services.map((service, index) => (
      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
        {Object.entries(service)
          .filter(([k]) => k !== "__v" && k !== "_id")
          .map(([key, value]) => (
            <td key={key} className="py-2 px-4">
              {editingIndex === index ? (
                <input
                  className="border px-2 py-1 w-full"
                  value={editedService[key] || ""}
                  onChange={(e) => handleInputChange(e, key)}
                />
              ) : (
                value
              )}
            </td>
          ))}
        <td className="py-2 px-4 text-right relative">
          {editingIndex === index ? (
            <>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => handleSave(service._id)}
              >
                Save
              </button>
              <button
                className="bg-red-500 hover:bg-blue-500 text-white px-3 py-1 rounded border font-bold border-solid-black "
                onClick={() => setEditingIndex(null)}
              >
                <RxCross2 />
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => toggleDropdown(index)}
              >
                Actions
              </button>
              {actionDropdown === index && (
                <div className="absolute right-0 mt-2 w-36 bg-white border shadow-md z-10">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleViewService(service)}
                  >
                    View
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleEditService(service, index)}
                  >
                    Edit
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleDeleteService(service)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </td>
      </tr>
    ));
  };

  const ViewModal = () => {
    if (!modalData) return null;

    return (
      <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Item Details</h2>
            <button
              onClick={() => setModalData(null)}
              className="bg-red-500 hover:bg-blue-500 text-white font-bold px-3 py-1 border border-solid-black "
            >
              <RxCross2 />
             
            </button>
          </div>
          <table className="min-w-full">
            <thead>
              <tr>
                {Object.keys(modalData)
                  .filter((key) => key !== "__v" && key !== "_id")
                  .map((key) => (
                    <th key={key} className="px-4 py-2 text-left bg-gray-100">
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.keys(modalData)
                  .filter((key) => key !== "__v" && key !== "_id")
                  .map((key) => (
                    <td key={key} className="px-4 py-2">
                      {modalData[key]}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const ServiceModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed lg:w-[116%] inset-0 bg-transparent  mx-auto flex items-center justify-center z-40">
        <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-5xl max-h-screen overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{activeCategory} Services</h2>
            <button
              onClick={closeModal}
              className="bg-red-500 hover:bg-blue-500 text-white font-bold px-3 py-1 border border-solid-black "
            >
              <RxCross2 />
            </button>
          </div>
          <table className="w-full  border border-gray-500">
            <thead>{renderTableHeaders()}</thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {serviceTypes.map((service) => (
          <div
            key={service.id}
            onClick={() => handleCardClick(service.title)}
            className="p-6 border rounded shadow cursor-pointer hover:shadow-lg transition"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">{service.icon}</div>
              <h3 className="text-lg font-semibold">{service.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <ServiceModal />
      <ViewModal />
    </div>
  );
};

export default ManageServices;
