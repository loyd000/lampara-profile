import LightRays from '@/components/LightRays';

const POINTS: [string, string][] = [
  ['Residential to utility-scale', 'Rooftops, commercial buildings and ground-mount solar farms.'],
  ['Licensed and registered', 'DTI, BIR and a Municipality of Tiaong business permit.'],
];

function Point({ title, text }: { title: string; text: string }) {
  return (
    <div className="max-w-[300px]">
      <h3 className="text-[18px] leading-[1.25] font-normal">{title}</h3>
      <p className="note text-soft mt-2">{text}</p>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="night relative min-h-[720px] overflow-hidden md:h-dvh" aria-labelledby="hero-title">
      <div className="absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#edcd9f"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          glow={0.6}
          haze={0.25}
          followMouse
          mouseInfluence={0.1}
          rayDensity={1}
          tilt={0}
          raySharpness={0.35}
          atmosphere={1}
          intensity={1}
          fadeDistance={1}
          saturation={1.6}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          cursorShadow
          clickPulse
          intro
          lightMode={false}
        />
      </div>

      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-4 pt-32 pb-16 md:px-6 md:pt-36">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <h1 id="hero-title" className="text-[clamp(44px,6vw,92px)] leading-[1.02] font-light">
              Power Outage Worries,<br className="max-md:hidden" /> No More.
            </h1>
            <p className="text-soft mt-6 max-w-[46ch] text-[18px] leading-[1.55]">
              LAMPARA Electrical Installation Services: licensed solar and electrical installation for homes, businesses and utility-scale sites across the Philippines, since 2019.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-yellow">Request a quote</a>
              <a href="#projects" className="btn btn-line">View our projects</a>
            </div>
          </div>
          <div className="flex flex-col gap-8 lg:pt-4">
            <Point title={POINTS[0][0]} text={POINTS[0][1]} />
            <Point title={POINTS[1][0]} text={POINTS[1][1]} />
          </div>
        </div>
      </div>
    </section>
  );
}
