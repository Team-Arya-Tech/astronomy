# 🌌 YANTRA.AI - Installation & Setup Guide

## 🚀 **Complete Installation Instructions**

### **📋 Prerequisites**

#### **System Requirements:**
- **OS:** Windows 10/11, macOS, or Linux
- **Python:** 3.9+ (3.11 recommended)
- **Node.js:** 16+ (18 recommended)
- **RAM:** 4GB minimum, 8GB recommended
- **Storage:** 2GB free space
- **Browser:** Chrome, Firefox, Safari, or Edge

#### **Optional (for enhanced features):**
- **Git** - For version control
- **Docker** - For containerized deployment
- **OpenAI API Key** - For full AI manuscript interpretation
- **NASA API Key** - For enhanced astronomical data

---

## ⚡ **Quick Start (5 Minutes)**

### **Option 1: Backend Only Setup**
```bash
# 1. Download/Clone the project
cd C:\Users\NAVYA\Documents\astronomy

# 2. Install Python dependencies
cd backend
pip install fastapi uvicorn numpy sympy

# 3. Start the server
python main.py

# 4. Open browser to: http://localhost:8000/docs
```

### **Option 2: Full System Setup**
```bash
# 1. Backend setup
cd C:\Users\NAVYA\Documents\astronomy\backend
pip install -r requirements.txt
python main.py

# 2. Frontend setup (new terminal)
cd C:\Users\NAVYA\Documents\astronomy\frontend
npm install
npm start

# 3. Access: http://localhost:3000
```

---

## 🔧 **Detailed Installation Steps**

### **Step 1: Python Environment Setup**

#### **Windows:**
```powershell
# Check Python version
python --version
# Should be 3.9+

# Install pip if not available
python -m ensurepip --upgrade

# Navigate to backend directory
cd C:\Users\NAVYA\Documents\astronomy\backend

# Create virtual environment (recommended)
python -m venv yantra_env
yantra_env\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### **macOS/Linux:**
```bash
# Check Python version
python3 --version

# Navigate to backend directory
cd /path/to/astronomy/backend

# Create virtual environment
python3 -m venv yantra_env
source yantra_env/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### **Step 2: Node.js Frontend Setup**

#### **Install Node.js Dependencies:**
```bash
# Navigate to frontend directory
cd C:\Users\NAVYA\Documents\astronomy\frontend

# Install packages
npm install

# Optional: Update to latest versions
npm update

# Start development server
npm start
```

### **Step 3: Verify Installation**

#### **Backend Verification:**
```bash
# Start backend server
cd backend
python main.py

# Should see:
# INFO: Started server process
# INFO: Uvicorn running on http://0.0.0.0:8000

# Test API endpoint
curl http://localhost:8000/
# Should return welcome message
```

#### **Frontend Verification:**
```bash
# Start frontend (separate terminal)
cd frontend
npm start

# Should see:
# Compiled successfully!
# Local: http://localhost:3000
# Network: http://192.168.x.x:3000
```

---

## 📦 **Dependencies Deep Dive**

### **🐍 Python Backend Dependencies:**

```txt
# Core Framework
fastapi==0.104.1              # Modern web framework
uvicorn==0.24.0               # ASGI server

# Mathematical Computing  
numpy==1.24.3                 # Numerical computing
sympy==1.12                   # Symbolic mathematics
scipy==1.11.4                 # Scientific computing

# Astronomical Calculations
skyfield==1.46                # Astronomical positions
pyephem==4.1.5                # Astronomical calculations
astropy==5.3.4                # Astronomy library

# Document Generation
reportlab==4.0.7              # PDF generation
matplotlib==3.8.2             # Plotting and visualization
ezdxf==1.1.0                  # CAD file generation

# AI Integration (Optional)
openai==1.3.7                 # OpenAI API (if available)

# Data Processing
pandas==2.1.3                 # Data analysis
python-dateutil==2.8.2        # Date handling

# Testing
pytest==7.4.3                 # Testing framework
pytest-asyncio==0.21.1        # Async testing
```

### **⚛️ React Frontend Dependencies:**

```json
{
  "dependencies": {
    "react": "^18.2.0",              // Core React
    "react-dom": "^18.2.0",          // React DOM
    "react-router-dom": "^6.18.0",   // Routing
    
    "@mui/material": "^5.14.18",     // Material-UI components
    "@mui/icons-material": "^5.14.18", // Material icons
    "@emotion/react": "^11.11.1",    // CSS-in-JS
    
    "@react-three/fiber": "^8.15.11", // Three.js React integration
    "@react-three/drei": "^9.88.13",  // Three.js helpers
    "three": "^0.158.0",             // 3D graphics library
    
    "@reduxjs/toolkit": "^1.9.7",    // State management
    "react-redux": "^8.1.3",         // React Redux bindings
    
    "axios": "^1.6.2",               // HTTP client
    "framer-motion": "^10.16.16",    // Animations
    
    "leaflet": "^1.9.4",             // Maps
    "react-leaflet": "^4.2.1",       // React Leaflet
    
    "mathjs": "^12.2.0",             // Mathematical expressions
    "d3": "^7.8.5",                  // Data visualization
    "recharts": "^2.8.0",            // Charts
    
    "jspdf": "^2.5.1",               // PDF generation
    "html2canvas": "^1.4.1"          // Screenshot capture
  }
}
```

