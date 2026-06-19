import fs from "fs";
import path from "path";
import {
  SKILL_CATEGORIES,
  CERTIFICATIONS,
  EXPERIENCES,
  PROJECTS,
  EDUCATION_ITEMS
} from "./data";

const DATA_FILE_PATH = path.join(process.cwd(), "lib", "data.json");

export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    description: string;
    badges: { name: string; icon: string }[];
  };
  about: {
    title: string;
    subtitle: string;
    bioParagraphs: string[];
    locationNode: string;
    status: string;
    stats: { value: string; label: string; sub: string; icon: string }[];
  };
  skills: typeof SKILL_CATEGORIES;
  certifications: typeof CERTIFICATIONS;
  experiences: typeof EXPERIENCES;
  projects: typeof PROJECTS;
  education: typeof EDUCATION_ITEMS;
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
  };
}

export const defaultPortfolioData: PortfolioData = {
  hero: {
    name: "Gbenga Owadokun",
    title: "Senior Network & Cybersecurity Engineer",
    description: "Protecting networks. Securing infrastructure. Designing robust Zero Trust architectures and deploying next-generation firewalls for global enterprises.",
    badges: [
      { name: "AWS SASE", icon: "ShieldCheck" },
      { name: "CCNA Route/Switch", icon: "Network" },
      { name: "PCNSE Security", icon: "Shield" },
      { name: "Palo Alto NGFW", icon: "Lock" },
      { name: "Zero Trust Architecture", icon: "Cpu" }
    ]
  },
  about: {
    title: "The Engineer Behind the Firewall",
    subtitle: "Architecting secure perimeters, mitigating vulnerability points, and ensuring network resiliency.",
    bioParagraphs: [
      "I am a Senior Network and Cybersecurity Engineer dedicated to securing critical infrastructures, safeguarding enterprise assets, and building network resiliency.",
      "With over a decade of hands-on experience, I specialize in designing and deploying Palo Alto Next-Generation Firewalls, cloud security architectures, and advanced endpoint security. My engineering philosophy centers on implementing rigorous Zero Trust models, ensuring continuous identity validation, and automating perimeter defenses to meet evolving threat landscapes.",
      "Whether orchestrating global VPN deployments, deploying AI-driven Cortex XDR architectures, or training the next generation of security engineers, I construct network perimeters that are scalable, transparent, and absolutely secure."
    ],
    locationNode: "Dallas, TX Node",
    status: "STATUS: OPERATIONAL_OK",
    stats: [
      { value: "10+", label: "Years of Experience", sub: "Enterprise & Critical Infrastructure", icon: "Server" },
      { value: "3", label: "Certification Families", sub: "Palo Alto, Cisco, Microsoft Solutions", icon: "Shield" },
      { value: "2", label: "Industries Served", sub: "High-volume Toll systems & MSP services", icon: "Layers" },
      { value: "1", label: "Core Mission", sub: "Zero Trust verification across all layers", icon: "Activity" }
    ]
  },
  skills: SKILL_CATEGORIES,
  certifications: CERTIFICATIONS,
  experiences: EXPERIENCES,
  projects: PROJECTS,
  education: EDUCATION_ITEMS,
  contact: {
    title: "Initiate Secure Connection",
    subtitle: "Available for enterprise engineering projects, infrastructure auditing, SASE designs, and full-time cybersecurity leadership roles.",
    email: "oloritemi@yahoo.co.uk",
    phone: "214-499-1461",
    linkedin: "https://www.linkedin.com/in/gbenga-owadokun-aws-ccna-cnss-network-security-engineer",
    location: "Dallas, TX Node"
  }
};

export async function getPortfolioData(): Promise<PortfolioData> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (url && token) {
    try {
      const res = await fetch(`${url}/get/portfolio_data`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store"
      });
      const val = await res.json();
      if (val.result) {
        return typeof val.result === "string" ? JSON.parse(val.result) : val.result;
      }
    } catch (error) {
      console.error("Error reading portfolio data from Vercel KV:", error);
    }
  }

  // Fallback to local file for development environment
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error("Error reading portfolio data from local file:", error);
  }
  return defaultPortfolioData;
}

export async function savePortfolioData(data: PortfolioData): Promise<boolean> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (url && token) {
    try {
      const res = await fetch(`${url}/set/portfolio_data`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      const response = await res.json();
      return response.result === "OK";
    } catch (error) {
      console.error("Error writing portfolio data to Vercel KV:", error);
      return false;
    }
  }

  // Fallback to local file for development environment
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing portfolio data to local file:", error);
    return false;
  }
}
