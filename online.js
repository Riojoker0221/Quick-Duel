// UNIQUE WEEKLY GAME USERNAME + ONLINE STATS V1 + DAILY LEADERBOARD • 2026-09-17
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  update,
  onDisconnect,
  serverTimestamp,
  runTransaction
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

// =====================================================
// FIREBASE CONFIG
// =====================================================

const firebaseConfig = {
  apiKey: "AIzaSyCpIdrIiwlDmpnZu0wxVU1DxXxiJ6Y3lM8",
  authDomain: "quick-duel-ba1b0.firebaseapp.com",
  projectId: "quick-duel-ba1b0",
  storageBucket: "quick-duel-ba1b0.firebasestorage.app",
  messagingSenderId: "890600105737",
  appId: "1:890600105737:web:02d8fa773435e76c3755d8",
  measurementId: "G-EXEPGGNFB9"
};

const DATABASE_URL =
  "https://quick-duel-ba1b0-default-rtdb.firebaseio.com";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp, DATABASE_URL);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// =====================================================
// QUICK DUEL BRIDGE
// =====================================================

const bridge = window.QuickDuelBridge;

if (!bridge) {
  throw new Error(
    "QuickDuelBridge was not found. game.js must load before online.js."
  );
}

const CHARACTER_DATA = bridge.CHARACTER_DATA;
const formatNumber = bridge.formatNumber;

const REQUIRED_ONLINE_BRIDGE_METHODS = [
  "startOnlineBattleFromDraft",
  "applyOnlineBattleSnapshot",
  "setOnlineStateChangeHandler",
  "setOnlinePlayerSide",
  "isOnlineBattleActive",
  "resetOnlineBattleToSelection",
  "showOnlineMatchResult"
];

for (const method of REQUIRED_ONLINE_BRIDGE_METHODS) {
  if (typeof bridge[method] !== "function") {
    throw new Error(
      `QuickDuelBridge.${method} is missing. Deploy the matching game.js.`
    );
  }
}

// =====================================================
// ONLINE DRAFT ORDER
// =====================================================

const ONLINE_DRAFT_ORDER = [
  { label: "A BAN", team: "A", type: "ban" },
  { label: "B BAN", team: "B", type: "ban" },
  { label: "A1", team: "A", type: "pick", slot: 1 },
  { label: "B1", team: "B", type: "pick", slot: 1 },
  { label: "B2", team: "B", type: "pick", slot: 2 },
  { label: "A2", team: "A", type: "pick", slot: 2 }
];

// =====================================================
// STATE
// =====================================================

let onlineUser = null;
let onlineRoomCode = null;
let onlineSide = null;
let onlinePlayerRole = null; // host | guest
let onlineRoomData = null;
let roomUnsubscribe = null;
let leaderboardUnsubscribe = null;
let statsUnsubscribe = null;
let onlineModeActive = false;
let onlineBattleInitializationStarted = false;
let lastAppliedBattleVersion = 0;
let battleWriteChain = Promise.resolve();
let lastHandledMatchId = null;
let currentLeaderboardScore = 0;
let latestLeaderboardData = {};
let leaderboardDayKey = "";
let leaderboardMidnightTimer = null;
let latestOnlineStatsData = {};
let gameUsername = "";
let gameUsernameLoaded = false;
let gameUsernameSaving = false;
let gameUsernameChangedAt = 0;
let gameUsernameRegistryConflict = false;
let gameUsernameCooldownTimer = null;

const LEADERBOARD_TIME_ZONE = "America/New_York";
const ONLINE_STATS_VERSION = "0.2";
const ONLINE_STATS_ROOT = "rooms/__onlineStatsV02"; // Version 0.2 stats are isolated from the archived 0.1 aggregate.
const ONLINE_STATS_START_DAY_KEY = "2026-09-17"; // Chimera release milestone; displayed as the 0.2 start point.
const GAME_USERNAME_MIN_LENGTH = 2;
const GAME_USERNAME_MAX_LENGTH = 20;
const GAME_USERNAME_CHANGE_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
const USERNAME_REGISTRY_ROOT = "rooms/__usernameRegistryV1";

// =====================================================
// HTML REFERENCES
// =====================================================

const pvpModeButton = document.getElementById("pvp-mode-button");
const aiModeButton = document.getElementById("ai-mode-button");
const onlineModeButton = document.getElementById("online-mode-button");

const onlineRoomPanel = document.getElementById("online-room-panel");
const createRoomButton = document.getElementById("create-room-button");
const joinRoomButton = document.getElementById("join-room-button");
const roomCodeInput = document.getElementById("room-code-input");
const onlineStatus = document.getElementById("online-status");
const roomCodeDisplay = document.getElementById("room-code-display");

const googleSignInButton = document.getElementById("google-signin-button");
const guestSignInButton = document.getElementById("guest-signin-button");
const googleSignOutButton = document.getElementById("google-signout-button");
const onlineUserDisplay = document.getElementById("online-user-display");
const onlineUserScore = document.getElementById("online-user-score");
const leaderboardList = document.getElementById("leaderboard-list");
const yesterdayWinnerTitle = document.getElementById("yesterday-winner-title");
const yesterdayWinnerName = document.getElementById("yesterday-winner-name");
const yesterdayWinnerMeta = document.getElementById("yesterday-winner-meta");
const leaderboardResetLabel = document.getElementById("leaderboard-reset-label");
const dailyBestTitle = document.getElementById("daily-best-title");
const dailyBestPlayerHeader = document.getElementById("daily-best-player-header");
const dailyBestCountHeader = document.getElementById("daily-best-count-header");
const dailyBestBody = document.getElementById("daily-best-body");
const onlineBattlePlayerBadges = document.getElementById("online-battle-player-badges");
const onlineTeamAPlayer = document.getElementById("online-team-a-player");
const onlineTeamBPlayer = document.getElementById("online-team-b-player");

const gameUsernamePanel = document.getElementById("game-username-panel");
const gameUsernameTitle = document.getElementById("game-username-title");
const gameUsernameInput = document.getElementById("game-username-input");
const saveGameUsernameButton = document.getElementById("save-game-username-button");
const gameUsernameHelp = document.getElementById("game-username-help");
const gameUsernameStatus = document.getElementById("game-username-status");

const onlineStatsTitle = document.getElementById("online-stats-title");
const onlineStatsSince = document.getElementById("online-stats-since");
const onlineStatsSummary = document.getElementById("online-stats-summary");
const characterStatsTitle = document.getElementById("character-stats-title");
const teamStatsTitle = document.getElementById("team-stats-title");
const characterStatsBody = document.getElementById("character-stats-body");
const teamStatsBody = document.getElementById("team-stats-body");
const characterHeaderCharacter = document.getElementById("character-header-character");
const characterHeaderUses = document.getElementById("character-header-uses");
const characterHeaderRecord = document.getElementById("character-header-record");
const characterHeaderWinRate = document.getElementById("character-header-win-rate");
const characterHeaderBans = document.getElementById("character-header-bans");
const characterHeaderBanRate = document.getElementById("character-header-ban-rate");
const characterHeaderBpRate = document.getElementById("character-header-bp-rate");
const teamHeaderTeam = document.getElementById("team-header-team");
const teamHeaderUses = document.getElementById("team-header-uses");
const teamHeaderRecord = document.getElementById("team-header-record");
const teamHeaderWinRate = document.getElementById("team-header-win-rate");

const sideSelectPanel = document.getElementById("side-select-panel");
const sideAButton = document.getElementById("side-a-button");
const sideBButton = document.getElementById("side-b-button");
const sideSelectStatus = document.getElementById("side-select-status");

const selectionTitle = document.getElementById("selection-title");
const characterGrid = document.getElementById("character-grid");
const confirmTeamButton = document.getElementById("confirm-team");
const teamASelection = document.getElementById("team-a-selection");
const teamBSelection = document.getElementById("team-b-selection");

const restartButton = document.getElementById("restart-button");
const surrenderButton = document.getElementById("surrender-button");
const postGamePanel = document.getElementById("online-postgame-panel");
const postGameMessage = document.getElementById("online-postgame-message");
const rematchButton = document.getElementById("rematch-button");
const exitRoomButton = document.getElementById("exit-room-button");
const rematchStatus = document.getElementById("rematch-status");

bridge.setOnlineStateChangeHandler(snapshot => {
  queueOnlineBattleSnapshot(snapshot);
});

document
  .getElementById("qd-language-select")
  ?.addEventListener("change", () => {
    requestAnimationFrame(() => {
      renderLeaderboard(latestLeaderboardData);
      renderYesterdayWinner(latestLeaderboardData);
      renderDailyLeaderboardLabels();
      renderDailyBestHistory(latestLeaderboardData);
      renderOnlineBattlePlayerBadges();
      renderOnlineStats(latestOnlineStatsData);
      renderGameUsernamePanel();
    });
  });

// =====================================================
// SMALL HELPERS
// =====================================================

function getLanguage() {
  return window.QDLanguage?.getLanguage?.() || "en";
}

function surrenderConfirmText() {
  const lang = getLanguage();

  if (lang === "zh") {
    return "确定要投降吗？投降后对手会立即获胜；若对手使用Google账号，则获得1点排行榜积分；如果你使用Google账号，则失去1点积分。";
  }

  if (lang === "ja") {
    return "降参しますか？相手が直ちに勝利します。相手がGoogleアカウントの場合はランキング+1。あなたがGoogleアカウントの場合はランキング-1になります。";
  }

  return "Are you sure you want to surrender? Your opponent will immediately win. Google-signed-in winners receive +1 leaderboard point; Google-signed-in losers receive -1 point.";
}

function isGoogleUser(user) {
  return Boolean(
    user &&
    user.providerData?.some(
      provider => provider.providerId === "google.com"
    )
  );
}

function isGuestUser(user) {
  return Boolean(
    user &&
    user.isAnonymous
  );
}

function normalizeGameUsername(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ");
}

function canonicalGameUsername(value) {
  return normalizeGameUsername(value)
    .normalize("NFKC")
    .toLocaleLowerCase("en-US");
}

