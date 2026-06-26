import React from 'react'
import { Sparkles, ExternalLink } from 'lucide-react'
import AVImg from '../assets/AV.jpeg'
import DMImg from '../assets/DM.jpeg'
import ANImg from '../assets/AN.png'
import AAImg from '../assets/AA.jpeg'

export const Team: React.FC = () => {
  const founders = [
    {
      name: 'Arjun Mehta',
      designation: 'Founder & CEO',
      bio: 'Former litigation associate at a Tier-1 Delhi law firm, Arjun witnessed firsthand how Indian lawyers spent hours on legal research that should take minutes. He combined his legal training with a passion for AI systems to build IndyLaw from the ground up.',
      tags: ['Litigation Strategy', 'Indian Jurisprudence', 'Product Vision', 'Legal AI'],
      linkedin: '#',
      image: AVImg,
      color: '#0B132B'
    },
    {
      name: 'Priya Nair',
      designation: 'Co-Founder & CTO',
      bio: 'Priya brings deep ML research experience from IIT Bombay and enterprise SaaS engineering from her years at a leading legal tech company. She architected IndyLaw\'s RAG pipeline and the secure multi-tenant indexing infrastructure.',
      tags: ['RAG Systems', 'ML Infrastructure', 'LLM Grounding', 'Cloud Security'],
      linkedin: '#',
      image: DMImg,
      color: '#AA820A'
    }
  ]

  const teamMembers = [
    {
      name: 'Rohan Verma',
      role: 'Lead Backend Engineer',
      skills: ['Node.js', 'PostgreSQL', 'Vector DBs', 'AWS'],
      linkedin: '#',
      initials: 'RV'
    },
    {
      name: 'Sneha Kulkarni',
      role: 'AI/ML Researcher',
      skills: ['LLM Fine-tuning', 'Embedding Models', 'Legal NLP', 'Python'],
      linkedin: '#',
      initials: 'SK'
    },
    {
      name: 'Karan Desai',
      role: 'Frontend Engineer',
      skills: ['React', 'TypeScript', 'Framer Motion', 'TailwindCSS'],
      linkedin: '#',
      initials: 'KD'
    },
    {
      name: 'AN (Software Engineer)',
      role: 'Software Engineer',
      skills: ['JavaScript', 'React', 'Node.js'],
      linkedin: '#',
      image: ANImg
    },
    {
      name: 'AA (Finance Analyst)',
      role: 'Finance Analyst',
      skills: ['Financial Modeling', 'Budgeting', 'Analytics'],
      linkedin: '#',
      image: AAImg
    },
    {
      name: 'Ananya Iyer',
      role: 'Legal Research Analyst',
      skills: ['Indian Case Law', 'NCLT Research', 'RBI Compliance', 'Litigation Support'],
      linkedin: '#',
      initials: 'AI'
    },
    {
      name: 'Vikram Sharma',
      role: 'Product Designer',
      skills: ['UI/UX Design', 'Figma', 'Design Systems', 'User Research'],
      linkedin: '#',
      initials: 'VS'
    },
    {
      name: 'Deepa Rao',
      role: 'Customer Success Lead',
      skills: ['Legal Onboarding', 'Enterprise Sales', 'SaaS Support', 'Client Relations'],
      linkedin: '#',
      initials: 'DR'
    }
  ]

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#111827] font-sans selection:bg-[#D4AF37]/30 selection:text-[#0B132B]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden bg-[#0B132B] text-white border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 bg-grid-dots opacity-[0.03] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> The People Behind IndyLaw
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Meet Our Team
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF9F6]/80 max-w-lg mx-auto">
            Lawyers, engineers, and researchers united by a single mission — modernizing how India practices law.
          </p>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Leadership</h2>
          <h3 className="text-3xl font-serif font-bold text-[#0B132B]">Our Founders</h3>
          <p className="text-xs sm:text-sm text-[#4B5563] max-w-xl mx-auto">
            Built by practitioners who understand the real pain of Indian legal workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="bg-white border border-[#0B132B]/10 hover:border-[#D4AF37]/40 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-6 group"
            >
              {/* Profile Top */}
              <div className="flex items-start gap-5">
                {/* Avatar */}
                {founder.image ? (
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-16 h-16 rounded-2xl object-cover shadow-md"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-xl flex-shrink-0 shadow-md"
                    style={{ backgroundColor: founder.color }}
                  >
                    {founder.initials}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-[#0B132B] font-serif">{founder.name}</h4>
                  <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mt-0.5">
                    {founder.designation}
                  </p>
                  <a
                    href={founder.linkedin}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#0B132B]/50 hover:text-[#D4AF37] mt-1.5 transition-colors"
                    aria-label={`${founder.name} LinkedIn`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-[#4B5563] leading-relaxed border-t border-[#0B132B]/5 pt-5">
                {founder.bio}
              </p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {founder.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-bold text-[#0B132B] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2.5 py-1 rounded-full uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Members Section */}
      <section className="bg-white border-t border-[#0B132B]/5 py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">The Crew</h2>
            <h3 className="text-3xl font-serif font-bold text-[#0B132B]">Our Team</h3>
            <p className="text-xs sm:text-sm text-[#4B5563] max-w-xl mx-auto">
              A cross-functional group of specialists working every day to make IndyLaw better.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-[#FAF9F6] border border-[#0B132B]/5 hover:border-[#D4AF37]/40 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-[#0B132B] text-[#D4AF37] flex items-center justify-center font-bold text-sm font-serif flex-shrink-0">
                      {member.initials}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-[#0B132B]">{member.name}</h4>
                    <p className="text-[10px] font-semibold text-[#AA820A] mt-0.5">{member.role}</p>
                    <a
                      href={member.linkedin}
                      className="inline-flex items-center gap-1 text-[9px] font-bold text-[#0B132B]/40 hover:text-[#D4AF37] mt-0.5 transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <ExternalLink className="w-2.5 h-2.5" />
                      LinkedIn
                    </a>
                  </div>
                </div>

                <hr className="border-[#0B132B]/5" />

                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] font-bold text-[#0B132B] bg-[#0B132B]/5 px-2 py-0.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
