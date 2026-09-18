
// =====================================================
// QUICK DUEL - game.js
// BALANCE V20 • Chimera Bleed nerf • 2026-09-17
// =====================================================

const CHARACTER_DATA = {
  fighter: {
    name: "Fighter", icon: "⚔️", hp: 9, attack: 1, skillCost: 2,
    description: "A balanced frontline fighter with reliable offense and defense.",
    skillName: "Guarded Strike",
    skillDescription: "Cost 2 Charge. Deal 2.5 damage to one enemy and gain 1 permanent Shield.",
    passiveName: "Last Stand",
    passiveDescription: "When HP is below 4, damaging attacks deal +1 damage. At 1 HP or lower, the bonus becomes +2 instead. The first time Fighter would be defeated by reaching 0 HP, Fighter remains at 1 HP instead and becomes invincible until Fighter's next turn."
  },

  blastMage: {
    name: "Blast Mage", icon: "💥", hp: 8, attack: 1, skillCost: 2,
    description: "A fragile mage whose Arcane Blast becomes stronger when more Charge is invested.",
    skillName: "Arcane Blast",
    skillDescription: "Spend 2+ Charge. At 2 Charge, deal 2.5 damage to the main target and 1 damage to the other enemy. Each additional Charge adds +1 main-target damage and +0.5 secondary-target damage. After Arcane Blast, gain +0.5 Max HP and restore 1 HP.",
    passiveName: "Arcane Flow",
    passiveDescription: "Starts with 1 Charge. While HP is above 3, gain 1 Charge every 3 completed rounds."
  },

  tank: {
    name: "Tank", icon: "🛡️", hp: 13, attack: 1, skillCost: 2,
    description: "A massive defensive character who protects the teammate by taking part of their damage.",
    skillName: "Guardian Shield",
    skillDescription: "Cost 2 Charge. Give the teammate 3.5 Shield for two rounds, or give Tank 2.5 Shield for two rounds. Recasting Guardian Shield on the same target refreshes it instead of stacking.",
    passiveName: "Guardian's Burden",
    passiveDescription: "Whenever the teammate would take HP damage, Tank redirects up to 0.5 of that damage to himself. Redirected damage ignores Tank's Shield. Every 3 completed rounds, Tank gains +0.5 Max HP, restores 0.5 HP, and gains 0.5 permanent Shield."
  },

  cureMage: {
    name: "Cure Mage", icon: "💚", hp: 7.5, attack: 1, skillCost: 2,
    description: "A healing specialist who turns repeated healing into protection and offensive momentum.",
    skillName: "Restoration Mark",
    skillDescription: "Spend 2+ Charge on any living team member. Immediately heal 2 HP and place a Restoration Mark that heals once at the end of the next round for 1 HP. If the target has 2 HP or less before the immediate heal, that first heal gains +1.5. Each extra Charge adds +1 to the immediate heal and +0.5 to the Mark heal. Restoration Mark does not stack; recasting refreshes it.",
    passiveName: "Emergency Blessing / Overheal Barrier / Healing Resonance",
    passiveDescription: "The first time Cure Mage falls below 3 HP while alive, Cure Mage and the living teammate each recover 3 HP, and Cure Mage gains 1 Charge. Healing caused by Cure Mage converts overheal beyond the first wasted point into temporary Shield. Every 3 Cure Mage healing events received by the teammate, that teammate's next damaging action gains +1 damage."
  },

  assassin: {
    name: "Assassin", icon: "🗡️", hp: 7, attack: 1.5, skillCost: 4,
    description: "A fragile attacker with high single-target burst damage.",
    skillName: "Execution",
    skillDescription: "Cost 4 Charge. Deal 6.5 damage to one enemy and become invincible until Assassin's next turn. If the target survives, refund 2 Charge.",
    passiveName: "Relentless Hunt",
    passiveDescription: "Starts with 0 Charge. Normal Attack deals 2.5 damage above 6 HP, 1.5 damage above 4 HP through 6 HP, and 1 damage at 4 HP or lower. Once per battle, Assassin reduces one incoming damage instance by 1.5. All healing received by Assassin is permanently reduced by 0.5. Execution refunds 2 Charge whenever its target survives. While Assassin is below 4 HP, Execution deals 2 less damage."
  },

  king: {
    name: "King", icon: "👑", hp: 9, attack: 1, skillCost: 2,
    description: "A control-oriented leader whose presence strengthens the teammate.",
    skillName: "Royal Command",
    skillDescription: "Cost 2 Charge. Deal 2.5 total damage to one chosen main target, stun that target for its next action if it survives, and give King and the living teammate 0.5 permanent Shield each.",
    passiveName: "Royal Presence",
    passiveDescription: "At battle start, King's teammate permanently gains +1 Max HP and +1 HP. While King remains alive, the teammate gains 1 Shield every 3 rounds, lasting for one round."
  },

  puppeteer: {
    name: "Puppeteer", icon: "🎭", hp: 7, attack: 1.5, skillCost: 0, puppetChargeCost: 3,
    description: "A fragile resource character who grows stronger by manufacturing Puppets.",
    skillName: "Puppet Workshop",
    skillDescription: "Spend 3 Charge to create 1 regular Puppet. A regular Puppet can distribute 5 total damage between enemies, or be converted into a Life Puppet that revives a team member once at 50% Max HP. An attached Life Puppet expires after two rounds if unused.",
    passiveName: "Puppet Mastery",
    passiveDescription: "Starts with 2 Charge and no Puppets. Every newly created regular Puppet grants +1 Max HP and restores 1 HP."
  },

  angel: {
    name: "Angel", icon: "👼", hp: 7, attack: 1, skillCost: 1,
    description: "A flexible support who redistributes HP, Charge, protection, and offensive power.",
    skillName: "Divine Blessing",
    skillDescription: "Transfer any amount of Angel's Charge to the teammate. Empower costs 2+ Charge: 2 Charge gives +1 damage to the teammate's next damaging action and 1 Shield for two rounds; each extra Charge adds +0.5 damage and +0.5 Shield. Or spend 1 Charge to sacrifice up to 2 of Angel's HP and Max HP; the teammate receives the sacrificed amount minus 0.5 as HP.",
    passiveName: "Angel's Bless",
    passiveDescription: "Starts with 2 Charge. The first defeated member of Angel's team revives with exactly 3 HP, with no revival Shield. If Angel revives the teammate, Angel loses half of current HP, rounded down to the nearest 0.5. The first time Angel falls below 2 HP while alive, her next damaging action gains +1 damage."
  },

  devil: {
    name: "Devil", icon: "😈", hp: 10, attack: 1, skillCost: 0,
    description: "A high-risk character who drains allies to fight against his own gradual decay.",
    skillName: "Blood Pact",
    skillDescription: "Blood Drain: drain up to 5 HP from the teammate. Devil permanently gains Max HP equal to the amount drained and restores the same amount of HP. The teammate gains Shield equal to drained HP + 1 for two rounds. Berserk: spend 2 Charge to enter Berserk for two rounds, immediately distribute 3 total damage among living enemies, stun the main target for 1 action if it survives, restore 1.5 HP, and gain 1.5 permanent Shield. Skills cannot be used during Berserk.",
    passiveName: "Infernal Decay",
    passiveDescription: "At the end of every round, Devil loses 0.5 HP and 0.5 Max HP. During Berserk, Devil instead loses 1 HP while Max HP still falls by 0.5. Every 3 completed rounds, Devil gains 1 Charge. Below 7 HP, normal attacks gain +1 damage. During Berserk, the next normal attack gains another +1.5; if it leaves the target alive below 3 HP, Devil restores 1.5 HP. When Devil starts a normal attack at 3 HP or lower, Devil restores 1 HP after the attack. When Berserk ends, Devil restores 0.5 HP and is stunned for the next turn."
  },

  joker: {
    name: "Joker", icon: "🃏", hp: 7, attack: 1, skillCost: 0,
    description: "A resource-control specialist who converts Charge into Juggling Balls for damage, stuns, and team support.",
    skillName: "Juggling Trick",
    skillDescription: "Create any number of Juggling Balls by spending the same amount of Charge, or throw Balls. 1 Stun Ball: stun the target for 1 action but deal no damage; or 1 Damage Ball: deal 2 damage. 2 Balls: give a living ally 1 Charge. Joker may throw at most 2 ordinary Balls in one action. After a Stun Ball is thrown, Stun Ball has a 1-round cooldown.",
    passiveName: "Juggling Show",
    passiveDescription: "Starts with 1 Juggling Ball and 1 Charge. Every 2 completed rounds, gain 1 Charge. Every 4 completed rounds, gain 1 Juggling Ball. At round end, if Charge is at least 4, automatically spend 1 Charge to create 1 Ball. Every 5 ordinary Balls thrown gives Joker 2 Shield for one round and the living teammate 0.5 Shield for one round; this no longer grants invincibility."
  },

  vampire: {
    name: "Vampire", icon: "🧛", hp: 5, attack: 0.5, skillCost: 0,
    description: "A late-game scaling fighter who drains the teammate for growth, heals through attacks, and becomes much stronger after fighting alone.",
    skillName: "Blood Drain",
    skillDescription: "Blood Drain (0C): drain up to 3 HP from the living teammate without reducing the teammate's Max HP. The drain amount is not limited by Vampire's remaining Max HP growth room; Vampire restores the drained amount and gains the same amount of Max HP, both capped by the 13 Max HP limit. Blood Recovery: spend 2 Charge to restore 2 HP; after the teammate is defeated, this costs only 1 Charge.",
    passiveName: "Crimson Hunger",
    passiveDescription: "Max HP cannot exceed 13. Every 5 completed rounds gain 1 Charge. Every 3 completed rounds lose 2 HP and 1 Max HP, but this decay cannot directly defeat Vampire. While the teammate lives, incoming damage is reduced by 0.5. When the teammate is fully defeated, Vampire immediately restores 2 HP. A normal attack that deals HP damage grants +0.5 Max HP and restores 0.5 HP; after the teammate is defeated, it restores 1.5 HP instead and normal attacks deal +1 damage. If the living teammate ends 5 consecutive rounds at 1 HP or lower, Death Mark triggers at round end: the teammate directly loses 1.5 HP and the counter resets. When current HP is above 9, each full HP above 9 adds +0.5 normal-attack damage. The first time Vampire is defeated: if the teammate is alive, drain up to 3 HP from that teammate (leaving at least 0.5 HP) and revive with 3 HP; if the teammate is already defeated, revive with 1 HP, become invincible for the rest of the current round, and the next normal attack gains +2.5 damage and +1 lifesteal."
  },

  anubis: {
    name: "Anubis", icon: "⚖️", hp: 8, attack: 0, skillCost: 0,
    description: "A self-weighing executioner who builds one shared Weight resource, binds it to a chosen enemy, and turns accumulated judgment into direct HP loss.",
    skillName: "Scales of the Duat",
    skillDescription: "Bind the Scales (0C): choose one living enemy to bind to Anubis's current Weight. Weigh the Heart (1C): gain 2 Weight, then directly lose 0.5 HP. Soul Sentence (2C): only usable when Weight is greater than half of the bound target's current Max HP; that target directly loses HP equal to the current Weight, ignoring Shield. Normally, Anubis then directly loses half of current HP, gains 1 Judgment Shield for two rounds, is stunned for 1 action, and Weight resets to 0. If Soul Sentence defeats the target, including when that defeat immediately triggers a revival effect, Anubis keeps all Weight, takes no self HP loss, and is not stunned; the Judgment Shield is still gained.",
    passiveName: "Burden of the Heart",
    passiveDescription: "Starts with 0 Weight. Anubis's normal Attack deals 0 damage and gives Anubis +1 Weight. Every 3 completed rounds Anubis gains 1 Weight. Every 5 completed rounds Anubis gains 1 Charge. Whenever either enemy gains Charge, Anubis gains +1 Weight. Enemy Defend reduces Weight by 1. Each enemy separately tracks actual HP restored; every cumulative 2 HP restored by that enemy reduces Weight by 1. Every cumulative 4 actual HP damage Anubis's team receives from enemies reduces Weight by 1, but this damage rule can reduce Weight at most once per round. Defend, healing, and team-damage reductions can stack."
  },

  chimera: {
    name: "Chimera", icon: "🐺", hp: 8, attack: 1.5, skillCost: 0,
    description: "A three-form adaptive fighter that trades raw consistency for flexible offense, defense, control, and a one-time spectral revival.",
    skillName: "Metamorphosis",
    skillDescription: "Open the Chimera menu. Direct Shift switches to a different form for 0 Charge and does not trigger the new form's entry effect. Empowered Shift costs 1 Charge and triggers the new form's entry effect. Beast normal Attack: 1.5 damage. Beast — Rend (2C): deal 2 damage and apply 1 Bleed. Shell normal Attack: 0.5 damage. Shell — Shelter Repair (2C): heal a living ally or self for 2.5 HP and give 1 Shield for one round. Spirit normal Attack: 0 damage. Spirit — Spirit Drain (2C): remove up to 2 total Charge from enemies, gain 1 Charge, then return to Beast without triggering Beast entry.<br><br><strong>Bleed Talent:</strong> Each Bleed stack independently causes 0.5 direct HP loss at the end of the round for 2 round-end ticks. Bleed can stack, and each stack tracks its own duration. A Bleed applied during a round can trigger at that same round end.",
    passiveName: "Molting Instinct",
    passiveDescription: "Starts with 1 Charge in Beast form without an entry effect. Beast normal Attack deals 1.5; Shell deals 0.5; Spirit deals 0. Every 3 completed rounds gain 1 Charge. Beast entry applies 1 Bleed to an enemy. Shell entry refreshes 2 Shield for two rounds. Spirit entry stuns one enemy for its next normal action. Actively entering Spirit has a 2-round cooldown: enter on Round 1, unavailable on Rounds 2-3, ready on Round 4. The first time Chimera is defeated, revive with 2 HP, gain 1 Charge, automatically enter Spirit, and stun the next living enemy in turn order."
  },

  prophet: {
    name: "Prophet", icon: "🔮", hp: 8, attack: 1, skillCost: 1,
    description: "A mind-game controller who secretly predicts an enemy's next-round command and punishes predictable play.",
    skillName: "Prophecy",
    skillDescription: "Each prediction costs 1 Charge. During one Skill action, Prophet may secretly predict one enemy and then choose whether to also predict another living enemy. For each chosen target, predict Attack, Defend, Charge, Heal, or Skill on that target's next scheduled turn (this round if it has not acted yet, otherwise next round). A correct prediction immediately cancels that action and makes the target directly lose one-third of its Max HP, rounded up so three successful Prophecies are enough to defeat a full-HP target, ignoring Shield. If every Prophecy resolving in a round succeeds, Prophet gains +1 HP and +1 Max HP. The battle log only states that Prophet completed a prophecy and never reveals the selected target(s).",
    passiveName: "Fate's Price",
    passiveDescription: "Gain 1 Charge every 2 completed rounds. Each failed Prophecy adds 1 Failure. At 3 Failures, Prophet loses 1 HP and 1 Max HP, is stunned for 1 action, and resets Failures to 0. Prophecies expire after their predicted round; an enemy that never acts does not count as a failed prediction."
  }
};


// =====================================================
// STATE
// =====================================================

let gameMode = "pvp";
let selectingTeam = "A";
let selectedA = [];
let selectedB = [];
let teamA = [];
let teamB = [];
let turnOrder = [];
let currentTurn = 0;
let round = 1;
let gameOver = false;

// BP / draft state for Local PvP and VS AI.
let banA = "";
let banB = "";
let bpStep = 0;
let pendingBpChoice = "";

const BP_ORDER = [
  { type: "ban", team: "A", label: "A BAN" },
  { type: "ban", team: "B", label: "B BAN" },
  { type: "pick", team: "A", slot: 1, label: "A1" },
  { type: "pick", team: "B", slot: 1, label: "B1" },
  { type: "pick", team: "B", slot: 2, label: "B2" },
  { type: "pick", team: "A", slot: 2, label: "A2" }
];

// Current-turn-only UI navigation.
// It is reset whenever a new character begins acting.
let actionStepStack = [];
let actionStepOwner = null;

// Online battle synchronization state.
// Firebase owns the shared room state; game.js keeps the existing battle engine
// and publishes a JSON snapshot only at stable turn boundaries.
let onlinePlayerSide = null;
let onlineStateChangeHandler = null;
let onlineApplyingSnapshot = false;
let battleLogEntries = [];

// Committed-action context. Used by Anubis attack counting and Prophet predictions.
let pendingCommandType = null;
let activeActionActor = null;
let activeActionCommandType = null;
let pendingAiSkillActor = null;

// Vampire can gain an immediate extra action when reviving after the teammate is already defeated.
let immediateTurnBattleId = null;
let immediateTurnResumeIndex = null;
let immediateTurnActive = false;


// =====================================================
// HTML REFERENCES
// =====================================================

const characterGrid = document.getElementById("character-grid");
const selectionTitle = document.getElementById("selection-title");
const confirmTeamButton = document.getElementById("confirm-team");
const contextPanel = document.getElementById("context-panel");
const pvpModeButton = document.getElementById("pvp-mode-button");
const aiModeButton = document.getElementById("ai-mode-button");
const backButton = document.getElementById("back-button");

pvpModeButton.addEventListener("click", () => setGameMode("pvp"));
aiModeButton.addEventListener("click", () => setGameMode("ai"));


// =====================================================
// MODE / CHARACTER SELECTION — BP MODE
// =====================================================

function resetBpSelection() {
  selectedA = [];
  selectedB = [];
  banA = "";
  banB = "";
  bpStep = 0;
  pendingBpChoice = "";
  selectingTeam = "A";
}

function getCurrentBpStep() {
  return BP_ORDER[bpStep] || null;
}

function getAllBpUnavailableKeys() {
  return [
    banA,
    banB,
    selectedA[0],
    selectedB[0],
    selectedA[1],
    selectedB[1]
  ].filter(Boolean);
}

function getBpStepTitle(step) {
  if (!step) return "BP COMPLETE";

  if (step.type === "ban") {
    return `TEAM ${step.team} — BAN 1 CHARACTER`;
  }

  return `${step.label} — PICK 1 CHARACTER`;
}

function setGameMode(mode) {
  gameMode = mode;
  resetBpSelection();

  pvpModeButton.classList.toggle("active", mode === "pvp");
  aiModeButton.classList.toggle("active", mode === "ai");

  processAutomaticAiBpSteps();
  renderCharacterSelection();
}

function renderCharacterSelection() {
  characterGrid.innerHTML = "";

  const step = getCurrentBpStep();

  if (!step) {
    startBattle();
    return;
  }

  selectionTitle.textContent = getBpStepTitle(step);
  selectingTeam = step.team;

  const unavailable = new Set(getAllBpUnavailableKeys());

  for (const [key, character] of Object.entries(CHARACTER_DATA)) {
    const card = document.createElement("div");
    card.className = "character-select-card";

    const blocked = unavailable.has(key);

    if (pendingBpChoice === key) {
      card.classList.add("selected");
    }

    if (blocked) {
      card.classList.add("bp-unavailable");
    }

    let statusTag = "";

    if (banA === key || banB === key) {
      statusTag = `<div class="bp-status-tag">🚫 BANNED</div>`;
    } else if (
      selectedA.includes(key) ||
      selectedB.includes(key)
    ) {
      statusTag = `<div class="bp-status-tag">✓ PICKED</div>`;
    }

    const attackText =
      key === "assassin"
        ? "1–2.5"
        : key === "chimera"
          ? "0–1.5"
          : formatNumber(character.attack);

    card.innerHTML = `
      ${statusTag}
      <h2>${character.icon} ${character.name}</h2>
      <p class="stats">
        ❤️ HP ${formatNumber(character.hp)}
        &nbsp;
        ⚔️ ATK ${attackText}
      </p>
      <p>${character.description}</p>

      <div class="skill-box">
        <div class="ability-title">✨ SKILL</div>
        <strong>${character.skillName}</strong>
        <p>${character.skillDescription}</p>
      </div>

      <div class="passive-box">
        <div class="ability-title">🌟 PASSIVE</div>
        <strong>${character.passiveName}</strong>
        <p>${character.passiveDescription}</p>
      </div>
    `;

    if (!blocked) {
      card.addEventListener("click", () => toggleCharacter(key));
    }

    characterGrid.appendChild(card);
  }

  updateSelectionDisplay();
}

function toggleCharacter(key) {
  if (getAllBpUnavailableKeys().includes(key)) return;

  pendingBpChoice =
    pendingBpChoice === key
      ? ""
      : key;

  renderCharacterSelection();
}

function updateSelectionDisplay() {
  const banALabel = banA
    ? `${CHARACTER_DATA[banA].icon} ${CHARACTER_DATA[banA].name}`
    : "—";

  const banBLabel = banB
    ? `${CHARACTER_DATA[banB].icon} ${CHARACTER_DATA[banB].name}`
    : "—";

  const pickLabel = key =>
    key && CHARACTER_DATA[key]
      ? `${CHARACTER_DATA[key].icon} ${CHARACTER_DATA[key].name}`
      : "—";

  document.getElementById("team-a-selection").innerHTML = `
    🚫 Ban: ${banALabel}<br>
    A1: ${pickLabel(selectedA[0])}<br>
    A2: ${pickLabel(selectedA[1])}
  `;

  document.getElementById("team-b-selection").innerHTML = `
    🚫 Ban: ${banBLabel}<br>
    B1: ${pickLabel(selectedB[0])}<br>
    B2: ${pickLabel(selectedB[1])}
  `;

  const step = getCurrentBpStep();

  if (!step) {
    confirmTeamButton.disabled = true;
    return;
  }

  confirmTeamButton.textContent =
    step.type === "ban"
      ? `Confirm ${step.team} Ban`
      : `Confirm ${step.label}`;

  confirmTeamButton.disabled = !pendingBpChoice;
}

function pickRandomAvailableCharacter() {
  const unavailable = new Set(getAllBpUnavailableKeys());
  const available = Object.keys(CHARACTER_DATA).filter(
    key => !unavailable.has(key)
  );

  if (available.length === 0) return "";

  return available[
    Math.floor(Math.random() * available.length)
  ];
}

function commitBpChoice(step, key) {
  if (!step || !key) return false;
  if (getAllBpUnavailableKeys().includes(key)) return false;

  if (step.type === "ban") {
    if (step.team === "A") {
      banA = key;
    } else {
      banB = key;
    }
  } else if (step.team === "A") {
    selectedA[step.slot - 1] = key;
  } else {
    selectedB[step.slot - 1] = key;
  }

  bpStep++;
  pendingBpChoice = "";
  return true;
}

function processAutomaticAiBpSteps() {
  if (gameMode !== "ai") return;

  while (true) {
    const step = getCurrentBpStep();

    if (!step || step.team !== "B") break;

    const choice = pickRandomAvailableCharacter();
    if (!choice) break;

    commitBpChoice(step, choice);
  }
}

confirmTeamButton.addEventListener("click", () => {
  const step = getCurrentBpStep();

  if (!step || !pendingBpChoice) return;

  if (!commitBpChoice(step, pendingBpChoice)) {
    renderCharacterSelection();
    return;
  }

  processAutomaticAiBpSteps();

  if (!getCurrentBpStep()) {
    startBattle();
    return;
  }

  renderCharacterSelection();
});


// =====================================================
// CHARACTER INSTANCE
// =====================================================

function createCharacter(key, team, slot) {
  const data = CHARACTER_DATA[key];

  let startingCharge = 0;

  if (
    key === "blastMage" ||
    key === "joker" ||
    key === "chimera"
  ) {
    startingCharge = 1;
  }

  if (
    key === "puppeteer" ||
    key === "angel"
  ) {
    startingCharge = 2;
  }

  return {
    key, team, slot,
    battleId: `${team}${slot}`,
    baseHP: data.hp,
    name: data.name,
    icon: data.icon,
    maxHP: data.hp,
    hp: data.hp,
    attack: data.attack,
    charge: startingCharge,
    alive: true,

    permanentShield: 0,
    timedShield: 0,
    timedShieldExpiresRound: null,
    royalShield: 0,
    royalShieldExpiresRound: null,
    devilShields: [],
    cureShields: [],
    angelShields: [],
    jokerShields: [],
    chimeraRepairShields: [],
    chimeraShellShield: 0,
    chimeraShellShieldExpiresRound: null,

    defending: false,
    pendingHeal: 0,
    healReadyRound: 1,
    stunTurns: 0,
    invincible: false,

    restorationMarkTicks: 0,
    restorationMarkHeal: 0,
    cureEmergencyUsed: false,
    cureHealingCount: 0,

    // Anubis / Weight system.
    anubisWeight: 0,
    anubisBoundTargetBattleId: null,
    anubisHealingMeter: 0,
    anubisTeamDamageMeter: 0,
    anubisTeamDamageReductionRound: null,
    anubisJudgmentShield: 0,
    anubisJudgmentShieldExpiresRound: null,
    // Legacy fields kept at zero for backward-compatible online snapshots.
    anubisDamageMeter: 0,
    anubisAttackCounter: 0,
    anubisGuardShield: 0,
    anubisLowHpChargeUsed: false,

    // Prophet system. Predictions are stored on Prophet, never on the target UI.
    prophetFailures: 0,
    prophecies: [],

    puppets: 0,
    lifePuppets: 0,
    revivePuppet: false,
    revivePuppetExpiresRound: null,

    nextAttackBonus: 0,
    personalNextDamageBonus: 0,

    fighterLastStandSaveUsed: false,
    assassinGuardAvailable: key === "assassin",

    angelBlessUsed: false,
    angelLowHpPassiveUsed: false,

    berserk: false,
    berserkEndRound: null,
    berserkAttackReady: false,
    berserkPendingDeath: false,

    jugglingBalls: key === "joker" ? 1 : 0,
    jokerBallsThrown: 0,
    jokerStunBallReadyRound: 1,

    // Chimera form / bleed system.
    chimeraForm: key === "chimera" ? "beast" : null,
    chimeraSpiritReadyRound: 1,
    chimeraReviveUsed: false,
    chimeraBleeds: [],

    vampireReviveUsed: false,
    vampireTeammateCrisisUsed: false,
    vampireReviveInvincibleRound: null,
    vampireNextAttackDamageBonus: 0,
    vampireNextAttackLifestealBonus: 0,
    vampireTeammateDeathMark: 0,
    skipRegularTurnRound: null
  };
}


// =====================================================
// START BATTLE
// =====================================================

function startBattle() {
  battleLogEntries = [];
  document.getElementById("battle-log-content").innerHTML = "";

  teamA = [
    createCharacter(selectedA[0], "A", 1),
    createCharacter(selectedA[1], "A", 2)
  ];

  teamB = [
    createCharacter(selectedB[0], "B", 1),
    createCharacter(selectedB[1], "B", 2)
  ];

  applyKingStartingPassive(teamA);
  applyKingStartingPassive(teamB);

  turnOrder = [teamA[0], teamB[0], teamA[1], teamB[1]];
  currentTurn = 0;
  round = 1;
  gameOver = false;
  immediateTurnBattleId = null;
  immediateTurnResumeIndex = null;
  immediateTurnActive = false;

  document.getElementById("selection-screen").classList.add("hidden");
  document.getElementById("battle-screen").classList.remove("hidden");

  addLog("⚔️ Battle started!");

  if (gameMode === "ai") {
    addLog(`🤖 AI Team: ${teamB.map(c => `${c.icon} ${c.name}`).join(" + ")}`);
  }

  addLog("—— ROUND 1 ——");
  renderBattle();
  beginTurn();
}

function applyKingStartingPassive(team) {
  const king = team.find(c => c.key === "king");
  if (!king) return;

  const teammate = team.find(c => c !== king);
  if (!teammate) return;

  if (teammate.key === "vampire") {
    growVampireLife(teammate, 1);
  } else {
    teammate.maxHP += 1;
    teammate.hp += 1;
  }

  addLog(`👑 Royal Presence: ${teammate.name} gains +1 permanent Max HP and +1 HP.`);
}


// =====================================================
// TURN SYSTEM
// =====================================================

function beginTurn() {
  if (gameOver) return;

  processAnubisDamageCarryover();

  const character = turnOrder[currentTurn];

  // Every new character turn gets a fresh navigation history.
  resetActionStepStack(character);

  if (!character.alive) {
    advanceTurn();
    return;
  }

  // A Vampire immediate-revival action consumes its still-upcoming normal
  // action slot in the same round, preventing a double turn.
  if (
    !immediateTurnActive &&
    character.skipRegularTurnRound === round
  ) {
    character.skipRegularTurnRound = null;
    addLog(`🧛 ${character.name}'s normal action slot is consumed by the immediate revival action.`);
    advanceTurn();
    return;
  }

  // Defend / Assassin/Joker invincibility last until this character's next turn begins.
  character.defending = false;
  character.invincible = false;

  if (character.stunTurns > 0) {
    character.stunTurns--;
    addLog(`💫 ${character.name} is stunned and loses the turn!`);
    renderBattle();
    setTimeout(advanceTurn, 650);
    return;
  }

  renderBattle();

  if (gameMode === "ai" && character.team === "B") {
    document.getElementById("turn-title").textContent =
      `🤖 ${character.icon} ${character.name} is thinking...`;

    setActionButtonsDisabled(true);
    contextPanel.innerHTML = "<strong>🤖 AI is choosing an action...</strong>";

    setTimeout(() => aiTakeTurn(character), 650);
    return;
  }

  if (gameMode === "online") {
    if (character.team === onlinePlayerSide) {
      showActions(character);
    } else {
      showOnlineWaitingUi(character);
    }

    // The client that just advanced the turn publishes the canonical snapshot.
    // The other client only imports that snapshot and never re-runs beginTurn().
    notifyOnlineState();
    return;
  }

  showActions(character);
}

function advanceTurn() {
  if (gameOver) return;

  currentTurn++;

  if (currentTurn >= turnOrder.length) {
    currentTurn = 0;
    endRound();
    return;
  }

  beginTurn();
}


