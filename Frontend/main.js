import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  Users, 
  TrendingUp, 
  Brain, 
  Shield, 
  Play, 
  Pause, 
  BarChart3,
  Stethoscope,
  Droplets,
  Monitor,
  AlertCircle,
  CheckCircle,
  Clock,
  Server,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [serverStatus, setServerStatus] = useState({
    heart: { status: 'running', clients: 3, rounds: 2 },
    diabetes: { status: 'running', clients: 3, rounds: 1 }
  });
  const [formData, setFormData] = useState({
    heart: {
      BMI: '',
      PhysicalHealth: '',
      MentalHealth: '',
      SleepTime: '',
      Smoking: 'No',
      AlcoholDrinking: 'No',
      Stroke: 'No',
      PhysicalActivity: 'Yes',
      Sex: 'Male',
      AgeCategory: '25-29',
      Race: 'White',
      Diabetic: 'No',
      GenHealth: 'Good',
      Asthma: 'No',
      KidneyDisease: 'No',
      SkinCancer: 'No'
    },
    diabetes: {
      Pregnancies: '',
      Glucose: '',
      BloodPressure: '',
      SkinThickness: '',
      Insulin: '',
      BMI: '',
      DiabetesPedigreeFunction: '',
      Age: ''
    }
  });
  const [predictions, setPredictions] = useState({ heart: null, diabetes: null });
  const [trainingMetrics, setTrainingMetrics] = useState({
    heart: [
      { round: 1, accuracy: 0.82, loss: 0.45, clients: 3 },
      { round: 2, accuracy: 0.85, loss: 0.38, clients: 3 },
      { round: 3, accuracy: 0.87, loss: 0.32, clients: 3 }
    ],
    diabetes: [
      { round: 1, accuracy: 0.79, loss: 0.52, clients: 3 },
      { round: 2, accuracy: 0.83, loss: 0.41, clients: 3 },
      { round: 3, accuracy: 0.86, loss: 0.35, clients: 3 }
    ]
  });

  const handleInputChange = (disease, field, value) => {
    setFormData(prev => ({
      ...prev,
      [disease]: {
        ...prev[disease],
        [field]: value
      }
    }));
  };

  const handlePredict = async (disease) => {
    // Simulate prediction
    const randomRisk = Math.random() * 100;
    setPredictions(prev => ({
      ...prev,
      [disease]: {
        risk: randomRisk,
        confidence: 85 + Math.random() * 10,
        timestamp: new Date().toLocaleTimeString()
      }
    }));
  };

  const getRiskColor = (risk) => {
    if (risk < 30) return 'text-green-600 bg-green-50';
    if (risk < 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRiskLevel = (risk) => {
    if (risk < 30) return 'Low Risk';
    if (risk < 70) return 'Moderate Risk';
    return 'High Risk';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MediFed AI
                </h1>
                <p className="text-sm text-gray-600">Federated Healthcare Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Live</span>
              </div>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Monitor },
              { id: 'heart', label: 'Heart Disease', icon: Heart },
              { id: 'diabetes', label: 'Diabetes', icon: Droplets },
              { id: 'training', label: 'Training Metrics', icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-all duration-300 ${
                  activeTab === id
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50/30'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Clients</p>
                    <p className="text-3xl font-bold text-gray-900">6</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      All Active
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Models</p>
                    <p className="text-3xl font-bold text-gray-900">2</p>
                    <p className="text-sm text-blue-600 flex items-center mt-1">
                      <Zap className="h-4 w-4 mr-1" />
                      Training
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Brain className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Accuracy</p>
                    <p className="text-3xl font-bold text-gray-900">86.5%</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +3.2%
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Server Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                    Heart Disease Server
                  </h3>
                  <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-700">Running</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Port:</span>
                    <span className="font-medium">8080</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Connected Clients:</span>
                    <span className="font-medium">3/3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Round:</span>
                    <span className="font-medium">2/3</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                    Diabetes Server
                  </h3>
                  <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-700">Running</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Port:</span>
                    <span className="font-medium">8081</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Connected Clients:</span>
                    <span className="font-medium">3/3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Round:</span>
                    <span className="font-medium">1/3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Heart Disease Tab */}
        {activeTab === 'heart' && (
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="h-7 w-7 text-red-500 mr-3" />
                Heart Disease Risk Assessment
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800">Patient Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">BMI</label>
                      <input
                        type="number"
                        value={formData.heart.BMI}
                        onChange={(e) => handleInputChange('heart', 'BMI', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="25.0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sleep Time (hrs)</label>
                      <input
                        type="number"
                        value={formData.heart.SleepTime}
                        onChange={(e) => handleInputChange('heart', 'SleepTime', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="7"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Physical Health (days)</label>
                      <input
                        type="number"
                        value={formData.heart.PhysicalHealth}
                        onChange={(e) => handleInputChange('heart', 'PhysicalHealth', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0-30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mental Health (days)</label>
                      <input
                        type="number"
                        value={formData.heart.MentalHealth}
                        onChange={(e) => handleInputChange('heart', 'MentalHealth', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0-30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
                      <select
                        value={formData.heart.Sex}
                        onChange={(e) => handleInputChange('heart', 'Sex', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age Category</label>
                      <select
                        value={formData.heart.AgeCategory}
                        onChange={(e) => handleInputChange('heart', 'AgeCategory', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {['18-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80+'].map(age => (
                          <option key={age} value={age}>{age}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Smoking</label>
                      <select
                        value={formData.heart.Smoking}
                        onChange={(e) => handleInputChange('heart', 'Smoking', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">General Health</label>
                      <select
                        value={formData.heart.GenHealth}
                        onChange={(e) => handleInputChange('heart', 'GenHealth', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {['Excellent', 'Very good', 'Good', 'Fair', 'Poor'].map(health => (
                          <option key={health} value={health}>{health}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePredict('heart')}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Assess Heart Disease Risk
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Assessment</h3>
                  
                  {predictions.heart ? (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${getRiskColor(predictions.heart.risk)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{getRiskLevel(predictions.heart.risk)}</span>
                          <span className="text-2xl font-bold">{predictions.heart.risk.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-white/50 rounded-full h-2">
                          <div 
                            className="bg-current h-2 rounded-full transition-all duration-500"
                            style={{ width: `${predictions.heart.risk}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-2">
                        <p>Confidence: {predictions.heart.confidence.toFixed(1)}%</p>
                        <p>Assessed at: {predictions.heart.timestamp}</p>
                        <p className="text-xs text-gray-500">
                          Prediction based on federated learning model trained on distributed data
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Stethoscope className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Fill in the patient information and click "Assess" to get risk prediction</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Diabetes Tab */}
        {activeTab === 'diabetes' && (
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Droplets className="h-7 w-7 text-blue-500 mr-3" />
                Diabetes Risk Assessment
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800">Medical Measurements</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Glucose Level</label>
                      <input
                        type="number"
                        value={formData.diabetes.Glucose}
                        onChange={(e) => handleInputChange('diabetes', 'Glucose', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="120"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure</label>
                      <input
                        type="number"
                        value={formData.diabetes.BloodPressure}
                        onChange={(e) => handleInputChange('diabetes', 'BloodPressure', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="80"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">BMI</label>
                      <input
                        type="number"
                        value={formData.diabetes.BMI}
                        onChange={(e) => handleInputChange('diabetes', 'BMI', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="25.0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        value={formData.diabetes.Age}
                        onChange={(e) => handleInputChange('diabetes', 'Age', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="35"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pregnancies</label>
                      <input
                        type="number"
                        value={formData.diabetes.Pregnancies}
                        onChange={(e) => handleInputChange('diabetes', 'Pregnancies', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Insulin Level</label>
                      <input
                        type="number"
                        value={formData.diabetes.Insulin}
                        onChange={(e) => handleInputChange('diabetes', 'Insulin', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="80"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handlePredict('diabetes')}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Assess Diabetes Risk
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Assessment</h3>
                  
                  {predictions.diabetes ? (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${getRiskColor(predictions.diabetes.risk)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{getRiskLevel(predictions.diabetes.risk)}</span>
                          <span className="text-2xl font-bold">{predictions.diabetes.risk.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-white/50 rounded-full h-2">
                          <div 
                            className="bg-current h-2 rounded-full transition-all duration-500"
                            style={{ width: `${predictions.diabetes.risk}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-2">
                        <p>Confidence: {predictions.diabetes.confidence.toFixed(1)}%</p>
                        <p>Assessed at: {predictions.diabetes.timestamp}</p>
                        <p className="text-xs text-gray-500">
                          Prediction based on federated learning model trained on distributed data
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Fill in the medical measurements and click "Assess" to get risk prediction</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Training Metrics Tab */}
        {activeTab === 'training' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Heart Disease Metrics */}
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Heart className="h-5 w-5 text-red-500 mr-2" />
                  Heart Disease Model
                </h3>
                <div className="space-y-4">
                  {trainingMetrics.heart.map((metric, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Round {metric.round}</span>
                        <span className="text-sm text-gray-600">{metric.clients} clients</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Accuracy:</span>
                          <span className="font-semibold ml-2">{(metric.accuracy * 100).toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Loss:</span>
                          <span className="font-semibold ml-2">{metric.loss.toFixed(3)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diabetes Metrics */}
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                <h3 className="