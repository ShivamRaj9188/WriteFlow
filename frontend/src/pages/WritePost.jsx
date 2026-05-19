import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Rss, Eye, Edit3, Send, Loader2,
  CheckCircle2, AlertCircle, Trash2, RefreshCw, AlignLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createPost, updatePost, getPostFromApi, deletePost } from '../services/postsApi';

/* ─── constants ─── */
const TITLE_MAX = 200;
const CONTENT_MAX = 10000;

/* ─── helpers ─── */
function wordCount(text) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

function readTime(text) {
  const wpm = 200;
  const mins = Math.ceil(wordCount(text) / wpm);
  return mins < 1 ? '< 1 min read' : `${mins} min read`;
}

/* ─── Floating background orbs (shared style) ─── */
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-[#4f46e5] rounded-full opacity-[0.06] blur-[120px]" />
      <div className="absolute top-1/2 -right-60 w-[600px] h-[600px] bg-[#7c3aed] rounded-full opacity-[0.05] blur-[120px]" />
      <div className="absolute -bottom-60 left-1/3 w-[500px] h-[500px] bg-[#6366f1] rounded-full opacity-[0.04] blur-[100px]" />
    </div>
  );
}

/* ─── markdown-ish preview renderer ─── */
function Preview({ title, content }) {
  // Simple preview: newlines → paragraphs, **bold**, `code`
  const rendered = content
    .split(/\n{2,}/)
    .map((para) =>
      para
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br/>')
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="max-w-2xl mx-auto"
    >
      {title && (
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-10">
          {title}
        </h1>
      )}
      {rendered.map((para, i) => (
        <p
          key={i}
          className="text-gray-300 text-lg leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: para }}
        />
      ))}
    </motion.div>
  );
}

