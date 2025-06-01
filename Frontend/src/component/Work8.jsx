import React from 'react'


function Work8() {
  
       
  return (

    <div className='bg-blue-400'>

    <section className="contact-section bg-blue-400 flex justify-center items-center flex-col gap-8">
      <div className="form-container ">
        <h2>Start Your Journey</h2>
        <p>Get in touch with us to start your medical fundraising campaign</p>
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Operation type" required />
          <select placeholder="Choose a hospital">
            <option> Choose Hospital</option>
            <option>City General Hospital</option>
            <option>Life Care Hospital</option>
            <option>Metro Medical Center</option>
          </select>
          <input type="text" placeholder='Amount' required />
          <textarea placeholder="Description"></textarea>
          <button type="submit">Submit Request</button>
        </form>
      </div>
      <div className="contact-info">
        <h3>Contact Information</h3>
        <p>📞 +1 (555) 123-4567 (Mon-Fri 9am-6pm)</p>
        <p>📧 support@medfund.com (We'll respond within 24 hours)</p>
      </div>
    </section>
    </div>
  )

}

export default Work8;