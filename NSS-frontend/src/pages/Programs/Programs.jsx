import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Flag, 
  Activity, 
  ChevronRight,
  Image as ImageIcon,
  Loader2,
  FileText,
  Landmark,
  Users,
  ChevronDown,
  MapPin,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Programs = () => {
  const [viewMode, setViewMode] = useState("hero");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programs, setPrograms] = useState({ govt: [], done: [], upcoming: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [expandedProgram, setExpandedProgram] = useState(null);

  useEffect(() => {
    const fetchProgramsByStatus = async () => {
      try {
        setIsLoading(true);
        const [govtRes, doneRes, upcomingRes] = await Promise.all([
          axios.get("http://localhost:4000/api/programs/status/Govt."),
          axios.get("http://localhost:4000/api/programs/status/Done"),
          axios.get("http://localhost:4000/api/programs/status/upcoming"),
        ]);
        setPrograms({
          govt: govtRes.data,
          done: doneRes.data,
          upcoming: upcomingRes.data,
        });
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgramsByStatus();
  }, []);

  const handleViewMode = (category) => {
    setSelectedCategory(category);
    setViewMode("cards");
  };

  const toggleProgramExpand = (programId) => {
    setExpandedProgram(expandedProgram === programId ? null : programId);
  };

  const renderProgramCards = (programsList, type = "default") => {
    if (isLoading) {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 text-gray-500"
        >
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p>Loading programs...</p>
        </motion.div>
      );
    }

    if (programsList.length === 0) {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-gray-200"
        >
          <FileText className="w-10 h-10 mb-4" />
          <p>No {type} programs available</p>
        </motion.div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programsList.map((program) => (
          <motion.div
            key={program._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
            className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col bg-white hover:border-blue-300 group"
          >
            {program.images?.length > 0 ? (
              <div className="aspect-video bg-gray-100 overflow-hidden relative">
                <motion.img
                  src={`http://localhost:4000/${program.images[0]}`}
                  alt={program.programName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                  <span className="text-xs text-white font-medium">
                    {program.location || "RGUKT Campus"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gray-50 flex items-center justify-center relative border-b border-gray-200">
                <div className="text-center p-4 text-gray-400">
                  <ImageIcon className="w-10 h-10 mx-auto mb-2" />
                  <p className="text-sm">No image available</p>
                </div>
              </div>
            )}
            
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-start gap-2 group-hover:text-blue-600 transition-colors">
                  {program.category === "Govt." ? (
                    <Landmark className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Activity className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  )}
                  <span>{program.programName}</span>
                </h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center gap-1 border border-gray-200">
                  <Calendar className="w-3 h-3" />
                  {new Date(program.programDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="mb-4">
                <p className={`text-sm text-gray-600 ${expandedProgram === program._id ? '' : 'line-clamp-2'}`}>
                  {program.programDescription}
                </p>
                {program.programDescription.length > 100 && (
                  <button 
                    onClick={() => toggleProgramExpand(program._id)}
                    className="text-xs text-blue-600 hover:text-blue-800 mt-1 flex items-center"
                  >
                    {expandedProgram === program._id ? 'Show less' : 'Read more'}
                    <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${expandedProgram === program._id ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
              
              <div className="mt-auto flex justify-between items-center">
                <span className="text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 border"
                  style={{
                    backgroundColor: type === "upcoming" ? '#FEF3C7' : type === "done" ? '#DCFCE7' : '#DBEAFE',
                    color: type === "upcoming" ? '#92400E' : type === "done" ? '#166534' : '#1E40AF',
                    borderColor: type === "upcoming" ? '#FCD34D' : type === "done" ? '#86EFAC' : '#93C5FD'
                  }}
                >
                  {type === "upcoming" ? (
                    <>
                      <Clock className="w-3 h-3" />
                      Upcoming
                    </>
                  ) : type === "done" ? (
                    <>
                      <Flag className="w-3 h-3" />
                      Completed
                    </>
                  ) : (
                    program.category
                  )}
                </span>
                <button
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center group"
                  onClick={() => {
                    setSelectedProgram(program);
                    setViewMode("programDetails");
                  }}
                >
                  View details
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  if (viewMode === "hero") {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <span>NSS <span className="text-blue-600">Programs</span></span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our initiatives and government collaborations at RGUKT Ongole</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-300 transition-all group bg-white shadow-sm hover:shadow-md"
            onClick={() => handleViewMode("govt")}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-3 items-center">
                <div className="p-2 bg-blue-100 rounded-lg border border-blue-200">
                  <Landmark className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Government Programs</h2>
              </div>
              <span className="text-sm text-white bg-blue-600 px-3 py-1 rounded-full border border-blue-700">
                {programs.govt.length}
              </span>
            </div>
            <p className="text-gray-600 mb-4">Programs issued by Central and State Government</p>
            <div className="text-blue-600 text-sm font-medium flex items-center group-hover:underline">
              View programs <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-300 transition-all group bg-white shadow-sm hover:shadow-md"
            onClick={() => handleViewMode("activities")}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg border border-green-200">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Our Activities</h2>
              </div>
              <span className="text-sm text-white bg-green-600 px-3 py-1 rounded-full border border-green-700">
                {programs.done.length + programs.upcoming.length}
              </span>
            </div>
            <p className="text-gray-600 mb-4">Programs conducted by RGUKT Ongole NSS</p>
            <div className="text-blue-600 text-sm font-medium flex items-center group-hover:underline">
              View activities <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (viewMode === "cards") {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.button 
          whileHover={{ x: -3 }}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          onClick={() => setViewMode("hero")}
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to overview
        </motion.button>

        <AnimatePresence>
          {selectedCategory === "govt" && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Landmark className="w-6 h-6 text-blue-600" />
                <span>Government <span className="text-blue-600">Programs</span></span>
              </h2>
              {renderProgramCards(programs.govt, "govt")}
            </motion.section>
          )}

          {selectedCategory === "activities" && (
            <>
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Flag className="w-6 h-6 text-green-600" />
                  <span>Completed <span className="text-green-600">Programs</span></span>
                </h2>
                {renderProgramCards(programs.done, "done")}
              </motion.section>
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-yellow-600" />
                  <span>Upcoming <span className="text-yellow-600">Programs</span></span>
                </h2>
                {renderProgramCards(programs.upcoming, "upcoming")}
              </motion.section>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (viewMode === "programDetails" && selectedProgram) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.button 
          whileHover={{ x: -3 }}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          onClick={() => setViewMode("cards")}
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to programs
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:border-blue-300 transition-colors overflow-hidden"
        >
          {selectedProgram.images?.length > 0 ? (
            <div className="aspect-video bg-gray-100 relative">
              <img
                src={`http://localhost:4000/${selectedProgram.images[0]}`}
                alt={selectedProgram.programName}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h2 className="text-2xl font-bold text-white">
                  {selectedProgram.programName}
                </h2>
                <div className="flex items-center text-white/90 text-sm space-x-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedProgram.programDate).toLocaleDateString()}
                  </span>
                  {selectedProgram.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedProgram.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-gray-50 flex items-center justify-center border-b border-gray-200">
              <div className="text-center p-4 text-gray-400">
                <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                <p>No image available</p>
              </div>
            </div>
          )}
          
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1 border"
                style={{
                  backgroundColor: selectedProgram.category === "Govt." ? '#DBEAFE' : '#DCFCE7',
                  color: selectedProgram.category === "Govt." ? '#1E40AF' : '#166534',
                  borderColor: selectedProgram.category === "Govt." ? '#93C5FD' : '#86EFAC'
                }}
              >
                {selectedProgram.category === "Govt." ? (
                  <Landmark className="w-4 h-4" />
                ) : (
                  <Activity className="w-4 h-4" />
                )}
                {selectedProgram.category}
              </span>
              
              {selectedProgram.status === "upcoming" && (
                <span className="text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1 border border-yellow-300 bg-yellow-100 text-yellow-800">
                  <Clock className="w-4 h-4" />
                  Upcoming
                </span>
              )}
              
              {selectedProgram.status === "Done" && (
                <span className="text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1 border border-green-300 bg-green-100 text-green-800">
                  <Flag className="w-4 h-4" />
                  Completed
                </span>
              )}
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">
                {selectedProgram.programDescription}
              </p>
            </div>
          </div>
        </motion.div>

        {selectedProgram.images?.length > 1 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gray-700" />
              Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedProgram.images.slice(1).map((img, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-lg overflow-hidden bg-gray-100 cursor-pointer aspect-square border-2 border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <img 
                    src={`http://localhost:4000/${img}`} 
                    alt={`${selectedProgram.programName} - ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {selectedProgram.images?.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500 border border-gray-200">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No additional images available for this program</p>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Programs;