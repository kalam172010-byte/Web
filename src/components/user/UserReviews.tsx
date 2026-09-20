import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Star, MessageSquare, CheckCircle, Send, ThumbsUp } from 'lucide-react';

export const UserReviews: React.FC = () => {
  const { reviews, panels, addReview } = useStore();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedPanelId, setSelectedPanelId] = useState(panels[0]?.id || '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview(selectedPanelId, rating, comment);
    setComment('');
    setShowReviewModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Reviews Header */}
      <div className="bg-gradient-to-r from-[#121826] via-[#162035] to-[#121826] border border-[#222f4b] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-gaming tracking-wide">
            CUSTOMER REVIEWS & PLAYER RATINGS
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Real feedback from verified Grandmasters and tournament rank pushers across Bangladesh, India, and Global servers.
          </p>
        </div>

        <button
          onClick={() => setShowReviewModal(true)}
          className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-amber-500/20 shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          Write a Review
        </button>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-[#111726] border border-[#202c44] rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-amber-500/30 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.userAvatar}
                    alt={rev.userName}
                    className="w-9 h-9 rounded-full object-cover border border-[#2a3959]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-white">{rev.userName}</h4>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5" /> Verified Buyer
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="px-2.5 py-1 rounded bg-[#162035] text-[11px] font-semibold text-amber-300 border border-[#253454] inline-block">
                {rev.panelName}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-2 border-t border-[#1a2336] flex items-center justify-between text-[11px] text-slate-500">
              <span>{rev.date}</span>
              <span className="flex items-center gap-1 text-slate-400">
                <ThumbsUp className="w-3 h-3 text-slate-500" /> Helpful
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111726] border border-[#243352] rounded-2xl w-full max-w-lg p-6 space-y-4 relative">
            <h3 className="text-lg font-bold text-white font-gaming">
              Submit Your Review
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-semibold">
                  Select Panel:
                </label>
                <select
                  value={selectedPanelId}
                  onChange={(e) => setSelectedPanelId(e.target.value)}
                  className="w-full bg-[#161f33] border border-[#283858] rounded-lg px-3 py-2 text-xs text-white"
                >
                  {panels.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-semibold">
                  Rating:
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= rating ? 'fill-amber-400' : 'text-slate-600'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-semibold">
                  Your Review / Experience:
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share how smooth the aimlock is, rank tier pushed, etc..."
                  className="w-full bg-[#161f33] border border-[#283858] rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
