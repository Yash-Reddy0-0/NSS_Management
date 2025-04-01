import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import LeaderCard from '../../components/LeaderCard/LeaderCard';
import { Globe, Users, Award, ArrowRight, Flag, HeartHandshake, Landmark, ScrollText } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
      <Header />
      
      {/* Hero Section with Parallax Effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80')] bg-cover bg-center opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 text-center relative">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-blue-900 mb-6"
          >
            National Service Scheme
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block text-2xl md:text-3xl font-medium text-blue-600 mt-2"
            >
              RGUKT Ongole Campus
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
          >
            Fostering the spirit of <span className="font-bold text-red-600 animate-pulse">"Not Me But You"</span> through 
            community service and student development
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <motion.a 
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.rguktong.ac.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Visit RGUKT <ArrowRight className="ml-2 w-4 h-4" />
            </motion.a>
            
            <motion.a 
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.nss.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Flag className="mr-2 w-4 h-4" /> About NSS
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Campus Section */}
      <motion.section 
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.005] hover:shadow-2xl duration-500">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-blue-50 to-gray-50 flex items-center">
                <div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center mb-4"
                  >
                    <Globe className="w-8 h-8 text-blue-600 mr-3" />
                    <h2 className="text-3xl font-bold text-blue-900">Our Campus: RGUKT</h2>
                  </motion.div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Established in 2008 by the Government of Andhra Pradesh, our campus in Ongole fosters 
                    talent across academics, sports, and cultural activities. With state-of-the-art 
                    facilities including a well-equipped library, modern labs, and smart classrooms, we 
                    provide an environment for holistic development.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The <strong className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">National Service Scheme</strong> 
                    is integral to our mission, instilling the value of <span className="italic text-red-500 hover:text-red-600 transition-colors duration-300">"Not Me But You"</span> 
                    to build a better society through student-led community initiatives.
                  </p>
                </div>
              </div>
              <div className="hidden md:block md:w-1/2 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center hover:scale-105 transition-transform duration-1000" />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* NSS Info Section */}
      <motion.section 
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                rotate: [0, Math.random() * 360]
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute text-blue-300"
              style={{
                fontSize: `${Math.random() * 20 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
            >
              <HeartHandshake />
            </motion.div>
          ))}
        </div>
        
        <motion.div variants={itemVariants} className="max-w-7xl mx-auto px-4 relative">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center mb-6"
              >
                <Users className="w-8 h-8 text-blue-200 mr-3" />
                <h2 className="text-3xl font-bold">About National Service Scheme</h2>
              </motion.div>
              <p className="text-blue-100 leading-relaxed mb-4">
                A Central Sector Scheme of <strong>Government of India, Ministry of Youth Affairs & Sports</strong>, 
                NSS provides students with hands-on experience in community service since 1969.
              </p>
              <p className="text-blue-100 leading-relaxed">
                From 40,000 volunteers at inception to over <strong>3.8 million</strong> today, NSS engages 
                students across India in meaningful social initiatives that develop character and 
                citizenship.
              </p>
            </div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:w-1/2 bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/20"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2" /> Our Impact
              </h3>
              <ul className="space-y-3">
                {[
                  "500+ annual community service hours",
                  "100+ student volunteers engaged",
                  "10+ ongoing social initiatives",
                  "5 villages adopted for development"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start"
                  >
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block w-2 h-2 bg-blue-300 rounded-full mt-2 mr-3"
                    ></motion.span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Leadership Section */}
      <motion.section 
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-bold text-center text-blue-900 mb-12"
        >
          Our Leadership
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={itemVariants}>
            <LeaderCard 
              image="director.jpg" 
              name="Dr. Bhaskar patel" 
              role="Director, RGUKT"
              description="Leads the institution with a vision for academic excellence and community service." 
              moreInfo="Under their leadership, RGUKT has flourished, fostering a culture of research, innovation, and student success through various initiatives including the NSS program."
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <LeaderCard 
              image="nsshead.jpg" 
              name="Prof. Soumya" 
              role="NSS Program Officer"
              description="Organizes and oversees all National Service Scheme activities at RGUKT." 
              moreInfo="With over 8 years of experience in student development programs, they ensure students actively engage in social service, community development, and leadership initiatives that make a real impact."
            />
          </motion.div>
        </motion.div>
      </motion.section>

     

     
    </div>
  );
};

export default Home;