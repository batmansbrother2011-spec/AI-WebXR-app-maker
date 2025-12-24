document.addEventListener('DOMContentLoaded', () => {
    const userPrompt = document.getElementById('user-prompt');
    const generateButton = document.getElementById('generate-button');
    const resultContainer = document.getElementById('result-container');

    // --- Mock API Key (In a real app, get this from an environment file or settings) ---
    // We'll use a simple 'mock' key to demonstrate the functionality.
    const apiKey = "sk-random-mock-key-123";

    // --- Function to Call the AI ---
    async function callAI(prompt) {
        try {
            // Simulate loading state
            showLoadingIndicator(true);

            // --- In a real app, you would use your actual API key ---
            /* 
                if (process.env.OPENAI_API_KEY) {
                    // Use GPT-4
                } else if (process.env.ANTHROPIC_API_KEY) {
                    // Use Claude 3
                }
            */

            // --- This is the core simulation of talking to an AI ---
            // We'll generate a plausible response based on the prompt's keywords.
            const responseText = generatePlausibleResponse(prompt);
            
            // In a real app, you would send this prompt to your chosen API,
            // wait for its response, and then get `responseText` from there.

            return responseText;

        } catch (error) {
            console.error("Error calling AI model:", error);
            showErrorMessage(`An error occurred: ${error.message}`);
        }
    }

    // --- Helper function to simulate an AI response ---
    function generatePlausibleResponse(prompt) {
        const baseResponse = `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A Forest with Magical Creatures</title>
    <style>
        body { background-image: url('https://images.unsplash.com/photo-1565763924944-d817191d1f22?ixlib=rb-4.0.3&ixid=M3wx147jYh9IgFKfvNzVnBkMmQw&auto=format&fit=crop&w=1920'); background-attachment: fixed; height: 100vh; margin: 0; overflow: hidden; display: flex; justify-content: center; align-items: center; }
        #vr-canvas { width: 100%; height: 80vh; border: none; }
        .floating-light { position: absolute; background-color: #fff; padding: 10px; border-radius: 5px; box-shadow: 0 0 10px rgba(255,255,255,0.7); }
    </style>
</head>
<body>

    <canvas id="vr-canvas"></canvas>

    <script>
        const canvas = document.getElementById('vr-canvas');
        const context = new (window.AudioContext)();
        
        // Simple function to simulate a floating light
        function createFloatingLight(x, y) {
            const lightDiv = document.createElement('div');
            lightDiv.classList.add('floating-light');
            lightDiv.style.left = `${x}px`;
            lightDiv.style.top = `${y}px`;
            document.body.appendChild(lightDiv);
            
            // Remove the light after a while
            setTimeout(() => {
                document.body.removeChild(lightDiv);
            }, 5000);
        }

        // This is a basic implementation of WebXR
        // For a real app, you would use more robust code.
        const startVR = async () => {
            if (!canvas.reqVR) {
                alert('WebXR is not supported in this browser.');
                return;
            }

            try {
                await canvas.requestVRDevice();
                
                const session = canvas.createVRSession('My VR Session');

                // Create some floating lights
                createFloatingLight(100, 100);
                createFloatingLight(300, 200);

                // Wait for the user to interact
                await new Promise(r => session.requestEnd()); 

                // Teardown
                canvas.endVR();
            } catch (error) {
                console.error('Error starting VR:', error);
            }
        };

        // Add an event listener to start VR when the page is interactive
        canvas.addEventListener('interactive', startVR);

    </script>
</body>
</html>
            `;

        return responseText;
    }

    // --- Functions to Show/Hide UI Elements ---
    function showLoadingIndicator(show) {
        if (show) {
            // For now, we'll just change the button text to indicate loading
            generateButton.innerHTML = "Generating...";
        } else {
            generateButton.innerHTML = "Generate WebXR App";
        }
    }

    function showErrorMessage(message) {
        const errorElement = document.createElement('div');
        errorElement.className = "error-message";
        errorElement.textContent = message;
        resultContainer.appendChild(errorElement);
        
        // Try to auto-remove the error after a while
        setTimeout(() => {
            errorElement.remove();
        }, 5000);
    }

    // --- Event Listener for Generate Button ---
    generateButton.addEventListener('click', () => {
        const prompt = userPrompt.value.trim();
        
        if (!prompt) {
            showErrorMessage("Please enter a prompt!");
            return;
        }

        // Here's where the magic happens!
        // We'll use the callAI function to get a WebXR app.
        callAI(prompt)
            .then(response => {
                // In a real app, you would save the generated response to a file.
                // For this demo, we'll just display it.
                resultContainer.innerHTML = `
                    <h2>Your WebXR App Code</h2>
                    <pre>${response}</pre>
                    <p>1. Save this HTML file.</p>
                    <p>2. Open it in a modern browser (Chrome, Firefox).</p>
                    <p>3. Enable WebXR for VR support.</p>
                `;
            })
            .catch(error => {
                showErrorMessage(`An error occurred: ${error.message}`);
            });
    });

    // Initially, hide the result area
    resultContainer.innerHTML = `
        <h2>Create Your WebXR App</h2>
        <p>Enter a prompt below and click 'Generate WebXR App'</p>
    `;
});

/**
 * Generates a plausible response based on the user's prompt.
 * This is a simplified mock. In a real application, this would be replaced
 * with actual API calls to OpenAI or Anthropic.
 *
 * @param {string} prompt - The user's input text
 * @returns {string} A string containing generated HTML/JS/CSS code
 */
