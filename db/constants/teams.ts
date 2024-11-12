import { MLB_TEAMS } from './teams';
import { pgEnum  } from 'drizzle-orm/pg-core';

// export type MLB_TEAM =
//   | "ARI" // Arizona Diamondbacks
//   | "ATL" // Atlanta Braves
//   | "BAL" // Baltimore Orioles
//   | "BOS" // Boston Red Sox
//   | "CHC" // Chicago Cubs
//   | "CHW" // Chicago White Sox
//   | "CIN" // Cincinnati Reds
//   | "CLE" // Cleveland Guardians
//   | "COL" // Colorado Rockies
//   | "DET" // Detroit Tigers
//   | "HOU" // Houston Astros
//   | "KC"  // Kansas City Royals
//   | "LAA" // Los Angeles Angels
//   | "LAD" // Los Angeles Dodgers
//   | "MIA" // Miami Marlins
//   | "MIL" // Milwaukee Brewers
//   | "MIN" // Minnesota Twins
//   | "NYM" // New York Mets
//   | "NYY" // New York Yankees
//   | "OAK" // Oakland Athletics
//   | "PHI" // Philadelphia Phillies
//   | "PIT" // Pittsburgh Pirates
//   | "SD"  // San Diego Padres
//   | "SF"  // San Francisco Giants
//   | "SEA" // Seattle Mariners
//   | "STL" // St. Louis Cardinals
//   | "TB"  // Tampa Bay Rays
//   | "TEX" // Texas Rangers
//   | "TOR" // Toronto Blue Jays
//   | "WSH"; // Washington Nationals

export const MLB_TEAMS = [
    "ARI", // Arizona Diamondbacks
    "ATL", // Atlanta Braves
    "BAL", // Baltimore Orioles
    "BOS", // Boston Red Sox
    "CHC", // Chicago Cubs
    "CHW", // Chicago White Sox
    "CIN", // Cincinnati Reds
    "CLE", // Cleveland Guardians
    "COL", // Colorado Rockies
    "DET", // Detroit Tigers
    "HOU", // Houston Astros
    "KC",  // Kansas City Royals
    "LAA", // Los Angeles Angels
    "LAD", // Los Angeles Dodgers
    "MIA", // Miami Marlins
    "MIL", // Milwaukee Brewers
    "MIN", // Minnesota Twins
    "NYM", // New York Mets
    "NYY", // New York Yankees
    "OAK", // Oakland Athletics
    "PHI", // Philadelphia Phillies
    "PIT", // Pittsburgh Pirates
    "SD",  // San Diego Padres
    "SF",  // San Francisco Giants
    "SEA", // Seattle Mariners
    "STL", // St. Louis Cardinals
    "TB",  // Tampa Bay Rays
    "TEX", // Texas Rangers
    "TOR", // Toronto Blue Jays
    "WSH"  // Washington Nationals
  ] as const;

export const MLBTeamsEnum = pgEnum("mlb_teams", MLB_TEAMS);

// export type NBA_TEAM =
//   | "ATL" // Atlanta Hawks
//   | "BKN" // Brooklyn Nets
//   | "BOS" // Boston Celtics
//   | "CHA" // Charlotte Hornets
//   | "CHI" // Chicago Bulls
//   | "CLE" // Cleveland Cavaliers
//   | "DAL" // Dallas Mavericks
//   | "DEN" // Denver Nuggets
//   | "DET" // Detroit Pistons
//   | "GSW" // Golden State Warriors
//   | "HOU" // Houston Rockets
//   | "IND" // Indiana Pacers
//   | "LAC" // Los Angeles Clippers
//   | "LAL" // Los Angeles Lakers
//   | "MEM" // Memphis Grizzlies
//   | "MIA" // Miami Heat
//   | "MIL" // Milwaukee Bucks
//   | "MIN" // Minnesota Timberwolves
//   | "NOP" // New Orleans Pelicans
//   | "NYK" // New York Knicks
//   | "OKC" // Oklahoma City Thunder
//   | "ORL" // Orlando Magic
//   | "PHI" // Philadelphia 76ers
//   | "PHX" // Phoenix Suns
//   | "POR" // Portland Trail Blazers
//   | "SAC" // Sacramento Kings
//   | "SAS" // San Antonio Spurs
//   | "TOR" // Toronto Raptors
//   | "UTA" // Utah Jazz
//   | "WAS"; // Washington Wizards

