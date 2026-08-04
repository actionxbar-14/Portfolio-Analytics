import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { BarChart3, BriefcaseBusiness, Database, FolderKanban, LayoutGrid, Search, Sparkles, TrendingUp, UserCircle2, BadgeCheck, FileText, Settings, BrainCircuit } from 'lucide-react';
import analytics from './data/analytics.json';
import projects from './data/projects.json';
import datasets from './data/datasets.json';
import skills from './data/skills.json';
import career from './data/career.json';
import experience from './data/experience.json';
import resume from './data/resume.json';
import certificates from './data/certificates.json';
import repository from './data/repository.json';
import portfolioAvatar from './assets/portfolio_img.png';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

type StatCardProps = {
  label: string;
  value: string;
  tone: string;
};

const StatCard = ({ label, value, tone }: StatCardProps) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/10 bg-slate-800/70 p-4 shadow-glow">
    <div className="text-sm text-slate-400">{label}</div>
    <div className={`mt-2 text-3xl font-semibold text-${tone}`}>{value}</div>
  </motion.div>
);

const roleRotator = ['Aspiring Data Analyst', 'Data Engineer', 'BI Enthusiast', 'Analytics Builder'];

function RoleTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % roleRotator.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.div
      key={roleRotator[index]}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-2 inline-flex items-center rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-3 py-1 text-sm font-medium text-brand-cyan"
    >
      {roleRotator[index]}
    </motion.div>
  );
}

const shellItems = [
  { to: '/', label: 'Executive Dashboard', icon: LayoutGrid },
  { to: '/projects', label: 'Project Intelligence', icon: FolderKanban },
  { to: '/datasets', label: 'Dataset Explorer', icon: Database },
  { to: '/business', label: 'Business Intelligence', icon: TrendingUp },
  { to: '/career', label: 'Career Analytics', icon: UserCircle2 },
  { to: '/skills', label: 'Skills Matrix', icon: BrainCircuit },
  { to: '/experience', label: 'Experience Timeline', icon: BriefcaseBusiness },
  { to: '/repository', label: 'Repository Analytics', icon: BarChart3 },
  { to: '/certificates', label: 'Certificates', icon: BadgeCheck },
  { to: '/resume', label: 'Resume Center', icon: FileText },
  { to: '/settings', label: 'Settings', icon: Settings }
];

