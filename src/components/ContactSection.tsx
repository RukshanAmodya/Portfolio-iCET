"use client";

import React, { useState, useEffect } from "react";
import { Mail, Globe, Laptop, Send, Github, Linkedin, Twitter, Flame, Activity, Trophy, Star, GitFork, Check, Phone, PhoneCall, Loader2, AlertCircle, ChevronDown, ChevronUp, ArrowUp, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LottiePlayer from "./LottiePlayer";
import { assetUrl } from "@/lib/assets";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const greenLevels = [
  "bg-[#161b22] border-white/[0.04]", // 0
  "bg-[#0e4429] border-[#006d32]/30", // 1
  "bg-[#006d32] border-[#26a641]/40", // 2
  "bg-[#26a641] border-[#39d353]/50", // 3
  "bg-[#39d353] border-[#39d353]/80 shadow-[0_0_8px_rgba(57,211,83,0.5)]", // 4
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Live GitHub Contributions State
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalCount, setTotalCount] = useState(608);
  const [longestStreak, setLongestStreak] = useState(5);
  const [currentStreak, setCurrentStreak] = useState(1);
  const [loading, setLoading] = useState(true);

  // Footer Expandable States for Mobile Friendliness
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllEdu, setShowAllEdu] = useState(false);

  const featuredProjects = [
    { name: "ArtimaX Flutter", url: "https://github.com/RukshanAmodya/ArtimaX-Flutter" },
    { name: "Sleep Love", url: "https://github.com/RukshanAmodya/Sleep-Love" },
    { name: "Solarjade Service", url: "https://github.com/RukshanAmodya/Solarjade-Service-App" },
    { name: "Moni Finance", url: "https://github.com/RukshanAmodya/Moni" },
  ];

  const moreProjects = [
    { name: "AP.LK Physics", url: "https://github.com/RukshanAmodya/Tutor" },
    { name: "devlk.com LMS", url: "https://github.com/RukshanAmodya/devlk.com" },
    { name: "PIRM Solar Care", url: "https://github.com/RukshanAmodya/PIRM-Solar-Care" },
    { name: "BookBoo Stories", url: "https://github.com/RukshanAmodya/BookBoo" },
    { name: "FlowBot Railway", url: "https://github.com/RukshanAmodya/FlowBot-Railway" },
    { name: "Kova Stream", url: "https://github.com/RukshanAmodya/Kova" },
    { name: "Tale Look Creator", url: "https://github.com/RukshanAmodya/Tale-Look" },
    { name: "Aethera V2", url: "https://github.com/RukshanAmodya/Aethera-V2" },
  ];

  useEffect(() => {
    // Fetch real contributions for RukshanAmodya
    fetch("https://github-contributions-api.jogruber.de/v4/RukshanAmodya?y=last")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.contributions && Array.isArray(data.contributions)) {
          const days: ContributionDay[] = data.contributions;
          setContributions(days);
          if (data.total && typeof data.total.lastYear === "number") {
            setTotalCount(data.total.lastYear);
          } else {
            setTotalCount(days.reduce((acc, d) => acc + d.count, 0));
          }

          // Calculate streaks
          let maxS = 0;
          let tempS = 0;
          let curS = 0;

          for (let i = 0; i < days.length; i++) {
            if (days[i].count > 0) {
              tempS++;
              if (tempS > maxS) maxS = tempS;
            } else {
              tempS = 0;
            }
          }

          for (let i = days.length - 1; i >= 0; i--) {
            if (days[i].count > 0) {
              curS++;
            } else {
              break;
            }
          }

          setLongestStreak(maxS > 0 ? maxS : 5);
          setCurrentStreak(curS > 0 ? curS : 1);
        }
      })
      .catch((err) => {
        console.error("Error loading GitHub contributions:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Format contributions into weeks (columns)
  const weeks: ContributionDay[][] = [];
  if (contributions.length > 0) {
    for (let i = 0; i < contributions.length; i += 7) {
      weeks.push(contributions.slice(i, i + 7));
    }
  }

  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill out your name, email, and message.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      let success = false;
      let errorMsg = null;

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            success = true;
          } else {
            errorMsg = data.error;
          }
        }
      } catch (nodeErr) {
        // Fallback for static hosting like GitHub Pages
      }

      // If local/server route wasn't available, dispatch via Cloudflare Worker Direct-SMTP
      if (!success) {
        const cfRes = await fetch("https://amodya-contact-worker.agency-digitra.workers.dev", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const cfData = await cfRes.json();
        if (cfData && cfData.success) {
          success = true;
        } else if (cfData && cfData.error) {
          errorMsg = cfData.error;
        }
      }

      if (success) {
        setSent(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => {
          setSent(false);
        }, 5000);
      } else {
        setErrorMessage(errorMsg || "Failed to send message. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage("Network error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="pt-24 pb-4 bg-black border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3.5"
          >
            <div className="w-14 h-14 shrink-0">
              <LottiePlayer src="/animations/skills.json" className="w-full h-full" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-0.5">
                GET IN TOUCH
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                Let's Work Together
              </h2>
            </div>
          </motion.div>
        </div>

        {/* Top 2-Column Grid: Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-16">
          {/* Left Column: Let's Connect & Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Let's Connect
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
                I'm always open for new opportunities, collaborations, freelance projects, or just a
                friendly conversation about tech and AI.
              </p>
            </div>

            {/* Contact Info Items */}
            <div className="space-y-3 pt-2">
              {/* Email */}
              <a
                href="mailto:nmr.amodya@gmail.com"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0e0e0e] hover:bg-[#161616] border border-white/[0.08] hover:border-white/[0.2] transition-all group max-w-md"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-300 group-hover:text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-400 font-medium">Email</p>
                  <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    nmr.amodya@gmail.com
                  </p>
                </div>
              </a>

              {/* Mobile / Phone Number & WhatsApp */}
              <a
                href="https://wa.me/94768605501"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0e0e0e] hover:bg-[#161616] border border-white/[0.08] hover:border-emerald-500/30 transition-all group max-w-md"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-400 font-medium">Direct Call / WhatsApp</p>
                  <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    +94 76 860 5501
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0e0e0e] border border-white/[0.08] max-w-md">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-300 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-400 font-medium">Location</p>
                  <p className="text-sm font-semibold text-white">Western Province, Sri Lanka</p>
                </div>
              </div>

              {/* Portfolio */}
              <a
                href="https://amodya.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0e0e0e] hover:bg-[#161616] border border-white/[0.08] hover:border-white/[0.2] transition-all group max-w-md"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-300 group-hover:text-white shrink-0">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-400 font-medium">Portfolio</p>
                  <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    amodya.dev
                  </p>
                </div>
              </a>
            </div>

            {/* Social Buttons Row */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/RukshanAmodya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#0e0e0e] hover:bg-neutral-800 border border-white/[0.08] hover:border-sky-500/50 flex items-center justify-center text-neutral-300 hover:text-sky-400 transition-all hover:scale-105 shadow-md"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/RukshanAmodya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#0e0e0e] hover:bg-neutral-800 border border-white/[0.08] hover:border-white/30 flex items-center justify-center text-neutral-300 hover:text-white transition-all hover:scale-105 shadow-md"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#0e0e0e] hover:bg-neutral-800 border border-white/[0.08] hover:border-blue-500/50 flex items-center justify-center text-neutral-300 hover:text-blue-400 transition-all hover:scale-105 shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#0e0e0e] hover:bg-neutral-800 border border-white/[0.08] hover:border-white/30 flex items-center justify-center text-neutral-300 hover:text-white transition-all hover:scale-105 shadow-md"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form with Floating Dino */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Floating Greeting Mascot on top-right of form */}
            <div className="absolute -top-12 right-2 sm:right-6 w-20 h-20 pointer-events-none z-10 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">
              <LottiePlayer src="/animations/welcome.json" className="w-full h-full" />
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-[#0b0b0b]/95 border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.6)] space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#121212] border border-neutral-800/90 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#121212] border border-neutral-800/90 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Mobile / Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+94 7X XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#121212] border border-neutral-800/90 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your project, idea, or inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#121212] border border-neutral-800/90 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors resize-none"
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {sent && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Thank you! Your message has been sent successfully. I will get back to you soon.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-all hover:scale-[1.01] active:scale-[0.99] text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Sending message...</span>
                  </>
                ) : sent ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Card: Real Live GitHub Activity & Stats for RukshanAmodya */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0b0b0b]/95 border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.6)] mb-20"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-white shrink-0">
                <Github className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-neutral-400">Open source</p>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  GitHub Activity
                </h3>
              </div>
            </div>

            <a
              href="https://github.com/RukshanAmodya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors bg-white/[0.05] hover:bg-white/[0.1] px-3 py-1.5 rounded-full border border-white/5"
            >
              @RukshanAmodya
            </a>
          </div>

          {/* Grid of Heatmap + Sidebar Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8 items-start">
            {/* Heatmap Section */}
            <div className="overflow-x-auto pb-3">
              {/* Months Row */}
              <div className="flex justify-between text-[11px] text-neutral-400 mb-2 px-1 min-w-[580px]">
                {months.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>

              {/* Real Contributions Heatmap Grid */}
              <div className="flex gap-[3.5px] min-w-[580px] p-2 bg-black/40 rounded-xl border border-white/[0.03]">
                {weeks.length > 0 ? (
                  weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3.5px]">
                      {week.map((day, dIdx) => (
                        <div
                          key={`${wIdx}-${dIdx}`}
                          title={`${day.date}: ${day.count} contributions`}
                          className={`w-2.5 h-2.5 rounded-[2px] border ${greenLevels[day.level] || greenLevels[0]} transition-all duration-200 hover:scale-125 cursor-pointer`}
                        />
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="w-full py-8 text-center text-xs text-neutral-500 animate-pulse">
                    Loading GitHub contributions...
                  </div>
                )}
              </div>

              {/* Heatmap Footer */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-3 px-1 min-w-[580px]">
                <span>{totalCount} contributions in the last year</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="flex gap-1 items-center">
                    {greenLevels.map((lvl, idx) => (
                      <div
                        key={idx}
                        className={`w-2.5 h-2.5 rounded-[2px] border ${lvl}`}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Sidebar Stats & Top Repo */}
            <div className="space-y-4">
              {/* Stats Block */}
              <div className="bg-[#121212] border border-white/[0.06] rounded-xl p-4 space-y-3">
                {/* Total Contributions */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-300">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white leading-tight">{totalCount}</p>
                    <p className="text-[10px] text-neutral-400">Total contributions</p>
                  </div>
                </div>

                {/* Current Streak */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-300">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white leading-tight">{currentStreak}</p>
                    <p className="text-[10px] text-neutral-400">Current streak</p>
                  </div>
                </div>

                {/* Longest Streak */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-300">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white leading-tight">{longestStreak}</p>
                    <p className="text-[10px] text-neutral-400">Longest streak</p>
                  </div>
                </div>
              </div>

              {/* Top Repo Card */}
              <a
                href="https://github.com/RukshanAmodya/Aethera-V2"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#121212] hover:bg-[#181818] border border-white/[0.06] hover:border-white/[0.15] rounded-xl p-4 transition-all group"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                  TOP REPO
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                  Aethera-V2
                </h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2 mb-3">
                  Modern scalable open-source application and tools.
                </p>
                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" /> 1
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" /> 0
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-medium text-neutral-300">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    TypeScript
                  </span>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Resend-Inspired Huge 3D Metallic Watermark */}
        <div className="relative w-full overflow-hidden select-none pointer-events-none mt-16 sm:mt-24 pt-6 pb-2 text-center">
          {/* Subtle Ambient Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 sm:h-32 bg-white/[0.03] blur-3xl rounded-full pointer-events-none" />

          {/* Giant Metallic Embossed Wordmark */}
          <h1 className="font-black text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[13rem] tracking-tight leading-none uppercase select-none transition-all duration-700 bg-gradient-to-b from-white/40 via-neutral-400/20 to-neutral-900/10 bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] border-b border-transparent">
            Rukshan
          </h1>
        </div>

        {/* Multi-Column Modern Responsive Footer */}
        <div className="pt-10 pb-8 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 text-left">
            {/* Column 1: Info, Status Badge & Socials */}
            <div className="space-y-4 lg:col-span-4 pr-0 lg:pr-6">
              <Link href="#home" className="inline-flex items-center gap-2.5">
                <img
                  src={assetUrl("/logo.webp")}
                  alt="Rukshan"
                  className="w-7 h-7 object-contain rounded-full ring-1 ring-white/10"
                />
                <span className="font-bold text-white text-lg tracking-tight">amodya.dev</span>
              </Link>

              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                Full-Stack Software Engineer & AI Systems Developer crafting next-generation web & mobile applications.
              </p>

              {/* Contact info snippets */}
              <div className="space-y-1 text-xs text-neutral-400 pt-1">
                <p className="flex items-center gap-2">
                  <span className="text-neutral-500">📍</span> Western Province, Sri Lanka
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-neutral-500">✉️</span> nmr.amodya@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-neutral-500">📞</span> +94 76 860 5501
                </p>
              </div>

              {/* "All systems normal" Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-neutral-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>All systems normal • Available for work</span>
              </div>

              {/* Social Links Minimal Icons */}
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href="https://github.com/RukshanAmodya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-all hover:scale-105"
                  aria-label="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://t.me/RukshanAmodya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-sky-400 transition-all hover:scale-105"
                  aria-label="Telegram"
                >
                  <Send className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://wa.me/94768605501"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-emerald-400 transition-all hover:scale-105"
                  aria-label="WhatsApp"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-blue-400 transition-all hover:scale-105"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-all hover:scale-105"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Links Subgrid: 2 columns on mobile/tablet, Spans 8 cols on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:col-span-8 gap-6 sm:gap-8">
              {/* Column 1: Projects with See More Toggle */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                  <span>Projects</span>
                  <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                    12
                  </span>
                </h4>
                <ul className="space-y-2 text-xs text-neutral-400">
                  {featuredProjects.map((p) => (
                    <li key={p.name}>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors inline-block hover:translate-x-0.5 transition-transform"
                      >
                        {p.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Animated Expandable Projects */}
                <AnimatePresence>
                  {showAllProjects && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-2 text-xs text-neutral-400 pt-2 overflow-hidden"
                    >
                      {moreProjects.map((p) => (
                        <li key={p.name}>
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors inline-block hover:translate-x-0.5 transition-transform"
                          >
                            {p.name}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="mt-3 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors py-1 cursor-pointer"
                >
                  <span>{showAllProjects ? "Show less" : `+ ${moreProjects.length} more`}</span>
                  {showAllProjects ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>
              </div>

              {/* Column 2: Ventures & Edu */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                  Ventures & Edu
                </h4>
                <ul className="space-y-2.5 text-xs text-neutral-400">
                  <li>
                    <span className="text-neutral-200 font-medium block">Questra</span>
                    <span className="text-[10px] text-neutral-500">Founder • 2025</span>
                  </li>
                  <li>
                    <span className="text-neutral-200 font-medium block">Coding Divers</span>
                    <span className="text-[10px] text-neutral-500">Founder • 2023</span>
                  </li>
                  <li>
                    <span className="text-neutral-200 font-medium block">Gravix</span>
                    <span className="text-[10px] text-neutral-500">Co-Founder • 2024</span>
                  </li>
                  <li>
                    <span className="text-neutral-200 font-medium block">iCET Institute</span>
                    <span className="text-[10px] text-neutral-500">Software Eng.</span>
                  </li>
                  <li>
                    <span className="text-neutral-200 font-medium block">Univ. of Moratuwa</span>
                    <span className="text-[10px] text-neutral-500">Fullstack Dev</span>
                  </li>
                </ul>
              </div>

              {/* Column 3: Navigation */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                  Navigation
                </h4>
                <ul className="space-y-2 text-xs text-neutral-400">
                  <li>
                    <Link href="#home" className="hover:text-white transition-colors block py-0.5">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="#skills" className="hover:text-white transition-colors block py-0.5">
                      Tech Stack
                    </Link>
                  </li>
                  <li>
                    <Link href="#projects" className="hover:text-white transition-colors block py-0.5">
                      Featured Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="#experience" className="hover:text-white transition-colors block py-0.5">
                      Timeline & Exp
                    </Link>
                  </li>
                  <li>
                    <Link href="#contact" className="hover:text-white transition-colors block py-0.5">
                      GitHub & Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 4: Connect */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                  Connect
                </h4>
                <ul className="space-y-2 text-xs text-neutral-400">
                  <li>
                    <a
                      href="mailto:nmr.amodya@gmail.com"
                      className="hover:text-white transition-colors block py-0.5"
                    >
                      Email
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/94768605501"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-400 transition-colors block py-0.5"
                    >
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://t.me/RukshanAmodya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sky-400 transition-colors block py-0.5"
                    >
                      Telegram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/RukshanAmodya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors block py-0.5"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition-colors block py-0.5"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://amodya.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 transition-colors block py-0.5"
                    >
                      amodya.dev
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Copyright and Back To Top Bar */}
          <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs text-neutral-500">
              © {new Date().getFullYear()}{" "}
              <strong className="text-neutral-300 font-semibold">Rukshan Amodya</strong>. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-[11px] text-neutral-500">
                Crafted with Next.js 15 & Tailwind CSS
              </span>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
