// ads-manager.js - শুধুমাত্র রিওয়ার্ড ভিডিওর জন্য
console.log("Ad Controller Connected!");[cite: 12]

const AdController = {
    // ভিডিও অ্যাডের ID (সব সময় শুধু সংখ্যা হবে)
    videoBlockId: "29212", 

    // ভিডিও অ্যাড (Reward) লোড এবং প্রদর্শনের ফাংশন[cite: 12]
    showVideoAd: function(onReward, onError) {
        try {
            if (window.Adsgram) {
                // Adsgram SDK দিয়ে ভিডিও ইনিশিয়ালাইজ করা[cite: 12]
                const ad = window.Adsgram.init({ blockId: this.videoBlockId });
                
                // ভিডিও প্রদর্শন এবং রেজাল্ট হ্যান্ডলিং[cite: 12]
                ad.show()
                  .then((result) => {
                      console.log("Video Reward Success");
                      if (onReward) onReward(result); // সফল হলে রিওয়ার্ড ফাংশন কল হবে
                  })
                  .catch((err) => {
                      console.log("Video skipped or error:", err);
                      if (onError) onError(err); // এরর বা স্কিপ করলে এটি কল হবে
                  });
            } else {
                console.log("Adsgram SDK not loaded yet.");[cite: 12]
            }
        } catch (e) {
            console.error("Ad System Error:", e);
            if (onError) onError(e);
        }
    }
};[cite: 12]
