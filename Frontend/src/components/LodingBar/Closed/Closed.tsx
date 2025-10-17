import { useEffect, useRef, useState } from "react";
import "../deadline/Deadline.css";

type Props = {
  animationTime?: number; // em segundos
  initialDays?: number;
};

export function Closed({ animationTime = 20, initialDays = 7 }: Props) {
  const [day, setDay] = useState<number>(initialDays);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // refs para controlar timers e timeouts para cleanup
  const cycleIntervalRef = useRef<number | null>(null);
  const dayIntervalRef = useRef<number | null>(null);
  const armTimeoutsRef = useRef<number[]>([]);

  // aplica duração das animações aos elementos SVG
  const applyAnimationDurations = () => {
    const container = containerRef.current;
    if (!container) return;
    const progressFill = container.querySelector<SVGElement>(
      "#progress-time-fill"
    );
    const angelGroup = container.querySelector<SVGGElement>("#angel-group");
    if (progressFill)
      progressFill.style.animationDuration = `${animationTime}s`;
    if (angelGroup) angelGroup.style.animationDuration = `${animationTime}s`;
  };

  const applyArmSpeedSequence = () => {
    const container = containerRef.current;
    if (!container) return;
    const arm = container.querySelector<HTMLElement>("#designer-arm-grop");
    if (!arm) return;

    // limpa timeouts antigos
    armTimeoutsRef.current.forEach((t) => window.clearTimeout(t));
    armTimeoutsRef.current = [];

    const seq: Array<{ t: number; dur: string }> = [
      { t: 0, dur: "1.5s" },
      { t: 4000, dur: "1s" },
      { t: 8000, dur: "0.7s" },
      { t: 12000, dur: "0.3s" },
      { t: 15000, dur: "0.2s" },
    ];

    seq.forEach(({ t, dur }) => {
      const id = window.setTimeout(() => {
        arm.style.animationDuration = dur;
      }, t);
      armTimeoutsRef.current.push(id);
    });
  };

  const startDayTimer = () => {
    // garante que não exista um interval de dia ainda rodando
    if (dayIntervalRef.current !== null) {
      window.clearInterval(dayIntervalRef.current);
      dayIntervalRef.current = null;
    }

    // calcula duracao de cada "dia"
    const totalMs = animationTime * 1000;
    const dayDuration = totalMs / initialDays;

    // reset visual
    setDay(initialDays);
    let remaining = initialDays;

    // decrementar a cada dayDuration
    const id = window.setInterval(() => {
      remaining -= 1;
      // atualiza estado (react)
      setDay(remaining);

      if (remaining <= 0) {
        // encerra esse interval (será reiniciado pelo ciclo principal)
        if (dayIntervalRef.current !== null) {
          window.clearInterval(dayIntervalRef.current);
          dayIntervalRef.current = null;
        }
        // reset visual para o valor inicial (como o original fazia)
        setDay(initialDays);
      }
    }, dayDuration);

    dayIntervalRef.current = id;
  };

  useEffect(() => {
    // inicia ciclo
    applyAnimationDurations();
    applyArmSpeedSequence();
    startDayTimer();

    // cria o intervalo principal que reinicia o ciclo a cada animationTime segundos
    const mainId = window.setInterval(() => {
      // reinicia: aplica duracoes, reseta velocidade do braço e reinicia o timer de dias
      applyAnimationDurations();
      applyArmSpeedSequence();
      startDayTimer();
      // log pra debug (igual ao original)
      // console.log("begin interval", animationTime * 1000);
    }, animationTime * 1000);

    cycleIntervalRef.current = mainId;

    // cleanup na desmontagem
    return () => {
      if (cycleIntervalRef.current !== null) {
        window.clearInterval(cycleIntervalRef.current);
        cycleIntervalRef.current = null;
      }
      if (dayIntervalRef.current !== null) {
        window.clearInterval(dayIntervalRef.current);
        dayIntervalRef.current = null;
      }
      armTimeoutsRef.current.forEach((t) => window.clearTimeout(t));
      armTimeoutsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationTime, initialDays]); // reinicia se animationTime ou initialDays mudarem

  return (
    <div
      className="relative w-full  max-w-48  h-full mx-auto my-10 select-none"
      style={{ transform: "scaleX(-1)" }}
    >
      <svg preserveAspectRatio="none" id="line" viewBox="0 0 581 158">
        <g id="fire">
          {/* <rect id="mask-fire-black" x="511" y="41" width="38" height="34" /> */}
          <g>
            <defs>
              <rect id="mask_fire" x="511" y="41" width="38" height="34" />
            </defs>
            <clipPath id="mask-fire_1_">
              <use xlinkHref="#mask_fire" overflow="visible" />
            </clipPath>
            <g id="group-fire" clipPath="url(#mask-fire_1_)">
              <path
                id="red-flame"
                fill="#B71342"
                d="M528.377,100.291c6.207,0,10.947-3.272,10.834-8.576 c-0.112-5.305-2.934-8.803-8.237-10.383c-5.306-1.581-3.838-7.9-0.79-9.707c-7.337,2.032-7.581,5.891-7.11,8.238 c0.789,3.951,7.56,4.402,5.077,9.48c-2.482,5.079-8.012,1.129-6.319-2.257c-2.843,2.233-4.78,6.681-2.259,9.703 C521.256,98.809,524.175,100.291,528.377,100.291z"
              />
              <path
                id="yellow-flame"
                opacity="0.71"
                fill="#F7B523"
                d="M528.837,100.291c4.197,0,5.108-1.854,5.974-5.417 c0.902-3.724-1.129-6.207-5.305-9.931c-2.396-2.137-1.581-4.176-0.565-6.32c-4.401,1.918-3.384,5.304-2.482,6.658 c1.511,2.267,2.099,2.364,0.42,5.8c-1.679,3.435-5.42,0.764-4.275-1.527c-1.921,1.512-2.373,4.04-1.528,6.563 C522.057,99.051,525.994,100.291,528.837,100.291z"
              />
              <path
                id="white-flame"
                opacity="0.81"
                fill="#FFFFFF"
                d="M529.461,100.291c-2.364,0-4.174-1.322-4.129-3.469 c0.04-2.145,1.117-3.56,3.141-4.198c2.022-0.638,1.463-3.195,0.302-3.925c2.798,0.821,2.89,2.382,2.711,3.332 c-0.301,1.597-2.883,1.779-1.938,3.834c0.912,1.975,3.286,0.938,2.409-0.913c1.086,0.903,1.826,2.701,0.864,3.924 C532.18,99.691,531.064,100.291,529.461,100.291z"
              />
            </g>
          </g>
        </g>
        <g id="progress-trail">
          <path
            fill="#FFFFFF"
            d="M491.979,83.878c1.215-0.73-0.62-5.404-3.229-11.044c-2.583-5.584-5.034-10.066-7.229-8.878
                                  c-2.854,1.544-0.192,6.286,2.979,11.628C487.667,80.917,490.667,84.667,491.979,83.878z"
          />
          <path
            fill="#FFFFFF"
            d="M571,76v-5h-23.608c0.476-9.951-4.642-13.25-4.642-13.25l-3.125,4c0,0,3.726,2.7,3.625,5.125
                                  c-0.071,1.714-2.711,3.18-4.962,4.125H517v5h10v24h-25v-5.666c0,0,0.839,0,2.839-0.667s6.172-3.667,4.005-6.333
                                  s-7.49,0.333-9.656,0.166s-6.479-1.5-8.146,1.917c-1.551,3.178,0.791,5.25,5.541,6.083l-0.065,4.5H16c-2.761,0-5,2.238-5,5v17
                                  c0,2.762,2.239,5,5,5h549c2.762,0,5-2.238,5-5v-17c0-2.762-2.238-5-5-5h-3V76H571z"
          />
          <path
            fill="#FFFFFF"
            d="M535,65.625c1.125,0.625,2.25-1.125,2.25-1.125l11.625-22.375c0,0,0.75-0.875-1.75-2.125
                                  s-3.375,0.25-3.375,0.25s-8.75,21.625-9.875,23.5S533.875,65,535,65.625z"
          />
        </g>
        <g>
          <defs>
            <path
              id="SVGID_1_"
              d="M484.5,75.584c-3.172-5.342-5.833-10.084-2.979-11.628c2.195-1.188,4.646,3.294,7.229,8.878
                                   c2.609,5.64,4.444,10.313,3.229,11.044C490.667,84.667,487.667,80.917,484.5,75.584z M571,76v-5h-23.608
                                   c0.476-9.951-4.642-13.25-4.642-13.25l-3.125,4c0,0,3.726,2.7,3.625,5.125c-0.071,1.714-2.711,3.18-4.962,4.125H517v5h10v24h-25
                                   v-5.666c0,0,0.839,0,2.839-0.667s6.172-3.667,4.005-6.333s-7.49,0.333-9.656,0.166s-6.479-1.5-8.146,1.917
                                   c-1.551,3.178,0.791,5.25,5.541,6.083l-0.065,4.5H16c-2.761,0-5,2.238-5,5v17c0,2.762,2.239,5,5,5h549c2.762,0,5-2.238,5-5v-17
                                   c0-2.762-2.238-5-5-5h-3V76H571z M535,65.625c1.125,0.625,2.25-1.125,2.25-1.125l11.625-22.375c0,0,0.75-0.875-1.75-2.125
                                   s-3.375,0.25-3.375,0.25s-8.75,21.625-9.875,23.5S533.875,65,535,65.625z"
            />
          </defs>
          <clipPath id="SVGID_2_">
            <use xlinkHref="#SVGID_1_" overflow="visible" />
          </clipPath>
          <rect
            id="progress-time-fill"
            x="-100%"
            y="34"
            clipPath="url(#SVGID_2_)"
            fill="#6bd1ce"
            width="586"
            height="103"
            className="animate-[progress-fill_linear_20s_infinite] origin-[center_left]"
          />
        </g>

        <g
          id="angel-group"
          className="animate-[walk_20s_linear_infinite] origin-[center_left]"
        >
          <path
            id="angel-halo"
            fill="rgba(255, 255, 255, 0)"
            stroke="#6bd1ce"
            strokeWidth={4}
            d="M -42.093 39.421 C -39.399 39.421 -35.983 39.068 -37.329 36.735 C -37.784 35.948 -39.112 35.41 -40.009 35.093 C -40.532 34.908 -40.292 34.961 -41.27 34.657 C -42.426 34.298 -44.814 33.947 -46.744 34.291 C -48.232 34.556 -48.935 35.414 -49.208 35.887 C -49.343 36.121 -49.555 37.332 -47.991 38.151 C -46.455 38.957 -43.308 39.372 -41.671 39.446"
          />
          <path
            id="angel"
            fill="#6bd1ce"
            d="M-46.25,40.416c-5.42-0.281-8.349,3.17-13.25,3.918c-5.716,0.871-10.583-0.918-10.583-0.918
                                             C-67.5,49-65.175,50.6-62.083,52c5.333,2.416,4.083,3.5,2.084,4.5c-16.5,4.833-15.417,27.917-15.417,27.917L-75.5,84.75
                                             c-1,12.25-20.25,18.75-20.25,18.75s39.447,13.471,46.25-4.25c3.583-9.333-1.553-16.869-1.667-22.75
                                             c-0.076-3.871,2.842-8.529,6.084-12.334c3.596-4.22,6.958-10.374,6.958-15.416C-38.125,43.186-39.833,40.75-46.25,40.416z
                                             M-40,51.959c-0.882,3.004-2.779,6.906-4.154,6.537s-0.939-4.32,0.112-7.704c0.82-2.64,2.672-5.96,3.959-5.583
                                             C-39.005,45.523-39.073,48.8-40,51.959z"
          />
          <path
            id="angel-wing"
            fill="#6bd1ce"
            className="animate-[move-wing_4s_ease_infinite] origin-[-48px_center]"
            d="M -88.234 35.308 C -81.273 35.308 -76.922 42.844 -80.402 48.873 C -80.624 49.257 -80.874 49.625 -81.15 49.972 C -84.793 54.552 -82.112 61.359 -76.323 62.224 C -76.068 62.262 -75.811 62.287 -75.553 62.299 C -75.295 62.311 -75.153 65.549 -75.153 65.549 C -75.153 70.868 -79.751 77.038 -85.058 77.401 L -90.803 76.147 C -90.527 76.864 -82.723 74.09 -83.466 72.157 L -84.201 68.949 L -87.553 66.903 L -91.473 68.154 L -94.726 65.318 L -91.139 63.817 L -92.838 61.881 L -97.145 63.4 L -101.31 59.563 L -96.644 58.312 L -98.145 56.06 L -102.89 56.811 L -106.53 52.884 L -100.16 52.033 L -102.05 48.794 L -109.47 49.287 L -112.14 45.064 L -103.86 45.044 L -105.41 41.881 L -117.17 41.631 L -121.25 35.949 L -88.234 35.308 Z"
          />
          <path
            id="angel-arm"
            className="animate-[move-arm_3s_ease_infinite]  origin-[-60px_74px]"
            fill="#6bd1ce"
            d="M-53.375,75.25c0,0,9.375,2.25,11.25,0.25s2.313-2.342,3.375-2.791
                                                 c1.083-0.459,4.375-1.75,4.292-4.75c-0.101-3.627,0.271-4.594,1.333-5.043c1.083-0.457,2.75-1.666,2.75-1.666
                                                 s0.708-0.291,0.5-0.875s-0.791-2.125-1.583-2.959c-0.792-0.832-2.375-1.874-2.917-1.332c-0.542,0.541-7.875,7.166-7.875,7.166
                                                 s-2.667,2.791-3.417,0.125S-49.833,61-49.833,61s-3.417,1.416-3.417,1.541s-1.25,5.834-1.25,5.834l-0.583,5.833L-53.375,75.25z"
          />
          <path
            id="angel-tool"
            className="animate-[move-tool_3s_ease_infinite] origin-[-48px_center]"
            fill="#6bd1ce"
            d="M -20.873 27.033 L -22.449 30.858 C -23.146 30.458 -23.255 30.505 -24.463 29.767 C -25.183 29.327 -22.366 28.123 -23.278 27.771 C -24.157 27.432 -25.159 26.576 -25.837 26.257 C -26.497 25.946 -26.04 28.751 -26.525 28.578 C -27.238 28.324 -27.763 27.315 -28.144 27.105 C -28.962 26.654 -29.553 28.996 -30.032 29.89 C -30.262 30.32 -26.423 30.066 -27.525 30.853 C -28.184 31.324 -30.321 32.121 -29.934 32.321 C -29.346 32.624 -27.192 33.7 -26.593 34.045 C -26.175 34.286 -26.425 31.522 -25.671 31.823 C -24.725 32.201 -24.016 32.689 -23.529 32.968 L -63.692 118.508 L -61.88 119.356 L -23.538 37.447 C -23.538 37.447 -20.608 33.897 -17.029 38.668 C -12.029 45.336 -13.627 48.548 -13.627 48.548 C -13.627 48.548 -6.191 38.617 -7.683 30.898 C -7.897 29.792 -9.934 30.406 -11.286 30.49 C -16.728 30.828 -19.583 29.144 -19.524 28.87 L -19.061 27.882 L -20.873 27.033 Z"
          />
        </g>
        <path
          id="designer-body"
          fill="#FEFFFE"
          d="M514.75,100.334c0,0,1.25-16.834-6.75-16.5c-5.501,0.229-5.583,3-10.833,1.666
                                                   c-3.251-0.826-5.084-15.75-0.834-22c4.948-7.277,12.086-9.266,13.334-7.833c2.25,2.583-2,10.833-4.5,14.167
                                                   c-2.5,3.333-1.833,10.416,0.5,9.916s8.026-0.141,10,2.25c3.166,3.834,4.916,17.667,4.916,17.667l0.917,2.5l-4,0.167L514.75,100.334z
                                                   "
        />

        <circle
          id="designer-head"
          fill="#FEFFFE"
          cx="516.083"
          cy="53.25"
          r="6.083"
        />

        <g id="designer-arm-grop">
          <path
            id="designer-arm"
            fill="#FEFFFE"
            d="M505.875,64.875c0,0,5.875,7.5,13.042,6.791c6.419-0.635,11.833-2.791,13.458-4.041s2-3.5,0.25-3.875
                                                    s-11.375,5.125-16,3.25c-5.963-2.418-8.25-7.625-8.25-7.625l-2,1.125L505.875,64.875z"
          />
          <path
            id="designer-pen"
            fill="#FEFFFE"
            d="M525.75,59.084c0,0-0.423-0.262-0.969,0.088c-0.586,0.375-0.547,0.891-0.547,0.891l7.172,8.984l1.261,0.453
                                                    l-0.104-1.328L525.75,59.084z"
          />
        </g>
      </svg>
    </div>
  );
}
