// ads-manager-limit.js - বায়ো পেজের জন্য ১২ ঘণ্টার লিমিটসহ ভিডিও অ্যাড[cite: 5]
const ads_manager_limit = {
    videoBlockId: "29212",[cite: 5]

    // ১২ ঘণ্টার চেক লজিক[cite: 5]
    _canShowVideo: function(key) {
        const last = localStorage.getItem('ad_' + key);[cite: 5]
        const now = Date.now();[cite: 5]
        const twelveHours = 12 * 60 * 60 * 1000; // ১২ ঘণ্টা মিলিসেকেন্ডে[cite: 5]
        return !last || (now - last) > twelveHours;[cite: 5]
    },

    // ভিডিও অ্যাড প্রদর্শন ফাংশন[cite: 5]
    showBioAd: function(pageName) {
        // যদি ১২ ঘণ্টা পার না হয়, তবে ভিডিও দেখাবে না[cite: 5]
        if (!this._canShowVideo(pageName)) {
            console.log("Video Limit: Skipping for " + pageName);[cite: 5]
            return;[cite: 5]
        }

        if (window.Adsgram) {[cite: 5]
            const ad = window.Adsgram.init({ blockId: this.videoBlockId });[cite: 5]
            
            ad.show()[cite: 5]
              .then(() => {
                // ভিডিও দেখা শেষ হলে বর্তমান সময় সেভ করে রাখা হবে[cite: 5]
                localStorage.setItem('ad_' + pageName, Date.now());[cite: 5]
                console.log("Bio Video Ad Success");[cite: 5]
              })
              .catch(err => console.log("Bio Video Error", err));[cite: 5]
        }
    }
};[cite: 5]
