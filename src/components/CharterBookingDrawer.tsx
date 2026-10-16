import React, { useState } from 'react';
import { Beach, CharterVessel } from '../types/beach';
import { X, Calendar, Users, Anchor, CheckCircle, Shield, Clock } from 'lucide-react';

interface CharterBookingDrawerProps {
  beach: Beach;
  onClose: () => void;
}

export const CharterBookingDrawer: React.FC<CharterBookingDrawerProps> = ({
  beach,
  onClose,
}) => {
  const charters = beach.fishingData.activeCharters;
  const [selectedCharterId, setSelectedCharterId] = useState<string>(
    charters[0]?.id || ''
  );
  const [tripType, setTripType] = useState<'half_day' | 'full_day'>('half_day');
  const [date, setDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [partySize, setPartySize] = useState<number>(4);
  const [anglerName, setAnglerName] = useState<string>('');
  const [anglerEmail, setAnglerEmail] = useState<string>('');
  const [anglerPhone, setAnglerPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [inquiryId, setInquiryId] = useState<string>('');

  const activeCharter = charters.find((c) => c.id === selectedCharterId) || charters[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anglerName || !anglerEmail || !anglerPhone) return;

    // Generate mock inquiry ID for frontend demo
    const generatedId = `WR-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryId(generatedId);
    setSubmitted(true);
  };

  const estimatedPrice =
    tripType === 'half_day' ? activeCharter?.halfDayRate : activeCharter?.fullDayRate;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <Anchor className="w-5 h-5 text-sky-600" />
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Charter Booking Inquiry
              </h3>
              <p className="text-xs text-slate-500">
                {beach.name} · {beach.fishingData.marinaName || beach.region}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success State */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                Inquiry Sent to Captain
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                Your charter request for <strong className="text-slate-900">{activeCharter?.boatName}</strong> with{' '}
                <strong className="text-slate-900">{activeCharter?.captain}</strong> has been received. Captain will contact you via phone or email within 2 hours.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">Inquiry Reference:</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900">{inquiryId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Requested Date:</span>
                  <span className="font-semibold text-slate-900">{date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Trip Format:</span>
                  <span className="font-semibold text-slate-900 capitalize">
                    {tripType.replace('_', ' ')} (Est. ${estimatedPrice})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Anglers:</span>
                  <span className="font-semibold text-slate-900">{partySize} Persons</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Charter Vessel Picker */}
              {charters.length > 1 && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Charter Vessel
                  </label>
                  <div className="space-y-2">
                    {charters.map((c) => (
                      <label
                        key={c.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedCharterId === c.id
                            ? 'border-sky-500 bg-sky-50/50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="charter"
                            value={c.id}
                            checked={selectedCharterId === c.id}
                            onChange={() => setSelectedCharterId(c.id)}
                            className="text-sky-600 focus:ring-sky-500"
                          />
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{c.boatName}</div>
                            <div className="text-xs text-slate-500">
                              {c.captain} · {c.boatLengthFt}ft {c.boatType}
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-xs font-mono tabular-nums font-bold text-slate-900">
                          ${c.halfDayRate} / 4hr
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Trip Length Toggle */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Trip Duration
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTripType('half_day')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      tripType === 'half_day'
                        ? 'border-sky-500 bg-sky-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900 text-sm">Half Day (4 Hours)</div>
                    <div className="text-xs text-slate-500 mt-0.5">Inshore / Reef / Drift</div>
                    <div className="text-xs font-mono tabular-nums font-bold text-sky-700 mt-2">
                      ${activeCharter?.halfDayRate} Total
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTripType('full_day')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      tripType === 'full_day'
                        ? 'border-sky-500 bg-sky-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900 text-sm">Full Day (8 Hours)</div>
                    <div className="text-xs text-slate-500 mt-0.5">Offshore Gulf Stream</div>
                    <div className="text-xs font-mono tabular-nums font-bold text-sky-700 mt-2">
                      ${activeCharter?.fullDayRate} Total
                    </div>
                  </button>
                </div>
              </div>

              {/* Date & Anglers Count */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Anglers (Max 6)
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(parseInt(e.target.value, 10))}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} Angler{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Lead Angler Contact Details */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Lead Angler Contact Information
                </span>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={anglerName}
                    onChange={(e) => setAnglerName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={anglerEmail}
                    onChange={(e) => setAnglerEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Phone"
                    value={anglerPhone}
                    onChange={(e) => setAnglerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Target species preference or experience notes (optional)..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                  />
                </div>
              </div>

              {/* Safety guarantee */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>USCG Licensed Captains & Insured Vessels · Free Weather Cancellation</span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Estimated Trip Total</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900 text-lg">
                    ${estimatedPrice}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors shadow-xs"
                  >
                    Send Request to Captain
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
