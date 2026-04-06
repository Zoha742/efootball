async function loadData(section) {
  const res = await fetch('player.json');
  const data = await res.json();

  let html = '';
  if (section === 'players') {
    html = '<h2>Players</h2>' + data.players.map(p => `
      <div>
        <img src="${p.image}" width="80">
        <p>${p.name} - Rating: ${p.rating}</p>
      </div>`).join('');
  }
  if (section === 'legends') {
    html = '<h2>Legend Players</h2>' + data.legends.map(l => `
      <div>
        <img src="${l.image}" width="80">
        <p>${l.name} - Rating: ${l.rating}</p>
      </div>`).join('');
  }
  if (section === 'managers') {
    html = '<h2>Managers</h2>' + data.managers.map(m => `
      <div>
        <p>${m.name} - Club: ${m.club}</p>
      </div>`).join('');
  }
  if (section === 'events') {
    html = '<h2>Events</h2>' + data.events.map(e => `
      <div>
        <p>${e.title} - Date: ${e.date}</p>
      </div>`).join('');
  }

  document.getElementById('content').innerHTML = html;
}

function showSection(section) {
  loadData(section);
}

function showMining() {
  document.getElementById('content').innerHTML = "<h2>Mining</h2><p>Earn coins by mining...</p>";
}

function showTasks() {
  document.getElementById('content').innerHTML = "<h2>Tasks</h2><p>Complete tasks to earn rewards...</p>";
}
