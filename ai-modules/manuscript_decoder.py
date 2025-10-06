"""
YANTRA.AI - AI Manuscript Decoder (Manuscript2Math)
Interprets ancient Sanskrit/Hindi astronomical texts and converts them to mathematical formulas
"""

import re
import json
import openai
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
from enum import Enum
import numpy as np
import sympy as sp
from pathlib import Path

class Language(Enum):
    SANSKRIT = "sanskrit"
    HINDI = "hindi"
    ENGLISH = "english"

@dataclass
class ManuscriptSection:
    """Represents a section of astronomical manuscript"""
    text: str
    language: Language
    topic: str  # e.g., "sundial_construction", "celestial_coordinates"
    confidence: float  # AI confidence in interpretation
    
@dataclass
class MathFormula:
    """Mathematical formula extracted from manuscript"""
    formula: str  # SymPy expression
    variables: Dict[str, str]  # Variable definitions
    description: str
    source_text: str
    accuracy_notes: str

class Manuscript2MathAI:
    """
    AI system for interpreting ancient astronomical manuscripts
    and converting descriptions to mathematical formulas
    """
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key
        if api_key:
            openai.api_key = api_key
        
        # Ancient astronomical terms dictionary
        self.sanskrit_terms = {
            "gnomon": ["शंकु", "छाया-यंत्र", "छायादण्ड"],
            "shadow": ["छाया", "प्रतिच्छाया"],
            "latitude": ["अक्षांश", "देशान्तर"],
            "longitude": ["रेखांश"],
            "sun": ["सूर्य", "रवि", "भानु"],
            "time": ["काल", "समय", "घटी"],
            "angle": ["कोण", "कलान्तर"],
            "circle": ["वृत्त", "चक्र"],
            "radius": ["त्रिज्या", "अर्ध-व्यास"],
            "diameter": ["व्यास"],
            "zenith": ["शीर्षबिन्दु", "नभोमध्य"],
            "horizon": ["क्षितिज", "भूगोल"],
            "equator": ["विषुवत्", "भूमध्यरेखा"],
            "declination": ["क्रान्ति", "अपम"],
            "azimuth": ["दिगंश", "दिशा-कोण"]
        }
        
        # Sample ancient texts database
        self.sample_texts = {
            "samrat_yantra_construction": {
                "sanskrit": """शंकुर्देशाक्षांशे स्थापयेत्। तस्य छाया यात्रा सूर्यगतिना निर्धार्यते। 
                अक्षांशकोणे शंकुस्थापने काले माने सिद्धिर्भवति।""",
                "translation": "The gnomon should be placed at the latitude of the location. Its shadow movement is determined by the sun's motion. When the gnomon is placed at the latitude angle, time measurement becomes accurate.",
                "formula": "gnomon_angle = latitude"
            },
            "shadow_calculation": {
                "sanskrit": """छाया-दैर्घ्यं शंकु-उच्चता भाजिते सूर्य-उन्नतांश-स्पर्शेण लभ्यते।""",
                "translation": "Shadow length is obtained by dividing gnomon height by the tangent of sun's elevation angle.",
                "formula": "shadow_length = gnomon_height / tan(sun_elevation)"
            },
            "hora_calculation": {
                "sanskrit": """एकैकस्मिन् होरायां पञ्चदश कलाः सूर्यस्य गतिः। मध्याह्नात् पूर्वापरयोः गणना।""",
                "translation": "In each hour, the sun moves fifteen degrees. Calculation is done before and after noon.",
                "formula": "hour_angle = 15 * (hour - 12)"
            }
        }
    
    def preprocess_text(self, text: str, language: Language) -> str:
        """Preprocess manuscript text for AI interpretation"""
        
        # Remove extra whitespace and normalize
        text = ' '.join(text.split())
        
        # Handle Sanskrit/Devanagari specific preprocessing
        if language == Language.SANSKRIT:
            # Remove common manuscript annotations
            text = re.sub(r'\[.*?\]', '', text)  # Remove editorial notes
            text = re.sub(r'\(.*?\)', '', text)  # Remove parenthetical notes
        
        return text
    
    def identify_astronomical_concepts(self, text: str, language: Language) -> List[str]:
        """Identify astronomical concepts mentioned in the text"""
        
        concepts = []
        
        if language == Language.SANSKRIT:
            for concept, terms in self.sanskrit_terms.items():
                for term in terms:
                    if term in text:
                        concepts.append(concept)
        
        elif language == Language.ENGLISH:
            # English astronomical terms
            english_terms = [
                'gnomon', 'shadow', 'sundial', 'latitude', 'longitude',
                'zenith', 'horizon', 'azimuth', 'declination', 'equator',
                'solstice', 'equinox', 'celestial', 'astronomical'
            ]
            
            for term in english_terms:
                if term.lower() in text.lower():
                    concepts.append(term)
        
        return list(set(concepts))  # Remove duplicates
    
    def extract_mathematical_relationships(self, text: str) -> List[str]:
        """Extract potential mathematical relationships from text"""
        
        relationships = []
        
        # Common mathematical relationship patterns
        patterns = [
            r'(\w+)\s+(?:equals?|=|is)\s+(\w+)',
            r'(\w+)\s+(?:divided by|/)\s+(\w+)',
            r'(\w+)\s+(?:multiplied by|\*|times)\s+(\w+)',
            r'(\w+)\s+(?:plus|\+|added to)\s+(\w+)',
            r'(\w+)\s+(?:minus|-|subtracted from)\s+(\w+)',
            r'tangent\s+of\s+(\w+)',
            r'sine\s+of\s+(\w+)',
            r'cosine\s+of\s+(\w+)',
            r'(\w+)\s+angle',
            r'(\w+)\s+radius',
            r'(\w+)\s+diameter'
        ]
        
        for pattern in patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                relationships.append(match.group(0))
        
        return relationships
    
    def interpret_with_ai(self, text: str, language: Language) -> Dict:
        """Use AI to interpret manuscript text (OpenAI integration)"""
        
        if not self.api_key:
            # Fallback to rule-based interpretation
            return self.rule_based_interpretation(text, language)
        
        try:
            # Construct prompt for AI interpretation
            prompt = f"""
            You are an expert in ancient Indian astronomy and mathematics. 
            Interpret this {language.value} text about astronomical instruments and provide:
            
            1. English translation
            2. Mathematical formulas mentioned (in standard notation)
            3. Variables and their meanings
            4. Astronomical concepts discussed
            5. Practical applications
            
            Text: {text}
            
            Respond in JSON format with keys: translation, formulas, variables, concepts, applications
            """
            
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3,
                max_tokens=1000
            )
            
            ai_response = response.choices[0].message.content
            
            try:
                return json.loads(ai_response)
            except json.JSONDecodeError:
                # Parse manually if JSON parsing fails
                return self.parse_ai_response(ai_response)
                
        except Exception as e:
            print(f"AI interpretation failed: {e}")
            return self.rule_based_interpretation(text, language)
    
    def rule_based_interpretation(self, text: str, language: Language) -> Dict:
        """Fallback rule-based interpretation when AI is not available"""
        
        concepts = self.identify_astronomical_concepts(text, language)
        relationships = self.extract_mathematical_relationships(text)
        
        # Match against known patterns
        formulas = []
        variables = {}
        
        # Check against sample texts
        for sample_id, sample_data in self.sample_texts.items():
            if language == Language.SANSKRIT and 'sanskrit' in sample_data:
                # Simple similarity check (could be improved with better NLP)
                common_words = set(text.split()) & set(sample_data['sanskrit'].split())
                if len(common_words) > 2:  # Threshold for similarity
                    formulas.append(sample_data['formula'])
        
        return {
            "translation": "Rule-based interpretation - limited without AI",
            "formulas": formulas,
            "variables": variables,
            "concepts": concepts,
            "applications": ["Astronomical instrument construction"],
            "confidence": 0.6
        }
    
    def convert_to_sympy(self, formula_text: str) -> sp.Expr:
        """Convert text formula to SymPy expression"""
        
        try:
            # Replace common text patterns with SymPy symbols
            formula_text = formula_text.replace("latitude", "lat")
            formula_text = formula_text.replace("longitude", "lon")
            formula_text = formula_text.replace("gnomon_height", "h_g")
            formula_text = formula_text.replace("shadow_length", "s_l")
            formula_text = formula_text.replace("sun_elevation", "sun_elev")
            formula_text = formula_text.replace("hour", "h")
            
            # Parse the expression
            expr = sp.sympify(formula_text)
            return expr
            
        except Exception as e:
            print(f"Failed to convert formula to SymPy: {e}")
            return None
    
    def generate_construction_guide(self, interpreted_data: Dict, yantra_type: str) -> str:
        """Generate step-by-step construction guide from interpreted manuscript"""
        
        guide = f"""
CONSTRUCTION GUIDE FOR {yantra_type.upper()}
Based on Ancient Manuscript Interpretation

INTERPRETATION SUMMARY:
{interpreted_data.get('translation', 'No translation available')}

MATHEMATICAL FORMULAS:
"""
        
        for i, formula in enumerate(interpreted_data.get('formulas', []), 1):
            guide += f"{i}. {formula}\n"
        
        guide += f"""
ASTRONOMICAL CONCEPTS:
{', '.join(interpreted_data.get('concepts', []))}

CONSTRUCTION STEPS:
"""
        
        # Generate generic steps based on concepts
        concepts = interpreted_data.get('concepts', [])
        
        if 'gnomon' in concepts:
            guide += "1. Construct gnomon at precise latitude angle\n"
        if 'shadow' in concepts:
            guide += "2. Mark shadow measurement scales\n"
        if 'circle' in concepts:
            guide += "3. Create circular base with proper radius\n"
        if 'angle' in concepts:
            guide += "4. Mark angular divisions for time measurement\n"
        
        guide += f"""
ACCURACY NOTES:
- Interpretation confidence: {interpreted_data.get('confidence', 0.5):.1%}
- Requires precise geographical alignment
- Ancient techniques adapted for modern construction

APPLICATIONS:
{chr(10).join(f"- {app}" for app in interpreted_data.get('applications', []))}
"""
        
        return guide
    
    def decode_manuscript(self, manuscript_text: str, language: Language, 
                         yantra_type: str = "general") -> Dict:
        """Main function to decode manuscript and extract mathematical formulas"""
        
        # Preprocess the text
        processed_text = self.preprocess_text(manuscript_text, language)
        
        # AI interpretation
        interpretation = self.interpret_with_ai(processed_text, language)
        
        # Convert formulas to mathematical expressions
        math_formulas = []
        for formula_text in interpretation.get('formulas', []):
            sympy_expr = self.convert_to_sympy(formula_text)
            if sympy_expr:
                math_formulas.append({
                    'text': formula_text,
                    'sympy': str(sympy_expr),
                    'latex': sp.latex(sympy_expr)
                })
        
        # Generate construction guide
        construction_guide = self.generate_construction_guide(interpretation, yantra_type)
        
        return {
            'original_text': manuscript_text,
            'language': language.value,
            'yantra_type': yantra_type,
            'interpretation': interpretation,
            'mathematical_formulas': math_formulas,
            'construction_guide': construction_guide,
            'metadata': {
                'processed_at': str(np.datetime64('now')),
                'confidence': interpretation.get('confidence', 0.5),
                'concepts_found': len(interpretation.get('concepts', [])),
                'formulas_extracted': len(math_formulas)
            }
        }

