console.log("Database connected successfully!");

const AdController = {
    // ১. ভিডিও অ্যাডের ID (আপনার Boost বাটনের জন্য)
    videoBlockId: "29212", 

    // ২. ব্যানার/টাস্ক অ্যাডের ID (আপনার পেজের নিচে শো করার জন্য)
    bannerBlockId: "task-29213", 

    // ভিডিও অ্যাড (Reward) লোড করার ফাংশন
    showVideoAd: function(onReward, onError) {
        try {
            if (window.Adsgram) {
                const ad = window.Adsgram.init({ blockId: this.videoBlockId });
                ad.show()
                  .then(onReward)
                  .catch((err) => {
                      console.log("Video skipped or error:", err);
                      if (onError) onError(err);
                  });
            } else {
                if (onError) onError("Adsgram API not loaded");
            }
        } catch (e) {
            if (onError) onError(e);
        }
    },

    // ব্যানার (Task) অ্যাড লোড করার ফাংশন
    loadBanner: function(containerId) {
        const container = document.getElementById(containerId);
        
        // ব্যানার আইডি থাকলে অ্যাড লোড হবে
        if (container && this.bannerBlockId !== "") {
            try {
                if (window.Adsgram) {
                    const bannerAd = window.Adsgram.init({ blockId: this.bannerBlockId });
                    bannerAd.show()
                        .then(() => console.log("Banner/Task Ad loaded successfully"))
                        .catch((err) => console.log("Banner Error:", err));
                }
            } catch (e) {
                console.error("Adsgram Banner failed", e);
            }
        }
    }
};