function gameUsernameRegistryKey(value) {
  const canonical = canonicalGameUsername(value);
  const bytes = new TextEncoder().encode(canonical);
  return Array.from(bytes, byte =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

function validateGameUsername(value) {
  const username = normalizeGameUsername(value);
  const lang = getLanguage();

  if (username.length < GAME_USERNAME_MIN_LENGTH) {
    return {
      ok: false,
      username,
      message: lang === "zh"
        ? `用户名至少需要 ${GAME_USERNAME_MIN_LENGTH} 个字符。`
        : lang === "ja"
          ? `ユーザー名は${GAME_USERNAME_MIN_LENGTH}文字以上必要です。`
          : `Username must be at least ${GAME_USERNAME_MIN_LENGTH} characters.`
    };
  }

  if (username.length > GAME_USERNAME_MAX_LENGTH) {
    return {
      ok: false,
      username,
      message: lang === "zh"
        ? `用户名最多 ${GAME_USERNAME_MAX_LENGTH} 个字符。`
        : lang === "ja"
          ? `ユーザー名は最大${GAME_USERNAME_MAX_LENGTH}文字です。`
          : `Username can be at most ${GAME_USERNAME_MAX_LENGTH} characters.`
    };
  }

  // Unicode letters/numbers are supported so English, Chinese and Japanese names all work.
  if (!/^[\p{L}\p{N}_\- ]+$/u.test(username)) {
    return {
      ok: false,
      username,
      message: lang === "zh"
        ? "用户名只能包含文字、数字、空格、- 和 _。"
        : lang === "ja"
          ? "ユーザー名には文字・数字・空白・-・_ のみ使用できます。"
          : "Username may contain letters, numbers, spaces, - and _ only."
    };
  }

  return { ok: true, username, message: "" };
}

function usernameChangeAvailableAt() {
  return gameUsernameChangedAt > 0
    ? gameUsernameChangedAt + GAME_USERNAME_CHANGE_COOLDOWN_MS
    : 0;
}

function usernameCooldownRemaining() {
  if (!gameUsername || gameUsernameRegistryConflict || !gameUsernameChangedAt) {
    return 0;
  }

  return Math.max(0, usernameChangeAvailableAt() - Date.now());
}

function canEditGameUsername() {
  if (!gameUsernameLoaded || gameUsernameSaving || onlineRoomCode) {
    return false;
  }

  if (!gameUsername || gameUsernameRegistryConflict) {
    return true;
  }

  return usernameCooldownRemaining() <= 0;
}

function hasUsableGameUsername() {
  return Boolean(
    gameUsernameLoaded &&
    gameUsername &&
    !gameUsernameRegistryConflict
  );
}

function usernameCooldownText() {
  const remaining = usernameCooldownRemaining();
  if (remaining <= 0) return "";

  const lang = getLanguage();
  const hoursTotal = Math.ceil(remaining / (60 * 60 * 1000));
  const days = Math.floor(hoursTotal / 24);
  const hours = hoursTotal % 24;
  const duration = days > 0
    ? (hours > 0 ? `${days}d ${hours}h` : `${days}d`)
    : `${hours}h`;

  const availableDate = new Date(usernameChangeAvailableAt());
  const dateText = availableDate.toLocaleString(
    lang === "zh" ? "zh-CN" : lang === "ja" ? "ja-JP" : "en-US",
    {
      timeZone: LEADERBOARD_TIME_ZONE,
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }
  );

  return lang === "zh"
    ? `距离下次可改名还有 ${duration}（美东时间 ${dateText}）。`
    : lang === "ja"
      ? `次の変更まで ${duration}（米国東部時間 ${dateText}）。`
      : `You can change again in ${duration} (${dateText} ET).`;
}

function safeDisplayName(user) {
  if (!user) return "Player";

  if (isGuestUser(user)) {
    return `Guest-${user.uid.slice(0, 6)}`;
  }

  // Google's profile name is intentionally not used in-game.
  if (
    isGoogleUser(user) &&
    user.uid === onlineUser?.uid &&
    gameUsername &&
    !gameUsernameRegistryConflict
  ) {
    return gameUsername;
  }

  return `Player-${user.uid.slice(0, 6)}`;
}

function usernamePolicyText() {
  const lang = getLanguage();
  return lang === "zh"
    ? "用户名全服不可重名（忽略大小写和全角/半角差异），每次保存后需等待7天才能再次修改。房间、排行榜和比赛结果只显示游戏用户名。"
    : lang === "ja"
      ? "ユーザー名は全体で重複不可（大文字小文字・全角半角の違いを無視）。保存後は7日間変更できません。ルーム・ランキング・対戦結果ではゲーム名のみ表示されます。"
      : "Usernames are globally unique (case/full-width differences are ignored). After saving, you must wait 7 days before changing again. Rooms, leaderboards, and match results use only your game username.";
}

function scheduleGameUsernameCooldownRefresh() {
  if (gameUsernameCooldownTimer) {
    clearTimeout(gameUsernameCooldownTimer);
    gameUsernameCooldownTimer = null;
  }

  const remaining = usernameCooldownRemaining();
  if (remaining <= 0) return;

  gameUsernameCooldownTimer = setTimeout(() => {
    gameUsernameCooldownTimer = null;
    renderGameUsernamePanel();
    setRoomControlsEnabled();
  }, Math.min(remaining + 500, 2147483647));
}

function renderGameUsernamePanel(message = "") {
  if (!gameUsernamePanel) return;

  const googleReady = isGoogleUser(onlineUser);
  gameUsernamePanel.classList.toggle("hidden", !googleReady);

  if (!googleReady) return;

  const lang = getLanguage();
  const editable = canEditGameUsername();
  const needsName = !gameUsername || gameUsernameRegistryConflict;
  const showEditor = Boolean(needsName || editable);

  if (gameUsernameTitle) {
    if (gameUsernameRegistryConflict) {
      gameUsernameTitle.textContent = lang === "zh"
        ? "⚠️ 用户名冲突"
        : lang === "ja"
          ? "⚠️ ユーザー名の競合"
          : "⚠️ Username Conflict";
    } else if (!gameUsername) {
      gameUsernameTitle.textContent = lang === "zh"
        ? "🎮 设置游戏用户名"
        : lang === "ja"
          ? "🎮 ゲームユーザー名を設定"
          : "🎮 Set Your Game Username";
    } else if (editable) {
      gameUsernameTitle.textContent = lang === "zh"
        ? "✏️ 修改游戏用户名"
        : lang === "ja"
          ? "✏️ ゲームユーザー名を変更"
          : "✏️ Change Game Username";
    } else {
      gameUsernameTitle.textContent = lang === "zh"
        ? "🎮 游戏用户名"
        : lang === "ja"
          ? "🎮 ゲームユーザー名"
          : "🎮 Game Username";
    }
  }

  if (gameUsernameHelp) {
    gameUsernameHelp.textContent = usernamePolicyText();
  }

  if (gameUsernameInput) {
    gameUsernameInput.classList.toggle("hidden", !showEditor);
    gameUsernameInput.disabled = !editable;
    gameUsernameInput.maxLength = GAME_USERNAME_MAX_LENGTH;
    gameUsernameInput.placeholder = lang === "zh"
      ? "2-20个字符"
      : lang === "ja"
        ? "2〜20文字"
        : "2-20 characters";
  }

  if (saveGameUsernameButton) {
    saveGameUsernameButton.classList.toggle("hidden", !showEditor);
    saveGameUsernameButton.disabled = !editable;
    saveGameUsernameButton.textContent = gameUsernameSaving
      ? (lang === "zh" ? "保存中..." : lang === "ja" ? "保存中..." : "Saving...")
      : gameUsername
        ? (lang === "zh" ? "修改用户名" : lang === "ja" ? "ユーザー名を変更" : "Change Username")
        : (lang === "zh" ? "保存用户名" : lang === "ja" ? "ユーザー名を保存" : "Save Username");
  }

  if (gameUsernameStatus) {
    if (message) {
      gameUsernameStatus.textContent = message;
    } else if (!gameUsernameLoaded) {
      gameUsernameStatus.textContent = lang === "zh"
        ? "正在读取用户名..."
        : lang === "ja"
          ? "ユーザー名を読み込み中..."
          : "Loading username...";
    } else if (gameUsernameRegistryConflict) {
      gameUsernameStatus.textContent = lang === "zh"
        ? `当前用户名“${gameUsername}”已被其他账号占用，请立即选择一个新的唯一用户名。`
        : lang === "ja"
          ? `現在の名前「${gameUsername}」は別アカウントに使用されています。新しい一意の名前を設定してください。`
          : `The name “${gameUsername}” is already owned by another account. Choose a new unique username now.`;
    } else if (!gameUsername) {
      gameUsernameStatus.textContent = lang === "zh"
        ? "首次使用 Google 登录时必须设置用户名。"
        : lang === "ja"
          ? "Googleログイン後、最初にユーザー名を設定してください。"
          : "Choose a username after your first Google sign-in.";
    } else if (onlineRoomCode && usernameCooldownRemaining() <= 0) {
      gameUsernameStatus.textContent = lang === "zh"
        ? `${gameUsername} · 离开当前房间后才能修改用户名。`
        : lang === "ja"
          ? `${gameUsername} · 現在のルームを退出してから変更できます。`
          : `${gameUsername} · Leave the current room before changing your username.`;
    } else if (usernameCooldownRemaining() > 0) {
      gameUsernameStatus.textContent = `${gameUsername} · ${usernameCooldownText()}`;
    } else {
      gameUsernameStatus.textContent = lang === "zh"
        ? `${gameUsername} · 现在可以修改用户名。`
        : lang === "ja"
          ? `${gameUsername} · 今すぐ変更できます。`
          : `${gameUsername} · You may change your username now.`;
    }
  }

  scheduleGameUsernameCooldownRefresh();
}

async function reserveGameUsername(username) {
  if (!database || !onlineUser?.uid) {
    throw new Error("Username service is unavailable.");
  }

  // Protect usernames created by the previous build before the registry existed.
  // This keeps an older player's name from being claimed simply because they have
  // not logged in since the uniqueness system was deployed.
  const canonical = canonicalGameUsername(username);
  const leaderboardSnapshot = await get(ref(database, "leaderboard"));
  const leaderboardData = leaderboardSnapshot.val() || {};

  for (const [uid, entry] of Object.entries(leaderboardData)) {
    if (uid === onlineUser.uid) continue;
    const existingName = normalizeGameUsername(entry?.gameUsername || "");
    if (existingName && canonicalGameUsername(existingName) === canonical) {
      return {
        ok: false,
        registryKey: gameUsernameRegistryKey(username),
        ownerUid: uid
      };
    }
  }

  const registryKey = gameUsernameRegistryKey(username);
  const usernameRef = ref(database, `${USERNAME_REGISTRY_ROOT}/${registryKey}`);
  const now = Date.now();

  const result = await runTransaction(
    usernameRef,
    currentValue => {
      const currentOwner = String(currentValue?.uid || "");

      if (currentOwner && currentOwner !== onlineUser.uid) {
        return;
      }

      return {
        uid: onlineUser.uid,
        username: normalizeGameUsername(username),
        canonical,
        claimedAt: Number(currentValue?.claimedAt || now),
        updatedAt: now
      };
    },
    { applyLocally: false }
  );

  const stored = result.snapshot.val() || null;
  return {
    ok: Boolean(stored?.uid === onlineUser.uid),
    registryKey,
    ownerUid: String(stored?.uid || "")
  };
}

async function releaseGameUsername(username) {
  if (!database || !onlineUser?.uid || !username) return;

  const registryKey = gameUsernameRegistryKey(username);
  const usernameRef = ref(database, `${USERNAME_REGISTRY_ROOT}/${registryKey}`);

  await runTransaction(
    usernameRef,
    currentValue => {
      if (String(currentValue?.uid || "") !== onlineUser.uid) {
        return currentValue;
      }
      return null;
    },
    { applyLocally: false }
  );
}

async function loadGameUsername() {
  gameUsername = "";
  gameUsernameChangedAt = 0;
  gameUsernameRegistryConflict = false;
  gameUsernameLoaded = false;
  renderGameUsernamePanel();

  if (!database || !onlineUser || !isGoogleUser(onlineUser)) {
    gameUsernameLoaded = true;
    renderGameUsernamePanel();
    return;
  }

  let panelMessage = "";

  try {
    const [usernameSnapshot, changedAtSnapshot] = await Promise.all([
      get(ref(database, `leaderboard/${onlineUser.uid}/gameUsername`)),
      get(ref(database, `leaderboard/${onlineUser.uid}/usernameSetAt`))
    ]);

    if (usernameSnapshot.exists()) {
      gameUsername = normalizeGameUsername(usernameSnapshot.val());
    }

    if (changedAtSnapshot.exists()) {
      gameUsernameChangedAt = Number(changedAtSnapshot.val() || 0);
    }

    // Existing usernames from the older build are registered lazily on login.
    // If an older duplicate exists, the account is prompted to choose a new unique name immediately.
    if (gameUsername) {
      const reservation = await reserveGameUsername(gameUsername);
      gameUsernameRegistryConflict = !reservation.ok;
    }
  } catch (error) {
    console.error("Game username read/reservation failed:", error);
    panelMessage = getLanguage() === "zh"
      ? `用户名读取失败：${error.message}`
      : getLanguage() === "ja"
        ? `ユーザー名の読み込みに失敗しました：${error.message}`
        : `Could not load username: ${error.message}`;
  } finally {
    gameUsernameLoaded = true;
    renderGameUsernamePanel(panelMessage);
  }
}

async function saveGameUsername() {
  if (
    !database ||
    !onlineUser ||
    !isGoogleUser(onlineUser) ||
    !gameUsernameLoaded ||
    gameUsernameSaving ||
    onlineRoomCode
  ) {
    return;
  }

  if (!canEditGameUsername()) {
    renderGameUsernamePanel(usernameCooldownText());
    return;
  }

  const validation = validateGameUsername(gameUsernameInput?.value || "");
  if (!validation.ok) {
    renderGameUsernamePanel(validation.message);
    return;
  }

  if (
    gameUsername &&
    canonicalGameUsername(validation.username) === canonicalGameUsername(gameUsername) &&
    validation.username === gameUsername
  ) {
    renderGameUsernamePanel(
      getLanguage() === "zh"
        ? "这就是你当前的用户名。"
        : getLanguage() === "ja"
          ? "これは現在のユーザー名です。"
          : "That is already your current username."
    );
    return;
  }

  gameUsernameSaving = true;
  renderGameUsernamePanel();

  const oldUsername = gameUsername;
  const oldRegistryConflict = gameUsernameRegistryConflict;
  let newReservation = null;
  let profileSaved = false;
  let panelMessage = "";

  try {
    newReservation = await reserveGameUsername(validation.username);

    if (!newReservation.ok) {
      throw new Error("USERNAME_TAKEN");
    }

    const now = Date.now();

    await Promise.all([
      set(
        ref(database, `leaderboard/${onlineUser.uid}/gameUsername`),
        validation.username
      ),
      set(
        ref(database, `leaderboard/${onlineUser.uid}/displayName`),
        validation.username
      ),
      set(
        ref(database, `leaderboard/${onlineUser.uid}/days/${getLeaderboardDayKey()}/displayName`),
        validation.username
      ),
      set(
        ref(database, `leaderboard/${onlineUser.uid}/usernameSetAt`),
        now
      )
    ]);

    profileSaved = true;
    gameUsername = validation.username;
    gameUsernameChangedAt = now;
    gameUsernameRegistryConflict = false;

    if (
      oldUsername &&
      gameUsernameRegistryKey(oldUsername) !== gameUsernameRegistryKey(gameUsername)
    ) {
      releaseGameUsername(oldUsername).catch(error => {
        console.warn("Old username reservation could not be released:", error);
      });
    }

    await syncLeaderboardProfile();

    onlineUserDisplay.textContent = `Quick Duel: ${gameUsername}`;
    onlineStatus.textContent = getLanguage() === "zh"
      ? "用户名已保存。7天后可以再次修改。"
      : getLanguage() === "ja"
        ? "ユーザー名を保存しました。7日後に再変更できます。"
        : "Username saved. You can change it again in 7 days.";

    panelMessage = getLanguage() === "zh"
      ? "用户名已保存。7天后可再次修改。"
      : getLanguage() === "ja"
        ? "ユーザー名を保存しました。次の変更は7日後です。"
        : "Username saved. Next change is available in 7 days.";

    if (gameUsernameInput) gameUsernameInput.value = "";
  } catch (error) {
    console.error("Game username save failed:", error);

    // If the new name was reserved but the profile write failed, free it again.
    if (
      newReservation?.ok &&
      !profileSaved &&
      (!oldUsername || gameUsernameRegistryKey(oldUsername) !== newReservation.registryKey)
    ) {
      releaseGameUsername(validation.username).catch(() => {});
    }

    gameUsername = oldUsername;
    gameUsernameRegistryConflict = oldRegistryConflict;

    const taken = error?.message === "USERNAME_TAKEN";
    panelMessage = taken
      ? (getLanguage() === "zh"
          ? "这个用户名已经被其他玩家使用，请换一个。"
          : getLanguage() === "ja"
            ? "このユーザー名はすでに使用されています。別の名前を選んでください。"
            : "That username is already taken. Choose another one.")
      : (getLanguage() === "zh"
          ? `用户名保存失败：${error.message}`
          : getLanguage() === "ja"
            ? `ユーザー名の保存に失敗しました：${error.message}`
            : `Could not save username: ${error.message}`);
  } finally {
    gameUsernameSaving = false;
    renderGameUsernamePanel(panelMessage);
    setRoomControlsEnabled();
  }
}

function currentProfile() {
  return {
    displayName: safeDisplayName(onlineUser),
    accountType: isGoogleUser(onlineUser)
      ? "google"
      : "guest"
  };
}

function emptyDraft() {
  return {
    step: 0,
    bans: {
      A: "",
      B: ""
    },
    picks: {
      A1: "",
      B1: "",
      A2: "",
      B2: ""
    }
  };
}

function makeMatchId(code, gameNumber) {
  return `${code}-${gameNumber}`;
}

function roleForUid(room, uid) {
  if (!room?.players || !uid) return null;
  if (room.players.host === uid) return "host";
  if (room.players.guest === uid) return "guest";
  return null;
}

function sideForUid(room, uid) {
  if (!room?.sides || !uid) return null;
  if (room.sides.A === uid) return "A";
  if (room.sides.B === uid) return "B";
  return null;
}

function otherSide(side) {
  return side === "A" ? "B" : "A";
}

function profileForUid(room, uid) {
  if (!uid) return "Open";

  const role = roleForUid(room, uid);
  const profile = role ? room?.playerProfiles?.[role] : null;

  const baseName = profile?.displayName || `Player-${uid.slice(0, 6)}`;
  return crownName(baseName, uid);
}

function accountTypeForUid(room, uid) {
  if (!uid) return "guest";

  const role = roleForUid(room, uid);
  const profile = role ? room?.playerProfiles?.[role] : null;

  // Legacy rooms from the Google-only build did not store accountType.
  return profile?.accountType || "google";
}

function isRankedPlayer(room, uid) {
  return accountTypeForUid(room, uid) === "google";
}


let rolePresenceRef = null;
let presenceConnectionUnsubscribe = null;

function stopRolePresenceWatcher() {
  if (presenceConnectionUnsubscribe) {
    presenceConnectionUnsubscribe();
    presenceConnectionUnsubscribe = null;
  }

  rolePresenceRef = null;
}

async function registerRolePresence(role, code = onlineRoomCode) {
  if (
    !database ||
    !onlineUser ||
    !code ||
    !["host", "guest"].includes(role)
  ) {
    return;
  }

  stopRolePresenceWatcher();

  const expectedUid = onlineUser.uid;
  const presenceRef =
    ref(database, `rooms/${code}/presence/${role}`);
  const connectedRef =
    ref(database, ".info/connected");

  rolePresenceRef = presenceRef;

  presenceConnectionUnsubscribe =
    onValue(connectedRef, async snapshot => {
      if (
        snapshot.val() !== true ||
        !onlineUser ||
        onlineUser.uid !== expectedUid ||
        onlineRoomCode !== code
      ) {
        return;
      }

      try {
        await onDisconnect(presenceRef).set({
          uid: expectedUid,
          online: false,
          lastSeen: serverTimestamp()
        });

        await set(presenceRef, {
          uid: expectedUid,
          online: true,
          lastSeen: serverTimestamp()
        });
      } catch (error) {
        console.warn(
          "Presence registration failed:",
          error
        );
      }
    });
}

function isRoleActivelyConnected(room, role) {
  const uid = room?.players?.[role] || "";
  const presence = room?.presence?.[role];

  return Boolean(
    uid &&
    presence &&
    presence.uid === uid &&
    presence.online === true
  );
}

function canReplaceStaleGuest(room) {
  const guestUid = room?.players?.guest || "";

  if (!guestUid) {
    return false;
  }

  const draftStep =
    Number(room?.draft?.step || 0);

  const safePhase =
    room?.status === "waiting" ||
    (
      room?.status === "sideSelect" &&
      draftStep === 0
    );

  if (!safePhase) {
    return false;
  }

  return !isRoleActivelyConnected(room, "guest");
}

function firebaseReadyForRooms() {
  const usernameReady =
    !isGoogleUser(onlineUser) ||
    hasUsableGameUsername();

  return Boolean(
    database &&
    onlineUser &&
    !onlineRoomCode &&
    usernameReady
  );
}

function setRoomControlsEnabled() {
  const ready = firebaseReadyForRooms();
  const usernameBlocked = Boolean(
    isGoogleUser(onlineUser) &&
    (!gameUsernameLoaded || !gameUsername || gameUsernameRegistryConflict)
  );

  createRoomButton.disabled = !ready;
  joinRoomButton.disabled = !ready;
  roomCodeInput.disabled = Boolean(onlineRoomCode) || usernameBlocked;
  googleSignInButton.disabled = Boolean(onlineRoomCode);
  guestSignInButton.disabled = Boolean(onlineRoomCode);
  googleSignOutButton.disabled = Boolean(onlineRoomCode);
}

function hideSideSelection() {
  sideSelectPanel.classList.add("hidden");
}

function hidePostGamePanel() {
  postGamePanel.classList.add("hidden");
  postGameMessage.textContent = "";
  rematchStatus.textContent = "";
}

function showSurrenderButton(show) {
  surrenderButton.classList.toggle("hidden", !show);
  restartButton.classList.toggle("hidden", show || onlineModeActive);
}

// =====================================================
// GOOGLE SIGN-IN + UNIQUE WEEKLY GAME USERNAME
// =====================================================

if (saveGameUsernameButton) {
  saveGameUsernameButton.addEventListener("click", () => {
    saveGameUsername();
  });
}

if (gameUsernameInput) {
  gameUsernameInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveGameUsername();
    }
  });

  gameUsernameInput.addEventListener("input", () => {
    if (gameUsernameStatus && canEditGameUsername()) {
      gameUsernameStatus.textContent = "";
    }
  });
}

