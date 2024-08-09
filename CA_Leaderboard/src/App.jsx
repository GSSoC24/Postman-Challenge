import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/GSSoC24/Postman-Challenge/main/add-your-certificate.md"
        );
        const parsedData = parseMarkdownTable(response.data);
        const referralData = await fetchReferralData();
        const updatedLeaderboard = calculateLeaderboard(
          parsedData,
          referralData
        );
        setLeaderboard(updatedLeaderboard);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchReferralData = async () => {
    const response = await axios.get("/referral_data.json"); // Adjust this path as necessary
    return response.data;
  };

  const parseMarkdownTable = (markdown) => {
    const lines = markdown.split("\n");
    const headers = lines[0]
      .split("|")
      .map((header) => header.trim())
      .filter((header) => header);
    const hasReferralCode = headers.includes("Referral Code");
    const data = [];

    for (const line of lines.slice(2)) {
      if (line.trim() === "" || line.trim().startsWith("|---")) {
        continue;
      }

      const row = line
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell);

      if (row.length === headers.length) {
        const rowDict = {};
        headers.forEach((header, i) => {
          rowDict[header] = row[i];
        });

        if (
          hasReferralCode &&
          (!rowDict["Referral Code"] || rowDict["Referral Code"].trim() === "")
        ) {
          continue;
        }

        data.push(rowDict);
      }
    }

    return data;
  };

  const calculateLeaderboard = (parsedData, referralData) => {
    const referralCount = {};

    parsedData.forEach((entry) => {
      const referralCode = entry["Referral Code"];
      if (!referralCount[referralCode]) {
        const owner = Object.keys(referralData).find(
          (name) => referralData[name] === referralCode
        );
        referralCount[referralCode] = {
          Name: owner,
          "Referral Code": referralCode,
          "Number of Certifications": 0,
        };
      }
      referralCount[referralCode]["Number of Certifications"] += 1;
    });

    return Object.values(referralCount).sort(
      (a, b) => b["Number of Certifications"] - a["Number of Certifications"]
    );
  };

  return (
    <div className="App">
      <img src="/logo.png" alt="GirlScript Summer Of Code Logo" />
      <h1>Campus Ambassador Leaderboard</h1>
      <div className="description">
        Get ready to climb the ranks and win big! As a
        <span className="highlight">GirlScript Summer of Code</span> campus
        ambassador, your influence is invaluable. We&rsquo;re excited to
        introduce the leaderboard, your gateway to exclusive rewards. For every
        successful referral who completes certification and contributes a merged
        PR to the designated Postman Challenge GitHub repo, you earn a whopping
        50 points. The campus ambassador with the highest score will be showered
        with amazing goodies and surprises.
      </div>
      <table id="leaderboardTable">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Referral Code</th>
            <th>Number of Certifications</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item["Name"]}</td>
              <td>{item["Referral Code"]}</td>
              <td>{item["Number of Certifications"]}</td>
              <td>{item["Number of Certifications"] * 50}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <img src="/footer.png" alt="GirlScript Summer Of Code Logo" />
      </footer>
    </div>
  );
}

export default App;
