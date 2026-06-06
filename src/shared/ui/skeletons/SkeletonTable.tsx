import type { CSSProperties } from "react";

interface SkeletonTableI {
  lineHeight: number;
  lineWidth?: number;
  count: number;
  gap?: number;
}

const SkeletonTable = ({
  lineHeight,
  lineWidth,
  count,
  gap,
}: SkeletonTableI) => {
  return (
    <div
      style={{ "--skeleton-width": `${lineWidth}px` } as CSSProperties}
      className={"max-w-(--skeleton-width) w-full mt-20 px-10 xl:px-0 m-auto"}
    >
      <div className={"mb-2 bg-zinc-300 h-8 animate-pulse rounded-sm"}></div>
      <div
        style={{ "--skeleton-gap": `${gap}px` } as CSSProperties}
        className={"flex flex-col items-center gap-(--skeleton-gap)"}
      >
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            style={
              {
                "--skeleton-lheight": `${lineHeight}px`,
              } as CSSProperties
            }
            className={
              "bg-skeleton-color w-full h-(--skeleton-lheight) animate-pulse rounded-sm"
            }
          ></div>
        ))}
        <div
          style={
            {
              "--skeleton-lheight": `${lineHeight}px`,
            } as CSSProperties
          }
          className={
            "w-50 h-(--skeleton-lheight) bg-zinc-300 animate-pulse rounded-sm mt-1"
          }
        ></div>
      </div>
    </div>
  );
};

export default SkeletonTable;
