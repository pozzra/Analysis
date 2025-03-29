// script.js

// Fetch gold price data from Yahoo Finance API (mocked example)
async function fetchGoldData(startDate, endDate) {
    const response = await fetch(`https://api.example.com/gold?start=${startDate}&end=${endDate}`);
    const data = await response.json();
    return data;
  }
  
  // Calculate SMA
  function calculateSMA(data, window = 20) {
    const sma = [];
    for (let i = 0; i < data.length; i++) {
      if (i < window - 1) {
        sma.push(null);
      } else {
        const sum = data.slice(i - window + 1, i + 1).reduce((acc, val) => acc + val, 0);
        sma.push(sum / window);
      }
    }
    return sma;
  }
  
  // Generate signals (simplified logic)
  function generateSignals(data) {
    return data.map((price, index) => {
      if (price > data[index - 1] && price > data[index + 1]) {
        return 'Buy';
      } else if (price < data[index - 1] && price < data[index + 1]) {
        return 'Sell';
      } else {
        return 'Hold';
      }
    });
  }
  
  // Update the chart
  function updateChart(data, labels) {
    const ctx = document.getElementById('gold-chart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          { label: 'Gold Price', data: data, borderColor: 'blue', borderWidth: 2, fill: false },
          { label: 'SMA', data: calculateSMA(data), borderColor: 'orange', borderWidth: 2, fill: false },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
        },
      },
    });
  }
  
  // Update the signals table
  function updateTable(data, labels, signals) {
    const tbody = document.querySelector('#signals-table tbody');
    tbody.innerHTML = ''; // Clear existing rows
  
    data.forEach((price, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${labels[index]}</td>
        <td>${price.toFixed(2)}</td>
        <td>${calculateSMA(data)[index]?.toFixed(2) || '-'}</td>
        <td>-</td> <!-- Replace with RSI calculation -->
        <td>-</td> <!-- Replace with MACD calculation -->
        <td>${signals[index]}</td>
      `;
      tbody.appendChild(row);
    });
  }
  
  // Event listener for the "Fetch Data" button
  document.getElementById('fetch-data-btn').addEventListener('click', async () => {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
  
    // Mock data (replace with actual API call)
    const mockData = Array.from({ length: 100 }, () => Math.random() * 100 + 1500); // Random prices
    const mockLabels = Array.from({ length: 100 }, (_, i) => `Day ${i + 1}`);
  
    const signals = generateSignals(mockData);
  
    // Update chart and table
    updateChart(mockData, mockLabels);
    updateTable(mockData, mockLabels, signals);
  });
