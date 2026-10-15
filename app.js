let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultState;
let chartInstance = null;

// Deep Work Timer (60 min)
let timerSeconds = 3600;
let timerInterval = null;

function toggleTimer() {
  const btn = document.getElementById('timerBtn');
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    btn.textContent = 'Retomar';
  } else {
    btn.textContent = 'Pausar';
    timerInterval = setInterval(() => {
      if (timerSeconds > 0) {
        timerSeconds--;
        const m = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
        const s = String(timerSeconds % 60).padStart(2, '0');
        document.getElementById('timerDisplay').textContent = `${m}:${s}`;
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        btn.textContent = 'Iniciar';
        alert('Bloco de Deep Work (60 min) concluído!');
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 3600;
  document.getElementById('timerDisplay').textContent = '60:00';
  document.getElementById('timerBtn').textContent = 'Iniciar';
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  render();
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.getElementById(tabId).classList.remove('hidden');
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.className = 'tab-btn bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition';
  });
  document.getElementById('btn-' + tabId).className = 'tab-btn bg-emerald-600 text-white px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition';
}

function calculateStreak(daysArray) {
  let cur = 0, max = 0;
  for (const d of daysArray) {
    if (d) { cur++; if (cur > max) max = cur; }
    else cur = 0;
  }
  return max;
}

// Actions
function toggleDay(id, dayIdx) {
  const h = state.habits.find(x => x.id === id);
  if (h) { h.days[dayIdx] = !h.days[dayIdx]; saveState(); }
}

function addHabit() {
  const input = document.getElementById('habitInput');
  if (!input.value.trim()) return;
  state.habits.push({ id: Date.now(), name: input.value.trim(), days: [false,false,false,false,false,false,false] });
  input.value = '';
  saveState();
}

function removeHabit(id) {
  state.habits = state.habits.filter(x => x.id !== id);
  saveState();
}

function resetWeek() {
  state.habits.forEach(h => h.days = [false,false,false,false,false,false,false]);
  saveState();
}

function toggleMasterStep(stepNum) {
  const s = state.masterSteps.find(x => x.step === stepNum);
  if (s) {
    s.done = !s.done;
    s.progress = s.done ? 100 : 0;
    saveState();
  }
}

function updateMasterProgress(stepNum, val) {
  const s = state.masterSteps.find(x => x.step === stepNum);
  if (s) {
    s.progress = Number(val);
    s.done = s.progress === 100;
    saveState();
  }
}

function toggle42(id) {
  const item = state.route42.find(x => x.id === id);
  if (item) { item.done = !item.done; saveState(); }
}

function toggleCsappRead(id) {
  const g = state.csappGates.find(x => x.id === id);
  if (g) { g.readDone = !g.readDone; saveState(); }
}

function toggleCsappLab(id, labIdx) {
  const g = state.csappGates.find(x => x.id === id);
  if (g) { g.labs[labIdx].done = !g.labs[labIdx].done; saveState(); }
}

function toggleCsappBypass(id) {
  const g = state.csappGates.find(x => x.id === id);
  if (g) { g.bypassed = !g.bypassed; saveState(); }
}

function toggleDs(lvlIdx, itemIdx) {
  state.dsLevels[lvlIdx].items[itemIdx].done = !state.dsLevels[lvlIdx].items[itemIdx].done;
  saveState();
}

function updateBook(id, delta) {
  const b = state.books.find(x => x.id === id);
  if (b) {
    b.read = Math.max(0, Math.min(b.total, b.read + delta));
    saveState();
  }
}

function exportData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const a = document.createElement('a');
  a.setAttribute("href", dataStr);
  a.setAttribute("download", "50_anos_em_5_backup.json");
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      state = JSON.parse(e.target.result);
      saveState();
    } catch (err) {
      alert('Arquivo JSON inválido.');
    }
  };
  reader.readAsText(file);
}

function resetAll() {
  if (confirm('Deseja restaurar o painel para a configuração padrão?')) {
    state = JSON.parse(JSON.stringify(defaultState));
    saveState();
  }
}

