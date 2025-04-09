import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Pricing() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        {
            question: "How does it work?",
            answer: "DentalGuru Software streamlines your dental practice operations with:\n- Patient Management: Easily manage patient records, appointments, and treatment plans in one secure platform.\n- Appointment Scheduling: Use our intuitive calendar to schedule, reschedule, and send appointment reminders.\n- Billing and Invoicing: Generate and manage invoices, process payments, and track financial records efficiently.\n- Electronic Health Records (EHR): Access and update patient health records with ease, ensuring accurate and up-to-date information.\n- Treatment Planning: Create detailed treatment plans and track patient progress over time.\n- Communication Tools: Enhance patient communication with built-in messaging and automated reminder systems.\n- Analytics and Reporting: Gain insights into your practice’s performance with comprehensive reports and analytics.\n- Simply integrate DentalGuru into your practice, customize it to your needs, and start experiencing a more efficient and organized workflow.",
        },
        { question: "Who can use DentalGuru?", answer: "DentalGuru is designed for dental professionals, including dentists, dental hygienists, and administrative staff in dental practices of all sizes." },
        { question: "How do I schedule appointments using DentalGuru?", answer: "You can schedule appointments by accessing the calendar feature in DentalGuru. Select an available time slot, enter patient details, and confirm the appointment. The Software will automatically update and send reminders to patients." },
        { question: "Can DentalGuru manage patient records?", answer: "Yes, DentalGuru allows you to manage comprehensive patient records, including medical history, treatment plans, X-rays, and other essential documents. All data is stored securely and can be accessed easily." },
        { question: "What should I do if I encounter a technical issue?", answer: "If you encounter a technical issue, please contact our support team immediately. You can reach us via phone, email, or live chat. Additionally, you can refer to the troubleshooting section in the user manual for common issues and solutions." },
        { question: "Is my data secure with DentalGuru?", answer: "Absolutely. DentalGuru uses advanced encryption protocols to ensure all patient and practice data is secure. We comply with HIPAA regulations to protect patient privacy and ensure data security." },
        { question: "How does DentalGuru handle data backups?", answer: "DentalGuru performs automatic backups daily to ensure your data is always protected. You can also configure manual backups according to your practice’s needs." }
    ];

    return (
        <div className="flex flex-col mt-20 items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-gray-800">Our Plans</h1>
            <p className="text-gray-600 text-center max-w-xl mt-4">
                We provide everything you need to generate awareness, drive traffic, and connect better.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
                {[
                    { title: "Monthly", price: "₹3,999/-", desc: "Monthly plan with maintenance and features tailored for dental professionals.", features: ["1 Month SMO (Social Media Optimization)", "2-Page React Website for Appointments (Includes 1 Year of Free Maintenance)", "1 Premium Video (Exclusive to Lifetime Plan)", "Lifetime Referral Bonus – Earn Rewards for Every Referral!"] },
                    { title: "Quarterly", price: "₹4,499/-", oldPrice: "₹8,999/-", desc: "Half-yearly plan with additional perks and a discount for longer duration.", features: ["Flat 50% Discount on Your Subscription!", "1 Walk Through Video (Raw will be provided by client)", "2-Page React Website for Appointments (Includes 1 Year of Free Maintenance)", "1 Premium Video (Exclusive to Lifetime Plan)", "Lifetime Referral Bonus – Earn Rewards for Every Referral!"] },
                    { title: "Half Yearly", price: "₹7,199/-", oldPrice: "₹13,399/-", desc: "3-month plan offering discounts and additional features for extended service.", features: ["Flat 50% Discount on Your Subscription!", "1 Month SMO (Social Media Optimization)", "2-Page React Website for Appointments (Includes 1 Year of Free Maintenance)", "1 Premium Video (Exclusive to Lifetime Plan)", "Lifetime Referral Bonus – Earn Rewards for Every Referral!"] },
                    { title: "Quarterly", price: "₹4,499/-", oldPrice: "₹8,999/-", desc: "Half-yearly plan with additional perks and a discount for longer duration.", features: ["Flat 50% Discount on Your Subscription!", "1 Walk Through Video (Raw will be provided by client)", "2-Page React Website for Appointments (Includes 1 Year of Free Maintenance)", "1 Premium Video (Exclusive to Lifetime Plan)", "Lifetime Referral Bonus – Earn Rewards for Every Referral!"] },
                    { title: "Quarterly", price: "₹4,499/-", oldPrice: "₹8,999/-", desc: "Half-yearly plan with additional perks and a discount for longer duration.", features: ["Flat 50% Discount on Your Subscription!", "1 Walk Through Video (Raw will be provided by client)", "2-Page React Website for Appointments (Includes 1 Year of Free Maintenance)", "1 Premium Video (Exclusive to Lifetime Plan)", "Lifetime Referral Bonus – Earn Rewards for Every Referral!"] },
                    { title: "Quarterly", price: "₹4,499/-", oldPrice: "₹8,999/-", desc: "Half-yearly plan with additional perks and a discount for longer duration.", features: ["Flat 50% Discount on Your Subscription!", "1 Walk Through Video (Raw will be provided by client)", "2-Page React Website for Appointments (Includes 1 Year of Free Maintenance)", "1 Premium Video (Exclusive to Lifetime Plan)", "Lifetime Referral Bonus – Earn Rewards for Every Referral!"] },
                ].map((plan, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform cursor-pointer"
                    >
                        <p className="text-3xl font-bold mt-1">{plan.price}</p>
                        {plan.oldPrice && <p className="text-3xl font-bold mt-1 line-through text-red-500">{plan.oldPrice}</p>}
                        <h2 className="text-xl font-semibold mt-3">{plan.title}</h2>
                        <p className="text-gray-500 mt-2">{plan.desc}</p>
                        <ul className="text-gray-600 text-left mt-4 space-y-2">
                            {plan.features.map((feature, i) => (
                                <li key={i}>✔ {feature}</li>
                            ))}
                        </ul>

                        <div className="flex justify-center mt-4">
                            {/* Checkout Button */}
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                                Checkout
                            </button>
                            {/* Connect Us Button */}
                            <button className="bg-teal-200 text-teal-800 py-2 px-4 rounded-md hover:bg-teal-300 transition duration-200 ml-2">
                                Connect Us
                            </button>
                        </div>


                    </div>
                ))}
            </div>
            <div className="text-center mt-30">
                <h2 className="text-3xl font-bold text-black">Frequently Asked Questions</h2>
                <p className="text-gray-600 mt-15">
                    Discover the transformative magic of DentalGuru, simple designs that elevate your Dental Hospital.
                    Learn more today!
                </p>
            </div>

            {/* FAQ Section with Image on the Left and Questions on the Right */}
            <div className="mt-16 w-full max-w-6xl flex flex-col sm:flex-row items-center sm:items-start justify-between space-y-8 sm:space-y-0 sm:space-x-6">
                {/* Left Image Section */}
                <div className="w-full sm:w-1/2 flex justify-center items-center">
                    <img
                        src="https://dentalguru.software/static/media/faqs.187fa40f8f82d2ea1863.png"
                        alt="Dental Guru Image"
                        className="w-full max-w-[90%] sm:max-w-[600px] h-auto rounded-lg shadow-lg"
                    />
                </div>

                {/* Right FAQ Section */}
                <div className="w-full sm:w-1/2 px-4">
                    <div className="flex flex-col items-start space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="w-full bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                >
                                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                                    {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {openFAQ === index && <p className="mt-2 text-gray-600 whitespace-pre-line">{faq.answer}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>

    );
}
