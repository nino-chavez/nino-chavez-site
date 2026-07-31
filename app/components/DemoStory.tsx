import {
  type DemoStory as DemoStoryRecord,
  renderDemoStoryHtml,
  scopeDemoStoryStyle,
} from "../demo-stories";
import { DemoStoryProgress } from "./DemoStoryProgress";

export function DemoStory({
  story,
  recordLabel,
}: {
  story: DemoStoryRecord;
  recordLabel: string;
}) {
  const storyId = `story-${story.kind}-${story.slug}`;
  const sectionLinks = story.sections.map((section, index) => ({
    id: `${storyId}-${section.id || index + 1}`,
    label: section.label,
  }));

  return (
    <article
      className="native-demo-story"
      id={storyId}
      aria-label={`${story.title} — complete ${story.kind}`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: scopeDemoStoryStyle(story.style, story.sourceHash),
        }}
      />
      <DemoStoryProgress storyId={storyId} sections={sectionLinks} />

      <header className="native-story-chrome">
        <span>
          {recordLabel} · {story.sectionCount} chapters
        </span>
        <span>Scroll to read · use ← → to step between chapters</span>
        <a href={`#${storyId}-end`}>Skip to the record</a>
      </header>

      <div
        className="demo-story-surface"
        data-story={`${story.kind}:${story.slug}`}
      >
        {story.sections.map((section, index) => (
          <section
            className={section.className}
            id={sectionLinks[index].id}
            aria-label={section.label}
            tabIndex={-1}
            key={section.id}
            dangerouslySetInnerHTML={{
              __html: renderDemoStoryHtml(story, section.html),
            }}
          />
        ))}
      </div>
      <div id={`${storyId}-end`} className="native-story-end" />
    </article>
  );
}
