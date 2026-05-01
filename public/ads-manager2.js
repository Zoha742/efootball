const BioAdController = {
    videoBlockId: "29212", 
    bannerBlockId: "task-29213", // ব্যানার আইডি ফরম্যাট ঠিক করা হয়েছে[cite: 8]

    // ১২ ঘণ্টার চেক লজিক (শুধু ভিডিওর জন্য)[cite: 8]
    _canShowVideo: function(key) {
        const last = localStorage.getItem('ad_' + key);
        const now = Date.now();
        const twelveHours = 12 * 60 * 60 * 1000;
        return !last || (now - last) > twelveHours;
    },

    // ভিডিও অ্যাড - ১২ ঘণ্টায় একবার আসবে[cite: 8]
    showBioAd: function(pageName) {
        if (!this._canShowVideo(pageName)) {
            console.log("Video Limit: Skipping for " + pageName);
            return;
        }

        if (window.Adsgram) {
            const ad = window.Adsgram.init({ blockId: this.videoBlockId });
            ad.show().then(() => {
                localStorage.setItem('ad_' + pageName, Date.now());
                console.log("Video Ad Success");
            }).catch(err => console.log("Video Error", err));
        }
    },

    // ব্যানার অ্যাড - ডকুমেন্টেশন অনুযায়ী আপডেট করা হয়েছে
    loadBioBanner: function(divId) {
        const container = document.getElementById(divId);
        if (window.Adsgram && container) {
            const banner = window.Adsgram.init({ blockId: this.bannerBlockId });
            
            // .show() এর বদলে .render(container) ব্যবহার করা হয়েছে
            banner.render(container)
                .then(() => console.log("Bio Banner Rendered Successfully"))
                .catch(e => console.log("Bio Banner Render Fail", e));
        }
    }
};