googleSignInButton.addEventListener("click", async () => {
  if (onlineRoomCode) return;

  googleSignInButton.disabled = true;
  onlineStatus.textContent = "Opening Google Sign-In...";

  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Google Sign-In failed:", error);

    if (error?.code !== "auth/popup-closed-by-user") {
      onlineStatus.textContent =
        `Google Sign-In failed: ${error.code || error.message}`;
    }
  } finally {
    googleSignInButton.disabled = false;
  }
});

guestSignInButton.addEventListener("click", async () => {
  if (onlineRoomCode || onlineUser) return;

  googleSignInButton.disabled = true;
  guestSignInButton.disabled = true;
  onlineStatus.textContent = "Signing in as Guest...";

  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.error("Guest Sign-In failed:", error);
    onlineStatus.textContent =
      `Guest Sign-In failed: ${error.code || error.message}`;
  } finally {
    googleSignInButton.disabled = false;
    guestSignInButton.disabled = false;
  }
});

googleSignOutButton.addEventListener("click", async () => {
  if (onlineRoomCode) {
    onlineStatus.textContent =
      "Exit the current room before signing out.";
    return;
  }

  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out failed:", error);
  }
});

onAuthStateChanged(auth, async user => {
  onlineUser = user || null;

  const googleReady = isGoogleUser(onlineUser);
  const guestReady = isGuestUser(onlineUser);
  const signedIn = Boolean(onlineUser);

  // Both sign-in choices are shown before authentication.
  // After signing in, Sign Out is shown. Guests can sign out and choose
  // Google later if they want leaderboard eligibility.
  googleSignInButton.classList.toggle("hidden", signedIn);
  guestSignInButton.classList.toggle("hidden", signedIn);
  googleSignOutButton.classList.toggle("hidden", !signedIn);

  stopLeaderboardListener();
  stopOnlineStatsListener();

  if (googleReady) {
    gameUsername = "";
    gameUsernameChangedAt = 0;
    gameUsernameRegistryConflict = false;
    gameUsernameLoaded = false;
    onlineUserDisplay.textContent = "Google account connected.";

    await loadGameUsername();

    if (hasUsableGameUsername()) {
      onlineUserDisplay.textContent = `Quick Duel: ${gameUsername}`;
      await syncLeaderboardProfile();
    } else {
      onlineUserDisplay.textContent = getLanguage() === "zh"
        ? "Google账号已连接 — 请设置游戏用户名。"
        : getLanguage() === "ja"
          ? "Googleアカウント接続済み — ゲームユーザー名を設定してください。"
          : "Google account connected — choose your game username.";
    }

    renderGameUsernamePanel();
    startLeaderboardListener();
    startOnlineStatsListener();
  } else if (guestReady) {
    gameUsername = "";
    gameUsernameChangedAt = 0;
    gameUsernameRegistryConflict = false;
    gameUsernameLoaded = true;
    renderGameUsernamePanel();
    onlineUserDisplay.textContent =
      `Guest: ${safeDisplayName(onlineUser)}`;

    onlineUserScore.textContent =
      "Guest mode — PvP enabled, leaderboard points disabled.";

    leaderboardList.textContent =
      "Loading leaderboard...";

    // Guests may view the board and global Online PvP stats, but their wins are not ranked.
    startLeaderboardListener();
    startOnlineStatsListener();
  } else {
    gameUsername = "";
    gameUsernameChangedAt = 0;
    gameUsernameRegistryConflict = false;
    gameUsernameLoaded = false;
    renderGameUsernamePanel();

    onlineUserDisplay.textContent =
      "Sign in with Google or continue as Guest to play Online PvP.";

    onlineUserScore.textContent = "Score: —";
    leaderboardList.textContent =
      "Sign in or continue as Guest to view the leaderboard.";

    latestOnlineStatsData = {};
    renderOnlineStats(latestOnlineStatsData);
  }

  setRoomControlsEnabled();

  if (
    onlineModeActive &&
    !onlineRoomCode
  ) {
    onlineStatus.textContent = signedIn
      ? (
          googleReady
            ? (
                hasUsableGameUsername()
                  ? "Username ready. Create a room or join one."
                  : gameUsernameRegistryConflict
                    ? "Your current username conflicts with another account. Choose a new unique username before playing."
                    : "Choose a unique game username before creating or joining a room."
              )
            : "Guest mode ready. Create a room or join one."
        )
      : "Sign in with Google or continue as Guest.";
  }
});

// =====================================================
// DAILY LEADERBOARD CLOCK
// =====================================================

function getLeaderboardDayKey(timestamp = Date.now()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: LEADERBOARD_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date(timestamp));

  const values = {};
  parts.forEach(part => {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  });

  return `${values.year}-${values.month}-${values.day}`;
}

function shiftLeaderboardDayKey(dayKey, amount) {
  const [year, month, day] = String(dayKey)
    .split("-")
    .map(Number);

  if (!year || !month || !day) return dayKey;

  const shifted = new Date(
    Date.UTC(year, month - 1, day + amount)
  );

  return shifted.toISOString().slice(0, 10);
}

