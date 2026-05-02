// ads-manager.js - রিওয়ার্ড এবং ইন্টারস্টিশিয়াল অ্যাড কন্ট্রোলার
console.log("Ad Controller Connected!");

const AdController = {
    // ব্লকের আইডিগুলো এখানে সেট করা হয়েছে
    videoBlockId: "29212", 
    interstitialBlockId: "29249", // আপনার দেওয়া ইন্টারস্টিশিয়াল আইডি

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
    showInterstitialAd: function(onComplete) {
        if (window.Adsgram) {
            const ad = window.Adsgram.init({ blockId: this.interstitialBlockId });
            ad.show()
              .then(() => { if (onComplete) onComplete(); }) // অ্যাড শেষ হলে ব্যাক করবে
              .catch(() => { if (onComplete) onComplete(); }); // এরর হলেও ব্যাক করবে
        } else {
            if (onComplete) onComplete();
        }
    }
};
