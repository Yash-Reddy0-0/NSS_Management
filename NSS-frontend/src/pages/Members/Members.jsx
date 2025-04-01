import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Users, 
  User, 
  Award, 
  Mail, 
  ChevronDown, 
  ChevronUp,
  Landmark,
  Shield,
  Loader2,
  Search,
  Frown
} from "lucide-react";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedLeader, setExpandedLeader] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:4000/api/members");
        setMembers(response.data);
        setFilteredMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const results = members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(results);
  }, [searchTerm, members]);

  const LeaderCard = ({ id, image, name, role, description, moreInfo }) => {
    const isExpanded = expandedLeader === id;
    
    return (
      <div 
        className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all ${
          isExpanded ? "ring-2 ring-blue-500" : "hover:shadow-md"
        }`}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-8">
            <div className="relative">
              {image ? (
                <img 
                  src={image} 
                  alt={name} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-blue-400" />
                </div>
              )}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {role}
              </div>
            </div>
          </div>

          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                <p className="text-blue-600 text-sm font-medium">{role}</p>
              </div>
              <button 
                onClick={() => setExpandedLeader(isExpanded ? null : id)}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            <p className="text-gray-600 mt-3">{description}</p>

            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-700">{moreInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin mx-auto text-blue-500" />
          <p className="mt-4 text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                NSS Team
              </h1>
              <p className="mt-2 text-gray-600">Meet our dedicated members and leadership</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Leadership Section */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Award className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">Leadership</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LeaderCard 
              id="director"
              image="director.jpg"
              name="Dr. Bhaskar Patel"
              role="Director"
              description="Our director leads the institution with a vision for academic excellence and community service."
              moreInfo="Under their leadership, RGUKT has flourished, fostering a culture of research, innovation, and student success through various initiatives including the NSS program."
            />
            <LeaderCard 
              id="nsshead"
              image="nsshead.jpg"
              name="Prof. Soumya"
              role="NSS Program Coordinator"
              description="The NSS Coordinator is responsible for organizing and overseeing all National Service Scheme activities at RGUKT."
              moreInfo="With over 8 years of experience in student development programs, they ensure students actively engage in social service, community development, and leadership initiatives that make a real impact."
            />
          </div>
        </section>

        {/* All Members Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <User className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">All Members</h2>
            </div>
            <div className="text-sm text-gray-500">
              {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'} found
            </div>
          </div>

          {filteredMembers.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
              <Frown className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No members found</h3>
              <p className="mt-2 text-gray-600">
                {searchTerm ? 'Try a different search term' : 'No members available at this time'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <div 
                  key={member._id} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300
                  border border-gray-200 hover:border-blue-300 hover:shadow-md hover:scale-[1.02]"
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-md">
                          <img
                            src={
                              member.profilePic
                                ? `http://localhost:4000/${member.profilePic}`
                                : "https://via.placeholder.com/100?text=No+Image"
                            }
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold px-2 py-1 rounded-full ${
                          member.position === 'coordinator' 
                            ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                            : member.position === 'volunteer' 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}>
                          {member.position}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{member.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1 group-hover:text-blue-500 transition-colors">
                        <Mail className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="mt-2 flex items-center text-xs text-gray-500 group-hover:text-blue-500 transition-colors">
                        <Shield className="w-3 h-3 mr-1" />
                        <span>Unit {member.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Members;