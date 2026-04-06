app.get('/api/assets/:folder', async (req, res) => {
    try {
        const folderParam = req.params.folder;
        let searchPath = "";

        // ফোল্ডার নেম ম্যাপিং
        if (folderParam === 'legend') {
            searchPath = "Home/Legend_Cards/*"; // Legend_Cards এর ভেতরের সব সাব-ফোল্ডার
        } else if (folderParam === 'manager') {
            searchPath = "Home/Manager/*";
        } else if (folderParam === 'event') {
            searchPath = "Home/Events/*";
        }

        const result = await cloudinary.search
            .expression(`folder:${searchPath}`)
            .sort_by('public_id', 'asc')
            .execute();
        
        const images = result.resources.map(file => ({
            url: file.secure_url,
            name: file.public_id.split('/').pop().replace(/_/g, ' ')
        }));
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Cloudinary Fetch Error" });
    }
});
