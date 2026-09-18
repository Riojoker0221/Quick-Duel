// BALANCE BP UPDATE V3 • 2026-09-16
// TRANSLATION FIX V2 • Anubis + Prophet full CN/JA text • 2026-09-16
(() => {
  "use strict";

  const STORAGE_KEY = "quickDuelLanguage";
  const SUPPORTED = ["en", "ja", "zh"];

  const exact = {
    // =========================
    // GENERAL UI
    // =========================
    "Pick two characters and defeat the enemy team.": {
      ja: "2人のキャラクターを選び、相手チームを倒そう。",
      zh: "选择两名角色，击败敌方队伍。"
    },
    "👥 Local PvP": { ja: "👥 ローカル対戦", zh: "👥 本地对战" },
    "🤖 VS AI": { ja: "🤖 AI対戦", zh: "🤖 人机对战" },
    "🌐 Online PvP": { ja: "🌐 オンライン対戦", zh: "🌐 在线对战" },
    "🌐 ONLINE PVP": { ja: "🌐 オンライン対戦", zh: "🌐 在线对战" },
    "Create Room": { ja: "ルーム作成", zh: "创建房间" },
    "Join Room": { ja: "ルーム参加", zh: "加入房间" },
    "Connecting to Firebase...": { ja: "Firebase に接続中...", zh: "正在连接 Firebase..." },
    "Connected. Create a room or join one.": { ja: "接続完了。ルームを作成するか参加してください。", zh: "连接成功。请创建或加入房间。" },
    "Not connected.": { ja: "未接続。", zh: "尚未连接。" },
    "ONLINE PVP": { ja: "オンライン対戦", zh: "在线对战" },
    "ONLINE PVP — WAITING": { ja: "オンライン対戦 — 待機中", zh: "在线对战 — 等待中" },
    "TEAM A — PICK 2 CHARACTERS": { ja: "TEAM A — キャラクターを2人選択", zh: "TEAM A — 选择2名角色" },
    "TEAM B — PICK 2 CHARACTERS": { ja: "TEAM B — キャラクターを2人選択", zh: "TEAM B — 选择2名角色" },
    "TEAM A": { ja: "TEAM A", zh: "TEAM A" },
    "TEAM B": { ja: "TEAM B", zh: "TEAM B" },
    "No characters selected": { ja: "未選択", zh: "尚未选择角色" },
    "Confirm Team": { ja: "チーム確定", zh: "确认队伍" },
    "Start VS AI": { ja: "AI対戦開始", zh: "开始人机对战" },
    "Start Battle": { ja: "バトル開始", zh: "开始战斗" },
    "Confirm A Ban": { ja: "AのBANを確定", zh: "确认A禁用" },
    "Confirm B Ban": { ja: "BのBANを確定", zh: "确认B禁用" },
    "Confirm A1": { ja: "A1を確定", zh: "确认A1" },
    "Confirm B1": { ja: "B1を確定", zh: "确认B1" },
    "Confirm A2": { ja: "A2を確定", zh: "确认A2" },
    "Confirm B2": { ja: "B2を確定", zh: "确认B2" },
    "Battle": { ja: "バトル", zh: "战斗" },
    "New Game": { ja: "新しいゲーム", zh: "新游戏" },
    "ROUND": { ja: "ROUND", zh: "回合" },
    "VS": { ja: "VS", zh: "VS" },
    "Attack": { ja: "攻撃", zh: "攻击" },
    "Defend": { ja: "防御", zh: "防御" },
    "Charge": { ja: "チャージ", zh: "充能" },
    "Heal": { ja: "回復", zh: "治疗" },
    "❤️‍🩹 Healing -0.5": { ja: "❤️‍🩹 回復量 -0.5", zh: "❤️‍🩹 治疗量 -0.5" },
    "Skill": { ja: "スキル", zh: "技能" },
    "Back": { ja: "戻る", zh: "返回" },
    "Step": { ja: "1段階", zh: "上一步" },
    "Choose an action.": { ja: "行動を選択してください。", zh: "请选择行动。" },
    "BATTLE LOG": { ja: "バトルログ", zh: "战斗记录" },
    "✨ SKILL": { ja: "✨ スキル", zh: "✨ 技能" },
    "🌟 PASSIVE": { ja: "🌟 パッシブ", zh: "🌟 被动" },
    "⚔️ Battle started!": { ja: "⚔️ バトル開始！", zh: "⚔️ 战斗开始！" },
    "🤖 AI is choosing an action...": { ja: "🤖 AI が行動を選択中...", zh: "🤖 AI 正在选择行动..." },

    // Action / targeting UI
    "Confirm Action?": { ja: "この行動を確定しますか？", zh: "确认执行该行动？" },
    "✅ Confirm": { ja: "✅ 確定", zh: "✅ 确认" },
    "↩ Back": { ja: "↩ 戻る", zh: "↩ 返回" },
    "⚔️ Choose Attack Target": { ja: "⚔️ 攻撃対象を選択", zh: "⚔️ 选择攻击目标" },
    "💥 Choose Arcane Blast Main Target": { ja: "💥 奥術爆破の主対象を選択", zh: "💥 选择奥术爆破主目标" },
    "🛡️ Choose Guardian Shield Target": { ja: "🛡️ 守護シールドの対象を選択", zh: "🛡️ 选择守护护盾目标" },
    "💚 Choose Restoration Mark Target": { ja: "💚 回復の印の対象を選択", zh: "💚 选择恢复印记目标" },
    "🧵 Choose Life Puppet Target": { ja: "🧵 ライフパペットの対象を選択", zh: "🧵 选择生命傀儡目标" },
    "⚡ Charge Ball — Choose Ally": { ja: "⚡ チャージボール — 味方を選択", zh: "⚡ 充能球 — 选择己方目标" },
    "Consumes 2 Juggling Balls and gives the chosen living ally +1 Charge.": {
      ja: "ジャグリングボールを2個消費し、選んだ生存中の味方に +1 Charge。",
      zh: "消耗2个杂耍球，使选择的存活己方角色获得 +1 Charge。"
    },
    "🩸 Enemy Drain — Choose Target": { ja: "🩸 敵吸血 — 対象を選択", zh: "🩸 吸取敌人 — 选择目标" },

    // =========================
    // CHARACTER NAMES
    // =========================
    "Fighter": { ja: "ファイター", zh: "战士" },
    "Blast Mage": { ja: "爆裂魔導士", zh: "爆裂法师" },
    "Tank": { ja: "タンク", zh: "坦克" },
    "Cure Mage": { ja: "治癒魔導士", zh: "治愈法师" },
    "Assassin": { ja: "アサシン", zh: "刺客" },
    "King": { ja: "王", zh: "国王" },
    "Puppeteer": { ja: "人形遣い", zh: "傀儡师" },
    "Angel": { ja: "天使", zh: "天使" },
    "Devil": { ja: "悪魔", zh: "恶魔" },
    "Joker": { ja: "ジョーカー", zh: "小丑" },
    "Vampire": { ja: "吸血鬼", zh: "吸血鬼" },

    // =========================
    // CHARACTER DESCRIPTIONS
    // =========================
    "A balanced frontline fighter with reliable offense and defense.": {
      ja: "攻守のバランスに優れた、安定した前衛ファイター。",
      zh: "攻守均衡、稳定可靠的前排战士。"
    },
    "A fragile mage whose Arcane Blast becomes stronger when more Charge is invested.": {
      ja: "Charge を多く投入するほど奥術爆破が強化される、脆い高火力魔導士。",
      zh: "较为脆弱，但投入更多 Charge 后奥术爆破会显著增强的法师。"
    },
    "A massive defensive character who protects the teammate by taking part of their damage.": {
      ja: "味方のダメージを肩代わりして守る、高耐久の防御役。",
      zh: "通过替队友承担部分伤害来保护队友的高耐久防御角色。"
    },
    "A healing specialist who turns otherwise wasted healing into short-lived protection.": {
      ja: "余った回復量を短時間の防御へ変換できる回復の専門家。",
      zh: "能够把原本浪费的治疗量转化为短期防护的治疗专家。"
    },
    "A fragile attacker with high single-target burst damage.": {
      ja: "耐久は低いが、単体への瞬間火力に優れる攻撃役。",
      zh: "生存较弱，但拥有极高单体爆发的攻击角色。"
    },
    "A control-oriented leader whose presence strengthens the teammate.": {
      ja: "味方を強化しながら敵を制御する、支配型リーダー。",
      zh: "以控制为核心，并通过自身存在强化队友的领袖型角色。"
    },
    "A fragile resource character who grows stronger by manufacturing Puppets.": {
      ja: "人形を作るほど成長する、耐久の低いリソース型キャラクター。",
      zh: "通过制造傀儡不断成长的脆弱资源型角色。"
    },
    "A flexible support who redistributes HP, Charge, protection, and offensive power.": {
      ja: "HP・Charge・防御・火力を柔軟に味方へ配分する支援役。",
      zh: "能够灵活转移 HP、Charge、防护和进攻能力的辅助角色。"
    },
    "A high-risk character who drains allies to fight against his own gradual decay.": {
      ja: "味方の血を利用し、自身の継続的な衰弱に抗うハイリスク型キャラクター。",
      zh: "通过吸取队友生命来对抗自身持续衰败的高风险角色。"
    },
    "A resource-control specialist who converts Charge into Juggling Balls for damage, stuns, and team support.": {
      ja: "Charge をジャグリングボールへ変換し、攻撃・スタン・支援を使い分けるリソース操作の専門家。",
      zh: "把 Charge 转化为杂耍球，并用于伤害、眩晕与团队支援的资源控制专家。"
    },
    "A volatile scaling fighter who survives by converting blood, danger, and protection into permanent life.": {
      ja: "血・危機・防御効果を恒久的な生命力へ変換して成長する、不安定なスケーリング型ファイター。",
      zh: "通过把鲜血、危险与防护转化为永久生命成长来生存的高波动成长型角色。"
    },

    // =========================
    // SKILL / PASSIVE NAMES
    // =========================
    "Guarded Strike": { ja: "防御斬撃", zh: "防御斩击" },
    "Last Stand": { ja: "背水の陣", zh: "背水一战" },
    "Arcane Blast": { ja: "奥術爆破", zh: "奥术爆破" },
    "Arcane Flow": { ja: "奥術の流れ", zh: "奥术流动" },
    "Guardian Shield": { ja: "守護シールド", zh: "守护护盾" },
    "Guardian's Burden": { ja: "守護者の重責", zh: "守护者的负担" },
    "Restoration Mark": { ja: "回復の印", zh: "恢复印记" },
    "Emergency Blessing / Overheal Barrier": { ja: "緊急祝福 / オーバーヒール障壁", zh: "紧急祝福 / 溢疗屏障" },
    "Execution": { ja: "処刑", zh: "处决" },
    "Relentless Hunt": { ja: "終わりなき追跡", zh: "无尽追猎" },
    "Royal Command": { ja: "王の号令", zh: "王之号令" },
    "Royal Presence": { ja: "王者の威光", zh: "王者威仪" },
    "Puppet Workshop": { ja: "人形工房", zh: "傀儡工坊" },
    "Puppet Mastery": { ja: "人形術の極意", zh: "傀儡精通" },
    "Divine Blessing": { ja: "神聖なる祝福", zh: "神圣祝福" },
    "Angel's Bless": { ja: "天使の加護", zh: "天使之佑" },
    "Blood Pact": { ja: "血の契約", zh: "鲜血契约" },
    "Infernal Decay": { ja: "地獄の衰弱", zh: "地狱衰败" },
    "Juggling Trick": { ja: "ジャグリング・トリック", zh: "杂耍戏法" },
    "Juggling Show": { ja: "ジャグリング・ショー", zh: "杂耍秀" },
    "Blood Drain": { ja: "吸血", zh: "吸血" },
    "Crimson Hunger": { ja: "深紅の渇き", zh: "猩红饥渴" },

    // =========================
    // CHARACTER SKILL / PASSIVE TEXT
    // =========================
    "Cost 2 Charge. Deal 3.5 damage to one enemy and gain 1 permanent Shield.": {
      ja: "Chargeを2消費。敵1体に3.5ダメージを与え、永続Shieldを1得る。",
      zh: "消耗2 Charge：对一个敌人造成3.5伤害，并获得1点永久护盾。"
    },
    "When HP is below 4, damaging attacks deal +1 damage. At 1 HP or lower, the bonus becomes +2 instead.": {
      ja: "HPが4未満なら攻撃系行動のダメージ+1。HPが1以下ならボーナスは+2になる。",
      zh: "HP低于4时，伤害型攻击+1；HP不高于1时，该增益改为+2。"
    },
    "Spend 2+ Charge. At 2 Charge, deal 2.5 damage to the main target and 1 damage to the other enemy. Each additional Charge adds +1 main-target damage and +0.5 secondary-target damage. After Arcane Blast resolves, restore 1.5 HP.": {
      ja: "Chargeを2以上消費。2Cでは主対象に2.5、もう1体に1ダメージ。追加Chargeごとに主対象+1、副対象+0.5。解決後、自身のHPを1.5回復。",
      zh: "消耗2+ Charge。2C时主目标2.5、另一个敌人1伤害；每额外1 Charge，主目标+1、副目标+0.5。技能结算后恢复1.5 HP。"
    },
    "Starts with 1 Charge. While HP is above 3, gain 1 Charge every 3 completed rounds.": {
      ja: "開始時Charge 1。HPが3より高い間、3ラウンド完了ごとにCharge +1。",
      zh: "开局1 Charge。HP高于3时，每3个完整回合获得1 Charge。"
    },
    "Cost 2 Charge. Give the teammate 4 Shield for two rounds. Recasting refreshes the Shield instead of stacking it.": {
      ja: "Chargeを2消費。味方に4 Shieldを2ラウンド付与。再使用時は重複せず持続時間を更新する。",
      zh: "消耗2 Charge：给予队友4点护盾，持续2回合；再次施放会刷新而非叠加。"
    },
    "Whenever the teammate would take HP damage, Tank redirects up to 1 of that damage to himself. Redirected damage ignores Tank's Shield. Every 4 completed rounds, Tank gains +0.5 Max HP, restores 0.5 HP, and gains +0.5 permanent Shield.": {
      ja: "味方がHPダメージを受ける時、そのうち最大1をTankが直接引き受ける。転送ダメージはTankのShieldを無視。4ラウンド完了ごとにMax HP+0.5、HP0.5回復、永続Shield+0.5。",
      zh: "队友受到实际HP伤害时，Tank最多把其中1点重定向到自己；该伤害无视Tank护盾。每4个完整回合：最大HP+0.5、恢复0.5 HP、永久护盾+0.5。"
    },
    "Spend 2+ Charge on any living team member. Immediately heal 3 HP and apply a Restoration Mark for two round-end heals of 1 HP each. If the target has 2 HP or less before the immediate heal, that first heal gains +1.5. Each extra Charge adds +1 to the immediate heal and +0.5 to each round-end heal.": {
      ja: "生存中の味方1人にChargeを2以上消費。即時3回復し、ラウンド終了時に1ずつ2回回復する印を付与。使用前HPが2以下なら即時回復+1.5。追加Chargeごとに即時回復+1、各継続回復+0.5。",
      zh: "对任意存活己方角色消耗2+ Charge：立即治疗3，并附加恢复印记，在两个回合结束时各治疗1。若施放前目标HP≤2，立即治疗额外+1.5。每额外1 Charge：立即治疗+1、每次持续治疗+0.5。"
    },
    "The first time Cure Mage falls below 3 HP while alive, Cure Mage and the living teammate each recover 3 HP, and Cure Mage gains 1 Charge. Healing caused by Cure Mage converts overheal beyond the first wasted point into temporary Shield that lasts up to two rounds.": {
      ja: "Cure Mageが生存中に初めてHP3未満になると、自身と生存中の味方が各3回復し、自身はCharge+1。Cure Mageによるオーバーヒールは、最初の余剰1点を除いた分が最大2ラウンド持続する一時Shieldになる。",
      zh: "Cure Mage首次在存活时降至3 HP以下：自己与存活队友各恢复3 HP，并获得1 Charge。由Cure Mage造成的溢疗中，超过第1点浪费治疗后的部分会转化为最多持续2回合的临时护盾。"
    },
    "Cost 4 Charge. Deal 6.5 damage to one enemy and become invincible until Assassin's next turn.": {
      ja: "Chargeを4消費。敵1体に6.5ダメージを与え、Assassinの次のターンまで無敵になる。",
      zh: "消耗4 Charge：对一个敌人造成6.5伤害，并在Assassin下次行动前保持无敌。"
    },
    "Starts with 1 Charge. Whenever Execution does not defeat its target, Assassin regains 1 Charge.": {
      ja: "開始時Charge 1。Executionで対象を倒せなかった場合、Chargeを1回復する。",
      zh: "开局1 Charge。Execution未击败目标时，返还1 Charge。"
    },
    "Cost 3 Charge. Deal 2.5 damage to every living enemy and stun every surviving enemy for their next action.": {
      ja: "Chargeを3消費。生存中の敵全員に2.5ダメージ。生き残った敵は次の行動がスタンする。",
      zh: "消耗3 Charge：对所有存活敌人各造成2.5伤害；存活下来的敌人下一次行动被眩晕。"
    },
    "At battle start, King's teammate permanently gains +1 Max HP and +1 HP. While King remains alive, the teammate gains 1 Shield every 3 rounds, lasting for one round.": {
      ja: "戦闘開始時、Kingの味方はMax HPと現在HPが永続+1。King生存中、3ラウンドごとに味方は1ラウンド持続するShield 1を得る。",
      zh: "战斗开始时，King的队友永久获得+1最大HP和+1当前HP。King存活期间，每3回合队友获得1点持续1回合的护盾。"
    },
    "Spend 3 Charge to create 1 regular Puppet. A regular Puppet can distribute 5 total damage between enemies, or be converted into a Life Puppet that revives a team member once at 50% Max HP.": {
      ja: "Chargeを3消費して通常Puppetを1体作成。通常Puppetは敵へ合計5ダメージを分配するか、味方をMax HPの50%で1度復活させるLife Puppetへ変換できる。",
      zh: "消耗3 Charge制造1个普通傀儡。普通傀儡可在敌人之间分配总计5点伤害，或转化为生命傀儡，使己方角色以50%最大HP复活一次。"
    },
    "Starts with 1 Life Puppet and 1 Charge, but no regular Puppets. Every newly created Puppet grants +1 permanent Shield, +0.5 Max HP, and restores 0.5 HP.": {
      ja: "開始時Life Puppet 1体とCharge 1、通常Puppetは0。新しい通常Puppetを作るたび、永続Shield+1、Max HP+0.5、HP0.5回復。",
      zh: "开局拥有1个生命傀儡和1 Charge，但没有普通傀儡。每制造一个普通傀儡：永久护盾+1、最大HP+0.5、恢复0.5 HP。"
    },
    "Transfer any amount of Angel's Charge to the teammate. Empower costs 2+ Charge: 2 Charge gives +1 damage to the teammate's next damaging action and 1 permanent Shield; each extra Charge adds +0.5 damage and +0.5 Shield. Or spend 1 Charge to transfer up to 2 HP from Angel to the teammate.": {
      ja: "AngelのChargeを任意量味方へ移せる。Empowerは2+ Charge：2Cで味方の次の攻撃系行動+1ダメージ、永続Shield+1。追加Chargeごとに+0.5ダメージ/+0.5 Shield。ほかに1 ChargeでAngelから味方へ最大2 HPを移せる。",
      zh: "可把Angel任意数量的Charge转给队友。Empower消耗2+ Charge：2C使队友下一次伤害行动+1伤害并获得1永久护盾；每额外1C再+0.5伤害/+0.5护盾。也可消耗1 Charge，把Angel最多2 HP转给队友。"
    },
    "Starts with 2 Charge. The first defeated member of Angel's team revives with 2 HP and 2 permanent Shield. The first time Angel reaches 2 HP or lower while alive, her next damaging action gains +2 damage.": {
      ja: "開始時Charge 2。Angelのチームで最初に倒れたキャラクターは2 HPと永続Shield 2で復活。Angelが生存中に初めてHP2以下になると、次の攻撃系行動+2ダメージ。",
      zh: "开局2 Charge。Angel队伍中第一个被击败的角色以2 HP和2点永久护盾复活。Angel首次在存活时降至2 HP或以下后，下一次伤害行动+2。"
    },
    "Blood Drain: drain up to 5 HP from the teammate. Devil permanently gains Max HP equal to the amount drained and restores the same amount of HP. The teammate gains Shield equal to drained HP +1 for three rounds. Berserk: spend 2 Charge to enter Berserk for two rounds, immediately distribute 4.5 total damage among living enemies, restore 1.5 HP, and gain 1.5 permanent Shield. Skills cannot be used during Berserk.": {
      ja: "Blood Drain：味方から最大5 HP吸収。Devilは吸収量と同じMax HPを永続獲得し、同量回復。味方は吸収量+1のShieldを3ラウンド得る。Berserk：Charge 2で2ラウンドのBerserkへ入り、生存中の敵へ合計4.5ダメージを分配、HP1.5回復、永続Shield1.5。Berserk中はスキル使用不可。",
      zh: "Blood Drain：最多吸取队友5 HP。Devil永久增加等量最大HP并恢复等量HP；队友获得“吸取量+1”的护盾，持续3回合。Berserk：消耗2 Charge进入持续两回合的狂暴，立即在存活敌人之间分配总计4.5伤害，恢复1.5 HP并获得1.5永久护盾。狂暴期间无法使用技能。"
    },
    "At the end of every round, Devil loses 0.5 HP and 0.5 Max HP. During Berserk, Devil instead loses 1 HP while Max HP still falls by 0.5. At 8 HP or lower, normal attacks gain +1 damage. During Berserk, the next normal attack gains another +1.5; if it leaves the target alive at 4 HP or lower, Devil restores 2 HP.": {
      ja: "各ラウンド終了時、DevilはHP-0.5、Max HP-0.5。Berserk中はHP-1、Max HP-0.5。HP8以下では通常攻撃+1。Berserk中の次の通常攻撃はさらに+1.5し、対象が生存かつHP4以下ならHP2回復。",
      zh: "每回合结束时Devil失去0.5 HP和0.5最大HP；狂暴期间改为失去1 HP，最大HP仍-0.5。HP≤8时普攻+1。狂暴期间下一次普攻再+1.5；若目标存活且HP≤4，Devil恢复2 HP。"
    },
    "Create any number of Juggling Balls by spending the same amount of Charge, or throw Balls. 1 Ball: deal 1 damage and stun the target for 1 action, or deal 2 damage. 2 Balls: give a living ally 1 Charge. If Joker starts the throw with at least 3 Balls, Joker may throw up to 3 ordinary Balls in one action; Triple Throw cannot include Charge Ball.": {
      ja: "任意量のChargeを同数のJuggling Ballへ変換、またはBallを投げる。1 Ball：1ダメージ+1行動スタン、または2ダメージ。2 Balls：生存中の味方1人にCharge+1。投擲開始時にBallが3個以上なら、通常Ballを1行動で最大3個投げられる。Triple ThrowにCharge Ballは含められない。",
      zh: "可把任意数量Charge转换成等量杂耍球，或投掷球。1球：造成1伤害并眩晕目标1次行动，或造成2伤害。2球：使一个存活己方角色获得1 Charge。若投掷开始时至少有3球，一次行动最多可投3个普通球；三投不能包含Charge Ball。"
    },
    "Starts with 2 Juggling Balls and 1 Charge. Every 2 completed rounds, gain 1 Charge. At round end, if Charge is at least 3, automatically spend 1 Charge to create 1 Ball. Every 6 ordinary Balls thrown grants Joker invincibility until the next turn and gives the whole living team 1 permanent Shield.": {
      ja: "開始時Juggling Ball 2個とCharge 1。2ラウンド完了ごとにCharge+1。ラウンド終了時Chargeが3以上なら自動で1 Chargeを消費してBallを1個作る。通常Ballを累計6個投げるごとに、Jokerは次のターンまで無敵になり、生存中の味方全員が永続Shield1を得る。",
      zh: "开局2个杂耍球和1 Charge。每2个完整回合获得1 Charge。回合末若Charge≥3，会自动消耗1 Charge制造1球。每累计投出6个普通球，Joker在下次行动前无敌，并使所有存活己方角色获得1点永久护盾。"
    },
    "Drain up to 3.5 HP from the living teammate, reducing the teammate's Max HP by max(0, drained HP - 1), while Vampire gains and restores the drained amount as Max HP. Or spend 3 Charge to heal 2.5 HP, or directly drain 1.5 HP from one enemy and gain 1.5 HP and Max HP.": {
      ja: "生存中の味方から最大3.5 HP吸収。味方のMax HPをmax(0, 吸収量-1)減らし、Vampireは吸収量と同じHP/Max HPを獲得・回復。ほかにCharge 3で自身を2.5回復、または敵1体から1.5 HPを直接吸収し、自身のHP/Max HPを1.5増やす。",
      zh: "最多吸取存活队友3.5 HP，使队友最大HP减少max(0, 吸取量-1)，同时Vampire增加并恢复等量HP/最大HP。也可消耗3 Charge恢复自己2.5 HP，或直接吸取一个敌人1.5 HP并增加/恢复自身1.5 HP和最大HP。"
    },
    "Max HP cannot exceed 15. Every 3 completed rounds, lose 1.5 HP and 0.5 Max HP, but this decay cannot defeat Vampire. Every 4 completed rounds gain 1 Charge. While the teammate lives, incoming damage is reduced by 0.5. Normal attacks that hit grant +0.5 Max HP and restore 0.5 HP. If Vampire starts a normal attack above 10 HP, after that attack Max HP is reset to 9.5 before the +0.5 normal-attack growth is applied. The first defeat can drain half the living teammate's HP to revive at 3 HP. At 10+ HP, each HP from 10 onward adds +0.5 normal-attack damage. The first time the teammate reaches 2 HP or lower, Vampire gains +3.5 HP and Max HP and the teammate gains 2 permanent Shield. While the teammate is at 2 HP or lower or defeated, Vampire gains +1.5 normal-attack damage and every 2 rounds gains +1.5 HP and Max HP. Vampire cannot keep Shield: received Shield instead grants max(0, Shield - 2) HP and Max HP.": {
      ja: "Max HPは15を超えない。3ラウンド完了ごとにHP-1.5、Max HP-0.5。ただしこの衰弱では倒れない。4ラウンドごとにCharge+1。味方生存中は被ダメージ-0.5。通常攻撃命中でMax HP+0.5、HP0.5回復。通常攻撃開始時にHPが10を超えている場合、攻撃終了後にMax HPを9.5へ戻し、その後に通常攻撃の+0.5成長を適用する。最初の死亡時、生存中の味方の現在HPの半分を吸収して3 HPで復活。HP10以上では10からの各HPごとに通常攻撃+0.5。味方が初めてHP2以下になるとHP/Max HP+3.5、味方は永続Shield2。味方がHP2以下または死亡中、通常攻撃+1.5、2ラウンドごとにHP/Max HP+1.5。Shieldは保持できず、受け取ったShieldはmax(0, Shield-2)のHP/Max HPに変換される。",
      zh: "最大HP不能超过15。每3个完整回合失去1.5 HP和0.5最大HP，但该衰败不会直接击败Vampire。每4个完整回合获得1 Charge。队友存活时，受到伤害-0.5。普通攻击命中后最大HP+0.5并恢复0.5 HP。若普通攻击开始时Vampire当前HP>10，则该次普通攻击结束后先把最大HP重置为9.5，再触发普通攻击的+0.5最大HP/回血成长。首次被击败时可吸取存活队友当前HP的一半并以3 HP复活。HP≥10时，从10开始每1点HP使普攻+0.5。队友首次降至2 HP或以下时，Vampire获得+3.5 HP/最大HP，队友获得2永久护盾。队友HP≤2或已死亡时，Vampire普攻+1.5，并每2回合获得+1.5 HP/最大HP。Vampire无法保留护盾；获得护盾时会改为获得max(0, 护盾量-2)的HP与最大HP。"
    }
  };





  // =====================================================
  // ONLINE SYSTEM UPDATE — GOOGLE / SIDE SELECT / REMATCH
  // =====================================================
  Object.assign(exact, {
    "Sign in with Google": { ja: "Googleでログイン", zh: "使用Google登录" },
    "Sign Out": { ja: "ログアウト", zh: "退出登录" },
    "Sign in with Google or continue as Guest to play Online PvP.": { ja: "Googleでログインするか、ゲストとしてOnline PvPをプレイできます。", zh: "使用Google登录或以游客身份即可进行在线PvP。" },
    "Sign in with Google or continue as Guest.": { ja: "Googleでログインするか、ゲストとして続行してください。", zh: "请使用Google登录或以游客身份继续。" },
    "PvP Leaderboard": { ja: "PvPランキング", zh: "PvP排行榜" },
    "🏆 PvP Leaderboard": { ja: "🏆 PvPランキング", zh: "🏆 PvP排行榜" },
    "Win +1 • Loss -1": { ja: "勝利 +1 • 敗北 -1", zh: "胜利 +1 • 失败 -1" },
    "Score: —": { ja: "スコア: —", zh: "积分：—" },
    "Choose Your Side": { ja: "サイドを選択", zh: "选择阵营" },
    "Choose Team A": { ja: "Team Aを選択", zh: "选择Team A" },
    "Choose Team B": { ja: "Team Bを選択", zh: "选择Team B" },
    "ONLINE PVP — CHOOSE YOUR SIDE": { ja: "ONLINE PVP — サイド選択", zh: "ONLINE PVP — 选择阵营" },
    "Both players must choose opposite sides before BP begins.": { ja: "BP開始前に、両プレイヤーは別々のサイドを選択する必要があります。", zh: "BP开始前，双方必须选择不同阵营。" },
    "🏳️ Surrender": { ja: "🏳️ 降参", zh: "🏳️ 投降" },
    "Surrender": { ja: "降参", zh: "投降" },
    "Online Match Complete": { ja: "オンライン対戦終了", zh: "在线对局结束" },
    "🔁 Rematch": { ja: "🔁 再戦", zh: "🔁 再来一局" },
    "Rematch": { ja: "再戦", zh: "再来一局" },
    "Rematch ✓": { ja: "再戦 ✓", zh: "再来一局 ✓" },
    "🚪 Exit Room": { ja: "🚪 ルーム退出", zh: "🚪 退出房间" },
    "Exit Room": { ja: "ルーム退出", zh: "退出房间" },
    "Both players must choose Rematch to play again.": { ja: "両プレイヤーが再戦を選ぶと次の試合を開始します。", zh: "双方都选择“再来一局”后才会开始下一局。" },
    "Waiting for the opponent to choose Rematch...": { ja: "相手の再戦選択を待っています...", zh: "正在等待对手选择再来一局..." },
    "Opponent requested a rematch.": { ja: "相手が再戦を希望しています。", zh: "对手请求再来一局。" },
    "Both players are ready. Starting a new game...": { ja: "両者準備完了。新しい試合を開始します...", zh: "双方已准备，正在开始新一局..." },
    "This room was closed by a player.": { ja: "プレイヤーがルームを閉じました。", zh: "有玩家已关闭房间。" },
    "Rematch is unavailable because the room is closed.": { ja: "ルームが閉じているため再戦できません。", zh: "房间已关闭，无法再来一局。" },
    "Draw. No leaderboard point is awarded.": { ja: "引き分け。ランキングポイントは加算されません。", zh: "平局，不增加排行榜积分。" },
    "No ranked matches yet.": { ja: "まだランキング対戦記録がありません。", zh: "目前还没有排行榜对局记录。" },
    "Sign in or continue as Guest to view the leaderboard.": { ja: "ログインまたはゲストとして続行するとランキングを閲覧できます。", zh: "登录或以游客身份继续即可查看排行榜。" }
  });

  // =====================================================
  // BALANCE UPDATE 2 — FIGHTER / ASSASSIN / KING
  // =====================================================
  Object.assign(exact, {
    "When HP is below 4, damaging attacks deal +1 damage. At 1 HP or lower, the bonus becomes +2 instead. The first time Fighter would be defeated by reaching 0 HP, Fighter remains at 1 HP instead and becomes invincible until Fighter's next turn.": {
      ja: "HP4未満ではダメージ攻撃+1。HP1以下ではボーナスは+2。さらに、Fighterが初めてHP0になって倒される時、代わりにHP1で踏みとどまり、次の自分のターンまで無敵になる。",
      zh: "HP低于4时，造成伤害的攻击+1伤害；HP不高于1时，改为+2。除此之外，Fighter第一次因HP降至0而将被击败时，不会被击败，而是保持1 HP，并在自己下次行动前获得无敌。"
    },
    "Cost 4 Charge. Deal 6.5 damage to one enemy and become invincible until Assassin's next turn. If the target survives, refund 2 Charge.": {
      ja: "4 Chargeを消費。敵1体に6.5ダメージを与え、Assassinの次のターンまで無敵になる。対象が生存した場合、2 Chargeを返還。",
      zh: "消耗4 Charge：对1名敌人造成6.5伤害，并在Assassin下次行动前获得无敌。若目标存活，返还2 Charge。"
    },
    "Starts with 0 Charge. Once per battle, Assassin reduces one incoming damage instance by 1. Execution refunds 2 Charge whenever its target survives.": {
      ja: "開始時Chargeは0。1戦につき1回、受けるダメージ1回を1軽減する。Executionの対象が生存した場合、2 Chargeを返還。",
      zh: "开局Charge为0。每场战斗仅一次，Assassin可使一次受到的伤害减少1点。Execution未击败目标时，返还2 Charge。"
    },
    "Cost 2 Charge. Deal 2.5 total damage to one chosen main target, stun that target for its next action if it survives, and give King and the living teammate 0.5 permanent Shield each.": {
      ja: "2 Chargeを消費。選択した主対象1体に合計2.5ダメージ。対象が生存した場合、次の行動を1回スタン。Kingと生存中の味方はそれぞれ永続Shield+0.5。",
      zh: "消耗2 Charge：对选择的主目标造成总计2.5伤害；若目标存活，则眩晕其下一次行动。King与存活队友各获得0.5点永久护盾。"
    },
    "👑 Royal Command — Choose Main Target": {
      ja: "👑 王の号令 — 主対象を選択",
      zh: "👑 王之号令 — 选择主目标"
    },
    "Deal 2.5 total damage to the chosen main target. If it survives, stun it for 1 action. King and the living teammate gain 0.5 permanent Shield.": {
      ja: "選択した主対象に合計2.5ダメージ。生存した場合は1行動スタン。Kingと生存中の味方は永続Shield+0.5。",
      zh: "对选择的主目标造成总计2.5伤害。若其存活，眩晕1次行动。King与存活队友获得0.5点永久护盾。"
    },
    "⚔️ Last Stand Ready": {
      ja: "⚔️ Last Stand 使用可能",
      zh: "⚔️ 背水一战可用"
    },
    "🗡️ Guard 1": {
      ja: "🗡️ ガード 1",
      zh: "🗡️ 抵挡 1"
    }
  });

  // =====================================================
  // BALANCE UPDATE — 2026-09-15
  // =====================================================
  Object.assign(exact, {
    "Cost 2 Charge. Give the teammate 3.5 Shield for two rounds. Recasting refreshes the Shield instead of stacking it.": {
      ja: "Chargeを2消費。味方に3.5 Shieldを2ラウンド付与。再使用時は重複せず持続時間を更新する。",
      zh: "消耗2 Charge：给予队友3.5点护盾，持续2回合；再次施放会刷新而非叠加。"
    },
    "Whenever the teammate would take HP damage, Tank redirects up to 0.5 of that damage to himself. Redirected damage ignores Tank's Shield. Every 4 completed rounds, Tank gains +0.5 Max HP, restores 0.5 HP, and gains 0.5 permanent Shield.": {
      ja: "味方がHPダメージを受ける時、そのうち最大0.5をTankが直接引き受ける。転送ダメージはTankのShieldを無視。4ラウンド完了ごとにMax HP+0.5、HP0.5回復、永続Shield+0.5。",
      zh: "队友受到实际HP伤害时，Tank最多把其中0.5点重定向到自己；该伤害无视Tank护盾。每4个完整回合：最大HP+0.5、恢复0.5 HP、永久护盾+0.5。"
    },
    "Blood Drain: drain up to 5 HP from the teammate. Devil permanently gains Max HP equal to the amount drained and restores the same amount of HP. The teammate gains Shield equal to drained HP +1 for three rounds. Berserk: spend 2 Charge to enter Berserk for three rounds, immediately distribute 4 total damage among living enemies, stun the main target for 1 action if it survives, restore 1.5 HP, and gain 1.5 permanent Shield. Skills cannot be used during Berserk.": {
      ja: "Blood Drain：味方から最大5 HPを吸収し、同量のMax HPを永続的に得て同量回復。味方は吸収量+1のShieldを3ラウンド得る。Berserk：2 Chargeを消費して3ラウンド狂暴化し、敵へ合計4ダメージを分配、主対象が生存していれば1行動スタン、自身は1.5 HP回復し永続Shield+1.5。狂暴中はスキル使用不可。",
      zh: "吸血：最多吸取队友5 HP，Devil永久获得等量最大HP并恢复等量HP；队友获得“吸取量+1”的护盾，持续3回合。狂暴：消耗2 Charge，进入持续3回合的狂暴，立即在存活敌人之间分配总计4点伤害；若主目标存活，则眩晕其1次行动；自身恢复1.5 HP并获得1.5永久护盾。狂暴期间不能使用技能。"
    },
    "At the end of every round, Devil loses 0.5 HP and 0.5 Max HP. During Berserk, Devil instead loses 1 HP while Max HP still falls by 0.5. At 8 HP or lower, normal attacks gain +1 damage. During Berserk, the next normal attack gains another +1.5; if it leaves the target alive at 4 HP or lower, Devil restores 2 HP. When Devil starts a normal attack at 3 HP or lower, Devil restores 1 HP after the attack. When Berserk ends, Devil restores 0.5 HP and is stunned for the next turn.": {
      ja: "毎ラウンド終了時にHP-0.5、Max HP-0.5。Berserk中はHP-1、Max HP-0.5。HP8以下で通常攻撃+1ダメージ。Berserk中の次の通常攻撃はさらに+1.5し、対象が生存してHP4以下ならDevilは2 HP回復。通常攻撃開始時にHP3以下なら、攻撃後さらに1 HP回復。Berserk終了時に0.5 HP回復し、次のターンはスタン。",
      zh: "每回合结束时，Devil失去0.5 HP和0.5最大HP；狂暴期间改为失去1 HP，但最大HP仍减少0.5。HP不高于8时，普攻+1伤害；狂暴期间下一次普攻再+1.5，若目标存活且HP不高于4，则Devil恢复2 HP。若Devil开始普攻时HP不高于3，攻击结束后再恢复1 HP。狂暴结束时恢复0.5 HP，并眩晕自己的下一次行动。"
    },
    "Create any number of Juggling Balls by spending the same amount of Charge, or throw Balls. 1 Ball: deal 1 damage and stun the target for 1 action, or deal 2 damage. 2 Balls: give a living ally 1 Charge. Joker may throw at most 2 ordinary Balls in one action. After a Stun Ball is thrown, Stun Ball has a 1-round cooldown.": {
      ja: "Chargeを同量消費して任意数のJuggling Ballを作成、またはBallを投げる。1 Ball：1ダメージ+1行動スタン、または2ダメージ。2 Balls：生存中の味方にCharge+1。1回の行動で通常Ballは最大2個まで。Stun Ball使用後は1ラウンドのクールダウン。",
      zh: "可消耗等量Charge制造任意数量的杂耍球，或投掷球。1球：造成1伤害并眩晕目标1次行动，或造成2伤害。2球：使一名存活队友获得1 Charge。一次行动最多投掷2个普通球。Stun Ball使用后进入1回合冷却。"
    },
    "Starts with 2 Juggling Balls and 1 Charge. Every 2 completed rounds, gain 1 Charge. At round end, if Charge is at least 3, automatically spend 1 Charge to create 1 Ball. Every 5 ordinary Balls thrown grants Joker invincibility until the next turn and gives the whole living team 1 permanent Shield.": {
      ja: "開始時Juggling Ball 2個、Charge 1。2ラウンド完了ごとにCharge+1。ラウンド終了時にChargeが3以上なら自動で1消費してBallを1個作成。通常Ballを累計5個投げるごとに次の自分のターンまで無敵となり、生存中の味方全員に永続Shield+1。",
      zh: "开局拥有2个杂耍球和1 Charge。每2个完整回合获得1 Charge。回合结束时若Charge至少为3，自动消耗1 Charge制造1球。每累计投出5个普通球，Joker获得直到下次行动前的无敌，并使所有存活队友获得1点永久护盾。"
    },
    "Max HP cannot exceed 15. Every 3 completed rounds, lose 1.5 HP and 0.5 Max HP, but this decay cannot defeat Vampire. Every 4 completed rounds gain 1 Charge. While the teammate lives, incoming damage is reduced by 0.5. Normal attacks that hit grant +0.5 Max HP and restore 0.5 HP. If Vampire starts a normal attack above 10 HP, after that attack Max HP is reset to 9.5 before the +0.5 normal-attack growth is applied. The first defeat can drain half the living teammate's HP to revive at 3 HP. At 10+ HP, each HP from 10 onward adds +0.5 normal-attack damage. The first time the teammate reaches 2 HP or lower, Vampire gains +3.5 HP and Max HP and the teammate gains 2 permanent Shield. While the teammate is at 2 HP or lower or defeated, Vampire gains +1.5 normal-attack damage and every 3 rounds gains +1 HP and Max HP. Vampire cannot keep Shield: received Shield instead grants max(0, Shield - 2) HP and Max HP.": {
      ja: "Max HP上限は15。3ラウンド完了ごとにHP-1.5、Max HP-0.5（この衰弱では死亡しない）。4ラウンド完了ごとにCharge+1。味方生存中は被ダメージ-0.5。通常攻撃が命中するとMax HP+0.5、HP0.5回復。通常攻撃開始時にHPが10より高い場合、攻撃後にMax HPを9.5へ戻してから通常攻撃成長+0.5を適用。初回死亡時は生存中の味方の現在HPの半分を吸収して3 HPで復活。HP10以上では10から1 HPごとに通常攻撃+0.5ダメージ。味方が初めてHP2以下になるとVampireはHP/Max HP+3.5、味方は永続Shield+2。味方がHP2以下または死亡中、通常攻撃+1.5ダメージ、さらに3ラウンドごとにHP/Max HP+1。VampireはShieldを保持できず、受けたShieldのmax(0, Shield-2)をHPとMax HPへ変換。",
      zh: "最大HP上限为15。每3个完整回合失去1.5 HP和0.5最大HP，但该衰减不能击败Vampire；每4个完整回合获得1 Charge。队友存活时，受到的每次伤害-0.5。普攻命中后获得+0.5最大HP并恢复0.5 HP。若普攻开始时Vampire HP>10，则该次攻击结束后先把最大HP重置为9.5，再结算普攻带来的+0.5成长。第一次被击败时，可吸取存活队友当前HP的一半并以3 HP复活。HP达到10以上后，从10开始每多1 HP，普攻+0.5伤害。队友第一次降至2 HP或以下时，Vampire获得+3.5 HP/最大HP，队友获得2点永久护盾。队友HP不高于2或死亡时，Vampire普攻+1.5伤害，并改为每3回合获得+1 HP和+1最大HP。Vampire无法保留护盾：收到护盾时，改为获得max(0, 护盾-2)的HP与最大HP。"
    },
    "🤹 Stun Ball — 1 Damage + 1 Stun": {
      ja: "🤹 Stun Ball — 1ダメージ + 1スタン",
      zh: "🤹 眩晕球 — 1伤害 + 1次眩晕"
    },
    "Ready": { ja: "使用可能", zh: "可用" },
    "Main target:": { ja: "主対象:", zh: "主目标：" },
    "Secondary target:": { ja: "副対象:", zh: "副目标：" }
  });

  // =====================================================
  // STAGE 2 / FULL UI TRANSLATIONS
  // =====================================================
  Object.assign(exact, {
    "Ban one character, draft two unique characters, and defeat the enemy team.": {
      ja: "キャラクターを1人BANし、重複しない2人をドラフトして相手チームを倒そう。",
      zh: "禁用1名角色，选择2名不重复的角色，并击败敌方队伍。"
    },
    "✅ Confirm Action": { ja: "✅ 行動を確定", zh: "✅ 确认行动" },
    "💥 Choose Charge Amount": { ja: "💥 Charge量を選択", zh: "💥 选择Charge数量" },
    "Main target / secondary target damage": { ja: "主対象 / 副対象のダメージ", zh: "主目标 / 副目标伤害" },
    "💚 Restoration Mark — Choose Charge Amount": { ja: "💚 回復の印 — Charge量を選択", zh: "💚 恢复印记 — 选择Charge数量" },
    "Overheal beyond the first wasted HP becomes temporary Shield for up to two rounds.": {
      ja: "最初の余剰1 HPを超えるオーバーヒールは、最大2ラウンド持続する一時Shieldになる。",
      zh: "超过第1点浪费治疗的溢疗会转化为最多持续2回合的临时护盾。"
    },
    "No living teammate.": { ja: "生存中の味方がいません。", zh: "没有存活的队友。" },
    "No valid Life Puppet target.": { ja: "有効なLife Puppet対象がいません。", zh: "没有可用的生命傀儡目标。" },

    "Defending": { ja: "防御中", zh: "防御中" },
    "Invincible": { ja: "無敵", zh: "无敌" },
    "Stunned": { ja: "スタン", zh: "眩晕" },
    "Pending Death": { ja: "死亡保留中", zh: "待死亡" },
    "Berserk": { ja: "狂暴", zh: "狂暴" },
    "Berserk Active": { ja: "狂暴中", zh: "狂暴生效中" },
    "Life Puppet Attached": { ja: "Life Puppet装着済み", zh: "已附加生命傀儡" },
    "Bless Used": { ja: "祝福 使用済み", zh: "祝福已使用" },
    "Bless Ready": { ja: "祝福 準備完了", zh: "祝福可用" },
    "Emergency Ready": { ja: "緊急祝福 準備完了", zh: "紧急祝福可用" },
    "Rebirth Used": { ja: "再生 使用済み", zh: "重生已使用" },
    "Rebirth Ready": { ja: "再生 準備完了", zh: "重生可用" },
    "ACTIVE": { ja: "発動中", zh: "生效中" },
    "Inactive": { ja: "未発動", zh: "未生效" },

    "Regular Puppets:": { ja: "通常Puppet:", zh: "普通傀儡：" },
    "Life Puppets:": { ja: "Life Puppet:", zh: "生命傀儡：" },
    "Restoration Mark:": { ja: "回復の印:", zh: "恢复印记：" },
    "Juggling Balls:": { ja: "ジャグリングボール:", zh: "杂耍球：" },
    "Balls Thrown:": { ja: "投げたボール:", zh: "已投掷球数：" },
    "Teammate Crisis:": { ja: "味方危機状態:", zh: "队友危机状态：" },
    "Normal ATK Bonus:": { ja: "通常攻撃ボーナス:", zh: "普攻加成：" },
    "Shield Conversion:": { ja: "Shield変換:", zh: "护盾转换：" },
    "Next Damage:": { ja: "次のダメージ:", zh: "下一次伤害：" },

    "⚡ Transfer Charge": { ja: "⚡ Charge移転", zh: "⚡ 转移Charge" },
    "✨ Empower — 2+ Charge": { ja: "✨ 強化 — 2+ Charge", zh: "✨ 强化 — 2+ Charge" },
    "❤️ Life Transfer — 1 Charge": { ja: "❤️ 生命移転 — 1 Charge", zh: "❤️ 生命转移 — 1 Charge" },
    "Create Puppet — 3 Charge": { ja: "Puppet作成 — 3 Charge", zh: "制造傀儡 — 3 Charge" },
    "🎭 Puppet Assault": { ja: "🎭 Puppet Assault", zh: "🎭 傀儡突袭" },
    "🧵 Life Puppet": { ja: "🧵 Life Puppet", zh: "🧵 生命傀儡" },

    "Stun Ball": { ja: "スタンボール", zh: "眩晕球" },
    "Heavy Ball": { ja: "ヘビーボール", zh: "重击球" },
    "Charge Ball": { ja: "チャージボール", zh: "充能球" },
    "Juggling Ball": { ja: "ジャグリングボール", zh: "杂耍球" },
    "1 Damage + 1 Stun": { ja: "1ダメージ + 1スタン", zh: "1伤害 + 1次眩晕" },
    "2 Balls → Ally gains 1 Charge": { ja: "2 Balls → 味方Charge +1", zh: "2球 → 队友获得1 Charge" },
    "🎪 Create Juggling Balls": { ja: "🎪 ジャグリングボール作成", zh: "🎪 制造杂耍球" },
    "🎯 Throw Juggling Ball(s)": { ja: "🎯 ジャグリングボールを投げる", zh: "🎯 投掷杂耍球" },
    "⚡ Charge Ball — 2 Balls": { ja: "⚡ チャージボール — 2 Balls", zh: "⚡ 充能球 — 2球" },
    "🤹 Stun Ball — 1 Damage + 1 Stun": { ja: "🤹 スタンボール — 1ダメージ + 1スタン", zh: "🤹 眩晕球 — 1伤害 + 1次眩晕" },
    "💥 Heavy Ball — 2 Damage": { ja: "💥 ヘビーボール — 2ダメージ", zh: "💥 重击球 — 2伤害" },

    "🩸 Drain Teammate": { ja: "🩸 味方から吸血", zh: "🩸 吸取队友" },
    "❤️ Self Heal — 3 Charge": { ja: "❤️ 自己回復 — 3 Charge", zh: "❤️ 自我治疗 — 3 Charge" },
    "🩸 Enemy Drain — 3 Charge": { ja: "🩸 敵吸血 — 3 Charge", zh: "🩸 吸取敌人 — 3 Charge" },
    "🩸 Blood Drain": { ja: "🩸 Blood Drain", zh: "🩸 吸血" },
    "🔥 Berserk — 2 Charge": { ja: "🔥 狂暴 — 2 Charge", zh: "🔥 狂暴 — 2 Charge" },

    "👑 Royal Shield": { ja: "👑 Royal Shield", zh: "👑 王者护盾" },
    "🛡️ Guardian Shield": { ja: "🛡️ Guardian Shield", zh: "🛡️ 守护护盾" },
    "🛡️ Shield": { ja: "🛡️ Shield", zh: "🛡️ 护盾" },

    "🌐 Waiting for battle state...": { ja: "🌐 バトル状態を待機中...", zh: "🌐 正在等待战斗状态..." },
    "Waiting for the other player...": { ja: "相手プレイヤーを待っています...", zh: "正在等待另一名玩家..." },
    "The other player is choosing an action.": { ja: "相手プレイヤーが行動を選択中です。", zh: "另一名玩家正在选择行动。" },

    "ONLINE BATTLE": { ja: "オンラインバトル", zh: "在线战斗" },
    "Connected. Create a room or join one.": { ja: "接続完了。ルームを作成するか参加してください。", zh: "连接成功。请创建或加入房间。" },
    "Creating room...": { ja: "ルーム作成中...", zh: "正在创建房间..." },
    "Joining room...": { ja: "ルーム参加中...", zh: "正在加入房间..." },
    "Joined as Team B.": { ja: "Team B として参加しました。", zh: "已作为Team B加入。" },
    "Room closed.": { ja: "ルームが閉じられました。", zh: "房间已关闭。" },
    "Player B connected. Starting draft...": { ja: "Player Bが接続しました。ドラフトを開始します...", zh: "Player B已连接，开始BP..." },
    "Enter a valid 6-character room code.": { ja: "有効な6文字のルームコードを入力してください。", zh: "请输入有效的6位房间码。" },

    // Current source variants that differed slightly from the older dictionary.
    "Spend 2+ Charge. At 2 Charge, deal 2.5 damage to the main target and 1 damage to the other enemy. Each additional Charge adds +1 main-target damage and +0.5 secondary-target damage. After Arcane Blast, recover 1.5 HP.": {
      ja: "Chargeを2以上消費。2Cでは主対象に2.5、もう1体に1ダメージ。追加Chargeごとに主対象+1、副対象+0.5。Arcane Blast後、自身のHPを1.5回復。",
      zh: "消耗2+ Charge。2C时主目标2.5、另一个敌人1伤害；每额外1 Charge，主目标+1、副目标+0.5。奥术爆破后恢复1.5 HP。"
    },
    "Whenever the teammate would take HP damage, Tank redirects up to 1 of that damage to himself. Redirected damage ignores Tank's Shield. Every 4 completed rounds, Tank gains +0.5 Max HP, restores 0.5 HP, and gains 0.5 permanent Shield.": {
      ja: "味方がHPダメージを受ける時、そのうち最大1をTankが直接引き受ける。転送ダメージはTankのShieldを無視。4ラウンド完了ごとにMax HP+0.5、HP0.5回復、永続Shield+0.5。",
      zh: "队友受到实际HP伤害时，Tank最多把其中1点重定向到自己；该伤害无视Tank护盾。每4个完整回合：最大HP+0.5、恢复0.5 HP、永久护盾+0.5。"
    }
  });


  // =====================================================
  // GOOGLE + GUEST PVP
  // =====================================================
  Object.assign(exact, {
    "Continue as Guest": {
      ja: "ゲストとして続行",
      zh: "游客登录"
    },
    "Signing in as Guest...": {
      ja: "ゲストとしてログイン中...",
      zh: "正在以游客身份登录..."
    },
    "Guest mode — PvP enabled, leaderboard points disabled.": {
      ja: "ゲストモード — PvPは利用できますが、ランキングポイントは獲得できません。",
      zh: "游客模式 — 可以进行PvP，但不获得排行榜积分。"
    },
    "Loading leaderboard...": {
      ja: "ランキングを読み込み中...",
      zh: "正在加载排行榜..."
    },
    "Google account ready. Create a room or join one.": {
      ja: "Googleアカウント準備完了。ルームを作成または参加してください。",
      zh: "Google账号已就绪。请创建或加入房间。"
    },
    "Guest mode ready. Create a room or join one.": {
      ja: "ゲストモード準備完了。ルームを作成または参加してください。",
      zh: "游客模式已就绪。请创建或加入房间。"
    },
    "Sign in with Google or continue as Guest before creating a room.": {
      ja: "ルーム作成前にGoogleでログインするか、ゲストとして続行してください。",
      zh: "创建房间前，请使用Google登录或以游客身份继续。"
    },
    "Sign in with Google or continue as Guest before joining a room.": {
      ja: "ルーム参加前にGoogleでログインするか、ゲストとして続行してください。",
      zh: "加入房间前，请使用Google登录或以游客身份继续。"
    },
    "Guest accounts do not earn leaderboard points.": {
      ja: "ゲストアカウントはランキングポイントを獲得できません。",
      zh: "游客账号不会获得排行榜积分。"
    }
  });



  // =====================================================
  // ANUBIS + PROPHET / 2026-09-16 BALANCE UPDATE
  // =====================================================
  Object.assign(exact, {
    "Anubis": { ja: "アヌビス", zh: "阿努比斯" },
    "Prophet": { ja: "予言者", zh: "预言家" },

    "Judgment of the Dead": { ja: "死者の審判", zh: "亡者审判" },
    "Weighing of the Heart": { ja: "心臓の計量", zh: "心之称量" },
    "Prophecy": { ja: "予言", zh: "预言" },
    "Fate's Price": { ja: "運命の代償", zh: "命运的代价" },

    "Feather of Judgment (1C): +1 Weight to one enemy. Soul Judgment (2C): deal floor(Weight / 2) damage, stun for 1 action, then reduce Weight by that amount. Tomb Guard (1C): gain 1 Shield until Anubis's next turn. Final Scale: if Charge exactly equals a target's Weight Limit + 1, spend all Charge to fill that target's Weight. Final Judgment (0C): at maximum Weight, directly defeat the target, ignoring HP and Shield.": {
      ja: "審判の羽（1C）：敵1体のWeightを+1。魂の審判（2C）：⌊Weight÷2⌋ダメージを与え、1行動スタンさせ、その分だけWeightを減らす。墓所の守護（1C）：Anubisの次のターンまでShieldを1得る。最後の天秤：Chargeが対象のWeight上限+1とちょうど同じなら、全Chargeを消費して対象のWeightを上限まで満たす。最終審判（0C）：対象がWeight上限に達している時、HPとShieldを無視して直接撃破する。",
      zh: "审判之羽（1C）：使一名敌人Weight +1。灵魂裁决（2C）：造成⌊Weight÷2⌋点伤害，眩晕1次行动，并减少等量Weight。陵墓守护（1C）：获得1点护盾，持续至阿努比斯下一次行动。最终天秤：若当前Charge恰好等于目标Weight上限+1，消耗全部Charge，使目标Weight直接达到上限。最终审判（0C）：目标Weight达到上限时，直接将其击败，无视HP与护盾。"
    },
    "Enemy Weight Limit = ceil(base starting HP - 2). Active Charge, Heal, or Skill gives +1 Weight; active Attack or Defend removes 1. Automatic effects do not change Weight. Every 3 completed rounds Anubis gains 1 Charge; while above 4 HP, both living enemies also gain +1 Weight. Every 2 actual HP Anubis loses makes the current attacking enemy lose 1 Weight. Every 3 enemy attack instances against Anubis's team makes Anubis lose 1 Charge. If Anubis is defeated, all enemy Weight is cleared. A defeated unit has 0 Weight before any revival. Final Judgment preserves the other enemy's Weight.": {
      ja: "敵のWeight上限＝⌈基礎初期HP-2⌉。能動的にCharge・Heal・Skillを使うとWeight+1、Attack・Defendを使うとWeight-1。自動発動効果ではWeightは変化しない。3ラウンド完了ごとにAnubisはCharge+1。HPが4より高い間は、生存中の敵2体もそれぞれWeight+1。Anubisが実際に累計2 HP失うたび、その累計を発生させた現在の攻撃者のWeight-1。Anubis側が敵の攻撃判定を累計3回受けるたび、AnubisはCharge-1。Anubisが倒れると敵全員のWeightを消去。倒されたユニットは復活判定前にWeight 0となり、復活後も0。最終審判後、もう1人の敵のWeightは保持される。",
      zh: "敌人的Weight上限＝⌈基础初始HP-2⌉。主动使用Charge、Heal或Skill时Weight +1；主动使用Attack或Defend时Weight -1；自动触发效果不会改变Weight。每3个完整回合，阿努比斯获得1 Charge；当阿努比斯HP高于4时，两名存活敌人各增加1 Weight。阿努比斯每累计实际失去2 HP，使触发该累计的当前攻击者Weight -1。阿努比斯队伍每累计遭受3次敌方攻击实例，阿努比斯失去1 Charge。阿努比斯被击败时，所有敌方Weight清零。单位被击败后、复活判定前Weight视为0，复活后仍为0。最终审判后，另一名敌人的Weight保留。"
    },
    "Cost 1 Charge. Secretly predict whether one enemy will use Attack, Defend, Charge, Heal, or Skill on that enemy's turn next round. If correct, cancel that action and make the target directly lose 2 HP, ignoring Shield. If every Prophecy resolving in a round succeeds, Prophet gains +1 HP and +1 Max HP.": {
      ja: "Chargeを1消費。敵1体が次ラウンドの自分の行動でAttack・Defend・Charge・Heal・Skillのどれを使うか秘密裏に予言する。的中した場合、その行動を無効化し、Shieldを無視して対象のHPを直接2失わせる。そのラウンドに解決されたすべての予言が成功した場合、ProphetはHP+1、Max HP+1。",
      zh: "消耗1 Charge，秘密预测一名敌人在下一轮自己的行动中会使用Attack、Defend、Charge、Heal或Skill中的哪一种。若预测正确，取消该行动，并使目标无视护盾直接失去2 HP。若某一回合内结算的所有预言全部成功，预言家恢复1 HP并获得1最大HP。"
    },
    "Gain 1 Charge every 2 completed rounds. Each failed Prophecy adds 1 Failure. At 3 Failures, Prophet loses 1 HP and 1 Max HP, is stunned for 1 action, and resets Failures to 0. Prophecies expire after their predicted round; an enemy that never acts does not count as a failed prediction.": {
      ja: "2ラウンド完了ごとにCharge+1。予言に失敗するたびFailure+1。3回失敗すると、ProphetはHPとMax HPを1失い、1行動スタンし、Failureを0に戻す。予言は指定ラウンド終了時に失効し、対象がそのラウンドに行動しなかった場合は失敗として数えない。",
      zh: "每2个完整回合获得1 Charge。每次预言失败获得1层Failure；累计3次失败时，预言家失去1 HP和1最大HP，并眩晕1次行动，随后Failure清零。预言会在所预测的回合结束后失效；如果目标在该回合没有行动，则不计为预言失败。"
    },

    "A judgment controller who builds Weight on enemies and executes those whose scales become too heavy.": {
      ja: "敵にWeightを蓄積し、天秤が限界に達した相手を裁くコントロール役。",
      zh: "通过给敌人累积Weight，在天秤达到极限时执行最终审判的控制型角色。"
    },
    "A mind-game controller who secretly predicts an enemy's next-round command and punishes predictable play.": {
      ja: "敵の次ラウンドの行動を秘密裏に予測し、読みやすい行動を罰する心理戦型コントローラー。",
      zh: "秘密预测敌人下一轮指令，并惩罚可预测行动的心理博弈型控制角色。"
    },

    "Cost 2 Charge. Deal 3 damage to one enemy and gain 1 permanent Shield.": {
      ja: "Chargeを2消費。敵1体に3ダメージを与え、永続Shieldを1得る。",
      zh: "消耗2 Charge：对一个敌人造成3伤害，并获得1点永久护盾。"
    },
    "Whenever the teammate would take HP damage, Tank redirects up to 0.5 of that damage to himself. Redirected damage ignores Tank's Shield. Every 3 completed rounds, Tank gains +0.5 Max HP, restores 0.5 HP, and gains 0.5 permanent Shield.": {
      ja: "味方がHPダメージを受ける時、そのうち最大0.5をTankが直接引き受ける。転送ダメージはTankのShieldを無視。3ラウンド完了ごとにMax HP+0.5、HP0.5回復、永続Shield+0.5。",
      zh: "队友受到实际HP伤害时，Tank最多把其中0.5点重定向到自己；该伤害无视Tank护盾。每3个完整回合：最大HP+0.5、恢复0.5 HP、永久护盾+0.5。"
    },
    "A healing specialist who turns repeated healing into protection and offensive momentum.": {
      ja: "継続的な回復を防御と攻撃の勢いへ変換する治療専門家。",
      zh: "把持续治疗转化为防护与进攻节奏的治疗专家。"
    },
    "Spend 2+ Charge on any living team member. Immediately heal 3 HP and place a Restoration Mark that heals once at the end of the next round for 1.5 HP. If the target has 2 HP or less before the immediate heal, that first heal gains +1.5. Each extra Charge adds +1 to the immediate heal and +0.5 to the Mark heal. Restoration Mark does not stack; recasting refreshes it.": {
      ja: "生存中の味方1人にChargeを2以上消費。即時3回復し、次ラウンド終了時に1.5回復するRestoration Markを付与。使用前HPが2以下なら即時回復+1.5。追加Chargeごとに即時回復+1、Mark回復+0.5。Markは重複せず再使用で更新。",
      zh: "对任意存活己方角色消耗2+ Charge：立即治疗3，并附加恢复印记，在下一回合结束时治疗1.5。若施放前目标HP≤2，立即治疗额外+1.5。每额外1 Charge：立即治疗+1、印记治疗+0.5。印记不可叠加，再次施放会刷新。"
    },
    "Emergency Blessing / Overheal Barrier / Healing Resonance": {
      ja: "緊急祝福 / オーバーヒール障壁 / 治癒共鳴",
      zh: "紧急祝福 / 溢疗屏障 / 治愈共鸣"
    },
    "The first time Cure Mage falls below 3 HP while alive, Cure Mage and the living teammate each recover 3 HP, and Cure Mage gains 1 Charge. Healing caused by Cure Mage converts overheal beyond the first wasted point into temporary Shield. Every 4 Cure Mage healing events received by the teammate, that teammate's next damaging action gains +1 damage.": {
      ja: "Cure Mageが生存中に初めてHP3未満になると、自身と生存中の味方が各3回復し、自身はCharge+1。Cure Mageのオーバーヒールは最初の余剰1点を除き一時Shieldへ変換。味方がCure Mageの回復を4回受けるたび、次のダメージ行動+1。",
      zh: "Cure Mage首次在存活时降至3 HP以下：自己与存活队友各恢复3 HP，并获得1 Charge。Cure Mage造成的溢疗在浪费的第1点之后转化为临时护盾。队友每受到4次Cure Mage治疗，下一次伤害型行动+1伤害。"
    },
    "Starts with 2 Charge. The first defeated member of Angel's team revives with 2 HP and 2 permanent Shield. If Angel revives the teammate, Angel loses half of current HP, rounded down to the nearest 0.5. The first time Angel reaches 2 HP or lower while alive, her next damaging action gains +2 damage.": {
      ja: "開始時Charge 2。味方で最初に倒れたキャラクターは2 HPと永続Shield 2で復活。味方を復活させた場合、Angelは現在HPの半分を0.5単位で切り捨てた値だけ失う。生存中に初めてHP2以下になると、次のダメージ行動+2。",
      zh: "开局2 Charge。己方首次被击败的角色以2 HP和2永久护盾复活。若复活的是Angel的队友，Angel失去当前HP的一半，并向下取整到最近的0.5。Angel首次在存活时降至2 HP或以下，下一次伤害型行动+2伤害。"
    },
    "Blood Drain: drain up to 5 HP from the teammate. Devil permanently gains Max HP equal to the amount drained and restores the same amount of HP. The teammate gains Shield equal to max(0, drained HP - 1) for two rounds. Berserk: spend 2 Charge to enter Berserk for three rounds, immediately distribute 4 total damage among living enemies, stun the main target for 1 action if it survives, restore 1.5 HP, and gain 1.5 permanent Shield. Skills cannot be used during Berserk.": {
      ja: "Blood Drain：味方から最大5 HP吸収。Devilは吸収量と同じMax HPを永久に得て同量回復。味方はmax(0, 吸収量-1)のShieldを2ラウンド得る。Berserk：Charge 2で3ラウンド狂暴化し、生存中の敵へ合計4ダメージを分配、主対象が生存なら1行動スタン、自身1.5回復+永続Shield1.5。狂暴中Skill不可。",
      zh: "Blood Drain：最多吸取队友5 HP；Devil永久增加等量最大HP并恢复等量HP，队友获得max(0, 吸血量-1)的护盾，持续2回合。Berserk：消耗2 Charge进入3回合狂暴，立即在存活敌人之间分配总计4伤害；主目标若存活则眩晕1次行动；Devil恢复1.5 HP并获得1.5永久护盾。狂暴期间不能使用技能。"
    },
    "Max HP cannot exceed 15. Every 3 completed rounds, lose 1.5 HP and 0.5 Max HP, but this decay cannot defeat Vampire. Every 4 completed rounds gain 1 Charge. While the teammate lives, incoming damage is reduced by 0.5. Normal attacks that hit always grant +0.5 Max HP; they restore 1 HP only after the teammate is defeated. If Vampire starts a normal attack above 10 HP, after that attack Max HP is reset to 9.5 before the +0.5 normal-attack growth is applied. The first defeat can drain half the living teammate's HP to revive at 3 HP. While the teammate is alive at 2 HP or lower, Vampire gains +1.5 normal-attack damage; after the teammate is defeated, this bonus becomes +2. At 10+ HP, each HP from 10 onward adds +0.5 normal-attack damage. The first time the teammate reaches 2 HP or lower, Vampire gains +3.5 HP and Max HP and the teammate gains 2 permanent Shield. While the teammate is at 2 HP or lower or defeated, every 3 rounds Vampire gains +1 HP and Max HP. Vampire cannot keep Shield: received Shield instead grants max(0, Shield - 1) HP and Max HP.": {
      ja: "Max HP上限15。3ラウンドごとにHP-1.5 / Max HP-0.5（この衰弱では死亡しない）。4ラウンドごとにCharge+1。味方生存中は被ダメージ-0.5。通常攻撃命中で常にMax HP+0.5、味方死亡後のみHPを1回復。味方が生存かつHP2以下なら通常攻撃+1.5、味方死亡後は+2。Shieldは保持できず、max(0, Shield-1)をHP/Max HPへ変換する。その他の成長・復活効果は維持。",
      zh: "最大HP上限15。每3个完整回合失去1.5 HP和0.5最大HP，但该衰减不能击败Vampire；每4回合获得1 Charge。队友存活时受到的每次伤害-0.5。普通攻击命中始终使最大HP+0.5；只有队友死亡后才额外恢复1 HP。队友存活且HP≤2时普攻+1.5，队友死亡后改为+2。Vampire无法保留护盾，获得护盾时改为获得max(0, 护盾量-1)的HP与最大HP；其余成长与复活效果保持不变。"
    },

    "Feather of Judgment — 1 Charge": { ja: "審判の羽 — 1 Charge", zh: "审判之羽 — 1 Charge" },
    "Soul Judgment — 2 Charge": { ja: "魂の審判 — 2 Charge", zh: "灵魂裁决 — 2 Charge" },
    "Tomb Guard — 1 Charge": { ja: "墓所の守護 — 1 Charge", zh: "陵墓守护 — 1 Charge" },
    "Final Scale — Spend All Charge": { ja: "最後の天秤 — 全Charge消費", zh: "最终天秤 — 消耗全部Charge" },
    "Final Judgment — 0 Charge": { ja: "最終審判 — 0 Charge", zh: "最终审判 — 0 Charge" },
    "Secret Prophecy": { ja: "秘密の予言", zh: "秘密预言" },
    "Failed Prophecies": { ja: "失敗した予言", zh: "预言失败" }
  });


  // =====================================================
  // BALANCE / BP UPDATE V3 — 2026-09-16
  // Explicit latest translations for changed character text.
  // =====================================================
  Object.assign(exact, {
    "Judgment of the Dead": { ja: "死者の審判", zh: "亡者审判" },
    "Weighing of the Heart": { ja: "心臓の計量", zh: "心之称量" },
    "Prophecy": { ja: "予言", zh: "预言" },
    "Fate's Price": { ja: "運命の代償", zh: "命运的代价" },

    "A judgment controller who builds Weight on enemies and executes those whose scales become too heavy.": {
      ja: "敵にWeightを蓄積させ、天秤が限界に達した相手を処刑する審判型コントローラー。",
      zh: "通过让敌人累积Weight，并在天秤达到极限时执行最终审判的控制型角色。"
    },
    "Judgment of the Dead (4C): deal damage to both living enemies equal to each target's current Weight, stun each surviving target for 1 action, then reset both targets' Weight to 0. Final Judgment (0C): when a target reaches its Weight Limit, directly defeat that target, ignoring HP and Shield. If Final Judgment triggers a revival, that target returns with half of its pre-defeat Weight, rounded up.": {
      ja: "死者の審判（4C）：生存中の敵2体それぞれに、その対象の現在Weightと同値のダメージを与え、生き残った対象を1行動スタンさせた後、両者のWeightを0にする。最終審判（0C）：対象がWeight上限に達している場合、HPとShieldを無視して直接撃破。最終審判後に復活した場合、撃破前Weightの半分を切り上げた値で復帰する。",
      zh: "亡者审判（4C）：对两名存活敌人分别造成等同于其当前Weight的伤害，并使存活目标眩晕1次行动，之后双方Weight归0。最终审判（0C）：目标达到Weight上限时，无视HP与护盾直接将其击败。若最终审判触发复活，该目标复活后的Weight为被击败前的一半，并向上取整。"
    },
    "Each enemy's Weight Limit equals that character's base starting HP, rounded up to an integer. Active Charge or Skill gives +1 Weight; a normal Attack removes 1 Weight; Defend and Heal do not change Weight. Anubis's normal Attack deals no damage and gives the target +1 Weight. Every 2 completed rounds, each living enemy gains +1 Weight automatically. Every 3 completed rounds Anubis gains 1 Charge. Every 2 actual HP Anubis loses makes the current attacking enemy lose 1 Weight. Every 3 enemy attack instances against Anubis's team makes Anubis lose 1 Charge. If Anubis is defeated, all enemy Weight is cleared. Final Judgment preserves the other enemy's Weight; a target revived by Final Judgment returns with half of its previous Weight, rounded up.": {
      ja: "各敵のWeight上限は基礎初期HPを整数へ切り上げた値。能動的なChargeまたはSkillでWeight+1、通常AttackでWeight-1。DefendとHealでは変化しない。Anubisの通常Attackはダメージを与えず、対象のWeight+1。2ラウンド完了ごとに生存中の敵全員が自動でWeight+1。Anubisは3ラウンド完了ごとにCharge+1。Anubisが実HPを累計2失うごとに、その時の攻撃者のWeight-1。Anubis側が敵の攻撃判定を累計3回受けるごとにAnubisのCharge-1。Anubisが倒れると敵全員のWeightを消去。最終審判ではもう一方の敵のWeightは維持され、最終審判で復活した対象は以前のWeightの半分（切り上げ）で復帰する。",
      zh: "每名敌人的Weight上限等于其基础初始HP，并向上取整为整数。主动使用Charge或Skill时Weight+1；普通Attack时Weight-1；Defend与Heal不改变Weight。阿努比斯的普通Attack不造成伤害，并使目标Weight+1。每经过2个完整回合，所有存活敌人自动获得1 Weight。阿努比斯每3个完整回合获得1 Charge。阿努比斯每累计实际失去2 HP，使触发该累计伤害的当前攻击者Weight-1。阿努比斯一方每累计遭受3次敌方攻击判定，阿努比斯失去1 Charge。阿努比斯被击败时清空所有敌方Weight。最终审判不会清空另一名敌人的Weight；被最终审判击败后若复活，该目标以原Weight的一半并向上取整后复活。"
    },

    "A mind-game controller who secretly predicts an enemy's next-round command and punishes predictable play.": {
      ja: "次ラウンドの相手の行動を秘密裏に予測し、読まれやすい行動を罰する心理戦型コントローラー。",
      zh: "秘密预测敌人下一回合指令，并惩罚可预测行动的心理博弈型控制角色。"
    },
    "Each prediction costs 1 Charge. During one Skill action, Prophet may secretly predict one enemy and then choose whether to also predict another living enemy. For each chosen target, predict Attack, Defend, Charge, Heal, or Skill on that target's next scheduled turn (this round if it has not acted yet, otherwise next round). A correct prediction cancels that action and makes the target directly lose 2 HP, ignoring Shield. If every Prophecy resolving in a round succeeds, Prophet gains +1 HP and +1 Max HP. The battle log only states that Prophet completed a prophecy and never reveals the selected target(s).": {
      ja: "予測1つにつきChargeを1消費。1回のSkill行動でまず敵1体を予測し、その後もう1体の生存中の敵も予測するか選べる。各対象について次ラウンドのAttack / Defend / Charge / Heal / Skillを秘密裏に予測する。的中するとその行動を取り消し、Shieldを無視して対象のHPを直接2失わせる。そのラウンドに解決する全予言が成功した場合、ProphetはHP+1 / Max HP+1。バトルログには「予言を完了した」とだけ表示され、対象は公開されない。",
      zh: "每次预言消耗1 Charge。一次技能行动中，预言家可以先对一名敌人进行秘密预言，然后选择是否继续对另一名存活敌人预言。对每个目标分别预测其下一回合会使用Attack、Defend、Charge、Heal或Skill。预言成功时取消该行动，并无视护盾使目标直接失去2 HP。若本轮结算的所有预言全部成功，预言家获得1 HP与1最大HP。战斗记录只会显示“预言家完成了预言”，不会透露被预言的目标。"
    },
    "Gain 1 Charge every 2 completed rounds. Each failed Prophecy adds 1 Failure. At 3 Failures, Prophet loses 1 HP and 1 Max HP, is stunned for 1 action, and resets Failures to 0. Prophecies expire after their predicted round; an enemy that never acts does not count as a failed prediction.": {
      ja: "2ラウンド完了ごとにCharge+1。予言失敗ごとにFailure+1。3回失敗するとHP-1 / Max HP-1となり、1行動スタンし、Failureを0へ戻す。予言は対象ラウンド終了時に失効し、対象が行動できなかった場合は失敗扱いにならない。",
      zh: "每2个完整回合获得1 Charge。每次预言失败增加1层Failure；累计3次失败时失去1 HP与1最大HP，并眩晕1次行动，随后Failure归0。预言在对应回合结束后失效；若目标根本没有行动，则不计为预言失败。"
    },

    "A flexible support who redistributes HP, Charge, protection, and offensive power.": {
      ja: "HP・Charge・防御・火力を柔軟に味方へ配分する支援役。",
      zh: "能够灵活转移HP、Charge、防护和进攻能力的辅助角色。"
    },
    "Transfer any amount of Angel's Charge to the teammate. Empower costs 2+ Charge: 2 Charge gives +1 damage to the teammate's next damaging action and 1 permanent Shield; each extra Charge adds +0.5 damage and +0.5 Shield. Or spend 1 Charge to sacrifice up to 2 of Angel's HP and Max HP; the teammate receives the sacrificed amount minus 1 as HP.": {
      ja: "AngelのChargeを任意量味方へ移せる。Empowerは2+ Charge：2Cで味方の次のダメージ行動+1、永続Shield+1。追加Chargeごとに+0.5ダメージ/+0.5 Shield。ほかに1 ChargeでAngelのHPとMax HPを最大2犠牲にし、味方は犠牲量-1のHPを回復する。",
      zh: "可把Angel任意数量的Charge转给队友。Empower消耗2+ Charge：2C使队友下一次伤害行动+1伤害并获得1永久护盾；每额外1C再+0.5伤害/+0.5护盾。也可消耗1 Charge，牺牲Angel最多2点HP和最大HP，队友实际获得“牺牲量-1”的HP。"
    },
    "Starts with 1 Charge. The first defeated member of Angel's team revives with 2 HP and 2 permanent Shield. If Angel revives the teammate, Angel loses half of current HP, rounded down to the nearest 0.5. The first time Angel falls below 2 HP while alive, her next damaging action gains +1 damage.": {
      ja: "開始時Charge 1。味方で最初に倒れたキャラクターは2 HPと永続Shield 2で復活。味方を復活させた場合、Angelは現在HPの半分を0.5単位で切り捨てた値だけ失う。生存中に初めてHP2未満になると、次のダメージ行動+1。",
      zh: "开局1 Charge。己方首次被击败的角色以2 HP和2点永久护盾复活。若复活的是Angel的队友，Angel失去当前HP的一半，并向下取整到最近的0.5。Angel首次在存活时降到2 HP以下后，下一次伤害型行动+1伤害。"
    },

    "Create any number of Juggling Balls by spending the same amount of Charge, or throw Balls. 1 Stun Ball: stun the target for 1 action but deal no damage; or 1 Damage Ball: deal 2 damage. 2 Balls: give a living ally 1 Charge. Joker may throw at most 2 ordinary Balls in one action. After a Stun Ball is thrown, Stun Ball has a 1-round cooldown.": {
      ja: "Chargeと同数のJuggling Ballを作るか、Ballを投げる。Stun Ball 1個：ダメージなしで対象を1行動スタン。Damage Ball 1個：2ダメージ。Ball 2個：生存中の味方1体にCharge+1。1行動で通常Ballは最大2個まで。Stun Ball使用後のクールダウンは1ラウンド。",
      zh: "可以消耗等量Charge制造任意数量的杂耍球，或投掷杂耍球。1个眩晕球：不造成伤害，使目标眩晕1次行动；1个伤害球：造成2伤害。2个球可使一名存活队友获得1 Charge。一次行动最多投掷2个普通球。眩晕球使用后仍有1回合冷却。"
    },
    "Starts with 2 Juggling Balls and 1 Charge. Every 2 completed rounds, gain 1 Charge. At round end, if Charge is at least 4, automatically spend 1 Charge to create 1 Ball. Every 6 ordinary Balls thrown grants Joker invincibility until the next turn and gives the whole living team 1 permanent Shield.": {
      ja: "開始時Juggling Ball 2個とCharge 1。2ラウンド完了ごとにCharge+1。ラウンド終了時Chargeが4以上なら自動で1 Chargeを消費してBallを1個作る。通常Ballを累計6個投げるごとに次のターンまで無敵になり、生存中の味方全員が永続Shield1を得る。",
      zh: "开局拥有2个杂耍球和1 Charge。每2个完整回合获得1 Charge。回合结束时若Charge≥4，自动消耗1 Charge制造1个球。每累计投出6个普通球，小丑获得直到下一次行动前的无敌，并使所有存活己方角色获得1点永久护盾。"
    },

    "Spend 2+ Charge on any living team member. Immediately heal 2 HP and place a Restoration Mark that heals once at the end of the next round for 1 HP. If the target has 2 HP or less before the immediate heal, that first heal gains +1.5. Each extra Charge adds +1 to the immediate heal and +0.5 to the Mark heal. Restoration Mark does not stack; recasting refreshes it.": {
      ja: "生存中の味方1人にChargeを2以上消費。即時2 HP回復し、次ラウンド終了時に1 HP回復するRestoration Markを付与。使用前HPが2以下なら即時回復+1.5。追加Chargeごとに即時回復+1、印の回復+0.5。印は重複せず、再使用で更新される。",
      zh: "对任意存活己方角色消耗2+ Charge：立即治疗2 HP，并附加恢复印记，在下一回合结束时治疗1 HP。若施放前目标HP≤2，立即治疗额外+1.5。每额外1 Charge：立即治疗+1、印记治疗+0.5。印记不能叠加，但重新施放会刷新。"
    },
    "Starts with 1 Life Puppet and 1 Charge, but no regular Puppets. Every newly created Puppet grants +0.5 Max HP and restores 0.5 HP. Creating a Puppet no longer grants Shield.": {
      ja: "開始時Life Puppet 1体とCharge 1を持つが、通常Puppetは0。新しいPuppetを作るたびMax HP+0.5、HP0.5回復。Puppet作成ではShieldを得ない。",
      zh: "开局拥有1个生命傀儡和1 Charge，但没有普通傀儡。每制造一个新傀儡，最大HP+0.5并恢复0.5 HP；制造傀儡不再获得护盾。"
    },
    "🔮 Prophet completed a prophecy.": { ja: "🔮 予言者は予言を完了した。", zh: "🔮 预言已提交，等待目标行动。" },
    "⚖️ Judgment of the Dead — 4 Charge": { ja: "⚖️ 死者の審判 — 4 Charge", zh: "⚖️ 亡者审判 — 4 Charge" },
    "☠️ Final Judgment — 0 Charge": { ja: "☠️ 最終審判 — 0 Charge", zh: "☠️ 最终审判 — 0 Charge" },
    "➡️ Continue": { ja: "➡️ 続ける", zh: "➡️ 继续" },
    "0 Damage + 1 Stun": { ja: "0ダメージ + 1スタン", zh: "0伤害 + 1次眩晕" },
    "🤹 Stun Ball — 0 Damage + 1 Stun": { ja: "🤹 スタンボール — 0ダメージ + 1スタン", zh: "🤹 眩晕球 — 0伤害 + 1次眩晕" },
    "Max HP cannot exceed 15. Every 3 completed rounds, lose 1.5 HP and 0.5 Max HP, but this decay cannot defeat Vampire. Every 4 completed rounds gain 1 Charge. While the teammate lives, incoming damage is reduced by 0.5. Normal attacks that hit always grant +0.5 Max HP; they restore 1 HP only after the teammate is defeated. If Vampire starts a normal attack above 10 HP, after that attack Max HP is reset to 9.5 before the +0.5 normal-attack growth is applied. On the first defeat, if the teammate is alive, Vampire drains half of that teammate's current HP and revives at 3 HP. If the teammate is already defeated, Vampire instead revives at 1 HP without draining anyone and immediately acts. If Vampire's normal turn for the current round had not happened yet, that scheduled turn is consumed by the immediate action. While the teammate is alive at 2 HP or lower, Vampire gains +1.5 normal-attack damage; after the teammate is defeated, this bonus becomes +2. At 10+ HP, each HP from 10 onward adds +0.5 normal-attack damage. The first time the teammate reaches 2 HP or lower, Vampire gains +3.5 HP and Max HP and the teammate gains 2 permanent Shield. While the teammate is at 2 HP or lower or defeated, every 3 rounds Vampire gains +1 HP and Max HP. Vampire cannot keep Shield: received Shield instead grants max(0, Shield - 1) HP and Max HP.": {
      ja: "Max HP上限は15。3ラウンド完了ごとにHP-1.5、Max HP-0.5（この衰弱では死亡しない）。4ラウンドごとにCharge+1。味方生存中は被ダメージ-0.5。通常攻撃命中で常にMax HP+0.5、味方死亡後のみHPを1回復。HP10超で通常攻撃を開始した場合、攻撃後にMax HPを9.5へ戻してから通常攻撃成長+0.5を適用。初回死亡時、味方が生存していればその現在HPの半分を吸収して3 HPで復活。味方が既に死亡していれば吸収せず1 HPで復活して直ちに行動する。同ラウンドの通常行動枠がまだ残っている場合、この即時行動がその行動枠を消費する。味方生存かつHP2以下なら通常攻撃+1.5、味方死亡後は+2。HP10以上では10から1 HPごとに通常攻撃+0.5。味方が初めてHP2以下になるとVampireはHP/Max HP+3.5、味方は永続Shield+2。味方がHP2以下または死亡中は3ラウンドごとにHP/Max HP+1。Shieldは保持できず、max(0, Shield-1)をHP/Max HPへ変換。",
      zh: "最大HP上限15。每3个完整回合失去1.5 HP和0.5最大HP，但该衰减不能击败Vampire；每4个完整回合获得1 Charge。队友存活时受到的每次伤害-0.5。普通攻击命中始终使最大HP+0.5；只有队友死亡后才恢复1 HP。若普通攻击开始时HP>10，则攻击结束后先把最大HP重置为9.5，再结算普攻的+0.5最大HP成长。首次被击败时，若队友存活，则吸取队友当前HP的一半并以3 HP复活；若队友已经死亡，则不吸取任何人，以1 HP复活并立即行动；若本回合原本的行动位尚未经过，则这次立即行动会占用该行动位。队友存活且HP≤2时普攻+1.5，队友死亡后改为+2。HP≥10时，从10开始每1点HP使普攻+0.5。队友首次降至2 HP或以下时，Vampire获得+3.5 HP/最大HP，队友获得2永久护盾。队友HP≤2或死亡时，每3回合获得+1 HP和+1最大HP。Vampire无法保留护盾，获得护盾时改为获得max(0, 护盾量-1)的HP与最大HP。"
    }
  });

  const patterns = [
    {
      re: /^Predict (.+)'s next turn \(Round (\d+)\)\. The target and predicted command will not be written to the battle log\.$/,
      zh: m => `预测${replaceNames(m[1], "zh")}接下来的行动（第${m[2]}轮）。目标与预测指令不会写入公开战斗记录。`,
      ja: m => `${replaceNames(m[1], "ja")}の次の行動を予言（ラウンド${m[2]}）。対象と予言内容はログに公開されません。`
    },
    {
      re: /^Commit (\d+) secret Prophec(?:y|ies) for the targets' next turns\? Total cost: (\d+) Charge\.$/,
      zh: m => `确认提交${m[1]}个预言，检查目标接下来的行动？总计消耗${m[2]} Charge。`,
      ja: m => `対象の次の行動に対する予言${m[1]}件を確定しますか？合計${m[2]} Charge。`
    },
    {
      re: /^🔮 Prophecy succeeds: (.+) directly loses ([0-9.]+) HP, ignoring Shield\.$/,
      ja: m => `🔮 予言成功：${replaceNames(m[1], "ja")}はShieldを無視して${m[2]} HPを直接失う。`,
      zh: m => `🔮 预言成功：${replaceNames(m[1], "zh")}无视护盾，直接失去${m[2]} HP。`
    },
    {
      re: /^🔮 Prophecy succeeds! (.+)'s (ATTACK|DEFEND|CHARGE|HEAL|SKILL) is cancelled immediately and (.+) directly loses ([0-9.]+) HP \(1\/3 of Max HP, rounded up\), ignoring Shield\.$/,
      ja: m => `🔮 予言成功！${replaceNames(m[1], "ja")}の${m[2]}は直ちにキャンセルされ、${replaceNames(m[3], "ja")}はShieldを無視してMax HPの1/3を切り上げた${m[4]} HPを直接失う。`,
      zh: m => `🔮 预言成功！${replaceNames(m[1], "zh")}的${m[2]}被立刻取消，${replaceNames(m[3], "zh")}无视护盾，直接失去最大HP的1/3并向上取整（${m[4]} HP）。`
    },
    {
      re: /^🔮 Predict ([AB][12]) — (.+)$/,
      ja: m => `🔮 ${m[1]} を予言 — ${replaceNames(m[2], "ja")}`,
      zh: m => `🔮 预言 ${m[1]} — ${replaceNames(m[2], "zh")}`
    },
    {
      re: /^Sacrifice ([0-9.]+) HP \/ Max HP → \+([0-9.]+) HP$/,
      ja: m => `HP / Max HPを${m[1]}犠牲 → HP +${m[2]}`,
      zh: m => `牺牲${m[1]} HP / 最大HP → +${m[2]} HP`
    },
    {
      re: /^ROOM CODE:\s*(.+)$/,
      ja: m => `ルームコード: ${m[1]}`,
      zh: m => `房间码: ${m[1]}`
    },
    {
      re: /^You are Team ([AB])\. Waiting for Player B\.\.\.$/,
      ja: m => `あなたは Team ${m[1]} です。Player B を待っています...`,
      zh: m => `你是 Team ${m[1]}。正在等待 Player B...`
    },
    {
      re: /^Room (.+): waiting for Player B\.\.\.$/,
      ja: m => `ルーム ${m[1]}：Player B を待っています...`,
      zh: m => `房间 ${m[1]}：正在等待 Player B...`
    },
    {
      re: /^You are Team ([AB])\. Choose ([AB][12])\.$/,
      ja: m => `あなたは Team ${m[1]}。${m[2]} を選択してください。`,
      zh: m => `你是 Team ${m[1]}。请选择 ${m[2]}。`
    },
    {
      re: /^You are Team ([AB])\. Waiting for ([AB][12])\.\.\.$/,
      ja: m => `あなたは Team ${m[1]}。${m[2]} の選択を待っています...`,
      zh: m => `你是 Team ${m[1]}。正在等待 ${m[2]} 选择...`
    },
    {
      re: /^([AB][12]) — YOUR PICK$/,
      ja: m => `${m[1]} — あなたの選択`,
      zh: m => `${m[1]} — 轮到你选择`
    },
    {
      re: /^([AB][12]) — OPPONENT'S PICK$/,
      ja: m => `${m[1]} — 相手の選択`,
      zh: m => `${m[1]} — 对手选择`
    },
    {
      re: /^TEAM ([AB]) — BAN 1 CHARACTER$/,
      ja: m => `TEAM ${m[1]} — キャラクターを1人BAN`,
      zh: m => `TEAM ${m[1]} — 禁用1名角色`
    },
    {
      re: /^([AB][12]) — PICK 1 CHARACTER$/,
      ja: m => `${m[1]} — キャラクターを1人選択`,
      zh: m => `${m[1]} — 选择1名角色`
    },
    {
      re: /^([AB]) BAN — YOUR BAN$/,
      ja: m => `${m[1]} BAN — あなたのBAN`,
      zh: m => `${m[1]} 禁用 — 轮到你禁用`
    },
    {
      re: /^([AB]) BAN — OPPONENT'S BAN$/,
      ja: m => `${m[1]} BAN — 相手のBAN`,
      zh: m => `${m[1]} 禁用 — 对手禁用`
    },
    {
      re: /^—— ROUND (\d+) ——$/,
      ja: m => `—— ROUND ${m[1]} ——`,
      zh: m => `—— 第 ${m[1]} 回合 ——`
    },
    {
      re: /^TEAM ([AB]) — (.+)'s Turn$/,
      ja: m => `TEAM ${m[1]} — ${replaceNames(m[2], "ja")} のターン`,
      zh: m => `TEAM ${m[1]} — ${replaceNames(m[2], "zh")} 行动`
    },
    {
      re: /^DMG (.+)$/,
      ja: m => `DMG ${m[1]}`,
      zh: m => `伤害 ${m[1]}`
    },
    {
      re: /^CD (\d+)R$/,
      ja: m => `CD ${m[1]}R`,
      zh: m => `冷却 ${m[1]}回合`
    },
    {
      re: /^Target:\s*(.+)$/,
      ja: m => `対象: ${replaceNames(m[1], "ja")}`,
      zh: m => `目标: ${replaceNames(m[1], "zh")}`
    },
    {
      re: /^Choose a target\.?$/,
      ja: () => "対象を選択してください。",
      zh: () => "请选择目标。"
    },
    {
      re: /^Ball (\d+) \/ (\d+)$/,
      ja: m => `ボール ${m[1]} / ${m[2]}`,
      zh: m => `第 ${m[1]} / ${m[2]} 球`
    }
  ];


  patterns.unshift(
    {
      re: /^Looking for room ([A-Z0-9]+)\.\.\.$/,
      ja: m => `ルーム ${m[1]} を検索中...`,
      zh: m => `正在查找房间 ${m[1]}...`
    },
    {
      re: /^Room ([A-Z0-9]+) does not exist\.(.*)$/,
      ja: m => `ルーム ${m[1]} は存在しません。ホストに新しいルームを作成して最新のコードを送ってもらってください。`,
      zh: m => `房间 ${m[1]} 不存在。请让房主重新创建房间并发送最新房间码。`
    },
    {
      re: /^Create room failed:\s*(.+)$/,
      ja: m => `ルーム作成失敗: ${m[1]}`,
      zh: m => `创建房间失败：${m[1]}`
    },
    {
      re: /^Join room failed:\s*(.+)$/,
      ja: m => `ルーム参加失敗: ${m[1]}`,
      zh: m => `加入房间失败：${m[1]}`
    },
    {
      re: /^Room sync failed:\s*(.+)$/,
      ja: m => `ルーム同期失敗: ${m[1]}`,
      zh: m => `房间同步失败：${m[1]}`
    },
    {
      re: /^Submitting (.+)\.\.\.$/,
      ja: m => `${m[1]} を送信中...`,
      zh: m => `正在提交 ${m[1]}...`
    },
    {
      re: /^You are Team ([AB])\. Ban 1 character\.$/,
      ja: m => `あなたは Team ${m[1]}。キャラクターを1人BANしてください。`,
      zh: m => `你是 Team ${m[1]}。请禁用1名角色。`
    },
    {
      re: /^You are Team ([AB])\. Waiting for Team ([AB]) to ban\.\.\.$/,
      ja: m => `あなたは Team ${m[1]}。Team ${m[2]} のBANを待っています...`,
      zh: m => `你是 Team ${m[1]}。正在等待 Team ${m[2]} 禁用角色...`
    },
    {
      re: /^🌐 Waiting for Team ([AB])\.\.\.$/,
      ja: m => `🌐 Team ${m[1]} を待っています...`,
      zh: m => `🌐 正在等待 Team ${m[1]}...`
    },
    {
      re: /^🤖 (.+) is thinking\.\.\.$/,
      ja: m => `🤖 ${replaceNames(m[1], "ja")} が考え中...`,
      zh: m => `🤖 ${replaceNames(m[1], "zh")} 正在思考...`
    },
    {
      re: /^(.+) is stunned and loses the turn!$/,
      ja: m => `${replaceNames(m[1], "ja")} はスタンしてターンを失う！`,
      zh: m => `${replaceNames(m[1], "zh")} 被眩晕并失去本次行动！`
    },
    {
      re: /^⚔️ (.+) attacks \[([AB][12])\] (.+) for (.+) damage\.$/,
      ja: m => `⚔️ ${replaceNames(m[1], "ja")} が [${m[2]}] ${replaceNames(m[3], "ja")} を攻撃し、${m[4]}ダメージ。`,
      zh: m => `⚔️ ${replaceNames(m[1], "zh")} 攻击 [${m[2]}] ${replaceNames(m[3], "zh")}，造成 ${m[4]} 点伤害。`
    },
    {
      re: /^Attack (.+) for (.+) damage\?$/,
      ja: m => `${replaceNames(m[1], "ja")} を攻撃して ${m[2]} ダメージを与えますか？`,
      zh: m => `攻击 ${replaceNames(m[1], "zh")}，造成 ${m[2]} 点伤害？`
    },
    {
      re: /^Use Defend with (.+)\? Incoming damage is reduced by 1 until this character's next turn\.$/,
      ja: m => `${replaceNames(m[1], "ja")} で防御しますか？次の自分のターンまで被ダメージ-1。`,
      zh: m => `让 ${replaceNames(m[1], "zh")} 使用防御？直到其下次行动前，受到伤害-1。`
    },
    {
      re: /^🛡️ (.+) defends\. Incoming damage is reduced by 1 until their next turn\.$/,
      ja: m => `🛡️ ${replaceNames(m[1], "ja")} が防御。次の自分のターンまで被ダメージ-1。`,
      zh: m => `🛡️ ${replaceNames(m[1], "zh")} 进入防御。直到下次行动前，受到伤害-1。`
    },
    {
      re: /^Gain 1 Charge with (.+)\?$/,
      ja: m => `${replaceNames(m[1], "ja")} でChargeを1獲得しますか？`,
      zh: m => `让 ${replaceNames(m[1], "zh")} 获得1 Charge？`
    },
    {
      re: /^⚡ (.+) gains 1 Charge\.$/,
      ja: m => `⚡ ${replaceNames(m[1], "ja")} がChargeを1獲得。`,
      zh: m => `⚡ ${replaceNames(m[1], "zh")} 获得1 Charge。`
    },
    {
      re: /^Prepare a 2 HP Heal for the end of Round (\d+)\? After use, Heal is unavailable for the next 3 rounds\.$/,
      ja: m => `Round ${m[1]}終了時に2 HP回復を準備しますか？使用後3ラウンドはHeal使用不可。`,
      zh: m => `准备在第${m[1]}回合结束时恢复2 HP？使用后接下来3回合无法再次治疗。`
    },
    {
      re: /^❤️ (.+) recovers (.+) HP\.$/,
      ja: m => `❤️ ${replaceNames(m[1], "ja")} が ${m[2]} HP回復。`,
      zh: m => `❤️ ${replaceNames(m[1], "zh")} 恢复 ${m[2]} HP。`
    },
    {
      re: /^💥 (.+) takes (.+) HP damage\.$/,
      ja: m => `💥 ${replaceNames(m[1], "ja")} が ${m[2]} HPダメージを受ける。`,
      zh: m => `💥 ${replaceNames(m[1], "zh")} 受到 ${m[2]} 点HP伤害。`
    },
    {
      re: /^🛡️ (.+) takes 0 HP damage\.$/,
      ja: m => `🛡️ ${replaceNames(m[1], "ja")} のHPダメージは0。`,
      zh: m => `🛡️ ${replaceNames(m[1], "zh")} 受到0点HP伤害。`
    },
    {
      re: /^✨ (.+) is invincible and takes no damage\.$/,
      ja: m => `✨ ${replaceNames(m[1], "ja")} は無敵のためダメージを受けない。`,
      zh: m => `✨ ${replaceNames(m[1], "zh")} 处于无敌状态，不受伤害。`
    },
    {
      re: /^💀 (.+) has been defeated\.$/,
      ja: m => `💀 ${replaceNames(m[1], "ja")} は倒された。`,
      zh: m => `💀 ${replaceNames(m[1], "zh")} 已被击败。`
    },
    {
      re: /^💀 (.+) has no Max HP remaining and is defeated\.$/,
      ja: m => `💀 ${replaceNames(m[1], "ja")} はMax HPが0になり倒された。`,
      zh: m => `💀 ${replaceNames(m[1], "zh")} 的最大HP耗尽并被击败。`
    },
    {
      re: /^⚠️ Target \[([AB][12])\] is no longer available\.$/,
      ja: m => `⚠️ 対象 [${m[1]}] は選択できなくなりました。`,
      zh: m => `⚠️ 目标 [${m[1]}] 已不可用。`
    },
    {
      re: /^Choose (.+)\?$/,
      ja: m => `${replaceNames(m[1], "ja")} を選択しますか？`,
      zh: m => `选择 ${replaceNames(m[1], "zh")}？`
    },
    {
      re: /^(.+) absorbs (.+) damage for (.+)\.$/,
      ja: m => `${m[1]} が ${replaceNames(m[3], "ja")} のために ${m[2]} ダメージを吸収。`,
      zh: m => `${m[1]} 为 ${replaceNames(m[3], "zh")} 吸收 ${m[2]} 点伤害。`
    },
    {
      re: /^(.+) Charge → (.+)$/,
      ja: m => `${m[1]} Charge → ${m[2]}`,
      zh: m => `${m[1]} Charge → ${m[2]}`
    },
    {
      re: /^(\d+)C · Have (.+)$/,
      ja: m => `${m[1]}C · 所持 ${m[2]}`,
      zh: m => `${m[1]}C · 当前 ${m[2]}`
    },
    {
      re: /^(.+)C · Need 2\+$/,
      ja: m => `${m[1]}C · 2+ 必要`,
      zh: m => `${m[1]}C · 需要2+`
    },
    {
      re: /^(.+) Balls · (.+)C$/,
      ja: m => `${m[1]} Balls · ${m[2]}C`,
      zh: m => `${m[1]}球 · ${m[2]}C`
    },
    {
      re: /^DMG (.+) · \+0\.5 HP\/MAX on hit$/,
      ja: m => `DMG ${m[1]} · 命中時 HP/MAX +0.5`,
      zh: m => `伤害 ${m[1]} · 命中后 HP/MAX +0.5`
    },
    {
      re: /^❤️ Heal \+(.+) Pending$/,
      ja: m => `❤️ 回復 +${m[1]} 待機`,
      zh: m => `❤️ 治疗 +${m[1]} 待结算`
    },
    {
      re: /^❤️ Heal CD (\d+)R$/,
      ja: m => `❤️ Heal CD ${m[1]}R`,
      zh: m => `❤️ 治疗冷却 ${m[1]}回合`
    },
    {
      re: /^💚 Mark (.+) × (.+)$/,
      ja: m => `💚 印 ${m[1]} × ${m[2]}`,
      zh: m => `💚 印记 ${m[1]} × ${m[2]}`
    },
    {
      re: /^💚 Barrier (.+)$/,
      ja: m => `💚 障壁 ${m[1]}`,
      zh: m => `💚 屏障 ${m[1]}`
    },
    {
      re: /^✨ Empower \+(.+)$/,
      ja: m => `✨ 強化 +${m[1]}`,
      zh: m => `✨ 强化 +${m[1]}`
    },
    {
      re: /^🌟 Last Light \+(.+)$/,
      ja: m => `🌟 Last Light +${m[1]}`,
      zh: m => `🌟 最后之光 +${m[1]}`
    },
    {
      re: /^🔥 Damage \+(.+)$/,
      ja: m => `🔥 ダメージ +${m[1]}`,
      zh: m => `🔥 伤害 +${m[1]}`
    },
    {
      re: /^😈 Normal ATK \+(.+)$/,
      ja: m => `😈 通常攻撃 +${m[1]}`,
      zh: m => `😈 普攻 +${m[1]}`
    },
    {
      re: /^🩸 Crisis \+1\.5 ATK$/,
      ja: () => "🩸 危機 +1.5 ATK",
      zh: () => "🩸 危机 +1.5 普攻"
    },
    {
      re: /^🧛 Normal ATK \+(.+)$/,
      ja: m => `🧛 通常攻撃 +${m[1]}`,
      zh: m => `🧛 普攻 +${m[1]}`
    }
  );


  patterns.unshift(
    {
      re: /^🤹 Stun Ball — CD (\d+)R$/,
      ja: m => `🤹 Stun Ball — CD ${m[1]}R`,
      zh: m => `🤹 眩晕球 — 冷却 ${m[1]}回合`
    },
    {
      re: /^🤹 Stun Ball:\s*Ready$/,
      ja: () => "🤹 Stun Ball: 使用可能",
      zh: () => "🤹 眩晕球：可用"
    },
    {
      re: /^🤹 Stun Ball:\s*CD (\d+)R$/,
      ja: m => `🤹 Stun Ball: CD ${m[1]}R`,
      zh: m => `🤹 眩晕球：冷却 ${m[1]}回合`
    },
    {
      re: /^💫 Berserk impact: (.+) is stunned for the next action\.$/,
      ja: m => `💫 Berserk衝撃：${replaceNames(m[1], "ja")} は次の行動がスタン。`,
      zh: m => `💫 狂暴冲击：${replaceNames(m[1], "zh")} 的下一次行动被眩晕。`
    },
    {
      re: /^😈 Desperate Feast: (.+) restores (.+) HP after a normal attack while at 3 HP or lower\.$/,
      ja: m => `😈 決死の飢え：${replaceNames(m[1], "ja")} はHP3以下で通常攻撃したため ${m[2]} HP回復。`,
      zh: m => `😈 绝境汲取：${replaceNames(m[1], "zh")} 在HP不高于3时完成普攻，恢复 ${m[2]} HP。`
    },
    {
      re: /^🩸 Crimson Desperation: (.+) gains \+1 Max HP and restores 1 HP\.$/,
      ja: m => `🩸 深紅の窮地：${replaceNames(m[1], "ja")} はMax HP+1、HP1回復。`,
      zh: m => `🩸 猩红绝境：${replaceNames(m[1], "zh")} 获得+1最大HP并恢复1 HP。`
    },
    {
      re: /^🛡️ Guardian Shield! (.+) receives 3\.5 Shield for two rounds\.$/,
      ja: m => `🛡️ Guardian Shield！${replaceNames(m[1], "ja")} は3.5 Shieldを2ラウンド得る。`,
      zh: m => `🛡️ 守护护盾！${replaceNames(m[1], "zh")} 获得3.5点护盾，持续2回合。`
    },
    {
      re: /^Give (.+) 3\.5 Guardian Shield for two rounds\?$/,
      ja: m => `${replaceNames(m[1], "ja")} に3.5 Guardian Shieldを2ラウンド付与しますか？`,
      zh: m => `给予 ${replaceNames(m[1], "zh")} 3.5点守护护盾，持续2回合？`
    },
    {
      re: /^🛡️ Guardian's Burden! (.+) directly takes 0\.5 HP damage for (.+)\.$/,
      ja: m => `🛡️ Guardian's Burden！${replaceNames(m[1], "ja")} が ${replaceNames(m[2], "ja")} のために0.5 HPダメージを直接受ける。`,
      zh: m => `🛡️ 守护者的负担！${replaceNames(m[1], "zh")} 为 ${replaceNames(m[2], "zh")} 直接承受0.5 HP伤害。`
    }
  );


  patterns.unshift(
    {
      re: /^🗡️ Shadow Guard! (.+) blocks (.+) damage\.$/,
      ja: m => `🗡️ Shadow Guard！${replaceNames(m[1], "ja")} が ${m[2]} ダメージを防ぐ。`,
      zh: m => `🗡️ 影袭防护！${replaceNames(m[1], "zh")} 抵挡 ${m[2]} 点伤害。`
    },
    {
      re: /^⚔️ LAST STAND! (.+) refuses defeat, remains at (.+) HP, and becomes invincible until the next turn\.$/,
      ja: m => `⚔️ LAST STAND！${replaceNames(m[1], "ja")} は倒れず ${m[2]} HPで踏みとどまり、次の自分のターンまで無敵になる。`,
      zh: m => `⚔️ 背水一战！${replaceNames(m[1], "zh")} 拒绝倒下，保持 ${m[2]} HP，并在自己下次行动前获得无敌。`
    },
    {
      re: /^🗡️ Execution deals (.+) damage to (.+)\. Assassin regains 2 Charge because the target was not defeated\.$/,
      ja: m => `🗡️ Executionが ${replaceNames(m[2], "ja")} に ${m[1]} ダメージ。対象が生存したためAssassinは2 Chargeを返還。`,
      zh: m => `🗡️ Execution对 ${replaceNames(m[2], "zh")} 造成 ${m[1]} 伤害。因目标未被击败，Assassin返还2 Charge。`
    },
    {
      re: /^Spend 2 Charge to command an attack on (.+)\?$/,
      ja: m => `2 Chargeを消費して ${replaceNames(m[1], "ja")} を主対象にRoyal Commandを使用しますか？`,
      zh: m => `消耗2 Charge，对 ${replaceNames(m[1], "zh")} 发动王之号令？`
    }
  );


  patterns.unshift(
    {
      re: /^Signed in: (.+)$/,
      ja: m => `ログイン中: ${m[1]}`,
      zh: m => `已登录：${m[1]}`
    },
    {
      re: /^Score: (-?\d+)$/,
      ja: m => `スコア: ${m[1]}`,
      zh: m => `积分：${m[1]}`
    },
    {
      re: /^Room created\. Waiting for Player 2\.\.\.$/,
      ja: () => "ルーム作成完了。Player 2を待っています...",
      zh: () => "房间已创建，正在等待Player 2..."
    },
    {
      re: /^Joined room\. Choose Team A or Team B\.$/,
      ja: () => "ルームに参加しました。Team AまたはTeam Bを選択してください。",
      zh: () => "已加入房间，请选择Team A或Team B。"
    },
    {
      re: /^You chose Team ([AB])\. Waiting for the other player to choose\.$/,
      ja: m => `Team ${m[1]}を選択しました。相手の選択を待っています。`,
      zh: m => `你选择了Team ${m[1]}。正在等待对手选择。`
    },
    {
      re: /^Choosing Team ([AB])\.\.\.$/,
      ja: m => `Team ${m[1]}を選択中...`,
      zh: m => `正在选择Team ${m[1]}...`
    },
    {
      re: /^Team ([AB]) — YOU$/,
      ja: m => `TEAM ${m[1]} — あなた`,
      zh: m => `TEAM ${m[1]} — 你`
    },
    {
      re: /^⚖️ (.+) attacks \[([^\]]+)\] (.+): \+1 Weight, 0 damage\.$/,
      ja: m => `⚖️ ${replaceNames(m[1], "ja")}が[${m[2]}] ${replaceNames(m[3], "ja")}を攻撃：Weight+1、ダメージ0。`,
      zh: m => `⚖️ ${replaceNames(m[1], "zh")}攻击[${m[2]}] ${replaceNames(m[3], "zh")}：Weight+1，0伤害。`
    },
    {
      re: /^🤖 ⚖️ (.+) attacks (.+): \+1 Weight, 0 damage\.$/,
      ja: m => `🤖 ⚖️ ${replaceNames(m[1], "ja")}が${replaceNames(m[2], "ja")}を攻撃：Weight+1、ダメージ0。`,
      zh: m => `🤖 ⚖️ ${replaceNames(m[1], "zh")}攻击${replaceNames(m[2], "zh")}：Weight+1，0伤害。`
    },
    {
      re: /^(.+) Winner \+1 leaderboard point; loser -1 leaderboard point\.$/,
      ja: m => `${m[1]} 勝者はランキング+1、敗者は-1。`,
      zh: m => `${m[1]} 胜者排行榜积分+1，败者-1。`
    },
    {
      re: /^(.+) Winner \+1 leaderboard point\. Guest loser has no leaderboard change\.$/,
      ja: m => `${m[1]} 勝者はランキング+1。ゲストの敗者はポイント変動なし。`,
      zh: m => `${m[1]} 胜者排行榜积分+1；游客败者积分不变。`
    },
    {
      re: /^(.+) Guest winner has no leaderboard change; ranked loser -1 leaderboard point\.$/,
      ja: m => `${m[1]} ゲスト勝者はポイント変動なし。ランキング対象の敗者は-1。`,
      zh: m => `${m[1]} 游客胜者积分不变；排行榜败者积分-1。`
    },
    {
      re: /^(.+) Guest accounts do not earn or lose leaderboard points\.$/,
      ja: m => `${m[1]} ゲストアカウントはランキングポイントの増減なし。`,
      zh: m => `${m[1]} 游客账号不会获得或失去排行榜积分。`
    },
    {
      re: /^(.+) wins by surrender and receives \+1 leaderboard point\.$/,
      ja: m => `${m[1]} が相手の降参で勝利し、ランキング+1ポイント。`,
      zh: m => `${m[1]} 因对手投降获胜，排行榜积分+1。`
    },
    {
      re: /^(.+) wins and receives \+1 leaderboard point\.$/,
      ja: m => `${m[1]} が勝利し、ランキング+1ポイント。`,
      zh: m => `${m[1]} 获胜，排行榜积分+1。`
    },
    {
      re: /^(-?\d+) pts$/,
      ja: m => `${m[1]} pt`,
      zh: m => `${m[1]}分`
    }
  );

  const namePairs = {
    Fighter: { ja: "ファイター", zh: "战士" },
    "Blast Mage": { ja: "爆裂魔導士", zh: "爆裂法师" },
    Tank: { ja: "タンク", zh: "坦克" },
    "Cure Mage": { ja: "治癒魔導士", zh: "治愈法师" },
    Assassin: { ja: "アサシン", zh: "刺客" },
    King: { ja: "王", zh: "国王" },
    Puppeteer: { ja: "人形遣い", zh: "傀儡师" },
    Angel: { ja: "天使", zh: "天使" },
    Devil: { ja: "悪魔", zh: "恶魔" },
    Joker: { ja: "ジョーカー", zh: "小丑" },
    Vampire: { ja: "吸血鬼", zh: "吸血鬼" },
    Anubis: { ja: "アヌビス", zh: "阿努比斯" },
    Prophet: { ja: "予言者", zh: "预言家" },
    Chimera: { ja: "キメラ", zh: "奇美拉" }
  };

  function replaceNames(text, lang) {
    if (lang === "en") return text;
    let result = text;
    Object.entries(namePairs)
      .sort((a, b) => b[0].length - a[0].length)
      .forEach(([en, vals]) => {
        result = result.split(en).join(vals[lang]);
      });
    return result;
  }


  const phrasePairs = [
    ["Empowered Shift", { ja: "強化転換", zh: "强化切换" }],
    ["Direct Shift", { ja: "直接転換", zh: "直接切换" }],
    ["Shelter Repair", { ja: "庇護修復", zh: "庇护修复" }],
    ["Spirit Drain", { ja: "霊力吸収", zh: "灵能汲取" }],
    ["Spectral Revival", { ja: "霊体再生", zh: "灵体重生" }],
    ["Spirit Entry", { ja: "霊体入場", zh: "灵体入场" }],
    ["Metamorphosis", { ja: "形態転換", zh: "形态转换" }],
    ["Molting Instinct", { ja: "変態本能", zh: "蜕变本能" }],
    ["Shift Options", { ja: "転換オプション", zh: "切换选项" }],
    ["Choose Entry Target", { ja: "入場対象を選択", zh: "选择入场目标" }],
    ["Distribute up to 2 Charge removal", { ja: "最大2 Charge減少を分配", zh: "分配最多2点Charge削减" }],
    ["Beast entry", { ja: "猛獣入場", zh: "猛兽入场" }],
    ["Shell entry", { ja: "甲殻入場", zh: "甲壳入场" }],
    ["Spirit entry", { ja: "霊体入場", zh: "灵体入场" }],
    ["Beast form", { ja: "猛獣形態", zh: "猛兽形态" }],
    ["Shell form", { ja: "甲殻形態", zh: "甲壳形态" }],
    ["Spirit form", { ja: "霊体形態", zh: "灵体形态" }],
    ["Current form", { ja: "現在形態", zh: "当前形态" }],
    ["entry effect", { ja: "入場効果", zh: "入场效果" }],
    ["Bleed", { ja: "出血", zh: "流血" }],
    ["Rend", { ja: "引き裂き", zh: "撕裂" }],
    ["Beast", { ja: "猛獣", zh: "猛兽" }],
    ["Shell", { ja: "甲殻", zh: "甲壳" }],
    ["Spirit", { ja: "霊体", zh: "灵体" }],
    ["Judgment of the Dead", { ja: "死者の審判", zh: "亡者审判" }],
    ["Weighing of the Heart", { ja: "心臓の計量", zh: "心之称量" }],
    ["Feather of Judgment", { ja: "審判の羽", zh: "审判之羽" }],
    ["Soul Judgment", { ja: "魂の審判", zh: "灵魂裁决" }],
    ["Tomb Guard", { ja: "墓所の守護", zh: "陵墓守护" }],
    ["Final Scale", { ja: "最後の天秤", zh: "最终天秤" }],
    ["Final Judgment", { ja: "最終審判", zh: "最终审判" }],
    ["Secret Prophecy", { ja: "秘密の予言", zh: "秘密预言" }],
    ["Fate's Price", { ja: "運命の代償", zh: "命运的代价" }],
    ["Failed Prophecies", { ja: "失敗した予言", zh: "预言失败" }],
    ["Prophecy", { ja: "予言", zh: "预言" }],
    ["Confirm Action", { ja: "行動を確定", zh: "确认行动" }],
    ["Choose Attack Target", { ja: "攻撃対象を選択", zh: "选择攻击目标" }],
    ["Choose Target", { ja: "対象を選択", zh: "选择目标" }],
    ["Choose Charge Amount", { ja: "Charge量を選択", zh: "选择Charge数量" }],
    ["Choose Throw Count", { ja: "投擲数を選択", zh: "选择投掷数量" }],
    ["Choose this Ball's effect.", { ja: "このBallの効果を選択。", zh: "选择这个球的效果。" }],
    ["Choose this Ball's target.", { ja: "このBallの対象を選択。", zh: "选择这个球的目标。" }],
    ["Current Balls:", { ja: "現在のBalls:", zh: "当前球数：" }],
    ["Regular Puppets:", { ja: "通常Puppet:", zh: "普通傀儡：" }],
    ["Life Puppets:", { ja: "Life Puppet:", zh: "生命傀儡：" }],
    ["Juggling Balls:", { ja: "ジャグリングボール:", zh: "杂耍球：" }],
    ["Balls Thrown:", { ja: "投げたボール:", zh: "已投掷球数：" }],
    ["Restoration Mark:", { ja: "回復の印:", zh: "恢复印记：" }],
    ["Teammate Crisis:", { ja: "味方危機状態:", zh: "队友危机状态：" }],
    ["Normal ATK Bonus:", { ja: "通常攻撃ボーナス:", zh: "普攻加成：" }],
    ["Shield Conversion:", { ja: "Shield変換:", zh: "护盾转换：" }],
    ["Next Damage:", { ja: "次のダメージ:", zh: "下一次伤害：" }],
    ["Teammate alive: incoming damage -0.5", { ja: "味方生存中: 被ダメージ -0.5", zh: "队友存活：受到伤害 -0.5" }],
    ["Spend any amount of Charge.", { ja: "任意量のChargeを消費。", zh: "消耗任意数量的Charge。" }],
    ["1 Charge = 1 Ball.", { ja: "1 Charge = 1 Ball。", zh: "1 Charge = 1球。" }],
    ["Directly removes 1.5 HP", { ja: "1.5 HPを直接減少", zh: "直接移除1.5 HP" }],
    ["ignores Shield/Defend", { ja: "Shield/Defendを無視", zh: "无视护盾/防御" }],
    ["does not reduce the target's Max HP", { ja: "対象のMax HPは減少しない", zh: "不会降低目标最大HP" }],
    ["permanent Shield", { ja: "永続Shield", zh: "永久护盾" }],
    ["temporary Shield", { ja: "一時Shield", zh: "临时护盾" }],
    ["Max HP", { ja: "Max HP", zh: "最大HP" }],
    ["damage", { ja: "ダメージ", zh: "伤害" }],
    ["Damage", { ja: "ダメージ", zh: "伤害" }],
    ["Defending", { ja: "防御中", zh: "防御中" }],
    ["Invincible", { ja: "無敵", zh: "无敌" }],
    ["Stunned", { ja: "スタン", zh: "眩晕" }],
    ["Pending Death", { ja: "死亡保留中", zh: "待死亡" }],
    ["Emergency Ready", { ja: "緊急祝福 準備完了", zh: "紧急祝福可用" }],
    ["Rebirth Ready", { ja: "再生 準備完了", zh: "重生可用" }],
    ["Rebirth Used", { ja: "再生 使用済み", zh: "重生已使用" }],
    ["Bless Ready", { ja: "祝福 準備完了", zh: "祝福可用" }],
    ["Bless Used", { ja: "祝福 使用済み", zh: "祝福已使用" }],
    ["Waiting for", { ja: "待機中:", zh: "正在等待" }],
    ["Create Room", { ja: "ルーム作成", zh: "创建房间" }],
    ["Join Room", { ja: "ルーム参加", zh: "加入房间" }],
    ["Room", { ja: "ルーム", zh: "房间" }]
  ];

  function replacePhrases(text, lang) {
    if (lang === "en") return text;
    let result = text;
    for (const [en, vals] of phrasePairs) {
      result = result.split(en).join(vals[lang]);
    }
    return result;
  }

  function translateText(original, lang) {
    if (!original || lang === "en") return original;

    const trimmed = original.trim();
    if (!trimmed) return original;

    const direct = exact[trimmed]?.[lang];
    if (direct) {
      return preserveOuterWhitespace(original, direct);
    }

    for (const pattern of patterns) {
      const match = trimmed.match(pattern.re);
      if (match) {
        return preserveOuterWhitespace(original, pattern[lang](match));
      }
    }

    // Stage 2 creates many dynamic battle messages. Translate known
    // character names and common battle phrases even when the whole
    // sentence is not an exact dictionary match.
    let fallback = replaceNames(trimmed, lang);
    fallback = replacePhrases(fallback, lang);
    return preserveOuterWhitespace(original, fallback);
  }

  function preserveOuterWhitespace(original, translated) {
    const lead = original.match(/^\s*/)?.[0] || "";
    const tail = original.match(/\s*$/)?.[0] || "";
    return `${lead}${translated}${tail}`;
  }

  const originalText = new WeakMap();
  const lastRenderedText = new WeakMap();
  const originalAttrs = new WeakMap();
  const lastRenderedAttrs = new WeakMap();
  let currentLanguage = normalizeLanguage(localStorage.getItem(STORAGE_KEY) || "en");
  let translating = false;

  function normalizeLanguage(lang) {
    return SUPPORTED.includes(lang) ? lang : "en";
  }

  function rememberTextNode(node) {
    const current = node.nodeValue;

    if (!originalText.has(node)) {
      originalText.set(node, current);
      lastRenderedText.set(node, current);
      return;
    }

    // If game.js / online.js changed this node after the last translation,
    // treat the new English text as the new source string.
    const lastRendered = lastRenderedText.get(node);
    if (current !== lastRendered) {
      originalText.set(node, current);
    }
  }

  function rememberElementAttrs(el) {
    const current = {
      placeholder: el.getAttribute("placeholder"),
      title: el.getAttribute("title"),
      ariaLabel: el.getAttribute("aria-label")
    };

    if (!originalAttrs.has(el)) {
      originalAttrs.set(el, current);
      lastRenderedAttrs.set(el, { ...current });
      return;
    }

    const last = lastRenderedAttrs.get(el) || {};
    const base = originalAttrs.get(el);

    for (const key of ["placeholder", "title", "ariaLabel"]) {
      if (current[key] !== last[key]) {
        base[key] = current[key];
      }
    }
  }

  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      rememberTextNode(node);
      const base = originalText.get(node);
      const next = translateText(base, currentLanguage);
      if (node.nodeValue !== next) node.nodeValue = next;
      lastRenderedText.set(node, next);
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node;
    if (el.closest && el.closest("#qd-language-switcher")) return;

    rememberElementAttrs(el);
    const attrs = originalAttrs.get(el);

    if (attrs.placeholder !== null) {
      let value = attrs.placeholder;
      if (value === "ROOM CODE") {
        value = currentLanguage === "ja" ? "ルームコード" : currentLanguage === "zh" ? "房间码" : "ROOM CODE";
      } else {
        value = translateText(value, currentLanguage).trim();
      }
      el.setAttribute("placeholder", value);
    }

    if (attrs.title !== null) {
      el.setAttribute("title", translateText(attrs.title, currentLanguage).trim());
    }

    if (attrs.ariaLabel !== null) {
      el.setAttribute("aria-label", translateText(attrs.ariaLabel, currentLanguage).trim());
    }

    lastRenderedAttrs.set(el, {
      placeholder: el.getAttribute("placeholder"),
      title: el.getAttribute("title"),
      ariaLabel: el.getAttribute("aria-label")
    });

    for (const child of el.childNodes) translateNode(child);
  }

  function translateWholeDocument() {
    if (translating) return;
    translating = true;
    try {
      document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : currentLanguage;
      document.title = currentLanguage === "ja" ? "Quick Duel - クイックデュエル" : currentLanguage === "zh" ? "Quick Duel - 快速决斗" : "Quick Duel";
      translateNode(document.body);
    } finally {
      translating = false;
    }
  }

  function updateSwitcherText() {
    const label = document.querySelector("#qd-language-switcher label");
    if (!label) return;
    label.textContent = currentLanguage === "ja" ? "言語" : currentLanguage === "zh" ? "语言" : "Language";
  }

  function setLanguage(lang) {
    currentLanguage = normalizeLanguage(lang);
    localStorage.setItem(STORAGE_KEY, currentLanguage);
    const select = document.getElementById("qd-language-select");
    if (select && select.value !== currentLanguage) select.value = currentLanguage;
    updateSwitcherText();
  
  patterns.push(
    {
      re: /^⚖️ Soul Sentence: (.+) directly loses ([0-9.]+) HP from Weight ([0-9.]+)\. (.+) then loses half of current HP, gains 1 Judgment Shield for two rounds, is stunned for 1 action, and Weight resets to 0\.$/,
      ja: m => `⚖️ Soul Sentence：${replaceNames(m[1], "ja")}はWeight ${m[3]}により直接${m[2]} HP失う。${replaceNames(m[4], "ja")}は現在HPの半分を失い、2ラウンドのJudgment Shield 1を得て1行動スタンし、Weightは0にリセット。`,
      zh: m => `⚖️ 灵魂判决：${replaceNames(m[1], "zh")}因Weight ${m[3]}直接失去${m[2]} HP。${replaceNames(m[4], "zh")}随后失去当前HP的一半，获得1点持续2回合的审判护盾，眩晕1次行动，并将Weight清零。`
    }
  );

  translateWholeDocument();
    window.dispatchEvent(new CustomEvent("quickduel:languagechange", { detail: { language: currentLanguage } }));
  }

  function installSwitcher() {
    const existing = document.getElementById("qd-language-switcher");
    if (existing) {
      const select = existing.querySelector("#qd-language-select");
      if (select && !select.dataset.qdLanguageBound) {
        select.dataset.qdLanguageBound = "1";
        select.value = currentLanguage;
        select.addEventListener("change", () => setLanguage(select.value));
      }
      updateSwitcherText();
      return;
    }

    const style = document.createElement("style");
    style.textContent = `
      #qd-language-switcher {
        position: fixed;
        top: 14px;
        right: 14px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border: 1px solid #34343f;
        border-radius: 10px;
        background: rgba(18, 18, 24, 0.94);
        color: #fff;
        font-family: Arial, "Noto Sans CJK JP", "Noto Sans CJK SC", sans-serif;
        font-size: 13px;
        backdrop-filter: blur(8px);
      }
      #qd-language-switcher label { opacity: .72; }
      #qd-language-select {
        min-height: 34px;
        border: 1px solid #4a4a58;
        border-radius: 7px;
        background: #24242d;
        color: #fff;
        padding: 4px 8px;
        font: inherit;
        cursor: pointer;
      }
      @media (max-width: 620px) {
        #qd-language-switcher {
          position: static;
          width: fit-content;
          margin: 10px auto 0;
        }
      }
    `;
    document.head.appendChild(style);

    const wrapper = document.createElement("div");
    wrapper.id = "qd-language-switcher";
    wrapper.innerHTML = `
      <label for="qd-language-select">Language</label>
      <select id="qd-language-select" aria-label="Language">
        <option value="en">English</option>
        <option value="ja">日本語</option>
        <option value="zh">简体中文</option>
      </select>
    `;
    document.body.appendChild(wrapper);

    const select = wrapper.querySelector("select");
    select.dataset.qdLanguageBound = "1";
    select.value = currentLanguage;
    select.addEventListener("change", () => setLanguage(select.value));
    updateSwitcherText();
  }

  const observer = new MutationObserver(mutations => {
    if (translating) return;
    translating = true;
    try {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          translateNode(mutation.target);
          continue;
        }
        for (const node of mutation.addedNodes) translateNode(node);
      }
    } finally {
      translating = false;
    }
  });

  Object.assign(exact, {"Feather of Judgment (2C): assign 2 total integer Weight to enemies: +2 to one enemy or +1 to each. Judgment of the Dead (4C): deal damage to both living enemies equal to each target's current Weight, stun each surviving target for 1 action, then reset both targets' Weight to 0. Final Judgment triggers automatically when Weight reaches starting Max HP minus 1, ignoring HP and Shield. Revival keeps half the previous Weight, rounded up.": {"zh": "审判之羽（2C）：给敌人分配总共2点整数Weight，可给一人+2或两人各+1。亡者审判（4C）：对所有存活敌人造成等于各自Weight的伤害，使幸存者眩晕1次行动，然后清空其Weight。Weight达到初始最大HP−1时自动触发最终审判，无视HP与护盾；复活保留原Weight的一半，向上取整。", "ja": "審判の羽（2C）：敵1体にWeight+2、または敵2体に各+1。亡者の審判（4C）は従来通り。Weightが初期最大HP−1に達すると自動で最終審判。復活時のWeightは直前の半分（切り上げ）。"}, "Each enemy's Weight Limit equals starting Max HP minus 1; Weight is always an integer. The first time Anubis is alive below 2.5 HP, gain 2 Charge (once per battle). Active Charge or Skill gives +1 Weight; a normal Attack removes 1 Weight; Defend and Heal do not change Weight. Anubis's normal Attack deals no damage and gives the target +1 Weight. Every 2 completed rounds, each living enemy gains +1 Weight automatically. Every 3 completed rounds Anubis gains 1 Charge. Every 2 actual HP Anubis loses makes the current attacking enemy lose 1 Weight. Every 3 enemy attack instances against Anubis's team makes Anubis lose 1 Charge. If Anubis is defeated, all enemy Weight is cleared. Final Judgment preserves the other enemy's Weight; a target revived by Final Judgment returns with half of its previous Weight, rounded up.": {"zh": "Weight阈值为初始最大HP−1，Weight始终为整数。Anubis首次存活且HP低于2.5时获得2 Charge，每场一次。敌人主动Charge或Skill加1 Weight，普攻减1，Defend和Heal不变。Anubis普攻无伤害，给目标加1 Weight。每2个完整回合存活敌人各加1 Weight，每3个完整回合Anubis获得1 Charge。Anubis每实际损失累计2 HP，当前攻击者减1 Weight；队伍每受3次敌方攻击判定，Anubis减1 Charge。Anubis被击败时清空敌方Weight。最终审判保留另一敌人的Weight，复活目标保留之前Weight的一半并向上取整。", "ja": "Weight上限は初期最大HP−1、Weightは整数。生存中に初めてHPが2.5未満になるとCharge+2（1戦1回）。他のパッシブ効果は従来通り。"}, "⚖️ +1 Weight each — 2 Charge": {"zh": "⚖️ 两名敌人各+1 Weight — 2 Charge", "ja": "⚖️ 敵2体に各Weight+1 — 2 Charge"}, "⚖️ Last Reserve: Anubis gains 2 Charge.": {"zh": "⚖️ 最后储备：Anubis获得2 Charge。", "ja": "⚖️ 最後の備え：AnubisのCharge+2。"}, "⚖️ Feather of Judgment: 2 Charge spent, 2 Weight assigned.": {"zh": "⚖️ 审判之羽：消耗2 Charge，分配2 Weight。", "ja": "⚖️ 審判の羽：2 Chargeを消費し、Weightを合計2付与。"}});

  installSwitcher();
  translateWholeDocument();
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  window.QDLanguage = {
    getLanguage: () => currentLanguage,
    setLanguage,
    translateText: text => translateText(String(text), currentLanguage)
  };

  // =====================================================
  // BALANCE UPDATE — Blast Mage / Angel / Puppeteer
  // =====================================================
  Object.assign(exact, {
    "Spend 2+ Charge. At 2 Charge, deal 2.5 damage to the main target and 1 damage to the other enemy. Each additional Charge adds +1 main-target damage and +0.5 secondary-target damage. After Arcane Blast, gain +0.5 Max HP and restore 0.5 HP.": {
      ja: "Chargeを2以上消費。2Cでは主対象に2.5、もう1体に1ダメージ。追加Chargeごとに主対象+1、副対象+0.5。Arcane Blast後、自身のMax HPを0.5増加し、HPを0.5回復。",
      zh: "消耗2+ Charge。2C时主目标2.5、另一个敌人1伤害；每额外1 Charge，主目标+1、副目标+0.5。奥术爆破后最大HP+0.5，并恢复0.5 HP。"
    },
    "Transfer any amount of Angel's Charge to the teammate. Empower costs 2+ Charge: 2 Charge gives +1 damage to the teammate's next damaging action and 1 Shield for two rounds; each extra Charge adds +0.5 damage and +0.5 Shield. Or spend 1 Charge to sacrifice up to 2 of Angel's HP and Max HP; the teammate receives the sacrificed amount minus 1 as HP.": {
      ja: "AngelのChargeを任意量味方へ移せる。Empowerは2+ Charge：2Cで味方の次の攻撃系行動+1ダメージ、2ラウンド持続するShield+1。追加Chargeごとに+0.5ダメージ/+0.5 Shield。ほかに1 ChargeでAngelのHPとMax HPを最大2犠牲にし、味方は犠牲量-1のHPを受け取る。",
      zh: "可把Angel任意数量的Charge转给队友。Empower消耗2+ Charge：2C使队友下一次伤害行动+1伤害，并获得持续2回合的1点护盾；每额外1C再+0.5伤害/+0.5护盾。也可消耗1 Charge，牺牲Angel最多2点HP与最大HP，使队友获得“牺牲量-1”的HP。"
    },
    "Starts with 1 Life Puppet and 1 Charge, but no regular Puppets. Every newly created Puppet grants +0.5 Max HP and restores 0.5 HP.": {
      ja: "開始時Life Puppet 1体とCharge 1を持つが、通常Puppetは0。新しいPuppetを作るたびMax HP+0.5、HP0.5回復。",
      zh: "开局拥有1个生命傀儡和1 Charge，但没有普通傀儡。每制造一个新傀儡，最大HP+0.5并恢复0.5 HP。"
    }
  });

  // =====================================================
  // BALANCE UPDATE — Prophet proportional damage
  // =====================================================
  Object.assign(exact, {
    "Each prediction costs 1 Charge. During one Skill action, Prophet may secretly predict one enemy and then choose whether to also predict another living enemy. For each chosen target, predict Attack, Defend, Charge, Heal, or Skill on that target's next scheduled turn (this round if it has not acted yet, otherwise next round). A correct prediction immediately cancels that action and makes the target directly lose one-third of its Max HP, rounded up so three successful Prophecies are enough to defeat a full-HP target, ignoring Shield. If every Prophecy resolving in a round succeeds, Prophet gains +1 HP and +1 Max HP. The battle log only states that Prophet completed a prophecy and never reveals the selected target(s).": {
      ja: "予言1つにつきChargeを1消費。1回のSkill行動で、まず敵1体を秘密裏に予言し、その後もう1体の生存中の敵も予言するか選べる。各対象について、次の行動（今ラウンド未行動なら今ラウンド、それ以外は次ラウンド）にAttack・Defend・Charge・Heal・Skillのどれを使うか予言する。予言成功時、その行動を直ちにキャンセルし、Shieldを無視して対象のMax HPの3分の1を切り上げた値だけ直接失わせる。満タンの対象でも3回成功すれば倒せる。同一ラウンドに解決されるProphecyがすべて成功した場合、ProphetはHP+1、Max HP+1。バトルログにはProphetが予言を完了したことだけが表示され、対象や予言内容は公開されない。",
      zh: "每次预言消耗1 Charge。一次Skill行动中，预言家可以秘密预言一名敌人，并可继续选择是否预言另一名存活敌人。对每个目标，预测其接下来的行动（本轮尚未行动则本轮生效，否则下一轮）会使用Attack、Defend、Charge、Heal或Skill。预言成功时立刻取消该行动，并无视护盾，使目标直接失去其最大HP的1/3并向上取整；因此满血目标连续被成功预言3次即可被击败。若同一回合结算的所有Prophecy全部成功，预言家获得+1 HP与+1最大HP。战斗记录只会显示预言家完成了预言，不会公开目标或预言内容。"
    },
    "Cost 1 Charge. Secretly predict whether one enemy will use Attack, Defend, Charge, Heal, or Skill on that enemy's turn next round. If correct, immediately cancel that action and make the target directly lose one-third of its Max HP, rounded up so three successful Prophecies are enough to defeat a full-HP target, ignoring Shield. If every Prophecy resolving in a round succeeds, Prophet gains +1 HP and +1 Max HP.": {
      ja: "Chargeを1消費。敵1体が次ラウンドの自身のターンにAttack・Defend・Charge・Heal・Skillのどれを使うか秘密裏に予言する。成功した場合、その行動を直ちにキャンセルし、Shieldを無視して対象のMax HPの3分の1を切り上げた値だけ直接失わせる。満タンの対象でも3回成功すれば倒せる。同一ラウンドに解決されるProphecyがすべて成功した場合、ProphetはHP+1、Max HP+1。",
      zh: "消耗1 Charge。秘密预测一名敌人在下一回合自己的行动中会使用Attack、Defend、Charge、Heal或Skill。若预测成功，立刻取消该行动，并无视护盾，使目标直接失去其最大HP的1/3并向上取整；因此满血目标连续被成功预言3次即可被击败。若同一回合结算的所有Prophecy全部成功，预言家获得+1 HP与+1最大HP。"
    }
  });


  // =====================================================
  // BALANCE UPDATE — Vampire simplified rework / Fighter nerf
  // =====================================================
  Object.assign(exact, {
    "Cost 2 Charge. Deal 2.5 damage to one enemy and gain 1 permanent Shield.": {
      ja: "Chargeを2消費。敵1体に2.5ダメージを与え、永続Shieldを1得る。",
      zh: "消耗2 Charge：对一个敌人造成2.5伤害，并获得1点永久护盾。"
    },
    "A late-game scaling fighter who drains the teammate for growth, heals through attacks, and becomes much stronger after fighting alone.": {
      ja: "味方から血を吸って成長し、通常攻撃で回復しながら、単独戦になると大きく強化される終盤型ファイター。",
      zh: "通过吸取队友生命成长，并依靠普攻回血；进入单人作战后会显著强化的后期型角色。"
    },
    "Blood Drain (0C): drain up to 3 HP from the living teammate without reducing the teammate's Max HP. The drain amount is not limited by Vampire's remaining Max HP growth room; Vampire restores the drained amount and gains the same amount of Max HP, both capped by the 13 Max HP limit. Blood Recovery: spend 2 Charge to restore 2 HP; after the teammate is defeated, this costs only 1 Charge.": {
      ja: "Blood Drain（0C）：生存中の味方から最大3 HP吸収し、味方のMax HPは減少しない。吸収量はVampire側のMax HP成長余地によって制限されない。Vampireは吸収量ぶんHPを回復し、同量のMax HPを得るが、どちらもMax HP上限13の範囲内で処理される。Blood Recovery：2 Chargeで2 HP回復。味方撃破後は1 Chargeになる。",
      zh: "吸血（0C）：最多吸取存活队友3 HP，不降低队友最大HP。可吸取的数值不再受Vampire剩余最大HP成长空间限制；Vampire恢复等量HP并增加等量最大HP，但最终都受13最大HP上限限制。鲜血恢复：消耗2 Charge恢复2 HP；队友被击败后只需1 Charge。"
    },
    "Max HP cannot exceed 13. Every 5 completed rounds gain 1 Charge. Every 3 completed rounds lose 2 HP and 1 Max HP, but this decay cannot directly defeat Vampire. While the teammate lives, incoming damage is reduced by 0.5. A normal attack that deals HP damage grants +0.5 Max HP and restores 0.5 HP; after the teammate is defeated, it restores 1 HP instead and normal attacks deal +1 damage. When current HP is above 9, each full HP above 9 adds +0.5 normal-attack damage. The first time Vampire is defeated, Vampire revives with 4 HP.": {
      ja: "Max HP上限は13。5ラウンド完了ごとにCharge+1。3ラウンド完了ごとにHP-2、Max HP-1（この衰弱では直接死亡しない）。味方生存中は被ダメージ-0.5。通常攻撃で実HPダメージを与えるとMax HP+0.5、HP0.5回復。味方撃破後は回復量が1 HPになり、通常攻撃ダメージ+1。現在HPが9を超えている場合、9を超えた完全な1 HPごとに通常攻撃ダメージ+0.5。初回撃破時、4 HPで復活する。",
      zh: "最大HP上限13。每5个完整回合获得1 Charge。每3个完整回合失去2 HP与1最大HP，但该衰减不会直接击败Vampire。队友存活时受到的伤害-0.5。普通攻击造成实际HP伤害后，最大HP+0.5并恢复0.5 HP；队友被击败后，普攻回血变为1 HP，并额外+1伤害。当前HP高于9时，每完整高出1 HP，使普通攻击额外+0.5伤害。首次被击败时，以4 HP复活。"
    },
    "🩸 Drain Teammate — 0 Charge": { ja: "🩸 味方から吸血 — 0 Charge", zh: "🩸 吸取队友 — 0 Charge" },
    "❤️ Blood Recovery — 2 Charge": { ja: "❤️ Blood Recovery — 2 Charge", zh: "❤️ 鲜血恢复 — 2 Charge" },
    "❤️ Blood Recovery — 1 Charge": { ja: "❤️ Blood Recovery — 1 Charge", zh: "❤️ 鲜血恢复 — 1 Charge" },
    "Blood Drain cannot be used on the teammate right now.": { ja: "現在この味方にはBlood Drainを使用できない。", zh: "当前无法对该队友使用吸血。" },
    "Drain up to 3 HP, regardless of Vampire's remaining Max HP growth room. Vampire restores the drained amount and gains the same amount of Max HP, both capped by the 13 Max HP limit. The teammate loses only current HP; their Max HP is not reduced.": {
      ja: "Vampire側のMax HP成長余地に関係なく、味方から最大3 HP吸収できる。Vampireは吸収量ぶんHPを回復し、同量のMax HPを得るが、どちらもMax HP上限13の範囲内。味方は現在HPのみ失い、Max HPは減少しない。",
      zh: "无论Vampire还剩多少最大HP成长空间，都可以最多吸取队友3 HP。Vampire恢复等量HP并增加等量最大HP，但都受13最大HP上限限制；队友只失去当前HP，最大HP不会降低。"
    }
  });


  // =====================================================
  // BALANCE UPDATE V11 — Devil nerf
  // =====================================================
  Object.assign(exact, {
    "Blood Drain: drain up to 5 HP from the teammate. Devil permanently gains Max HP equal to the amount drained and restores the same amount of HP. The teammate gains Shield equal to max(0, drained HP - 1) for two rounds. Berserk: spend 2 Charge to enter Berserk for three rounds, immediately distribute 3 total damage among living enemies, stun the main target for 1 action if it survives, restore 1.5 HP, and gain 1.5 permanent Shield. Skills cannot be used during Berserk.": {
      ja: "Blood Drain：味方から最大5 HP吸収。Devilは吸収量と同じMax HPを永久に得て同量回復。味方はmax(0, 吸収量-1)のShieldを2ラウンド得る。Berserk：Charge 2で3ラウンド狂暴化し、生存中の敵へ合計3ダメージを分配、主対象が生存なら1行動スタン、自身1.5回復+永続Shield1.5。狂暴中Skill不可。",
      zh: "Blood Drain：最多吸取队友5 HP；Devil永久增加等量最大HP并恢复等量HP，队友获得max(0, 吸血量-1)的护盾，持续2回合。Berserk：消耗2 Charge进入3回合狂暴，立即在存活敌人之间分配总计3伤害；主目标若存活则眩晕1次行动；Devil恢复1.5 HP并获得1.5永久护盾。狂暴期间不能使用技能。"
    },
    "At the end of every round, Devil loses 0.5 HP and 0.5 Max HP. During Berserk, Devil instead loses 1 HP while Max HP still falls by 0.5. Every 3 completed rounds, Devil gains 1 Charge. At 8 HP or lower, normal attacks gain +1 damage. During Berserk, the next normal attack gains another +1.5; if it leaves the target alive at 4 HP or lower, Devil restores 2 HP. When Devil starts a normal attack at 3 HP or lower, Devil restores 1 HP after the attack. When Berserk ends, Devil restores 0.5 HP and is stunned for the next turn.": {
      ja: "毎ラウンド終了時にHP-0.5、Max HP-0.5。Berserk中はHP-1、Max HP-0.5。3ラウンド完了ごとにCharge+1。HP8以下で通常攻撃+1ダメージ。Berserk中の次の通常攻撃はさらに+1.5し、対象が生存してHP4以下ならDevilは2 HP回復。通常攻撃開始時にHP3以下なら、攻撃後さらに1 HP回復。Berserk終了時に0.5 HP回復し、次のターンはスタン。",
      zh: "每回合结束时，Devil失去0.5 HP和0.5最大HP；狂暴期间改为失去1 HP，但最大HP仍减少0.5。每3个完整回合获得1 Charge。HP不高于8时，普攻+1伤害；狂暴期间下一次普攻再+1.5，若目标存活且HP不高于4，则Devil恢复2 HP。若Devil开始普攻时HP不高于3，攻击结束后再恢复1 HP。狂暴结束时恢复0.5 HP，并眩晕自己的下一次行动。"
    }
  });

  // =====================================================
  // BALANCE UPDATE V10 — Anubis / Assassin / Vampire revive
  // =====================================================
  Object.assign(exact, {
    "Starts with 0 Charge. Once per battle, Assassin reduces one incoming damage instance by 1. Execution refunds 2 Charge whenever its target survives. While Assassin is below 4 HP, Execution deals 2 less damage.": {
      ja: "開始時Chargeは0。1戦につき1回、受けるダメージ1回を1軽減する。Executionの対象が生存した場合、2 Chargeを返還。AssassinのHPが4未満の間、Executionのダメージは2低下する。",
      zh: "开局Charge为0。每场战斗仅一次，Assassin可使一次受到的伤害减少1点。Execution未击败目标时返还2 Charge。Assassin的HP低于4时，Execution伤害降低2点。"
    },
    "Each enemy's Weight Limit equals starting Max HP minus 1; Weight is always an integer. The first time Anubis is alive below 2.5 HP, gain 2 Charge (once per battle). Active Charge or Skill gives +1 Weight; a normal Attack removes 1 Weight; Defend and Heal do not change Weight. Anubis's normal Attack deals no damage and gives the target +1 Weight. Every 2 completed rounds, each living enemy gains +1 Weight automatically. Every 3 completed rounds Anubis gains 1 Charge. Every 2 actual HP Anubis loses makes the current attacking enemy lose 1 Weight. Every 3 enemy attack instances against Anubis's team makes Anubis lose 1 Charge. If Anubis is revived, existing enemy Weight is preserved; only when Anubis is fully defeated is all enemy Weight cleared. Final Judgment preserves the other enemy's Weight; a target revived by Final Judgment returns with half of its previous Weight, rounded up.": {
      ja: "各敵のWeight上限は初期Max HP−1で、Weightは常に整数。Anubisが生存中に初めてHP2.5未満になるとCharge+2（1戦1回）。敵が能動的にChargeまたはSkillを使うとWeight+1、通常AttackでWeight−1、DefendとHealでは変化しない。Anubisの通常Attackは0ダメージで対象のWeight+1。2ラウンド完了ごとに生存中の敵全員がWeight+1、3ラウンド完了ごとにAnubisはCharge+1。Anubisが実HPを累計2失うごとに現在の攻撃者のWeight−1。Anubis側が敵の攻撃判定を3回受けるごとにAnubisのCharge−1。Anubisが復活した場合、敵に付いているWeightは維持され、完全に撃破された時だけ敵全員のWeightが消える。Final Judgmentではもう一方の敵のWeightを維持し、復活した対象は直前のWeightの半分（切り上げ）で戻る。",
      zh: "每名敌人的Weight上限等于其初始最大HP−1，Weight始终为整数。Anubis首次在存活状态下降到2.5 HP以下时获得2 Charge，每场一次。敌人主动使用Charge或Skill时Weight+1，普通Attack使Weight−1，Defend和Heal不改变Weight。Anubis普攻不造成伤害，并给目标+1 Weight。每2个完整回合，所有存活敌人自动+1 Weight；每3个完整回合Anubis获得1 Charge。Anubis每实际损失累计2 HP，当前攻击者Weight−1；Anubis队伍每受到3次敌方攻击判定，Anubis失去1 Charge。若Anubis触发复活，场上敌人已有的Weight全部保留；只有Anubis被完全击败后才清空所有敌方Weight。Final Judgment保留另一名敌人的Weight；被Final Judgment击败后复活的目标保留之前Weight的一半并向上取整。"
    },
    "Max HP cannot exceed 13. Every 5 completed rounds gain 1 Charge. Every 3 completed rounds lose 2 HP and 1 Max HP, but this decay cannot directly defeat Vampire. While the teammate lives, incoming damage is reduced by 0.5. A normal attack that deals HP damage grants +0.5 Max HP and restores 0.5 HP; after the teammate is defeated, it restores 1 HP instead and normal attacks deal +1 damage. When current HP is above 9, each full HP above 9 adds +0.5 normal-attack damage. The first time Vampire is defeated: if the teammate is alive, drain up to 3 HP from that teammate (leaving at least 0.5 HP) and revive with 3 HP; if the teammate is already defeated, revive with 1 HP, become invincible for the rest of the current round, and the next normal attack gains +2.5 damage and +1 lifesteal.": {
      ja: "Max HP上限は13。5ラウンド完了ごとにCharge+1。3ラウンド完了ごとにHP−2、Max HP−1（この衰弱では直接死亡しない）。味方生存中は被ダメージ−0.5。通常攻撃で実HPダメージを与えるとMax HP+0.5、HP0.5回復。味方撃破後は通常攻撃の回復量が1 HPになり、さらに通常攻撃ダメージ+1。現在HPが9を超えている場合、9を超えた完全な1 HPごとに通常攻撃+0.5ダメージ。初回撃破時、味方が生存していれば味方から最大3 HP吸収（最低0.5 HPを残す）して3 HPで復活。味方がすでに撃破されている場合は1 HPで復活し、そのラウンド終了まで無敵となり、次の通常攻撃に+2.5ダメージと吸血+1を得る。",
      zh: "最大HP上限13。每5个完整回合获得1 Charge。每3个完整回合失去2 HP与1最大HP，但该衰减不会直接击败Vampire。队友存活时受到的伤害−0.5。普通攻击造成实际HP伤害后，最大HP+0.5并恢复0.5 HP；队友被击败后，普攻回血变为1 HP，并额外+1伤害。当前HP高于9时，每完整高出1 HP使普通攻击额外+0.5伤害。首次被击败时：若队友仍存活，最多从队友吸取3 HP（至少给队友保留0.5 HP），并以3 HP复活；若队友已经被击败，则以1 HP复活，本回合剩余时间内无敌，并使下一次普通攻击+2.5伤害、吸血+1。"
    },
    "✨ Rebirth Invincible (this round)": {
      ja: "✨ 復活無敵（このラウンド）",
      zh: "✨ 复活无敌（本回合）"
    }
  });

  patterns.push(
    {
      re: /^😈 Infernal Momentum: (.+) gains 1 Charge\.$/,
      ja: m => `😈 Infernal Momentum：${replaceNames(m[1], "ja")}のCharge+1。`,
      zh: m => `😈 地狱动能：${replaceNames(m[1], "zh")}获得1 Charge。`
    }
  );

  patterns.push(
    {
      re: /^🧛 Blood Rebirth! (.+) drains ([0-9.]+) HP from (.+) \(up to 3, leaving at least 0.5 HP\) and revives with ([0-9.]+) HP\.$/,
      ja: m => `🧛 Blood Rebirth！${replaceNames(m[1], "ja")}は${replaceNames(m[3], "ja")}から${m[2]} HP吸収し（最大3、最低0.5 HPを残す）、${m[4]} HPで復活。`,
      zh: m => `🧛 鲜血重生！${replaceNames(m[1], "zh")}从${replaceNames(m[3], "zh")}吸取${m[2]} HP（最多3点，至少保留0.5 HP），并以${m[4]} HP复活。`
    },
    {
      re: /^🧛 Blood Rebirth! With the teammate already defeated, (.+) revives with 1 HP, is invincible for the rest of Round (\d+), and the next normal attack gains \+2\.5 damage and \+1 lifesteal\.$/,
      ja: m => `🧛 Blood Rebirth！味方がすでに撃破されているため、${replaceNames(m[1], "ja")}は1 HPで復活し、ラウンド${m[2]}終了まで無敵。次の通常攻撃は+2.5ダメージ、吸血+1。`,
      zh: m => `🧛 鲜血重生！由于队友已经被击败，${replaceNames(m[1], "zh")}以1 HP复活，并在第${m[2]}回合剩余时间内无敌；下一次普通攻击+2.5伤害、吸血+1。`
    }
  );



  // =====================================================
  // BALANCE UPDATE V12 — Anubis full rework
  // =====================================================
  Object.assign(exact, {
    "A self-weighing executioner who builds one shared Weight resource, binds it to a chosen enemy, and turns accumulated judgment into direct HP loss.": {
      ja: "自身にWeightを蓄積し、その重みを選んだ敵へ結びつけ、蓄積した審判を直接HP減少へ変える処刑型キャラクター。",
      zh: "将Weight累积在自身，并把这份重量绑定到指定敌人，再把积累的审判转化为直接HP损失的处决型角色。"
    },
    "Scales of the Duat": {
      ja: "ドゥアトの天秤",
      zh: "冥界天秤"
    },
    "Bind the Scales (0C): choose one living enemy to bind to Anubis's current Weight. Weigh the Heart (1C): gain 2 Weight, then directly lose 0.5 HP. Soul Sentence (2C): only usable when Weight is greater than half of the bound target's current Max HP; that target directly loses HP equal to the current Weight, ignoring Shield. After Soul Sentence, Anubis directly loses half of current HP, gains 1 Judgment Shield for two rounds, is stunned for 1 action, and Weight is reset to 0.": {
      ja: "Bind the Scales（0C）：生存中の敵1体をAnubisの現在Weightに結びつける。Weigh the Heart（1C）：Weight+2、その後0.5 HPを直接失う。Soul Sentence（2C）：Weightが結びつけた対象の現在Max HPの半分より大きい時のみ使用可能。対象はShieldを無視して現在Weightと同じHPを直接失う。使用後、Anubisは現在HPの半分を直接失い、2ラウンド持続するJudgment Shieldを1得て、1行動スタンし、Weightは0にリセットされる。",
      zh: "绑定天秤（0C）：选择一名存活敌人，与Anubis当前的Weight绑定。衡量心脏（1C）：自身获得2 Weight，随后直接失去0.5 HP。灵魂判决（2C）：仅当Weight严格大于被绑定目标当前最大HP的一半时可用；目标无视护盾，直接失去等于当前Weight的HP。使用后，Anubis直接失去当前HP的一半，获得1点持续2回合的审判护盾，眩晕1次行动，并将Weight清空为0。"
    },
    "Burden of the Heart": {
      ja: "心臓の重荷",
      zh: "心之重负"
    },
    "Starts with 0 Weight. Anubis's normal Attack deals 0 damage and gives Anubis +1 Weight. Every 3 completed rounds Anubis gains 1 Weight. Every 5 completed rounds Anubis gains 1 Charge. Whenever either enemy gains Charge, Anubis gains +1 Weight. Enemy Defend reduces Weight by 1. Each enemy separately tracks actual HP restored; every cumulative 2 HP restored by that enemy reduces Weight by 1. Every cumulative 3.5 actual HP damage Anubis's team receives from enemies reduces Weight by 1, but this damage rule can reduce Weight at most once per round. Defend, healing, and team-damage reductions can stack.": {
      ja: "開始時Weightは0。Anubisの通常Attackは0ダメージで、自身のWeight+1。3ラウンド完了ごとにWeight+1、5ラウンド完了ごとにCharge+1。敵のどちらかがChargeを得るたびAnubisのWeight+1。敵がDefendを使うとWeight-1。敵ごとに実際の回復HPを個別に累積し、その敵が累計2 HP回復するたびWeight-1。Anubis側が敵から累計3.5の実HPダメージを受けるたびWeight-1。ただしこのダメージ由来の減少は1ラウンドにつき最大1回。Defend・回復・チーム被ダメージによるWeight減少は重複可能。",
      zh: "开局拥有0 Weight。Anubis的普通Attack造成0伤害，并使自身Weight+1。每3个完整回合获得1 Weight；每5个完整回合获得1 Charge。任一敌人每次获得Charge，Anubis的Weight+1。敌人使用Defend时Weight-1。两名敌人分别累计实际恢复的HP；某名敌人每累计恢复2 HP，Weight-1。Anubis队伍每累计受到来自敌人的3.5点实际HP伤害，Weight-1，但这种“受伤减Weight”每回合最多触发一次。Defend、治疗和队伍受伤造成的Weight减少可以叠加。"
    },
    "🔗 Bind the Scales — 0 Charge": {
      ja: "🔗 天秤を結ぶ — 0 Charge",
      zh: "🔗 绑定天秤 — 0 Charge"
    },
    "⚖️ Scales of the Duat": {
      ja: "⚖️ ドゥアトの天秤",
      zh: "⚖️ 冥界天秤"
    },
    "🔗 Choose Weight-Bound Target": {
      ja: "🔗 Weightを結びつける対象を選択",
      zh: "🔗 选择Weight绑定目标"
    },
    "🔗 Weight Bound": {
      ja: "🔗 Weight拘束",
      zh: "🔗 Weight已绑定"
    },
    "⚖️ Judgment Shield": {
      ja: "⚖️ Judgment Shield",
      zh: "⚖️ 审判护盾"
    }
  });

  // =====================================================
  // BALANCE UPDATE V13 — Devil / Vampire / Tank
  // =====================================================
  Object.assign(exact, {
    "Cost 2 Charge. Give the teammate 3.5 Shield for two rounds, or give Tank 2.5 Shield for two rounds. Recasting Guardian Shield on the same target refreshes it instead of stacking.": {
      ja: "Chargeを2消費。味方には2ラウンド3.5 Shield、自分自身（Tank）には2ラウンド2.5 Shieldを与える。同じ対象へ再使用すると加算ではなく更新される。",
      zh: "消耗2 Charge。给队友3.5点持续2回合的护盾，或给Tank自己2.5点持续2回合的护盾。对同一目标再次使用时刷新护盾而不是叠加。"
    },
    "Blood Drain: drain up to 5 HP from the teammate. Devil permanently gains Max HP equal to the amount drained and restores the same amount of HP. The teammate gains Shield equal to drained HP + 1 for two rounds. Berserk: spend 2 Charge to enter Berserk for three rounds, immediately distribute 3 total damage among living enemies, stun the main target for 1 action if it survives, restore 1.5 HP, and gain 1.5 permanent Shield. Skills cannot be used during Berserk.": {
      ja: "Blood Drain：味方から最大5 HP吸収。Devilは吸収量と同じMax HPを永久に得て同量回復。味方は『吸収HP+1』のShieldを2ラウンド得る。Berserk：Charge 2で3ラウンド狂暴化し、生存中の敵へ合計3ダメージを分配、主対象が生存なら1行動スタン、自身1.5回復+永続Shield1.5。狂暴中Skill不可。",
      zh: "Blood Drain：最多吸取队友5 HP；Devil永久增加等量最大HP并恢复等量HP，队友获得“被吸取HP+1”的护盾，持续2回合。Berserk：消耗2 Charge进入3回合狂暴，立即在存活敌人之间分配总计3伤害；主目标若存活则眩晕1次行动；Devil恢复1.5 HP并获得1.5永久护盾。狂暴期间不能使用技能。"
    },
    "Max HP cannot exceed 13. Every 5 completed rounds gain 1 Charge. Every 3 completed rounds lose 2 HP and 1 Max HP, but this decay cannot directly defeat Vampire. While the teammate lives, incoming damage is reduced by 0.5. When the teammate is fully defeated, Vampire immediately restores 2 HP. A normal attack that deals HP damage grants +0.5 Max HP and restores 0.5 HP; after the teammate is defeated, it restores 1.5 HP instead and normal attacks deal +1 damage. If the living teammate ends 5 consecutive rounds at 1 HP or lower, Death Mark triggers at round end: the teammate directly loses 1.5 HP and the counter resets. When current HP is above 9, each full HP above 9 adds +0.5 normal-attack damage. The first time Vampire is defeated: if the teammate is alive, drain up to 3 HP from that teammate (leaving at least 0.5 HP) and revive with 3 HP; if the teammate is already defeated, revive with 1 HP, become invincible for the rest of the current round, and the next normal attack gains +2.5 damage and +1 lifesteal.": {
      ja: "Max HP上限は13。5ラウンド完了ごとにCharge+1。3ラウンド完了ごとにHP-2、Max HP-1（この衰弱では直接死亡しない）。味方生存中は被ダメージ-0.5。味方が完全に撃破されるとVampireは直ちに2 HP回復。通常攻撃で実HPダメージを与えるとMax HP+0.5、味方生存中は0.5 HP回復、味方撃破後は1.5 HP回復し通常攻撃+1ダメージ。生存中の味方が5ラウンド連続でラウンド終了時HP1以下ならDeath Markが発動し、味方は直接1.5 HP失い、カウンターはリセット。現在HPが9を超える場合、9を超えた完全な1 HPごとに通常攻撃+0.5。初回撃破時、味方生存なら最大3 HP吸収（最低0.5 HP残す）して3 HPで復活。味方撃破済みなら1 HPで復活し、そのラウンド終了まで無敵、次の通常攻撃+2.5ダメージ・吸血+1。",
      zh: "最大HP上限13。每5个完整回合获得1 Charge。每3个完整回合失去2 HP与1最大HP，但该衰减不会直接击败Vampire。队友存活时受到的伤害-0.5。队友被完全击败后，Vampire立刻恢复2 HP。普通攻击造成实际HP伤害后最大HP+0.5；队友存活时恢复0.5 HP，队友被击败后改为恢复1.5 HP并额外+1伤害。若存活队友连续5个回合在回合结束时HP≤1，则Death Mark触发：队友直接失去1.5 HP，计数随后重置。当前HP高于9时，每完整高出1 HP使普攻额外+0.5伤害。首次被击败时：若队友仍存活，最多吸取队友3 HP（至少保留0.5 HP）并以3 HP复活；若队友已经被击败，则以1 HP复活，本回合剩余时间无敌，并使下一次普通攻击+2.5伤害、吸血+1。"
    },
    "💀 Death Mark": {
      ja: "💀 Death Mark",
      zh: "💀 死亡标记"
    }
  });

  patterns.push(
    {
      re: /^🛡️ Guardian Shield! (.+) receives ([0-9.]+) Shield for two rounds\.$/,
      ja: m => `🛡️ Guardian Shield！${replaceNames(m[1], "ja")} は${m[2]} Shieldを2ラウンド得る。`,
      zh: m => `🛡️ 守护护盾！${replaceNames(m[1], "zh")}获得${m[2]}点持续2回合的护盾。`
    },
    {
      re: /^💀 Death Mark: (.+) has ended ([0-9]+)\/5 consecutive rounds at 1 HP or lower\.$/,
      ja: m => `💀 Death Mark：${replaceNames(m[1], "ja")}はHP1以下で${m[2]}/5ラウンド連続終了。`,
      zh: m => `💀 死亡标记：${replaceNames(m[1], "zh")}已连续${m[2]}/5个回合结束时HP≤1。`
    },
    {
      re: /^💀 Death Mark triggers! (.+) directly loses 1\.5 HP\.$/,
      ja: m => `💀 Death Mark発動！${replaceNames(m[1], "ja")}は直接1.5 HP失う。`,
      zh: m => `💀 死亡标记触发！${replaceNames(m[1], "zh")}直接失去1.5 HP。`
    },
    {
      re: /^🧛 Crimson Feast: (.+) is defeated, so (.+) immediately restores ([0-9.]+) HP\.$/,
      ja: m => `🧛 Crimson Feast：${replaceNames(m[1], "ja")}が撃破されたため、${replaceNames(m[2], "ja")}は直ちに${m[3]} HP回復。`,
      zh: m => `🧛 猩红盛宴：${replaceNames(m[1], "zh")}被击败，${replaceNames(m[2], "zh")}立刻恢复${m[3]} HP。`
    }
  );

  // =====================================================
  // BALANCE UPDATE V15 — Anubis Weight passive / self-weight skill
  // =====================================================
  Object.assign(exact, {
    "⚖️ Weigh the Heart — 1 Charge (+2 Weight, -0.5 HP)": {
      ja: "⚖️ 心臓を量る — 1 Charge（Weight+2 / HP-0.5）",
      zh: "⚖️ 衡量心脏 — 1 Charge（+2 Weight / -0.5 HP）"
    }
  });

  patterns.push(
    {
      re: /^Spend 1 Charge to gain 2 Weight\? (.+) will then directly lose 0\.5 HP\.$/,
      ja: m => `Chargeを1消費してWeight+2？その後${replaceNames(m[1], "ja")}は直接0.5 HP失う。`,
      zh: m => `消耗1 Charge获得2 Weight？随后${replaceNames(m[1], "zh")}将直接失去0.5 HP。`
    },
    {
      re: /^⚖️ Weigh the Heart: (.+) spends 1 Charge, gains 2 Weight, and directly loses ([0-9.]+) HP\.$/,
      ja: m => `⚖️ 心臓を量る：${replaceNames(m[1], "ja")}は1 Chargeを消費し、Weight+2、さらに直接${m[2]} HP失う。`,
      zh: m => `⚖️ 衡量心脏：${replaceNames(m[1], "zh")}消耗1 Charge，获得2 Weight，并直接失去${m[2]} HP。`
    },
    {
      re: /^⚖️ (.+) Weight ([0-9]+) → ([0-9]+) \(Burden of the Heart: 3 rounds completed\)\.$/,
      ja: m => `⚖️ 心臓の重荷：${replaceNames(m[1], "ja")}は3ラウンド完了によりWeight ${m[2]} → ${m[3]}。`,
      zh: m => `⚖️ 心之重负：${replaceNames(m[1], "zh")}因完成3个回合，Weight ${m[2]} → ${m[3]}。`
    }
  );

  // =====================================================
  // MAJOR BALANCE V17 — Chimera + September balance update
  // =====================================================
  Object.assign(exact, {
    "Chimera": { ja: "キメラ", zh: "奇美拉" },
    "Metamorphosis": { ja: "形態転換", zh: "形态转换" },
    "Molting Instinct": { ja: "変態本能", zh: "蜕变本能" },
    "Beast": { ja: "猛獣", zh: "猛兽" },
    "Shell": { ja: "甲殻", zh: "甲壳" },
    "Spirit": { ja: "霊体", zh: "灵体" },
    "Bleed Talent:": { ja: "出血（特性）：", zh: "流血（天赋）：" },
    "Each Bleed stack independently causes 0.5 direct HP loss at the end of the round for 2 round-end ticks. Bleed can stack, and each stack tracks its own duration. A Bleed applied during a round can trigger at that same round end.": {
      ja: "出血1層ごとに、ラウンド終了時に0.5 HPを直接失わせ、2回のラウンド終了時まで発動する。出血は重複でき、各層は個別に残り回数を管理する。付与されたそのラウンドの終了時から発動する。",
      zh: "每层流血会在回合结束时直接使目标失去0.5 HP，共结算2次。流血可以叠加，每层独立计算持续次数；当回合施加的流血可在该回合结束时立即结算。"
    },

    "A three-form adaptive fighter that trades raw consistency for flexible offense, defense, control, and a one-time spectral revival.": {
      ja: "猛獣・甲殻・霊体の3形態を切り替え、攻撃・防御・妨害を柔軟に使い分ける適応型ファイター。1戦に1度だけ霊体復活も行う。",
      zh: "拥有猛兽、甲壳、灵体三种形态，可在输出、防御与控制之间灵活切换，并拥有一次灵体复活的适应型角色。"
    },
    "Open the Chimera menu. Direct Shift switches to a different form for 0 Charge and does not trigger the new form's entry effect. Empowered Shift costs 1 Charge and triggers the new form's entry effect. Beast normal Attack: 1.5 damage. Beast — Rend (2C): deal 2 damage and apply 1 Bleed. Shell normal Attack: 0.5 damage. Shell — Shelter Repair (2C): heal a living ally or self for 2.5 HP and give 1 Shield for one round. Spirit normal Attack: 0 damage. Spirit — Spirit Drain (2C): remove up to 2 total Charge from enemies, gain 1 Charge, then return to Beast without triggering Beast entry.": {
      ja: "キメラの形態メニューを開く。直接転換は0 Chargeで別形態へ移るが入場効果は発動しない。強化転換は1 Chargeを消費し、新形態の入場効果を発動する。猛獣形態の通常攻撃は1.5ダメージ。猛獣—引き裂き（2C）：敵1体に2ダメージ＋出血1層。甲殻形態の通常攻撃は0.5ダメージ。甲殻—庇護修復（2C）：自分または生存中の味方を2.5 HP回復し、1ラウンドのShield 1。霊体形態の通常攻撃は0ダメージ。霊体—霊力吸収（2C）：敵のChargeを合計最大2減らし、自分はCharge+1、その後猛獣へ戻る（猛獣入場効果なし）。",
      zh: "打开奇美拉形态菜单。直接切换：0 Charge切换到其他形态，但不触发新形态入场效果。强化切换：消耗1 Charge切换并触发新形态入场效果。猛兽形态普通攻击造成1.5伤害。猛兽—撕裂（2C）：造成2伤害并施加1层流血。甲壳形态普通攻击造成0.5伤害。甲壳—庇护修复（2C）：自己或一名存活队友立即恢复2.5 HP并获得1点持续1回合的护盾。灵体形态普通攻击造成0伤害。灵体—灵能汲取（2C）：使敌方总计最多失去2 Charge，自身获得1 Charge，然后立刻回到猛兽且不触发猛兽入场效果。"
    },
    "Starts with 1 Charge in Beast form without an entry effect. Beast normal Attack deals 1.5; Shell deals 0.5; Spirit deals 0. Every 3 completed rounds gain 1 Charge. Beast entry applies 1 Bleed to an enemy. Shell entry refreshes 2 Shield for two rounds. Spirit entry stuns one enemy for its next normal action. Actively entering Spirit has a 2-round cooldown: enter on Round 1, unavailable on Rounds 2-3, ready on Round 4. The first time Chimera is defeated, revive with 2 HP, gain 1 Charge, automatically enter Spirit, and stun the next living enemy in turn order.": {
      ja: "開始時は猛獣形態・Charge 1で、入場効果は発動しない。通常Attackは猛獣1.5、甲殻0.5、霊体0ダメージ。3ラウンド完了ごとにCharge+1。猛獣の入場効果は敵1体に出血1層。甲殻入場は2ラウンドのShield 2を更新。霊体入場は敵1体の次の通常行動をスタン。能動的な霊体入場には2ラウンドCDがあり、R1で入るとR2・R3は不可、R4で再使用可能。初回撃破時は2 HPで復活しCharge+1、霊体へ自動移行し、行動順で次の生存中の敵をスタンする。",
      zh: "开局为猛兽形态并拥有1 Charge，且不触发入场效果。普通攻击：猛兽1.5伤害、甲壳0.5伤害、灵体0伤害。每完成3个回合获得1 Charge。猛兽入场对一名敌人施加1层流血。甲壳入场刷新2点持续2回合的护盾。灵体入场使一名敌人下一次正常行动眩晕。主动进入灵体有2回合冷却：第1回合进入后，第2、3回合不能再次主动进入，第4回合恢复。每场战斗首次被击败时，以2 HP复活，获得1 Charge，自动进入灵体，并眩晕行动顺序中的下一名存活敌人。"
    },

    "🐺 Rend — 2 Charge": { ja: "🐺 引き裂き — 2 Charge", zh: "🐺 撕裂 — 2 Charge" },
    "🐢 Shelter Repair — 2 Charge": { ja: "🐢 庇護修復 — 2 Charge", zh: "🐢 庇护修复 — 2 Charge" },
    "👻 Spirit Drain — 2 Charge": { ja: "👻 霊力吸収 — 2 Charge", zh: "👻 灵能汲取 — 2 Charge" },
    "🧬 Metamorphosis": { ja: "🧬 形態転換", zh: "🧬 形态转换" },
    "🐺 Rend — Choose Target": { ja: "🐺 引き裂き — 対象を選択", zh: "🐺 撕裂 — 选择目标" },
    "🐢 Shelter Repair — Choose Target": { ja: "🐢 庇護修復 — 対象を選択", zh: "🐢 庇护修复 — 选择目标" },
    "👻 Spirit Drain — Distribute up to 2 Charge removal": { ja: "👻 霊力吸収 — 最大2 Charge減少を分配", zh: "👻 灵能汲取 — 分配最多2点Charge削减" },
    "Ready": { ja: "使用可能", zh: "可用" },
    "Used": { ja: "使用済み", zh: "已使用" },

    "Spend 2+ Charge. At 2 Charge, deal 2.5 damage to the main target and 1 damage to the other enemy. Each additional Charge adds +1 main-target damage and +0.5 secondary-target damage. After Arcane Blast, gain +0.5 Max HP and restore 1 HP.": {
      ja: "2以上のChargeを消費。2 Chargeで主対象に2.5、もう一方の敵に1ダメージ。追加Charge 1ごとに主対象+1、もう一方+0.5ダメージ。Arcane Blast後、Max HP+0.5、HPを1回復。",
      zh: "消耗至少2 Charge。2 Charge时对主目标造成2.5伤害，对另一名敌人造成1伤害；每多投入1 Charge，主目标伤害+1、副目标伤害+0.5。释放奥术爆破后，最大HP+0.5并恢复1 HP。"
    },
    "The first time Cure Mage falls below 3 HP while alive, Cure Mage and the living teammate each recover 3 HP, and Cure Mage gains 1 Charge. Healing caused by Cure Mage converts overheal beyond the first wasted point into temporary Shield. Every 3 Cure Mage healing events received by the teammate, that teammate's next damaging action gains +1 damage.": {
      ja: "Cure Mageが生存中に初めてHP3未満になると、自分と生存中の味方がそれぞれ3 HP回復し、Cure MageはCharge+1。Cure Mageによる回復は、最初の1点を超えた余剰回復を一時Shieldへ変換する。味方がCure Mageから3回回復を受けるごとに、その味方の次のダメージ行動+1。",
      zh: "Cure Mage首次在存活状态下降到3 HP以下时，自己与存活队友各恢复3 HP，并获得1 Charge。Cure Mage造成的治疗中，超过第1点浪费治疗之后的溢出量会转化为临时护盾。队友每受到3次来自Cure Mage的治疗，其下一次造成伤害的行动+1伤害。"
    },
    "Starts with 0 Charge. Normal Attack deals 2.5 damage above 6 HP, 1.5 damage above 4 HP through 6 HP, and 1 damage at 4 HP or lower. Once per battle, Assassin reduces one incoming damage instance by 1.5. All healing received by Assassin is permanently reduced by 0.5. Execution refunds 2 Charge whenever its target survives. While Assassin is below 4 HP, Execution deals 2 less damage.": {
      ja: "開始時Charge 0。通常AttackはHP6超で2.5、HP4超〜6以下で1.5、HP4以下で1ダメージ。1戦に1回、受けるダメージ1回を1.5軽減。Assassinが受けるすべての回復量は常に0.5減少。Executionの対象が生存した場合2 Charge返還。HP4未満ではExecutionのダメージ-2。",
      zh: "开局0 Charge。普通攻击：HP>6时2.5伤害；4<HP≤6时1.5伤害；HP≤4时1伤害。每场战斗一次，使一次受到的伤害减少1.5。Assassin受到的所有治疗量永久减少0.5。Execution未击败目标时返还2 Charge；HP低于4时Execution伤害-2。"
    },
    "Spend 3 Charge to create 1 regular Puppet. A regular Puppet can distribute 5 total damage between enemies, or be converted into a Life Puppet that revives a team member once at 50% Max HP. An attached Life Puppet expires after two rounds if unused.": {
      ja: "3 Chargeで通常Puppetを1体作成。通常Puppetは敵へ合計5ダメージを分配するか、味方1体をMax HPの50%で1度復活させるLife Puppetへ変換できる。装着したLife Puppetは未使用のまま2ラウンド経過すると消滅する。",
      zh: "消耗3 Charge制造1具普通傀儡。普通傀儡可在敌方之间分配总计5点伤害，或转化为Life Puppet，使一名队友以50%最大HP复活一次。附着后的Life Puppet若2回合内未触发则消失。"
    },
    "Starts with 2 Charge and no Puppets. Every newly created regular Puppet grants +1 Max HP and restores 1 HP.": {
      ja: "開始時Charge 2、Puppet 0。新しい通常Puppetを作るたびMax HP+1、HPを1回復。",
      zh: "开局拥有2 Charge且没有傀儡。每制造一具新的普通傀儡，最大HP+1并恢复1 HP。"
    },
    "Transfer any amount of Angel's Charge to the teammate. Empower costs 2+ Charge: 2 Charge gives +1 damage to the teammate's next damaging action and 1 Shield for two rounds; each extra Charge adds +0.5 damage and +0.5 Shield. Or spend 1 Charge to sacrifice up to 2 of Angel's HP and Max HP; the teammate receives the sacrificed amount minus 0.5 as HP.": {
      ja: "AngelのChargeを任意量味方へ移せる。Empowerは2以上のChargeを消費し、2 Chargeで味方の次のダメージ行動+1、2ラウンドShield 1。追加Charge 1ごとにダメージ+0.5、Shield+0.5。あるいは1 Chargeを消費し、AngelのHPとMax HPを最大2犠牲にして、味方は犠牲量-0.5 HPを得る。",
      zh: "可将Angel任意数量的Charge转移给队友。Empower消耗至少2 Charge：2 Charge使队友下一次造成伤害的行动+1伤害，并获得1点持续2回合的护盾；每多1 Charge再增加0.5伤害与0.5护盾。也可消耗1 Charge，牺牲Angel最多2点HP与最大HP，队友获得“牺牲量-0.5”的HP。"
    },
    "Starts with 2 Charge. The first defeated member of Angel's team revives with exactly 3 HP, with no revival Shield. If Angel revives the teammate, Angel loses half of current HP, rounded down to the nearest 0.5. The first time Angel falls below 2 HP while alive, her next damaging action gains +1 damage.": {
      ja: "開始時Charge 2。Angel側で最初に撃破されたキャラは復活Shieldなしでちょうど3 HPで復活する。味方をAngelが復活させた場合、Angelは現在HPの半分（0.5刻みで切り捨て）を失う。生存中に初めてHP2未満になると、次のダメージ行動+1。",
      zh: "开局拥有2 Charge。Angel队伍中首个被击败的角色固定以3 HP复活，且不获得复活护盾。若复活的是队友，Angel失去当前HP的一半，并向下取整到0.5。Angel首次在存活时低于2 HP，其下一次造成伤害的行动+1伤害。"
    },
    "Blood Drain: drain up to 5 HP from the teammate. Devil permanently gains Max HP equal to the amount drained and restores the same amount of HP. The teammate gains Shield equal to drained HP + 1 for two rounds. Berserk: spend 2 Charge to enter Berserk for two rounds, immediately distribute 3 total damage among living enemies, stun the main target for 1 action if it survives, restore 1.5 HP, and gain 1.5 permanent Shield. Skills cannot be used during Berserk.": {
      ja: "Blood Drain：味方から最大5 HP吸収。Devilは吸収量と同じMax HPを永久に得て同量回復し、味方は吸収量+1のShieldを2ラウンド得る。Berserk：2 Chargeで2ラウンド狂暴化。生存中の敵へ合計3ダメージを即時分配し、主対象が生存なら1行動スタン、自身は1.5 HP回復＋永続Shield 1.5。狂暴中はSkill不可。",
      zh: "Blood Drain：最多吸取队友5 HP；Devil永久增加等同吸取量的最大HP并恢复等量HP，同时队友获得“被吸取HP+1”的护盾，持续2回合。Berserk：消耗2 Charge进入持续2回合的狂暴，立即在存活敌人间分配总计3点伤害；主目标若存活则眩晕1次行动；Devil恢复1.5 HP并获得1.5永久护盾。狂暴期间不能使用技能。"
    },
    "At the end of every round, Devil loses 0.5 HP and 0.5 Max HP. During Berserk, Devil instead loses 1 HP while Max HP still falls by 0.5. Every 3 completed rounds, Devil gains 1 Charge. Below 7 HP, normal attacks gain +1 damage. During Berserk, the next normal attack gains another +1.5; if it leaves the target alive below 3 HP, Devil restores 1.5 HP. When Devil starts a normal attack at 3 HP or lower, Devil restores 1 HP after the attack. When Berserk ends, Devil restores 0.5 HP and is stunned for the next turn.": {
      ja: "毎ラウンド終了時HP-0.5、Max HP-0.5。Berserk中はHP-1、Max HPは-0.5。3ラウンド完了ごとにCharge+1。HP7未満で通常攻撃+1ダメージ。Berserk中の次の通常攻撃はさらに+1.5し、対象が生存してHP3未満ならDevilは1.5 HP回復。通常攻撃開始時HP3以下なら攻撃後1 HP回復。Berserk終了時0.5 HP回復し、次のターンはスタン。",
      zh: "每回合结束时Devil失去0.5 HP和0.5最大HP；狂暴期间改为失去1 HP，但最大HP仍-0.5。每3个完整回合获得1 Charge。HP低于7时普通攻击+1伤害。狂暴期间下一次普攻额外+1.5；若目标存活且HP低于3，Devil恢复1.5 HP。若开始普攻时Devil HP≤3，攻击后恢复1 HP。狂暴结束时恢复0.5 HP并眩晕自己的下一回合。"
    },
    "Starts with 1 Juggling Ball and 1 Charge. Every 2 completed rounds, gain 1 Charge. Every 4 completed rounds, gain 1 Juggling Ball. At round end, if Charge is at least 4, automatically spend 1 Charge to create 1 Ball. Every 5 ordinary Balls thrown gives Joker 2 Shield for one round and the living teammate 0.5 Shield for one round; this no longer grants invincibility.": {
      ja: "開始時Juggling Ball 1個、Charge 1。2ラウンド完了ごとにCharge+1、4ラウンド完了ごとにBall+1。ラウンド終了時Chargeが4以上なら自動で1 Chargeを消費してBallを1個作成。通常Ballを5個投げるごとにJokerは1ラウンドShield 2、生存中の味方は1ラウンドShield 0.5を得る。無敵は付与されない。",
      zh: "开局拥有1个杂耍球和1 Charge。每完成2个回合获得1 Charge；每完成4个回合获得1个球。回合结束时若Charge≥4，自动消耗1 Charge制造1个球。每投出5个普通球，Joker获得2点持续1回合的护盾，存活队友获得0.5点持续1回合的护盾；不再获得无敌。"
    },
    "Starts with 0 Weight. Anubis's normal Attack deals 0 damage and gives Anubis +1 Weight. Every 3 completed rounds Anubis gains 1 Weight. Every 5 completed rounds Anubis gains 1 Charge. Whenever either enemy gains Charge, Anubis gains +1 Weight. Enemy Defend reduces Weight by 1. Each enemy separately tracks actual HP restored; every cumulative 2 HP restored by that enemy reduces Weight by 1. Every cumulative 4 actual HP damage Anubis's team receives from enemies reduces Weight by 1, but this damage rule can reduce Weight at most once per round. Defend, healing, and team-damage reductions can stack.": {
      ja: "開始時Weight 0。Anubisの通常Attackは0ダメージで自身のWeight+1。3ラウンド完了ごとにWeight+1、5ラウンド完了ごとにCharge+1。敵のどちらかがChargeを得るたびWeight+1。敵のDefendでWeight-1。各敵は実回復量を別々に累積し、2 HP回復するごとにWeight-1。Anubis側が敵から実HPダメージを累計4受けるごとにWeight-1。ただしこの被ダメージ規則で減らせるWeightは1ラウンド最大1。Defend・回復・被ダメージによる減少は重複可能。",
      zh: "开局0 Weight。Anubis普通攻击造成0伤害并使自身Weight+1。每完成3个回合Weight+1；每完成5个回合获得1 Charge。任一敌人每次获得Charge，Anubis Weight+1。敌人Defend使Weight-1。两名敌人分别累计实际治疗量，每累计恢复2 HP使Weight-1。Anubis队伍每累计受到来自敌人的4点实际HP伤害使Weight-1，但这种受伤规则每回合最多减少1 Weight。Defend、治疗和队伍受伤造成的Weight减少可以叠加。"
    }
  });

  patterns.push(
    {
      re: /^🧬 Form: (🐺|🐢|👻) (Beast|Shell|Spirit)$/,
      ja: m => `🧬 形態：${m[1]} ${m[2] === "Beast" ? "猛獣" : m[2] === "Shell" ? "甲殻" : "霊体"}`,
      zh: m => `🧬 形态：${m[1]} ${m[2] === "Beast" ? "猛兽" : m[2] === "Shell" ? "甲壳" : "灵体"}`
    },
    {
      re: /^👻 Spirit Entry: (Ready|Ready on Round ([0-9]+))$/,
      ja: m => `👻 霊体入場：${m[2] ? `第${m[2]}ラウンドで使用可能` : "使用可能"}`,
      zh: m => `👻 灵体入场：${m[2] ? `第${m[2]}回合可用` : "可用"}`
    },
    {
      re: /^♻️ Spectral Revival: (Used|Ready)$/,
      ja: m => `♻️ 霊体再生：${m[1] === "Used" ? "使用済み" : "使用可能"}`,
      zh: m => `♻️ 灵体重生：${m[1] === "Used" ? "已使用" : "可用"}`
    },
    {
      re: /^Current form: (🐺|🐢|👻) (Beast|Shell|Spirit)$/,
      ja: m => `現在形態：${m[1]} ${m[2] === "Beast" ? "猛獣" : m[2] === "Shell" ? "甲殻" : "霊体"}`,
      zh: m => `当前形态：${m[1]} ${m[2] === "Beast" ? "猛兽" : m[2] === "Shell" ? "甲壳" : "灵体"}`
    },
    {
      re: /^Spirit entry: (Ready|CD — ready on Round ([0-9]+))$/,
      ja: m => `霊体入場：${m[2] ? `CD — 第${m[2]}ラウンドで使用可能` : "使用可能"}`,
      zh: m => `灵体入场：${m[2] ? `冷却中 — 第${m[2]}回合可用` : "可用"}`
    },
    {
      re: /^Spirit entry cooldown: (Ready|ready on Round ([0-9]+))$/,
      ja: m => `霊体入場CD：${m[2] ? `第${m[2]}ラウンドで使用可能` : "使用可能"}`,
      zh: m => `灵体入场冷却：${m[2] ? `第${m[2]}回合可用` : "可用"}`
    },
    {
      re: /^🔄 Shift Options → (🐺|🐢|👻) (Beast|Shell|Spirit)$/,
      ja: m => `🔄 転換オプション → ${m[1]} ${m[2] === "Beast" ? "猛獣" : m[2] === "Shell" ? "甲殻" : "霊体"}`,
      zh: m => `🔄 切换选项 → ${m[1]} ${m[2] === "Beast" ? "猛兽" : m[2] === "Shell" ? "甲壳" : "灵体"}`
    },
    {
      re: /^(🐺|🐢|👻) Shift to (Beast|Shell|Spirit)$/,
      ja: m => `${m[1]} ${m[2] === "Beast" ? "猛獣" : m[2] === "Shell" ? "甲殻" : "霊体"}へ転換`,
      zh: m => `${m[1]} 切换为${m[2] === "Beast" ? "猛兽" : m[2] === "Shell" ? "甲壳" : "灵体"}`
    },
    {
      re: /^🧬 Direct Shift → (🐺|🐢|👻) (Beast|Shell|Spirit) — 0 Charge$/,
      ja: m => `🧬 直接転換 → ${m[1]} ${m[2] === "Beast" ? "猛獣" : m[2] === "Shell" ? "甲殻" : "霊体"} — 0 Charge`,
      zh: m => `🧬 直接切换 → ${m[1]} ${m[2] === "Beast" ? "猛兽" : m[2] === "Shell" ? "甲壳" : "灵体"} — 0 Charge`
    },
    {
      re: /^✨ Empowered Shift → (🐺|🐢|👻) (Beast|Shell|Spirit) — 1 Charge$/,
      ja: m => `✨ 強化転換 → ${m[1]} ${m[2] === "Beast" ? "猛獣" : m[2] === "Shell" ? "甲殻" : "霊体"} — 1 Charge`,
      zh: m => `✨ 强化切换 → ${m[1]} ${m[2] === "Beast" ? "猛兽" : m[2] === "Shell" ? "甲壳" : "灵体"} — 1 Charge`
    },
    {
      re: /^Directly shift into (Beast|Shell|Spirit) form for 0 Charge\? This uses the action and does not trigger the entry effect\.$/,
      ja: m => `${m[1] === "Beast" ? "猛獣" : m[1] === "Shell" ? "甲殻" : "霊体"}形態へ0 Chargeで直接転換しますか？この行動でターンを消費し、入場効果は発動しません。`,
      zh: m => `是否以0 Charge直接切换为${m[1] === "Beast" ? "猛兽" : m[1] === "Shell" ? "甲壳" : "灵体"}形态？这会消耗本次行动，且不触发入场效果。`
    },
    {
      re: /^Spend 1 Charge to enter (Beast|Shell|Spirit) form and apply its entry effect to (.+)\?$/,
      ja: m => `1 Chargeを消費して${m[1] === "Beast" ? "猛獣" : m[1] === "Shell" ? "甲殻" : "霊体"}形態へ入り、${replaceNames(m[2], "ja")}に入場効果を適用しますか？`,
      zh: m => `是否消耗1 Charge进入${m[1] === "Beast" ? "猛兽" : m[1] === "Shell" ? "甲壳" : "灵体"}形态，并对${replaceNames(m[2], "zh")}触发入场效果？`
    },
    {
      re: /^Spend 1 Charge to enter Shell form and gain 2 Shield for two rounds\?$/,
      ja: () => `1 Chargeを消費して甲殻形態へ入り、2ラウンドのShield 2を得ますか？`,
      zh: () => `是否消耗1 Charge进入甲壳形态，并获得2点持续2回合的护盾？`
    },
    {
      re: /^Spend 2 Charge to deal ([0-9.]+) damage to (.+) and apply 1 Bleed\?$/,
      ja: m => `2 Chargeを消費し、${replaceNames(m[2], "ja")}に${m[1]}ダメージ＋出血1層を与えますか？`,
      zh: m => `是否消耗2 Charge，对${replaceNames(m[2], "zh")}造成${m[1]}伤害并施加1层流血？`
    },
    {
      re: /^Spend 2 Charge to heal (.+) for up to 2\.5 HP and give 1 Shield for one round\?$/,
      ja: m => `2 Chargeを消費し、${replaceNames(m[1], "ja")}を最大2.5 HP回復して1ラウンドShield 1を与えますか？`,
      zh: m => `是否消耗2 Charge，为${replaceNames(m[1], "zh")}立即恢复最多2.5 HP并给予1点持续1回合的护盾？`
    },
    {
      re: /^Spend 2 Charge to remove ([0-9]+) total enemy Charge, gain 1 Charge, and return to Beast form\?$/,
      ja: m => `2 Chargeを消費して敵のChargeを合計${m[1]}減らし、自分はCharge+1、その後猛獣形態へ戻りますか？`,
      zh: m => `是否消耗2 Charge，使敌方总计减少${m[1]} Charge，自身获得1 Charge，然后回到猛兽形态？`
    },
    {
      re: /^Spend 2 Charge and remove ([0-9]+) total enemy Charge\?$/,
      ja: m => `2 Chargeを消費し、敵のChargeを合計${m[1]}減らしますか？`,
      zh: m => `是否消耗2 Charge，使敌方总计减少${m[1]} Charge？`
    },
    {
      re: /^Remove ([0-9]+)C from (.+)$/,
      ja: m => `${replaceNames(m[2], "ja")}から${m[1]}C減らす`,
      zh: m => `从${replaceNames(m[2], "zh")}移除${m[1]}C`
    },
    {
      re: /^🐢 Empowered Shift: (.+) enters Shell form and refreshes 2 Shield for two rounds\.$/,
      ja: m => `🐢 強化転換：${replaceNames(m[1], "ja")}は甲殻形態へ入り、2ラウンドのShield 2を更新。`,
      zh: m => `🐢 强化切换：${replaceNames(m[1], "zh")}进入甲壳形态，并刷新2点持续2回合的护盾。`
    },
    {
      re: /^🐺 Empowered Shift: (.+) enters Beast form and applies 1 Bleed to (.+)\.$/,
      ja: m => `🐺 強化転換：${replaceNames(m[1], "ja")}は猛獣形態へ入り、${replaceNames(m[2], "ja")}に出血1層を付与。`,
      zh: m => `🐺 强化切换：${replaceNames(m[1], "zh")}进入猛兽形态，并对${replaceNames(m[2], "zh")}施加1层流血。`
    },
    {
      re: /^👻 Empowered Shift: (.+) enters Spirit form and stuns (.+) for the next normal action\.$/,
      ja: m => `👻 強化転換：${replaceNames(m[1], "ja")}は霊体形態へ入り、${replaceNames(m[2], "ja")}の次の通常行動をスタン。`,
      zh: m => `👻 强化切换：${replaceNames(m[1], "zh")}进入灵体形态，并使${replaceNames(m[2], "zh")}的下一次正常行动眩晕。`
    },
    {
      re: /^🩸 (.+) gains 1 Bleed stack for 2 round-end ticks\.$/,
      ja: m => `🩸 ${replaceNames(m[1], "ja")}は出血1層を得る（ラウンド終了時に2回発動）。`,
      zh: m => `🩸 ${replaceNames(m[1], "zh")}获得1层流血（持续2次回合末结算）。`
    },
    {
      re: /^🧬 Direct Shift: (.+) changes into (🐺|🐢|👻) (Beast|Shell|Spirit) form for 0 Charge\. No entry effect triggers\.$/,
      ja: m => `🧬 直接転換：${replaceNames(m[1], "ja")}は${m[2]} ${m[3] === "Beast" ? "猛獣" : m[3] === "Shell" ? "甲殻" : "霊体"}形態へ0 Chargeで転換。入場効果は発動しない。`,
      zh: m => `🧬 直接切换：${replaceNames(m[1], "zh")}以0 Charge切换为${m[2]}${m[3] === "Beast" ? "猛兽" : m[3] === "Shell" ? "甲壳" : "灵体"}形态，不触发入场效果。`
    },
    {
      re: /^🐺 Rend! (.+) takes ([0-9.]+) damage( and gains 1 Bleed)?\.$/,
      ja: m => `🐺 引き裂き！${replaceNames(m[1], "ja")}に${m[2]}ダメージ${m[3] ? "、Bleed 1層付与" : ""}。`,
      zh: m => `🐺 撕裂！${replaceNames(m[1], "zh")}受到${m[2]}伤害${m[3] ? "并获得1层流血" : ""}。`
    },
    {
      re: /^🐢 Shelter Repair: (.+) restores ([0-9.]+) HP and gains 1 Shield for one round\.$/,
      ja: m => `🐢 庇護修復：${replaceNames(m[1], "ja")}は${m[2]} HP回復し、1ラウンドShield 1を得る。`,
      zh: m => `🐢 庇护修复：${replaceNames(m[1], "zh")}恢复${m[2]} HP并获得1点持续1回合的护盾。`
    },
    {
      re: /^👻 Spirit Drain removes ([0-9.]+) total enemy Charge, (.+) gains 1 Charge, and immediately returns to Beast form without triggering Beast entry\.$/,
      ja: m => `👻 霊力吸収：敵のChargeを合計${m[1]}減らし、${replaceNames(m[2], "ja")}はCharge+1。その後、猛獣入場効果を発動せず直ちに猛獣形態へ戻る。`,
      zh: m => `👻 灵能汲取：敌方总计失去${m[1]} Charge，${replaceNames(m[2], "zh")}获得1 Charge，随后不触发猛兽入场效果并立刻回到猛兽形态。`
    },
    {
      re: /^👻 Spectral Rebirth! (.+) revives with ([0-9.]+) HP, gains 1 Charge, enters Spirit form, and stuns the next enemy (.+)\.$/,
      ja: m => `👻 霊体再生！${replaceNames(m[1], "ja")}は${m[2]} HPで復活しCharge+1、霊体形態へ入り、次の敵${replaceNames(m[3], "ja")}をスタン。`,
      zh: m => `👻 灵体重生！${replaceNames(m[1], "zh")}以${m[2]} HP复活并获得1 Charge，进入灵体形态，并眩晕下一名敌人${replaceNames(m[3], "zh")}。`
    }
  );

  // =====================================================
  // VERSION 0.2 — Anubis Soul Sentence execution reward
  // =====================================================
  Object.assign(exact, {
    "Bind the Scales (0C): choose one living enemy to bind to Anubis's current Weight. Weigh the Heart (1C): gain 2 Weight, then directly lose 0.5 HP. Soul Sentence (2C): only usable when Weight is greater than half of the bound target's current Max HP; that target directly loses HP equal to the current Weight, ignoring Shield. Normally, Anubis then directly loses half of current HP, gains 1 Judgment Shield for two rounds, is stunned for 1 action, and Weight resets to 0. If Soul Sentence defeats the target, including when that defeat immediately triggers a revival effect, Anubis keeps all Weight, takes no self HP loss, and is not stunned; the Judgment Shield is still gained.": {
      ja: "Bind the Scales（0C）：生存中の敵1体をAnubisの現在Weightに結びつける。Weigh the Heart（1C）：Weight+2、その後0.5 HPを直接失う。Soul Sentence（2C）：Weightが結びつけた対象の現在Max HPの半分より大きい時のみ使用可能。対象はShieldを無視して現在Weightと同じHPを直接失う。通常はその後、Anubisが現在HPの半分を直接失い、2ラウンドのJudgment Shield 1を得て1行動スタンし、Weightは0になる。ただしSoul Sentenceで対象を撃破した場合（その撃破で即座に復活効果が発動した場合も含む）、Weightは減らず、自身のHP減少とスタンを受けない。Judgment Shield 1は通常通り得る。",
      zh: "绑定天秤（0C）：选择一名存活敌人，与Anubis当前的Weight绑定。衡量心脏（1C）：自身获得2 Weight，随后直接失去0.5 HP。灵魂判决（2C）：仅当Weight严格大于被绑定目标当前最大HP的一半时可用；目标无视护盾，直接失去等于当前Weight的HP。通常结算后，Anubis直接失去当前HP的一半，获得1点持续2回合的审判护盾，眩晕1次行动，并将Weight清零。若灵魂判决此次伤害击败目标（包括该次击败立即触发复活效果），则Weight不会减少，Anubis不承受自身HP损失，也不会被眩晕；审判护盾仍正常获得。"
    }
  });

  patterns.push(
    {
      re: /^⚖️ Soul Sentence Execution: (.+) suffers a defeat from ([0-9.]+) direct HP loss at Weight ([0-9.]+)\. (.+) keeps Weight ([0-9.]+), takes no self HP loss, gains 1 Judgment Shield for two rounds, and is not stunned\.$/,
      ja: m => `⚖️ Soul Sentence撃破：${replaceNames(m[1], "ja")}はWeight ${m[3]}による直接${m[2]} HP損失で撃破判定。${replaceNames(m[4], "ja")}はWeight ${m[5]}を維持し、自身のHP損失とスタンを受けず、2ラウンドのJudgment Shield 1を得る。`,
      zh: m => `⚖️ 灵魂判决·击败：${replaceNames(m[1], "zh")}因Weight ${m[3]}受到${m[2]}点直接HP损失并触发击败。${replaceNames(m[4], "zh")}保留Weight ${m[5]}，不承受自身HP损失且不会眩晕，并获得1点持续2回合的审判护盾。`
    }
  );

  translateWholeDocument();

})();
