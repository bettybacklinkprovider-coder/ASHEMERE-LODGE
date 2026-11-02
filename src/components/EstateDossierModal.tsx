import React, { useEffect } from 'react';
import { X, Compass, ArrowUpRight, Check } from 'lucide-react';
import { Estate } from '../data/estates';
import { ResilientImage } from './ResilientImage';

interface EstateDossierModalProps {
  estate: Estate | null;
  unitSystem: 'metric' | 'imperial';
  onClose: () => void;
  onScheduleViewing: (estateId: string) => void;
  onOpenInSpatialPlan: (estateId: string) => void;
}

export const EstateDossierModal: React.FC<EstateDossierModalProps> = ({
  estate,
  unitSystem,
  onClose,
  onScheduleViewing,
  onOpenInSpatialPlan,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (estate) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [estate, onClose]);

  if (!estate) return null;

  const formatArea = (sqm: number) =>
    unitSystem === 'imperial'
      ? `${Math.round(sqm * 10.7639).toLocaleString()} SQ FT`
      : `${sqm.toLocaleString()} SQ M`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-modal-title"
    >
      <div className="relative w-full max-w-6xl glass-shell-elevated bg-[#141414] border border-[#F2B36B]/25 my-auto overflow-hidden">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 px-6 md:px-10 py-5 border-b border-white/[0.08] bg-[#0F0F0F]">
          <div className="flex items-center gap-3">
            <span className="type-label-sm text-[#F2B36B] font-mono-tech">
              MONOGRAPH FOLIO · {estate.index}
            </span>
            <span className="text-white/20" aria-hidden="true">
              ·
            </span>
            <span className="type-label-sm text-[#9E9E9E]">{estate.location}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Dossier Modal"
            className="btn-ghost-obsidian px-3 py-1.5 type-label-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[82vh] overflow-y-auto">
          {/* Left Visual Column */}
          <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-full bg-[#0F0F0F] border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between">
            <div className="relative flex-1 min-h-[340px] overflow-hidden">
              <ResilientImage
                src={estate.imageUrl}
                alt={estate.imageAlt}
                fallbackTitle={estate.title}
                fallbackSubtitle={estate.coordinates}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-black/30" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="type-label-sm text-[#F2B36B] mb-1 font-mono-tech">
                    {estate.coordinates} · ELEV {estate.elevationM}M
                  </p>
                  <h2 id="dossier-modal-title" className="type-headline-lg text-[#FFFFFF]">
                    {estate.title}
                  </h2>
                </div>
                <div className="glass-surface px-3.5 py-2 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#F2B36B]" />
                  <span className="type-label-sm text-[#FFFFFF] font-mono-tech">
                    {estate.priceGuidance}
                  </span>
                </div>
              </div>
            </div>

            {/* 4-Column Key Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] border-t border-white/[0.08] bg-[#0F0F0F]">
              <div className="p-4">
                <div className="type-label-sm text-[#9E9E9E] mb-1">Internal Area</div>
                <div className="type-body-md text-[#FFFFFF] font-mono-tech tabular-nums">
                  {formatArea(estate.totalAreaSqm)}
                </div>
              </div>
              <div className="p-4">
                <div className="type-label-sm text-[#9E9E9E] mb-1">Sanctuary Domain</div>
                <div className="type-body-md text-[#FFFFFF] font-mono-tech tabular-nums">
                  {estate.siteAreaHectares} Hectares
                </div>
              </div>
              <div className="p-4">
                <div className="type-label-sm text-[#9E9E9E] mb-1">Structural Glass</div>
                <div className="type-body-md text-[#FFFFFF] font-mono-tech tabular-nums">
                  {formatArea(estate.glazingAreaSqm)}
                </div>
              </div>
              <div className="p-4">
                <div className="type-label-sm text-[#9E9E9E] mb-1">Noise Floor</div>
                <div className="type-body-md text-[#F2B36B] font-mono-tech tabular-nums">
                  {estate.acousticRatingDb} dBA
                </div>
              </div>
            </div>
          </div>

          {/* Right Narrative & Specifications Column */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-[#141414]">
            <div>
              <div className="mb-6">
                <div className="type-label-sm text-[#9E9E9E] mb-2">
                  ARCHITECTURAL THESIS · {estate.architect}
                </div>
                <p className="type-body-md text-[#FFFFFF] mb-4">{estate.leadNarrative}</p>
                <p className="type-body-sm text-[#CFCFCF]">{estate.architecturalThesis}</p>
              </div>

              {/* Specification Table */}
              <div className="mb-6">
                <div className="type-label-md text-[#F2B36B] pb-2 border-b border-white/[0.08] mb-2">
                  Technical &amp; Material Provenance
                </div>
                <div className="divide-y divide-white/[0.06]">
                  {estate.specifications.slice(0, 6).map((spec) => (
                    <div
                      key={spec.label}
                      className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
                    >
                      <span className="type-label-sm text-[#9E9E9E] shrink-0">{spec.label}</span>
                      <span className="type-body-sm text-[#FFFFFF] sm:text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Acquisition Inclusion Notes */}
              <div className="p-4 bg-[#0F0F0F] border border-white/[0.08] mb-6">
                <div className="type-label-sm text-[#CFCFCF] mb-2">
                  INCLUDED WITH PRIVATE TREATY CONVEYANCE
                </div>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2 type-body-sm text-[#9E9E9E]">
                    <Check className="w-3.5 h-3.5 text-[#F2B36B] shrink-0" />
                    <span>Complete bound linen architectural monograph &amp; structural CAD archive</span>
                  </li>
                  <li className="flex items-center gap-2 type-body-sm text-[#9E9E9E]">
                    <Check className="w-3.5 h-3.5 text-[#F2B36B] shrink-0" />
                    <span>Bespoke Loose &amp; Fixed Millwork by {estate.architect}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onScheduleViewing(estate.id);
                }}
                className="btn-primary-amber flex-1 py-3.5 px-5 type-label-md font-medium flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Schedule Private Viewing</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenInSpatialPlan(estate.id);
                }}
                className="btn-ghost-obsidian py-3.5 px-5 type-label-md flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Inspect Spatial Plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
