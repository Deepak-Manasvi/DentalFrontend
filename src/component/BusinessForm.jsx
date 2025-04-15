import { useState } from "react";

export default function BusinessForm() {
  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    contact: "",
    licenseNumber: "",
    financialYear: "",
    businessPhoto: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      businessPhoto: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      const apiFormData = new FormData();

      
      Object.keys(formData).forEach((key) => {
        apiFormData.append(key, formData[key]);
      });

    
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmissionStatus("success");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#2B7A6F] p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 text-white">
        Business Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Business Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Business Photo
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {formData.businessPhoto ? (
                  <p className="text-sm text-white">
                    {formData.businessPhoto.name}
                  </p>
                ) : (
                  <>
                    <svg
                      className="w-8 h-8 mb-4 text-gray-700"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-700">
                      Click to upload a photo
                    </p>
                  </>
                )}
              </div>
              <input
                id="businessPhoto"
                name="businessPhoto"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        {/* Business Name */}
        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-white mb-1"
          >
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-white mb-1"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Contact */}
        <div>
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-white mb-1"
          >
            Contact
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* License Number */}
        <div>
          <label
            htmlFor="licenseNumber"
            className="block text-sm font-medium text-white mb-1"
          >
            License Number
          </label>
          <input
            type="text"
            id="licenseNumber"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Financial Year */}
        <div>
          <label
            htmlFor="financialYear"
            className="block text-sm font-medium text-white mb-1"
          >
            Financial Year
          </label>
          <input
            type="text"
            id="financialYear"
            name="financialYear"
            value={formData.financialYear}
            onChange={handleChange}
            placeholder="YYYY-YYYY"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white font-medium rounded-md ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Submission Status Message */}
        {submissionStatus === "success" && (
          <div className="mt-3 p-2 bg-green-100 text-green-700 rounded-md text-center">
            Business information saved successfully!
          </div>
        )}
        {submissionStatus === "error" && (
          <div className="mt-3 p-2 bg-red-100 text-red-700 rounded-md text-center">
            Error saving information. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}
