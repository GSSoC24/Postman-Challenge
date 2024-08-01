const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (e.g., images, CSS)
app.use(express.static('public'));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API route to fetch leaderboard data
app.get('/api/leaderboard', async (req, res) => {
    try {
        const dataResponse = await axios.get('https://raw.githubusercontent.com/GSSoC24/Postman-Challenge/main/add-your-certificate.md');
        const markdownContent = dataResponse.data;
        const parsedData = parseMarkdownTable(markdownContent);

        const referralData = JSON.parse(fs.readFileSync('referral_data.json', 'utf-8'));
        
        const referralCount = {};
        parsedData.forEach(entry => {
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

        const leaderboard = Object.values(referralCount).sort((a, b) => b['Number of Certifications'] - a['Number of Certifications']);
        res.json(leaderboard);
    } catch (error) {
        console.error('Error loading the JSON data:', error);
        res.status(500).send('Internal Server Error');
    }
});

function parseMarkdownTable(markdown) {
    const lines = markdown.split("\n");
    const headers = lines[0].split("|").map(header => header.trim()).filter(header => header);
    const hasReferralCode = headers.includes("Referral Code");
    const data = [];
    
    for (const line of lines.slice(2)) {
        if (line.trim() === "" || line.trim().startsWith("|---")) {
            continue;
        }
        
        const row = line.split("|").map(cell => cell.trim()).filter(cell => cell);
        
        if (row.length === headers.length) {
            const rowDict = {};
            headers.forEach((header, i) => {
                rowDict[header] = row[i];
            });
            
            if (hasReferralCode && (!rowDict["Referral Code"] || rowDict["Referral Code"].trim() === "")) {
                continue;
            }
            
            data.push(rowDict);
        }
    }
    
    return data;
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
