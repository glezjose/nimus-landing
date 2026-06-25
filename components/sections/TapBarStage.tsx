"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DEFAULT_TAPBAR_OPTION_ID, type TapBarOptionId } from "@/lib/data/tapbar-options";

const TapBarModelCanvas = dynamic(
  () =>
    import("@/components/sections/TapBarModelCanvas").then(
      (mod) => mod.TapBarModelCanvas,
    ),
  { ssr: false },
);

type TapBarStageProps = {
  activeId: TapBarOptionId;
  modelPath: string;
  previewImage: string;
  fitSize: number;
  view3dAria: string;
  priorityPreview?: boolean;
};

function CubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

export function TapBarStage({
  activeId,
  modelPath,
  previewImage,
  fitSize,
  view3dAria,
  priorityPreview = false,
}: TapBarStageProps) {
  const [modelActive, setModelActive] = useState(false);

  useEffect(() => {
    setModelActive(false);
  }, [activeId]);

  return (
    <>
      {!modelActive ? (
        <>
          <img
            key={activeId}
            src={previewImage}
            alt=""
            className={`tapbar-model-preview tapbar-model-preview--${activeId}`}
            decoding="async"
            fetchPriority={
              priorityPreview || activeId === DEFAULT_TAPBAR_OPTION_ID
                ? "high"
                : "low"
            }
          />
          <button
            type="button"
            className="nav-icon-btn tapbar-model-3d-toggle"
            aria-label={view3dAria}
            onClick={() => setModelActive(true)}
          >
            <CubeIcon />
          </button>
        </>
      ) : (
        <TapBarModelCanvas modelPath={modelPath} fitSize={fitSize} />
      )}
    </>
  );
}