// =====================================================
// END ROUND
// =====================================================

function endRound() {
  const everyone = [...teamA, ...teamB];

  // Basic Heal action: +2 HP at round end.
  everyone.forEach(character => {
    if (character.alive && character.pendingHeal > 0) {
      const before = character.hp;

      const healed = applyHealing(
        character,
        character.pendingHeal
      );

      if (healed > 0) {
        addLog(`❤️ ${character.name} recovers ${formatNumber(healed)} HP.`);
      }

      character.pendingHeal = 0;
    }
  });

  // Chimera Bleed ticks at the end of the same round it is applied.
  processChimeraBleeds(everyone);

  // Cure Mage marks tick at the end of the round.
  processRestorationMarks(everyone);

  // Tank temporary shield.
  everyone.forEach(character => {
    if (
      character.timedShield > 0 &&
      character.timedShieldExpiresRound !== null &&
      round >= character.timedShieldExpiresRound
    ) {
      character.timedShield = 0;
      character.timedShieldExpiresRound = null;
      addLog(`🛡️ ${character.name}'s Guardian Shield expired.`);
    }
  });

  // King's one-round shield.
  everyone.forEach(character => {
    if (
      character.royalShield > 0 &&
      character.royalShieldExpiresRound !== null &&
      round >= character.royalShieldExpiresRound
    ) {
      character.royalShield = 0;
      character.royalShieldExpiresRound = null;
      addLog(`👑 ${character.name}'s Royal Shield expired.`);
    }
  });

  // Anubis Judgment Shield.
  everyone.forEach(character => {
    if (
      character.anubisJudgmentShield > 0 &&
      character.anubisJudgmentShieldExpiresRound !== null &&
      round >= character.anubisJudgmentShieldExpiresRound
    ) {
      character.anubisJudgmentShield = 0;
      character.anubisJudgmentShieldExpiresRound = null;
      addLog(`⚖️ ${character.name}'s Judgment Shield expired.`);
    }
  });

  expireDevilShields(everyone);
  expireCureShields(everyone);
  expireAngelShields(everyone);
  expireJokerShields(everyone);
  expireChimeraShields(everyone);
  expireLifePuppets(everyone);

  processProphecyRoundEnd();
  processRoundPassives();
  processDevilBerserkEnd();

  renderBattle();

  if (checkGameOver()) return;

  round++;

  applyKingRoundPassive(teamA);
  applyKingRoundPassive(teamB);

  document.getElementById("round-number").textContent = round;
  addLog(`—— ROUND ${round} ——`);

  renderBattle();
  beginTurn();
}


// =====================================================
// CURE RESTORATION MARK
// =====================================================

function processRestorationMarks(everyone) {
  everyone.forEach(character => {
    if (character.restorationMarkTicks <= 0) {
      return;
    }

    if (character.alive) {
      const cure = getOwnTeam(character).find(
        ally => ally.key === "cureMage"
      );

      let result;

      if (cure) {
        result = applyCureHealing(
          cure,
          character,
          character.restorationMarkHeal,
          true
        );
      } else {
        result = {
          healed: applyHealing(
            character,
            character.restorationMarkHeal
          ),
          overheal: 0,
          barrier: 0
        };
      }

      if (result.healed > 0) {
        addLog(
          `💚 Restoration Mark heals ${character.name} for ${formatNumber(result.healed)} HP.`
        );
      }
    }

    character.restorationMarkTicks--;

    if (
      character.restorationMarkTicks <= 0
    ) {
      character.restorationMarkTicks = 0;
      character.restorationMarkHeal = 0;

      addLog(
        `💚 ${character.name}'s Restoration Mark fades.`
      );
    }
  });
}


// =====================================================
// DEVIL BLOOD PACT SHIELD EXPIRATION
// =====================================================

function expireDevilShields(everyone) {
  everyone.forEach(character => {
    if (!character.devilShields.length) return;

    let expired = 0;

    character.devilShields = character.devilShields.filter(entry => {
      if (round >= entry.expiresRound) {
        expired += entry.amount;
        return false;
      }
      return true;
    });

    if (expired > 0) {
      addLog(
        `😈 ${formatNumber(expired)} Blood Pact Shield expired from ${character.name}.`
      );
    }
  });
}



// =====================================================
// CURE OVERHEAL SHIELD EXPIRATION
// =====================================================

function expireCureShields(everyone) {
  everyone.forEach(character => {
    if (!character.cureShields.length) return;

    let expired = 0;

    character.cureShields = character.cureShields.filter(entry => {
      if (round >= entry.expiresRound) {
        expired += entry.amount;
        return false;
      }

      return true;
    });

    if (expired > 0) {
      addLog(
        `💚 ${formatNumber(expired)} Overheal Barrier expired from ${character.name}.`
      );
    }
  });
}


// =====================================================
// ANGEL EMPOWER SHIELD EXPIRATION
// =====================================================

function expireAngelShields(everyone) {
  everyone.forEach(character => {
    if (!character.angelShields.length) return;

    let expired = 0;

    character.angelShields = character.angelShields.filter(entry => {
      if (round >= entry.expiresRound) {
        expired += entry.amount;
        return false;
      }
      return true;
    });

    if (expired > 0) {
      addLog(
        `👼 ${formatNumber(expired)} Divine Empowerment Shield expired from ${character.name}.`
      );
    }
  });
}



// =====================================================
// JOKER / CHIMERA TEMPORARY SHIELDS
// =====================================================

function expireJokerShields(everyone) {
  everyone.forEach(character => {
    if (!Array.isArray(character.jokerShields) || !character.jokerShields.length) {
      return;
    }

    let expired = 0;
    character.jokerShields = character.jokerShields.filter(entry => {
      if (round >= entry.expiresRound) {
        expired += Number(entry.amount) || 0;
        return false;
      }
      return true;
    });

    if (expired > 0) {
      addLog(`🃏 ${formatNumber(expired)} Grand Finale Shield expired from ${character.name}.`);
    }
  });
}

function expireChimeraShields(everyone) {
  everyone.forEach(character => {
    if (
      (Number(character.chimeraShellShield) || 0) > 0 &&
      character.chimeraShellShieldExpiresRound !== null &&
      round >= character.chimeraShellShieldExpiresRound
    ) {
      character.chimeraShellShield = 0;
      character.chimeraShellShieldExpiresRound = null;
      addLog(`🐢 ${character.name}'s Shell entry Shield expired.`);
    }

    if (!Array.isArray(character.chimeraRepairShields) || !character.chimeraRepairShields.length) {
      return;
    }

    let expired = 0;
    character.chimeraRepairShields = character.chimeraRepairShields.filter(entry => {
      if (round >= entry.expiresRound) {
        expired += Number(entry.amount) || 0;
        return false;
      }
      return true;
    });

    if (expired > 0) {
      addLog(`🐢 ${formatNumber(expired)} Shelter Repair Shield expired from ${character.name}.`);
    }
  });
}


// =====================================================
// LIFE PUPPET EXPIRATION
// =====================================================

function expireLifePuppets(everyone) {
  everyone.forEach(character => {
    if (
      !character.revivePuppet ||
      character.revivePuppetExpiresRound === null ||
      character.revivePuppetExpiresRound === undefined
    ) {
      return;
    }

    if (round >= Number(character.revivePuppetExpiresRound)) {
      character.revivePuppet = false;
      character.revivePuppetExpiresRound = null;
      addLog(`🧵 ${character.name}'s Life Puppet expired before it could revive them.`);
    }
  });
}


// =====================================================
// CHIMERA BLEED
// =====================================================

function addChimeraBleed(source, target) {
  if (!target || !target.alive) return false;

  if (!Array.isArray(target.chimeraBleeds)) {
    target.chimeraBleeds = [];
  }

  target.chimeraBleeds.push({
    ticksLeft: 2,
    sourceBattleId: source ? getBattleSlotId(source) : null
  });

  addLog(`🩸 ${target.name} gains 1 Bleed stack for 2 round-end ticks.`);
  return true;
}

function processChimeraBleeds(everyone) {
  everyone.forEach(target => {
    if (!Array.isArray(target.chimeraBleeds) || target.chimeraBleeds.length === 0) {
      return;
    }

    const activeLayers = target.chimeraBleeds.filter(
      entry => (Number(entry.ticksLeft) || 0) > 0
    );

    if (activeLayers.length === 0) {
      target.chimeraBleeds = [];
      return;
    }

    if (target.alive) {
      const totalLoss = activeLayers.length * 0.5;
      const source = activeLayers[0].sourceBattleId
        ? findBattleCharacterById(activeLayers[0].sourceBattleId)
        : null;

      applyDirectHpLoss(
        target,
        totalLoss,
        source,
        `🩸 Bleed (${activeLayers.length} stack${activeLayers.length === 1 ? "" : "s"})`
      );
    }

    activeLayers.forEach(entry => {
      entry.ticksLeft = Math.max(0, (Number(entry.ticksLeft) || 0) - 1);
    });

    target.chimeraBleeds = activeLayers.filter(
      entry => entry.ticksLeft > 0
    );
  });
}

// =====================================================
// VAMPIRE DEATH MARK
// =====================================================

function processVampireTeammateDeathMarks() {
  for (const team of [teamA, teamB]) {
    const vampire = team.find(
      character => character.key === "vampire" && character.alive
    );

    if (!vampire) continue;

    const teammate = team.find(character => character !== vampire) || null;

    if (!teammate || !teammate.alive) {
      vampire.vampireTeammateDeathMark = 0;
      continue;
    }

    if (teammate.hp <= 1 + 0.0001) {
      vampire.vampireTeammateDeathMark =
        Math.max(0, Number(vampire.vampireTeammateDeathMark) || 0) + 1;

      addLog(
        `💀 Death Mark: ${teammate.name} has ended ${vampire.vampireTeammateDeathMark}/5 consecutive rounds at 1 HP or lower.`
      );

      if (vampire.vampireTeammateDeathMark >= 5) {
        vampire.vampireTeammateDeathMark = 0;
        teammate.hp -= 1.5;

        addLog(
          `💀 Death Mark triggers! ${teammate.name} directly loses 1.5 HP.`
        );

        if (teammate.hp <= 0) {
          handleDeath(teammate);
        } else {
          checkAngelLowHpPassive(teammate);
          checkCureMagePassive(teammate);
        }
      }
    } else {
      if ((Number(vampire.vampireTeammateDeathMark) || 0) > 0) {
        addLog(`💀 Death Mark on ${teammate.name} resets because HP is above 1.`);
      }
      vampire.vampireTeammateDeathMark = 0;
    }
  }
}

// =====================================================
// ROUND PASSIVES
// =====================================================

function processRoundPassives() {
  const everyone = [...teamA, ...teamB];

  processVampireTeammateDeathMarks();

  // Catch any teammate-crisis state created by a non-damage HP change.
  checkVampireTeammateCrisisForTeam(teamA);
  checkVampireTeammateCrisisForTeam(teamB);

  everyone.forEach(character => {
    if (!character.alive) return;

    // Blast Mage: every 3 completed rounds while HP > 3.
    if (
      character.key === "blastMage" &&
      round % 3 === 0 &&
      character.hp > 3
    ) {
      gainCharge(character, 1);
      addLog(`💥 Arcane Flow: ${character.name} gains 1 Charge.`);
    }

    // Joker: gain 1 Charge every 2 completed rounds.
    if (
      character.key === "joker" &&
      round % 2 === 0
    ) {
      gainCharge(character, 1);
      addLog(`🃏 Juggling Show: ${character.name} gains 1 Charge.`);
    }

    // Joker gains 1 Ball every 4 completed rounds.
    if (
      character.key === "joker" &&
      round % 4 === 0
    ) {
      character.jugglingBalls++;
      addLog(`🃏 Juggling Show: ${character.name} gains 1 Juggling Ball.`);
    }

    // Joker auto-production: if Charge >= 4 at round end, spend 1 Charge for 1 Ball.
    if (
      character.key === "joker" &&
      character.charge >= 4
    ) {
      character.charge--;
      character.jugglingBalls++;
      addLog(`🎪 ${character.name} automatically converts 1 Charge into 1 Juggling Ball.`);
    }

    // Chimera gains 1 Charge every 3 completed rounds.
    if (
      character.key === "chimera" &&
      round % 3 === 0
    ) {
      gainCharge(character, 1);
      addLog(`🧬 Molting Instinct: ${character.name} gains 1 Charge.`);
    }

    // Anubis gains 1 Weight every 3 completed rounds.
    if (
      character.key === "anubis" &&
      round % 3 === 0
    ) {
      changeAnubisSelfWeight(
        character,
        1,
        "Burden of the Heart: 3 rounds completed"
      );
    }

    // Anubis gains 1 Charge every 5 completed rounds.
    if (
      character.key === "anubis" &&
      round % 5 === 0
    ) {
      gainCharge(character, 1);
      addLog(`⚖️ Burden of the Heart: ${character.name} gains 1 Charge.`);
    }

    // Prophet: automatic Charge every 2 completed rounds.
    if (
      character.key === "prophet" &&
      round % 2 === 0
    ) {
      gainCharge(character, 1);
      addLog(`🔮 Vision of the Future: ${character.name} gains 1 Charge.`);
    }

    // Tank growth every 3 completed rounds.
    if (
      character.key === "tank" &&
      round % 3 === 0
    ) {
      const before = character.hp;
      character.maxHP += 0.5;
      character.hp = Math.min(character.maxHP, character.hp + 0.5);
      recordAnubisHealing(character, character.hp - before);
      grantShield(character, 0.5, "permanent");

      addLog(
        `🛡️ Guardian's Burden: ${character.name} gains +0.5 Max HP, restores 0.5 HP, and gains 0.5 permanent Shield.`
      );
    }

    // Vampire: every 5 completed rounds gain 1 Charge.
    if (
      character.key === "vampire" &&
      round % 5 === 0
    ) {
      gainCharge(character, 1);
      addLog(`🧛 Crimson Hunger: ${character.name} gains 1 Charge.`);
    }

    // Vampire: every 3 completed rounds lose 2 HP and 1 Max HP.
    // This passive cannot directly defeat Vampire.
    if (
      character.key === "vampire" &&
      round % 3 === 0
    ) {
      character.maxHP = Math.max(
        0.5,
        character.maxHP - 1
      );

      character.hp = Math.max(
        0.5,
        character.hp - 2
      );

      character.hp = Math.min(
        character.hp,
        character.maxHP
      );

      addLog(
        `🧛 Blood Decay: ${character.name} loses 2 HP and 1 Max HP, but cannot be defeated by this decay.`
      );
    }

    // Devil: gain 1 Charge every 3 completed rounds.
    if (
      character.key === "devil" &&
      round % 3 === 0
    ) {
      gainCharge(character, 1);
      addLog(`😈 Infernal Momentum: ${character.name} gains 1 Charge.`);
    }

    // Devil decay.
    if (character.key === "devil") {
      const hpLoss = character.berserk ? 1 : 0.5;
      const maxHpLoss = 0.5;

      character.maxHP = Math.max(0, character.maxHP - maxHpLoss);
      character.hp -= hpLoss;
      character.hp = Math.min(character.hp, character.maxHP);

      if (character.berserk) {
        addLog(
          `😈 Infernal Decay: ${character.name} loses 1 HP and 0.5 Max HP during Berserk.`
        );
      } else {
        addLog(
          `😈 Infernal Decay: ${character.name} loses 0.5 HP and 0.5 Max HP.`
        );
      }

      checkVampireTeammateCrisis(character);

      if (character.hp <= 0 || character.maxHP <= 0) {
        if (character.berserk) {
          character.hp = Math.max(0, character.hp);
          character.berserkPendingDeath = true;

          addLog(
            `🔥 ${character.name} refuses to fall while Berserk is active!`
          );
        } else {
          handleDeath(character);
        }
      }
    }
  });
}


// =====================================================
// DEVIL BERSERK END
// =====================================================

function processDevilBerserkEnd() {
  const everyone = [...teamA, ...teamB];

  everyone.forEach(character => {
    if (
      character.key !== "devil" ||
      !character.berserk ||
      round < character.berserkEndRound
    ) {
      return;
    }

    character.berserk = false;
    character.berserkEndRound = null;
    character.berserkAttackReady = false;

    if (character.hp <= 0 || character.maxHP <= 0) {
      character.berserkPendingDeath = false;
      handleDeath(character);

      if (character.alive) {
        character.stunTurns = Math.max(character.stunTurns, 1);
        addLog(`💫 ${character.name} is stunned after Berserk ends.`);
      }

      return;
    }

    character.berserkPendingDeath = false;

    const before = character.hp;
    character.hp = Math.min(character.maxHP, character.hp + 0.5);
    recordAnubisHealing(character, character.hp - before);
    character.stunTurns = Math.max(character.stunTurns, 1);

    addLog(
      `😈 Berserk ends! ${character.name} restores ${formatNumber(character.hp - before)} HP and becomes stunned for the next turn.`
    );
  });
}


// =====================================================
// KING PERIODIC PASSIVE
// =====================================================

function applyKingRoundPassive(team) {
  // New round numbers 4, 7, 10, 13...
  if ((round - 1) % 3 !== 0) return;

  const king = team.find(
    c => c.key === "king" && c.alive
  );

  if (!king) return;

  const teammate = team.find(
    c => c !== king && c.alive
  );

  if (!teammate) return;

  grantShield(
    teammate,
    1,
    "royal",
    round
  );

  addLog(
    `👑 Royal Presence grants ${teammate.name} 1 Shield for Round ${round}.`
  );
}



// =====================================================
// SHIELD / HEAL / VAMPIRE HELPERS
// =====================================================

function getLivingTeammate(character) {
  return getOwnTeam(character).find(
    ally => ally !== character && ally.alive
  ) || null;
}

function getAnyTeammate(character) {
  return getOwnTeam(character).find(
    ally => ally !== character
  ) || null;
}

function isVampireTeammateInCrisis(vampire) {
  if (!vampire || vampire.key !== "vampire") return false;
  const teammate = getAnyTeammate(vampire);
  return Boolean(teammate && !teammate.alive);
}

function getVampireHighHpBonus(character) {
  if (!character || character.key !== "vampire" || character.hp <= 9) return 0;
  return Math.floor(character.hp - 9) * 0.5;
}

function getVampireAttackBonus(character) {
  if (!character || character.key !== "vampire") return 0;

  const teammate = getAnyTeammate(character);
  const soloBonus = teammate && !teammate.alive ? 1 : 0;
  const rebirthBonus = Math.max(
    0,
    Number(character.vampireNextAttackDamageBonus) || 0
  );

  return soloBonus + getVampireHighHpBonus(character) + rebirthBonus;
}

function consumeVampireRebirthAttackBuff(character) {
  if (!character || character.key !== "vampire") return 0;

  const lifestealBonus = Math.max(
    0,
    Number(character.vampireNextAttackLifestealBonus) || 0
  );

  character.vampireNextAttackDamageBonus = 0;
  character.vampireNextAttackLifestealBonus = 0;

  return lifestealBonus;
}

const VAMPIRE_MAX_HP_CAP = 13;

function growVampireLife(vampire, amount) {
  if (
    !vampire ||
    vampire.key !== "vampire" ||
    amount <= 0
  ) {
    return 0;
  }

  vampire.maxHP = Math.min(
    VAMPIRE_MAX_HP_CAP,
    vampire.maxHP + amount
  );

  const before = vampire.hp;

  vampire.hp = Math.min(
    vampire.maxHP,
    vampire.hp + amount
  );

  return vampire.hp - before;
}



function grantShield(
  target,
  amount,
  type = "permanent",
  expiresRound = null
) {
  if (!target || amount <= 0) return 0;

  if (type === "guardian") {
    // Guardian Shield refreshes/replaces rather than stacking.
    target.timedShield = amount;
    target.timedShieldExpiresRound = expiresRound;
    return amount;
  }

  if (type === "royal") {
    target.royalShield = amount;
    target.royalShieldExpiresRound = expiresRound;
    return amount;
  }

  if (type === "devil") {
    target.devilShields.push({
      amount,
      expiresRound
    });
    return amount;
  }

  if (type === "cure") {
    target.cureShields.push({
      amount,
      expiresRound
    });
    return amount;
  }

  if (type === "angel") {
    target.angelShields.push({
      amount,
      expiresRound
    });
    return amount;
  }

  if (type === "joker") {
    target.jokerShields.push({
      amount,
      expiresRound
    });
    return amount;
  }

  if (type === "chimeraRepair") {
    target.chimeraRepairShields.push({
      amount,
      expiresRound
    });
    return amount;
  }

  if (type === "chimeraShell") {
    target.chimeraShellShield = amount;
    target.chimeraShellShieldExpiresRound = expiresRound;
    return amount;
  }

  target.permanentShield += amount;
  return amount;
}

function getEffectiveHealingAmount(target, amount) {
  const clean = Math.max(0, Number(amount) || 0);
  if (!target || clean <= 0) return 0;

  if (target.key === "assassin") {
    return Math.max(0, clean - 0.5);
  }

  return clean;
}

function applyHealing(target, amount) {
  if (!target || !target.alive) return 0;

  const effectiveAmount = getEffectiveHealingAmount(target, amount);
  if (effectiveAmount <= 0) return 0;

  const before = target.hp;
  target.hp = Math.min(target.maxHP, target.hp + effectiveAmount);
  const healed = target.hp - before;

  if (healed > 0) {
    recordAnubisHealing(target, healed);
    checkVampireTeammateCrisis(target);
  }

  return healed;
}

function applyCureHealing(
  cure,
  target,
  amount,
  createdAtRoundEnd = false
) {
  if (
    !target ||
    !target.alive ||
    amount <= 0
  ) {
    return {
      healed: 0,
      overheal: 0,
      barrier: 0
    };
  }

  const effectiveAmount = getEffectiveHealingAmount(target, amount);

  const missing = Math.max(
    0,
    target.maxHP - target.hp
  );

  const healed = Math.min(
    missing,
    effectiveAmount
  );

  target.hp += healed;
  recordAnubisHealing(target, healed);

  const overheal = Math.max(
    0,
    effectiveAmount - healed
  );

  const barrier = Math.max(
    0,
    overheal - 1
  );

  if (barrier > 0) {
    // A barrier created during an action lasts through the current
    // and next round. A barrier created at round end lasts through
    // the next two playable rounds.
    const expiresRound =
      round +
      (
        createdAtRoundEnd
          ? 2
          : 1
      );

    grantShield(
      target,
      barrier,
      "cure",
      expiresRound
    );

    addLog(
      `💚 Overheal Barrier: ${formatNumber(overheal)} overheal creates ${formatNumber(barrier)} temporary Shield for ${target.name}, lasting up to two rounds.`
    );
  }

  recordCureHealingEvent(cure, target);

  return {
    healed,
    overheal,
    barrier
  };
}

function checkVampireTeammateCrisis(character) {
  return;
}

function checkVampireTeammateCrisisForTeam(team) {
  return;
}

function triggerVampireNormalAttackGrowth(attacker, actualHpDamage, bonusLifesteal = 0) {
  if (
    !attacker ||
    attacker.key !== "vampire" ||
    actualHpDamage <= 0
  ) {
    return;
  }

  const teammate = getAnyTeammate(attacker);
  const teammateDefeated = Boolean(teammate && !teammate.alive);

  attacker.maxHP = Math.min(
    VAMPIRE_MAX_HP_CAP,
    attacker.maxHP + 0.5
  );

  const requestedHeal =
    (teammateDefeated ? 1.5 : 0.5) +
    Math.max(0, Number(bonusLifesteal) || 0);

  const before = attacker.hp;
  attacker.hp = Math.min(
    attacker.maxHP,
    attacker.hp + requestedHeal
  );
  const healed = attacker.hp - before;
  recordAnubisHealing(attacker, healed);

  addLog(
    `🧛 Blood Hunger: ${attacker.name}'s normal attack grants +0.5 Max HP and restores ${formatNumber(healed)} HP.`
  );
}



// =====================================================
// ANUBIS / PROPHET / CURE NEW-MECHANIC HELPERS
// =====================================================

const PROPHECY_COMMANDS = ["attack", "defend", "charge", "heal", "skill"];

function getLivingAnubis(team) {
  return team.find(character => character.key === "anubis" && character.alive) || null;
}

function getEnemyAnubis(character) {
  return getLivingAnubis(getEnemyTeam(character));
}

function getAnubisBoundTarget(anubis) {
  if (!anubis || !anubis.anubisBoundTargetBattleId) return null;
  const target = [...teamA, ...teamB].find(
    character => character.battleId === anubis.anubisBoundTargetBattleId
  );
  return target && target.alive && target.team !== anubis.team ? target : null;
}

function changeAnubisSelfWeight(anubis, delta, reason = "") {
  if (!anubis || anubis.key !== "anubis" || !anubis.alive || !Number.isFinite(delta) || delta === 0) {
    return 0;
  }

  const before = Math.max(0, Math.floor(Number(anubis.anubisWeight) || 0));
  const after = Math.max(0, before + Math.trunc(delta));
  anubis.anubisWeight = after;

  if (after !== before) {
    addLog(
      `⚖️ ${anubis.name} Weight ${before} → ${after}${reason ? ` (${reason})` : ""}.`
    );
  }

  return after - before;
}

function registerAnubisEnemyChargeGain(character) {
  if (!character || !character.alive) return;
  const anubis = getEnemyAnubis(character);
  if (!anubis) return;
  changeAnubisSelfWeight(anubis, 1, `${character.name} gained Charge`);
}

function gainCharge(character, amount) {
  const clean = Number(amount) || 0;
  if (!character || clean <= 0) return 0;
  character.charge += clean;
  // One Weight is added per Charge-gain event, regardless of how many Charge
  // points were gained in that single event.
  registerAnubisEnemyChargeGain(character);
  return clean;
}

function recordAnubisCommand(character, commandType) {
  if (!character || !character.alive) return;

  // Only Defend directly reduces Weight. Charge is handled by gainCharge()
  // so every source of Charge gain is covered, not just the Charge action.
  if (commandType === "defend") {
    const anubis = getEnemyAnubis(character);
    if (anubis) {
      changeAnubisSelfWeight(anubis, -1, `${character.name} used Defend`);
    }
  }
}

function recordAnubisHealing(target, healed) {
  const amount = Number(healed) || 0;
  if (!target || !target.alive || amount <= 0) return;

  const anubis = getEnemyAnubis(target);
  if (!anubis) return;

  target.anubisHealingMeter =
    Math.max(0, Number(target.anubisHealingMeter) || 0) + amount;

  while (target.anubisHealingMeter >= 2 - 0.0001) {
    target.anubisHealingMeter -= 2;
    if (target.anubisHealingMeter < 0.0001) target.anubisHealingMeter = 0;
    changeAnubisSelfWeight(
      anubis,
      -1,
      `${target.name} accumulated 2 HP healing`
    );
  }
}

function recordAnubisTeamDamage(target, amount, source = null) {
  const damage = Number(amount) || 0;
  if (!target || damage <= 0) return;

  const anubis = getLivingAnubis(getOwnTeam(target));
  if (!anubis) return;

  const attacker = source || activeActionActor;
  if (!attacker || attacker.team === target.team) return;

  anubis.anubisTeamDamageMeter =
    Math.max(0, Number(anubis.anubisTeamDamageMeter) || 0) + damage;

  if (
    anubis.anubisTeamDamageReductionRound !== round &&
    anubis.anubisTeamDamageMeter >= 4 - 0.0001
  ) {
    anubis.anubisTeamDamageMeter -= 4;
    if (anubis.anubisTeamDamageMeter < 0.0001) anubis.anubisTeamDamageMeter = 0;
    anubis.anubisTeamDamageReductionRound = round;
    changeAnubisSelfWeight(
      anubis,
      -1,
      "team received 4 cumulative HP damage"
    );
  }
}

function processAnubisDamageCarryover() {
  [...teamA, ...teamB].forEach(anubis => {
    if (
      anubis.key !== "anubis" ||
      !anubis.alive ||
      anubis.anubisTeamDamageReductionRound === round ||
      (Number(anubis.anubisTeamDamageMeter) || 0) < 4 - 0.0001
    ) {
      return;
    }

    anubis.anubisTeamDamageMeter -= 4;
    if (anubis.anubisTeamDamageMeter < 0.0001) anubis.anubisTeamDamageMeter = 0;
    anubis.anubisTeamDamageReductionRound = round;
    changeAnubisSelfWeight(
      anubis,
      -1,
      "carried team damage reached 4"
    );
  });
}

function getAnubisTeammateDamageBonus(source, target) {
  // Removed in the current Anubis rework. Kept as a compatibility helper
  // because the damage pipeline still calls this function.
  return 0;
}

// Legacy helpers retained as no-ops so old call sites from unusual effects or
// imported snapshots cannot re-enable the retired Anubis mechanics.
function clearWeightsAgainstAnubis() {}
function registerAnubisAttackInstance() {}
function registerAnubisHpLoss() {}

function recordCureHealingEvent(cure, target) {
  if (!cure || cure.key !== "cureMage" || !target || target === cure) return;

  target.cureHealingCount = (Number(target.cureHealingCount) || 0) + 1;

  if (target.cureHealingCount >= 3) {
    target.cureHealingCount -= 3;
    target.nextAttackBonus = (Number(target.nextAttackBonus) || 0) + 1;
    addLog(`💚 Healing Resonance: ${target.name} has received 3 Cure Mage healing events; the next damaging action gains +1 damage.`);
  }
}

// A prediction applies to the target's next scheduled turn, not always Round + 1.
function getProphecyResolveRound(target) {
  const index = turnOrder.findIndex(unit => unit.battleId === target.battleId);
  const nextIndex = immediateTurnActive && immediateTurnResumeIndex !== null
    ? immediateTurnResumeIndex : currentTurn + 1;
  return index >= nextIndex && target.skipRegularTurnRound !== round ? round : round + 1;
}

