import { cn } from "@/lib/cn";

type Props = {
  videoId: string;
  /** Accessible title for screen readers; also shown to YouTube. */
  title: string;
  /** Optional caption line rendered under the video. */
  caption?: string;
  className?: string;
};

/** Lightweight responsive 16:9 YouTube embed using the privacy-respecting
 *  no-cookie domain and `loading="lazy"` so it doesn't block the page. */
export function YouTubeEmbed({ videoId, title, caption, className }: Props) {
  return (
    <figure className={cn("w-full", className)}>
      <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] border border-rule bg-paper shadow-paper">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-ink-mute">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
