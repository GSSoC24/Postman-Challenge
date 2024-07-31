fetch('updated_data.json')
    .then(response => response.json())
    .then(data => {
        // Load referral data
        fetch('referral_data.json')
            .then(response => response.json())
            .then(referralData => {
                // Create a map to count the number of certifications per referral code
                const referralCount = {};

                // Process data to count certifications per referral code
                data.forEach(entry => {
                    const referralCode = entry['Referral Code'];
                    if (!referralCount[referralCode]) {
                        const owner = Object.keys(referralData).find(name => referralData[name] === referralCode);
                        referralCount[referralCode] = {
                            'Name': owner,
                            'Referral Code': referralCode,
                            'Number of Certifications': 0
                        };
                    }
                    referralCount[referralCode]['Number of Certifications'] += 1;
                });

                // Convert the map to an array and sort by the number of certifications
                const leaderboard = Object.values(referralCount).sort((a, b) => b['Number of Certifications'] - a['Number of Certifications']);

                // Get the table body element
                const tableBody = document.getElementById('leaderboardTable').getElementsByTagName('tbody')[0];

                // Populate the table with the leaderboard data
                leaderboard.forEach((item, index) => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = index + 1; // Rank
                    row.insertCell(1).textContent = item['Name'];
                    row.insertCell(2).textContent = item['Referral Code'];
                    row.insertCell(3).textContent = item['Number of Certifications'];
                    row.insertCell(4).textContent = item['Number of Certifications'] * 50; // Score
                });
            })
            .catch(error => console.error('Error loading the referral data:', error));
    })
    .catch(error => console.error('Error loading the JSON data:', error));

    