import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const { user, logout } = useAuth();
  
  const dummyPosts = [
    { title: "Building Scalable Backends with Spring Boot", excerpt: "Learn how to architect a modern Java backend effectively.", date: "April 4, 2026" },
    { title: "Mastering React & Glassmorphism UI", excerpt: "A guide to creating premium web experiences.", date: "April 2, 2026" },
    { title: "The Future of API Design", excerpt: "Why REST still dominates and how to structure it.", date: "March 29, 2026" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-16 relative">
      
      {/* Navbar area placeholder for landing */}
      <div className="absolute top-0 right-4 mt-6">
        {user ? (
          <div className="flex gap-4 items-center">
             <span className="text-gray-300">Welcome back</span>
             <Button onClick={logout} className="py-2 px-4 bg-transparent border border-white/20 hover:bg-white/5">Logout</Button>
          </div>
        ) : (
          <div className="flex gap-4">
             <Link to="/login"><Button className="py-2 px-6 bg-transparent border border-white/20 hover:bg-white/5 shadow-none hover:shadow-none from-transparent to-transparent">Log In</Button></Link>
             <Link to="/signup"><Button className="py-2 px-6">Sign Up</Button></Link>
          </div>
        )}
      </div>

      <header className="text-center max-w-3xl mx-auto mt-10 md:mt-20">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 mb-6 drop-shadow-sm">
          WriteFlow
        </h1>
        <p className="text-xl text-gray-400 mb-10 leading-relaxed font-light">
          A premium open space to share ideas. Explore modern engineering, seamless design, and insightful stories.
        </p>
        <Link to={user ? "/dashboard" : "/signup"}>
          <Button className="px-8 py-4 text-lg">
            <Sparkles className="w-5 h-5 mr-2" />
            {user ? "Go to Dashboard" : "Start Reading Now"}
          </Button>
        </Link>
      </header>

      <section className="mt-10 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-white">Latest Articles</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dummyPosts.map((post, idx) => (
            <Card key={idx} hoverEffect className="flex flex-col h-full bg-[#1e2029]/80 border-white/5">
              <span className="text-xs text-indigo-400 font-medium mb-3">{post.date}</span>
              <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
              <p className="text-gray-400 mb-6 flex-grow leading-relaxed text-sm">{post.excerpt}</p>
              <div className="mt-auto">
                <button className="text-indigo-300 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors group">
                  Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button className="bg-transparent border border-white/20 hover:bg-white/5 from-transparent to-transparent shadow-none">
            View All Posts
          </Button>
        </div>
      </section>

      {/* Decorative background glows */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-20 right-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
    </div>
  );
}