export const NBA_TEAMS = [
    "ATL", // Atlanta Hawks
    "BKN", // Brooklyn Nets
    "BOS", // Boston Celtics
    "CHA", // Charlotte Hornets
    "CHI", // Chicago Bulls
    "CLE", // Cleveland Cavaliers
    "DAL", // Dallas Mavericks
    "DEN", // Denver Nuggets
    "DET", // Detroit Pistons
    "GSW", // Golden State Warriors
    "HOU", // Houston Rockets
    "IND", // Indiana Pacers
    "LAC", // Los Angeles Clippers
    "LAL", // Los Angeles Lakers
    "MEM", // Memphis Grizzlies
    "MIA", // Miami Heat
    "MIL", // Milwaukee Bucks
    "MIN", // Minnesota Timberwolves
    "NOP", // New Orleans Pelicans
    "NYK", // New York Knicks
    "OKC", // Oklahoma City Thunder
    "ORL", // Orlando Magic
    "PHI", // Philadelphia 76ers
    "PHX", // Phoenix Suns
    "POR", // Portland Trail Blazers
    "SAC", // Sacramento Kings
    "SAS", // San Antonio Spurs
    "TOR", // Toronto Raptors
    "UTA", // Utah Jazz
    "WAS"  // Washington Wizards
  ] as const;

  export const NBATeamsEnum = pgEnum("nba_teams", NBA_TEAMS);

//   export type NFL_TEAM =
//   | "ARI" // Arizona Cardinals
//   | "ATL" // Atlanta Falcons
//   | "BAL" // Baltimore Ravens
//   | "BUF" // Buffalo Bills
//   | "CAR" // Carolina Panthers
//   | "CHI" // Chicago Bears
//   | "CIN" // Cincinnati Bengals
//   | "CLE" // Cleveland Browns
//   | "DAL" // Dallas Cowboys
//   | "DEN" // Denver Broncos
//   | "DET" // Detroit Lions
//   | "GB"  // Green Bay Packers
//   | "HOU" // Houston Texans
//   | "IND" // Indianapolis Colts
//   | "JAX" // Jacksonville Jaguars
//   | "KC"  // Kansas City Chiefs
//   | "LAC" // Los Angeles Chargers
//   | "LAR" // Los Angeles Rams
//   | "LV"  // Las Vegas Raiders
//   | "MIA" // Miami Dolphins
//   | "MIN" // Minnesota Vikings
//   | "NE"  // New England Patriots
//   | "NO"  // New Orleans Saints
//   | "NYG" // New York Giants
//   | "NYJ" // New York Jets
//   | "PHI" // Philadelphia Eagles
//   | "PIT" // Pittsburgh Steelers
//   | "SEA" // Seattle Seahawks
//   | "SF"  // San Francisco 49ers
//   | "TB"  // Tampa Bay Buccaneers
//   | "TEN" // Tennessee Titans
//   | "WAS"; // Washington Commanders

