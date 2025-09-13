document.addEventListener('DOMContentLoaded', () => {
  const analyzeBtn = document.getElementById('analyze-btn');
  const debugBtn = document.getElementById('debug-btn');
  const generateBtn = document.getElementById('generate-btn');
  const codeInput = document.getElementById('code');
  const analysisResult = document.getElementById('analysis-result');
  const debugResult = document.getElementById('debug-result');
  const exerciseResult = document.getElementById('exercise-result');
  const levelSelect = document.getElementById('level');

  analyzeBtn.addEventListener('click', () => {
    const code = codeInput.value;
    analysisResult.textContent = 'Analyzing...';
    debugResult.textContent = '';
    exerciseResult.textContent = '';
    fetch('/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
    .then(res => res.json())
    .then(data => {
      analysisResult.textContent = data.explanation || 'No explanation available.';
    })
    .catch(() => {
      analysisResult.textContent = 'Error analyzing code.';
    });
  });

  debugBtn.addEventListener('click', () => {
    const code = codeInput.value;
    debugResult.textContent = 'Debugging...';
    analysisResult.textContent = '';
    exerciseResult.textContent = '';
    fetch('/debug', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors.length === 0) {
        debugResult.textContent = 'No errors detected.';
      } else {
        let output = 'Errors detected:\n';
        data.errors.forEach((err, i) => {
          output += `${i + 1}. ${err}\nSuggestion: ${data.suggestions[i]}\n\n`;
        });
        debugResult.textContent = output;
      }
    })
    .catch(() => {
      debugResult.textContent = 'Error debugging code.';
    });
  });

  generateBtn.addEventListener('click', () => {
    const level = levelSelect.value;
    exerciseResult.textContent = 'Generating exercise...';
    analysisResult.textContent = '';
    debugResult.textContent = '';
    fetch('/generate-exercise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level })
    })
    .then(res => res.json())
    .then(data => {
      exerciseResult.innerHTML = `<h3>${data.title}</h3><p>${data.description}</p><pre>${data.code}</pre>`;
    })
    .catch(() => {
      exerciseResult.textContent = 'Error generating exercise.';
    });
  });
});
