const questions = [
            {
                question: "🌅 How do you prefer to start your morning?",
                answers: [
                    { text: "Quiet meditation or journaling", nature: "mountain" },
                    { text: "A walk in nature or fresh air", nature: "forest" },
                    { text: "Listening to calming sounds", nature: "ocean" },
                    { text: "Energizing movement or exercise", nature: "desert" },
                    { text: "Peaceful moments with tea/coffee", nature: "meadow" },
                    { text: "Looking out the window and dreaming", nature: "sky" }
                ]
            },
            {
                question: "💭 When facing a challenge, you tend to:",
                answers: [
                    { text: "Stay calm and think it through methodically", nature: "mountain" },
                    { text: "Adapt quickly and find creative solutions", nature: "forest" },
                    { text: "Go with the flow and trust the process", nature: "ocean" },
                    { text: "Push through with determination", nature: "desert" },
                    { text: "Seek harmony and peaceful resolution", nature: "meadow" },
                    { text: "Look at the bigger picture and stay optimistic", nature: "sky" }
                ]
            },
            {
                question: "🏡 Your ideal living space would be:",
                answers: [
                    { text: "A minimalist retreat with mountain views", nature: "mountain" },
                    { text: "A cozy cabin surrounded by trees", nature: "forest" },
                    { text: "A peaceful home near water", nature: "ocean" },
                    { text: "An open space with lots of natural light", nature: "desert" },
                    { text: "A cottage with a beautiful garden", nature: "meadow" },
                    { text: "A place with panoramic views and open skies", nature: "sky" }
                ]
            },
            {
                question: "✨ Your friends would describe you as:",
                answers: [
                    { text: "Wise, stable, and dependable", nature: "mountain" },
                    { text: "Vibrant, growing, and nurturing", nature: "forest" },
                    { text: "Calm, intuitive, and deep", nature: "ocean" },
                    { text: "Strong, resilient, and independent", nature: "desert" },
                    { text: "Gentle, kind, and harmonious", nature: "meadow" },
                    { text: "Free-spirited, inspiring, and limitless", nature: "sky" }
                ]
            },
            {
                question: "🎨 Your favorite way to recharge is:",
                answers: [
                    { text: "Solitude and quiet contemplation", nature: "mountain" },
                    { text: "Being in nature and feeling connected to life", nature: "forest" },
                    { text: "Near water - bath, beach, or rain sounds", nature: "ocean" },
                    { text: "Basking in sunshine and warmth", nature: "desert" },
                    { text: "Spending time in beautiful, peaceful settings", nature: "meadow" },
                    { text: "Watching clouds, stars, or vast open spaces", nature: "sky" }
                ]
            },
            {
                question: "🌟 Your biggest strength is:",
                answers: [
                    { text: "Your inner wisdom and grounded perspective", nature: "mountain" },
                    { text: "Your ability to grow and help others flourish", nature: "forest" },
                    { text: "Your emotional depth and intuition", nature: "ocean" },
                    { text: "Your resilience and ability to thrive anywhere", nature: "desert" },
                    { text: "Your peaceful nature and ability to bring harmony", nature: "meadow" },
                    { text: "Your unlimited potential and inspiring vision", nature: "sky" }
                ]
            }
        ];

        const natureTypes = {
            mountain: {
                emoji: "🏔️",
                title: "The Mountain",
                description: "You are grounded, wise, and unshakeable. Like a mountain, you provide stability and perspective to those around you. You have deep inner strength and the ability to weather any storm with grace and dignity.",
                traits: "Stable • Wise • Dependable • Strong • Peaceful • Grounded"
            },
            forest: {
                emoji: "🌲",
                title: "The Forest",
                description: "You are vibrant, nurturing, and full of life. Like a forest, you create space for growth and renewal. You have a natural ability to help others flourish and bring healing energy wherever you go.",
                traits: "Nurturing • Growing • Vibrant • Healing • Connected • Life-giving"
            },
            ocean: {
                emoji: "🌊",
                title: "The Ocean",
                description: "You are deep, intuitive, and ever-flowing. Like the ocean, you have vast emotional intelligence and the power to cleanse and renew. Your calm presence brings peace to turbulent situations.",
                traits: "Intuitive • Deep • Calming • Flowing • Emotional • Cleansing"
            },
            desert: {
                emoji: "🏜️",
                title: "The Desert",
                description: "You are resilient, independent, and beautifully strong. Like the desert, you thrive in challenging conditions and have a unique beauty that shines brightest when others might struggle. You are a survivor and an inspiration.",
                traits: "Resilient • Independent • Strong • Unique • Thriving • Inspiring"
            },
            meadow: {
                emoji: "🌸",
                title: "The Meadow",
                description: "You are gentle, harmonious, and naturally beautiful. Like a meadow, you bring peace and joy to everyone you encounter. Your presence creates a sense of serenity and your kindness helps others bloom.",
                traits: "Gentle • Harmonious • Beautiful • Peaceful • Kind • Blooming"
            },
            sky: {
                emoji: "☁️",
                title: "The Sky",
                description: "You are limitless, inspiring, and full of possibility. Like the sky, you have an expansive spirit and the ability to see beyond current circumstances. Your optimism and vision lift others to new heights.",
                traits: "Limitless • Inspiring • Optimistic • Visionary • Free • Uplifting"
            }
        };

        let currentQuestion = 0;
        let scores = {
            mountain: 0,
            forest: 0,
            ocean: 0,
            desert: 0,
            meadow: 0,
            sky: 0
        };

        function startQuiz() {
            document.getElementById('startScreen').classList.add('hidden');
            document.getElementById('quizScreen').classList.remove('hidden');
            showQuestion();
        }

        function showQuestion() {
            const question = questions[currentQuestion];
            document.getElementById('questionText').textContent = question.question;
            
            const answersContainer = document.getElementById('answersContainer');
            answersContainer.innerHTML = '';
            
            question.answers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.className = 'answer-btn';
                button.textContent = answer.text;
                button.onclick = () => selectAnswer(answer.nature);
                answersContainer.appendChild(button);
            });
            
            updateProgress();
        }

        function selectAnswer(nature) {
            scores[nature]++;
            currentQuestion++;
            
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }

        function updateProgress() {
            const progress = ((currentQuestion + 1) / questions.length) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
        }

        function showResult() {
            document.getElementById('quizScreen').classList.add('hidden');
            document.getElementById('resultScreen').classList.remove('hidden');
            
            // Find the nature type with highest score
            let maxScore = 0;
            let resultType = 'mountain';
            
            for (let nature in scores) {
                if (scores[nature] > maxScore) {
                    maxScore = scores[nature];
                    resultType = nature;
                }
            }
            
            const result = natureTypes[resultType];
            const resultCard = document.getElementById('resultCard');
            
            resultCard.className = `result-card ${resultType}`;
            document.getElementById('resultEmoji').textContent = result.emoji;
            document.getElementById('resultTitle').textContent = result.title;
            document.getElementById('resultDescription').textContent = result.description;
            document.getElementById('resultTraits').textContent = result.traits;
        }

        function restartQuiz() {
            currentQuestion = 0;
            scores = {
                mountain: 0,
                forest: 0,
                ocean: 0,
                desert: 0,
                meadow: 0,
                sky: 0
            };
            
            document.getElementById('resultScreen').classList.add('hidden');
            document.getElementById('startScreen').classList.remove('hidden');
        }

        function shareResult() {
            const resultTitle = document.getElementById('resultTitle').textContent;
            const resultEmoji = document.getElementById('resultEmoji').textContent;
            
            const shareText = `I just discovered I'm ${resultEmoji} ${resultTitle}! Find out your nature personality with @nature_clarity's quiz! 🌿✨`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'My Nature Personality Result',
                    text: shareText,
                    url: window.location.href
                });
            } else {
                // Fallback for desktop
                navigator.clipboard.writeText(shareText + ' ' + window.location.href).then(() => {
                    alert('🌿 Result copied to clipboard! Paste it in your social media post and tag @nature_clarity');
                });
            }
        }