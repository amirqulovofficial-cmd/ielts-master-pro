// ============================================
// IELTS MASTERY HUB - MAIN JAVASCRIPT
// Creator: AMIRQULOV ELYOR | 2026
// Description: Handles navigation, interactivity,
//              section toggling, and AI simulation
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============ DOM ELEMENT REFERENCES ============
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section-content');
    const moduleCards = document.querySelectorAll('.module-card');
    
    // ============ NAVIGATION SYSTEM ============
    
    /**
     * Hides all sections and removes active class from nav buttons
     */
    function hideAllSections() {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });
    }
    
    /**
     * Shows a specific section and activates corresponding nav button
     * @param {string} sectionId - The ID of the section to show
     */
    function showSection(sectionId) {
        hideAllSections();
        
        // Find and show the target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Activate the corresponding nav button
        const activeButton = document.querySelector(`.nav-btn[data-section="${sectionId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Scroll to top of section smoothly
        window.scrollTo({
            top: targetSection.offsetTop - 100,
            behavior: 'smooth'
        });
    }
    
    // Add click event listeners to all navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });
    
    // Add click event listeners to module cards (IELTS overview)
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-navigate');
            if (targetSection) {
                showSection(targetSection);
            }
        });
    });
    
    // ============ SPEAKING SECTION FUNCTIONALITY ============
    
    // Mock recording buttons
    const recordButtons = document.querySelectorAll('.record-btn');
    recordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const statusDiv = this.nextElementSibling;
            
            // Toggle recording state
            if (this.classList.contains('recording')) {
                // Stop recording
                this.classList.remove('recording');
                this.innerHTML = '<i class="fas fa-circle"></i> Start Recording';
                this.style.background = '';
                statusDiv.innerHTML = '<span style="color: #10b981;">✓ Recording saved (simulation)</span>';
                
                // Show success feedback
                setTimeout(() => {
                    alert('✅ Recording complete! Your response has been captured (simulation).');
                }, 300);
            } else {
                // Start recording
                this.classList.add('recording');
                this.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
                this.style.background = '#ef4444';
                statusDiv.innerHTML = '<span style="color: #ef4444;">● Recording... (simulated)</span>';
            }
        });
    });
    
    // Timer button for Speaking Part 2
    const timerButtons = document.querySelectorAll('.timer-btn');
    timerButtons.forEach(button => {
        let timerInterval;
        let timeLeft = 60;
        
        button.addEventListener('click', function() {
            const timerDisplay = this.nextElementSibling;
            
            // Reset if already running
            if (this.classList.contains('running')) {
                clearInterval(timerInterval);
                this.classList.remove('running');
                this.innerHTML = '<i class="fas fa-stopwatch"></i> Start 60s Preparation';
                timerDisplay.innerHTML = '';
                timeLeft = 60;
                return;
            }
            
            // Start timer
            this.classList.add('running');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
            timeLeft = 60;
            
            timerInterval = setInterval(() => {
                timeLeft--;
                
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerDisplay.innerHTML = `
                    <span style="color: #f59e0b; font-size: 1.2rem; font-weight: 600;">
                        ⏱ ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}
                    </span>
                `;
                
                if (timeLeft <= 10) {
                    timerDisplay.style.color = '#ef4444';
                }
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    this.classList.remove('running');
                    this.innerHTML = '<i class="fas fa-stopwatch"></i> Start 60s Preparation';
                    timerDisplay.innerHTML = '<span style="color: #10b981;">✓ Time\'s up! Start speaking.</span>';
                    
                    // Alert user
                    alert('⏰ Preparation time is over! You may now begin speaking.');
                }
            }, 1000);
        });
    });
    
    // ============ LISTENING SECTION FUNCTIONALITY ============
    
    const playAudioBtn = document.querySelector('.play-audio-btn');
    if (playAudioBtn) {
        playAudioBtn.addEventListener('click', function() {
            const audioStatus = document.querySelector('.audio-status');
            
            // Disable button during playback simulation
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Playing...';
            
            audioStatus.innerHTML = `
                <div style="color: #00f2fe; margin-top: 1rem;">
                    <i class="fas fa-volume-up"></i> Audio playing... (simulated)
                    <div class="progress-bar" style="
                        width: 100%;
                        height: 4px;
                        background: rgba(255,255,255,0.1);
                        border-radius: 2px;
                        margin-top: 0.5rem;
                        overflow: hidden;
                    ">
                        <div class="progress" style="
                            width: 0%;
                            height: 100%;
                            background: var(--gradient-primary);
                            animation: progress 3s linear forwards;
                        "></div>
                    </div>
                </div>
            `;
            
            // Simulate 3-second audio playback
            setTimeout(() => {
                this.disabled = false;
                this.innerHTML = '<i class="fas fa-play"></i> Play Audio Sample';
                audioStatus.innerHTML = `
                    <span style="color: #10b981;">
                        <i class="fas fa-check-circle"></i> Audio completed. Answer questions 1-3.
                    </span>
                `;
            }, 3000);
        });
    }
    
    // ============ READING SECTION FUNCTIONALITY ============
    
    // Show/Hide hints for reading passages
    const hintButtons = document.querySelectorAll('.show-hint-btn');
    hintButtons.forEach(button => {
        button.addEventListener('click', function() {
            const hintContent = this.nextElementSibling;
            
            if (hintContent && hintContent.classList.contains('hint-content')) {
                hintContent.classList.toggle('visible');
                
                // Update button text
                if (hintContent.classList.contains('visible')) {
                    this.textContent = 'Hide Hint';
                    this.style.borderColor = '#f59e0b';
                    this.style.color = '#f59e0b';
                } else {
                    this.textContent = 'Show Hint';
                    this.style.borderColor = '';
                    this.style.color = '';
                }
            }
        });
    });
    
    // Answer option buttons in reading section
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected state from sibling buttons
            const parent = this.parentElement;
            const siblings = parent.querySelectorAll('.option-btn');
            siblings.forEach(sib => {
                sib.style.background = '';
                sib.style.borderColor = '';
                sib.style.color = '';
                sib.classList.remove('selected');
            });
            
            // Highlight selected button
            this.classList.add('selected');
            this.style.background = 'rgba(0, 242, 254, 0.2)';
            this.style.borderColor = '#00f2fe';
            this.style.color = '#00f2fe';
        });
    });
    
    // ============ WRITING SECTION FUNCTIONALITY ============
    
    // Word count functionality
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            const wordCountDiv = this.nextElementSibling;
            if (wordCountDiv && wordCountDiv.classList.contains('word-count')) {
                const text = this.value.trim();
                const words = text ? text.split(/\s+/).length : 0;
                wordCountDiv.textContent = `Words: ${words}`;
                
                // Color coding for word count
                if (this.closest('.writing-card').querySelector('.word-limit')) {
                    const limitText = this.closest('.writing-card').querySelector('.word-limit').textContent;
                    const minWords = parseInt(limitText.match(/\d+/)[0]);
                    
                    if (words >= minWords) {
                        wordCountDiv.style.color = '#10b981';
                    } else if (words > 0) {
                        wordCountDiv.style.color = '#f59e0b';
                    } else {
                        wordCountDiv.style.color = '';
                    }
                }
            }
        });
    });
    
    // ============ AI COACH SECTION FUNCTIONALITY ============
    
    // Input type selector
    const typeButtons = document.querySelectorAll('.type-btn');
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active from all
            typeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            
            // Update placeholder based on type
            const aiInput = document.getElementById('aiInput');
            const type = this.getAttribute('data-type');
            
            switch(type) {
                case 'essay':
                    aiInput.placeholder = 'Paste your IELTS essay here for AI analysis...';
                    break;
                case 'speaking':
                    aiInput.placeholder = 'Paste your speaking transcript here for feedback...';
                    break;
                case 'grammar':
                    aiInput.placeholder = 'Paste any text for grammar and vocabulary check...';
                    break;
            }
        });
    });
    
    // AI Analysis button
    const analyzeBtn = document.querySelector('.analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            const userInput = document.getElementById('aiInput').value.trim();
            const feedbackPlaceholder = document.querySelector('.feedback-placeholder');
            const feedbackContent = document.querySelector('.feedback-content');
            
            if (!userInput) {
                // Show error if no input
                feedbackPlaceholder.innerHTML = `
                    <i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i>
                    <h3 style="color: #f59e0b;">No Text Found</h3>
                    <p>Please paste your text for analysis.</p>
                `;
                return;
            }
            
            // Hide placeholder, show feedback
            feedbackPlaceholder.style.display = 'none';
            feedbackContent.style.display = 'block';
            
            // Simulate AI analysis
            const wordCount = userInput.split(/\s+/).length;
            const mockBandScore = (Math.random() * 1.5 + 6.5).toFixed(1);
            
            // Generate mock suggestions
            const suggestions = [
                'Consider using more complex sentence structures',
                'Vocabulary range is good, but could include more academic words',
                'Ensure proper paragraph organization with clear topic sentences',
                'Check for subject-verb agreement in complex sentences'
            ];
            
            const randomSuggestions = suggestions
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
            
            feedbackContent.innerHTML = `
                <div class="score-display">Band Score: ${mockBandScore}</div>
                <div style="margin-top: 1.5rem;">
                    <h4 style="color: #00f2fe; margin-bottom: 0.5rem;">
                        <i class="fas fa-chart-bar"></i> Quick Stats
                    </h4>
                    <p style="color: #94a3b8;">📝 Word Count: <strong>${wordCount}</strong></p>
                    <p style="color: #94a3b8;">📊 Estimated Band: <strong style="color: #10b981;">${mockBandScore}</strong></p>
                </div>
                <div style="margin-top: 1.5rem;">
                    <h4 style="color: #a855f7; margin-bottom: 0.5rem;">
                        <i class="fas fa-lightbulb"></i> Suggestions
                    </h4>
                    <ul style="color: #94a3b8; padding-left: 1.5rem; line-height: 2;">
                        ${randomSuggestions.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
                <p style="margin-top: 1.5rem; font-size: 0.85rem; color: #64748b; font-style: italic;">
                    ⚠️ This is a simulated AI response. Integrate with OpenAI API or similar for real analysis.
                </p>
            `;
        });
    }
    
    // ============ KEYBOARD NAVIGATION (Accessibility) ============
    
    document.addEventListener('keydown', function(e) {
        // Ctrl + number keys to switch sections
        if (e.ctrlKey && e.key >= '1' && e.key <= '6') {
            e.preventDefault();
            const sectionMap = {
                '1': 'ielts-overview',
                '2': 'speaking',
                '3': 'listening',
                '4': 'reading',
                '5': 'writing',
                '6': 'ai-coach'
            };
            showSection(sectionMap[e.key]);
        }
    });
    
    // ============ INITIALIZATION ============
    
    // Show default section (IELTS Overview is already active via HTML)
    console.log('✅ IELTS Mastery Hub initialized successfully!');
    console.log('👨‍💻 Creator: AMIRQULOV ELYOR | 2026');
    console.log('💡 Tip: Use Ctrl+1 to Ctrl+6 for quick navigation');
    
});