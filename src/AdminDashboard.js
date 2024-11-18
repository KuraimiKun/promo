import { useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig';
import { collection, query, getDocs, where, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ChatIcon from '@mui/icons-material/Chat';
import ArticleIcon from '@mui/icons-material/Article';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import MessagesPanel from './components/admin/MessagesPanel';
import BlogsPanel from './components/admin/BlogsPanel';
import './AdminDashboard.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookIcon from '@mui/icons-material/Book';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState({
    totalMessages: 0,
    totalPosts: 0,
    newToday: 0
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin-login');
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total messages
        const messagesQuery = query(collection(db, 'contacts'));
        const messagesSnapshot = await getDocs(messagesQuery);
        const totalMessages = messagesSnapshot.size;

        // Get total posts
        const postsQuery = query(collection(db, 'blogPosts'));
        const postsSnapshot = await getDocs(postsQuery);
        const totalPosts = postsSnapshot.size;

        // Get new items today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTimestamp = Timestamp.fromDate(today);

        const newItemsQuery = query(
          collection(db, 'messages'),
          where('createdAt', '>=', todayTimestamp)
        );
        const newItemsSnapshot = await getDocs(newItemsQuery);
        const newToday = newItemsSnapshot.size;

        setStats({
          totalMessages,
          totalPosts,
          newToday
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const quickStats = [
    { 
      label: 'مجموع الرسائل', 
      value: stats.totalMessages, 
      icon: MailOutlineIcon,
      color: '#be1e2f'
    },
    { 
      label: 'مجموع المنشورات', 
      value: stats.totalPosts, 
      icon: BookIcon,
      color: '#2f7c31'
    },
    { 
      label: 'جديد اليوم', 
      value: stats.newToday, 
      icon: TrendingUpIcon,
      color: '#1976d2'
    },
  ];

  return (
    <div className={`admin-dashboard ${isSidebarCollapsed ? 'collapsed' : ''}`} dir="rtl">
      <aside className="sidebar">
        <div className="sidebar-header">
          <motion.button
            className="collapse-btn"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MenuIcon />
          </motion.button>
          {!isSidebarCollapsed && <h2>لوحة التحكم</h2>}
        </div>

        <div className="user-section">
          {!isSidebarCollapsed && <span className="user-email">{user?.email}</span>}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="logout-btn"
          >
            <LogoutIcon /> {!isSidebarCollapsed && 'تسجيل الخروج'}
          </motion.button>
        </div>
      </aside>

      <main className="main-content">
        <div className="dashboard-layout">
          <div className="quick-stats">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon 
                  className="stat-icon" 
                  style={{ 
                    backgroundColor: `${stat.color}15`,
                    color: stat.color 
                  }} 
                />
                <div className="stat-info">
                  <h3>{stat.label}</h3>
                  <span className="stat-value">{stat.value}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="tabs-container">
            <div className="tabs">
              {[
                { label: 'الرسائل', icon: ChatIcon },
                { label: 'المدونات', icon: ArticleIcon }
              ].map((tab, index) => (
                <motion.div
                  key={tab.label}
                  className={`tab ${currentTab === index ? 'active' : ''}`}
                  onClick={() => setCurrentTab(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="tab-icon" />
                  {tab.label}
                </motion.div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="panel-container"
            >
              {currentTab === 0 && <MessagesPanel />}
              {currentTab === 1 && <BlogsPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