function storeProphecy(character, target, command) {
  const resolveRound = getProphecyResolveRound(target);
  character.prophecies = (character.prophecies || []).filter(entry => !(
    !entry.resolved && entry.targetBattleId === target.battleId
  ));
  character.prophecies.push({
    targetBattleId: target.battleId, command, resolveRound,
    resolved: false, success: false
  });
}

function getActiveProphecyForTarget(target) {
  if (!target) return null;
  const prophet = getEnemyTeam(target).find(character => character.key === "prophet" && character.alive);
  if (!prophet || !Array.isArray(prophet.prophecies)) return null;

  const prophecy = prophet.prophecies.find(entry =>
    !entry.resolved &&
    entry.targetBattleId === target.battleId &&
    Number(entry.resolveRound) === round
  );

  return prophecy ? { prophet, prophecy } : null;
}

function applyDirectHpLoss(target, amount, source = null, label = "Direct HP loss") {
  if (!target || !target.alive || amount <= 0) return 0;

  const before = target.hp;
  target.hp -= amount;
  const lost = Math.min(before, amount);

  addLog(`${label}: ${target.name} directly loses ${formatNumber(lost)} HP, ignoring Shield.`);
  registerAnubisHpLoss(target, lost, source);
  recordAnubisTeamDamage(target, lost, source);

  checkVampireTeammateCrisis(target);

  if (target.hp <= 0) {
    handleDeath(target);
  } else {
    checkAngelLowHpPassive(target);
    checkCureMagePassive(target);
  }

  return lost;
}

function applyProphecyFailure(prophet) {
  if (!prophet || !prophet.alive) return;

  prophet.prophetFailures = (Number(prophet.prophetFailures) || 0) + 1;
  addLog(`🔮 Failed Prophecy: ${prophet.name} has ${prophet.prophetFailures}/3 failures.`);

  if (prophet.prophetFailures < 3) return;

  prophet.prophetFailures = 0;
  prophet.maxHP = Math.max(0, prophet.maxHP - 1);
  prophet.hp -= 1;
  prophet.hp = Math.min(prophet.hp, prophet.maxHP);

  addLog(`🔮 Fate's Price: ${prophet.name} loses 1 HP and 1 Max HP and is stunned for the next action.`);

  if (prophet.hp <= 0 || prophet.maxHP <= 0) {
    handleDeath(prophet);
    return;
  }

  prophet.stunTurns += 1;
  checkAngelLowHpPassive(prophet);
  checkCureMagePassive(prophet);
}

function resolveProphecyBeforeCommand(character, commandType) {
  const active = getActiveProphecyForTarget(character);
  if (!active) return { cancelled: false, message: "" };

  const { prophet, prophecy } = active;
  prophecy.resolved = true;

  if (prophecy.command === commandType) {
    prophecy.success = true;

    // Prophecy damage is based on the target's current Max HP, not current HP.
    // Round upward so three successful Prophecies are always enough to defeat
    // a target that starts at full HP. This is direct HP loss, so Shield is ignored.
    const prophecyDamage = Math.ceil(character.maxHP / 3);
    const lost = applyDirectHpLoss(
      character,
      prophecyDamage,
      prophet,
      "🔮 Prophecy succeeds"
    );

    return {
      cancelled: true,
      message: `🔮 Prophecy succeeds! ${character.name}'s ${commandType.toUpperCase()} is cancelled immediately and ${character.name} directly loses ${formatNumber(lost)} HP (1/3 of Max HP, rounded up), ignoring Shield.`
    };
  }

  prophecy.success = false;
  applyProphecyFailure(prophet);
  addLog(`🔮 Prophecy fails: ${prophet.name} predicted ${prophecy.command.toUpperCase()}, but ${character.name} chose ${commandType.toUpperCase()}.`);
  return { cancelled: false, message: "" };
}

function processProphecyRoundEnd() {
  [...teamA, ...teamB].forEach(prophet => {
    if (prophet.key !== "prophet" || !Array.isArray(prophet.prophecies)) return;

    const resolving = prophet.prophecies.filter(entry => Number(entry.resolveRound) === round);

    if (
      prophet.alive &&
      resolving.length > 0 &&
      resolving.every(entry => entry.resolved && entry.success)
    ) {
      const before = prophet.hp;
      prophet.maxHP += 1;
      prophet.hp = Math.min(prophet.maxHP, prophet.hp + 1);
      recordAnubisHealing(prophet, prophet.hp - before);
      addLog(`🔮 Perfect Prophecy: every prophecy for Round ${round} succeeded. ${prophet.name} gains +1 HP and +1 Max HP.`);
    }

    // Unresolved prophecies expire neutrally (dead / stunned / skipped target is not a failure).
    prophet.prophecies = prophet.prophecies.filter(entry => Number(entry.resolveRound) > round);
  });
}

function executeCommittedCommand(character, commandType, actionFn) {
  const prediction = resolveProphecyBeforeCommand(character, commandType);

  if (prediction.cancelled) {
    pendingCommandType = null;
    finishAction(prediction.message);
    return false;
  }

  recordAnubisCommand(character, commandType);
  if (!character.alive) {
    finishAction("💀 The defeated character cannot complete the action.");
    return true;
  }
  activeActionActor = character;
  activeActionCommandType = commandType;

  try {
    actionFn();
  } finally {
    // Most committed actions call finishAction synchronously, but clear here too
    // so an exception / unusual path cannot leak attack context into the next action.
    activeActionActor = null;
    activeActionCommandType = null;
  }

  return true;
}

function runAiCommand(character, commandType, actionFn) {
  const prediction = resolveProphecyBeforeCommand(character, commandType);

  if (prediction.cancelled) {
    finishAction(`🤖 ${prediction.message}`);
    return true;
  }

  recordAnubisCommand(character, commandType);
  if (!character.alive) {
    finishAction("💀 The defeated character cannot complete the action.");
    return true;
  }
  activeActionActor = character;
  activeActionCommandType = commandType;

  try {
    actionFn();
  } finally {
    activeActionActor = null;
    activeActionCommandType = null;
  }

  return true;
}

function canAnubisUseSkill(character) {
  if (!character || character.key !== "anubis" || !character.alive) return false;
  return getEnemyTeam(character).some(enemy => enemy.alive);
}

function aiHasUsableSkill(character) {
  if (!character || !character.alive) return false;
  switch (character.key) {
    case "fighter": return character.charge >= 2;
    case "blastMage": return character.charge >= 2;
    case "tank": return character.charge >= 2;
    case "cureMage": return character.charge >= 2;
    case "assassin": return character.charge >= 4;
    case "king": return character.charge >= 2;
    case "puppeteer": return character.charge >= 3 || character.puppets > 0 || character.lifePuppets > 0;
    case "angel": return character.charge >= 1;
    case "devil": return !character.berserk && (character.charge >= 2 || !!getLivingTeammate(character));
    case "joker": return character.charge > 0 || character.jugglingBalls > 0;
    case "vampire": {
      const teammate = getAnyTeammate(character);
      const livingTeammate = getLivingTeammate(character);
      const healCost = teammate && !teammate.alive ? 1 : 2;
      const canDrain = Boolean(
        livingTeammate &&
        livingTeammate.hp > 0.5 &&
        character.maxHP < VAMPIRE_MAX_HP_CAP
      );
      const canRecover =
        character.charge >= healCost &&
        character.hp < character.maxHP;
      return canDrain || canRecover;
    }
    case "anubis": return canAnubisUseSkill(character);
    case "chimera": return aiChimeraWillUseSkill(character);
    case "prophet": return character.charge >= 1;
    default: return false;
  }
}

// =====================================================
// CURRENT-TURN BACK / CONFIRM SYSTEM
// =====================================================

function resetActionStepStack(character) {
  actionStepStack = [];
  actionStepOwner = character || null;
  updateBackButton();
}

function pushActionStep(backFunction) {
  const character = turnOrder[currentTurn];

  if (
    !character ||
    character !== actionStepOwner
  ) {
    resetActionStepStack(character);
  }

  actionStepStack.push(backFunction);
  updateBackButton();
}

function goBackOneStep() {
  if (gameOver) return;

  const character = turnOrder[currentTurn];

  if (
    !character ||
    character !== actionStepOwner
  ) {
    actionStepStack = [];
    updateBackButton();
    return;
  }

  const previousStep = actionStepStack.pop();

  if (typeof previousStep !== "function") {
    updateBackButton();
    return;
  }

  previousStep();
  updateBackButton();
}

function updateBackButton() {
  if (!backButton) return;

  const character = turnOrder[currentTurn];

  backButton.disabled =
    gameOver ||
    !character ||
    character !== actionStepOwner ||
    actionStepStack.length === 0 ||
    (gameMode === "ai" && character.team === "B") ||
    (gameMode === "online" && character.team !== onlinePlayerSide);
}

if (backButton) {
  backButton.addEventListener(
    "click",
    goBackOneStep
  );
}

function showCommitConfirmation(
  character,
  message,
  onConfirm,
  onBack
) {
  setActionButtonsDisabled(true);

  contextPanel.innerHTML = `
    <strong>✅ Confirm Action</strong>
    <div class="action-step-hint">
      ${message}
    </div>
  `;

  const confirmButton =
    document.createElement("button");

  confirmButton.textContent =
    "✅ Confirm";

  const commandType = pendingCommandType;
  let committed = false;

  confirmButton.onclick = () => {
    if (committed) return;

    committed = true;
    confirmButton.disabled = true;

    if (commandType) {
      executeCommittedCommand(character, commandType, onConfirm);
    } else {
      onConfirm();
    }
  };

  contextPanel.appendChild(
    confirmButton
  );

  // The fixed Back button handles going back.
  if (typeof onBack === "function") {
    pushActionStep(onBack);
  }

  updateBackButton();
}

function getNormalAttackPreviewDamage(character) {
  if (!character) return 0;
  if (character.key === "chimera" && character.chimeraForm === "spirit") {
    return 0;
  }

  let damage =
    getBaseNormalAttackDamage(character) +
    getPendingDamageBonus(character);

  damage += getFighterDamageBonus(character);
  damage += getDevilAttackBonus(character);
  damage += getVampireAttackBonus(character);

  return damage;
}

function updateAttackDamagePreview(character) {
  const preview =
    document.getElementById(
      "attack-damage-preview"
    );

  if (!preview) return;

  if (!character || !character.alive) {
    preview.textContent = "DMG —";
    return;
  }

  const damage =
    getNormalAttackPreviewDamage(
      character
    );

  preview.textContent =
    character.key === "vampire"
      ? `DMG ${formatNumber(damage)} · +0.5 MAX on hit`
      : `DMG ${formatNumber(damage)}`;
}

function updateSkillResourcePreview(character) {
  const preview =
    document.getElementById(
      "skill-resource-preview"
    );

  if (!preview || !character) return;

  switch (character.key) {
    case "fighter":
      preview.textContent =
        `2C · Have ${character.charge}`;
      break;

    case "blastMage":
      preview.textContent =
        `${character.charge}C · Need 2+`;
      break;

    case "tank":
      preview.textContent =
        `2C · Have ${character.charge}`;
      break;

    case "cureMage":
      preview.textContent =
        `${character.charge}C · Need 2+`;
      break;

    case "assassin":
      preview.textContent =
        `4C · Have ${character.charge}`;
      break;

    case "king":
      preview.textContent =
        `2C · Have ${character.charge}`;
      break;

    case "puppeteer":
      preview.textContent =
        `${character.charge}C · ${character.puppets} Puppet`;
      break;

    case "angel":
      preview.textContent =
        `${character.charge} Charge`;
      break;

    case "devil":
      preview.textContent =
        `${character.charge} Charge`;
      break;

    case "joker":
      preview.textContent =
        `${character.jugglingBalls} Balls · ${character.charge}C`;
      break;

    case "vampire":
      preview.textContent =
        `${character.charge} Charge`;
      break;

    case "chimera":
      return character.charge < 2 && Math.random() < 0.45;

    case "anubis": {
      const boundTarget = getAnubisBoundTarget(character);
      preview.textContent =
        `${character.anubisWeight || 0}W · ${character.charge}C · ${boundTarget ? `Bound: ${boundTarget.name}` : "Unbound"}`;
      break;
    }

    case "chimera": {
      const info = getChimeraFormInfo(character.chimeraForm || "beast");
      preview.textContent =
        `${info.icon} ${info.name} · ${character.charge}C`;
      break;
    }

    case "prophet":
      preview.textContent =
        `${character.charge}C · 1C / Prophecy`;
      break;

    default:
      preview.textContent = "";
  }
}

function updateHealPreview(character) {
  const preview =
    document.getElementById(
      "heal-preview"
    );

  if (!preview || !character) return;

  const roundsLeft =
    character.healReadyRound -
    round;

  preview.textContent =
    roundsLeft > 0
      ? `CD ${roundsLeft}R`
      : "+2 HP";
}


// =====================================================
// TURN UI
// =====================================================

function showActions(character) {
  if (
    gameMode === "online" &&
    character &&
    character.team !== onlinePlayerSide
  ) {
    showOnlineWaitingUi(character);
    return;
  }

  document.getElementById("turn-title").textContent =
    `TEAM ${character.team} — ${character.icon} ${character.name}'s Turn`;

  setActionButtonsDisabled(false);

  const skillButton =
    document.getElementById("skill-button");

  const healButton =
    document.getElementById("heal-button");

  if (character.key === "puppeteer") {
    skillButton.disabled =
      character.puppets <= 0 &&
      character.lifePuppets <= 0 &&
      character.charge < 3;
  } else if (character.key === "angel") {
    skillButton.disabled = character.charge < 1;
  } else if (character.key === "joker") {
    skillButton.disabled =
      character.charge <= 0 &&
      character.jugglingBalls <= 0;
  } else if (character.key === "devil") {
    skillButton.disabled = character.berserk;
  } else if (character.key === "vampire") {
    const teammate = getAnyTeammate(character);
    const livingTeammate = getLivingTeammate(character);
    const healCost = teammate && !teammate.alive ? 1 : 2;
    const canDrain = Boolean(
      livingTeammate &&
      livingTeammate.hp > 0.5 &&
      !(character.maxHP >= VAMPIRE_MAX_HP_CAP && character.hp >= character.maxHP)
    );
    const canRecover =
      character.charge >= healCost &&
      character.hp < character.maxHP;

    skillButton.disabled =
      !canDrain &&
      !canRecover;
  } else if (character.key === "anubis") {
    skillButton.disabled = !canAnubisUseSkill(character);
  } else if (character.key === "prophet") {
    skillButton.disabled = character.charge < 1;
  } else {
    skillButton.disabled =
      character.charge <
      CHARACTER_DATA[character.key].skillCost;
  }

  healButton.disabled =
    round < character.healReadyRound;

  updateAttackDamagePreview(character);
  updateSkillResourcePreview(character);
  updateHealPreview(character);
  updateBackButton();

  let extraInfo = "";

  if (character.key === "puppeteer") {
    extraInfo += `
      <br>
      Regular Puppets: 🎭 × ${character.puppets}
      <br>
      Life Puppets: 🧵 × ${character.lifePuppets}
    `;
  }

  if (character.restorationMarkTicks > 0) {
    extraInfo += `
      <br>
      💚 Restoration Mark:
      ${formatNumber(character.restorationMarkHeal)} ×
      ${character.restorationMarkTicks}
    `;
  }

  if (character.key === "joker") {
    extraInfo += `
      <br>
      🎪 Juggling Balls: ${character.jugglingBalls}
      <br>
      🎯 Balls Thrown: ${character.jokerBallsThrown}
      <br>
      🤹 Stun Ball: ${
        round >= (character.jokerStunBallReadyRound || 1)
          ? "Ready"
          : `CD ${character.jokerStunBallReadyRound - round}R`
      }
    `;
  }

  if (character.key === "devil" && character.berserk) {
    extraInfo += `<br>🔥 Berserk Active`;

    if (character.berserkPendingDeath) {
      extraInfo += `<br>💀 Pending Death`;
    }
  }

  if (character.key === "vampire") {
    const teammate = getAnyTeammate(character);
    const baseLifesteal = teammate && !teammate.alive ? 1.5 : 0.5;
    const rebirthLifesteal = Math.max(
      0,
      Number(character.vampireNextAttackLifestealBonus) || 0
    );
    const recoveryCost = teammate && !teammate.alive ? 1 : 2;

    extraInfo += `
      <br>🧛 Normal ATK Bonus: +${formatNumber(getVampireAttackBonus(character))}
      <br>🩸 Normal ATK Lifesteal: ${formatNumber(baseLifesteal + rebirthLifesteal)} HP
      <br>❤️ Blood Recovery Cost: ${recoveryCost} Charge
      <br>♻️ Rebirth: ${character.vampireReviveUsed ? "Used" : "Ready"}
      <br>💀 Death Mark: ${teammate && teammate.alive ? `${character.vampireTeammateDeathMark || 0}/5` : "—"}
      ${
        teammate && teammate.alive
          ? "<br>🌙 Teammate alive: incoming damage -0.5"
          : "<br>🩸 Teammate defeated: normal ATK +1 damage, base lifesteal 1.5 HP"
      }
    `;
  }

  if (character.key === "anubis") {
    const boundTarget = getAnubisBoundTarget(character);
    extraInfo += `
      <br>⚖️ Weight: ${character.anubisWeight || 0}
      <br>🔗 Bound Target: ${boundTarget ? `${boundTarget.icon} ${boundTarget.name}` : "None"}
      <br>💥 Team Damage Meter: ${formatNumber(character.anubisTeamDamageMeter || 0)}/4
      <br>🛡️ Judgment Shield: ${formatNumber(character.anubisJudgmentShield || 0)}
    `;
  }

  if (character.key === "chimera") {
    const info = getChimeraFormInfo(character.chimeraForm || "beast");
    const spiritReady = canChimeraActivelyEnterSpirit(character);
    extraInfo += `
      <br>🧬 Form: ${info.icon} ${info.name}
      <br>👻 Spirit Entry: ${spiritReady ? "Ready" : `Ready on Round ${character.chimeraSpiritReadyRound}`}
      <br>♻️ Spectral Revival: ${character.chimeraReviveUsed ? "Used" : "Ready"}
    `;
  }

  if (character.key === "prophet") {
    const activeProphecies = (character.prophecies || []).filter(entry => !entry.resolved).length;
    extraInfo += `
      <br>🔮 Failed Prophecies: ${character.prophetFailures || 0}/3
      <br>🔒 Active Secret Prophecies: ${activeProphecies}
    `;
  }

  if (getPendingDamageBonus(character) > 0) {
    extraInfo += `
      <br>
      ✨ Next Damage:
      +${formatNumber(getPendingDamageBonus(character))}
    `;
  }

  const data =
    CHARACTER_DATA[character.key];

  contextPanel.innerHTML = `
    <strong>${character.icon} ${character.name}</strong>
    <br><br>
    ❤️ HP: ${formatNumber(character.hp)} / ${formatNumber(character.maxHP)}
    <br>
    ⚡ Charge: ${character.charge}
    ${extraInfo}

    <div class="battle-ability-info">
      <div class="skill-info">
        <div class="ability-title">✨ SKILL</div>
        <strong>${data.skillName}</strong>
        <p>${data.skillDescription}</p>
      </div>

      <div class="passive-info">
        <div class="ability-title">🌟 PASSIVE</div>
        <strong>${data.passiveName}</strong>
        <p>${data.passiveDescription}</p>
      </div>
    </div>
  `;
}


// =====================================================
// ACTION BUTTONS
// =====================================================

document.getElementById("attack-button").addEventListener("click", normalAttack);
document.getElementById("defend-button").addEventListener("click", defend);
document.getElementById("charge-button").addEventListener("click", charge);
document.getElementById("heal-button").addEventListener("click", heal);
document.getElementById("skill-button").addEventListener("click", useSkill);


// =====================================================
// DAMAGE BONUS HELPERS
// =====================================================

function getFighterDamageBonus(character) {
  if (character.key !== "fighter") return 0;
  if (character.hp <= 1) return 2;
  if (character.hp < 4) return 1;
  return 0;
}

function getAssassinNormalAttackBase(character) {
  if (!character || character.key !== "assassin") return 0;
  if (character.hp > 6) return 2.5;
  if (character.hp > 4) return 1.5;
  return 1;
}

function getChimeraNormalAttackBase(character) {
  if (!character || character.key !== "chimera") return 0;
  if (character.chimeraForm === "shell") return 0.5;
  if (character.chimeraForm === "spirit") return 0;
  return 1.5;
}

function getBaseNormalAttackDamage(character) {
  if (!character) return 0;
  if (character.key === "anubis") return 0;
  if (character.key === "assassin") return getAssassinNormalAttackBase(character);
  if (character.key === "chimera") return getChimeraNormalAttackBase(character);
  return Number(character.attack) || 0;
}

function getDevilAttackBonus(character) {
  if (character.key !== "devil") return 0;

  let bonus = 0;

  if (character.hp < 7) {
    bonus += 1;
  }

  if (
    character.berserk &&
    character.berserkAttackReady
  ) {
    bonus += 1.5;
  }

  return bonus;
}

function getPendingDamageBonus(character) {
  return character.nextAttackBonus + character.personalNextDamageBonus;
}

function consumeAttackBonus(character) {
  const bonus = getPendingDamageBonus(character);
  character.nextAttackBonus = 0;
  character.personalNextDamageBonus = 0;
  return bonus;
}


// =====================================================
// BASIC ACTIONS
// =====================================================

function normalAttack() {
  const attacker = turnOrder[currentTurn];
  pendingCommandType = "attack";

  if (attacker.key === "anubis") {
    showCommitConfirmation(
      attacker,
      `Use Anubis's 0-damage normal Attack to gain +1 Weight? Current Weight: ${attacker.anubisWeight || 0}.`,
      () => {
        changeAnubisSelfWeight(attacker, 1, "normal Attack");
        finishAction(
          `⚖️ ${attacker.name}'s normal Attack deals 0 damage and increases Weight to ${attacker.anubisWeight}.`
        );
      },
      () => showActions(attacker)
    );
    return;
  }

  pushActionStep(
    () => showActions(attacker)
  );

  showNormalAttackTargets(attacker);
}

function showNormalAttackTargets(attacker) {
  chooseTarget(
    getEnemyTeam(attacker),
    target => {
      const spiritZeroAttack =
        attacker.key === "chimera" &&
        attacker.chimeraForm === "spirit";

      const damage =
        spiritZeroAttack
          ? 0
          : (
              getBaseNormalAttackDamage(attacker) +
              consumeAttackBonus(attacker) +
              getFighterDamageBonus(attacker) +
              getDevilAttackBonus(attacker) +
              getVampireAttackBonus(attacker)
            );

      const vampireRebirthLifesteal =
        consumeVampireRebirthAttackBuff(attacker);

      const actualHpDamage =
        applyDamage(target, damage);

      triggerVampireNormalAttackGrowth(
        attacker,
        actualHpDamage,
        vampireRebirthLifesteal
      );

      resolveDevilPostNormalAttack(
        attacker,
        target
      );

      finishAction(
        `⚔️ ${attacker.name} attacks [${getBattleSlotId(target)}] ${target.name} for ${formatNumber(damage)} damage.`
      );
    },
    {
      title: "⚔️ Choose Attack Target",
      confirmText: target =>
        `Attack ${target.icon} ${target.name} for ${formatNumber(getNormalAttackPreviewDamage(attacker))} damage?`
    }
  );
}

function defend() {
  const character =
    turnOrder[currentTurn];
  pendingCommandType = "defend";

  showCommitConfirmation(
    character,
    `Use Defend with ${character.icon} ${character.name}? Incoming damage is reduced by 1 until this character's next turn.`,
    () => {
      character.defending = true;

      finishAction(
        `🛡️ ${character.name} defends. Incoming damage is reduced by 1 until their next turn.`
      );
    },
    () => showActions(character)
  );
}

function charge() {
  const character =
    turnOrder[currentTurn];
  pendingCommandType = "charge";

  showCommitConfirmation(
    character,
    `Gain 1 Charge with ${character.icon} ${character.name}?`,
    () => {
      gainCharge(character, 1);

      finishAction(
        `⚡ ${character.name} gains 1 Charge.`
      );
    },
    () => showActions(character)
  );
}

function heal() {
  const character =
    turnOrder[currentTurn];
  pendingCommandType = "heal";

  if (
    round < character.healReadyRound
  ) {
    pendingCommandType = null;
    return;
  }

  showCommitConfirmation(
    character,
    `Immediately recover up to 2 HP with ${character.icon} ${character.name}? After use, Heal is unavailable for the next 3 rounds.`,
    () => {
      const healed = applyHealing(character, 2);
      character.pendingHeal = 0;
      character.healReadyRound = round + 4;

      finishAction(
        `❤️ ${character.name} immediately recovers ${formatNumber(healed)} HP. Heal will be ready again on Round ${character.healReadyRound}.`
      );
    },
    () => showActions(character)
  );
}


// =====================================================
// DEVIL POST NORMAL ATTACK
// =====================================================

function resolveDevilPostNormalAttack(attacker, target) {
  if (
    !attacker ||
    attacker.key !== "devil"
  ) {
    return;
  }

  // New passive: if Devil is at 3 HP or lower when the post-attack
  // resolution begins, the normal attack restores 1 HP.
  const lowHpRecoveryActive =
    attacker.hp <= 3;

  if (
    attacker.berserk &&
    attacker.berserkAttackReady
  ) {
    attacker.berserkAttackReady = false;

    if (
      target.alive &&
      target.hp < 3
    ) {
      const before = attacker.hp;

      attacker.hp = Math.min(
        attacker.maxHP,
        attacker.hp + 1.5
      );

      const healed =
        attacker.hp - before;
      recordAnubisHealing(attacker, healed);

      if (healed > 0) {
        addLog(
          `😈 Berserk Bloodlust: ${attacker.name} restores ${formatNumber(healed)} HP because the target was left below 3 HP.`
        );
      }
    }
  }

  if (lowHpRecoveryActive && attacker.alive) {
    const before = attacker.hp;

    attacker.hp = Math.min(
      attacker.maxHP,
      attacker.hp + 1
    );

    const healed =
      attacker.hp - before;
    recordAnubisHealing(attacker, healed);

    if (healed > 0) {
      addLog(
        `😈 Desperate Feast: ${attacker.name} restores ${formatNumber(healed)} HP after a normal attack while at 3 HP or lower.`
      );
    }
  }
}


// =====================================================
// BLAST MAGE SKILL HEAL
// =====================================================

function triggerBlastMageSkillHeal(character) {
  if (
    character.key !== "blastMage" ||
    !character.alive
  ) {
    return;
  }

  character.maxHP += 0.5;

  const healed = applyHealing(character, 1);

  addLog(
    `💥 Arcane Blast grants ${character.name} +0.5 Max HP and restores ${formatNumber(healed)} HP.`
  );
}


// =====================================================
// SKILL ROUTER
// =====================================================

function useSkill() {
  const character =
    turnOrder[currentTurn];
  pendingCommandType = "skill";

  pushActionStep(
    () => showActions(character)
  );

  switch (character.key) {
    case "fighter":
      fighterSkill(character);
      break;

    case "blastMage":
      blastMageSkill(character);
      break;

    case "tank":
      tankSkill(character);
      break;

    case "cureMage":
      cureMageSkill(character);
      break;

    case "assassin":
      assassinSkill(character);
      break;

    case "king":
      kingSkill(character);
      break;

    case "puppeteer":
      puppeteerSkill(character);
      break;

    case "angel":
      angelSkill(character);
      break;

    case "devil":
      devilSkill(character);
      break;

    case "joker":
      jokerSkill(character);
      break;

    case "vampire":
      vampireSkill(character);
      break;

    case "anubis":
      anubisSkill(character);
      break;

    case "chimera":
      chimeraSkill(character);
      break;

    case "prophet":
      prophetSkill(character);
      break;
  }
}


// =====================================================
// FIGHTER
// =====================================================

function fighterSkill(character) {
  if (character.charge < 2) return;

  chooseTarget(getEnemyTeam(character), target => {
    character.charge -= 2;

    const damage =
      2.5 +
      getFighterDamageBonus(character) +
      consumeAttackBonus(character);

    applyDamage(target, damage);
    character.permanentShield += 1;

    finishAction(
      `⚔️ Guarded Strike! ${target.name} takes ${formatNumber(damage)} damage. ${character.name} gains 1 permanent Shield.`
    );
  });
}


// =====================================================
// BLAST MAGE
// =====================================================

function blastMageSkill(character) {
  if (character.charge < 2) return;

  setActionButtonsDisabled(true);

  contextPanel.innerHTML = `
    <strong>💥 Choose Charge Amount</strong>
    <div class="action-step-hint">
      Main target / secondary target damage
    </div>
  `;

  const bonus =
    getPendingDamageBonus(character);

  for (
    let amount = 2;
    amount <= character.charge;
    amount++
  ) {
    const mainDamage =
      2.5 +
      (amount - 2) +
      bonus;

    const secondaryDamage =
      1 +
      0.5 * (amount - 2);

    const button =
      document.createElement("button");

    button.textContent =
      `${amount} Charge → ${formatNumber(mainDamage)} / ${formatNumber(secondaryDamage)}`;

    button.onclick = () => {
      pushActionStep(
        () => blastMageSkill(character)
      );

      chooseBlastTarget(
        character,
        amount
      );
    };

    contextPanel.appendChild(button);
  }

  updateBackButton();
}