function getYesterdayLeaderboardDayKey() {
  return shiftLeaderboardDayKey(
    getLeaderboardDayKey(),
    -1
  );
}

function millisecondsUntilNextLeaderboardMidnight() {
  const now = Date.now();
  const currentKey = getLeaderboardDayKey(now);

  let low = now;
  let high = now + 30 * 60 * 60 * 1000;

  // Find the first millisecond whose Eastern-Time calendar date differs.
  while (high - low > 1000) {
    const middle = Math.floor((low + high) / 2);

    if (getLeaderboardDayKey(middle) === currentKey) {
      low = middle;
    } else {
      high = middle;
    }
  }

  return Math.max(1000, high - now + 250);
}

function scheduleLeaderboardMidnightRefresh() {
  if (leaderboardMidnightTimer) {
    clearTimeout(leaderboardMidnightTimer);
  }

  leaderboardMidnightTimer = setTimeout(() => {
    leaderboardDayKey = getLeaderboardDayKey();
    renderLeaderboard(latestLeaderboardData);
    renderYesterdayWinner(latestLeaderboardData);
    renderDailyLeaderboardLabels();
    renderDailyBestHistory(latestLeaderboardData);
    refreshLeaderboardDecorations();
    scheduleLeaderboardMidnightRefresh();
  }, millisecondsUntilNextLeaderboardMidnight());
}

function getDailyLeaderboardStats(entry, dayKey) {
  const daily = entry?.days?.[dayKey] || {};
  const wins = daily?.wins && typeof daily.wins === "object"
    ? Object.keys(daily.wins).length
    : 0;
  const losses = daily?.losses && typeof daily.losses === "object"
    ? Object.keys(daily.losses).length
    : 0;

  return {
    wins,
    losses,
    matches: wins + losses,
    score: wins - losses,
    name: String(
      daily?.displayName ||
      entry?.displayName ||
      "Player"
    )
  };
}

function getDailyLeaderboardRows(data, dayKey) {
  return Object.entries(data || {})
    .map(([uid, entry]) => {
      const stats = getDailyLeaderboardStats(entry, dayKey);
      return {
        uid,
        name:
          stats.name === "Player"
            ? `Player-${uid.slice(0, 6)}`
            : stats.name,
        wins: stats.wins,
        losses: stats.losses,
        matches: stats.matches,
        score: stats.score
      };
    })
    .filter(row => row.matches > 0)
    .sort((a, b) =>
      b.score - a.score ||
      b.wins - a.wins ||
      a.losses - b.losses ||
      a.name.localeCompare(b.name)
    );
}

function getCurrentLeaderboardLeaderUid(data = latestLeaderboardData) {
  const rows = getDailyLeaderboardRows(data, getLeaderboardDayKey());
  return rows[0]?.uid || "";
}

function isCurrentLeaderboardLeader(uid, data = latestLeaderboardData) {
  return Boolean(uid && uid === getCurrentLeaderboardLeaderUid(data));
}

function crownName(name, uid, data = latestLeaderboardData) {
  return isCurrentLeaderboardLeader(uid, data)
    ? `👑 ${name}`
    : name;
}

function leaderboardEntryDisplayName(uid, entry) {
  const days = entry?.days && typeof entry.days === "object"
    ? Object.entries(entry.days)
        .sort(([a], [b]) => b.localeCompare(a))
    : [];

  const latestDayName = days
    .map(([, daily]) => normalizeGameUsername(daily?.displayName || ""))
    .find(Boolean);

  return normalizeGameUsername(
    entry?.gameUsername ||
    entry?.displayName ||
    latestDayName ||
    `Player-${String(uid).slice(0, 6)}`
  );
}

function getDailyBestHistoryRows(data) {
  const todayKey = getLeaderboardDayKey();
  const completedDayKeys = new Set();

  Object.values(data || {}).forEach(entry => {
    if (!entry?.days || typeof entry.days !== "object") return;
    Object.keys(entry.days).forEach(dayKey => {
      if (dayKey < todayKey) completedDayKeys.add(dayKey);
    });
  });

  const counts = new Map();

  const addWinner = (uid, name, dayKey) => {
    if (!uid || !name || !dayKey) return;
    const old = counts.get(uid) || { uid, name, count: 0, days: [] };
    old.name = name || old.name;
    old.count += 1;
    old.days.push(dayKey);
    counts.set(uid, old);
  };

  [...completedDayKeys]
    .sort()
    .forEach(dayKey => {
      const winner = getDailyLeaderboardRows(data, dayKey)[0];
      if (winner) addWinner(winner.uid, winner.name, dayKey);
    });

  // Legacy day before per-day storage existed: manually confirmed winner.
  if ("2026-09-16" < todayKey && !completedDayKeys.has("2026-09-16")) {
    const matchingEntry = Object.entries(data || {}).find(([, entry]) =>
      canonicalGameUsername(
        leaderboardEntryDisplayName("", entry)
      ) === canonicalGameUsername("Xue Jason")
    );

    if (matchingEntry) {
      addWinner(matchingEntry[0], "Xue Jason", "2026-09-16");
    } else {
      addWinner("legacy-xue-jason", "Xue Jason", "2026-09-16");
    }
  }

  return [...counts.values()]
    .map(row => ({
      ...row,
      name: data?.[row.uid]
        ? leaderboardEntryDisplayName(row.uid, data[row.uid])
        : row.name
    }))
    .filter(row => row.count > 0)
    .sort((a, b) =>
      b.count - a.count ||
      a.name.localeCompare(b.name)
    );
}

function renderDailyBestHistory(data) {
  if (!dailyBestBody) return;

  const lang = getLanguage();
  const rows = getDailyBestHistoryRows(data);

  if (dailyBestTitle) {
    dailyBestTitle.textContent = lang === "zh"
      ? "👑 当日最佳次数"
      : lang === "ja"
        ? "👑 デイリー1位回数"
        : "👑 Daily Best Records";
  }

  if (dailyBestPlayerHeader) {
    dailyBestPlayerHeader.textContent = lang === "zh"
      ? "玩家"
      : lang === "ja"
        ? "プレイヤー"
        : "Player";
  }

  if (dailyBestCountHeader) {
    dailyBestCountHeader.textContent = lang === "zh"
      ? "次数"
      : lang === "ja"
        ? "回数"
        : "Daily Bests";
  }

  dailyBestBody.innerHTML = "";

  if (!rows.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 2;
    td.textContent = lang === "zh"
      ? "还没有玩家获得过当日最佳。"
      : lang === "ja"
        ? "まだデイリー1位の記録はありません。"
        : "No daily winners recorded yet.";
    tr.appendChild(td);
    dailyBestBody.appendChild(tr);
    return;
  }

  rows.forEach((row, index) => {
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    const count = document.createElement("td");
    name.textContent = row.name;
    count.textContent = String(row.count);
    tr.append(name, count);
    dailyBestBody.appendChild(tr);
  });
}

function renderOnlineBattlePlayerBadges() {
  if (!onlineBattlePlayerBadges || !onlineTeamAPlayer || !onlineTeamBPlayer) return;

  const battleScreen = document.getElementById("battle-screen");
  const battleVisible = battleScreen && !battleScreen.classList.contains("hidden");
  const show = Boolean(onlineModeActive && onlineRoomData && battleVisible);

  onlineBattlePlayerBadges.classList.toggle("hidden", !show);
  if (!show) return;

  const aUid = onlineRoomData?.sides?.A || "";
  const bUid = onlineRoomData?.sides?.B || "";
  const aName = aUid ? profileForUid(onlineRoomData, aUid) : "—";
  const bName = bUid ? profileForUid(onlineRoomData, bUid) : "—";

  onlineTeamAPlayer.textContent = `Team A: ${aName}`;
  onlineTeamBPlayer.textContent = `Team B: ${bName}`;
  onlineTeamAPlayer.classList.toggle("current-leader", isCurrentLeaderboardLeader(aUid));
  onlineTeamBPlayer.classList.toggle("current-leader", isCurrentLeaderboardLeader(bUid));
}

function refreshLeaderboardDecorations() {
  if (isGoogleUser(onlineUser) && hasUsableGameUsername()) {
    onlineUserDisplay.textContent = `Quick Duel: ${crownName(gameUsername, onlineUser.uid)}`;
  }

  renderDailyBestHistory(latestLeaderboardData);
  renderOnlineBattlePlayerBadges();

  if (onlineRoomData?.status === "sideSelect") {
    renderSideSelection();
  }
}

function renderDailyLeaderboardLabels() {
  const lang = getLanguage();

  if (yesterdayWinnerTitle) {
    yesterdayWinnerTitle.textContent =
      lang === "zh"
        ? "🏆 昨日冠军"
        : lang === "ja"
          ? "🏆 昨日の王者"
          : "🏆 Winner of Yesterday";
  }

  if (leaderboardResetLabel) {
    leaderboardResetLabel.textContent =
      lang === "zh"
        ? "每日 00:00（美东时间）清零"
        : lang === "ja"
          ? "毎日 00:00（米国東部時間）にリセット"
          : "Resets daily at 00:00 ET";
  }
}

function renderYesterdayWinner(data) {
  if (!yesterdayWinnerName || !yesterdayWinnerMeta) return;

  const yesterdayKey = getYesterdayLeaderboardDayKey();
  const lang = getLanguage();

  // One-time manual correction for the legacy leaderboard day before
  // per-day score storage existed. This only displays while 2026-09-16
  // is actually "yesterday"; later dates automatically use live data.
  if (yesterdayKey === "2026-09-16") {
    yesterdayWinnerName.textContent = "Xue Jason";

    const scoreText =
      lang === "zh"
        ? "11 分"
        : lang === "ja"
          ? "11 pt"
          : "11 pts";

    yesterdayWinnerMeta.textContent =
      `${yesterdayKey} • ${scoreText}`;
    return;
  }

  const rows = getDailyLeaderboardRows(data, yesterdayKey);
  const winner = rows[0] || null;

  if (!winner) {
    yesterdayWinnerName.textContent =
      lang === "zh"
        ? "暂无昨日冠军"
        : lang === "ja"
          ? "昨日の王者はいません"
          : "No winner yesterday";
    yesterdayWinnerMeta.textContent = yesterdayKey;
    return;
  }

  yesterdayWinnerName.textContent = winner.name;

  const scoreText =
    lang === "zh"
      ? `${winner.score} 分`
      : lang === "ja"
        ? `${winner.score} pt`
        : `${winner.score} pts`;

  yesterdayWinnerMeta.textContent =
    `${yesterdayKey} • ${scoreText} • ${winner.wins}W ${winner.losses}L`;
}

// =====================================================
// LEADERBOARD
// =====================================================

async function syncLeaderboardProfile() {
  if (
    !database ||
    !onlineUser ||
    !isGoogleUser(onlineUser) ||
    !hasUsableGameUsername()
  ) return;

  const basePath = `leaderboard/${onlineUser.uid}`;

  await Promise.all([
    set(
      ref(database, `${basePath}/gameUsername`),
      gameUsername
    ),
    set(
      ref(database, `${basePath}/displayName`),
      gameUsername
    ),
    set(
      ref(database, `${basePath}/lastSeenAt`),
      Date.now()
    )
  ]);
}

function stopLeaderboardListener() {
  if (typeof leaderboardUnsubscribe === "function") {
    leaderboardUnsubscribe();
  }

  leaderboardUnsubscribe = null;
}

function startLeaderboardListener() {
  stopLeaderboardListener();

  if (!onlineUser) return;

  leaderboardUnsubscribe = onValue(
    ref(database, "leaderboard"),
    snapshot => {
      const data = snapshot.val() || {};
      latestLeaderboardData = data;
      leaderboardDayKey = getLeaderboardDayKey();
      renderLeaderboard(data);
      renderYesterdayWinner(data);
      renderDailyLeaderboardLabels();
      renderDailyBestHistory(data);
      refreshLeaderboardDecorations();
      scheduleLeaderboardMidnightRefresh();
    },
    error => {
      console.error("Leaderboard read failed:", error);
      leaderboardList.textContent =
        `Leaderboard unavailable: ${error.message}`;
    }
  );
}

