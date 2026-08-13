function analyzeTextUnlimited() {
    const text = document.getElementById('aiInputText').value.trim();

    if (!text) {
        alert("অনুগ্রহ করে কোনো টেক্সট দিন!");
        return;
    }

    // ১. Basic Metrics calculation
    const words = text.match(/\b\w+\b/g) || [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const wordCount = words.length;
    const sentenceCount = sentences.length || 1;
    const avgSentenceLength = Math.round(wordCount / sentenceCount);

    // ২. Sentence Length Variance (Burstiness)
    const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
    const mean = avgSentenceLength;
    const variance = sentenceLengths.reduce((sum, len) => sum + Math.pow(len - mean, 2), 0) / sentenceCount;
    const stdDeviation = Math.sqrt(variance); 

    // ৩. AI Buzzwords List
    const aiBuzzwords = [
        "delve", "testament", "crucial", "pivotal", "underscores", "interplay", 
        "paramount", "foster", "realm", "beacon", "tapestry", "moreover", 
        "furthermore", "in conclusion", "it is important to note", "demystify", 
        "unwavering", "holistic", "ever-evolving", "transformative"
    ];

    let foundBuzzwords = [];
    let buzzwordCount = 0;

    words.forEach(word => {
        const lowerWord = word.toLowerCase();
        if (aiBuzzwords.includes(lowerWord)) {
            buzzwordCount++;
            if (!foundBuzzwords.includes(lowerWord)) {
                foundBuzzwords.push(lowerWord);
            }
        }
    });

    // ৪. Unlimited AI Score Logic
    let aiScore = 0;

    if (stdDeviation < 3) aiScore += 35;
    else if (stdDeviation < 6) aiScore += 20;

    const buzzwordDensity = (buzzwordCount / wordCount) * 100;
    if (buzzwordDensity > 3) aiScore += 45;
    else if (buzzwordDensity > 1.5) aiScore += 30;
    else if (buzzwordDensity > 0.5) aiScore += 15;

    if (avgSentenceLength >= 15 && avgSentenceLength <= 25) aiScore += 20;

    aiScore = Math.min(Math.max(aiScore, 5), 98);

    // UI Updates
    document.getElementById('metricWordCount').innerText = wordCount;
    document.getElementById('metricAvgSentence').innerText = avgSentenceLength;
    document.getElementById('metricPerplexity').innerText = stdDeviation < 4 ? "Low (AI-like)" : "High (Human-like)";
    document.getElementById('metricBurstiness').innerText = stdDeviation.toFixed(1);

    document.getElementById('aiScoreBadge').innerText = aiScore + '%';
    document.getElementById('aiScoreBar').style.width = aiScore + '%';
    document.getElementById('buzzwordCountBadge').innerText = `${foundBuzzwords.length} Detected`;

    // Dynamic Summary
    let summaryText = "";
    if (aiScore > 60) {
        summaryText = "⚠️ এই টেক্সটটিতে অতিরিক্ত AI প্যাটার্ন এবং রোবোটিক শব্দবন্ধ পাওয়া গেছে।";
    } else if (aiScore > 30) {
        summaryText = "⚖️ টেক্সটটিতে মানুষ ও AI-এর মিশ্রণ বা অতিরিক্ত এডিটেড কন্টেন্ট মনে হচ্ছে।";
    } else {
        summaryText = "✅ এটি প্রাকৃতিকভাবে লেখা মানবিক (Human-written) কন্টেন্ট হিসেবে চিহ্নিত হয়েছে।";
    }
    document.getElementById('aiAnalysisSummary').innerText = summaryText;

    // Highlight Buzzwords
    let highlightedHTML = text;
    foundBuzzwords.forEach(buzz => {
        const regex = new RegExp(`\\b(${buzz})\\b`, 'gi');
        highlightedHTML = highlightedHTML.replace(regex, `<span class="highlight-buzzword">$1</span>`);
    });
    document.getElementById('buzzwordHighlights').innerHTML = highlightedHTML.replace(/\n/g, '<br>');
}