export const NFL_TEAMS = [
    "ARI", // Arizona Cardinals
    "ATL", // Atlanta Falcons
    "BAL", // Baltimore Ravens
    "BUF", // Buffalo Bills
    "CAR", // Carolina Panthers
    "CHI", // Chicago Bears
    "CIN", // Cincinnati Bengals
    "CLE", // Cleveland Browns
    "DAL", // Dallas Cowboys
    "DEN", // Denver Broncos
    "DET", // Detroit Lions
    "GB",  // Green Bay Packers
    "HOU", // Houston Texans
    "IND", // Indianapolis Colts
    "JAX", // Jacksonville Jaguars
    "KC",  // Kansas City Chiefs
    "LAC", // Los Angeles Chargers
    "LAR", // Los Angeles Rams
    "LV",  // Las Vegas Raiders
    "MIA", // Miami Dolphins
    "MIN", // Minnesota Vikings
    "NE",  // New England Patriots
    "NO",  // New Orleans Saints
    "NYG", // New York Giants
    "NYJ", // New York Jets
    "PHI", // Philadelphia Eagles
    "PIT", // Pittsburgh Steelers
    "SEA", // Seattle Seahawks
    "SF",  // San Francisco 49ers
    "TB",  // Tampa Bay Buccaneers
    "TEN", // Tennessee Titans
    "WAS"  // Washington Commanders
  ] as const;

  export const NFLTeamsEnum = pgEnum("nfl_teams", NFL_TEAMS);

// export type NHL_TEAM =
//   | "ANA" // Anaheim Ducks
//   | "ARI" // Arizona Coyotes
//   | "BOS" // Boston Bruins
//   | "BUF" // Buffalo Sabres
//   | "CGY" // Calgary Flames
//   | "CAR" // Carolina Hurricanes
//   | "CHI" // Chicago Blackhawks
//   | "COL" // Colorado Avalanche
//   | "CBJ" // Columbus Blue Jackets
//   | "DAL" // Dallas Stars
//   | "DET" // Detroit Red Wings
//   | "EDM" // Edmonton Oilers
//   | "FLA" // Florida Panthers
//   | "LAK" // Los Angeles Kings
//   | "MIN" // Minnesota Wild
//   | "MTL" // Montreal Canadiens
//   | "NSH" // Nashville Predators
//   | "NJD" // New Jersey Devils
//   | "NYI" // New York Islanders
//   | "NYR" // New York Rangers
//   | "OTT" // Ottawa Senators
//   | "PHI" // Philadelphia Flyers
//   | "PIT" // Pittsburgh Penguins
//   | "SJS" // San Jose Sharks
//   | "SEA" // Seattle Kraken
//   | "STL" // St. Louis Blues
//   | "TBL" // Tampa Bay Lightning
//   | "TOR" // Toronto Maple Leafs
//   | "VAN" // Vancouver Canucks
//   | "VGK" // Vegas Golden Knights
//   | "WSH" // Washington Capitals
//   | "WPG"; // Winnipeg Jets

export const NHL_TEAMS = [
    "ANA", // Anaheim Ducks
    "ARI", // Arizona Coyotes
    "BOS", // Boston Bruins
    "BUF", // Buffalo Sabres
    "CGY", // Calgary Flames
    "CAR", // Carolina Hurricanes
    "CHI", // Chicago Blackhawks
    "COL", // Colorado Avalanche
    "CBJ", // Columbus Blue Jackets
    "DAL", // Dallas Stars
    "DET", // Detroit Red Wings
    "EDM", // Edmonton Oilers
    "FLA", // Florida Panthers
    "LAK", // Los Angeles Kings
    "MIN", // Minnesota Wild
    "MTL", // Montreal Canadiens
    "NSH", // Nashville Predators
    "NJD", // New Jersey Devils
    "NYI", // New York Islanders
    "NYR", // New York Rangers
    "OTT", // Ottawa Senators
    "PHI", // Philadelphia Flyers
    "PIT", // Pittsburgh Penguins
    "SJS", // San Jose Sharks
    "SEA", // Seattle Kraken
    "STL", // St. Louis Blues
    "TBL", // Tampa Bay Lightning
    "TOR", // Toronto Maple Leafs
    "VAN", // Vancouver Canucks
    "VGK", // Vegas Golden Knights
    "WSH", // Washington Capitals
    "WPG"  // Winnipeg Jets
  ] as const;

  export const NHLTeamsEnum = pgEnum("nhl_teams", NHL_TEAMS);

  export type AnyTeamType = typeof MLBTeamsEnum | typeof NBATeamsEnum | typeof NFLTeamsEnum | typeof NHLTeamsEnum;