function renderLeaderboard(data) {
  const todayKey = getLeaderboardDayKey();
  leaderboardDayKey = todayKey;

  const rows = getDailyLeaderboardRows(data, todayKey);

  currentLeaderboardScore =
    rows.find(row => row.uid === onlineUser?.uid)?.score || 0;

  if (isGoogleUser(onlineUser)) {
    onlineUserScore.textContent =
      `Score: ${currentLeaderboardScore}`;
  }

  leaderboardList.innerHTML = "";

  const topRows = rows.slice(0, 20);

  if (!topRows.length) {
    leaderboardList.textContent =
      "No ranked matches today.";
    return;
  }

  topRows.forEach((row, index) => {
    const line = document.createElement("div");
    line.className = "leaderboard-row";

    if (row.uid === onlineUser?.uid) {
      line.classList.add("leaderboard-me");
    }

    const rank = document.createElement("span");
    rank.className = "leaderboard-rank";
    rank.textContent = `#${index + 1}`;

    const name = document.createElement("span");
    name.className = "leaderboard-name";
    name.textContent = row.name;

    const score = document.createElement("span");
    score.className = "leaderboard-score";
    score.style.marginLeft = "0.5em";
    score.textContent = `${row.score} pts`;

    line.append(rank, name, score);
    leaderboardList.appendChild(line);
  });
}

async function recordLeaderboardResult(result) {
  if (
    !result?.matchId ||
    !onlineUser ||
    !isGoogleUser(onlineUser) ||
    result.winnerSide === "DRAW"
  ) {
    return;
  }

  const isWinner = result.winnerUid === onlineUser.uid;
  const isLoser = result.loserUid === onlineUser.uid;

  if (!isWinner && !isLoser) {
    return;
  }

  const bucket = isWinner ? "wins" : "losses";
  const opponentUid = isWinner
    ? (result.loserUid || "")
    : (result.winnerUid || "");

  const dayKey = getLeaderboardDayKey(
    Number(result.endedAt || Date.now())
  );

  const resultRef = ref(
    database,
    `leaderboard/${onlineUser.uid}/days/${dayKey}/${bucket}/${result.matchId}`
  );

  const existing = await get(resultRef);

  if (existing.exists()) {
    return;
  }

  await Promise.all([
    set(resultRef, {
      at: Number(result.endedAt || Date.now()),
      reason: result.reason || "battle",
      opponentUid
    }),
    set(
      ref(
        database,
        `leaderboard/${onlineUser.uid}/days/${dayKey}/displayName`
      ),
      safeDisplayName(onlineUser)
    )
  ]);

  await syncLeaderboardProfile();
}

// =====================================================
// MODE SWITCHING
// =====================================================

pvpModeButton.addEventListener("click", () => {
  leaveOnlineModeUi();
});

aiModeButton.addEventListener("click", () => {
  leaveOnlineModeUi();
});

function enterOnlineMode() {
  onlineModeActive = true;
  onlineBattleInitializationStarted = false;
  lastAppliedBattleVersion = 0;

  pvpModeButton.classList.remove("active");
  aiModeButton.classList.remove("active");
  onlineModeButton.classList.add("active");

  onlineRoomPanel.classList.remove("hidden");
  confirmTeamButton.classList.add("hidden");
  restartButton.classList.add("hidden");

  selectionTitle.textContent = "ONLINE PVP";
  characterGrid.innerHTML = "";

  teamASelection.textContent = "A1: — | A2: —";
  teamBSelection.textContent = "B1: — | B2: —";

  hideSideSelection();
  hidePostGamePanel();
  showSurrenderButton(false);
  setRoomControlsEnabled();

  onlineStatus.textContent = onlineUser
    ? (
        isGoogleUser(onlineUser)
          ? (
              hasUsableGameUsername()
                ? "Username ready. Create a room or join one."
                : gameUsernameRegistryConflict
                  ? "Your username conflicts with another account. Choose a new unique username before playing."
                  : "Choose a unique game username before creating or joining a room."
            )
          : "Guest mode ready. Create a room or join one."
      )
    : "Sign in with Google or continue as Guest.";
}

function leaveOnlineModeUi() {
  if (!onlineModeActive) return;

  onlineModeActive = false;
  onlineModeButton.classList.remove("active");
  onlineRoomPanel.classList.add("hidden");
  confirmTeamButton.classList.remove("hidden");
  restartButton.classList.remove("hidden");

  stopListeningToRoom();
  onlineRoomCode = null;
  onlineSide = null;
  onlinePlayerRole = null;
  onlineRoomData = null;
  onlineBattleInitializationStarted = false;
  lastAppliedBattleVersion = 0;
  lastHandledMatchId = null;
  bridge.setOnlinePlayerSide(null);

  roomCodeDisplay.classList.add("hidden");
  roomCodeDisplay.textContent = "";
  hideSideSelection();
  hidePostGamePanel();
  showSurrenderButton(false);
  renderOnlineBattlePlayerBadges();
  setRoomControlsEnabled();
}

// =====================================================
// ROOM CODE
// =====================================================

function generateRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return code;
}

roomCodeInput.addEventListener("input", () => {
  roomCodeInput.value = roomCodeInput.value
    .toUpperCase()
    .replace(/[^A-Z2-9]/g, "")
    .slice(0, 6);
});

// =====================================================
// CREATE ROOM
// =====================================================

createRoomButton.addEventListener("click", createOnlineRoom);

async function createOnlineRoom() {
  if (!firebaseReadyForRooms()) {
    onlineStatus.textContent = isGoogleUser(onlineUser)
      ? (gameUsernameRegistryConflict
          ? "Your username conflicts with another account. Choose a new unique username before creating a room."
          : "Choose a unique game username before creating a room.")
      : "Sign in with Google or continue as Guest before creating a room.";
    return;
  }

  createRoomButton.disabled = true;
  joinRoomButton.disabled = true;
  onlineStatus.textContent = "Creating room...";

  try {
    let code = "";

    for (let attempt = 0; attempt < 20; attempt++) {
      const candidate = generateRoomCode();
      const snapshot = await get(
        ref(database, `rooms/${candidate}`)
      );

      if (!snapshot.exists()) {
        code = candidate;
        break;
      }
    }

    if (!code) {
      throw new Error("Could not generate a free room code.");
    }

    const gameNumber = 1;

    const roomData = {
      version: 3,
      status: "waiting",
      createdAt: Date.now(),
      gameNumber,
      matchId: makeMatchId(code, gameNumber),

      players: {
        host: onlineUser.uid,
        guest: ""
      },

      playerProfiles: {
        host: currentProfile(),
        guest: null
      },

      presence: {
        host: {
          uid: onlineUser.uid,
          online: true,
          lastSeen: Date.now()
        },
        guest: {
          uid: "",
          online: false,
          lastSeen: 0
        }
      },

      sides: {
        A: "",
        B: ""
      },

      rematchVotes: {
        host: false,
        guest: false
      },

      draft: emptyDraft()
    };

    await set(
      ref(database, `rooms/${code}`),
      roomData
    );

    onlineRoomCode = code;
    onlinePlayerRole = "host";
    onlineSide = null;
    bridge.setOnlinePlayerSide(null);
    onlineBattleInitializationStarted = false;
    lastAppliedBattleVersion = 0;
    lastHandledMatchId = null;

    roomCodeDisplay.classList.remove("hidden");
    roomCodeDisplay.textContent = `ROOM CODE: ${code}`;

    onlineStatus.textContent =
      "Room created. Waiting for Player 2...";

    setRoomControlsEnabled();
    await registerRolePresence("host", code);
    listenToOnlineRoom(code);
  } catch (error) {
    console.error(error);
    onlineStatus.textContent =
      `Create room failed: ${error.message}`;
    setRoomControlsEnabled();
  }
}

// =====================================================
// JOIN / RECONNECT ROOM
// =====================================================

joinRoomButton.addEventListener("click", joinOnlineRoom);

roomCodeInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    joinOnlineRoom();
  }
});

async function joinOnlineRoom() {
  if (!firebaseReadyForRooms()) {
    onlineStatus.textContent = isGoogleUser(onlineUser)
      ? (gameUsernameRegistryConflict
          ? "Your username conflicts with another account. Choose a new unique username before joining a room."
          : "Choose a unique game username before joining a room.")
      : "Sign in with Google or continue as Guest before joining a room.";
    return;
  }

  const code = roomCodeInput.value
    .toUpperCase()
    .replace(/[^A-Z2-9]/g, "")
    .slice(0, 6);

  roomCodeInput.value = code;

  if (code.length !== 6) {
    onlineStatus.textContent =
      "Enter a valid 6-character room code.";
    return;
  }

  createRoomButton.disabled = true;
  joinRoomButton.disabled = true;
  onlineStatus.textContent =
    `Looking for room ${code}...`;

  try {
    const roomRef = ref(database, `rooms/${code}`);
    const firstSnapshot = await get(roomRef);

    if (!firstSnapshot.exists()) {
      throw new Error(`Room ${code} does not exist.`);
    }

    const firstRoom = firstSnapshot.val();

    if (!firstRoom.players?.host) {
      throw new Error("This room uses an old or invalid room format.");
    }

    if (firstRoom.status === "closed") {
      throw new Error("This room has been closed.");
    }

    // Same Google account as the host reconnects to the host slot rather than
    // occupying both sides. This prevents self-farming leaderboard points.
    if (firstRoom.players.host === onlineUser.uid) {
      onlineRoomCode = code;
      onlinePlayerRole = "host";
      onlineBattleInitializationStarted = false;
      lastAppliedBattleVersion = 0;

      roomCodeDisplay.classList.remove("hidden");
      roomCodeDisplay.textContent = `ROOM CODE: ${code}`;

      setRoomControlsEnabled();
      await registerRolePresence("host", code);
      listenToOnlineRoom(code);
      return;
    }

    const existingGuest =
      firstRoom.players?.guest || "";

    if (
      existingGuest &&
      existingGuest !== onlineUser.uid &&
      !canReplaceStaleGuest(firstRoom)
    ) {
      if (
        firstRoom.status === "draft" ||
        firstRoom.status === "draftComplete" ||
        firstRoom.status === "battle" ||
        firstRoom.status === "postGame"
      ) {
        throw new Error(
          "This match has already started or finished. Ask the host to create a new room."
        );
      }

      throw new Error(
        "This room already has an active Player 2."
      );
    }

    const staleGuestUid =
      (
        existingGuest &&
        existingGuest !== onlineUser.uid &&
        canReplaceStaleGuest(firstRoom)
      )
        ? existingGuest
        : "";

    const guestRef =
      ref(database, `rooms/${code}/players/guest`);

    // Reserve only the Player 2 seat instead of transacting on the
    // entire room. A fresh Firebase client is allowed to see null here:
    // null simply means "seat appears empty" and the server will retry
    // with the real value if necessary.
    const seatResult =
      await runTransaction(
        guestRef,
        currentGuestValue => {
          const currentGuest =
            currentGuestValue || "";

          if (
            !currentGuest ||
            currentGuest === onlineUser.uid ||
            (
              staleGuestUid &&
              currentGuest === staleGuestUid
            )
          ) {
            return onlineUser.uid;
          }

          return;
        }
      );

    if (!seatResult.committed) {
      const latestSnapshot =
        await get(roomRef);

      const latestRoom =
        latestSnapshot.exists()
          ? latestSnapshot.val()
          : null;

      if (!latestRoom) {
        throw new Error(
          `Room ${code} no longer exists.`
        );
      }

      if (latestRoom.status === "closed") {
        throw new Error(
          "This room has been closed."
        );
      }

      const latestGuest =
        latestRoom.players?.guest || "";

      if (
        latestGuest &&
        latestGuest !== onlineUser.uid
      ) {
        throw new Error(
          "This room already has an active Player 2."
        );
      }

      throw new Error(
        "Could not reserve the Player 2 seat. Please try Join Room again."
      );
    }

    const joinedSnapshot =
      await get(roomRef);

    if (!joinedSnapshot.exists()) {
      throw new Error(
        `Room ${code} no longer exists.`
      );
    }

    const joinedRoom =
      joinedSnapshot.val();

    if (joinedRoom.status === "closed") {
      throw new Error(
        "This room has been closed."
      );
    }

    if (
      joinedRoom.players?.guest !== onlineUser.uid
    ) {
      throw new Error(
        "The Player 2 seat changed while joining. Please try again."
      );
    }

    const replacingStaleGuest =
      Boolean(
        staleGuestUid &&
        staleGuestUid !== onlineUser.uid
      );

    const roomPatch = {
      "playerProfiles/guest":
        currentProfile(),

      "presence/guest": {
        uid: onlineUser.uid,
        online: true,
        lastSeen: Date.now()
      }
    };

    if (
      joinedRoom.status === "waiting" ||
      replacingStaleGuest
    ) {
      roomPatch.status = "sideSelect";
      roomPatch.sides = {
        A: "",
        B: ""
      };
      roomPatch.draft =
        emptyDraft();
      roomPatch.rematchVotes = {
        host: false,
        guest: false
      };
      roomPatch.battle = null;
      roomPatch.result = null;
    }

    await update(
      roomRef,
      roomPatch
    );

    onlineRoomCode = code;
    onlinePlayerRole = "guest";
    onlineBattleInitializationStarted = false;
    lastAppliedBattleVersion = 0;
    lastHandledMatchId = null;

    roomCodeDisplay.classList.remove("hidden");
    roomCodeDisplay.textContent = `ROOM CODE: ${code}`;

    onlineStatus.textContent =
      "Joined room. Choose Team A or Team B.";

    setRoomControlsEnabled();
    await registerRolePresence("guest", code);
    listenToOnlineRoom(code);
  } catch (error) {
    console.error("Join room failed:", error);
    onlineStatus.textContent =
      `Join room failed: ${error.message}`;
    setRoomControlsEnabled();
  }
}

