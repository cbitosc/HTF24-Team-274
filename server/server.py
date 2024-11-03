""" from flask import Flask, request, jsonify
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model and tokenizer
MODEL_PATH = "C:/Users/hp/Downloads/model-20241026T193646Z-001/model"  
TOKENIZER_PATH = "C:/Users/hp/Downloads/model-20241026T193646Z-001"  

# Initialize model and tokenizer
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_PATH)

def analyze_sentiment(text):
    # Tokenize the input text
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    
    with torch.no_grad():
        outputs = model(**inputs)
        prediction = torch.nn.functional.softmax(outputs.logits, dim=-1)
        
    rating = torch.argmax(prediction).item() + 1  # Get the predicted rating (1-5)
    
    sentiment_map = {
        1: "Very Negative",
        2: "Negative",
        3: "Neutral",
        4: "Positive",
        5: "Very Positive"
    }
    
    confidence_scores = prediction[0].tolist()  # Get confidence scores
    
    return {
        "sentiment": sentiment_map[rating],
        "rating": rating,
        "confidence_scores": confidence_scores
    }

@app.route('/api/analyze', methods=['POST'])
def analyze():
    if not request.json or 'text' not in request.json:
        return jsonify({'error': 'No text provided'}), 400  # Error if no text is provided
    
    text = request.json['text']
    result = analyze_sentiment(text)  # Analyze the sentiment
    return jsonify(result)  # Return the result as JSON

if __name__ == '__main__':
    app.run(debug=True, port=8930)  # Run the Flask app """


""" from flask import Flask, request, jsonify
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model and tokenizer
MODEL_PATH = "C:/Users/hp/Downloads/model-20241026T193646Z-001"  # Update this path
TOKENIZER_PATH = "C:/Users/hp/Downloads/tokenizer-20241026T193650Z-001"  # Update this path

# Initialize model and tokenizer
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
tokenizer = AutoTokenizer.from_pretrained(TOKENIZER_PATH)

def analyze_sentiment(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    
    with torch.no_grad():
        outputs = model(**inputs)
        prediction = torch.nn.functional.softmax(outputs.logits, dim=-1)
        
    rating = torch.argmax(prediction).item() + 1
    
    sentiment_map = {
        1: "Very Negative",
        2: "Negative",
        3: "Neutral",
        4: "Positive",
        5: "Very Positive"
    }
    
    confidence_scores = prediction[0].tolist()
    
    return {
        "sentiment": sentiment_map[rating],
        "rating": rating,
        "confidence_scores": confidence_scores
    }

@app.route('/api/analyze', methods=['POST'])
def analyze():
    if not request.json or 'text' not in request.json:
        return jsonify({'error': 'No text provided'}), 400
    
    text = request.json['text']
    result = analyze_sentiment(text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)


 """

from transformers import AutoConfig, AutoModelForSequenceClassification, BertConfig
import os

# Define the model path - adjust this to your model directory path
MODEL_PATH = "C:/Users/hp/Downloads/model-20241026T193646Z-001"

# Print directory contents for debugging
print("Model directory contents:", os.listdir(MODEL_PATH))

# Load config first
print("Loading configuration...")
config = AutoConfig.from_pretrained(MODEL_PATH)

# Then load model with config
print("Loading model...")
model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_PATH,
    config=config,
    local_files_only=True
)
print("Model loaded successfully!")

# Try to make a test prediction
print("Testing model...")
from transformers import AutoTokenizer

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)

# Test text
test_text = "This is a test."
inputs = tokenizer(test_text, return_tensors="pt", padding=True, truncation=True)

# Get prediction
import torch
with torch.no_grad():
    outputs = model(**inputs)
    predictions = torch.nn.functional.softmax(outputs.logits, dim=1)
    score = torch.argmax(predictions).item() + 1

print(f"Test prediction score: {score}")