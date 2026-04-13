"use client";

export function QuoteForm() {
  return (
    <form
      className="card-surface rounded-xl p-8 border border-violet/15"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
            Name *
          </label>
          <input type="text" className="form-input" placeholder="Your name" required />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
            Email *
          </label>
          <input type="email" className="form-input" placeholder="your@email.com" required />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mt-5">
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
            Phone <span className="text-cream-dim/40">(optional)</span>
          </label>
          <input type="tel" className="form-input" placeholder="(207) 555-0000" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
            Project Type *
          </label>
          <select className="form-input" required>
            <option value="">Select a type</option>
            <option>Personal Gift</option>
            <option>Wedding / Event</option>
            <option>Business / Bulk</option>
            <option>Memorial</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mt-5">
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
            Material Preference
          </label>
          <select className="form-input">
            <option value="">No preference</option>
            <option>Wood</option>
            <option>Metal</option>
            <option>Acrylic</option>
            <option>Glass</option>
            <option>Slate</option>
            <option>Leather</option>
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
            Estimated Quantity
          </label>
          <input type="text" className="form-input" placeholder="e.g. 1, 25, 100+" />
        </div>
      </div>

      <div className="mt-5">
        <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
          Project Description *
        </label>
        <textarea
          className="form-input min-h-[120px] resize-y"
          placeholder="Tell us about your project, what you'd like engraved, and any special requirements..."
          required
        />
      </div>

      <div className="mt-5">
        <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
          Upload Artwork <span className="text-cream-dim/40">(optional)</span>
        </label>
        <div className="border border-dashed border-violet/20 rounded-lg p-6 text-center cursor-pointer hover:border-violet/40 transition-colors">
          <svg className="w-8 h-8 text-violet/40 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <p className="text-sm text-cream-dim">
            Drag files here or{" "}
            <span className="text-violet underline">browse</span>
          </p>
          <p className="text-xs text-cream-dim/50 mt-1">
            SVG, PNG, AI, PDF, JPG up to 10MB
          </p>
        </div>
      </div>

      <button type="submit" className="btn-primary w-full mt-8 text-center">
        Request Your Free Quote
      </button>
    </form>
  );
}
