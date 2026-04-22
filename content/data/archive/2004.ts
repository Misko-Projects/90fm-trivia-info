import type { ArchiveYear } from "@/lib/types";

const archive: ArchiveYear = {
  year: 2004,
  contestNumber: 35,
  title: "Trivia 35",
  dates: { end: "2004-04-19" },
  totalTeams: 442,
  winner: "Knights of Neek",
  topFinishers: [
    { rank: 1, team: "Knights of Neek", score: 9560 },
    { rank: 2, team: "The Deadhead is All Wet - Network Psis", score: 8620 },
    { rank: 3, team: "Graduates of a Lesser God", score: 8085 },
    { rank: 4, team: "Tin Man", score: 8025 },
    { rank: 5, team: "Basementality: Return of the Kinks", score: 7455 },
    { rank: 6, team: "Beer Eye for the Caker Guy", score: 7025 },
    { rank: 7, team: "The League of Extraordinary Beerpigs", score: 6860 },
    { rank: 8, team: "Yaargh! Curse of the Pearl Necklace!", score: 6795 },
    { rank: 9, team: "Norms Stool: Feel It Ooze or Is It Oz", score: 6750 },
    { rank: 10, team: "WRTM: Thanks for the Memory", score: 6740 },
  ],
  notes:
    "Hour 54 (final) standings dated Monday, April 19, 2004. Top 10 extracted from the inner scores frame at scores35.htm.",
  sourceUrl: "https://90fmtrivia.org/trivia35scores.htm",
};

export default archive;
