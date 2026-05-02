// ads-manager-active.js - রিওয়ার্ড এবং ইন্টারস্টিশিয়াল অ্যাড কন্ট্রোলার[cite: 4]
console.log("Ad Controller Connected!");[cite: 4]

const ads_manager_active = {
    // ব্লকের আইডিগুলো এখানে সেট করা হয়েছে[cite: 4]
    videoBlockId: "29212",[cite: 4]
    interstitialBlockId: "29249", // আপনার দেওয়া সঠিক ইন্টারস্টিশিয়াল আইডি[cite: 4]

    // ১. রিওয়ার্ডেড ভিডিও অ্যাড প্রদর্শন[cite: 4]
    showVideoAd: function(onReward, onError) {
        if (window.Adsgram) {[cite: 4]
            const ad = window.Adsgram.init({ blockId: this.videoBlockId });[cite: 4]
            ad.show()[cite: 4]
              .then((result) => {
                  if (onReward) onReward(result); // সফল হলে রিওয়ার্ড পাবে[cite: 4]
              })
              .catch((err) => {
                  if (onError) onError(err); // স্কিপ বা এরর হলে কল হবে[cite: 4]
              });
        } else {
            console.log("Adsgram SDK not loaded yet.");[cite: 4]
        }
    },

    // ২. ইন্টারস্টিশিয়াল অ্যাড প্রদর্শন (ইভেন্ট ব্যাক বাটনের জন্য)[cite: 4]
    // সাময়িকভাবে অ্যাড বন্ধ রাখতে লজিকটি কমেন্ট করা হয়েছে[cite: 4]
    showInterstitialAd: function(onComplete) {
        /* 
        if (window.Adsgram) {
            const ad = window.Adsgram.init({ blockId: this.interstitialBlockId });
            ad.show()
              .then(() => { if (onComplete) onComplete(); }) // অ্যাড শেষ হলে ব্যাক করবে
              .catch(() => { if (onComplete) onComplete(); }); // এরর হলেও ব্যাক করবে
        } 
        */

        // অ্যাড না দেখালেও ইউজার যেন ব্যাক করতে পারে, তাই নিচের লাইনটি সচল রাখা হয়েছে[cite: 4]
        if (onComplete) onComplete();[cite: 4]
    }
};[cite: 4]
