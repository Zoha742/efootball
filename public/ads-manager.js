console.log("Database connected successfully!");[cite: 5]

const AdController = {
    // ১. ভিডিও অ্যাডের ID (সব সময় শুধু সংখ্যা হবে)
    videoBlockId: "29212", 

    // ২. ব্যানার/টাস্ক অ্যাডের ID (অবশ্যই 'task-' প্রিফিক্স থাকবে)[cite: 13]
    bannerBlockId: "task-29213", 

    // ভিডিও অ্যাড (Reward) লোড করার ফাংশন[cite: 13]
    showVideoAd: function(onReward, onError) {
        try {
            if (window.Adsgram) {
                // এখানে নিশ্চিত করা হয়েছে যেন শুধু ভিডিও আইডি ব্যবহার হয়[cite: 13]
                const ad = window.Adsgram.init({ blockId: this.videoBlockId });
                ad.show()
                  .then(onReward)
                  .catch((err) => {
                      console.log("Video skipped or error:", err);
                      if (onError) onError(err);
                  });
            } else {
                console.log("Adsgram SDK not loaded yet.");[cite: 13]
            }
        } catch (e) {
            if (onError) onError(e);
        }
    },

    // ব্যানার (Task) অ্যাড রেন্ডার করার ফাংশন[cite: 13]
    loadBanner: function(containerId) {
        const container = document.getElementById(containerId);
        if (container && window.Adsgram) {
            try {
                const bannerAd = window.Adsgram.init({ blockId: this.bannerBlockId });
                // ব্যানার বা টাস্ক অ্যাডের জন্য .render() ব্যবহার করা হয়েছে[cite: 13]
                bannerAd.render(container)
                    .then(() => console.log("Banner Ad rendered successfully"))
                    .catch((err) => console.log("Banner Render Error:", err));
            } catch (e) {
                console.error("Adsgram Banner failed", e);
            }
        }
    }
};[cite: 13]
