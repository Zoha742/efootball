// Legend ডাটা লোড করার মেইন ফাংশন
        async function loadLegendData() {
            const container = document.getElementById('legend-list-view');
            if(!container) return; 
            
            container.innerHTML = "<p style='grid-column: 1/4; text-align:center;'>Loading...</p>";

            try {
                const response = await fetch('/api/data'); 
                const data = await response.json();
                container.innerHTML = ""; 

                data.legend.forEach(player => {
                    const card = document.createElement('div');
                    card.className = 'top-card';
                    card.innerHTML = `
                        <img src="${player.img}" alt="${player.name}">
                        <div style="font-size:10px; text-align:center; padding:5px; color:#fff;">${player.name}</div>
                    `;
                    
                    // কার্ডে ক্লিক করলে অ্যাড এবং ডিটেইলস
                    card.onclick = () => {
                        tg.showConfirm("Watch Ad to see details?", (ok) => {
                            if(ok) openDetails(player);
                        });
                    };
                    container.appendChild(card);
                });
            } catch (e) {
                container.innerHTML = "Error!";
            }
        }

        // ডিটেইলস পেজ দেখানোর ফাংশন
        function openDetails(player) {
            showPage('page-details');
            document.getElementById('details-content').innerHTML = `
                <img src="${player.img}" style="width:180px; border-radius:15px; border:2px solid gold;">
                <h3 style="margin-top:10px;">${player.name}</h3>
                <p>Position: ${player.pos}</p>
            `;
        }

        // মেনু নেভিগেশন সচল করা
        function showPage(id) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            
            // Legend বাটনে ক্লিক করলে ডাটা লোড হবে
            if(id === 'page-legend') loadLegendData();
            
            tg.HapticFeedback.impactOccurred('light');
        }