function chooseBlastTarget(
  character,
  chargeSpent
) {
  chooseTarget(
    getEnemyTeam(character),
    mainTarget => {
      character.charge -=
        chargeSpent;

      const bonus =
        consumeAttackBonus(character);

      const mainDamage =
        2.5 +
        (chargeSpent - 2) +
        bonus;

      const secondaryDamage =
        1 +
        0.5 * (chargeSpent - 2);

      const enemies =
        getEnemyTeam(character);

      const secondary =
        enemies.find(
          enemy =>
            enemy !== mainTarget &&
            enemy.alive
        );

      applyDamage(
        mainTarget,
        mainDamage
      );

      if (secondary) {
        applyDamage(
          secondary,
          secondaryDamage
        );
      }

      triggerBlastMageSkillHeal(
        character
      );

      finishAction(
        `💥 Arcane Blast! ${mainTarget.name} takes ${formatNumber(mainDamage)} damage${secondary ? ` and ${secondary.name} takes ${formatNumber(secondaryDamage)} damage` : ""}.`
      );
    },
    {
      title: "💥 Choose Arcane Blast Main Target",
      confirmText: target =>
        `Spend ${chargeSpent} Charge and use Arcane Blast on ${target.icon} ${target.name}?`
    }
  );
}


// =====================================================
// TANK
// =====================================================

function tankSkill(character) {
  if (character.charge < 2) return;

  const targets = getOwnTeam(character).filter(ally => ally.alive);

  if (!targets.length) return;

  chooseTarget(
    targets,
    target => {
      character.charge -= 2;

      const shieldAmount = target === character ? 2.5 : 3.5;

      grantShield(
        target,
        shieldAmount,
        "guardian",
        round + 1
      );

      finishAction(
        `🛡️ Guardian Shield! ${target.name} receives ${formatNumber(shieldAmount)} Shield for two rounds.`
      );
    },
    {
      title: "🛡️ Choose Guardian Shield Target",
      confirmText: target => {
        const shieldAmount = target === character ? 2.5 : 3.5;
        return `Give ${target.icon} ${target.name} ${formatNumber(shieldAmount)} Guardian Shield for two rounds?`;
      }
    }
  );
}


// =====================================================
// CURE MAGE
// =====================================================

function cureMageSkill(character) {
  if (character.charge < 2) return;

  setActionButtonsDisabled(true);

  contextPanel.innerHTML = `
    <strong>💚 Restoration Mark — Choose Charge Amount</strong>
    <div class="action-step-hint">
      Overheal beyond the first wasted HP becomes temporary Shield. Restoration Mark heals once at the end of the next round and refreshes instead of stacking.
    </div>
  `;

  for (
    let amount = 2;
    amount <= character.charge;
    amount++
  ) {
    const immediateHeal =
      2 +
      (amount - 2);

    const tickHeal =
      1 +
      0.5 * (amount - 2);

    const button =
      document.createElement("button");

    button.textContent =
      `${amount} Charge → ${formatNumber(immediateHeal)} now / ${formatNumber(tickHeal)} next-round Mark`;

    button.onclick = () => {
      pushActionStep(
        () => cureMageSkill(character)
      );

      chooseCureMarkTarget(
        character,
        amount
      );
    };

    contextPanel.appendChild(button);
  }

  updateBackButton();
}

function chooseCureMarkTarget(
  character,
  chargeSpent
) {
  const targets =
    getOwnTeam(character).filter(
      ally => ally.alive
    );

  chooseTarget(
    targets,
    target =>
      applyRestorationMark(
        character,
        target,
        chargeSpent
      ),
    {
      title: "💚 Choose Restoration Mark Target",
      confirmText: target =>
        `Spend ${chargeSpent} Charge to place Restoration Mark on ${target.icon} ${target.name}?`
    }
  );
}

function applyRestorationMark(
  character,
  target,
  chargeSpent
) {
  if (
    character.charge < chargeSpent ||
    chargeSpent < 2
  ) {
    return;
  }

  character.charge -= chargeSpent;

  const wasCritical =
    target.hp <= 2;

  const immediateHeal =
    2 +
    (chargeSpent - 2) +
    (wasCritical ? 1.5 : 0);

  const tickHeal =
    1 +
    0.5 * (chargeSpent - 2);

  const result =
    applyCureHealing(
      character,
      target,
      immediateHeal
    );

  // Marks refresh/replace instead of stacking.
  target.restorationMarkTicks = 1;
  target.restorationMarkHeal =
    tickHeal;

  finishAction(
    `💚 Restoration Mark! ${target.name} immediately recovers ${formatNumber(result.healed)} HP${wasCritical ? " (critical bonus applied)" : ""}${result.barrier > 0 ? ` and creates ${formatNumber(result.barrier)} temporary Shield from overheal` : ""}; the refreshed Mark will heal up to ${formatNumber(tickHeal)} HP at the end of the next round.`
  );
}

function checkAnubisLowHpPassive(character) {
  // Retired in the Anubis full rework.
  return;
}

function checkCureMagePassive(character) {
  checkAnubisLowHpPassive(character);
  if (
    character.key !== "cureMage" ||
    character.cureEmergencyUsed ||
    character.hp <= 0 ||
    character.hp >= 3
  ) {
    return;
  }

  character.cureEmergencyUsed = true;
  gainCharge(character, 1);

  const selfResult =
    applyCureHealing(
      character,
      character,
      3
    );

  const teammate =
    getOwnTeam(character).find(
      ally =>
        ally !== character &&
        ally.alive
    );

  let teammateResult = null;

  if (teammate) {
    teammateResult =
      applyCureHealing(
        character,
        teammate,
        3
      );
  }

  addLog(
    `💚 Emergency Blessing! ${character.name} restores ${formatNumber(selfResult.healed)} HP and gains 1 Charge${teammate ? `; ${teammate.name} restores ${formatNumber(teammateResult.healed)} HP` : ""}.`
  );
}


// =====================================================
// ASSASSIN
// =====================================================

function getAssassinExecutionBaseDamage(character) {
  return character && character.hp < 4
    ? 4.5
    : 6.5;
}

function assassinSkill(character) {
  if (character.charge < 4) return;

  chooseTarget(getEnemyTeam(character), target => {
    character.charge -= 4;

    const damage =
      getAssassinExecutionBaseDamage(character) +
      consumeAttackBonus(character);

    applyDamage(target, damage);

    character.invincible = true;

    if (target.alive) {
      gainCharge(character, 2);
    }

    finishAction(
      `🗡️ Execution deals ${formatNumber(damage)} damage to ${target.name}.${target.alive ? " Assassin regains 2 Charge because the target was not defeated." : ""}`
    );
  });
}


// =====================================================
// KING
// =====================================================

function kingSkill(character) {
  if (character.charge < 2) return;

  chooseTarget(
    getEnemyTeam(character),
    target => {
      character.charge -= 2;

      // Royal Command intentionally does not consume Angel Empower.
      applyDamage(
        target,
        2.5
      );

      if (target.alive) {
        target.stunTurns =
          Math.max(
            target.stunTurns,
            1
          );
      }

      // No duration was specified for the new Shield, so it is permanent.
      // Vampire still follows its universal no-Shield conversion rule.
      grantShield(
        character,
        0.5,
        "permanent"
      );

      const teammate =
        getLivingTeammate(character);

      if (teammate) {
        grantShield(
          teammate,
          0.5,
          "permanent"
        );
      }

      finishAction(
        `👑 Royal Command! ${target.name} takes 2.5 total damage${target.alive ? " and is stunned for the next action" : ""}. King${teammate ? ` and ${teammate.name}` : ""} gain 0.5 permanent Shield.`
      );
    },
    {
      title: "👑 Royal Command — Choose Main Target",
      subtitle:
        "Deal 2.5 total damage to the chosen main target. If it survives, stun it for 1 action. King and the living teammate gain 0.5 permanent Shield.",
      confirmText: target =>
        `Spend 2 Charge to command an attack on ${target.icon} ${target.name}?`
    }
  );
}


// =====================================================
// ANGEL
// =====================================================

function angelSkill(character) {
  if (character.charge < 1) return;

  setActionButtonsDisabled(true);

  const teammate =
    getOwnTeam(character).find(
      ally =>
        ally !== character &&
        ally.alive
    );

  contextPanel.innerHTML = `
    <strong>👼 Divine Blessing</strong>
    <br><br>
    ⚡ ${character.charge} Charge
    <br><br>
  `;

  const chargeButton =
    document.createElement("button");

  chargeButton.textContent =
    "⚡ Transfer Charge";

  chargeButton.disabled =
    !teammate;

  chargeButton.onclick = () => {
    pushActionStep(
      () => angelSkill(character)
    );

    angelChargeTransfer(character);
  };

  contextPanel.appendChild(
    chargeButton
  );

  const empowerButton =
    document.createElement("button");

  empowerButton.textContent =
    "✨ Empower — 2+ Charge";

  empowerButton.disabled =
    character.charge < 2 ||
    !teammate;

  empowerButton.onclick = () => {
    pushActionStep(
      () => angelSkill(character)
    );

    angelDamageMode(character);
  };

  contextPanel.appendChild(
    empowerButton
  );

  const lifeButton =
    document.createElement("button");

  lifeButton.textContent =
    "❤️ Life Transfer — 1 Charge";

  lifeButton.disabled =
    !teammate ||
    character.hp <= 1 ||
    teammate.hp >= teammate.maxHP;

  lifeButton.onclick = () => {
    pushActionStep(
      () => angelSkill(character)
    );

    angelLifeTransfer(character);
  };

  contextPanel.appendChild(
    lifeButton
  );

  updateBackButton();
}

function angelChargeTransfer(character) {
  const teammate =
    getOwnTeam(character).find(
      ally =>
        ally !== character &&
        ally.alive
    );

  if (!teammate) return;

  contextPanel.innerHTML = `
    <strong>⚡ Transfer Charge to ${teammate.name}</strong>
    <br><br>
  `;

  for (
    let amount = 1;
    amount <= character.charge;
    amount++
  ) {
    const button =
      document.createElement("button");

    button.textContent =
      `${amount} Charge`;

    button.onclick = () => {
      showCommitConfirmation(
        character,
        `Transfer ${amount} Charge to ${teammate.icon} ${teammate.name}?`,
        () => {
          character.charge -= amount;
          gainCharge(teammate, amount);

          finishAction(
            `👼 Angel transfers ${amount} Charge to ${teammate.name}.`
          );
        },
        () => angelChargeTransfer(character)
      );
    };

    contextPanel.appendChild(button);
  }

  updateBackButton();
}

function angelDamageMode(character) {
  const teammate =
    getOwnTeam(character).find(
      ally =>
        ally !== character &&
        ally.alive
    );

  if (!teammate) return;

  contextPanel.innerHTML = `
    <strong>✨ Choose Empower Amount for ${teammate.name}</strong>
    <br><br>
  `;

  for (
    let amount = 2;
    amount <= character.charge;
    amount++
  ) {
    const damageBonus =
      1 +
      0.5 * (amount - 2);

    const shieldBonus =
      1 +
      0.5 * (amount - 2);

    const button =
      document.createElement("button");

    button.textContent =
      `${amount} Charge → +${formatNumber(damageBonus)} Damage / +${formatNumber(shieldBonus)} Shield`;

    button.onclick = () => {
      showCommitConfirmation(
        character,
        `Spend ${amount} Charge to give ${teammate.icon} ${teammate.name} +${formatNumber(damageBonus)} next damage and ${formatNumber(shieldBonus)} Shield?`,
        () => {
          character.charge -= amount;

          teammate.nextAttackBonus =
            Math.max(
              teammate.nextAttackBonus,
              damageBonus
            );

          grantShield(
            teammate,
            shieldBonus,
            "angel",
            round + 1
          );

          finishAction(
            `✨ Divine Empowerment! ${teammate.name}'s next damaging action gains +${formatNumber(damageBonus)} damage and receives ${formatNumber(shieldBonus)} Shield.`
          );
        },
        () => angelDamageMode(character)
      );
    };

    contextPanel.appendChild(button);
  }

  updateBackButton();
}

function angelLifeTransfer(character) {
  const teammate =
    getOwnTeam(character).find(
      ally =>
        ally !== character &&
        ally.alive
    );

  if (!teammate || character.charge < 1) return;

  // Life conversion loses 0.5 HP in transfer. Angel sacrifices the chosen
  // amount from both current HP and Max HP; the teammate receives amount - 0.5.
  const maxSacrifice = Math.min(
    2,
    character.hp - 0.5,
    character.maxHP - 0.5,
    (teammate.maxHP - teammate.hp) + 0.5
  );

  if (maxSacrifice < 1) return;

  contextPanel.innerHTML = `
    <strong>❤️ Convert Life for ${teammate.name}</strong>
    <div class="action-step-hint">
      Angel sacrifices HP and Max HP. The teammate receives 0.5 less HP than Angel sacrifices.
    </div>
  `;

  for (
    let amount = 1;
    amount <= maxSacrifice + 0.001;
    amount += 0.5
  ) {
    const clean = Math.round(amount * 2) / 2;
    const received = Math.max(0, clean - 0.5);

    const button = document.createElement("button");
    button.textContent =
      `Sacrifice ${formatNumber(clean)} HP / Max HP → +${formatNumber(received)} HP`;

    button.onclick = () => {
      showCommitConfirmation(
        character,
        `Spend 1 Charge, sacrifice ${formatNumber(clean)} HP and Max HP from Angel, and restore ${formatNumber(received)} HP to ${teammate.icon} ${teammate.name}?`,
        () => {
          character.charge--;
          character.maxHP = Math.max(0.5, character.maxHP - clean);
          character.hp = Math.max(0.5, character.hp - clean);
          character.hp = Math.min(character.hp, character.maxHP);

          const healed = applyHealing(
            teammate,
            received
          );

          checkAngelLowHpPassive(character);
          checkVampireTeammateCrisis(character);

          finishAction(
            `👼 Angel sacrifices ${formatNumber(clean)} HP / Max HP and restores ${formatNumber(healed)} HP to ${teammate.name}.`
          );
        },
        () => angelLifeTransfer(character)
      );
    };

    contextPanel.appendChild(button);
  }

  updateBackButton();
}

function checkAngelLowHpPassive(character) {
  if (
    character.key !== "angel" ||
    character.angelLowHpPassiveUsed ||
    character.hp <= 0 ||
    character.hp >= 2
  ) {
    return;
  }

  character.angelLowHpPassiveUsed = true;
  character.personalNextDamageBonus += 1;

  addLog(
    `🌟 Last Light! ${character.name}'s next damaging action gains +1 damage.`
  );
}

function tryAngelBless(defeatedCharacter) {
  const team =
    getOwnTeam(defeatedCharacter);

  const angel = team.find(
    character =>
      character.key === "angel"
  );

  if (
    !angel ||
    (defeatedCharacter !== angel && !angel.alive) ||
    angel.angelBlessUsed ||
    defeatedCharacter.maxHP <= 0
  ) {
    return false;
  }

  angel.angelBlessUsed = true;

  // If Angel revives the teammate (not Angel herself), Angel loses half of
  // current HP rounded down to the nearest 0.5.
  if (defeatedCharacter !== angel && angel.alive) {
    const sacrifice = Math.floor((angel.hp / 2) * 2) / 2;
    angel.hp = Math.max(0, angel.hp - sacrifice);
    angel.hp = Math.min(angel.hp, angel.maxHP);

    addLog(
      `👼 Angel's Bless cost: ${angel.name} loses ${formatNumber(sacrifice)} HP to revive the teammate.`
    );

    if (angel.hp <= 0) {
      handleDeath(angel);
    } else {
      checkAngelLowHpPassive(angel);
      checkCureMagePassive(angel);
    }
  }

  defeatedCharacter.alive = true;

  defeatedCharacter.hp =
    Math.min(
      3,
      defeatedCharacter.maxHP
    );

  resetTemporaryStatesAfterRevive(
    defeatedCharacter
  );

  addLog(
    `👼 ANGEL'S BLESS! ${defeatedCharacter.name} revives with ${formatNumber(defeatedCharacter.hp)} HP and no revival Shield.`
  );

  checkAngelLowHpPassive(
    defeatedCharacter
  );

  checkCureMagePassive(
    defeatedCharacter
  );

  checkVampireTeammateCrisis(
    defeatedCharacter
  );

  return true;
}


// =====================================================
// PUPPETEER
// =====================================================

function puppeteerSkill(character) {
  setActionButtonsDisabled(true);

  contextPanel.innerHTML = `
    <strong>🎭 Puppet Workshop</strong>
    <br><br>
    ⚡ Charge: ${character.charge}
    <br>
    🎭 Regular Puppets: ${character.puppets}
    <br>
    🧵 Life Puppets: ${character.lifePuppets}
    <br><br>
  `;

  const createButton =
    document.createElement("button");

  createButton.textContent =
    "Create Puppet — 3 Charge";

  createButton.disabled =
    character.charge < 3;

  createButton.onclick = () => {
    showCommitConfirmation(
      character,
      "Spend 3 Charge to create 1 regular Puppet, gain +1 Max HP, and restore 1 HP?",
      () => createPuppet(character),
      () => puppeteerSkill(character)
    );
  };

  contextPanel.appendChild(
    createButton
  );

  const attackButton =
    document.createElement("button");

  attackButton.textContent =
    "🎭 Puppet Assault";

  attackButton.disabled =
    character.puppets <= 0;

  attackButton.onclick = () => {
    pushActionStep(
      () => puppeteerSkill(character)
    );

    puppetDamageMode(character);
  };

  contextPanel.appendChild(
    attackButton
  );

  const reviveButton =
    document.createElement("button");

  reviveButton.textContent =
    "🧵 Life Puppet";

  reviveButton.disabled =
    character.lifePuppets <= 0 &&
    character.puppets <= 0;

  reviveButton.onclick = () => {
    pushActionStep(
      () => puppeteerSkill(character)
    );

    puppetReviveMode(character);
  };

  contextPanel.appendChild(
    reviveButton
  );

  updateBackButton();
}

function createPuppet(character) {
  if (character.charge < 3) return;

  character.charge -= 3;
  character.puppets++;
  character.maxHP += 1;
  const healed = applyHealing(character, 1);

  finishAction(
    `🎭 Puppet created! ${character.name} gains +1 Max HP and restores ${formatNumber(healed)} HP.`
  );
}

function puppetDamageMode(character) {
  if (character.puppets <= 0) {
    return;
  }

  const enemies =
    getEnemyTeam(character).filter(
      enemy => enemy.alive
    );

  const totalDamage =
    5 +
    getPendingDamageBonus(character);

  if (enemies.length === 1) {
    const enemy = enemies[0];

    showCommitConfirmation(
      character,
      `Consume 1 Puppet and deal ${formatNumber(totalDamage)} damage to ${enemy.icon} ${enemy.name}?`,
      () => {
        character.puppets--;

        const damage =
          5 +
          consumeAttackBonus(character);

        applyDamage(
          enemy,
          damage
        );

        finishAction(
          `🎭 Puppet Assault deals ${formatNumber(damage)} damage to ${enemy.name}.`
        );
      },
      () => puppetDamageMode(character)
    );

    return;
  }

  contextPanel.innerHTML = `
    <strong>🎭 Distribute ${formatNumber(totalDamage)} Damage</strong>
    <br><br>
    Main target: ${enemies[0].name}
    <br>
    Secondary target: ${enemies[1].name}
    <br><br>
  `;

  for (
    let first = 0;
    first <= totalDamage + 0.001;
    first += 0.5
  ) {
    const firstDamage =
      Math.round(first * 2) / 2;

    const secondDamage =
      Math.round(
        (totalDamage - firstDamage) * 2
      ) / 2;

    const button =
      document.createElement("button");

    button.textContent =
      `${formatNumber(firstDamage)} / ${formatNumber(secondDamage)}`;

    button.onclick = () => {
      showCommitConfirmation(
        character,
        `Consume 1 Puppet and deal ${formatNumber(firstDamage)} to ${enemies[0].name} / ${formatNumber(secondDamage)} to ${enemies[1].name}?`,
        () => {
          character.puppets--;
          consumeAttackBonus(character);

          if (firstDamage > 0) {
            applyDamage(
              enemies[0],
              firstDamage
            );
          }

          if (
            secondDamage > 0 &&
            enemies[1].alive
          ) {
            applyDamage(
              enemies[1],
              secondDamage
            );
          }

          finishAction(
            `🎭 Puppet Assault: ${formatNumber(firstDamage)} / ${formatNumber(secondDamage)} damage.`
          );
        },
        () => puppetDamageMode(character)
      );
    };

    contextPanel.appendChild(button);
  }

  updateBackButton();
}

function puppetReviveMode(character) {
  if (
    character.lifePuppets <= 0 &&
    character.puppets <= 0
  ) {
    return;
  }

  const targets =
    getOwnTeam(character).filter(
      ally =>
        ally.alive &&
        !ally.revivePuppet
    );

  if (!targets.length) {
    contextPanel.innerHTML =
      "<strong>No valid Life Puppet target.</strong>";

    updateBackButton();
    return;
  }

  chooseTarget(
    targets,
    target =>
      attachLifePuppet(
        character,
        target
      ),
    {
      title: "🧵 Choose Life Puppet Target",
      confirmText: target =>
        `Attach a Life Puppet to ${target.icon} ${target.name}?`
    }
  );
}

function attachLifePuppet(puppeteer, target) {
  if (target.revivePuppet) return;

  if (puppeteer.lifePuppets > 0) {
    puppeteer.lifePuppets--;
  } else if (puppeteer.puppets > 0) {
    puppeteer.puppets--;
  } else {
    return;
  }

  target.revivePuppet = true;
  target.revivePuppetExpiresRound = round + 1;

  finishAction(
    `🧵 ${target.name} receives a Life Puppet for two rounds and will revive once at 50% Max HP if defeated before it expires.`
  );
}



// =====================================================
// JOKER
// =====================================================


function getJokerBallName(type) {
  if (type === "stun") {
    return "Stun Ball";
  }

  if (type === "heavy") {
    return "Heavy Ball";
  }

  if (type === "charge") {
    return "Charge Ball";
  }

  return "Juggling Ball";
}

function getJokerBallDescription(type) {
  if (type === "stun") {
    return "0 Damage + 1 Stun";
  }

  if (type === "heavy") {
    return "2 Damage";
  }

  if (type === "charge") {
    return "2 Balls → Ally gains 1 Charge";
  }

  return "";
}

function getJokerSelectionHistoryHTML(
  choices,
  targets
) {
  if (
    (!choices || choices.length === 0) &&
    (!targets || targets.length === 0)
  ) {
    return "";
  }

  let html = `
    <div class="joker-throw-history">
      <strong>Selected:</strong>
      <br>
  `;

  choices.forEach(
    (choice, index) => {
      const target =
        targets[index];

      html += `
        ${index + 1}. ${getJokerBallName(choice)}
        ${target ? `→ ${target.icon} ${target.name}` : ""}
        <br>
      `;
    }
  );

  html += "</div>";

  return html;
}



function jokerSkill(character) {
  setActionButtonsDisabled(true);

  contextPanel.innerHTML = `
    <strong>🃏 Juggling Trick</strong>
    <br><br>
    ⚡ Charge: ${character.charge}
    <br>
    🎪 Juggling Balls: ${character.jugglingBalls}
    <br>
    🤹 Stun Ball: ${
      round >= (character.jokerStunBallReadyRound || 1)
        ? "Ready"
        : `CD ${character.jokerStunBallReadyRound - round}R`
    }
    <br><br>
  `;

  const createButton =
    document.createElement("button");

  createButton.textContent =
    "🎪 Create Juggling Balls";

  createButton.disabled =
    character.charge <= 0;

  createButton.onclick = () => {
    pushActionStep(
      () => jokerSkill(character)
    );

    jokerCreateBallsMenu(character);
  };

  contextPanel.appendChild(
    createButton
  );

  const throwButton =
    document.createElement("button");

  throwButton.textContent =
    "🎯 Throw Juggling Ball(s)";

  throwButton.disabled =
    character.jugglingBalls <= 0;

  throwButton.onclick = () => {
    pushActionStep(
      () => jokerSkill(character)
    );

    jokerThrowMenu(character);
  };

  contextPanel.appendChild(
    throwButton
  );

  const chargeBallButton =
    document.createElement("button");

  chargeBallButton.textContent =
    "⚡ Charge Ball — 2 Balls";

  chargeBallButton.disabled =
    character.jugglingBalls < 2;

  chargeBallButton.onclick = () => {
    pushActionStep(
      () => jokerSkill(character)
    );

    jokerChargeBall(character);
  };

  contextPanel.appendChild(
    chargeBallButton
  );

  updateBackButton();
}

function jokerCreateBallsMenu(character) {
  if (character.charge <= 0) return;

  setActionButtonsDisabled(true);

  contextPanel.innerHTML = `
    <strong>🎪 Create Juggling Balls</strong>
    <div class="action-step-hint">
      Spend any amount of Charge. 1 Charge = 1 Ball.
    </div>
  `;

  for (
    let amount = 1;
    amount <= character.charge;
    amount++
  ) {
    const button =
      document.createElement("button");

    button.textContent =
      `${amount} Charge → ${amount} Ball${amount === 1 ? "" : "s"}`;

    button.onclick = () => {
      showCommitConfirmation(
        character,
        `Spend ${amount} Charge to create ${amount} Juggling Ball${amount === 1 ? "" : "s"}?`,
        () => {
          character.charge -= amount;
          character.jugglingBalls += amount;

          finishAction(
            `🎪 ${character.name} spends ${amount} Charge and creates ${amount} Juggling Ball${amount === 1 ? "" : "s"}.`
          );
        },
        () => jokerCreateBallsMenu(character)
      );
    };

    contextPanel.appendChild(button);
  }

  updateBackButton();
}

function jokerThrowMenu(character) {
  if (character.jugglingBalls <= 0) {
    return;
  }

  setActionButtonsDisabled(true);

  contextPanel.innerHTML = `
    <strong>🎯 Choose Throw Count</strong>
    <div class="action-step-hint">
      Current Balls: ${character.jugglingBalls}
    </div>
  `;

  const addThrowButton = count => {
    const button =
      document.createElement("button");

    button.textContent =
      `Throw ${count} Ball${count === 1 ? "" : "s"}`;

    button.onclick = () => {
      pushActionStep(
        () => jokerThrowMenu(character)
      );

      jokerChooseOrdinaryBallEffects(
        character,
        count,
        []
      );
    };

    contextPanel.appendChild(button);
  };

  addThrowButton(1);

  // Joker may throw at most 2 ordinary Balls in one action.
  if (character.jugglingBalls >= 2) {
    addThrowButton(2);
  }

  updateBackButton();
}

function jokerChooseOrdinaryBallEffects(
  character,
  count,
  choices = []
) {
  if (
    count < 1 ||
    count > 2 ||
    character.jugglingBalls < count
  ) {
    return;
  }

  const index = choices.length;

  if (index >= count) {
    jokerChooseOrdinaryTargets(
      character,
      choices,
      []
    );

    return;
  }

  setActionButtonsDisabled(true);

  contextPanel.innerHTML = `
    <strong>🎪 Ball ${index + 1} / ${count}</strong>
    ${getJokerSelectionHistoryHTML(choices, [])}
    <div class="action-step-current">
      Choose this Ball's effect.
    </div>
  `;

  const chooseEffect = effect => {
    pushActionStep(
      () =>
        jokerChooseOrdinaryBallEffects(
          character,
          count,
          choices
        )
    );

    jokerChooseOrdinaryBallEffects(
      character,
      count,
      [...choices, effect]
    );
  };

  const stunButton =
    document.createElement("button");

  const stunBallOnCooldown =
    round < (character.jokerStunBallReadyRound || 1);

  const stunAlreadyChosen =
    choices.includes("stun");

  stunButton.textContent =
    stunBallOnCooldown
      ? `🤹 Stun Ball — CD ${character.jokerStunBallReadyRound - round}R`
      : "🤹 Stun Ball — 0 Damage + 1 Stun";

  stunButton.disabled =
    stunBallOnCooldown ||
    stunAlreadyChosen;

  stunButton.onclick =
    () => chooseEffect("stun");

  contextPanel.appendChild(
    stunButton
  );

  const heavyButton =
    document.createElement("button");

  heavyButton.textContent =
    "💥 Heavy Ball — 2 Damage";

  heavyButton.onclick =
    () => chooseEffect("heavy");

  contextPanel.appendChild(
    heavyButton
  );

  updateBackButton();
}

function jokerChooseOrdinaryTargets(
  character,
  choices,
  targets = []
) {
  const index = targets.length;

  if (index >= choices.length) {
    const summary =
      choices.map(
        (choice, i) =>
          `${i + 1}. ${getJokerBallName(choice)} → ${targets[i].icon} ${targets[i].name}`
      ).join("<br>");

    showCommitConfirmation(
      character,
      `Throw ${choices.length} Ball${choices.length === 1 ? "" : "s"}?<br><br>${summary}`,
      () =>
        executeJokerOrdinaryThrow(
          character,
          choices,
          targets
        )
    );

    return;
  }

  const choice =
    choices[index];

  const total =
    choices.length;

  chooseTarget(
    getEnemyTeam(character),
    target => {
      pushActionStep(
        () =>
          jokerChooseOrdinaryTargets(
            character,
            choices,
            targets
          )
      );

      jokerChooseOrdinaryTargets(
        character,
        choices,
        [...targets, target]
      );
    },
    {
      title:
        `🎪 Ball ${index + 1} / ${total} — ${getJokerBallName(choice)}`,
      subtitle:
        `${getJokerBallDescription(choice)}<br>Choose this Ball's target.`,
      historyHTML:
        getJokerSelectionHistoryHTML(
          choices,
          targets
        ),
      confirm: false
    }
  );
}

