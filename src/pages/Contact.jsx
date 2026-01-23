import { useState } from "react";
import { Phone, Mail, MapPin, Send, Clock, Users, Shield, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+254 756 254 693",
      href: "tel:+254756254693",
      description: "Mon-Fri, 8am-6pm EAT"
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@goalkeepersalliance.org",
      href: "mailto:info@goalkeepersalliance.org",
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kaloleni, Nairobi",
      href: "https://maps.google.com/?q=Kaloleni+Nairobi+Jogoo+Road",
      description: "Along Jogoo Road"
    }
  ];

  const quickLinks = [
    { icon: Users, title: "Join Our Network", description: "Connect with fellow goalkeepers" },
    { icon: Shield, title: "Training Programs", description: "Enhance your skills with us" },
    { icon: Clock, title: "Schedule a Visit", description: "Come see our facilities" }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-orange-500/20">
        <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 via-slate-950 to-red-600/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsIDEyNywgMCwgMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
              <Send className="text-orange-500" size={16} />
              <span className="text-orange-400 text-sm font-bold">Get In Touch</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-white">
              Contact
              <br />
              <span className="bg-linear-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                Goalkeepers Alliance
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-12 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                target={info.icon === MapPin ? "_blank" : undefined}
                rel={info.icon === MapPin ? "noopener noreferrer" : undefined}
                className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:scale-105 p-8"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-linear-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center">
                    <info.icon className="text-orange-400" size={28} />
                  </div>
                  
                  <div>
                    <h3 className="text-gray-400 text-sm font-semibold mb-2">{info.label}</h3>
                    <p className="text-white text-xl font-black mb-1">{info.value}</p>
                    <p className="text-gray-500 text-sm">{info.description}</p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-black text-white mb-3">Send Us a Message</h2>
                <p className="text-gray-400">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              {submitted ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
                  <CheckCircle className="mx-auto text-green-400 mb-4" size={48} />
                  <h3 className="text-2xl font-black text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">Thank you for contacting us. We'll respond within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm font-semibold mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-900/50 border border-orange-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm font-semibold mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-900/50 border border-orange-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm font-semibold mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-orange-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                        placeholder="+254 700 000 000"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm font-semibold mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-900/50 border border-orange-500/20 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="membership">Membership</option>
                        <option value="training">Training Programs</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-orange-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 bg-linear-to-r from-orange-500 to-red-500 rounded-xl text-white font-black text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 overflow-hidden">
                <div className="aspect-video bg-slate-800 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.234567890123!2d36.85!3d-1.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnNDguMCJTIDM2wrA1MScwMC4wIkU!5e0!3m2!1sen!2ske!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-orange-400 shrink-0 mt-1" size={20} />
                    <div>
                      <h3 className="text-white font-black mb-1">Visit Our Office</h3>
                      <p className="text-gray-400 text-sm">Kaloleni, Nairobi</p>
                      <p className="text-gray-400 text-sm">Along Jogoo Road</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white mb-4">Quick Actions</h3>
                {quickLinks.map((link, index) => (
                  <div
                    key={index}
                    className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-linear-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                        <link.icon className="text-orange-400" size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-black mb-1">{link.title}</h4>
                        <p className="text-gray-400 text-sm">{link.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Hours */}
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-orange-400" size={24} />
                  <h3 className="text-xl font-black text-white">Office Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span className="text-white font-bold">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Saturday</span>
                    <span className="text-white font-bold">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-orange-400 font-bold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}