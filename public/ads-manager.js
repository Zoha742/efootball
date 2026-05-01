console.log("Database connected successfully!");[cite: 5]

const AdController = {[cite: 5]
    // ১. ভিডিও অ্যাডের ID (Reward Video)[cite: 5]
    videoBlockId: "29212",[cite: 5]

    // ২. ব্যানার/টাস্ক অ্যাডের ID (অবশ্যই 'task-' প্রিফিক্স থাকতে হবে)
    bannerBlockId: "task-29213", 

    // ভিডিও অ্যাড (Reward) লোড করার ফাংশন[cite: 5]
    showVideoAd: function(onReward, onError) {[cite: 5]
        try {[cite: 5]
            if (window.Adsgram) {[cite: 5]
                const ad = window.Adsgram.init({ blockId: this.videoBlockId });[cite: 5]
                ad.show()[cite: 5]
                  .then(onReward)[cite: 5]
                  .catch((err) => {[cite: 5]
                      console.log("Video skipped or error:", err);[cite: 5]
                      if (onError) onError(err);[cite: 5]
                  });[cite: 5]
            } else {[cite: 5]
                console.log("Adsgram SDK not loaded yet.");[cite: 5]
            }[cite: 5]
        } catch (e) {[cite: 5]
            if (onError) onError(e);[cite: 5]
        }[cite: 5]
    },[cite: 5]

    // ব্যানার (Task) অ্যাড লোড করার আপডেট করা ফাংশন
    loadBanner: function(containerId) {[cite: 5]
        const container = document.getElementById(containerId);[cite: 5]
        
        if (container && this.bannerBlockId !== "") {[cite: 5]
            try {[cite: 5]
                if (window.Adsgram) {[cite: 5]
                    const bannerAd = window.Adsgram.init({ blockId: this.bannerBlockId });[cite: 5, 6]
                    
                    // .show() এর বদলে .render(container) ব্যবহার করা হয়েছে
                    bannerAd.render(container)[cite: 5, 6]
                        .then(() => console.log("Banner/Task Ad rendered successfully"))[cite: 5, 6]
                        .catch((err) => console.log("Banner Render Error:", err));[cite: 5, 6]
                }[cite: 5]
            } catch (e) {[cite: 5]
                console.error("Adsgram Banner failed", e);[cite: 5]
            }[cite: 5]
        }[cite: 5]
    }[cite: 5]
};[cite: 5]
