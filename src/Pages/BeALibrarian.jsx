import { FaPaperPlane } from "react-icons/fa";
import { MdOutlineLocalLibrary, MdOutlineTrendingUp } from "react-icons/md";
import useAuth from "../Hooks/UseAuth";

const BeALibrarian = () => {
  const { theme } = useAuth();
  const baseBg = theme === "light" ? "bg-gray-50" : "bg-gray-900";
  const cardBg = theme === "light" ? "bg-white" : "bg-gray-800";
  const textPrimary = theme === "light" ? "text-gray-900" : "text-gray-100";
  const textSecondary = theme === "light" ? "text-gray-600" : "text-gray-400";

  const benefits = [
    {
      icon: <MdOutlineLocalLibrary size={30}  />,
      title: "Inventory Digitalization",
      description:
        "Easily add your entire book collection to a digital catalog and streamline your stock management.",
    },
    {
      icon: <FaPaperPlane size={30} />,
      title: "Order Automation",
      description:
        "Simplify the process of automatically accepting reader requests and assigning tasks to couriers.",
    },
    {
      icon: <MdOutlineTrendingUp size={30} />,
      title: "Expand Readership",
      description:
        "Break geographical limits and reach a larger audience by offering convenient book delivery.",
    },
  ];

  return (
    <div className={`py-12 ${baseBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 text-primary">
            Digitize Your Library with Book Courier
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${textSecondary}`}>
            Join Book Courier to modernize your library management and book
            distribution process.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-xl transition duration-300 ${cardBg} hover:shadow-2xl`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-3 rounded-full bg-accent ">
                  {benefit.icon}
                </div>
                <h3 className={`text-xl font-semibold ${textPrimary}`}>
                  {benefit.title}
                </h3>
              </div>
              <p className={`${textSecondary}`}>{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* --- Section 2: Application Form --- */}
        <div
          className={`max-w-xl mx-auto p-8 rounded-xl shadow-2xl border-t-4 bg-${cardBg} border-primary`}
        >
          <h2 className={`text-3xl font-bold mb-6 text-center ${textPrimary}`}>
            Apply to Be a Library Partner
          </h2>

          <form>
            {/* 1. Library Name */}
            <div className="mb-4">
              <label
                htmlFor="libraryName"
                className={`block text-sm font-medium mb-1 ${textSecondary}`}
              >
                Library Name
              </label>
              <input
                type="text"
                id="libraryName"
                required
                placeholder="E.g., Central Public Library"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 ${textPrimary}`}
              />
            </div>

            {/* 2. City Name */}
            <div className="mb-4">
              <label
                htmlFor="city"
                className={`block text-sm font-medium mb-1 ${textSecondary}`}
              >
                City (Service Location)
              </label>
              <input
                type="text"
                id="city"
                required
                placeholder="E.g., Dhaka, Chittagong, etc."
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 ${textPrimary}`}
              />
            </div>

            {/* 3. Contact Email */}
            <div className="mb-4">
              <label
                htmlFor="contactEmail"
                className={`block text-sm font-medium mb-1 ${textSecondary}`}
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                required
                placeholder="library@example.com"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 ${textPrimary}`}
              />
            </div>

            {/* 4. Message Box */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className={`block text-sm font-medium mb-1 ${textSecondary}`}
              >
                Additional Information (Optional)
              </label>
              <textarea
                id="message"
                rows="3"
                placeholder="Tell us a little about your library..."
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 ${textPrimary}`}
              ></textarea>
            </div>

            {/* 5. Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold transition duration-300 hover:opacity-90 bg-primary"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BeALibrarian;