function executeJokerOrdinaryThrow(character, choices, targets) {
  const count = choices.length;

  if (
    count < 1 ||
    count > 2 ||
    character.jugglingBalls < count
  ) {
    return;
  }

  const stunCount =
    choices.filter(choice => choice === "stun").length;

  if (
    stunCount > 1 ||
    (
      stunCount > 0 &&
      round < (character.jokerStunBallReadyRound || 1)
    )
  ) {
    return;
  }

  character.jugglingBalls -= count;

  let summary = [];

  for (let i = 0; i < count; i++) {
    const target = targets[i];
    if (!target || !target.alive) continue;

    if (choices[i] === "stun") {
      // Stun Ball no longer deals damage, but it is still an attack instance
      // for Anubis's attack-count passive.
      registerAnubisAttackInstance(target);
      if (target.alive) {
        target.stunTurns += 1;
      }
      summary.push(`${target.name}: Stun (0 damage)`);
    } else {
      applyDamage(target, 2);
      summary.push(`${target.name}: 2 damage`);
    }

    registerJokerThrownBall(character);
  }

  if (choices.includes("stun")) {
    // One complete round of cooldown: used in Round R, unavailable in R+1,
    // available again in R+2.
    character.jokerStunBallReadyRound =
      round + 2;
  }

  finishAction(
    `🃏 ${character.name} throws ${count} Juggling Ball${count === 1 ? "" : "s"}! ${summary.join("; ")}`
  );
}

function jokerChargeBall(character) {
  if (character.jugglingBalls < 2) {
    return;
  }

  const allies =
    getOwnTeam(character).filter(
      ally => ally.alive
    );

  chooseTarget(
    allies,
    target => {
      character.jugglingBalls -= 2;
      gainCharge(target, 1);

      finishAction(
        `⚡ Charge Ball! ${character.name} uses 2 Juggling Balls to give ${target.name} 1 Charge.`
      );
    },
    {
      title: "⚡ Charge Ball — Choose Ally",
      subtitle: "Consumes 2 Juggling Balls and gives the chosen living ally +1 Charge.",
      confirmText: target =>
        `Use 2 Balls to give ${target.icon} ${target.name} +1 Charge?`
    }
  );
}

function registerJokerThrownBall(character) {
  character.jokerBallsThrown++;

  if (
    character.jokerBallsThrown % 5 !== 0
  ) {
    return;
  }

  grantShield(
    character,
    2,
    "joker",
    round
  );

  const teammate = getLivingTeammate(character);
  if (teammate) {
    grantShield(
      teammate,
      0.5,
      "joker",
      round
    );
  }

  addLog(
    `🎆 GRAND FINALE! ${character.name} has thrown ${character.jokerBallsThrown} Balls: Joker gains 2 Shield for one round${teammate ? ` and ${teammate.name} gains 0.5 Shield for one round` : ""}.`
  );
}


// =====================================================
// VAMPIRE
// =====================================================

function vampireSkill(character) {
  setActionButtonsDisabled(true);

  const teammate = getAnyTeammate(character);
  const livingTeammate = getLivingTeammate(character);
  const selfHealCost = teammate && !teammate.alive ? 1 : 2;

  contextPanel.innerHTML = `
    <strong>🧛 Blood Drain</strong>
    <br><br>
    ⚡ Charge: ${character.charge}
    <br>
    ❤️ HP: ${formatNumber(character.hp)} / ${formatNumber(character.maxHP)}
    <br><br>
  `;

  const allyDrainButton = document.createElement("button");
  allyDrainButton.textContent = "🩸 Drain Teammate — 0 Charge";
  allyDrainButton.disabled =
    !livingTeammate ||
    livingTeammate.hp <= 0.5 ||
    (character.maxHP >= VAMPIRE_MAX_HP_CAP && character.hp >= character.maxHP);

  allyDrainButton.onclick = () => {
    pushActionStep(() => vampireSkill(character));
    vampireAllyDrainMenu(character);
  };
  contextPanel.appendChild(allyDrainButton);

  const selfHealButton = document.createElement("button");
  selfHealButton.textContent = `❤️ Blood Recovery — ${selfHealCost} Charge`;
  selfHealButton.disabled =
    character.charge < selfHealCost ||
    character.hp >= character.maxHP;

  selfHealButton.onclick = () => {
    showCommitConfirmation(
      character,
      `Spend ${selfHealCost} Charge to restore up to 2 HP?`,
      () => {
        character.charge -= selfHealCost;
        const before = character.hp;
        character.hp = Math.min(character.maxHP, character.hp + 2);
        recordAnubisHealing(character, character.hp - before);
        finishAction(
          `🧛 ${character.name} spends ${selfHealCost} Charge and restores ${formatNumber(character.hp - before)} HP.`
        );
      },
      () => vampireSkill(character)
    );
  };
  contextPanel.appendChild(selfHealButton);

  updateBackButton();
}

function vampireAllyDrainMenu(character) {
  const teammate = getLivingTeammate(character);
  if (!teammate) return;

  // Drain choice is limited only by the 3 HP skill cap and the teammate's
  // current HP. Vampire's own Max HP cap must NOT reduce the selectable
  // drain amount; excess growth/healing is simply capped when resolved.
  const maximum = Math.min(3, teammate.hp - 0.5);

  if (maximum <= 0) {
    contextPanel.innerHTML =
      "<strong>Blood Drain cannot be used on the teammate right now.</strong>";
    updateBackButton();
    return;
  }

  contextPanel.innerHTML = `
    <strong>🩸 Drain ${teammate.name}</strong>
    <div class="action-step-hint">
      Drain up to 3 HP, regardless of Vampire's remaining Max HP growth room.
      Vampire restores the drained amount and gains the same amount of Max HP,
      both capped by the 13 Max HP limit. The teammate loses only current HP;
      their Max HP is not reduced.
    </div>
  `;

  for (let amount = 0.5; amount <= maximum + 0.001; amount += 0.5) {
    const clean = Math.round(amount * 2) / 2;
    const button = document.createElement("button");
    button.textContent = `Drain ${formatNumber(clean)} HP`;

    button.onclick = () => {
      showCommitConfirmation(
        character,
        `Drain ${formatNumber(clean)} HP from ${teammate.icon} ${teammate.name}? Vampire restores up to ${formatNumber(clean)} HP and gains up to ${formatNumber(clean)} Max HP (Max HP cap 13); teammate Max HP is unchanged.`,
        () => executeVampireAllyDrain(character, teammate, clean),
        () => vampireAllyDrainMenu(character)
      );
    };

    contextPanel.appendChild(button);
  }

  updateBackButton();
}

function executeVampireAllyDrain(vampire, teammate, amount) {
  const beforeHp = vampire.hp;
  const beforeMaxHp = vampire.maxHP;

  teammate.hp -= amount;
  growVampireLife(vampire, amount);

  const healed = vampire.hp - beforeHp;
  const maxHpGained = vampire.maxHP - beforeMaxHp;
  recordAnubisHealing(vampire, healed);

  checkAngelLowHpPassive(teammate);
  checkCureMagePassive(teammate);

  if (teammate.hp <= 0) {
    handleDeath(teammate);
  }

  finishAction(
    `🧛 ${vampire.name} drains ${formatNumber(amount)} HP from ${teammate.name}, restores ${formatNumber(healed)} HP, and gains +${formatNumber(maxHpGained)} Max HP. ${teammate.name}'s Max HP is unchanged.`
  );
}

function vampireEnemyDrain(character) {
  if (character.charge < 3) {
    return;
  }

  chooseTarget(
    getEnemyTeam(character),
    target => {
      character.charge -= 3;

      target.hp -= 1.5;

      growVampireLife(
        character,
        1.5
      );

      addLog(
        `🩸 ${target.name} directly loses 1.5 HP to Vampire's drain.`
      );

      checkVampireTeammateCrisis(
        target
      );

      if (target.hp <= 0) {
        handleDeath(target);
      } else {
        checkAngelLowHpPassive(
          target
        );

        checkCureMagePassive(
          target
        );
      }

      finishAction(
        `🧛 ${character.name} spends 3 Charge to drain 1.5 HP from ${target.name}, gaining +1.5 HP / Max HP.`
      );
    },
    {
      title: "🩸 Enemy Drain — Choose Target",
      subtitle:
        "Directly removes 1.5 HP, ignores Shield/Defend, and does not reduce the target's Max HP.",
      confirmText: target =>
        `Spend 3 Charge to directly drain 1.5 HP from ${target.icon} ${target.name}?`
    }
  );
}



// =====================================================
// DEVIL
// =====================================================

function devilSkill(character) {
  if (character.berserk) {
    contextPanel.innerHTML =
      "<strong>😈 Devil cannot use skills during Berserk.</strong>";

    updateBackButton();
    return;
  }

  setActionButtonsDisabled(true);

  const teammate =
    getOwnTeam(character).find(
      ally =>
        ally !== character &&
        ally.alive
    );

  contextPanel.innerHTML = `
    <strong>😈 Blood Pact</strong>
    <br><br>
  `;

  const drainButton =
    document.createElement("button");

  drainButton.textContent =
    "🩸 Blood Drain";

  drainButton.disabled =
    !teammate ||
    teammate.hp <= 0.5;

  drainButton.onclick = () => {
    pushActionStep(
      () => devilSkill(character)
    );

    devilBloodDrain(character);
  };

  contextPanel.appendChild(
    drainButton
  );

  const berserkButton =
    document.createElement("button");

  berserkButton.textContent =
    "🔥 Berserk — 2 Charge";

  berserkButton.disabled =
    character.charge < 2;

  berserkButton.onclick = () => {
    pushActionStep(
      () => devilSkill(character)
    );

    devilEnterBerserk(character);
  };

  contextPanel.appendChild(
    berserkButton
  );

  updateBackButton();
}

function devilBloodDrain(character) {
  const teammate =
    getOwnTeam(character).find(
      ally =>
        ally !== character &&
        ally.alive
    );

  if (!teammate) return;

  const maximum =
    Math.min(
      5,
      teammate.hp - 0.5
    );

  if (maximum <= 0) {
    contextPanel.innerHTML =
      "<strong>Your teammate does not have enough HP.</strong>";

    updateBackButton();
    return;
  }

  contextPanel.innerHTML = `
    <strong>🩸 Choose HP to Drain from ${teammate.name}</strong>
    <div class="action-step-hint">
      The teammate receives drained HP + 1 as temporary Shield for two rounds.
    </div>
  `;

  for (
    let amount = 0.5;
    amount <= maximum + 0.001;
    amount += 0.5
  ) {
    const clean =
      Math.round(amount * 2) / 2;

    const shield = clean + 1;

    const button =
      document.createElement("button");

    button.textContent =
      `Drain ${formatNumber(clean)} HP → +${formatNumber(clean)} Max HP / ${formatNumber(shield)} Shield`;

    button.onclick = () => {
      showCommitConfirmation(
        character,
        `Drain ${formatNumber(clean)} HP from ${teammate.icon} ${teammate.name}?`,
        () =>
          executeDevilDrain(
            character,
            teammate,
            clean
          ),
        () => devilBloodDrain(character)
      );
    };

    contextPanel.appendChild(button);
  }

  updateBackButton();
}

function executeDevilDrain(
  devil,
  teammate,
  amount
) {
  teammate.hp -= amount;

  // The drained life permanently increases Devil's maximum HP.
  devil.maxHP += amount;

  const before = devil.hp;

  devil.hp = Math.min(
    devil.maxHP,
    devil.hp + amount
  );
  recordAnubisHealing(devil, devil.hp - before);

  const shieldAmount = amount + 1;

  if (shieldAmount > 0) {
    grantShield(
      teammate,
      shieldAmount,
      "devil",
      round + 1
    );
  }

  checkAngelLowHpPassive(
    teammate
  );

  checkCureMagePassive(
    teammate
  );

  checkVampireTeammateCrisis(
    teammate
  );

  finishAction(
    `🩸 ${devil.name} drains ${formatNumber(amount)} HP from ${teammate.name}, permanently gains ${formatNumber(amount)} Max HP, restores ${formatNumber(devil.hp - before)} HP, and grants ${teammate.name} ${formatNumber(shieldAmount)} Shield for two rounds.`
  );
}

function devilEnterBerserk(character) {
  if (
    character.charge < 2 ||
    character.berserk
  ) {
    return;
  }

  const enemies =
    getEnemyTeam(character).filter(
      enemy => enemy.alive
    );

  const totalDamage =
    3 +
    getPendingDamageBonus(character);

  if (enemies.length === 1) {
    showCommitConfirmation(
      character,
      `Spend 2 Charge to enter Berserk and deal ${formatNumber(totalDamage)} entry damage to ${enemies[0].icon} ${enemies[0].name}?`,
      () =>
        finalizeDevilBerserk(
          character,
          enemies,
          [totalDamage]
        ),
      () => devilEnterBerserk(character)
    );

    return;
  }

  contextPanel.innerHTML = `
    <strong>🔥 Distribute ${formatNumber(totalDamage)} Berserk Entry Damage</strong>
    <br><br>
    ${enemies[0].name} / ${enemies[1].name}
    <br><br>
  `;

  for (
    let first = 0;
    first <= totalDamage + 0.001;
    first += 0.5
  ) {
    const firstDamage =
      Math.round(first * 2) / 2;

    const secondDamage =
      Math.round(
        (totalDamage - firstDamage) * 2
      ) / 2;

    const button =
      document.createElement("button");

    button.textContent =
      `${formatNumber(firstDamage)} / ${formatNumber(secondDamage)}`;

    button.onclick = () => {
      showCommitConfirmation(
        character,
        `Enter Berserk and deal ${formatNumber(firstDamage)} to ${enemies[0].name} / ${formatNumber(secondDamage)} to ${enemies[1].name}?`,
        () =>
          finalizeDevilBerserk(
            character,
            enemies,
            [
              firstDamage,
              secondDamage
            ]
          ),
        () => devilEnterBerserk(character)
      );
    };

    contextPanel.appendChild(button);
  }

  updateBackButton();
}

function finalizeDevilBerserk(
  character,
  enemies,
  damages
) {
  if (
    character.charge < 2 ||
    character.berserk
  ) {
    return;
  }

  character.charge -= 2;

  character.berserk = true;
  character.berserkEndRound =
    round + 1;

  character.berserkAttackReady =
    true;

  character.berserkPendingDeath =
    false;

  // Angel Empower increases the total Berserk damage pool.
  consumeAttackBonus(character);

  const before =
    character.hp;

  character.hp = Math.min(
    character.maxHP,
    character.hp + 1.5
  );
  recordAnubisHealing(character, character.hp - before);

  grantShield(
    character,
    1.5,
    "permanent"
  );

  enemies.forEach(
    (enemy, index) => {
      if (
        enemy &&
        enemy.alive &&
        damages[index] > 0
      ) {
        applyDamage(
          enemy,
          damages[index]
        );
      }
    }
  );

  // The first enemy in the distribution UI is the Berserk main target.
  // If it survives, it is stunned for its next action.
  const mainTarget = enemies[0];

  if (
    mainTarget &&
    mainTarget.alive &&
    damages[0] > 0
  ) {
    mainTarget.stunTurns += 1;

    addLog(
      `💫 Berserk impact: ${mainTarget.name} is stunned for the next action.`
    );
  }

  finishAction(
    `🔥 Berserk! ${character.name} restores ${formatNumber(character.hp - before)} HP, gains 1.5 permanent Shield, deals ${formatNumber(damages.reduce((a, b) => a + b, 0))} total distributed damage, and stuns the surviving main target.`
  );
}



// =====================================================
// ANUBIS
// =====================================================

function canAnubisUseSentence(character) {
  if (!character || character.key !== "anubis" || !character.alive) return false;
  const target = getAnubisBoundTarget(character);
  if (!target) return false;

  const weight = Math.max(0, Math.floor(Number(character.anubisWeight) || 0));
  return character.charge >= 2 && weight > target.maxHP / 2;
}

function bindAnubisTarget(character, target) {
  if (
    !character ||
    character.key !== "anubis" ||
    !target ||
    !target.alive ||
    target.team === character.team
  ) {
    return false;
  }

  character.anubisBoundTargetBattleId = target.battleId;
  return true;
}

function executeAnubisSoulSentence(character) {
  const target = getAnubisBoundTarget(character);
  if (!target || !canAnubisUseSentence(character)) return false;

  const weight = Math.max(0, Math.floor(Number(character.anubisWeight) || 0));
  const targetHpBefore = Math.max(0, Number(target.hp) || 0);
  const fighterLastStandUsedBefore = Boolean(target.fighterLastStandSaveUsed);

  character.charge -= 2;

  const dealt = applyDirectHpLoss(
    target,
    weight,
    character,
    "⚖️ Soul Sentence"
  );

  // A lethal Soul Sentence counts as a defeat even if an immediate revival
  // effect brings the target back. Fighter's Last Stand is explicitly a
  // survival effect, not a defeat, so triggering Last Stand does not qualify.
  const lethalHit = dealt >= targetHpBefore - 0.0001;
  const fighterLastStandTriggered =
    target.key === "fighter" &&
    !fighterLastStandUsedBefore &&
    Boolean(target.fighterLastStandSaveUsed) &&
    target.alive;
  const defeatedBySentence = lethalHit && !fighterLastStandTriggered;

  if (!defeatedBySentence && character.alive) {
    const selfLoss = character.hp / 2;
    applyDirectHpLoss(
      character,
      selfLoss,
      character,
      "⚖️ Price of Judgment"
    );
  }

  if (character.alive) {
    character.anubisJudgmentShield = 1;
    character.anubisJudgmentShieldExpiresRound = round + 1;

    if (!defeatedBySentence) {
      character.stunTurns = Math.max(character.stunTurns, 1);
    }
  }

  if (defeatedBySentence) {
    // Successful execution reward: keep all Weight and skip the HP/stun price.
    finishAction(
      `⚖️ Soul Sentence Execution: ${target.name} suffers a defeat from ${formatNumber(dealt)} direct HP loss at Weight ${weight}. ${character.name} keeps Weight ${weight}, takes no self HP loss, gains 1 Judgment Shield for two rounds, and is not stunned.`
    );
    return true;
  }

  // If the target survives, Soul Sentence pays its normal price and consumes Weight.
  character.anubisWeight = 0;

  finishAction(
    `⚖️ Soul Sentence: ${target.name} directly loses ${formatNumber(dealt)} HP from Weight ${weight}. ${character.name} then loses half of current HP, gains 1 Judgment Shield for two rounds, is stunned for 1 action, and Weight resets to 0.`
  );

  return true;
}

function executeAnubisWeighHeart(character) {
  if (
    !character ||
    character.key !== "anubis" ||
    !character.alive ||
    character.charge < 1
  ) {
    return false;
  }

  character.charge -= 1;
  changeAnubisSelfWeight(character, 2, "Weigh the Heart");

  const lost = applyDirectHpLoss(
    character,
    0.5,
    character,
    "⚖️ Weigh the Heart"
  );

  finishAction(
    `⚖️ Weigh the Heart: ${character.name} spends 1 Charge, gains 2 Weight, and directly loses ${formatNumber(lost)} HP.`
  );

  return true;
}

function anubisSkill(character) {
  setActionButtonsDisabled(true);

  const enemies = getEnemyTeam(character).filter(enemy => enemy.alive);
  const boundTarget = getAnubisBoundTarget(character);
  const weight = Math.max(0, Math.floor(Number(character.anubisWeight) || 0));

  contextPanel.innerHTML = `
    <strong>⚖️ Scales of the Duat</strong>
    <div class="action-step-hint">
      Weight: ${weight} · Charge: ${character.charge}
      <br>
      Bound target: ${boundTarget ? `${boundTarget.icon} ${boundTarget.name}` : "None"}
    </div>
  `;

  const bindButton = document.createElement("button");
  bindButton.textContent = "🔗 Bind the Scales — 0 Charge";
  bindButton.disabled = enemies.length === 0;
  bindButton.onclick = () => {
    pushActionStep(() => anubisSkill(character));
    chooseTarget(
      enemies,
      target => {
        bindAnubisTarget(character, target);
        finishAction(
          `🔗 ${character.name} binds Weight ${character.anubisWeight || 0} to ${target.name}.`
        );
      },
      {
        title: "🔗 Choose Weight-Bound Target",
        confirmText: target =>
          `Bind Anubis's current Weight (${weight}) to ${target.icon} ${target.name} for 0 Charge?`
      }
    );
  };
  contextPanel.appendChild(bindButton);

  const weighButton = document.createElement("button");
  weighButton.textContent = "⚖️ Weigh the Heart — 1 Charge (+2 Weight, -0.5 HP)";
  weighButton.disabled = character.charge < 1;
  weighButton.onclick = () => {
    showCommitConfirmation(
      character,
      `Spend 1 Charge to gain 2 Weight? ${character.name} will then directly lose 0.5 HP.`,
      () => executeAnubisWeighHeart(character),
      () => anubisSkill(character)
    );
  };
  contextPanel.appendChild(weighButton);

  const sentenceButton = document.createElement("button");
  const thresholdText = boundTarget
    ? formatNumber(boundTarget.maxHP / 2)
    : "—";
  sentenceButton.textContent =
    `☠️ Soul Sentence — 2 Charge${boundTarget ? ` (${weight} Weight > ${thresholdText} required)` : ""}`;
  sentenceButton.disabled = !canAnubisUseSentence(character);
  sentenceButton.onclick = () => {
    const target = getAnubisBoundTarget(character);
    if (!target) {
      anubisSkill(character);
      return;
    }

    showCommitConfirmation(
      character,
      `Spend 2 Charge? ${target.name} will directly lose ${weight} HP because Weight ${weight} is greater than half of Max HP (${formatNumber(target.maxHP / 2)}). Then Anubis loses half of current HP, gains 1 Shield for two rounds, and is stunned for 1 action.`,
      () => executeAnubisSoulSentence(character),
      () => anubisSkill(character)
    );
  };
  contextPanel.appendChild(sentenceButton);

  if (boundTarget && !canAnubisUseSentence(character)) {
    const hint = document.createElement("div");
    hint.className = "action-step-hint";
    const reasons = [];
    if (character.charge < 2) reasons.push(`needs 2 Charge (current ${character.charge})`);
    if (!(weight > boundTarget.maxHP / 2)) {
      reasons.push(
        `Weight must be greater than ${formatNumber(boundTarget.maxHP / 2)} (current ${weight})`
      );
    }
    hint.textContent = `Soul Sentence unavailable: ${reasons.join("; ")}.`;
    contextPanel.appendChild(hint);
  }

  updateBackButton();
}


// =====================================================
// CHIMERA
// =====================================================

const CHIMERA_FORM_INFO = {
  beast: { icon: "🐺", name: "Beast" },
  shell: { icon: "🐢", name: "Shell" },
  spirit: { icon: "👻", name: "Spirit" }
};

function getChimeraFormInfo(form) {
  return CHIMERA_FORM_INFO[form] || CHIMERA_FORM_INFO.beast;
}

function canChimeraActivelyEnterSpirit(character) {
  return Boolean(
    character &&
    character.key === "chimera" &&
    round >= (Number(character.chimeraSpiritReadyRound) || 1)
  );
}

function setChimeraForm(character, newForm, activeEntry = false) {
  if (
    !character ||
    character.key !== "chimera" ||
    !CHIMERA_FORM_INFO[newForm] ||
    character.chimeraForm === newForm
  ) {
    return false;
  }

  character.chimeraForm = newForm;
  character.icon = getChimeraFormInfo(newForm).icon;

  if (activeEntry && newForm === "spirit") {
    // Enter on R1 -> R2/R3 blocked -> ready on R4.
    character.chimeraSpiritReadyRound = round + 3;
  }

  return true;
}

function executeChimeraDirectShift(character, newForm) {
  if (
    !character ||
    character.key !== "chimera" ||
    character.chimeraForm === newForm
  ) {
    return false;
  }

  if (
    newForm === "spirit" &&
    !canChimeraActivelyEnterSpirit(character)
  ) {
    return false;
  }

  if (!setChimeraForm(character, newForm, newForm === "spirit")) {
    return false;
  }

  const info = getChimeraFormInfo(newForm);

  finishAction(
    `🧬 Direct Shift: ${character.name} changes into ${info.icon} ${info.name} form for 0 Charge. No entry effect triggers.`
  );

  return true;
}

function executeChimeraEmpoweredShellEntry(character) {
  if (
    !character ||
    character.key !== "chimera" ||
    character.charge < 1 ||
    character.chimeraForm === "shell"
  ) {
    return false;
  }

  character.charge -= 1;
  setChimeraForm(character, "shell", true);

  grantShield(
    character,
    2,
    "chimeraShell",
    round + 1
  );

  finishAction(
    `🐢 Empowered Shift: ${character.name} enters Shell form and refreshes 2 Shield for two rounds.`
  );

  return true;
}

function chimeraEmpoweredTargetEntry(character, newForm) {
  if (
    !character ||
    character.key !== "chimera" ||
    character.charge < 1 ||
    character.chimeraForm === newForm
  ) {
    return;
  }

  if (
    newForm === "spirit" &&
    !canChimeraActivelyEnterSpirit(character)
  ) {
    return;
  }

  const enemies = getEnemyTeam(character).filter(enemy => enemy.alive);
  if (!enemies.length) return;

  const info = getChimeraFormInfo(newForm);

  chooseTarget(
    enemies,
    target => {
      if (
        character.charge < 1 ||
        character.chimeraForm === newForm
      ) {
        chimeraSkill(character);
        return;
      }

      character.charge -= 1;
      setChimeraForm(character, newForm, newForm === "spirit");

      if (newForm === "beast") {
        addChimeraBleed(character, target);

        finishAction(
          `🐺 Empowered Shift: ${character.name} enters Beast form and applies 1 Bleed to ${target.name}.`
        );
        return;
      }

      if (newForm === "spirit") {
        target.stunTurns += 1;

        finishAction(
          `👻 Empowered Shift: ${character.name} enters Spirit form and stuns ${target.name} for the next normal action.`
        );
      }
    },
    {
      title: `${info.icon} Empowered Shift — Choose Entry Target`,
      confirmText: target =>
        `Spend 1 Charge to enter ${info.name} form and apply its entry effect to ${target.icon} ${target.name}?`
    }
  );
}

function chimeraShowShiftOptions(character, newForm) {
  if (
    !character ||
    character.key !== "chimera" ||
    character.chimeraForm === newForm
  ) {
    return;
  }

  const info = getChimeraFormInfo(newForm);
  const spiritBlocked =
    newForm === "spirit" &&
    !canChimeraActivelyEnterSpirit(character);

  setActionButtonsDisabled(true);

  contextPanel.innerHTML = `
    <strong>${info.icon} Shift to ${info.name}</strong>
    <div class="action-step-hint">
      Direct Shift costs 0 Charge and does not trigger the entry effect.
      <br>
      Empowered Shift costs 1 Charge and triggers the entry effect.
      ${
        newForm === "spirit"
          ? `<br>Spirit entry cooldown: ${
              spiritBlocked
                ? `ready on Round ${character.chimeraSpiritReadyRound}`
                : "Ready"
            }`
          : ""
      }
    </div>
  `;

  const directButton = document.createElement("button");
  directButton.textContent = `🧬 Direct Shift → ${info.icon} ${info.name} — 0 Charge`;
  directButton.disabled = spiritBlocked;
  directButton.onclick = () => {
    showCommitConfirmation(
      character,
      `Directly shift into ${info.name} form for 0 Charge? This uses the action and does not trigger the entry effect.`,
      () => executeChimeraDirectShift(character, newForm),
      () => chimeraShowShiftOptions(character, newForm)
    );
  };
  contextPanel.appendChild(directButton);

  const empoweredButton = document.createElement("button");
  empoweredButton.textContent = `✨ Empowered Shift → ${info.icon} ${info.name} — 1 Charge`;
  empoweredButton.disabled = character.charge < 1 || spiritBlocked;
  empoweredButton.onclick = () => {
    if (newForm === "shell") {
      showCommitConfirmation(
        character,
        `Spend 1 Charge to enter Shell form and gain 2 Shield for two rounds?`,
        () => executeChimeraEmpoweredShellEntry(character),
        () => chimeraShowShiftOptions(character, newForm)
      );
    } else {
      pushActionStep(() => chimeraShowShiftOptions(character, newForm));
      chimeraEmpoweredTargetEntry(character, newForm);
    }
  };
  contextPanel.appendChild(empoweredButton);

  updateBackButton();
}

function chimeraBeastRend(character) {
  if (!character || character.charge < 2) return;

  const enemies = getEnemyTeam(character).filter(enemy => enemy.alive);
  if (!enemies.length) return;

  chooseTarget(
    enemies,
    target => {
      character.charge -= 2;

      const damage = 2 + consumeAttackBonus(character);
      applyDamage(target, damage);

      if (target.alive) {
        addChimeraBleed(character, target);
      } else {
        // The attack still applies the Bleed layer conceptually, but a fully
        // defeated target has no future round-end ticks.
        target.chimeraBleeds = [];
      }

      finishAction(
        `🐺 Rend! ${target.name} takes ${formatNumber(damage)} damage${target.alive ? " and gains 1 Bleed" : ""}.`
      );
    },
    {
      title: "🐺 Rend — Choose Target",
      confirmText: target =>
        `Spend 2 Charge to deal ${formatNumber(2 + getPendingDamageBonus(character))} damage to ${target.icon} ${target.name} and apply 1 Bleed?`
    }
  );
}

function chimeraShellRepair(character) {
  if (!character || character.charge < 2) return;

  const targets = getOwnTeam(character).filter(ally => ally.alive);
  if (!targets.length) return;

  chooseTarget(
    targets,
    target => {
      character.charge -= 2;

      const healed = applyHealing(target, 2.5);

      grantShield(
        target,
        1,
        "chimeraRepair",
        round
      );

      finishAction(
        `🐢 Shelter Repair: ${target.name} restores ${formatNumber(healed)} HP and gains 1 Shield for one round.`
      );
    },
    {
      title: "🐢 Shelter Repair — Choose Target",
      confirmText: target =>
        `Spend 2 Charge to heal ${target.icon} ${target.name} for up to 2.5 HP and give 1 Shield for one round?`
    }
  );
}