function App() {
  const location = useLocation();
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-white/10 bg-slate-900/80 p-4 lg:flex">
          <div className="mb-5 rounded-2xl border border-white/10 bg-slate-800/70 p-4">
            <div className="text-[10px] uppercase tracking-[0.32em] text-brand-cyan">Anubhav Career Portfolio</div>
            <div className="mt-2 text-lg font-semibold text-white">Analytics workspace</div>
          </div>
          <nav className="flex-1 space-y-1.5">
            {shellItems.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${active ? 'bg-brand-blue/20 text-white shadow-glow' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${active ? 'bg-brand-blue/20 text-brand-cyan' : 'bg-slate-800/70 text-slate-400 group-hover:text-white'}`}>
                    <Icon size={17} />
                  </span>
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/10 p-4">
            <div className="flex items-center gap-2 text-brand-cyan"><Sparkles size={16}/> AI Analyst</div>
            <div className="mt-2 text-sm leading-6 text-slate-300">Ask: “Show all SQL projects” or “Compare Banking vs Mobile Analytics”.</div>
          </div>
        </aside>

        <main className="flex-1">
          <header className="border-b border-white/10 bg-slate-900/70 px-6 py-4 backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Anubhav's Analytics Workspace</div>
                <div className="text-2xl font-semibold">Anubhav Pathak</div>
                <RoleTicker />
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3">
                <Search size={18} className="text-slate-400" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects, datasets, skills..." className="w-full bg-transparent outline-none" />
              </div>
            </div>
          </header>

          <div className="p-6 lg:p-8">
            <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-slate-900/70 p-2 shadow-glow">
              {shellItems.map(({ to, label, icon: Icon }) => {
                const active = location.pathname === to;
                return (
                  <Link key={to} to={to} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${active ? 'bg-brand-blue/20 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              })}
            </div>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/datasets" element={<DatasetsPage />} />
                <Route path="/business" element={<BusinessPage />} />
                <Route path="/career" element={<CareerPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/repository" element={<RepositoryPage />} />
                <Route path="/certificates" element={<CertificatesPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

function HomePage() {
  const overview = analytics.overview;
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -28 }} className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800/90 to-slate-900/80 p-6 shadow-glow">
        <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
          <div>
            <div className="text-sm uppercase tracking-[0.32em] text-brand-cyan">Executive Intelligence Overview</div>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Business analytics portfolio shaped as a live enterprise operating system.</h1>
            <p className="mt-4 max-w-2xl text-slate-400">Every metric, project, and skill is framed as an analytical asset for recruiters and hiring teams.</p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Professional Summary</div>
              <p className="mt-2 text-sm leading-7 text-slate-300">{resume.headline}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                {resume.atsSummary.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-cyan" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-transparent">
              <img src={portfolioAvatar} alt="Anubhav Pathak" className="h-64 w-full object-contain" />
            </div>
            <div className="mt-4 text-sm text-slate-400">Signal Summary</div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-brand-blue/10 p-3"><div className="text-2xl font-semibold text-brand-blue">{overview.projectsCompleted}</div><div className="text-xs text-slate-400">Projects</div></div>
              <div className="rounded-xl bg-brand-cyan/10 p-3"><div className="text-2xl font-semibold text-brand-cyan">{overview.dashboardsBuilt}</div><div className="text-xs text-slate-400">Dashboards</div></div>
              <div className="rounded-xl bg-brand-purple/10 p-3"><div className="text-2xl font-semibold text-brand-purple">{overview.datasetsAnalysed}</div><div className="text-xs text-slate-400">Datasets</div></div>
              <div className="rounded-xl bg-brand-green/10 p-3"><div className="text-2xl font-semibold text-brand-green">{overview.rowsProcessed}</div><div className="text-xs text-slate-400">Rows Processed</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Projects Completed" value={overview.projectsCompleted.toString()} tone="brand-blue" />
        <StatCard label="Dashboards Built" value={overview.dashboardsBuilt.toString()} tone="brand-cyan" />
        <StatCard label="Datasets Analysed" value={overview.datasetsAnalysed.toString()} tone="brand-purple" />
        <StatCard label="Rows Processed" value={overview.rowsProcessed} tone="brand-green" />
      </div>

      <div className="grid gap-4 2xl:grid-cols-[1.15fr,0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-4 shadow-glow">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Learning Timeline</div>
              <div className="text-xl font-semibold">Monthly Activity</div>
            </div>
            <div className="text-sm text-slate-400">{overview.learningHours} hrs</div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.timeline}>
                <defs>
                  <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="url(#colorActivity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">Technology Distribution</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analytics.technologyDistribution} dataKey="value" nameKey="name" outerRadius={90} innerRadius={55}>
                  {analytics.technologyDistribution.map((entry, index) => <Cell key={entry.name} fill={['#3B82F6','#06B6D4','#8B5CF6','#22C55E','#F59E0B'][index % 5]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">Project Categories</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.categories}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-4 shadow-glow">
          <div className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-400">Career KPIs</div>
          <div className="grid gap-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><div className="text-slate-400">Internship Duration</div><div className="mt-2 text-2xl font-semibold text-brand-cyan">{overview.internshipDuration}</div></div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><div className="text-slate-400">Repositories</div><div className="mt-2 text-2xl font-semibold text-brand-purple">{overview.repositories}</div></div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><div className="text-slate-400">Certificates</div><div className="mt-2 text-2xl font-semibold text-brand-green">{overview.certificates}</div></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
        <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Project Intelligence</div>
        <h2 className="mt-2 text-2xl font-semibold">Business case studies, not simple portfolios</h2>
      </div>
      {projects.map((project) => (
        <div key={project.id} className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-brand-cyan">{project.category}</div>
              <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
              <p className="mt-3 max-w-2xl text-slate-400">{project.summary}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-300">Repository <span className="ml-2 font-semibold text-brand-blue">{project.repo}</span></div>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr,1.2fr]">
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Objectives</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {project.objectives.map((objective) => <li key={objective}>• {objective}</li>)}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Technology Used</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((tech) => <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">{tech}</span>)}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2 md:grid-cols-2">
                {project.kpis.map((kpi) => <div key={kpi.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><div className="text-sm text-slate-400">{kpi.label}</div><div className="mt-2 text-2xl font-semibold text-white">{kpi.value}</div><div className="mt-1 text-sm text-brand-green">{kpi.delta}</div></div>)}
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Business Insights</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {project.insights.map((insight) => <li key={insight}>• {insight}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function DatasetsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
        <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Dataset Explorer</div>
        <h2 className="mt-2 text-2xl font-semibold">Curated analytical assets with dictionary-ready structure</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {datasets.map((dataset) => (
          <div key={dataset.name} className="rounded-3xl border border-white/10 bg-slate-800/70 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.3em] text-brand-cyan">{dataset.type}</div>
                <h3 className="mt-2 text-xl font-semibold">{dataset.name}</h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">{dataset.size}</div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3"><div className="text-xs uppercase text-slate-400">Rows</div><div className="mt-1 text-lg font-semibold">{dataset.rows}</div></div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3"><div className="text-xs uppercase text-slate-400">Columns</div><div className="mt-1 text-lg font-semibold">{dataset.columns}</div></div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3"><div className="text-xs uppercase text-slate-400">File Size</div><div className="mt-1 text-lg font-semibold">{dataset.size}</div></div>
            </div>
            <div className="mt-5">
              <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Preview Table</div>
              <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
                <table className="min-w-full divide-y divide-white/10 text-sm">
                  <thead className="bg-slate-900/90">
                    <tr>{Object.keys(dataset.preview[0]).map((header) => <th key={header} className="px-3 py-2 text-left text-slate-400">{header}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 bg-slate-800/70">
                    {dataset.preview.map((row, index) => <tr key={index}>{Object.values(row).map((value, valueIndex) => <td key={`${index}-${valueIndex}`} className="px-3 py-2">{value}</td>)}</tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function BusinessPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
        <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Business Intelligence</div>
        <h2 className="mt-2 text-2xl font-semibold">Banking dashboard experience built for executive decision-making</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5"><div className="text-sm text-slate-400">Deposits</div><div className="mt-2 text-3xl font-semibold text-brand-blue">$4.8B</div></div>
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5"><div className="text-sm text-slate-400">Loans</div><div className="mt-2 text-3xl font-semibold text-brand-cyan">$2.1B</div></div>
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5"><div className="text-sm text-slate-400">Customers</div><div className="mt-2 text-3xl font-semibold text-brand-purple">184K</div></div>
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5"><div className="text-sm text-slate-400">Branches</div><div className="mt-2 text-3xl font-semibold text-brand-green">129</div></div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">Growth</div>
          <div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={[{ month:'Jan', growth: 11 }, { month:'Feb', growth: 14 }, { month:'Mar', growth: 16 }, { month:'Apr', growth: 19 }, { month:'May', growth: 21 }, { month:'Jun', growth: 24 }]}><CartesianGrid stroke="rgba(255,255,255,0.08)" /><XAxis dataKey="month" tick={{fill:'#94a3b8',fontSize:12}} /><YAxis tick={{fill:'#94a3b8',fontSize:12}} /><Tooltip /><Bar dataKey="growth" radius={[8,8,0,0]} fill="#06B6D4" /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">Interactive Filters</div>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">Region · North, South, West, East</div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">Segment · Premium, Retail, SME</div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">Product · Savings, Fixed Deposit, Loan</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CareerPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
        <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Career Analytics</div>
        <h2 className="mt-2 text-2xl font-semibold">Resume visualized as a growth narrative</h2>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">Career Timeline</div>
          <div className="space-y-4">
            {career.timeline.map((item) => <div key={item.year} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><div className="text-brand-cyan">{item.year}</div><div className="mt-1 text-lg font-semibold">{item.title}</div><div className="text-sm text-slate-400">{item.company}</div><div className="mt-2 text-sm text-slate-300">{item.detail}</div></div>)}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">Education Analytics</div>
          <div className="grid gap-3">
            {career.education.map((edu) => <div key={edu.degree} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><div className="text-xl font-semibold">{edu.degree}</div><div className="mt-1 text-sm text-slate-400">{edu.school}</div><div className="mt-2 text-sm text-slate-300">Graduation {edu.year} · CGPA {edu.cgpa}</div></div>)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SkillsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
        <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Skills Matrix</div>
        <h2 className="mt-2 text-2xl font-semibold">Multi-dimensional skill intelligence across analytics and engineering</h2>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">Radar Chart</div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skills.map((skill) => ({ subject: skill.name, A: skill.score }))}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">Technology Heatmap</div>
          <div className="grid gap-3">
            {skills.map((skill) => <div key={skill.name} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><div className="flex items-center justify-between"><span>{skill.name}</span><span className="text-brand-cyan">{skill.score}/100</span></div><div className="mt-2 h-2 rounded-full bg-slate-700"><div className="h-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan" style={{ width: `${skill.score}%` }} /></div></div>)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ExperiencePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
        <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Experience Timeline</div>
        <h2 className="mt-2 text-2xl font-semibold">Professional growth charted across analytics delivery</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {experience.map((item) => <div key={item.role} className="rounded-3xl border border-white/10 bg-slate-800/70 p-6 shadow-glow"><div className="text-sm uppercase tracking-[0.3em] text-brand-cyan">{item.period}</div><h3 className="mt-2 text-xl font-semibold">{item.role}</h3><div className="mt-1 text-slate-400">{item.company}</div><ul className="mt-4 space-y-2 text-sm text-slate-300">{item.highlights.map((highlight) => <li key={highlight}>• {highlight}</li>)}</ul></div>)}
      </div>
    </motion.div>
  );
}

function RepositoryPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
        <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Repository Analytics</div>
        <h2 className="mt-2 text-2xl font-semibold">GitHub footprint traced as a living engineering signal</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5"><div className="text-sm text-slate-400">Repositories</div><div className="mt-2 text-3xl font-semibold text-brand-blue">{repository.repositories}</div></div>
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5"><div className="text-sm text-slate-400">Commits</div><div className="mt-2 text-3xl font-semibold text-brand-cyan">{repository.commits}</div></div>
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5"><div className="text-sm text-slate-400">Languages</div><div className="mt-2 text-3xl font-semibold text-brand-purple">{repository.languages.length}</div></div>
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5"><div className="text-sm text-slate-400">Stars</div><div className="mt-2 text-3xl font-semibold text-brand-green">{repository.stars}</div></div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">Activity Timeline</div>
          <div className="h-72"><ResponsiveContainer width="100%" height="100%"><AreaChart data={repository.activity}><CartesianGrid stroke="rgba(255,255,255,0.08)" /><XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} /><YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} /><Tooltip /><Area type="monotone" dataKey="value" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.25} /></AreaChart></ResponsiveContainer></div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">Language Mix</div>
          <div className="space-y-3">
            {repository.languages.map((language) => <div key={language.name} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><div className="flex items-center justify-between"><span>{language.name}</span><span className="text-brand-cyan">{language.value}%</span></div><div className="mt-2 h-2 rounded-full bg-slate-700"><div className="h-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan" style={{ width: `${language.value}%` }} /></div></div>)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CertificatesPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
        <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Certificate Center</div>
        <h2 className="mt-2 text-2xl font-semibold">Validated learning artifacts and technology tags</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {certificates.map((certificate) => <div key={certificate.title} className="rounded-3xl border border-white/10 bg-slate-800/70 p-6 shadow-glow"><div className="text-sm uppercase tracking-[0.3em] text-brand-cyan">{certificate.issuer}</div><h3 className="mt-2 text-xl font-semibold">{certificate.title}</h3><div className="mt-2 text-sm text-slate-400">Issued {certificate.date}</div><div className="mt-4 text-3xl font-semibold text-brand-green">{certificate.hours} hrs</div><div className="mt-4 flex flex-wrap gap-2">{certificate.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">{tag}</span>)}</div></div>)}
      </div>
    </motion.div>
  );
}

function ResumePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-5 shadow-glow">
        <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Resume Center</div>
        <h2 className="mt-2 text-2xl font-semibold">Interactive resume view with ATS-oriented summary</h2>
      </div>
      <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-6 shadow-glow">
        <div className="text-2xl font-semibold">{resume.headline}</div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <div className="text-sm uppercase tracking-[0.3em] text-slate-400">ATS Summary</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">{resume.atsSummary.map((entry) => <li key={entry}>• {entry}</li>)}</ul>
        </div>
        <a href={resume.downloadUrl} className="mt-6 inline-flex rounded-2xl border border-brand-blue/20 bg-brand-blue/10 px-4 py-3 text-sm font-semibold text-brand-blue">Download PDF</a>
      </div>
    </motion.div>
  );
}

function SettingsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="rounded-3xl border border-white/10 bg-slate-800/70 p-8 text-center shadow-glow">
      <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Settings</div>
      <h2 className="mt-2 text-2xl font-semibold">Enterprise configuration layer ready for expansion</h2>
      <p className="mt-3 text-slate-400">Themes, search, and workspace preferences can be wired into this surface next.</p>
    </motion.div>
  );
}

export default App;
