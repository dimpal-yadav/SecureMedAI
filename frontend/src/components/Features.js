function Features(){
    return (
        <section id="features" className="features-section px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="head text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold w-full md:w-3/4 lg:w-1/2 mx-auto text-[#1E40AF] dark:text-blue-400">
              Transform Your Health Journey with Technology
            </h2>
            <p className="w-full md:w-4/5 lg:w-3/5 mx-auto mt-4 lg:mt-[20px] mb-10 lg:mb-[60px] text-gray-700 dark:text-gray-300">
              Our application offers precise disease predictions based on your
              symptoms, connecting you with specialists who can provide tailored
              care. Experience seamless management of your health records with
              enhanced security and accessibility.
            </p>
          </div>

          <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-14 mb-16 md:mb-24 lg:mb-[160px]">
            <div className="feature-card bg-[#EFF6FF] dark:bg-gray-800 p-6 md:p-8 rounded-lg text-center shadow-lg">
              <div className="icon flex justify-center mb-4 md:mb-6">
                <img
                  src="/images/feature1.png"
                  alt=""
                  loading="lazy"
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-[80px] lg:h-[80px]"
                />
              </div>
              <h3 className="text-lg font-bold mb-4 md:mb-8 text-[#1D3D8E] dark:text-blue-400">
                Symptom Based Disease Prediction
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Get accurate predictions of potential diseases based on your
                reported symptoms.
              </p>
            </div>

            <div className="feature-card bg-[#EFF6FF] dark:bg-gray-800 p-6 md:p-8 rounded-lg text-center shadow-lg">
              <div className="icon flex justify-center mb-4 md:mb-6">
                <img
                  src="/images/feature2.png"
                  loading="lazy"
                  alt=""
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-[80px] lg:h-[80px]"
                />
              </div>
              <h3 className="text-lg font-bold mb-4 md:mb-8 text-[#1D3D8E] dark:text-blue-400">
                Recommend Specialized Doctors
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Easily connect with doctors who specialize in your predicted
                health concerns.
              </p>
            </div>

            <div className="feature-card bg-[#EFF6FF] dark:bg-gray-800 p-6 md:p-8 rounded-lg text-center shadow-lg md:col-span-2 lg:col-span-1 md:mx-auto md:max-w-md lg:max-w-none">
              <div className="icon flex justify-center mb-4 md:mb-6">
                <img
                  src="/images/feature3.png"
                  loading="lazy"
                  alt=""
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-[80px] lg:h-[80px]"
                />
              </div>
              <h3 className="text-lg font-bold mb-4 md:mb-8 text-[#1D3D8E] dark:text-blue-400">
                Patient Details and Medical History
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Easily store and view patient details and view their medical
                reports and history.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Features;