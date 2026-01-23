import { useState } from "react";
import { 
  Shield, Lock, Eye, Database, UserCheck, Mail, 
  FileText, AlertCircle, CheckCircle, Globe, 
  Smartphone, Cookie, Share2, Trash2, Download,
  Calendar, ChevronRight, Info
} from "lucide-react";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "collection", label: "Data Collection", icon: Database },
    { id: "usage", label: "How We Use Data", icon: UserCheck },
    { id: "sharing", label: "Data Sharing", icon: Share2 },
    { id: "security", label: "Security", icon: Lock },
    { id: "rights", label: "Your Rights", icon: Shield },
    { id: "cookies", label: "Cookies", icon: Cookie },
    { id: "contact", label: "Contact Us", icon: Mail }
  ];

  const dataCollection = [
    {
      title: "Personal Information",
      icon: UserCheck,
      items: [
        "Full name and date of birth",
        "Email address and phone number",
        "Profile photographs and videos",
        "Club affiliations and playing history",
        "Physical attributes (height, weight)"
      ]
    },
    {
      title: "Performance Data",
      icon: Database,
      items: [
        "Match statistics and performance metrics",
        "Training session data",
        "Video footage of matches and training",
        "Coach assessments and feedback",
        "Progress tracking information"
      ]
    },
    {
      title: "Technical Information",
      icon: Smartphone,
      items: [
        "IP address and browser type",
        "Device information",
        "Usage patterns and preferences",
        "Cookies and similar technologies",
        "Location data (if permitted)"
      ]
    }
  ];

  const dataUsage = [
    {
      title: "Platform Services",
      description: "To provide and maintain our goalkeeper development platform",
      examples: ["Profile management", "Statistics tracking", "Match analysis", "Communication"]
    },
    {
      title: "Talent Development",
      description: "To support goalkeeper development and career advancement",
      examples: ["Performance analytics", "Training recommendations", "Scout connections", "Career opportunities"]
    },
    {
      title: "Community Building",
      description: "To foster a supportive goalkeeper community",
      examples: ["Networking events", "Mentorship programs", "Success stories", "Community updates"]
    },
    {
      title: "Platform Improvement",
      description: "To enhance user experience and platform functionality",
      examples: ["Feature development", "Bug fixes", "User research", "Analytics"]
    }
  ];

  const yourRights = [
    {
      icon: Eye,
      title: "Access Your Data",
      description: "Request a copy of all personal data we hold about you"
    },
    {
      icon: FileText,
      title: "Rectification",
      description: "Correct any inaccurate or incomplete information"
    },
    {
      icon: Trash2,
      title: "Deletion",
      description: "Request deletion of your personal data (subject to legal obligations)"
    },
    {
      icon: Download,
      title: "Data Portability",
      description: "Receive your data in a structured, commonly used format"
    },
    {
      icon: AlertCircle,
      title: "Object to Processing",
      description: "Object to certain types of data processing"
    },
    {
      icon: Lock,
      title: "Restrict Processing",
      description: "Request that we limit how we use your data"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-orange-500/20">
        <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 via-slate-950 to-red-600/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsIDEyNywgMCwgMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
              <Shield className="text-orange-500" size={20} />
              <span className="text-orange-400 text-sm font-bold">Privacy & Security</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black leading-tight">
              <span className="text-white">Privacy Policy</span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Your privacy and data security are fundamental to everything we do at Goalkeepers Alliance Kenya. 
              This policy explains how we collect, use, and protect your information.
            </p>

            <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
              <Calendar size={16} />
              <span>Last Updated: January 23, 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-lg border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? "bg-linear-to-r from-orange-500 to-red-500 text-white"
                    : "text-gray-400 hover:text-white hover:bg-slate-900/50"
                }`}
              >
                <section.icon size={16} />
                <span className="text-sm">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Overview */}
          {activeSection === "overview" && (
            <div className="space-y-8">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl">
                    <Eye className="text-white" size={28} />
                  </div>
                  <h2 className="text-3xl font-black text-white">Overview</h2>
                </div>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Welcome to Goalkeepers Alliance Kenya. We are committed to protecting your personal information 
                    and your right to privacy. This Privacy Policy describes how we collect, use, store, and share 
                    your information when you use our platform.
                  </p>
                  
                  <p>
                    By using our services, you agree to the collection and use of information in accordance with 
                    this policy. If you do not agree with our policies and practices, please do not use our platform.
                  </p>

                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <Info className="text-orange-500 mt-1" size={20} />
                      <div>
                        <h4 className="text-orange-400 font-bold mb-1">Important Note</h4>
                        <p className="text-sm text-gray-400">
                          We are a platform dedicated to goalkeeper development in Kenya. We collect performance 
                          data to help goalkeepers improve their skills and connect with opportunities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-6">
                  <Shield className="text-orange-500 mb-3" size={32} />
                  <h3 className="text-white font-bold mb-2">Data Protection</h3>
                  <p className="text-gray-400 text-sm">We use industry-standard security measures to protect your data</p>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-6">
                  <Lock className="text-orange-500 mb-3" size={32} />
                  <h3 className="text-white font-bold mb-2">Secure Storage</h3>
                  <p className="text-gray-400 text-sm">Your information is encrypted and stored securely</p>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-orange-500/20 p-6">
                  <UserCheck className="text-orange-500 mb-3" size={32} />
                  <h3 className="text-white font-bold mb-2">Your Control</h3>
                  <p className="text-gray-400 text-sm">You have full control over your personal information</p>
                </div>
              </div>
            </div>
          )}

          {/* Data Collection */}
          {activeSection === "collection" && (
            <div className="space-y-8">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl">
                    <Database className="text-white" size={28} />
                  </div>
                  <h2 className="text-3xl font-black text-white">Information We Collect</h2>
                </div>
                
                <p className="text-gray-300 mb-6">
                  We collect various types of information to provide and improve our services to you.
                </p>

                <div className="space-y-6">
                  {dataCollection.map((category, index) => (
                    <div key={index} className="bg-slate-950/50 rounded-xl border border-orange-500/10 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <category.icon className="text-orange-500" size={24} />
                        <h3 className="text-xl font-bold text-white">{category.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-300">
                            <CheckCircle className="text-orange-500 mt-1" size={16} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Data Usage */}
          {activeSection === "usage" && (
            <div className="space-y-8">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl">
                    <UserCheck className="text-white" size={28} />
                  </div>
                  <h2 className="text-3xl font-black text-white">How We Use Your Data</h2>
                </div>
                
                <p className="text-gray-300 mb-8">
                  We use the information we collect for various purposes to provide, maintain, and improve our services.
                </p>

                <div className="space-y-6">
                  {dataUsage.map((usage, index) => (
                    <div key={index} className="bg-slate-950/50 rounded-xl border border-orange-500/10 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{usage.title}</h3>
                      <p className="text-gray-400 mb-4">{usage.description}</p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {usage.examples.map((example, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                            <ChevronRight className="text-orange-500" size={16} />
                            <span>{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Data Sharing */}
          {activeSection === "sharing" && (
            <div className="space-y-8">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl">
                    <Share2 className="text-white" size={28} />
                  </div>
                  <h2 className="text-3xl font-black text-white">Data Sharing & Disclosure</h2>
                </div>
                
                <div className="space-y-6 text-gray-300">
                  <p className="leading-relaxed">
                    We may share your information in the following circumstances:
                  </p>

                  <div className="space-y-4">
                    <div className="bg-slate-950/50 rounded-xl border border-orange-500/10 p-6">
                      <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                        <Globe className="text-orange-500" size={20} />
                        With Clubs and Scouts
                      </h3>
                      <p className="text-gray-400">
                        With your consent, we share your performance data, statistics, and profile information 
                        with clubs and scouts who are seeking goalkeeper talent.
                      </p>
                    </div>

                    <div className="bg-slate-950/50 rounded-xl border border-orange-500/10 p-6">
                      <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                        <UserCheck className="text-orange-500" size={20} />
                        Service Providers
                      </h3>
                      <p className="text-gray-400">
                        We work with third-party service providers for analytics, hosting, and communication 
                        services. These providers are bound by confidentiality agreements.
                      </p>
                    </div>

                    <div className="bg-slate-950/50 rounded-xl border border-orange-500/10 p-6">
                      <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                        <Shield className="text-orange-500" size={20} />
                        Legal Requirements
                      </h3>
                      <p className="text-gray-400">
                        We may disclose your information if required by law, court order, or governmental request, 
                        or to protect our rights and safety.
                      </p>
                    </div>

                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="text-orange-500 mt-1" size={20} />
                        <div>
                          <h4 className="text-orange-400 font-bold mb-1">We Never Sell Your Data</h4>
                          <p className="text-sm text-gray-400">
                            We do not sell your personal information to third parties for marketing purposes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === "security" && (
            <div className="space-y-8">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl">
                    <Lock className="text-white" size={28} />
                  </div>
                  <h2 className="text-3xl font-black text-white">Data Security</h2>
                </div>
                
                <div className="space-y-6 text-gray-300">
                  <p className="leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal 
                    information against unauthorized access, alteration, disclosure, or destruction.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-950/50 rounded-xl border border-orange-500/10 p-6">
                      <h3 className="text-white font-bold mb-3">Technical Measures</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-orange-500 mt-1" size={16} />
                          <span>SSL/TLS encryption for data transmission</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-orange-500 mt-1" size={16} />
                          <span>Encrypted data storage</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-orange-500 mt-1" size={16} />
                          <span>Regular security audits</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-orange-500 mt-1" size={16} />
                          <span>Secure authentication protocols</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-slate-950/50 rounded-xl border border-orange-500/10 p-6">
                      <h3 className="text-white font-bold mb-3">Organizational Measures</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-orange-500 mt-1" size={16} />
                          <span>Access controls and permissions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-orange-500 mt-1" size={16} />
                          <span>Staff training on data protection</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-orange-500 mt-1" size={16} />
                          <span>Confidentiality agreements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-orange-500 mt-1" size={16} />
                          <span>Incident response procedures</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Info className="text-orange-500 mt-1" size={20} />
                      <div>
                        <h4 className="text-orange-400 font-bold mb-1">Important Reminder</h4>
                        <p className="text-sm text-gray-400">
                          While we strive to protect your personal information, no method of transmission over 
                          the internet is 100% secure. Please use strong passwords and keep your login credentials confidential.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Your Rights */}
          {activeSection === "rights" && (
            <div className="space-y-8">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl">
                    <Shield className="text-white" size={28} />
                  </div>
                  <h2 className="text-3xl font-black text-white">Your Privacy Rights</h2>
                </div>
                
                <p className="text-gray-300 mb-8">
                  You have certain rights regarding your personal information. Here's what you can do:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {yourRights.map((right, index) => (
                    <div key={index} className="bg-slate-950/50 rounded-xl border border-orange-500/10 p-6 hover:border-orange-500/30 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                          <right.icon className="text-orange-500" size={24} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold mb-2">{right.title}</h3>
                          <p className="text-gray-400 text-sm">{right.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-slate-950/50 rounded-xl border border-orange-500/10 p-6">
                  <h3 className="text-white font-bold mb-4">How to Exercise Your Rights</h3>
                  <p className="text-gray-300 mb-4">
                    To exercise any of these rights, please contact us at privacy@goalkeepersalliance.org. 
                    We will respond to your request within 30 days.
                  </p>
                  <button className="px-6 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/50 transition-all">
                    Contact Privacy Team
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cookies */}
          {activeSection === "cookies" && (
            <div className="space-y-8">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl">
                    <Cookie className="text-white" size={28} />
                  </div>
                  <h2 className="text-3xl font-black text-white">Cookies & Tracking</h2>
                </div>
                
                <div className="space-y-6 text-gray-300">
                  <p className="leading-relaxed">
                    We use cookies and similar tracking technologies to track activity on our platform and 
                    store certain information to improve your experience.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-slate-950/50 rounded-xl border border-orange-500/10 p-6">
                      <h3 className="text-white font-bold mb-3">Essential Cookies</h3>
                      <p className="text-gray-400 text-sm">
                        Required for the platform to function properly. These cannot be disabled.
                      </p>
                    </div>

                    <div className="bg-slate-950/50 rounded-xl border border-orange-500/10 p-6">
                      <h3 className="text-white font-bold mb-3">Analytics Cookies</h3>
                      <p className="text-gray-400 text-sm">
                        Help us understand how users interact with our platform to improve functionality.
                      </p>
                    </div>

                    <div className="bg-slate-950/50 rounded-xl border border-orange-500/10 p-6">
                      <h3 className="text-white font-bold mb-3">Preference Cookies</h3>
                      <p className="text-gray-400 text-sm">
                        Remember your settings and preferences for a personalized experience.
                      </p>
                    </div>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Info className="text-orange-500 mt-1" size={20} />
                      <div>
                        <h4 className="text-orange-400 font-bold mb-1">Cookie Management</h4>
                        <p className="text-sm text-gray-400">
                          You can control and manage cookies through your browser settings. However, disabling 
                          cookies may affect platform functionality.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact */}
          {activeSection === "contact" && (
            <div className="space-y-8">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-linear-to-r from-orange-500 to-red-500 rounded-xl">
                    <Mail className="text-white" size={28} />
                  </div>
                  <h2 className="text-3xl font-black text-white">Contact Us</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-950/50 rounded-xl border border-orange-500/10 p-6">
                      <Mail className="text-orange-500 mb-4" size={32} />
                      <h3 className="text-white font-bold mb-2">Email</h3>
                      <p className="text-gray-400">privacy@goalkeepersalliance.org</p>
                    </div>

                    <div className="bg-slate-950/50 rounded-xl border border-orange-500/10 p-6">
                      <Globe className="text-orange-500 mb-4" size={32} />
                      <h3 className="text-white font-bold mb-2">Location</h3>
                      <p className="text-gray-400">Nairobi, Kenya</p>
                    </div>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                    <h3 className="text-white font-bold mb-4">Policy Updates</h3>
                    <p className="text-gray-300 mb-4">
                      We may update this Privacy Policy from time to time. We will notify you of any changes 
                      by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                    </p>
                    <p className="text-gray-400 text-sm">
                      We encourage you to review this Privacy Policy periodically for any changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-16 border-t border-orange-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="mx-auto text-orange-500 mb-6" size={48} />
          <h2 className="text-3xl font-black text-white mb-4">
            Your Privacy Matters
          </h2>
          <p className="text-gray-400 mb-8">
            Questions about how we handle your data? We're here to help.
          </p>
          <button className="px-8 py-4 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/50 transition-all">
            Contact Privacy Team
          </button>
        </div>
      </section>
    </div>
  );
}