function getChimeraSpiritDrainAllocations(enemies) {
  const first = enemies[0] || null;
  const second = enemies[1] || null;
  const allocations = [];

  const firstMax = first ? Math.min(2, Math.max(0, Math.floor(first.charge))) : 0;
  const secondMax = second ? Math.min(2, Math.max(0, Math.floor(second.charge))) : 0;

  if (!second) {
    allocations.push([Math.min(2, firstMax), 0]);
    return allocations;
  }

  for (let a = 0; a <= firstMax; a++) {
    for (let b = 0; b <= secondMax; b++) {
      const total = a + b;
      if (total > 0 && total <= 2) {
        allocations.push([a, b]);
      }
    }
  }

  if (!allocations.length) {
    allocations.push([0, 0]);
  }

  allocations.sort((x, y) =>
    (y[0] + y[1]) - (x[0] + x[1]) ||
    y[0] - x[0]
  );

  return allocations;
}

function executeChimeraSpiritDrain(character, enemies, allocation) {
  if (
    !character ||
    character.key !== "chimera" ||
    character.chimeraForm !== "spirit" ||
    character.charge < 2
  ) {
    return false;
  }

  character.charge -= 2;

  let removed = 0;

  enemies.forEach((enemy, index) => {
    if (!enemy || !enemy.alive) return;

    const requested = Math.max(0, Math.floor(Number(allocation[index]) || 0));
    const actual = Math.min(enemy.charge, requested);
    enemy.charge -= actual;
    removed += actual;
  });

  gainCharge(character, 1);

  // Return to Beast without entry effect, without Charge cost, and without
  // granting an extra action.
  character.chimeraForm = "beast";
  character.icon = CHIMERA_FORM_INFO.beast.icon;

  finishAction(
    `👻 Spirit Drain removes ${removed} total enemy Charge, ${character.name} gains 1 Charge, and immediately returns to Beast form without triggering Beast entry.`
  );

  return true;
}

function chimeraSpiritDrain(character) {
  if (
    !character ||
    character.chimeraForm !== "spirit" ||
    character.charge < 2
  ) {
    return;
  }

  const enemies = getEnemyTeam(character).filter(enemy => enemy.alive);
  if (!enemies.length) return;

  const allocations = getChimeraSpiritDrainAllocations(enemies);

  if (allocations.length === 1) {
    const allocation = allocations[0];

    showCommitConfirmation(
      character,
      `Spend 2 Charge to remove ${allocation.reduce((a, b) => a + b, 0)} total enemy Charge, gain 1 Charge, and return to Beast form?`,
      () => executeChimeraSpiritDrain(character, enemies, allocation),
      () => chimeraSkill(character)
    );

    return;
  }

  setActionButtonsDisabled(true);

  contextPanel.innerHTML = `
    <strong>👻 Spirit Drain — Distribute up to 2 Charge removal</strong>
    <div class="action-step-hint">
      ${enemies.map(enemy => `${enemy.icon} ${enemy.name}: ${enemy.charge}C`).join(" · ")}
      <br>
      After resolution Chimera gains 1 Charge and returns to Beast without Beast entry.
    </div>
  `;

  allocations.forEach(allocation => {
    const total = allocation.reduce((a, b) => a + b, 0);
    const button = document.createElement("button");
    button.textContent =
      enemies.length === 1
        ? `Remove ${total}C from ${enemies[0].name}`
        : `${enemies[0].name} -${allocation[0]}C / ${enemies[1].name} -${allocation[1]}C`;

    button.onclick = () => {
      showCommitConfirmation(
        character,
        `Spend 2 Charge and remove ${total} total enemy Charge?`,
        () => executeChimeraSpiritDrain(character, enemies, allocation),
        () => chimeraSpiritDrain(character)
      );
    };

    contextPanel.appendChild(button);
  });

  updateBackButton();
}

function chimeraCurrentFormSkill(character) {
  if (!character || character.key !== "chimera") return;

  if (character.chimeraForm === "shell") {
    chimeraShellRepair(character);
    return;
  }

  if (character.chimeraForm === "spirit") {
    chimeraSpiritDrain(character);
    return;
  }

  chimeraBeastRend(character);
}

function chimeraSkill(character) {
  if (!character || character.key !== "chimera") return;

  setActionButtonsDisabled(true);

  const form = character.chimeraForm || "beast";
  const formInfo = getChimeraFormInfo(form);
  const spiritReady = canChimeraActivelyEnterSpirit(character);

  contextPanel.innerHTML = `
    <strong>🧬 Metamorphosis</strong>
    <div class="action-step-hint">
      Current form: ${formInfo.icon} ${formInfo.name}
      <br>
      Charge: ${character.charge}
      <br>
      Spirit entry: ${spiritReady ? "Ready" : `CD — ready on Round ${character.chimeraSpiritReadyRound}`}
    </div>
  `;

  const formSkillButton = document.createElement("button");

  if (form === "beast") {
    formSkillButton.textContent = "🐺 Rend — 2 Charge";
  } else if (form === "shell") {
    formSkillButton.textContent = "🐢 Shelter Repair — 2 Charge";
  } else {
    formSkillButton.textContent = "👻 Spirit Drain — 2 Charge";
  }

  formSkillButton.disabled = character.charge < 2;
  formSkillButton.onclick = () => {
    pushActionStep(() => chimeraSkill(character));
    chimeraCurrentFormSkill(character);
  };
  contextPanel.appendChild(formSkillButton);

  Object.keys(CHIMERA_FORM_INFO)
    .filter(nextForm => nextForm !== form)
    .forEach(nextForm => {
      const info = getChimeraFormInfo(nextForm);
      const button = document.createElement("button");
      button.textContent = `🔄 Shift Options → ${info.icon} ${info.name}`;
      button.disabled =
        nextForm === "spirit" &&
        !spiritReady;
      button.onclick = () => {
        pushActionStep(() => chimeraSkill(character));
        chimeraShowShiftOptions(character, nextForm);
      };
      contextPanel.appendChild(button);
    });

  updateBackButton();
}

// =====================================================
// PROPHET
// =====================================================

function showProphecyCommandPicker(character, target, staged) {
  pendingCommandType = "skill";
  setActionButtonsDisabled(true);

  contextPanel.innerHTML = `
    <strong>🔮 Secret Prophecy — ${target.name}</strong>
    <div class="action-step-hint">
      Predict ${target.name}'s next turn (Round ${getProphecyResolveRound(target)}). The target and predicted command will not be written to the battle log.
    </div>
  `;

  PROPHECY_COMMANDS.forEach(command => {
    const button = document.createElement("button");
    button.textContent = command.charAt(0).toUpperCase() + command.slice(1);
    button.onclick = () => {
      const next = [...staged, {
        targetBattleId: target.battleId,
        targetName: target.name,
        command
      }];
      prophetSkill(character, next);
    };
    contextPanel.appendChild(button);
  });

  updateBackButton();
}

function prophetSkill(character, staged = []) {
  const availableCharge = Math.max(0, Number(character.charge) || 0);
  if (availableCharge < 1 && staged.length === 0) return;

  // Nothing is committed until Continue is pressed. This lets Prophet select
  // A1, return here, optionally select A2, then commit both predictions as one Skill action.
  pendingCommandType = staged.length > 0 ? "skill" : null;
  setActionButtonsDisabled(true);

  const livingEnemies = getEnemyTeam(character).filter(enemy => enemy.alive);
  const chosenIds = new Set(staged.map(entry => entry.targetBattleId));
  const remaining = livingEnemies.filter(enemy => !chosenIds.has(enemy.battleId));
  const canAddMore = staged.length < availableCharge && remaining.length > 0;

  contextPanel.innerHTML = `
    <strong>🔮 Prophecy</strong>
    <div class="action-step-hint">
      Each prediction costs 1 Charge. Prepared: ${staged.length}. You may predict another living enemy or press Continue to finish.
    </div>
  `;

  if (canAddMore) {
    remaining.forEach(target => {
      const button = document.createElement("button");
      button.textContent = `🔮 Predict ${target.battleId} — ${target.name}`;
      button.onclick = () => {
        pushActionStep(() => prophetSkill(character, staged));
        showProphecyCommandPicker(character, target, staged);
      };
      contextPanel.appendChild(button);
    });
  }

  const continueButton = document.createElement("button");
  continueButton.textContent = "➡️ Continue";
  continueButton.disabled = staged.length === 0;
  continueButton.onclick = () => {
    pendingCommandType = "skill";
    showCommitConfirmation(
      character,
      `Commit ${staged.length} secret Prophecy${staged.length === 1 ? "" : "ies"} for the targets' next turns? Total cost: ${staged.length} Charge.`,
      () => {
        if (character.charge < staged.length) return;
        character.charge -= staged.length;

        for (const selected of staged) {
          const target = getEnemyTeam(character).find(unit => unit.battleId === selected.targetBattleId);
          if (target && target.alive) storeProphecy(character, target, selected.command);
        }

        // Deliberately hide both target identity and prediction count from the opponent.
        finishAction(`🔮 ${character.name} completed a prophecy.`);
      },
      () => prophetSkill(character, staged)
    );
  };
  contextPanel.appendChild(continueButton);

  updateBackButton();
}

// =====================================================
// DAMAGE SYSTEM
// Order: Invincibility -> Defend -> Royal -> Guardian
// -> Blood Pact shield -> Permanent shield -> Tank redirect -> HP
// =====================================================

function applyDamage(target, amount) {
  if (
    !target.alive ||
    amount <= 0
  ) {
    return 0;
  }

  registerAnubisAttackInstance(target);

  if (
    target.invincible ||
    (
      target.key === "vampire" &&
      Number(target.vampireReviveInvincibleRound) === round
    )
  ) {
    addLog(
      `✨ ${target.name} is invincible and takes no damage.`
    );

    return 0;
  }

  let damage = amount;

  const anubisTeammateBonus =
    getAnubisTeammateDamageBonus(activeActionActor, target);

  if (anubisTeammateBonus > 0) {
    damage += anubisTeammateBonus;
    addLog(
      `⚖️ Burden of the Heart: ${activeActionActor.name}'s damage gains +${formatNumber(anubisTeammateBonus)} because allied Anubis is above 2 HP.`
    );
  }

  if (target.defending) {
    damage -= 1;
  }

  damage = Math.max(
    0,
    damage
  );

  // Assassin: once per battle, reduce one non-zero incoming damage
  // instance by 1 before Shield is checked.
  if (
    target.key === "assassin" &&
    target.assassinGuardAvailable &&
    damage > 0
  ) {
    const blocked =
      Math.min(1.5, damage);

    damage -= blocked;
    target.assassinGuardAvailable = false;

    addLog(
      `🗡️ Shadow Guard! ${target.name} blocks ${formatNumber(blocked)} damage.`
    );
  }

  // Vampire receives 0.5 less damage from every incoming damage instance
  // while the teammate is alive.
  if (
    target.key === "vampire" &&
    getLivingTeammate(target)
  ) {
    damage = Math.max(
      0,
      damage - 0.5
    );
  }

  damage = absorbShield(
    target,
    "royalShield",
    damage,
    "👑 Royal Shield"
  );

  damage = absorbShield(
    target,
    "timedShield",
    damage,
    "🛡️ Guardian Shield"
  );

  damage = absorbDevilShields(
    target,
    damage
  );

  damage = absorbCureShields(
    target,
    damage
  );

  damage = absorbAngelShields(
    target,
    damage
  );

  damage = absorbJokerShields(
    target,
    damage
  );

  damage = absorbShield(
    target,
    "chimeraShellShield",
    damage,
    "🐢 Shell Shield"
  );

  damage = absorbChimeraRepairShields(
    target,
    damage
  );

  damage = absorbShield(
    target,
    "anubisJudgmentShield",
    damage,
    "⚖️ Judgment Shield"
  );

  damage = absorbShield(
    target,
    "anubisGuardShield",
    damage,
    "⚖️ Legacy Tomb Guard"
  );

  damage = absorbShield(
    target,
    "permanentShield",
    damage,
    "🛡️ Shield"
  );

  damage = redirectDamageToTank(
    target,
    damage
  );

  target.hp -= damage;
  registerAnubisHpLoss(target, damage, activeActionActor);
  recordAnubisTeamDamage(target, damage, activeActionActor);

  if (damage > 0) {
    addLog(
      `💥 ${target.name} takes ${formatNumber(damage)} HP damage.`
    );
  } else {
    addLog(
      `🛡️ ${target.name} takes 0 HP damage.`
    );
  }

  // Teammate-crisis effects must see the new HP before death/revival handling.
  checkVampireTeammateCrisis(
    target
  );

  if (target.hp <= 0) {
    if (
      target.key === "devil" &&
      target.berserk
    ) {
      target.hp = 0;
      target.berserkPendingDeath =
        true;

      addLog(
        `🔥 ${target.name} refuses to fall while Berserk is active!`
      );

      return damage;
    }

    handleDeath(target);
    return damage;
  }

  checkAngelLowHpPassive(
    target
  );

  checkCureMagePassive(
    target
  );

  return damage;
}

function redirectDamageToTank(
  target,
  damage
) {
  if (damage <= 0) {
    return damage;
  }

  const tank =
    getOwnTeam(target).find(
      character =>
        character.key === "tank" &&
        character.alive &&
        character !== target
    );

  if (!tank) {
    return damage;
  }

  const redirected =
    Math.min(
      0.5,
      damage
    );

  damage -= redirected;

  // Direct HP loss. Tank Shield / Defend cannot block it.
  tank.hp -= redirected;
  recordAnubisTeamDamage(tank, redirected, activeActionActor);

  addLog(
    `🛡️ Guardian's Burden! ${tank.name} directly takes ${formatNumber(redirected)} HP damage for ${target.name}.`
  );

  checkVampireTeammateCrisis(
    tank
  );

  if (tank.hp <= 0) {
    handleDeath(tank);
  } else {
    checkAngelLowHpPassive(
      tank
    );

    checkCureMagePassive(
      tank
    );
  }

  return damage;
}

function absorbShield(target, property, damage, label) {
  if (
    damage <= 0 ||
    target[property] <= 0
  ) {
    return damage;
  }

  const absorbed = Math.min(
    target[property],
    damage
  );

  target[property] -= absorbed;
  damage -= absorbed;

  addLog(
    `${label} absorbs ${formatNumber(absorbed)} damage for ${target.name}.`
  );

  return damage;
}

function absorbDevilShields(target, damage) {
  if (
    damage <= 0 ||
    !target.devilShields.length
  ) {
    return damage;
  }

  target.devilShields.sort(
    (a, b) =>
      a.expiresRound -
      b.expiresRound
  );

  for (
    const entry of
    target.devilShields
  ) {
    if (damage <= 0) break;
    if (entry.amount <= 0) continue;

    const absorbed =
      Math.min(
        entry.amount,
        damage
      );

    entry.amount -= absorbed;
    damage -= absorbed;

    addLog(
      `😈 Blood Pact Shield absorbs ${formatNumber(absorbed)} damage for ${target.name}.`
    );
  }

  target.devilShields =
    target.devilShields.filter(
      entry =>
        entry.amount > 0.0001
    );

  return damage;
}

function absorbCureShields(target, damage) {
  if (
    damage <= 0 ||
    !target.cureShields.length
  ) {
    return damage;
  }

  target.cureShields.sort(
    (a, b) =>
      a.expiresRound -
      b.expiresRound
  );

  for (
    const entry of
    target.cureShields
  ) {
    if (damage <= 0) break;
    if (entry.amount <= 0) continue;

    const absorbed =
      Math.min(
        entry.amount,
        damage
      );

    entry.amount -= absorbed;
    damage -= absorbed;

    addLog(
      `💚 Overheal Barrier absorbs ${formatNumber(absorbed)} damage for ${target.name}.`
    );
  }

  target.cureShields =
    target.cureShields.filter(
      entry =>
        entry.amount > 0.0001
    );

  return damage;
}


function absorbAngelShields(target, damage) {
  if (
    damage <= 0 ||
    !target.angelShields.length
  ) {
    return damage;
  }

  target.angelShields.sort(
    (a, b) => a.expiresRound - b.expiresRound
  );

  for (const entry of target.angelShields) {
    if (damage <= 0) break;
    if (entry.amount <= 0) continue;

    const absorbed = Math.min(entry.amount, damage);
    entry.amount -= absorbed;
    damage -= absorbed;

    addLog(
      `👼 Divine Empowerment Shield absorbs ${formatNumber(absorbed)} damage for ${target.name}.`
    );
  }

  target.angelShields = target.angelShields.filter(
    entry => entry.amount > 0.0001
  );

  return damage;
}



function absorbJokerShields(target, damage) {
  if (
    damage <= 0 ||
    !Array.isArray(target.jokerShields) ||
    !target.jokerShields.length
  ) {
    return damage;
  }

  target.jokerShields.sort((a, b) => a.expiresRound - b.expiresRound);

  for (const entry of target.jokerShields) {
    if (damage <= 0) break;
    if ((Number(entry.amount) || 0) <= 0) continue;

    const absorbed = Math.min(entry.amount, damage);
    entry.amount -= absorbed;
    damage -= absorbed;

    addLog(
      `🃏 Grand Finale Shield absorbs ${formatNumber(absorbed)} damage for ${target.name}.`
    );
  }

  target.jokerShields = target.jokerShields.filter(
    entry => entry.amount > 0.0001
  );

  return damage;
}

function absorbChimeraRepairShields(target, damage) {
  if (
    damage <= 0 ||
    !Array.isArray(target.chimeraRepairShields) ||
    !target.chimeraRepairShields.length
  ) {
    return damage;
  }

  target.chimeraRepairShields.sort((a, b) => a.expiresRound - b.expiresRound);

  for (const entry of target.chimeraRepairShields) {
    if (damage <= 0) break;
    if ((Number(entry.amount) || 0) <= 0) continue;

    const absorbed = Math.min(entry.amount, damage);
    entry.amount -= absorbed;
    damage -= absorbed;

    addLog(
      `🐢 Shelter Repair Shield absorbs ${formatNumber(absorbed)} damage for ${target.name}.`
    );
  }

  target.chimeraRepairShields = target.chimeraRepairShields.filter(
    entry => entry.amount > 0.0001
  );

  return damage;
}

// =====================================================
// REVIVAL / DEATH
// =====================================================

function resetTemporaryStatesAfterRevive(character) {
  character.defending = false;
  character.invincible = false;
  character.stunTurns = 0;
  character.pendingHeal = 0;
  character.berserkPendingDeath = false;
  character.anubisJudgmentShield = 0;
  character.anubisJudgmentShieldExpiresRound = null;

  // Anubis's Weight is a persistent self-resource and survives revival.
  if (character.key !== "anubis") {
    character.anubisWeight = 0;
  }
}


function queueImmediateVampireTurn(character) {
  if (!character || !character.alive) return;
  immediateTurnBattleId = character.battleId;
}


function getNextLivingEnemyForChimeraRevive(character) {
  if (!character || !turnOrder.length) return null;

  const startIndex = Math.max(0, Math.min(turnOrder.length - 1, currentTurn));

  for (let offset = 1; offset <= turnOrder.length; offset++) {
    const candidate = turnOrder[(startIndex + offset) % turnOrder.length];

    if (
      candidate &&
      candidate.alive &&
      candidate.team !== character.team
    ) {
      return candidate;
    }
  }

  return null;
}

function tryChimeraRevive(character) {
  if (
    !character ||
    character.key !== "chimera" ||
    character.chimeraReviveUsed ||
    character.maxHP <= 0
  ) {
    return false;
  }

  character.chimeraReviveUsed = true;
  character.alive = true;
  resetTemporaryStatesAfterRevive(character);

  character.hp = Math.min(2, character.maxHP);
  gainCharge(character, 1);

  // Automatic revival entry is not an active Spirit entry, so it does not
  // start or reset the active-entry cooldown.
  character.chimeraForm = "spirit";
  character.icon = CHIMERA_FORM_INFO.spirit.icon;

  const target = getNextLivingEnemyForChimeraRevive(character);

  if (target) {
    target.stunTurns += 1;
    addLog(
      `👻 Spectral Rebirth! ${character.name} revives with ${formatNumber(character.hp)} HP, gains 1 Charge, enters Spirit form, and stuns the next enemy ${target.name}.`
    );
  } else {
    addLog(
      `👻 Spectral Rebirth! ${character.name} revives with ${formatNumber(character.hp)} HP, gains 1 Charge, and enters Spirit form.`
    );
  }

  return true;
}

function tryVampireRevive(character) {
  if (
    character.key !== "vampire" ||
    character.vampireReviveUsed
  ) {
    return false;
  }

  character.vampireReviveUsed = true;
  character.alive = true;
  character.vampireTeammateDeathMark = 0;

  const teammate = getAnyTeammate(character);
  resetTemporaryStatesAfterRevive(character);

  if (teammate && teammate.alive) {
    const beforeTeammateHp = teammate.hp;
    teammate.hp = Math.max(
      0.5,
      teammate.hp - 3
    );
    const drained = Math.max(
      0,
      beforeTeammateHp - teammate.hp
    );

    character.maxHP = Math.max(3, character.maxHP);
    character.hp = Math.min(3, character.maxHP);

    checkAngelLowHpPassive(teammate);
    checkCureMagePassive(teammate);

    addLog(
      `🧛 Blood Rebirth! ${character.name} drains ${formatNumber(drained)} HP from ${teammate.name} (up to 3, leaving at least 0.5 HP) and revives with ${formatNumber(character.hp)} HP.`
    );

    return true;
  }

  character.maxHP = Math.max(1, character.maxHP);
  character.hp = 1;
  character.vampireReviveInvincibleRound = round;
  character.vampireNextAttackDamageBonus = 2.5;
  character.vampireNextAttackLifestealBonus = 1;

  addLog(
    `🧛 Blood Rebirth! With the teammate already defeated, ${character.name} revives with 1 HP, is invincible for the rest of Round ${round}, and the next normal attack gains +2.5 damage and +1 lifesteal.`
  );

  return true;
}

function tryFighterLastStandSurvival(character) {
  if (
    !character ||
    character.key !== "fighter" ||
    character.fighterLastStandSaveUsed ||
    character.maxHP <= 0 ||
    character.hp > 0
  ) {
    return false;
  }

  character.fighterLastStandSaveUsed = true;
  character.alive = true;
  character.hp = Math.min(1, character.maxHP);
  character.invincible = true;

  addLog(
    `⚔️ LAST STAND! ${character.name} refuses defeat, remains at ${formatNumber(character.hp)} HP, and becomes invincible until the next turn.`
  );

  return true;
}


function triggerVampireTeammateDefeatHeal(defeatedCharacter) {
  if (!defeatedCharacter) return;

  const vampire = getOwnTeam(defeatedCharacter).find(
    ally =>
      ally !== defeatedCharacter &&
      ally.key === "vampire" &&
      ally.alive
  );

  if (!vampire) return;

  vampire.vampireTeammateDeathMark = 0;

  const before = vampire.hp;
  vampire.hp = Math.min(vampire.maxHP, vampire.hp + 2);
  const healed = vampire.hp - before;
  recordAnubisHealing(vampire, healed);

  addLog(
    `🧛 Crimson Feast: ${defeatedCharacter.name} is defeated, so ${vampire.name} immediately restores ${formatNumber(healed)} HP.`
  );
}

function handleDeath(character) {
  if (!character) return;

  if (character.maxHP <= 0) {
    character.hp = 0;
    character.alive = false;
    character.defending = false;
    character.invincible = false;
    character.pendingHeal = 0;
    character.anubisWeight = 0;

    if (character.key === "anubis") {
      character.anubisWeight = 0;
      character.anubisBoundTargetBattleId = null;
      character.anubisTeamDamageMeter = 0;
      character.anubisTeamDamageReductionRound = null;
      character.anubisJudgmentShield = 0;
      character.anubisJudgmentShieldExpiresRound = null;
      character.anubisDamageMeter = 0;
      character.anubisAttackCounter = 0;
    }
    if (character.key === "prophet") character.prophecies = [];

    addLog(`💀 ${character.name} has no Max HP remaining and is defeated.`);
    triggerVampireTeammateDefeatHeal(character);
    checkVampireTeammateCrisisForTeam(getOwnTeam(character));
    return;
  }

  // Fighter's Last Stand is survival, not a defeat, so Weight is not reset.
  if (tryFighterLastStandSurvival(character)) {
    return;
  }

  // From this point the unit is considered defeated before any revival.
  character.hp = 0;
  character.alive = false;
  character.defending = false;
  character.invincible = false;
  character.pendingHeal = 0;
  if (character.key !== "anubis") {
    character.anubisWeight = 0;
  }

  // Legacy counters are reset on defeat. Anubis Weight and binding are
  // preserved through immediate revival checks below.
  if (character.key === "anubis") {
    character.anubisDamageMeter = 0;
    character.anubisAttackCounter = 0;
  }

  if (character.key === "prophet") {
    character.prophecies = [];
  }

  // Intrinsic one-time Chimera revival resolves before team revival effects.
  if (tryChimeraRevive(character)) {
    return;
  }

  // Team revival effects follow.
  if (tryAngelBless(character)) {
    return;
  }

  if (tryVampireRevive(character)) {
    return;
  }

  if (character.revivePuppet) {
    character.revivePuppet = false;
    character.revivePuppetExpiresRound = null;
    character.alive = true;
    character.hp = character.maxHP / 2;

    resetTemporaryStatesAfterRevive(character);

    addLog(`🧵 Life Puppet revives ${character.name} with ${formatNumber(character.hp)} HP!`);

    checkAngelLowHpPassive(character);
    checkCureMagePassive(character);
    checkVampireTeammateCrisis(character);
    return;
  }

  if (character.key === "anubis") {
    character.anubisWeight = 0;
    character.anubisBoundTargetBattleId = null;
    character.anubisTeamDamageMeter = 0;
    character.anubisTeamDamageReductionRound = null;
    character.anubisJudgmentShield = 0;
    character.anubisJudgmentShieldExpiresRound = null;
  }

  addLog(`💀 ${character.name} has been defeated.`);
  triggerVampireTeammateDefeatHeal(character);
  checkVampireTeammateCrisisForTeam(getOwnTeam(character));
}


// =====================================================
// AI
// =====================================================

function aiTakeTurn(character) {
  if (gameOver || !character.alive) return;

  if (character.key === "devil" && character.berserk) {
    aiNormalAttack(character);
    return;
  }

  if (aiTrySkill(character)) return;

  const hpRatio = character.maxHP > 0 ? character.hp / character.maxHP : 0;

  if (hpRatio <= 0.3) {
    const roll = Math.random();

    if (roll < 0.3) {
      runAiCommand(character, "defend", () => {
        character.defending = true;
        finishAction(`🤖 🛡️ ${character.name} chooses Defend.`);
      });
      return;
    }

    if (
      roll < 0.55 &&
      character.hp < character.maxHP &&
      round >= character.healReadyRound
    ) {
      runAiCommand(character, "heal", () => {
        const healed = applyHealing(character, 2);
        character.pendingHeal = 0;
        character.healReadyRound = round + 4;
        finishAction(`🤖 ❤️ ${character.name} immediately heals ${formatNumber(healed)} HP.`);
      });
      return;
    }
  }

  if (aiShouldCharge(character)) {
    runAiCommand(character, "charge", () => {
      gainCharge(character, 1);
      finishAction(`🤖 ⚡ ${character.name} gains 1 Charge.`);
    });
    return;
  }

  aiNormalAttack(character);
}

function aiNormalAttack(character) {
  if (character.key === "anubis") {
    runAiCommand(character, "attack", () => {
      changeAnubisSelfWeight(character, 1, "normal Attack");
      finishAction(`🤖 ⚖️ ${character.name}'s normal Attack deals 0 damage and increases Weight to ${character.anubisWeight}.`);
    });
    return;
  }

  const target = getAILowestEnemy(character);
  if (!target) return;

  runAiCommand(character, "attack", () => {
    const spiritZeroAttack =
      character.key === "chimera" &&
      character.chimeraForm === "spirit";

    const damage =
      spiritZeroAttack
        ? 0
        : (
            getBaseNormalAttackDamage(character) +
            consumeAttackBonus(character) +
            getFighterDamageBonus(character) +
            getDevilAttackBonus(character) +
            getVampireAttackBonus(character)
          );

    const vampireRebirthLifesteal =
      consumeVampireRebirthAttackBuff(character);

    const actualHpDamage = applyDamage(target, damage);
    triggerVampireNormalAttackGrowth(
      character,
      actualHpDamage,
      vampireRebirthLifesteal
    );
    resolveDevilPostNormalAttack(character, target);

    finishAction(`🤖 ⚔️ ${character.name} attacks ${target.name} for ${formatNumber(damage)} damage.`);
  });
}

function aiShouldCharge(character) {
  switch (character.key) {
    case "fighter":
      return (
        character.charge < 2 &&
        Math.random() < 0.7
      );

    case "blastMage":
      return (
        character.charge < 2 ||
        (
          character.charge < 3 &&
          Math.random() < 0.4
        )
      );

    case "tank":
      return character.charge < 2;

    case "cureMage":
      return (
        character.charge < 2 &&
        Math.random() < 0.7
      );

    case "assassin":
      return (
        character.charge < 4 &&
        Math.random() < 0.85
      );

    case "king":
      return (
        character.charge < 2 &&
        Math.random() < 0.8
      );

    case "puppeteer":
      return (
        character.puppets <= 0 &&
        character.charge < 3
      );

    case "angel":
      return (
        character.charge < 2 &&
        Math.random() < 0.5
      );

    case "devil":
      return (
        character.charge < 2 &&
        Math.random() < 0.8
      );

    case "joker":
      return (
        character.jugglingBalls < 3 &&
        character.charge < 2
      );

    case "vampire": {
      const teammate = getAnyTeammate(character);
      const desired = teammate && !teammate.alive ? 1 : 2;
      return (
        character.charge < desired &&
        Math.random() < 0.45
      );
    }

    case "anubis": {
      const boundTarget = getAnubisBoundTarget(character);
      const weight = Math.max(0, Math.floor(Number(character.anubisWeight) || 0));

      if (
        boundTarget &&
        weight > boundTarget.maxHP / 2 &&
        character.charge < 2
      ) {
        return true;
      }

      if (boundTarget && character.charge < 1) {
        return Math.random() < 0.35;
      }

      return character.charge < 1 && Math.random() < 0.2;
    }

    case "prophet":
      return character.charge < 1 && Math.random() < 0.6;

    default:
      return false;
  }
}