/* ─── main page ─── */
export default function WritePost() {
  const navigate = useNavigate();
  const { id: postId } = useParams();        // present on /post/:id/edit
  const { user } = useAuth();

  const isEditMode = Boolean(postId);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mode, setMode] = useState('write'); // 'write' | 'preview'

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const textareaRef = useRef(null);

  /* redirect if not logged in */
  useEffect(() => {
    if (!user) navigate('/login', { replace: true });
  }, [user, navigate]);

  /* fetch existing post in edit mode */
  useEffect(() => {
    if (!isEditMode) return;
    setFetchLoading(true);
    getPostFromApi(postId)
      .then((res) => {
        const post = res.data;
        // Only the author can edit
        if (post.author?.username !== user?.username) {
          navigate('/', { replace: true });
          return;
        }
        setTitle(post.title || '');
        setContent(post.content || '');
      })
      .catch(() => navigate('/', { replace: true }))
      .finally(() => setFetchLoading(false));
  }, [postId, isEditMode, user, navigate]);

  /* auto-resize textarea */
  useEffect(() => {
    if (textareaRef.current && mode === 'write') {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 320)}px`;
    }
  }, [content, mode]);

  const handleSubmit = useCallback(async () => {
    if (!title.trim()) { setErrorMsg('Title is required.'); setStatus('error'); return; }
    if (!content.trim()) { setErrorMsg('Content is required.'); setStatus('error'); return; }
    if (title.length > TITLE_MAX) { setErrorMsg(`Title must be ≤ ${TITLE_MAX} characters.`); setStatus('error'); return; }
    if (content.length > CONTENT_MAX) { setErrorMsg(`Content must be ≤ ${CONTENT_MAX} characters.`); setStatus('error'); return; }

    setLoading(true);
    setStatus(null);
    try {
      const fn = isEditMode
        ? updatePost(postId, title.trim(), content.trim())
        : createPost(title.trim(), content.trim());
      const res = await fn;
      setStatus('success');
      setTimeout(() => navigate(`/post/${res.data.id}`), 1200);
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.title
        || 'Something went wrong. Please try again.';
      setErrorMsg(msg);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }, [title, content, isEditMode, postId, navigate]);

  const handleDelete = useCallback(async () => {
    if (!deleteConfirm) { setDeleteConfirm(true); return; }
    setDeleting(true);
    try {
      await deletePost(postId);
      navigate('/', { replace: true });
    } catch {
      setErrorMsg('Failed to delete post.');
      setStatus('error');
      setDeleting(false);
      setDeleteConfirm(false);
    }
  }, [deleteConfirm, postId, navigate]);

  const titleLeft = TITLE_MAX - title.length;
  const contentLeft = CONTENT_MAX - content.length;
  const canSubmit = title.trim().length > 0 && content.trim().length > 0 && !loading;

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#6366f1] animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-purple-500/30">
      <BackgroundOrbs />

      {/* ── Top Nav ── */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between border-b border-white/[0.04] bg-[#030303]/90 backdrop-blur-xl">
        {/* Back + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
          <div className="h-4 w-px bg-white/10" />
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center">
              <Rss className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold text-white tracking-tight">WriteFlow</span>
          </Link>
        </div>

        {/* Mode toggle + Actions */}
        <div className="flex items-center gap-3">
          {/* Write / Preview toggle */}
          <div className="flex items-center rounded-full bg-white/[0.04] border border-white/[0.08] p-1 gap-1">
            {[
              { id: 'write', icon: <Edit3 className="w-3.5 h-3.5" />, label: 'Write' },
              { id: 'preview', icon: <Eye className="w-3.5 h-3.5" />, label: 'Preview' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  mode === m.id
                    ? 'bg-[#4f46e5] text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>

          {/* Delete (edit mode only) */}
          {isEditMode && (
            <motion.button
              onClick={handleDelete}
              disabled={deleting}
              animate={deleteConfirm ? { scale: [1, 1.04, 1] } : {}}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-all ${
                deleteConfirm
                  ? 'border-red-500/60 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                  : 'border-white/[0.08] text-gray-400 hover:text-red-400 hover:border-red-500/30'
              }`}
            >
              {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
              {deleteConfirm ? 'Confirm delete?' : 'Delete'}
            </motion.button>
          )}

          {/* Publish / Save button */}
          <motion.button
            onClick={handleSubmit}
            disabled={!canSubmit}
            whileTap={canSubmit ? { scale: 0.97 } : {}}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
              canSubmit
                ? 'bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50'
                : 'bg-white/[0.04] text-gray-600 cursor-not-allowed border border-white/[0.06]'
            }`}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isEditMode ? 'Save Changes' : 'Publish'}
          </motion.button>
        </div>
      </nav>

      {/* ── Status Toast ── */}
      <AnimatePresence>
        {status && (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: -16, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -12, x: '-50%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-1/2 z-[60] flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold shadow-xl border backdrop-blur-xl"
            style={{
              background: status === 'success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
              borderColor: status === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)',
              color: status === 'success' ? '#6ee7b7' : '#fca5a5',
            }}
          >
            {status === 'success' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {status === 'success'
              ? (isEditMode ? 'Post updated! Redirecting…' : 'Published! Redirecting…')
              : errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Editor / Preview area ── */}
      <main className="pt-[73px] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-12">

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 mb-8 text-xs text-gray-600 font-medium"
          >
            <span className="flex items-center gap-1.5">
              <AlignLeft className="w-3.5 h-3.5" />
              {wordCount(content).toLocaleString()} words
            </span>
            <span>·</span>
            <span>{readTime(content)}</span>
            <span>·</span>
            <span className={contentLeft < 500 ? 'text-orange-400' : ''}>
              {contentLeft.toLocaleString()} chars remaining
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            {mode === 'write' ? (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {/* Title */}
                <div className="relative mb-6">
                  <input
                    id="post-title"
                    type="text"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); setStatus(null); }}
                    placeholder="Your story title…"
                    maxLength={TITLE_MAX}
                    className="w-full bg-transparent text-4xl md:text-5xl font-black text-white placeholder-white/10 tracking-tighter leading-tight border-none outline-none resize-none py-2"
                  />
                  <div className="h-px bg-gradient-to-r from-[#4f46e5]/50 via-[#7c3aed]/20 to-transparent mt-2" />
                  {titleLeft < 50 && (
                    <span className={`absolute right-0 bottom-0 text-[11px] font-medium ${titleLeft < 10 ? 'text-red-400' : 'text-gray-600'}`}>
                      {titleLeft}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="relative">
                  <textarea
                    id="post-content"
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => { setContent(e.target.value); setStatus(null); }}
                    placeholder={`Start writing your story…\n\nUse **bold**, *italic*, or \`code\` for formatting.\nSeparate paragraphs with a blank line.`}
                    maxLength={CONTENT_MAX}
                    className="w-full min-h-[320px] bg-transparent text-gray-300 text-lg leading-relaxed placeholder-white/[0.06] border-none outline-none resize-none font-light"
                    style={{ lineHeight: '1.8', fontFamily: "'SF Mono', 'Fira Code', monospace" }}
                    onKeyDown={(e) => {
                      // Tab key → insert 2 spaces
                      if (e.key === 'Tab') {
                        e.preventDefault();
                        const start = e.target.selectionStart;
                        const end = e.target.selectionEnd;
                        setContent(content.substring(0, start) + '  ' + content.substring(end));
                        setTimeout(() => {
                          if (textareaRef.current) {
                            textareaRef.current.selectionStart = start + 2;
                            textareaRef.current.selectionEnd = start + 2;
                          }
                        }, 0);
                      }
                    }}
                  />
                </div>

                {/* Formatting hint */}
                <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-gray-700">
                  <span><code className="bg-white/[0.04] px-1.5 py-0.5 rounded text-gray-500">**text**</code> bold</span>
                  <span><code className="bg-white/[0.04] px-1.5 py-0.5 rounded text-gray-500">*text*</code> italic</span>
                  <span><code className="bg-white/[0.04] px-1.5 py-0.5 rounded text-gray-500">`code`</code> inline code</span>
                  <span><code className="bg-white/[0.04] px-1.5 py-0.5 rounded text-gray-500">blank line</code> new paragraph</span>
                </div>
              </motion.div>
            ) : (
              /* Preview mode */
              <Preview title={title} content={content} />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