// =====================================================
// ROOM LISTENER / IDENTITY
// =====================================================

function stopListeningToRoom() {
  if (typeof roomUnsubscribe === "function") {
    roomUnsubscribe();
  }

  roomUnsubscribe = null;
}

function listenToOnlineRoom(code) {
  stopListeningToRoom();

  roomUnsubscribe = onValue(
    ref(database, `rooms/${code}`),
    snapshot => {
      if (!snapshot.exists()) {
        onlineRoomData = null;
        onlineStatus.textContent = "Room closed.";
        characterGrid.innerHTML = "";
        return;
      }

      onlineRoomData = snapshot.val();
      syncLocalIdentityFromRoom();
      handleOnlineRoomUpdate();
    },
    error => {
      console.error("Room listener error:", error);
      onlineStatus.textContent =
        `Room sync failed: ${error.message}`;
    }
  );
}

function syncLocalIdentityFromRoom() {
  if (!onlineRoomData || !onlineUser) return;

  onlinePlayerRole =
    roleForUid(onlineRoomData, onlineUser.uid);

  onlineSide =
    sideForUid(onlineRoomData, onlineUser.uid);

  bridge.setOnlinePlayerSide(onlineSide);
}

// =====================================================
// SIDE SELECTION
// =====================================================

sideAButton.addEventListener("click", () => claimSide("A"));
sideBButton.addEventListener("click", () => claimSide("B"));

function renderSideSelection() {
  sideSelectPanel.classList.remove("hidden");
  hidePostGamePanel();
  showSurrenderButton(false);

  selectionTitle.textContent =
    "ONLINE PVP — CHOOSE YOUR SIDE";

  characterGrid.innerHTML = "";

  const sides = onlineRoomData?.sides || { A: "", B: "" };
  const aUid = sides.A || "";
  const bUid = sides.B || "";

  const aMine = aUid === onlineUser?.uid;
  const bMine = bUid === onlineUser?.uid;

  sideAButton.disabled = Boolean(aUid && !aMine);
  sideBButton.disabled = Boolean(bUid && !bMine);

  sideAButton.textContent = aMine
    ? "TEAM A — YOU"
    : aUid
      ? `TEAM A — ${profileForUid(onlineRoomData, aUid)}`
      : "Choose Team A";

  sideBButton.textContent = bMine
    ? "TEAM B — YOU"
    : bUid
      ? `TEAM B — ${profileForUid(onlineRoomData, bUid)}`
      : "Choose Team B";

  if (onlineSide) {
    sideSelectStatus.textContent =
      `You chose Team ${onlineSide}. Waiting for the other player to choose.`;
  } else {
    sideSelectStatus.textContent =
      "Both players must choose opposite sides before BP begins.";
  }

  teamASelection.textContent = aUid
    ? profileForUid(onlineRoomData, aUid)
    : "Open";

  teamBSelection.textContent = bUid
    ? profileForUid(onlineRoomData, bUid)
    : "Open";
}

async function claimSide(side) {
  if (
    !onlineRoomCode ||
    !onlineUser ||
    !onlinePlayerRole ||
    !["A", "B"].includes(side)
  ) {
    return;
  }

  onlineStatus.textContent =
    `Choosing Team ${side}...`;

  try {
    const result = await runTransaction(
      ref(database, `rooms/${onlineRoomCode}`),
      room => {
        if (!room || room.status !== "sideSelect") {
          return;
        }

        const role = roleForUid(room, onlineUser.uid);

        if (!role) {
          return;
        }

        room.sides = room.sides || { A: "", B: "" };

        const occupant = room.sides[side] || "";

        if (
          occupant &&
          occupant !== onlineUser.uid
        ) {
          return;
        }

        const opposite = otherSide(side);

        if (room.sides[opposite] === onlineUser.uid) {
          room.sides[opposite] = "";
        }

        room.sides[side] = onlineUser.uid;

        if (
          room.sides.A &&
          room.sides.B &&
          room.sides.A !== room.sides.B
        ) {
          room.status = "draft";
          room.draft = emptyDraft();
          room.rematchVotes = {
            host: false,
            guest: false
          };
          delete room.battle;
          delete room.result;
        }

        return room;
      }
    );

    if (!result.committed) {
      onlineStatus.textContent =
        `Team ${side} is already taken, or side selection has ended.`;
    }
  } catch (error) {
    console.error("Choose side failed:", error);
    onlineStatus.textContent =
      `Choose side failed: ${error.message}`;
  }
}

// =====================================================
// ROOM UI / STATE MACHINE
// =====================================================

function handleOnlineRoomUpdate() {
  if (!onlineModeActive || !onlineRoomData) return;

  setRoomControlsEnabled();
  renderOnlineBattlePlayerBadges();

  if (!onlinePlayerRole) {
    onlineStatus.textContent =
      "You are no longer a participant in this room.";
    return;
  }

  if (onlineRoomData.status === "closed") {
    hideSideSelection();
    showSurrenderButton(false);
    postGamePanel.classList.remove("hidden");
    postGameMessage.textContent =
      "This room was closed by a player.";
    rematchButton.disabled = true;
    rematchStatus.textContent =
      "Rematch is unavailable because the room is closed.";
    return;
  }

  const guestUid = onlineRoomData.players?.guest || "";

  if (!guestUid) {
    hideSideSelection();
    hidePostGamePanel();
    showSurrenderButton(false);
    selectionTitle.textContent = "ONLINE PVP — WAITING";
    onlineStatus.textContent =
      `Room ${onlineRoomCode}: waiting for Player 2...`;
    characterGrid.innerHTML = "";
    return;
  }

  if (onlineRoomData.status === "sideSelect") {
    if (bridge.isOnlineBattleActive()) {
      bridge.resetOnlineBattleToSelection();
    }

    onlineBattleInitializationStarted = false;
    lastAppliedBattleVersion = 0;
    lastHandledMatchId = null;
    renderSideSelection();
    return;
  }

  hideSideSelection();
  renderPickedTeams();

  if (
    onlineRoomData.result ||
    onlineRoomData.status === "postGame"
  ) {
    handlePostGame();
    return;
  }

  const battle = onlineRoomData.battle;

  if (battle?.state) {
    showSurrenderButton(true);

    const battleVersion =
      Number(battle.version || 0);

    const localBattleActive =
      bridge.isOnlineBattleActive();

    if (
      !localBattleActive ||
      battleVersion > lastAppliedBattleVersion
    ) {
      lastAppliedBattleVersion = Math.max(
        lastAppliedBattleVersion,
        battleVersion
      );

      if (
        battle.updatedBy !== onlineUser?.uid ||
        !localBattleActive
      ) {
        bridge.applyOnlineBattleSnapshot(
          battle.state,
          onlineSide
        );
        renderOnlineBattlePlayerBadges();
      }
    }

    if (
      battle.state?.gameOver &&
      !onlineRoomData.result
    ) {
      finalizeNaturalMatch(battle.state).catch(error => {
        console.error("Finalize natural match failed:", error);
      });
    }

    return;
  }

  showSurrenderButton(false);

  if (onlineRoomData.status === "waiting") {
    onlineStatus.textContent =
      "Player 2 connected. Preparing side selection...";
    return;
  }

  const draftStep =
    Number(onlineRoomData.draft?.step || 0);

  if (
    onlineRoomData.status === "draftComplete" ||
    onlineRoomData.status === "battle" ||
    draftStep >= ONLINE_DRAFT_ORDER.length
  ) {
    renderDraftComplete();
    maybeStartOnlineBattle();
    return;
  }

  if (onlineRoomData.status === "draft") {
    renderOnlineDraft();
  }
}

// =====================================================
// ONLINE BATTLE SYNC
// =====================================================

function queueOnlineBattleSnapshot(snapshot) {
  if (
    !snapshot ||
    !onlineModeActive ||
    !onlineRoomCode ||
    !onlineUser ||
    !onlineSide ||
    !database
  ) {
    return;
  }

  battleWriteChain = battleWriteChain
    .then(() => pushOnlineBattleSnapshot(snapshot))
    .catch(error => {
      console.error("Online battle sync failed:", error);
      onlineStatus.textContent =
        `Battle sync failed: ${error.message}`;
    });
}

async function pushOnlineBattleSnapshot(snapshot) {
  if (!onlineRoomCode || !onlineUser) return;

  const statusSnapshot = await get(
    ref(database, `rooms/${onlineRoomCode}/status`)
  );

  const status = statusSnapshot.val();

  if (
    status !== "draftComplete" &&
    status !== "battle"
  ) {
    return;
  }

  const battleRef =
    ref(database, `rooms/${onlineRoomCode}/battle`);

  const result = await runTransaction(
    battleRef,
    currentBattle => {
      const nextVersion =
        Number(currentBattle?.version || 0) + 1;

      return {
        version: nextVersion,
        updatedBy: onlineUser.uid,
        updatedAt: Date.now(),
        state: snapshot
      };
    }
  );

  if (!result.committed) {
    throw new Error(
      "Firebase rejected the battle state update."
    );
  }

  lastAppliedBattleVersion = Math.max(
    lastAppliedBattleVersion,
    Number(result.snapshot.val()?.version || 0)
  );

  if (status === "draftComplete") {
    await set(
      ref(database, `rooms/${onlineRoomCode}/status`),
      "battle"
    );
  }
}

function maybeStartOnlineBattle() {
  if (
    onlineBattleInitializationStarted ||
    onlineRoomData?.battle?.state ||
    !onlineRoomData?.draft ||
    !onlineSide
  ) {
    return;
  }

  const picks = onlineRoomData.draft.picks || {};

  const complete = [
    picks.A1,
    picks.B1,
    picks.A2,
    picks.B2
  ].every(
    key => key && CHARACTER_DATA[key]
  );

  if (!complete) {
    onlineStatus.textContent =
      "BP is marked complete, but one or more picks are missing.";
    return;
  }

  // Team A initializes the canonical Round 1 state, regardless of who
  // created the room.
  if (onlineSide !== "A") {
    onlineStatus.innerHTML +=
      "<br><br>🌐 Waiting for Team A to start the synchronized battle...";
    return;
  }

  onlineBattleInitializationStarted = true;
  onlineStatus.innerHTML +=
    "<br><br>🌐 Starting synchronized battle...";

  const started = bridge.startOnlineBattleFromDraft(
    picks,
    onlineSide
  );

  if (!started) {
    onlineBattleInitializationStarted = false;
    onlineStatus.textContent =
      "Could not start the online battle from the completed BP.";
  } else {
    renderOnlineBattlePlayerBadges();
  }
}

// =====================================================
// DRAFT UI
// =====================================================

function renderPickedTeams() {
  const draft = onlineRoomData?.draft || {};
  const picks = draft.picks || {};
  const bans = draft.bans || {};

  teamASelection.innerHTML = `
    🚫 Ban: ${characterLabel(bans.A)}<br>
    A1: ${characterLabel(picks.A1)}<br>
    A2: ${characterLabel(picks.A2)}
  `;

  teamBSelection.innerHTML = `
    🚫 Ban: ${characterLabel(bans.B)}<br>
    B1: ${characterLabel(picks.B1)}<br>
    B2: ${characterLabel(picks.B2)}
  `;
}

function characterLabel(key) {
  if (!key || !CHARACTER_DATA[key]) {
    return "—";
  }

  const character = CHARACTER_DATA[key];
  return `${character.icon} ${character.name}`;
}

function renderOnlineDraft() {
  const step = Number(onlineRoomData.draft?.step || 0);
  const currentPick = ONLINE_DRAFT_ORDER[step];

  if (!currentPick) {
    renderDraftComplete();
    return;
  }

  const isMyTurn = currentPick.team === onlineSide;
  const actionWord = currentPick.type === "ban" ? "BAN" : "PICK";

  selectionTitle.textContent =
    `${currentPick.label} — ${isMyTurn ? `YOUR ${actionWord}` : `OPPONENT'S ${actionWord}`}`;

  onlineStatus.textContent = isMyTurn
    ? currentPick.type === "ban"
      ? `You are Team ${onlineSide}. Ban 1 character.`
      : `You are Team ${onlineSide}. Choose ${currentPick.label}.`
    : currentPick.type === "ban"
      ? `You are Team ${onlineSide}. Waiting for Team ${currentPick.team} to ban...`
      : `You are Team ${onlineSide}. Waiting for ${currentPick.label}...`;

  renderOnlineCharacterGrid(currentPick, isMyTurn);
}