function generatePlausibleResponse(prompt) {
    // Get the core topic from the prompt
    const topic = detectCoreTopic(prompt);
    
    // Define default settings
    const title = topic === "forest" ? "Enchanted Forest" : `The ${topic} Landscape`;
    const backgroundUrl = getBackgroundImageUrl(topic);
    
    let responseCode = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { 
            background-image: url('${backgroundUrl}'); 
            background-attachment: fixed; 
            height: 100vh; 
            margin: 0; 
            overflow: hidden;
            display: flex; 
            justify-content: center; 
            align-items: center;
        }
        #vr-canvas { 
            width: 100%; 
            height: 80vh; 
            border: none; 
        }
        .floating-element {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.3);
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(255,255,255,0.7);
        }
    </style>
</head>
<body>

    <canvas id="vr-canvas"></canvas>

    <script>
        const canvas = document.getElementById('vr-canvas');
        
        // Basic WebXR setup (would be more robust in a real app)
        const startVR = async () => {
            if (!canvas.reqVR) {
                alert('WebXR is not supported in this browser.');
                return;
            }

            try {
                await canvas.requestVRDevice();
                const session = canvas.createVRSession('My VR Session');

                // Add some environment-specific elements
                ${generateEnvironmentElements(topic)}
                
                // Keep the session open
                await new Promise(r => session.requestEnd());
                
                // Teardown
                canvas.endVR();
            } catch (error) {
                console.error('Error starting VR:', error);
            }
        };

        canvas.addEventListener('interactive', startVR);

    </script>
</body>
</html>
    `;

    return responseCode;
    
    function detectCoreTopic(prompt) {
        const lowerCasePrompt = prompt.toLowerCase();
        
        // Simple keyword-based detection
        if (lowerCasePrompt.includes('forest') || lowerCasePrompt.includes('tree')) {
            return "forest";
        } else if (lowerCasePrompt.includes('city') || lowerCasePrompt.includes('building')) {
            return "city";
        } else if (lowerCasePrompt.includes('underwater') || lowerCasePrompt.includes('sea')) {
            return "underwater";
        }
        
        // Fallback to a default topic
        return "forest";
    }

    function getBackgroundImageUrl(topic) {
        switch (topic) {
            case "forest":
                return "https://images.unsplash.com/photo-1565763924944-d817191d1f22?ixlib=rb-4.0.3&ixid=M3wx147jYh9IgFKfvNzVnBkMmQw&auto=format&fit=crop&w=1920";
            case "city":
                return "https://images.unsplash.com/photo-1685161193347-e3b0e3e2b3c5?ixlib=rb-4.0.3&ixid=M3wx147jYh9IgFKfvNzVnBkMmQw&auto=format&fit=crop&w=1920";
            case "underwater":
                return "https://images.unsplash.com/photo-1105336529889134564?ixlib=rb-4.0.3&ixid=M3wx147jYh9IgFKfvNzVnBkMmQw&auto=format&fit=crop&w=1920";
            default:
                return "https://images.unsplash.com/photo-1565763924944-d817191d1f22?ixlib=rb-4.0.3&ixid=M3wx147jYh9IgFKfvNzVnBkMmQw&auto=format&fit=crop&w=1920";
        }
    }

    function generateEnvironmentElements(topic) {
        let elementsCode = "";
        
        switch (topic) {
            case "forest":
                elementsCode = `
                    // Add some floating logs and leaves
                    const log1 = document.createElement('div');
                    log1.classList.add('floating-element');
                    log1.textContent = "Log";
                    log1.style.left = '50px';
                    log1.style.top = '50px';
                    document.body.appendChild(log1);

                    const leaf1 = document.createElement('div');
                    leaf1.classList.add('floating-element');
                    leaf1.style.backgroundImage=`"url('leaf.png')"`; // Assuming a leaf image is in the same directory
                    leaf1.style.left = '150px';
                    leaf1.style.top = '150px';
                    document.body.appendChild(leaf1);
                `;
                break;
            case "city":
                elementsCode = `
                    // Add some floating buildings bricks
                    const brick1 = document.createElement('div');
                    brick1.classList.add('floating-element');
                    brick1.textContent = "Brick";
                    brick1.style.left = '70px';
                    brick1.style.top = '70px';
                    document.body.appendChild(brick1);

                    const brick2 = document.createElement('div');
                    brick2.classList.add('floating-element');
                    brick2.textContent = "Glass";
                    brick2.style.left = '200px';
                    brick2.style.top = '200px';
                    document.body.appendChild(brick2);
                `;
                break;
            case "underwater":
                elementsCode = `
                    // Add some floating fish
                    const fish1 = document.createElement('div');
                    fish1.classList.add('floating-element');
                    fish1.textContent = "Fish";
                    fish1.style.left = '100px';
                    fish1.style.top = '100px';
                    document.body.appendChild(fish1);

                    const fish2 = document.createElement('div');
                    fish2.classList.add('floating-element');
                    fish2.style.backgroundImage=`"url('fish.png')"`; // Assuming a fish image is in the same directory
                    fish2.style.left = '250px';
                    fish2.style.top = '250px';
                    document.body.appendChild(fish2);
                `;
                break;
        }
        
        return elementsCode;
    }
}
