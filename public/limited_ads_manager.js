// limited-ads-manager.js - বায়ো পেজের জন্য ১২ ঘণ্টার লিমিটসহ ভিডিও অ্যাড[cite: 3]
const limited_ads_manager = {
    videoBlockId: "29212",[cite: 3]

    // ১২ ঘণ্টার চেক লজিক[cite: 3]
    _canShowVideo: function(key) {
        const last = localStorage.getItem('ad_' + key);[cite: 3]
        const now = Date.now();[cite: 3]
        const twelveHours = 12 * 60 * 60 * 1000; // ১২ ঘণ্টা মিলিসেকেন্ডে[cite: 3]
        return !last || (now - last) > twelveHours;[cite: 3]
    },

    // ভিডিও অ্যাড প্রদর্শন ফাংশন[cite: 3]
    showBioAd: function(pageName) {
        // যদি ১২ ঘণ্টা পার না হয়, তবে ভিডিও দেখাবে না[cite: 3]
        if (!this._canShowVideo(pageName)) {
            console.log("Video Limit: Skipping for " + pageName);[cite: 3]
            return;[cite: 3]
        }

        if (window.Adsgram) {[cite: 3]
            const ad = window.Adsgram.init({ blockId: this.videoBlockId });[cite: 3]
            
            ad.show()[cite: 3]
              .then(() => {
                // ভিডিও দেখা শেষ হলে বর্তমান সময় সেভ করে রাখা হবে[cite: 3]
                localStorage.setItem('ad_' + pageName, Date.now());[cite: 3]
                console.log("Bio Video Ad Success");[cite: 3]
              })
              .catch(err => console.log("Bio Video Error", err));[cite: 3]
        }
    }
};[cite: 3]
