import { BiHome, BiSolidTruck, BiTrendingUp } from "react-icons/bi";
import useAuth from "../Hooks/UseAuth";
import { motion } from "framer-motion";
const WhyChooseBookCourier = () => {
  const { theme } = useAuth();
  const features = [
    {
      icon: <BiSolidTruck size={30} className="text-accent" />,
      title: "Fast and reliable delivery",
      description:
        "The book will reach you within 24 hours of your request being confirmed. With courier tracking facility.",
    },
    {
      icon: <BiHome size={30} className="text-accent" />,
      title: "A comfortable library at home",
      description:
        "No need to go to the library to bring or return books. All the processes are at your doorstep.",
    },
    {
      icon: <BiTrendingUp size={30} className="text-accent" />,
      title: "Huge collection of books",
      description:
        "Books from more than 12 libraries in different cities are available on one platform. Find all the books you want.",
    },
  ];

  return (
    <section
      className={`py-16 px-4 sm:px-6 lg:px-8 ${
        theme === "light" && "bg-gray-50"
      } `}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl font-extrabold ${
              theme === "light" ? "text-neutral" : "text-white"
            }`}
          >
            Why is Book Courier the best choice?
          </h2>
          <p
            className={`mt-4 text-lg ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}
          >
            We have brought modern solutions to make your studies and research
            easier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 1,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
              key={index}
              className={`p-6 cursor-pointer border-t-primary rounded-lg shadow-lg ${
                theme === "light" ? "bg-white" : "bg-gray-800"
              } transition duration-300 hover:shadow-xl border-t-4`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-accent">{feature.icon}</span>
                <h3
                  className={`text-xl font-semibold ${
                    theme === "light" ? "text-neutral" : "text-white"
                  }`}
                >
                  {feature.title}
                </h3>
              </div>
              <p
                className={`${
                  theme === "light" ? "text-gray-500" : "text-white"
                }`}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseBookCourier;
