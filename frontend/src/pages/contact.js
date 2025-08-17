import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
const socialIcons = {
  facebook: {
    normal: <img src="/images/facebook.png" alt="Facebook" className="w-5 h-5 md:w-6 md:h-6" />,
    white: <img src="/images/facebook-white.png" alt="Facebook" className="w-5 h-5 md:w-6 md:h-6" />,
  },
  twitter: {
    normal: <img src="/images/twitter.png" alt="Twitter" className="w-5 h-5 md:w-6 md:h-6" />,
    white: <img src="/images/twitter-white.png" alt="Twitter" className="w-5 h-5 md:w-6 md:h-6" />,
  },
  instagram: {
    normal: <img src="/images/insta.png" alt="Instagram" className="w-5 h-5 md:w-6 md:h-6" />,
    white: <img src="/images/insta-white.png" alt="Instagram" className="w-5 h-5 md:w-6 md:h-6" />,
  },
  linkedin: {
    normal: <img src="/images/linkedin.png" alt="LinkedIn" className="w-5 h-5 md:w-6 md:h-6" />,
    white: <img src="/images/linkedin-white.png" alt="LinkedIn" className="w-5 h-5 md:w-6 md:h-6" />,
  },
};

function Contact() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div className={`contact-page bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen ${isDark ? 'dark' : ''}`}>
      {/* Navbar */}
      <div className="nav mb-8 md:mb-10">
        <Navbar theme={theme} />
      </div>

      {/* Contact Us */}
      <section className={`contact-section bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-8 md:py-12 lg:py-16 gap-10 lg:gap-6">
            {/* Details */}
            <div className="contact-container w-full lg:w-1/2">
              <div className="title">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  Contact Us
                </h1>
              </div>
              <div className="paragraph mt-3 md:mt-4 mb-6 md:mb-8 w-full md:w-4/5 lg:w-3/4">
                <p className={`text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email, call or submit the form to contact us or tell us what
                  you have got in mind
                </p>
              </div>
              <div className={`details text-sm md:text-base ${isDark ? 'text-blue-200' : 'text-blue-900'}`}>
                <p className="mb-2">secure_med_ai@gmail.com</p>
                <p className="mb-6 md:mb-8">+977-9800000000</p>
              </div>
              <div className="logo flex gap-4 md:gap-6 mb-10 lg:mb-0">
                <a href="#" aria-label="Facebook">{isDark ? socialIcons.facebook.white : socialIcons.facebook.normal}</a>
                <a href="#" aria-label="Twitter">{isDark ? socialIcons.twitter.white : socialIcons.twitter.normal}</a>
                <a href="#" aria-label="Instagram">{isDark ? socialIcons.instagram.white : socialIcons.instagram.normal}</a>
                <a href="#" aria-label="LinkedIn">{isDark ? socialIcons.linkedin.white : socialIcons.linkedin.normal}</a>
              </div>
            </div>

            {/* Form */}
            <div className={`form-container w-full lg:w-5/12 px-4 sm:px-6 md:px-8 py-6 md:py-8 lg:py-10 rounded-lg shadow-md border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="text">
                <h2 className="text-xl md:text-2xl font-semibold">
                  Get in Touch
                </h2>
                <p className={`mt-1 md:mt-2 mb-6 md:mb-8 text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tell us how can we help you
                </p>
              </div>
              <div className="form">
                <form>
                  <div className="names grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 md:mb-5">
                    <input
                      type="text"
                      placeholder="First name"
                      className={`rounded-lg w-full border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} p-2 md:p-3`}
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className={`rounded-lg w-full border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} p-2 md:p-3`}
                    />
                  </div>
                  <div className="email mb-4 md:mb-5">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className={`rounded-lg w-full border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} p-2 md:p-3`}
                    />
                  </div>
                  <div className="message mb-5 md:mb-7">
                    <textarea
                      placeholder="How can we help?"
                      className={`rounded-lg w-full border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} p-2 md:p-3 h-24 md:h-32`}
                    ></textarea>
                  </div>
                  <div className="button">
                    <button
                      type="submit"
                      className="common-button rounded-xl bg-blue-600 text-white py-2 md:py-3 px-6 md:px-8 w-full sm:w-auto hover:bg-blue-800 transition-colors duration-300"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="footer mt-10 md:mt-16">
        <Footer theme={theme} />
      </div>
    </div>
  );
}

export default Contact;
