import { useRef, useState } from "react";
import "./index.css";
function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    text: string;
    x: number;
    y: number;
  }>({ visible: false, text: "", x: 0, y: 0 });
  const startDate: Date = new Date("1998-04-18");
  const currentDate: Date = new Date();
  const millisecondsInDay: number = 1000 * 60 * 60 * 24;

  const days: number = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / millisecondsInDay
  );
  const totalDays = new Array(27394).fill("✓");

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const birthdayIndexToTitle: Map<number, string> = (() => {
    const indexToTitle = new Map<number, string>();
    let yearOffset = 1;
    // Precompute all yearly birthdays within the totalDays range
    while (true) {
      const nextBirthday = new Date(startDate);
      nextBirthday.setFullYear(startDate.getFullYear() + yearOffset);
      const diffDays = Math.floor(
        (nextBirthday.getTime() - startDate.getTime()) / millisecondsInDay
      );
      if (diffDays >= totalDays.length) break;
      indexToTitle.set(
        diffDays,
        `Birthday: ${dateFormatter.format(nextBirthday)}`
      );
      yearOffset += 1;
    }
    return indexToTitle;
  })();
  // const daysInYearArray = [
  //   365, 730, 1095, 1461, 1826, 2191, 2556, 2922, 3287, 3652,
  //   4017, 4383, 4748, 5113, 5478, 5844, 6209, 6574, 6939, 7305,
  //   7670, 8035, 8400, 8766, 9131, 9496, 9861, 10227, 10592, 10957,
  //   11322, 11688, 12053, 12418, 12783, 13149, 13514, 13879, 14244, 14610,
  //   14975, 15340, 15705, 16071, 16436, 16801, 17166, 17532, 17897, 18262,
  //   18627, 18993, 19358, 19723, 20088, 20454, 20819, 21184, 21549, 21915,
  //   22280, 22645, 23010, 23376, 23741, 24106, 24471, 24837, 25202, 25567,
  //   25932, 26298, 26663, 27028, 27393
  // ];

  // const findIndex = (index: number) => {
  //   const indexa = daysInYearArray?.findIndex(day => day === index);
  //   if (indexa !== -1) {
  //     return indexa + 1;
  //   }
  // }

  return (
    <>
      <div
        ref={containerRef}
        className='relative bg-slate-300 h-full'
        onMouseMove={(event) => {
          const target = event.target as HTMLElement | null;
          const birthdayEl = target?.closest(
            "[data-birthday]"
          ) as HTMLElement | null;
          const hasBirthday = Boolean(birthdayEl?.dataset?.birthday);
          if (!containerRef.current) return;
          if (hasBirthday) {
            const rect = containerRef.current.getBoundingClientRect();
            setTooltip({
              visible: true,
              text: birthdayEl!.dataset.birthday || "",
              x: event.clientX - rect.left + 8,
              y: event.clientY - rect.top + 8,
            });
          } else {
            if (tooltip.visible) setTooltip((t) => ({ ...t, visible: false }));
          }
        }}
        onMouseLeave={() => setTooltip((t) => ({ ...t, visible: false }))}
      >
        {tooltip.visible ? (
          <div
            className='pointer-events-none absolute z-10 rounded bg-black/80 px-2 py-1 text-[10px] text-white shadow'
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {tooltip.text}
          </div>
        ) : null}

        <div className='flex flex-wrap'>
          {totalDays?.map((_, index) => {
            const birthdayTitle = birthdayIndexToTitle.get(index);
            return (
              <div
                key={index}
                className={`h-2 w-2 border border-slate-700 flex items-center justify-center ${
                  index <= days ? "bg-green-600" : ""
                }`}
                data-birthday={birthdayTitle || undefined}
              >
                {birthdayTitle ? (
                  <span className='text-[10px] cursor-pointer leading-none'>
                    🎂
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
