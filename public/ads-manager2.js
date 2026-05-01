const BioAdController = {
    videoBlockId: "29212", 
    bannerBlockId: "29213",

    _canShow: function(key) {
        const last = localStorage.getItem('ad_' + key);
        const now = Date.now();
        return !last || (now - last) > (12 * 60 * 60 * 1000);
    },

    showBioAd: function(pageName) {
        if (!this._canShow(pageName)) {
            console.log("Limit active: Skip video for " + pageName);
            return;
        }

        if (window.Adsgram) {
            const ad = window.Adsgram.init({ blockId: this.videoBlockId });[cite: 4]
            ad.show().then(() => {
                localStorage.setItem('ad_' + pageName, Date.now());
            }).catch(err => console.log("Video Error", err));
        }
    },

    loadBioBanner: function(divId) {
        if (window.Adsgram && document.getElementById(divId)) {
            const banner = window.Adsgram.init({ blockId: this.bannerBlockId });[cite: 4]
            banner.show().catch(e => console.log("Banner Fail", e));
        }
    }
};
