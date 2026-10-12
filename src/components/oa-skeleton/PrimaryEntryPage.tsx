import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { PrimaryEntrySkeleton } from "./PrimaryEntrySkeleton";
import { getPrimaryEntry } from "./primaryEntries";

type Props = {
  slug: string;
};

export function PrimaryEntryPage({ slug }: Props) {
  const entry = getPrimaryEntry(slug);
  if (!entry) {
    throw new Error(`Unknown OA primary entry slug: ${slug}`);
  }
  return (
    <OaSharedShell activeKey={entry.activeKey}>
      <PrimaryEntrySkeleton entry={entry} />
    </OaSharedShell>
  );
}
