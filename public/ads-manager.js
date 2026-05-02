// ads-manager.js - রিওয়ার্ড এবং ইন্টারস্টিশিয়াল অ্যাড কন্ট্রোলার
console.log("Ad Controller Connected!");

const AdController = {
    // ব্লকের আইডিগুলো এখানে সেট করা হয়েছে
    videoBlockId: "29212", 
    interstitialBlockId: "29249", // আপনার দেওয়া সঠিক ইন্টারস্টিশিয়াল আইডি

    // ১. রিওয়ার্ডেড ভিডিও অ্যাড প্রদর্শন
    showVideoAd: function(onReward, onError) {
        if (window.Adsgram) {
            const ad = window.Adsgram.init({ blockId: this.videoBlockId });
            ad.show()
              .then((result) => {
                  if (onReward) onReward(result); // সফল হলে রিওয়ার্ড পাবে
              })
              .catch((err) => {
                  if (onError) onError(err); // স্কিপ বা এরর হলে কল হবে
              });
        } else {
            console.log("Adsgram SDK not loaded yet.");
        }
    },

    // ২. ইন্টারস্টিশিয়াল অ্যাড প্রদর্শন (ইভেন্ট ব্যাক বাটনের জন্য)
    // সাময়িকভাবে অ্যাড বন্ধ রাখতে লজিকটি কমেন্ট করা হয়েছে[cite: 7]
    showInterstitialAd: function(onComplete) {
        /* 
        if (window.Adsgram) {
            const ad = window.Adsgram.init({ blockId: this.interstitialBlockId });
            ad.show()
              .then(() => { if (onComplete) onComplete(); }) // অ্যাড শেষ হলে ব্যাক করবে[cite: 7]
              .catch(() => { if (onComplete) onComplete(); }); // এরর হলেও ব্যাক করবে[cite: 7]
        } 
        */

        // অ্যাড না দেখালেও ইউজার যেন ব্যাক করতে পারে, তাই নিচের লাইনটি সচল রাখা হয়েছে[cite: 7]
        if (onComplete) onComplete(); 
    }
};
