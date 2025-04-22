import React, { useState, useEffect } from "react";
import axios from "axios";

const ClinicTable = ({ onClose }) => {
  const [formData, setFormData] = useState({
    header: null,
    footer: null,
    termsAndCondition: "",
    shareOnMail: false,
  });

  const [headerPreview, setHeaderPreview] = useState("");
  const [footerPreview, setFooterPreview] = useState("");
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Base URL from env
  const API_ENDPOINT = `${import.meta.env.VITE_APP_BASE_URL}/clinic-config`;

  // Fetch existing configurations on component mount
  useEffect(() => {
    fetchConfigurations();
  }, []);

  const fetchConfigurations = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/getUpload`);
      if (response.data.success) {
        setConfigs(response.data.configurations);
      }
    } catch (error) {
      console.error("Error fetching configurations:", error);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update form data
    setFormData({
      ...formData,
      [type]: file,
    });

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "header") {
        setHeaderPreview(reader.result);
      } else if (type === "footer") {
        setFooterPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      if (formData.header) formDataToSend.append("header", formData.header);
      if (formData.footer) formDataToSend.append("footer", formData.footer);
      formDataToSend.append(
        "termsAndCondition",
        formData.termsAndCondition || ""
      );
      formDataToSend.append(
        "shareOnMail",
        formData.shareOnMail ? "true" : "false"
      );

      let response;
      if (editingId) {
        response = await axios.put(
          `${API_ENDPOINT}/updateUpload/${editingId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `${API_ENDPOINT}/createUpload`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.data.success) {
        // Reset form
        setFormData({
          header: null,
          footer: null,
          termsAndCondition: "",
          shareOnMail: false,
        });
        setHeaderPreview("");
        setFooterPreview("");
        setEditingId(null);

        // Refresh configurations list
        fetchConfigurations();
      }
    } catch (error) {
      console.error("Error saving configuration:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (configId) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/getUpload/${configId}`);
      const config = response.data.configuration;

      setEditingId(configId);
      setFormData({
        header: null,
        footer: null,
        termsAndCondition: config.termsAndCondition || "",
        shareOnMail: config.shareOnMail || false,
      });
      setHeaderPreview(config.headerUrl || "");
      setFooterPreview(config.footerUrl || "");
    } catch (error) {
      console.error("Error fetching configuration details:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this configuration?"))
      return;

    try {
      const response = await axios.delete(`${API_ENDPOINT}/deleteUpload/${id}`);

      if (response.data.success) {
        fetchConfigurations();
      }
    } catch (error) {
      console.error("Error deleting configuration:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      header: null,
      footer: null,
      termsAndCondition: "",
      shareOnMail: false,
    });
    setHeaderPreview("");
    setFooterPreview("");
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Clinic Configuration</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Close
        </button>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8"
      >
        <h3 className="text-lg font-medium mb-4">
          {editingId ? "Edit Configuration" : "Add New Configuration"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Header Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Header
            </label>
            <div className="flex flex-col space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "header")}
                className="border rounded p-2"
              />
              {headerPreview && (
                <div className="mt-2">
                  <img
                    src={headerPreview}
                    alt="Header preview"
                    className="h-20 object-contain border rounded"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Footer Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Footer
            </label>
            <div className="flex flex-col space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "footer")}
                className="border rounded p-2"
              />
              {footerPreview && (
                <div className="mt-2">
                  <img
                    src={footerPreview}
                    alt="Footer preview"
                    className="h-20 object-contain border rounded"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Terms & Conditions
            </label>
            <textarea
              name="termsAndCondition"
              value={formData.termsAndCondition}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              rows="4"
            ></textarea>
          </div>

          {/* Share on Mail */}
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="shareOnMail"
                checked={formData.shareOnMail}
                onChange={handleInputChange}
                className="h-4 w-4 mr-2"
              />
              <label className="text-sm font-medium text-gray-700">
                Share on Mail
              </label>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="mt-6 flex space-x-3">
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded-md text-sm font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            disabled={loading}
          >
            {loading ? "Processing..." : editingId ? "Update" : "Upload"}
          </button>
        </div>
      </form>

      {/* Configuration List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h3 className="text-lg font-medium p-4 border-b">
          Saved Configurations
        </h3>

        {configs.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No configurations found. Add one above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Header
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Footer
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Terms & Conditions
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shared
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {configs.map((config) => (
                  <tr key={config._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      {config.headerUrl ? (
                        <img
                          src={config.headerUrl}
                          alt="Header"
                          className="h-12 w-20 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">None</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {config.footerUrl ? (
                        <img
                          src={config.footerUrl}
                          alt="Footer"
                          className="h-12 w-20 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">None</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="max-w-xs truncate">
                        {config.termsAndCondition || (
                          <span className="text-gray-400 text-sm">None</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {config.shareOnMail ? "Yes" : "No"}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(config._id)}
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(config._id)}
                          className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicTable;
