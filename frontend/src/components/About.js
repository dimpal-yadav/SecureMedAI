function About() {
  return (
    <section id="about-us" className="about-section px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="about-container flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-[90px] justify-between mb-12 md:mb-16 lg:mb-[100px]">
            <div className="text w-full lg:w-[55%] order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E40AF] mb-6 lg:mb-[40px]">
                About Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                At secure_med_ai, we believe in transforming healthcare through
                the power of technology. Our platform combines intelligent
                disease prediction, secure electronic health record (EHR)
                management, and personalized doctor recommendations to provide
                users with timely, reliable, and accessible medical support.
                Using advanced machine learning models, we enable users to input
                their symptoms and receive insights into potential health
                conditions, along with guidance on finding the right medical
                specialists.
              </p>
              <br />
              <p className="text-gray-700 dark:text-gray-300">
                Our mission is to bridge the gap between patients and healthcare
                professionals by simplifying the diagnostic journey and
                promoting proactive care. Whether you're managing your personal
                health or assisting a loved one, our intuitive and secure system is designed to help you make informed decisions. We are committed to innovation, privacy, and usability—ensuring that our solution is not only smart but also trustworthy and easy to use.
              </p>
            </div>
            <div className="image-container w-full lg:w-[45%] order-1 lg:order-2">
              <img
                src="/images/aboutus.jpg"
                alt="About secure_med_ai"
                loading="lazy"
                className="w-full h-auto md:h-[350px] lg:h-[450px] object-cover rounded-lg opacity-90"
              />
            </div>
          </div>
        </div>
      </section>
  );
}

export default About;