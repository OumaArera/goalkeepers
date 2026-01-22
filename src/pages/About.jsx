import { useState } from "react";
import { 
  Shield, Target, Users, TrendingUp, Award, Zap, 
  Heart, Globe, BookOpen, Video, ChevronRight, 
  BarChart3, Star, CheckCircle, ArrowRight, Trophy,
  Activity, Sparkles, Lightbulb, Eye, MessageCircle
} from "lucide-react";

export default function AboutAllianceKenya() {
  const [activeTab, setActiveTab] = useState("mission");

  const stats = [
    { icon: Users, value: "500+", label: "Goalkeepers", color: "from-orange-500 to-red-500" },
    { icon: Shield, value: "50+", label: "Partner Clubs", color: "from-blue-500 to-cyan-500" },
    { icon: Award, value: "1000+", label: "Training Sessions", color: "from-green-500 to-emerald-500" },
    { icon: TrendingUp, value: "95%", label: "Success Rate", color: "from-purple-500 to-pink-500" }
  ];

  const pillars = [
    {
      icon: Target,
      title: "Elite Training",
      description: "World-class goalkeeper training programs designed by international coaches, focusing on technique, positioning, and mental strength.",
      features: ["Technical drills", "Tactical positioning", "Shot-stopping mastery", "Distribution skills"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Advanced performance tracking and analytics to measure progress, identify strengths, and pinpoint areas for improvement.",
      features: ["Match analysis", "Performance metrics", "Progress tracking", "Video breakdowns"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Global Exposure",
      description: "Connecting Kenyan goalkeepers with international opportunities, scouts, and professional clubs worldwide.",
      features: ["Scout network", "Trial opportunities", "International partnerships", "Career guidance"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Heart,
      title: "Community Support",
      description: "A tight-knit community of goalkeepers supporting each other, sharing experiences, and growing together.",
      features: ["Mentorship programs", "Peer learning", "Mental health support", "Networking events"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Founded by passionate goalkeepers who saw the need for specialized training in Kenya",
      icon: Sparkles
    },
    {
      year: "2021",
      title: "First Academy",
      description: "Launched our first goalkeeper academy in Nairobi with 50 aspiring shot-stoppers",
      icon: Shield
    },
    {
      year: "2022",
      title: "National Recognition",
      description: "Partnered with Kenya Premier League clubs and gained FKF recognition",
      icon: Trophy
    },
    {
      year: "2023",
      title: "Digital Platform",
      description: "Launched our comprehensive digital platform for stats tracking and scouting",
      icon: Activity
    },
    {
      year: "2024",
      title: "International Partnerships",
      description: "Established partnerships with European clubs and goalkeeper academies",
      icon: Globe
    },
    {
      year: "2025",
      title: "Expanding Horizons",
      description: "Growing our network across East Africa and placing goalkeepers in professional clubs",
      icon: Star
    }
  ];

  const testimonials = [
    {
      name: "David Ochieng",
      role: "Professional Goalkeeper - Gor Mahia",
      image: "https://via.placeholder.com/100x100?text=DO",
      quote: "The Alliance transformed my career. Their training programs and analytics helped me understand my game at a deeper level. Now I'm playing in the Premier League.",
      rating: 5
    },
    {
      name: "Sarah Wanjiku",
      role: "U19 National Team Goalkeeper",
      image: "https://via.placeholder.com/100x100?text=SW",
      quote: "As a young female goalkeeper, finding proper training was difficult. The Alliance gave me the platform, support, and opportunities I needed to shine.",
      rating: 5
    },
    {
      name: "Michael Otieno",
      role: "Goalkeeper Coach - Tusker FC",
      image: "https://via.placeholder.com/100x100?text=MO",
      quote: "The level of professionalism and dedication to developing goalkeepers is unmatched. They're raising the standard of goalkeeping in Kenya.",
      rating: 5
    }
  ];

  const programs = [
    {
      title: "Youth Development",
      age: "8-16 years",
      icon: Users,
      features: ["Basic techniques", "Fun training", "Character building", "School partnerships"],
      color: "orange"
    },
    {
      title: "Elite Academy",
      age: "17-23 years",
      icon: Target,
      features: ["Advanced training", "Match experience", "Scout exposure", "Career planning"],
      color: "blue"
    },
    {
      title: "Professional Support",
      age: "24+ years",
      icon: Trophy,
      features: ["Performance analysis", "Injury prevention", "Mental coaching", "Contract advice"],
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-orange-500/20">
        <div className="absolute inset-0 bg-linear-to-br from-orange-600/20 via-slate-950 to-red-600/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsIDEyNywgMCwgMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
              <Shield className="text-orange-500" size={20} />
              <span className="text-orange-400 text-sm font-bold">Goalkeepers Alliance Kenya</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="text-white">Elevating</span>
              <br />
              <span className="bg-linear-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                Goalkeeping Excellence
              </span>
              <br />
              <span className="text-white">in Kenya</span>
            </h1>
            
            <p className="text-gray-400 text-xl leading-relaxed max-w-3xl mx-auto">
              We're on a mission to revolutionize goalkeeper development in Kenya through elite training, 
              data-driven insights, and global opportunities. Join the movement.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="group px-8 py-4 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl font-black hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <span>Join the Alliance</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold border border-orange-500/20 hover:border-orange-500/50 transition-all">
                Watch Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all hover:scale-105"
              >
                <div className={`inline-flex p-3 bg-linear-to-r ${stat.color} rounded-xl mb-4`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className="text-4xl font-black bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Tabs */}
      <section className="relative py-16 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4 mb-12">
            {["mission", "vision", "values"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${
                  activeTab === tab
                    ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "bg-slate-900/50 text-gray-400 hover:text-white border border-orange-500/20"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-orange-500/20 p-8 lg:p-12">
            {activeTab === "mission" && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-linear-to-r from-orange-500 to-red-500 rounded-2xl">
                    <Target className="text-white" size={40} />
                  </div>
                  <h2 className="text-4xl font-black text-white">Our Mission</h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To identify, nurture, and elevate goalkeeping talent across Kenya by providing world-class training, 
                  comprehensive performance analytics, and pathways to professional football. We believe every goalkeeper 
                  deserves the opportunity to reach their full potential, regardless of their background.
                </p>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl">
                    <Eye className="text-white" size={40} />
                  </div>
                  <h2 className="text-4xl font-black text-white">Our Vision</h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To establish Kenya as a recognized hub for exceptional goalkeeper development in Africa and beyond. 
                  We envision a future where Kenyan goalkeepers are competing at the highest levels of world football, 
                  representing their nation with pride and inspiring the next generation.
                </p>
              </div>
            )}

            {activeTab === "values" && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-linear-to-r from-green-500 to-emerald-500 rounded-2xl">
                    <Heart className="text-white" size={40} />
                  </div>
                  <h2 className="text-4xl font-black text-white">Our Values</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Excellence", desc: "Pursuing the highest standards in everything we do" },
                    { title: "Integrity", desc: "Operating with honesty, transparency, and fairness" },
                    { title: "Community", desc: "Building a supportive network of goalkeepers" },
                    { title: "Innovation", desc: "Embracing new methods and technologies" },
                    { title: "Dedication", desc: "Committed to long-term development and growth" },
                    { title: "Passion", desc: "Driven by love for the beautiful game" }
                  ].map((value, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-slate-950/50 rounded-xl">
                      <CheckCircle className="text-orange-500 mt-1" size={20} />
                      <div>
                        <h4 className="text-white font-bold mb-1">{value.title}</h4>
                        <p className="text-gray-400 text-sm">{value.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="relative py-16 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Our Four Pillars
            </h2>
            <p className="text-gray-400 text-lg">The foundation of our goalkeeper development ecosystem</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="group bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-orange-500/20 p-8 hover:border-orange-500/50 transition-all hover:scale-105"
              >
                <div className={`inline-flex p-4 bg-linear-to-r ${pillar.color} rounded-2xl mb-6 shadow-lg`}>
                  <pillar.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{pillar.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{pillar.description}</p>
                <ul className="space-y-3">
                  {pillar.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="text-orange-500" size={16} />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="relative py-16 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Our Programs
            </h2>
            <p className="text-gray-400 text-lg">Tailored development pathways for every stage</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all"
              >
                <div className={`inline-flex p-3 bg-${program.color}-500 rounded-xl mb-4`}>
                  <program.icon className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{program.title}</h3>
                <div className="text-orange-400 font-bold text-sm mb-4">{program.age}</div>
                <ul className="space-y-2">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-400">
                      <ArrowRight className="text-orange-500" size={14} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-16 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Our Journey
            </h2>
            <p className="text-gray-400 text-lg">From humble beginnings to national impact</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-orange-500 to-red-500 hidden md:block"></div>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex gap-8 items-start">
                  <div className="hidden md:flex items-center justify-center w-16 h-16 bg-linear-to-r from-orange-500 to-red-500 rounded-full border-4 border-slate-950 shrink-0">
                    <item.icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="md:hidden p-2 bg-linear-to-r from-orange-500 to-red-500 rounded-lg">
                        <item.icon className="text-white" size={20} />
                      </div>
                      <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 font-black text-sm">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-16 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Success Stories
            </h2>
            <p className="text-gray-400 text-lg">Hear from goalkeepers who've transformed their careers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-2 border-orange-500"
                  />
                  <div>
                    <h4 className="text-white font-black">{testimonial.name}</h4>
                    <p className="text-orange-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-orange-500 fill-orange-500" size={16} />
                  ))}
                </div>
                <p className="text-gray-400 italic leading-relaxed">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-orange-600/20 via-red-600/20 to-orange-600/20"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="mx-auto text-orange-500 mb-6" size={64} />
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Ready to Join the <br />
            <span className="bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Goalkeepers Revolution?
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're an aspiring goalkeeper, a coach, or a club looking to partner with us, 
            we'd love to hear from you.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="group px-10 py-5 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl font-black text-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3">
              <span>Join the Alliance</span>
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-slate-900 text-white rounded-xl font-bold text-lg border border-orange-500/20 hover:border-orange-500/50 transition-all flex items-center gap-3">
              <MessageCircle size={24} />
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}