function aiTrySkill(character) {
  pendingAiSkillActor = null;
  // If a matching Skill prophecy is active and the AI has a usable skill,
  // the action is cancelled before any resource is spent.
  const activeProphecy = getActiveProphecyForTarget(character);
  if (
    activeProphecy &&
    activeProphecy.prophecy.command === "skill" &&
    aiHasUsableSkill(character)
  ) {
    const prediction = resolveProphecyBeforeCommand(character, "skill");
    if (prediction.cancelled) {
      finishAction(`🤖 ${prediction.message}`);
      return true;
    }
  }

  activeActionActor = character;
  activeActionCommandType = "skill";

  let used = false;
  pendingAiSkillActor = character;

  try {
    switch (character.key) {
      case "fighter": used = aiFighterSkill(character); break;
      case "blastMage": used = aiBlastMageSkill(character); break;
      case "tank": used = aiTankSkill(character); break;
      case "cureMage": used = aiCureMageSkill(character); break;
      case "assassin": used = aiAssassinSkill(character); break;
      case "king": used = aiKingSkill(character); break;
      case "puppeteer": used = aiPuppeteerSkill(character); break;
      case "angel": used = aiAngelSkill(character); break;
      case "devil": used = aiDevilSkill(character); break;
      case "joker": used = aiJokerSkill(character); break;
      case "vampire": used = aiVampireSkill(character); break;
      case "anubis": used = aiAnubisSkill(character); break;
      case "chimera": used = aiChimeraSkill(character); break;
      case "prophet": used = aiProphetSkill(character); break;
      default: used = false;
    }
  } finally {
    activeActionActor = null;
    activeActionCommandType = null;
  }

  if (used) {
    const p = getActiveProphecyForTarget(character);
    if (p && p.prophecy.command !== "skill") {
      resolveProphecyBeforeCommand(character, "skill");
    }

  }

  pendingAiSkillActor = null;
  return used;
}

function aiFighterSkill(character) {
  if (character.charge < 2) return false;

  const target = getAILowestEnemy(character);
  if (!target) return false;

  character.charge -= 2;

  const damage =
    2.5 +
    getFighterDamageBonus(character) +
    consumeAttackBonus(character);

  applyDamage(target, damage);
  character.permanentShield += 1;

  finishAction(
    `🤖 ⚔️ Guarded Strike hits ${target.name} for ${formatNumber(damage)} damage.`
  );

  return true;
}

function aiBlastMageSkill(character) {
  if (character.charge < 2) return false;

  const target = getAILowestEnemy(character);
  if (!target) return false;

  const spent = character.charge;
  character.charge = 0;

  const bonus = consumeAttackBonus(character);

  const mainDamage =
    2.5 +
    (spent - 2) +
    bonus;

  const secondaryDamage =
    1 +
    0.5 * (spent - 2);

  const enemies = getEnemyTeam(character);

  const secondary = enemies.find(
    enemy => enemy !== target && enemy.alive
  );

  applyDamage(target, mainDamage);

  if (secondary) {
    applyDamage(secondary, secondaryDamage);
  }

  triggerBlastMageSkillHeal(character);

  finishAction(
    `🤖 💥 Arcane Blast uses ${spent} Charge!`
  );

  return true;
}

function aiTankSkill(character) {
  if (character.charge < 2) {
    return false;
  }

  const allies = getOwnTeam(character).filter(ally => ally.alive);
  const candidates = allies
    .filter(ally => {
      const desired = ally === character ? 2.5 : 3.5;
      return getTotalShield(ally) < desired - 0.0001;
    })
    .sort((a, b) =>
      (a.hp + getTotalShield(a)) - (b.hp + getTotalShield(b))
    );

  const target = candidates[0] || null;
  if (!target) return false;

  const shieldAmount = target === character ? 2.5 : 3.5;
  character.charge -= 2;

  grantShield(
    target,
    shieldAmount,
    "guardian",
    round + 1
  );

  finishAction(
    `🤖 🛡️ Tank gives ${target.name} ${formatNumber(shieldAmount)} Guardian Shield.`
  );

  return true;
}

function aiCureMageSkill(character) {
  if (character.charge < 2) {
    return false;
  }

  const allies =
    getOwnTeam(character).filter(
      ally => ally.alive
    );

  if (!allies.length) {
    return false;
  }

  const target =
    [...allies].sort(
      (a, b) =>
        (a.hp / a.maxHP) -
        (b.hp / b.maxHP)
    )[0];

  const missing =
    target.maxHP -
    target.hp;

  if (
    missing < 1 &&
    target.hp > 2 &&
    target.restorationMarkTicks > 0
  ) {
    return false;
  }

  let spent = 2;

  if (
    character.charge >= 3 &&
    (
      target.hp <= 2 ||
      missing >= 4
    )
  ) {
    spent = 3;
  }

  if (
    character.charge >= 4 &&
    target.hp <= 2 &&
    missing >= 5
  ) {
    spent = 4;
  }

  character.charge -= spent;

  const wasCritical =
    target.hp <= 2;

  const immediateHeal =
    3 +
    (spent - 2) +
    (wasCritical ? 1.5 : 0);

  const tickHeal =
    1.5 +
    0.5 * (spent - 2);

  const result =
    applyCureHealing(
      character,
      target,
      immediateHeal
    );

  target.restorationMarkTicks = 1;
  target.restorationMarkHeal =
    tickHeal;

  finishAction(
    `🤖 💚 Cure Mage places a Restoration Mark on ${target.name}, healing ${formatNumber(result.healed)} HP now and ${formatNumber(tickHeal)} HP at each of the next two round endings.`
  );

  return true;
}

function aiAssassinSkill(character) {
  if (character.charge < 4) return false;

  const target = getAILowestEnemy(character);
  if (!target) return false;

  character.charge -= 4;

  const damage =
    getAssassinExecutionBaseDamage(character) +
    consumeAttackBonus(character);

  applyDamage(target, damage);

  character.invincible = true;

  if (target.alive) {
    gainCharge(character, 2);
  }

  finishAction(
    `🤖 🗡️ Execution hits ${target.name} for ${formatNumber(damage)} damage.${target.alive ? " Assassin regains 2 Charge." : ""}`
  );

  return true;
}

function aiKingSkill(character) {
  if (character.charge < 2) return false;

  const target =
    getAILowestEnemy(character);

  if (!target) return false;

  character.charge -= 2;

  applyDamage(
    target,
    2.5
  );

  if (target.alive) {
    target.stunTurns =
      Math.max(
        target.stunTurns,
        1
      );
  }

  grantShield(
    character,
    0.5,
    "permanent"
  );

  const teammate =
    getAITeammate(character);

  if (teammate) {
    grantShield(
      teammate,
      0.5,
      "permanent"
    );
  }

  finishAction(
    `🤖 👑 Royal Command hits ${target.name} for 2.5 total damage${target.alive ? " and stuns the target" : ""}. King${teammate ? ` and ${teammate.name}` : ""} gain 0.5 permanent Shield.`
  );

  return true;
}

function aiPuppeteerSkill(character) {
  const teammate = getAITeammate(character);

  const selfNeedsRevive =
    !character.revivePuppet &&
    character.hp / character.maxHP <= 0.45;

  const teammateNeedsRevive =
    teammate &&
    !teammate.revivePuppet &&
    teammate.hp / teammate.maxHP <= 0.55;

  if (
    (
      character.lifePuppets > 0 ||
      character.puppets > 0
    ) &&
    (
      selfNeedsRevive ||
      teammateNeedsRevive
    )
  ) {
    const target =
      teammateNeedsRevive
        ? teammate
        : character;

    if (character.lifePuppets > 0) {
      character.lifePuppets--;
    } else {
      character.puppets--;
    }

    target.revivePuppet = true;
    target.revivePuppetExpiresRound = round + 1;

    finishAction(
      `🤖 🧵 Puppeteer gives ${target.name} a Life Puppet for two rounds.`
    );

    return true;
  }

  if (character.puppets > 0) {
    const enemies = getEnemyTeam(character).filter(
      enemy => enemy.alive
    );

    if (!enemies.length) return false;

    character.puppets--;

    const total =
      5 +
      consumeAttackBonus(character);

    const sorted = [...enemies].sort(
      (a, b) =>
        (a.hp + getTotalShield(a)) -
        (b.hp + getTotalShield(b))
    );

    if (sorted.length === 1) {
      applyDamage(sorted[0], total);
    } else {
      const firstDamage = Math.min(
        total,
        Math.ceil(
          (
            sorted[0].hp +
            getTotalShield(sorted[0])
          ) * 2
        ) / 2
      );

      const secondDamage =
        total -
        firstDamage;

      if (firstDamage > 0) {
        applyDamage(
          sorted[0],
          firstDamage
        );
      }

      if (
        secondDamage > 0 &&
        sorted[1].alive
      ) {
        applyDamage(
          sorted[1],
          secondDamage
        );
      }
    }

    finishAction(
      `🤖 🎭 Puppeteer uses Puppet Assault for ${formatNumber(total)} total damage.`
    );

    return true;
  }

  if (character.charge >= 3) {
    character.charge -= 3;
    character.puppets++;
    character.maxHP += 1;
    const healed = applyHealing(character, 1);

    finishAction(
      `🤖 🎭 Puppeteer creates a new Puppet, gains +1 Max HP, and restores ${formatNumber(healed)} HP.`
    );

    return true;
  }

  return false;
}

function aiAngelSkill(character) {
  if (character.charge < 1) {
    return false;
  }

  const teammate =
    getAITeammate(character);

  if (!teammate) {
    return false;
  }

  const missingHP =
    teammate.maxHP -
    teammate.hp;

  if (
    missingHP >= 1 &&
    character.hp > 2
  ) {
    const sacrifice = Math.min(
      2,
      character.hp - 0.5,
      character.maxHP - 0.5,
      missingHP + 0.5
    );

    const cleanSacrifice = Math.floor(sacrifice * 2) / 2;
    const received = Math.max(0, cleanSacrifice - 0.5);

    if (cleanSacrifice >= 1 && received > 0) {
      character.charge--;
      character.maxHP = Math.max(0.5, character.maxHP - cleanSacrifice);
      character.hp = Math.max(0.5, character.hp - cleanSacrifice);
      character.hp = Math.min(character.hp, character.maxHP);

      const healed = applyHealing(teammate, received);

      checkAngelLowHpPassive(
        character
      );

      checkVampireTeammateCrisis(
        character
      );

      finishAction(
        `🤖 👼 Angel sacrifices ${formatNumber(cleanSacrifice)} HP / Max HP and restores ${formatNumber(healed)} HP to ${teammate.name}.`
      );

      return true;
    }
  }

  let desiredCharge =
    CHARACTER_DATA[
      teammate.key
    ].skillCost;

  if (
    teammate.key === "puppeteer"
  ) {
    desiredCharge = 3;
  }

  if (
    teammate.key === "devil"
  ) {
    desiredCharge = 2;
  }

  if (
    teammate.key === "vampire"
  ) {
    desiredCharge = 3;
  }

  if (
    teammate.key === "joker"
  ) {
    desiredCharge = 2;
  }

  const need =
    Math.max(
      0,
      desiredCharge -
      teammate.charge
    );

  if (
    need > 0 &&
    character.charge > 0
  ) {
    const amount =
      Math.min(
        need,
        character.charge
      );

    character.charge -= amount;
    gainCharge(teammate, amount);

    finishAction(
      `🤖 👼 Angel transfers ${amount} Charge to ${teammate.name}.`
    );

    return true;
  }

  if (character.charge >= 2) {
    const spend =
      Math.min(
        character.charge,
        3
      );

    const damageBonus =
      1 +
      0.5 * (spend - 2);

    const shieldBonus =
      1 +
      0.5 * (spend - 2);

    character.charge -= spend;

    teammate.nextAttackBonus =
      Math.max(
        teammate.nextAttackBonus,
        damageBonus
      );

    grantShield(
      teammate,
      shieldBonus,
      "angel",
      round + 1
    );

    finishAction(
      `🤖 ✨ Angel empowers ${teammate.name}: +${formatNumber(damageBonus)} next damage and ${formatNumber(shieldBonus)} Shield.`
    );

    return true;
  }

  return false;
}

function aiDevilSkill(character) {
  if (character.berserk) {
    return false;
  }

  const teammate =
    getAITeammate(character);

  const enemies =
    getEnemyTeam(character).filter(
      enemy => enemy.alive
    );

  // Prefer Berserk when available.
  if (
    character.charge >= 2 &&
    enemies.length
  ) {
    const shouldBerserk =
      character.hp >= 2 &&
      (
        Math.random() < 0.7 ||
        enemies.some(
          enemy =>
            enemy.hp < 3
        )
      );

    if (shouldBerserk) {
      character.charge -= 2;

      character.berserk = true;
      character.berserkEndRound =
        round + 1;
      character.berserkAttackReady =
        true;
      character.berserkPendingDeath =
        false;

      const total =
        3 +
        consumeAttackBonus(character);

      const before =
        character.hp;

      character.hp =
        Math.min(
          character.maxHP,
          character.hp + 1.5
        );

      grantShield(
        character,
        1.5,
        "permanent"
      );

      const sorted =
        [...enemies].sort(
          (a, b) =>
            (
              a.hp +
              getTotalShield(a)
            ) -
            (
              b.hp +
              getTotalShield(b)
            )
        );

      if (sorted.length === 1) {
        applyDamage(
          sorted[0],
          total
        );
      } else {
        const firstDamage =
          Math.min(
            total,
            Math.ceil(
              (
                sorted[0].hp +
                getTotalShield(
                  sorted[0]
                )
              ) * 2
            ) / 2
          );

        const secondDamage =
          total -
          firstDamage;

        if (firstDamage > 0) {
          applyDamage(
            sorted[0],
            firstDamage
          );
        }

        if (
          secondDamage > 0 &&
          sorted[1].alive
        ) {
          applyDamage(
            sorted[1],
            secondDamage
          );
        }
      }

      // AI treats the first sorted enemy as the Berserk main target.
      const mainTarget = sorted[0];

      if (mainTarget && mainTarget.alive) {
        mainTarget.stunTurns += 1;
        addLog(
          `💫 Berserk impact: ${mainTarget.name} is stunned for the next action.`
        );
      }

      finishAction(
        `🤖 🔥 Devil enters Berserk, deals ${formatNumber(total)} total distributed damage, stuns the surviving main target, restores ${formatNumber(character.hp - before)} HP, and gains 1.5 permanent Shield.`
      );

      return true;
    }
  }

  // Blood Drain can grow Devil's Max HP.
  if (
    teammate &&
    teammate.hp > 3
  ) {
    const amount =
      Math.min(
        2,
        teammate.hp - 0.5
      );

    if (amount > 0) {
      teammate.hp -= amount;

      character.maxHP += amount;

      const before =
        character.hp;

      character.hp =
        Math.min(
          character.maxHP,
          character.hp + amount
        );

      grantShield(
        teammate,
        amount + 1,
        "devil",
        round + 1
      );

      checkAngelLowHpPassive(
        teammate
      );

      checkCureMagePassive(
        teammate
      );

      checkVampireTeammateCrisis(
        teammate
      );

      finishAction(
        `🤖 🩸 Devil drains ${formatNumber(amount)} HP from ${teammate.name}, gains ${formatNumber(amount)} Max HP, restores ${formatNumber(character.hp - before)} HP, and grants ${formatNumber(amount + 1)} Shield for two rounds.`
      );

      return true;
    }
  }

  return false;
}




function aiVampireSkill(character) {
  const teammate = getAITeammate(character);
  const anyTeammate = getAnyTeammate(character);
  const healCost = anyTeammate && !anyTeammate.alive ? 1 : 2;

  if (
    character.charge >= healCost &&
    character.hp <= character.maxHP - 1.5
  ) {
    character.charge -= healCost;
    const before = character.hp;
    character.hp = Math.min(character.maxHP, character.hp + 2);
    recordAnubisHealing(character, character.hp - before);

    finishAction(
      `🤖 🧛 Vampire spends ${healCost} Charge and restores ${formatNumber(character.hp - before)} HP.`
    );
    return true;
  }

  if (
    teammate &&
    teammate.hp > 3 &&
    (character.hp < character.maxHP || character.maxHP < VAMPIRE_MAX_HP_CAP)
  ) {
    const amount = Math.min(
      1.5,
      3,
      teammate.hp - 0.5
    );

    if (amount > 0) {
      executeVampireAllyDrain(character, teammate, amount);
      return true;
    }
  }

  return false;
}


function aiJokerSkill(character) {
  const enemies = getEnemyTeam(character).filter(enemy => enemy.alive);
  const teammate = getAITeammate(character);

  if (!enemies.length) return false;

  // Use Charge Ball when a teammate is close to an important skill threshold.
  if (character.jugglingBalls >= 2 && teammate) {
    let desired = CHARACTER_DATA[teammate.key].skillCost || 0;
    if (teammate.key === "puppeteer") desired = 3;
    if (teammate.key === "devil") desired = 2;

    if (desired > 0 && teammate.charge === desired - 1 && Math.random() < 0.45) {
      character.jugglingBalls -= 2;
      gainCharge(teammate, 1);
      finishAction(`🤖 ⚡ Joker uses 2 Balls to give ${teammate.name} 1 Charge.`);
      return true;
    }
  }

  const stunBallReady =
    round >= (character.jokerStunBallReadyRound || 1);

  // With 2+ Balls, Joker may throw at most two ordinary Balls.
  if (character.jugglingBalls >= 2) {
    character.jugglingBalls -= 2;

    const sorted = [...enemies].sort(
      (a, b) => (a.hp + getTotalShield(a)) - (b.hp + getTotalShield(b))
    );

    const primary = sorted[0];
    const secondary = sorted[1] || primary;
    const threat = [...enemies].sort((a, b) => b.charge - a.charge)[0] || primary;

    if (
      stunBallReady &&
      threat &&
      threat.charge >= 2
    ) {
      registerAnubisAttackInstance(threat);
      if (threat.alive) threat.stunTurns += 1;
      character.jokerStunBallReadyRound = round + 2;
      registerJokerThrownBall(character);

      const heavyTarget =
        primary.alive
          ? primary
          : secondary;

      if (heavyTarget && heavyTarget.alive) {
        applyDamage(heavyTarget, 2);
        registerJokerThrownBall(character);
      }

      finishAction("🤖 🃏 Joker uses a Double Throw: Stun Ball + Heavy Ball!");
      return true;
    }

    applyDamage(primary, 2);
    registerJokerThrownBall(character);

    const secondTarget =
      secondary && secondary.alive
        ? secondary
        : primary;

    if (secondTarget && secondTarget.alive) {
      applyDamage(secondTarget, 2);
      registerJokerThrownBall(character);
    }

    finishAction("🤖 🃏 Joker uses a Double Heavy Throw!");
    return true;
  }

  // With 1 Ball, prefer Stun Ball when it is ready and valuable.
  if (character.jugglingBalls >= 1) {
    const threat = [...enemies].sort((a, b) => b.charge - a.charge)[0];
    const target = getAILowestEnemy(character) || threat;

    character.jugglingBalls--;

    if (
      stunBallReady &&
      threat &&
      threat.charge >= 2 &&
      Math.random() < 0.65
    ) {
      registerAnubisAttackInstance(threat);
      if (threat.alive) threat.stunTurns += 1;
      character.jokerStunBallReadyRound = round + 2;
      registerJokerThrownBall(character);
      finishAction(`🤖 🃏 Joker throws a Stun Ball at ${threat.name}.`);
      return true;
    }

    applyDamage(target, 2);
    registerJokerThrownBall(character);
    finishAction(`🤖 🃏 Joker throws a Heavy Ball at ${target.name}.`);
    return true;
  }

  // Batch-create all available Balls in one action.
  if (character.charge > 0) {
    const amount = character.charge;
    character.charge = 0;
    character.jugglingBalls += amount;
    finishAction(`🤖 🎪 Joker converts ${amount} Charge into ${amount} Juggling Ball${amount === 1 ? "" : "s"}.`);
    return true;
  }

  return false;
}

// =====================================================
// AI HELPERS
// =====================================================

function getAILowestEnemy(character) {
  const enemies = getEnemyTeam(character).filter(
    enemy => enemy.alive
  );

  if (!enemies.length) return null;

  return [...enemies].sort(
    (a, b) =>
      (a.hp + getTotalShield(a)) -
      (b.hp + getTotalShield(b))
  )[0];
}

function getAITeammate(character) {
  return (
    getOwnTeam(character).find(
      ally =>
        ally !== character &&
        ally.alive
    ) ||
    null
  );
}


// =====================================================
// TARGET CHOICE
// =====================================================

function getBattleSlotId(character) {
  if (!character) return "";

  return (
    character.battleId ||
    `${character.team}${character.slot}`
  );
}

function findBattleCharacterById(battleId) {
  return (
    [...teamA, ...teamB].find(
      character =>
        getBattleSlotId(character) === battleId
    ) || null
  );
}

function formatBattleTarget(character) {
  if (!character) return "Unknown Target";

  return `[${getBattleSlotId(character)}] ${character.icon} ${character.name}`;
}


// =====================================================
// AI — ANUBIS / PROPHET
// =====================================================



function aiChimeraWillUseSkill(character) {
  if (!character || character.key !== "chimera" || !character.alive) {
    return false;
  }

  const enemies = getEnemyTeam(character).filter(enemy => enemy.alive);
  if (!enemies.length) return false;

  const form = character.chimeraForm || "beast";
  const hpRatio = character.maxHP > 0 ? character.hp / character.maxHP : 0;

  if (form === "spirit") return true;

  if (form === "shell") {
    const injuredAlly = getOwnTeam(character).some(
      ally => ally.alive && ally.hp < ally.maxHP
    );

    return (
      (character.charge >= 2 && injuredAlly) ||
      hpRatio >= 0.65
    );
  }

  const maxEnemyCharge = Math.max(...enemies.map(enemy => enemy.charge));

  return (
    character.charge >= 2 ||
    hpRatio <= 0.45 ||
    (
      character.charge >= 1 &&
      canChimeraActivelyEnterSpirit(character) &&
      maxEnemyCharge >= 2
    )
  );
}

function aiChimeraSkill(character) {
  if (!character || character.key !== "chimera" || !character.alive) {
    return false;
  }

  const enemies = getEnemyTeam(character).filter(enemy => enemy.alive);
  if (!enemies.length) return false;

  const allies = getOwnTeam(character).filter(ally => ally.alive);
  const form = character.chimeraForm || "beast";
  const hpRatio = character.maxHP > 0 ? character.hp / character.maxHP : 0;

  if (form === "beast") {
    if (character.charge >= 2) {
      const target = getAILowestEnemy(character);
      if (!target) return false;

      character.charge -= 2;
      const damage = 2 + consumeAttackBonus(character);
      applyDamage(target, damage);

      if (target.alive) {
        addChimeraBleed(character, target);
      }

      finishAction(
        `🤖 🐺 Rend hits ${target.name} for ${formatNumber(damage)} damage${target.alive ? " and applies 1 Bleed" : ""}.`
      );
      return true;
    }

    if (hpRatio <= 0.45) {
      if (character.charge >= 1) {
        character.charge--;
        setChimeraForm(character, "shell", true);
        grantShield(character, 2, "chimeraShell", round + 1);
        finishAction(`🤖 🐢 Chimera spends 1 Charge to enter Shell form and gains 2 Shield for two rounds.`);
      } else {
        setChimeraForm(character, "shell", true);
        finishAction(`🤖 🧬 Chimera directly shifts to Shell form for 0 Charge.`);
      }
      return true;
    }

    if (
      character.charge >= 1 &&
      canChimeraActivelyEnterSpirit(character)
    ) {
      const threat = [...enemies].sort((a, b) => b.charge - a.charge)[0];

      if (threat && threat.charge >= 2) {
        character.charge--;
        setChimeraForm(character, "spirit", true);
        threat.stunTurns += 1;
        finishAction(`🤖 👻 Chimera spends 1 Charge to enter Spirit form and stun ${threat.name}.`);
        return true;
      }
    }

    return false;
  }

  if (form === "shell") {
    if (character.charge >= 2) {
      const target = [...allies].sort(
        (a, b) => (a.hp / Math.max(0.5, a.maxHP)) - (b.hp / Math.max(0.5, b.maxHP))
      )[0];

      if (target && target.hp < target.maxHP) {
        character.charge -= 2;
        const healed = applyHealing(target, 2.5);
        grantShield(target, 1, "chimeraRepair", round);

        finishAction(
          `🤖 🐢 Shelter Repair restores ${formatNumber(healed)} HP to ${target.name} and grants 1 Shield for one round.`
        );
        return true;
      }
    }

    if (hpRatio >= 0.65) {
      setChimeraForm(character, "beast", true);
      finishAction(`🤖 🧬 Chimera directly shifts to Beast form for 0 Charge.`);
      return true;
    }

    return false;
  }

  // Spirit form.
  if (character.charge >= 2) {
    character.charge -= 2;

    let remaining = 2;
    let removed = 0;

    [...enemies]
      .sort((a, b) => b.charge - a.charge)
      .forEach(enemy => {
        if (remaining <= 0) return;
        const take = Math.min(remaining, enemy.charge);
        enemy.charge -= take;
        remaining -= take;
        removed += take;
      });

    gainCharge(character, 1);
    character.chimeraForm = "beast";
    character.icon = CHIMERA_FORM_INFO.beast.icon;

    finishAction(
      `🤖 👻 Spirit Drain removes ${removed} total enemy Charge, Chimera gains 1 Charge, and returns to Beast form.`
    );
    return true;
  }

  character.chimeraForm = "beast";
  character.icon = CHIMERA_FORM_INFO.beast.icon;
  finishAction(`🤖 🧬 Chimera directly shifts from Spirit to Beast form for 0 Charge.`);
  return true;
}

function aiAnubisSkill(character) {
  const enemies = getEnemyTeam(character).filter(enemy => enemy.alive);
  if (!enemies.length) return false;

  let boundTarget = getAnubisBoundTarget(character);
  const weight = Math.max(0, Math.floor(Number(character.anubisWeight) || 0));

  if (boundTarget && canAnubisUseSentence(character)) {
    executeAnubisSoulSentence(character);
    return true;
  }

  if (!boundTarget) {
    const target = [...enemies].sort(
      (a, b) => a.maxHP - b.maxHP || a.hp - b.hp
    )[0];

    bindAnubisTarget(character, target);
    finishAction(
      `🤖 🔗 ${character.name} binds Weight ${weight} to ${target.name}.`
    );
    return true;
  }

  const betterTarget = enemies.find(
    target =>
      target !== boundTarget &&
      weight > target.maxHP / 2 &&
      !(weight > boundTarget.maxHP / 2)
  );

  if (betterTarget) {
    bindAnubisTarget(character, betterTarget);
    finishAction(
      `🤖 🔗 ${character.name} rebinds Weight ${weight} to ${betterTarget.name}.`
    );
    return true;
  }

  if (character.charge >= 1 && character.hp > 0.5) {
    executeAnubisWeighHeart(character);
    return true;
  }

  return false;
}

function getAiProphecyGuess(target) {
  if (!target) return "attack";

  if (
    target.hp / Math.max(0.5, target.maxHP) <= 0.3 &&
    round >= target.healReadyRound &&
    target.hp < target.maxHP
  ) {
    return "heal";
  }

  const need = Number(CHARACTER_DATA[target.key]?.skillCost || 0);
  if (need > 0 && target.charge >= need) return "skill";
  if (need > 0 && target.charge < need) return "charge";

  if (Math.random() < 0.15) return "defend";
  return "attack";
}

function aiProphetSkill(character) {
  if (character.charge < 1) return false;

  const targets = getEnemyTeam(character).filter(enemy => enemy.alive);
  if (!targets.length) return false;

  const sorted = [...targets].sort((a,b) => a.hp - b.hp);
  const maxPredictions = Math.min(character.charge, sorted.length);
  const predictionCount = maxPredictions >= 2 && Math.random() < 0.6 ? 2 : 1;

  for (const target of sorted.slice(0, predictionCount)) {
    const command = getAiProphecyGuess(target);
    storeProphecy(character, target, command);
  }

  character.charge -= predictionCount;
  finishAction(`🤖 🔮 ${character.name} completed a prophecy.`);
  return true;
}


