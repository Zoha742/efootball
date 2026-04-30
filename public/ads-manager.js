console.log("Database connected successfully!");

const AdController = {
    // ১. ভিডিও অ্যাডের ID এখানে দিন (Adsgram থেকে পাওয়া)
    videoBlockId: "YOUR_VIDEO_AD_BLOCK_ID", 

    // ২. ব্যানার অ্যাডের ID এখানে দিন
    bannerBlockId: "YOUR_BANNER_AD_BLOCK_ID",

    // ভিডিও অ্যাড ফাংশন
    showVideoAd: function(onReward, onError) {
        const ad = window.Adsgram.init({ blockId: this.videoBlockId });
        ad.show().then(onReward).catch(onError);
    },

    // ব্যানার অ্যাড ফাংশন (এটি অটোমেটিক ব্যানার লোড করবে)
    loadBanner: function(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            // এখানে আপনার ব্যানার অ্যাডের স্ক্রিপ্টটি বসিয়ে দিন
            container.innerHTML = `
                <div style="width:100%; text-align:center;">
                    <!-- আপনার ব্যানার অ্যাড স্ক্রিপ্ট এখানে শুরু -->
                    <script> /* Adsgram বা অন্য ব্যানার কোড */ </script>
                    <!-- আপনার ব্যানার অ্যাড স্ক্রিপ্ট এখানে শেষ -->
                </div>`;
        }
    }
};
