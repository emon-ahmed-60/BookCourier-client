import { FaPaperPlane } from "react-icons/fa";
import { MdOutlineLocalLibrary, MdOutlineTrendingUp } from "react-icons/md";
import useAuth from "../Hooks/UseAuth";
import { useForm } from "react-hook-form";
import UseAxios from "../Hooks/UseAxios";
import { toast } from "react-toastify";

const BeALibrarian = () => {
  const { theme } = useAuth();
  const baseBg = theme === "light" ? "bg-gray-50" : "bg-gray-900";
  const cardBg = theme === "light" ? "bg-white" : "bg-gray-800";
  const textPrimary = theme === "light" ? "text-gray-900" : "text-gray-100";
  const textSecondary = theme === "light" ? "text-gray-600" : "text-gray-400";

  const benefits = [
    {
      icon: <MdOutlineLocalLibrary size={30} />,
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

  const instance = UseAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLibrarian = (data) => {
    console.log(data);
    instance.post("/librarians", data).then((res) => {
      if (res.data.insertedId) {
        toast.success("Your Application has been submitted");
      }
    });
  };

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

        <div
          className={`max-w-xl mx-auto p-8 rounded-xl shadow-2xl border-t-4 bg-${cardBg} border-primary`}
        >
          <h2 className={`text-3xl font-bold mb-6 text-center ${textPrimary}`}>
            Apply to Be a Library Partner
          </h2>

          <form onSubmit={handleSubmit(handleLibrarian)}>
            <div className="mb-4">
              <label
                className={`block text-sm font-medium mb-1 ${textSecondary}`}
              >
                Library Name
              </label>
              <input
                type="text"
                {...register("libraryName", { required: true })}
                required
                placeholder="E.g., Central Public Library"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 ${textPrimary}`}
              />
            </div>

            <div className="mb-4">
              <label
                className={`block text-sm font-medium mb-1 ${textSecondary}`}
              >
                City (Service Location)
              </label>
              <input
                type="text"
                {...register("city", { required: true })}
                placeholder="E.g., Dhaka, Chittagong, etc."
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 ${textPrimary}`}
              />
            </div>

            <div className="mb-4">
              <label
                className={`block text-sm font-medium mb-1 ${textSecondary}`}
              >
                Contact Email
              </label>
              <input
                type="email"
                {...register("contactEmail", { required: true })}
                placeholder="library@example.com"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 ${textPrimary}`}
              />
            </div>

            <div className="mb-6">
              <label
                className={`block text-sm font-medium mb-1 ${textSecondary}`}
              >
                Additional Information (Optional)
              </label>
              <textarea
                {...register("message")}
                rows="3"
                placeholder="Tell us a little about your library..."
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 ${textPrimary}`}
              ></textarea>
            </div>

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
