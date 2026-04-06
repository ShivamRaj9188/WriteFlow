import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ArticleCard from '../components/ArticleCard';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, LogOut } from 'lucide-react';

export default function Landing() {
  const { user, logout } = useAuth();
  
  const dummyPosts = [
    { 
      title: "Blog post title", 
      tag: "UI/UX Design",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop", 
      authorName: "Azunyan U. Wu",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&h=60",
      readTime: "5min read" 
    },
    { 
      title: "Blog post title", 
      tag: "UI/UX Design",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
      image: "https://images.unsplash.com/photo-1542401886-65d6c61de152?q=80&w=600&auto=format&fit=crop", 
      authorName: "Veronica D. White",
      authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=60&h=60",
      readTime: "5min read" 
    },
    { 
      title: "Blog post title", 
      tag: "UI/UX Design",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop", 
      authorName: "Jesse Pinkman",
      authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=60&h=60",
      readTime: "5min read" 
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#030303] overflow-hidden selection:bg-purple-500/30">
      
      {/* Absolute dark abstract swirling background shapes */}
      <div className="fixed inset-0 pointer-events-none opacity-40 mix-blend-screen scale-150 transform translate-x-1/4 translate-y-1/4">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>
      
      {/* Quick Nav Header */}
      <nav className="absolute top-0 w-full z-50 p-6 flex justify-end">
        {user ? (
          <div className="flex gap-4 items-center mr-4">
             <span className="text-gray-400 text-sm font-medium">Logged in successfully</span>
             <Button onClick={logout} className="p-2 w-10 h-10 rounded-full border-none shadow-none hover:bg-white/10 !bg-transparent !from-transparent !to-transparent group p-0">
               <LogOut className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
             </Button>
          </div>
        ) : (
          <div className="flex gap-3 items-center mr-4">
             <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2">
                Log In
             </Link>
             <Link to="/signup">
                <Button className="!rounded-full px-6 py-2.5 text-sm font-bold shadow-none !from-[#4f46e5] !to-[#7c3aed] border border-white/10 hover:border-white/30">
                  Sign Up
                </Button>
             </Link>
          </div>
        )}
      </nav>

      {/* Main Centered UI App Container */}
      <div className="flex items-center justify-center min-h-screen p-4 md:p-8 relative z-10 w-full">
        
        {/* Massive Glass Wrapping Card */}
        <div className="w-full max-w-5xl rounded-[32px] md:rounded-[2.5rem] bg-[#0c0c0c]/80 backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-hidden p-6 md:p-12 lg:p-14">
          
          {/* Header section of the Card */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 mb-4 rounded-full bg-[#4f46e5]/20 text-[#6366f1] text-[10px] font-bold tracking-wider uppercase border border-[#4f46e5]/30">
                Blog Post
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                Latest Article
              </h1>
              <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed">
                Donec ac odio tempor orci dapibus ultrices. Ut lectus arcu bibendum at<br className="hidden md:block" /> 
                varius vel pharetra vel. Enim sed faucibus turpis in eu mi bibendum.
              </p>
            </div>
            
            <Link to={user ? "/dashboard" : "/login"}>
              <Button className="!rounded-full shadow-none whitespace-nowrap pl-5 pr-4 py-3 text-sm font-bold tracking-wide !from-[#4f46e5] !to-[#6366f1] hover:!from-[#4338ca] hover:!to-[#4f46e5]">
                View All Posts 
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* Grid section representing the articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyPosts.map((post, idx) => (
              <ArticleCard key={idx} post={post} />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
