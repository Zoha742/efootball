const BioAdController = {
    videoBlockId: "29212", 
    bannerBlockId: "29213", // ব্যানার আইডি ফরম্যাট ঠিক করা হয়েছে

    // ১২ ঘণ্টার চেক লজিক (শুধু ভিডিওর জন্য)
    _canShowVideo: function(key) {
        const last = localStorage.getItem('ad_' + key);
        const now = Date.now();
        const twelveHours = 12 * 60 * 60 * 1000;
        return !last || (now - last) > twelveHours;
    },

    // ভিডিও অ্যাড - ১২ ঘণ্টায় একবার আসবে
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

    // ব্যানার অ্যাড - এটি সব সময় লোড হবে
    loadBioBanner: function(divId) {
        const container = document.getElementById(divId);
        if (window.Adsgram && container) {
            const banner = window.Adsgram.init({ blockId: this.bannerBlockId });
            banner.show()
                .then(() => console.log("Banner Loaded (Always)"))
                .catch(e => console.log("Banner Fail", e));
        }
    }
};
