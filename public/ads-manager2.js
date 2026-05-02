// ads-manager2.js - বায়ো পেজের জন্য ১২ ঘণ্টার লিমিটসহ ভিডিও অ্যাড
const BioAdController = {
    videoBlockId: "29212",[cite: 11]

    // ১২ ঘণ্টার চেক লজিক[cite: 11]
    _canShowVideo: function(key) {
        const last = localStorage.getItem('ad_' + key);
        const now = Date.now();
        const twelveHours = 12 * 60 * 60 * 1000; // ১২ ঘণ্টা মিলিসেকেন্ডে[cite: 11]
        return !last || (now - last) > twelveHours;
    },

    // ভিডিও অ্যাড প্রদর্শন ফাংশন[cite: 11]
    showBioAd: function(pageName) {
        // যদি ১২ ঘণ্টা পার না হয়, তবে ভিডিও দেখাবে না[cite: 11]
        if (!this._canShowVideo(pageName)) {
            console.log("Video Limit: Skipping for " + pageName);
            return;
        }

        if (window.Adsgram) {
            const ad = window.Adsgram.init({ blockId: this.videoBlockId });
            
            ad.show()
              .then(() => {
                // ভিডিও দেখা শেষ হলে বর্তমান সময় সেভ করে রাখা হবে[cite: 11]
                localStorage.setItem('ad_' + pageName, Date.now());
                console.log("Bio Video Ad Success");
              })
              .catch(err => console.log("Bio Video Error", err));
        }
    }
};[cite: 11]
