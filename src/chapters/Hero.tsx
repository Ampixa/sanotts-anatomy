import { Stat, StatRow } from "../components/Panel";
import { FRONTEND, OBJECTIVE, PARAMS, WER } from "../data/paperFacts";
import { useViz } from "../data/store";
import {useState} from "react";

export function Hero() {
  const trace = useViz((s) => s.trace);
  const [open,setOpen] = useState(false);
  return (
    <div id="hero">
    <div className="header-row">
      {/* Left */}
      <div>
        <h1 className="wordmark">
          sano<span className="tts">TTS</span>
        </h1>
      </div>

      {/* Right */}
      <div className="github-menu">
        <div className="github-group">
          <a
            href="https://github.com/Ampixa/sanoTTS-anatomy"
            target="_blank"
            rel="noreferrer"
            className="github-star"
          >
            <svg
              className="star-icon"
              viewBox="0 0 16 16"
              width="14"
              height="14"
              aria-hidden="true"
            >
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
            </svg>
            <span>Star on GitHub</span>
          </a>

          <button
            className="github-dropdown-btn"
            onClick={() => setOpen(!open)}
            aria-label="Choose repository"
            aria-expanded={open}
          >
            <svg
              viewBox="0 0 12 12"
              width="12"
              height="12"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3.2 4.5 6 7.3l2.8-2.8.7.7-3.5 3.5L2.5 5.2l.7-.7Z" />
            </svg>
          </button>
        </div>

        {open && (
          <div className="github-dropdown">
            <a
              href="https://github.com/Ampixa/sanotts-anatomy"
              target="_blank"
              rel="noreferrer"
            >
              sanoTTS-anatomy
            </a>

            <a
              href="https://github.com/Ampixa/sanoTTS"
              target="_blank"
              rel="noreferrer"
            >
              sanoTTS
            </a>
          </div>
        )}
      </div>
    </div>
      <p className="tagline">
        A complete neural text-to-speech system in <b>{PARAMS.total.toLocaleString()} parameters</b> —
        small enough to run on the class of chip inside a sensor node.
      </p>

      <div className="howto">
        <b>How to read this page.</b> The left column is the story — scrolling it is
        the only thing that moves the pipeline stage on the right. The right
        panel is a workbench: hover any tensor, drag cursors, press play, run the
        model — it will never scroll or switch stages on its own. The crimson bar
        up top always shows where you are in the chain.
      </div>

      <StatRow>
        <Stat label="total parameters" value={PARAMS.total.toLocaleString()} />
        <Stat label="frontend params" value="0" accent />
        <Stat label="fp32 size" value={`${(PARAMS.total * 4 / 1e6).toFixed(2)} MB`} />
        <Stat label="SCOREQ (n=249)" value={OBJECTIVE.scoreq.toFixed(2)} />
        <Stat label="WER gap vs teacher" value={`+${WER.delta.toFixed(2)} pt`} />
      </StatRow>

      <h3>What you are looking at</h3>
      <p>
        Every stage of a real TTS pipeline, drawn from the inside: text becomes
        phoneme ids, ids become durations, durations become a mel spectrogram,
        and the spectrogram becomes a 24&nbsp;kHz waveform. Everything rendered
        here is a <b>real intermediate tensor</b> from the shipped int8 model,
        captured while it synthesized the sentence selected above. No schematic
        mock-ups and no stand-in data — the C99 that produced these numbers is
        the same code the ESP32 firmware compiles.
      </p>
      {trace && (
        <p className="small">
          Currently loaded: <b className="accent">{trace.info.row_id}</b> —{" "}
          "{trace.info.text.slice(0, 80)}{trace.info.text.length > 80 ? "…" : ""}"
          {" "}→ {trace.N} tokens, {trace.T} frames, {trace.pcm.length.toLocaleString()} samples.
          The rule-based frontend replaced a{" "}
          {FRONTEND.neuralTagger.toLocaleString()}-parameter learned tagger with no
          measurable quality change (SCOREQ, {FRONTEND.swapN} held-out sentences).
        </p>
      )}
      <p className="small faint">Scroll to begin the walkthrough ↓</p>
    </div>
  );
}
