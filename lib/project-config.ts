export const projectConfig = {
  gameUrl: "https://cryptominespacexv2.netlify.app/",
  farmUrl: "https://cryptominespacex.netlify.app/",
  tokenUrl: "https://pump.fun/coin/55VGPTvSADFzKcpk5utNAZhpTyrzvJtTVArNh3Fcpump?share",
  community: { x: "", discord: "", telegram: "", github: "" },
} as const

export const roadmap = [
  { phase: "01", title: "Foundation", status: "Planned", items: ["Document the current state", "Review the frontend and existing features", "Identify priority technical issues", "Prepare a public development plan"] },
  { phase: "02", title: "Game revival", status: "Planned", items: ["Improve design and player experience", "Repair or update verified features", "Improve documentation and community communication"] },
  { phase: "03", title: "Multichain research", status: "Planned", items: ["Research Solana architecture", "Design independent adapters and tests", "Evaluate security, costs and maintenance"] },
  { phase: "04", title: "Expansion", status: "Planned", items: ["Evaluate a Solana deployment", "Add new features as resources allow", "Explore community events and sponsors"] },
] as const