---

## 🛠️ **Development Environment Setup**

### **🔧 IDE Configuration:**

#### **Visual Studio Code (Recommended):**
```json
// .vscode/settings.json
{
  "python.defaultInterpreterPath": "./backend/yantra_env/Scripts/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "editor.formatOnSave": true,
  "files.associations": {
    "*.py": "python"
  }
}
```

#### **Required VS Code Extensions:**
- Python
- Pylance
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- GitLens
- Thunder Client (for API testing)

### **🧪 Testing Setup:**

#### **Backend Tests:**
```bash
cd backend
pytest tests/ -v

# Run specific test
pytest tests/test_parametric_engine.py -v

# With coverage
pytest --cov=. tests/
```

#### **Frontend Tests:**
```bash
cd frontend
npm test

# Run all tests
npm run test:all

# Coverage report
npm run test:coverage
```

---

## 🐳 **Docker Setup (Optional)**

### **🐳 Containerized Deployment:**

#### **Dockerfile (Backend):**
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### **Docker Compose:**
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - PYTHONPATH=/app
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

#### **Run with Docker:**
```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

---

## 🔑 **API Keys Setup (Optional)**

### **🤖 OpenAI API (for AI features):**
```bash
# Get API key from: https://platform.openai.com/api-keys

# Set environment variable
# Windows:
set OPENAI_API_KEY=your_api_key_here

# macOS/Linux:
export OPENAI_API_KEY=your_api_key_here

# Or create .env file in backend/
echo "OPENAI_API_KEY=your_api_key_here" > backend/.env
```

### **🌌 NASA API (for enhanced data):**
```bash
# Get API key from: https://api.nasa.gov/

# Set environment variable
# Windows:
set NASA_API_KEY=your_nasa_api_key

# macOS/Linux:
export NASA_API_KEY=your_nasa_api_key
```

---

## 🚨 **Troubleshooting**

### **Common Issues & Solutions:**

#### **🐍 Python Issues:**
```bash
# Issue: ModuleNotFoundError
# Solution: Install missing package
pip install package_name

# Issue: Virtual environment not activating
# Windows Solution:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
yantra_env\Scripts\activate

# Issue: Port already in use
# Solution: Kill process or use different port
netstat -ano | findstr :8000
taskkill /PID <process_id> /F
```

#### **⚛️ React Issues:**
```bash
# Issue: npm install fails
# Solution: Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Issue: Port 3000 in use
# Solution: Use different port
npm start -- --port 3001

# Issue: Build fails
# Solution: Increase memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

#### **🌐 Network Issues:**
```bash
# Issue: CORS errors
# Solution: Check backend CORS settings in main.py

# Issue: API not reachable
# Solution: Verify backend is running
curl http://localhost:8000/health

# Issue: Frontend can't reach backend
# Solution: Check proxy setting in package.json
"proxy": "http://localhost:8000"
```

---

## ✅ **Verification Checklist**

### **🎯 Complete Setup Verification:**

#### **Backend Checklist:**
- [ ] Python 3.9+ installed
- [ ] Virtual environment activated
- [ ] All dependencies installed (`pip list`)
- [ ] Server starts without errors
- [ ] API docs accessible at `/docs`
- [ ] Test yantra generation works
- [ ] Export functionality works

#### **Frontend Checklist:**
- [ ] Node.js 16+ installed
- [ ] npm dependencies installed
- [ ] Development server starts
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] API calls successful
- [ ] 3D visualization renders
- [ ] Responsive design works

#### **Integration Checklist:**
- [ ] Frontend connects to backend
- [ ] Yantra generation end-to-end works
- [ ] Export downloads correctly
- [ ] 3D models display properly
- [ ] Error handling works
- [ ] Mobile compatibility verified

---

## 🚀 **Performance Optimization**

### **⚡ Backend Optimization:**
```python
# Use async/await for better performance
# Enable uvicorn workers for production
uvicorn main:app --workers 4 --host 0.0.0.0 --port 8000
```

### **⚡ Frontend Optimization:**
```bash
# Build optimized production version
npm run build

# Serve static files
npm install -g serve
serve -s build -l 3000
```

---

## 🎊 **Ready to Go!**

**Your YANTRA.AI system is now fully installed and ready for:**
- 🧮 **Yantra generation** for any global coordinates
- 🌐 **3D visualization** with real-time solar animations
- 📐 **Blueprint export** for construction purposes
- 🤖 **AI manuscript interpretation** 
- 🥽 **WebAR experiences**
- 🌟 **Astronomical accuracy verification**

### **🏆 Next Steps:**
1. **Test the demo scenarios** in `DEMO_GUIDE.md`
2. **Explore the API documentation** at `http://localhost:8000/docs`
3. **Generate your first yantra** for your location
4. **Export construction blueprints**
5. **Experience the WebAR features**

**Welcome to YANTRA.AI - Where Ancient Astronomy Meets Modern Technology!** 🌌✨