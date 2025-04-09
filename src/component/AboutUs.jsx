import React from "react";

const features = [
  { icon: "👨‍⚕️", title: "Standardizing cost, quality and hygiene" },
  { icon: "🏥", title: "Bringing dentistry into mainstream medicine" },
  { icon: "🌇️", title: "Creating awareness around good oral hygiene" },
  { icon: "💻", title: "Digitizing the dental healthcare industry" },
];

const AboutUs = () => {
  return (
    <div className="w-full mt-20 min-h-screen overflow-y-scroll snap-y snap-mandatory">
      <div className="w-full h-2/3 flex justify-center items-center bg-gray-100 snap-start">
        <img
          src="https://mydentalplan.in/frontassets/images/about-header.jpg"
          alt="About Us"
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-5xl font-bold text-[#66c5eb] text-center my-12">OUR JOURNEY</h2>
      <div className="flex flex-col md:flex-row bg-gray-200 px-10 w-full py-6 min-h-[50vh]">
        <div className="md:w-2/3 text-gray-700 text-center md:text-left">
          <p className="text-2xl   mb-8">
            "Good oral hygiene is the window to good overall health - and it should be accessible and affordable for everyone."
          </p>
          <p className="mb-8 text-xl">
            MyDentalPlan Healthcare was founded in 2015 by three pioneering dentists in India. Today, it is profoundly changing the shape
            of dental care services by blending art, science, information technology, and ingenuity.
          </p>
          <p className="text-2xl   mb-8">
            "Good oral hygiene is the window to good overall health - and it should be accessible and affordable for everyone."
          </p>
          <p className="mb-8 text-xl">
            MyDentalPlan Healthcare was founded in 2015 by three pioneering dentists in India. Today, it is profoundly changing the shape
            of dental care services by blending art, science, information technology, and ingenuity.
          </p>
          <p className="text-2xl   mb-8">
            "Good oral hygiene is the window to good overall health - and it should be accessible and affordable for everyone."
          </p>
          <p className="mb-8 text-xl">
            MyDentalPlan Healthcare was founded in 2015 by three pioneering dentists in India. Today, it is profoundly changing the shape
            of dental care services by blending art, science, information technology, and ingenuity.
          </p>
          <p className="text-2xl   mb-8">
            "Good oral hygiene is the window to good overall health - and it should be accessible and affordable for everyone."
          </p>
          <p className="mb-8 text-xl">
            MyDentalPlan Healthcare was founded in 2015 by three pioneering dentists in India. Today, it is profoundly changing the shape
            of dental care services by blending art, science, information technology, and ingenuity.
          </p>
          <p className="mb-2 text-xl">
            Our mission is to bring dentistry into mainstream medicine while focusing on specialized and preventive quality dental care for all.
          </p>
          <p className="font-bold text-2xl">Our vision - Enable high-quality, standardized oral health care for all.</p>
        </div>
        <div className="md:w-1/3 flex justify-center mt-8 md:mt-2">
          <img
            className="rounded-lg shadow-lg w-80 h-80 md:w-full md:h-full object-cover"
            src="https://mydentalplan.in/frontassets/images/about-para.png"
            alt="Our Journey"
          />
        </div>
      </div>
      <div className="w-full flex justify-center mt-25 items-center snap-start px-4">
      <div className="bg-blue-900 text-white py-10 px-5 text-center roun++ded-lg shadow-lg w-full max-w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">WHAT WE ARE DOING</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-blue-800 p-10 rounded-lg flex flex-col items-center text-center shadow-lg w-full min-h-[250px]"
              >
                <div className="text-5xl mb-6" aria-hidden="true">{feature.icon}</div>
                <p className="text-xl font-medium">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center snap-start">
        <h2 className="text-4xl font-bold text-[#66c5eb] text-center py-20">OUR FOUNDERS</h2>
        <div className="max-w-6xl w-full space-y-4">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <img src="https://mydentalplan.in/frontassets/images/ab-img-1.png" alt="Dr Mohender Narula" className="w-full max-w-xs h-auto object-cover rounded-lg shadow-lg" />
            <div className="bg-white p-4 rounded-lg shadow-lg w-full">
              <h3 className="text-2xl font-bold text-blue-900">Dr Mohender Narula</h3>
              <p className="  text-gray-700">Founder and Chairperson</p>
              <p className="text-gray-700 mt-2">Dr Narula is the Chairperson and one of the founders of MyDentalPlan Healthcare. He holds an MDS from AIIMS (India), a Fellowship from the Harvard School of Dental Medicine (USA), and a DMD from the Boston Dental School (USA).</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full">
              <h3 className="text-2xl font-bold text-blue-900">Dr Anandakrishna GN</h3>
              <p className="  text-gray-700">Founder and Director</p>
              <p className="text-gray-700 mt-2">Dr Anandakrishna is the Director and one of the founders of MyDentalPlan Healthcare. He is a graduate from the Govt. Dental College (Bangalore) and completed his MDS in Prosthodontics from the AB Shetty Memorial Institute of Dental Sciences (Mangalore).</p>
            </div>
            <img src="https://mydentalplan.in/frontassets/images/ab-img-2.png" alt="Dr Anandakrishna GN" className="w-full max-w-xs h-auto object-cover rounded-lg shadow-lg" />
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <img src="https://mydentalplan.in/frontassets/images/ab-img-1.png" alt="Dr Mohender Narula" className="w-full max-w-xs h-auto object-cover rounded-lg shadow-lg" />
            <div className="bg-white p-4 rounded-lg shadow-lg w-full">
              <h3 className="text-2xl font-bold text-blue-900">Dr Mohender Narula</h3>
              <p className="  text-gray-700">Founder and Chairperson</p>
              <p className="text-gray-700 mt-2">Dr Narula is the Chairperson and one of the founders of MyDentalPlan Healthcare. He holds an MDS from AIIMS (India), a Fellowship from the Harvard School of Dental Medicine (USA), and a DMD from the Boston Dental School (USA).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
