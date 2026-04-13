"use client";

export function BulkOrderForm() {
  return (
    <form
      className="card-surface rounded-xl p-8 border border-violet/15"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
            Business Name *
          </label>
          <input type="text" className="form-input" placeholder="Your company" required />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
            Contact Name *
          </label>
          <input type="text" className="form-input" placeholder="Your name" required />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mt-5">
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
            Email *
          </label>
          <input type="email" className="form-input" placeholder="you@company.com" required />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
            Phone
          </label>
          <input type="tel" className="form-input" placeholder="(207) 555-0000" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mt-5">
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
            Project Type *
          </label>
          <select className="form-input" required>
            <option value="">Select a type</option>
            <option>Client Gifts</option>
            <option>Employee Gifts</option>
            <option>Event Items</option>
            <option>Promotional Products</option>
            <option>Branded Merchandise</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
            Estimated Quantity *
          </label>
          <input type="text" className="form-input" placeholder="e.g. 50, 100, 500" required />
        </div>
      </div>

      <div className="mt-5">
        <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
          Timeline
        </label>
        <select className="form-input">
          <option value="">Select timeline</option>
          <option>No Rush</option>
          <option>2-4 Weeks</option>
          <option>Under 2 Weeks</option>
        </select>
      </div>

      <div className="mt-5">
        <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
          Project Details *
        </label>
        <textarea
          className="form-input min-h-[120px] resize-y"
          placeholder="Tell us about your project, what products you're interested in, and any branding requirements..."
          required
        />
      </div>

      <div className="mt-5">
        <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
          Upload Logo <span className="text-cream-dim/40">(optional)</span>
        </label>
        <div className="border border-dashed border-violet/20 rounded-lg p-6 text-center cursor-pointer hover:border-violet/40 transition-colors">
          <svg className="w-8 h-8 text-violet/40 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <p className="text-sm text-cream-dim">
            Drag files here or <span className="text-violet underline">browse</span>
          </p>
          <p className="text-xs text-cream-dim/50 mt-1">SVG, PNG, AI, PDF up to 10MB</p>
        </div>
      </div>

      <button type="submit" className="btn-primary w-full mt-8 text-center">
        Request Your Bulk Quote
      </button>
    </form>
  );
}
