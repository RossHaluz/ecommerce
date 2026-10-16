import { highlightParts } from "../model/highlight";

export const HighlightedText = ({ text, query }: { text: string; query: string }) => (
  <>
    {highlightParts(text, query).map((part, index) =>
      part.hit ? (
        <strong key={index} className="font-extrabold text-[#2E2E2E]">
          {part.text}
        </strong>
      ) : (
        <span key={index}>{part.text}</span>
      ),
    )}
  </>
);
