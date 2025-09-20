
import React, { useState, useEffect } from 'react';
import { Home, MapPin, FileText, BookOpen, User, ChevronRight, CheckCircle, Clock, AlertCircle, Play, Star, TrendingUp, Award, Navigation } from 'lucide-react';

const App = () => {
  const [activeView, setActiveView] = useState('home');
  const [selectedModule, setSelectedModule] = useState(null);
  const [dailyQuestionAnswer, setDailyQuestionAnswer] = useState(null);
  const [reportData, setReportData] = useState({
    patientsSeen: '',
    patientsReferred: '',
    notableCases: '',
    caseTypes: []
  });
  const [weeklyReflection, setWeeklyReflection] = useState({
    difficultModule: '',
    satisfaction: 4,
    comments: ''
  });
  const [mapTab, setMapTab] = useState('toVisit');
  const [xp, setXp] = useState(1432);
  const [streak, setStreak] = useState(3);

  const modules = [
    {
      id: 1,
      title: 'Basic Anatomy',
      progress: 16,
      total: 40,
      icon: '👤',
      videos: [
        { title: 'Blood Pressure', thumbnail: 'BLOOD PRESSURE MEASUREMENT', quiz: 8, quizTotal: 10 },
        { title: 'Radial Pulse', thumbnail: 'RADIAL PULSE ASSESSMENT', quiz: 0, quizTotal: 10 },
        { title: 'Vital Signs', thumbnail: 'VITAL SIGNS EXAM', quiz: 0, quizTotal: 10 }
      ]
    },
    {
      id: 2,
      title: "Children's Health",
      progress: 3,
      total: 40,
      icon: '👶'
    },
    {
      id: 3,
      title: 'Adult Health',
      progress: 0,
      total: 40,
      icon: '❤️'
    }
  ];

  const locations = [
    { name: 'Ruai Community Health Center', distance: 1.2, status: 'toVisit' },
    { name: 'Humpton Medical Clinic', distance: 1.5, status: 'toVisit' },
    { name: 'Mwatate Community Healthcare Centre', distance: 2.1, status: 'toVisit' },
    { name: 'Legacy Family Health', distance: 3.4, status: 'toVisit' },
    { name: 'Langa Langa clinic', distance: 0.8, status: 'visited' },
    { name: 'Family clinic', distance: 0.9, status: 'visited' },
    { name: 'Centrumberliner Medical Centre', distance: 1.1, status: 'scheduled' }
  ];

  const NavBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        <button onClick={() => setActiveView('home')} className={`p-2 ${activeView === 'home' ? 'text-blue-500' : 'text-gray-400'}`}>
          <Home size={24} />
        </button>
        <button onClick={() => setActiveView('map')} className={`p-2 ${activeView === 'map' ? 'text-blue-500' : 'text-gray-400'}`}>
          <MapPin size={24} />
        </button>
        <button onClick={() => setActiveView('report')} className={`p-2 ${activeView === 'report' ? 'text-blue-500' : 'text-gray-400'}`}>
          <FileText size={24} />
        </button>
        <button onClick={() => setActiveView('modules')} className={`p-2 ${activeView === 'modules' ? 'text-blue-500' : 'text-gray-400'}`}>
          <BookOpen size={24} />
        </button>
        <button onClick={() => setActiveView('profile')} className={`p-2 ${activeView === 'profile' ? 'text-blue-500' : 'text-gray-400'}`}>
          <User size={24} />
        </button>
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="pb-20">
      <div className="bg-white p-4 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-orange-500">🔥 {streak}</span>
        </div>
        <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
          <Award className="text-blue-600" size={16} />
          <span className="text-blue-600 font-semibold">{xp} XP</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-red-500">❤️</span>
          <span className="font-bold">∞</span>
        </div>
      </div>

      <div className="px-4">
        <h2 className="text-2xl font-bold mb-4">Daily To-Do</h2>
        
        <div className="space-y-3 mb-6">
          <button 
            onClick={() => setActiveView('map')}
            className="w-full bg-white rounded-lg p-4 shadow-sm flex items-start gap-3"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="text-blue-500" size={24} />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">Daily Itinerary <span className="text-red-500">*</span></h3>
              <p className="text-sm text-gray-600">Find your scheduled locations and patients here!</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveView('question')}
            className="w-full bg-white rounded-lg p-4 shadow-sm flex items-start gap-3"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-orange-500" size={24} />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">Daily Questions! <span className="text-red-500">*</span></h3>
              <p className="text-sm text-gray-600">Answer your three daily questions to collect your daily XP!</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveView('report')}
            className="w-full bg-white rounded-lg p-4 shadow-sm flex items-start gap-3"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="text-purple-500" size={24} />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">Daily Report <span className="text-red-500">*</span></h3>
              <p className="text-sm text-gray-600">Fill out the report at the end of the day.</p>
            </div>
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4">Learning Center</h2>
        
        <button 
          onClick={() => setActiveView('modules')}
          className="w-full bg-white rounded-lg p-4 shadow-sm flex items-start gap-3"
        >
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <BookOpen className="text-yellow-600" size={24} />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold">Review Modules</h3>
            <p className="text-sm text-gray-600">Modules to review based on your mistakes!</p>
          </div>
        </button>
      </div>
    </div>
  );

  const QuestionView = () => (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Daily Question 1</h1>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <p className="text-lg mb-6">Your patient has a blood pressure of 135/85. What should you advise them to do?</p>
        
        <div className="space-y-3">
          <button
            onClick={() => setDailyQuestionAnswer('great')}
            className={`w-full p-4 rounded-full text-white font-medium transition-all ${
              dailyQuestionAnswer === 'great' ? 'bg-pink-600' : 'bg-pink-500 hover:bg-pink-600'
            }`}
          >
            they're in great condition
          </button>
          
          <button
            onClick={() => setDailyQuestionAnswer('lifestyle')}
            className={`w-full p-4 rounded-full text-white font-medium transition-all ${
              dailyQuestionAnswer === 'lifestyle' ? 'bg-yellow-600' : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
          >
            less salt, more physical activity
          </button>
          
          <button
            onClick={() => setDailyQuestionAnswer('doctor')}
            className={`w-full p-4 rounded-full text-white font-medium transition-all ${
              dailyQuestionAnswer === 'doctor' ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            see a doctor or nurse
          </button>
          
          <button
            onClick={() => setDailyQuestionAnswer('prescribe')}
            className={`w-full p-4 rounded-full text-white font-medium transition-all ${
              dailyQuestionAnswer === 'prescribe' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            prescribe medications
          </button>
          
          <button
            onClick={() => setDailyQuestionAnswer('unsure')}
            className="w-full p-2 text-gray-500 underline mt-4"
          >
            I'm not sure.
          </button>
        </div>
      </div>
      
      {dailyQuestionAnswer && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg">
          <p className="text-green-800">Answer recorded! +10 XP earned</p>
        </div>
      )}
    </div>
  );

  const ModulesView = () => (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Modules</h1>
      
      <div className="space-y-6">
        {modules.map(module => (
          <div key={module.id}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg">{module.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">👑</span>
                <span className="text-gray-600">{module.progress}/{module.total}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setSelectedModule(module);
                  setActiveView('moduleVideos');
                }}
                className="bg-gray-100 rounded-lg p-4 flex flex-col items-center"
              >
                <div className="text-4xl mb-2">{module.icon}</div>
                <span className="font-medium">Module {module.id}</span>
                <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(module.progress / module.total) * 100}%` }}
                  />
                </div>
              </button>
              
              <button className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center">
                <span className="font-medium mb-2">Related Videos</span>
                <div className="flex items-center gap-1 text-gray-500">
                  <span>Browse</span>
                  <Play size={16} />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ModuleVideosView = () => (
    <div className="p-4 pb-20">
      <button 
        onClick={() => setActiveView('modules')}
        className="mb-4 text-blue-500"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-6">Module 1 Videos</h1>
      
      <div className="space-y-6">
        {selectedModule?.videos?.map((video, idx) => (
          <div key={idx}>
            <h3 className="font-bold text-lg mb-3">{video.title}</h3>
            <div className="bg-purple-600 rounded-lg p-6 text-white relative">
              <div className="text-xl font-bold mb-2">{video.thumbnail}</div>
              <div className="flex items-center justify-center">
                <Play size={32} />
              </div>
              <div className="absolute top-2 right-2 text-xs">2:35</div>
            </div>
            <button className="mt-3 text-blue-500 flex items-center gap-2">
              <span>Video Quiz</span>
              <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1">
                <span className="text-yellow-500">👑</span>
                <span className="text-gray-700">{video.quiz}/{video.quizTotal}</span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const ReportView = () => (
    <div className="p-4 pb-20">
      {activeView === 'report' ? (
        <>
          <h1 className="text-2xl font-bold mb-6">Daily Report</h1>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">
                How many patients did you see today? <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                value={reportData.patientsSeen}
                onChange={(e) => setReportData({...reportData, patientsSeen: e.target.value})}
              >
                <option value="">Select Number</option>
                {[...Array(20)].map((_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                How many patients were sent to the clinic? <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                value={reportData.patientsReferred}
                onChange={(e) => setReportData({...reportData, patientsReferred: e.target.value})}
              >
                <option value="">Select Number</option>
                {[...Array(20)].map((_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Notable Cases:</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 mb-3"
              >
                <option value="">Select Number</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                multiple
              >
                <option value="">Select Applicable</option>
                <option value="emergency">Emergency Case</option>
                <option value="chronic">Chronic Condition</option>
                <option value="pediatric">Pediatric Case</option>
                <option value="maternal">Maternal Health</option>
              </select>
            </div>

            <button
              onClick={() => setActiveView('weeklyReflection')}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium mt-6"
            >
              Submit Report
            </button>
          </div>
        </>
      ) : null}
      
      {activeView === 'weeklyReflection' && (
        <>
          <h1 className="text-2xl font-bold mb-6">Weekly Reflection</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">
                Which module did you find most difficult this week? <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                value={weeklyReflection.difficultModule}
                onChange={(e) => setWeeklyReflection({...weeklyReflection, difficultModule: e.target.value})}
              >
                <option value="">Select Module</option>
                <option value="anatomy">Basic Anatomy</option>
                <option value="children">Children's Health</option>
                <option value="adult">Adult Health</option>
              </select>
            </div>

            <div>
              <label className="block mb-4 font-medium">
                How satisfied are you with this week's training?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setWeeklyReflection({...weeklyReflection, satisfaction: star})}
                    className="text-3xl"
                  >
                    {star <= weeklyReflection.satisfaction ? '⭐' : '⭐'}
                    <span className="sr-only">Rate {star} stars</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Thoughts, comments, concerns?
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 h-32"
                placeholder="Type here!"
                value={weeklyReflection.comments}
                onChange={(e) => setWeeklyReflection({...weeklyReflection, comments: e.target.value})}
              />
            </div>

            <button
              onClick={() => {
                alert('Report submitted successfully!');
                setActiveView('home');
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium"
            >
              Submit Reflection
            </button>
          </div>
        </>
      )}
    </div>
  );

  const MapView = () => (
    <div className="pb-20">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4 bg-gray-100 rounded-lg p-1">
          <input
            type="text"
            placeholder="Find CHC Locations"
            className="flex-1 p-2 bg-transparent outline-none"
          />
        </div>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMapTab('toVisit')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              mapTab === 'toVisit' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
            }`}
          >
            <AlertCircle size={16} />
            To Visit
          </button>
          <button
            onClick={() => setMapTab('visited')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              mapTab === 'visited' ? 'bg-green-100 text-green-600' : 'bg-gray-100'
            }`}
          >
            <CheckCircle size={16} />
            Visited
          </button>
          <button
            onClick={() => setMapTab('scheduled')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              mapTab === 'scheduled' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'
            }`}
          >
            <Clock size={16} />
            Scheduled
          </button>
        </div>
      </div>

      <div className="h-64 bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-2" />
            <p>Interactive Map View</p>
          </div>
        </div>
        
        {/* Map markers simulation */}
        <div className="absolute top-10 left-20">
          <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg" />
        </div>
        <div className="absolute top-20 right-20">
          <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
        </div>
        <div className="absolute bottom-20 left-1/2">
          <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-lg" />
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {locations
            .filter(loc => {
              if (mapTab === 'toVisit') return loc.status === 'toVisit';
              if (mapTab === 'visited') return loc.status === 'visited';
              if (mapTab === 'scheduled') return loc.status === 'scheduled';
              return true;
            })
            .slice(0, 3)
            .map((location, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold">{location.name}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                  <MapPin size={14} />
                  <span>{location.distance} miles</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  {idx === 0 ? '123 Savannah Road, Amboseli Village, Kajiado County, Kenya' : 
                   idx === 1 ? '45 Elephant Trail, Ololokitok, Kajiado County, Kenya' :
                   'Healthcare facility location'}
                </p>
              </div>
            ))}
        </div>

        <button className="fixed bottom-24 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg">
          <Navigation size={24} />
        </button>
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="p-4 pb-20">
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4" />
        <h2 className="text-xl font-bold">Community Health Worker</h2>
        <p className="text-gray-600">Level 5 • {xp} XP</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Statistics</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Patients Seen</span>
              <span className="font-medium">247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Modules Completed</span>
              <span className="font-medium">19</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Streak</span>
              <span className="font-medium">{streak} days</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Achievements</h3>
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">🏆</div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">🌟</div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">💪</div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">🎯</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {activeView === 'home' && <HomeView />}
        {activeView === 'question' && <QuestionView />}
        {activeView === 'modules' && <ModulesView />}
        {activeView === 'moduleVideos' && <ModuleVideosView />}
        {(activeView === 'report' || activeView === 'weeklyReflection') && <ReportView />}
        {activeView === 'map' && <MapView />}
        {activeView === 'profile' && <ProfileView />}
        
        <NavBar />
      </div>
    </div>
  );
};

export default App;