function getOnlineUnavailableCharacters() {
  const draft = onlineRoomData?.draft || {};
  const picks = draft.picks || {};
  const bans = draft.bans || {};

  return [
    bans.A,
    bans.B,
    picks.A1,
    picks.B1,
    picks.A2,
    picks.B2
  ].filter(Boolean);
}

function renderOnlineCharacterGrid(currentPick, isMyTurn) {
  characterGrid.innerHTML = "";

  const unavailable = new Set(
    getOnlineUnavailableCharacters()
  );

  const draft = onlineRoomData?.draft || {};
  const bans = draft.bans || {};
  const picks = draft.picks || {};

  for (const [key, character] of Object.entries(CHARACTER_DATA)) {
    const card = document.createElement("div");
    card.className = "character-select-card";

    const blocked = unavailable.has(key);

    let statusTag = "";

    if (bans.A === key || bans.B === key) {
      statusTag = `<div class="bp-status-tag">🚫 BANNED</div>`;
    } else if (
      picks.A1 === key ||
      picks.B1 === key ||
      picks.A2 === key ||
      picks.B2 === key
    ) {
      statusTag = `<div class="bp-status-tag">✓ PICKED</div>`;
    }

    card.innerHTML = `
      ${statusTag}
      <h2>${character.icon} ${character.name}</h2>

      <p class="stats">
        ❤️ HP ${formatNumber(character.hp)}
        &nbsp;
        ⚔️ ATK ${formatNumber(character.attack)}
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

    if (!isMyTurn) {
      card.classList.add("online-disabled");
    } else if (blocked) {
      card.classList.add("online-already-picked");
      card.title =
        "This character has already been banned or picked.";
    } else {
      card.addEventListener("click", () => {
        submitOnlinePick(currentPick, key);
      });
    }

    characterGrid.appendChild(card);
  }
}

async function submitOnlinePick(expectedPick, characterKey) {
  if (!onlineRoomCode || !onlineUser || !onlineSide) return;

  onlineStatus.textContent =
    `Submitting ${expectedPick.label}...`;

  try {
    const result = await runTransaction(
      ref(database, `rooms/${onlineRoomCode}`),
      room => {
        if (!room || room.status !== "draft") {
          return;
        }

        if (room.sides?.[onlineSide] !== onlineUser.uid) {
          return;
        }

        const step = Number(room.draft?.step || 0);
        const actualPick = ONLINE_DRAFT_ORDER[step];

        if (
          !actualPick ||
          actualPick.label !== expectedPick.label ||
          actualPick.team !== onlineSide
        ) {
          return;
        }

        const picks = room.draft.picks || emptyDraft().picks;
        const bans = room.draft.bans || emptyDraft().bans;

        const unavailable = [
          bans.A,
          bans.B,
          picks.A1,
          picks.B1,
          picks.A2,
          picks.B2
        ].filter(Boolean);

        if (unavailable.includes(characterKey)) {
          return;
        }

        if (actualPick.type === "ban") {
          bans[actualPick.team] = characterKey;
          room.draft.bans = bans;
        } else {
          picks[actualPick.label] = characterKey;
          room.draft.picks = picks;
        }

        room.draft.step = step + 1;

        if (room.draft.step >= ONLINE_DRAFT_ORDER.length) {
          room.status = "draftComplete";
        }

        return room;
      }
    );

    if (!result.committed) {
      onlineStatus.textContent =
        "Action rejected. The room advanced already, or that character is unavailable.";
    }
  } catch (error) {
    console.error(error);
    onlineStatus.textContent =
      `Pick failed: ${error.message}`;
  }
}

function renderDraftComplete() {
  const draft = onlineRoomData?.draft || {};
  const picks = draft.picks || {};
  const bans = draft.bans || {};

  selectionTitle.textContent = "✅ ONLINE BP COMPLETE";
  characterGrid.innerHTML = "";

  onlineStatus.innerHTML = `
    BP synchronized successfully.<br><br>
    <strong>Team A Ban</strong> ${characterLabel(bans.A)}<br>
    <strong>Team B Ban</strong> ${characterLabel(bans.B)}<br><br>
    <strong>A1</strong> ${characterLabel(picks.A1)}<br>
    <strong>B1</strong> ${characterLabel(picks.B1)}<br>
    <strong>B2</strong> ${characterLabel(picks.B2)}<br>
    <strong>A2</strong> ${characterLabel(picks.A2)}
  `;
}


// =====================================================
// CUMULATIVE ONLINE PVP STATS
// Tracks completed Online PvP matches from 2026-09-17 onward.
// This data is independent from the daily leaderboard reset.
// =====================================================

function statNumber(value) {
  const number = Number(value || 0);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function statPercent(numerator, denominator) {
  const total = statNumber(denominator);
  if (total <= 0) return "0.0%";
  return `${((statNumber(numerator) / total) * 100).toFixed(1)}%`;
}

function translatedCharacterLabel(key) {
  const character = CHARACTER_DATA[key];
  if (!character) return key || "—";

  const translatedName =
    window.QDLanguage?.translateText?.(character.name) ||
    character.name;

  return `${character.icon} ${translatedName}`;
}

function onlineStatsTeamKey(firstKey, secondKey) {
  return [firstKey, secondKey]
    .filter(Boolean)
    .sort()
    .join("__");
}

function ensureCharacterStat(stats, key) {
  stats.characters = stats.characters || {};
  stats.characters[key] = stats.characters[key] || {
    uses: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    bans: 0
  };
  return stats.characters[key];
}

function ensureTeamStat(stats, firstKey, secondKey) {
  stats.teams = stats.teams || {};
  const members = [firstKey, secondKey].sort();
  const key = onlineStatsTeamKey(members[0], members[1]);

  stats.teams[key] = stats.teams[key] || {
    member1: members[0],
    member2: members[1],
    uses: 0,
    wins: 0,
    losses: 0,
    draws: 0
  };

  return stats.teams[key];
}

function applySideResultToStats(stats, characterKeys, winnerSide, side) {
  const resultBucket =
    winnerSide === "DRAW"
      ? "draws"
      : winnerSide === side
        ? "wins"
        : "losses";

  characterKeys.forEach(key => {
    if (!CHARACTER_DATA[key]) return;
    const entry = ensureCharacterStat(stats, key);
    entry.uses = statNumber(entry.uses) + 1;
    entry[resultBucket] = statNumber(entry[resultBucket]) + 1;
  });

  if (
    characterKeys.length === 2 &&
    CHARACTER_DATA[characterKeys[0]] &&
    CHARACTER_DATA[characterKeys[1]]
  ) {
    const teamEntry = ensureTeamStat(
      stats,
      characterKeys[0],
      characterKeys[1]
    );
    teamEntry.uses = statNumber(teamEntry.uses) + 1;
    teamEntry[resultBucket] = statNumber(teamEntry[resultBucket]) + 1;
  }
}

async function recordOnlineStatsResult(result, room) {
  if (!database || !result?.matchId || !room?.draft) return;

  const endedAt = Number(result.endedAt || Date.now());
  const dayKey = getLeaderboardDayKey(endedAt);

  // Do not backfill matches from before the stats launch date.
  if (dayKey < ONLINE_STATS_START_DAY_KEY) return;

  const picks = room.draft.picks || {};
  const bans = room.draft.bans || {};
  const teamA = [picks.A1, picks.A2];
  const teamB = [picks.B1, picks.B2];

  if (
    !teamA.every(key => key && CHARACTER_DATA[key]) ||
    !teamB.every(key => key && CHARACTER_DATA[key])
  ) {
    console.warn("Online stats skipped: completed match has an incomplete draft.");
    return;
  }

  await runTransaction(
    ref(database, ONLINE_STATS_ROOT),
    current => {
      const stats =
        current && typeof current === "object"
          ? current
          : {};

      stats.version = 2;
      stats.gameVersion = ONLINE_STATS_VERSION;
      stats.milestone = "chimera-release";
      stats.startedDayKey =
        stats.startedDayKey || ONLINE_STATS_START_DAY_KEY;
      stats.processedMatches = stats.processedMatches || {};
      stats.characters = stats.characters || {};
      stats.teams = stats.teams || {};

      // Both clients see postgame. This makes the aggregation idempotent.
      if (stats.processedMatches[result.matchId]) {
        return stats;
      }

      stats.totalMatches = statNumber(stats.totalMatches) + 1;

      [bans.A, bans.B].forEach(key => {
        if (!key || !CHARACTER_DATA[key]) return;
        const entry = ensureCharacterStat(stats, key);
        entry.bans = statNumber(entry.bans) + 1;
      });

      applySideResultToStats(
        stats,
        teamA,
        result.winnerSide,
        "A"
      );
      applySideResultToStats(
        stats,
        teamB,
        result.winnerSide,
        "B"
      );

      stats.processedMatches[result.matchId] = {
        endedAt,
        dayKey,
        winnerSide: result.winnerSide || "",
        reason: result.reason || "battle"
      };
      stats.lastUpdatedAt = Date.now();

      return stats;
    }
  );
}

function stopOnlineStatsListener() {
  if (typeof statsUnsubscribe === "function") {
    statsUnsubscribe();
  }
  statsUnsubscribe = null;
}

function startOnlineStatsListener() {
  stopOnlineStatsListener();

  if (!onlineUser) return;

  statsUnsubscribe = onValue(
    ref(database, ONLINE_STATS_ROOT),
    snapshot => {
      latestOnlineStatsData = snapshot.val() || {};
      renderOnlineStats(latestOnlineStatsData);
    },
    error => {
      console.error("Online stats read failed:", error);
      if (onlineStatsSummary) {
        onlineStatsSummary.textContent =
          `Stats unavailable: ${error.message}`;
      }
    }
  );
}

function setOnlineStatsLabels() {
  const lang = getLanguage();

  const text = (en, zh, ja) =>
    lang === "zh" ? zh : lang === "ja" ? ja : en;

  if (onlineStatsTitle) {
    onlineStatsTitle.textContent = text(
      `📊 Online PvP Stats — Version ${ONLINE_STATS_VERSION}`,
      `📊 在线 PvP 数据 — 版本 ${ONLINE_STATS_VERSION}`,
      `📊 オンラインPvP統計 — Version ${ONLINE_STATS_VERSION}`
    );
  }
  if (onlineStatsSince) {
    onlineStatsSince.textContent = text(
      `Version ${ONLINE_STATS_VERSION} only • Since Chimera release • Completed matches only`,
      `仅统计 ${ONLINE_STATS_VERSION} 版本 • 从奇美拉上线开始 • 仅记录已完成对局`,
      `Version ${ONLINE_STATS_VERSION}のみ • キメラ実装以降 • 完了した対戦のみ`
    );
  }
  if (characterStatsTitle) {
    characterStatsTitle.textContent = text(
      "Character Stats",
      "角色数据",
      "キャラクター統計"
    );
  }
  if (teamStatsTitle) {
    teamStatsTitle.textContent = text(
      "Team Stats",
      "队伍数据",
      "チーム統計"
    );
  }

  const labels = [
    [characterHeaderCharacter, "Character", "角色", "キャラ"],
    [characterHeaderUses, "Uses", "使用次数", "使用回数"],
    [characterHeaderRecord, "W-L-D", "胜-负-平", "勝-敗-分"],
    [characterHeaderWinRate, "Win Rate", "胜率", "勝率"],
    [characterHeaderBans, "Bans", "禁用次数", "BAN回数"],
    [characterHeaderBanRate, "Ban Rate", "禁用率", "BAN率"],
    [characterHeaderBpRate, "BP Rate", "BP率", "BP率"],
    [teamHeaderTeam, "Team", "队伍", "チーム"],
    [teamHeaderUses, "Uses", "使用次数", "使用回数"],
    [teamHeaderRecord, "W-L-D", "胜-负-平", "勝-敗-分"],
    [teamHeaderWinRate, "Win Rate", "胜率", "勝率"]
  ];

  labels.forEach(([element, en, zh, ja]) => {
    if (element) element.textContent = text(en, zh, ja);
  });
}

function renderOnlineStats(data) {
  setOnlineStatsLabels();

  if (!characterStatsBody || !teamStatsBody) return;

  const lang = getLanguage();
  const text = (en, zh, ja) =>
    lang === "zh" ? zh : lang === "ja" ? ja : en;

  if (!onlineUser) {
    if (onlineStatsSummary) {
      onlineStatsSummary.textContent = text(
        "Sign in or continue as Guest to view stats.",
        "登录或以游客身份继续后即可查看数据。",
        "ログインまたはゲストで続行すると統計を確認できます。"
      );
    }
    characterStatsBody.innerHTML = "";
    teamStatsBody.innerHTML = "";
    return;
  }

  const totalMatches = statNumber(data?.totalMatches);
  const startedDayKey =
    data?.startedDayKey || ONLINE_STATS_START_DAY_KEY;

  if (onlineStatsSummary) {
    onlineStatsSummary.textContent = text(
      `Version ${ONLINE_STATS_VERSION} matches: ${totalMatches} • Chimera release onward • Google and Guest matches included`,
      `${ONLINE_STATS_VERSION}版本已记录对局：${totalMatches} • 奇美拉上线后 • Google与游客对局均计入`,
      `Version ${ONLINE_STATS_VERSION} 記録済み対戦：${totalMatches} • キメラ実装以降 • Google/ゲスト両方を集計`
    );
  }

  const characterRows = Object.keys(CHARACTER_DATA)
    .map(key => {
      const entry = data?.characters?.[key] || {};
      return {
        key,
        uses: statNumber(entry.uses),
        wins: statNumber(entry.wins),
        losses: statNumber(entry.losses),
        draws: statNumber(entry.draws),
        bans: statNumber(entry.bans)
      };
    })
    .sort((a, b) =>
      b.uses - a.uses ||
      b.bans - a.bans ||
      translatedCharacterLabel(a.key)
        .localeCompare(translatedCharacterLabel(b.key))
    );

  characterStatsBody.innerHTML = "";
  characterRows.forEach(row => {
    const tr = document.createElement("tr");
    const cells = [
      translatedCharacterLabel(row.key),
      String(row.uses),
      `${row.wins}-${row.losses}-${row.draws}`,
      statPercent(row.wins, row.uses),
      String(row.bans),
      statPercent(row.bans, totalMatches),
      statPercent(row.uses + row.bans, totalMatches)
    ];

    cells.forEach((value, index) => {
      const cell = document.createElement(index === 0 ? "th" : "td");
      if (index === 0) cell.scope = "row";
      cell.textContent = value;
      tr.appendChild(cell);
    });
    characterStatsBody.appendChild(tr);
  });

  const teamRows = Object.values(data?.teams || {})
    .map(entry => ({
      member1: entry?.member1 || "",
      member2: entry?.member2 || "",
      uses: statNumber(entry?.uses),
      wins: statNumber(entry?.wins),
      losses: statNumber(entry?.losses),
      draws: statNumber(entry?.draws)
    }))
    .filter(row =>
      row.uses > 0 &&
      CHARACTER_DATA[row.member1] &&
      CHARACTER_DATA[row.member2]
    )
    .sort((a, b) =>
      b.uses - a.uses ||
      (b.wins / Math.max(1, b.uses)) -
        (a.wins / Math.max(1, a.uses)) ||
      onlineStatsTeamKey(a.member1, a.member2)
        .localeCompare(onlineStatsTeamKey(b.member1, b.member2))
    );

  teamStatsBody.innerHTML = "";

  if (!teamRows.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.className = "stats-empty-cell";
    td.textContent = text(
      "No completed team data yet.",
      "暂时没有已完成的队伍数据。",
      "完了したチームデータはまだありません。"
    );
    tr.appendChild(td);
    teamStatsBody.appendChild(tr);
    return;
  }

  teamRows.forEach(row => {
    const tr = document.createElement("tr");
    const teamLabel =
      `${translatedCharacterLabel(row.member1)} + ${translatedCharacterLabel(row.member2)}`;
    const cells = [
      teamLabel,
      String(row.uses),
      `${row.wins}-${row.losses}-${row.draws}`,
      statPercent(row.wins, row.uses)
    ];

    cells.forEach((value, index) => {
      const cell = document.createElement(index === 0 ? "th" : "td");
      if (index === 0) cell.scope = "row";
      cell.textContent = value;
      tr.appendChild(cell);
    });
    teamStatsBody.appendChild(tr);
  });
}

// =====================================================
// MATCH RESULT / SURRENDER / REMATCH
// =====================================================

surrenderButton.addEventListener("click", surrenderOnlineMatch);
rematchButton.addEventListener("click", requestRematch);
exitRoomButton.addEventListener("click", exitOnlineRoom);

async function surrenderOnlineMatch() {
  if (
    !onlineRoomCode ||
    !onlineUser ||
    !onlineSide ||
    !onlineRoomData ||
    onlineRoomData.result
  ) {
    return;
  }

  if (!window.confirm(surrenderConfirmText())) {
    return;
  }

  surrenderButton.disabled = true;

  try {
    const result = await runTransaction(
      ref(database, `rooms/${onlineRoomCode}`),
      room => {
        if (
          !room ||
          room.result ||
          room.status !== "battle" ||
          room.battle?.state?.gameOver
        ) {
          return;
        }

        const loserSide = sideForUid(room, onlineUser.uid);

        if (!loserSide) {
          return;
        }

        const winnerSide = otherSide(loserSide);
        const winnerUid = room.sides?.[winnerSide] || "";

        if (!winnerUid) {
          return;
        }

        room.result = {
          matchId: room.matchId,
          gameNumber: Number(room.gameNumber || 1),
          winnerSide,
          winnerUid,
          loserSide,
          loserUid: onlineUser.uid,
          reason: "surrender",
          endedAt: Date.now()
        };

        room.status = "postGame";
        room.rematchVotes = {
          host: false,
          guest: false
        };

        return room;
      }
    );

    if (!result.committed) {
      onlineStatus.textContent =
        "Surrender was not accepted because the match already ended.";
    }
  } catch (error) {
    console.error("Surrender failed:", error);
    onlineStatus.textContent =
      `Surrender failed: ${error.message}`;
  } finally {
    surrenderButton.disabled = false;
  }
}

function deriveNaturalResult(snapshot, room) {
  const teamA = Array.isArray(snapshot?.teamA) ? snapshot.teamA : [];
  const teamB = Array.isArray(snapshot?.teamB) ? snapshot.teamB : [];

  if (teamA.length !== 2 || teamB.length !== 2) {
    return null;
  }

  const aDead = teamA.every(character => !character.alive);
  const bDead = teamB.every(character => !character.alive);

  if (!aDead && !bDead) {
    return null;
  }

  if (aDead && bDead) {
    return {
      matchId: room.matchId,
      gameNumber: Number(room.gameNumber || 1),
      winnerSide: "DRAW",
      winnerUid: "",
      loserSide: "",
      loserUid: "",
      reason: "battle",
      endedAt: Date.now()
    };
  }

  const winnerSide = bDead ? "A" : "B";
  const loserSide = otherSide(winnerSide);

  return {
    matchId: room.matchId,
    gameNumber: Number(room.gameNumber || 1),
    winnerSide,
    winnerUid: room.sides?.[winnerSide] || "",
    loserSide,
    loserUid: room.sides?.[loserSide] || "",
    reason: "battle",
    endedAt: Date.now()
  };
}

async function finalizeNaturalMatch(snapshot) {
  if (!onlineRoomCode || !snapshot?.gameOver) return;

  await runTransaction(
    ref(database, `rooms/${onlineRoomCode}`),
    room => {
      if (!room || room.result) {
        return;
      }

      const result = deriveNaturalResult(snapshot, room);

      if (!result) {
        return;
      }

      room.result = result;
      room.status = "postGame";
      room.rematchVotes = {
        host: false,
        guest: false
      };

      return room;
    }
  );
}

function handlePostGame() {
  const result = onlineRoomData?.result;

  if (!result) {
    return;
  }

  showSurrenderButton(false);
  hideSideSelection();
  postGamePanel.classList.remove("hidden");

  if (result.matchId !== lastHandledMatchId) {
    lastHandledMatchId = result.matchId;

    bridge.showOnlineMatchResult(
      result.winnerSide,
      result.reason || "battle"
    );

    recordLeaderboardResult(result).catch(error => {
      console.error("Leaderboard result update failed:", error);
    });

    recordOnlineStatsResult(result, onlineRoomData).catch(error => {
      console.error("Online stats update failed:", error);
    });
  }

  if (result.winnerSide === "DRAW") {
    postGameMessage.textContent =
      "Draw. No leaderboard point is awarded.";
  } else {
    const winnerName =
      profileForUid(onlineRoomData, result.winnerUid);

    const rankedWinner =
      isRankedPlayer(
        onlineRoomData,
        result.winnerUid
      );
    const rankedLoser =
      isRankedPlayer(
        onlineRoomData,
        result.loserUid
      );

    const winText = result.reason === "surrender"
      ? `${winnerName} wins by surrender.`
      : `${winnerName} wins.`;

    if (rankedWinner && rankedLoser) {
      postGameMessage.textContent =
        `${winText} Winner +1 leaderboard point; loser -1 leaderboard point.`;
    } else if (rankedWinner) {
      postGameMessage.textContent =
        `${winText} Winner +1 leaderboard point. Guest loser has no leaderboard change.`;
    } else if (rankedLoser) {
      postGameMessage.textContent =
        `${winText} Guest winner has no leaderboard change; ranked loser -1 leaderboard point.`;
    } else {
      postGameMessage.textContent =
        `${winText} Guest accounts do not earn or lose leaderboard points.`;
    }
  }

  renderRematchState();
}

function renderRematchState() {
  const votes = onlineRoomData?.rematchVotes || {};
  const myVote = Boolean(
    onlinePlayerRole && votes[onlinePlayerRole]
  );

  const opponentRole =
    onlinePlayerRole === "host" ? "guest" : "host";

  const opponentVote = Boolean(votes[opponentRole]);

  rematchButton.disabled = myVote;
  rematchButton.textContent = myVote
    ? "Rematch ✓"
    : "Rematch";

  if (myVote && opponentVote) {
    rematchStatus.textContent =
      "Both players are ready. Starting a new game...";
  } else if (myVote) {
    rematchStatus.textContent =
      "Waiting for the opponent to choose Rematch...";
  } else if (opponentVote) {
    rematchStatus.textContent =
      "Opponent requested a rematch.";
  } else {
    rematchStatus.textContent =
      "Both players must choose Rematch to play again.";
  }
}

async function requestRematch() {
  if (
    !onlineRoomCode ||
    !onlineUser ||
    !onlinePlayerRole ||
    !onlineRoomData?.result
  ) {
    return;
  }

  rematchButton.disabled = true;

  try {
    const result = await runTransaction(
      ref(database, `rooms/${onlineRoomCode}`),
      room => {
        if (
          !room ||
          room.status !== "postGame" ||
          !room.result
        ) {
          return;
        }

        const role = roleForUid(room, onlineUser.uid);

        if (!role) {
          return;
        }

        room.rematchVotes = room.rematchVotes || {
          host: false,
          guest: false
        };

        room.rematchVotes[role] = true;

        if (
          room.rematchVotes.host &&
          room.rematchVotes.guest
        ) {
          const nextGame =
            Number(room.gameNumber || 1) + 1;

          room.gameNumber = nextGame;
          room.matchId =
            makeMatchId(onlineRoomCode, nextGame);
          room.status = "sideSelect";
          room.sides = {
            A: "",
            B: ""
          };
          room.draft = emptyDraft();
          room.rematchVotes = {
            host: false,
            guest: false
          };

          delete room.battle;
          delete room.result;
        }

        return room;
      }
    );

    if (!result.committed) {
      rematchButton.disabled = false;
      onlineStatus.textContent =
        "Rematch request could not be saved.";
    }
  } catch (error) {
    console.error("Rematch failed:", error);
    rematchButton.disabled = false;
    onlineStatus.textContent =
      `Rematch failed: ${error.message}`;
  }
}

async function exitOnlineRoom() {
  stopRolePresenceWatcher();

  if (!onlineRoomCode || !onlineUser) {
    location.reload();
    return;
  }

  exitRoomButton.disabled = true;

  try {
    await runTransaction(
      ref(database, `rooms/${onlineRoomCode}`),
      room => {
        if (!room) return;

        const role = roleForUid(room, onlineUser.uid);

        if (!role) return;

        room.status = "closed";
        room.closedBy = onlineUser.uid;
        room.closedAt = Date.now();
        return room;
      }
    );
  } catch (error) {
    console.error("Exit room update failed:", error);
  } finally {
    location.reload();
  }
}


// =====================================================
// ONLINE MODULE READY / ENTRY API
// =====================================================

window.QuickDuelOnline = {
  enterOnlineMode
};

window.__QD_ONLINE_READY__ = true;
window.__QD_ONLINE_VERSION__ = "permanent-game-username-20260917-4";
