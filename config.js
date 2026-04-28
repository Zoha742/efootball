// আপনার ফায়ারবেস কনফিগ (নতুন প্রজেক্ট আইডি অনুযায়ী)
        const firebaseConfig = {
          apiKey: "AIzaSyAy2nEcb--kbjU7tSIm6lJG5ZpEFSus7sg",
          authDomain: "efootball-57d9b.firebaseapp.com",
          databaseURL: "https://efootball-57d9b-default-rtdb.firebaseio.com",
          projectId: "efootball-57d9b",
          storageBucket: "efootball-57d9b.firebasestorage.app",
          messagingSenderId: "1031993322489",
          appId: "1:1031993322489:web:0336c8e1869318a8222b28",
          measurementId: "G-1SLL8RNP5M"
        };

        // ফায়ারবেস ইনিশিয়ালাইজেশন
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
