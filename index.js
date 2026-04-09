<script>
    const tg = window.Telegram.WebApp;
    tg.expand();

    // পেজ দেখানোর ফাংশন
    function showPage(id) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const targetPage = document.getElementById(id);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Legend Bottom এ ক্লিক করলে ডাটা লোড হবে
        if(id === 'page-legend') {
            loadLegendData();
        }
        
        // নেভিগেশন হাইলাইট
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active-nav'));
        tg.HapticFeedback.impactOccurred('light');
    }

    // Legend ডাটা লোড এবং কার্ডভিউ তৈরি
    async function loadLegendData() {
        const container = document.getElementById('legend-list-view');
        if (!container) return;
        container.innerHTML = "<p style='grid-column: 1/4; text-align:center;'>Loading Cards...</p>";

        try {
            const response = await fetch('/api/data'); 
            const data = await response.json();
            
            container.innerHTML = ""; // লোডিং টেক্সট সরানো
            
            data.legend.forEach(player => {
                const card = document.createElement('div');
                card.className = 'top-card';
                card.style.cursor = "pointer";
                card.innerHTML = `
                    <img src="${player.img}" alt="${player.name}">
                    <div style="font-size:10px; text-align:center; padding:5px;">${player.name}</div>
                `;
                
                // কার্ডে ক্লিক করলে অ্যাড এবং নিউ পেজ
                card.onclick = () => {
                    tg.showConfirm("Watch an Ad to see player details?", (ok) => {
                        if(ok) {
                            openDetails(player);
                        }
                    });
                };
                container.appendChild(card);
            });
        } catch (e) {
            container.innerHTML = "Error loading data.";
        }
    }

    // ডিটেইলস পেজ ওপেন করা
    function openDetails(player) {
        showPage('page-details');
        const content = document.getElementById('details-content');
        if (content) {
            content.innerHTML = `
                <img src="${player.img}" style="width:200px; border-radius:15px; border:2px solid gold;">
                <h2 style="margin-top:15px;">${player.name}</h2>
                <p>Position: ${player.pos}</p>
                <div style="background:#121e36; padding:15px; border-radius:10px; margin-top:20px; text-align:left;">
                    <p>Attacking: 99</p>
                    <p>Speed: 95</p>
                    <p>Stamina: 90</p>
                </div>
            `;
        }
    }
</script>

<nav class="bottom-nav">
    <div class="nav-item active-nav" onclick="showPage('home')">
        <i class="fas fa-home"></i>Home
    </div>
    <div class="nav-item" onclick="showPage('page-legend')">
        <i class="fas fa-crown"></i>Legend
    </div>
    <div class="nav-item" onclick="showPage('page-task')">
        <i class="fas fa-clipboard-check"></i>Task
    </div>
    <div class="nav-item" onclick="showPage('page-profile')">
        <i class="fas fa-user-circle"></i>Profile
    </div>
</nav>

</body>
</html>
