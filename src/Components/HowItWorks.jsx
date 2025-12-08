import { BiBookOpen, BiPackage, BiSearch } from "react-icons/bi";
import useAuth from "../Hooks/UseAuth";
import { motion } from "framer-motion";
const HowItWorks = () => {
  const { theme } = useAuth();

  const steps = [
    {
      icon: BiSearch,
      title: "1. book search",
      description:
        "Find your favorite book from our vast catalog and submit a 'Delivery Request'.",
    },
    {
      icon: BiPackage,
      title: "2. Delivery and tracking",
      description:
        "The library will hand over your book to the courier. You can track it in real-time on the app.",
    },
    {
      icon: BiBookOpen,
      title: "3. Read and return",
      description:
        "Get the book in hand, take your time reading it. Request pickup at your address at the end of the rental period.",
    },
  ];

  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className={`text-4xl font-extrabold ${
            theme === "light" ? "text-gray-900" : "text-gray-100"
          } mb-12`}
        >
          How does Book Courier work?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                className={`flex flex-col items-center p-6 rounded-lg transition duration-500 transform cursor-pointer hover:scale-[1.03] 
                                            ${
                                              theme === "light"
                                                ? "bg-white"
                                                : "bg-gray-800"
                                            } shadow-xl`}
              >
                <div className="mb-4 p-5 rounded-full shadow-lg text-primary bg-[primary + 10]">
                  <IconComponent
                    size={40}
                    className={`${
                      theme === "light" ? "text-blue-600" : "text-blue-400"
                    }`}
                  />
                </div>

                <h3
                  className={`text-2xl font-bold ${
                    theme === "light" ? "text-gray-900" : "text-gray-100"
                  } mb-3`}
                >
                  {step.title}
                </h3>

                <p
                  className={`${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  } max-w-xs`}
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
