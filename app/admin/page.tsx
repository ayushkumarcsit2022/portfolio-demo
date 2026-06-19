"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Lock,
  Unlock,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit2,
  ChevronRight,
  ShieldCheck,
  Server,
  Layers,
  Activity,
  Cpu,
  Mail,
  User,
  AlertCircle,
  CheckCircle2,
  X,
  FileText,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Award
} from "lucide-react";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("hero");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Check auth on load
  useEffect(() => {
    fetch("/api/auth/login")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.authenticated) {
          setAuthenticated(true);
          fetchPortfolioData();
        } else {
          setAuthenticated(false);
        }
      });
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const pData = await res.json();
      setData(pData);
    } catch (err) {
      showMsg("error", "Failed to retrieve portfolio data from network core.");
    }
  };

  const showMsg = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const resData = await res.json();
      if (resData.success) {
        setAuthenticated(true);
        fetchPortfolioData();
      } else {
        setAuthError(resData.error || "Access Denied: Credentials do not match firewall config.");
      }
    } catch (err) {
      setAuthError("Network breach or connection failure.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setAuthenticated(false);
      setData(null);
    } catch (err) {
      showMsg("error", "Logout failed.");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if (resData.success) {
        showMsg("success", "DATABASE SECURE: Configuration updated successfully across nodes.");
      } else {
        showMsg("error", resData.error || "Save aborted by gatekeeper.");
      }
    } catch (err) {
      showMsg("error", "Failed to transmit changes to server.");
    } finally {
      setLoading(false);
    }
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center font-mono text-text-muted p-4">
        <Activity className="w-8 h-8 text-accent animate-spin mb-4" />
        <span>CONNECTING TO PORTFOLIO SERVER...</span>
      </div>
    );
  }

  // --- RENDERING LOGIN SCREEN ---
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center font-mono text-text-primary p-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-cyber opacity-15 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-accent/5 filter blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="panel-glass max-w-md w-full border border-border-color p-8 rounded-lg shadow-[0_0_40px_rgba(0,245,255,0.05)] scanline relative"
        >
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="w-fit mx-auto p-4 bg-background border border-border-color rounded-sm text-accent animate-pulse">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="font-heading text-xl font-bold tracking-widest uppercase">Admin Verification</h1>
            <p className="text-[10px] text-text-muted uppercase">// ENTER ENCRYPTED ACCESS CODE TO DECRYPT INTERFACE</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-xs uppercase tracking-wider text-text-muted font-bold block">// SECURITY_TOKEN</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter administrator password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-border-color text-text-primary text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-accent font-sans transition-all duration-200"
                  required
                />
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-red-950/40 border border-red-700/60 rounded-sm text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-background hover:bg-accent/90 disabled:bg-accent/50 text-xs font-black uppercase tracking-wider rounded-sm cursor-pointer transition-all duration-200"
            >
              {loading ? (
                <Activity className="w-4 h-4 animate-spin text-background" />
              ) : (
                <>
                  <Unlock className="w-4 h-4 text-background" />
                  <span>Verify Identity</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Loaded state check
  if (!data) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center font-mono text-text-muted p-4">
        <Activity className="w-8 h-8 text-secondary animate-spin mb-4" />
        <span>RECOVERING ENCRYPTED DATASTORE FILE...</span>
      </div>
    );
  }

  // Helper change handlers
  const updateHero = (field: string, val: any) => {
    setData((prev: any) => ({
      ...prev,
      hero: { ...prev.hero, [field]: val }
    }));
  };

  const updateAbout = (field: string, val: any) => {
    setData((prev: any) => ({
      ...prev,
      about: { ...prev.about, [field]: val }
    }));
  };

  const updateContact = (field: string, val: any) => {
    setData((prev: any) => ({
      ...prev,
      contact: { ...prev.contact, [field]: val }
    }));
  };

  return (
    <div className="min-h-screen bg-background font-sans text-text-primary relative overflow-x-hidden flex flex-col pb-12">
      {/* Decorative cyber grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-5 pointer-events-none" />

      {/* Header HUD */}
      <header className="border-b border-border-color bg-surface/30 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-background border border-border-color rounded-sm text-accent">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading font-black text-base uppercase tracking-wider text-text-primary">
                SECURITY ADMIN HUB
              </h1>
              <p className="font-mono text-[9px] text-success tracking-widest leading-none">
                // SYSTEM_ACCESS: ESTABLISHED_OK
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-background px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer"
            >
              {loading ? <Activity className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Commit Config</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 border border-border-color hover:border-red-600 hover:text-red-500 bg-background/50 text-text-muted px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Status Messages */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 max-w-sm w-full"
          >
            <div
              className={`p-4 rounded-sm border flex items-start gap-3 shadow-lg ${
                message.type === "success"
                  ? "bg-emerald-950/80 border-emerald-700/80 text-emerald-400"
                  : "bg-red-950/80 border-red-700/80 text-red-400"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <div>
                <p className="font-mono text-xs uppercase tracking-wider font-bold">
                  {message.type === "success" ? "// SYSTEM_REPORT" : "// ERROR_ALERT"}
                </p>
                <p className="text-xs mt-1 font-sans">{message.text}</p>
              </div>
              <button onClick={() => setMessage(null)} className="ml-auto text-current opacity-70 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 w-full">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          <p className="font-mono text-[10px] text-text-muted uppercase px-2 mb-3">// CONFIG_SECTIONS</p>
          {[
            { id: "hero", label: "Hero Banner", icon: FileText },
            { id: "about", label: "About Bio & Stats", icon: User },
            { id: "skills", label: "Skills Categories", icon: Cpu },
            { id: "experience", label: "Experiences", icon: Briefcase },
            { id: "projects", label: "Projects", icon: FolderGit2 },
            { id: "education", label: "Education", icon: GraduationCap },
            { id: "certifications", label: "Certifications", icon: Award },
            { id: "contact", label: "Contact Details", icon: Mail }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-sm font-mono text-xs font-bold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-accent border-accent text-background"
                    : "bg-surface/30 border-border-color hover:border-accent/40 text-text-muted hover:text-text-primary"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            );
          })}
        </aside>

        {/* Form Editor Body */}
        <div className="lg:col-span-9">
          <div className="panel-glass border border-border-color rounded-lg p-6 sm:p-8 min-h-[500px]">
            {/* HERO SECTION TAB */}
            {activeTab === "hero" && (
              <div className="space-y-6">
                <div className="border-b border-border-color pb-4">
                  <h2 className="font-heading text-lg font-black uppercase text-accent">// HERO BANNER SETTINGS</h2>
                  <p className="text-xs text-text-muted mt-1">Manage main title card, text streams and badges shown in system viewport.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold block">Developer Name</label>
                    <input
                      type="text"
                      value={data.hero.name || ""}
                      onChange={(e) => updateHero("name", e.target.value)}
                      className="w-full bg-background border border-border-color text-text-primary text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold block">Job Title</label>
                    <input
                      type="text"
                      value={data.hero.title || ""}
                      onChange={(e) => updateHero("title", e.target.value)}
                      className="w-full bg-background border border-border-color text-text-primary text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold block">Introduction Description</label>
                  <textarea
                    value={data.hero.description || ""}
                    onChange={(e) => updateHero("description", e.target.value)}
                    rows={4}
                    className="w-full bg-background border border-border-color text-text-primary text-sm p-4 rounded-sm focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Badges CRUD */}
                <div className="space-y-4 pt-4 border-t border-border-color/60 text-left">
                  <div className="flex justify-between items-center">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold">// BADGES (TAG CHIPS)</h3>
                    <button
                      onClick={() => {
                        const newBadges = [...(data.hero.badges || []), { name: "New Badge", icon: "Shield" }];
                        updateHero("badges", newBadges);
                      }}
                      className="flex items-center gap-1 text-[10px] uppercase font-bold text-accent border border-accent/40 bg-accent/5 px-2.5 py-1 rounded-sm hover:bg-accent hover:text-background transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Badge
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.hero.badges?.map((badge: any, index: number) => (
                      <div key={index} className="flex gap-4 items-center bg-background/50 border border-border-color p-3 rounded-sm">
                        <input
                          type="text"
                          value={badge.name || ""}
                          placeholder="Badge label"
                          onChange={(e) => {
                            const newBadges = [...data.hero.badges];
                            newBadges[index].name = e.target.value;
                            updateHero("badges", newBadges);
                          }}
                          className="flex-1 bg-background border border-border-color/60 text-text-primary text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-accent"
                        />
                        <select
                          value={badge.icon || "Shield"}
                          onChange={(e) => {
                            const newBadges = [...data.hero.badges];
                            newBadges[index].icon = e.target.value;
                            updateHero("badges", newBadges);
                          }}
                          className="bg-background border border-border-color/60 text-text-primary text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-accent"
                        >
                          {["ShieldCheck", "Network", "Shield", "Lock", "Cpu", "Server", "Activity"].map((icon) => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            const newBadges = data.hero.badges.filter((_: any, i: number) => i !== index);
                            updateHero("badges", newBadges);
                          }}
                          className="p-2 border border-border-color hover:border-red-600 hover:text-red-500 rounded-sm text-text-muted transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ABOUT SECTION TAB */}
            {activeTab === "about" && (
              <div className="space-y-6">
                <div className="border-b border-border-color pb-4">
                  <h2 className="font-heading text-lg font-black uppercase text-accent">// ABOUT BIOGRAPHY & STATS</h2>
                  <p className="text-xs text-text-muted mt-1">Configure biography description paragraphs, target nodes, operational values, and metrics cards.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold block">Section Title</label>
                    <input
                      type="text"
                      value={data.about.title || ""}
                      onChange={(e) => updateAbout("title", e.target.value)}
                      className="w-full bg-background border border-border-color text-text-primary text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold block">Section Subtitle</label>
                    <input
                      type="text"
                      value={data.about.subtitle || ""}
                      onChange={(e) => updateAbout("subtitle", e.target.value)}
                      className="w-full bg-background border border-border-color text-text-primary text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold block">Location Node Text</label>
                    <input
                      type="text"
                      value={data.about.locationNode || ""}
                      onChange={(e) => updateAbout("locationNode", e.target.value)}
                      className="w-full bg-background border border-border-color text-text-primary text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold block">Status Text</label>
                    <input
                      type="text"
                      value={data.about.status || ""}
                      onChange={(e) => updateAbout("status", e.target.value)}
                      className="w-full bg-background border border-border-color text-text-primary text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Bio paragraphs CRUD */}
                <div className="space-y-4 pt-4 border-t border-border-color/60 text-left">
                  <div className="flex justify-between items-center">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold">// BIOGRAPHY PARAGRAPHS</h3>
                    <button
                      onClick={() => {
                        const newBio = [...(data.about.bioParagraphs || []), "New biography paragraph content."];
                        updateAbout("bioParagraphs", newBio);
                      }}
                      className="flex items-center gap-1 text-[10px] uppercase font-bold text-accent border border-accent/40 bg-accent/5 px-2.5 py-1 rounded-sm hover:bg-accent hover:text-background transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Paragraph
                    </button>
                  </div>

                  <div className="space-y-4">
                    {data.about.bioParagraphs?.map((para: string, index: number) => (
                      <div key={index} className="flex gap-4 items-start bg-background/50 border border-border-color p-3 rounded-sm">
                        <textarea
                          value={para}
                          rows={3}
                          onChange={(e) => {
                            const newBio = [...data.about.bioParagraphs];
                            newBio[index] = e.target.value;
                            updateAbout("bioParagraphs", newBio);
                          }}
                          className="flex-1 bg-background border border-border-color/60 text-text-primary text-xs p-3 rounded-sm focus:outline-none focus:border-accent"
                        />
                        <button
                          onClick={() => {
                            const newBio = data.about.bioParagraphs.filter((_: any, i: number) => i !== index);
                            updateAbout("bioParagraphs", newBio);
                          }}
                          className="p-2 border border-border-color hover:border-red-600 hover:text-red-500 rounded-sm text-text-muted transition-colors cursor-pointer shrink-0 mt-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Metrics CRUD */}
                <div className="space-y-4 pt-4 border-t border-border-color/60 text-left">
                  <div className="flex justify-between items-center">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold">// STAT METRICS CARDS</h3>
                    <button
                      onClick={() => {
                        const newStats = [...(data.about.stats || []), { value: "0+", label: "New Stat", sub: "Info", icon: "Server" }];
                        updateAbout("stats", newStats);
                      }}
                      className="flex items-center gap-1 text-[10px] uppercase font-bold text-accent border border-accent/40 bg-accent/5 px-2.5 py-1 rounded-sm hover:bg-accent hover:text-background transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Metric
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.about.stats?.map((stat: any, index: number) => (
                      <div key={index} className="bg-background/50 border border-border-color p-4 rounded-sm space-y-3 relative group">
                        <button
                          onClick={() => {
                            const newStats = data.about.stats.filter((_: any, i: number) => i !== index);
                            updateAbout("stats", newStats);
                          }}
                          className="absolute top-2 right-2 p-1.5 border border-border-color hover:border-red-600 hover:text-red-500 rounded-sm text-text-muted transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-text-muted uppercase">Stat Value</label>
                            <input
                              type="text"
                              value={stat.value || ""}
                              onChange={(e) => {
                                const newStats = [...data.about.stats];
                                newStats[index].value = e.target.value;
                                updateAbout("stats", newStats);
                              }}
                              className="w-full bg-background border border-border-color/60 text-text-primary text-xs px-2.5 py-1.5 rounded-sm focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-text-muted uppercase">Icon</label>
                            <select
                              value={stat.icon || "Server"}
                              onChange={(e) => {
                                const newStats = [...data.about.stats];
                                newStats[index].icon = e.target.value;
                                updateAbout("stats", newStats);
                              }}
                              className="w-full bg-background border border-border-color/60 text-text-primary text-xs px-2.5 py-1.5 rounded-sm focus:outline-none focus:border-accent"
                            >
                              {["Server", "Shield", "Layers", "Activity"].map((icon) => (
                                <option key={icon} value={icon}>{icon}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-text-muted uppercase">Stat Title Label</label>
                          <input
                            type="text"
                            value={stat.label || ""}
                            onChange={(e) => {
                              const newStats = [...data.about.stats];
                              newStats[index].label = e.target.value;
                              updateAbout("stats", newStats);
                            }}
                            className="w-full bg-background border border-border-color/60 text-text-primary text-xs px-2.5 py-1.5 rounded-sm focus:outline-none focus:border-accent"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-text-muted uppercase">Sub-Info Description</label>
                          <input
                            type="text"
                            value={stat.sub || ""}
                            onChange={(e) => {
                              const newStats = [...data.about.stats];
                              newStats[index].sub = e.target.value;
                              updateAbout("stats", newStats);
                            }}
                            className="w-full bg-background border border-border-color/60 text-text-primary text-xs px-2.5 py-1.5 rounded-sm focus:outline-none focus:border-accent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SKILLS CONFIG TAB */}
            {activeTab === "skills" && (
              <div className="space-y-6 text-left">
                <div className="border-b border-border-color pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-heading text-lg font-black uppercase text-accent">// SKILLS CATEGORIES</h2>
                      <p className="text-xs text-text-muted mt-1">Add, update and delete core tools, networking packages, and security protocols.</p>
                    </div>
                    <button
                      onClick={() => {
                        const newSkills = [...data.skills, { category: "New Category", icon: "Shield", items: [] }];
                        setData((prev: any) => ({ ...prev, skills: newSkills }));
                      }}
                      className="flex items-center gap-1 text-[10px] uppercase font-bold text-accent border border-accent/40 bg-accent/5 px-2.5 py-1.5 rounded-sm hover:bg-accent hover:text-background transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Category
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {data.skills?.map((cat: any, cIdx: number) => (
                    <div key={cIdx} className="bg-background/40 border border-border-color p-5 rounded-lg space-y-4 relative">
                      <button
                        onClick={() => {
                          const newSkills = data.skills.filter((_: any, i: number) => i !== cIdx);
                          setData((prev: any) => ({ ...prev, skills: newSkills }));
                        }}
                        className="absolute top-4 right-4 p-1.5 border border-border-color hover:border-red-600 hover:text-red-500 rounded-sm text-text-muted transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-text-muted uppercase">Category Name</label>
                          <input
                            type="text"
                            value={cat.category || ""}
                            onChange={(e) => {
                              const newSkills = [...data.skills];
                              newSkills[cIdx].category = e.target.value;
                              setData((prev: any) => ({ ...prev, skills: newSkills }));
                            }}
                            className="w-full bg-background border border-border-color text-text-primary text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-accent"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-text-muted uppercase">Icon Name</label>
                          <select
                            value={cat.icon || "Shield"}
                            onChange={(e) => {
                              const newSkills = [...data.skills];
                              newSkills[cIdx].icon = e.target.value;
                              setData((prev: any) => ({ ...prev, skills: newSkills }));
                            }}
                            className="w-full bg-background border border-border-color text-text-primary text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-accent"
                          >
                            {["Shield", "Cloud", "Fingerprint", "Activity", "Cpu"].map((icon) => (
                              <option key={icon} value={icon}>{icon}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Category Items */}
                      <div className="pt-4 border-t border-border-color/60 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-text-muted uppercase">// ITEM LIST</span>
                          <button
                            onClick={() => {
                              const newSkills = [...data.skills];
                              newSkills[cIdx].items = [...(newSkills[cIdx].items || []), { name: "New Skill", desc: "Brief description of the skill and experience." }];
                              setData((prev: any) => ({ ...prev, skills: newSkills }));
                            }}
                            className="flex items-center gap-1 text-[9px] uppercase font-bold text-accent border border-accent/40 bg-accent/5 px-2 py-0.5 rounded-sm hover:bg-accent hover:text-background transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Item
                          </button>
                        </div>

                        <div className="space-y-3">
                          {cat.items?.map((item: any, iIdx: number) => (
                            <div key={iIdx} className="flex gap-4 items-start bg-background/80 border border-border-color/60 p-3 rounded-sm relative">
                              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="sm:col-span-1">
                                  <input
                                    type="text"
                                    value={item.name || ""}
                                    placeholder="Skill Name"
                                    onChange={(e) => {
                                      const newSkills = [...data.skills];
                                      newSkills[cIdx].items[iIdx].name = e.target.value;
                                      setData((prev: any) => ({ ...prev, skills: newSkills }));
                                    }}
                                    className="w-full bg-background border border-border-color text-text-primary text-xs px-2.5 py-1.5 rounded-sm focus:outline-none"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    value={item.desc || ""}
                                    placeholder="Brief Description"
                                    onChange={(e) => {
                                      const newSkills = [...data.skills];
                                      newSkills[cIdx].items[iIdx].desc = e.target.value;
                                      setData((prev: any) => ({ ...prev, skills: newSkills }));
                                    }}
                                    className="w-full bg-background border border-border-color text-text-primary text-xs px-2.5 py-1.5 rounded-sm focus:outline-none"
                                  />
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  const newSkills = [...data.skills];
                                  newSkills[cIdx].items = newSkills[cIdx].items.filter((_: any, idx: number) => idx !== iIdx);
                                  setData((prev: any) => ({ ...prev, skills: newSkills }));
                                }}
                                className="p-1.5 border border-border-color/80 hover:border-red-600 hover:text-red-500 rounded-sm text-text-muted transition-colors cursor-pointer mt-0.5"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EXPERIENCE CONFIG TAB */}
            {activeTab === "experience" && (
              <div className="space-y-6 text-left">
                <div className="border-b border-border-color pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-heading text-lg font-black uppercase text-accent">// OPERATIONAL EXPERIENCES</h2>
                      <p className="text-xs text-text-muted mt-1">Configure chronological work histories, engineering roles, and achievement logs.</p>
                    </div>
                    <button
                      onClick={() => {
                        const newExp = [
                          {
                            id: `exp-${Date.now()}`,
                            company: "New Company",
                            role: "Security Engineer",
                            period: "Jan 2026 - Present",
                            bullets: ["Deploys firewalls", "Mitigates security threats"]
                          },
                          ...data.experiences
                        ];
                        setData((prev: any) => ({ ...prev, experiences: newExp }));
                      }}
                      className="flex items-center gap-1 text-[10px] uppercase font-bold text-accent border border-accent/40 bg-accent/5 px-2.5 py-1.5 rounded-sm hover:bg-accent hover:text-background transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Experience
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {data.experiences?.map((exp: any, expIdx: number) => (
                    <div key={expIdx} className="bg-background/40 border border-border-color p-5 rounded-lg space-y-4 relative">
                      <button
                        onClick={() => {
                          const newExp = data.experiences.filter((_: any, i: number) => i !== expIdx);
                          setData((prev: any) => ({ ...prev, experiences: newExp }));
                        }}
                        className="absolute top-4 right-4 p-1.5 border border-border-color hover:border-red-600 hover:text-red-500 rounded-sm text-text-muted transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-text-muted uppercase">Company Name</label>
                          <input
                            type="text"
                            value={exp.company || ""}
                            onChange={(e) => {
                              const newExp = [...data.experiences];
                              newExp[expIdx].company = e.target.value;
                              setData((prev: any) => ({ ...prev, experiences: newExp }));
                            }}
                            className="w-full bg-background border border-border-color text-text-primary text-xs px-3 py-2 rounded-sm focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-text-muted uppercase">Job Role</label>
                          <input
                            type="text"
                            value={exp.role || ""}
                            onChange={(e) => {
                              const newExp = [...data.experiences];
                              newExp[expIdx].role = e.target.value;
                              setData((prev: any) => ({ ...prev, experiences: newExp }));
                            }}
                            className="w-full bg-background border border-border-color text-text-primary text-xs px-3 py-2 rounded-sm focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-text-muted uppercase">Employment Period</label>
                          <input
                            type="text"
                            value={exp.period || ""}
                            onChange={(e) => {
                              const newExp = [...data.experiences];
                              newExp[expIdx].period = e.target.value;
                              setData((prev: any) => ({ ...prev, experiences: newExp }));
                            }}
                            className="w-full bg-background border border-border-color text-text-primary text-xs px-3 py-2 rounded-sm focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Bullet list items CRUD */}
                      <div className="pt-4 border-t border-border-color/60 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-text-muted uppercase">// ACHIEVEMENT CHIPS & BULLETS</span>
                          <button
                            onClick={() => {
                              const newExp = [...data.experiences];
                              newExp[expIdx].bullets = [...(newExp[expIdx].bullets || []), "Engineered and integrated new security systems."];
                              setData((prev: any) => ({ ...prev, experiences: newExp }));
                            }}
                            className="flex items-center gap-1 text-[9px] uppercase font-bold text-accent border border-accent/40 bg-accent/5 px-2 py-0.5 rounded-sm hover:bg-accent hover:text-background transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Bullet
                          </button>
                        </div>

                        <div className="space-y-2">
                          {exp.bullets?.map((bullet: string, bIdx: number) => (
                            <div key={bIdx} className="flex gap-3 items-center">
                              <textarea
                                value={bullet}
                                rows={2}
                                onChange={(e) => {
                                  const newExp = [...data.experiences];
                                  newExp[expIdx].bullets[bIdx] = e.target.value;
                                  setData((prev: any) => ({ ...prev, experiences: newExp }));
                                }}
                                className="flex-1 bg-background border border-border-color text-text-primary text-xs p-2 rounded-sm focus:outline-none"
                              />
                              <button
                                onClick={() => {
                                  const newExp = [...data.experiences];
                                  newExp[expIdx].bullets = newExp[expIdx].bullets.filter((_: any, idx: number) => idx !== bIdx);
                                  setData((prev: any) => ({ ...prev, experiences: newExp }));
                                }}
                                className="p-2 border border-border-color/85 hover:border-red-600 hover:text-red-500 rounded-sm text-text-muted transition-colors cursor-pointer shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECTS CONFIG TAB */}
            {activeTab === "projects" && (
              <div className="space-y-6 text-left">
                <div className="border-b border-border-color pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-heading text-lg font-black uppercase text-accent">// FIELD INITIATIVE PROJECTS</h2>
                      <p className="text-xs text-text-muted mt-1">Manage network architectural blueprints and live deployment descriptions.</p>
                    </div>
                    <button
                      onClick={() => {
                        const newProj = [
                          ...data.projects,
                          {
                            title: "New Security Architecture",
                            subtitle: "Zero Trust Perimeter Deployment",
                            desc: "Fully functional project description details...",
                            tags: ["Security", "AWS", "NGFW"]
                          }
                        ];
                        setData((prev: any) => ({ ...prev, projects: newProj }));
                      }}
                      className="flex items-center gap-1 text-[10px] uppercase font-bold text-accent border border-accent/40 bg-accent/5 px-2.5 py-1.5 rounded-sm hover:bg-accent hover:text-background transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Project
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {data.projects?.map((proj: any, pIdx: number) => (
                    <div key={pIdx} className="bg-background/40 border border-border-color p-5 rounded-lg space-y-4 relative">
                      <button
                        onClick={() => {
                          const newProj = data.projects.filter((_: any, i: number) => i !== pIdx);
                          setData((prev: any) => ({ ...prev, projects: newProj }));
                        }}
                        className="absolute top-4 right-4 p-1.5 border border-border-color hover:border-red-600 hover:text-red-500 rounded-sm text-text-muted transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-text-muted uppercase">Project Title</label>
                          <input
                            type="text"
                            value={proj.title || ""}
                            onChange={(e) => {
                              const newProj = [...data.projects];
                              newProj[pIdx].title = e.target.value;
                              setData((prev: any) => ({ ...prev, projects: newProj }));
                            }}
                            className="w-full bg-background border border-border-color text-text-primary text-xs px-3 py-2 rounded-sm focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-text-muted uppercase">Project Subtitle</label>
                          <input
                            type="text"
                            value={proj.subtitle || ""}
                            onChange={(e) => {
                              const newProj = [...data.projects];
                              newProj[pIdx].subtitle = e.target.value;
                              setData((prev: any) => ({ ...prev, projects: newProj }));
                            }}
                            className="w-full bg-background border border-border-color text-text-primary text-xs px-3 py-2 rounded-sm focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-text-muted uppercase">Project Description</label>
                        <textarea
                          value={proj.desc || ""}
                          rows={4}
                          onChange={(e) => {
                            const newProj = [...data.projects];
                            newProj[pIdx].desc = e.target.value;
                            setData((prev: any) => ({ ...prev, projects: newProj }));
                          }}
                          className="w-full bg-background border border-border-color text-text-primary text-xs p-3 rounded-sm focus:outline-none"
                        />
                      </div>

                      {/* Tag Chips CRUD */}
                      <div className="pt-4 border-t border-border-color/60 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-text-muted uppercase">// PROJECT KEY TAGS</span>
                          <button
                            onClick={() => {
                              const newProj = [...data.projects];
                              newProj[pIdx].tags = [...(newProj[pIdx].tags || []), "NewTag"];
                              setData((prev: any) => ({ ...prev, projects: newProj }));
                            }}
                            className="flex items-center gap-1 text-[9px] uppercase font-bold text-accent border border-accent/40 bg-accent/5 px-2 py-0.5 rounded-sm hover:bg-accent hover:text-background transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Tag
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {proj.tags?.map((tag: string, tIdx: number) => (
                            <div key={tIdx} className="flex items-center gap-1.5 bg-background border border-border-color px-2.5 py-1 rounded-sm">
                              <input
                                type="text"
                                value={tag}
                                onChange={(e) => {
                                  const newProj = [...data.projects];
                                  newProj[pIdx].tags[tIdx] = e.target.value;
                                  setData((prev: any) => ({ ...prev, projects: newProj }));
                                }}
                                className="bg-transparent text-text-primary text-xs font-mono w-20 focus:outline-none"
                              />
                              <button
                                onClick={() => {
                                  const newProj = [...data.projects];
                                  newProj[pIdx].tags = newProj[pIdx].tags.filter((_: any, idx: number) => idx !== tIdx);
                                  setData((prev: any) => ({ ...prev, projects: newProj }));
                                }}
                                className="text-text-muted hover:text-red-500 transition-colors cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EDUCATION CONFIG TAB */}
            {activeTab === "education" && (
              <div className="space-y-6 text-left">
                <div className="border-b border-border-color pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-heading text-lg font-black uppercase text-accent">// ACADEMIC CERTIFICATES</h2>
                      <p className="text-xs text-text-muted mt-1">Configure degrees, institutes, graduating years, and curriculum tags.</p>
                    </div>
                    <button
                      onClick={() => {
                        const newEdu = [
                          ...data.education,
                          {
                            institution: "New University",
                            degree: "B.Sc. Network Security",
                            year: "2026",
                            tags: ["VLAN", "Cisco"]
                          }
                        ];
                        setData((prev: any) => ({ ...prev, education: newEdu }));
                      }}
                      className="flex items-center gap-1 text-[10px] uppercase font-bold text-accent border border-accent/40 bg-accent/5 px-2.5 py-1.5 rounded-sm hover:bg-accent hover:text-background transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Record
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {data.education?.map((edu: any, eIdx: number) => (
                    <div key={eIdx} className="bg-background/40 border border-border-color p-5 rounded-lg space-y-4 relative">
                      <button
                        onClick={() => {
                          const newEdu = data.education.filter((_: any, i: number) => i !== eIdx);
                          setData((prev: any) => ({ ...prev, education: newEdu }));
                        }}
                        className="absolute top-4 right-4 p-1.5 border border-border-color hover:border-red-600 hover:text-red-500 rounded-sm text-text-muted transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-text-muted uppercase">Institution</label>
                          <input
                            type="text"
                            value={edu.institution || ""}
                            onChange={(e) => {
                              const newEdu = [...data.education];
                              newEdu[eIdx].institution = e.target.value;
                              setData((prev: any) => ({ ...prev, education: newEdu }));
                            }}
                            className="w-full bg-background border border-border-color text-text-primary text-xs px-3 py-2 rounded-sm focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-text-muted uppercase">Degree / Specialization</label>
                          <input
                            type="text"
                            value={edu.degree || ""}
                            onChange={(e) => {
                              const newEdu = [...data.education];
                              newEdu[eIdx].degree = e.target.value;
                              setData((prev: any) => ({ ...prev, education: newEdu }));
                            }}
                            className="w-full bg-background border border-border-color text-text-primary text-xs px-3 py-2 rounded-sm focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-text-muted uppercase">Graduation Year</label>
                          <input
                            type="text"
                            value={edu.year || ""}
                            onChange={(e) => {
                              const newEdu = [...data.education];
                              newEdu[eIdx].year = e.target.value;
                              setData((prev: any) => ({ ...prev, education: newEdu }));
                            }}
                            className="w-full bg-background border border-border-color text-text-primary text-xs px-3 py-2 rounded-sm focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Coursework Tags CRUD */}
                      <div className="pt-4 border-t border-border-color/60 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-text-muted uppercase">// COURSEWORK KEYWORDS</span>
                          <button
                            onClick={() => {
                              const newEdu = [...data.education];
                              newEdu[eIdx].tags = [...(newEdu[eIdx].tags || []), "NewSkill"];
                              setData((prev: any) => ({ ...prev, education: newEdu }));
                            }}
                            className="flex items-center gap-1 text-[9px] uppercase font-bold text-accent border border-accent/40 bg-accent/5 px-2 py-0.5 rounded-sm hover:bg-accent hover:text-background transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Tag
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {edu.tags?.map((tag: string, tIdx: number) => (
                            <div key={tIdx} className="flex items-center gap-1.5 bg-background border border-border-color px-2.5 py-1 rounded-sm">
                              <input
                                type="text"
                                value={tag}
                                onChange={(e) => {
                                  const newEdu = [...data.education];
                                  newEdu[eIdx].tags[tIdx] = e.target.value;
                                  setData((prev: any) => ({ ...prev, education: newEdu }));
                                }}
                                className="bg-transparent text-text-primary text-xs font-mono w-24 focus:outline-none"
                              />
                              <button
                                onClick={() => {
                                  const newEdu = [...data.education];
                                  newEdu[eIdx].tags = newEdu[eIdx].tags.filter((_: any, idx: number) => idx !== tIdx);
                                  setData((prev: any) => ({ ...prev, education: newEdu }));
                                }}
                                className="text-text-muted hover:text-red-500 transition-colors cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CERTIFICATIONS TAB */}
            {activeTab === "certifications" && (
              <div className="space-y-6 text-left">
                <div className="border-b border-border-color pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-heading text-lg font-black uppercase text-accent">// SECURITY CERTIFICATIONS</h2>
                      <p className="text-xs text-text-muted mt-1">Configure professional credentials and official issuing organizations.</p>
                    </div>
                    <button
                      onClick={() => {
                        const newCerts = [
                          ...data.certifications,
                          { name: "New Certification", issuer: "Credential Issuer Authority" }
                        ];
                        setData((prev: any) => ({ ...prev, certifications: newCerts }));
                      }}
                      className="flex items-center gap-1 text-[10px] uppercase font-bold text-accent border border-accent/40 bg-accent/5 px-2.5 py-1.5 rounded-sm hover:bg-accent hover:text-background transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Certification
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {data.certifications?.map((cert: any, cIdx: number) => (
                    <div key={cIdx} className="flex gap-4 items-center bg-background/50 border border-border-color p-4 rounded-sm relative">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-text-muted uppercase">Certification Name</label>
                          <input
                            type="text"
                            value={cert.name || ""}
                            onChange={(e) => {
                              const newCerts = [...data.certifications];
                              newCerts[cIdx].name = e.target.value;
                              setData((prev: any) => ({ ...prev, certifications: newCerts }));
                            }}
                            className="w-full bg-background border border-border-color/60 text-text-primary text-xs px-3 py-2 rounded-sm focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-text-muted uppercase">Issuer / Full Title Details</label>
                          <input
                            type="text"
                            value={cert.issuer || ""}
                            onChange={(e) => {
                              const newCerts = [...data.certifications];
                              newCerts[cIdx].issuer = e.target.value;
                              setData((prev: any) => ({ ...prev, certifications: newCerts }));
                            }}
                            className="w-full bg-background border border-border-color/60 text-text-primary text-xs px-3 py-2 rounded-sm focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const newCerts = data.certifications.filter((_: any, i: number) => i !== cIdx);
                          setData((prev: any) => ({ ...prev, certifications: newCerts }));
                        }}
                        className="p-2 border border-border-color hover:border-red-600 hover:text-red-500 rounded-sm text-text-muted transition-colors cursor-pointer self-end mb-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT DETAILS TAB */}
            {activeTab === "contact" && (
              <div className="space-y-6 text-left">
                <div className="border-b border-border-color pb-4">
                  <h2 className="font-heading text-lg font-black uppercase text-accent">// CONTACT CHANNEL SETTINGS</h2>
                  <p className="text-xs text-text-muted mt-1">Configure security email, direct line phone number, location nodes, and main CTA headings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold block">Channel Title</label>
                    <input
                      type="text"
                      value={data.contact.title || ""}
                      onChange={(e) => updateContact("title", e.target.value)}
                      className="w-full bg-background border border-border-color text-text-primary text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold block">Location / Active Node</label>
                    <input
                      type="text"
                      value={data.contact.location || ""}
                      onChange={(e) => updateContact("location", e.target.value)}
                      className="w-full bg-background border border-border-color text-text-primary text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold block">Channel Subtitle / CTA Description</label>
                  <textarea
                    value={data.contact.subtitle || ""}
                    onChange={(e) => updateContact("subtitle", e.target.value)}
                    rows={3}
                    className="w-full bg-background border border-border-color text-text-primary text-sm p-4 rounded-sm focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold block">Email Address</label>
                    <input
                      type="email"
                      value={data.contact.email || ""}
                      onChange={(e) => updateContact("email", e.target.value)}
                      className="w-full bg-background border border-border-color text-text-primary text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold block">Phone Number</label>
                    <input
                      type="text"
                      value={data.contact.phone || ""}
                      onChange={(e) => updateContact("phone", e.target.value)}
                      className="w-full bg-background border border-border-color text-text-primary text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold block">LinkedIn Handshake URL</label>
                    <input
                      type="text"
                      value={data.contact.linkedin || ""}
                      onChange={(e) => updateContact("linkedin", e.target.value)}
                      className="w-full bg-background border border-border-color text-text-primary text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