function chooseTarget(
  targets,
  callback,
  options = {}
) {
  setActionButtonsDisabled(true);

  const livingTargets =
    targets.filter(
      target => target.alive
    );

  const title =
    options.title ||
    "Choose a target";

  const subtitle =
    options.subtitle ||
    "";

  const historyHTML =
    options.historyHTML ||
    "";

  contextPanel.innerHTML = `
    <strong>${title}</strong>
    ${historyHTML}
    ${
      subtitle
        ? `<div class="action-step-hint">${subtitle}</div>`
        : "<br><br>"
    }
  `;

  livingTargets.forEach(target => {
    // Capture a stable battlefield ID instead of relying on a stale object
    // reference. This guarantees that the character confirmed by the player
    // is the character that receives the effect.
    const targetBattleId =
      getBattleSlotId(target);

    const button =
      document.createElement("button");

    let extra = "";

    const shield =
      getTotalShield(target);

    if (shield > 0) {
      extra +=
        ` 🛡️${formatNumber(shield)}`;
    }

    if (target.revivePuppet) {
      extra += " 🧵";
    }

    if (
      target.restorationMarkTicks > 0
    ) {
      extra +=
        ` 💚${formatNumber(target.restorationMarkHeal)}×${target.restorationMarkTicks}`;
    }

    button.textContent =
      `${formatBattleTarget(target)} — ${formatNumber(target.hp)} HP${extra}`;

    button.onclick = () => {
      const resolveSelectedTarget = () => {
        const resolvedTarget =
          findBattleCharacterById(
            targetBattleId
          );

        if (
          !resolvedTarget ||
          !resolvedTarget.alive
        ) {
          addLog(
            `⚠️ Target [${targetBattleId}] is no longer available.`
          );

          chooseTarget(
            targets,
            callback,
            options
          );

          return null;
        }

        return resolvedTarget;
      };

      if (options.confirm === false) {
        const resolvedTarget =
          resolveSelectedTarget();

        if (resolvedTarget) {
          callback(resolvedTarget);
        }

        return;
      }

      const currentCharacter =
        turnOrder[currentTurn];

      const targetForMessage =
        findBattleCharacterById(
          targetBattleId
        ) || target;

      const confirmMessage =
        typeof options.confirmText === "function"
          ? options.confirmText(
              targetForMessage
            )
          : `Choose ${formatBattleTarget(targetForMessage)}?`;

      showCommitConfirmation(
        currentCharacter,
        `[${targetBattleId}] ${confirmMessage}`,
        () => {
          const resolvedTarget =
            resolveSelectedTarget();

          if (resolvedTarget) {
            callback(resolvedTarget);
          }
        },
        () =>
          chooseTarget(
            targets,
            callback,
            options
          )
      );
    };

    contextPanel.appendChild(
      button
    );
  });

  updateBackButton();
}


// =====================================================
// IMMEDIATE EXTRA TURN ROUTER
// =====================================================

function resumeAfterImmediateTurn() {
  const resumeIndex = immediateTurnResumeIndex;
  immediateTurnActive = false;
  immediateTurnResumeIndex = null;

  if (resumeIndex === null || resumeIndex === undefined) {
    advanceTurn();
    return;
  }

  if (resumeIndex >= turnOrder.length) {
    currentTurn = 0;
    endRound();
    return;
  }

  currentTurn = resumeIndex;
  beginTurn();
}

function advanceAfterFinishedAction() {
  if (gameOver) return;

  // If this was the immediate Vampire action itself, resume the original
  // turn sequence exactly where it would have continued.
  if (immediateTurnActive) {
    resumeAfterImmediateTurn();
    return;
  }

  if (immediateTurnBattleId) {
    const extraIndex = turnOrder.findIndex(
      character =>
        character &&
        character.battleId === immediateTurnBattleId &&
        character.alive
    );

    immediateTurnBattleId = null;

    if (extraIndex >= 0) {
      const sourceTurnIndex = currentTurn;
      immediateTurnResumeIndex = sourceTurnIndex + 1;

      // If Vampire's regular slot is still ahead this round, the immediate
      // action replaces that upcoming slot instead of creating a double turn.
      if (extraIndex > sourceTurnIndex) {
        turnOrder[extraIndex].skipRegularTurnRound = round;
      }

      immediateTurnActive = true;
      currentTurn = extraIndex;
      addLog(`🧛 ${turnOrder[extraIndex].name} takes an immediate action after reviving.`);
      beginTurn();
      return;
    }
  }

  advanceTurn();
}

// =====================================================
// FINISH ACTION
// =====================================================

function finishAction(message) {
  if (pendingAiSkillActor) {
    const actor = pendingAiSkillActor;
    pendingAiSkillActor = null;
    recordAnubisCommand(actor, "skill");
  }
  [...teamA, ...teamB].forEach(checkAnubisLowHpPassive);
  // Once an action is committed, Back can never return to an earlier turn.
  actionStepStack = [];
  actionStepOwner = null;
  pendingCommandType = null;
  activeActionActor = null;
  activeActionCommandType = null;
  updateBackButton();

  addLog(message);
  renderBattle();

  if (checkGameOver()) {
    return;
  }

  setActionButtonsDisabled(true);

  contextPanel.innerHTML = `
    <strong>${message}</strong>
  `;

  setTimeout(
    advanceAfterFinishedAction,
    650
  );
}


// =====================================================
// TEAM HELPERS
// =====================================================

function getEnemyTeam(character) {
  return character.team === "A"
    ? teamB
    : teamA;
}

function getOwnTeam(character) {
  return character.team === "A"
    ? teamA
    : teamB;
}


// =====================================================
// SHIELDS
// =====================================================

function getDevilShieldTotal(character) {
  return character.devilShields.reduce(
    (sum, entry) =>
      sum + entry.amount,
    0
  );
}

function getTotalShield(character) {
  const cureShieldTotal =
    character.cureShields.reduce(
      (sum, entry) =>
        sum + entry.amount,
      0
    );

  const angelShieldTotal =
    character.angelShields.reduce(
      (sum, entry) =>
        sum + entry.amount,
      0
    );

  const jokerShieldTotal =
    (character.jokerShields || []).reduce(
      (sum, entry) => sum + (Number(entry.amount) || 0),
      0
    );

  const chimeraRepairShieldTotal =
    (character.chimeraRepairShields || []).reduce(
      (sum, entry) => sum + (Number(entry.amount) || 0),
      0
    );

  return (
    character.permanentShield +
    (character.anubisJudgmentShield || 0) +
    (character.anubisGuardShield || 0) +
    character.timedShield +
    character.royalShield +
    (character.chimeraShellShield || 0) +
    getDevilShieldTotal(character) +
    cureShieldTotal +
    angelShieldTotal +
    jokerShieldTotal +
    chimeraRepairShieldTotal
  );
}


// =====================================================
// GAME OVER
// =====================================================

function checkGameOver() {
  const teamADead = teamA.every(
    character => !character.alive
  );

  const teamBDead = teamB.every(
    character => !character.alive
  );

  if (
    !teamADead &&
    !teamBDead
  ) {
    return false;
  }

  gameOver = true;
  setActionButtonsDisabled(true);

  if (
    teamADead &&
    teamBDead
  ) {
    document.getElementById("turn-title").textContent =
      "💥 DRAW";
  } else if (teamBDead) {
    document.getElementById("turn-title").textContent =
      "🏆 TEAM A WINS";
  } else {
    document.getElementById("turn-title").textContent =
      "🏆 TEAM B WINS";
  }

  contextPanel.innerHTML =
    "<h2>Game Over!</h2>";

  renderBattle();
  notifyOnlineState();

  return true;
}


// =====================================================
// RENDER
// =====================================================

function renderBattle() {
  renderTeam(
    teamA,
    "team-a-battle"
  );

  renderTeam(
    teamB,
    "team-b-battle"
  );

  document
    .getElementById("round-number")
    .textContent =
      round;

  const currentCharacter =
    turnOrder[currentTurn];

  if (
    currentCharacter &&
    currentCharacter.alive &&
    !gameOver
  ) {
    updateAttackDamagePreview(
      currentCharacter
    );

    updateSkillResourcePreview(
      currentCharacter
    );

    updateHealPreview(
      currentCharacter
    );
  }

  updateBackButton();
}

function renderTeam(team, elementId) {
  const container =
    document.getElementById(elementId);

  container.innerHTML = "";

  team.forEach(character => {
    const card =
      document.createElement("div");

    card.className =
      "character-battle-card";

    if (
      turnOrder[currentTurn] === character &&
      character.alive &&
      !gameOver
    ) {
      card.classList.add("active");
    }

    if (!character.alive) {
      card.classList.add("dead");
    }

    const hpPercent =
      character.maxHP > 0
        ? Math.min(
            100,
            Math.max(
              0,
              character.hp /
              character.maxHP *
              100
            )
          )
        : 0;

    const totalShield =
      getTotalShield(character);

    let statuses = `
      <span class="status">
        ⚡ ${character.charge}
      </span>
    `;

    if (totalShield > 0) {
      statuses += `
        <span class="status">
          🛡️ ${formatNumber(totalShield)}
        </span>
      `;
    }

    if (character.defending) {
      statuses += `
        <span class="status">
          🛡 Defending
        </span>
      `;
    }

    if (character.invincible) {
      statuses += `
        <span class="status">
          ✨ Invincible
        </span>
      `;
    }

    if (character.stunTurns > 0) {
      statuses += `
        <span class="status">
          💫 Stunned
        </span>
      `;
    }

    if (character.pendingHeal > 0) {
      statuses += `
        <span class="status">
          ❤️ Heal +${formatNumber(character.pendingHeal)} Pending
        </span>
      `;
    }

    if (
      round <
      character.healReadyRound
    ) {
      statuses += `
        <span class="status">
          ❤️ Heal CD ${character.healReadyRound - round}R
        </span>
      `;
    }

    if (
      character.restorationMarkTicks > 0
    ) {
      statuses += `
        <span class="status">
          💚 Mark ${formatNumber(character.restorationMarkHeal)} × ${character.restorationMarkTicks}
        </span>
      `;
    }

    if (
      character.cureShields.length > 0
    ) {
      const cureShieldTotal =
        character.cureShields.reduce(
          (sum, entry) =>
            sum + entry.amount,
          0
        );

      if (cureShieldTotal > 0) {
        statuses += `
          <span class="status">
            💚 Barrier ${formatNumber(cureShieldTotal)}
          </span>
        `;
      }
    }

    const enemyAnubisForCard = getEnemyAnubis(character);

    if (character.key === "anubis") {
      statuses += `
        <span class="status">
          ⚖️ Weight ${character.anubisWeight || 0}
        </span>
      `;
    }

    if (
      enemyAnubisForCard &&
      enemyAnubisForCard.anubisBoundTargetBattleId === character.battleId
    ) {
      statuses += `
        <span class="status">
          🔗 Weight Bound
        </span>
      `;
    }

    if (
      enemyAnubisForCard &&
      (character.anubisHealingMeter || 0) > 0
    ) {
      statuses += `
        <span class="status">
          ❤️ Weight Relief ${formatNumber(character.anubisHealingMeter || 0)}/2
        </span>
      `;
    }

    if ((character.cureHealingCount || 0) > 0) {
      statuses += `
        <span class="status">
          💚 Resonance ${character.cureHealingCount}/3
        </span>
      `;
    }

    if (character.key === "prophet") {
      statuses += `
        <span class="status">🔮 Failure ${character.prophetFailures || 0}/3</span>
      `;
    }

    if (
      character.nextAttackBonus > 0
    ) {
      statuses += `
        <span class="status">
          ✨ Empower +${formatNumber(character.nextAttackBonus)}
        </span>
      `;
    }

    if (
      character.personalNextDamageBonus > 0
    ) {
      statuses += `
        <span class="status">
          🌟 Last Light +${formatNumber(character.personalNextDamageBonus)}
        </span>
      `;
    }

    if (character.revivePuppet) {
      const lifePuppetRounds =
        character.revivePuppetExpiresRound === null ||
        character.revivePuppetExpiresRound === undefined
          ? "?"
          : Math.max(0, Number(character.revivePuppetExpiresRound) - round + 1);

      statuses += `
        <span class="status">
          🧵 Life Puppet ${lifePuppetRounds}R
        </span>
      `;
    }

    if (character.key === "puppeteer") {
      statuses += `
        <span class="status">
          🎭 ${character.puppets}
        </span>
        <span class="status">
          🧵 ${character.lifePuppets}
        </span>
      `;
    }

    if (character.key === "angel") {
      statuses += `
        <span class="status">
          ${
            character.angelBlessUsed
              ? "👼 Bless Used"
              : "👼 Bless Ready"
          }
        </span>
      `;
    }

    if (
      character.key === "cureMage" &&
      !character.cureEmergencyUsed
    ) {
      statuses += `
        <span class="status">
          💚 Emergency Ready
        </span>
      `;
    }

    if (
      character.key === "fighter" &&
      !character.fighterLastStandSaveUsed
    ) {
      statuses += `
        <span class="status">
          ⚔️ Last Stand Ready
        </span>
      `;
    }

    if (character.key === "assassin") {
      statuses += `
        <span class="status">
          ❤️‍🩹 Healing -0.5
        </span>
      `;

      if (character.assassinGuardAvailable) {
        statuses += `
          <span class="status">
            🗡️ Guard 1.5
          </span>
        `;
      }
    }

    const fighterBonus =
      getFighterDamageBonus(character);

    if (fighterBonus > 0) {
      statuses += `
        <span class="status">
          🔥 Damage +${formatNumber(fighterBonus)}
        </span>
      `;
    }

    if (character.key === "joker") {
      statuses += `
        <span class="status">
          🎪 ${character.jugglingBalls}
        </span>
        <span class="status">
          🎯 ${character.jokerBallsThrown}
        </span>
        ${
          round < (character.jokerStunBallReadyRound || 1)
            ? `
              <span class="status">
                🤹 Stun CD ${character.jokerStunBallReadyRound - round}R
              </span>
            `
            : ""
        }
      `;
    }

    if (character.key === "devil") {
      if (character.berserk) {
        statuses += `
          <span class="status">
            🔥 Berserk
          </span>
        `;
      }

      if (
        character.berserkPendingDeath
      ) {
        statuses += `
          <span class="status">
            💀 Pending Death
          </span>
        `;
      }

      const devilBonus =
        getDevilAttackBonus(character);

      if (devilBonus > 0) {
        statuses += `
          <span class="status">
            😈 Normal ATK +${formatNumber(devilBonus)}
          </span>
        `;
      }
    }

    if (character.key === "vampire") {
      const vampireBonus = getVampireAttackBonus(character);
      const teammate = getAnyTeammate(character);

      statuses += `
        <span class="status">
          🧛 ${character.vampireReviveUsed ? "Rebirth Used" : "Rebirth Ready"}
        </span>
      `;

      if (getLivingTeammate(character)) {
        statuses += `
          <span class="status">
            🌙 DMG -0.5
          </span>
        `;
      }

      if (teammate && teammate.alive) {
        statuses += `
          <span class="status">
            💀 Death Mark ${character.vampireTeammateDeathMark || 0}/5
          </span>
        `;
      }

      if (teammate && !teammate.alive) {
        statuses += `
          <span class="status">
            🩸 Solo: ATK +1 · Lifesteal 1.5
          </span>
        `;
      }

      if (vampireBonus > 0) {
        statuses += `
          <span class="status">
            🧛 Normal ATK +${formatNumber(vampireBonus)}
          </span>
        `;
      }

      if (Number(character.vampireReviveInvincibleRound) === round) {
        statuses += `
          <span class="status">
            ✨ Rebirth Invincible (this round)
          </span>
        `;
      }

      if ((Number(character.vampireNextAttackLifestealBonus) || 0) > 0) {
        statuses += `
          <span class="status">
            🩸 Next ATK Lifesteal +${formatNumber(character.vampireNextAttackLifestealBonus)}
          </span>
        `;
      }

    }

    if (Array.isArray(character.chimeraBleeds) && character.chimeraBleeds.length > 0) {
      statuses += `
        <span class="status">
          🩸 Bleed ${character.chimeraBleeds.length}
        </span>
      `;
    }

    if (character.key === "chimera") {
      const formInfo = getChimeraFormInfo(character.chimeraForm || "beast");
      statuses += `
        <span class="status">
          🧬 ${formInfo.icon} ${formInfo.name}
        </span>
        <span class="status">
          👻 ${
            canChimeraActivelyEnterSpirit(character)
              ? "Spirit Ready"
              : `Spirit CD ${Math.max(0, character.chimeraSpiritReadyRound - round)}R`
          }
        </span>
        <span class="status">
          ♻️ ${character.chimeraReviveUsed ? "Revive Used" : "Revive Ready"}
        </span>
      `;
    }

    card.innerHTML = `
      <div class="character-name">
        <strong>[${getBattleSlotId(character)}]</strong>
        ${character.icon}
        ${character.name}
      </div>

      <div class="hp-text">
        HP:
        ${formatNumber(character.hp)}
        /
        ${formatNumber(character.maxHP)}
      </div>

      <div class="hp-bar">
        <div
          class="hp-fill"
          style="width:${hpPercent}%;"
        ></div>
      </div>

      <div class="character-status">
        ${statuses}
      </div>
    `;

    container.appendChild(card);
  });
}


// =====================================================
// BUTTON CONTROL
// =====================================================

function setActionButtonsDisabled(disabled) {
  document
    .querySelectorAll(
      "#action-panel button:not(#back-button)"
    )
    .forEach(button => {
      button.disabled = disabled;
    });

  updateBackButton();
}


// =====================================================
// BATTLE LOG
// =====================================================

function addLog(message) {
  battleLogEntries.unshift(String(message));

  if (battleLogEntries.length > 35) {
    battleLogEntries.length = 35;
  }

  const log =
    document.getElementById("battle-log-content");

  if (!log) return;

  const line =
    document.createElement("div");

  line.className =
    "log-line";

  line.textContent =
    message;

  log.prepend(line);

  while (log.children.length > 35) {
    log.removeChild(log.lastChild);
  }
}

function renderBattleLogEntries() {
  const log =
    document.getElementById("battle-log-content");

  if (!log) return;

  log.innerHTML = "";

  battleLogEntries
    .slice(0, 35)
    .forEach(message => {
      const line = document.createElement("div");
      line.className = "log-line";
      line.textContent = message;
      log.appendChild(line);
    });
}


// =====================================================
// NUMBER FORMAT
// =====================================================

function formatNumber(number) {
  if (Number.isInteger(number)) {
    return number;
  }

  return Number(
    number.toFixed(2)
  );
}


// =====================================================
// ONLINE BATTLE SYNCHRONIZATION
// =====================================================

function cloneOnlineValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function getOnlineBattleSnapshot() {
  return {
    schemaVersion: 5,
    round,
    currentTurn,
    gameOver,
    immediateTurnBattleId,
    immediateTurnResumeIndex,
    immediateTurnActive,
    selectedA: [...selectedA],
    selectedB: [...selectedB],
    teamA: cloneOnlineValue(teamA),
    teamB: cloneOnlineValue(teamB),
    battleLogEntries: [...battleLogEntries]
  };
}

function notifyOnlineState() {
  if (
    gameMode !== "online" ||
    onlineApplyingSnapshot ||
    typeof onlineStateChangeHandler !== "function"
  ) {
    return;
  }

  try {
    onlineStateChangeHandler(
      getOnlineBattleSnapshot()
    );
  } catch (error) {
    console.error(
      "Quick Duel online state handler failed:",
      error
    );
  }
}

function showOnlineWaitingUi(character) {
  setActionButtonsDisabled(true);
  actionStepStack = [];
  actionStepOwner = null;
  updateBackButton();

  if (!character) {
    document.getElementById("turn-title").textContent =
      "🌐 Waiting for battle state...";
    contextPanel.innerHTML =
      "<strong>Waiting for the other player...</strong>";
    return;
  }

  document.getElementById("turn-title").textContent =
    `TEAM ${character.team} — ${character.icon} ${character.name}'s Turn`;

  contextPanel.innerHTML = `
    <strong>🌐 Waiting for Team ${character.team}...</strong>
    <div class="action-step-hint">
      The other player is choosing an action.
    </div>
  `;
}

function startOnlineBattleFromDraft(picks, side) {
  if (!picks) return false;

  const required = [
    picks.A1,
    picks.A2,
    picks.B1,
    picks.B2
  ];

  if (
    required.some(
      key => !key || !CHARACTER_DATA[key]
    )
  ) {
    console.error(
      "Cannot start online battle: draft is incomplete.",
      picks
    );
    return false;
  }

  onlinePlayerSide = side === "B" ? "B" : "A";
  gameMode = "online";

  selectedA = [picks.A1, picks.A2];
  selectedB = [picks.B1, picks.B2];

  startBattle();
  return true;
}

function normalizeImportedCharacter(character) {
  const copy = { ...character };

  copy.devilShields = Array.isArray(copy.devilShields)
    ? copy.devilShields
    : [];

  copy.cureShields = Array.isArray(copy.cureShields)
    ? copy.cureShields
    : [];

  copy.angelShields = Array.isArray(copy.angelShields)
    ? copy.angelShields
    : [];

  copy.jokerShields = Array.isArray(copy.jokerShields)
    ? copy.jokerShields
    : [];

  copy.chimeraRepairShields = Array.isArray(copy.chimeraRepairShields)
    ? copy.chimeraRepairShields
    : [];

  copy.chimeraBleeds = Array.isArray(copy.chimeraBleeds)
    ? copy.chimeraBleeds
        .map(entry => ({
          ticksLeft: Math.max(0, Math.floor(Number(entry?.ticksLeft) || 0)),
          sourceBattleId:
            typeof entry?.sourceBattleId === "string"
              ? entry.sourceBattleId
              : null
        }))
        .filter(entry => entry.ticksLeft > 0)
    : [];

  copy.chimeraShellShield = Math.max(0, Number(copy.chimeraShellShield) || 0);
  copy.chimeraShellShieldExpiresRound =
    Number.isFinite(Number(copy.chimeraShellShieldExpiresRound))
      ? Number(copy.chimeraShellShieldExpiresRound)
      : null;

  copy.chimeraForm =
    copy.key === "chimera" && ["beast", "shell", "spirit"].includes(copy.chimeraForm)
      ? copy.chimeraForm
      : (copy.key === "chimera" ? "beast" : null);

  copy.chimeraSpiritReadyRound =
    Number.isFinite(Number(copy.chimeraSpiritReadyRound))
      ? Number(copy.chimeraSpiritReadyRound)
      : 1;

  copy.chimeraReviveUsed = Boolean(copy.chimeraReviveUsed);

  if (copy.key === "chimera") {
    copy.icon = getChimeraFormInfo(copy.chimeraForm).icon;
  }

  copy.revivePuppetExpiresRound =
    Number.isFinite(Number(copy.revivePuppetExpiresRound))
      ? Number(copy.revivePuppetExpiresRound)
      : null;

  copy.jokerStunBallReadyRound =
    Number.isFinite(Number(copy.jokerStunBallReadyRound))
      ? Number(copy.jokerStunBallReadyRound)
      : 1;

  copy.fighterLastStandSaveUsed =
    Boolean(copy.fighterLastStandSaveUsed);

  copy.assassinGuardAvailable =
    copy.key === "assassin"
      ? copy.assassinGuardAvailable !== false
      : false;

  copy.baseHP = Number.isFinite(Number(copy.baseHP))
    ? Number(copy.baseHP)
    : Number(CHARACTER_DATA[copy.key]?.hp || copy.maxHP || 0);
  copy.anubisWeight = Math.max(0, Math.floor(Number(copy.anubisWeight) || 0));
  copy.anubisBoundTargetBattleId =
    typeof copy.anubisBoundTargetBattleId === "string"
      ? copy.anubisBoundTargetBattleId
      : null;
  copy.anubisHealingMeter = Math.max(0, Number(copy.anubisHealingMeter) || 0);
  copy.anubisTeamDamageMeter = Math.max(0, Number(copy.anubisTeamDamageMeter) || 0);
  copy.anubisTeamDamageReductionRound =
    Number.isFinite(Number(copy.anubisTeamDamageReductionRound))
      ? Number(copy.anubisTeamDamageReductionRound)
      : null;
  copy.anubisJudgmentShield = Math.max(0, Number(copy.anubisJudgmentShield) || 0);
  copy.anubisJudgmentShieldExpiresRound =
    Number.isFinite(Number(copy.anubisJudgmentShieldExpiresRound))
      ? Number(copy.anubisJudgmentShieldExpiresRound)
      : null;
  copy.anubisDamageMeter = Number(copy.anubisDamageMeter) || 0;
  copy.anubisAttackCounter = Math.max(0, Math.floor(Number(copy.anubisAttackCounter) || 0));
  copy.anubisGuardShield = Number(copy.anubisGuardShield) || 0;
  copy.anubisLowHpChargeUsed = false;
  copy.vampireReviveInvincibleRound =
    Number.isFinite(Number(copy.vampireReviveInvincibleRound))
      ? Number(copy.vampireReviveInvincibleRound)
      : null;
  copy.vampireNextAttackDamageBonus =
    Math.max(0, Number(copy.vampireNextAttackDamageBonus) || 0);
  copy.vampireNextAttackLifestealBonus =
    Math.max(0, Number(copy.vampireNextAttackLifestealBonus) || 0);
  copy.cureHealingCount = Math.max(0, Math.floor(Number(copy.cureHealingCount) || 0));
  copy.prophetFailures = Math.max(0, Math.floor(Number(copy.prophetFailures) || 0));
  copy.prophecies = Array.isArray(copy.prophecies) ? copy.prophecies : [];

  return copy;
}

function applyOnlineBattleSnapshot(snapshot, side) {
  if (!snapshot) return false;

  onlineApplyingSnapshot = true;

  try {
    onlinePlayerSide = side === "B" ? "B" : "A";
    gameMode = "online";

    selectedA = Array.isArray(snapshot.selectedA)
      ? [...snapshot.selectedA]
      : [];

    selectedB = Array.isArray(snapshot.selectedB)
      ? [...snapshot.selectedB]
      : [];

    teamA = Array.isArray(snapshot.teamA)
      ? snapshot.teamA.map(normalizeImportedCharacter)
      : [];

    teamB = Array.isArray(snapshot.teamB)
      ? snapshot.teamB.map(normalizeImportedCharacter)
      : [];

    if (teamA.length !== 2 || teamB.length !== 2) {
      console.error(
        "Invalid online battle snapshot:",
        snapshot
      );
      return false;
    }

    turnOrder = [
      teamA[0],
      teamB[0],
      teamA[1],
      teamB[1]
    ];

    currentTurn = Math.max(
      0,
      Math.min(
        3,
        Number(snapshot.currentTurn) || 0
      )
    );

    round = Math.max(
      1,
      Number(snapshot.round) || 1
    );

    gameOver = Boolean(snapshot.gameOver);
    immediateTurnBattleId = snapshot.immediateTurnBattleId || null;
    immediateTurnResumeIndex = snapshot.immediateTurnResumeIndex === null || snapshot.immediateTurnResumeIndex === undefined
      ? null
      : Number(snapshot.immediateTurnResumeIndex);
    immediateTurnActive = Boolean(snapshot.immediateTurnActive);

    battleLogEntries = Array.isArray(snapshot.battleLogEntries)
      ? snapshot.battleLogEntries
          .map(String)
          .slice(0, 35)
      : [];

    actionStepStack = [];
    actionStepOwner = null;

    document
      .getElementById("selection-screen")
      .classList.add("hidden");

    document
      .getElementById("battle-screen")
      .classList.remove("hidden");

    renderBattleLogEntries();
    renderBattle();

    if (gameOver) {
      checkGameOver();
      return true;
    }

    const character = turnOrder[currentTurn];

    if (!character) {
      showOnlineWaitingUi(null);
      return true;
    }

    resetActionStepStack(character);

    if (character.team === onlinePlayerSide) {
      showActions(character);
    } else {
      showOnlineWaitingUi(character);
    }

    return true;
  } finally {
    onlineApplyingSnapshot = false;
  }
}

function resetOnlineBattleToSelection() {
  onlineApplyingSnapshot = true;

  try {
    gameMode = "online";
    selectedA = [];
    selectedB = [];
    teamA = [];
    teamB = [];
    turnOrder = [];
    currentTurn = 0;
    round = 1;
    gameOver = false;
    actionStepStack = [];
    actionStepOwner = null;
    battleLogEntries = [];

    const log =
      document.getElementById("battle-log-content");

    if (log) {
      log.innerHTML = "";
    }

    document
      .getElementById("battle-screen")
      .classList.add("hidden");

    document
      .getElementById("selection-screen")
      .classList.remove("hidden");

    setActionButtonsDisabled(true);
    updateBackButton();
  } finally {
    onlineApplyingSnapshot = false;
  }

  return true;
}

function showOnlineMatchResult(
  winnerSide,
  reason = "battle"
) {
  gameMode = "online";
  gameOver = true;
  actionStepStack = [];
  actionStepOwner = null;

  setActionButtonsDisabled(true);
  updateBackButton();

  const title =
    document.getElementById("turn-title");

  const context =
    document.getElementById("context-panel");

  if (winnerSide === "DRAW") {
    title.textContent = "💥 DRAW";
    context.innerHTML =
      "<h2>Game Over — Draw</h2>";
  } else {
    const loserSide =
      winnerSide === "A" ? "B" : "A";

    title.textContent =
      reason === "surrender"
        ? `🏳️ TEAM ${loserSide} SURRENDERED — TEAM ${winnerSide} WINS`
        : `🏆 TEAM ${winnerSide} WINS`;

    context.innerHTML =
      reason === "surrender"
        ? `<h2>Team ${loserSide} surrendered.</h2>`
        : `<h2>Team ${winnerSide} wins!</h2>`;
  }

  if (
    teamA.length === 2 &&
    teamB.length === 2
  ) {
    renderBattle();
  }

  return true;
}

function setOnlineStateChangeHandler(handler) {
  onlineStateChangeHandler =
    typeof handler === "function"
      ? handler
      : null;
}

function setOnlinePlayerSide(side) {
  onlinePlayerSide =
    side === "B"
      ? "B"
      : side === "A"
        ? "A"
        : null;
}

function isOnlineBattleActive() {
  return (
    gameMode === "online" &&
    teamA.length === 2 &&
    teamB.length === 2 &&
    !document
      .getElementById("battle-screen")
      .classList.contains("hidden")
  );
}

// =====================================================
// RESTART / INITIAL LOAD
// =====================================================

document
  .getElementById("restart-button")
  .addEventListener(
    "click",
    () => {
      if (gameMode === "online") {
        return;
      }

      location.reload();
    }
  );

renderCharacterSelection();


// =====================================================
// ONLINE PVP BRIDGE
// =====================================================
// Exposes only the read-only data needed by online.js.
// Existing local battle logic remains unchanged.
window.QuickDuelBridge = {
  CHARACTER_DATA,
  formatNumber,
  startOnlineBattleFromDraft,
  applyOnlineBattleSnapshot,
  getOnlineBattleSnapshot,
  setOnlineStateChangeHandler,
  setOnlinePlayerSide,
  isOnlineBattleActive,
  resetOnlineBattleToSelection,
  showOnlineMatchResult
};
