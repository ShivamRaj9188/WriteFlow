import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { ArrowUpRight } from 'lucide-react';

export default function ArticleCard({ post, className }) {
  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-col h-full rounded-2xl overflow-hidden',
          'border border-white/[0.05] bg-[#0c0c0c]/80',
          'transition-all duration-300 hover:border-white/[0.15] hover:bg-[#111111]',
          className
        )
      )}
    >
      {/* Top Image Section */}
      <div className="relative h-48 w-full overflow-hidden p-2 pb-0 rounded-t-2xl">
        <div className="w-full h-full rounded-xl overflow-hidden relative">
           <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-500" 
           />
           {/* Up right Arrow circle in bottom right of image */}
           <div className="absolute bottom-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors cursor-pointer group">
              <ArrowUpRight className="w-4 h-4 text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5 space-y-3">
        {/* Tag wrapper */}
        <div>
          <span className="text-[11px] font-semibold text-[#6366f1] tracking-wider uppercase">
            {post.tag || "UI/UX Design"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white leading-tight mt-1">{post.title}</h3>
        
        {/* Excerpt */}
        <p className="text-sm text-gray-500 font-normal leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex-grow"></div>

        {/* Footer info (Author & Time) */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.05]">
          <div className="flex items-center space-x-2">
            <img 
              src={post.authorAvatar} 
              alt={post.authorName} 
              className="w-6 h-6 rounded-full object-cover border border-white/10"
            />
            <span className="text-xs font-semibold text-gray-300">{post.authorName}</span>
          </div>
          <span className="text-xs text-gray-500 font-medium">{post.readTime}</span>
        </div>
      </div>
    </div>
  );
}