# Example usage and testing
if __name__ == "__main__":
    # Initialize the AI decoder
    decoder = Manuscript2MathAI()  # Add API key for full AI functionality
    
    # Test with sample Sanskrit text about Samrat Yantra
    sample_text = """शंकुर्देशाक्षांशे स्थापयेत्। तस्य छाया यात्रा सूर्यगतिना निर्धार्यते। 
    अक्षांशकोणे शंकुस्थापने काले माने सिद्धिर्भवति। छाया-दैर्घ्यं शंकु-उच्चता भाजिते 
    सूर्य-उन्नतांश-स्पर्शेण लभ्यते।"""
    
    result = decoder.decode_manuscript(
        manuscript_text=sample_text,
        language=Language.SANSKRIT,
        yantra_type="samrat_yantra"
    )
    
    print("MANUSCRIPT2MATH AI DECODER RESULTS:")
    print("=" * 50)
    print(f"Language: {result['language']}")
    print(f"Yantra Type: {result['yantra_type']}")
    print(f"Confidence: {result['metadata']['confidence']:.1%}")
    print("\nInterpretation:")
    print(result['interpretation']['translation'])
    print("\nMathematical Formulas:")
    for i, formula in enumerate(result['mathematical_formulas'], 1):
        print(f"{i}. {formula['text']}")
        print(f"   SymPy: {formula['sympy']}")
    print("\nConstruction Guide:")
    print(result['construction_guide'])