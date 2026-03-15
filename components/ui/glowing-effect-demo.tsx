"use client";

import { Globe, Brain, Calendar, Zap, ShieldCheck } from "lucide-react";
import { GlowingEffect } from "./glowing-effect";
import { cn } from "../../lib/utils";

export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Globe className="h-4 w-4 text-primary" />}
        title="High-Converting Web Design"
        description="Lightning-fast, mobile-optimized websites built on psychological principles to turn visitors into buyers."
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Brain className="h-4 w-4 text-primary" />}
        title="AI Chatbots & Assistants"
        description="Custom-trained AI that knows your business inside out, answering FAQs and capturing lead details 24/7."
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Calendar className="h-4 w-4 text-primary" />}
        title="Automated Booking Systems"
        description="Seamless calendar integration that qualifies leads and books them directly without human intervention."
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Zap className="h-4 w-4 text-primary" />}
        title="Lightning Fast Performance"
        description="Optimized for speed to ensure you never lose a customer to a slow loading page."
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<ShieldCheck className="h-4 w-4 text-primary" />}
        title="Enterprise-Grade Security"
        description="Your data and your customers' data is protected by industry-leading security protocols."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-200 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-white p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-slate-200 bg-slate-50 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-slate-900">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-slate-500">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
