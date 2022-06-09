const PlayerInputGroup = (playerId) => {
  return `
    <div class="PlayersForm__player-input-group" id="player-${playerId}-input-group">
    <h3>Player ${playerId}</h3>
    <label>
      Name
      <input type="text" class="PlayersForm__player-input-name"/>
    </label>
    <label>
      Rank
      <select class="PlayersForm__player-input-rank">
        <option value="BRONZE">Bronze</option>
        <option value="SILVER">Silver</option>
        <option value="GOLD">Gold</option>
        <option value="PLAT">Plat</option>
        <option value="DIAMOND">Diamond</option>
        <option value="MASTERS">Masters</option>
        <option value="GRANDMASTERS">Grandmasters</option>
        <option value="CHALLENGER">Challenger</option>
      </select>
    </label>
    <label>
      Primary Role
      <select class="PlayersForm__player-input-primary-role">
        <option value="TOP">Top</option>
        <option value="JUNGLE">Jungle</option>
        <option value="MID">Mid</option>
        <option value="BOT">Bot</option>
        <option value="SUPPORT">Support</option>
        <option value="FILL">Fill</option>
      </select>
    </label>
    <label>
      Secondary Role
      <select class="PlayersForm__player-input-secondary-role">
        <option value="TOP">Top</option>
        <option value="JUNGLE">Jungle</option>
        <option value="MID">Mid</option>
        <option value="BOT">Bot</option>
        <option value="SUPPORt">Support</option>
      </select>
    </label>
  </div>
  `
}

const TeamsTable = (teamOne, teamTwo) => {
  let ret = `
    <h3>Team 1 (${teamOne.teamValue}):</h3>
    <table>
  `
  Object.entries(teamOne).forEach(([role, player]) => {
    if (role === "teamValue")
      return;
    if (!player) {
      ret += `
        <tr>
          <td>${role}</td>
          <td>None</td>
          <td>N/A</td>
        </tr>
      `
    } else 
      ret += `
        <tr>
          <td>${role}</td>
          <td>${player.name}</td>
          <td>${player.rank}</td>
        </tr>
      `;
  });

  ret += `
    </table>
    <h3>Team 2 (${teamTwo.teamValue}):</h3>
    <table>
  `

  Object.entries(teamTwo).forEach(([role, player]) => {
    if (role === "teamValue")
      return;
    if (!player) {
      ret += `
        <tr>
          <td>${role}</td>
          <td>None</td>
          <td>N/A</td>
        </tr>
      `
    } else 
      ret += `
        <tr>
          <td>${role}</td>
          <td>${player.name}</td>
          <td>${player.rank}</td>
        </tr>
      `;
  });

  ret += "</table>"
  return ret;
};

const teamsTablesWrapper = document.getElementById("team-tables-wrapper");
const playersForm = document.getElementById("players-form");
const playerInputGroups = playersForm.querySelector(".PlayersForm__player-input-groups");

// render player input groups
for (let i = 1; i <= 10; i++)
  playerInputGroups.innerHTML += PlayerInputGroup(i);

const generateTeams = (players) => {
  players = assignPlayerRankValues(players);
  players = sortPlayersByRankValue(players);
  const { teamOne, teamTwo } = generateTeamsByRole(players);
  const { balancedTeamOne, balancedTeamTwo } = balanceTeamsByRank(
    teamOne,
    teamTwo
  );

  // render teams tables
  const teamsHTML = TeamsTable(balancedTeamOne, balancedTeamTwo);
  teamsTablesWrapper.innerHTML = teamsHTML;
}

const handlePlayersFormSubmit = (e) => {
  e.preventDefault();
  const playerInputGroups = document.querySelectorAll(".PlayersForm__player-input-group");
  const playersData = [];

  playerInputGroups.forEach((inputGroup) => {
    const nameEl = inputGroup.querySelector(".PlayersForm__player-input-name");
    const rankEl = inputGroup.querySelector(".PlayersForm__player-input-rank");
    const primaryRoleEl = inputGroup.querySelector(".PlayersForm__player-input-primary-role");
    const secondaryRoleEl = inputGroup.querySelector(".PlayersForm__player-input-secondary-role");
    
    const name = nameEl.value;
    const rank = rankEl.value;
    const primaryRole = primaryRoleEl.value;
    const secondaryRole = secondaryRoleEl.value;

    playersData.push({
      name,
      rank,
      primaryRole,
      secondaryRole
    })
  });
  generateTeams(playersData);
}

// add event listeners
playersForm.addEventListener("submit", handlePlayersFormSubmit)