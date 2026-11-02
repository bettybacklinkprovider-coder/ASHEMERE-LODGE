import React, { useState } from 'react';
import { Compass, Maximize2, Minimize2, Layers, Eye, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { Estate, RoomHotspot } from '../data/estates';
import { ResilientImage } from './ResilientImage';

interface SpatialPlanViewerProps {
  estate: Estate;
  unitSystem: 'metric' | 'imperial';
  onToggleUnit: (unit: 'metric' | 'imperial') => void;
  onRequestViewing: (estateId: string, roomName?: string) => void;
}

export const SpatialPlanViewer: React.FC<SpatialPlanViewerProps> = ({
  estate,
  unitSystem,
  onToggleUnit,
  onRequestViewing,
}) => {
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(estate.hotspots[0]?.id || '');
  const [viewMode, setViewMode] = useState<'blueprint' | 'photographic'>('blueprint');
  const [lightingMode, setLightingMode] = useState<'twilight' | 'nocturnal'>('nocturnal');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeHotspot: RoomHotspot =
    estate.hotspots.find((h) => h.id === selectedHotspotId) || estate.hotspots[0];

  const formatArea = (sqm: number) => {
    if (unitSystem === 'imperial') {
      return `${Math.round(sqm * 10.7639).toLocaleString()} SQ FT`;
    }
    return `${sqm.toLocaleString()} SQ M`;
  };

  const formatHeight = (meters: number) => {
    if (meters === 0) return 'Open Sky';
    if (unitSystem === 'imperial') {
      return `${(meters * 3.28084).toFixed(1)} FT`;
    }
    return `${meters.toFixed(1)} M`;
  };

  const viewerContent = (
    <div
      className={`${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#0F0F0F] flex flex-col justify-between p-6 md:p-12 overflow-y-auto'
          : 'relative w-full bg-[#141414] border border-white/[0.08]'
      }`}
    >
      {/* Top Technical Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-white/[0.08] bg-[#0F0F0F]/90">
        <div className="flex items-center gap-4">
          <span className="type-label-sm text-[#F2B36B] font-mono-tech">
            ARCH-PLAN · {estate.index}
          </span>
          <span className="text-white/20" aria-hidden="true">
            /
          </span>
          <span className="type-label-md text-[#FFFFFF]">{estate.title}</span>
          <span className="hidden sm:inline text-white/20" aria-hidden="true">
            ·
          </span>
          <span className="hidden sm:inline type-label-sm text-[#9E9E9E] font-mono-tech">
            {estate.coordinates}
          </span>
        </div>

        {/* Interactive Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center border border-white/[0.08] bg-[#141414]">
            <button
              type="button"
              onClick={() => setViewMode('blueprint')}
              className={`px-3 py-1.5 type-label-sm flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'blueprint'
                  ? 'border border-[#F2B36B] text-[#FFFFFF] bg-[#181818]'
                  : 'text-[#9E9E9E] hover:text-[#FFFFFF]'
              }`}
            >
              {viewMode === 'blueprint' && (
                <span className="w-[3px] h-[3px] bg-[#F2B36B] shrink-0" />
              )}
              <Layers className="w-3 h-3" />
              <span>CAD Plan + Overlay</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('photographic')}
              className={`px-3 py-1.5 type-label-sm flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'photographic'
                  ? 'border border-[#F2B36B] text-[#FFFFFF] bg-[#181818]'
                  : 'text-[#9E9E9E] hover:text-[#FFFFFF]'
              }`}
            >
              {viewMode === 'photographic' && (
                <span className="w-[3px] h-[3px] bg-[#F2B36B] shrink-0" />
              )}
              <Eye className="w-3 h-3" />
              <span>Atmospheric View</span>
            </button>
          </div>

          {/* Lighting Calibration */}
          <div className="hidden md:flex items-center border border-white/[0.08] bg-[#141414]">
            <button
              type="button"
              onClick={() => setLightingMode('twilight')}
              className={`px-3 py-1.5 type-label-sm flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lightingMode === 'twilight'
                  ? 'border border-[#F2B36B] text-[#FFFFFF] bg-[#181818]'
                  : 'text-[#9E9E9E] hover:text-[#FFFFFF]'
              }`}
            >
              <Sun className="w-3 h-3" />
              <span>Dusk 2700K</span>
            </button>
            <button
              type="button"
              onClick={() => setLightingMode('nocturnal')}
              className={`px-3 py-1.5 type-label-sm flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lightingMode === 'nocturnal'
                  ? 'border border-[#F2B36B] text-[#FFFFFF] bg-[#181818]'
                  : 'text-[#9E9E9E] hover:text-[#FFFFFF]'
              }`}
            >
              <Moon className="w-3 h-3" />
              <span>Nocturnal 2200K</span>
            </button>
          </div>

          {/* Unit System Switch */}
          <div className="flex items-center border border-white/[0.08] bg-[#141414]">
            <button
              type="button"
              onClick={() => onToggleUnit('metric')}
              className={`px-2.5 py-1.5 type-label-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                unitSystem === 'metric'
                  ? 'border border-[#F2B36B] text-[#FFFFFF] bg-[#181818]'
                  : 'text-[#9E9E9E] hover:text-[#FFFFFF]'
              }`}
            >
              SQ M
            </button>
            <button
              type="button"
              onClick={() => onToggleUnit('imperial')}
              className={`px-2.5 py-1.5 type-label-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                unitSystem === 'imperial'
                  ? 'border border-[#F2B36B] text-[#FFFFFF] bg-[#181818]'
                  : 'text-[#9E9E9E] hover:text-[#FFFFFF]'
              }`}
            >
              SQ FT
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            aria-label={isFullscreen ? 'Exit Fullscreen Plan Viewer' : 'Enter Fullscreen Plan Viewer'}
            className="btn-ghost-obsidian px-3 py-1.5 type-label-sm flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Fullscreen</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Split Canvas + Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Interactive Spatial Viewport (8 Columns) */}
        <div className="lg:col-span-8 relative min-h-[460px] md:min-h-[580px] bg-[#0F0F0F] overflow-hidden select-none flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08]">
          {/* Underlying Estate Photography */}
          <ResilientImage
            src={estate.imageUrl}
            alt={estate.imageAlt}
            fallbackTitle={estate.title}
            fallbackSubtitle={estate.coordinates}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              viewMode === 'blueprint'
                ? lightingMode === 'nocturnal'
                  ? 'opacity-35 brightness-75 contrast-125 saturate-75'
                  : 'opacity-50 brightness-95 saturate-90'
                : lightingMode === 'nocturnal'
                  ? 'opacity-90 brightness-90 contrast-110'
                  : 'opacity-100 brightness-105'
            }`}
          />

          {/* Directional Obsidian Vignette Scrim */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.85) 100%)',
            }}
          />

          {/* Warm Amber Hearth Glow Simulation */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: lightingMode === 'nocturnal' ? 0.85 : 0.4,
              background: `radial-gradient(circle at ${activeHotspot.xPercent}% ${activeHotspot.yPercent}%, rgba(242, 179, 107, 0.22) 0%, transparent 45%)`,
            }}
          />

          {/* Architectural CAD Vector Overlay & Hairline Crosshairs */}
          {viewMode === 'blueprint' && (
            <svg
              viewBox="0 0 1000 650"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Structural Grid Lines */}
              <g stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1">
                <line x1="150" y1="0" x2="150" y2="650" strokeDasharray="4 6" />
                <line x1="350" y1="0" x2="350" y2="650" strokeDasharray="4 6" />
                <line x1="500" y1="0" x2="500" y2="650" />
                <line x1="650" y1="0" x2="650" y2="650" strokeDasharray="4 6" />
                <line x1="850" y1="0" x2="850" y2="650" strokeDasharray="4 6" />
                <line x1="0" y1="160" x2="1000" y2="160" strokeDasharray="4 6" />
                <line x1="0" y1="325" x2="1000" y2="325" />
                <line x1="0" y1="490" x2="1000" y2="490" strokeDasharray="4 6" />
              </g>

              {/* Architectural Footprint Plan Vectors */}
              <g fill="none" stroke="rgba(207, 207, 207, 0.38)" strokeWidth="1.25">
                {/* Outer Plinth Boundary */}
                <rect x="140" y="140" width="720" height="370" />
                {/* Structural Core Walls */}
                <rect x="210" y="190" width="580" height="260" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1.5" />
                {/* Interior Partition & Glazing Axes */}
                <line x1="410" y1="190" x2="410" y2="450" />
                <line x1="620" y1="190" x2="620" y2="450" />
                <line x1="210" y1="325" x2="790" y2="325" strokeDasharray="8 4" />
                {/* Reflection Pool / Cantilever Axis */}
                <rect
                  x="310"
                  y="450"
                  width="380"
                  height="95"
                  stroke="rgba(242, 179, 107, 0.35)"
                  strokeDasharray="3 3"
                />
                {/* Hearth Core Focal Circle (permitted functional marker) */}
                <circle
                  cx={activeHotspot.xPercent * 10}
                  cy={activeHotspot.yPercent * 6.5}
                  r="48"
                  stroke="rgba(242, 179, 107, 0.4)"
                  strokeDasharray="2 4"
                />
              </g>

              {/* Active Hotspot Crosshair Axis Lines */}
              <g stroke="rgba(242, 179, 107, 0.35)" strokeWidth="0.8" strokeDasharray="4 4">
                <line
                  x1={activeHotspot.xPercent * 10}
                  y1="0"
                  x2={activeHotspot.xPercent * 10}
                  y2="650"
                />
                <line
                  x1="0"
                  y1={activeHotspot.yPercent * 6.5}
                  x2="1000"
                  y2={activeHotspot.yPercent * 6.5}
                />
              </g>

              {/* Technical Scale Readouts */}
              <g fill="#9E9E9E" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
                <text x="155" y="130">DATUM +0.00M · STRUCTURAL AXIS A-F</text>
                <text x="670" y="535">REFLECTION BASIN AXIS · 18.50M</text>
              </g>
            </svg>
          )}

          {/* Compass Orientator Micro-Accent (Circular Geometry permitted by spec for compass orientators) */}
          <div
            className="absolute top-5 left-5 z-10 flex items-center gap-3 px-3.5 py-2 glass-surface"
            title="Solar & Topographical Orientation"
          >
            <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center relative">
              <Compass
                className="w-4 h-4 text-[#F2B36B] transition-transform duration-500"
                style={{ transform: `rotate(${estate.compassBearing}deg)` }}
              />
            </div>
            <div>
              <div className="type-label-sm text-[#FFFFFF] font-mono-tech">
                {estate.compassBearing}° AZIMUTH
              </div>
              <div className="text-[10px] text-[#9E9E9E] font-mono-tech">
                ELEV {estate.elevationM}M ASL
              </div>
            </div>
          </div>

          {/* Interactive Room Hotspot Pins (Circular 50% radius allowed strictly for functional markers) */}
          {estate.hotspots.map((hotspot) => {
            const isSelected = hotspot.id === activeHotspot.id;
            return (
              <button
                key={hotspot.id}
                type="button"
                onClick={() => setSelectedHotspotId(hotspot.id)}
                style={{
                  left: `${hotspot.xPercent}%`,
                  top: `${hotspot.yPercent}%`,
                }}
                aria-label={`Inspect room ${hotspot.index}: ${hotspot.name}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none cursor-pointer"
              >
                <span className="relative flex items-center justify-center">
                  {/* Outer Halo Ring */}
                  <span
                    className={`w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#F2B36B]/25 border border-[#F2B36B] scale-110 shadow-[0_0_24px_rgba(242,179,107,0.45)]'
                        : 'bg-[#0F0F0F]/80 border border-white/30 hover:border-[#F2B36B]'
                    }`}
                  >
                    {/* Inner Focal Core */}
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        isSelected ? 'bg-[#F2B36B]' : 'bg-[#FFFFFF] group-hover:bg-[#F2B36B]'
                      }`}
                    />
                  </span>

                  {/* Floating Rectangular Index Tag */}
                  <span
                    className={`ml-2 px-2.5 py-1 type-label-sm font-mono-tech whitespace-nowrap transition-all ${
                      isSelected
                        ? 'glass-shell-elevated text-[#FFFFFF] border-[#F2B36B]'
                        : 'glass-surface text-[#CFCFCF] opacity-85 group-hover:opacity-100'
                    }`}
                  >
                    {hotspot.index} · {hotspot.name}
                  </span>
                </span>
              </button>
            );
          })}

          {/* Floating Translucent Glass Control Bar Centered at Base */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 max-w-[92%] overflow-x-auto glass-shell-elevated px-3 py-2 flex items-center gap-1.5">
            {estate.hotspots.map((hotspot) => {
              const active = hotspot.id === activeHotspot.id;
              return (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => setSelectedHotspotId(hotspot.id)}
                  className={`px-3 py-1.5 type-label-sm transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'border border-[#F2B36B] text-[#FFFFFF] bg-[#181818]'
                      : 'border border-transparent text-[#9E9E9E] hover:text-[#FFFFFF]'
                  }`}
                >
                  {active && <span className="w-[3px] h-[3px] bg-[#F2B36B] shrink-0" />}
                  <span className="font-mono-tech text-[#F2B36B]">{hotspot.index}</span>
                  <span>{hotspot.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Architectural Spatial Readout Panel (4 Columns) */}
        <div className="lg:col-span-4 p-6 md:p-8 flex flex-col justify-between bg-[#141414]">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
              <div>
                <p className="type-label-sm text-[#F2B36B] mb-1">
                  ZONE {activeHotspot.index} · SPATIAL TELEMETRY
                </p>
                <h3 className="type-headline-md text-[#FFFFFF]">{activeHotspot.name}</h3>
              </div>
              <span className="type-label-sm text-[#9E9E9E] font-mono-tech">
                {activeHotspot.zone}
              </span>
            </div>

            <p className="type-body-md text-[#CFCFCF] mb-8">{activeHotspot.description}</p>

            {/* Tabular Spatial Readouts */}
            <div className="border-t border-white/[0.06] divide-y divide-white/[0.06] mb-8">
              <div className="py-3 flex items-center justify-between gap-4">
                <span className="type-label-md text-[#9E9E9E]">Net Floor Area</span>
                <span className="type-body-md text-[#FFFFFF] font-mono-tech tabular-nums">
                  {formatArea(activeHotspot.areaSqm)}
                </span>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <span className="type-label-md text-[#9E9E9E]">Soffit / Datum Height</span>
                <span className="type-body-md text-[#FFFFFF] font-mono-tech tabular-nums">
                  {formatHeight(activeHotspot.ceilingHeightM)}
                </span>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <span className="type-label-md text-[#9E9E9E]">Nocturnal Noise Floor</span>
                <span className="type-body-md text-[#FFFFFF] font-mono-tech tabular-nums">
                  {activeHotspot.acousticDb} dBA (STC 64+)
                </span>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <span className="type-label-md text-[#9E9E9E]">Calibrated Luminance</span>
                <span className="type-body-md text-[#F2B36B] font-mono-tech tabular-nums">
                  {lightingMode === 'nocturnal'
                    ? `${activeHotspot.ambientLux} LUX · 2200K`
                    : `${activeHotspot.ambientLux * 2} LUX · 2700K`}
                </span>
              </div>
              <div className="py-3 flex flex-col gap-1.5">
                <span className="type-label-md text-[#9E9E9E]">Primary Material Palette</span>
                <span className="type-body-sm text-[#CFCFCF]">{activeHotspot.materials}</span>
              </div>
            </div>
          </div>

          {/* Action Block */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                if (isFullscreen) setIsFullscreen(false);
                onRequestViewing(estate.id, activeHotspot.name);
              }}
              className="btn-primary-amber w-full py-3.5 px-6 type-label-md font-medium flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Inquire About {activeHotspot.name}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return viewerContent;
};
