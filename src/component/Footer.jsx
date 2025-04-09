const Footer = () => {
    return (
      <footer className="h-screen w-full flex flex-col bg-white-900 text-secondary border-t">
        {/* Contact Section with Map and Form */}
        <div className="flex flex-col md:flex-row w-full h-3/5 md:h-1/2 bg-white">
          {/* Map Section */}
          <div className="w-full md:w-1/2 h-full">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.293437877416!2d-122.41941558468178!3d37.77492977975919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c8f5aaf1f%3A0x6c4ddf242a85c3e3!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1614973517182!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          {/* Contact Form Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-evenly items-center p-5 bg-gray-100">
            <h2 className="capitalize text-2xl text-primary font-bold drop-shadow-md">Get in Touch</h2>
            <form className="w-full flex flex-col space-y-4">
              <input type="text" name="name" placeholder="Name *" className="border-b border-gray-400 py-2 bg-transparent text-primary focus:outline-none" />
              <input type="email" name="email" placeholder="Email *" className="border-b border-gray-400 py-2 bg-transparent text-primary focus:outline-none" />
              <input type="text" name="contact" placeholder="Phone Number *" className="border-b border-gray-400 py-2 bg-transparent text-primary focus:outline-none" />
              <textarea name="message" placeholder="Enter your message" className="border-b border-gray-400 py-2 bg-transparent text-primary focus:outline-none"></textarea>
              <button className="bg-blue-900 text-white py-2 rounded">Contact Us</button>
            </form>
          </div>
        </div>
        
        {/* Footer Navigation and Social Links */}
        <div className="flex flex-col md:flex-row justify-evenly items-center w-full h-2/5 md:h-1/2">
          {/* Navigation Links */}
          <ul className="space-y-2 text-center md:text-start">
            {[{ href: "/about", label: "About" }, { href: "/from-our-ceo", label: "From CEO" }, { href: "/", label: "Signature Trips" }, { href: "/", label: "Trek Adventures" }].map((link, index) => (
              <li key={index}>
                <a className="relative group cursor-pointer" href={link.href}>{link.label}<div className="h-[1px] w-0 bg-white absolute top-[110%] left-0 group-hover:w-full duration-200"></div></a>
              </li>
            ))}
          </ul>

          
          {/* New Column - Contact, Terms, Privacy, Disclaimer */}
          <ul className="space-y-2 text-center md:text-start">
            <li><a href="/contact">Contact</a></li>
            <li><a href="/terms">Terms</a></li>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/disclaimer">Disclaimer</a></li>
          </ul>
  
          {/* Contact Info */}
          <ul className="space-y-2 text-center md:text-start">
            <li><a href="tel:0000000000"><i className="fa-solid fa-mobile-screen-button"></i>&nbsp;&nbsp;+0000000000</a></li>
            <li><a href="/"><i className="fa-sharp fa-solid fa-location-dot"></i>&nbsp;&nbsp; XYZ, Indore, M.P.</a></li>
            <li><a href="mailto:marketing@gofoottravels.in"><i className="fa-solid fa-envelope"></i>&nbsp;&nbsp; example@manasvitech.in</a></li>
          </ul>
  
  
          {/* Social Media Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-blue mb-2">Follow us on</h3>
            <ul className="flex space-x-5 text-2xl">
              <li><a href="" target="_blank"><i className="fa-brands fa-twitter text-sky-500"></i></a></li>
              <li><a href="" target="_blank"><i className="fa-brands fa-facebook text-blue-600"></i></a></li>
              <li><a href="" target="_blank"><i className="fa-brands fa-instagram text-pink-600"></i></a></li>
              <li><a href="" target="_blank"><i className="fa-brands fa-whatsapp text-green-500"></i></a></li>
            </ul>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;