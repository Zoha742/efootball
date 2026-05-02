// limited-ads.js - বায়ো পেজের জন্য ১২ ঘণ্টার লিমিটসহ ভিডিও অ্যাড[cite: 4]
const Limitedads = {
    videoBlockId: "29212",[cite: 4]

    // ১২ ঘণ্টার চেক লজিক[cite: 4]
    _canShowVideo: function(key) {
        const last = localStorage.getItem('ad_' + key);[cite: 4]
        const now = Date.now();[cite: 4]
        const twelveHours = 12 * 60 * 60 * 1000; // ১২ ঘণ্টা মিলিসেকেন্ডে[cite: 4]
        return !last || (now - last) > twelveHours;[cite: 4]
    },

    // ভিডিও অ্যাড প্রদর্শন ফাংশন[cite: 4]
    showBioAd: function(pageName) {
        // যদি ১২ ঘণ্টা পার না হয়, তবে ভিডিও দেখাবে না[cite: 4]
        if (!this._canShowVideo(pageName)) {
            console.log("Video Limit: Skipping for " + pageName);[cite: 4]
            return;[cite: 4]
        }

        if (window.Adsgram) {[cite: 4]
            const ad = window.Adsgram.init({ blockId: this.videoBlockId });[cite: 4]
            
            ad.show()[cite: 4]
              .then(() => {
                // ভিডিও দেখা শেষ হলে বর্তমান সময় সেভ করে রাখা হবে[cite: 4]
                localStorage.setItem('ad_' + pageName, Date.now());[cite: 4]
                console.log("Bio Video Ad Success");[cite: 4]
              })
              .catch(err => console.log("Bio Video Error", err));[cite: 4]
        }
    }
};[cite: 4]