function render() {
  // 1. Weekly Habits
  const habitTbody = document.getElementById('habitList');
  habitTbody.innerHTML = '';
  let weeklyDoneCount = 0;

  state.habits.forEach(h => {
    const streak = calculateStreak(h.days);
    weeklyDoneCount += h.days.filter(Boolean).length;
    const cells = h.days.map((d, i) => `
      <td class="py-2 px-2 text-center">
        <input type="checkbox" ${d ? 'checked' : ''} onchange="toggleDay(${h.id}, ${i})" class="w-4 h-4 rounded cursor-pointer" />
      </td>
    `).join('');

    habitTbody.innerHTML += `
      <tr class="hover:bg-zinc-800/30 transition">
        <td class="py-2 px-2 font-medium text-zinc-200">${h.name}</td>
        ${cells}
        <td class="py-2 px-2 text-center font-mono text-xs text-amber-400 font-semibold">${streak}d</td>
        <td class="py-2 px-1 text-right">
          <button onclick="removeHabit(${h.id})" class="text-zinc-500 hover:text-red-400 text-xs">✕</button>
        </td>
      </tr>
    `;
  });

  // 2. Tab 1: Master 30 Steps
  const masterContainer = document.getElementById('tab-master');
  masterContainer.innerHTML = '';
  const phasesMaster = [...new Set(state.masterSteps.map(s => s.phase))];
  let activeStepFound = null;

  phasesMaster.forEach(phaseName => {
    const steps = state.masterSteps.filter(s => s.phase === phaseName);
    const doneInPhase = steps.filter(s => s.done).length;

    const stepsHtml = steps.map(s => {
      if (!s.done && !activeStepFound) activeStepFound = s;
      const isCurrent = activeStepFound && activeStepFound.step === s.step;
      const badgeColors = {
        '42': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'CSAPP': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        'PROJ-BASE': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'IMPACTO': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        'CHEFE-FINAL': 'bg-red-500/10 text-red-400 border-red-500/30'
      };

      return `
        <div class="p-3 rounded-lg border transition ${isCurrent ? 'bg-emerald-950/20 border-emerald-500/50' : 'bg-zinc-900/70 border-zinc-800/80'}">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <label class="flex items-start md:items-center gap-2.5 cursor-pointer">
              <input type="checkbox" ${s.done ? 'checked' : ''} onchange="toggleMasterStep(${s.step})" class="mt-0.5 md:mt-0 w-4 h-4 rounded" />
              <span class="font-mono text-xs text-zinc-400">#${String(s.step).padStart(2, '0')}</span>
              <span class="px-1.5 py-0.5 text-[10px] font-mono border rounded ${badgeColors[s.type]}">${s.type}</span>
              <span class="text-xs md:text-sm font-medium ${s.done ? 'line-through text-zinc-500' : 'text-zinc-100'}">${s.name}</span>
            </label>
            <div class="flex items-center gap-2 self-end md:self-center">
              <input type="range" min="0" max="100" step="10" value="${s.progress}" onchange="updateMasterProgress(${s.step}, this.value)" class="w-24 accent-emerald-500 h-1.5 bg-zinc-800 rounded cursor-pointer" />
              <span class="font-mono text-xs text-emerald-400 w-9 text-right">${s.progress}%</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    masterContainer.innerHTML += `
      <div class="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-bold text-zinc-200 font-mono">${phaseName}</h3>
          <span class="text-xs font-mono text-zinc-400">${doneInPhase} / ${steps.length} concluídos</span>
        </div>
        <div class="space-y-2">${stepsHtml}</div>
      </div>
    `;
  });

  // 3. Tab 2: 42 & Bootcamps
  const container42 = document.getElementById('tab-42');
  container42.innerHTML = '';
  const phases42 = [...new Set(state.route42.map(x => x.phase))];
  let next42Found = state.route42.find(x => !x.done);

  phases42.forEach(pName => {
    const items = state.route42.filter(x => x.phase === pName);
    const doneCount = items.filter(x => x.done).length;
    const listHtml = items.map(item => `
      <label class="flex items-center justify-between bg-zinc-900 border border-zinc-800/80 px-3 py-2 rounded-lg cursor-pointer hover:border-zinc-700 transition">
        <div class="flex items-center gap-2.5">
          <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggle42('${item.id}')" class="w-3.5 h-3.5 rounded" />
          <span class="px-1.5 py-0.5 text-[10px] font-mono rounded border ${item.kind === 'BOOTCAMP' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}">${item.kind}</span>
          <span class="text-xs ${item.done ? 'line-through text-zinc-500' : 'text-zinc-200'}">${item.name}</span>
        </div>
      </label>
    `).join('');

    container42.innerHTML += `
      <div class="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-bold text-zinc-200 font-mono">${pName}</h3>
          <span class="text-xs font-mono text-blue-400">${doneCount} / ${items.length}</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">${listHtml}</div>
      </div>
    `;
  });

  // 4. Tab 3: CS:APP Protocol
  const csappContainer = document.getElementById('tab-csapp');
  csappContainer.innerHTML = '';
  let nextCsappFound = null;

  state.csappGates.forEach(g => {
    const allLabsDone = g.labs.every(l => l.done);
    const gateCompleted = (g.readDone && allLabsDone) || g.bypassed;
    if (!gateCompleted && !nextCsappFound) nextCsappFound = g;

    const labsHtml = g.labs.map((l, idx) => `
      <label class="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded cursor-pointer">
        <input type="checkbox" ${l.done ? 'checked' : ''} onchange="toggleCsappLab('${g.id}', ${idx})" class="w-4 h-4 rounded" />
        <span class="text-xs font-mono text-purple-300">[LAB GATE]</span>
        <span class="text-xs ${l.done ? 'line-through text-zinc-500' : 'text-zinc-200'}">${l.name}</span>
      </label>
    `).join('');

    const bypassBtn = g.id === 'cs-3' ? `
      <button onclick="toggleCsappBypass('${g.id}')" class="text-xs font-mono px-2.5 py-1 rounded border ${g.bypassed ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}">
        ${g.bypassed ? '✓ Bypass Tático Ativo (Pulado)' : 'Ativar Bypass Tático'}
      </button>
    ` : '';

    csappContainer.innerHTML += `
      <div class="bg-zinc-900/50 border ${gateCompleted ? 'border-zinc-800' : 'border-purple-500/40'} rounded-xl p-4">
        <div class="flex flex-wrap justify-between items-center gap-2 mb-2">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 text-xs font-mono rounded ${gateCompleted ? 'bg-emerald-500/10 text-emerald-400' : 'bg-purple-500/10 text-purple-400'}">${gateCompleted ? 'LIBERADO' : 'TRAVA ATIVA'}</span>
            <h3 class="text-sm font-bold text-zinc-100">${g.title}</h3>
          </div>
          ${bypassBtn}
        </div>
        <p class="text-xs text-zinc-400 mb-3">${g.note}</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
          <label class="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded cursor-pointer">
            <input type="checkbox" ${g.readDone ? 'checked' : ''} onchange="toggleCsappRead('${g.id}')" class="w-4 h-4 rounded" />
            <span class="text-xs font-mono text-blue-400">[TEORIA]</span>
            <span class="text-xs ${g.readDone ? 'line-through text-zinc-500' : 'text-zinc-200'}">${g.reading}</span>
          </label>
          ${labsHtml}
        </div>
      </div>
    `;
  });

  // 5. Tab 4: Data Structures
  const dsContainer = document.getElementById('tab-ds');
  dsContainer.innerHTML = '';
  let totalDsDone = 0, totalDsCount = 0;
  let nextDsFound = null;

  state.dsLevels.forEach((lvl, lIdx) => {
    const doneInLvl = lvl.items.filter(i => i.done).length;
    totalDsDone += doneInLvl;
    totalDsCount += lvl.items.length;

    const itemsHtml = lvl.items.map((it, iIdx) => {
      if (!it.done && !nextDsFound) nextDsFound = { level: lvl.level, name: it.name };
      return `
        <label class="flex items-start gap-2 cursor-pointer py-1">
          <input type="checkbox" ${it.done ? 'checked' : ''} onchange="toggleDs(${lIdx}, ${iIdx})" class="mt-0.5 w-3.5 h-3.5 rounded" />
          <span class="text-xs ${it.done ? 'line-through text-zinc-500' : 'text-zinc-300'}">${it.name}</span>
        </label>
      `;
    }).join('');

    dsContainer.innerHTML += `
      <div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-bold text-zinc-200">${lvl.level}</span>
            <span class="px-1.5 py-0.5 text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">${lvl.year}</span>
          </div>
          <div class="divide-y divide-zinc-800/50">${itemsHtml}</div>
        </div>
        <div class="mt-3 pt-2 border-t border-zinc-800/80 flex justify-between text-[11px] font-mono text-zinc-400">
          <span>Domínio do Nível</span>
          <span>${doneInLvl}/${lvl.items.length}</span>
        </div>
      </div>
    `;
  });

  // 6. Tab 5: Books
  const booksContainer = document.getElementById('tab-books');
  booksContainer.innerHTML = '';
  let totalChaptersRead = 0, totalChaptersAll = 0;

  state.books.forEach(b => {
    totalChaptersRead += b.read;
    totalChaptersAll += b.total;
    const pct = Math.round((b.read / b.total) * 100);

    booksContainer.innerHTML += `
      <div class="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-center mb-1.5">
            <span class="px-2 py-0.5 text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">${b.year}</span>
            <span class="font-mono text-xs text-cyan-400">${b.read} / ${b.total} caps (${pct}%)</span>
          </div>
          <h4 class="text-xs md:text-sm font-semibold text-zinc-100 mb-3">${b.title}</h4>
        </div>
        <div>
          <div class="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-3">
            <div class="bg-cyan-500 h-full transition-all" style="width: ${pct}%"></div>
          </div>
          <div class="flex justify-end gap-1.5">
            <button onclick="updateBook('${b.id}', -1)" class="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1 rounded text-xs font-mono">-1 cap</button>
            <button onclick="updateBook('${b.id}', 1)" class="bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded text-xs font-mono">+1 cap</button>
          </div>
        </div>
      </div>
    `;
  });

  // 7. Tab 6: 5-Year Macro Plan
  const yearsContainer = document.getElementById('tab-years');
  yearsContainer.innerHTML = '';
  state.yearsPlan.forEach(y => {
    yearsContainer.innerHTML += `
      <div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
        <h3 class="text-base font-bold text-emerald-400 mb-3 font-mono">${y.year}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div class="bg-zinc-950/60 border border-zinc-800/80 p-3 rounded-lg">
            <span class="font-mono text-[10px] text-cyan-400 uppercase block mb-1">Foco Teórico</span>
            <p class="text-zinc-300">${y.focus}</p>
          </div>
          <div class="bg-zinc-950/60 border border-zinc-800/80 p-3 rounded-lg">
            <span class="font-mono text-[10px] text-blue-400 uppercase block mb-1">Currículo & Bootcamps</span>
            <p class="text-zinc-300">${y.curriculum}</p>
          </div>
          <div class="bg-zinc-950/60 border border-zinc-800/80 p-3 rounded-lg">
            <span class="font-mono text-[10px] text-amber-400 uppercase block mb-1">Estruturas de Dados</span>
            <p class="text-zinc-300">${y.ds}</p>
          </div>
          <div class="bg-zinc-950/60 border border-zinc-800/80 p-3 rounded-lg">
            <span class="font-mono text-[10px] text-purple-400 uppercase block mb-1">Labs & Infra</span>
            <p class="text-zinc-300">${y.labs}</p>
          </div>
          <div class="bg-zinc-950/60 border border-zinc-800/80 p-3 rounded-lg">
            <span class="font-mono text-[10px] text-emerald-400 uppercase block mb-1">Projetos Práticos</span>
            <p class="text-zinc-300">${y.projects}</p>
          </div>
        </div>
      </div>
    `;
  });

  // Next Action Engine
  document.getElementById('nextMasterStep').textContent = activeStepFound ? `#${activeStepFound.step} ${activeStepFound.name}` : 'Todos os 30 passos concluídos!';
  document.getElementById('nextMasterPhase').textContent = activeStepFound ? activeStepFound.phase : '100% Completo';
  document.getElementById('next42Item').textContent = next42Found ? next42Found.name : 'Common Core + Bootcamps Zerados!';
  document.getElementById('next42Phase').textContent = next42Found ? next42Found.phase : 'Rank 6 Completo';
  document.getElementById('nextCsappGate').textContent = nextCsappFound ? nextCsappFound.title : 'Protocolo CS:APP Zerado!';
  document.getElementById('nextCsappStatus').textContent = nextCsappFound ? `Leitura: ${nextCsappFound.reading}` : 'Todos os Labs concluídos';
  document.getElementById('nextDsItem').textContent = nextDsFound ? nextDsFound.name : 'Níveis 0 a 15 dominados!';
  document.getElementById('nextDsLevel').textContent = nextDsFound ? nextDsFound.level : 'Completo';

  // KPIs
  const totalWeeklyPossible = state.habits.length * 7;
  const weeklyRate = totalWeeklyPossible > 0 ? Math.round((weeklyDoneCount / totalWeeklyPossible) * 100) : 0;
  const masterDone = state.masterSteps.filter(s => s.done).length;
  const done42 = state.route42.filter(x => x.done).length;
  const allCsappLabs = state.csappGates.flatMap(g => g.labs);
  const csappLabsDone = allCsappLabs.filter(l => l.done).length;

  document.getElementById('kpiWeeklyRate').textContent = `${weeklyRate}%`;
  document.getElementById('kpiMaster').textContent = `${masterDone} / ${state.masterSteps.length}`;
  document.getElementById('kpi42').textContent = `${done42} / ${state.route42.length}`;
  document.getElementById('kpiCsapp').textContent = `${csappLabsDone} / ${allCsappLabs.length}`;
  document.getElementById('kpiDs').textContent = `${totalDsDone} / ${totalDsCount}`;
  document.getElementById('kpiBooks').textContent = `${totalChaptersRead} / ${totalChaptersAll}`;

  // Global Progress
  const totalItemsGlobal = state.masterSteps.length + state.route42.length + allCsappLabs.length + totalDsCount + totalChaptersAll;
  const totalDoneGlobal = masterDone + done42 + csappLabsDone + totalDsDone + totalChaptersRead;
  const globalPct = Math.round((totalDoneGlobal / totalItemsGlobal) * 100);
  document.getElementById('globalProgressBadge').textContent = `Progresso Global (5 Anos): ${globalPct}%`;

  // Weekly Chart
  const dailyPercentages = DAYS.map((_, idx) => {
    if (!state.habits.length) return 0;
    const done = state.habits.filter(h => h.days[idx]).length;
    return Math.round((done / state.habits.length) * 100);
  });

  const ctx = document.getElementById('weeklyChart').getContext('2d');
  if (chartInstance) {
    chartInstance.data.datasets[0].data = dailyPercentages;
    chartInstance.update();
  } else {
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: DAYS,
        datasets: [{
          data: dailyPercentages,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          borderWidth: 2,
          pointBackgroundColor: '#10b981',
          pointRadius: 4,
          fill: true,
          tension: 0.35
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, max: 100, grid: { color: '#27272a' }, ticks: { color: '#a1a1aa', callback: v => v + '%' } },
          x: { grid: { display: false }, ticks: { color: '#a1a1aa' } }
        }
      }
    });
  }
}

document.getElementById('habitInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') addHabit();
});

render();